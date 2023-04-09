System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Node, Label, director, HallSoundMgt, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, HallSceneMgt;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfHallSoundMgt(extras) {
    _reporterNs.report("HallSoundMgt", "./HallSoundMgt", _context.meta, extras);
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
      director = _cc.director;
    }, function (_unresolved_2) {
      HallSoundMgt = _unresolved_2.HallSoundMgt;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1967d+hZuVGxocpiSNX8Paa", "HallSceneMgt", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("HallSceneMgt", HallSceneMgt = (_dec = ccclass('HallSceneMgt'), _dec2 = property(Node), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Node), _dec(_class = (_class2 = class HallSceneMgt extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "createRoom", _descriptor, this);

          _initializerDefineProperty(this, "nameLabel", _descriptor2, this);

          _initializerDefineProperty(this, "idLabel", _descriptor3, this);

          _initializerDefineProperty(this, "joinRoom", _descriptor4, this);

          this.hallSoundMgt = void 0;
        }

        start() {
          this.init();
        }

        update(deltaTime) {}

        init() {
          globalThis._eventtarget.on("createRoom", this.onCreateRoom, this);

          globalThis._eventtarget.on("joinRoom", this.onJoinRoom, this);

          this.idLabel.string = 'ID:' + globalThis._userInfo.user_id;
          this.nameLabel.string = globalThis._userInfo.user_name;
          this.hallSoundMgt = (_crd && HallSoundMgt === void 0 ? (_reportPossibleCrUseOfHallSoundMgt({
            error: Error()
          }), HallSoundMgt) : HallSoundMgt).getInstance();
        } //创建房间按钮点击的逻辑


        onCreateRoomBtnClicked() {
          console.log("创建房间按钮被点击了...");
          this.hallSoundMgt.play("button"); // globalThis._hallClientMgr.sendMessage("create_room",{});

          this.createRoom.active = true;
        }

        onCreateRoom(data) {
          let roomId = data.roomId;
          console.log("创建了房间：", roomId);
          globalThis._userInfo.room_id = roomId;
          director.loadScene("bazhadan");
        }

        onJoinRoomBtnClicked() {
          console.log("加入房间按钮被点击了");
          this.hallSoundMgt.play("button");
          this.joinRoom.active = true;
        }

        onJoinRoom(data) {
          let roomId = data.roomId;

          if (roomId != -1) {
            console.log("加入了房间：", roomId);
            globalThis._userInfo.room_id = roomId;
            director.loadScene("bazhadan");
          } else console.log("房间号不存在");
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "createRoom", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nameLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "idLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "joinRoom", [_dec5], {
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
//# sourceMappingURL=2c7289d10fdc50c12faaa46cc06079737ee979ed.js.map