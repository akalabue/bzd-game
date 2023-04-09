System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Label, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, BZDSceneMgt;

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

      _cclegacy._RF.push({}, "2144fHpD9FJSYoIxfkbe3eQ", "BZDSceneMgt", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BZDSceneMgt", BZDSceneMgt = (_dec = ccclass('BZDSceneMgt'), _dec2 = property(Label), _dec3 = property(Label), _dec(_class = (_class2 = class BZDSceneMgt extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "roomId", _descriptor, this);

          _initializerDefineProperty(this, "gamecount", _descriptor2, this);
        }

        start() {}

        init() {
          globalThis._eventTarget.on("requestRoomInfo", this.onRequestRoomInfo, this);
        }

        update(deltaTime) {}

        onRequestRoomInfo(data) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "roomId", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gamecount", [_dec3], {
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
//# sourceMappingURL=019257641b74a337e6d6bcad3f3a3eebfc287057.js.map