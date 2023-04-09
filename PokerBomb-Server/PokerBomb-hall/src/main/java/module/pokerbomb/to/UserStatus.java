package module.pokerbomb.to;

import lombok.Data;
import module.pokerbomb.enumclass.UserStatusEnum;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserStatus {
    private UserStatusEnum status;//-1:未准备，0:，1:准备，2:出牌中，3:pass，4:出牌了，5:已出完
    private List<Integer> data;
}
