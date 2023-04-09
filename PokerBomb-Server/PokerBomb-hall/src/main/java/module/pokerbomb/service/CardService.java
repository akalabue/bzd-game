package module.pokerbomb.service;

import module.pokerbomb.enumclass.PokerType;
import module.pokerbomb.to.BrandTypeVo;
import module.pokerbomb.to.PushCardVo;

import java.util.*;
import java.util.stream.Collectors;

public class CardService {
    private static volatile CardService cardService;

    private final List<Integer> cardList;

    public CardService(){
        this.cardList = new ArrayList<>();
        for(int i = 1; i <= 4; i++){
            for(int j = 3; j <= 15; j++){
                cardList.add(i * 100 + j);
                cardList.add(i * 100 + j);
            }
        }
        cardList.add(516);
        cardList.add(516);
        cardList.add(517);
        cardList.add(517);
    }

    public static CardService getInstance(){
        if(cardService == null){
            synchronized (CardService.class){
                if(cardService == null){
                    cardService = new CardService();
                }
            }
        }
        return cardService;
    }

    private void xipai(){
        int len = cardList.size();
        for(int i = len -1; i >= 0; i--){
            int random = (int)(Math.random() * (i + 1));
            int t3 = cardList.get(i);
            cardList.set(i, cardList.get(random));
            cardList.set(random, t3);
        }
    }

    public List<List<Integer>> fapai(){
        xipai();
        List<List<Integer>> res = new ArrayList<>();
        for(int i = 0; i < 4; i++){
            List<Integer> list = new ArrayList<>();
            for(int j = i * 27; j < i * 27 + 27; j++)list.add(cardList.get(j));
            Collections.sort(list, (o1, o2) -> {
                int a = (o1 % 100);
                int b = (o2 % 100);
                int c = o1 / 100;
                int d = o2 / 100;
                return a == b ? c - d : a - b;
            });
            res.add(list);
        }
        return res;
    }

    public String curCardListIsRight(PushCardVo pushCardVo){
        List<Integer> preCardList = new ArrayList<>(pushCardVo.getPreCardList());
        List<Integer> curCardList = new ArrayList<>(pushCardVo.getCurCardList());
        if(curCardList.size() == 0)return "wrong";
        BrandTypeVo brandTypeVo = decidePokerType(curCardList);
        PokerType curType = brandTypeVo.getPokerType();
        String ans = brandTypeVo.getBrandType();
        System.out.println("当前牌类型："+curType+"  " + ans);
        if (curType == PokerType.WRONG)return "wrong";
        if(pushCardVo.getPrePushSeat().equals(pushCardVo.getCurSeat()))return ans;//新的回合不用比较
        if(preCardList.size() == 0)return ans;
        BrandTypeVo brandTypeVo1 = decidePokerType(preCardList);
        PokerType preType = brandTypeVo1.getPokerType();
        System.out.println("上一手牌牌类型："+preType);
        boolean isRight = preType.compare(transformCardList(preCardList), transformCardList(curCardList), curType);
        if(isRight)return ans;
        else return "wrong";
    }

    private List<Integer> transformCardList(List<Integer> cardList){
        List<Integer> ans = new ArrayList<>();
        for(int i = 0; i < cardList.size(); i++){
            ans.add(cardList.get(i) % 100);
        }
        return ans;
    }

