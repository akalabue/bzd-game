System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Node, Label, HallSoundMgt, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, joinRoom;

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
      Node = _cc.Node;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      HallSoundMgt = _unresolved_2.HallSoundMgt;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0ffd2PAmD5FS7dvWnGhFXjg", "joinRoom", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("joinRoom", joinRoom = (_dec = ccclass('joinRoom'), _dec2 = property(_crd && HallSoundMgt === void 0 ? (_reportPossibleCrUseOfHallSoundMgt({
        error: Error()
      }), HallSoundMgt) : HallSoundMgt), _dec3 = property(Node), _dec(_class = (_class2 = class joinRoom extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "hallSoundMgt", _descriptor, this);

          _initializerDefineProperty(this, "showLabel", _descriptor2, this);

          this.str = '';
          this.cnt = 0;
        }

        start() {}

        update(deltaTime) {}

        onCloseBtnClicked() {
          this.hallSoundMgt.play("button");
          this.node.active = false;
          this.cleanLabelList();
        }

        onInputEvent(target, args) {
          // console.log(args,"/bn");
          // for(let i = 0; i < 6; i++)console.log(this.showLabel[i].getComponent(Label).string);
          this.hallSoundMgt.play("button");

          if (args == '清空') {
            this.cleanLabelList();
            return;
          }

          if (args == '删除') {
            if (this.cnt > 0) {
              this.str = this.str.substring(0, this.str.length - 1);
              this.showLabel[this.cnt - 1].getComponent(Label).string = '-';
              this.cnt--;
            }

            return;
          }

          if (this.cnt == 6) return;
          this.str = this.str + args;
          this.showLabel[this.cnt++].getComponent(Label).string = args;
        }

        onJoinBtnClicked() {
          this.hallSoundMgt.play("button");

          if (this.cnt == 6) {
            globalThis._hallClientMgr.sendMessage("joinRoom", {
              roomId: this.str,
              userId: globalThis._userInfo.user_id
            });

            this.cleanLabelList();
          }
        }

        cleanLabelList() {
          this.str = '';

          for (let i = 0; i < this.cnt; i++) {
            this.showLabel[i].getComponent(Label).string = '-';
          }

          this.cnt = 0;
          return;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "hallSoundMgt", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "showLabel", [_dec3], {
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
//# sourceMappingURL=ada4230e8c4cfe76a759bb031777b30ed315d0b2.js.map