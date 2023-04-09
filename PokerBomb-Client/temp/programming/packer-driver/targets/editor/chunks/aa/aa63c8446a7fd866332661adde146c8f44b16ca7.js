System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, AudioClip, AudioSource, _dec, _dec2, _class, _class2, _descriptor, _class3, _crd, ccclass, property, HallSoundMgt;

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
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8d715uwsadJL4M/tstRm8m8", "HallSoundMgt", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("HallSoundMgt", HallSoundMgt = (_dec = ccclass('SoundMgt'), _dec2 = property([AudioClip]), _dec(_class = (_class2 = (_class3 = class HallSoundMgt extends Component {
        constructor() {
          super();

          _initializerDefineProperty(this, "audioList", _descriptor, this);

          this._dict = new Map();
          this._audioSource = null;
        }
        /**
         * getInstance
         */


        getInstance() {
          if (!HallSoundMgt.instance) HallSoundMgt.instance = new HallSoundMgt();
          return HallSoundMgt.instance;
        }

        start() {
          for (let i = 0; i < this.audioList.length; i++) {
            const element = this.audioList[i];
            this._dict[element.name] = element;
          }

          this._audioSource = this.getComponent(AudioSource); //音频组件初始化
        }

        play(name) {
          const audioClip = this._dict[name];

          if (audioClip !== undefined) {
            this._audioSource.playOneShot(audioClip);
          }
        }

      }, _class3.instance = void 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "audioList", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=aa63c8446a7fd866332661adde146c8f44b16ca7.js.map