    private BrandTypeVo decidePokerType(List<Integer> list){
        BrandTypeVo brandTypeVo = new BrandTypeVo();

        List<Integer> cardsList = transformCardList(list);
        Collections.sort(cardsList);

        Map<Integer, Integer> map = new HashMap<>();
        int size = cardsList.size();
        for(int i = 0; i < cardsList.size(); i++){
            map.put(cardsList.get(i), map.getOrDefault(cardsList.get(i), 0) + 1);
        }
        
        //A
        if(size == 1){
            brandTypeVo.setBrandType(cardsList.get(0)+"");
            brandTypeVo.setPokerType(PokerType.A);
            return brandTypeVo;
        }
        
        //AA & AB
        if(size == 2){
            if(cardsList.get(0) == cardsList.get(1)) {
                if(cardsList.get(0).equals(16) || cardsList.get(0).equals(17))brandTypeVo.setBrandType("wangzha");
                else brandTypeVo.setBrandType("dui"+cardsList.get(0));
                brandTypeVo.setPokerType(PokerType.AA);
                return brandTypeVo;
            }
            else if(cardsList.get(0) >= 16 && cardsList.get(1) >= 16) {
                brandTypeVo.setBrandType("wangzha");
                brandTypeVo.setPokerType(PokerType.AB);
                return brandTypeVo;
            }
        }

        //wsk(5、10、k)
        if(size == 3){
            if((cardsList.get(0) == 5) && (cardsList.get(1) == 10) && (cardsList.get(2) == 13)){
                if((list.get(0) / 100 == list.get(1) / 100) && (list.get(0) / 100 == list.get(2) / 100)){
                    brandTypeVo.setBrandType("WSK");
                    brandTypeVo.setPokerType(PokerType.WSK);
                    return brandTypeVo;
                }else {
                    brandTypeVo.setBrandType("wsk");
                    brandTypeVo.setPokerType(PokerType.wsk);
                    return brandTypeVo;
                }
            }
        }

        
        //AAB
        if(size == 3){
            int i;
            for(i = 0; i < 3; i++){
                if(cardsList.get(i) != 16 && cardsList.get(i) != 17)break;
            }
            if(i == 3) {
                brandTypeVo.setBrandType("wangzha");
                brandTypeVo.setPokerType(PokerType.AAB);
                return brandTypeVo;
            }
        }
        
        //GOD
        if(size == 4){
            int i;
            for(i = 0; i < 4; i++){
                if(cardsList.get(i) != 16 && cardsList.get(i) != 17)break;
            }
            if(i == 4) {
                brandTypeVo.setBrandType("wangzha");
                brandTypeVo.setPokerType(PokerType.GOD);
                return brandTypeVo;
            }
        }
        
        //AAAA
        if(size >= 4 && map.size() == 1){
            brandTypeVo.setBrandType("zhadan");
            brandTypeVo.setPokerType(PokerType.AAAA);
            return brandTypeVo;
        }
        
        Set<Integer> set = map.keySet();
        List<Integer> t1 = new ArrayList<>();
        List<Integer> t2 = new ArrayList<>();
        List<Integer> t3 = new ArrayList<>();
        for (Integer i : set) {
            if(map.get(i) == 1)t1.add(i);
            if(map.get(i) == 2)t2.add(i);
            if(map.get(i) >= 3)t3.add(i);
        }

        //ABCDEF
        if(t1.size() == size && t1.size() >= 5){
            if(t1.get(t1.size() - 1) <= 14){  //不包括2的顺子
                boolean lianPai = isLianPai(t1, 0, t1.size());
                if(lianPai) {
                    brandTypeVo.setBrandType("shunzi");
                    brandTypeVo.setPokerType(PokerType.ABCDEF);
                    return brandTypeVo;
                }
            }
            if(t1.get(t1.size() - 1) == 15 && t1.get(0) == 3){
                if(t1.get(t1.size() - 2) == 14){  //A、2开头的顺子
                    if(isLianPai(t1, 0, t1.size() - 2)) {
                        brandTypeVo.setBrandType("shunzi");
                        brandTypeVo.setPokerType(PokerType.ABCDEF);
                        return brandTypeVo;
                    }
                }
                //A开头的顺子
                else if(isLianPai(t1, 0, t1.size() - 1)) {
                    brandTypeVo.setBrandType("shunzi");
                    brandTypeVo.setPokerType(PokerType.ABCDEF);
                    return brandTypeVo;
                }
            }
        }

        //AABB
        if(t2.size() > 1 && t2.size() == size / 2){
            int i = 1;
            for(; i < t2.size(); i++){
                if(t2.get(i) - t2.get(i - 1) != 1)break;
            }
            if(i == t2.size()){
                if(t1.size() == 0 || (t1.size() == 1 && t1.get(0) == 16 && t2.get(i - 1) == 15)) {
                    brandTypeVo.setBrandType("liandui");
                    brandTypeVo.setPokerType(PokerType.AABB);
                    return brandTypeVo;
                }
            }
        }
        
        //AAA
        if(t3.size() == 1 && size <= 5){
            list.clear();
            for(int i = 0; i < 3; i++)list.add(t3.get(0));
            brandTypeVo.setBrandType("tuple" + list.get(0));
            brandTypeVo.setPokerType(PokerType.AAA);
            return brandTypeVo;
        }
        
        //AAABBB
        if(t3.size() > 1 && size <= t3.size() * 5){
            for(int i = 1; i < t3.size(); i++){
                if(t3.get(i) - t3.get(i - 1) != 1)break;
                else if(i == t3.size() - 1){
                    list.clear();
                    for(int j : t3){
                        for(int k = 0; k < 3; k++){
                            list.add(j);
                        }
                    }
                    brandTypeVo.setBrandType("feiji");
                    brandTypeVo.setPokerType(PokerType.AAABBB);
                    return brandTypeVo;
                }
            }
        }
        brandTypeVo.setBrandType("wrong");
        brandTypeVo.setPokerType(PokerType.WRONG);
        return brandTypeVo;
    }

