package module.pokerbomb.server;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import module.pokerbomb.entity.UserEntity;
import module.pokerbomb.service.UserService;
import module.pokerbomb.to.MessageTo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@ServerEndpoint("/websocket/{userId}")
@Component
public class LoginSocketServer {

    private static UserService userService;
    @Autowired
    public void setUserService(UserService userService){
        LoginSocketServer.userService = userService;
    }

    private static final Logger log = LoggerFactory.getLogger(LoginSocketServer.class);

    /**
     * 当前在线连接数
     */
    private static AtomicInteger onlineCount = new AtomicInteger(0);

    /**
     * 用来存放每个客户端对应的 WebSocketServer 对象
     */
    private static ConcurrentHashMap<String, LoginSocketServer> webSocketMap = new ConcurrentHashMap<>();

    /**
     * 与某个客户端的连接会话，需要通过它来给客户端发送数据
     */
    private Session session;

    /**
     * 接收 userId
     */
    private String userId = "";

    /**
     * 连接建立成功调用的方法
     */
    @OnOpen
    public void onOpen(Session session, @PathParam("userId") String userId) {
        this.session = session;
        this.userId = userId;
        if (webSocketMap.containsKey(userId)) {
            webSocketMap.remove(userId);
            webSocketMap.put(userId, this);
        } else {
            webSocketMap.put(userId, this);
            addOnlineCount();
        }
        log.info("用户登录:" + userId + ",当前在线人数为:" + getOnlineCount());
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
        log.info("用户退出登录:" + userId + ",当前在线人数为:" + getOnlineCount());
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息
     */
//    @OnMessage
//    public void onMessage(String message, Session session) {
//        log.info("用户消息:" + userId + ",报文:" + message);
//        if (!StringUtils.isEmpty(message)) {
//            try {
//                JSONObject jsonObject = JSON.parseObject(message);
//                jsonObject.put("fromUserId", this.userId);
//                String toUserId = jsonObject.getString("toUserId");
//                if (!StringUtils.isEmpty(toUserId) && webSocketMap.containsKey(toUserId)) {
//                    webSocketMap.get(toUserId).sendMessage(jsonObject.toJSONString());
//                } else {
//                    log.error("请求的 userId:" + toUserId + "不在该服务器上");
//                }
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }
//    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        log.info("用户消息:" + userId + ",报文:" + message);
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
            switch (type){
                case "login" :
                    Long id = Long.parseLong((String)data.get("id"));
                    UserEntity userEntity = userService.login(id);
                    MessageTo messageTo = new MessageTo();
                    messageTo.setType("login");
                    messageTo.put("user",userEntity);
                    sendMessage(JSON.toJSONString(messageTo));
            }
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
        LoginSocketServer.onlineCount.getAndIncrement();
    }

    public static synchronized void subOnlineCount() {
        LoginSocketServer.onlineCount.getAndDecrement();
    }
}