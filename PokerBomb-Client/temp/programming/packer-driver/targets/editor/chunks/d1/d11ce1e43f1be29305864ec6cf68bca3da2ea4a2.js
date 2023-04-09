System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, SpriteAtlas, resources, Sprite, _dec, _class, _crd, ccclass, property, PokerCtr;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
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

      _export("PokerCtr", PokerCtr = (_dec = ccclass('PokerCtr'), _dec(_class = class PokerCtr extends Component {
        constructor(...args) {
          super(...args);
          this.cardList = void 0;
          this.pokerAtlas = void 0;
          this.pokerView = void 0;
        }

        start() {
          globalThis._eventtarget.on("dealCards", this.onDealCards, this);

          this.pokerView = this.node.getChildByName("PokerView");
        }

        onDealCards(data) {
          console.log("获得牌型：", data);
          let cards = data.cardList[globalThis._userInfo.room_seat];
          let pokerCtl = new PokerCtr();
          pokerCtl.init(cards);
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
          for (let i = 0; i < 7; i++) {
            let pk = this.pokerAtlas.getSpriteFrame(this.cardList[i] + "");
            let cardName = "card" + (i + 1);
            console.log(cardName);
            console.log(this.pokerView);
            let cardNode = this.pokerView.getChildByName(cardName);
            console.log("cardNode:", cardNode);
            let sp = cardNode.getComponent(Sprite);
            sp.spriteFrame = pk;
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d11ce1e43f1be29305864ec6cf68bca3da2ea4a2.js.map