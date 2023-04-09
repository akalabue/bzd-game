package module.pokerbomb.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import module.pokerbomb.dao.RoomDao;
import module.pokerbomb.entity.RoomEntity;
import module.pokerbomb.entity.UserEntity;
import module.pokerbomb.enumclass.UserStatusEnum;
import module.pokerbomb.service.CardService;
import module.pokerbomb.service.RoomService;
import module.pokerbomb.service.UserService;
import module.pokerbomb.to.*;
import module.pokerbomb.utils.TransformRoomInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("roomService")
public class RoomServiceImpl extends ServiceImpl<RoomDao, RoomEntity> implements RoomService {

    @Autowired
    private UserService userService;

    @Autowired
    private RoomDao roomDao;

    /**
     * 获取随机六位数房间号
     * @return
     */
    public synchronized int getValidRoomId(){
        return getValidRoomIdTest();
//        int roomId = ((int)(Math.random() * 900000) + 100000);  // 100000 -- 999999
//        return roomId;
    }

    public int getValidRoomIdTest(){
        roomDao.deleteById(666666);
        return 666666;
    }

    public boolean isUsableRoomId(int roomId){
        return this.getById(roomId) == null;
    }

    @Override
    public int createRoom(HashMap data) {
        Integer createUserId = (Integer) data.get("createUserId");
        Integer gameNumbers = (Integer) data.get("gameNumbers");
        Integer scoreNumbers = (Integer) data.get("scoreNumbers");
        RoomEntity roomEntity = new RoomEntity();
        roomEntity.setCreateUserId(createUserId);
        roomEntity.setGameNumbers(gameNumbers);
        roomEntity.setScoreNumbers(scoreNumbers);
        boolean ok = false;
        Integer roomId;
        do{
            roomId = getValidRoomId();
            roomEntity.setRoomId(roomId);
            ok = save(roomEntity);
        }while(!ok);
        return roomId;
    }

    @Override
    public Boolean addNewUser(Integer userId, Integer roomId) {
        RoomEntity room = this.getById(roomId);
        UserEntity user = userService.getById(userId);
        RoomInfo roomInfo = TransformRoomInfo.roomToRoomInfo(room);
        GameRole[] gameRoles = roomInfo.getGameRoles();
        //判断用户是否已经存在
        for(int i = 0; i < 4; i++){
            if(gameRoles[i] != null) {
                if (gameRoles[i].getUserId().equals(userId)) {
                    return true;
                }
            }
        }

        GameRole newRole = new GameRole();
        newRole.setUserId(userId);
        newRole.setUserName(user.getUserName());
        newRole.setUserIcon(user.getUserHeadUrl());
        newRole.setTotalPoints(0);
        newRole.setJuPoints(0);
        newRole.setPanPoints(0);
        UserStatus status = new UserStatus();
        status.setStatus(UserStatusEnum.UNREADY);
        status.setData(new ArrayList<>());
        newRole.setUserStatus(status);
        newRole.setUserCards(new ArrayList<>());

        //添加用户就近位置就坐
        for(int i = 0; i < 4; i++){
            if(gameRoles[i] == null){
                gameRoles[i] = newRole;
                break;
            }
        }
        RoomEntity roomEntity = TransformRoomInfo.roomInfoToRoom(roomInfo);
        boolean update = this.updateById(roomEntity);
        return update;
    }

    @Override
    public int updateUserPoints(Integer curSeat, String roomId) {
        RoomEntity byId = getById(roomId);
        RoomInfo roomInfo = TransformRoomInfo.roomToRoomInfo(byId);
        int ans = addCurPointsToUser(curSeat, roomInfo);
        RoomEntity roomEntity = TransformRoomInfo.roomInfoToRoom(roomInfo);
        updateById(roomEntity);
        return ans;
    }

    @Override
    public Map<String, Object> dealCards(String roomId, List<List<Integer>> cardList) {
        Map<String, Object> map = new HashMap<>();
        RoomEntity byId = getById(roomId);
        RoomInfo roomInfo = TransformRoomInfo.roomToRoomInfo(byId);
        GameRole[] gameRoles = roomInfo.getGameRoles();
        int index = 0;
        for(int i = 0; i < 4; i++){
            gameRoles[i].setUserCards(cardList.get(i));
            List<Integer> data = gameRoles[i].getUserStatus().getData();
            if(data.size() > 0 && data.get(0).equals(4)){
                index = i;
            }
        }
        //将最后一个出完牌的玩家状态置为出牌中
        gameRoles[index].getUserStatus().setStatus(UserStatusEnum.PLAYING);
        map.put("pushSeat", index);
        RoomEntity roomEntity = TransformRoomInfo.roomInfoToRoom(roomInfo);
        updateById(roomEntity);
        return map;
    }

