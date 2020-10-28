window.__require = function e(t, o, n) {
function r(i, c) {
if (!o[i]) {
if (!t[i]) {
var u = i.split("/");
u = u[u.length - 1];
if (!t[u]) {
var s = "function" == typeof __require && __require;
if (!c && s) return s(u, !0);
if (a) return a(u, !0);
throw new Error("Cannot find module '" + i + "'");
}
i = u;
}
var l = o[i] = {
exports: {}
};
t[i][0].call(l.exports, function(e) {
return r(t[i][1][e] || e);
}, l, l.exports, e, t, o, n);
}
return o[i].exports;
}
for (var a = "function" == typeof __require && __require, i = 0; i < n.length; i++) r(n[i]);
return r;
}({
ActionNode: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3fb39KSF4JFyLcpBk/jxq5I", "ActionNode");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("./TouchButton"), c = cc._decorator, u = c.ccclass, s = c.property, l = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.action_title_label = null;
t.nagivator_action_interface = null;
return t;
}
t.prototype.set_title = function(e) {
this.action_title_label.string = e;
};
t.prototype.register_action = function(e) {
this.nagivator_action_interface = e;
this.node.addComponent(i.default).register_touch(this.nagivator_action_interface.action);
};
t.prototype.start = function() {};
a([ s(cc.Label) ], t.prototype, "action_title_label", void 0);
return a([ u ], t);
}(cc.Component);
o.default = l;
cc._RF.pop();
}, {
"./TouchButton": "TouchButton"
} ],
AdVideoButton: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "9174dVDRPJDA7m2N6BCY4/O", "AdVideoButton");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../Sdk/Ad"), c = e("../Sdk/SdkEnum"), u = e("./BaseNode"), s = e("./CommonEnum"), l = e("./TouchButton"), _ = cc._decorator, p = _.ccclass, d = (_.property, 
function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.ad_video_type = s.AdVideoType.zhike;
t.touch_button = null;
t.ad_video_callback = null;
t.fail_call_back = null;
t.ad_param = {};
t.direct_success = !1;
t.init_ad_data_success = !1;
return t;
}
t.prototype.onLoad = function() {
this.touch_button = this.node.addComponent(l.default);
this.touch_button.register_touch(this.ad_video_call.bind(this));
};
t.prototype.init_ad_video_data = function(e, t, o, n) {
this.ad_video_type = e;
this.fail_call_back = o;
this.ad_video_callback = t;
this.ad_param = n;
this.init_ad_data_success = !0;
};
t.prototype.ad_video_call = function() {
if (this.init_ad_data_success) if (this.direct_success) {
console.log("当前直接调用了看视频成功");
this.ad_video_callback && this.ad_video_callback();
} else if (this.ad_video_type == s.AdVideoType.video_ad) {
var e = {
func: c.AdFuncEnum.playZhiKeAd,
param: {
playSource: this.ad_param
},
success: this.ad_video_callback,
fail: this.fail_call_back
};
i.Ad.play_video_ad(e);
} else if (this.ad_video_type == s.AdVideoType.zhike) {
var t = {
func: c.AdFuncEnum.playZhiKeAd,
param: this.ad_param,
callback: this.ad_video_callback
};
i.Ad.play_zhi_ke_video(t);
} else console.log("当前按钮没有设置广告视频类型"); else console.error("没有初始化看视频广告的数据 请调用 AdVideoButton中的init_ad_video_data 方法初始化");
};
t.prototype.start = function() {};
return a([ p ], t);
}(u.default));
o.default = d;
cc._RF.pop();
}, {
"../Sdk/Ad": "Ad",
"../Sdk/SdkEnum": "SdkEnum",
"./BaseNode": "BaseNode",
"./CommonEnum": "CommonEnum",
"./TouchButton": "TouchButton"
} ],
Ad: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "daefcgVTddGBrCGOWqzK1PB", "Ad");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.Ad = void 0;
var n = e("../Boot"), r = e("./Native"), a = function() {
function e() {}
e.play_video_ad = function(e) {
if (n.gamebase.WebViewJavascriptBridge) {
var t = {
func: e.func,
params: e.param
};
r.default.call_native(t, function(t) {
console.log("看完激励视频广告后的回调参数" + t);
1 == t ? e.success && e.success() : e.fail && e.fail();
});
} else e.success && e.success();
};
e.play_zhi_ke_video = function(e) {
if (n.gamebase.WebViewJavascriptBridge) {
var t = {
func: "playZhiKeAd",
params: e.param
};
r.default.call_native(t, function(t) {
e.callback && e.callback(t);
});
} else e.callback && e.callback(Number.MAX_VALUE);
};
e.play_static_sub_window_ad = function(e) {
if (n.gamebase.WebViewJavascriptBridge) {
var t = {
func: e.func,
params: {
isShow: e.is_show
}
};
r.default.call_native(t, function() {
e.callback();
});
} else e.callback && e.callback();
};
e.play_main_window_static_ad = function(e) {
if (n.gamebase.WebViewJavascriptBridge) {
var t = {
func: e.func,
params: {
isShow: e.is_show
}
};
r.default.call_native(t, function(t) {
console.log("显示主界面静态广告的结果" + t);
e.callback && e.callback();
});
} else e.callback && e.callback();
};
return e;
}();
o.Ad = a;
cc._RF.pop();
}, {
"../Boot": "Boot",
"./Native": "Native"
} ],
Audio: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "9b2f5ph8WBHA7RL0ZWc/IBA", "Audio");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {
this.audio_handler = 0;
this.audio_config = null;
this.audio = null;
}
e.prototype.play = function(e) {
var t = this;
this.audio_config = e;
cc.resources.load("./Audio/" + this.audio_config.name, cc.AudioClip, function(e, o) {
if (e) console.error("当前的音乐没有播放出来  " + t.audio_config.name); else {
t.audio = new cc.AudioSource();
t.audio.clip = o;
t.audio.play();
t.audio.loop = t.audio_config.loop;
}
});
};
e.prototype.stop = function() {
this.audio && this.audio.stop();
};
e.prototype.resume = function() {
this.audio && this.audio.resume();
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
BI: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "b30df+8TkZL3rNj/4K4vdXT", "BI");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.default = function() {};
cc._RF.pop();
}, {} ],
BalanceCashOutViewItem: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "6d880Z9KUxDqpsY6xQrfHyw", "BalanceCashOutViewItem");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../Common/BaseNode"), c = e("../../../Common/Utils"), u = cc._decorator, s = u.ccclass, l = u.property, _ = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.balance_item_bottom = null;
t.cornor_type_bottom = null;
t.cash_out_money_label = null;
t.cornor_type_tip_label = null;
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
t.prototype.update_view = function(e) {
this.cash_out_money_label.string = c.default.money(e.money, 1) + "元";
};
a([ l(cc.Sprite) ], t.prototype, "balance_item_bottom", void 0);
a([ l(cc.Sprite) ], t.prototype, "cornor_type_bottom", void 0);
a([ l(cc.Label) ], t.prototype, "cash_out_money_label", void 0);
a([ l(cc.Label) ], t.prototype, "cornor_type_tip_label", void 0);
return a([ s ], t);
}(i.default);
o.default = _;
cc._RF.pop();
}, {
"../../../Common/BaseNode": "BaseNode",
"../../../Common/Utils": "Utils"
} ],
BanlanceCashOutView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "dfd776r4yROLYow8Es0JKaR", "BanlanceCashOutView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../Common/BaseUI"), c = e("../../UIManager/UIConfig"), u = e("../../UIManager/UIManager"), s = e("./BalanceCashOutViewItem"), l = cc._decorator, _ = l.ccclass, p = l.property, d = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.container = null;
t.balance_cash_out_item_prefab = null;
return t;
}
t.prototype.onLoad = function() {
var t = this;
e.prototype.onLoad.call(this);
this.add_nagivator([ {
action_title: "提现记录",
action: function() {
var e = {
ui_config_path: c.default.CashOutOrderView,
ui_config_name: "CashOutOrderView",
param: {}
};
u.default.show_ui(e);
}
} ], {
title: "提现",
back_callback: function() {
t.on_close_call("CashOutView");
}
});
};
t.prototype.update_view = function(e) {
this.container.removeAllChildren(!0);
for (var t = 0, o = 0, n = e; o < n.length; o++) {
var r = n[o], a = cc.instantiate(this.balance_cash_out_item_prefab);
a.getComponent(s.default).update_view(r);
a.parent = this.container;
var i = Math.floor(t / 3), c = t % 3;
console.log("row = " + i + " column = " + c);
a.x = a.width / 2 + c * a.width + 25 * (c + 1);
a.y = -(0 == i ? 20 : 0) - (a.height / 2 + i * a.height + 40 * i);
t++;
this.container.height = (i + 1) * (a.height + 30) + 40;
}
};
t.prototype.start = function() {};
a([ p(cc.Node) ], t.prototype, "container", void 0);
a([ p(cc.Prefab) ], t.prototype, "balance_cash_out_item_prefab", void 0);
return a([ _ ], t);
}(i.default);
o.default = d;
cc._RF.pop();
}, {
"../../../Common/BaseUI": "BaseUI",
"../../UIManager/UIConfig": "UIConfig",
"../../UIManager/UIManager": "UIManager",
"./BalanceCashOutViewItem": "BalanceCashOutViewItem"
} ],
Base64: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "33532BUPz1PJ7YLFJO/pK2O", "Base64");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = {
_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
encode: function(e) {
var t, o, n, r, a, i, c, u = "", s = 0;
e = this._utf8_encode(e);
for (;s < e.length; ) {
r = (t = e.charCodeAt(s++)) >> 2;
a = (3 & t) << 4 | (o = e.charCodeAt(s++)) >> 4;
i = (15 & o) << 2 | (n = e.charCodeAt(s++)) >> 6;
c = 63 & n;
isNaN(o) ? i = c = 64 : isNaN(n) && (c = 64);
u = u + this._keyStr.charAt(r) + this._keyStr.charAt(a) + this._keyStr.charAt(i) + this._keyStr.charAt(c);
}
return u;
},
decode: function(e) {
var t, o, n, r, a, i, c = "", u = 0;
e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
for (;u < e.length; ) {
t = this._keyStr.indexOf(e.charAt(u++)) << 2 | (r = this._keyStr.indexOf(e.charAt(u++))) >> 4;
o = (15 & r) << 4 | (a = this._keyStr.indexOf(e.charAt(u++))) >> 2;
n = (3 & a) << 6 | (i = this._keyStr.indexOf(e.charAt(u++)));
c += String.fromCharCode(t);
64 != a && (c += String.fromCharCode(o));
64 != i && (c += String.fromCharCode(n));
}
return this._utf8_decode(c);
},
_utf8_encode: function(e) {
e = e.replace(/\r\n/g, "\n");
for (var t = "", o = 0; o < e.length; o++) {
var n = e.charCodeAt(o);
if (n < 128) t += String.fromCharCode(n); else if (n > 127 && n < 2048) {
t += String.fromCharCode(n >> 6 | 192);
t += String.fromCharCode(63 & n | 128);
} else {
t += String.fromCharCode(n >> 12 | 224);
t += String.fromCharCode(n >> 6 & 63 | 128);
t += String.fromCharCode(63 & n | 128);
}
}
return t;
},
_utf8_decode: function(e) {
for (var t = "", o = 0, n = 0, r = 0, a = 0; o < e.length; ) if ((n = e.charCodeAt(o)) < 128) {
t += String.fromCharCode(n);
o++;
} else if (n > 191 && n < 224) {
r = e.charCodeAt(o + 1);
t += String.fromCharCode((31 & n) << 6 | 63 & r);
o += 2;
} else {
r = e.charCodeAt(o + 1);
a = e.charCodeAt(o + 2);
t += String.fromCharCode((15 & n) << 12 | (63 & r) << 6 | 63 & a);
o += 3;
}
return t;
}
};
o.default = n;
cc._RF.pop();
}, {} ],
BaseNode: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "aad2eibebpF8rCW1BctTVt/", "BaseNode");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("./Loader"), c = e("./TouchButton"), u = e("./Utils"), s = cc._decorator, l = s.ccclass, _ = (s.property, 
function(e) {
r(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {};
t.prototype.start = function() {};
t.prototype.flush_ui_image = function(e, t) {
var o = this, n = u.default.get_ui_interface_sprite_path_and_sprite_name(e, t), r = n[0], a = n[1];
console.log(a);
a.length > 0 && i.default.recursion_load_sprite_frame(a, function(e, t) {
var n = o[r[t]];
try {
n && (n.spriteFrame = e);
} catch (e) {
console.log("打卡信息报错", e);
}
});
};
t.prototype.update = function() {};
t.prototype.register_touch_button = function(e, t, o) {
this.node.addComponent(c.default).register_touch(e, t, o);
};
return a([ l ], t);
}(cc.Component));
o.default = _;
cc._RF.pop();
}, {
"./Loader": "Loader",
"./TouchButton": "TouchButton",
"./Utils": "Utils"
} ],
BaseRecord: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "eb7086kGjNDgYUCsg602kgC", "BaseRecord");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.prototype.decode_json = function(e) {
for (var t in this) e.hasOwnProperty(t) && (this[t] = e[t]);
};
e.prototype.init = function(e) {
void 0 === e && (e = {});
};
e.prototype.store = function() {
e.update_data && e.update_data(self);
};
e.prototype.auto_call = function() {};
e.prototype.apply_auto_update = function() {
var t = this, o = function(o) {
if (n.hasOwnProperty(o)) {
var r = n[o];
Object.defineProperty(n, o, {
set: function(o) {
var n = !0;
"number" != typeof r && "string" != typeof r || r != o || (n = !1);
r = o;
if (n) {
e.update_data && e.update_data();
t.auto_call && t.auto_call();
}
},
get: function() {
return r;
}
});
}
}, n = this;
for (var r in this) o(r);
};
e.update_data = null;
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
BaseScene: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "c7f57hdfapOlLp35f5jKzlG", "BaseScene");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../Common/Loader"), c = e("../UI/UIManager/UIManager"), u = cc._decorator, s = u.ccclass, l = (u.property, 
function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.loading_scene_time = new Date().getTime();
return t;
}
t.prototype.onLoad = function() {
c.default.clear_ui();
};
t.prototype.start = function() {
this.loading_scene_time = new Date().getTime() - this.loading_scene_time;
console.log("start 进入的场景名称" + this.node.name + "  加载时间 " + this.loading_scene_time + "  毫秒");
};
t.prototype.flush_ui_image = function(e, t) {
var o = this;
i.default.recursion_load_sprite_frame(t, function(t, n) {
var r = o[e[n]];
try {
r && (r.spriteFrame = t);
} catch (e) {
console.log("打卡信息报错", e);
}
});
};
return a([ s ], t);
}(cc.Component));
o.default = l;
cc._RF.pop();
}, {
"../Common/Loader": "Loader",
"../UI/UIManager/UIManager": "UIManager"
} ],
BaseUI: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3e02ambFcZOya//ML+S5GxH", "BaseUI");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../EventManager/EventConfig"), c = e("../EventManager/EventManager"), u = e("../UI/UIManager/UIConfig"), s = e("../UI/UIManager/UIManager"), l = e("./Loader"), _ = e("./Nagivator"), p = e("./Utils"), d = cc._decorator, f = d.ccclass, h = (d.property, 
function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.block_input_events = null;
t.ui_param_interface = null;
t.controller = null;
t.widget = null;
t.c_time = new Date().getTime();
t.nagivator = null;
return t;
}
t.prototype.onLoad = function() {
this.widget = this.node.getComponent(cc.Widget);
this.block_input_events = this.addComponent(cc.BlockInputEvents);
};
t.prototype.register_back_call_event = function() {
c.default.get_instance().listen(i.default.webBackPage, this, this.android_back_callback.bind(this));
};
t.prototype.android_back_callback = function() {
this.on_close_call();
};
t.prototype.onDisable = function() {
c.default.get_instance().cancel_listen(i.default.webBackPage, this, this.android_back_callback.bind(this));
};
t.prototype.show = function(e) {
this.ui_param_interface = e;
this.node.active = !0;
};
t.prototype.hide = function() {
this.node.active = !1;
};
t.prototype.on_close_call = function(e) {
console.log("关闭界面", this.node.name);
s.default.close_ui(e || this.node.name);
};
t.prototype.start = function() {
console.log("界面 " + this.node.name + " 花费的时间 " + (new Date().getTime() - this.c_time) + " 秒");
};
t.prototype.flush_ui_image = function(e, t) {
var o = this, n = p.default.get_ui_interface_sprite_path_and_sprite_name(e, t), r = n[0], a = n[1];
l.default.recursion_load_sprite_frame(a, function(e, t) {
var n = o[r[t]];
try {
n && (n.spriteFrame = e);
} catch (e) {
console.log("打卡信息报错", e);
}
});
};
t.prototype.onAddFinished = function() {
console.log("界面添加完成");
};
t.prototype.add_nagivator = function(e, t) {
var o = this;
l.default.load_prefab(u.default.Nagivator, function(n) {
var r = cc.instantiate(n);
r.parent = o.node;
r.zIndex = cc.macro.MAX_ZINDEX;
var a = r.getComponent(_.default);
a.init_actions(e);
a.set_nagivator_interface(t);
});
};
return a([ f ], t);
}(cc.Component));
o.default = h;
cc._RF.pop();
}, {
"../EventManager/EventConfig": "EventConfig",
"../EventManager/EventManager": "EventManager",
"../UI/UIManager/UIConfig": "UIConfig",
"../UI/UIManager/UIManager": "UIManager",
"./Loader": "Loader",
"./Nagivator": "Nagivator",
"./Utils": "Utils"
} ],
Boot: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "67430JTLSxPcoZmoLF8oLyc", "Boot");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.Boot = o.gamebase = void 0;
var n = e("./Common/Test"), r = e("./GameDataConfig/GameDataConfig"), a = e("./GameLocalData/GameLocalData"), i = e("./GameServerData/CommonServerData"), c = e("./GameServerData/ServerData"), u = e("./Sdk/Native"), s = e("./UI/UIManager/UIConfig"), l = e("./UI/UIManager/UIManager"), _ = window;
o.gamebase = _;
_.UIManager = l.default;
_.UIConfig = s.default;
_.GameLocalData = a.default;
_.BusinessSDK = _.BusinessSDK;
_.Native = u.default;
_.GameDataConfig = r.default;
_.Test = n.default;
_.ServerData = c.default;
_.CommonServerData = i.default;
u.default.init();
var p = function() {
function e() {}
e.init = function() {
cc.macro.ENABLE_MULTI_TOUCH = !1;
a.default.get_instance().init();
c.default.get_instance().init();
r.default.init();
};
return e;
}();
o.Boot = p;
cc._RF.pop();
}, {
"./Common/Test": "Test",
"./GameDataConfig/GameDataConfig": "GameDataConfig",
"./GameLocalData/GameLocalData": "GameLocalData",
"./GameServerData/CommonServerData": "CommonServerData",
"./GameServerData/ServerData": "ServerData",
"./Sdk/Native": "Native",
"./UI/UIManager/UIConfig": "UIConfig",
"./UI/UIManager/UIManager": "UIManager"
} ],
CashOutController: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2a828VNbZhHY6TCsMKnuOlT", "CashOutController");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../Common/CommonEnum"), r = e("../UIManager/UIManager"), a = e("../../Common/Loader"), i = e("./Balance/BanlanceCashOutView"), c = e("./NoBalance/NoBanlanceCashOutView"), u = e("../../GameServerData/CommonServerData"), s = function() {
function e() {
this.name = "CashOutController";
this.view = null;
this.user_money_modal = null;
this.with_draw_items = [];
this.balance_cash_out_view = null;
this.no_balance_cash_out_view = null;
}
e.open = function(t) {
var o = {
controller: e,
ui_config_name: "CashOutView",
path: t
};
r.default.nagivate_route(o);
};
e.prototype.init_view = function() {
var e = this;
this.view.ui_param_interface.router.path == n.CashOutRouterPath.balance ? a.default.load_prefab("./UI/CashOut/Balance/BanlanceCashOutView", function(t) {
var o = cc.instantiate(t);
o.parent = e.view.node;
e.balance_cash_out_view = o.getComponent(i.default);
e.update_cash_out_view();
}) : this.view.ui_param_interface.router.path == n.CashOutRouterPath.no_balance && a.default.load_prefab("./UI/CashOut/NoBalance/NoBanlanceCashOutView", function(t) {
var o = cc.instantiate(t);
o.parent = e.view.node;
e.no_balance_cash_out_view = o.getComponent(c.default);
e.update_cash_out_view();
});
};
Object.defineProperty(e.prototype, "money", {
get: function() {
return this.user_money_modal.money;
},
enumerable: !1,
configurable: !0
});
e.prototype.set_user_money_modal = function(e) {
this.user_money_modal = e;
};
e.prototype.set_with_draw_items = function(e) {
this.with_draw_items = e;
this.view.flush_money(this.user_money_modal.money);
};
e.prototype.update_cash_out_view = function() {
var e = this;
u.default.get_withdraw(function(t) {
console.log("当前的体现数据  = ", t);
console.log("this.view", e.view.ui_param_interface.router.path);
e.view.ui_param_interface.router.path == n.CashOutRouterPath.balance ? e.balance_cash_out_view && e.balance_cash_out_view.update_view(t.items) : e.view.ui_param_interface.router.path == n.CashOutRouterPath.no_balance && e.no_balance_cash_out_view && e.no_balance_cash_out_view.update_view(t.items);
});
};
e.prototype.cash_out = function() {};
return e;
}();
o.default = s;
cc._RF.pop();
}, {
"../../Common/CommonEnum": "CommonEnum",
"../../Common/Loader": "Loader",
"../../GameServerData/CommonServerData": "CommonServerData",
"../UIManager/UIManager": "UIManager",
"./Balance/BanlanceCashOutView": "BanlanceCashOutView",
"./NoBalance/NoBanlanceCashOutView": "NoBanlanceCashOutView"
} ],
CashOutEnum: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "1eb67uDysVBupVeihW7jbzU", "CashOutEnum");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.CashOutType = void 0;
var n;
(function(e) {
e[e.balance = 1] = "balance";
e[e.no_balance = 2] = "no_balance";
})(n || (n = {}));
o.CashOutType = n;
cc._RF.pop();
}, {} ],
CashOutInterface: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "fd6ec5UeyFIw5wuzdEwku56", "CashOutInterface");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.UserMoneyModel = void 0;
o.UserMoneyModel = function() {};
cc._RF.pop();
}, {} ],
CashOutOrderItem: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e0d9eAije1LOIW9yiZYufL1", "CashOutOrderItem");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../Common/Utils"), c = cc._decorator, u = c.ccclass, s = c.property, l = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.cash_out_order_item_bottom = null;
t.cash_out_order_money_label = null;
t.cash_out_order_date_label = null;
t.cash_out_order_tip_label = null;
return t;
}
t.prototype.start = function() {};
t.prototype.update_view = function(e) {
this.cash_out_order_money_label.string = "" + i.default.money(e.money, 1);
this.cash_out_order_date_label.string = e.datetime;
};
a([ s(cc.Sprite) ], t.prototype, "cash_out_order_item_bottom", void 0);
a([ s(cc.Label) ], t.prototype, "cash_out_order_money_label", void 0);
a([ s(cc.Label) ], t.prototype, "cash_out_order_date_label", void 0);
a([ s(cc.Label) ], t.prototype, "cash_out_order_tip_label", void 0);
return a([ u ], t);
}(cc.Component);
o.default = l;
cc._RF.pop();
}, {
"../../../Common/Utils": "Utils"
} ],
CashOutOrderView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2ff2aa0jQdH34kFubmznmu8", "CashOutOrderView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../Common/BaseUI"), c = e("../../../GameServerData/CommonServerData"), u = e("./CashOutOrderItem"), s = cc._decorator, l = s.ccclass, _ = s.property, p = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.container = null;
t.order_prefab = null;
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.add_nagivator([], {
title: "提现记录",
back_callback: this.on_close_call.bind(this)
});
};
t.prototype.onAddFinished = function() {
e.prototype.onAddFinished.call(this);
this.request_orders();
};
t.prototype.request_orders = function() {
var e = this;
c.default.get_order(function(t) {
t.items ? e.update_view(t.items) : console.warn("请求到的提现记录为空");
});
};
t.prototype.update_view = function(e) {
this.container.removeAllChildren(!0);
for (var t = 0, o = e; t < o.length; t++) {
var n = o[t], r = cc.instantiate(this.order_prefab);
r.parent = this.container;
r.getComponent(u.default).update_view(n);
}
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
t.prototype.update = function() {};
a([ _(cc.Node) ], t.prototype, "container", void 0);
a([ _(cc.Prefab) ], t.prototype, "order_prefab", void 0);
return a([ l ], t);
}(i.default);
o.default = p;
cc._RF.pop();
}, {
"../../../Common/BaseUI": "BaseUI",
"../../../GameServerData/CommonServerData": "CommonServerData",
"./CashOutOrderItem": "CashOutOrderItem"
} ],
CashOutSuccessView: [ function(e, t) {
"use strict";
cc._RF.push(t, "80250JELtFDeYcqBJIT5ijr", "CashOutSuccessView");
cc._RF.pop();
}, {} ],
CashOutView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e737abvu7hDd6z+2ijD04Ob", "CashOutView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../Common/BaseUI"), c = e("./CashOutEnum"), u = cc._decorator, s = u.ccclass, l = u.property, _ = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.cash_out_type = c.CashOutType.no_balance;
t.controller = null;
t.moeny_label = null;
return t;
}
t.prototype.flush_money = function(e) {
this.moeny_label.string = "" + e;
};
t.prototype.cash_out_callback = function() {};
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.controller.init_view();
};
t.prototype.onAddFinished = function() {
e.prototype.onAddFinished.call(this);
this.controller.view = this;
this.controller.update_cash_out_view();
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
a([ l(cc.Label) ], t.prototype, "moeny_label", void 0);
return a([ s ], t);
}(i.default);
o.default = _;
cc._RF.pop();
}, {
"../../Common/BaseUI": "BaseUI",
"./CashOutEnum": "CashOutEnum"
} ],
ClickOnController: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "a42f1q6TF1JeoCcqiWVkzwE", "ClickOnController");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../Common/CommonEnum"), r = e("../../Common/Loader"), a = e("../UIManager/UIManager"), i = function() {
function e() {
this.name = "ClickOnController";
this.view = null;
}
e.open = function(t) {
var o = {
controller: e,
ui_config_name: "ClickOnView",
path: t
};
a.default.nagivate_route(o);
};
e.prototype.init_view = function() {
var e = this;
this.view.ui_param_interface.router.path == n.ClickOnRouterPath.normal ? r.default.load_prefab("./UI/ClickOn/Normal/NormalClickOnView", function(t) {
cc.instantiate(t).parent = e.view.node;
}) : console.log("当前");
};
return e;
}();
o.default = i;
cc._RF.pop();
}, {
"../../Common/CommonEnum": "CommonEnum",
"../../Common/Loader": "Loader",
"../UIManager/UIManager": "UIManager"
} ],
ClickOnEnum: [ function(e, t) {
"use strict";
cc._RF.push(t, "baa16rw239HF5v9qJbFkMWh", "ClickOnEnum");
cc._RF.pop();
}, {} ],
ClickOnInterface: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "b6fceNW1g5FTq1KyZLctapU", "ClickOnInterface");
Object.defineProperty(o, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
ClickOnViewItem: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "d35d5AZfbpDYbjwWS565TgY", "ClickOnViewItem");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../Common/BaseNode"), c = cc._decorator, u = c.ccclass, s = c.property, l = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.click_on_view_item_bottom = null;
t.click_on_statue_sprite = null;
t.click_on_progress_bottom = null;
t.click_on_progress_upper = null;
t.award_icon_sprite = null;
t.click_on_date_label = null;
t.click_on_tip_label = null;
t.click_on_progress_tip_label = null;
t.special_award_label = null;
t.award_type_number_tip_label = null;
return t;
}
t.prototype.onLoad = function() {};
t.prototype.start = function() {};
a([ s(cc.Sprite) ], t.prototype, "click_on_view_item_bottom", void 0);
a([ s(cc.Sprite) ], t.prototype, "click_on_statue_sprite", void 0);
a([ s(cc.Sprite) ], t.prototype, "click_on_progress_bottom", void 0);
a([ s(cc.Sprite) ], t.prototype, "click_on_progress_upper", void 0);
a([ s(cc.Sprite) ], t.prototype, "award_icon_sprite", void 0);
a([ s(cc.Label) ], t.prototype, "click_on_date_label", void 0);
a([ s(cc.RichText) ], t.prototype, "click_on_tip_label", void 0);
a([ s(cc.Label) ], t.prototype, "click_on_progress_tip_label", void 0);
a([ s(cc.Label) ], t.prototype, "special_award_label", void 0);
a([ s(cc.Label) ], t.prototype, "award_type_number_tip_label", void 0);
return a([ u ], t);
}(i.default);
o.default = l;
cc._RF.pop();
}, {
"../../Common/BaseNode": "BaseNode"
} ],
ClickOnView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "932bfHCsQVOnK0hOCmNY1fL", "ClickOnView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../Common/BaseUI"), c = cc._decorator, u = c.ccclass, s = (c.property, 
function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.controller = null;
return t;
}
t.prototype.onLoad = function() {
var t = this;
e.prototype.onLoad.call(this);
console.log(this.controller);
this.controller.init_view();
var o = {
title: "打卡赚取红星",
back_callback: function() {
t.on_close_call();
}
};
this.add_nagivator([], o);
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
return a([ u ], t);
}(i.default));
o.default = s;
cc._RF.pop();
}, {
"../../Common/BaseUI": "BaseUI"
} ],
CommonEnum: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "77b36z8HgxKPbYBoe5EIHxX", "CommonEnum");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.ClickOnRouterPath = o.CashOutRouterPath = o.RankRouterPath = o.InviteFriendPath = o.OpenRedEnvelopePath = o.TouchButtonEffectType = o.AdVideoType = void 0;
var n, r, a, i, c, u, s;
(function(e) {
e.balance = "balance";
e.no_balance = "no_balance";
})(n || (n = {}));
o.CashOutRouterPath = n;
(function(e) {
e.normal = "noraml";
})(r || (r = {}));
o.ClickOnRouterPath = r;
(function(e) {
e.normal = "normal";
})(a || (a = {}));
o.RankRouterPath = a;
(function(e) {
e.normal = "normal";
})(i || (i = {}));
o.InviteFriendPath = i;
(function(e) {
e.normal = "normal";
})(c || (c = {}));
o.OpenRedEnvelopePath = c;
(function(e) {
e[e.none = 1] = "none";
e[e.scale = 2] = "scale";
e[e.opacity = 3] = "opacity";
})(u || (u = {}));
o.TouchButtonEffectType = u;
(function(e) {
e.video_ad = "video_ad";
e.zhike = "zhike";
})(s || (s = {}));
o.AdVideoType = s;
cc._RF.pop();
}, {} ],
CommonInterface: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2b71a1tSflCLa4/E3DCfjv0", "CommonInterface");
Object.defineProperty(o, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
CommonServerData: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "576d0gH/NBA6KvvWViPCTKy", "CommonServerData");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../GameConfig"), r = e("./ServerData"), a = function() {
function e() {}
e.get_rank = function(e) {
r.default.get_instance().get_data("/g3-chengyu/api/rank", e);
};
e.post_rank = function(e) {
r.default.get_instance().post_data("/g3-chengyu/api/rank", "", e);
};
e.request_game_config_data = function(e) {
r.default.get_instance().get_data("/" + n.default.api_root_path + "/api/game", e);
};
e.get_withdraw = function(e) {
r.default.get_instance().get_data("/" + n.default.api_root_path + "/api/withdraw", e);
};
e.post_withdraw = function(e, t) {
r.default.get_instance().post_data("/g3-odyssey/api/withdraw", e, t);
};
e.get_order = function(e) {
r.default.get_instance().get_data("/" + n.default.api_root_path + "/api/withdraw/order", e);
};
e.get_invite_friends = function(e) {
r.default.get_instance().get_data("/" + n.default.api_root_path + "/api/share", e);
};
return e;
}();
o.default = a;
cc._RF.pop();
}, {
"../GameConfig": "GameConfig",
"./ServerData": "ServerData"
} ],
ConfigInterface: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "7092b8KkxpDCK2zuDU8VFm3", "ConfigInterface");
Object.defineProperty(o, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
ConfigsName: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3fe47ZFH2lJbqPP1CZVGIvn", "ConfigsName");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.default = {
AudioConfig: "AudioConfig"
};
cc._RF.pop();
}, {} ],
Controller: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "d2cc2Q7sPlKEIAJWelLUzAr", "Controller");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.default = function() {
this.name = "Controller";
this.view = null;
};
cc._RF.pop();
}, {} ],
DropCoinInterface: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "49cefvLskBFH5udzDrWdBUN", "DropCoinInterface");
Object.defineProperty(o, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
EventConfig: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3fab6F067pFxpJDVZlH3/+K", "EventConfig");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.default = {
test: "test",
webReload: "webReload",
webBackPage: "webBackPage",
webAlertMoney: "webAlertMoney",
webUpMoney: "webUpMoney"
};
cc._RF.pop();
}, {} ],
EventManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f856e4XDEdPqaYVyXUnZHPF", "EventManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("./GameEvent"), r = function() {
function e(e, t, o) {
this.event_name = "";
this.target = null;
this.cb = null;
this.event_name = e;
this.target = t;
this.cb = o;
}
e.prototype.trigger = function() {
for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
this.cb.apply(this.target, e);
};
return e;
}(), a = function() {
function e() {
this._event_dict = {};
}
e.get_instance = function() {
this._instance || (this._instance = new e());
return this._instance;
};
e.prototype.listen = function(e, t, o) {
var n = this._event_dict[e];
if (n) this.cancel_listen(e, t, o); else {
n = [];
this._event_dict[e] = n;
}
var a = new r(e, t, o);
n.push(a);
};
e.prototype.cancel_listen = function(e, t) {
var o = this._event_dict[e];
if (o) for (var n = 0; n < o.length; ++n) if (o[n].target === t) {
o.splice(n, 1);
break;
}
};
e.prototype.emit = function(e) {
for (var t = [], o = 1; o < arguments.length; o++) t[o - 1] = arguments[o];
"string" == typeof e && (e = new n.GameEvent(e));
var r = this._event_dict[e.name];
if (r) for (var a = r.length - 1; a >= 0 && !e.is_swallow; --a) {
for (var i = r[a], c = [ e ], u = 0; u < t.length; ++u) c.push(t[u]);
i.trigger.apply(i, c);
}
};
return e;
}();
o.default = a;
cc._RF.pop();
}, {
"./GameEvent": "GameEvent"
} ],
ExchangeView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f1e38DefcJAp5vNrJsv48OR", "ExchangeView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../Common/BaseUI"), c = cc._decorator, u = c.ccclass, s = c.property, l = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.label = null;
t.text = "hello";
return t;
}
t.prototype.start = function() {};
a([ s(cc.Label) ], t.prototype, "label", void 0);
a([ s ], t.prototype, "text", void 0);
return a([ u ], t);
}(i.default);
o.default = l;
cc._RF.pop();
}, {
"../../Common/BaseUI": "BaseUI"
} ],
FragmentView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "eff99/AwQpNH6jjk5vMiRS+", "FragmentView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator, c = i.ccclass, u = i.property, s = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.label = null;
t.text = "hello";
return t;
}
t.prototype.start = function() {};
a([ u(cc.Label) ], t.prototype, "label", void 0);
a([ u ], t.prototype, "text", void 0);
return a([ c ], t);
}(cc.Component);
o.default = s;
cc._RF.pop();
}, {} ],
GameConfig: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "41076qQHCFKgI/knFhQXV2l", "GameConfig");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = {
secretData: "fS*rD^NzBD847*KCBU7d^bgbzJddPU3u",
gameExamine: !1,
appId: 44,
pkgId: 67,
deviceId: "bff1979e4c6c74141414310680bdb547fc671844e483b95c7e4e7ac050462ae0",
brand: "Xiaomi",
gps: "40.015551,116.361037",
bs: "default",
appVersion: "1.0.0",
os: "android",
channel: "ALIYUN_MAN_CHANNEL",
romVersion: "default",
osVersion: "9",
oaid: "default",
accessKey: "8e7332d189c6b5229fb6afd561dd57fc_19619",
apiType: 0,
productName: "g3_zlzdd",
packageName: "com.hainanliangyou.zlzdd",
branch: "debug",
show_debug: !0,
posId: 1000191,
remoteName: "mvp",
api_root_path: "g3-odyssey",
game_api_root_path: "",
get is_debug() {
return "debug" == n.branch;
},
user_protocol_url: "http://waqqq.hainanliangyou.com/user.html",
user_privacy_url: "http://waqqq.hainanliangyou.com/private.html",
get serverUrl() {
var e = "https://bp-api.coohua.com";
n.is_debug && (e = "http://bp-api.coohua.top");
return e;
}
};
o.default = n;
cc._RF.pop();
}, {} ],
GameDataConfig: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "c5834S43itBtJqb72wRWWBf", "GameDataConfig");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../GameServerData/CommonServerData"), r = function() {
function e() {}
e.init = function() {
var e = this;
cc.resources.load("./Config/config", cc.JsonAsset, function(t, o) {
if (!t) {
Object.keys(o.json);
e.all_config_data = o.json;
e.server_request_server_config();
}
});
};
e.server_request_server_config = function() {
var e = this;
n.default.request_game_config_data(function(t) {
if (t) {
console.log("当前服务器返回的游戏配置数据 = ", t);
for (var o = 0, n = Object.keys(t); o < n.length; o++) {
var r = n[o];
e.all_config_data[r] = t[r];
}
}
});
};
e.get_config_by_id = function(e, t) {
var o = this.all_config_data[e];
if (o) for (var n = 0, r = o; n < r.length; n++) {
var a = r[n];
if (a.id == t) return a;
} else console.error("当前读取配置信息失败 " + e + " " + t);
};
e.get_config_array = function(e) {
var t = this.all_config_data[e];
if (t) return t;
console.error("当前读取配置信息失败 " + e);
};
e.all_config_data = {};
return e;
}();
o.default = r;
cc._RF.pop();
}, {
"../GameServerData/CommonServerData": "CommonServerData"
} ],
GameEvent: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "0c26egLkTdOAqDwzehtuy3v", "GameEvent");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.GameEvent = void 0;
o.GameEvent = function(e) {
this.name = "";
this.is_swallow = !1;
this.name = e;
};
cc._RF.pop();
}, {} ],
GameLocalData: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "ba440cMNbdFf4BJ5wUkj4pQ", "GameLocalData");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../GamePlay/LinkGameBase"), r = e("./BaseRecord"), a = e("./GameRecord"), i = e("./GuideData"), c = e("./TurnTableData"), u = function() {
function e() {
this._game_data = {};
this._store_key = "game_data";
this._all_store_data = [ i.default, a.default, c.default ];
}
Object.defineProperty(e.prototype, "store_data_types", {
get: function() {
for (var e = this._all_store_data, t = 0, o = n.default.game_play_record; t < o.length; t++) {
var r = o[t];
e.push(r);
}
return e;
},
enumerable: !1,
configurable: !0
});
e.get_instance = function() {
this._instance || (this._instance = new e());
return this._instance;
};
e.prototype.init = function() {
r.default.update_data = this.store_data.bind(this);
var e = cc.sys.localStorage.getItem(this._store_key), t = {};
e && (t = JSON.parse(e));
for (var o = 0, n = this.store_data_types; o < n.length; o++) {
var a = n[o], i = a._name, c = t[i];
if (c) {
var u = new a();
u.decode_json(c);
this._game_data[i] = u;
} else this._game_data[i] = new a();
}
console.log("当前玩家的存档数据  =", this._game_data);
this.store_data();
};
e.prototype.store_data = function(e) {
if (0 != Object.keys(this._game_data).length) {
var t = e;
t || (t = this._game_data);
cc.sys.localStorage.setItem(this._store_key, JSON.stringify(t));
}
};
e.prototype.clear_data = function() {
this.store_data({});
};
e.prototype.get_data = function(e) {
return this._game_data[e._name];
};
e.prototype.remove_data = function(e) {
if (this._game_data[e._name]) {
this._game_data[e._name] = new e();
console.log("清空数据成功" + e._name);
this.store_data();
return !0;
}
return !1;
};
e._instance = null;
e.all_convert_single_data = {};
return e;
}();
o.default = u;
cc._RF.pop();
}, {
"../GamePlay/LinkGameBase": "LinkGameBase",
"./BaseRecord": "BaseRecord",
"./GameRecord": "GameRecord",
"./GuideData": "GuideData",
"./TurnTableData": "TurnTableData"
} ],
GamePlay: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2620aT3L1NHVKOo/XMy/7Ka", "GamePlay");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator, c = i.ccclass, u = (i.property, function(e) {
r(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
console.log("进入游戏的game_play了");
};
t.prototype.start = function() {};
return a([ c ], t);
}(cc.Component));
o.default = u;
cc._RF.pop();
}, {} ],
GameRecord: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "71016IW2jRHIJTk3kaUFvlD", "GameRecord");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = function(e) {
r(t, e);
function t() {
var t = e.call(this) || this;
t.base_name = "GameRecord";
t.cur_guid_id = 0;
t.game_count = 0;
t.share_count = 0;
t.upper_login_date = "";
t.apply_auto_update();
return t;
}
t._name = "GameRecord";
return t;
}(e("./BaseRecord").default);
o.default = a;
cc._RF.pop();
}, {
"./BaseRecord": "BaseRecord"
} ],
GameScene: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3e312QPbzdMiaMtD9hwc1d8", "GameScene");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../Common/Loader"), c = e("./BaseScene"), u = cc._decorator, s = u.ccclass, l = (u.property, 
function(e) {
r(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.game_play_init();
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
t.prototype.game_play_init = function() {
var e = this;
i.default.load_prefab("GamePlay/GamePlay", function(t) {
cc.instantiate(t).parent = e.node;
});
};
return a([ s ], t);
}(c.default));
o.default = l;
cc._RF.pop();
}, {
"../Common/Loader": "Loader",
"./BaseScene": "BaseScene"
} ],
GuideData: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "bcaa1LktpdKobb8kX7/w7K9", "GuideData");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = function(e) {
r(t, e);
function t() {
var t = e.call(this) || this;
t.base_name = "GuideData";
t.cur_guid_id = 0;
t.pass_guide_ids = [];
t.apply_auto_update();
return t;
}
t.prototype.guide_finished = function(e) {
for (var t = 0, o = this.pass_guide_ids; t < o.length; t++) if (e == o[t]) return !0;
return !1;
};
t.prototype.pass_a_guide = function(e) {
this.pass_guide_ids.push(e);
this.pass_guide_ids = this.pass_guide_ids;
};
t._name = "GuideData";
return t;
}(e("./BaseRecord").default);
o.default = a;
cc._RF.pop();
}, {
"./BaseRecord": "BaseRecord"
} ],
HeaderItem: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "36bd5EHOx5Np5Kr8QrHeVk/", "HeaderItem");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../Common/BaseNode"), c = cc._decorator, u = c.ccclass, s = c.property, l = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.item_title = null;
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.flush = function(e) {
this.set_title(e.title);
this.set_width(e.item_width);
};
t.prototype.set_title = function(e) {
this.item_title.string = e;
};
t.prototype.set_width = function(e) {
e && (this.node.width = e);
};
t.prototype.set_title_position_x = function(e) {
this.item_title.node.x = e;
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
a([ s(cc.Label) ], t.prototype, "item_title", void 0);
return a([ u ], t);
}(i.default);
o.default = l;
cc._RF.pop();
}, {
"../../Common/BaseNode": "BaseNode"
} ],
HttpClient: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "886534GT/FHoaeogk8htgMh", "HttpClient");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
o.HttpClient = o.HttpError = void 0;
var a = function(e) {
r(t, e);
function t(t, o) {
var n = e.call(this, o) || this;
n.status = t;
return n;
}
return t;
}(Error);
o.HttpError = a;
var i = function() {
function e(e, t) {
void 0 === t && (t = 0);
this.serverBaseUrl = "";
this.authorization = null;
this.maxConcurrency = 0;
this.currentRequestNum = 0;
this.pendingRequests = [];
this.serverBaseUrl = e;
this.maxConcurrency = t;
}
e.get = function() {
throw new Error("Method not implemented.");
};
e.prototype.setAuthorization = function(e) {
this.authorization = e;
};
e.prototype.setResponsePreprocessor = function(e) {
this.responsePreprocessor = e;
};
e.prototype.get = function(e, t, o) {
void 0 === t && (t = 5e3);
return this._handleRequest({
path: e,
method: "GET",
timeout: t,
headers: o
});
};
e.prototype.post = function(e, t, o, n, r) {
void 0 === t && (t = 5e3);
return this._handleRequest({
path: e,
method: "POST",
timeout: t,
contentType: n,
headers: r
}, o);
};
e.prototype.put = function(e, t, o, n, r) {
void 0 === t && (t = 5e3);
return this._handleRequest({
path: e,
method: "POST",
timeout: t,
contentType: n,
headers: r
}, o);
};
e.prototype.delete = function(e, t, o) {
void 0 === t && (t = 5e3);
return this._handleRequest({
path: e,
method: "GET",
timeout: t,
headers: o
});
};
e.prototype._handleRequest = function(e, t) {
var o = this, n = new Promise(function(n, r) {
e.onSuccess = n;
e.onError = r;
o.maxConcurrency > 0 && o.currentRequestNum >= o.maxConcurrency ? o.pendingRequests.push(e) : o._doRequest(e, t);
});
e.promise = n;
e.abort ? n.abort = e.abort : n.abort = function() {
var t = o.pendingRequests.indexOf(e);
t >= 0 && o.pendingRequests.splice(t, 1);
};
return n;
};
e.prototype._doRequest = function(e, t) {
var o = this;
this.currentRequestNum++;
var n = new XMLHttpRequest();
n.timeout = e.timeout;
var r = this.serverBaseUrl + e.path;
console.log("请求地址 = ", r);
n.open(e.method, r, !0);
e.contentType && n.setRequestHeader("Content-Type", e.contentType);
if (e.headers) for (var i in e.headers) n.setRequestHeader(i, e.headers[i]);
var u = function() {
n.abort();
};
e.promise ? e.promise.abort = u : e.abort = u;
n.onreadystatechange = function() {
if (4 == n.readyState) {
if (!e.onError) return;
if (200 == n.status) {
var t = n.responseText ? n.responseText : n.response;
t && o.responsePreprocessor && (t = o.responsePreprocessor(t));
e.onSuccess(t);
} else e.onError(new a(n.status, c(n.status)));
o.pendingRequests.length ? o._doRequest(o.pendingRequests.shift()) : o.currentRequestNum--;
}
};
n.ontimeout = function() {
if (e.onError) {
e.onError(new a(408, c(408)));
e.onError = null;
e.onSuccess = null;
o.pendingRequests.length ? o._doRequest(o.pendingRequests.shift()) : o.currentRequestNum--;
}
};
n.onabort = function() {
if (e.onError) {
e.onError(new a(-1, "Request abort."));
e.onError = null;
e.onSuccess = null;
o.pendingRequests.length ? o._doRequest(o.pendingRequests.shift()) : o.currentRequestNum--;
}
};
this.authorization && n.setRequestHeader("auth-token", this.authorization);
n.send(t);
};
return e;
}();
o.HttpClient = i;
function c(e) {
switch (e) {
case 400:
return "Bad request.";

case 401:
return "Unauthorized.";

case 402:
return "Payment required.";

case 403:
return "Forbidden.";

case 404:
return "Not found.";

case 405:
return "Method not allowed.";

case 406:
return "Not acceptable.";

case 407:
return "Proxy authentication required.";

case 408:
return "Request timeout.";

case 409:
return "Conflict.";

case 410:
return "Gone.";

case 411:
return "Length required.";

case 412:
return "Precondition failed.";

case 413:
return "Payload too large.";

case 414:
return "URI too long.";

case 416:
return "Requested range not satisfiable.";

case 417:
return "Expectation failed.";

case 427:
return "Precondition required.";

case 429:
return "Too many requests.";

case 449:
return "Retry after doing the appropriate action.";

case 500:
return "Internal server error.";

case 501:
return "Server does not support the functionality required to fulfill the request.";

case 502:
return "Error response received from gateway.";

case 503:
return "Temporarily overloaded.";

case 504:
return "Timed out waiting for gateway.";

case 505:
return "HTTP version not supported.";
}
return "Unknown error code: " + e;
}
cc._RF.pop();
}, {} ],
InviteFriendInterface: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "33620TH62FE8bQ3bQuIULdi", "InviteFriendInterface");
Object.defineProperty(o, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
InviteFriendItem: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "62bcd0/gZNDxY3iFj3nMbO4", "InviteFriendItem");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../Common/BaseNode"), c = e("../../Common/Utils"), u = cc._decorator, s = u.ccclass, l = u.property, _ = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.invite_friend_item_bottom = null;
t.get_invite_friend_award_button = null;
t.award_money_label = null;
t.item_message_label = null;
t.item_sub_message_label = null;
t.get_invite_friend_award_button_label = null;
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
t.prototype.update_view = function(e) {
this.award_money_label.string = "" + c.default.money(e.money, 1);
this.item_message_label.string = e.num + "位好友 = " + c.default.money(e.totalMoney, 1) + " 元";
this.item_sub_message_label.string = "您还可以领" + e.money;
};
a([ l(cc.Sprite) ], t.prototype, "invite_friend_item_bottom", void 0);
a([ l(cc.Sprite) ], t.prototype, "get_invite_friend_award_button", void 0);
a([ l(cc.Label) ], t.prototype, "award_money_label", void 0);
a([ l(cc.Label) ], t.prototype, "item_message_label", void 0);
a([ l(cc.Label) ], t.prototype, "item_sub_message_label", void 0);
a([ l(cc.Label) ], t.prototype, "get_invite_friend_award_button_label", void 0);
return a([ s ], t);
}(i.default);
o.default = _;
cc._RF.pop();
}, {
"../../Common/BaseNode": "BaseNode",
"../../Common/Utils": "Utils"
} ],
InviteFriendViewController: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3ae07t6IuhBeLF/6SFe1Cqh", "InviteFriendViewController");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = e("../../Common/CommonEnum"), i = e("../../Common/Controller"), c = e("../../Common/Loader"), u = e("../../GameServerData/CommonServerData"), s = e("../UIManager/UIManager"), l = e("./Normal/NormalInviteFriendView"), _ = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.name = "InviteFriendViewController";
t.view = null;
t.normal_invite_friend_view = null;
t.share_interface = null;
return t;
}
t.open = function(e) {
var o = {
controller: t,
ui_config_name: "InviteFriendView",
path: e
};
s.default.nagivate_route(o);
};
t.prototype.init_view = function() {
var e = this;
this.view.ui_param_interface.router.path == a.InviteFriendPath.normal ? c.default.load_prefab("UI/InviteFriend/Normal/NormalInviteFriendView", function(t) {
var o = cc.instantiate(t);
o.parent = e.view.node;
e.normal_invite_friend_view = o.getComponent(l.default);
}) : console.log("当前");
};
t.prototype.update_view = function() {
var e = this;
u.default.get_invite_friends(function(t) {
if (t) {
e.share_interface = t;
t.stages ? e.view.ui_param_interface.router.path == a.InviteFriendPath.normal ? e.normal_invite_friend_view.update_view(t.stages) : console.log("当前页面显示失败") : console.log("没有获得分享数据");
} else console.log("功能没有开启");
});
};
return t;
}(i.default);
o.default = _;
cc._RF.pop();
}, {
"../../Common/CommonEnum": "CommonEnum",
"../../Common/Controller": "Controller",
"../../Common/Loader": "Loader",
"../../GameServerData/CommonServerData": "CommonServerData",
"../UIManager/UIManager": "UIManager",
"./Normal/NormalInviteFriendView": "NormalInviteFriendView"
} ],
InviteFriendView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "1970cCgl4JHp7kLz45LjXtD", "InviteFriendView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../Common/BaseUI"), c = cc._decorator, u = c.ccclass, s = c.property, l = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.controller = null;
t.label = null;
t.text = "hello";
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.controller.init_view();
};
t.prototype.onAddFinished = function() {
e.prototype.onAddFinished.call(this);
this.controller.view = this;
this.controller.update_view();
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
a([ s(cc.Label) ], t.prototype, "label", void 0);
a([ s ], t.prototype, "text", void 0);
return a([ u ], t);
}(i.default);
o.default = l;
cc._RF.pop();
}, {
"../../Common/BaseUI": "BaseUI"
} ],
LinkGameBase: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "289ea6z3N9LKqZbLw3AaBW1", "LinkGameBase");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../UI/UIManager/UIConfig"), r = function() {
function e() {}
e.register_ui_path = function(e, t) {
n.default[e] ? console.error("prefab" + e + " 的路径已经存在 " + n.default[e]) : n.default[e] = t;
};
e.game_play_record = [];
e.game_play_event_config = {};
return e;
}();
o.default = r;
cc._RF.pop();
}, {
"../UI/UIManager/UIConfig": "UIConfig"
} ],
Loader: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "02b48cfpQVOzLzd3jaB2xNc", "Loader");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.load_texture = function(e, t) {
cc.resources.load(e, cc.Texture2D, function(o, n) {
o ? console.error("图片资源 " + e + " 没有找到") : t(n);
});
};
e.recursion_load_sprite_frame = function(e, t) {
var o = this, n = 0, r = function() {
var a = e[n];
o.load_texture(a, function(o) {
t(new cc.SpriteFrame(o), n);
if (n < e.length - 1) {
n++;
r();
}
});
};
r();
};
e.load_prefab = function(e, t) {
cc.resources.load(e, cc.Prefab, function(o, n) {
o ? console.error("prefab " + e + " 路径加载的资源失败") : t && t(n);
});
};
e.request_remote_image = function(e, t) {
cc.assetManager.loadRemote(e, function(o, n) {
o ? console.error("当前的地址[" + e + "] 下载失败 " + o) : t && t(new cc.SpriteFrame(n));
});
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
LoadingSceneController: [ function(e, t) {
"use strict";
cc._RF.push(t, "edcc4+zbRFDKaPz3UH8yqbp", "LoadingSceneController");
cc._RF.pop();
}, {} ],
LoadingScene: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "4b56aMLl0JGj5X8Cbzop6PX", "LoadingScene");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../Boot"), c = e("../Common/TouchButton"), u = e("../Common/Utils"), s = e("../UI/UIManager/UIConfig"), l = e("../UI/UIManager/UIManager"), _ = e("./BaseScene"), p = cc._decorator, d = p.ccclass, f = p.property, h = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.game_logo_iamge = null;
t.game_background_image = null;
t.game_share_image = null;
t.loading_progress_bottom_image = null;
t.loading_progress_upper_image = null;
t.start_game_button_image = null;
t.start_game_button_label = null;
t.loading_progress = null;
t.start_game_button_node = null;
t.protocol_node = null;
t.privacy_node = null;
t.protocol_and_privacy_node = null;
t.user_toggle = null;
t.loading_scene_interface = {
game_logo_iamge: "",
game_background_image: "game_background_image",
game_share_image: "",
loading_progress_bottom_image: "loading_progress_bottom_image",
loading_progress_upper_image: "loading_progress_upper_image",
start_game_button_image: "start_game_button_image",
start_game_button_text: "开始游戏"
};
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
i.Boot.init();
this.flush_view();
};
t.prototype.special_set_sprite = function() {};
t.prototype.flush_view = function() {
var e = u.default.get_ui_interface_sprite_path_and_sprite_name(this.loading_scene_interface, "./Scene/LoadingScene/"), t = e[0], o = e[1];
this.flush_ui_image(t, o);
this.loading_scene_interface.start_game_button_text && (this.start_game_button_label.string = this.loading_scene_interface.start_game_button_text);
this.start_game_button_node.addComponent(c.default).register_touch(this.start_game_callback.bind(this));
this.protocol_node.addComponent(c.default).register_touch(this.user_protocol_callback.bind(this));
this.privacy_node.addComponent(c.default).register_touch(this.user_privacy_callback.bind(this));
i.gamebase.start_game_button_node = this.start_game_button_node;
};
t.prototype.start_game_callback = function() {
console.log("点击开始游戏的按钮");
if (this.user_toggle.isChecked) this.start_game_success_callback(); else {
var e = {
ui_config_path: s.default.Toast,
ui_config_name: "Toast",
param: {
text: "请勾选同意用户协议"
}
};
l.default.show_ui(e);
}
};
t.prototype.start_game_success_callback = function() {
var e = this;
this.start_game_button_image.node.active = !1;
this.loading_progress.node.active = !0;
this.protocol_and_privacy_node.active = !1;
cc.director.preloadScene("GameScene", function(t, o) {
var n = t / o;
e.loading_progress.progress = n;
}, function(e) {
e ? console.log("进入游戏主场景失败了") : setTimeout(function() {
cc.director.loadScene("GameScene");
}, 300);
});
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
t.prototype.user_protocol_callback = function() {
var e = {
ui_config_path: s.default.UserProtocolView,
ui_config_name: "UserProtocolView"
};
l.default.show_ui(e);
};
t.prototype.user_privacy_callback = function() {
var e = {
ui_config_path: s.default.UserPrivacyView,
ui_config_name: "UserPrivacyView"
};
l.default.show_ui(e);
};
t.prototype.update = function() {
this.loading_progress.totalLength = this.loading_progress_bottom_image.node.width;
};
a([ f(cc.Sprite) ], t.prototype, "game_logo_iamge", void 0);
a([ f(cc.Sprite) ], t.prototype, "game_background_image", void 0);
a([ f(cc.Sprite) ], t.prototype, "game_share_image", void 0);
a([ f(cc.Sprite) ], t.prototype, "loading_progress_bottom_image", void 0);
a([ f(cc.Sprite) ], t.prototype, "loading_progress_upper_image", void 0);
a([ f(cc.Sprite) ], t.prototype, "start_game_button_image", void 0);
a([ f(cc.Label) ], t.prototype, "start_game_button_label", void 0);
a([ f(cc.ProgressBar) ], t.prototype, "loading_progress", void 0);
a([ f(cc.Node) ], t.prototype, "start_game_button_node", void 0);
a([ f(cc.Node) ], t.prototype, "protocol_node", void 0);
a([ f(cc.Node) ], t.prototype, "privacy_node", void 0);
a([ f(cc.Node) ], t.prototype, "protocol_and_privacy_node", void 0);
a([ f(cc.Toggle) ], t.prototype, "user_toggle", void 0);
return a([ d ], t);
}(_.default);
o.default = h;
cc._RF.pop();
}, {
"../Boot": "Boot",
"../Common/TouchButton": "TouchButton",
"../Common/Utils": "Utils",
"../UI/UIManager/UIConfig": "UIConfig",
"../UI/UIManager/UIManager": "UIManager",
"./BaseScene": "BaseScene"
} ],
Md5: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "d2cf1FGC79KLbH9LOBqDBRt", "Md5");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.calcMD5 = o.b64MD5w = o.b64MD5 = o.hexMD5w = o.hexMD5 = void 0;
function n(e, t) {
var o = (65535 & e) + (65535 & t);
return (e >> 16) + (t >> 16) + (o >> 16) << 16 | 65535 & o;
}
function r(e, t, o, r, a, i) {
return n((c = n(n(t, e), n(r, i))) << (u = a) | c >>> 32 - u, o);
var c, u;
}
function a(e, t, o, n, a, i, c) {
return r(t & o | ~t & n, e, t, a, i, c);
}
function i(e, t, o, n, a, i, c) {
return r(t & n | o & ~n, e, t, a, i, c);
}
function c(e, t, o, n, a, i, c) {
return r(t ^ o ^ n, e, t, a, i, c);
}
function u(e, t, o, n, a, i, c) {
return r(o ^ (t | ~n), e, t, a, i, c);
}
function s(e) {
for (var t = 1732584193, o = -271733879, r = -1732584194, s = 271733878, l = 0; l < e.length; l += 16) {
var _ = t, p = o, d = r, f = s;
t = a(t, o, r, s, e[l + 0], 7, -680876936);
s = a(s, t, o, r, e[l + 1], 12, -389564586);
r = a(r, s, t, o, e[l + 2], 17, 606105819);
o = a(o, r, s, t, e[l + 3], 22, -1044525330);
t = a(t, o, r, s, e[l + 4], 7, -176418897);
s = a(s, t, o, r, e[l + 5], 12, 1200080426);
r = a(r, s, t, o, e[l + 6], 17, -1473231341);
o = a(o, r, s, t, e[l + 7], 22, -45705983);
t = a(t, o, r, s, e[l + 8], 7, 1770035416);
s = a(s, t, o, r, e[l + 9], 12, -1958414417);
r = a(r, s, t, o, e[l + 10], 17, -42063);
o = a(o, r, s, t, e[l + 11], 22, -1990404162);
t = a(t, o, r, s, e[l + 12], 7, 1804603682);
s = a(s, t, o, r, e[l + 13], 12, -40341101);
r = a(r, s, t, o, e[l + 14], 17, -1502002290);
t = i(t, o = a(o, r, s, t, e[l + 15], 22, 1236535329), r, s, e[l + 1], 5, -165796510);
s = i(s, t, o, r, e[l + 6], 9, -1069501632);
r = i(r, s, t, o, e[l + 11], 14, 643717713);
o = i(o, r, s, t, e[l + 0], 20, -373897302);
t = i(t, o, r, s, e[l + 5], 5, -701558691);
s = i(s, t, o, r, e[l + 10], 9, 38016083);
r = i(r, s, t, o, e[l + 15], 14, -660478335);
o = i(o, r, s, t, e[l + 4], 20, -405537848);
t = i(t, o, r, s, e[l + 9], 5, 568446438);
s = i(s, t, o, r, e[l + 14], 9, -1019803690);
r = i(r, s, t, o, e[l + 3], 14, -187363961);
o = i(o, r, s, t, e[l + 8], 20, 1163531501);
t = i(t, o, r, s, e[l + 13], 5, -1444681467);
s = i(s, t, o, r, e[l + 2], 9, -51403784);
r = i(r, s, t, o, e[l + 7], 14, 1735328473);
t = c(t, o = i(o, r, s, t, e[l + 12], 20, -1926607734), r, s, e[l + 5], 4, -378558);
s = c(s, t, o, r, e[l + 8], 11, -2022574463);
r = c(r, s, t, o, e[l + 11], 16, 1839030562);
o = c(o, r, s, t, e[l + 14], 23, -35309556);
t = c(t, o, r, s, e[l + 1], 4, -1530992060);
s = c(s, t, o, r, e[l + 4], 11, 1272893353);
r = c(r, s, t, o, e[l + 7], 16, -155497632);
o = c(o, r, s, t, e[l + 10], 23, -1094730640);
t = c(t, o, r, s, e[l + 13], 4, 681279174);
s = c(s, t, o, r, e[l + 0], 11, -358537222);
r = c(r, s, t, o, e[l + 3], 16, -722521979);
o = c(o, r, s, t, e[l + 6], 23, 76029189);
t = c(t, o, r, s, e[l + 9], 4, -640364487);
s = c(s, t, o, r, e[l + 12], 11, -421815835);
r = c(r, s, t, o, e[l + 15], 16, 530742520);
t = u(t, o = c(o, r, s, t, e[l + 2], 23, -995338651), r, s, e[l + 0], 6, -198630844);
s = u(s, t, o, r, e[l + 7], 10, 1126891415);
r = u(r, s, t, o, e[l + 14], 15, -1416354905);
o = u(o, r, s, t, e[l + 5], 21, -57434055);
t = u(t, o, r, s, e[l + 12], 6, 1700485571);
s = u(s, t, o, r, e[l + 3], 10, -1894986606);
r = u(r, s, t, o, e[l + 10], 15, -1051523);
o = u(o, r, s, t, e[l + 1], 21, -2054922799);
t = u(t, o, r, s, e[l + 8], 6, 1873313359);
s = u(s, t, o, r, e[l + 15], 10, -30611744);
r = u(r, s, t, o, e[l + 6], 15, -1560198380);
o = u(o, r, s, t, e[l + 13], 21, 1309151649);
t = u(t, o, r, s, e[l + 4], 6, -145523070);
s = u(s, t, o, r, e[l + 11], 10, -1120210379);
r = u(r, s, t, o, e[l + 2], 15, 718787259);
o = u(o, r, s, t, e[l + 9], 21, -343485551);
t = n(t, _);
o = n(o, p);
r = n(r, d);
s = n(s, f);
}
return [ t, o, r, s ];
}
function l(e) {
for (var t = "", o = 0; o < 4 * e.length; o++) t += "0123456789abcdef".charAt(e[o >> 2] >> o % 4 * 8 + 4 & 15) + "0123456789abcdef".charAt(e[o >> 2] >> o % 4 * 8 & 15);
return t;
}
function _(e) {
for (var t = "", o = 0; o < 32 * e.length; o += 6) t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e[o >> 5] << o % 32 & 63 | e[o >> 6] >> 32 - o % 32 & 63);
return t;
}
function p(e) {
for (var t = 1 + (e.length + 8 >> 6), o = new Array(16 * t), n = 0; n < 16 * t; n++) o[n] = 0;
for (n = 0; n < e.length; n++) o[n >> 2] |= (255 & e.charCodeAt(n)) << n % 4 * 8;
o[n >> 2] |= 128 << n % 4 * 8;
o[16 * t - 2] = 8 * e.length;
return o;
}
function d(e) {
for (var t = 1 + (e.length + 4 >> 5), o = new Array(16 * t), n = 0; n < 16 * t; n++) o[n] = 0;
for (n = 0; n < e.length; n++) o[n >> 1] |= e.charCodeAt(n) << n % 2 * 16;
o[n >> 1] |= 128 << n % 2 * 16;
o[16 * t - 2] = 16 * e.length;
return o;
}
o.hexMD5 = function(e) {
return l(s(p(e)));
};
o.hexMD5w = function(e) {
return l(s(d(e)));
};
o.b64MD5 = function(e) {
return _(s(p(e)));
};
o.b64MD5w = function(e) {
return _(s(d(e)));
};
o.calcMD5 = function(e) {
return l(s(p(e)));
};
cc._RF.pop();
}, {} ],
Modal: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "bc780gHZ7hA1KFO8Q0r2BF0", "Modal");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("./BaseUI"), c = e("./TouchButton"), u = cc._decorator, s = u.ccclass, l = u.property, _ = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.modal_bottom_image = null;
t.modal_top_tip_image = null;
t.modal_title_bottom_image = null;
t.close_button_image = null;
t.modal_cancel_button_image = null;
t.modal_ok_button_image = null;
t.title_label = null;
t.cancel_label = null;
t.ok_label = null;
t.message_label = null;
t.cancel_button_node = null;
t.ok_button_node = null;
t.close_button_node = null;
t.modal_interface = null;
t.modal_ui_interface = {
modal_bottom_image: "",
modal_top_tip_image: "",
modal_title_bottom_image: "",
close_button_image: "",
modal_cancel_button_image: "",
modal_ok_button_image: ""
};
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
e.prototype.start.call(this);
this.ok_button_node.addComponent(c.default).register_touch(this.ok_callback.bind(this));
this.cancel_button_node.addComponent(c.default).register_touch(this.cancel_callback.bind(this));
this.close_button_node.addComponent(c.default).register_touch(this.on_close_call.bind(this));
this.flush_ui_image(this.modal_ui_interface, "./UI/Common/texture/");
};
t.prototype.show = function(t) {
e.prototype.show.call(this, t);
this.set_modal_interface(t.param);
};
t.prototype.set_modal_interface = function(e) {
this.modal_interface = e;
this.flush_view();
};
t.prototype.flush_view = function() {
this.modal_interface.confirm_text && (this.ok_label.string = this.modal_interface.confirm_text);
this.modal_interface.cancel_text && (this.cancel_label.string = this.modal_interface.cancel_text);
this.modal_interface.message && (this.message_label.string = this.modal_interface.message);
};
t.prototype.ok_callback = function() {
this.modal_interface.ok_callback && this.modal_interface.ok_callback();
this.on_close_call();
};
t.prototype.cancel_callback = function() {
this.modal_interface.cancel_callback && this.modal_interface.cancel_callback();
this.on_close_call();
};
a([ l(cc.Sprite) ], t.prototype, "modal_bottom_image", void 0);
a([ l(cc.Sprite) ], t.prototype, "modal_top_tip_image", void 0);
a([ l(cc.Sprite) ], t.prototype, "modal_title_bottom_image", void 0);
a([ l(cc.Sprite) ], t.prototype, "close_button_image", void 0);
a([ l(cc.Sprite) ], t.prototype, "modal_cancel_button_image", void 0);
a([ l(cc.Sprite) ], t.prototype, "modal_ok_button_image", void 0);
a([ l(cc.Label) ], t.prototype, "title_label", void 0);
a([ l(cc.Label) ], t.prototype, "cancel_label", void 0);
a([ l(cc.Label) ], t.prototype, "ok_label", void 0);
a([ l(cc.Label) ], t.prototype, "message_label", void 0);
a([ l(cc.Node) ], t.prototype, "cancel_button_node", void 0);
a([ l(cc.Node) ], t.prototype, "ok_button_node", void 0);
a([ l(cc.Node) ], t.prototype, "close_button_node", void 0);
return a([ s ], t);
}(i.default);
o.default = _;
cc._RF.pop();
}, {
"./BaseUI": "BaseUI",
"./TouchButton": "TouchButton"
} ],
Nagivator: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "517a0/dY19J/oh7T+GJ08SS", "Nagivator");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../UI/UIManager/UIConfig"), c = e("./ActionNode"), u = e("./BaseNode"), s = e("./Loader"), l = e("./TouchButton"), _ = cc._decorator, p = _.ccclass, d = _.property, f = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.nagivator_bottom = null;
t.nagivator_back_bottom = null;
t.nagivator_back_button = null;
t.action_container = null;
t.back_button_node = null;
t.title_label = null;
t.nagivator_interface = null;
t.actions = [];
t.nagivator_ui_interface = {
nagivator_bottom: "nagivator_bottom",
nagivator_back_bottom: "nagivator_back_bottom",
nagivator_back_button: "nagivator_back_button"
};
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
this.flush_ui_image(this.nagivator_ui_interface, "./UI/Common/texture/");
};
t.prototype.init_actions = function(e) {
var t = this;
this.actions = e;
if (this.actions.length > 0) {
var o = 0, n = function() {
s.default.load_prefab(i.default.ActionNode, function(e) {
var r = t.actions[o], a = cc.instantiate(e);
a.getComponent(c.default).register_action(r);
a.parent = t.action_container;
++o < t.actions.length - 1 && n();
});
};
n();
}
};
t.prototype.set_backbutton_callback = function(e) {
this.back_button_node.addComponent(l.default).register_touch(e);
};
t.prototype.set_nagivator_interface = function(e) {
this.nagivator_interface = e;
this.set_title(this.nagivator_interface.title);
this.back_button_node.addComponent(l.default).register_touch(this.nagivator_interface.back_callback);
this.set_nagivator_back_bottom_left_widget(this.nagivator_interface.widget_left);
this.nagivator_bottom.node.active = this.nagivator_interface.show_nagivator_bottom;
};
t.prototype.set_title = function(e) {
this.title_label.string = e;
};
t.prototype.set_nagivator_back_bottom_left_widget = function(e) {
if (e) {
var t = this.nagivator_back_bottom.getComponent(cc.Widget);
t.left = e;
t.updateAlignment();
}
};
t.prototype.set_nagivate_bottom_full_screen = function() {
var e = this.nagivator_back_bottom.getComponent(cc.Widget), t = this.nagivator_back_bottom.getComponent(cc.Layout);
this.title_label.node.x = cc.winSize.width / 2;
this.title_label.node.anchorX = .5;
t.enabled = !1;
e.isAlignRight = !0;
e.left = 0;
e.right = 0;
e.updateAlignment();
};
a([ d(cc.Sprite) ], t.prototype, "nagivator_bottom", void 0);
a([ d(cc.Sprite) ], t.prototype, "nagivator_back_bottom", void 0);
a([ d(cc.Sprite) ], t.prototype, "nagivator_back_button", void 0);
a([ d(cc.Node) ], t.prototype, "action_container", void 0);
a([ d(cc.Node) ], t.prototype, "back_button_node", void 0);
a([ d(cc.Label) ], t.prototype, "title_label", void 0);
return a([ p ], t);
}(u.default);
o.default = f;
cc._RF.pop();
}, {
"../UI/UIManager/UIConfig": "UIConfig",
"./ActionNode": "ActionNode",
"./BaseNode": "BaseNode",
"./Loader": "Loader",
"./TouchButton": "TouchButton"
} ],
Native: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "76409KWgQNHoLWv02GZoWhx", "Native");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../Boot"), r = e("../EventManager/EventManager"), a = e("./SdkEnum"), i = {
init: function() {
i.register_handler();
},
call_native: function(e, t) {
if (n.gamebase.WebViewJavascriptBridge) {
console.log("==JS调客户端=", JSON.stringify(e));
n.gamebase.WebViewJavascriptBridge.callHandler(a.NativeEnum.NEH5CallNative, e, t);
} else console.warn("Native 当前客服端不能调用原生的方法");
},
post_message_to_native: function(e, t) {
if (n.gamebase.WebViewJavascriptBridge) {
console.log("==JS给客户端发送消息=", JSON.stringify(e));
n.gamebase.WebViewJavascriptBridge.send(a.NativeEnum.NEH5CallNative, e, t);
} else console.warn("Native JS不能给原生发送消息的方法");
},
register_handler: function() {
n.gamebase.WebViewJavascriptBridge && n.gamebase.WebViewJavascriptBridge.registerHandler(a.NativeEnum.NENativeCallH5, function(e) {
var t = JSON.parse(e);
console.log("原生端发送的数据  = " + t);
t && t.func && r.default.get_instance().emit(t.func, t);
});
}
};
o.default = i;
cc._RF.pop();
}, {
"../Boot": "Boot",
"../EventManager/EventManager": "EventManager",
"./SdkEnum": "SdkEnum"
} ],
NetworkLoading: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "a7bb3ztWdtB57Teycf4ZjiL", "NetworkLoading");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("./BaseUI"), c = cc._decorator, u = c.ccclass, s = (c.property, function(e) {
r(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.start = function() {};
t.prototype.hide = function() {
e.prototype.hide.call(this);
};
t.prototype.show = function(t) {
e.prototype.show.call(this, t);
console.log("NETing show");
};
return a([ u ], t);
}(i.default));
o.default = s;
cc._RF.pop();
}, {
"./BaseUI": "BaseUI"
} ],
NewPlayerGuideEnum: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2558aFulCRDC5b5rWk6u3Zc", "NewPlayerGuideEnum");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.GuideMaskType = o.GuideFingerDirection = o.GuideType = o.GuideNpcDirection = o.GuideMsgAlignVerticleMode = o.GuideMsgAlignHorizontalMode = o.GuideNpcAlignVerticleMode = o.GuideNpcAlignHorizontalMode = void 0;
var n, r, a, i, c, u, s, l, _;
(function(e) {
e[e.up = 1] = "up";
e[e.down = 2] = "down";
e[e.left = 3] = "left";
e[e.right = 4] = "right";
})(n || (n = {}));
o.GuideFingerDirection = n;
(function(e) {
e[e.rect = 1] = "rect";
e[e.circle = 2] = "circle";
})(r || (r = {}));
o.GuideMaskType = r;
(function(e) {
e.normal = "normal";
e.pciture = "picture";
})(a || (a = {}));
o.GuideType = a;
(function(e) {
e.left = "left";
e.right = "right";
})(i || (i = {}));
o.GuideNpcDirection = i;
(function(e) {
e.normal = "normal";
e.picture = "picture";
})(c || (c = {}));
(function(e) {
e[e.left = 1] = "left";
e[e.right = 2] = "right";
})(u || (u = {}));
o.GuideNpcAlignHorizontalMode = u;
(function(e) {
e[e.top = 1] = "top";
e[e.bottom = 2] = "bottom";
})(s || (s = {}));
o.GuideNpcAlignVerticleMode = s;
(function(e) {
e[e.left = 1] = "left";
e[e.right = 2] = "right";
})(l || (l = {}));
o.GuideMsgAlignHorizontalMode = l;
(function(e) {
e[e.top = 1] = "top";
e[e.bottom = 2] = "bottom";
})(_ || (_ = {}));
o.GuideMsgAlignVerticleMode = _;
cc._RF.pop();
}, {} ],
NewPlayerGuideInterface: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "4152cSUgN5NiZrKmDfIaCvo", "NewPlayerGuideInterface");
Object.defineProperty(o, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
NewPlayerGuideView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "ec4f6jJGXBOv65VT/EiEozt", "NewPlayerGuideView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../Common/BaseUI"), c = e("../../Common/CommonEnum"), u = e("../../Common/TouchButton"), s = e("../../GameLocalData/GameLocalData"), l = e("../../GameLocalData/GuideData"), _ = e("../UIManager/UIConfig"), p = e("../UIManager/UIManager"), d = e("./NewPlayerGuideEnum"), f = cc._decorator, h = f.ccclass, y = f.property, g = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.help_guide_mask = null;
t.help_message_label = null;
t.help_message_bottom = null;
t.click_button = null;
t.hand_icon = null;
t.help_mask_background = null;
t.npc_icon = null;
t.new_player_guide_interface = null;
return t;
}
t.show_guide = function(e, t, o, n, r, a, i, c) {
var u = {
guide_id: e,
guide_type: t,
callback: n,
guide_to_node: o,
guide_hande_interface: i,
guide_npc_interface: c,
guide_mask_interface: a,
guide_help_msg_interface: r
}, s = {
ui_config_path: _.default.NewPlayerGuideView,
ui_config_name: "NewPlayerGuideView",
param: u,
complete_callback: function(e) {
e.show_new_player_guide_msg(e.ui_param_interface.param);
}
};
p.default.show_ui(s);
};
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.click_button.addComponent(u.default).register_touch(this.help_guide_callback.bind(this));
};
t.prototype.register_touch = function(e) {
this.click_button.addComponent(u.default).register_touch(function() {
e && e();
}, null, null, c.TouchButtonEffectType.none);
};
t.prototype.show = function(t) {
e.prototype.show.call(this, t);
console.log("新手引导数据 ", t);
};
t.prototype.show_new_player_guide_msg = function(e) {
this.new_player_guide_interface = e;
var t = cc.v3(0, 0, 0);
if (this.new_player_guide_interface.guide_to_node) {
var o = this.new_player_guide_interface.guide_to_node.parent.convertToWorldSpaceAR(this.new_player_guide_interface.guide_to_node.position);
t = this.node.parent.convertToNodeSpaceAR(o);
this.click_button.position = t;
}
console.log("引导到的目标位置 = ", t);
this.hand_icon.node.active = this.new_player_guide_interface.guide_hande_interface.show_hand;
if (this.new_player_guide_interface.guide_hande_interface.show_hand) {
this.hand_icon.node.active = this.new_player_guide_interface.guide_hande_interface.show_hand;
var n = this.new_player_guide_interface.guide_hande_interface.hand_finger_dir;
n == d.GuideFingerDirection.up ? this.hand_icon.node.angle = 180 : n == d.GuideFingerDirection.down ? this.hand_icon.node.angle = 0 : n == d.GuideFingerDirection.left ? this.hand_icon.node.angle = 270 : n == d.GuideFingerDirection.right && (this.hand_icon.node.angle = 90);
this.new_player_guide_interface.guide_hande_interface.hand_angle && (this.hand_icon.node.angle = this.new_player_guide_interface.guide_hande_interface.hand_angle);
this.new_player_guide_interface.guide_hande_interface.hand_position_offset ? this.hand_icon.node.position = t.addSelf(this.new_player_guide_interface.guide_hande_interface.hand_position_offset) : this.hand_icon.node.position = t;
}
if (this.new_player_guide_interface.guide_mask_interface.show_mask) {
if (this.new_player_guide_interface.guide_mask_interface.guide_mask_type == d.GuideMaskType.circle) {
this.help_guide_mask.node.width = this.new_player_guide_interface.guide_mask_interface.mask_size.width;
this.help_guide_mask.node.height = this.new_player_guide_interface.guide_mask_interface.mask_size.height;
this.help_guide_mask.type = cc.Mask.Type.ELLIPSE;
} else if (this.new_player_guide_interface.guide_mask_interface.guide_mask_type == d.GuideMaskType.rect) {
this.help_guide_mask.node.width = this.new_player_guide_interface.guide_mask_interface.mask_size.width;
this.help_guide_mask.node.height = this.new_player_guide_interface.guide_mask_interface.mask_size.height;
this.help_guide_mask.type = cc.Mask.Type.RECT;
}
this.help_guide_mask.node.position = t;
this.new_player_guide_interface.guide_mask_interface.mask_animation ? this.play_mask_animation() : this.stop_mask_animation();
this.click_button.width = this.new_player_guide_interface.guide_mask_interface.mask_size.width;
this.click_button.height = this.new_player_guide_interface.guide_mask_interface.mask_size.height;
} else {
this.help_guide_mask.node.width = 0;
this.help_guide_mask.node.height = 0;
this.click_button.width = 0;
this.click_button.height = 0;
this.stop_mask_animation();
}
this.help_message_bottom.active = this.new_player_guide_interface.guide_help_msg_interface.show_help_msg;
if (this.new_player_guide_interface.guide_help_msg_interface.show_help_msg) {
this.help_message_label.string = this.new_player_guide_interface.guide_help_msg_interface.help_message;
var r = this.help_message_bottom.getComponent(cc.Widget);
if (this.new_player_guide_interface.guide_help_msg_interface.horizonal_align_mode == d.GuideMsgAlignHorizontalMode.left) {
r.isAlignLeft = !0;
r.isAlignRight = !1;
r.left = this.new_player_guide_interface.guide_help_msg_interface.horizonal_align;
} else if (this.new_player_guide_interface.guide_help_msg_interface.horizonal_align_mode == d.GuideMsgAlignHorizontalMode.right) {
r.isAlignLeft = !1;
r.isAlignRight = !0;
r.right = this.new_player_guide_interface.guide_help_msg_interface.horizonal_align;
}
if (this.new_player_guide_interface.guide_help_msg_interface.verticle_align_mode == d.GuideMsgAlignVerticleMode.top) {
r.isAlignTop = !0;
r.isAlignBottom = !1;
r.top = this.new_player_guide_interface.guide_help_msg_interface.verticle_align;
} else if (this.new_player_guide_interface.guide_help_msg_interface.verticle_align_mode == d.GuideMsgAlignVerticleMode.bottom) {
r.isAlignTop = !1;
r.isAlignBottom = !0;
r.bottom = this.new_player_guide_interface.guide_help_msg_interface.verticle_align;
}
r.isStretchWidth = !1;
r.isStretchHeight = !1;
r.updateAlignment();
}
this.npc_icon.node.active = this.new_player_guide_interface.guide_npc_interface.show_npc;
if (this.new_player_guide_interface.guide_npc_interface.show_npc) {
this.new_player_guide_interface.guide_npc_interface.npc_direction == d.GuideNpcDirection.left ? this.npc_icon.node.scaleX = -Math.abs(this.npc_icon.node.scale) : (this.new_player_guide_interface.guide_npc_interface.npc_direction, 
d.GuideNpcDirection.right, this.npc_icon.node.scaleX = Math.abs(this.npc_icon.node.scale));
this.new_player_guide_interface.guide_npc_interface.npc_sprite_frame && (this.npc_icon.spriteFrame = this.new_player_guide_interface.guide_npc_interface.npc_sprite_frame);
r = this.npc_icon.node.getComponent(cc.Widget);
if (this.new_player_guide_interface.guide_npc_interface.horizonal_align_mode == d.GuideNpcAlignHorizontalMode.left) {
r.isAlignLeft = !0;
r.isAlignRight = !1;
r.left = this.new_player_guide_interface.guide_npc_interface.horizonal_align;
} else if (this.new_player_guide_interface.guide_npc_interface.horizonal_align_mode == d.GuideNpcAlignHorizontalMode.right) {
r.isAlignLeft = !1;
r.isAlignRight = !0;
r.right = this.new_player_guide_interface.guide_npc_interface.horizonal_align;
}
if (this.new_player_guide_interface.guide_npc_interface.verticle_align_mode == d.GuideNpcAlignVerticleMode.top) {
r.isAlignTop = !0;
r.isAlignBottom = !1;
r.top = this.new_player_guide_interface.guide_npc_interface.verticle_align;
} else if (this.new_player_guide_interface.guide_npc_interface.verticle_align_mode == d.GuideNpcAlignVerticleMode.bottom) {
r.isAlignTop = !1;
r.isAlignBottom = !0;
r.bottom = this.new_player_guide_interface.guide_npc_interface.verticle_align;
}
r.isStretchWidth = !1;
r.isStretchHeight = !1;
r.updateAlignment();
}
};
t.prototype.play_mask_animation = function() {
this.help_guide_mask.node.getComponent(cc.Animation).play("new_help_guide_mask_animation");
};
t.prototype.stop_mask_animation = function() {
this.help_guide_mask.node.getComponent(cc.Animation).stop("new_help_guide_mask_animation");
};
t.prototype.help_guide_callback = function() {
this.on_close_call();
s.default.get_instance().get_data(l.default).pass_a_guide(this.new_player_guide_interface.guide_id);
this.new_player_guide_interface.callback && this.new_player_guide_interface.callback();
};
a([ y(cc.Mask) ], t.prototype, "help_guide_mask", void 0);
a([ y(cc.Label) ], t.prototype, "help_message_label", void 0);
a([ y(cc.Node) ], t.prototype, "help_message_bottom", void 0);
a([ y(cc.Node) ], t.prototype, "click_button", void 0);
a([ y(cc.Sprite) ], t.prototype, "hand_icon", void 0);
a([ y(cc.Sprite) ], t.prototype, "help_mask_background", void 0);
a([ y(cc.Sprite) ], t.prototype, "npc_icon", void 0);
return a([ h ], t);
}(i.default);
o.default = g;
cc._RF.pop();
}, {
"../../Common/BaseUI": "BaseUI",
"../../Common/CommonEnum": "CommonEnum",
"../../Common/TouchButton": "TouchButton",
"../../GameLocalData/GameLocalData": "GameLocalData",
"../../GameLocalData/GuideData": "GuideData",
"../UIManager/UIConfig": "UIConfig",
"../UIManager/UIManager": "UIManager",
"./NewPlayerGuideEnum": "NewPlayerGuideEnum"
} ],
NoBalanceCashOutViewItem: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "672117pCu1MepDyXclrS6t2", "NoBalanceCashOutViewItem");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../Common/BaseNode"), c = e("../../../Common/TouchButton"), u = e("../../../Common/Utils"), s = cc._decorator, l = s.ccclass, _ = s.property, p = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.no_balance_cash_out_view_bottom = null;
t.cash_out_button = null;
t.left_cornoer_sign = null;
t.cash_out_money_label = null;
t.cash_out_condition_tip_label = null;
t.cash_out_button_text_label = null;
t.cornor_tip_label = null;
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.cash_out_button.node.addComponent(c.default).register_touch(function() {
console.log("点击了提现操作");
});
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
t.prototype.update_view = function(e) {
this.cash_out_money_label.string = u.default.money(e.money, 1) + "元";
};
a([ _(cc.Sprite) ], t.prototype, "no_balance_cash_out_view_bottom", void 0);
a([ _(cc.Sprite) ], t.prototype, "cash_out_button", void 0);
a([ _(cc.Sprite) ], t.prototype, "left_cornoer_sign", void 0);
a([ _(cc.Label) ], t.prototype, "cash_out_money_label", void 0);
a([ _(cc.Label) ], t.prototype, "cash_out_condition_tip_label", void 0);
a([ _(cc.Label) ], t.prototype, "cash_out_button_text_label", void 0);
a([ _(cc.Label) ], t.prototype, "cornor_tip_label", void 0);
return a([ l ], t);
}(i.default);
o.default = p;
cc._RF.pop();
}, {
"../../../Common/BaseNode": "BaseNode",
"../../../Common/TouchButton": "TouchButton",
"../../../Common/Utils": "Utils"
} ],
NoBanlanceCashOutView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "21232SamN1OTrvnU4VHNNhy", "NoBanlanceCashOutView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../Common/BaseUI"), c = e("../../UIManager/UIConfig"), u = e("../../UIManager/UIManager"), s = e("./NoBalanceCashOutViewItem"), l = cc._decorator, _ = l.ccclass, p = l.property, d = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.container = null;
t.no_banlance_view_item_prefab = null;
return t;
}
t.prototype.onLoad = function() {
var t = this;
e.prototype.onLoad.call(this);
this.add_nagivator([ {
action_title: "提现记录",
action: function() {
var e = {
ui_config_path: c.default.CashOutOrderView,
ui_config_name: "CashOutOrderView",
param: {}
};
u.default.show_ui(e);
}
} ], {
title: "提现",
back_callback: function() {
t.on_close_call("CashOutView");
}
});
};
t.prototype.update_view = function(e) {
this.container.removeAllChildren(!0);
for (var t = 0, o = e; t < o.length; t++) {
var n = o[t], r = cc.instantiate(this.no_banlance_view_item_prefab);
r.getComponent(s.default).update_view(n);
r.parent = this.container;
}
};
t.prototype.start = function() {};
t.prototype.update = function() {};
a([ p(cc.Node) ], t.prototype, "container", void 0);
a([ p(cc.Prefab) ], t.prototype, "no_banlance_view_item_prefab", void 0);
return a([ _ ], t);
}(i.default);
o.default = d;
cc._RF.pop();
}, {
"../../../Common/BaseUI": "BaseUI",
"../../UIManager/UIConfig": "UIConfig",
"../../UIManager/UIManager": "UIManager",
"./NoBalanceCashOutViewItem": "NoBalanceCashOutViewItem"
} ],
NormalClickOnView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "a092dHilFhDZ4Ik7WG4kZ/p", "NormalClickOnView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../Common/BaseUI"), c = cc._decorator, u = c.ccclass, s = c.property, l = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.click_background_bottom = null;
t.click_on_item_scroll_view_bottom = null;
t.click_on_item_prefab = null;
t.normal_click_on_free_tip = null;
t.container = null;
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
console.log(this.controller);
this.init_view();
};
t.prototype.init_view = function() {
for (var e = 0; e < 10; e++) cc.instantiate(this.click_on_item_prefab).parent = this.container;
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
a([ s(cc.Sprite) ], t.prototype, "click_background_bottom", void 0);
a([ s(cc.Sprite) ], t.prototype, "click_on_item_scroll_view_bottom", void 0);
a([ s(cc.Prefab) ], t.prototype, "click_on_item_prefab", void 0);
a([ s(cc.Prefab) ], t.prototype, "normal_click_on_free_tip", void 0);
a([ s(cc.Node) ], t.prototype, "container", void 0);
return a([ u ], t);
}(i.default);
o.default = l;
cc._RF.pop();
}, {
"../../../Common/BaseUI": "BaseUI"
} ],
NormalInviteFriendView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "7ce0cfms9pIrIgl5uRF1BoY", "NormalInviteFriendView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../Common/BaseUI"), c = e("../InviteFriendItem"), u = cc._decorator, s = u.ccclass, l = u.property, _ = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.rank_view_background = null;
t.invite_header_bottom = null;
t.copy_invite_code_button = null;
t.header_view = null;
t.container = null;
t.invite_code_tip_label = null;
t.copy_invite_code_button_abel = null;
t.invite_friend_item_prefab = null;
return t;
}
t.prototype.onLoad = function() {
var t = this;
e.prototype.onLoad.call(this);
this.add_nagivator([], {
title: "邀请好友",
back_callback: function() {
t.on_close_call("InviteFriendView");
}
});
};
t.prototype.update_view = function(e) {
for (var t = 0, o = e; t < o.length; t++) {
var n = o[t], r = cc.instantiate(this.invite_friend_item_prefab), a = r.getComponent(c.default);
r.parent = this.container;
a.update_view(n);
}
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
a([ l(cc.Sprite) ], t.prototype, "rank_view_background", void 0);
a([ l(cc.Sprite) ], t.prototype, "invite_header_bottom", void 0);
a([ l(cc.Sprite) ], t.prototype, "copy_invite_code_button", void 0);
a([ l(cc.Node) ], t.prototype, "header_view", void 0);
a([ l(cc.Node) ], t.prototype, "container", void 0);
a([ l(cc.Label) ], t.prototype, "invite_code_tip_label", void 0);
a([ l(cc.Label) ], t.prototype, "copy_invite_code_button_abel", void 0);
a([ l(cc.Prefab) ], t.prototype, "invite_friend_item_prefab", void 0);
return a([ s ], t);
}(i.default);
o.default = _;
cc._RF.pop();
}, {
"../../../Common/BaseUI": "BaseUI",
"../InviteFriendItem": "InviteFriendItem"
} ],
NormalOpenRedEnvelopeSuccessView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "9fee5ZhKuFK8oW+5Zb5KDF7", "NormalOpenRedEnvelopeSuccessView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../Common/BaseUI"), c = e("../../../Common/TouchButton"), u = cc._decorator, s = u.ccclass, l = u.property, _ = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.rank_view_background = null;
t.red_envelope_title_icon = null;
t.red_envelope_light_icon = null;
t.red_envelope_icon = null;
t.red_envelope_msg_bottom = null;
t.get_money_from_envelope_button = null;
t.red_envelope_monvey_label = null;
t.red_envelope_msg_label = null;
t.get_money_from_envelope_button_text_label = null;
t.normal_open_envelope_success_view_interface = null;
return t;
}
t.prototype.onAddFinished = function() {
e.prototype.onAddFinished.call(this);
this.normal_open_envelope_success_view_interface && this.normal_open_envelope_success_view_interface.money && (this.red_envelope_monvey_label.string = this.normal_open_envelope_success_view_interface.money + " 元");
};
t.prototype.onLoad = function() {
var t = this;
e.prototype.onLoad.call(this);
this.get_money_from_envelope_button.node.addComponent(c.default).register_touch(function() {
t.on_close_call();
});
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
t.prototype.show = function(t) {
e.prototype.show.call(this, t);
};
a([ l(cc.Sprite) ], t.prototype, "rank_view_background", void 0);
a([ l(cc.Sprite) ], t.prototype, "red_envelope_title_icon", void 0);
a([ l(cc.Sprite) ], t.prototype, "red_envelope_light_icon", void 0);
a([ l(cc.Sprite) ], t.prototype, "red_envelope_icon", void 0);
a([ l(cc.Sprite) ], t.prototype, "red_envelope_msg_bottom", void 0);
a([ l(cc.Sprite) ], t.prototype, "get_money_from_envelope_button", void 0);
a([ l(cc.Label) ], t.prototype, "red_envelope_monvey_label", void 0);
a([ l(cc.Label) ], t.prototype, "red_envelope_msg_label", void 0);
a([ l(cc.Label) ], t.prototype, "get_money_from_envelope_button_text_label", void 0);
return a([ s ], t);
}(i.default);
o.default = _;
cc._RF.pop();
}, {
"../../../Common/BaseUI": "BaseUI",
"../../../Common/TouchButton": "TouchButton"
} ],
NormalOpenRedEnvelopeView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "025e426zyRAtojhWiCgafUR", "NormalOpenRedEnvelopeView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../Common/BaseUI"), c = e("../OpenRedEnvelopeViewItem"), u = cc._decorator, s = u.ccclass, l = u.property, _ = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.open_red_envelope_view_bottom = null;
t.container = null;
t.open_red_envelope_view_item_prefab = null;
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.init_open_red_list_view();
};
t.prototype.init_open_red_list_view = function() {
for (var e = 0; e < 8; e++) {
var t = cc.instantiate(this.open_red_envelope_view_item_prefab);
t.getComponent(c.default);
t.parent = this.container;
var o = t.width, n = t.height, r = Math.floor(e / 4), a = e % 4;
t.x = o / 2 + a * o + 30 * a;
t.y = -(n / 2 + r * n);
}
};
t.prototype.set_position_by_node = function(e) {
var t = this.node.convertToWorldSpaceAR(e.position), o = this.node.parent.convertToNodeSpaceAR(t);
this.open_red_envelope_view_bottom.node.position = o;
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
a([ l(cc.Sprite) ], t.prototype, "open_red_envelope_view_bottom", void 0);
a([ l(cc.Node) ], t.prototype, "container", void 0);
a([ l(cc.Prefab) ], t.prototype, "open_red_envelope_view_item_prefab", void 0);
return a([ s ], t);
}(i.default);
o.default = _;
cc._RF.pop();
}, {
"../../../Common/BaseUI": "BaseUI",
"../OpenRedEnvelopeViewItem": "OpenRedEnvelopeViewItem"
} ],
NormalRankView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e484bw0DqpCHrytUDyDwT9/", "NormalRankView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../Common/BaseUI"), c = e("../RankHeaderView"), u = e("../RankViewItem"), s = cc._decorator, l = s.ccclass, _ = s.property, p = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.scroll_view = null;
t.container = null;
t.self_rank_node = null;
t.rank_view_background = null;
t.rank_item_prefab = null;
t.rank_header_prefab = null;
t.self_rank_item = null;
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.flush_view();
};
t.prototype.flush_view = function() {
var e = this, t = {
title: "排行榜",
back_callback: function() {
e.on_close_call("RankView");
}
};
this.add_nagivator([], t);
};
t.prototype.init_rank_list = function(e) {
this.container.removeAllChildren(!0);
for (var t = 0; t < e.itemList.length; t++) {
var o = cc.instantiate(this.rank_item_prefab), n = o.getComponent(u.default);
o.parent = this.container;
n.update_data(e.itemList[t]);
}
};
t.prototype.init_header_view = function(e) {
var t = cc.instantiate(this.rank_header_prefab);
t.getComponent(c.default).init_header_view(e);
t.parent = this.node;
};
t.prototype.add_player_rank_view = function(e) {
if (!this.self_rank_item) {
var t = cc.instantiate(this.rank_item_prefab), o = t.addComponent(cc.Widget);
o.enabled = !0;
o.bottom = -(this.node.height / 2 - t.height);
o.alignMode = cc.Widget.AlignMode.ALWAYS;
o.updateAlignment();
this.self_rank_item = t.getComponent(u.default);
t.parent = this.self_rank_node;
}
this.self_rank_item.update_data(e);
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
a([ _(cc.ScrollView) ], t.prototype, "scroll_view", void 0);
a([ _(cc.Node) ], t.prototype, "container", void 0);
a([ _(cc.Node) ], t.prototype, "self_rank_node", void 0);
a([ _(cc.Sprite) ], t.prototype, "rank_view_background", void 0);
a([ _(cc.Prefab) ], t.prototype, "rank_item_prefab", void 0);
a([ _(cc.Prefab) ], t.prototype, "rank_header_prefab", void 0);
return a([ l ], t);
}(i.default);
o.default = p;
cc._RF.pop();
}, {
"../../../Common/BaseUI": "BaseUI",
"../RankHeaderView": "RankHeaderView",
"../RankViewItem": "RankViewItem"
} ],
OpenRedEnvelopeInterface: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "1c77cKybOlGap4T5ZONOGY4", "OpenRedEnvelopeInterface");
Object.defineProperty(o, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
OpenRedEnvelopeViewController: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e351bDbv3ZOC6fHhPoyrmdi", "OpenRedEnvelopeViewController");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = e("../../Common/CommonEnum"), i = e("../../Common/Controller"), c = e("../../Common/Loader"), u = e("../UIManager/UIManager"), s = e("./Normal/NormalOpenRedEnvelopeView"), l = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.name = "OpenRedEnvelopeViewController";
t.view = null;
return t;
}
t.open = function(e, o, n, r) {
var a = {
controller: t,
ui_config_name: "OpenRedEnvelopeView",
path: e,
param: {
target_node: o,
x_offset: n,
y_offset: r
}
};
u.default.nagivate_route(a);
};
t.prototype.init_view = function() {
var e = this;
this.view.ui_param_interface.router.path == a.OpenRedEnvelopePath.normal ? c.default.load_prefab("UI/OpenRedEnvelope/Normal/NormalOpenRedEnvelopeView", function(t) {
console.log("成功加载 OpenRedEnvelopePath");
var o = cc.instantiate(t);
o.parent = e.view.node;
var n = o.getComponent(s.default), r = e.view.ui_param_interface.router.param;
r && r.target_node && n.set_position_by_node(r.target_node, r.x_offset, r.y_offset);
}) : console.log("当前");
};
return t;
}(i.default);
o.default = l;
cc._RF.pop();
}, {
"../../Common/CommonEnum": "CommonEnum",
"../../Common/Controller": "Controller",
"../../Common/Loader": "Loader",
"../UIManager/UIManager": "UIManager",
"./Normal/NormalOpenRedEnvelopeView": "NormalOpenRedEnvelopeView"
} ],
OpenRedEnvelopeViewItem: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "5d682kZU3xDKqHB9FqGzG0L", "OpenRedEnvelopeViewItem");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../Common/BaseNode"), c = cc._decorator, u = c.ccclass, s = c.property, l = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.label = null;
t.text = "hello";
return t;
}
t.prototype.start = function() {};
a([ s(cc.Label) ], t.prototype, "label", void 0);
a([ s ], t.prototype, "text", void 0);
return a([ u ], t);
}(i.default);
o.default = l;
cc._RF.pop();
}, {
"../../Common/BaseNode": "BaseNode"
} ],
OpenRedEnvelopeView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "aa77duPG1lM1YyQnbAViV2m", "OpenRedEnvelopeView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../Common/BaseUI"), c = e("../../Common/CommonEnum"), u = e("../../Common/TouchButton"), s = cc._decorator, l = s.ccclass, _ = s.property, p = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.controller = null;
t.red_pack_node = null;
return t;
}
t.prototype.onLoad = function() {
var t = this;
e.prototype.onLoad.call(this);
this.controller.init_view();
this.node.addComponent(u.default).register_touch(function() {
t.on_close_call(t.node.name);
}, null, null, c.TouchButtonEffectType.none);
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
a([ _(cc.Node) ], t.prototype, "red_pack_node", void 0);
return a([ l ], t);
}(i.default);
o.default = p;
cc._RF.pop();
}, {
"../../Common/BaseUI": "BaseUI",
"../../Common/CommonEnum": "CommonEnum",
"../../Common/TouchButton": "TouchButton"
} ],
Random: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "8fcd5QSucpFQa6JWuWYywMw", "Random");
var n = function() {
function e(e) {
this.seed = new Date().getTime();
this.seed = e;
this.seed || 0 == this.seed || (this.seed = new Date().getTime());
}
Object.defineProperty(e.prototype, "value", {
get: function() {
return this.range(0, 1);
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "insideUnitCircle", {
get: function() {
var e = this.range(0, 360), t = this.range(1, 0);
return {
x: t * Math.cos(e * Math.PI / 180),
y: t * Math.sin(e * Math.PI / 180)
};
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "onUnitCircle", {
get: function() {
var e = this.range(0, 360);
return {
x: Math.cos(e * Math.PI / 180),
y: Math.sin(e * Math.PI / 180)
};
},
enumerable: !1,
configurable: !0
});
e.prototype.range = function(e, t) {
this.seed || 0 == this.seed || (this.seed = new Date().getTime());
t = t || 1;
e = e || 0;
this.seed = (9301 * this.seed + 49297) % 233280;
return e + this.seed / 233280 * (t - e);
};
Object.defineProperty(e, "value", {
get: function() {
return this.range(1, 0);
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e, "insideUnitCircle", {
get: function() {
var e = this.range(0, 360), t = this.range();
return {
x: t * Math.cos(e * Math.PI / 180),
y: t * Math.sin(e * Math.PI / 180)
};
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e, "onUnitCircle", {
get: function() {
var e = this.range(0, 360);
return {
x: Math.cos(e * Math.PI / 180),
y: Math.sin(e * Math.PI / 180)
};
},
enumerable: !1,
configurable: !0
});
e.range = function(t, o) {
void 0 === t && (t = 0);
void 0 === o && (o = 1);
e.seed || 0 == e.seed || (e.seed = new Date().getTime());
o = o || 1;
t = t || 0;
e.seed = (9301 * e.seed + 49297) % 233280;
return t + e.seed / 233280 * (o - t);
};
e.rangeInt = function(t, o) {
var n = o - t, r = e.range(0, 1);
return t + Math.round(r * n);
};
e.rangeIntByArr = function(t) {
return t.length < 2 ? 0 : e.rangeInt(t[0], t[1]);
};
e.rangeByArr = function(t) {
return t.length < 2 ? 0 : e.range(t[0], t[1]);
};
e.rangeFromArr = function(t) {
return t[e.rangeInt(0, t.length - 1)];
};
e.getValueByWeight = function(t, o) {
for (var n = e.range(), r = 0, a = 0; a < t.length; a++) {
var i = o[a] + r;
if (n <= i) return t[a];
r = i;
}
return null;
};
e.seed = new Date().getTime();
return e;
}();
o.Random = n;
cc._RF.pop();
}, {} ],
RankHeaderView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "5f96bAQKcJJYJ8RymW6sdzU", "RankHeaderView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../Common/BaseNode"), c = e("./HeaderItem"), u = cc._decorator, s = u.ccclass, l = u.property, _ = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.container = null;
t.header_item_prefab = null;
t.header_item_interfaces = [];
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.init_header_view = function(e) {
this.header_item_interfaces = e;
for (var t = 0, o = this.header_item_interfaces; t < o.length; t++) {
var n = o[t], r = cc.instantiate(this.header_item_prefab);
r.getComponent(c.default).flush(n);
r.parent = this.container;
}
};
t.prototype.start = function() {};
a([ l(cc.Node) ], t.prototype, "container", void 0);
a([ l(cc.Prefab) ], t.prototype, "header_item_prefab", void 0);
return a([ s ], t);
}(i.default);
o.default = _;
cc._RF.pop();
}, {
"../../Common/BaseNode": "BaseNode",
"./HeaderItem": "HeaderItem"
} ],
RankInterface: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "7e346i1ootD4Zh805wR/9zz", "RankInterface");
Object.defineProperty(o, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
RankTypeNode: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "1f940AnueJC3bUgsVAGVFv+", "RankTypeNode");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator, c = i.ccclass, u = i.property, s = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.rank_type_node_value_label = null;
return t;
}
t.prototype.start = function() {};
t.prototype.set_value = function(e) {
this.rank_type_node_value_label.string = e;
};
t.prototype.set_width = function(e) {
this.node.width = e;
};
a([ u(cc.Label) ], t.prototype, "rank_type_node_value_label", void 0);
return a([ c ], t);
}(cc.Component);
o.default = s;
cc._RF.pop();
}, {} ],
RankViewController: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "58d49T834BA54ELwwxnboG3", "RankViewController");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../Common/CommonEnum"), r = e("../../Common/Loader"), a = e("../../GameServerData/CommonServerData"), i = e("../UIManager/UIManager"), c = e("./Normal/NormalRankView"), u = function() {
function e() {
this.name = "RankViewController";
this.view = null;
this.normal_rank_view = null;
}
e.open = function(t) {
var o = {
controller: e,
ui_config_name: "RankView",
path: t
};
i.default.nagivate_route(o);
};
e.prototype.init_view = function() {
var e = this;
this.view.ui_param_interface.router.path == n.RankRouterPath.normal ? r.default.load_prefab("UI/Rank/Normal/NormalRankView", function(t) {
var o = cc.instantiate(t);
o.parent = e.view.node;
e.normal_rank_view = o.getComponent(c.default);
e.update_rank_view();
}) : console.log("当前");
};
e.prototype.update_rank_view = function() {
var e = this;
a.default.get_rank(function(t) {
console.log("排行榜数据 =       ", t);
if (e.view.ui_param_interface.router.path == n.RankRouterPath.normal && e.normal_rank_view) {
e.normal_rank_view.add_player_rank_view(t.myItem);
e.normal_rank_view.init_rank_list(t);
for (var o = [], r = 0, a = t.headers.split(" "); r < a.length; r++) {
var i = a[r];
i && o.push({
title: i
});
}
e.normal_rank_view.init_header_view(o);
}
});
};
return e;
}();
o.default = u;
cc._RF.pop();
}, {
"../../Common/CommonEnum": "CommonEnum",
"../../Common/Loader": "Loader",
"../../GameServerData/CommonServerData": "CommonServerData",
"../UIManager/UIManager": "UIManager",
"./Normal/NormalRankView": "NormalRankView"
} ],
RankViewInterface: [ function(e, t) {
"use strict";
cc._RF.push(t, "03067nEkxxJNaRP+CAA+tLE", "RankViewInterface");
cc._RF.pop();
}, {} ],
RankViewItem: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "aaca2GyKlZHu4CbgO7mvCvF", "RankViewItem");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../Common/BaseNode"), c = e("../../Common/Loader"), u = e("./RankTypeNode"), s = cc._decorator, l = s.ccclass, _ = s.property, p = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.rank_item_bottom = null;
t.rank_icon_sprite = null;
t.rank_player_avator_sprite = null;
t.rank_player_name_label = null;
t.rank_label = null;
t.rank_type_item_container = null;
t.rank_type_node = null;
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
t.prototype.update_data = function(e) {
var t = this;
if (e.rank > 1 && e.rank <= 3) {
this.rank_icon_sprite.node.active = !0;
this.rank_label.node.active = !1;
c.default.load_texture("./UI/Rank/texture/Normal/rank_" + e.rank, function(e) {
t.rank_icon_sprite.spriteFrame = new cc.SpriteFrame(e);
});
} else {
this.rank_icon_sprite.node.active = !1;
this.rank_label.node.active = !0;
this.rank_label.string = "" + (0 == e.rank ? "未上榜" : e.rank);
}
e.key.photoUrl ? c.default.request_remote_image(e.key.photoUrl, function(e) {
t.rank_player_avator_sprite.spriteFrame = e;
}) : this.rank_player_avator_sprite.node.active = !1;
this.rank_player_name_label.string = "" + e.key.name;
var o = cc.instantiate(this.rank_type_node), n = o.getComponent(u.default);
n.set_value("" + e.reward);
n.set_width(160);
o.parent = this.rank_type_item_container;
var r = cc.instantiate(this.rank_type_node), a = r.getComponent(u.default);
a.set_value("" + e.value);
r.parent = this.rank_type_item_container;
a.set_width(80);
};
a([ _(cc.Sprite) ], t.prototype, "rank_item_bottom", void 0);
a([ _(cc.Sprite) ], t.prototype, "rank_icon_sprite", void 0);
a([ _(cc.Sprite) ], t.prototype, "rank_player_avator_sprite", void 0);
a([ _(cc.Label) ], t.prototype, "rank_player_name_label", void 0);
a([ _(cc.Label) ], t.prototype, "rank_label", void 0);
a([ _(cc.Node) ], t.prototype, "rank_type_item_container", void 0);
a([ _(cc.Prefab) ], t.prototype, "rank_type_node", void 0);
return a([ l ], t);
}(i.default);
o.default = p;
cc._RF.pop();
}, {
"../../Common/BaseNode": "BaseNode",
"../../Common/Loader": "Loader",
"./RankTypeNode": "RankTypeNode"
} ],
RankView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "d20b3ZaalBMrIg8T/NMM+QD", "RankView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../Common/BaseUI"), c = cc._decorator, u = c.ccclass, s = (c.property, 
function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.controller = null;
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.controller.init_view();
};
t.prototype.onAddFinished = function() {
e.prototype.onAddFinished.call(this);
this.controller.view = this;
this.controller.update_rank_view();
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
return a([ u ], t);
}(i.default));
o.default = s;
cc._RF.pop();
}, {
"../../Common/BaseUI": "BaseUI"
} ],
SceneInterface: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "5f6d06Jg5lDgpfZ5PS8gNZQ", "SceneInterface");
Object.defineProperty(o, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
SdkEnum: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "1907b+mlZxOModvHYoQbyte", "SdkEnum");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.NativeEnum = o.ShareFuncEnum = o.AdFuncEnum = void 0;
var n, r, a;
(function(e) {
e.playVideoAd = "playVideoAd";
e.playZhiKeAd = "playZhiKeAd";
e.playStaticAd = "playStaticAd";
e.gameMainLayerIsShow = "gameMainLayerIsShow";
})(n || (n = {}));
o.AdFuncEnum = n;
(function(e) {
e.playShareGame = "playShareGame";
})(r || (r = {}));
o.ShareFuncEnum = r;
(function(e) {
e.NEH5CallNative = "NEH5CallNative";
e.NENativeCallH5 = "NENativeCallH5";
})(a || (a = {}));
o.NativeEnum = a;
cc._RF.pop();
}, {} ],
SdkInterface: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "6606ea1U7tNV4GApt7hflUd", "SdkInterface");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.ShareType = void 0;
(function(e) {
e[e.Friend = 0] = "Friend";
e[e.Timeline = 1] = "Timeline";
})(o.ShareType || (o.ShareType = {}));
cc._RF.pop();
}, {} ],
SdkModal: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "da672zzD2RKOYP+QMELY0Oe", "SdkModal");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.SdkModule = void 0;
var n;
(function(e) {
e.platform = function() {
return t() ? "android" : "ios";
};
function t() {
return cc.sys.os === cc.sys.OS_ANDROID;
}
e.isAndroid = t;
e.isIos = function() {
return cc.sys.os === cc.sys.OS_IOS;
};
e.isPC = function() {
return cc.sys.os === cc.sys.OS_OSX || cc.sys.os === cc.sys.OS_WINDOWS;
};
e.game_init = function() {
e.isAndroid() && jsb.reflection.callStaticMethod("com/android_sdk_module", "game_init", "");
};
e.wechat_login = function() {};
e.login_success = function(e) {
console.log("微信登陆成功的数据  =  ", e);
};
e.copy_message = function() {};
e.share = function() {};
e.invite_friend_share = function() {};
e.show_interstitial_ad = function() {};
e.close_interstitial_ad = function() {};
e.show_rewarded_ad = function() {};
})(n = o.SdkModule || (o.SdkModule = {}));
window.SdkModule = n;
cc._RF.pop();
}, {} ],
ServerData: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "d893aHlJw5Ga66C33gz3zVB", "ServerData");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../Boot"), r = e("../GameConfig"), a = e("../NetWork/HttpClient"), i = e("../NetWork/Md5"), c = function() {
function e() {
this._headers = {};
this._sdk_config = {};
}
e.get_instance = function() {
this.game_server_data_instance || (this.game_server_data_instance = new e());
return this.game_server_data_instance;
};
Object.defineProperty(e.prototype, "headers", {
get: function() {
return this._headers;
},
set: function(e) {
this._headers = e;
},
enumerable: !1,
configurable: !0
});
e.prototype.init = function() {
this.init_headers();
this.init_sdk_config();
};
e.prototype.get_header_key_of_value = function(e) {
var t = null;
n.gamebase.location && n.gamebase.location.search && (t = window.location.search);
if (t) {
for (var o = t.split("&"), a = 0; a < o.length; a++) {
var i = o[a];
if (i.indexOf(e) >= 0) return i.split("=")[1];
}
return "default";
}
return r.default[e];
};
e.prototype.init_headers = function() {
this._headers.appId = this.get_header_key_of_value("appId");
this._headers.pkgId = this.get_header_key_of_value("pkgId");
this._headers.deviceId = this.get_header_key_of_value("deviceId");
this._headers.brand = this.get_header_key_of_value("brand");
this._headers.gps = this.get_header_key_of_value("gps");
this._headers.bs = this.get_header_key_of_value("bs");
this._headers.appVersion = this.get_header_key_of_value("appVersion");
this._headers.os = this.get_header_key_of_value("os");
this._headers.channel = this.get_header_key_of_value("channel");
this._headers.romVersion = this.get_header_key_of_value("romVersion");
this._headers.osVersion = this.get_header_key_of_value("osVersion");
this._headers.oaid = this.get_header_key_of_value("oaid");
this._headers.accessKey = this.get_header_key_of_value("accessKey");
this._headers.apiType = this.get_header_key_of_value("apiType");
r.default.gameExamine = "0" == this.get_header_key_of_value("isPass");
r.default.apiType = parseInt(this._headers.apiType);
console.log("=新=gameExamine=", r.default.gameExamine);
console.log("=新=_headers=", JSON.stringify(this._headers));
};
e.prototype.init_sdk_config = function() {
this._sdk_config = {
accessKey: this.headers.accessKey,
userId: this.headers.accessKey ? this.headers.accessKey.split("_")[1] : "",
appVersion: this.headers.appVersion,
appName: r.default.productName,
gps: this.headers.gps,
env: r.default.branch,
deviceId: this.headers.deviceId,
bundle: r.default.packageName,
channelId: this.headers.channel,
brand: this.headers.brand,
romVersion: this.headers.romVersion,
osVersion: this.headers.osVersion,
appId: this.headers.appId,
posId: r.default.posId,
pkgId: this.headers.pkgId,
remoteName: r.default.remoteName
};
};
e.prototype.post_data = function(e, t, o) {
new a.HttpClient(r.default.serverUrl, 5e3).post(e, 5e3, JSON.stringify(t), "application/json", this.headers).then(function(e) {
console.log("post 请求得到的游戏的数据 " + e);
var t = JSON.parse(e);
o && o(t.result);
});
};
e.prototype.get_data = function(e, t) {
var o = new a.HttpClient(r.default.serverUrl, 5e3);
console.log("当前get设置的请求地址", this.headers);
o.get(e, 5e3, this.headers).then(function(e) {
console.log("get 请求得到的游戏的数据 " + e);
var o = JSON.parse(e);
t && t(o.result);
});
};
e.prototype.login = function() {};
e.prototype.initBusinessSdk = function(e) {
var t = n.gamebase.BusinessSDK;
console.log("=直客广告数据==", typeof t);
"undefined" != typeof t && t.initWebSDK(this._sdk_config, function() {
t.task.getTaskList(0, function(t) {
console.log("=直客广告数据=getTaskList=", JSON.stringify(t));
var o = [];
if (!((o = t.result && t.result.read60Cache && t.result.read60Cache.adCaches ? t.result.read60Cache.adCaches : []).length <= 0)) {
for (var n in o) o[n].creditName = t.result.read60Cache.creditName;
e && e(o);
}
}, function() {});
});
};
e.prototype.requestServerDataRegister = function() {
var e = "/bp/user/register?appId=" + r.default.appId + "&pkgId=" + r.default.pkgId + "&oaid=";
this.get_data(e, function(e) {
console.log("----用户注册--", e);
});
};
e.prototype.requestServerDataAchievement = function() {
this.get_data("/lovexiao/achievement/list", function(e) {
console.log("==请求服务端数据=成就===", JSON.stringify(e));
}.bind(this));
};
e.prototype.sendOutServerDataLevel = function(e, t, o) {
var n = new Date().getTime(), a = e + "," + t + "," + n + "," + r.default.secretData, c = {
correct: e,
level: t,
timeMillis: n,
sign: i.hexMD5(a)
};
this.post_data("/g3-chengyu/api/level", c, o);
};
e.prototype.requestServerDataDailyWelfare = function(e) {
var t = "/" + r.default.api_root_path + "/api/task";
this.get_data(t, e);
};
e.prototype.sendOutSeverDataDailyWelfareComplete = function(e, t, o) {
this.post_data("/g3-chengyu/api/task", {
taskId: e,
status: t
}, o);
};
e.prototype.sendOutSeverDataZhikeResult = function(e, t, o) {
var n = "/lovexiao/daily_task/watched?id=" + e + "&type=" + t;
this.post_data(n, "", o);
};
e.prototype.sendOutSeverDataCountDownRed = function(e) {
this.post_data("/g3-chengyu/api/money/chest", "", e);
};
e.prototype.requestServerDataSignIn = function(e) {
this.get_data("/g3-odyssey/api/checkIn", e);
};
e.prototype.sendOutSeverDataUseProp = function() {
this.get_data("/lovexiao/props/use_props", function(e) {
console.log("==向服务端发送数据=使用道具==", JSON.stringify(e));
});
};
e.prototype.sendOutSeverDataGameRed = function(e, t) {
var o = {
money: e
};
this.post_data("/g3-chengyu/api/money", o, t);
};
e.prototype.requestSeverDataDrawCash = function(e) {
this.get_data("/g3-odyssey/api/withdraw", e);
};
e.prototype.sendOutSeverDataDrawCash = function(e, t) {
this.post_data("/g3-odyssey/api/withdraw", e, t);
};
e.prototype.requestSeverDataMainUser = function(e) {
this.get_data("/g3-chengyu/api/home", e);
};
e.prototype.requestSeverDataInviteFriend = function(e) {
this.get_data("/g3-chengyu/api/share", e);
};
e.prototype.sendOutSeverDataInviteFriendReward = function(e, t) {
var o = {
num: e
};
this.post_data("/g3-chengyu/api/share", o, t);
};
e.prototype.sendOutSeverDataInviteCode = function(e, t) {
var o = {
code: e
};
this.post_data("/g3-chengyu/api/share/add", o, t);
};
e.prototype.requestSeverDataNewEnergy = function(e) {
this.get_data("/g3-triple/api/feed/energy", e);
};
e.prototype.requestSeverDataLucklyBox = function(e) {
this.post_data("/g3-chengyu/api/money/luckily", null, e);
};
e.prototype.requestSeverDataFragmentRed = function(e) {
this.post_data("/g3-chengyu/api/money/fragment", null, e);
};
e.prototype.requestSeverDataTurnTable = function(e) {
this.get_data("/g3-odyssey/api/turntable", e);
};
e.prototype.requestSeverDataIndiana = function(e) {
this.get_data("/g3-odyssey/api/crowdfunding", e);
};
e.prototype.requestSeverDataIndianaPrize = function(e, t) {
var o = "/g3-odyssey/api/crowdfunding/" + t;
this.get_data(o, e);
};
e.prototype.requestSeverDataBetting = function(e, t, o) {
var n = "/g3-odyssey/api/crowdfunding/" + t, r = {
first: o
};
this.post_data(n, r, e);
};
e.prototype.requestSeverDataPrizeRoster = function(e, t) {
var o = "/g3-odyssey/api/crowdfunding/" + t + "/winners";
this.get_data(o, e);
};
e.prototype.requestSeverDrawCashTurnTableStatus = function(e) {
this.get_data("/g3-chengyu/api/turntable/status", e);
};
e.prototype.requestSeverDrawCashTurnTableData = function(e) {
this.get_data("/g3-chengyu/api/turntable", e);
};
e.prototype.requestSeverReceiveReward = function(e) {
this.post_data("/g3-chengyu/api/turntable", null, e);
};
e.prototype.requestSeverTurnTableNewMoney = function(e, t) {
this.post_data("/g3-odyssey/api/user/money", t, e);
};
e.prototype.requestSingleZhiKeAdInfo = function(e) {
var t = "/" + r.default.api_root_path + "/api/task/one";
this.get_data(t, e);
};
e.prototype.sendOutSeverDataZhiKe = function(e, t, o) {
var n = "/" + r.default.api_root_path + "/api/task";
this.post_data(n, {
taskId: e,
status: t
}, o);
};
e.prototype.requestServerDataSignInMoney = function(e) {
var t = "/" + r.default.api_root_path + "/api/v2/checkIn";
this.get_data(t, e);
};
e.prototype.sendOutServerDataSignInNum = function(e) {
var t = "/" + r.default.api_root_path + "/api/checkIn/process";
this.post_data(t, "", e);
};
e.prototype.requestServerDataSignInNum = function(e) {
var t = "/" + r.default.api_root_path + "/api/checkIn/status";
this.get_data(t, e);
};
e.prototype.sendOutServerDataSignIn = function(e, t) {
var o = "/" + r.default.api_root_path + "/api/checkIn";
this.post_data(o, {
day: e
}, t);
};
e.game_server_data_instance = null;
return e;
}();
o.default = c;
cc._RF.pop();
}, {
"../Boot": "Boot",
"../GameConfig": "GameConfig",
"../NetWork/HttpClient": "HttpClient",
"../NetWork/Md5": "Md5"
} ],
ShareOrVideoInterface: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "6f3b1qxTiVAQYmToW8qmF6J", "ShareOrVideoInterface");
Object.defineProperty(o, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
ShareVideoButton: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "fa14cGv3ClML4L208ZLptxV", "ShareVideoButton");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../Sdk/Share"), c = e("./BaseNode"), u = e("./TouchButton"), s = cc._decorator, l = s.ccclass, _ = (s.property, 
function(e) {
r(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.node.addComponent(u.default).register_touch(this.share_callback.bind(this));
};
t.prototype.share_callback = function() {
i.default.share_game();
};
t.prototype.start = function() {
e.prototype.start.call(this);
};
return a([ l ], t);
}(c.default));
o.default = _;
cc._RF.pop();
}, {
"../Sdk/Share": "Share",
"./BaseNode": "BaseNode",
"./TouchButton": "TouchButton"
} ],
Share: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "4b1fbA390RLfbN6JeVdXhpf", "Share");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../Boot"), r = e("./Native"), a = function() {
function e() {}
e.share_game = function() {
n.gamebase.WebViewJavascriptBridge ? r.default.call_native({
func: "playShareGame",
params: {}
}, function() {
console.log("分享了游戏");
}) : console.log("当前平台不支持分享游戏");
};
return e;
}();
o.default = a;
cc._RF.pop();
}, {
"../Boot": "Boot",
"./Native": "Native"
} ],
SignInData: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e8e79bBqURM/Iwh2wzl8/hA", "SignInData");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = function(e) {
r(t, e);
function t() {
var t = e.call(this) || this;
t.base_name = "SignInData";
t.apply_auto_update();
return t;
}
t._name = "SignInData";
return t;
}(e("./BaseRecord").default);
o.default = a;
cc._RF.pop();
}, {
"./BaseRecord": "BaseRecord"
} ],
SignInInterface: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "08e1dpxybVO/YfgkmgC26qP", "SignInInterface");
Object.defineProperty(o, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
SignInView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "cdd71PpZtlFYb7bqUgLE8yR", "SignInView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../Common/BaseUI"), c = cc._decorator, u = c.ccclass, s = c.property, l = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.label = null;
t.text = "hello";
return t;
}
t.prototype.start = function() {};
a([ s(cc.Label) ], t.prototype, "label", void 0);
a([ s ], t.prototype, "text", void 0);
return a([ u ], t);
}(i.default);
o.default = l;
cc._RF.pop();
}, {
"../../Common/BaseUI": "BaseUI"
} ],
SingleRecordData: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "987d4aZF75GqpbCKqa9QlXW", "SingleRecordData");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = e("./BaseRecord"), i = e("./GameLocalData"), c = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.base_name = "SingleRecord";
t.need_convert_class = [];
return t;
}
t.prototype.decode_json = function(t) {
e.prototype.decode_json.call(this, t);
for (var o in this) for (var n = 0; n < this.need_convert_class.length; n++) {
var r = this.need_convert_class[n].split("#");
if (r[0] == o && r.length >= 2) if ("single" == r[1]) {
var a = this[o], c = new i.default.all_convert_single_data[a.store_name](a);
for (var u in a) c[u] = a[u];
c.decode_json(a);
this[o] = c;
} else if ("array" == r[1]) {
a = this[o];
for (var s = [], l = 0; l < a.length; l++) {
var _ = a[l];
c = new i.default.all_convert_single_data[_.store_name](_);
for (var u in _) c[u] = _[u];
c.decode_json(_);
s.push(c);
}
this[o] = s;
} else if ("dic" == r[1]) {
a = this[o];
var p = Object.keys(a);
for (s = {}, l = 0; l < p.length; l++) {
var d = p[l];
"number" == r[2] && (d = parseInt(d));
_ = a[d], c = new i.default.all_convert_single_data[_.store_name](_);
for (var u in _) c[u] = _[u];
c.decode_json(_);
s[d] = c;
}
this[o] = s;
}
}
};
t._name = "SingleRecord";
return t;
}(a.default);
o.default = c;
cc._RF.pop();
}, {
"./BaseRecord": "BaseRecord",
"./GameLocalData": "GameLocalData"
} ],
Test: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "69266UhhmBKErPdm15Z68Jh", "Test");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../GameDataConfig/GameDataConfig"), r = e("../UI/CashOut/CashOutController"), a = e("../UI/ClickOn/ClickOnController"), i = e("../UI/InviteFriend/InviteFriendViewController"), c = e("../UI/NewPlayerGuide/NewPlayerGuideEnum"), u = e("../UI/NewPlayerGuide/NewPlayerGuideView"), s = e("../UI/OpenRedEnvelope/OpenRedEnvelopeViewController"), l = e("../UI/Rank/RankViewController"), _ = e("../UI/UIManager/UIConfig"), p = e("../UI/UIManager/UIManager"), d = e("./Audio"), f = e("./CommonEnum"), h = function() {
function e() {}
e.audio = function() {
var e = n.default.get_config_by_id("AudioConfig", 1);
new d.default().play(e);
};
e.modal = function() {
var e = {
cancel: !0,
confirm: !0,
cancel_text: "取消",
confirm_text: "确定",
cancel_callback: function() {
console.log("取消调用");
},
ok_callback: function() {
console.log("确定调用");
},
message: "这是一个测试提示框"
}, t = {
ui_config_path: _.default.Modal,
ui_config_name: "Modal",
param: e
};
p.default.show_ui(t);
};
e.cash_out = function() {
r.default.open(f.CashOutRouterPath.balance);
};
e.cash_out_order_view = function() {
var e = {
ui_config_path: _.default.CashOutOrderView,
ui_config_name: "CashOutOrderView",
param: {}
};
p.default.show_ui(e);
};
e.click_on_view = function() {
a.default.open(f.ClickOnRouterPath.normal);
};
e.rank_view = function() {
l.default.open(f.RankRouterPath.normal);
};
e.invite_view = function() {
i.default.open(f.InviteFriendPath.normal);
};
e.open_red_envelope_view = function() {
s.default.open(f.OpenRedEnvelopePath.normal);
};
e.open_red_envelope_success_view = function() {
var e = {
ui_config_path: _.default.NormalOpenRedEnvelopeSuccessView,
ui_config_name: "NormalOpenRedEnvelopeSuccessView",
param: {
money: 10.5
}
};
p.default.show_ui(e);
};
e.guide_view = function(e) {
u.default.show_guide(1, c.GuideType.normal, e, function() {
console.log();
}, {}, {}, {}, {});
};
return e;
}();
o.default = h;
cc._RF.pop();
}, {
"../GameDataConfig/GameDataConfig": "GameDataConfig",
"../UI/CashOut/CashOutController": "CashOutController",
"../UI/ClickOn/ClickOnController": "ClickOnController",
"../UI/InviteFriend/InviteFriendViewController": "InviteFriendViewController",
"../UI/NewPlayerGuide/NewPlayerGuideEnum": "NewPlayerGuideEnum",
"../UI/NewPlayerGuide/NewPlayerGuideView": "NewPlayerGuideView",
"../UI/OpenRedEnvelope/OpenRedEnvelopeViewController": "OpenRedEnvelopeViewController",
"../UI/Rank/RankViewController": "RankViewController",
"../UI/UIManager/UIConfig": "UIConfig",
"../UI/UIManager/UIManager": "UIManager",
"./Audio": "Audio",
"./CommonEnum": "CommonEnum"
} ],
Time: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "0fcb5ESw/NNI5tPsrRhHmb3", "Time");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.seconds_to_hms = function(e, t) {
void 0 === t && (t = !1);
var o = Math.floor(e % 60), n = Math.floor(e / 60 % 60), r = Math.floor(e / 3600), a = o < 10 ? "0" + o : o, i = n < 10 ? "0" + n : n;
return t && 0 === r ? i + ":" + a : (r < 10 ? "0" + r : r) + ":" + i + ":" + a;
};
e.get_time = function() {
return new Date().getTime();
};
e.get_second_time = function() {
var e = this.get_time() / 1e3;
return Math.floor(e);
};
e.convert_date_to_string = function(e) {
var t = e.split(" "), o = t[0].split("-"), n = t[1].split(":"), r = new Date();
r.setFullYear(o[0]);
r.setMonth(o[1] - 1);
r.setDate(o[2]);
r.setHours(n[0]);
r.setMinutes(n[1]);
r.setSeconds(n[2]);
return r.toISOString();
};
e.is_new_day = function(e, t) {
if (!e || !t) throw new Error("have one date is wrong");
return t.getFullYear() !== e.getFullYear() || t.getMonth() !== e.getMonth() || t.getDate() !== e.getDate();
};
e.days_between = function(e, t) {
var o = e.getMonth() + 1, n = e.getDate(), r = e.getFullYear(), a = t.getMonth() + 1, i = t.getDate(), c = t.getFullYear(), u = (Date.parse(o + "/" + n + "/" + r) - Date.parse(a + "/" + i + "/" + c)) / 864e5;
return Math.abs(u);
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
Toast: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "0af43w5k1VPRL8N18NyYMJP", "Toast");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("./BaseUI"), c = cc._decorator, u = c.ccclass, s = c.property, l = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.toast_interface = null;
t.text_label = null;
t.bottom_sprite = null;
return t;
}
t.prototype.start = function() {};
t.prototype.show = function(t) {
var o = this;
e.prototype.show.call(this, t);
this.set_toast_interface(t.param);
this.flush_view();
this.node.x = cc.winSize.width / 2;
this.node.y = cc.winSize.height / 2;
var n = this.toast_interface.duration ? 1e3 * this.toast_interface.duration : 2e3;
setTimeout(function() {
o.on_close_call();
}, n);
};
t.prototype.set_toast_interface = function(e) {
this.toast_interface = e;
};
t.prototype.flush_view = function() {
this.flush_text_color();
this.flush_bottom_sprite_frame();
this.text_label.string = this.toast_interface.text ? this.toast_interface.text : "请填写提示信息";
};
t.prototype.flush_bottom_sprite_frame = function() {
this.toast_interface.bottom_sprite_frame && (this.bottom_sprite.spriteFrame = this.toast_interface.bottom_sprite_frame);
};
t.prototype.flush_text_color = function() {
this.toast_interface.text_color && (this.text_label.node.color = cc.Color.BLACK.fromHEX(this.toast_interface.text_color));
};
a([ s(cc.Label) ], t.prototype, "text_label", void 0);
a([ s(cc.Sprite) ], t.prototype, "bottom_sprite", void 0);
return a([ u ], t);
}(i.default);
o.default = l;
cc._RF.pop();
}, {
"./BaseUI": "BaseUI"
} ],
TouchButton: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "b27ea+53e1Cvq49MIDKJiww", "TouchButton");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../GameDataConfig/GameDataConfig"), c = e("./Audio"), u = e("./CommonEnum"), s = cc._decorator, l = s.ccclass, _ = (s.property, 
function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.touch_button_interface = null;
t.touch_effect_type = u.TouchButtonEffectType.scale;
return t;
}
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchstart", function() {
if (e.touch_effect_type == u.TouchButtonEffectType.scale) {
var t = cc.scaleTo(.1, 1.1);
t.setTag(100002);
e.node.runAction(t);
}
});
this.node.on("touchend", function() {
if (e.touch_button_interface.touch_end_call_back) {
e.touch_button_interface.touch_end_call_back();
var t = i.default.get_config_by_id("AudioConfig", e.touch_button_interface.music_id || 2);
new c.default().play(t);
}
if (e.touch_effect_type == u.TouchButtonEffectType.scale) {
var o = cc.scaleTo(.1, 1);
o.setTag(100002);
e.node.runAction(o);
}
}, this);
this.node.on("touchcancel", function() {
if (e.touch_effect_type == u.TouchButtonEffectType.scale) {
var t = cc.scaleTo(.1, 1);
t.setTag(100002);
e.node.runAction(t);
}
}, this);
};
t.prototype.onDisable = function() {
this.node.stopActionByTag(100002);
};
t.prototype.add_touch_event = function(e) {
this.touch_button_interface = e;
};
t.prototype.register_touch = function(e, t, o, n) {
var r = {
touch_end_call_back: e,
music_id: t,
type: o
};
this.add_touch_event(r);
n && (this.touch_effect_type = n);
};
t.prototype.start = function() {};
return a([ l ], t);
}(cc.Component));
o.default = _;
cc._RF.pop();
}, {
"../GameDataConfig/GameDataConfig": "GameDataConfig",
"./Audio": "Audio",
"./CommonEnum": "CommonEnum"
} ],
TurnTableController: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "6385avuJttE3JKMPGEQVgS4", "TurnTableController");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {
this.name = "TurnTableController";
this.view = null;
this.turn_table_model = null;
}
e.prototype.turn_table = function() {};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
TurnTableData: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "83f9fhwGKhCsaij+WtiLzcG", "TurnTableData");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
});
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = function(e) {
r(t, e);
function t() {
var t = e.call(this) || this;
t.base_name = "TurnTableData";
t.apply_auto_update();
return t;
}
t._name = "TurnTableData";
return t;
}(e("./BaseRecord").default);
o.default = a;
cc._RF.pop();
}, {
"./BaseRecord": "BaseRecord"
} ],
TurnTableInterface: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "ccaf2irKIFK/LGoTBeviQYf", "TurnTableInterface");
Object.defineProperty(o, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
TurnTableView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "21f24pK1H1OdJilDGzbZlMS", "TurnTableView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../Common/BaseUI"), c = cc._decorator, u = c.ccclass, s = (c.property, 
function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.turn_table_controller = null;
return t;
}
t.prototype.flush_items = function() {};
t.prototype.turn_table_callback = function() {
this.turn_table_controller.turn_table();
};
t.prototype.start_rotate = function() {};
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {};
return a([ u ], t);
}(i.default));
o.default = s;
cc._RF.pop();
}, {
"../../Common/BaseUI": "BaseUI"
} ],
UIConfig: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2b0d9w9BolGkLYsVV3+r/hd", "UIConfig");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.default = {
NetworkLoading: "UI/Common/NetworkLoading",
Toast: "./UI/Common/Toast",
Modal: "./UI/Common/Modal",
Nagivator: "./UI/Common/Nagivator",
ActionNode: "./UI/Common/ActionNode",
UserPrivacyView: "./UI/UserProtocolAndPrivacy/UserPrivacyView",
UserProtocolView: "./UI/UserProtocolAndPrivacy/UserProtocolView",
CashOutView: "./UI/CashOut/CashOutView",
CashOutOrderView: "./UI/CashOut/CashOutOrder/CashOutOrderView",
ClickOnView: "./UI/ClickOn/ClickOnView",
RankView: "./UI/Rank/RankView",
InviteFriendView: "./UI/InviteFriend/InviteFriendView",
OpenRedEnvelopeView: "./UI/OpenRedEnvelope/OpenRedEnvelopeView",
NewPlayerGuideView: "./UI/NewPlayerGuide/NewPlayerGuideView",
NormalOpenRedEnvelopeSuccessView: "./UI/OpenRedEnvelope/Normal/NormalOpenRedEnvelopeSuccessView"
};
cc._RF.pop();
}, {} ],
UIManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f57bbcd5JxDSL7m3qDvfLDt", "UIManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../CashOut/CashOutController"), r = e("./UIConfig"), a = function() {
function e() {}
e.show_ui = function(e) {
var t = this;
console.log("显示界面的参数 = ", e);
if (!this.ui_is_loading[e.ui_config_name]) {
this.ui_is_loading[e.ui_config_name] = !0;
if (this.all_ui[e.ui_config_name]) {
this.all_ui[e.ui_config_name].show(e);
this.all_ui[e.ui_config_name].controller = e.controller;
this.ui_is_loading[e.ui_config_name] = !1;
e.complete_callback && e.complete_callback(this.all_ui[e.ui_config_name]);
this.all_ui[e.ui_config_name].onAddFinished();
} else cc.resources.load(e.ui_config_path, cc.Prefab, function(o, n) {
if (o) {
t.ui_is_loading[e.ui_config_name] = !1;
console.error("当前显示的UI: " + e.ui_config_path + " 没有加载成功");
e.complete_callback && e.complete_callback(null);
} else {
var r = cc.instantiate(n), a = r.getComponent(e.ui_config_name);
a.show(e);
a.controller = e.controller;
a.controller && (a.controller.view = a);
t.all_ui[e.ui_config_name] = a;
t.ui_is_loading[e.ui_config_name] = !1;
var i = Object.keys(t.all_ui);
cc.director.getScene().addChild(r, cc.macro.MAX_ZINDEX - 1e3 + i.length);
e.complete_callback && e.complete_callback(a);
a.onAddFinished();
}
});
}
};
e.close_ui = function(e) {
this.all_ui[e] && this.all_ui[e].hide();
};
e.nagivate_route = function(t) {
var o = new t.controller(), n = {
ui_config_path: r.default[t.ui_config_name],
ui_config_name: t.ui_config_name,
controller: o,
param: t.param,
router: t
};
e.show_ui(n);
};
e.test = function() {
var e = {
controller: n.default,
ui_config_name: "CashOutView",
param: {}
};
this.nagivate_route(e);
};
e.clear_ui = function() {
for (var e = 0, t = Object.keys(this.all_ui); e < t.length; e++) {
var o = t[e], n = this.all_ui[o].node;
cc.isValid(n) && n.destroy();
}
this.all_ui = {};
this.ui_is_loading = {};
};
e.all_ui = {};
e.ui_is_loading = {};
return e;
}();
o.default = a;
cc._RF.pop();
}, {
"../CashOut/CashOutController": "CashOutController",
"./UIConfig": "UIConfig"
} ],
UIParamInterface: [ function(e, t) {
"use strict";
cc._RF.push(t, "71a2fG4emREdrpmRYlC5T8G", "UIParamInterface");
cc._RF.pop();
}, {} ],
UserData: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "5d67cqV+yZDoLTsFlEZiW72", "UserData");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.default = function() {
this.user_wechat_interface = null;
};
cc._RF.pop();
}, {} ],
UserPrivacyView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "ac025UVyZpJX512SjQr19ow", "UserPrivacyView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../Common/BaseUI"), c = e("../../Common/TouchButton"), u = e("../../GameConfig"), s = cc._decorator, l = s.ccclass, _ = s.property, p = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.web_view = null;
t.user_privacy_interface = {
modal_bottom_image: "modal_bottom_image",
close_button_image: "close_button_image"
};
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.flush_ui_image(this.user_privacy_interface, "./UI/Common/texture/");
this.close_button_node.addComponent(c.default).register_touch(this.on_close_call.bind(this));
};
t.prototype.start = function() {
this.web_view.url = u.default.user_privacy_url;
};
a([ _(cc.WebView) ], t.prototype, "web_view", void 0);
a([ _(cc.Sprite) ], t.prototype, "close_button_image", void 0);
a([ _(cc.Sprite) ], t.prototype, "modal_bottom_image", void 0);
a([ _(cc.Node) ], t.prototype, "close_button_node", void 0);
return a([ l ], t);
}(i.default);
o.default = p;
cc._RF.pop();
}, {
"../../Common/BaseUI": "BaseUI",
"../../Common/TouchButton": "TouchButton",
"../../GameConfig": "GameConfig"
} ],
UserProtocolAndPrivacyInterface: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "475aaaqvZZNgoYFJRaeRCnv", "UserProtocolAndPrivacyInterface");
Object.defineProperty(o, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
UserProtocolView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "6b85fqZ0QJDJrgTMIwD9DrT", "UserProtocolView");
var n, r = this && this.__extends || (n = function(e, t) {
return (n = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
n(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), a = this && this.__decorate || function(e, t, o, n) {
var r, a = arguments.length, i = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, n); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i);
return a > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../Common/BaseUI"), c = e("../../Common/TouchButton"), u = e("../../GameConfig"), s = cc._decorator, l = s.ccclass, _ = s.property, p = function(e) {
r(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.web_view = null;
t.user_protocol_interface = {
modal_bottom_image: "modal_bottom_image",
close_button_image: "close_button_image"
};
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.flush_ui_image(this.user_protocol_interface, "./UI/Common/texture/");
this.close_button_node.addComponent(c.default).register_touch(this.on_close_call.bind(this));
};
t.prototype.start = function() {
e.prototype.start.call(this);
this.web_view.url = u.default.user_protocol_url;
};
a([ _(cc.WebView) ], t.prototype, "web_view", void 0);
a([ _(cc.Sprite) ], t.prototype, "close_button_image", void 0);
a([ _(cc.Sprite) ], t.prototype, "modal_bottom_image", void 0);
a([ _(cc.Node) ], t.prototype, "close_button_node", void 0);
return a([ l ], t);
}(i.default);
o.default = p;
cc._RF.pop();
}, {
"../../Common/BaseUI": "BaseUI",
"../../Common/TouchButton": "TouchButton",
"../../GameConfig": "GameConfig"
} ],
Utils: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "9b9depRQU9KuZ6IUa+nK7Ox", "Utils");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.money = function(e, t) {
return (e / 100).toFixed(t || 1);
};
e.get_ui_interface_sprite_path_and_sprite_name = function(e, t) {
for (var o = [], n = [], r = 0, a = Object.keys(e); r < a.length; r++) {
var i = a[r], c = e[i];
if (e[c]) {
var u = "" + t + c;
o.push(u);
n.push(i);
}
}
return [ n, o ];
};
e.generate_uuid = function(e, t) {
var o, n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), r = [];
if (e) for (o = 0; o < e; o++) r[o] = n[0 | Math.random() * t]; else {
var a = void 0;
r[8] = r[13] = r[18] = r[23] = "-";
r[14] = "4";
for (o = 0; o < 36; o++) if (!r[o]) {
a = 0 | 16 * Math.random();
r[o] = n[19 === o ? 3 & a | 8 : a];
}
}
return r.join("");
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
"use_v2.1-2.2.1_cc.Toggle_event": [ function(e, t) {
"use strict";
cc._RF.push(t, "fbe85uE035MVqFpykMnGw9F", "use_v2.1-2.2.1_cc.Toggle_event");
cc.Toggle && (cc.Toggle._triggerEventInScript_isChecked = !0);
cc._RF.pop();
}, {} ]
}, {}, [ "Boot", "ActionNode", "AdVideoButton", "Audio", "BaseNode", "BaseUI", "CommonEnum", "CommonInterface", "Controller", "Loader", "Modal", "Nagivator", "NetworkLoading", "Random", "ShareVideoButton", "Test", "Time", "Toast", "TouchButton", "Utils", "EventConfig", "EventManager", "GameEvent", "GameConfig", "ConfigInterface", "ConfigsName", "GameDataConfig", "BaseRecord", "GameLocalData", "GameRecord", "GuideData", "SignInData", "SingleRecordData", "TurnTableData", "GamePlay", "LinkGameBase", "CommonServerData", "ServerData", "Base64", "HttpClient", "Md5", "BaseScene", "GameScene", "LoadingScene", "LoadingSceneController", "SceneInterface", "Ad", "BI", "Native", "SdkEnum", "SdkInterface", "SdkModal", "Share", "UserData", "ShareOrVideoInterface", "BalanceCashOutViewItem", "BanlanceCashOutView", "CashOutController", "CashOutEnum", "CashOutInterface", "CashOutOrderItem", "CashOutOrderView", "CashOutSuccessView", "CashOutView", "NoBalanceCashOutViewItem", "NoBanlanceCashOutView", "ClickOnController", "ClickOnEnum", "ClickOnInterface", "ClickOnView", "ClickOnViewItem", "NormalClickOnView", "DropCoinInterface", "ExchangeView", "FragmentView", "InviteFriendInterface", "InviteFriendItem", "InviteFriendView", "InviteFriendViewController", "NormalInviteFriendView", "NewPlayerGuideEnum", "NewPlayerGuideInterface", "NewPlayerGuideView", "NormalOpenRedEnvelopeSuccessView", "NormalOpenRedEnvelopeView", "OpenRedEnvelopeInterface", "OpenRedEnvelopeView", "OpenRedEnvelopeViewController", "OpenRedEnvelopeViewItem", "HeaderItem", "NormalRankView", "RankHeaderView", "RankInterface", "RankTypeNode", "RankView", "RankViewController", "RankViewInterface", "RankViewItem", "SignInInterface", "SignInView", "TurnTableController", "TurnTableInterface", "TurnTableView", "UIConfig", "UIManager", "UIParamInterface", "UserPrivacyView", "UserProtocolAndPrivacyInterface", "UserProtocolView", "use_v2.1-2.2.1_cc.Toggle_event" ]);