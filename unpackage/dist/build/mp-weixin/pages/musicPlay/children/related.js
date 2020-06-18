(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/musicPlay/children/related"],{"64f2":function(t,e,n){"use strict";var a=n("db97"),i=n.n(a);i.a},"71e5":function(t,e,n){"use strict";n.r(e);var a=n("9c8e"),i=n("8e1f");for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);n("64f2");var c,r=n("f0c5"),s=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"79fab8e9",null,!1,a["a"],c);e["default"]=s.exports},"8e1f":function(t,e,n){"use strict";n.r(e);var a=n("9c97"),i=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,(function(){return a[t]}))}(u);e["default"]=i.a},"9c8e":function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return a}))},"9c97":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={props:{musicId:{type:Number,default:0}},data:function(){return{relatedMusic:[]}},mounted:function(){this.getRelatedMusic()},methods:{getRelatedMusic:function(){var t=this;this.$api.related(this.musicId).then((function(e){var n=e.code,a=e.songs;if(200===n){var i=[],u={};a.forEach((function(t){var e=t.id,n=t.name,a=t.album,c=a.id,r=a.name,s=a.picUrl,f=a.artists,d=f[0],o=d.name,l=d.id;u={musicId:e,musicName:n,alId:c,alName:r,alpicUrl:s,arName:o,arId:l},i.push(u)})),t.relatedMusic=i}}))},tapClick:function(t){this.$store.commit("SET-MUSICITEM",t),this.$emit("selected",t)}}};e.default=a},db97:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/musicPlay/children/related-create-component',
    {
        'pages/musicPlay/children/related-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("71e5"))
        })
    },
    [['pages/musicPlay/children/related-create-component']]
]);