    @Override
    public void updateUserCards(RoomInfo roomInfo, List<Integer> pushCardList, Integer seat) {
//        RoomEntity byId = getById(roomId);
//        RoomInfo roomInfo = TransformRoomInfo.roomToRoomInfo(byId);
        GameRole[] gameRoles = roomInfo.getGameRoles();
        GameRole gameRole = gameRoles[seat];
        List<Integer> userCards = gameRole.getUserCards();
//        Collections.sort(pushCardList);
//        Collections.sort(userCards);
        List<Integer> list = new ArrayList<>();
        for(int i = 0, j = 0; i < userCards.size(); i++){
            if(j < pushCardList.size() && userCards.get(i).equals(pushCardList.get(j))){
                j++;
            }else {
                list.add(userCards.get(i));
            }
        }
        gameRole.setUserCards(list);
//        RoomEntity roomEntity = TransformRoomInfo.roomInfoToRoom(roomInfo);
//        updateById(roomEntity);
        return;
    }

    @Override
    public int updateUserStatus(RoomInfo roomInfo, Integer seat, UserStatusEnum status, List<Integer> curCardList) {
        GameRole[] gameRoles = roomInfo.getGameRoles();
        GameRole gameRole = gameRoles[seat];
        UserStatus userStatus = gameRole.getUserStatus();
        userStatus.setStatus(status);
        if(curCardList != null){
            Collections.sort(curCardList);//如果前端排过序了这里也可以不用排序
            userStatus.setData(curCardList);
        }
        if(status.equals(UserStatusEnum.READY)){
            roomInfo.setReadyNumbers(roomInfo.getReadyNumbers() + 1);
        }else if(status.equals(UserStatusEnum.UNREADY)){
            roomInfo.setReadyNumbers(roomInfo.getReadyNumbers() - 1);
        }
//        RoomEntity roomEntity = TransformRoomInfo.roomInfoToRoom(roomInfo);
//        updateById(roomEntity);
        return roomInfo.getReadyNumbers();
    }

    @Override
    public int getCreateUserId(String roomId) {
        RoomEntity byId = getById(roomId);
        return byId.getCreateUserId();
    }

    @Override
    public Map<String, Object> pushCards(String roomId, PushCardVo pushCardVo) {
        Map<String, Object> map = new HashMap<>();
        RoomEntity byId = getById(roomId);
        RoomInfo roomInfo = TransformRoomInfo.roomToRoomInfo(byId);
        int curSeat = pushCardVo.getCurSeat();
        GameRole[] gameRoles = roomInfo.getGameRoles();
        GameRole gameRole = gameRoles[curSeat];
        //更新玩家状态为出牌了
        UserStatus userStatus = gameRole.getUserStatus();
        userStatus.setStatus(UserStatusEnum.PLAYED);

        //更新玩家手牌
        updateUserCards(roomInfo, pushCardVo.getCurCardList(), curSeat);
        int a = myTeamEndNumber(curSeat,roomInfo);
        int b = otherTeamEndNumber(curSeat, roomInfo);

        List<Integer> userCards = gameRole.getUserCards();
        pushCardVo.setPreUserCards(userCards);
        //玩家手牌出完
        if(userCards.size() == 0){
            map.put("isEnd", true);
            userStatus.setStatus(UserStatusEnum.END);
            List<Integer> data = new ArrayList<>();
            data.add(a + b + 1);//设置走完次序
            userStatus.setData(data);
        }else {
            userStatus.setData(pushCardVo.getCurCardList());
        }
        //更新当前牌面分数
        CardService cardService = CardService.getInstance();
        int points = cardService.getCurCardsPoints(pushCardVo.getCurCardList());
        roomInfo.setCurPoints(roomInfo.getCurPoints() + points);

        RoomEntity roomEntity = TransformRoomInfo.roomInfoToRoom(roomInfo);
        updateById(roomEntity);
        int nextUser = (curSeat + 1) % 4;
        if(gameRoles[nextUser].getUserStatus().getStatus().equals(UserStatusEnum.END)){
            map.put("myStatus", "END");
        }else{
            gameRoles[nextUser].getUserStatus().setStatus(UserStatusEnum.PLAYING);
            map.put("myStatus", "PLAYING");
        }
        //判断游戏是否结束
        if(b == 2){
            //对家走完，游戏结束
            map.put("myStatus", "OVER");
            //将牌面分数累计到当前玩家
            int panPoints = addCurPointsToUser(curSeat, roomInfo);
            map.put("curUserPanPoints", panPoints);
            userStatus.setStatus(UserStatusEnum.END);
            List<Integer> data = new ArrayList<>();
            data.add(a + b + 1);//设置走完次序
            userStatus.setData(data);

            int seat = (curSeat + 2) % 4;
            UserStatus userStatus1 = gameRoles[seat].getUserStatus();
            if(!userStatus1.getStatus().equals(UserStatusEnum.END)) {
                userStatus1.setStatus(UserStatusEnum.END);
                List<Integer> data1 = new ArrayList<>();
                data1.add(a + b + 2);//设置走完次序
                userStatus1.setData(data1);
            }
            panGameOver();
        }
        map.put("points", roomInfo.getCurPoints());
        return map;
    }

