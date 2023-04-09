import { _decorator, Component, Node, Prefab, SpriteAtlas, resources, instantiate, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Poker')
export class Poker extends Component {

    pokerNode: Node
    pokerAtlas: SpriteAtlas
    cardList: number[]

    start() {
    }

    update(deltaTime: number) {
        
    }

    init(cardList: number[]){
        this.cardList = cardList;
        resources.load("image/games/bazhadan/card/pokerlist", SpriteAtlas, (err, spriteAtlas)=>{
            if(err)console.log("load atlas err: ", err);
            else {
                this.pokerAtlas = spriteAtlas;
                console.log("this.atlas: ", this.pokerAtlas);
                this.onLoadPrefab();
            }
        })
    }

    onLoadPrefab(){
        resources.load("image/games/bazhadan/PokerView", Prefab, (err, prefab: Prefab)=>{
            if(err)console.log("load prefab err: ", err);
            else {
                this.pokerNode = instantiate(prefab);
                console.log("pokerNode:",this.pokerNode);
                // this.node.addChild(this.pokerPrefab);
                this.showPoker();
            }
        })
    }
    showPoker() {
        this.node.addChild(this.pokerNode);
        for(let i = 0; i < 7; i++){
            let pk = this.pokerAtlas.getSpriteFrame(this.cardList[i]+"");
            let cardName = "card" + (i + 1);
            console.log(cardName);
            console.log(this.pokerNode)
            let cardNode = this.pokerNode.getChildByName(cardName);
            console.log("cardNode:",cardNode);
            let sp = cardNode.getComponent(Sprite);
            sp.spriteFrame = pk;
        }
    }
}

