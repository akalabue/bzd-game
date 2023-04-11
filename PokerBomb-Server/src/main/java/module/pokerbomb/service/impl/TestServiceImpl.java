package module.pokerbomb.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import module.pokerbomb.dao.TestDao;
import module.pokerbomb.entity.TestEntity;
import module.pokerbomb.service.TestService;
import org.springframework.stereotype.Service;

@Service("testService")
public class TestServiceImpl extends ServiceImpl<TestDao, TestEntity> implements TestService {
}
