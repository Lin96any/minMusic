(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/search/children/hot-search"],{3362:function(t,n,a){"use strict";var e=a("378d"),c=a.n(e);c.a},"378d":function(t,n,a){},"39ef":function(t,n,a){"use strict";a.r(n);var e=a("a60b"),c=a("4bf2");for(var r in c)"default"!==r&&function(t){a.d(n,t,(function(){return c[t]}))}(r);a("3362");var i,u=a("f0c5"),f=Object(u["a"])(c["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],i);n["default"]=f.exports},"4bf2":function(t,n,a){"use strict";a.r(n);var e=a("657e"),c=a.n(e);for(var r in e)"default"!==r&&function(t){a.d(n,t,(function(){return e[t]}))}(r);n["default"]=c.a},"657e":function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{hotlist:[],colorList:["#ddf3f5","#a6dcef","#f2aaaa","#84a9ac","#709fb0","#a0c1b8","#127681","#0a97b0","#fce8d5","#2fc4b2"]}},created:function(){this.init()},methods:{init:function(){var t=this;this.$api.hotsearch().then((function(n){var a=n.code,e=n.data;if(200===a){var c=[];e.forEach((function(t){var n=t.searchWord;c.push(n)})),t.hotlist=c}}))},tapItem:function(t){this.$emit("select",t)}}};n.default=e},a60b:function(t,n,a){"use strict";var e,c=function(){var t=this,n=t.$createElement;t._self._c},r=[];a.d(n,"b",(function(){return c})),a.d(n,"c",(function(){return r})),a.d(n,"a",(function(){return e}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/search/children/hot-search-create-component',
    {
        'pages/search/children/hot-search-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("39ef"))
        })
    },
    [['pages/search/children/hot-search-create-component']]
]);
