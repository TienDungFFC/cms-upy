(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["customer-care","formLoans"],{"10ed":function(t,e,a){"use strict";a("e931")},1938:function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return r}));var s=a("1da1"),i=(a("96cf"),a("e63b")),n=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["b"])("/admin/v1/manager_loan_contract/".concat(e,"/loan-info"));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),o=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["b"])("/admin/v1/manager_loan_contract",e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),r=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["b"])("/admin/v1/manager_loan_contract/payment-period",e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},"2b16":function(t,e,a){"use strict";a("d0f1")},"43e3":function(t,e,a){"use strict";a("c157")},"63e4":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",["web"===t.$detect?a("ldc-dialog",{attrs:{visible:t.dialogDetail,title:"",width:"60%"},on:{"update:visible":function(e){t.dialogDetail=e}}},[a("formLoans",{attrs:{propsInfo:t.infoLoan,visible:t.dialogDetail}})],1):a("div",[a("formLoans",{attrs:{propsInfo:t.infoLoanMb,visible:t.dialogDetail}})],1)],1)},i=[],n=a("1da1"),o=(a("96cf"),a("79fa")),r={props:["visible","infoLoan"],data:function(){return{dialogDetail:!1,infoLoanMb:{}}},components:{formLoans:o["default"]},watch:{visible:function(t){this.dialogDetail=t},dialogDetail:function(t){this.$emit("update:visible",t)}},created:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:"mobile"===t.$detect&&(t.infoLoanMb={id_loan:t.$route.query.id_loan,id_user:t.$route.query.id_user},t.dialogDetail=!0);case 1:case"end":return e.stop()}}),e)})))()},methods:{}},l=r,c=a("2877"),d=Object(c["a"])(l,s,i,!1,null,null,null);e["default"]=d.exports},"79fa":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"formLoans bg-light px-md-5 py-md-2 py-3 px-2 container-fluid"},[a("div",{},[a("div",{staticClass:"position-relative"},[a("i",{directives:[{name:"show",rawName:"v-show",value:"mobile"===t.$detect,expression:"$detect === 'mobile'"}],staticClass:"icon ion-md-arrow-back position-absolute h4 ml-2",on:{click:function(e){return t.$router.go(-1)}}}),a("i",{directives:[{name:"show",rawName:"v-show",value:!t.showDetail,expression:"!showDetail"}],staticClass:"icon ion-md-arrow-back position-absolute h4 pointer",on:{click:function(e){t.showDetail=!t.showDetail}}}),a("p",{staticClass:"h5 font-weight-bolder text-center m-0"},[t._v(" "+t._s(t.showDetail?"Thông tin giao dịch":"Chi tiết giao dịch"))])]),a("div",{directives:[{name:"show",rawName:"v-show",value:t.showDetail,expression:"showDetail"}],staticClass:"w-100"},["web"===t.$detect?a("div",{staticClass:"col-12"},[a("div",{staticClass:"d-flex justify-content-end align-items-end"},[a("div",{staticClass:"m-2",staticStyle:{width:"250px"}},[a("p",{staticClass:"font-weight-bolder mb-2"},[t._v("Từ ngày")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.date.date_from,expression:"date.date_from"}],staticClass:"form-control p-1",staticStyle:{width:"100%",height:"30px"},attrs:{type:"date"},domProps:{value:t.date.date_from},on:{input:function(e){e.target.composing||t.$set(t.date,"date_from",e.target.value)}}})]),a("div",{staticClass:"m-2",staticStyle:{width:"250px"}},[a("p",{staticClass:"font-weight-bolder mb-2"},[t._v("Đến ngày")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.date.date_to,expression:"date.date_to"}],staticClass:"form-control p-1",staticStyle:{width:"100%",height:"30px"},attrs:{type:"date"},domProps:{value:t.date.date_to},on:{input:function(e){e.target.composing||t.$set(t.date,"date_to",e.target.value)}}})]),a("button",{staticClass:"btn btn-primary m-2 h-50",attrs:{disabled:t.loading},on:{click:function(e){return t.searchDate()}}},[t._v("Tìm kiếm")]),a("button",{staticClass:"btn btn-secondary m-2 h-50",attrs:{disabled:""===t.date.date_from&&""===t.date.date_to},on:{click:function(e){return t.clearFilter()}}},[t._v("Bỏ lọc")])])]):t._e(),a("div",{staticClass:"mt-3"},[a("div",{staticClass:"d-flex justify-content-between align-items-center"},[a("p",{staticClass:"font-weight-bolder m-0"},[t._v(" Đã thanh toán: "+t._s(t.infoLoan.period_is_paid)+"/"+t._s(t.infoLoan.total_period)+" kỳ ")]),"mobile"===t.$detect?a("div",{staticClass:"filter",on:{click:function(e){t.dialog=!0}}},[a("i",{staticClass:"h3 icon ion-md-funnel"})]):t._e()])]),"mobile"===t.$detect?a("ldc-model-mobile",{attrs:{titileCancel:"Hủy",showCancel:!1,showTitle:!0,title:"Tìm kiếm nâng cao",customButton:!0,visible:t.dialog},on:{"update:visible":function(e){t.dialog=e}}},[a("div",{attrs:{slot:"content-model"},slot:"content-model"},[a("div",{staticClass:"d-flex p-2"},[a("div",{staticClass:"mr-1 input-mb w-50"},[a("p",{staticClass:"font-weight-bolder mb-2 text-left"},[t._v("Từ ngày")]),a("div",{staticClass:"position-relative"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.date.date_from,expression:"date.date_from"}],staticClass:"form-control input-mobile size-input rounded bg-white pl-2 input-date",staticStyle:{width:"100%",height:"30px"},attrs:{type:"date"},domProps:{value:t.date.date_from},on:{input:function(e){e.target.composing||t.$set(t.date,"date_from",e.target.value)}}}),t.isShowPlhd1?a("span",{staticClass:"position-absolute"},[t._v("Từ ngày")]):t._e()])]),a("div",{staticClass:"ml-1 input-mb w-50"},[a("p",{staticClass:"font-weight-bolder mb-2 text-left"},[t._v("Đến ngày")]),a("div",{staticClass:"position-relative"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.date.date_to,expression:"date.date_to"}],staticClass:"form-control input-mobile size-input rounded bg-white pl-2 input-date",staticStyle:{width:"100%",height:"30px"},attrs:{type:"date"},domProps:{value:t.date.date_to},on:{input:function(e){e.target.composing||t.$set(t.date,"date_to",e.target.value)}}}),t.isShowPlhd2?a("span",{staticClass:"position-absolute"},[t._v("Đến ngày")]):t._e()])])])]),a("div",{attrs:{slot:"custom-buttom"},slot:"custom-buttom"},[a("div",{class:{"btn-confirm-android":t.$isAndroid,"btn-confirm-ios mb-10px btn-custom-ios":!t.$isAndroid}},[a("button",{staticClass:"btn btn-primary radius-ios text-uppercase mr-10px fs-14px btn-apply",attrs:{"close-model-mobile":""},on:{click:function(e){return t.searchDate()}}},[t._v("áp dụng")]),a("button",{staticClass:"btn btn-light radius-ios text-uppercase ml-10px fs-14px btn-cancel",attrs:{"close-model-mobile":""},on:{click:function(e){return t.clearFilter()}}},[t._v("Bỏ lọc")])])])]):t._e(),a("div",{staticClass:"border-bottom mt-2"},[a("div",{staticClass:"table-responsive"},[a("table",{class:{"table table-striped":!0,"table-mobile":"mobile"===t.$detect}},[t._m(0),a("tbody",[t._l(t.loans,(function(e,s){return a("tr",{key:s},[a("td",[t._v(t._s(s+1))]),a("td",[t._v(t._s(e.payment_amount))]),a("td",[t._v(t._s(e.data_user_pay?e.data_user_pay.method:""))]),a("td",[t._v(t._s(e.payment_term))]),a("td",[t._v(t._s(e.payment_term))]),a("td",["OUT_OF_DATE"==e.status?a("span",[t._v("Quá hạn")]):t._e(),"DEADLINE"==e.status?a("span",[t._v("Đến hạn")]):t._e(),"UNPAID"==e.status?a("span",[t._v("Chưa thanh toán")]):t._e(),"PAID"==e.status?a("span",[t._v("Đã thanh toán")]):t._e()]),a("td",{staticClass:"text-center"},[t._v(t._s(e.loan_delay))]),("UNPAID"==e.status||e.status,a("td"))])})),a("no-data",{attrs:{data:t.loans,colspan:9}})],2)])])]),a("p",{staticClass:"font-weight-bolder mt-5"},[t._v("Tổng thanh toán: "+t._s(t.$formatNumber(t.infoLoan.amount_paid>=0?t.infoLoan.amount_paid:"")))])],1)]),"web"===t.$detect?a("detailTransaction",{directives:[{name:"show",rawName:"v-show",value:!t.showDetail,expression:"!showDetail"}],attrs:{infoDetail:t.infoDetail}}):t._e()],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("Kỳ")]),a("th",[t._v("Số tiền")]),a("th",[t._v("Phương thức")]),a("th",[t._v("Thời gian")]),a("th",[t._v("Trạng thái")]),a("th",[t._v("Tình trạng")]),a("th",{staticClass:"text-center"},[t._v("Chậm khoản vay")]),a("th",{staticClass:"text-right",staticStyle:{"min-width":"100px"},attrs:{width:"100px"}},[t._v(" Hành động ")])])])}],n=a("1938"),o=a("e467"),r={components:{detailTransaction:o["default"]},props:{propsInfo:{type:Object,default:{}},visible:{type:Boolean,default:!1}},data:function(){return{infoDetail:{},showDetail:!0,dialog:!1,loading:!1,id_loan:"",id_user:"",loans:[],infoLoan:{},date:{date_from:"",date_to:""},isShowPlhd1:!0,isShowPlhd2:!0}},watch:{visible:function(t){t&&(this.id_loan=this.propsInfo.id_loan,this.id_user=this.propsInfo.id_user,this.getDetailLoans(),this.getInfoDetail())},"date.date_from":function(t){this.isShowPlhd1=""==t},"date.date_to":function(t){this.isShowPlhd2=""==t}},created:function(){"mobile"===this.$detect&&(this.id_loan=this.propsInfo.id_loan,this.id_user=this.propsInfo.id_user,this.getDetailLoans(),this.getInfoDetail())},methods:{getDetailLoans:function(){var t=this,e={id_user:this.id_user,loan_id:this.id_loan};Object(n["a"])(e).then((function(e){t.loans=e.data.data}))},getInfoDetail:function(){var t=this;Object(n["b"])(this.id_loan).then((function(e){e.data.success===API_STATUS_SUCCESS?t.infoLoan=e.data.data:t.$showMessage(e.data.message,"warning")}))},searchDate:function(){var t=this;if(this.loading=!0,""===this.date.date_from||""===this.date.date_to)return this.$showMessage("Vui lòng nhập đầy đủ ngày tháng!","warning"),void(this.loading=!1);var e={id_user:this.id_user,loan_id:this.id_loan,date_from:this.date.date_from,date_to:this.date.date_to};Object(n["a"])(e).then((function(e){e.data.success===API_STATUS_SUCCESS?t.loans=e.data.data:t.$showMessage(e.data.message,"warning")})),this.loading=!1},goDetail:function(t,e){"web"===e?(this.showDetail=!this.showDetail,this.infoDetail=t):this.$router.push({name:"formLoans-detail",query:{infoDetail:t}})},clearFilter:function(){this.date.date_from="",this.date.date_to="",this.getDetailLoans()}}},l=r,c=(a("2b16"),a("2877")),d=Object(c["a"])(l,s,i,!1,null,null,null);e["default"]=d.exports},bc8e:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"loan-show container-fluid"},[a("div",{staticClass:"px-md-5 py-4 bg-light"},[a("label",{staticClass:"font-weight-bolder"},[t._v("Tra cứu thông tin")]),a("div",{staticClass:"d-flex justify-content-between align-items-start"},[a("div",{staticClass:"input-group position-relative"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.keyword_search,expression:"keyword_search"}],staticClass:"form-control mr-2 rounded",class:{"is-invalid":t.errors.keyword},attrs:{placeholder:"Số điện thoại/CCCD",type:"text"},domProps:{value:t.keyword_search},on:{input:[function(e){e.target.composing||(t.keyword_search=e.target.value)},t.setKeyword],keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchIdUser()}}}),""!==t.keyword_search?a("span",{staticClass:"position-absolute",staticStyle:{top:"50%",right:"15px",transform:"translateY(-50%)","z-index":"10"},on:{click:function(e){t.keyword_search=""}}},[a("i",{staticClass:"icon ion-md-close-circle-outline",staticStyle:{color:"#d5d5d5","font-size":"18px"}})]):t._e(),a("form-invalid",{attrs:{error:t.errors.keyword}})],1),a("button",{staticClass:"btn btn-primary",style:"web"===t.$detect?"width: 300px;":"width:150px",attrs:{disabled:""===t.keyword_search},on:{click:function(e){return t.searchIdUser()}}},[t._v("Tìm kiếm")])])]),a("p",{staticClass:"h5 mt-5 text-center text-secondary",attrs:{hidden:t.ischeck}},[t._v("Không tìm thấy người dùng!!!")]),t.id_user?a("div",[a("div",{staticClass:"d-flex align-items-center p-md-5 mt-md-0 mt-2"},[a("div",{class:{"avatar d-flex align-items-center rounded-circle overflow-hidden flex-shrink-0 flex-grow-0":!0,"mr-3":"mobile"===t.$detect,"mr-5":"web"===t.$detect},style:"web"===t.$detect?"width: 132px; height: 132px;":"width: 100px; height: 100px;"},[a("img",{attrs:{src:t.$getUrlImage(t.infoUser.avatar),width:"100%"},on:{error:t.$errorImage}})]),a("div",[a("p",{class:{"h3 font-weight-bolder m-0":"web"===t.$detect,"h5 font-weight-bolder m-0":"mobile"===t.$detect}},[t._v(" "+t._s(t.infoUser.name))]),a("p",{staticClass:"m-0"},[t._v(t._s(t.infoUser.email))]),a("p",{staticClass:"m-0"},[t._v(t._s(t.infoUser.phone))])])]),a("div",{staticClass:"bg-light p-md-5 py-3 mt-md-0 mt-3"},[a("p",{staticClass:"col-12 font-weight-bolder p-0 mb-3"},[t._v("Thông tin ứng lương")]),a("div",{staticClass:"table-responsive"},[a("table",{class:{"table table-striped":!0,"table-mobile":"mobile"===t.$detect}},[t._m(0),a("tbody",[t._l(t.loans,(function(e,s){return a("tr",{key:s},[a("td",[t._v(t._s(s+1))]),a("td",[t._v(t._s(e.loan))]),a("td",[t._v(t._s(e.disbursement_date))]),a("td",[t._v(t._s(e.type))]),e.show?a("td",{staticClass:"text-right"},["web"===t.$detect?a("button",{staticClass:"btn btn-primary",on:{click:function(a){return t.goDetail(e,"web")}}},[t._v(" Chi tiết ")]):a("button",{staticClass:"btn btn-primary",on:{click:function(a){return t.goDetail(e,"mobile")}}},[t._v(" Chi tiết ")])]):a("td")])})),a("no-data",{attrs:{data:t.loans,colspan:5}})],2)])])]),a("div",{staticClass:"px-md-5 py-4 mt-4 bg-light"},[a("label",{staticClass:"font-weight-bolder"},[t._v("Lưu lịch sử CSKH")]),a("div",{staticClass:"d-flex justify-content-between align-items-start"},[a("div",{staticClass:"input-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],staticClass:"form-control mr-2",class:{"is-invalid":t.errors.content},attrs:{disabled:!t.$myCanUpdate(),placeholder:"Nội dung",type:"text"},domProps:{value:t.content},on:{input:function(e){e.target.composing||(t.content=e.target.value)}}}),a("form-invalid",{attrs:{error:t.errors.content}})],1),a("button",{staticClass:"btn btn-success",style:"web"===t.$detect?"width: 300px;":"width:150px",attrs:{disabled:!t.$myCanUpdate()},on:{click:function(e){return t.addCustomerCare()}}},[t._v("Lưu")])]),a("div",{staticClass:"col-12 border-bottom mt-4 p-0"},[a("div",{staticClass:"table-responsive"},[a("table",{class:{"table table-cutomer-care table-striped":!0,"table-care-history-mobile":"mobile"===t.$detect}},[t._m(1),a("tbody",[t._l(t.customer_care_list,(function(e,s){return a("tr",{key:s},[a("td",[t._v(t._s(s+1))]),a("td",[t._v(t._s(e.userCare?e.userCare.data.name:""))]),a("td",[t._v(t._s(e.time_created))]),a("td",{staticClass:"text-break"},[t._v(t._s(e.content))])])})),a("no-data",{attrs:{data:t.customer_care_list,colspan:4}})],2)])]),a("div",{staticClass:"d-flex justify-content-end"},[a("ldc-pagination",{staticClass:"pt-4",attrs:{current_page:t.page,last_page:t.totalPages,scroll_top:!1,callData:t.changePage}})],1)])])]):t._e(),"web"===t.$detect?a("detailLoan",{attrs:{visible:t.dialogDetail,infoLoan:t.infoLoan},on:{"update:visible":function(e){t.dialogDetail=e}}}):t._e()],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("STT")]),a("th",[t._v("Số tiền ứng")]),a("th",[t._v("Thời gian")]),a("th",[t._v("Trạng thái")]),a("th",{staticClass:"text-center",attrs:{width:"100px"}},[t._v("Chi tiết")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("STT")]),a("th",[t._v("Admin Note")]),a("th",[t._v("Thời gian")]),a("th",[t._v("Nội dung CSKH")])])])}],n=(a("d3b7"),a("3ca3"),a("ddb0"),a("1da1")),o=(a("96cf"),a("e63b")),r=function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["b"])("/admin/v1/user/search-user",e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),l=function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["b"])("/admin/v1/customer-care-history",e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),c=function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["c"])("/admin/v1/customer-care-history",e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),d=a("1938"),u={components:{detailLoan:function(){return Promise.resolve().then(a.bind(null,"63e4"))}},data:function(){return{ischeck:!0,errors:{},loading:!1,content:"",infoUser:{},infoLoan:{},loans:[],customer_care_list:[],dialogDetail:!1,id:"",id_user:"",page:0,totalPages:0,keyword_search:this.$route.query.keyword?this.$route.query.keyword:""}},created:function(){this.keyword_search&&this.getIdUser()},methods:{setKeyword:function(t){t&&(this.keyword_search=t.target.value)},getIdUser:function(){var t=this;this.errors={};var e=this.setQuery();r(e).then((function(e){e.data.success===API_STATUS_SUCCESS&&(t.id_user=e.data.data.id,t.infoUser=e.data.data,t.getLoans(),t.getCustomerCare(),t.ischeck=!0)})).catch((function(e){t.ischeck=!1,t.id_user=""}))},getLoans:function(){var t=this;Object(d["c"])({id_user:this.id_user}).then((function(e){t.loans=e.data.data.data}))},searchIdUser:function(){this.getIdUser(),this.changeUrl()},setQuery:function(){var t={};return""!==this.keyword_search&&(t.keyword=this.keyword_search),t},getCustomerCare:function(){var t=this,e={};""!==this.id_user&&(e.id_user=this.id_user),this.page>1&&(e.page=this.page),l(e).then((function(e){if(e.data.success===API_STATUS_SUCCESS){t.customer_care_list=e.data.data.data;var a=e.data.data.meta.pagination;t.page=a.current_page,t.totalPages=a.total_pages}}))},addCustomerCare:function(){var t=this;if($myCanUpdate()){this.errors={};var e={id_user:this.id_user,content:this.content};c(e).then((function(e){e.data.success===API_STATUS_SUCCESS&&(t.$showMessage(e.data.message,"success"),t.page=1,t.content="",t.getCustomerCare())})).catch((function(e){t.requestError(e)}))}},changePage:function(t){this.page=t,this.getCustomerCare()},changeUrl:function(){this.$router.push({name:"customer-care",query:this.setQuery()})},goDetail:function(t,e){"web"===e?(this.infoLoan={id_loan:t.id,id_user:t.id_user},this.dialogDetail=!0):this.$router.push({name:"customer-care-detail",query:{redirect:this.$encodeRedirect(this.setQuery()),id_loan:t.id,id_user:t.id_user}})},requestError:function(t){t.status===HTTP_CODE_GONE?this.$showMessage(t.data.data.message,"warning"):t.status===HTTP_CODE_UNPROCESSABLE_ENTITY&&(this.errors=t.data.data.data)}}},h=u,f=(a("10ed"),a("2877")),_=Object(f["a"])(h,s,i,!1,null,null,null);e["default"]=_.exports},c157:function(t,e,a){},d0f1:function(t,e,a){},e467:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"loan-detail"},["web"===t.$detect?a("div",[a("p",{staticClass:"font-weight-bolder"},[t._v("Chi tiết thanh toán kỳ 5 ( - 01/11/2021)")]),a("div",{staticClass:"d-flex justify-content-between p-3"},[a("div",{staticClass:"w-50"},[a("div",{staticClass:"d-flex"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Thời gian thanh toán")]),a("p",[t._v(" "+t._s(t.infoDetail.payment_term)+" ")])]),a("div",{staticClass:"d-flex"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Số tiền phải trả")]),a("p",[t._v(t._s(t.infoDetail.payment_amount))])]),t._m(0),t._m(1)]),a("div",{staticClass:"w-50"},[a("div",{staticClass:"d-flex"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Số ngày chậm")]),a("p",[t._v(t._s(t.infoDetail.overdue_day))])]),t._m(2),t._m(3)])]),a("div",{staticClass:"bg-light d-flex p-3 mt-3"},[a("div",{staticClass:"w-50"},[a("p",{staticClass:"font-weight-bolder"},[t._v("Ảnh thanh toán")]),a("div",{staticClass:"img d-flex align-items-center",staticStyle:{width:"250px",height:"160px",overflow:"hidden"}},[a("img",{staticStyle:{width:"100%"},attrs:{src:t.$getUrlImage(""),alt:""}})])]),t._m(4)])]):a("div",{staticClass:"p-md-5 p-2 transaction-details"},[a("p",{staticClass:"font-weight-bolder"},[t._v("Chi tiết thanh toán kỳ 5 ( - 01/11/2021)")]),a("div",{staticClass:"d-md-flex justify-content-between"},[a("div",{staticClass:"w-50 form-box"},[a("div",{staticClass:"d-flex"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Thời gian thanh toán")]),a("p",{staticClass:"w-50"},[t._v(t._s(t.infoDetailMb.payment_term)+" ")])]),a("div",{staticClass:"d-flex"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Số tiền phải trả")]),a("p",{staticClass:"w-50"},[t._v(t._s(t.infoDetailMb.payment_amount))])]),t._m(5),t._m(6)]),a("div",{staticClass:"w-50 form-box"},[a("div",{staticClass:"d-flex"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Số ngày chậm")]),a("p",{staticClass:"w-50"},[t._v(t._s(t.infoDetailMb.overdue_day))])]),t._m(7),t._m(8)])]),a("div",{staticClass:"bg-light d-md-flex p-md-3 py-2 mt-3"},[a("div",{staticClass:"w-50 form-box"},[a("p",{staticClass:"font-weight-bolder mb-2"},[t._v("Ảnh thanh toán")]),a("div",{staticClass:"img d-flex align-items-center",staticStyle:{width:"250px",height:"160px",overflow:"hidden"}},[a("img",{staticStyle:{width:"100%"},attrs:{src:t.$getUrlImage(""),alt:""}})])]),t._m(9)])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Đã thanh toán")]),a("p")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Trạng thái")]),a("p",[t._v("Hoàn tất")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Số tiền thực tế cần trả")]),a("p",[t._v("10.200.000")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Ngày phát sinh khoản vay")]),a("p",[t._v("10:00 01/10/2021")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"w-50"},[a("div",{staticClass:"d-flex"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Tên phương thức")]),a("p",[t._v("Ví Momo")])]),a("div",{staticClass:"d-flex mt-1"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Ngân hàng")]),a("p",[t._v("VIB VIB VIB VIB VIB")])]),a("div",{staticClass:"d-flex mt-1"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Số tài khoản")]),a("p",[t._v("12345678901234567890")])]),a("div",{staticClass:"d-flex mt-1"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Chủ tài khoản")]),a("p",[t._v("Nguyễn Văn A")])]),a("div",{staticClass:"d-flex mt-1"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Nội dung chuyển khoản")]),a("p",{staticClass:"w-50"},[t._v("N ộ i d u n g")])]),a("div",{staticClass:"d-flex mt-1"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Thời gian")]),a("p",[t._v("10:00 10/01/2021")])]),a("div",{staticClass:"d-flex mt-1"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Chi nhánh")]),a("p",[t._v("Hà Nội")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Đã thanh toán")]),a("p",{staticClass:"w-50"},[t._v("1.000.000")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Trạng thái")]),a("p",{staticClass:"w-50"},[t._v("Hoàn tất")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Số tiền thực tế cần trả")]),a("p",{staticClass:"w-50"},[t._v("10.200.000")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Ngày phát sinh khoản vay")]),a("p",{staticClass:"w-50"},[t._v("10:00 01/10/2021")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"w-50 form-box mt-2"},[a("div",{staticClass:"d-flex"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Tên phương thức")]),a("p",{staticClass:"w-50"},[t._v("Ví Momo")])]),a("div",{staticClass:"d-flex mt-1"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Ngân hàng")]),a("p",{staticClass:"w-50"},[t._v("VIB VIB VIB VIB VIB")])]),a("div",{staticClass:"d-flex mt-1"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Số tài khoản")]),a("p",{staticClass:"w-50"},[t._v("12345678901234567890")])]),a("div",{staticClass:"d-flex mt-1"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Chủ tài khoản")]),a("p",{staticClass:"w-50"},[t._v("Nguyễn Văn A")])]),a("div",{staticClass:"d-flex mt-1"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Nội dung chuyển khoản")]),a("p",{staticClass:"w-50"},[t._v("N ộ i d u n g")])]),a("div",{staticClass:"d-flex mt-1"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Thời gian")]),a("p",{staticClass:"w-50"},[t._v("10:00 10/01/2021")])]),a("div",{staticClass:"d-flex mt-1"},[a("p",{staticClass:"font-weight-bolder w-50"},[t._v("Chi nhánh")]),a("p",{staticClass:"w-50"},[t._v("Hà Nội")])])])}],n={props:{infoDetail:{type:Object,default:function(){return{}}}},data:function(){return{loading:!1,infoDetailMb:{}}},created:function(){"mobile"===this.$detect&&(this.infoDetailMb=this.$route.query.infoDetail)}},o=n,r=(a("43e3"),a("2877")),l=Object(r["a"])(o,s,i,!1,null,null,null);e["default"]=l.exports},e931:function(t,e,a){}}]);
//# sourceMappingURL=customer-care.adc971e5.js.map