package module.pokerbomb.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("user_info")
public class UserEntity {
    private static final long serialVersionUID = 1L;

    @TableId
    private Integer userId;

    private String userName;

    private String userHeadUrl;

    private Integer userRoomCards;

    private Integer roomId;
}
