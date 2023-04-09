import { _decorator, Component, Node, Label, System, assetManager, AssetManager, SpriteAtlas, Prefab, instantiate, resources, SpriteFrame, Sprite, director, tween, Vec3 } from 'cc';
import { GameRole } from '../../common/GameRole';
import { PushCardVo } from '../../common/PushCardVo';
import { BZDSoundMgt } from './BZDSoundMgt';
import { Poker } from './Poker';
import { PokerCtr } from './PokerCtr';
const { ccclass, property } = _decorator;

@ccclass('BZDSceneMgt')
export class BZDSceneMgt extends Component {

    @property(Label)
    public roomId: Label
    @property(Label)
    public gamecount: Label

    @property(Label)
    seatName: Label[] = [];
    @property(Label)
    seatTotalPoints: Label[] = [];
    
    @property(Label)
    seatJuPoints: Label[] = []
    
    @property(Label)
    seatPanPoints: Label[] = []
    
    @property(Node)
    readyOk: Node[] = []

    @property(Node)
    pushCardsView: Node[] = []

    @property(Node)
    passLable: Node[] = []
    
    @property(Node)
    readyBtn: Node
    
    @property(Node)
    cancelReadyBtn: Node
    
    @property(Node)
    startBtn: Node

    @property(Node)
    pokerView: Node

    @property(Node)
    passBtn: Node

    @property(Node)
    promptBtn: Node

    @property(Node)
    pushCardBtn: Node

    @property(Label)
    paiPoints: Label

    @property(Node)
    panOver: Node

    @property(SpriteAtlas)
    pokerAtlas: SpriteAtlas;

    @property(BZDSoundMgt)
    bzdSoundMgt: BZDSoundMgt


    cardList: number[];
    cardSet: Set<number> = new Set;
    // pushCardSet: Set<number> = new Set;
    pushcardVo: PushCardVo
    promptInfo = null
    index: number = 0

    
    start() {
        this.init();
        console.log("怡怡最美~");
        console.log("最爱怡怡~");
    }

    private init(){
        this.pushcardVo = new PushCardVo();
        globalThis._eventtarget.on("requestRoomInfo", this.onRequestRoomInfo, this);
        globalThis._eventtarget.on("userReady", this.onUserReady, this);
        globalThis._eventtarget.on("dealCards", this.onDealCards, this);
        globalThis._eventtarget.on("pushCards", this.onPushCards, this);
        globalThis._eventtarget.on("updatePoints", this.onUpdatePoints, this);
        globalThis._eventtarget.on("panGameOver", this.panGameOver, this);
        globalThis._eventtarget.on("newUserJoinRoom", this.newUserJoinRoom, this);
        globalThis._eventtarget.on("prompt", this.onPrompt, this);
    }
    onPromptBtnClicked(){
        if(this.promptInfo == null){
            this.pushcardVo.curSeat = globalThis._userInfo.room_seat;
            globalThis._BZDClient.sendMessage("prompt",{pushCardsInfo: JSON.stringify(this.pushcardVo)});
        }else {
            this.cleanCardSet();
            this.promptCard();
        }
    }
    onPrompt(data){
        this.promptInfo = data.promptInfo;
        this.promptCard();
    }
    promptCard(){
        if(this.promptInfo.length == 0){
            console.log("您没有比上家大的牌！");
            return;
        }
        if(this.index >= this.promptInfo.length)this.index = 0;
        let cardList:number[] = this.promptInfo[this.index];
        this.bzdSoundMgt.play("SpecSelectCard");
        for(let arg of cardList){
            let cardName = "card" + arg;
            let cardNode = this.pokerView.getChildByName(cardName);
            
            let p = cardNode.getPosition()
            if(this.cardSet.has(arg)){
                this.cardSet.delete(arg);
                p.y -= 30;
            }else {
                this.cardSet.add(arg);
                p.y += 30;
            }
            cardNode.setPosition(p);
        }
        this.index++;
    }
    newUserJoinRoom(data) {
        let seat = data.newUserInfo.seat;
        let userInfo = data.newUserInfo.userInfo;
        this.updateTheseat(seat, userInfo);
    }
    updateTheseat(seat: any, userInfo: any) {
        if(seat == globalThis._userInfo.room_seat)return;
        seat = (seat - globalThis._userInfo.room_seat + 4) % 4;
        this.seatName[seat].string = userInfo.userName;
        this.seatTotalPoints[seat].string = "总分:" + userInfo.totalPoints;
        this.seatJuPoints[seat].string = "局:" + userInfo.juPoints;
        this.seatPanPoints[seat].string = "盘:" + userInfo.panPoints;
        this.readyOk[seat].active = (userInfo.userStatus.status == "READY");
    }
    panGameOver(data) {
        this.panOver.active = true;
        let info = data.panGameOverInfo;
        let panGameInfo = info.panGameInfos;
        let i = globalThis._userInfo.room_seat % 2;
        let label = this.panOver.getChildByName("计分板").getChildByName("本队积分详情").getComponent(Label);
        label.string = "牌面积分：" + panGameInfo[i].points + "\n队伍积分：" + panGameInfo[i].teamPoints 
        + "\n总计：" + panGameInfo[i].total + "\n局分：" + panGameInfo[i].juPoints;

        i = (i + 1) % 2;
        label = this.panOver.getChildByName("计分板").getChildByName("他队积分详情").getComponent(Label);
        label.string = "牌面积分：" + panGameInfo[i].points + "\n队伍积分：" + panGameInfo[i].teamPoints 
        + "\n总计：" + panGameInfo[i].total + "\n局分：" + panGameInfo[i].juPoints;
    }
    onUpdatePoints(data) {
        let seat = (data.seat - globalThis._userInfo.room_seat + 4) % 4;
        let panPoints = data.panPoints;
        this.seatPanPoints[seat].string = "盘:" + panPoints;
        this.seatPanPoints[(seat + 2) % 4].string = "盘:" + panPoints;
    }

    
    onRequestRoomInfo(data){
        let roomInfo = data.roomInfo;
        this.roomId.string = roomInfo.roomId;
        this.gamecount.string = roomInfo.currentNumbers + "/" + roomInfo.gameNumbers + "局 " + roomInfo.scoreNumbers + "分";
        this.updateAllSeats(roomInfo);
    }

