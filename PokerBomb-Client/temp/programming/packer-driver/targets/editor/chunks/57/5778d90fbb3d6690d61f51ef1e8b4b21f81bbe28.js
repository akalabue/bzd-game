System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Prefab, SpriteAtlas, resources, instantiate, Sprite, _dec, _class, _crd, ccclass, property, Poker;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Prefab = _cc.Prefab;
      SpriteAtlas = _cc.SpriteAtlas;
      resources = _cc.resources;
      instantiate = _cc.instantiate;
      Sprite = _cc.Sprite;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1c169QiLixNeZ3x8NKuwF40", "Poker", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Poker", Poker = (_dec = ccclass('Poker'), _dec(_class = class Poker extends Component {
        constructor(...args) {
          super(...args);
          this.pokerNode = void 0;
          this.pokerAtlas = void 0;
          this.cardList = void 0;
        }

        start() {}

        update(deltaTime) {}

        init(cardList) {
          this.cardList = cardList;
          resources.load("image/games/bazhadan/card/pokerlist", SpriteAtlas, (err, spriteAtlas) => {
            if (err) console.log("load atlas err: ", err);else {
              this.pokerAtlas = spriteAtlas;
              console.log("this.atlas: ", this.pokerAtlas);
              this.onLoadPrefab();
            }
          });
        }

        onLoadPrefab() {
          resources.load("image/games/bazhadan/PokerView", Prefab, (err, prefab) => {
            if (err) console.log("load prefab err: ", err);else {
              this.pokerNode = instantiate(prefab);
              console.log("pokerNode:", this.pokerNode); // this.node.addChild(this.pokerPrefab);

              this.showPoker();
            }
          });
        }

        showPoker() {
          for (let i = 0; i < 7; i++) {
            let pk = this.pokerAtlas.getSpriteFrame(this.cardList[i] + "");
            let cardName = "card" + (i + 1);
            console.log(cardName);
            console.log(this.pokerNode);
            let cardNode = this.pokerNode.getChildByName(cardName);
            console.log("cardNode:", cardNode);
            let sp = cardNode.getComponent(Sprite);
            sp.spriteFrame = pk;
          }

          this.node.addChild(this.pokerNode);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5778d90fbb3d6690d61f51ef1e8b4b21f81bbe28.js.map