    private int findNextUser(Integer curSeat, RoomInfo roomInfo) {
        GameRole[] gameRoles = roomInfo.getGameRoles();
        for(int i = curSeat + 1; i < curSeat + 4; i++){
            int seat = i % 4;
            if(!gameRoles[seat].getUserStatus().equals(UserStatusEnum.END))return seat;
        }
        return -1;
    }

    private void panGameOver() {

    }

    private int addCurPointsToUser(int curSeat, RoomInfo roomInfo) {
        GameRole[] gameRoles = roomInfo.getGameRoles();
        GameRole gameRole1 = gameRoles[curSeat];
        GameRole gameRole2 = gameRoles[(curSeat + 2) % 4];
        gameRole1.setPanPoints(gameRole1.getPanPoints() + roomInfo.getCurPoints());
        gameRole2.setPanPoints(gameRole2.getPanPoints() + roomInfo.getCurPoints());
        roomInfo.setCurPoints(0);
        return gameRole1.getPanPoints();
    }

    private int otherTeamEndNumber(int seat, RoomInfo roomInfo) {
        GameRole[] gameRoles = roomInfo.getGameRoles();
        int ans = 0;
        ans += gameRoles[(seat + 1) % 4].getUserStatus().getStatus().equals(UserStatusEnum.END) ? 1 : 0;
        ans += gameRoles[(seat + 3) % 4].getUserStatus().getStatus().equals(UserStatusEnum.END) ? 1 : 0;
        return ans;
    }

    private int myTeamEndNumber(int seat, RoomInfo roomInfo) {
        GameRole[] gameRoles = roomInfo.getGameRoles();
        return gameRoles[(seat + 2) % 4].getUserStatus().getStatus().equals(UserStatusEnum.END) ? 1 : 0;
    }



    @Override
    public Map<String, Object> userReady(String roomId, Integer seat, Integer isReady) {
        Map<String, Object> map = new HashMap<>();
        RoomEntity byId = getById(roomId);
        RoomInfo roomInfo = TransformRoomInfo.roomToRoomInfo(byId);
        GameRole[] gameRoles = roomInfo.getGameRoles();
        GameRole gameRole = gameRoles[seat];
        //更新玩家状态为不要
        UserStatus userStatus = gameRole.getUserStatus();
        if(isReady == 1){
            userStatus.setStatus(UserStatusEnum.READY);
            roomInfo.setReadyNumbers(roomInfo.getReadyNumbers() + 1);
        }else {
            userStatus.setStatus(UserStatusEnum.UNREADY);
            roomInfo.setReadyNumbers(roomInfo.getReadyNumbers() - 1);
        }
        RoomEntity roomEntity = TransformRoomInfo.roomInfoToRoom(roomInfo);
        updateById(roomEntity);
        map.put("readyNumbers",roomEntity.getReadyNumbers());
        map.put("createUserId",roomEntity.getCreateUserId());
        return map;
    }

