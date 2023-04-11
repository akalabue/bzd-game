package module.pokerbomb.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import module.pokerbomb.dao.UserDao;
import module.pokerbomb.entity.UserEntity;
import module.pokerbomb.service.UserService;
import module.pokerbomb.utils.HttpClientUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Wrapper;

@Service("userService")
public class UserServiceImpl extends ServiceImpl<UserDao, UserEntity> implements UserService {

    @Autowired
    UserDao userDao;

    @Override
    public UserEntity login(Long id) {
        return this.getById(id);
    }

    @Override
    public UserEntity getByOpenid(String openid) {
        QueryWrapper<UserEntity> wrapper = new QueryWrapper<>();
        wrapper.eq("openid", openid);
        UserEntity userEntity = getOne(wrapper);
        return userEntity;
    }

    @Override
    public UserEntity login(String url, String nickName, String avatarUrl) {
        String doPost = HttpClientUtil.doPost(url);
        JSONObject jsonObject = JSON.parseObject(doPost);
        String openid = (String) jsonObject.get("openid");
        System.out.println("获取到的openid" + openid);
        UserEntity userEntity = userDao.findByOpenid(openid);
        if(userEntity == null){
            //新增一个用户
            userEntity = new UserEntity();
            userEntity.setNickName(nickName);
            userEntity.setAvatarUrl(avatarUrl);
            userEntity.setOpenid(openid);
            boolean ok = false;
            do{
                Integer userId = getValidUserId();
                System.out.println("生成的userId" + userId);
                userEntity.setUserId(userId);
                ok = save(userEntity);
            }while(!ok);
        }
        return userEntity;
    }

    private Integer getValidUserId() {
        int id = ((int)(Math.random() * 900000) + 100000);  // 100000 -- 999999
        return id;
    }
}
