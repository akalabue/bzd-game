import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PushCardVo')
export class PushCardVo extends Component {
    preCardList: number[] = new Array();
    prePushSeat: number = 0
    preSeat: number = 0
    preUserCards: number[] = new Array();
    preStatus: String =  ""
    curCardList: number[] = new Array();
    curSeat: number = 0
    points: number = 0
    myStatus: String = "";
    type = "";
}