    public int getCurCardsPoints(List<Integer> cardList) {
        int points = 0;
        for(int i = 0; i < cardList.size(); i++){
            switch (cardList.get(i) % 100){
                case 5:
                    points += 5;
                    break;
                case 10:
                    points += 10;
                    break;
                case 13:
                    points += 10;
                    break;
            }
        }
        return points;
    }

    public boolean isLianPai(List<Integer> list, int start, int end){
        for(int i = start + 1; i < end; i++){
            if(list.get(i) != list.get(i - 1) + 1)break;
            if(i == end - 1)return true;
        }
        return false;
    }

    public List<List<Integer>> prompt(List<Integer> userCards, List<Integer> preCardList) {
        List<List<Integer>> ans = new ArrayList<>();
        PokerType prePokerType = decidePokerType(preCardList).getPokerType();
//        List<Integer> userCards = transformCardList(userCardList);
        List<Integer> preCards = transformCardList(preCardList);
        if(prePokerType.equals(PokerType.A)){
            ans = prompt_A(userCards, preCards);
        }else if(prePokerType.equals(PokerType.AA)){
            ans = prompt_AA(userCards, preCards);
        }else if(prePokerType.equals(PokerType.AAA)){
            ans = prompt_AAA(userCards, preCards);
        }else if(prePokerType.equals(PokerType.ABCDEF)){
            ans = prompt_ABCDEF(userCards, preCards);
        }else if(prePokerType.equals(PokerType.AABB)){
            ans = prompt_AABB(userCards, preCards);
        }else if(prePokerType.equals(PokerType.AAABBB)){
            ans = prompt_AAABBB(userCards, preCards);
        }else if(prePokerType.equals(PokerType.wsk)){
            ans = prompt_wsk(userCards, preCards);
        }else if(prePokerType.equals(PokerType.WSK)){
            ans = prompt_WSK(userCards, preCards);
        }else if(prePokerType.equals(PokerType.AB)){
            ans = prompt_AB(userCards, preCards);
        }else if(prePokerType.equals(PokerType.AAB)){
            ans = prompt_AAB(userCards, preCards);
        }else if(prePokerType.equals(PokerType.AAAA)){
            ans = prompt_AAAA(userCards, preCards);
        }
        return ans;
    }

    private List<List<Integer>> prompt_A(List<Integer> userCardsList, List<Integer> preCards) {
        List<Integer> userCards = transformCardList(userCardsList);
        List<List<Integer>> ans = new ArrayList<>();
        Map<Integer, Integer> map = new HashMap<>();
        for(int i = 0; i < userCards.size(); i++){
            map.put(userCards.get(i), map.getOrDefault(userCards.get(i), 0) + 1);
        }

        //寻找单张
        for(int i = 0; i < userCards.size(); i++){
            int card = userCards.get(i);
            if(map.get(card) == 1 && card > preCards.get(0)){
                List<Integer> tmp = new ArrayList<>();
                tmp.add(i);
                ans.add(tmp);
            }
        }

        //寻找炸弹
        List<List<Integer>> zd = findZD(userCardsList);
        ans.addAll(zd);

        //拆对子或者三带或者炸弹
        for (int card : map.keySet()) {
            if(map.get(card) > 1 && card > preCards.get(0)){
                List<Integer> tmp = new ArrayList<>();
                for(int i = 0; i < userCards.size(); i++){
                    if(userCards.get(i) == card){
                        tmp.add(i);
                        break;
                    }
                }
                ans.add(tmp);
            }
        }
        return ans;
    }

