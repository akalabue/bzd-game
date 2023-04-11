System.register("chunks:///_virtual/BZDClient.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(e){"use strict";var n,o,t,s;return{setters:[function(e){n=e.inheritsLoose},function(e){o=e.cclegacy,t=e._decorator,s=e.Component}],execute:function(){var r;o._RF.push({},"7cd74Dyk0lMIrf+pwjkSg+H","BZDClient",void 0);var i=t.ccclass;t.property,e("BZDClient",i("BZDClient")(r=function(e){function o(){for(var n,o=arguments.length,t=new Array(o),s=0;s<o;s++)t[s]=arguments[s];return(n=e.call.apply(e,[this].concat(t))||this)._ws=null,n}n(o,e);var t=o.prototype;return t.start=function(){this._init()},t.update=function(e){},t._init=function(){globalThis._BZDClient=this,this._connectServer()},t._connectServer=function(){var e=this,n=new WebSocket("ws://"+window.location.hostname+":9091/websocket/bzd/"+globalThis._userInfo.room_id+"/"+globalThis._userInfo.user_id);this._ws=n,n.onopen=function(){console.log("连接霸炸弹游戏服务器成功"),e.requestRoomInfo(),e.newUserJoinRoom()},n.onmessage=function(n){var o=n.data,t=JSON.parse(o);console.log("接收到霸炸弹服务器消息：",t);var s=t.data,r=t.type;e.responseServerMessage(r,s)},n.onclose=function(){console.log("与霸炸弹游戏服务器断开连接")},n.onerror=function(e){console.log("霸炸弹服务器网络连接出错：",e)}},t.responseServerMessage=function(e,n){globalThis._eventtarget.emit(e,n)},t.sendMessage=function(e,n){var o={type:e,data:n};console.log(o),this._ws.send(JSON.stringify(o))},t.requestRoomInfo=function(){this.sendMessage("requestRoomInfo",{})},t.newUserJoinRoom=function(){this.sendMessage("newUserJoinRoom",{})},o}(s))||r);o._RF.pop()}}}));

System.register("chunks:///_virtual/BZDSceneMgt.ts",["./rollupPluginModLoBabelHelpers.js","cc","./PushCardVo.ts","./BZDSoundMgt.ts"],(function(t){"use strict";var e,s,a,i,r,o,n,h,l,u,c,p,d,g,f,m,v;return{setters:[function(t){e=t.applyDecoratedDescriptor,s=t.inheritsLoose,a=t.initializerDefineProperty,i=t.assertThisInitialized,r=t.createForOfIteratorHelperLoose},function(t){o=t.cclegacy,n=t._decorator,h=t.Label,l=t.Node,u=t.SpriteAtlas,c=t.director,p=t.Sprite,d=t.Vec3,g=t.Component,f=t.tween},function(t){m=t.PushCardVo},function(t){v=t.BZDSoundMgt}],execute:function(){var b,y,S,C,B,P,_,V,I,w,T,k,N,M,R,z,A,D,L,O,E,Z,F,J,U,Y,G,x,j,q,H,Q,W,K,X,$,tt,et,st,at,it,rt,ot;o._RF.push({},"2144fHpD9FJSYoIxfkbe3eQ","BZDSceneMgt",void 0);var nt=n.ccclass,ht=n.property;t("BZDSceneMgt",(b=nt("BZDSceneMgt"),y=ht(h),S=ht(h),C=ht(h),B=ht(h),P=ht(h),_=ht(h),V=ht(l),I=ht(l),w=ht(l),T=ht(l),k=ht(l),N=ht(l),M=ht(l),R=ht(l),z=ht(l),A=ht(l),D=ht(h),L=ht(l),O=ht(u),E=ht(v),b((J=e((F=function(t){function e(){for(var e,s=arguments.length,r=new Array(s),o=0;o<s;o++)r[o]=arguments[o];return e=t.call.apply(t,[this].concat(r))||this,a(e,"roomId",J,i(e)),a(e,"gamecount",U,i(e)),a(e,"seatName",Y,i(e)),a(e,"seatTotalPoints",G,i(e)),a(e,"seatJuPoints",x,i(e)),a(e,"seatPanPoints",j,i(e)),a(e,"readyOk",q,i(e)),a(e,"pushCardsView",H,i(e)),a(e,"passLable",Q,i(e)),a(e,"readyBtn",W,i(e)),a(e,"cancelReadyBtn",K,i(e)),a(e,"startBtn",X,i(e)),a(e,"pokerView",$,i(e)),a(e,"passBtn",tt,i(e)),a(e,"promptBtn",et,i(e)),a(e,"pushCardBtn",st,i(e)),a(e,"paiPoints",at,i(e)),a(e,"panOver",it,i(e)),a(e,"pokerAtlas",rt,i(e)),a(e,"bzdSoundMgt",ot,i(e)),e.cardList=void 0,e.cardSet=new Set,e.pushcardVo=void 0,e.promptInfo=null,e.index=0,e}s(e,t);var o=e.prototype;return o.start=function(){this.init(),console.log("怡怡最美~"),console.log("最爱怡怡~")},o.init=function(){this.pushcardVo=new m,globalThis._eventtarget.on("requestRoomInfo",this.onRequestRoomInfo,this),globalThis._eventtarget.on("userReady",this.onUserReady,this),globalThis._eventtarget.on("dealCards",this.onDealCards,this),globalThis._eventtarget.on("pushCards",this.onPushCards,this),globalThis._eventtarget.on("updatePoints",this.onUpdatePoints,this),globalThis._eventtarget.on("panGameOver",this.panGameOver,this),globalThis._eventtarget.on("newUserJoinRoom",this.newUserJoinRoom,this),globalThis._eventtarget.on("prompt",this.onPrompt,this)},o.onPromptBtnClicked=function(){null==this.promptInfo?(this.pushcardVo.curSeat=globalThis._userInfo.room_seat,globalThis._BZDClient.sendMessage("prompt",{pushCardsInfo:JSON.stringify(this.pushcardVo)})):(this.cleanCardSet(),this.promptCard())},o.onPrompt=function(t){this.promptInfo=t.promptInfo,this.promptCard()},o.promptCard=function(){if(0!=this.promptInfo.length){this.index>=this.promptInfo.length&&(this.index=0);var t=this.promptInfo[this.index];this.bzdSoundMgt.play("SpecSelectCard");for(var e,s=r(t);!(e=s()).done;){var a=e.value,i="card"+a,o=this.pokerView.getChildByName(i),n=o.getPosition();this.cardSet.has(a)?(this.cardSet.delete(a),n.y-=30):(this.cardSet.add(a),n.y+=30),o.setPosition(n)}this.index++}else console.log("您没有比上家大的牌！")},o.newUserJoinRoom=function(t){var e=t.newUserInfo.seat,s=t.newUserInfo.userInfo;this.updateTheseat(e,s)},o.updateTheseat=function(t,e){t!=globalThis._userInfo.room_seat&&(t=(t-globalThis._userInfo.room_seat+4)%4,this.seatName[t].string=e.userName,this.seatTotalPoints[t].string="总分:"+e.totalPoints,this.seatJuPoints[t].string="局:"+e.juPoints,this.seatPanPoints[t].string="盘:"+e.panPoints,this.readyOk[t].active="READY"==e.userStatus.status)},o.panGameOver=function(t){this.panOver.active=!0;var e=t.panGameOverInfo.panGameInfos,s=globalThis._userInfo.room_seat%2,a=this.panOver.getChildByName("计分板").getChildByName("本队积分详情").getComponent(h);a.string="牌面积分："+e[s].points+"\n队伍积分："+e[s].teamPoints+"\n总计："+e[s].total+"\n局分："+e[s].juPoints,s=(s+1)%2,(a=this.panOver.getChildByName("计分板").getChildByName("他队积分详情").getComponent(h)).string="牌面积分："+e[s].points+"\n队伍积分："+e[s].teamPoints+"\n总计："+e[s].total+"\n局分："+e[s].juPoints},o.onUpdatePoints=function(t){var e=(t.seat-globalThis._userInfo.room_seat+4)%4,s=t.panPoints;this.seatPanPoints[e].string="盘:"+s,this.seatPanPoints[(e+2)%4].string="盘:"+s},o.onRequestRoomInfo=function(t){var e=t.roomInfo;this.roomId.string=e.roomId,this.gamecount.string=e.currentNumbers+"/"+e.gameNumbers+"局 "+e.scoreNumbers+"分",this.updateAllSeats(e)},o.updateAllSeats=function(t){this.pokerView.active=!1;for(var e=t.gameRoles,s=0,a=0;a<4;a++)if(null!=e[a]&&e[a].userId==globalThis._userInfo.user_id){s=a;break}globalThis._userInfo.room_seat=s;for(var i=0,r=s;i<4;i++,r++)r>=4&&(r-=4),null!=e[r]&&(this.seatName[i].string=e[r].userName,this.seatTotalPoints[i].string="总分:"+e[r].totalPoints,this.seatJuPoints[i].string="局:"+e[r].juPoints,this.seatPanPoints[i].string="盘:"+e[r].panPoints,this.readyOk[i].active="READY"==e[r].userStatus.status,this.passLable[i].active=!1);var o=e[0].userStatus.status;if("UNREADY"==o||"READY"==o){console.log("还未发牌");for(var n=0,h=s;n<4;n++,h++)if(this.pushCardsView[n].active=!1,h>=4&&(h-=4),null!=e[h]){var l="READY"==e[h].userStatus.status;this.readyOk[n].active=l}var u="READY"==e[s].userStatus.status;this.readyBtn.active=!u,this.cancelReadyBtn.active=u,4==t.readyNumbers&&globalThis._userInfo.user_id==t.createUserId?this.startBtn.active=!0:this.startBtn.active=!1}else{console.log("已经发牌了");for(var c=0;c<4;c++)this.cleanPushCards(c);this.cardList=e[s].userCards;for(var p=!1,d=0,g=s;d<4;d++,g++){g>=4&&(g-=4);var f=e[g].userStatus.status;if("PLAYED"==f){var m=e[g].userStatus.data;this.showPushCards(d,m),p=!0}else"PLAYING"==f?this.showPoker(g):"PASS"==f&&(this.passLable[d].active=!0)}if("PLAYING"==e[s].userStatus.status){this.pushCardBtn.active=!0,this.passBtn.active=p,this.promptBtn.active=p;for(var v=0,b=s;v<4;v++,b--)if(b<0&&(b+=4),"PLAYED"==e[b].userStatus.status){this.pushcardVo.prePushSeat=b,this.pushcardVo.preCardList=e[b].userStatus.data;break}}this.paiPoints.string="牌面积分:"+t.curPoints}},o.onUserReady=function(t){var e=globalThis._userInfo.room_seat;4==t.readyNumbers&&globalThis._userInfo.user_id==t.createUserId?this.startBtn.active=!0:this.startBtn.active=!1;var s=t.seat,a=1==t.isReady;this.readyOk[(s-e+4)%4].active=a},o.onReadyBtnClicked=function(){this.bzdSoundMgt.play("button"),this.readyBtn.active=!1,this.cancelReadyBtn.active=!0,globalThis._BZDClient.sendMessage("userReady",{seat:globalThis._userInfo.room_seat,isReady:1,roomId:globalThis._userInfo.room_id})},o.onCancelReadyBtnClicked=function(){this.bzdSoundMgt.play("button"),this.readyBtn.active=!0,this.cancelReadyBtn.active=!1,globalThis._BZDClient.sendMessage("userReady",{seat:globalThis._userInfo.room_seat,isReady:-1,roomId:globalThis._userInfo.room_id})},o.onStartBtnClicked=function(){this.bzdSoundMgt.play("button"),globalThis._BZDClient.sendMessage("dealCards",{})},o.onExitRoomBtnClicked=function(){this.bzdSoundMgt.play("button"),c.loadScene("HallScene")},o.onDealCards=function(t){console.log("获得牌型：",t),this.bzdSoundMgt.play("DealFold"),this.startBtn.active=!1,this.readyBtn.active=!1,this.cancelReadyBtn.active=!1;for(var e=0;e<4;e++)this.cleanPushCards(e);for(var s=0;s<4;s++)this.readyOk[s].active=!1;var a=t.cardList[globalThis._userInfo.room_seat],i=t.pushSeat;this.cardList=a,this.pushcardVo.prePushSeat=i,this.showPoker(i)},o.onloadAtlas=function(t){this.showPoker(t)},o.showPoker=function(t){var e=this;this.pokerView.active=!0,this.passBtn.active=!1,this.pushCardBtn.active=!1,this.promptBtn.active=!1;for(var s=this.pokerAtlas.getSpriteFrame("0"),a=-360,i=-50,r=function(r){17==r&&(i=-150,a-=850);var o=e.pokerAtlas.getSpriteFrame(e.cardList[r]+""),n="card"+r,h=e.pokerView.getChildByName(n);h.setPosition(new d(0,185,0)),h.active=!0;var l=h.getComponent(p);l.spriteFrame=s,f(h).to(1.5,{position:new d(50*r+a,i,0)}).call((function(){l.spriteFrame=o,26==r&&globalThis._userInfo.room_seat==t&&(e.pushCardBtn.active=!0,globalThis._userInfo.room_seat!=e.pushcardVo.prePushSeat&&(e.passBtn.active=!0))})).start()},o=0;o<this.cardList.length;o++)r(o);for(var n=this.cardList.length;n<27;n++){var h="card"+n;this.pokerView.getChildByName(h).active=!1}},o.onCardClicked=function(t,e){e*=1,this.bzdSoundMgt.play("SpecSelectCard");var s="card"+e,a=this.pokerView.getChildByName(s),i=a.getPosition();this.cardSet.has(e)?(this.cardSet.delete(e),i.y-=30):(this.cardSet.add(e),i.y+=30),a.setPosition(i)},o.onPushCardBtnClicked=function(){console.log("出牌！"),console.log(this.pushcardVo),console.log(JSON.stringify(this.pushcardVo)),this.pushcardVo.curCardList.length=0;var t=Array.from(this.cardSet);t.sort((function(t,e){return t-e})),console.log("eee:",t);for(var e=0,s=t;e<s.length;e++){var a="card"+s[e],i=this.pokerView.getChildByName(a).getComponent(p).spriteFrame.name;this.pushcardVo.curCardList.push(Number(i))}this.pushcardVo.curSeat=globalThis._userInfo.room_seat,globalThis._BZDClient.sendMessage("pushCards",{pushCardsInfo:JSON.stringify(this.pushcardVo)})},o.randomAudioName=function(t){var e=function(t,e){return Math.floor(Math.random()*(e-t+1)+t)},s=e(0,1);"buyao"==t&&(t+=e(1,4));return["Woman_","Man_"][s]+t},o.onPushCards=function(t){this.pushcardVo=t.pushCardsInfo;var e=globalThis._userInfo.room_seat,s=t.isRight,a=this.randomAudioName(this.pushcardVo.type);if(s){if(this.bzdSoundMgt.play(a),e==this.pushcardVo.preSeat)if("PLAYED"==this.pushcardVo.preStatus){this.bzdSoundMgt.play("Special_give");var i=-70-this.cardSet.size/2*30,r=Array.from(this.cardSet);r.sort((function(t,e){return t-e}));for(var o=0,n=r;o<n.length;o++){var h="card"+n[o];this.pokerView.getChildByName(h).active=!1}var l=this.pushcardVo.preCardList;this.showPushCards(0,l),this.cardSet.clear(),i=-360;var u=-50;this.cardList=this.pushcardVo.preUserCards;for(var c=0;c<this.cardList.length;c++){17==c&&(u=-150,i-=850);var g=this.pokerAtlas.getSpriteFrame(this.cardList[c]+""),f="card"+c,m=this.pokerView.getChildByName(f);m.getComponent(p).spriteFrame=g,m.setPosition(new d(50*c+i,u,0)),m.active=!0}for(var v=this.cardList.length;v<27;v++){var b="card"+v;this.pokerView.getChildByName(b).active=!1}this.passBtn.active=!1,this.promptBtn.active=!1,this.pushCardBtn.active=!1}else this.pushcardVo.preStatus;else{var y=(this.pushcardVo.preSeat-e+4)%4;if(this.cleanPushCards(y),this.pushcardVo.preSeat==this.pushcardVo.prePushSeat){var S=this.pushcardVo.preCardList;this.showPushCards(y,S)}else"PASS"==this.pushcardVo.preStatus?this.passLable[y].active=!0:this.pushcardVo.preStatus;(this.pushcardVo.preSeat+1)%4==e&&("PLAYING"==this.pushcardVo.myStatus?(this.cleanPushCards(0),this.promptInfo=null,globalThis._userInfo.room_seat==this.pushcardVo.prePushSeat?(this.passBtn.active=!1,this.promptBtn.active=!1):(this.passBtn.active=!0,this.promptBtn.active=!0),this.pushCardBtn.active=!0):"END"==this.pushcardVo.myStatus?(this.pushcardVo.curSeat=globalThis._userInfo.room_seat,globalThis._BZDClient.sendMessage("userEnd",{pushCardsInfo:JSON.stringify(this.pushcardVo)})):"OVER"==this.pushcardVo.myStatus?(console.log("游戏结束!"),this.pushcardVo.curSeat=globalThis._userInfo.room_seat,globalThis._BZDClient.sendMessage("panGameOver",{pushCardsInfo:JSON.stringify(this.pushcardVo)})):"TOTEAMMATE"==this.pushcardVo.myStatus&&(this.pushcardVo.curSeat=globalThis._userInfo.room_seat,globalThis._BZDClient.sendMessage("TOTEAMMATE",{pushCardsInfo:JSON.stringify(this.pushcardVo)})))}this.paiPoints.string="牌面积分:"+this.pushcardVo.points}else e==this.pushcardVo.curSeat&&(this.bzdSoundMgt.play("SpecSysReturnFail"),console.log("不能这样出牌！"))},o.showPushCards=function(t,e){for(var s=this.pushCardsView[t],a=0;a<e.length;a++){var i=this.pokerAtlas.getSpriteFrame(e[a]+""),r="card"+a,o=s.getChildByName(r);o.getComponent(p).spriteFrame=i,o.active=!0}},o.showPushCardsBtn=function(){console.log("1:",globalThis._userInfo.room_seat),console.log("2:",this.pushcardVo.prePushSeat),globalThis._userInfo.room_seat==this.pushcardVo.prePushSeat?this.passBtn.active=!1:this.passBtn.active=!0,globalThis._userInfo.room_seat==(this.pushcardVo.preSeat+1)%4&&(this.pushCardBtn.active=!0),console.log(this.pushCardBtn.active)},o.onPassBtnClicked=function(){this.passBtn.active=!1,this.pushCardBtn.active=!1,this.promptBtn.active=!1,this.passLable[0].active=!0,this.pushcardVo.curSeat=globalThis._userInfo.room_seat,this.cleanCardSet(),globalThis._BZDClient.sendMessage("passCards",{pushCardsInfo:JSON.stringify(this.pushcardVo)})},o.cleanCardSet=function(){for(var t,e=r(this.cardSet);!(t=e()).done;){var s=t.value,a="card"+s,i=this.pokerView.getChildByName(a),o=i.getPosition();this.cardSet.delete(s),o.y-=30,i.setPosition(o)}},o.cleanPushCards=function(t){var e=this.pushCardsView[t];e.active=!0;for(var s=0;s<27;s++){var a="card"+s;e.getChildByName(a).active=!1}this.passLable[t].active=!1},o.onPanOverPageClosedBtnClicked=function(){this.bzdSoundMgt.play("button"),this.panOver.active=!1,this.pushcardVo=new m,globalThis._BZDClient.sendMessage("requestRoomInfo",{})},o.playAudioEffect=function(t){this.bzdSoundMgt.play(t)},e}(g)).prototype,"roomId",[y],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),U=e(F.prototype,"gamecount",[S],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),Y=e(F.prototype,"seatName",[C],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),G=e(F.prototype,"seatTotalPoints",[B],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),x=e(F.prototype,"seatJuPoints",[P],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),j=e(F.prototype,"seatPanPoints",[_],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),q=e(F.prototype,"readyOk",[V],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),H=e(F.prototype,"pushCardsView",[I],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),Q=e(F.prototype,"passLable",[w],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),W=e(F.prototype,"readyBtn",[T],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),K=e(F.prototype,"cancelReadyBtn",[k],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),X=e(F.prototype,"startBtn",[N],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),$=e(F.prototype,"pokerView",[M],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),tt=e(F.prototype,"passBtn",[R],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),et=e(F.prototype,"promptBtn",[z],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),st=e(F.prototype,"pushCardBtn",[A],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),at=e(F.prototype,"paiPoints",[D],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),it=e(F.prototype,"panOver",[L],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),rt=e(F.prototype,"pokerAtlas",[O],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),ot=e(F.prototype,"bzdSoundMgt",[E],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),Z=F))||Z));o._RF.pop()}}}));

System.register("chunks:///_virtual/BZDSoundMgt.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(t){"use strict";var o,i,s,e,n,u,r;return{setters:[function(t){o=t.inheritsLoose},function(t){i=t.cclegacy,s=t._decorator,e=t.resources,n=t.AudioSource,u=t.AudioClip,r=t.Component}],execute:function(){var a;i._RF.push({},"f3fbfLs7NhLk7OOJ6uGrJOY","BZDSoundMgt",void 0);var l=s.ccclass;s.property,t("BZDSoundMgt",l("BZDSoundMgt")(a=function(t){function i(){for(var o,i=arguments.length,s=new Array(i),e=0;e<i;e++)s[e]=arguments[e];return(o=t.call.apply(t,[this].concat(s))||this).audioList=[],o._dict=new Map,o._audioSource=null,o}o(i,t);var s=i.prototype;return s.start=function(){e.preloadDir("sound"),setTimeout(this.loadAssets.bind(this),1e3),this._audioSource=this.getComponent(n)},s.loadAssets=function(){globalThis.thisObj=this,e.loadDir("sound/",u,(function(t,o){if(t)console.log("加载音频资源出错：",t);else{globalThis.thisObj.audioList=o;for(var i=0;i<globalThis.thisObj.audioList.length;i++){var s=globalThis.thisObj.audioList[i];globalThis.thisObj._dict.set(s.name,s)}}}))},s.play=function(t){var o=this._dict.get(t);void 0!==o&&this._audioSource.playOneShot(o)},i}(r))||a);i._RF.pop()}}}));

System.register("chunks:///_virtual/createRoom.ts",["./rollupPluginModLoBabelHelpers.js","cc","./HallSoundMgt.ts"],(function(e){"use strict";var t,o,n,r,a,s,i,l;return{setters:[function(e){t=e.applyDecoratedDescriptor,o=e.inheritsLoose,n=e.initializerDefineProperty,r=e.assertThisInitialized},function(e){a=e.cclegacy,s=e._decorator,i=e.Component},function(e){l=e.HallSoundMgt}],execute:function(){var u,c,h,m,p;a._RF.push({},"cbda9O4D59Lzpa+Lrkn0Svq","createRoom",void 0);var d=s.ccclass,g=s.property;e("createRoom",(u=d("createRoom"),c=g(l),u((p=t((m=function(e){function t(){for(var t,o=arguments.length,a=new Array(o),s=0;s<o;s++)a[s]=arguments[s];return t=e.call.apply(e,[this].concat(a))||this,n(t,"hallSoundMgt",p,r(t)),t.gameNumbers=10,t.scoreNumbers=500,t}o(t,e);var a=t.prototype;return a.start=function(){this.gameNumbers=10},a.update=function(e){},a.onCloseBtnClicked=function(){this.hallSoundMgt.play("button"),this.node.active=!1},a.onCreateBtnClicked=function(){console.log("创建按钮点击了"),this.hallSoundMgt.play("button");var e={createUserId:1*globalThis._userInfo.user_id,gameNumbers:1*this.gameNumbers,scoreNumbers:1*this.scoreNumbers};globalThis._hallClientMgr.sendMessage("createRoom",e)},a.onGameNumbersBtnClicked=function(e,t){this.hallSoundMgt.play("button"),this.gameNumbers=t},a.onScoreNumbersBtnClicked=function(e,t){this.hallSoundMgt.play("button"),this.scoreNumbers=t},t}(i)).prototype,"hallSoundMgt",[c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),h=m))||h));a._RF.pop()}}}));

System.register("chunks:///_virtual/GameRole.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(o){"use strict";var e,t,r,n;return{setters:[function(o){e=o.inheritsLoose},function(o){t=o.cclegacy,r=o._decorator,n=o.Component}],execute:function(){var i;t._RF.push({},"74e00QZu3BNE5kq1RDX3Dcd","GameRole",void 0);var s=r.ccclass;r.property,o("GameRole",s("GameRole")(i=function(o){function t(){for(var e,t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return(e=o.call.apply(o,[this].concat(r))||this).userId=void 0,e.userName=void 0,e.userIcon=void 0,e.totalPoints=void 0,e.juPoints=void 0,e.panPoints=void 0,e.userCards=void 0,e.userStatus=void 0,e}e(t,o);var r=t.prototype;return r.start=function(){},r.update=function(o){},t}(n))||i);t._RF.pop()}}}));

System.register("chunks:///_virtual/HallClient.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(e){"use strict";var n,t,o,s;return{setters:[function(e){n=e.inheritsLoose},function(e){t=e.cclegacy,o=e._decorator,s=e.Component}],execute:function(){var r;t._RF.push({},"07e44XO3edMgZRPvJjHZGRN","HallClient",void 0);var i=o.ccclass;o.property,e("HallClient",i("HallClient")(r=function(e){function t(){for(var n,t=arguments.length,o=new Array(t),s=0;s<t;s++)o[s]=arguments[s];return(n=e.call.apply(e,[this].concat(o))||this)._ws=null,n}n(t,e);var o=t.prototype;return o.start=function(){this._init()},o.update=function(e){},o._init=function(){globalThis._hallClientMgr=this,this._connectServer()},o._connectServer=function(){var e=this,n=new WebSocket("ws://"+window.location.hostname+":9091/websocket/hall/"+globalThis._userInfo.user_id);this._ws=n,n.onopen=function(){console.log("连接大厅服务器成功")},n.onmessage=function(n){var t=n.data,o=JSON.parse(t);console.log("大厅接收到服务器消息：",o);var s=o.data,r=o.type;e.responseServerMessage(r,s)},n.onclose=function(){console.log("与大厅服务器断开连接")},n.onerror=function(e){console.log("大厅服务器网络连接出错：",e)}},o.responseServerMessage=function(e,n){globalThis._eventtarget.emit(e,n)},o.sendMessage=function(e,n){var t={type:e,data:n};this._ws.send(JSON.stringify(t))},t}(s))||r);t._RF.pop()}}}));

System.register("chunks:///_virtual/HallSceneMgt.ts",["./rollupPluginModLoBabelHelpers.js","cc","./HallSoundMgt.ts"],(function(e){"use strict";var o,n,t,i,l,a,r,u,s,c,g,b,m,h,p;return{setters:[function(e){o=e.applyDecoratedDescriptor,n=e.inheritsLoose,t=e.initializerDefineProperty,i=e.assertThisInitialized},function(e){l=e.cclegacy,a=e._decorator,r=e.Node,u=e.Label,s=e.Sprite,c=e.assetManager,g=e.SpriteFrame,b=e.Texture2D,m=e.director,h=e.Component},function(e){p=e.HallSoundMgt}],execute:function(){var d,f,_,R,S,y,v,I,M,T,z,w,L,C,H;l._RF.push({},"1967d+hZuVGxocpiSNX8Paa","HallSceneMgt",void 0);var j=a.ccclass,x=a.property;e("HallSceneMgt",(d=j("HallSceneMgt"),f=x(r),_=x(u),R=x(u),S=x(r),y=x(r),v=x(p),d((T=o((M=function(e){function o(){for(var o,n=arguments.length,l=new Array(n),a=0;a<n;a++)l[a]=arguments[a];return o=e.call.apply(e,[this].concat(l))||this,t(o,"createRoom",T,i(o)),t(o,"nameLabel",z,i(o)),t(o,"idLabel",w,i(o)),t(o,"joinRoom",L,i(o)),t(o,"iconImg",C,i(o)),t(o,"hallSoundMgt",H,i(o)),o}n(o,e);var l=o.prototype;return l.start=function(){this.init()},l.update=function(e){},l.init=function(){if(globalThis._eventtarget.on("createRoom",this.onCreateRoom,this),globalThis._eventtarget.on("joinRoom",this.onJoinRoom,this),this.idLabel.string="ID:"+globalThis._userInfo.user_id,this.nameLabel.string=globalThis._userInfo.user_name,console.log("1aa",globalThis._userInfo.user_id,globalThis._userInfo.user_name),null!=globalThis._userInfo.user_head_url){var e=this.iconImg.getComponent(s);c.loadRemote(globalThis._userInfo.user_head_url,{ext:".png"},(function(o,n){var t=new g,i=new b;i.image=n,t.texture=i,e.spriteFrame=t}))}},l.onCreateRoomBtnClicked=function(){console.log("创建房间按钮被点击了..."),this.hallSoundMgt.play("button"),this.createRoom.active=!0},l.onCreateRoom=function(e){var o=e.roomId;console.log("创建了房间：",o),globalThis._userInfo.room_id=o,m.loadScene("bazhadan")},l.onJoinRoomBtnClicked=function(){console.log("加入房间按钮被点击了"),this.hallSoundMgt.play("button"),this.joinRoom.active=!0},l.onJoinRoom=function(e){var o=e.roomId;-1!=o?(console.log("加入了房间：",o),globalThis._userInfo.room_id=o,m.loadScene("bazhadan")):console.log("房间号不存在")},l.onSetBtnClicked=function(){alert("敬请完善！！")},o}(h)).prototype,"createRoom",[f],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),z=o(M.prototype,"nameLabel",[_],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),w=o(M.prototype,"idLabel",[R],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),L=o(M.prototype,"joinRoom",[S],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),C=o(M.prototype,"iconImg",[y],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),H=o(M.prototype,"hallSoundMgt",[v],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),I=M))||I));l._RF.pop()}}}));

System.register("chunks:///_virtual/HallSoundMgt.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(t){"use strict";var i,e,o,r,n,a,u,s,c;return{setters:[function(t){i=t.applyDecoratedDescriptor,e=t.inheritsLoose,o=t.initializerDefineProperty,r=t.assertThisInitialized},function(t){n=t.cclegacy,a=t._decorator,u=t.AudioClip,s=t.AudioSource,c=t.Component}],execute:function(){var l,d,p,h,f;n._RF.push({},"8d715uwsadJL4M/tstRm8m8","HallSoundMgt",void 0);var g=a.ccclass,v=a.property;t("HallSoundMgt",(l=g("HallSoundMgt"),d=v([u]),l((f=i((h=function(t){function i(){for(var i,e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];return i=t.call.apply(t,[this].concat(n))||this,o(i,"audioList",f,r(i)),i._dict=new Map,i._audioSource=null,i}e(i,t);var n=i.prototype;return n.start=function(){for(var t=0;t<this.audioList.length;t++){var i=this.audioList[t];this._dict.set(i.name,i)}this._audioSource=this.getComponent(s)},n.play=function(t){var i=this._dict.get(t);void 0!==i&&this._audioSource.playOneShot(i)},i}(c)).prototype,"audioList",[d],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),p=h))||p));n._RF.pop()}}}));

System.register("chunks:///_virtual/joinRoom.ts",["./rollupPluginModLoBabelHelpers.js","cc","./HallSoundMgt.ts"],(function(t){"use strict";var n,i,o,e,s,l,r,a,c,h;return{setters:[function(t){n=t.applyDecoratedDescriptor,i=t.inheritsLoose,o=t.initializerDefineProperty,e=t.assertThisInitialized},function(t){s=t.cclegacy,l=t._decorator,r=t.Node,a=t.Label,c=t.Component},function(t){h=t.HallSoundMgt}],execute:function(){var u,p,g,b,d,f,L;s._RF.push({},"0ffd2PAmD5FS7dvWnGhFXjg","joinRoom",void 0);var m=l.ccclass,y=l.property;t("joinRoom",(u=m("joinRoom"),p=y(h),g=y(r),u((f=n((d=function(t){function n(){for(var n,i=arguments.length,s=new Array(i),l=0;l<i;l++)s[l]=arguments[l];return n=t.call.apply(t,[this].concat(s))||this,o(n,"hallSoundMgt",f,e(n)),o(n,"showLabel",L,e(n)),n.str="",n.cnt=0,n}i(n,t);var s=n.prototype;return s.start=function(){},s.update=function(t){},s.onCloseBtnClicked=function(){this.hallSoundMgt.play("button"),this.node.active=!1,this.cleanLabelList()},s.onInputEvent=function(t,n){this.hallSoundMgt.play("button"),"清空"!=n?"删除"!=n?6!=this.cnt&&(this.str=this.str+n,this.showLabel[this.cnt++].getComponent(a).string=n):this.cnt>0&&(this.str=this.str.substring(0,this.str.length-1),this.showLabel[this.cnt-1].getComponent(a).string="-",this.cnt--):this.cleanLabelList()},s.onJoinBtnClicked=function(){this.hallSoundMgt.play("button"),6==this.cnt&&(globalThis._hallClientMgr.sendMessage("joinRoom",{roomId:this.str,userId:globalThis._userInfo.user_id}),this.cleanLabelList())},s.cleanLabelList=function(){this.str="";for(var t=0;t<this.cnt;t++)this.showLabel[t].getComponent(a).string="-";this.cnt=0},n}(c)).prototype,"hallSoundMgt",[p],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),L=n(d.prototype,"showLabel",[g],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),b=d))||b));s._RF.pop()}}}));

System.register("chunks:///_virtual/LoginClient.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(n){"use strict";var e,t,o,i,s;return{setters:[function(n){e=n.inheritsLoose},function(n){t=n.cclegacy,o=n._decorator,i=n.EventTarget,s=n.Component}],execute:function(){var r;t._RF.push({},"a5e56WEVXRE6LuwJFSl49lY","LoginClient",void 0);var c=o.ccclass,a=(o.property,new i);globalThis._eventtarget=a;n("LoginClient",c("LoginClient")(r=function(n){function t(){for(var e,t=arguments.length,o=new Array(t),i=0;i<t;i++)o[i]=arguments[i];return(e=n.call.apply(n,[this].concat(o))||this)._ws=null,e}e(t,n);var o=t.prototype;return o.start=function(){this._init()},o.update=function(n){},o._init=function(){globalThis._loginClientMgr=this},o._connectServer=function(){var n=this,e=new WebSocket("ws://"+window.location.hostname+":9091/websocket/login");this._ws=e,e.onopen=function(){console.log("连接登录服务器成功")},e.onmessage=function(e){var t=e.data,o=JSON.parse(t);console.log("接收到登录服务器消息：",o);var i=o.data,s=o.type;n.responseServerMessage(s,i)},e.onclose=function(){console.log("与登录服务器断开连接")},e.onerror=function(n){console.log("登录网络连接出错：",n)}},o.responseServerMessage=function(n,e){globalThis._eventtarget.emit(n,e)},o.sendMessage=function(n,e){var t={type:n,data:e};this._ws.send(JSON.stringify(t))},t}(s))||r);t._RF.pop()}}}));

System.register("chunks:///_virtual/LoginScene.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(e){"use strict";var o,n,t,r,i,s,a,c,l,u;return{setters:[function(e){o=e.applyDecoratedDescriptor,n=e.inheritsLoose,t=e.initializerDefineProperty,r=e.assertThisInitialized},function(e){i=e.cclegacy,s=e._decorator,a=e.Node,c=e.director,l=e.EditBox,u=e.Component}],execute:function(){var f,d,g,p,h;i._RF.push({},"a9524VmvSFBXafq4DX53DPr","LoginScene",void 0);var w=s.ccclass,m=s.property;e("LoginScence",(f=w("LoginScence"),d=m(a),f((h=o((p=function(e){function o(){for(var o,n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return o=e.call.apply(e,[this].concat(i))||this,t(o,"my_EditBox",h,r(o)),o}n(o,e);var i=o.prototype;return i.start=function(){var e=wx.getSystemInfoSync(),o=(e.screenWidth,e.screenHeight,this);wx.createUserInfoButton({type:"text",text:"微信登录",style:{left:10,top:76,width:200,height:40,lineHeight:40,backgroundColor:"#ff0000",color:"#ffffff",textAlign:"center",fontSize:16,borderRadius:4}}).onTap((function(e){console.log(e.userInfo);var n=e.userInfo;o.wxLogin(n)})),wx.getUserInfo({success:function(e){var n=e.userInfo;o.wxLogin(n)},fail:function(){console.log("获取用户信息失败")}})},i.wxLogin=function(e){var o=this;wx.login({success:function(n){n.code?wx.request({url:"http://"+window.location.hostname+":9091/wxlogin",method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},data:{code:n.code,nickName:e.nickName,avatarUrl:e.avatarUrl},success:function(e){o.onLoginMessage(e.data)}}):console.log("登陆失败"+n.errMsg)}}),c.loadScene("HallScene")},i.onLoginBtnClicked=function(){var e=this,o=this.my_EditBox.getComponent(l).string;console.log("获取账号:",o);var n=new XMLHttpRequest;n.open("POST","http://"+window.location.hostname+":9091/login",!0),n.setRequestHeader("Content-type","application/x-www-form-urlencoded"),n.send("userid="+o),n.onreadystatechange=function(){if(4==n.readyState&&200==n.status){var o=JSON.parse(n.responseText);e.onLoginMessage(o)}}},i.onVxLoginBtnClicked=function(){},i.onLoginMessage=function(e){console.log("处理玩家登录消息: ",e),globalThis._userInfo.user_id=e.userId,globalThis._userInfo.user_name=e.nickName,globalThis._userInfo.user_head_url=e.avatarUrl,globalThis._userInfo.user_room_cards=e.userRoomCards,globalThis._userInfo.room_id=e.roomId,c.loadScene("HallScene")},o}(u)).prototype,"my_EditBox",[d],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),g=p))||g));i._RF.pop()}}}));

System.register("chunks:///_virtual/main",["./GameRole.ts","./PushCardVo.ts","./UserInfo.ts","./BZDClient.ts","./BZDSceneMgt.ts","./BZDSoundMgt.ts","./Poker.ts","./PokerCtr.ts","./HallClient.ts","./HallSceneMgt.ts","./HallSoundMgt.ts","./createRoom.ts","./joinRoom.ts","./LoginClient.ts","./LoginScene.ts"],(function(){"use strict";return{setters:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){}}}));

System.register("chunks:///_virtual/Poker.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(o){"use strict";var e,r,t,a,i,n,s,c,l;return{setters:[function(o){e=o.inheritsLoose},function(o){r=o.cclegacy,t=o._decorator,a=o.resources,i=o.SpriteAtlas,n=o.Prefab,s=o.instantiate,c=o.Sprite,l=o.Component}],execute:function(){var d;r._RF.push({},"1c169QiLixNeZ3x8NKuwF40","Poker",void 0);var p=t.ccclass;t.property,o("Poker",p("Poker")(d=function(o){function r(){for(var e,r=arguments.length,t=new Array(r),a=0;a<r;a++)t[a]=arguments[a];return(e=o.call.apply(o,[this].concat(t))||this).pokerNode=void 0,e.pokerAtlas=void 0,e.cardList=void 0,e}e(r,o);var t=r.prototype;return t.start=function(){},t.update=function(o){},t.init=function(o){var e=this;this.cardList=o,a.load("image/games/bazhadan/card/pokerlist",i,(function(o,r){o?console.log("load atlas err: ",o):(e.pokerAtlas=r,console.log("this.atlas: ",e.pokerAtlas),e.onLoadPrefab())}))},t.onLoadPrefab=function(){var o=this;a.load("image/games/bazhadan/PokerView",n,(function(e,r){e?console.log("load prefab err: ",e):(o.pokerNode=s(r),console.log("pokerNode:",o.pokerNode),o.showPoker())}))},t.showPoker=function(){this.node.addChild(this.pokerNode);for(var o=0;o<7;o++){var e=this.pokerAtlas.getSpriteFrame(this.cardList[o]+""),r="card"+(o+1);console.log(r),console.log(this.pokerNode);var t=this.pokerNode.getChildByName(r);console.log("cardNode:",t),t.getComponent(c).spriteFrame=e}},r}(l))||d);r._RF.pop()}}}));

System.register("chunks:///_virtual/PokerCtr.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(o){"use strict";var e,r,t,i,a,s,n,l,c,p,d;return{setters:[function(o){e=o.applyDecoratedDescriptor,r=o.inheritsLoose,t=o.initializerDefineProperty,i=o.assertThisInitialized},function(o){a=o.cclegacy,s=o._decorator,n=o.Node,l=o.resources,c=o.SpriteAtlas,p=o.Sprite,d=o.Component}],execute:function(){var u,h,f,g,k;a._RF.push({},"d0d46EUrV9HdqHad3pBoJHo","PokerCtr",void 0);var v=s.ccclass,m=s.property;o("PokerCtr",(u=v("PokerCtr"),h=m(n),u((k=e((g=function(o){function e(){for(var e,r=arguments.length,a=new Array(r),s=0;s<r;s++)a[s]=arguments[s];return(e=o.call.apply(o,[this].concat(a))||this).cardList=void 0,e.pokerAtlas=void 0,t(e,"pokerView",k,i(e)),e}r(e,o);var a=e.prototype;return a.start=function(){},a.onDealCards=function(o){console.log("获得牌型：",o);var r=o.cardList[globalThis._userInfo.room_seat];(new e).init(r)},a.init=function(o){this.cardList=o,this.onloadAtlas()},a.onloadAtlas=function(){var o=this;l.load("image/games/bazhadan/card/pokerlist",c,(function(e,r){e?console.log("load atlas err: ",e):(o.pokerAtlas=r,console.log("this.atlas: ",o.pokerAtlas),o.showPoker())}))},a.showPoker=function(){this.pokerView.active=!0;for(var o=0;o<7;o++){var e=this.pokerAtlas.getSpriteFrame(this.cardList[o]+""),r="card"+(o+1);console.log(r),console.log(this.pokerView);var t=this.pokerView.getChildByName(r);console.log("cardNode:",t),t.getComponent(p).spriteFrame=e}},e}(d)).prototype,"pokerView",[h],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),f=g))||f));a._RF.pop()}}}));

System.register("chunks:///_virtual/PushCardVo.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(r){"use strict";var t,e,s,a;return{setters:[function(r){t=r.inheritsLoose},function(r){e=r.cclegacy,s=r._decorator,a=r.Component}],execute:function(){var n;e._RF.push({},"db37ctDRmRNXrs4FxyBiZRs","PushCardVo",void 0);var o=s.ccclass;s.property,r("PushCardVo",o("PushCardVo")(n=function(r){function e(){for(var t,e=arguments.length,s=new Array(e),a=0;a<e;a++)s[a]=arguments[a];return(t=r.call.apply(r,[this].concat(s))||this).preCardList=new Array,t.prePushSeat=0,t.preSeat=0,t.preUserCards=new Array,t.preStatus="",t.curCardList=new Array,t.curSeat=0,t.points=0,t.myStatus="",t.type="",t}return t(e,r),e}(a))||n);e._RF.pop()}}}));

System.register("chunks:///_virtual/UserInfo.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(n){"use strict";var e,r,o,t;return{setters:[function(n){e=n.inheritsLoose},function(n){r=n.cclegacy,o=n._decorator,t=n.Component}],execute:function(){var s,i;r._RF.push({},"ad450ByAmVGroVSSY8risKo","UserInfo",void 0);var c=o.ccclass;o.property,n("UserInfo",c("UserInfo")(((i=function(n){function r(){for(var e,r=arguments.length,o=new Array(r),t=0;t<r;t++)o[t]=arguments[t];return(e=n.call.apply(n,[this].concat(o))||this).user_id=void 0,e.user_name=void 0,e.user_head_url=void 0,e.user_room_cards=void 0,e.room_id=void 0,e.room_seat=void 0,e}e(r,n),r.getInstance=function(){return null==r.instance&&(r.instance=new r),r.instance};var o=r.prototype;return o.start=function(){globalThis._userInfo=r.getInstance()},o.update=function(n){},r}(t)).instance=null,s=i))||s);r._RF.pop()}}}));

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});