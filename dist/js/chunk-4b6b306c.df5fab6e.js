(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4b6b306c","account-admin"],{"2ea0":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"account-admin_area container-fluid"},[t._t("default"),n("div",{staticClass:"d-flex align-items-end justify-content-between flex-wrap py-3"},[n("div",{class:{"d-flex align-items-center justify-content-between":!0,"w-100":"mobile"===t.$detect}},[t.$myCanCreate()?n("button",{staticClass:"btn btn-success",on:{click:function(e){return t.goCreate()}}},[t._v(" + Tạo tài khoản ")]):t._e(),"mobile"===t.$detect?n("div",{staticClass:"filter",on:{click:function(e){t.dialog=!0}}},[n("i",{staticClass:"h3 icon ion-md-funnel"})]):t._e()]),"web"===t.$detect?n("div",{staticClass:"row align-items-end flex-wrap pt-lg-3 pt-xl-0"},[n("div",{staticClass:"col-sm-12 col-md-6 col-lg pt-3 pt-sm-3 pt-lg-0"},[n("label",{staticClass:"font-weight-bold"},[t._v("Từ khoá")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.keyword,expression:"keyword"}],staticClass:"form-control size-input",attrs:{placeholder:"Tìm kiếm"},domProps:{value:t.keyword},on:{input:[function(e){e.target.composing||(t.keyword=e.target.value)},function(e){return t.search()}]}})]),n("div",{staticClass:"col-sm-12 col-md-6 col-lg pt-3 pt-sm-3 pt-lg-0"},[n("label",{staticClass:"font-weight-bold"},[t._v("Trạng thái")]),n("ldc-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Lọc trạng thái",actionKeyBoard:!1},on:{change:t.changeActive},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},t._l(t.optionsActive,(function(t){return n("ldc-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),n("div",{staticClass:"col-sm-12 col-md-6 col-lg-2 pt-3 pt-sm-3 pt-lg-0"},[n("button",{staticClass:"btn btn-secondary",staticStyle:{height:"32px",width:"100%"},attrs:{disabled:""===t.active&&""===t.keyword},on:{click:function(e){return t.clearFilter()}}},[t._v(" Bỏ lọc ")])])]):t._e()]),"mobile"===t.$detect?n("div",{attrs:{"input-search":""}},[n("div",{staticClass:"position-relative",attrs:{"content-input-search":""}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.keyword,expression:"keyword"}],staticClass:"form-control size-input",attrs:{placeholder:"Tìm kiếm"},domProps:{value:t.keyword},on:{input:[function(e){e.target.composing||(t.keyword=e.target.value)},function(e){return t.search()}],keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.getData()}}}),""!==t.keyword?n("span",{staticClass:"position-absolute",staticStyle:{top:"50%",right:"6px",transform:"translateY(-50%)"},on:{click:function(e){return t.clearKeyword()}}},[n("i",{staticClass:"icon ion-md-close-circle-outline",staticStyle:{color:"#d5d5d5","font-size":"18px"}})]):t._e()]),n("ldc-model-mobile",{attrs:{titileCancel:"Hủy",showCancel:!1,showTitle:!0,title:"Tìm kiếm nâng cao",customButton:!0,visible:t.dialog},on:{"update:visible":function(e){t.dialog=e}}},[n("div",{attrs:{slot:"content-model"},slot:"content-model"},[n("ldc-select-show-option",{attrs:{placeholder:"Trạng thái"},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},t._l(t.optionsActive,(function(t){return n("ldc-option-show",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),n("div",{attrs:{slot:"custom-buttom"},slot:"custom-buttom"},[n("div",{class:{"btn-confirm-android":t.$isAndroid,"btn-confirm-ios mb-10px btn-custom-ios":!t.$isAndroid}},[n("button",{staticClass:"btn btn-primary radius-ios text-uppercase mr-10px fs-14px btn-apply",attrs:{"close-model-mobile":""},on:{click:function(e){return t.changeUrl()}}},[t._v("áp dụng")]),n("button",{staticClass:"btn btn-light radius-ios text-uppercase ml-10px fs-14px btn-cancel",attrs:{"close-model-mobile":""},on:{click:function(e){return t.clearFilter()}}},[t._v("Bỏ lọc")])])])])],1):t._e(),n("div",{staticClass:"row"},[n("div",{staticClass:"col-12"},[n("div",{staticClass:"table-responsive"},[n("table",{class:{"table table-striped":!0,"table-mobile":"mobile"===t.$detect}},[n("thead",[n("tr",[n("th",[t._v("ID")]),n("th",[t._v("Họ tên")]),n("th",[t._v("Username")]),"web"===t.$detect?n("th",[t._v("Truy cập cuối")]):t._e(),"web"===t.$detect?n("th",[t._v("Quyền")]):t._e(),n("th",[t._v("Trạng thái")]),n("th",{attrs:{width:"100px"}},[t._v("Hành động")])])]),n("tbody",[t._l(t.accountAdmin,(function(e){return n("tr",{key:e.id},[n("td",[t._v(t._s(e.user_id))]),n("td",{staticClass:"pointer",on:{click:function(n){return t.goDetail(e)}}},[t._v(t._s(e.name))]),n("td",[t._v(t._s(e.username))]),"web"===t.$detect?n("td",[t._v(t._s(e.last_login))]):t._e(),"web"===t.$detect?n("td",t._l(e.permissions.data,(function(e){return n("div",{key:e.id},[t._v(" "+t._s(e.permission)+" ")])})),0):t._e(),n("td",[1==e.active?n("span",{staticStyle:{color:"#67c23a"}},[t._v("Hoạt động ")]):n("span",{staticStyle:{color:"#f56c6c"}},[t._v("Tạm khóa")])]),n("td",[n("button",{staticClass:"btn btn-primary",attrs:{disabled:t.loading},on:{click:function(n){return t.goDetail(e)}}},[t._v(" Chi tiết ")])])])})),n("no-data",{attrs:{data:t.accountAdmin,colspan:"web"===t.$detect?7:5}})],2)])])]),n("div",{staticClass:"col-12"},[n("ldc-pagination",{staticClass:"pt-4 border-top",attrs:{current_page:t.page,last_page:t.totalPages,scroll_top:!0,callData:t.changePage}})],1)]),n("detailAccount",{attrs:{visible:t.dialogAccount,status:t.statusDetailAccount,account:t.accountShow},on:{"update:visible":function(e){t.dialogAccount=e},callData:t.callData}})],2)},i=[],c=n("1da1"),r=(n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),n("b0c0"),n("fb12")),o=n("fc02"),s={components:{detailAccount:function(){return n.e("chunk-2f358844").then(n.bind(null,"49fb"))}},data:function(){return{dialog:!1,loading:!1,optionsActive:r["a"],accountAdmin:[],page:this.$route.query.page?parseInt(this.$route.query.page):1,pageSize:0,total:0,totalPages:0,timeOut:null,active:this.$route.query.active?parseInt(this.$route.query.active):"",keyword:this.$route.query.keyword?this.$route.query.keyword:"",dialogAccount:!1,statusDetailAccount:"create",accountShow:{},id_business:this.$route.params.id}},computed:{query:function(){return this.$route.query},id_business_partner:function(){var t;return null===(t=this.$store.state.profile.user.business)||void 0===t?void 0:t.data.id}},watch:{query:function(t){this.getData()}},created:function(){this.getData()},methods:{changePage:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.page=t,this.changeUrl()},changeUrl:function(){this.$router.push({name:this.$route.name,query:this.setQuery()})},setQuery:function(){var t={};return""!==this.active&&(t.active=parseInt(this.active)),""!==this.keyword&&(t.keyword=this.keyword),this.page>1&&(t.page=this.page),t},clearFilter:function(){this.keyword="",this.active="",this.page=1,this.changeUrl()},clearKeyword:function(){this.keyword="",this.page=1,this.changeUrl()},changeActive:function(){this.page=1,this.changeUrl()},getData:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loading=!0,n=t.setQuery(),"account-cms"===t.$route.name?n.classify="ADMIN_CMS":(n.classify="PARTNER",n.id_business=t.id_business||t.id_business_partner),e.next=5,Object(o["c"])(n).then((function(e){t.accountAdmin=e.data.data.data;var n=e.data.data.meta.pagination;t.page=n.current_page,t.pageSize=n.per_page,t.total=n.total,t.totalPages=n.total_pages}));case 5:t.loading=!1;case 6:case"end":return e.stop()}}),e)})))()},search:function(){var t=this;this.loading=!0,this.timeOut&&clearTimeout(this.timeOut),this.timeOut=setTimeout((function(){t.page=1,t.changeUrl(),t.loading=!1}),500)},goCreate:function(){"web"===this.$detect?(this.dialogAccount=!0,this.statusDetailAccount="create"):"account-cms"===this.$route.name?this.navigationRoute("account-cms-add"):"company-information"===this.$route.name?this.navigationRoute("company-information-account-add"):this.$router.push({name:"account-partner-add",params:{id_business:this.id_business},query:{redirect:this.$encodeRedirect(this.setQuery())}})},goDetail:function(t){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if("web"!==e.$detect){n.next=7;break}return n.next=3,Object(o["b"])(t.id).then((function(t){e.accountShow=t.data.data}));case 3:e.dialogAccount=!0,e.statusDetailAccount="show",n.next=8;break;case 7:"account-cms"===e.$route.name?e.navigationRoute("account-cms-show",t.id):"company-information"===e.$route.name?e.navigationRoute("company-information-account-show",t.id):e.navigationRoute("account-partner-show",t.id);case 8:case"end":return n.stop()}}),n)})))()},navigationRoute:function(t,e){this.$router.push({name:t,params:{id:e},query:{redirect:this.$encodeRedirect(this.setQuery())}})},callData:function(t){t&&("create"===this.statusDetailAccount?(this.page=1,this.keyword="",this.changeUrl(),this.getData()):this.getData())}}},u=s,l=(n("a8bd"),n("2877")),d=Object(l["a"])(u,a,i,!1,null,null,null);e["default"]=d.exports},a26c:function(t,e,n){},a8bd:function(t,e,n){"use strict";n("a26c")},fb12:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var a=[{value:1,label:"Hoạt động"},{value:0,label:"Tạm khóa"}]},fc02:function(t,e,n){"use strict";n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return o})),n.d(e,"d",(function(){return s}));var a=n("1da1"),i=(n("96cf"),n("e63b")),c=function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["b"])("/admin/v1/account_admin",e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),r=function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["c"])("/admin/v1/account_admin",e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),o=function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["b"])("/admin/v1/account_admin/".concat(e));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),s=function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e,n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["d"])("/admin/v1/account_admin/".concat(e),n);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()}}]);
//# sourceMappingURL=chunk-4b6b306c.df5fab6e.js.map