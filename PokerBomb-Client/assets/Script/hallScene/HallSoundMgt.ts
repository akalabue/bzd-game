import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HallSoundMgt')
export class HallSoundMgt extends Component {
    @property([AudioClip])
    public audioList: AudioClip[] = [];

    private _dict: Map<string, AudioClip> = new Map();//音频集合
    private _audioSource: AudioSource = null;
    
    start() {
        for (let i = 0; i < this.audioList.length; i++) {
            const element = this.audioList[i];
            this._dict.set(element.name, element);
        }

        this._audioSource = this.getComponent(AudioSource);//音频组件初始化
    }

    public play(name: string) {
        const audioClip = this._dict.get(name);
        if (audioClip !== undefined) {
            this._audioSource.playOneShot(audioClip);
        }
    }
}

