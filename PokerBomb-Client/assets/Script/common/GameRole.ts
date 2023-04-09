import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameRole')
export class GameRole extends Component {
    public userId;

    public userName;

    public userIcon;

    public totalPoints;

    public juPoints;

    public panPoints;

    public userCards;

    public userStatus;
    
    start() {

    }

    update(deltaTime: number) {
        
    }
}

