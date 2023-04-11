package module.pokerbomb.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import module.pokerbomb.entity.UserEntity;
import module.pokerbomb.service.UserService;
import module.pokerbomb.utils.HttpClientUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    private static final String WX_APPID = "wxf4e7ac548edcbaa7";
    private static final String WX_SECRET = "ae54d67569a788f56db9040b14637276";
    private static final String WX_URL = "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code";

    @Autowired
    private UserService userService;

    @PostMapping(value = "/wxlogin")
    public Object login(String code, String nickName, String avatarUrl){
        System.out.println("获取到的"+code+" "+nickName+" "+avatarUrl);
        if(code == null)return null;
        String url = String.format(WX_URL, WX_APPID, WX_SECRET, code);
        UserEntity loginUser = userService.login(url, nickName, avatarUrl);
        return loginUser;
    }

    @PostMapping(value = "/login")
    public Object login(String userid){
        UserEntity loginUser = userService.getById(userid);
        return loginUser;
    }
}
