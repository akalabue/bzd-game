import { _decorator, Component, Node } from 'cc';
import { HallSoundMgt } from './HallSoundMgt';
const { ccclass, property } = _decorator;

@ccclass('createRoom')
export class createRoom extends Component {

    @property(HallSoundMgt)
    private hallSoundMgt: HallSoundMgt;

    public gameNumbers = 10; //游戏局数，默认5局
    public scoreNumbers = 500; //每局游戏分数，默认500分

    start() {
        this.gameNumbers = 10;
    }

    update(deltaTime: number) {
        
    }

    onCloseBtnClicked(){
        this.hallSoundMgt.play("button");
        this.node.active = false;
    }

    onCreateBtnClicked(){
        console.log("创建按钮点击了");
        this.hallSoundMgt.play("button");
        let data = {
            createUserId: globalThis._userInfo.user_id * 1,
            gameNumbers: this.gameNumbers * 1,
            scoreNumbers: this.scoreNumbers * 1
        }
        // console.log('创建房间信息：', data);
        globalThis._hallClientMgr.sendMessage("createRoom", data);
    }

    //局数选择
    onGameNumbersBtnClicked(target, args){
        this.hallSoundMgt.play("button");
        this.gameNumbers = args;
    }

    //分数选择
    onScoreNumbersBtnClicked(target, args){
        this.hallSoundMgt.play("button");
        this.scoreNumbers = args;
    }
}