    @Override
    public Map<String, Object> userEnd(String roomId, PushCardVo pushCardVo) {
        Map<String, Object> map = new HashMap<>();
        //只需判断牌权转交问题
        RoomEntity byId = getById(roomId);
        RoomInfo roomInfo = TransformRoomInfo.roomToRoomInfo(byId);
        int curSeat = pushCardVo.getCurSeat();
        int nextSeat = (curSeat + 1) % 4;
        GameRole[] gameRoles = roomInfo.getGameRoles();
        GameRole gameRole1 = gameRoles[curSeat];
        int prePushSeat = pushCardVo.getPrePushSeat();
        if(curSeat == prePushSeat){
            //将牌权转移给队友
            pushCardVo.setPreSeat((curSeat + 1) % 4);
            pushCardVo.setPrePushSeat((curSeat + 2) % 4);
            pushCardVo.setMyStatus("PLAYING");
        }else {
            //牌权给下家
            pushCardVo.setPreSeat(curSeat);
            if(gameRoles[nextSeat].getUserStatus().getStatus().equals(UserStatusEnum.END)){
                pushCardVo.setMyStatus("END");
            }else{
                //每当牌权转移到下家时候都要判断是否结算分数
                if(nextSeat== prePushSeat){
                    int panPoints = addCurPointsToUser(nextSeat, roomInfo);
                    map.put("curUserPanPoints", panPoints);
                    pushCardVo.setPoints(0);
                }
                pushCardVo.setMyStatus("PLAYING");
            }
        }
        pushCardVo.setPreStatus("END");
        RoomEntity roomEntity = TransformRoomInfo.roomInfoToRoom(roomInfo);
        updateById(roomEntity);
        return map;
    }

    @Override
    public CleanPanVo panGameOver(String roomId) {
        CleanPanVo cleanPanVo = new CleanPanVo();
        List<Integer> ids = new ArrayList<>();
        for(int i = 0; i < 4; i++)ids.add(-1);
        RoomEntity byId = getById(roomId);
        RoomInfo roomInfo = TransformRoomInfo.roomToRoomInfo(byId);
        GameRole[] gameRoles = roomInfo.getGameRoles();
        List<PanGameInfo> panGameInfos = new ArrayList<>();
        for(int i = 0; i < 2; i++){
            panGameInfos.add(new PanGameInfo());
        }
        //取得出牌完顺序
        for(int i = 0; i < gameRoles.length; i++){
            GameRole gameRole = gameRoles[i];
            List<Integer> data = gameRole.getUserStatus().getData();
            int index = data.get(0);
            ids.set(index - 1, i);
        }
        int i = ids.get(0) % 2;
        if(ids.get(1) % 2 == i) {
            panGameInfos.get(i).setTeamPoints(80);
            panGameInfos.get((i + 1) % 2).setTeamPoints(-80);
        }else if(ids.get(2) % 2 == i) {
            panGameInfos.get(i).setTeamPoints(40);
            panGameInfos.get((i + 1) % 2).setTeamPoints(-40);
        }else if(ids.get(3) % 2 == i) {
            panGameInfos.get(i).setTeamPoints(0);
            panGameInfos.get((i + 1) % 2).setTeamPoints(0);
        }
        for(i = 0; i < 2; i++){
            panGameInfos.get(i).setPoints(gameRoles[i].getPanPoints());
            panGameInfos.get(i).setTotal(panGameInfos.get(i).getPoints() + panGameInfos.get(i).getTeamPoints());
            panGameInfos.get(i).setJuPoints(gameRoles[i].getJuPoints() + panGameInfos.get(i).getTotal());
        }
        roomInfo.setReadyNumbers(0);
        //更新玩家信息
        boolean isJuGameOver = false;
        for(i = 0; i < 4; i++){
            GameRole gameRole = gameRoles[i];
            gameRole.setJuPoints(panGameInfos.get(i % 2).getJuPoints());
            if(gameRole.getJuPoints() >= roomInfo.getScoreNumbers())isJuGameOver = true;
            gameRole.setPanPoints(0);
            gameRole.getUserStatus().setStatus(UserStatusEnum.UNREADY);
            gameRole.setUserCards(null);
        }
        //此局游戏结束
        if(isJuGameOver){
            for(i = 0; i < 4; i++){
                GameRole gameRole = gameRoles[i];
                gameRole.setTotalPoints(gameRole.getTotalPoints() + gameRole.getJuPoints());
                gameRole.setJuPoints(0);
            }
            roomInfo.setCurrentNumbers(roomInfo.getCurrentNumbers() + 1);
            if(roomInfo.getCurrentNumbers() > roomInfo.getGameNumbers()){
//                cleanPanVo.setPanGameInfos();
            }
        }
        for(i = 0; i < 4; i++){
            ids.set(i, gameRoles[ids.get(i)].getUserId());
        }
        List<UserEntity> userEntities = userService.listByIds(ids);
        cleanPanVo.setUsers(userEntities);
        cleanPanVo.setPanGameInfos(panGameInfos);
        RoomEntity roomEntity = TransformRoomInfo.roomInfoToRoom(roomInfo);
        updateById(roomEntity);
        System.out.println(roomInfo);
        return cleanPanVo;
    }

