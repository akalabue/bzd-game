package module.pokerbomb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PokerBombApplication {
    public static void main(String[] args){
        SpringApplication.run(PokerBombApplication.class, args);
        System.out.println("你好");
    }
}
