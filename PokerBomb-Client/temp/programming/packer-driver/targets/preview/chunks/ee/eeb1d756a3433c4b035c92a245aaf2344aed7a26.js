System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Node, SpriteAtlas, resources, Sprite, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, PokerCtr;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      SpriteAtlas = _cc.SpriteAtlas;
      resources = _cc.resources;
      Sprite = _cc.Sprite;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d0d46EUrV9HdqHad3pBoJHo", "PokerCtr", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PokerCtr", PokerCtr = (_dec = ccclass('PokerCtr'), _dec2 = property(Node), _dec(_class = (_class2 = class PokerCtr extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "pokerView", _descriptor, this);

          this.cardList = void 0;
          this.pokerAtlas = void 0;
        }

        init(cards) {
          this.cardList = cards;
          this.onloadAtlas();
        }

        onloadAtlas() {
          resources.load("image/games/bazhadan/card/pokerlist", SpriteAtlas, (err, spriteAtlas) => {
            if (err) console.log("load atlas err: ", err);else {
              this.pokerAtlas = spriteAtlas;
              console.log("this.atlas: ", this.pokerAtlas);
              this.showPoker();
            }
          });
        }

        showPoker() {
          this.pokerView.active = true;

          for (var i = 0; i < 7; i++) {
            var pk = this.pokerAtlas.getSpriteFrame(this.cardList[i] + "");
            var cardName = "card" + (i + 1);
            console.log(cardName);
            console.log(this.pokerView);
            var cardNode = this.pokerView.getChildByName(cardName);
            console.log("cardNode:", cardNode);
            var sp = cardNode.getComponent(Sprite);
            sp.spriteFrame = pk;
          }
        }

        start() {}

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "pokerView", [_dec2], {
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
//# sourceMappingURL=eeb1d756a3433c4b035c92a245aaf2344aed7a26.js.map