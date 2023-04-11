package module.pokerbomb.dao;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import module.pokerbomb.entity.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserDao extends BaseMapper<UserEntity> {

    @Select("select * from user_info where openid = #{openid}")
    UserEntity findByOpenid(String openid);
}
