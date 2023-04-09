import com.alibaba.fastjson.JSON;
import module.pokerbomb.enumclass.PokerType;
import module.pokerbomb.enumclass.UserStatusEnum;
import module.pokerbomb.service.TestService;
import module.pokerbomb.to.UserStatus;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

//@RunWith(SpringRunner.class)
//@SpringBootTest
public class MainTest {

    @Autowired
    TestService testService;

    @Test
    public void test1(){
        List<Integer> userCards = new ArrayList<>();
        for(int i = 0; i < 10; i++)userCards.add(i);
        userCards.add(1);
        userCards.add(1);
        userCards.add(1);
        List<Integer> pushCardList = new ArrayList<>();
        pushCardList.add(1);
        pushCardList.add(1);
        pushCardList.add(2);
        pushCardList.add(5);
        pushCardList.add(6);
        List<Integer> list = new ArrayList<>();
        Collections.sort(pushCardList);
        Collections.sort(userCards);
        for(int i = 0, j = 0; i < userCards.size(); i++){
            if(j < pushCardList.size() && userCards.get(i).equals(pushCardList.get(j))){
                j++;
            }else {
                list.add(userCards.get(i));
            }
        }
        System.out.println(list);
    }

    @Test
    public void test2(){
        UserStatus us = new UserStatus();
        System.out.println(us);
        us.setStatus(UserStatusEnum.UNREADY);
        System.out.println(us);
        String s = JSON.toJSONString(us);
        System.out.println(s);
        UserStatus status = JSON.parseObject(s, UserStatus.class);
        System.out.println(status);

    }

}

