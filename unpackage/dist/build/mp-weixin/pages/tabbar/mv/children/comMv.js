(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabbar/mv/children/comMv"],{"63aa":function(t,e,n){"use strict";n.r(e);var a=n("84e0"),c=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,(function(){return a[t]}))}(u);e["default"]=c.a},"768e":function(t,e,n){},"84e0":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{comMvList:[]}},created:function(){this.getComMv()},methods:{getComMv:function(){var t=this;this.$api.getCommentsMv().then((function(e){var n=e.code,a=e.result,c=[];200===n&&(a.forEach((function(t){var e=t.id,n=t.name,a=t.copywriter,u=t.picUrl,i=t.playCount,o={mvId:e,mvName:n,mvDesc:a,mvPicUrl:u,playCount:i};c.push(o)})),t.comMvList=c)}))},tapmv:function(e){this.$store.commit("SET-Video",e),t.navigateTo({url:"/pages/PlayVideo/PlayVideo"})}}};e.default=n}).call(this,n("543d")["default"])},a8e6:function(t,e,n){"use strict";var a=n("768e"),c=n.n(a);c.a},e3dc:function(t,e,n){"use strict";var a,c=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return a}))},efc1:function(t,e,n){"use strict";n.r(e);var a=n("e3dc"),c=n("63aa");for(var u in c)"default"!==u&&function(t){n.d(e,t,(function(){return c[t]}))}(u);n("a8e6");var i,o=n("f0c5"),r=Object(o["a"])(c["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);e["default"]=r.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/tabbar/mv/children/comMv-create-component',
    {
        'pages/tabbar/mv/children/comMv-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("efc1"))
        })
    },
    [['pages/tabbar/mv/children/comMv-create-component']]
]);