    @Override
    public Map<String, Object> newUserJoinRoom(String roomId, String userId) {
        Map<String, Object> map = new HashMap<>();
        RoomEntity byId = getById(roomId);
        RoomInfo roomInfo = TransformRoomInfo.roomToRoomInfo(byId);
        GameRole[] gameRoles = roomInfo.getGameRoles();
        int i = 0;
        for(; i < 4; i++){
            if(gameRoles[i] != null && (gameRoles[i].getUserId()+ "").equals(userId))break;
        }
        map.put("seat", i);
        map.put("userInfo", gameRoles[i]);
        return map;
    }

    @Override
    public List<List<Integer>> prompt(String roomId, PushCardVo pushCardVo) {
        RoomEntity byId = getById(roomId);
        RoomInfo roomInfo = TransformRoomInfo.roomToRoomInfo(byId);
        int curSeat = pushCardVo.getCurSeat();
        List<Integer> userCards = roomInfo.getGameRoles()[curSeat].getUserCards();
        List<Integer> preCardList = pushCardVo.getPreCardList();
        CardService cardService = CardService.getInstance();
        List<List<Integer>> ans = cardService.prompt(userCards, preCardList);
        return ans;
    }

    @Override
    public Map<String, Object> passCards(String roomId, PushCardVo pushCardVo) {
        Map<String, Object> map = new HashMap<>();
        RoomEntity byId = getById(roomId);
        RoomInfo roomInfo = TransformRoomInfo.roomToRoomInfo(byId);
        int curSeat = pushCardVo.getCurSeat();
        GameRole[] gameRoles = roomInfo.getGameRoles();
        GameRole gameRole1 = gameRoles[curSeat];
        //更新玩家状态为不要
        UserStatus userStatus = gameRole1.getUserStatus();
        userStatus.setStatus(UserStatusEnum.PASS);
        pushCardVo.setPreSeat(curSeat);
        pushCardVo.setPreStatus("PASS");

        int a = myTeamEndNumber(curSeat, roomInfo);
        int b = otherTeamEndNumber(curSeat, roomInfo);
        //更新下家状态
        int nextSeat = (curSeat + 1) % 4;
        GameRole gameRole2 = gameRoles[nextSeat];
        int prePushSeat = pushCardVo.getPrePushSeat();
        //对于上家不要，先判断游戏是否结束，然后再判断下家是否需要更新分数以及是否需要出牌
        if(b == 2){
            if(a == 1) {//游戏结束
                pushCardVo.setMyStatus("OVER");
                panGameOver();
                //清算牌面分数
                int panPoints = addCurPointsToUser(nextSeat, roomInfo);
                map.put("curUserPanPoints", panPoints);
                pushCardVo.setPoints(0);
            }else{
                pushCardVo.setMyStatus("END");
            }
            userStatus.setStatus(UserStatusEnum.END);
            List<Integer> data = new ArrayList<>();
            data.add(a + b + 1);//设置走完次序
            userStatus.setData(data);
        }
        else {
            if (nextSeat == prePushSeat) {
                int panPoints = addCurPointsToUser(nextSeat, roomInfo);
                map.put("curUserPanPoints", panPoints);
                pushCardVo.setPoints(0);
            }
            if (gameRole2.getUserStatus().getStatus().equals(UserStatusEnum.END)) {
                pushCardVo.setMyStatus("END");
            } else {
                pushCardVo.setMyStatus("PLAYING");
            }
        }

        RoomEntity roomEntity = TransformRoomInfo.roomInfoToRoom(roomInfo);
        updateById(roomEntity);
        return map;
    }
}
