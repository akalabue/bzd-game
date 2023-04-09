System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Label, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, joinRoom;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Label = _cc.Label;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0ffd2PAmD5FS7dvWnGhFXjg", "joinRoom", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("joinRoom", joinRoom = (_dec = ccclass('joinRoom'), _dec2 = property(Label), _dec(_class = (_class2 = class joinRoom extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "showLabel", _descriptor, this);

          this.str = '';
          this.cnt = 0;
        }

        start() {}

        update(deltaTime) {}

        onCloseBtnClicked() {
          this.node.active = false;
        }

        onInputEvent(target, args) {
          console.log(args);

          if (args == '清空') {
            this.str = '';

            for (let i = 0; i < this.cnt; i++) {
              this.showLabel[i].string = '-';
            }

            this.cnt = 0;
            return;
          }

          if (args == '删除') {
            if (this.cnt > 0) {
              this.str = this.str.substring(0, this.str.length - 1);
              this.showLabel[this.cnt - 1].string = '-';
              this.cnt--;
            }

            return;
          }

          this.str = this.str + args;
          this.showLabel[this.cnt++].string = args;
          if (this.cnt == 6) console.log("满了");
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "showLabel", [_dec2], {
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
//# sourceMappingURL=59f2ff55a70854e98596f8d9c189e5e79e788b64.js.map