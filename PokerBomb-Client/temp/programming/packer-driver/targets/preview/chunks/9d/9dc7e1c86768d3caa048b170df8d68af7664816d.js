System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Node, EditBox, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, LoginScence;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      EditBox = _cc.EditBox;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2cecekPD9VBnrWabG0egeEE", "LoginScene", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("LoginScence", LoginScence = (_dec = ccclass('LoginScence'), _dec2 = property(Node), _dec(_class = (_class2 = class LoginScence extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "my_EditBox", _descriptor, this);
        }

        start() {}

        update(deltaTime) {}
        /**
         * onLogin
         */


        onLoginBtnClicked() {
          var str = this.my_EditBox.getComponent(EditBox).string;
          console.log("获取账号:", str);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "my_EditBox", [_dec2], {
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
//# sourceMappingURL=9dc7e1c86768d3caa048b170df8d68af7664816d.js.map