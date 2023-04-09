System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Label, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, BZDSceneMgt;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameRole(extras) {
    _reporterNs.report("GameRole", "../../common/GameRole", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
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

      _export("BZDSceneMgt", BZDSceneMgt = (_dec = ccclass('BZDSceneMgt'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Label), _dec(_class = (_class2 = class BZDSceneMgt extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "roomId", _descriptor, this);

          _initializerDefineProperty(this, "gamecount", _descriptor2, this);

          _initializerDefineProperty(this, "seatName", _descriptor3, this);

          _initializerDefineProperty(this, "seatTotalPoints", _descriptor4, this);

          _initializerDefineProperty(this, "seatJuPoints", _descriptor5, this);

          _initializerDefineProperty(this, "seatPanPoints", _descriptor6, this);
        }

        start() {
          this.init();
        }

        init() {
          globalThis._eventtarget.on("requestRoomInfo", this.onRequestRoomInfo, this);
        }

        update(deltaTime) {}

        onRequestRoomInfo(data) {
          console.log("onrequestroomInfo：", data);
          let roomInfo = data.roomInfo;
          this.roomId.string = roomInfo.roomId;
          this.gamecount.string = roomInfo.currentNumbers + "/" + roomInfo.gameNumbers + "局 " + roomInfo.scoreNumbers + "分";
          this.updateAllSeats(roomInfo.gameRoles);
        }

        updateAllSeats(users) {
          // console.log("获取到所有座位信息：",users);
          let cur = 0; //渲染本座位

          for (let i = 0; i < 4; i++) {
            if (users[i] == null) {
              continue;
            }

            if (users[i].userId == globalThis._userInfo.user_id) {
              cur = i;
              this.seatName[0].string = users[i].userName;
              this.seatTotalPoints[0].string = "总分:" + users[i].totalPoints;
              this.seatJuPoints[0].string = "局:" + users[i].juPoints;
              this.seatPanPoints[0].string = "盘:" + users[i].panPoints;
            }
          }

          globalThis._userInfo.room_seat = cur; //渲染其他座位

          for (let i = 1; i < 4; i++) {
            if (++cur >= 4) cur -= 4;
            if (users[cur] == null) continue;
            this.seatName[i].string = users[cur].userName;
            this.seatTotalPoints[i].string = "总分:" + users[cur].totalPoints;
            this.seatJuPoints[i].string = "局:" + users[cur].juPoints;
            this.seatPanPoints[i].string = "盘:" + users[cur].panPoints;
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
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4b4f41c9fbed6a5725e25e24e81a43e14352d38a.js.map