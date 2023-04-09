package module.pokerbomb.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("room_info")
public class RoomEntity {
    private static final long serialVersionUID = 1L;

    @TableId
    private Integer roomId;

    private Integer createUserId;

    private Integer gameNumbers;

    private Integer currentNumbers;

    private Integer scoreNumbers;

    private Integer readyNumbers;

    private Integer curPoints;

    private Integer user0Id;

    private String user0Name;

    private String user0Icon;

    private Integer user0TotalPoints;

    private Integer user0JuPoints;

    private Integer user0PanPoints;

    private String user0Status;

    private String user0Cards;

    private Integer user1Id;

    private String user1Name;

    private String user1Icon;

    private Integer user1TotalPoints;

    private Integer user1JuPoints;

    private Integer user1PanPoints;

    private String user1Status;

    private String user1Cards;

    private Integer user2Id;

    private String user2Name;

    private String user2Icon;

    private Integer user2TotalPoints;

    private Integer user2JuPoints;

    private Integer user2PanPoints;

    private String user2Status;

    private String user2Cards;

    private Integer user3Id;

    private String user3Name;

    private String user3Icon;

    private Integer user3TotalPoints;

    private Integer user3JuPoints;

    private Integer user3PanPoints;

    private String user3Status;

    private String user3Cards;
}
