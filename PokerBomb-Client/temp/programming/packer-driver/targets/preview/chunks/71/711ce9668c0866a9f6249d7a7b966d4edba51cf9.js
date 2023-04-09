System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _crd, ccclass, property, createRoom;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "cbda9O4D59Lzpa+Lrkn0Svq", "createRoom", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("createRoom", createRoom = (_dec = ccclass('createRoom'), _dec(_class = class createRoom extends Component {
        constructor() {
          super(...arguments);
          this.gameNumbers = 10;
          this.scoreNumbers = 500;
        }

        //每局游戏分数，默认500分
        start() {
          this.gameNumbers = 10;
        }

        update(deltaTime) {}

        onCloseBtnClicked() {
          this.node.active = false;
        }

        onCreateBtnClicked() {
          console.log("创建按钮点击了");
          var data = {
            createUserId: globalThis._userInfo.user_id * 1,
            gameNumbers: this.gameNumbers * 1,
            scoreNumbers: this.scoreNumbers * 1
          }; // console.log('创建房间信息：', data);

          globalThis._hallClientMgr.sendMessage("createRoom", data);
        } //局数选择


        onGameNumbersBtnClicked(target, args) {
          this.gameNumbers = args;
        } //分数选择


        onScoreNumbersBtnClicked(target, args) {
          this.scoreNumbers = args;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=711ce9668c0866a9f6249d7a7b966d4edba51cf9.js.map