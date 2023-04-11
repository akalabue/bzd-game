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
          this._audioSource = this.getComponent(AudioSource); //音频组件初始化
        }

        loadAssets() {
          globalThis.thisObj = this;
          resources.loadDir('sound/', AudioClip, function (err, assets) {
            if (err) {
              console.log("加载音频资源出错：", err);
            } else {
              globalThis.thisObj.audioList = assets;

              for (var i = 0; i < globalThis.thisObj.audioList.length; i++) {
                var element = globalThis.thisObj.audioList[i];

                globalThis.thisObj._dict.set(element.name, element);
              }
            }
          });
        }

        play(name) {
          var audioClip = this._dict.get(name);

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
//# sourceMappingURL=91da518422377385d68d4cc13b66ecc659690372.js.map