System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, HallSoundMgt, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, createRoom;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfHallSoundMgt(extras) {
    _reporterNs.report("HallSoundMgt", "./HallSoundMgt", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }, function (_unresolved_2) {
      HallSoundMgt = _unresolved_2.HallSoundMgt;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "cbda9O4D59Lzpa+Lrkn0Svq", "createRoom", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("createRoom", createRoom = (_dec = ccclass('createRoom'), _dec2 = property(_crd && HallSoundMgt === void 0 ? (_reportPossibleCrUseOfHallSoundMgt({
        error: Error()
      }), HallSoundMgt) : HallSoundMgt), _dec(_class = (_class2 = class createRoom extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "hallSoundMgt", _descriptor, this);

          this.gameNumbers = 10;
          this.scoreNumbers = 500;
        }

        //每局游戏分数，默认500分
        start() {
          this.gameNumbers = 10;
        }

        update(deltaTime) {}

        onCloseBtnClicked() {
          this.hallSoundMgt.play("button");
          this.node.active = false;
        }

        onCreateBtnClicked() {
          console.log("创建按钮点击了");
          this.hallSoundMgt.play("button");
          let data = {
            createUserId: globalThis._userInfo.user_id * 1,
            gameNumbers: this.gameNumbers * 1,
            scoreNumbers: this.scoreNumbers * 1
          }; // console.log('创建房间信息：', data);

          globalThis._hallClientMgr.sendMessage("createRoom", data);
        } //局数选择


        onGameNumbersBtnClicked(target, args) {
          this.hallSoundMgt.play("button");
          this.gameNumbers = args;
        } //分数选择


        onScoreNumbersBtnClicked(target, args) {
          this.hallSoundMgt.play("button");
          this.scoreNumbers = args;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "hallSoundMgt", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c130968af498d0127a58b711f9faea71092f0021.js.map