    private List<List<Integer>> prompt_AA(List<Integer> userCardsList, List<Integer> preCards) {
        List<Integer> userCards = transformCardList(userCardsList);
        List<List<Integer>> ans = new ArrayList<>();
        Map<Integer, Integer> map = new HashMap<>();
        for(int i = 0; i < userCards.size(); i++){
            map.put(userCards.get(i), map.getOrDefault(userCards.get(i), 0) + 1);
        }

        if(preCards.get(0) < 16){//寻找对子
            for (int card : map.keySet()) {
                if (map.get(card) == 2 && card > preCards.get(0) && card < 16) {
                    List<Integer> tmp = new ArrayList<>();
                    for (int i = 0; i < userCards.size(); i++) {
                        if (userCards.get(i) == card) {
                            tmp.add(i);
                        }
                    }
                    ans.add(tmp);
                }
            }

            //寻找炸弹
            List<List<Integer>> zd = findZD(userCardsList);
            ans.addAll(zd);

            //寻找比它大的
            for (int card : map.keySet()) {
                if (map.get(card) > 2 && card > preCards.get(0)) {
                    List<Integer> tmp = new ArrayList<>();
                    for (int i = 0; i < userCards.size(); i++) {
                        if (userCards.get(i) == card) {
                            tmp.add(i);
                            tmp.add(i + 1);
                            break;
                        }
                    }
                    ans.add(tmp);
                }
            }
        }
        else if(preCards.get(0) == 16){
            //寻找俩大王
            int len = userCards.size();
            if(len >= 2 && userCards.get(len - 1) == 17 && userCards.get(len - 2) == 17){
                List<Integer> tmp = new ArrayList<>();
                tmp.add(len - 2);
                tmp.add(len - 1);
                ans.add(tmp);
            }
            //寻找五炸及以上炸弹
            List<List<Integer>> tmp = findZD("2WZ", userCards);
            ans.addAll(tmp);
        }
        else if(preCards.get(0) == 17){
            //寻找五炸及以上炸弹
            List<List<Integer>> tmp = findZD("2WZ", userCards);
            ans.addAll(tmp);
        }
        return ans;
    }

    private List<List<Integer>> prompt_AAA(List<Integer> userCardsList, List<Integer> preCards) {
        List<Integer> userCards = transformCardList(userCardsList);
        List<List<Integer>> ans = new ArrayList<>();
        Map<Integer, Integer> map = new HashMap<>();
        for(int i = 0; i < userCards.size(); i++){
            map.put(userCards.get(i), map.getOrDefault(userCards.get(i), 0) + 1);
        }

        //寻找三带
        for (int card : map.keySet()) {
            if(map.get(card) == 3 && card > preCards.get(0) && card < 16){
                List<Integer> tmp = new ArrayList<>();
                for(int i = 0; i < userCards.size(); i++){
                    if(userCards.get(i) == card){
                        tmp.add(i);
                    }
                }
                ans.add(tmp);
            }
        }

        //寻找炸弹
        List<List<Integer>> zd = findZD(userCardsList);
        ans.addAll(zd);

        //寻找比它大的
        for (int card : map.keySet()) {
            if(map.get(card) > 3 && card > preCards.get(0) && card < 16){
                List<Integer> tmp = new ArrayList<>();
                for(int i = 0; i < userCards.size(); i++){
                    if(userCards.get(i) == card){
                        tmp.add(i);
                        tmp.add(i + 1);
                        tmp.add(i + 2);
                        break;
                    }
                }
                ans.add(tmp);
            }
        }
        return ans;
    }

    private List<List<Integer>> prompt_ABCDEF(List<Integer> userCardsList, List<Integer> preCards) {
        List<Integer> userCards = transformCardList(userCardsList);
        List<List<Integer>> ans = new ArrayList<>();
        Map<Integer, Integer> map = new HashMap<>();
        for(int i = 0; i < userCards.size(); i++){
            map.put(userCards.get(i), map.getOrDefault(userCards.get(i), 0) + 1);
        }

        //寻找顺子不允许拆炸弹
        int l = preCards.get(0), r = preCards.get(preCards.size() - 1), len = preCards.size();
        //不包含2的顺子
        if(preCards.get(len - 1) < 15){
            for(int i = l + 1, j = i + len - 1; j < 15; i++, j++){
                boolean flag = true;
                for(int k = i; k <= j; k++){
                    if(!map.containsKey(k) || map.get(k) >= 4)flag = false;
                }
                if(flag){
                    int k = i;
                    List<Integer> tmp = new ArrayList<>();
                    for(int index = 0; index < userCards.size() && k <= j; index++){
                        if(userCards.get(index) == k){
                            tmp.add(index);
                            k++;
                        }
                    }
                    ans.add(tmp);
                }
            }
        }

        //寻找炸弹
        List<List<Integer>> zd = findZD(userCardsList);
        ans.addAll(zd);

        //不包含2的顺子允许拆炸弹
        if(preCards.get(len - 1) < 15){
            for(int i = l + 1, j = i + len - 1; j < 15; i++, j++){
                boolean flag = true;
                boolean flag2 = false;
                for(int k = i; k <= j; k++){
                    if(!map.containsKey(k))flag = false;
                    else if(map.get(k) >= 4)flag2 = true;
                }
                if(flag && flag2){
                    int k = i;
                    List<Integer> tmp = new ArrayList<>();
                    for(int index = 0; index < userCards.size() && k <= j; index++){
                        if(userCards.get(index) == k){
                            tmp.add(index);
                            k++;
                        }
                    }
                    ans.add(tmp);
                }
            }
        }
        return ans;
    }

