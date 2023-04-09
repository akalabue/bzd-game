package module.pokerbomb.utils;

import com.alibaba.fastjson.JSON;
import module.pokerbomb.entity.RoomEntity;
import module.pokerbomb.to.GameRole;
import module.pokerbomb.to.RoomInfo;
import module.pokerbomb.to.UserStatus;

import java.security.PublicKey;
import java.util.List;

public class TransformRoomInfo {
    public static RoomInfo roomToRoomInfo(RoomEntity room){
        RoomInfo roomInfo = new RoomInfo();
        roomInfo.setRoomId(room.getRoomId());
        roomInfo.setCreateUserId(room.getCreateUserId());
        roomInfo.setCurrentNumbers(room.getCurrentNumbers());
        roomInfo.setGameNumbers(room.getGameNumbers());
        roomInfo.setScoreNumbers(room.getScoreNumbers());
        roomInfo.setReadyNumbers(room.getReadyNumbers());
        roomInfo.setCurPoints(room.getCurPoints());

        GameRole[] gameRoles = new GameRole[4];
        if(room.getUser0Id() != null){
            gameRoles[0] = new GameRole();
            gameRoles[0].setUserId(room.getUser0Id());
            gameRoles[0].setUserName(room.getUser0Name());
            gameRoles[0].setUserIcon(room.getUser0Icon());
            gameRoles[0].setTotalPoints(room.getUser0TotalPoints());
            gameRoles[0].setJuPoints(room.getUser0JuPoints());
            gameRoles[0].setPanPoints(room.getUser0PanPoints());
            gameRoles[0].setUserStatus(JSON.parseObject(room.getUser0Status(), UserStatus.class));
            gameRoles[0].setUserCards(JSON.parseObject(room.getUser0Cards(), List.class));

        }

        if(room.getUser1Id() != null){
            gameRoles[1] = new GameRole();
            gameRoles[1].setUserId(room.getUser1Id());
            gameRoles[1].setUserName(room.getUser1Name());
            gameRoles[1].setUserIcon(room.getUser1Icon());
            gameRoles[1].setTotalPoints(room.getUser1TotalPoints());
            gameRoles[1].setJuPoints(room.getUser1JuPoints());
            gameRoles[1].setPanPoints(room.getUser1PanPoints());
            gameRoles[1].setUserStatus(JSON.parseObject(room.getUser1Status(), UserStatus.class));
            gameRoles[1].setUserCards(JSON.parseObject(room.getUser1Cards(), List.class));
        }

        if(room.getUser2Id() != null){
            gameRoles[2] = new GameRole();
            gameRoles[2].setUserId(room.getUser2Id());
            gameRoles[2].setUserName(room.getUser2Name());
            gameRoles[2].setUserIcon(room.getUser2Icon());
            gameRoles[2].setTotalPoints(room.getUser2TotalPoints());
            gameRoles[2].setJuPoints(room.getUser2JuPoints());
            gameRoles[2].setPanPoints(room.getUser2PanPoints());
            gameRoles[2].setUserStatus(JSON.parseObject(room.getUser2Status(), UserStatus.class));
            gameRoles[2].setUserCards(JSON.parseObject(room.getUser2Cards(), List.class));
        }

        if(room.getUser3Id() != null){
            gameRoles[3] = new GameRole();
            gameRoles[3].setUserId(room.getUser3Id());
            gameRoles[3].setUserName(room.getUser3Name());
            gameRoles[3].setUserIcon(room.getUser3Icon());
            gameRoles[3].setTotalPoints(room.getUser3TotalPoints());
            gameRoles[3].setJuPoints(room.getUser3JuPoints());
            gameRoles[3].setPanPoints(room.getUser3PanPoints());
            gameRoles[3].setUserStatus(JSON.parseObject(room.getUser3Status(), UserStatus.class));
            gameRoles[3].setUserCards(JSON.parseObject(room.getUser3Cards(), List.class));
        }

        roomInfo.setGameRoles(gameRoles);
        return roomInfo;
    }

    public static RoomEntity roomInfoToRoom(RoomInfo roomInfo){
        RoomEntity room = new RoomEntity();
        room.setRoomId(roomInfo.getRoomId());
        room.setCreateUserId(roomInfo.getCreateUserId());
        room.setCurrentNumbers(roomInfo.getCurrentNumbers());
        room.setGameNumbers(roomInfo.getGameNumbers());
        room.setScoreNumbers(roomInfo.getScoreNumbers());
        room.setReadyNumbers(roomInfo.getReadyNumbers());
        room.setCurPoints(roomInfo.getCurPoints());
        GameRole[] gameRoles = roomInfo.getGameRoles();
        if(gameRoles[0] != null){
            room.setUser0Id(gameRoles[0].getUserId());
            room.setUser0Name(gameRoles[0].getUserName());
            room.setUser0Icon(gameRoles[0].getUserIcon());
            room.setUser0TotalPoints(gameRoles[0].getTotalPoints());
            room.setUser0JuPoints(gameRoles[0].getJuPoints());
            room.setUser0PanPoints(gameRoles[0].getPanPoints());
            room.setUser0Status(JSON.toJSONString(gameRoles[0].getUserStatus()));
            room.setUser0Cards(JSON.toJSONString(gameRoles[0].getUserCards()));
        }

        if(gameRoles[1] != null){
            room.setUser1Id(gameRoles[1].getUserId());
            room.setUser1Name(gameRoles[1].getUserName());
            room.setUser1Icon(gameRoles[1].getUserIcon());
            room.setUser1TotalPoints(gameRoles[1].getTotalPoints());
            room.setUser1JuPoints(gameRoles[1].getJuPoints());
            room.setUser1PanPoints(gameRoles[1].getPanPoints());
            room.setUser1Status(JSON.toJSONString(gameRoles[1].getUserStatus()));
            room.setUser1Cards(JSON.toJSONString(gameRoles[1].getUserCards()));
        }

        if(gameRoles[2] != null){
            room.setUser2Id(gameRoles[2].getUserId());
            room.setUser2Name(gameRoles[2].getUserName());
            room.setUser2Icon(gameRoles[2].getUserIcon());
            room.setUser2TotalPoints(gameRoles[2].getTotalPoints());
            room.setUser2JuPoints(gameRoles[2].getJuPoints());
            room.setUser2PanPoints(gameRoles[2].getPanPoints());
            room.setUser2Status(JSON.toJSONString(gameRoles[2].getUserStatus()));
            room.setUser2Cards(JSON.toJSONString(gameRoles[2].getUserCards()));
        }

        if(gameRoles[3] != null){
            room.setUser3Id(gameRoles[3].getUserId());
            room.setUser3Name(gameRoles[3].getUserName());
            room.setUser3Icon(gameRoles[3].getUserIcon());
            room.setUser3TotalPoints(gameRoles[3].getTotalPoints());
            room.setUser3JuPoints(gameRoles[3].getJuPoints());
            room.setUser3PanPoints(gameRoles[3].getPanPoints());
            room.setUser3Status(JSON.toJSONString(gameRoles[3].getUserStatus()));
            room.setUser3Cards(JSON.toJSONString(gameRoles[3].getUserCards()));
        }
        roomInfo.setGameRoles(gameRoles);
        return room;
    }
}
