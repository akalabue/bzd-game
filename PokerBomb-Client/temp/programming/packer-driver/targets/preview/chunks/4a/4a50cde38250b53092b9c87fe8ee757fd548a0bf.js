System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, AudioClip, AudioSource, resources, _dec, _class, _crd, ccclass, property, BZDSoundMgt;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      AudioClip = _cc.AudioClip;
      AudioSource = _cc.AudioSource;
      resources = _cc.resources;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f3fbfLs7NhLk7OOJ6uGrJOY", "BZDSoundMgt", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BZDSoundMgt", BZDSoundMgt = (_dec = ccclass('BZDSoundMgt'), _dec(_class = class BZDSoundMgt extends Component {
        constructor() {
          super(...arguments);
          this.audioList = [];
          this._dict = new Map();
          this._audioSource = null;
        }

        start() {
          resources.preloadDir('sound');
          setTimeout(this.loadAssets.bind(this), 1000);
          console.log("加载音频资源...");
          this._audioSource = this.getComponent(AudioSource); //音频组件初始化
        }

        loadAssets() {
          resources.loadDir('sound/', AudioClip, function (err, assets) {
            this.audioList = assets;
          });

          for (var i = 0; i < this.audioList.length; i++) {
            var element = this.audioList[i];

            this._dict.set(element.name, element);
          }

          console.log(this._dict);
        }

        play(name) {
          var audioClip = this._dict.get(name);

          console.log(this._dict, audioClip, this._audioSource);

          if (audioClip !== undefined) {
            this._audioSource.playOneShot(audioClip);
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4a50cde38250b53092b9c87fe8ee757fd548a0bf.js.map