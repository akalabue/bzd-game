package module.pokerbomb.enumclass;

public enum UserStatusEnum {
//    -1:未准备，0:，1:准备，2:出牌中，3:pass，4:出牌了，5:已出完
    OFF_LINE("离线"),
    UNREADY("未准备"),
    READY("准备"),
    PLAYING("出牌中"),
    PASS("不要"),
    PLAYED("出牌了"),
    END("所有牌出完或者结束状态");
    private String dec;
    UserStatusEnum(String dec){
        this.dec = dec;
    }
}
