(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["disbursement-management"],{"0838":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"container-fluid user-management-show py-3"},[n("div",{staticClass:"row"},[n("div",{class:"web"===t.$detect?"col-6":"col-12"},[n("div",{staticClass:"d-flex"},[n("div",{class:{"mr-3 avatar":!0,"flex-grow-0 flex-shrink-0":"mobile"===t.$detect}},[n("imageBlock",{attrs:{url:t.$getUrlImage(t.avatar),edit:!1,type:"avatar"}})],1),n("div",{class:{"d-flex flex-column align-items-left justify-content-center overflow-hidden":!0,"pl-4":"web"===t.$detect,"pl-0":"mobile"===t.$detect}},[n("h3",{class:{"h5 font-weight-bold":"mobile"===t.$detect}},[t._v(t._s(t.name))]),t.email?n("p",{staticClass:"mb-2"},[t._v("Email: "+t._s(t.email))]):t._e(),n("p",{staticClass:"m-0"},[t._v(t._s(t.phone))])])])])]),n("div",{staticClass:"row mt-4 mx-0 rounded px-0 px-lg-4 py-2 py-lg-3 shadow-sm bg-light"},[n("div",{staticClass:"col-12 col-lg-8"},[n("form",[n("div",{staticClass:"form-group row"},[n("label",{staticClass:"font-weight-bold col-12 col-md-4"},[t._v("Thời gian ứng:")]),n("div",{staticClass:"col-12 col-md-8"},[t._v(" "+t._s(t.time_created)+" ")])]),n("div",{staticClass:"form-group row"},[n("label",{staticClass:"font-weight-bold col-12 col-md-4"},[t._v("Thời gian ký hợp đồng:")]),n("div",{staticClass:"col-12 col-md-8"},[t._v(" "+t._s(t.contract_signing_date)+" ")])]),n("div",{staticClass:"form-group row"},[n("label",{staticClass:"font-weight-bold col-12 col-md-4"},[t._v("Số tiền ứng: ")]),n("div",{staticClass:"col-12 col-md-8"},[t._v(" "+t._s(t.loan)+" ")])]),n("div",{staticClass:"form-group row"},[n("label",{staticClass:"font-weight-bold col-12 col-md-4"},[t._v("Số tiền giải ngân: ")]),n("div",{staticClass:"col-12 col-md-8"},[t._v(" "+t._s(t.money_disbursement)+" ")])]),n("div",{staticClass:"form-group row"},[n("label",{staticClass:"font-weight-bold col-12 col-md-4"},[t._v("Trạng thái hiện tại: ")]),n("div",{class:{"col-12 col-md-8 font-weight-bold":!0,"text-warning":0===t.status,"text-success":1===t.status,"text-danger":2===t.status}},[t._v(" "+t._s(t.status_text)+" ")])]),1!==t.status?n("div",{staticClass:"form-group row"},[n("label",{staticClass:"font-weight-bold col-form-label col-12 col-md-4"},[t._v("Lý do từ chối giải ngân:")]),n("div",{staticClass:"col-12 col-md-8"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.note,expression:"note"}],class:{"form-control":!0,"is-invalid":t.errors.note},staticStyle:{"max-width":"400px"},attrs:{rows:"3",placeholder:"Lý do từ chối giải ngân"},domProps:{value:t.note},on:{input:function(e){e.target.composing||(t.note=e.target.value)}}}),n("form-invalid",{attrs:{error:t.errors.note}})],1)]):t._e(),0===t.status?n("div",{staticClass:"form-group row"},[n("label",{staticClass:"font-weight-bold col-form-label col-12 col-md-4"},[t._v("Chuyển trạng thái: ")]),n("div",{staticClass:"col-12 col-md-8"},[1!==t.status?n("button",{staticClass:"btn btn-success mr-3",attrs:{disabled:t.loading},on:{click:function(e){return e.preventDefault(),t.changeStatus(1)}}},[t._v(" Đã giải ngân ")]):t._e(),2!==t.status?n("button",{staticClass:"btn btn-danger",attrs:{disabled:t.loading},on:{click:function(e){return e.preventDefault(),t.changeStatus(2)}}},[t._v(" Từ chối giải ngân ")]):t._e()])]):t._e()])]),n("div",{staticClass:"col-12 col-lg-4"},[n("div",{staticClass:"form-group row"},[n("label",{staticClass:"font-weight-bold col-12 col-md-4 col-lg-5"},[t._v("Tên ngân hàng: ")]),n("div",{staticClass:"col-12 col-md-8 col-lg-7"},[t._v(" "+t._s(t.bankAccount.bank)+" ")])]),n("div",{staticClass:"form-group row"},[n("label",{staticClass:"font-weight-bold col-12 col-md-4 col-lg-5"},[t._v("Tên chủ thẻ: ")]),n("div",{staticClass:"col-12 col-md-8 col-lg-7"},[t._v(" "+t._s(t.bankAccount.bank_name)+" ")])]),n("div",{staticClass:"form-group row"},[n("label",{staticClass:"font-weight-bold col-12 col-md-4 col-lg-5"},[t._v("Số tài khoản: ")]),n("div",{staticClass:"col-12 col-md-8 col-lg-7"},[t._v(" "+t._s(t.bankAccount.bank_number)+" ")])]),n("div",[n("p",{staticClass:"mb-2 font-weight-bold"},[t._v("Ảnh thẻ ngân hàng:")]),n("div",{staticStyle:{width:"280px",height:"180px","object-fit":"cover"}},[n("imageBlock",{attrs:{url:t.$getUrlImage(t.bankAccount.bank_image),edit:!1}})],1)])])])])},a=[],i=n("1da1"),r=(n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),n("b0c0"),n("f274")),o={components:{imageBlock:function(){return n.e("chunk-7cec0722").then(n.bind(null,"1f7e"))}},data:function(){return{avatar:"",name:"",email:"",phone:"",time_created:"",contract_signing_date:"",loan:"",money_disbursement:"",status:"",status_text:"",note:"",id:this.$route.params.id,loading:!1,bankAccount:{},errors:{}}},created:function(){this.id&&this.getData()},methods:{getData:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,Object(r["a"])(t.id).then((function(e){if(e.data.success===API_STATUS_SUCCESS){var n=e.data.data;t.setData(n)}else t.$showMessage(e.data.message,"warning")}));case 3:t.loading=!1;case 4:case"end":return e.stop()}}),e)})))()},setData:function(t){var e,n,s,a,i,r;this.avatar=null===(e=t.user)||void 0===e?void 0:e.data.avatar,this.email=null===(n=t.user)||void 0===n?void 0:n.data.email,this.phone=t.user?t.user.data.phone:t.phone_user,this.name=t.user?t.user.data.name:t.name_user,this.time_created=t.time_created,this.contract_signing_date=t.contract_signing_date,this.loan=t.loan?this.$formatNumber(t.loan):"",this.money_disbursement=null!==(s=t.disbursement)&&void 0!==s&&s.money_disbursement?this.$formatNumber(null===(a=t.disbursement)||void 0===a?void 0:a.money_disbursement):"",this.status_text=null===(i=t.disbursement)||void 0===i?void 0:i.status.status_text,this.status=null===(r=t.disbursement)||void 0===r?void 0:r.status.status_int,this.bankAccount=null===t||void 0===t?void 0:t.bank_account},changeStatus:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.errors={},e.loading=!0,n.next=4,e.$confirm("Bạn có chắc muốn chuyển trạng thái","Chuyển trạng thái",{confirmButtonText:"Đồng ý",cancelButtonText:"Hủy",type:"warning"}).then(Object(i["a"])(regeneratorRuntime.mark((function n(){var s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:s={},s.status=t,2===t&&(s.note=e.note),Object(r["c"])(e.id,s).then((function(t){if(t.data.success===API_STATUS_SUCCESS){var n=t.data.data;e.setData(n),e.$showMessage(t.data.message,"success")}else e.$showMessage(t.data.message,"warning")})).catch((function(t){e.errors=t.data.data.data})),e.loading=!1;case 5:case"end":return n.stop()}}),n)})))).catch((function(){e.loading=!1}));case 4:case"end":return n.stop()}}),n)})))()},requestError:function(t){t.status===HTTP_CODE_GONE?this.$showMessage(t.data.message,"warning"):t.status===HTTP_CODE_UNPROCESSABLE_ENTITY&&(this.errors=t.data.data.data)}}},c=o,u=(n("c7cf"),n("2877")),l=Object(u["a"])(c,s,a,!1,null,null,null);e["default"]=l.exports},"0949":function(t,e,n){"use strict";n.d(e,"c",(function(){return i})),n.d(e,"b",(function(){return r})),n.d(e,"d",(function(){return o})),n.d(e,"a",(function(){return c}));var s=n("1da1"),a=(n("96cf"),n("e63b")),i=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(a["b"])("/admin/v1/user",e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),r=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(a["b"])("/admin/v1/user/".concat(e));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),o=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e,n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(a["d"])("/admin/v1/user/".concat(e),n);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),c=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(a["a"])("/admin/v1/user/".concat(e));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},"26f0":function(t,e,n){},"5ee6":function(t,e,n){"use strict";n("d0bc")},"8ca7":function(t,e,n){"use strict";n.d(e,"d",(function(){return i})),n.d(e,"a",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"f",(function(){return c})),n.d(e,"b",(function(){return u})),n.d(e,"e",(function(){return l}));var s=n("1da1"),a=(n("96cf"),n("e63b")),i=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(a["b"])("/admin/v1/partner",e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),r=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(a["c"])("/admin/v1/partner",e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),o=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(a["b"])("/admin/v1/partner/".concat(e));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),c=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e,n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(a["d"])("/admin/v1/partner/".concat(e),n);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),u=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(a["b"])("/admin/v1/partner/my_partner");case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),l=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(a["d"])("/admin/v1/partner/",e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},b120:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"find-company"},[n("div",{staticClass:"position-relative text-white px-2 py-3 bg-header-mb"},[n("i",{staticClass:"icon ion-md-arrow-back position-absolute h4",on:{click:function(e){return t.$router.go(-1)}}}),n("p",{staticClass:"text-center h5 mb-0 font-weight-normal"},[t._v("Tìm kiếm công ty")])]),n("div",{staticClass:"px-2 mt-3"},[n("div",{staticClass:"position-relative"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.keyword,expression:"keyword"}],ref:"input",staticClass:"form-control size-input",attrs:{placeholder:"Tìm kiếm công ty"},domProps:{value:t.keyword},on:{input:[function(e){e.target.composing||(t.keyword=e.target.value)},function(e){return t.search(e,"auto")}],keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e,"active")}}}),""!==t.keyword?n("span",{staticClass:"position-absolute",staticStyle:{top:"50%",right:"6px",transform:"translateY(-50%)"},on:{click:function(e){return t.clearKeyword()}}},[n("i",{staticClass:"icon ion-md-close-circle-outline",staticStyle:{color:"#d5d5d5","font-size":"18px"}})]):t._e()]),n("div",[n("ul",[t._l(t.companies,(function(e,s){return n("li",{key:s,class:{"p-3 mt-1 bg-light":!0,"text-primary font-weight-bold":t.id_business===e.id},on:{click:function(n){return t.selected(e)}}},[t._v(" "+t._s(e.name)+" ")])})),0===t.companies.length?n("li",{staticClass:"user-item text-center text-black-50 pt-3"},[t.loading?n("span",[t._v("Đang tìm kiếm")]):n("span",[t._v("Không có dữ liệu")])]):t._e()],2)])])])},a=[],i=n("8ca7"),r={data:function(){var t,e;return{companies:[],company:"",loading:!1,id_business:null!==(t=this.$route.query)&&void 0!==t&&t.id_business?this.$route.query.id_business:"",keyword:null!==(e=this.$route.query)&&void 0!==e&&e.keywordCompanyMb?this.$route.query.keywordCompanyMb:""}},created:function(){this.getData(),this.$removeOverflowHidenBody()},mounted:function(){this.focusInput()},methods:{focusInput:function(){var t=this.$refs.input;t&&t.focus()},getData:function(){var t=this,e={keyword:this.keyword};Object(i["d"])(e).then((function(e){t.companies=e.data.data}))},search:function(t,e){var n=this;t&&(this.keyword=t.target.value),"auto"===e?(this.loading=!0,this.timeOut&&clearTimeout(this.timeOut),this.timeOut=setTimeout((function(){n.getData(),n.loading=!1}),500)):this.getData()},selected:function(t){var e=this.$route.query;e.id_business=t.id,this.keyword?e.keywordCompanyMb=this.keyword:delete e.keywordCompanyMb,this.$router.push({name:"disbursement",query:e})},clearKeyword:function(){this.keyword="",this.getData()}}},o=r,c=n("2877"),u=Object(c["a"])(o,s,a,!1,null,null,null);e["default"]=u.exports},be7d:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"disbursement container-fluid"},["web"===t.$detect?n("div",{staticClass:"d-flex align-items-end justify-content-end pb-4"},[n("div",{staticClass:"mr-3"},[n("p",{staticClass:"font-weight-bold mb-2"},[t._v("Từ ngày")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.date.date_from,expression:"date.date_from"}],staticClass:"p-1 size-button form-control",staticStyle:{width:"100%",height:"30px"},attrs:{type:"date"},domProps:{value:t.date.date_from},on:{change:function(e){return t.changeUrl()},input:function(e){e.target.composing||t.$set(t.date,"date_from",e.target.value)}}})]),n("div",{staticClass:"mr-3"},[n("p",{staticClass:"font-weight-bold mb-2"},[t._v("Đến ngày")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.date.date_to,expression:"date.date_to"}],staticClass:"p-1 size-button form-control",staticStyle:{width:"100%",height:"30px"},attrs:{type:"date"},domProps:{value:t.date.date_to},on:{change:function(e){return t.changeUrl()},input:function(e){e.target.composing||t.$set(t.date,"date_to",e.target.value)}}})]),n("div",{staticClass:"mr-3"},[n("label",{staticClass:"font-weight-bold"},[t._v("Tìm kiếm người dùng")]),n("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.outsideUser,expression:"outsideUser"}],staticClass:"search"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.keywordUser,expression:"keywordUser"}],staticClass:"form-control size-input",attrs:{type:"text",placeholder:"Tìm kiếm theo họ tên, SĐT"},domProps:{value:t.keywordUser},on:{focus:function(e){return t.focusUser("web")},input:[function(e){e.target.composing||(t.keywordUser=e.target.value)},t.searchUser]}}),t.showUser?n("ul",{staticClass:"company-list"},[[t._l(t.users,(function(e,s){return n("li",{key:s,staticClass:"company-item",on:{click:function(n){return t.selectUser(e)}}},[t._v(" "+t._s(e.name)+" ("+t._s(e.phone)+") ")])})),0===t.users.length?n("li",{staticClass:"company-item text-center text-black-50"},[t.loading?n("span",[t._v("Đang tìm kiếm")]):n("span",[t._v("Không có dữ liệu")])]):t._e()]],2):t._e()])]),t.$isAdmin()?n("div",{staticClass:"mr-3"},[n("label",{staticClass:"font-weight-bold"},[t._v("Tìm công ty")]),n("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.outsideSearch,expression:"outsideSearch"}],staticClass:"search"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.keywordCompany,expression:"keywordCompany"}],staticClass:"form-control size-input",attrs:{type:"text",placeholder:"Tìm kiếm công ty"},domProps:{value:t.keywordCompany},on:{focus:function(e){return t.focusSearch("web")},input:[function(e){e.target.composing||(t.keywordCompany=e.target.value)},t.searchCompany]}}),t.showSearch?n("ul",{staticClass:"company-list"},[[t._l(t.companies,(function(e,s){return n("li",{key:s,staticClass:"company-item",on:{click:function(n){return t.search(e)}}},[t._v(" "+t._s(e.name)+" ")])})),0===t.companies.length?n("li",{staticClass:"company-item text-center text-black-50"},[t.loading?n("span",[t._v("Đang tìm kiếm")]):n("span",[t._v("Không có dữ liệu")])]):t._e()]],2):t._e()])]):t._e(),n("div",{staticClass:"mr-3"},[n("label",{staticClass:"font-weight-bold"},[t._v("Lọc trạng thái")]),n("ldc-select",{staticClass:"size-input",staticStyle:{width:"100%"},attrs:{placeholder:"Trạng thái"},on:{change:t.changeActive},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},t._l(t.optionDisbursement,(function(t){return n("ldc-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),n("div",[n("button",{staticClass:"btn btn-secondary",staticStyle:{height:"32px",width:"80px"},attrs:{disabled:""===t.status&&""===t.id_user&&""===t.date.date_from&&""===t.date.date_to&&""===t.id_business},on:{click:function(e){return t.clearFilter()}}},[t._v(" Bỏ lọc ")])])]):t._e(),"mobile"===t.$detect?n("div",{staticClass:"filter d-flex align-items-center justify-content-between mt-3"},[n("div",{staticClass:"position-relative w-100 mr-3"},[n("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.outsideUser,expression:"outsideUser"}],staticClass:"search"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.keywordUser,expression:"keywordUser"}],staticClass:"form-control size-input",attrs:{type:"text",placeholder:"Tìm kiếm theo họ tên, SĐT"},domProps:{value:t.keywordUser},on:{focus:function(e){return t.focusUser("mobile")},input:function(e){e.target.composing||(t.keywordUser=e.target.value)}}})]),""!==t.keywordUser?n("span",{staticClass:"position-absolute",staticStyle:{top:"50%",right:"6px",transform:"translateY(-50%)"},on:{click:function(e){return t.clearKeywordUser()}}},[n("i",{staticClass:"icon ion-md-close-circle-outline",staticStyle:{color:"#d5d5d5","font-size":"18px"}})]):t._e()]),n("i",{staticClass:"h3 icon ion-md-funnel mb-0 py-2",on:{click:function(e){t.dialog=!0}}})]):t._e(),"mobile"===t.$detect?n("div",[n("ldc-model-mobile",{attrs:{titileCancel:"Hủy",showCancel:!1,showTitle:!0,title:"Tìm kiếm nâng cao",customButton:!0,visible:t.dialog},on:{"update:visible":function(e){t.dialog=e}}},[n("div",{attrs:{slot:"content-model"},slot:"content-model"},[t.$isAdmin()?n("div",{class:{"mx-2 position-relative":!0,"mt-2":t.$isAndroid}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.keywordCompany,expression:"keywordCompany"}],staticClass:"form-control size-input",attrs:{type:"text",placeholder:"Tìm kiếm công ty"},domProps:{value:t.keywordCompany},on:{focus:function(e){return t.focusSearch("mobile")},input:function(e){e.target.composing||(t.keywordCompany=e.target.value)}}}),""!==t.keywordCompany?n("span",{staticClass:"position-absolute",staticStyle:{top:"50%",right:"6px",transform:"translateY(-50%)"},on:{click:function(e){return t.clearKeywordCompany()}}},[n("i",{staticClass:"icon ion-md-close-circle-outline",staticStyle:{color:"#d5d5d5","font-size":"18px"}})]):t._e()]):t._e(),n("div",{staticClass:"d-flex p-2"},[n("div",{staticClass:"mr-1 input-mb w-50"},[n("div",{staticClass:"position-relative"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.date.date_from,expression:"date.date_from"}],staticClass:"form-control input-mobile size-input rounded bg-white pl-2 input-date",staticStyle:{width:"100%",height:"30px"},attrs:{type:"date"},domProps:{value:t.date.date_from},on:{input:function(e){e.target.composing||t.$set(t.date,"date_from",e.target.value)}}}),""===t.date.date_from?n("span",{staticClass:"position-absolute"},[t._v("Từ ngày")]):t._e()])]),n("div",{staticClass:"ml-1 input-mb w-50"},[n("div",{staticClass:"position-relative"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.date.date_to,expression:"date.date_to"}],staticClass:"form-control input-mobile size-input rounded bg-white pl-2 input-date",staticStyle:{width:"100%",height:"30px"},attrs:{type:"date"},domProps:{value:t.date.date_to},on:{input:function(e){e.target.composing||t.$set(t.date,"date_to",e.target.value)}}}),""===t.date.date_to?n("span",{staticClass:"position-absolute"},[t._v("Đến ngày")]):t._e()])])]),n("ldc-select-show-option",{attrs:{placeholder:"Lọc tài khoản"},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},t._l(t.optionDisbursement,(function(t){return n("ldc-option-show",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),n("div",{attrs:{slot:"custom-buttom"},slot:"custom-buttom"},[n("div",{class:{"btn-confirm-android":t.$isAndroid,"btn-confirm-ios mb-10px btn-custom-ios":!t.$isAndroid}},[n("button",{staticClass:"btn btn-primary radius-ios text-uppercase mr-10px fs-14px btn-apply",attrs:{"close-model-mobile":""},on:{click:function(e){return t.changeUrl()}}},[t._v("áp dụng")]),n("button",{staticClass:"btn btn-light radius-ios text-uppercase ml-10px fs-14px btn-cancel",attrs:{"close-model-mobile":""},on:{click:function(e){return t.clearFilter()}}},[t._v("Bỏ lọc")])])])])],1):t._e(),n("div",{class:{row:"web"===t.$detect,"row bg-white position-relative mt-3":"mobile"===t.$detect}},[n("div",{staticClass:"col-12 border-bottom"},[n("div",{staticClass:"table-responsive"},[n("table",{class:{"table table-striped":!0,"table-mobie":"mobile"===t.$detect}},[t._m(0),n("tbody",[t._l(t.disbursements,(function(e,s){return n("tr",{key:s},[n("td",[t._v(t._s(e.loan_id))]),n("td",[n("router-link",{staticClass:"format-link",attrs:{to:t.goDetail(e)}},[t._v(" "+t._s(e.user?e.user.data.name:e.name_user)+" ")])],1),n("td",[t._v(t._s(e.user?e.user.data.phone:e.name_user))]),n("td",[t._v(" "+t._s(e.contract_signing_date)+" ")]),n("td",{staticClass:"text-danger font-weight-bold"},[t._v(" "+t._s(e.disbursement&&e.disbursement.loan?t.$formatNumber(e.disbursement.loan):"")+" ")]),n("td",[t._v(" "+t._s(e.business?e.business.data.name:"")+" ")]),n("td",{class:{"text-warning":"WAITING_DISBURSEMENT"==e.status,"text-success":"PAYING"==e.status,"text-danger":"NOT_DISBURSEMENT"==e.status}},[t._v(" "+t._s(e.status_text)+" ")]),n("td",{staticClass:"text-center"},[n("router-link",{attrs:{to:t.goDetail(e)}},[n("button",{staticClass:"btn btn-primary",attrs:{disabled:t.loading}},[t._v(" Chi tiết ")])])],1)])})),n("no-data",{attrs:{data:t.disbursements,colspan:8}})],2)])])]),n("div",{staticClass:"col-12 d-flex justify-content-end"},[n("ldc-pagination",{staticClass:"pt-4",attrs:{current_page:t.page,last_page:t.totalPages,scroll_top:!0,callData:t.changePage}})],1)])])},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[t._v("ID")]),n("th",[t._v("Họ tên")]),n("th",[t._v("Số điện thoại")]),n("th",[t._v("Thời gian vay")]),n("th",[t._v("Số tiền vay")]),n("th",[t._v("Công ty")]),n("th",[t._v("Trạng thái")]),n("th",{staticClass:"text-center",attrs:{width:"100px"}},[t._v(" Hành động ")])])])}],i=n("1da1"),r=(n("96cf"),n("b0c0"),n("f274")),o=n("0949"),c=n("8ca7"),u=[{value:1,label:"Đã giải ngân"},{value:0,label:"Chờ giải ngân"},{value:2,label:"Từ chối giải ngân"}],l={data:function(){var t,e,n,s;return{dialog:!1,disbursements:[],companies:[],users:[],optionDisbursement:u,status:this.$route.query.status?parseInt(this.$route.query.status):"",id_user:null!==(t=this.$route.query)&&void 0!==t&&t.id_user?this.$route.query.id_user:"",id_business:null!==(e=this.$route.query)&&void 0!==e&&e.id_business?this.$route.query.id_business:"",keywordUser:"",keywordCompany:"",page:this.$route.query.page?parseInt(this.$route.query.page):1,totalPages:0,timeOut:null,showSearch:!1,showUser:!1,loading:!1,date:{date_from:null!==(n=this.$route.query)&&void 0!==n&&n.date_from?this.$route.query.date_from:"",date_to:null!==(s=this.$route.query)&&void 0!==s&&s.date_to?this.$route.query.date_to:""}}},computed:{query:function(){return this.$route.query}},watch:{query:function(t){this.getData()}},created:function(){this.id_user&&this.setUser(this.id_user),this.id_business&&this.setCompany(),this.getData()},methods:{getCompany:function(){var t=this;this.loading=!0,this.timeOut&&clearTimeout(this.timeOut);var e={};e.keyword=this.keywordCompany,this.timeOut=setTimeout((function(){Object(c["d"])(e).then((function(e){t.companies=e.data.data,t.loading=!1}))}))},setCompany:function(){var t=this;Object(c["c"])(this.id_business).then((function(e){t.keywordCompany="".concat(e.data.data?e.data.data.name:"")}))},setUser:function(){var t=this;Object(o["b"])(this.id_user).then((function(e){t.keywordUser="".concat(e.data.data?e.data.data.name:"")}))},getData:function(){var t=this,e=this.setQuery();Object(r["b"])(e).then((function(e){if(e.data.success===API_STATUS_SUCCESS){t.disbursements=e.data.data.data;var n=e.data.data.meta.pagination;t.page=n.current_page,t.totalPages=n.total_pages}else t.$showMessage(e.data.message,"warning")}))},changePage:function(t){this.page=t,this.changeUrl()},changeActive:function(){this.page=1,this.changeUrl()},changeUrl:function(){this.$router.push({name:"disbursement",query:this.setQuery()})},searchUser:function(t){var e=this;this.users=[],this.loading=!0,t&&(this.keywordUser=t.target.value),this.timeOut&&clearTimeout(this.timeOut);var n={};n.keyword=this.keywordUser,this.timeOut=setTimeout((function(){Object(o["c"])(n).then((function(t){e.users=t.data.data,e.loading=!1}))}),500)},setQuery:function(){var t={};return""!==this.status&&(t.status=parseInt(this.status)),""!==this.date.date_from&&(t.date_from=this.date.date_from),""!==this.date.date_to&&(t.date_to=this.date.date_to),""!==this.id_business&&(t.id_business=this.id_business),""!==this.id_user&&(t.id_user=this.id_user),this.page>1&&(t.page=this.page),t},searchCompany:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t&&(e.keywordCompany=t.target.value),e.companies=[],s={},e.loading=!0,s.keyword=e.keywordCompany,n.next=7,Object(c["d"])(s).then((function(t){t.data.success===API_STATUS_SUCCESS?(e.companies=t.data.data,e.loading=!1):e.$showMessage(t.data.message,"warning")}));case 7:case"end":return n.stop()}}),n)})))()},selectUser:function(t){this.page=1,this.keywordUser=t.name,this.id_user=t.id,this.showUser=!1,this.changeUrl()},search:function(t){this.page=1,this.keywordCompany=t.name,this.id_business=t.id,this.showSearch=!1,this.changeUrl()},focusSearch:function(t){"web"===t?(this.showSearch=!0,this.getCompany()):this.$router.push({name:"disbursement-find-company",query:this.$route.query})},focusUser:function(t){"web"===t?(this.showUser=!0,this.searchUser()):this.$router.push({name:"disbursement-find-user",query:this.$route.query})},outsideSearch:function(){this.showSearch=!1},outsideUser:function(){this.showUser=!1},clearKeywordUser:function(){this.id_user="",this.keywordUser="",this.page=1,this.changeUrl()},clearKeywordCompany:function(){this.keywordCompany="",this.id_business="",this.page=1,this.changeUrl()},clearFilter:function(){this.id_business="",this.date.date_from="",this.date.date_to="",this.id_user="",this.keywordUser="",this.keywordCompany="",this.status="",this.page=1,this.changeUrl()},goDetail:function(t){return{name:"disbursement-show",params:{id:t.id},query:{redirect:this.$encodeRedirect(this.setQuery())}}}}},d=l,m=(n("5ee6"),n("2877")),h=Object(m["a"])(d,s,a,!1,null,null,null);e["default"]=h.exports},c7cf:function(t,e,n){"use strict";n("26f0")},d0bc:function(t,e,n){},d5d3:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"position-relative bg-header-mb px-3",staticStyle:{height:"50px","line-height":"50px"}},[n("i",{staticClass:"text-white icon ion-md-arrow-back position-absolute h4 mb-0",staticStyle:{top:"50%",transform:"translateY(-50%)"},on:{click:function(e){return t.$router.go(-1)}}}),n("p",{staticClass:"text-white text-center mb-0",staticStyle:{"font-size":"16px"}},[t._v("Tìm kiếm người dùng")])]),n("div",{staticClass:"container-fluid py-3"},[n("div",{staticClass:"position-relative"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.keyword,expression:"keyword"}],ref:"input",staticClass:"form-control size-input",attrs:{type:"text",placeholder:"Tìm kiếm theo họ tên, SĐT"},domProps:{value:t.keyword},on:{input:[function(e){e.target.composing||(t.keyword=e.target.value)},t.searchUser],keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchUser()}}}),""!==t.keyword?n("span",{staticClass:"position-absolute",staticStyle:{top:"50%",right:"6px",transform:"translateY(-50%)"},on:{click:function(e){return t.clearFilter()}}},[n("i",{staticClass:"icon ion-md-close-circle-outline",staticStyle:{color:"#d5d5d5","font-size":"18px"}})]):t._e()]),n("ul",{staticClass:"user-list"},[t._l(t.users,(function(e,s){return n("li",{key:s,class:{"user-item bg-light mt-1 p-3":!0,"text-primary font-weight-bold":t.id_user===e.id},on:{click:function(n){return t.selectUser(e)}}},[t._v(" "+t._s(e.name)+" ("+t._s(e.phone)+") ")])})),0===t.users.length?n("li",{staticClass:"user-item text-center text-black-50 pt-3"},[t.loading?n("span",[t._v("Đang tìm kiếm")]):n("span",[t._v("Không có dữ liệu")])]):t._e()],2)])])},a=[],i=n("1da1"),r=(n("96cf"),n("0949")),o={data:function(){return{keyword:this.$route.query.keywordUser?this.$route.query.keywordUser:"",users:[],loading:!1,id_user:this.$route.query.id_user?this.$route.query.id_user:""}},created:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.searchUser();case 2:case"end":return e.stop()}}),e)})))()},mounted:function(){this.focusInput()},methods:{focusInput:function(){this.$refs.input.focus()},searchUser:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t&&(e.keyword=t.target.value),e.loading=!0,s={},s.keyword=e.keyword,e.timeOut&&clearTimeout(e.timeOut),e.timeOut=setTimeout((function(){Object(r["c"])(s).then((function(t){e.users=t.data.data,e.loading=!1}))}),500);case 6:case"end":return n.stop()}}),n)})))()},selectUser:function(t){var e=this.$route.query;e.id_user=t.id,this.keyword?e.keywordUser=this.keyword:delete e.keywordUser,this.$router.push({name:"disbursement",query:e})},clearFilter:function(){this.keyword="",this.searchUser()}}},c=o,u=n("2877"),l=Object(u["a"])(c,s,a,!1,null,null,null);e["default"]=l.exports},f274:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"a",(function(){return r})),n.d(e,"c",(function(){return o}));var s=n("1da1"),a=(n("96cf"),n("e63b")),i=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(a["b"])("/admin/v1/loan/disbursement",e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),r=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(a["b"])("/admin/v1/loan/disbursement/".concat(e));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),o=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e,n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(a["c"])("/admin/v1/loan/disbursement/".concat(e,"/change_status"),n);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()}}]);
//# sourceMappingURL=disbursement-management.0199e5fe.js.map