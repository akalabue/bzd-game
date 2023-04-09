import { _decorator, Component, Node, SpriteAtlas, resources, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PokerCtr')
export class PokerCtr extends Component {
    
    cardList: number[]
    pokerAtlas: SpriteAtlas
    @property(Node)
    pokerView: Node
    
    start() {
    }

    onDealCards(data){
        console.log("获得牌型：",data);
        let cards = data.cardList[globalThis._userInfo.room_seat];
        let pokerCtl = new PokerCtr()
        pokerCtl.init(cards);
    }

    init(cards: number[]) {
        this.cardList = cards;
        this.onloadAtlas()
    }
    onloadAtlas() {
        resources.load("image/games/bazhadan/card/pokerlist", SpriteAtlas, (err, spriteAtlas)=>{
            if(err)console.log("load atlas err: ", err);
            else {
                this.pokerAtlas = spriteAtlas;
                console.log("this.atlas: ", this.pokerAtlas);
                this.showPoker();
            }
        })
    }
    showPoker() {
        this.pokerView.active = true;
        for(let i = 0; i < 7; i++){
            let pk = this.pokerAtlas.getSpriteFrame(this.cardList[i]+"");
            let cardName = "card" + (i + 1);
            console.log(cardName);
            console.log(this.pokerView)
            let cardNode = this.pokerView.getChildByName(cardName);
            console.log("cardNode:",cardNode);
            let sp = cardNode.getComponent(Sprite);
            sp.spriteFrame = pk;
        }
    }

}