    updateAllSeats(roomInfo){
        this.pokerView.active = false;
        let users: GameRole[] = roomInfo.gameRoles;
        //先找到本玩家座位号
        let cur = 0;
        for(let i = 0; i < 4; i++){
            if(users[i] == null){
                continue;
            }
            if(users[i].userId == globalThis._userInfo.user_id){
                cur = i;
                break;
            }
        }
        globalThis._userInfo.room_seat = cur;
        //渲染各座位信息
        for(let i = 0, j = cur; i < 4; i++, j++){
            if(j >= 4)j -= 4;
            if(users[j] == null)continue;
            this.seatName[i].string = users[j].userName;
            this.seatTotalPoints[i].string = "总分:" + users[j].totalPoints;
            this.seatJuPoints[i].string = "局:" + users[j].juPoints;
            this.seatPanPoints[i].string = "盘:" + users[j].panPoints;
            this.readyOk[i].active = (users[j].userStatus.status == "READY");
            this.passLable[i].active = false;
        }
        let status = users[0].userStatus.status;
        //还未发牌
        if(status == "UNREADY" || status == "READY"){
            for(let i = 0, j = cur; i < 4; i++, j++){
                this.pushCardsView[i].active = false;
                if(j >= 4)j -= 4;
                if(users[j] == null)continue;
                let bool = users[j].userStatus.status == "READY";
                this.readyOk[i].active = bool;
            }
            let bool = users[cur].userStatus.status == "READY";
            this.readyBtn.active = !bool;
            this.cancelReadyBtn.active = bool;
            if(roomInfo.readyNumbers == 4 && globalThis._userInfo.user_id == roomInfo.createUserId)this.startBtn.active = true;
            else this.startBtn.active = false;
        }else {
            //已经发牌了
            //显示玩家手牌
            this.cardList = users[cur].userCards;
            let bool = true;
            for(let i = 0, j = cur; i < 4; i++, j++){
                if(j >= 4)j -= 4;
                let status = users[j].userStatus.status;
                if(status == "PLAYED"){
                    let cardList = users[j].userStatus.data;
                    this.showPushCards(i, cardList);
                    bool = false;
                }else if(status == "PLAYING"){
                    // this.onloadAtlas(j);
                    this.showPoker(j);
                    if(j == cur){
                        for(let p = 0, q = cur; p < 4; p++, q--){
                            if(q < 0)q += 4;
                            if(users[q].userStatus.status == "PLAYED"){
                                this.pushcardVo.prePushSeat = q;
                                break;
                            }
                        }
                    }
                }else if(status == "PASS"){
                    this.passLable[i].active = true;
                }else if(status == "END"){
                    //
                }
            }
            if(users[cur].userStatus.status == "PLAYING"){
                this.pushCardBtn.active = true;
                this.passBtn.active = bool;
            }
            this.paiPoints.string = "牌面积分:" + roomInfo.curPoints;
        }
    }

