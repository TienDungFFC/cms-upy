(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["account-admin"],{"2ea0":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"account-admin_area container-fluid"},[t._t("default"),a("div",{staticClass:"d-flex align-items-end justify-content-between flex-wrap py-3"},[a("div",{class:{"d-flex align-items-center justify-content-between":!0,"w-100":"mobile"===t.$detect}},[t.$myCanCreate()?a("button",{staticClass:"btn btn-success",on:{click:function(e){return t.goCreate()}}},[t._v(" + Tạo tài khoản ")]):t._e(),"mobile"===t.$detect?a("div",{staticClass:"filter",on:{click:function(e){t.dialog=!0}}},[a("i",{staticClass:"h3 icon ion-md-funnel"})]):t._e()]),"web"===t.$detect?a("div",{staticClass:"row align-items-end flex-wrap pt-lg-3 pt-xl-0"},[a("div",{staticClass:"col-sm-12 col-md-6 col-lg pt-3 pt-sm-3 pt-lg-0"},[a("label",{staticClass:"font-weight-bold"},[t._v("Từ khoá")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.keyword,expression:"keyword"}],staticClass:"form-control size-input",attrs:{placeholder:"Tìm kiếm"},domProps:{value:t.keyword},on:{input:[function(e){e.target.composing||(t.keyword=e.target.value)},function(e){return t.search()}]}})]),a("div",{staticClass:"col-sm-12 col-md-6 col-lg pt-3 pt-sm-3 pt-lg-0"},[a("label",{staticClass:"font-weight-bold"},[t._v("Trạng thái")]),a("ldc-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Lọc trạng thái",actionKeyBoard:!1},on:{change:t.changeActive},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},t._l(t.optionsActive,(function(t){return a("ldc-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),a("div",{staticClass:"col-sm-12 col-md-6 col-lg-2 pt-3 pt-sm-3 pt-lg-0"},[a("button",{staticClass:"btn btn-secondary",staticStyle:{height:"32px",width:"100%"},attrs:{disabled:""===t.active&&""===t.keyword},on:{click:function(e){return t.clearFilter()}}},[t._v(" Bỏ lọc ")])])]):t._e()]),"mobile"===t.$detect?a("div",{attrs:{"input-search":""}},[a("div",{staticClass:"position-relative",attrs:{"content-input-search":""}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.keyword,expression:"keyword"}],staticClass:"form-control size-input",attrs:{placeholder:"Tìm kiếm"},domProps:{value:t.keyword},on:{input:[function(e){e.target.composing||(t.keyword=e.target.value)},function(e){return t.search()}],keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.getData()}}}),""!==t.keyword?a("span",{staticClass:"position-absolute",staticStyle:{top:"50%",right:"6px",transform:"translateY(-50%)"},on:{click:function(e){return t.clearKeyword()}}},[a("i",{staticClass:"icon ion-md-close-circle-outline",staticStyle:{color:"#d5d5d5","font-size":"18px"}})]):t._e()]),a("ldc-model-mobile",{attrs:{titileCancel:"Hủy",showCancel:!1,showTitle:!0,title:"Tìm kiếm nâng cao",customButton:!0,visible:t.dialog},on:{"update:visible":function(e){t.dialog=e}}},[a("div",{attrs:{slot:"content-model"},slot:"content-model"},[a("ldc-select-show-option",{attrs:{placeholder:"Trạng thái"},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},t._l(t.optionsActive,(function(t){return a("ldc-option-show",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),a("div",{attrs:{slot:"custom-buttom"},slot:"custom-buttom"},[a("div",{class:{"btn-confirm-android":t.$isAndroid,"btn-confirm-ios mb-10px btn-custom-ios":!t.$isAndroid}},[a("button",{staticClass:"btn btn-primary radius-ios text-uppercase mr-10px fs-14px btn-apply",attrs:{"close-model-mobile":""},on:{click:function(e){return t.changeUrl()}}},[t._v("áp dụng")]),a("button",{staticClass:"btn btn-light radius-ios text-uppercase ml-10px fs-14px btn-cancel",attrs:{"close-model-mobile":""},on:{click:function(e){return t.clearFilter()}}},[t._v("Bỏ lọc")])])])])],1):t._e(),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"table-responsive"},[a("table",{class:{"table table-striped":!0,"table-mobile":"mobile"===t.$detect}},[a("thead",[a("tr",[a("th",[t._v("ID")]),a("th",[t._v("Họ tên")]),a("th",[t._v("Username")]),"web"===t.$detect?a("th",[t._v("Truy cập cuối")]):t._e(),"web"===t.$detect?a("th",[t._v("Quyền")]):t._e(),a("th",[t._v("Trạng thái")]),a("th",{attrs:{width:"100px"}},[t._v("Hành động")])])]),a("tbody",[t._l(t.accountAdmin,(function(e){return a("tr",{key:e.id},[a("td",[t._v(t._s(e.user_id))]),a("td",{staticClass:"pointer",on:{click:function(a){return t.goDetail(e)}}},[t._v(t._s(e.name))]),a("td",[t._v(t._s(e.username))]),"web"===t.$detect?a("td",[t._v(t._s(e.last_login))]):t._e(),"web"===t.$detect?a("td",t._l(e.permissions.data,(function(e){return a("div",{key:e.id},[t._v(" "+t._s(e.permission)+" ")])})),0):t._e(),a("td",[1==e.active?a("span",{staticStyle:{color:"#67c23a"}},[t._v("Hoạt động ")]):a("span",{staticStyle:{color:"#f56c6c"}},[t._v("Tạm khóa")])]),a("td",[a("button",{staticClass:"btn btn-primary",attrs:{disabled:t.loading},on:{click:function(a){return t.goDetail(e)}}},[t._v(" Chi tiết ")])])])})),a("no-data",{attrs:{data:t.accountAdmin,colspan:"web"===t.$detect?7:5}})],2)])])]),a("div",{staticClass:"col-12"},[a("ldc-pagination",{staticClass:"pt-4 border-top",attrs:{current_page:t.page,last_page:t.totalPages,scroll_top:!0,callData:t.changePage}})],1)]),a("detailAccount",{attrs:{visible:t.dialogAccount,status:t.statusDetailAccount,account:t.accountShow},on:{"update:visible":function(e){t.dialogAccount=e},callData:t.callData}})],2)},n=[],s=a("1da1"),o=(a("96cf"),a("d3b7"),a("3ca3"),a("ddb0"),a("b0c0"),a("fb12")),c=a("fc02"),r={components:{detailAccount:function(){return a.e("chunk-2f358844").then(a.bind(null,"49fb"))}},data:function(){return{dialog:!1,loading:!1,optionsActive:o["a"],accountAdmin:[],page:this.$route.query.page?parseInt(this.$route.query.page):1,pageSize:0,total:0,totalPages:0,timeOut:null,active:this.$route.query.active?parseInt(this.$route.query.active):"",keyword:this.$route.query.keyword?this.$route.query.keyword:"",dialogAccount:!1,statusDetailAccount:"create",accountShow:{},id_business:this.$route.params.id}},computed:{query:function(){return this.$route.query},id_business_partner:function(){var t;return null===(t=this.$store.state.profile.user.business)||void 0===t?void 0:t.data.id}},watch:{query:function(t){this.getData()}},created:function(){this.getData()},methods:{changePage:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.page=t,this.changeUrl()},changeUrl:function(){this.$router.push({name:this.$route.name,query:this.setQuery()})},setQuery:function(){var t={};return""!==this.active&&(t.active=parseInt(this.active)),""!==this.keyword&&(t.keyword=this.keyword),this.page>1&&(t.page=this.page),t},clearFilter:function(){this.keyword="",this.active="",this.page=1,this.changeUrl()},clearKeyword:function(){this.keyword="",this.page=1,this.changeUrl()},changeActive:function(){this.page=1,this.changeUrl()},getData:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loading=!0,a=t.setQuery(),"account-cms"===t.$route.name?a.classify="ADMIN_CMS":(a.classify="PARTNER",a.id_business=t.id_business||t.id_business_partner),e.next=5,Object(c["c"])(a).then((function(e){t.accountAdmin=e.data.data.data;var a=e.data.data.meta.pagination;t.page=a.current_page,t.pageSize=a.per_page,t.total=a.total,t.totalPages=a.total_pages}));case 5:t.loading=!1;case 6:case"end":return e.stop()}}),e)})))()},search:function(){var t=this;this.loading=!0,this.timeOut&&clearTimeout(this.timeOut),this.timeOut=setTimeout((function(){t.page=1,t.changeUrl(),t.loading=!1}),500)},goCreate:function(){"web"===this.$detect?(this.dialogAccount=!0,this.statusDetailAccount="create"):"account-cms"===this.$route.name?this.navigationRoute("account-cms-add"):"company-information"===this.$route.name?this.navigationRoute("company-information-account-add"):this.$router.push({name:"account-partner-add",params:{id_business:this.id_business},query:{redirect:this.$encodeRedirect(this.setQuery())}})},goDetail:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if("web"!==e.$detect){a.next=7;break}return a.next=3,Object(c["b"])(t.id).then((function(t){e.accountShow=t.data.data}));case 3:e.dialogAccount=!0,e.statusDetailAccount="show",a.next=8;break;case 7:"account-cms"===e.$route.name?e.navigationRoute("account-cms-show",t.id):"company-information"===e.$route.name?e.navigationRoute("company-information-account-show",t.id):e.navigationRoute("account-partner-show",t.id);case 8:case"end":return a.stop()}}),a)})))()},navigationRoute:function(t,e){this.$router.push({name:t,params:{id:e},query:{redirect:this.$encodeRedirect(this.setQuery())}})},callData:function(t){t&&("create"===this.statusDetailAccount?(this.page=1,this.keyword="",this.changeUrl(),this.getData()):this.getData())}}},l=r,u=(a("a8bd"),a("2877")),d=Object(u["a"])(l,i,n,!1,null,null,null);e["default"]=d.exports},a26c:function(t,e,a){},a8bd:function(t,e,a){"use strict";a("a26c")},fb12:function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));var i=[{value:1,label:"Hoạt động"},{value:0,label:"Tạm khóa"}]}}]);
//# sourceMappingURL=account-admin.e961b013.js.map