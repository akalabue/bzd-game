import { _decorator, Component, Node, AudioClip, AudioSource, resources } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BZDSoundMgt')
export class BZDSoundMgt extends Component {
    audioList: AudioClip[] = [];
    

    private _dict: Map<string, AudioClip> = new Map();//音频集合
    private _audioSource: AudioSource = null;
    
    start() {
        resources.preloadDir('sound');
        setTimeout(this.loadAssets.bind(this), 1000);

        this._audioSource = this.getComponent(AudioSource);//音频组件初始化
    }

    loadAssets(){
        globalThis.thisObj = this;
        resources.loadDir('sound/', AudioClip, function (err, assets) {
            if(err){
                console.log("加载音频资源出错：",err);
            }else{
                globalThis.thisObj.audioList = assets;
                for (let i = 0; i < globalThis.thisObj.audioList.length; i++) {
                    const element = globalThis.thisObj.audioList[i];
                    globalThis.thisObj._dict.set(element.name, element);
                }
            }
        });
        
    }
    public play(name: string) {
        const audioClip = this._dict.get(name);
        if (audioClip !== undefined) {
            this._audioSource.playOneShot(audioClip);
        }
    }
}