    onUserReady(data){
        let mySeat = globalThis._userInfo.room_seat;
        if(data.readyNumbers == 4 && globalThis._userInfo.user_id == data.createUserId)this.startBtn.active = true;
        else this.startBtn.active = false;
        let seat = data.seat;
        let ready:boolean = (data.isReady == 1);
        this.readyOk[(seat - mySeat + 4) % 4].active = ready;
        
    }
    onReadyBtnClicked(){
        this.bzdSoundMgt.play("button");
        this.readyBtn.active = false;
        this.cancelReadyBtn.active = true;
        globalThis._BZDClient.sendMessage("userReady",{seat:globalThis._userInfo.room_seat, isReady: 1, roomId:globalThis._userInfo.room_id})
    }

    onCancelReadyBtnClicked(){
        this.bzdSoundMgt.play("button");
        this.readyBtn.active = true;
        this.cancelReadyBtn.active = false;
        globalThis._BZDClient.sendMessage("userReady",{seat:globalThis._userInfo.room_seat, isReady: -1, roomId:globalThis._userInfo.room_id})
    }

    onStartBtnClicked(){
        this.bzdSoundMgt.play("button");
        globalThis._BZDClient.sendMessage("dealCards",{});
    }

    onExitRoomBtnClicked(){
        this.bzdSoundMgt.play("button");
        director.loadScene("HallScene");
    }

    onDealCards(data){
        console.log("获得牌型：",data);
        this.bzdSoundMgt.play("DealFold");
        
        this.startBtn.active = false;
        this.readyBtn.active = false;
        this.cancelReadyBtn.active = false;
        //初始化各出牌区域
        for(let i = 0; i < 4; i++){
            this.cleanPushCards(i);
        }
        for(let i = 0; i < 4; i++){
            this.readyOk[i].active = false;
        }
        let cards = data.cardList[globalThis._userInfo.room_seat];
        let pushSeat = data.pushSeat;
        this.cardList = cards;
        this.pushcardVo.prePushSeat = pushSeat;
        // this.onloadAtlas(pushSeat);
        this.showPoker(pushSeat);
    }

    onloadAtlas(j) {
        // resources.load("image/games/bazhadan/card/pokerlist", SpriteAtlas, (err, spriteAtlas)=>{
        //     if(err)console.log("load atlas err: ", err);
        //     else {
        //         this.pokerAtlas = spriteAtlas;
        //         this.showPoker(j);
        //     }
        // })

        this.showPoker(j);
    }
    showPoker(j) {
        this.pokerView.active = true;
        this.passBtn.active = false;
        this.pushCardBtn.active = false;
        this.promptBtn.active = false;
        let bpk = this.pokerAtlas.getSpriteFrame("0");
        let x = -360, y = -50, z = 0;
        for(let i = 0; i < this.cardList.length; i++){
            if(i == 17){
                y = -150;
                x -= 850;
            }
            let pk = this.pokerAtlas.getSpriteFrame(this.cardList[i]+"");
            let cardName = "card" + i;
            let cardNode = this.pokerView.getChildByName(cardName);
            cardNode.setPosition(new Vec3(0, 185, 0));
            cardNode.active = true;
            let sp = cardNode.getComponent(Sprite);
            sp.spriteFrame = bpk;
            tween(cardNode).to(1.5,{position: new Vec3(i*50+x, y, z)})
            .call(() => {
                sp.spriteFrame = pk;
                if(i == 26){        
                    if(globalThis._userInfo.room_seat == j){
                        this.pushCardBtn.active = true;
                        if(globalThis._userInfo.room_seat != this.pushcardVo.prePushSeat){
                            this.passBtn.active = true;
                        }
                    }
                }
            }).start();
        }
    }

    onCardClicked(type,arg){
        arg = arg * 1;
        this.bzdSoundMgt.play("SpecSelectCard");
        let cardName = "card" + arg;
        let cardNode = this.pokerView.getChildByName(cardName);
        
        let p = cardNode.getPosition()
        if(this.cardSet.has(arg)){
            this.cardSet.delete(arg);
            p.y -= 30;
        }else {
            this.cardSet.add(arg);
            p.y += 30;
        }
        cardNode.setPosition(p);
    }

