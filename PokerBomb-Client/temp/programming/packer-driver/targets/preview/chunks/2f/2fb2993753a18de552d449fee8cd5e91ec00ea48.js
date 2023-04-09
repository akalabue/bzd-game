System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Node, Label, SpriteAtlas, resources, Sprite, director, tween, Vec3, PushCardVo, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _crd, ccclass, property, BZDSceneMgt;

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

      _export("BZDSceneMgt", BZDSceneMgt = (_dec = ccclass('BZDSceneMgt'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Label), _dec8 = property(Node), _dec9 = property(Node), _dec10 = property(Node), _dec11 = property(Node), _dec12 = property(Node), _dec13 = property(Node), _dec14 = property(Node), _dec15 = property(Label), _dec(_class = (_class2 = class BZDSceneMgt extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "roomId", _descriptor, this);

          _initializerDefineProperty(this, "gamecount", _descriptor2, this);

          _initializerDefineProperty(this, "seatName", _descriptor3, this);

          _initializerDefineProperty(this, "seatTotalPoints", _descriptor4, this);

          _initializerDefineProperty(this, "seatJuPoints", _descriptor5, this);

          _initializerDefineProperty(this, "seatPanPoints", _descriptor6, this);

          _initializerDefineProperty(this, "readyOk", _descriptor7, this);

          _initializerDefineProperty(this, "readyBtn", _descriptor8, this);

          _initializerDefineProperty(this, "cancelReadyBtn", _descriptor9, this);

          _initializerDefineProperty(this, "startBtn", _descriptor10, this);

          _initializerDefineProperty(this, "pokerView", _descriptor11, this);

          _initializerDefineProperty(this, "passBtn", _descriptor12, this);

          _initializerDefineProperty(this, "pushCardBtn", _descriptor13, this);

          _initializerDefineProperty(this, "paiPoints", _descriptor14, this);

          this.cardList = void 0;
          this.pokerAtlas = void 0;
          this.cardSet = new Set();
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

          globalThis._eventtarget.on("dealCards", this.onDealCards, this);

          globalThis._eventtarget.on("pushCards", this.onPushCards, this);

          globalThis._eventtarget.on("updatePoints", this.onUpdatePoints, this);
        }

        onUpdatePoints(data) {
          var seat = data.seat;

          if (seat >= 0) {
            var panPoints = data.panPoints;
            this.seatPanPoints[seat].string = "盘:" + panPoints;
            this.seatPanPoints[(seat + 2) % 4].string = "盘:" + panPoints;
          }
        }

        onRequestRoomInfo(data) {
          console.log("onrequestroomInfo: ", data);
          var roomInfo = data.roomInfo;
          this.roomId.string = roomInfo.roomId;
          this.gamecount.string = roomInfo.currentNumbers + "/" + roomInfo.gameNumbers + "局 " + roomInfo.scoreNumbers + "分"; // if(roomInfo.readyNumbers == 4 && globalThis._userInfo.user_id == roomInfo.createUserId)this.startBtn.active = true;
          // if(globalThis._userInfo.user_id == roomInfo.createUserId)this.startBtn.active = true;
          // else this.startBtn.active = false;

          this.updateAllSeats(roomInfo.gameRoles);
        }

        updateAllSeats(users) {
          // console.log("获取到所有座位信息：",users);
          var cur = 0; //渲染本座位

          for (var i = 0; i < 4; i++) {
            if (users[i] == null) {
              continue;
            }

            if (users[i].userId == globalThis._userInfo.user_id) {
              cur = i;
              this.seatName[0].string = users[i].userName;
              this.seatTotalPoints[0].string = "总分:" + users[i].totalPoints;
              this.seatJuPoints[0].string = "局:" + users[i].juPoints;
              this.seatPanPoints[0].string = "盘:" + users[i].panPoints;
              var ready = users[i].isReady == 1;
              this.readyOk[0].active = ready;
              this.readyBtn.active = !ready;
              this.cancelReadyBtn.active = ready;
            }
          }

          globalThis._userInfo.room_seat = cur; //渲染其他座位

          for (var _i = 1; _i < 4; _i++) {
            if (++cur >= 4) cur -= 4;
            if (users[cur] == null) continue;
            this.seatName[_i].string = users[cur].userName;
            this.seatTotalPoints[_i].string = "总分:" + users[cur].totalPoints;
            this.seatJuPoints[_i].string = "局:" + users[cur].juPoints;
            this.seatPanPoints[_i].string = "盘:" + users[cur].panPoints;
            this.readyOk[_i].active = users[cur].isReady == 1;
          }
        }

        onReadyBtnClicked() {
          globalThis._BZDClient.sendMessage("userReady", {
            seat: globalThis._userInfo.room_seat,
            isReady: 1,
            roomId: globalThis._userInfo.room_id
          });
        }

        onCancelReadyBtnClicked() {
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
          this.cancelReadyBtn.active = false;

          for (var i = 0; i < 4; i++) {
            this.readyOk[i].active = false;
          }

          var cards = data.cardList[globalThis._userInfo.room_seat];
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
          var _this = this;

          this.pokerView.active = true;
          this.passBtn.active = false;
          this.pushCardBtn.active = false;
          var bpk = this.pokerAtlas.getSpriteFrame("0");
          var x = -360,
              y = -50,
              z = 0;

          var _loop = function _loop(i) {
            if (i == 17) {
              y = -150;
              x -= 850;
            }

            var pk = _this.pokerAtlas.getSpriteFrame(_this.cardList[i] + "");

            var cardName = "card" + i;

            var cardNode = _this.pokerView.getChildByName(cardName);

            cardNode.setPosition(new Vec3(0, 185, 0));
            var sp = cardNode.getComponent(Sprite);
            sp.spriteFrame = bpk;
            tween(cardNode).to(1.5, {
              position: new Vec3(i * 50 + x, y, z)
            }).call(() => sp.spriteFrame = pk).start();
          };

          for (var i = 0; i < 27; i++) {
            _loop(i);
          }

          if (globalThis._userInfo.room_seat == 0) {
            this.showPushCardsBtn();
          }
        }

        onCardClicked(type, arg) {
          var cardName = "card" + arg;
          var cardNode = this.pokerView.getChildByName(cardName);
          var p = cardNode.getPosition();

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

          for (var i of this.cardSet) {
            var cardName = "card" + i;
            var cardNode = this.pokerView.getChildByName(cardName);
            var sp = cardNode.getComponent(Sprite);
            var spf = sp.spriteFrame;
            var cardValue = spf.name;
            this.pushcardVo.curCardList.push(Number(cardValue));
          }

          this.pushcardVo.curSeat = globalThis._userInfo.room_seat;

          globalThis._BZDClient.sendMessage("pushCards", {
            pushCardsInfo: JSON.stringify(this.pushcardVo)
          });
        }

        onPushCards(data) {
          this.pushcardVo = data.pushCardsInfo;
          var curSeat = globalThis._userInfo.room_seat;
          var isRight = data.isRight; //出牌正确

          if (isRight) {
            //是我出的牌
            if (curSeat == this.pushcardVo.preSeat) {
              var length = this.cardSet.size;
              this.cardSet = new Set(Array.from(this.cardSet).sort());
              console.log(this.cardSet);
              var d_x = 30;
              var x = -70 - d_x * (length / 2);

              for (var i of this.cardSet) {
                var cardName = "card" + i;
                var cardNode = this.pokerView.getChildByName(cardName);
                tween(cardNode).to(0.8, {
                  position: new Vec3(x, 90, 0)
                }).start();
                x += d_x;
              }

              this.cardSet.clear();
              this.passBtn.active = false;
              this.pushCardBtn.active = false;
            } //不是我出的牌，将对应出牌位置更新
            else {
              //先更新出牌位置信息(将牌型展出)，到下一家出牌
              var cardList = this.pushcardVo.preCardList; //如果下家是我

              if ((this.pushcardVo.preSeat + 1) % 4 == curSeat) {
                this.showPushCardsBtn();
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

        showPushCardsBtn() {
          if (globalThis._userInfo.room_seat == this.pushcardVo.prePushSeat) this.passBtn.active = false;else this.passBtn.active = true;
          this.pushCardBtn.active = true;
        }

        onPassBtnClicked() {
          this.passBtn.active = false;
          this.pushCardBtn.active = false;
          this.pushcardVo.curSeat = globalThis._userInfo.room_seat;
          this.cleanCardSet();

          globalThis._BZDClient.sendMessage("passCards", {
            pushCardsInfo: JSON.stringify(this.pushcardVo)
          });
        }

        cleanCardSet() {
          for (var arg of this.cardSet) {
            var cardName = "card" + arg;
            var cardNode = this.pokerView.getChildByName(cardName);
            var p = cardNode.getPosition();
            this.cardSet.delete(arg);
            p.y -= 30;
            cardNode.setPosition(p);
          }
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
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "seatTotalPoints", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "seatJuPoints", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "seatPanPoints", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "readyOk", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "readyBtn", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "cancelReadyBtn", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "startBtn", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "pokerView", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "passBtn", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "pushCardBtn", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "paiPoints", [_dec15], {
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
//# sourceMappingURL=2fb2993753a18de552d449fee8cd5e91ec00ea48.js.map