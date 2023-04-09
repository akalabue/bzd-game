System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, AudioClip, AudioSource, resources, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, BZDSoundMgt;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

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

      _export("BZDSoundMgt", BZDSoundMgt = (_dec = ccclass('BZDSoundMgt'), _dec2 = property([AudioClip]), _dec(_class = (_class2 = class BZDSoundMgt extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "audioList", _descriptor, this);

          this._dict = new Map();
          this._audioSource = null;
        }

        start() {
          resources.preloadDir('sound');
          setTimeout(this.loadAssets.bind(this), 1000);

          for (var i = 0; i < this.audioList.length; i++) {
            var element = this.audioList[i];

            this._dict.set(element.name, element);
          }

          this._audioSource = this.getComponent(AudioSource); //音频组件初始化

          console.log(this._dict);
        }

        loadAssets() {
          resources.loadDir('sound/', AudioClip, function (err, assets) {
            console.log("获取到的音频资源：", assets);
          });
        }

        play(name) {
          var audioClip = this._dict.get(name);

          console.log(this._dict, audioClip, this._audioSource);

          if (audioClip !== undefined) {
            this._audioSource.playOneShot(audioClip);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "audioList", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c7a5901b8899964ca17d9e252ebbf453222e8651.js.map