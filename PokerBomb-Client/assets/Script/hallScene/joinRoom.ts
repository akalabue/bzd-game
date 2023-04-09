import { _decorator, Component, Node, Label } from 'cc';
import { HallSoundMgt } from './HallSoundMgt';
const { ccclass, property } = _decorator;

@ccclass('joinRoom')
export class joinRoom extends Component {

    @property(HallSoundMgt)
    private hallSoundMgt: HallSoundMgt;

    @property(Node)
    public showLabel: Node[] = [];

    public str: string = '';

    public cnt: number = 0;

    start() {

    }

    update(deltaTime: number) {
        
    }

    onCloseBtnClicked(){
        this.hallSoundMgt.play("button");
        this.node.active = false;
        this.cleanLabelList();
    }

    onInputEvent(target, args){
        // console.log(args,"/bn");
        // for(let i = 0; i < 6; i++)console.log(this.showLabel[i].getComponent(Label).string);
        this.hallSoundMgt.play("button");
        if(args == '清空'){
            this.cleanLabelList();
            return;
        }
        if(args == '删除'){
            if(this.cnt > 0){
                this.str = this.str.substring(0,this.str.length - 1);
                this.showLabel[this.cnt - 1].getComponent(Label).string = '-';
                this.cnt--;
            }
            return;
        }
        
        if(this.cnt == 6)return;
        this.str = this.str + args;
        this.showLabel[this.cnt++].getComponent(Label).string = args;
    }

    onJoinBtnClicked(){
        this.hallSoundMgt.play("button");
        if(this.cnt == 6){
            globalThis._hallClientMgr.sendMessage("joinRoom", {roomId: this.str, userId: globalThis._userInfo.user_id});
            this.cleanLabelList();
        }
    }

    cleanLabelList() {
        this.str = '';
        for(let i = 0; i < this.cnt; i++){
            this.showLabel[i].getComponent(Label).string = '-';
        }
        this.cnt = 0;
        return;
    }
}

    

