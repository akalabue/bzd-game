package module.pokerbomb.enumclass;

import java.util.List;

public enum PokerType implements Compare{
    A("单张、王") {
        @Override
        public boolean compare(List<Integer> carListA, List<Integer> carListB, PokerType typeB) {
            boolean ans = false;
            switch (typeB){
                case A:
                    ans = carListB.get(0) > carListA.get(0);
                    break;
                case wsk:
                    ans = true;
                    break;
                case WSK:
                    ans = true;
                    break;
                case AA:
                    ans = carListB.get(0) == 16 || carListB.get(0) == 17; //两个是王
                    break;
                case AB:
                    ans = true;
                    break;
                case AAB:
                    ans = true;
                    break;
                case AAAA:
                    ans = true;
                    break;
                case GOD:
                    ans = true;
                    break;
            }

            return ans;
        }
    },
    AA("对子、对大王、对小王") {
        @Override
        public boolean compare(List<Integer> carListA, List<Integer> carListB, PokerType typeB) {
            boolean ans = false;
            switch (typeB){
                case A:
                    ans = (carListA.get(0) < 16) && (carListB.get(0) == 16 || carListB.get(0) == 17); //单王大
                    break;
                case wsk:
                    ans = carListA.get(0) < 16;
                    break;
                case WSK:
                    ans = carListA.get(0) < 16;
                    break;
                case AA:
                    ans = carListB.get(0) > carListA.get(0);
                    break;
                case AB:
                    ans = true;
                    break;
                case AAB:
                    ans = true;
                    break;
                case AAAA:
                    ans = true;
                    break;
                case GOD:
                    ans = true;
                    break;
            }
            return ans;
        }
    },
    wsk("不同花色5、10、k"){
        @Override
        public boolean compare(List<Integer> carListA, List<Integer> carListB, PokerType typeB) {
            boolean ans = false;
            switch (typeB){
                case WSK:
                    ans = true;
                    break;
                case AA:
                    ans = carListB.get(0) == 16 || carListB.get(0) == 17; //两个是王
                    break;
                case AB:
                    ans = true;
                    break;
                case AAB:
                    ans = true;
                    break;
                case AAAA:
                    ans = true;
                    break;
                case GOD:
                    ans = true;
                    break;
            }

            return ans;
        }
    },
    WSK("相同花色5、10、k"){
        @Override
        public boolean compare(List<Integer> carListA, List<Integer> carListB, PokerType typeB) {
            boolean ans = false;
            switch (typeB){
                case AA:
                    ans = carListB.get(0) == 16 || carListB.get(0) == 17; //两个是王
                    break;
                case AB:
                    ans = true;
                    break;
                case AAB:
                    ans = true;
                    break;
                case AAAA:
                    ans = true;
                    break;
                case GOD:
                    ans = true;
                    break;
            }

            return ans;
        }
    },
    AB("大小王一对") {
        @Override
        public boolean compare(List<Integer> carListA, List<Integer> carListB, PokerType typeB) {
            boolean ans = false;
            switch (typeB){
                case AAAA:
                    ans = carListB.size() > 4; //至少五炸
                    break;
            }
            return ans;
        }
    },
    AAB("大大小王、小小大王") {
        @Override
        public boolean compare(List<Integer> carListA, List<Integer> carListB, PokerType typeB) {
            boolean ans = false;
            switch (typeB){
                case AAAA:
                    ans = carListB.size() > 6; //至少六炸
                    break;
            }
            return ans;
        }
    },
    GOD("四王") {
        @Override
        public boolean compare(List<Integer> carListA, List<Integer> carListB, PokerType typeB) {
            return false;
        }
    },
    AAA("三不带、三带一、三带二、三带对") {
        @Override
        public boolean compare(List<Integer> carListA, List<Integer> carListB, PokerType typeB) {
            boolean ans = false;
            switch (typeB){
                case AAA:
                    ans = carListB.get(0) > carListA.get(0);
                    break;
                case wsk:
                    ans = true;
                    break;
                case WSK:
                    ans = true;
                    break;
                case AA:
                    ans = carListB.get(0) == 16 || carListB.get(0) == 17; //两个是王
                    break;
                case AB:
                    ans = true;
                    break;
                case AAB:
                    ans = true;
                    break;
                case AAAA:
                    ans = true;
                    break;
                case GOD:
                    ans = true;
                    break;
            }
            return ans;
        }
    },
    AAAA("四炸、五炸、六炸、七炸、八炸") {
        @Override
        public boolean compare(List<Integer> carListA, List<Integer> carListB, PokerType typeB) {
            boolean ans = false;
            switch (typeB){
                case AA:
                    ans = (carListA.size() == 4) && (carListB.get(0) == 16 || carListB.get(0) == 17); //四炸且两个是王
                    break;
                case AB:
                    ans = (carListA.size() == 4) && (carListB.get(0) == 16 || carListB.get(0) == 17); //四炸且两个是王
                    break;
                case AAB:
                    ans = (carListA.size() < 7) && (carListB.get(0) == 16 || carListB.get(0) == 17); //小于七炸且三个是王
                    break;
                case AAAA:
                    ans = carListA.size() < carListB.size() || (carListA.size() == carListB.size() && carListA.get(0) < carListB.get(0));
                    break;
                case GOD:
                    ans = true;
                    break;
            }
            return ans;
        }
    },
    ABCDEF("顺子，至少五顺，最小从A开始，比如：A~5,最大到A，比如：10~A") {
        @Override
        public boolean compare(List<Integer> carListA, List<Integer> carListB, PokerType typeB) {
            boolean ans = false;
            switch (typeB){
                case ABCDEF:
                    if(carListB.size() != carListA.size()){
                        ans = false;
                        break;
                    } else {
                        if(carListA.get(carListA.size() - 1) <= 14){
                            ans = carListB.get(0) > carListA.get(0);
                            break;
                        }else {
                            if(carListB.get(carListB.size() - 1) <= 14){
                                ans = true;
                                break;
                            }else {
                                ans = carListA.get(carListA.size() - 2) > carListB.get(carListB.size() - 2);
                                break;
                            }
                        }
                    }
                case wsk:
                    ans = true;
                    break;
                case WSK:
                    ans = true;
                    break;
                case AA:
                    ans = carListB.get(0) == 16 || carListB.get(0) == 17; //两个是王
                    break;
                case AB:
                    ans = true;
                    break;
                case AAB:
                    ans = true;
                    break;
                case AAAA:
                    ans = true;
                    break;
                case GOD:
                    ans = true;
                    break;
            }
            return ans;
        }
    },
    AABB("连对，至少两对，小王可以连，比如：2、2、小王") {
        @Override
        public boolean compare(List<Integer> carListA, List<Integer> carListB, PokerType typeB) {
            boolean ans = false;
            switch (typeB){
                case AABB:
                    ans = (carListB.size() + 1) / 2 == (carListA.size() + 1) / 2 && carListB.get(0) > carListA.get(0);
                    break;
                case wsk:
                    ans = true;
                    break;
                case WSK:
                    ans = true;
                    break;
                case AA:
                    ans = carListB.get(0) == 16 || carListB.get(0) == 17; //两个是王
                    break;
                case AB:
                    ans = true;
                    break;
                case AAB:
                    ans = true;
                    break;
                case AAAA:
                    ans = true;
                    break;
                case GOD:
                    ans = true;
                    break;
            }
            return ans;
        }
    },
    AAABBB("飞机") {
        @Override
        public boolean compare(List<Integer> carListA, List<Integer> carListB, PokerType typeB) {
            boolean ans = false;
            switch (typeB){
                case AAABBB:
                    ans = carListB.size() == carListA.size() && carListB.get(0) > carListA.get(0);
                    break;
                case wsk:
                    ans = true;
                    break;
                case WSK:
                    ans = true;
                    break;
                case AA:
                    ans = carListB.get(0) == 16 || carListB.get(0) == 17; //两个是王
                    break;
                case AB:
                    ans = true;
                    break;
                case AAB:
                    ans = true;
                    break;
                case AAAA:
                    ans = true;
                    break;
                case GOD:
                    ans = true;
                    break;
            }
            return ans;
        }
    },
    WRONG("错误类型") {
        @Override
        public boolean compare(List<Integer> carListA, List<Integer> carListB, PokerType typeB) {
            return false;
        }
    };


    private final String des;
    PokerType(String des) {
        this.des = des;
    }

}

interface Compare{
    boolean compare(List<Integer> carListA, List<Integer> carListB, PokerType typeB);
}