    private List<List<Integer>> prompt_AABB(List<Integer> userCardsList, List<Integer> preCards) {
        List<Integer> userCards = transformCardList(userCardsList);
        List<List<Integer>> ans = new ArrayList<>();
        Map<Integer, Integer> map = new HashMap<>();
        for(int i = 0; i < userCards.size(); i++){
            map.put(userCards.get(i), map.getOrDefault(userCards.get(i), 0) + 1);
        }

        //寻找连对不允许拆炸弹
        int l = preCards.get(0), r = preCards.get(preCards.size() - 1), len = preCards.size();
        if(len % 2 == 0){
            len /= 2;
            for(int i = l + 1, j = i + len - 1; j < 17; i++, j++){
                boolean flag = true;
                for(int k = i; k <= j; k++){
                    if(!map.containsKey(k))flag = false;
                    else if((k < 16 && map.get(k) < 2) || map.get(k) >= 4)flag = false;
                }
                if(flag){
                    int k = i;
                    List<Integer> tmp = new ArrayList<>();
                    for(int index = 0; index < userCards.size() && k <= j; index++){
                        if(userCards.get(index) == k){
                            if(k < 16){
                                tmp.add(index);
                                tmp.add(index + 1);
                            }else {
                                //小王只要加一次
                                tmp.add(index);
                            }
                            k++;
                        }
                    }
                    ans.add(tmp);
                }
            }
        }

        //寻找炸弹
        List<List<Integer>> zd = findZD(userCardsList);
        ans.addAll(zd);

        //寻找连对允许拆炸弹
        if(len == preCards.size() / 2){
            for(int i = l + 1, j = i + len - 1; j < 17; i++, j++){
                boolean flag = true;
                boolean flag2 = false;
                for(int k = i; k <= j; k++){
                    if(!map.containsKey(k))flag = false;
                    else if((k < 16 && map.get(k) < 2))flag = false;
                    if(map.containsKey(k) && map.get(k) >= 4)flag2 = true;
                }
                if(flag && flag2){
                    int k = i;
                    List<Integer> tmp = new ArrayList<>();
                    for(int index = 0; index < userCards.size() && k <= j; index++){
                        if(userCards.get(index) == k){
                            if(k < 16){
                                tmp.add(index);
                                tmp.add(index + 1);
                            }else {
                                //小王只要加一次
                                tmp.add(index);
                            }
                            k++;
                        }
                    }
                    ans.add(tmp);
                }
            }
        }
        return ans;
    }

    private List<List<Integer>> prompt_AAABBB(List<Integer> userCardsList, List<Integer> preCards) {
        List<Integer> userCards = transformCardList(userCardsList);
        List<List<Integer>> ans = new ArrayList<>();
        Map<Integer, Integer> map = new HashMap<>();
        for(int i = 0; i < userCards.size(); i++){
            map.put(userCards.get(i), map.getOrDefault(userCards.get(i), 0) + 1);
        }

        //寻找飞机不允许拆炸弹
        int l = preCards.get(0), r = preCards.get(preCards.size() - 1), len = preCards.size();
        len /= 3;
        for(int i = l + 1, j = i + len - 1; j < 16; i++, j++){
            boolean flag = true;
            for(int k = i; k <= j; k++){
                if(!map.containsKey(k) || map.get(k) != 3)flag = false;
            }
            if(flag){
                int k = i;
                List<Integer> tmp = new ArrayList<>();
                for(int index = 0; index < userCards.size() && k <= j; index++){
                    if(userCards.get(index) == k){
                        tmp.add(index);
                        tmp.add(index + 1);
                        tmp.add(index + 2);
                        k++;
                    }
                }
                ans.add(tmp);
            }
        }

        //寻找炸弹
        List<List<Integer>> zd = findZD(userCardsList);
        ans.addAll(zd);

        //寻找飞机允许拆炸弹
        for(int i = l + 1, j = i + len - 1; j < 16; i++, j++){
            boolean flag = true;
            boolean flag2 = false;
            for(int k = i; k <= j; k++){
                if(!map.containsKey(k) || map.get(k) < 3)flag = false;
                if(map.containsKey(k) && map.get(k) >= 4)flag2 = true;
            }
            if(flag && flag2){
                int k = i;
                List<Integer> tmp = new ArrayList<>();
                for(int index = 0; index < userCards.size() && k <= j; index++){
                    if(userCards.get(index) == k){
                        tmp.add(index);
                        tmp.add(index + 1);
                        tmp.add(index + 2);
                        k++;
                    }
                }
                ans.add(tmp);
            }
        }
        return ans;
    }

