package module.pokerbomb.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import module.pokerbomb.dao.UserDao;
import module.pokerbomb.entity.UserEntity;
import module.pokerbomb.service.UserService;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl extends ServiceImpl<UserDao, UserEntity> implements UserService {
    @Override
    public UserEntity login(Long id) {
        return this.getById(id);
    }
}
