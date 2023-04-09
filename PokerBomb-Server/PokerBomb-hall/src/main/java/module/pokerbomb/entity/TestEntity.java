package module.pokerbomb.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("test")
@Data
public class TestEntity {
    String cards;
}
