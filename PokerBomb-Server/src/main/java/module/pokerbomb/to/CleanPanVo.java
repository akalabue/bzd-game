package module.pokerbomb.to;

import lombok.Data;
import module.pokerbomb.entity.UserEntity;

import java.util.List;

@Data
public class CleanPanVo {
    private List<UserEntity> users;

    private List<PanGameInfo> panGameInfos;
}
