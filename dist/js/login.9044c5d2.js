(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"1cbb":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login_area",style:"background-image: url("+e.$urlImage("/images/Screen.png")+");"},[n("div",{staticClass:"container login_ctrl shadow-lg"},[n("div",{staticClass:"row align-items-center login"},[n("div",{staticClass:"col-4 login-item"},[n("div",{staticClass:"inner_avatar"},[n("img",{attrs:{src:e.$getUrlImage("images/login.png"),alt:"#"}})])]),n("div",{staticClass:"col-8 login-item"},[n("div",{staticClass:"inner_login"},[n("h2",[e._v("Đăng nhập tài khoản")]),n("form",[n("div",{staticClass:"form-group"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],staticClass:"form-control",class:{"is-invalid":e.errors.username},attrs:{type:"text",placeholder:"Tên đăng nhập",required:""},domProps:{value:e.phone},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.login.apply(null,arguments)},input:function(t){t.target.composing||(e.phone=t.target.value)}}}),n("form-invalid",{attrs:{error:e.errors.username}})],1),n("div",{staticClass:"form-group"},[n("input-password",{class:{"is-invalid":e.errors.password},attrs:{placeholder:"Mật khẩu"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),n("form-invalid",{attrs:{error:e.errors.password}})],1),n("button",{staticClass:"btn w-50",on:{click:e.login}},[e._v("Đăng nhập")])])])])])])])},a=[],s=(n("ac1f"),n("5319"),n("5b81"),n("ed85")),o=n("0ac4"),i={data:function(){return{phone:"",password:"",errors:{}}},watch:{phone:function(e){this.phone=e.replaceAll(" ","")}},created:function(){},methods:{login:function(e){var t=this;this.errors={},e.preventDefault(),Object(o["c"])({username:this.phone,password:this.password}).then((function(e){var n=e.data;if(n.success===API_STATUS_FAILED)t.$showMessage(n.message,"error");else{var r=n.token;Object(s["k"])(t.$getEnv("VUE_APP_KEY_ACCESS_TOKEN"),r.access_token),Object(s["k"])(t.$getEnv("VUE_APP_KEY_REFRESH_TOKEN"),r.refresh_token),axios.defaults.headers.common["Authorization"]=r.access_token.token,t.$showMessage(n.message),t.actionAfterLogin()}})).catch((function(e){e.status===HTTP_CODE_UNPROCESSABLE_ENTITY&&(t.errors=e.data.data.data)}))},actionAfterLogin:function(){var e,t=null===(e=this.$route.query)||void 0===e?void 0:e.redirect;t?(t=atob(t),window.location.href=t):window.location.href="/"}}},l=i,c=(n("f79c"),n("2877")),d=Object(c["a"])(l,r,a,!1,null,null,null);t["default"]=d.exports},"5b81":function(e,t,n){"use strict";var r=n("23e7"),a=n("da84"),s=n("c65b"),o=n("e330"),i=n("1d80"),l=n("1626"),c=n("44e7"),d=n("577e"),u=n("dc4a"),p=n("ad6d"),g=n("0cb2"),f=n("b622"),h=n("c430"),v=f("replace"),m=RegExp.prototype,w=a.TypeError,_=o(p),E=o("".indexOf),b=o("".replace),k=o("".slice),C=Math.max,A=function(e,t,n){return n>e.length?-1:""===t?n:E(e,t,n)};r({target:"String",proto:!0},{replaceAll:function(e,t){var n,r,a,o,p,f,y,x,O,T=i(this),S=0,P=0,$="";if(null!=e){if(n=c(e),n&&(r=d(i("flags"in m?e.flags:_(e))),!~E(r,"g")))throw w("`.replaceAll` does not allow non-global regexes");if(a=u(e,v),a)return s(a,e,T,t);if(h&&n)return b(d(T),e,t)}o=d(T),p=d(e),f=l(t),f||(t=d(t)),y=p.length,x=C(1,y),S=A(o,p,0);while(-1!==S)O=f?d(t(p,S,o)):g(p,o,S,[],void 0,t),$+=k(o,P,S)+O,P=S+y,S=A(o,p,S+x);return P<o.length&&($+=k(o,P)),$}})},"609d":function(e,t,n){},f79c:function(e,t,n){"use strict";n("609d")}}]);
//# sourceMappingURL=login.9044c5d2.js.map