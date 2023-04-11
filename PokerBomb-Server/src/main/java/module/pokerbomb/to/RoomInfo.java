package module.pokerbomb.to;

import lombok.Data;

@Data
public class RoomInfo {
    private Integer roomId;

    private Integer createUserId;

    private Integer gameNumbers;

    private Integer currentNumbers;

    private Integer scoreNumbers;

    private Integer readyNumbers;

    private Integer curPoints;

    private GameRole[] gameRoles;
}
