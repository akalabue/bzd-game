package module.pokerbomb.service;

import com.baomidou.mybatisplus.extension.service.IService;
import module.pokerbomb.entity.RoomEntity;
import module.pokerbomb.enumclass.UserStatusEnum;
import module.pokerbomb.to.CleanPanVo;
import module.pokerbomb.to.PushCardVo;
import module.pokerbomb.to.RoomInfo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface RoomService extends IService<RoomEntity> {

    int createRoom(HashMap data);

    Boolean addNewUser(Integer userId, Integer roomId);

    int updateUserPoints(Integer curSeat, String roomId);

    Map<String, Object> dealCards(String roomId, List<List<Integer>> cardList);

    void updateUserCards(RoomInfo roomInfo, List<Integer> pushCardList, Integer seat);

    int updateUserStatus(RoomInfo roomInfo, Integer curSeat, UserStatusEnum status, List<Integer> curCardList);

    int getCreateUserId(String roomId);

    Map<String, Object> pushCards(String roomId, PushCardVo pushCardVo);

    Map<String, Object> passCards(String roomId, PushCardVo pushCardVo);

    Map<String, Object> userReady(String roomId, Integer seat, Integer isReady);

    Map<String, Object> userEnd(String roomId, PushCardVo pushCardVo);

    CleanPanVo panGameOver(String roomId);

    Map<String, Object> newUserJoinRoom(String roomId, String userId);

    List<List<Integer>> prompt(String roomId, PushCardVo pushCardVo);
}
