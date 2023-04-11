package module.pokerbomb.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import module.pokerbomb.entity.RoomEntity;
import module.pokerbomb.entity.TestEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TestDao extends BaseMapper<TestEntity> {
}