    onPushCardBtnClicked(){
        console.log("出牌！")
        console.log(this.pushcardVo);
        console.log(JSON.stringify(this.pushcardVo));
        this.pushcardVo.curCardList.length = 0;
        
        let cards = Array.from(this.cardSet);
        cards.sort((a, b) => a - b);
        console.log("eee:",cards);
        for(let i of cards){
            let cardName = "card" + i;
            let cardNode = this.pokerView.getChildByName(cardName);
            let sp = cardNode.getComponent(Sprite);
            let spf = sp.spriteFrame;
            let cardValue = spf.name;
            this.pushcardVo.curCardList.push(Number(cardValue));
        }
        this.pushcardVo.curSeat = globalThis._userInfo.room_seat;
        globalThis._BZDClient.sendMessage("pushCards",{pushCardsInfo: JSON.stringify(this.pushcardVo)});
        
    }

    randomAudioName(type){
        const random = (min:any,max:any) => Math.floor(Math.random() * (max - min + 1) + min)
        let arr:any = ["Woman_","Man_"]
            
        let idx = random( 0,1)
        if(type == "buyao"){
            let idx = random(1, 4);
            type += idx;
        }
        return arr[idx] + type;
    }
    onPushCards(data){
        this.pushcardVo = data.pushCardsInfo;
        let curSeat = globalThis._userInfo.room_seat;
        let isRight: boolean = data.isRight;
        let audioName = this.randomAudioName(this.pushcardVo.type);
        //出牌正确
        if(isRight){
            this.bzdSoundMgt.play(audioName);
            //是我出的牌
            if(curSeat == this.pushcardVo.preSeat){
                if(this.pushcardVo.preStatus == "PLAYED"){
                    this.bzdSoundMgt.play("Special_give")
                    let length = this.cardSet.size;
                    let d_x = 30;
                    let x = -70 - d_x * (length / 2);
                    let cards = Array.from(this.cardSet);
                    cards.sort((a, b) => a - b);
                    for(let i of cards){
                        // this.pushCardSet.add(i);
                        let cardName = "card" + i;
                        let cardNode = this.pokerView.getChildByName(cardName);
                        cardNode.active = false;
                        // tween(cardNode).to(0.8,{position: new Vec3(x,90,0)}).start();
                        // x += d_x;
                    }
                    let cardList = this.pushcardVo.preCardList;                   
                    this.showPushCards(0, cardList);
                    this.cardSet.clear();
                    //调整剩余牌序
                    x = -360; let y = -50, z = 0;
                    this.cardList = this.pushcardVo.preUserCards;
                    for(let i = 0; i < this.cardList.length; i++){
                        if(i == 17){
                            y = -150;
                            x -= 850;
                        }
                        let pk = this.pokerAtlas.getSpriteFrame(this.cardList[i]+"");
                        let cardName = "card" + i;
                        let cardNode = this.pokerView.getChildByName(cardName);
                        let sp = cardNode.getComponent(Sprite);
                        sp.spriteFrame = pk;
                        cardNode.setPosition(new Vec3(i*50+x, y, z));
                        cardNode.active = true;
                    }
                    for(let i = this.cardList.length; i < 27; i++){
                        let cardName = "card" + i;
                        let cardNode = this.pokerView.getChildByName(cardName);
                        cardNode.active = false;
                    }

                    //调整按钮显示状态
                    this.passBtn.active = false;
                    this.promptBtn.active = false;
                    this.pushCardBtn.active = false;
                }else if(this.pushcardVo.preStatus == "PASS"){
                    
                }
            }
            
            //不是我出的牌，将对应出牌位置更新
            else{
                //先更新出牌位置信息(将牌型展出)，到下一家出牌
                let seat = (this.pushcardVo.preSeat - curSeat + 4) % 4;
                this.cleanPushCards(seat);
                if(this.pushcardVo.preSeat == this.pushcardVo.prePushSeat){//if(this.pushcardVo.preStatus == "PLAYED")
                    let cardList = this.pushcardVo.preCardList;                   
                    this.showPushCards(seat, cardList);
                }else if(this.pushcardVo.preStatus == "PASS"){
                    this.passLable[seat].active = true;
                }else if(this.pushcardVo.preStatus == "END"){

                }
                
                //如果下家是我
                if((this.pushcardVo.preSeat + 1) % 4 == curSeat){
                    // for(let i of this.pushCardSet){
                    //     let cardName = "card" + i;
                    //     let cardNode = this.pokerView.getChildByName(cardName);
                    //     cardNode.active = false;
                    // }
                    // this.pushCardSet.clear();
                    if(this.pushcardVo.myStatus == "PLAYING"){
                        this.cleanPushCards(0);
                        this.promptInfo = null;
                        if(globalThis._userInfo.room_seat == this.pushcardVo.prePushSeat){
                                this.passBtn.active = false;
                                this.promptBtn.active = false;
                            }
                        else {
                            this.passBtn.active = true;
                            this.promptBtn.active = true;
                        }
                        this.pushCardBtn.active = true;
                    }else if(this.pushcardVo.myStatus == "END"){
                        this.pushcardVo.curSeat = globalThis._userInfo.room_seat;
                        globalThis._BZDClient.sendMessage("userEnd",{pushCardsInfo: JSON.stringify(this.pushcardVo)});
                    }else if(this.pushcardVo.myStatus == "OVER"){
                        console.log("游戏结束!")
                        this.pushcardVo.curSeat = globalThis._userInfo.room_seat;
                        globalThis._BZDClient.sendMessage("panGameOver",{pushCardsInfo: JSON.stringify(this.pushcardVo)});
                    }else if(this.pushcardVo.myStatus == "TOTEAMMATE"){
                        this.pushcardVo.curSeat = globalThis._userInfo.room_seat;
                        globalThis._BZDClient.sendMessage("TOTEAMMATE",{pushCardsInfo: JSON.stringify(this.pushcardVo)});
                    }
                }
            }
            this.paiPoints.string = "牌面积分:" + this.pushcardVo.points;
        }
        //出牌不正确
        else {
            if(curSeat == this.pushcardVo.curSeat){
                //是我出的牌
                this.bzdSoundMgt.play("SpecSysReturnFail");
                console.log("不能这样出牌！");
            }
            else {
                //不是我出的牌，不用管
            }
        }
    }
    showPushCards(seat, cardList){
        let pushCardsView = this.pushCardsView[seat];
        for(let i = 0; i < cardList.length; i++){
            let pk = this.pokerAtlas.getSpriteFrame(cardList[i]+"");
            let cardName = "card" + i;
            let cardNode = pushCardsView.getChildByName(cardName);
            let sp = cardNode.getComponent(Sprite);
            sp.spriteFrame = pk;
            cardNode.active = true;
        }
    }
    showPushCardsBtn() {
        console.log("1:",globalThis._userInfo.room_seat);
        console.log("2:",this.pushcardVo.prePushSeat);
        if(globalThis._userInfo.room_seat == this.pushcardVo.prePushSeat)
            this.passBtn.active = false;
        else 
            this.passBtn.active = true;

        if(globalThis._userInfo.room_seat == (this.pushcardVo.preSeat + 1) % 4)
            this.pushCardBtn.active = true;

        console.log(this.pushCardBtn.active);
    }

