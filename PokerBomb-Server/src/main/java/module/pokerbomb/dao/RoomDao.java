package module.pokerbomb.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import module.pokerbomb.entity.RoomEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RoomDao extends BaseMapper<RoomEntity> {
}