    private List<List<Integer>> prompt_wsk(List<Integer> userCards, List<Integer> preCards) {
        List<List<Integer>> ans = findZD("wsk", userCards);
        return ans;
    }

    private List<List<Integer>> prompt_WSK(List<Integer> userCards, List<Integer> preCards) {
        List<List<Integer>> ans = findZD("WSK", userCards);
        return ans;
    }

    private List<List<Integer>> prompt_AB(List<Integer> userCards, List<Integer> preCards) {
        List<List<Integer>> ans = findZD("2WZ", userCards);
        return ans;
    }

    private List<List<Integer>> prompt_AAB(List<Integer> userCards, List<Integer> preCards) {
        List<List<Integer>> ans = findZD("3WZ", userCards);
        return ans;
    }
    private List<List<Integer>> prompt_AAAA(List<Integer> userCards, List<Integer> preCards) {
        int len = preCards.size();
        String type = len + "ZD";
        List<List<Integer>> tm = findZD(type, userCards);
        userCards = transformCardList(userCards);
        List<List<Integer>> ans = new ArrayList<>();
        Map<Integer, Integer> map = new HashMap<>();
        for(int i = 0; i < userCards.size(); i++){
            map.put(userCards.get(i), map.getOrDefault(userCards.get(i), 0) + 1);
        }
        for(int card: map.keySet()){
            if(card > preCards.get(0) && map.get(card) == len){
                List<Integer> tmp = new ArrayList<>();
                for(int i = 0; i <userCards.size(); i++){
                    if(userCards.get(i) == card)tmp.add(i);
                }
                ans.add(tmp);
            }
        }
        ans.addAll(tm);
        return ans;
    }

    private List<List<Integer>> findZD(List<Integer> userCards){
        List<List<Integer>> ans = new ArrayList<>();
        List<List<Integer>> wsk = findWsk(userCards);
        ans.addAll(wsk);
        List<List<Integer>> wsk1 = findWSK(userCards);
        ans.addAll(wsk1);
        userCards = transformCardList(userCards);
        List<List<Integer>> list1 = find4ZD(userCards);
        ans.addAll(list1);
        List<List<Integer>> list2 = find5ZD(userCards);
        ans.addAll(list2);
        List<List<Integer>> list3 = find2WZ(userCards);
        ans.addAll(list3);
        List<List<Integer>> list4 = find6ZD(userCards);
        ans.addAll(list4);
        List<List<Integer>> list5 = find3WZ(userCards);
        ans.addAll(list5);
        List<List<Integer>> list6 = find7ZD(userCards);
        ans.addAll(list6);
        List<List<Integer>> list7 = find8ZD(userCards);
        ans.addAll(list7);
        List<List<Integer>> list8 = find4WZ(userCards);
        ans.addAll(list8);
        return ans;
    }
    private List<List<Integer>> findZD(String type, List<Integer> userCards0){
        List<List<Integer>> ans = new ArrayList<>();
        List<Integer>userCards = transformCardList(userCards0);
        List<List<Integer>> list8 = find4WZ(userCards);
        ans.addAll(list8);
        if(type.equals("8ZD"))return ans;
        List<List<Integer>> list7 = find8ZD(userCards);
        ans.addAll(list7);
        if(type.equals("7ZD"))return ans;
        List<List<Integer>> list6 = find7ZD(userCards);
        ans.addAll(list6);
        if(type.equals("3WZ"))return ans;
        List<List<Integer>> list5 = find3WZ(userCards);
        ans.addAll(list5);
        if(type.equals("6ZD"))return ans;
        List<List<Integer>> list4 = find6ZD(userCards);
        ans.addAll(list4);
        if(type.equals("5ZD"))return ans;
        List<List<Integer>> list3 = find5ZD(userCards);
        ans.addAll(list3);
        if(type.equals("2WZ"))return ans;
        List<List<Integer>> list2 = find2WZ(userCards);
        ans.addAll(list2);
        if(type.equals("4ZD"))return ans;
        List<List<Integer>> list1 = find4ZD(userCards);
        ans.addAll(list1);
        if(type.equals("WSK"))return ans;
        List<List<Integer>> wsk1 = findWSK(userCards0);
        ans.addAll(wsk1);
        return ans;
    }

