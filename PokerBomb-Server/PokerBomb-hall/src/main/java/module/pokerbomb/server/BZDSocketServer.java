package module.pokerbomb.server;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import module.pokerbomb.entity.RoomEntity;
import module.pokerbomb.service.BZDService;
import module.pokerbomb.service.CardService;
import module.pokerbomb.service.RoomService;
import module.pokerbomb.to.*;
import module.pokerbomb.utils.TransformRoomInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.security.auth.login.CredentialException;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@ServerEndpoint("/websocket/bzd/{roomId}/{userId}")
@Component
public class BZDSocketServer {

    private static RoomService roomService;
    @Autowired
    public void setRoomService(RoomService roomService){
        BZDSocketServer.roomService = roomService;
    }

    private static final Logger log = LoggerFactory.getLogger(BZDSocketServer.class);

    /**
     * 当前在线连接数
     */
    private static AtomicInteger onlineCount = new AtomicInteger(0);

    /**
     * 用来存放每个客户端对应的 BZDSocketServer 对象
     */
    private static ConcurrentHashMap<String, Set<BZDSocketServer>> webSocketMap = new ConcurrentHashMap<>();

    /**
     * 与某个客户端的连接会话，需要通过它来给客户端发送数据
     */
    private Session session;

    /**
     * 接收 userId
     */
    private String userId = "";
    private String roomId = "";

