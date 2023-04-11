package module.pokerbomb.to;

import lombok.Data;
import module.pokerbomb.enumclass.UserStatusEnum;

import java.util.ArrayList;
import java.util.List;

@Data
public class PushCardVo {
    private List<Integer> preCardList = new ArrayList<>(); //上一手牌

    private Integer prePushSeat = 0; //上一手牌出牌位置

    private Integer preSeat = 0;  //前一个位置

    private List<Integer> preUserCards; //玩家出完牌后剩余牌张信息

    private String preStatus = "";

    private List<Integer> curCardList = new ArrayList<>(); //这一手牌

    private Integer curSeat = 0; //这一手牌出牌位置

    private Integer points = 0; //累计分数

    private String myStatus = "";

    private String type = "";
}
