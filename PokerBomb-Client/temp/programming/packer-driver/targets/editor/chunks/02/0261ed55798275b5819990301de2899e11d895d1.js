System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Node, Label, SpriteAtlas, resources, Sprite, director, tween, Vec3, PushCardVo, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _crd, ccclass, property, BZDSceneMgt;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameRole(extras) {
    _reporterNs.report("GameRole", "../../common/GameRole", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPushCardVo(extras) {
    _reporterNs.report("PushCardVo", "../../common/PushCardVo", _context.meta, extras);
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
      SpriteAtlas = _cc.SpriteAtlas;
      resources = _cc.resources;
      Sprite = _cc.Sprite;
      director = _cc.director;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      PushCardVo = _unresolved_2.PushCardVo;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2144fHpD9FJSYoIxfkbe3eQ", "BZDSceneMgt", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BZDSceneMgt", BZDSceneMgt = (_dec = ccclass('BZDSceneMgt'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Label), _dec8 = property(Node), _dec9 = property(Node), _dec10 = property(Node), _dec11 = property(Node), _dec12 = property(Node), _dec13 = property(Node), _dec14 = property(Node), _dec15 = property(Node), _dec16 = property(Node), _dec17 = property(Label), _dec18 = property(Node), _dec(_class = (_class2 = class BZDSceneMgt extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "roomId", _descriptor, this);

          _initializerDefineProperty(this, "gamecount", _descriptor2, this);

          _initializerDefineProperty(this, "seatName", _descriptor3, this);

          _initializerDefineProperty(this, "seatTotalPoints", _descriptor4, this);

          _initializerDefineProperty(this, "seatJuPoints", _descriptor5, this);

          _initializerDefineProperty(this, "seatPanPoints", _descriptor6, this);

          _initializerDefineProperty(this, "readyOk", _descriptor7, this);

          _initializerDefineProperty(this, "pushCardsView", _descriptor8, this);

          _initializerDefineProperty(this, "passLable", _descriptor9, this);

          _initializerDefineProperty(this, "readyBtn", _descriptor10, this);

          _initializerDefineProperty(this, "cancelReadyBtn", _descriptor11, this);

          _initializerDefineProperty(this, "startBtn", _descriptor12, this);

          _initializerDefineProperty(this, "pokerView", _descriptor13, this);

          _initializerDefineProperty(this, "passBtn", _descriptor14, this);

          _initializerDefineProperty(this, "pushCardBtn", _descriptor15, this);

          _initializerDefineProperty(this, "paiPoints", _descriptor16, this);

          _initializerDefineProperty(this, "panOver", _descriptor17, this);

          this.cardList = void 0;
          this.pokerAtlas = void 0;
          this.cardSet = new Set();
          this.pushCardSet = new Set();
          this.pushcardVo = void 0;
        }

        start() {
          this.init();
          console.log("怡怡最美~");
          console.log("最爱怡怡~");
        }

        init() {
          this.pushcardVo = new (_crd && PushCardVo === void 0 ? (_reportPossibleCrUseOfPushCardVo({
            error: Error()
          }), PushCardVo) : PushCardVo)();

          globalThis._eventtarget.on("requestRoomInfo", this.onRequestRoomInfo, this);

          globalThis._eventtarget.on("userReady", this.onUserReady, this);

          globalThis._eventtarget.on("dealCards", this.onDealCards, this);

          globalThis._eventtarget.on("pushCards", this.onPushCards, this);

          globalThis._eventtarget.on("updatePoints", this.onUpdatePoints, this);

          globalThis._eventtarget.on("panGameOver", this.panGameOver, this);

          globalThis._eventtarget.on("newUserJoinRoom", this.newUserJoinRoom, this);
        }

        newUserJoinRoom(data) {
          let seat = data.newUserInfo.seat;
          let userInfo = data.newUserInfo.userInfo;
          this.updateTheseat(seat, userInfo);
        }

        updateTheseat(seat, userInfo) {
          if (seat == globalThis._userInfo.room_seat) return;
          seat = (seat - globalThis._userInfo.room_seat + 4) % 4;
          this.seatName[seat].string = userInfo.userName;
          this.seatTotalPoints[seat].string = "总分:" + userInfo.totalPoints;
          this.seatJuPoints[seat].string = "局:" + userInfo.juPoints;
          this.seatPanPoints[seat].string = "盘:" + userInfo.panPoints;
          this.readyOk[seat].active = userInfo.userStatus.status == "READY";
        }

        panGameOver(data) {
          this.panOver.active = true;
          let info = data.panGameOverInfo;
          let panGameInfo = info.panGameInfos;
          let i = globalThis._userInfo.room_seat % 2;
          let label = this.panOver.getChildByName("计分板").getChildByName("本队积分详情").getComponent(Label);
          label.string = "牌面积分：" + panGameInfo[i].points + "\n队伍积分：" + panGameInfo[i].teamPoints + "\n总计：" + panGameInfo[i].total + "\n局分：" + panGameInfo[i].juPoints;
          i = (i + 1) % 2;
          label = this.panOver.getChildByName("计分板").getChildByName("他队积分详情").getComponent(Label);
          label.string = "牌面积分：" + panGameInfo[i].points + "\n队伍积分：" + panGameInfo[i].teamPoints + "\n总计：" + panGameInfo[i].total + "\n局分：" + panGameInfo[i].juPoints;
        }

        onUpdatePoints(data) {
          let seat = (data.seat - globalThis._userInfo.room_seat + 4) % 4;
          let panPoints = data.panPoints;
          this.seatPanPoints[seat].string = "盘:" + panPoints;
          this.seatPanPoints[(seat + 2) % 4].string = "盘:" + panPoints;
        }

        onRequestRoomInfo(data) {
          let roomInfo = data.roomInfo;
          this.roomId.string = roomInfo.roomId;
          this.gamecount.string = roomInfo.currentNumbers + "/" + roomInfo.gameNumbers + "局 " + roomInfo.scoreNumbers + "分";
          this.updateAllSeats(roomInfo);
        }

        updateAllSeats(roomInfo) {
          this.pokerView.active = false;
          let users = roomInfo.gameRoles; //先找到本玩家座位号

          let cur = 0;

          for (let i = 0; i < 4; i++) {
            if (users[i] == null) {
              continue;
            }

            if (users[i].userId == globalThis._userInfo.user_id) {
              cur = i;
              break;
            }
          }

          globalThis._userInfo.room_seat = cur; //渲染各座位信息

          for (let i = 0, j = cur; i < 4; i++, j++) {
            if (j >= 4) j -= 4;
            if (users[j] == null) continue;
            this.seatName[i].string = users[j].userName;
            this.seatTotalPoints[i].string = "总分:" + users[j].totalPoints;
            this.seatJuPoints[i].string = "局:" + users[j].juPoints;
            this.seatPanPoints[i].string = "盘:" + users[j].panPoints;
            this.readyOk[i].active = users[j].userStatus.status == "READY";
            this.passLable[i].active = false;
          }

          let status = users[0].userStatus.status; //还未发牌

          if (status == "UNREADY" || status == "READY") {
            for (let i = 0, j = cur; i < 4; i++, j++) {
              if (j >= 4) j -= 4;
              if (users[j] == null) continue;
              let bool = users[j].userStatus.status == "READY";
              this.readyOk[i].active = bool;
            }

            let bool = users[cur].userStatus.status == "READY";
            this.readyBtn.active = !bool;
            this.cancelReadyBtn.active = bool;
            if (roomInfo.readyNumbers == 4 && globalThis._userInfo.user_id == roomInfo.createUserId) this.startBtn.active = true;else this.startBtn.active = false;
          } else {
            //已经发牌了
            //显示玩家手牌
            this.cardList = users[cur].userCards;
            this.onloadAtlas();
            let bool = true;

            for (let i = 0, j = cur; i < 4; i++, j++) {
              if (j >= 4) j -= 4;
              let status = users[j].userStatus.status;

              if (status == "PLAYED") {
                let cardList = users[j].userStatus.data;
                this.showPushCards(i, cardList);
                bool = false;
              } else if (status == "PLAYING") {//
              } else if (status == "PASS") {
                this.passLable[i].active = true;
              } else if (status == "END") {//
              }
            }

            if (users[cur].userStatus.status == "PLAYING") {
              this.pushCardBtn.active = true;
              this.passBtn.active = bool;
            }

            this.paiPoints.string = "牌面积分:" + roomInfo.curPoints;
          }
        }

        onUserReady(data) {
          let mySeat = globalThis._userInfo.room_seat;
          if (data.readyNumbers == 4 && globalThis._userInfo.user_id == data.createUserId) this.startBtn.active = true;else this.startBtn.active = false;
          let seat = data.seat;
          let ready = data.isReady == 1;
          this.readyOk[(seat - mySeat + 4) % 4].active = ready;
        }

        onReadyBtnClicked() {
          this.readyBtn.active = false;
          this.cancelReadyBtn.active = true;

          globalThis._BZDClient.sendMessage("userReady", {
            seat: globalThis._userInfo.room_seat,
            isReady: 1,
            roomId: globalThis._userInfo.room_id
          });
        }

        onCancelReadyBtnClicked() {
          this.readyBtn.active = true;
          this.cancelReadyBtn.active = false;

          globalThis._BZDClient.sendMessage("userReady", {
            seat: globalThis._userInfo.room_seat,
            isReady: -1,
            roomId: globalThis._userInfo.room_id
          });
        }

        onStartBtnClicked() {
          globalThis._BZDClient.sendMessage("dealCards", {});
        }

        onExitRoomBtnClicked() {
          director.loadScene("HallScene");
        }

        onDealCards(data) {
          console.log("获得牌型：", data);
          this.startBtn.active = false;
          this.readyBtn.active = false;
          this.cancelReadyBtn.active = false; //初始化各出牌区域

          for (let i = 0; i < 4; i++) {
            this.cleanPushCards(i);
          }

          for (let i = 0; i < 4; i++) {
            this.readyOk[i].active = false;
          }

          let cards = data.cardList[globalThis._userInfo.room_seat];
          this.cardList = cards;
          this.onloadAtlas();
        }

        onloadAtlas() {
          resources.load("image/games/bazhadan/card/pokerlist", SpriteAtlas, (err, spriteAtlas) => {
            if (err) console.log("load atlas err: ", err);else {
              this.pokerAtlas = spriteAtlas;
              this.showPoker();
            }
          });
        }

        showPoker() {
          this.pokerView.active = true;
          this.passBtn.active = false;
          this.pushCardBtn.active = false;
          let bpk = this.pokerAtlas.getSpriteFrame("0");
          let x = -360,
              y = -50,
              z = 0;

          for (let i = 0; i < this.cardList.length; i++) {
            if (i == 17) {
              y = -150;
              x -= 850;
            }

            let pk = this.pokerAtlas.getSpriteFrame(this.cardList[i] + "");
            let cardName = "card" + i;
            let cardNode = this.pokerView.getChildByName(cardName);
            cardNode.setPosition(new Vec3(0, 185, 0));
            cardNode.active = true;
            let sp = cardNode.getComponent(Sprite);
            sp.spriteFrame = bpk;
            tween(cardNode).to(1.5, {
              position: new Vec3(i * 50 + x, y, z)
            }).call(() => sp.spriteFrame = pk).start();
          }

          if (globalThis._userInfo.room_seat == 0) {
            this.showPushCardsBtn();
          }
        }

        onCardClicked(type, arg) {
          let cardName = "card" + arg;
          let cardNode = this.pokerView.getChildByName(cardName);
          let p = cardNode.getPosition();

          if (this.cardSet.has(arg)) {
            this.cardSet.delete(arg);
            p.y -= 30;
          } else {
            this.cardSet.add(arg);
            p.y += 30;
          }

          cardNode.setPosition(p);
        }

        onPushCardBtnClicked() {
          console.log("出牌！");
          console.log(this.pushcardVo);
          console.log(JSON.stringify(this.pushcardVo));
          this.pushcardVo.curCardList.length = 0;
          let cards = Array.from(this.cardSet);
          cards.sort((a, b) => a - b);
          console.log("eee:", cards);

          for (let i of cards) {
            let cardName = "card" + i;
            let cardNode = this.pokerView.getChildByName(cardName);
            let sp = cardNode.getComponent(Sprite);
            let spf = sp.spriteFrame;
            let cardValue = spf.name;
            this.pushcardVo.curCardList.push(Number(cardValue));
          }

          this.pushcardVo.curSeat = globalThis._userInfo.room_seat;

          globalThis._BZDClient.sendMessage("pushCards", {
            pushCardsInfo: JSON.stringify(this.pushcardVo)
          });
        }

        onPushCards(data) {
          this.pushcardVo = data.pushCardsInfo;
          let curSeat = globalThis._userInfo.room_seat;
          let isRight = data.isRight; //出牌正确

          if (isRight) {
            //是我出的牌
            if (curSeat == this.pushcardVo.preSeat) {
              if (this.pushcardVo.preStatus == "PLAYED") {
                let length = this.cardSet.size;
                let d_x = 30;
                let x = -70 - d_x * (length / 2);
                let cards = Array.from(this.cardSet);
                cards.sort((a, b) => a - b);

                for (let i of cards) {
                  this.pushCardSet.add(i);
                  let cardName = "card" + i;
                  let cardNode = this.pokerView.getChildByName(cardName);
                  tween(cardNode).to(0.8, {
                    position: new Vec3(x, 90, 0)
                  }).start();
                  x += d_x;
                }

                this.cardSet.clear();
                this.passBtn.active = false;
                this.pushCardBtn.active = false;
              } else if (this.pushcardVo.preStatus == "PASS") {}
            } //不是我出的牌，将对应出牌位置更新
            else {
              //先更新出牌位置信息(将牌型展出)，到下一家出牌
              let seat = (this.pushcardVo.preSeat - curSeat + 4) % 4;
              this.cleanPushCards(seat);

              if (this.pushcardVo.preSeat == this.pushcardVo.prePushSeat) {
                //if(this.pushcardVo.preStatus == "PLAYED")
                let cardList = this.pushcardVo.preCardList;
                this.showPushCards(seat, cardList); // let pushCardsView = this.pushCardsView[seat];
                // for(let i = 0; i < cardList.length; i++){
                //     let pk = this.pokerAtlas.getSpriteFrame(cardList[i]+"");
                //     let cardName = "card" + i;
                //     let cardNode = pushCardsView.getChildByName(cardName);
                //     let sp = cardNode.getComponent(Sprite);
                //     sp.spriteFrame = pk;
                //     cardNode.active = true;
                // }
              } else if (this.pushcardVo.preStatus == "PASS") {
                this.passLable[seat].active = true;
              } else if (this.pushcardVo.preStatus == "END") {} //如果下家是我


              if ((this.pushcardVo.preSeat + 1) % 4 == curSeat) {
                for (let i of this.pushCardSet) {
                  let cardName = "card" + i;
                  let cardNode = this.pokerView.getChildByName(cardName);
                  cardNode.active = false;
                }

                this.pushCardSet.clear();

                if (this.pushcardVo.myStatus == "PLAYING") {
                  this.cleanPushCards(0);
                  this.showPushCardsBtn();
                } else if (this.pushcardVo.myStatus == "END") {
                  this.pushcardVo.curSeat = globalThis._userInfo.room_seat;

                  globalThis._BZDClient.sendMessage("userEnd", {
                    pushCardsInfo: JSON.stringify(this.pushcardVo)
                  });
                } else if (this.pushcardVo.myStatus == "OVER") {
                  console.log("游戏结束!");
                  this.pushcardVo.curSeat = globalThis._userInfo.room_seat;

                  globalThis._BZDClient.sendMessage("panGameOver", {
                    pushCardsInfo: JSON.stringify(this.pushcardVo)
                  });
                } else if (this.pushcardVo.myStatus == "TOTEAMMATE") {
                  this.pushcardVo.curSeat = globalThis._userInfo.room_seat;

                  globalThis._BZDClient.sendMessage("TOTEAMMATE", {
                    pushCardsInfo: JSON.stringify(this.pushcardVo)
                  });
                }
              }
            }

            this.paiPoints.string = "牌面积分:" + this.pushcardVo.points;
          } //出牌不正确
          else {
            if (curSeat == this.pushcardVo.curSeat) {
              //是我出的牌
              console.log("不能这样出牌！");
            } else {//不是我出的牌，不用管
            }
          }
        }

        showPushCards(seat, cardList) {
          let pushCardsView = this.pushCardsView[seat];

          for (let i = 0; i < cardList.length; i++) {
            let pk = this.pokerAtlas.getSpriteFrame(cardList[i] + "");
            let cardName = "card" + i;
            let cardNode = pushCardsView.getChildByName(cardName);
            let sp = cardNode.getComponent(Sprite);
            sp.spriteFrame = pk;
            cardNode.active = true;
          }
        }

        showPushCardsBtn() {
          console.log("1:", globalThis._userInfo.room_seat);
          console.log("2:", this.pushcardVo.prePushSeat);
          if (globalThis._userInfo.room_seat == this.pushcardVo.prePushSeat) this.passBtn.active = false;else this.passBtn.active = true;
          this.pushCardBtn.active = true;
          console.log(this.pushCardBtn.active);
        }

        onPassBtnClicked() {
          this.passBtn.active = false;
          this.pushCardBtn.active = false;
          this.passLable[0].active = true;
          this.pushcardVo.curSeat = globalThis._userInfo.room_seat;
          this.cleanCardSet();

          globalThis._BZDClient.sendMessage("passCards", {
            pushCardsInfo: JSON.stringify(this.pushcardVo)
          });
        }

        cleanCardSet() {
          for (let arg of this.cardSet) {
            let cardName = "card" + arg;
            let cardNode = this.pokerView.getChildByName(cardName);
            let p = cardNode.getPosition();
            this.cardSet.delete(arg);
            p.y -= 30;
            cardNode.setPosition(p);
          }
        }

        cleanPushCards(i) {
          let pcv = this.pushCardsView[i];
          pcv.active = true;

          for (let i = 0; i < 27; i++) {
            let cardName = "card" + i;
            let cardNode = pcv.getChildByName(cardName); // let sp = cardNode.getComponent(Sprite);
            // sp.spriteFrame = null;

            cardNode.active = false;
          }

          this.passLable[i].active = false;
        }

        onPanOverPageClosedBtnClicked() {
          this.panOver.active = false;

          globalThis._BZDClient.sendMessage("requestRoomInfo", {});
        }

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
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "seatName", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "seatTotalPoints", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "seatJuPoints", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "seatPanPoints", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "readyOk", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "pushCardsView", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "passLable", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "readyBtn", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "cancelReadyBtn", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "startBtn", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "pokerView", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "passBtn", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "pushCardBtn", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "paiPoints", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "panOver", [_dec18], {
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
//# sourceMappingURL=0261ed55798275b5819990301de2899e11d895d1.js.map