    /**
     * 连接建立成功调用的方法
     */
    @OnOpen
    public void onOpen(Session session, @PathParam("roomId") String roomId, @PathParam("userId") String userId) {
        this.session = session;
        this.userId = userId;
        this.roomId = roomId;
        Set<BZDSocketServer> serverSet = webSocketMap.getOrDefault(roomId, new HashSet<>());
        serverSet.add(this);
        webSocketMap.put(roomId, serverSet);
        addOnlineCount();
        log.info("用户:"+userId + "连接bzd游戏:" + roomId + "号房间,当前在线人数为:" + getOnlineCount());
        try {
            MessageTo messageTo = new MessageTo();
            messageTo.setType("open");
            messageTo.put("data","连接成功");
            sendMessage(JSON.toJSONString(messageTo));
        } catch (IOException e) {
            log.error("用户:" + userId + ",网络异常!!!!!!");
        }
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose() {
        if (webSocketMap.containsKey(userId)) {
            webSocketMap.remove(userId);
            subOnlineCount();
        }
        log.info("用户退出bzd服务:" + userId + ",当前在线人数为:" + getOnlineCount());
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息
     */
    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        if (!StringUtils.isEmpty(message)) {
            String type = null;
            HashMap data = null;
            try {
                MessageTo messageTo = JSON.parseObject(message,MessageTo.class);
                type = messageTo.getType();
                data = messageTo.getData();
                log.info("获取到type: " + type + "; data: " + data);
            } catch (Exception e) {
                e.printStackTrace();
            }
            if(type.equals("requestRoomInfo")){
                requestRoomInfo(data);
            }
            if(type.equals("userReady")){
                userReady(data);
            }
            //发牌
            if(type.equals("dealCards")){
                dealCards(data);
            }

            if(type.equals("pushCards")){
                System.out.println("出牌信息：" + data);
                pushCards(data);
            }
            if(type.equals("passCards")){
                passCards(data);
            }
            if(type.equals("userEnd")){
                userEnd(data);
            }
            if(type.equals("panGameOver")){
                panGameOver(data);
            }
            if(type.equals("newUserJoinRoom")){
                newUserJoinRoom();
            }
            if(type.equals("prompt")){
                prompt(data);
            }
        }
    }

    private void prompt(HashMap data) throws IOException {
        PushCardVo pushCardVo = JSON.parseObject((String)data.get("pushCardsInfo"), PushCardVo.class);
        List<List<Integer>> res = roomService.prompt(roomId, pushCardVo);
        MessageTo messageTo = new MessageTo();
        messageTo.setType("prompt");
        messageTo.put("promptInfo", res);
        sendMessage(JSON.toJSONString(messageTo));
    }

    private void newUserJoinRoom() throws IOException {
        Map<String, Object> map = roomService.newUserJoinRoom(roomId, userId);
        MessageTo messageTo = new MessageTo();
        messageTo.setType("newUserJoinRoom");
        messageTo.put("newUserInfo",map);
        sendToAllUsers(messageTo);
    }

    private void panGameOver(HashMap data) throws IOException {
        CleanPanVo cleanPanVo = roomService.panGameOver(roomId);
        MessageTo messageTo = new MessageTo();
        messageTo.setType("panGameOver");
        messageTo.put("panGameOverInfo", cleanPanVo);
        sendToAllUsers(messageTo);
    }

    private void userEnd(HashMap data) throws IOException {
        PushCardVo pushCardVo = JSON.parseObject((String)data.get("pushCardsInfo"), PushCardVo.class);
        Map<String, Object> map = roomService.userEnd(roomId, pushCardVo);
        if(map.containsKey("curUserPanPoints")){
            int curUserPanPoints = (int)map.get("curUserPanPoints");
            updateUserPanPoints((pushCardVo.getCurSeat() + 1) % 4, curUserPanPoints);
        }
        MessageTo messageTo = new MessageTo();
        messageTo.setType("pushCards");
        messageTo.put("isRight", true);
        messageTo.put("pushCardsInfo",pushCardVo);
        sendToAllUsers(messageTo);
    }

    //发牌
    private void dealCards(HashMap data) throws IOException {
        CardService instance = CardService.getInstance();
        List<List<Integer>> cardList = instance.fapai();
        Map<String, Object> map = roomService.dealCards(roomId, cardList);
        int seat = (int)map.get("pushSeat");
        MessageTo messageTo = new MessageTo();
        messageTo.setType("dealCards");
        messageTo.put("cardList", cardList);
        messageTo.put("pushSeat", seat);
        sendToAllUsers(messageTo);
    }

    //不要
    private void passCards(HashMap data) throws IOException{
        PushCardVo pushCardVo = JSON.parseObject((String)data.get("pushCardsInfo"), PushCardVo.class);
        Map<String, Object> map = roomService.passCards(roomId, pushCardVo);
        if(map.containsKey("curUserPanPoints")){
            int curUserPanPoints = (int)map.get("curUserPanPoints");
            updateUserPanPoints((pushCardVo.getCurSeat() + 1) % 4, curUserPanPoints);
        }
        MessageTo messageTo = new MessageTo();
        messageTo.setType("pushCards");
        messageTo.put("isRight", true);
        pushCardVo.setType("buyao");
        messageTo.put("pushCardsInfo",pushCardVo);
        sendToAllUsers(messageTo);
    }


    //出牌
    private void pushCards(HashMap data) throws IOException {
        PushCardVo pushCardVo = JSON.parseObject((String)data.get("pushCardsInfo"), PushCardVo.class);
        CardService cardService = CardService.getInstance();
        Integer curSeat = pushCardVo.getCurSeat();
        String type = cardService.curCardListIsRight(pushCardVo);
        if(type.equals("wrong")){
            MessageTo messageTo = new MessageTo();
            messageTo.setType("pushCards");
            messageTo.put("isRight", false);
            pushCardVo.setType("wrong");
            messageTo.put("pushCardsInfo",pushCardVo);
            sendToAllUsers(messageTo);
        }else {
            Map<String, Object> map = roomService.pushCards(roomId, pushCardVo);
            if(map.containsKey("curUserPanPoints")){
                int curUserPanPoints = (int)map.get("curUserPanPoints");
                updateUserPanPoints(curSeat, curUserPanPoints);
            }
            //当前玩家出完牌
            if(map.containsKey("isEnd")){
                curUserIsEnd(curSeat);
            }
            int points = (int)map.get("points");
            String myStatus  = (String)map.get("myStatus");
            PushCardVo cardVo = new PushCardVo();
            cardVo.setPreCardList(pushCardVo.getCurCardList());
            cardVo.setPrePushSeat(curSeat);
            cardVo.setPreSeat(curSeat);
            cardVo.setPreUserCards(pushCardVo.getPreUserCards());
            cardVo.setPreStatus("PLAYED");
            cardVo.setMyStatus(myStatus);
            cardVo.setPoints(points);
            cardVo.setType(type);
            MessageTo messageTo = new MessageTo();
            messageTo.setType("pushCards");
            messageTo.put("isRight", true);
            messageTo.put("pushCardsInfo",cardVo);
            sendToAllUsers(messageTo);
        }
    }


    private void curUserIsEnd(Integer curSeat) throws IOException {
        MessageTo messageTo = new MessageTo();
        messageTo.setType("curUserIsEnd");
        messageTo.put("seat", curSeat);
        sendToAllUsers(messageTo);
    }

    private void updateUserPanPoints(Integer curSeat, int curUserPanPoints) throws IOException {
        MessageTo messageTo = new MessageTo();
        messageTo.setType("updatePoints");
        messageTo.put("seat", curSeat);
        messageTo.put("panPoints", curUserPanPoints);
        sendToAllUsers(messageTo);
    }

    //玩家准备/取消准备
    private void userReady(HashMap data) throws IOException {
        Integer seat = (Integer)data.get("seat");
        Integer isReady = (Integer)data.get("isReady");
        Map<String, Object> map = roomService.userReady(roomId, seat, isReady);
        int readyNumbers = (int)map.get("readyNumbers");
        int createUserId = (int)map.get("createUserId");
        MessageTo messageTo = new MessageTo();
        messageTo.setType("userReady");
        messageTo.put("readyNumbers", readyNumbers);
        messageTo.put("createUserId", createUserId);
        messageTo.put("seat", seat);
        messageTo.put("isReady", isReady);
        sendToAllUsers(messageTo);
    }

    //第一次进入房间请求房间信息
    private void requestRoomInfo(HashMap data) throws IOException {
        RoomInfo roomInfo = getRoomInfoById(roomId);
        MessageTo messageTo = new MessageTo();
        messageTo.setType("requestRoomInfo");
        messageTo.put("roomInfo", roomInfo);
        sendMessage(JSON.toJSONString(messageTo));
    }

    private RoomInfo getRoomInfoById(String roomId) {
        RoomEntity room = roomService.getById(roomId);
        RoomInfo roomInfo = TransformRoomInfo.roomToRoomInfo(room);
        return roomInfo;
    }

    //将消息发送给房间所有玩家
    private void sendToAllUsers(MessageTo messageTo) throws IOException {
        Set<BZDSocketServer> serverSet = webSocketMap.get(this.roomId);
        for (BZDSocketServer server : serverSet) {
            if(server.session.isOpen())
                server.sendMessage(JSON.toJSONString(messageTo));
        }
    }

    /**
     * 发生错误时调用
     *
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error) {
        log.error("用户错误:" + this.userId + ",原因:" + error.getMessage());
        error.printStackTrace();
    }

    /**
     * 实现服务器主动推送
     */
    public void sendMessage(String message) throws IOException {
        this.session.getBasicRemote().sendText(message);
    }

    public static synchronized AtomicInteger getOnlineCount() {
        return onlineCount;
    }

    public static synchronized void addOnlineCount() {
        BZDSocketServer.onlineCount.getAndIncrement();
    }

    public static synchronized void subOnlineCount() {
        BZDSocketServer.onlineCount.getAndDecrement();
    }
}