    onPassBtnClicked(){
        this.passBtn.active = false;
        this.pushCardBtn.active = false;
        this.promptBtn.active = false;
        this.passLable[0].active = true;
        this.pushcardVo.curSeat = globalThis._userInfo.room_seat;
        this.cleanCardSet();
        globalThis._BZDClient.sendMessage("passCards",{pushCardsInfo: JSON.stringify(this.pushcardVo)});
    }

    cleanCardSet(){
        for(let arg of this.cardSet){
            let cardName = "card" + arg;
            let cardNode = this.pokerView.getChildByName(cardName);
            let p = cardNode.getPosition()
            this.cardSet.delete(arg);
            p.y -= 30;
            cardNode.setPosition(p);
        }
    }

    cleanPushCards(i){
        let pcv = this.pushCardsView[i];
        pcv.active = true;
        for(let i = 0; i < 27; i++){
            let cardName = "card" + i;
            let cardNode = pcv.getChildByName(cardName);
            // let sp = cardNode.getComponent(Sprite);
            // sp.spriteFrame = null;
            cardNode.active = false;
        }
        this.passLable[i].active = false;
    }

    onPanOverPageClosedBtnClicked(){
        this.bzdSoundMgt.play("button");
        this.panOver.active = false;
        this.pushcardVo = new PushCardVo();
        globalThis._BZDClient.sendMessage("requestRoomInfo",{});
    }

    playAudioEffect(name:string){
        this.bzdSoundMgt.play(name);
    }
}