    private List<List<Integer>> findWsk(List<Integer> userCards){
        //找出一个副五十K就行
        List<List<Integer>> ans = new ArrayList<>();
        int c5 = 0, c10 = 0, ck = 0, size = userCards.size();
        for(int i = 0; i < size; i++){
            if(userCards.get(i) % 100 == 5)c5++;
            if(userCards.get(i) % 100 == 10)c10++;
            if(userCards.get(i) % 100 == 13)ck++;
        }
        int min = Math.min(Math.min(c5, c10), ck);
        if(min == 0)return ans;
        boolean flag = false;
        for(int i = 0; i < size; i++){
            int t5 = userCards.get(i);
            if(flag)break;
            if(t5 % 100 == 5){
                for(int j = i + 1; j < size; j++){
                    int t10 = userCards.get(j) % 100;
                    if(flag)break;
                    if(t10 == 10){
                        for(int k = j + 1; j < size; j++){
                            int tk = userCards.get(k);
                            if(tk % 100 == 13){
                                if(flag)break;
                                if(!(t5 / 100 == t10 /100 && t5 /100 == tk /100)){
                                    List<Integer> tmp = new ArrayList<>();
                                    tmp.add(i);
                                    tmp.add(j);
                                    tmp.add(k);
                                    ans.add(tmp);
                                    flag = true;
                                }
                            }
                        }
                    }
                }
            }
        }
        return ans;
    }
    private List<List<Integer>> findWSK(List<Integer> userCards){
        //找出一个正五十K就行
        List<List<Integer>> ans = new ArrayList<>();
        int c5 = 0, c10 = 0, ck = 0, size = userCards.size();
        for(int i = 0; i < size; i++){
            if(userCards.get(i) % 100 == 5)c5++;
            if(userCards.get(i) % 100 == 10)c10++;
            if(userCards.get(i) % 100 == 13)ck++;
        }
        int min = Math.min(Math.min(c5, c10), ck);
        if(min == 0)return ans;
        boolean flag = false;
        for(int i = 0; i < size; i++){
            int t5 = userCards.get(i);
            if(flag)break;
            if(t5 % 100 == 5){
                for(int j = i + 1; j < size; j++){
                    int t10 = userCards.get(j) % 100;
                    if(flag)break;
                    if(t10 == 10){
                        for(int k = j + 1; j < size; j++){
                            int tk = userCards.get(k);
                            if(tk % 100 == 13){
                                if(flag)break;
                                if(t5 / 100 == t10 /100 && t5 /100 == tk /100){
                                    List<Integer> tmp = new ArrayList<>();
                                    tmp.add(i);
                                    tmp.add(j);
                                    tmp.add(k);
                                    ans.add(tmp);
                                    flag = true;
                                }
                            }
                        }
                    }
                }
            }
        }
        return ans;
    }
    private List<List<Integer>> find4ZD(List<Integer> userCards){
        List<List<Integer>> ans = new ArrayList<>();
        Map<Integer, Integer> map = new HashMap<>();
        for(int i = 0; i < userCards.size(); i++){
            map.put(userCards.get(i), map.getOrDefault(userCards.get(i), 0) + 1);
        }
        //四炸
        for(int card: map.keySet()){
            if(map.get(card) == 4){
                List<Integer> tmp = new ArrayList<>();
                for(int i = 0; i <userCards.size(); i++){
                    if(userCards.get(i) == card)tmp.add(i);
                }
                ans.add(tmp);
            }
        }
        return ans;
    }
    private List<List<Integer>> find2WZ(List<Integer> userCards){
        List<List<Integer>> ans = new ArrayList<>();
        if(userCards.get(userCards.size() - 2) >= 16){
            List<Integer> tmp = new ArrayList<>();
            tmp.add(userCards.size() - 2);
            tmp.add(userCards.size() - 1);
            ans.add(tmp);
        }
        return ans;
    }
    private List<List<Integer>> find5ZD(List<Integer> userCards){
        List<List<Integer>> ans = new ArrayList<>();
        Map<Integer, Integer> map = new HashMap<>();
        for(int i = 0; i < userCards.size(); i++){
            map.put(userCards.get(i), map.getOrDefault(userCards.get(i), 0) + 1);
        }
        //五炸
        for(int card: map.keySet()){
            if(map.get(card) == 5){
                List<Integer> tmp = new ArrayList<>();
                for(int i = 0; i <userCards.size(); i++){
                    if(userCards.get(i) == card)tmp.add(i);
                }
                ans.add(tmp);
            }
        }
        return ans;
    }
    private List<List<Integer>> find6ZD(List<Integer> userCards){
        List<List<Integer>> ans = new ArrayList<>();
        Map<Integer, Integer> map = new HashMap<>();
        for(int i = 0; i < userCards.size(); i++){
            map.put(userCards.get(i), map.getOrDefault(userCards.get(i), 0) + 1);
        }
        //六炸
        for(int card: map.keySet()){
            if(map.get(card) == 6){
                List<Integer> tmp = new ArrayList<>();
                for(int i = 0; i <userCards.size(); i++){
                    if(userCards.get(i) == card)tmp.add(i);
                }
                ans.add(tmp);
            }
        }
        return ans;
    }
    private List<List<Integer>> find3WZ(List<Integer> userCards){
        List<List<Integer>> ans = new ArrayList<>();
        if(userCards.get(userCards.size() - 3) >= 16){
            List<Integer> tmp = new ArrayList<>();
            tmp.add(userCards.size() - 3);
            tmp.add(userCards.size() - 2);
            tmp.add(userCards.size() - 1);
            ans.add(tmp);
        }
        return ans;
    }
    private List<List<Integer>> find7ZD(List<Integer> userCards){
        List<List<Integer>> ans = new ArrayList<>();
        Map<Integer, Integer> map = new HashMap<>();
        for(int i = 0; i < userCards.size(); i++){
            map.put(userCards.get(i), map.getOrDefault(userCards.get(i), 0) + 1);
        }
        //七炸
        for(int card: map.keySet()){
            if(map.get(card) == 7){
                List<Integer> tmp = new ArrayList<>();
                for(int i = 0; i <userCards.size(); i++){
                    if(userCards.get(i) == card)tmp.add(i);
                }
                ans.add(tmp);
            }
        }
        return ans;
    }
    private List<List<Integer>> find8ZD(List<Integer> userCards){
        List<List<Integer>> ans = new ArrayList<>();
        Map<Integer, Integer> map = new HashMap<>();
        for(int i = 0; i < userCards.size(); i++){
            map.put(userCards.get(i), map.getOrDefault(userCards.get(i), 0) + 1);
        }
        //八炸
        for(int card: map.keySet()){
            if(map.get(card) == 8){
                List<Integer> tmp = new ArrayList<>();
                for(int i = 0; i <userCards.size(); i++){
                    if(userCards.get(i) == card)tmp.add(i);
                }
                ans.add(tmp);
            }
        }
        return ans;
    }
    private List<List<Integer>> find4WZ(List<Integer> userCards){
        List<List<Integer>> ans = new ArrayList<>();
        if(userCards.get(userCards.size() - 4) >= 16){
            List<Integer> tmp = new ArrayList<>();
            tmp.add(userCards.size() - 4);
            tmp.add(userCards.size() - 3);
            tmp.add(userCards.size() - 2);
            tmp.add(userCards.size() - 1);
            ans.add(tmp);
        }
        return ans;
    }

