(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/musicPlay/children/comments"],{"0bbf":function(t,n,e){"use strict";var u={tips:function(){return e.e("components/tips/tips").then(e.bind(null,"499d"))}},c=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"b",(function(){return c})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return u}))},"3ecb":function(t,n,e){"use strict";e.r(n);var u=e("ee54"),c=e.n(u);for(var o in u)"default"!==o&&function(t){e.d(n,t,(function(){return u[t]}))}(o);n["default"]=c.a},c522:function(t,n,e){"use strict";var u=e("d164"),c=e.n(u);c.a},d164:function(t,n,e){},d263:function(t,n,e){"use strict";e.r(n);var u=e("0bbf"),c=e("3ecb");for(var o in c)"default"!==o&&function(t){e.d(n,t,(function(){return c[t]}))}(o);e("c522");var i,s=e("f0c5"),a=Object(s["a"])(c["default"],u["b"],u["c"],!1,null,"7a1eaf68",null,!1,u["a"],i);n["default"]=a.exports},ee54:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u={props:{musicItem:{type:Object,default:function(){return{}}},offset:{type:Number,default:1}},data:function(){return{musicId:null,comments:[]}},mounted:function(){},computed:{},methods:{getHotComments:function(t,n){var e=this;this.$api.Comments({id:t,offset:n}).then((function(t){var n;if(200===t.code){var u=t.comments,c={},o=[];u.forEach((function(t){var n=t.content,e=t.user,u=e.avatarUrl,i=e.nickname;c={content:n,avatarUrl:u,nickname:i},o.push(c)})),(n=e.comments).push.apply(n,o)}}))}},watch:{musicItem:function(t){this.comments=[];var n=t.musicId;this.musicId=n,this.getHotComments(n,this.offset)},offset:function(t){this.getHotComments(this.musicId,t)}}};n.default=u}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/musicPlay/children/comments-create-component',
    {
        'pages/musicPlay/children/comments-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("d263"))
        })
    },
    [['pages/musicPlay/children/comments-create-component']]
]);
