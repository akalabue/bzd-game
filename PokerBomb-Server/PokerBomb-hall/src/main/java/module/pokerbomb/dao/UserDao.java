package module.pokerbomb.dao;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import module.pokerbomb.entity.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDao extends BaseMapper<UserEntity> {
}
