package module.pokerbomb.to;

import lombok.Data;

import java.util.List;

@Data
public class GameRole {
    private Integer userId;

    private String userName;

    private String userIcon;

    private Integer totalPoints; //总分

    private Integer juPoints;  //局分

    private Integer panPoints; //盘分

    private UserStatus userStatus;

    private List<Integer> userCards;
}
