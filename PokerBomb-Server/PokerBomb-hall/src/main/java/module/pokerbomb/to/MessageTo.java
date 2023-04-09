package module.pokerbomb.to;

import lombok.Data;

import java.util.HashMap;

@Data
public class MessageTo {
    private String type;

    private HashMap data = new HashMap();

    public MessageTo put(String key, Object value) {
        this.data.put(key, value);
        return this;
    }
}
