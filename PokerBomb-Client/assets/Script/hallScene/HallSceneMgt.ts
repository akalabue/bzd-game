import { _decorator, Component, Node, Label, director, assert, assetManager, SpriteFrame, Sprite, ImageAsset, Texture2D } from 'cc';
import { HallSoundMgt } from './HallSoundMgt';
const { ccclass, property } = _decorator;

@ccclass('HallSceneMgt')
export class HallSceneMgt extends Component {

    @property(Node)
    public createRoom: Node
    @property(Label)
    public nameLabel: Label
    @property(Label)
    public idLabel: Label
    @property(Node)
    public joinRoom: Node
    @property(Node)
    iconImg:Node

    @property(HallSoundMgt)
    private hallSoundMgt: HallSoundMgt;

    start() {
        this.init();
    }

    update(deltaTime: number) {
        
    }

    public init(){
        globalThis._eventtarget.on("createRoom", this.onCreateRoom, this);
        globalThis._eventtarget.on("joinRoom", this.onJoinRoom, this);
        this.idLabel.string = 'ID:' + globalThis._userInfo.user_id;
        this.nameLabel.string = globalThis._userInfo.user_name;

        console.log("1aa",globalThis._userInfo.user_id,globalThis._userInfo.user_name)
        if(globalThis._userInfo.user_head_url != null){
            let iconSp = this.iconImg.getComponent(Sprite);
            assetManager.loadRemote<ImageAsset>(globalThis._userInfo.user_head_url, {ext: '.png'}, function (err, imageAsset) {
            const spriteFrame = new SpriteFrame();
            const texture = new Texture2D();
            texture.image = imageAsset;
            spriteFrame.texture = texture;
            iconSp.spriteFrame = spriteFrame;
        });}
    }

    //创建房间按钮点击的逻辑
    public onCreateRoomBtnClicked(){
        console.log("创建房间按钮被点击了...");
        this.hallSoundMgt.play("button");
        // globalThis._hallClientMgr.sendMessage("create_room",{});
        this.createRoom.active = true;
    }

    public onCreateRoom(data){
        let roomId = data.roomId;
        console.log("创建了房间：", roomId);
        globalThis._userInfo.room_id = roomId;
        director.loadScene("bazhadan");
    }

    public onJoinRoomBtnClicked(){
        console.log("加入房间按钮被点击了");
        this.hallSoundMgt.play("button");
        this.joinRoom.active = true;
    }

    public onJoinRoom(data){
        let roomId = data.roomId;
        if(roomId != -1){
            console.log("加入了房间：", roomId);
            globalThis._userInfo.room_id = roomId;
            director.loadScene("bazhadan");
        }
        else console.log("房间号不存在");
    }

    onSetBtnClicked(){
        alert("敬请完善！！");
    }
}