    public static void main(String[] args){
//        Scanner sc = new Scanner(System.in);
//        String s1, s2;
//        System.out.println(3 + 1 % 4);
//        System.out.println((3 + 1) % 4);
//        while(true){
//            System.out.println("请输入第一幅牌：");
//            s1 = sc.nextLine();
//            System.out.println("请输入第二幅牌：");
//            s2 = sc.nextLine();
//            List<Integer> carListA = new ArrayList<>();
//            List<Integer> carListB = new ArrayList<>();
//            String[] s = s1.split(" ");
//            String[] ss = s2.split(" ");
//            for (int i = 0; i < s.length; i++) carListA.add(Integer.parseInt(s[i]));
//            System.out.println("获取第一副牌为：" + carListA);
//            for (int i = 0; i < ss.length; i++) carListB.add(Integer.parseInt(ss[i]));
//            System.out.println("获取第二副牌为：" + carListB);
//            boolean b = new CardService().curCardListIsRight(carListA, carListB);
//            System.out.println(b);
//        }

        List<Integer> a = new ArrayList<>();
        for(int i = 0; i < 5; i++){
            a.add(i);
        }

        List<Integer> collect = a.stream().map(o -> 0).collect(Collectors.toList());
        System.out.println(a);
        System.out.println(collect);
    }
}