package module.pokerbomb.service;

import com.baomidou.mybatisplus.extension.service.IService;
import module.pokerbomb.entity.UserEntity;

public interface UserService extends IService<UserEntity> {
    UserEntity login(Long id);
}
