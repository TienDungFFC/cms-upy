(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["expertise-2-show"],{"2b48":function(t,e,a){"use strict";a.d(e,"e",(function(){return i})),a.d(e,"c",(function(){return s})),a.d(e,"b",(function(){return r})),a.d(e,"f",(function(){return l})),a.d(e,"d",(function(){return c})),a.d(e,"a",(function(){return m}));var n=a("1da1"),o=(a("96cf"),a("e63b")),i=function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["b"])("/admin/v1/loan/expertise2",e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),s=function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["b"])("/admin/v1/loan/expertise2/".concat(e));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),r=function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["b"])("/admin/v1/loan/expertise2/".concat(e,"/check_cic"));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),l=function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e,a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["c"])("/admin/v1/loan/expertise2/".concat(e,"/browser_loan"),a);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}(),c=function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e,a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["c"])("/admin/v1/loan/expertise2/".concat(e,"/refuse_loan"),a);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}(),m=function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e,a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["c"])("/admin/v1/loan/expertise2/".concat(e,"/back_expertise1"),a);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()},5273:function(t,e,a){},7426:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-fluid expertise-2_detail py-3"},[a("div",{staticClass:"row"},[a("div",{class:"web"===t.$detect?"col-6":"col-12"},[a("div",{staticClass:"d-flex"},[a("div",{class:{"mr-3 avatar":!0,"flex-grow-0 flex-shrink-0":"mobile"===t.$detect}},[a("imageBlock",{attrs:{url:t.$getUrlImage(t.user.avatar),edit:!1}})],1),a("div",{class:{"d-flex flex-column align-items-left justify-content-center overflow-hidden":!0,"pl-4":"web"===t.$detect,"pl-0":"mobile"===t.$detect}},[a("h3",{class:{"h5 font-weight-bold":"mobile"===t.$detect}},[t._v(t._s(t.user.name))]),a("p",{staticClass:"mb-2 overflow-hidden",staticStyle:{"text-overflow":"ellipsis"}},[t._v(t._s(t.user.email))]),a("p",{class:"web"===t.$detect?"mb-0":"mb-2"},[t._v(t._s(t.user.phone))]),t.information.is_employee?t._e():a("p",{class:{"mt-2 mb-0":"web"===t.$detect,"mb-2":"mobile"===t.$detect,"text-danger":!0}},[t._v(" Không thuộc danh sách nhân viên công ty hiện có ")]),"mobile"===t.$detect?a("p",{staticClass:"mb-0"},[t._v("Số lần ứng lương: "+t._s(t.total))]):t._e()])])]),"web"===t.$detect?a("div",{staticClass:"col-6"},[a("div",{staticClass:"text-right"},[t._v(" Số lần ứng lương: "+t._s(t.total)+" ")])]):t._e()]),a("div",{staticClass:"row mt-4 mx-0 rounded px-0 px-lg-4 py-2 py-lg-5 shadow-sm bg-light"},[a("div",{staticClass:"col-12 mb-2 mb-lg-5"},[a("div",{staticClass:"d-flex align-items-lg-center flex-column flex-lg-row justify-content-between"},[a("h4",{staticClass:"mb-0 font-weight-bold"},[t._v("Thông tin")]),a("p",{staticClass:"mb-0"},[t._v("Cập nhật lần cuối "+t._s(t.time_updated))])])]),a("div",{staticClass:"col-12"},[a("form",[a("div",{staticClass:"form-group row"},[a("label",{staticClass:"font-weight-bold col-form-label col-12 col-lg-2"},[t._v("Số tiền cần ứng")]),a("div",{staticClass:"col-12 col-lg-10"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.information.loan,expression:"information.loan"}],staticClass:"form-control size-input",attrs:{type:"text",placeholder:"Số tiền cần ứng",readonly:""},domProps:{value:t.information.loan},on:{input:function(e){e.target.composing||t.$set(t.information,"loan",e.target.value)}}})])]),a("div",{staticClass:"form-group row"},[a("label",{staticClass:"font-weight-bold col-form-label col-12 col-lg-2"},[t._v("Công ty")]),a("div",{staticClass:"col-12 col-lg-10"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.information.name_business,expression:"information.name_business"}],staticClass:"form-control size-input",attrs:{type:"text",placeholder:"Công ty",readonly:""},domProps:{value:t.information.name_business},on:{input:function(e){e.target.composing||t.$set(t.information,"name_business",e.target.value)}}}),t.id&&!t.information.name_business?a("div",{staticClass:"text-danger mt-2"},[t._v(" Không thuộc danh sách công ty hiện có ")]):t._e()])]),t.information.name_employee?a("div",{staticClass:"form-group row"},[a("label",{staticClass:"font-weight-bold col-form-label col-12 col-lg-2"},[t._v("Họ tên")]),a("div",{staticClass:"col-12 col-lg-10"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.information.name_employee,expression:"information.name_employee"}],staticClass:"form-control size-input",attrs:{type:"text",placeholder:"Họ tên",readonly:""},domProps:{value:t.information.name_employee},on:{input:function(e){e.target.composing||t.$set(t.information,"name_employee",e.target.value)}}})])]):t._e(),t.information.email_employee?a("div",{staticClass:"form-group row"},[a("label",{staticClass:"font-weight-bold col-form-label col-12 col-lg-2"},[t._v("Email")]),a("div",{staticClass:"col-12 col-lg-10"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.information.email_employee,expression:"information.email_employee"}],staticClass:"form-control size-input",attrs:{type:"text",placeholder:"Email",readonly:""},domProps:{value:t.information.email_employee},on:{input:function(e){e.target.composing||t.$set(t.information,"email_employee",e.target.value)}}})])]):t._e(),t.information.phone_employee?a("div",{staticClass:"form-group row"},[a("label",{staticClass:"font-weight-bold col-form-label col-12 col-lg-2"},[t._v("Số điện thoại")]),a("div",{staticClass:"col-12 col-lg-10"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.information.phone_employee,expression:"information.phone_employee"}],staticClass:"form-control size-input",attrs:{type:"text",placeholder:"Số điện thoại",readonly:""},domProps:{value:t.information.phone_employee},on:{input:function(e){e.target.composing||t.$set(t.information,"phone_employee",e.target.value)}}})])]):t._e(),a("div",{staticClass:"form-group row"},[a("label",{staticClass:"font-weight-bold col-form-label col-12 col-lg-2"},[t._v("Thu nhập")]),a("div",{staticClass:"col-12 col-lg-10"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.information.income,expression:"information.income "}],staticClass:"form-control size-input",attrs:{type:"text",placeholder:"Thu nhập",readonly:""},domProps:{value:t.information.income},on:{input:function(e){e.target.composing||t.$set(t.information,"income",e.target.value)}}}),t.information.salary_employee?a("div",{staticClass:"text-danger mt-2"},[t._v(" Thu nhập công ty cung cấp: "+t._s(t.information.salary_employee)+" ")]):t._e()])]),a("div",{staticClass:"form-group row"},[a("label",{staticClass:"font-weight-bold col-form-label col-12 col-lg-2"},[t._v("Tên ngân hàng")]),a("div",{staticClass:"col-12 col-lg-10"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.information.bank,expression:"information.bank"}],staticClass:"form-control size-input",attrs:{type:"text",placeholder:"Tên ngân hàng",readonly:""},domProps:{value:t.information.bank},on:{input:function(e){e.target.composing||t.$set(t.information,"bank",e.target.value)}}})])]),a("div",{staticClass:"form-group row"},[a("label",{staticClass:"font-weight-bold col-form-label col-12 col-lg-2"},[t._v("Tên chủ thẻ")]),a("div",{staticClass:"col-12 col-lg-10"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.information.bank_name,expression:"information.bank_name"}],staticClass:"form-control size-input",attrs:{type:"text",placeholder:"Tên chủ thẻ",readonly:""},domProps:{value:t.information.bank_name},on:{input:function(e){e.target.composing||t.$set(t.information,"bank_name",e.target.value)}}})])]),a("div",{staticClass:"form-group row"},[a("label",{staticClass:"font-weight-bold col-form-label col-12 col-lg-2"},[t._v("Số tài khoản ngân hàng")]),a("div",{staticClass:"col-12 col-lg-10"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.information.bank_number,expression:"information.bank_number"}],staticClass:"form-control size-input",attrs:{type:"text",placeholder:"Số tài khoản ngân hàng",readonly:""},domProps:{value:t.information.bank_number},on:{input:function(e){e.target.composing||t.$set(t.information,"bank_number",e.target.value)}}})])])])]),a("div",{staticClass:"col-12"},[a("div",{staticClass:"d-flex flex-column flex-lg-row mt-2 mt-lg-5"},[a("div",{staticClass:"atm-card"},[a("p",{staticClass:"mb-2 font-weight-bolder"},[t._v("Ảnh thẻ ngân hàng")]),a("div",{staticClass:"card-image"},[a("imageBlock",{attrs:{url:t.$getUrlImage(t.information.bank_image),edit:!1}})],1)]),a("div",{staticClass:"d-flex flex-column ml-lg-5 pl-lg-5 mt-lg-4 pt-2"},[a("kyc",{attrs:{id:"information",disabled:"REFUSE"===t.type||!t.$myCanExpertise()},model:{value:t.information.status_check,callback:function(e){t.$set(t.information,"status_check",e)},expression:"information.status_check"}}),t.information.status_check?t._e():a("note-fail",{attrs:{disabled:"REFUSE"===t.type||!t.$myCanExpertise(),error:t.errors.list_steps},model:{value:t.information.note_fail,callback:function(e){t.$set(t.information,"note_fail",e)},expression:"information.note_fail"}})],1)])])]),a("div",[a("div",{staticClass:"p-2 p-lg-5 mt-3 mt-lg-5 d-flex flex-wrap rounded shadow-sm bg-light"},[a("p",{staticClass:"mb-3 font-weight-bolder h5 w-100"},[t._v("Thông tin OCR")]),a("div",{class:{"w-100":"mobile"===t.$detect}},[a("div",[a("p",{staticClass:"mb-2 font-weight-bolder"},[t._v("Ảnh căn cước công dân mặt trước")]),a("div",{staticClass:"card-image"},[a("imageBlock",{attrs:{url:t.$getUrlImage(t.ocr.frontside_identity_card),edit:!1}})],1)]),a("div",{staticClass:"mt-3 mt-lg-5"},[a("p",{staticClass:"mb-2 font-weight-bolder"},[t._v("Ảnh căn cước công dân mặt sau")]),a("div",{staticClass:"card-image"},[a("imageBlock",{attrs:{url:t.$getUrlImage(t.ocr.backside_identity_card),edit:!1}})],1)])]),a("div",{class:{"ml-lg-5 pl-lg-5":!0,"w-100":"mobile"===t.$detect}},[a("table",{staticClass:"table",staticStyle:{width:"300px"}},[a("tbody",[a("tr",[a("td",{staticClass:"font-weight-bolder "},[t._v("Số căn cước")]),a("td",[t._v(t._s(t.ocr.id_number))])]),a("tr",[a("td",{staticClass:"font-weight-bolder "},[t._v("Họ và Tên")]),a("td",[t._v(t._s(t.ocr.name))])]),a("tr",[a("td",{staticClass:"font-weight-bolder "},[t._v("Ngày sinh")]),a("td",[t._v(t._s(t.ocr.birthday))])]),a("tr",[a("td",{staticClass:"font-weight-bolder "},[t._v("Giới tính")]),a("td",[1===t.ocr.sex?a("span",[t._v("Nam")]):a("span",[t._v("Nữ")])])]),a("tr",[a("td",{staticClass:"font-weight-bolder "},[t._v("Quê quán")]),a("td",[t._v(t._s(t.ocr.home_town))])]),a("tr",[a("td",{staticClass:"font-weight-bolder "},[t._v("Ngày cấp")]),a("td",[t._v(t._s(t.ocr.date_range))])]),a("tr",[a("td",{staticClass:"font-weight-bolder "},[t._v("Nơi cấp")]),a("td",[t._v(t._s(t.ocr.issued_by))])])])]),a("div",{staticClass:"d-flex flex-column mt-2 ml-lg-1 pt-lg-3 pl-lg-2"},[a("kyc",{attrs:{id:"ocr",disabled:"REFUSE"===t.type||!t.$myCanExpertise()},model:{value:t.ocr.status_check,callback:function(e){t.$set(t.ocr,"status_check",e)},expression:"ocr.status_check"}}),t.ocr.status_check?t._e():a("note-fail",{attrs:{disabled:"REFUSE"===t.type||!t.$myCanExpertise(),error:t.errors.list_steps},model:{value:t.ocr.note_fail,callback:function(e){t.$set(t.ocr,"note_fail",e)},expression:"ocr.note_fail"}})],1)])]),a("div",{staticClass:"p-2 p-lg-5 mt-3 mt-lg-5 d-flex flex-column flex-lg-row bg-light rounded shadow-sm"},[a("div",{staticClass:"mr-5",staticStyle:{width:"278px"}},[a("p",{staticClass:"mb-2 font-weight-bolder"},[t._v("Ảnh chân dung")]),a("div",{staticClass:"card-image portrait-image"},[a("imageBlock",{attrs:{url:t.$getUrlImage(t.portrait.image_portrait),edit:!1}})],1)]),a("div",{staticClass:"d-flex flex-column mt-3 mt-lg-0 ml-lg-3 pl-lg-5"},[a("p",{staticClass:"font-weight-bold mb-2"},[t._v(" Tỉ lệ trùng khớp: "),a("span",{staticClass:"text-success"},[t._v(t._s(t.portrait.match_rate)+"%")])]),a("kyc",{attrs:{id:"portrait",disabled:"REFUSE"===t.type||!t.$myCanExpertise()},model:{value:t.portrait.status_check,callback:function(e){t.$set(t.portrait,"status_check",e)},expression:"portrait.status_check"}}),t.portrait.status_check?t._e():a("note-fail",{attrs:{disabled:"REFUSE"===t.type||!t.$myCanExpertise(),error:t.errors.list_steps},model:{value:t.portrait.note_fail,callback:function(e){t.$set(t.portrait,"note_fail",e)},expression:"portrait.note_fail"}})],1)]),t.company_logo?a("div",{staticClass:"p-2 p-lg-5 mt-3 mt-lg-5 d-flex flex-column flex-lg-row bg-light rounded shadow-sm"},[a("div",{staticClass:"mr-5",style:"web"===t.$detect?"width:278px":"width: 100%"},[a("p",{staticClass:"mb-2 font-weight-bolder"},[t._v("Ảnh biển công ty")]),a("div",{staticClass:"card-image"},[a("imageBlock",{attrs:{url:t.company_logo.image_company_logo,edit:!1}})],1)]),a("div",{staticClass:"d-flex flex-column ml-lg-3 pl-lg-5 mt-3 mt-lg-4 pt-2"},[a("kyc",{attrs:{id:"company_logo",disabled:"REFUSE"===t.type||!t.$myCanExpertise()},model:{value:t.company_logo.status_check,callback:function(e){t.$set(t.company_logo,"status_check",e)},expression:"company_logo.status_check"}}),t.company_logo.status_check?t._e():a("note-fail",{attrs:{disabled:"REFUSE"===t.type||!t.$myCanExpertise(),error:t.errors.list_steps},model:{value:t.company_logo.note_fail,callback:function(e){t.$set(t.company_logo,"note_fail",e)},expression:"company_logo.note_fail"}})],1)]):t._e(),t.labor_contract?a("div",{staticClass:"p-2 p-lg-5 mt-3 mt-lg-5 d-flex flex-column flex-lg-row bg-light rounded shadow-sm"},[a("div",{staticClass:"mr-lg-5"},[a("p",{staticClass:"mb-2 font-weight-bolder"},[t._v("Ảnh hợp đồng lao động")]),a("div",{staticClass:"d-flex flex-wrap"},t._l(t.labor_contract.image_labor_contract,(function(t,e){return a("div",{key:"labor-"+e,staticClass:"card-image portrait-image mr-2 mb-2"},[a("imageBlock",{attrs:{url:t,edit:!1}})],1)})),0)]),a("div",{staticClass:"d-flex flex-column ml-lg-3 mt-2 mt-lg-4 pt-lg-2"},[a("kyc",{attrs:{id:"labor_contract",disabled:"REFUSE"===t.type||!t.$myCanExpertise()},model:{value:t.labor_contract.status_check,callback:function(e){t.$set(t.labor_contract,"status_check",e)},expression:"labor_contract.status_check"}}),t.labor_contract.status_check?t._e():a("note-fail",{attrs:{disabled:"REFUSE"===t.type||!t.$myCanExpertise(),error:t.errors.list_steps},model:{value:t.labor_contract.note_fail,callback:function(e){t.$set(t.labor_contract,"note_fail",e)},expression:"labor_contract.note_fail"}})],1)]):t._e(),a("div",{staticClass:"d-flex flex-column flex-lg-row px-lg-5 my-5"},[a("button",{staticClass:"btn btn-primary mt-3 mt-lg-0 size-button",on:{click:function(e){return t.checkCIC()}}},[t._v("Check CIC")])]),t.dataCIC?a("div",{staticClass:"bg-light rounded shadow-sm p-lg-5 mt-5"},[a("div",{staticClass:"d-flex"},[t._m(0),a("div",{staticClass:"cic-value ml-4"},[a("p",[t._v(t._s(t.dataCIC.name))]),a("p",{class:t.setColorScore(t.dataCIC.score)},[t._v(t._s(t.dataCIC.score_text))]),a("p",[t._v(t._s(t.dataCIC.address))]),a("p",[t._v(t._s(t.dataCIC.phone_matched?"Có":"Không"))])])])]):t._e(),a("div",{staticClass:"bg-light rounded shadow-sm mt-3 mt-lg-5 p-2 p-lg-5"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-12 ml-auto"},[a("div",{staticClass:"input-group d-flex align-items-center"},[a("span",{class:{"font-weight-bold mr-3":!0,"w-100":"mobile"==t.$detect}},[t._v("Hạn mức")]),a("div",{class:{"form-group d-flex align-items-center mb-0 mt-2 mt-lg-0":!0,"w-100 justify-content-between":"mobile"===t.$detect}},[a("div",{staticClass:"position-relative flex-grow-1 text-center text-lg-left"},["web"===t.$detect?a("ldc-select",{class:{"is-invalid":t.errors.loan_limit},staticStyle:{width:"100%"},attrs:{placeholder:"Hạn mức",disabled:"REFUSE"===t.type||!t.$myCanExpertise(),filterable:!0,actionKeyBoard:!1},model:{value:t.loan_limit,callback:function(e){t.loan_limit=e},expression:"loan_limit"}},t._l(t.limit_range.options,(function(e,n){return a("ldc-option",{key:n,attrs:{label:e?t.$formatNumber(e):"",value:e}})})),1):a("select",{directives:[{name:"model",rawName:"v-model",value:t.loan_limit,expression:"loan_limit"}],class:{"px-2":!0,"is-invalid":t.errors.loan_limit,"select-ios":!t.$isAndroid,"w-100":"mobile"===t.$detect},attrs:{disabled:"REFUSE"===t.type||!t.$myCanExpertise()},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.loan_limit=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"",disabled:"",hidden:""}},[t._v("Hạn mức")]),t._l(t.limit_range.options,(function(e,n){return a("option",{key:n,domProps:{value:e}},[t._v(" "+t._s(e?t.$formatNumber(e):"")+" ")])}))],2),a("form-invalid",{staticClass:"position-absolute",attrs:{error:t.errors.loan_limit}})],1)])])]),a("div",{staticClass:"col-lg-12 ml-auto mt-3 mt-lg-5"},[a("button",{staticClass:"btn btn-success size-button",style:"web"===t.$detect?"width:200px":"width: 100%",attrs:{disabled:t.loading||"REFUSE"===t.type},on:{click:function(e){return t.passLoan()}}},[t._v(" Duyệt ")]),a("button",{staticClass:"btn btn-danger mx-lg-2 my-3 my-lg-2 size-button",style:"web"===t.$detect?"width:200px":"width: 100%",attrs:{disabled:"REFUSE"===t.type||!t.$myCanExpertise()},on:{click:function(e){return t.failLoan()}}},[t._v(" Từ chối hồ sơ ")]),a("button",{staticClass:"btn btn-warning text-white size-button",style:"web"===t.$detect?"width:200px":"width: 100%",attrs:{disabled:"REFUSE"===t.type||!t.$myCanExpertise()},on:{click:function(e){return t.backToExpertise1()}}},[t._v(" Chuyển về TĐ1 ")])]),a("div",{staticClass:"col-lg-12 mt-3 mb-0 form-group"},[a("div",{staticClass:"form-group mb-0"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.note_fail,expression:"note_fail"}],class:{"form-control":!0,"is-invalid":t.errors.note_fail},attrs:{disabled:"REFUSE"===t.type||!t.$myCanExpertise(),rows:"3",placeholder:"Lý do"},domProps:{value:t.note_fail},on:{input:function(e){e.target.composing||(t.note_fail=e.target.value)}}}),a("form-invalid",{attrs:{error:t.errors.note_fail}})],1)])])])])])},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cic-label"},[a("p",{staticClass:"font-weight-bold"},[t._v("Họ tên:")]),a("p",{staticClass:"font-weight-bold"},[t._v("Tình trạng:")]),a("p",{staticClass:"font-weight-bold"},[t._v("Địa chỉ:")]),a("p",{staticClass:"font-weight-bold"},[t._v("Khớp số điện thoại:")])])}],i=a("1da1"),s=(a("96cf"),a("d3b7"),a("3ca3"),a("ddb0"),a("2b48")),r={components:{imageBlock:function(){return a.e("chunk-7cec0722").then(a.bind(null,"1f7e"))}},data:function(){return{id:this.$route.params.id,user:{},information:{},ocr:{},portrait:{},labor_contract:{},company_logo:{},time_updated:"",loan_limit:"",limit_range:{},dataCIC:null,dialog:!1,itemShow:{},total:0,pageSize:0,totalPages:0,page:this.$route.query.page?parseInt(this.$route.query.page):1,errors:{},note_fail:"",type:"",id_card:"",loading:!1}},computed:{redirect:function(){return this.$store.state.general.redirect}},created:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getData();case 2:t.$eventBus.$on("refresh_expertise2",(function(e){t.goList()}));case 3:case"end":return e.stop()}}),e)})))()},methods:{getData:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(s["c"])(t.id).then((function(e){if(e.data.success===API_STATUS_SUCCESS){var a=e.data;t.user=a.user?a.user.data:{name:a.name_user,phone:a.phone_user},t.time_updated=a.time_updated,t.information=a.infomation,t.information.loan=t.$formatNumber(a.infomation.loan),t.information.income=t.information.income?t.$formatNumber(a.infomation.income):null,t.information.salary_employee=t.information.salary_employee?t.$formatNumber(a.infomation.salary_employee):null,t.labor_contract=a.labor_contract,t.company_logo=a.company_logo,t.ocr=a.ocr,t.portrait=a.portrait,t.limit_range={options:a.limit_range.options},t.loan_limit=a.loan_limit,t.type=a.type}else t.$showMessage(e.data.message,"warning"),t.goList()}));case 2:case"end":return e.stop()}}),e)})))()},checkCIC:function(){var t=this;Object(s["b"])(this.id).then((function(e){if(e.data.success===API_STATUS_SUCCESS){var a=e.data.data;t.dataCIC=a,t.errors={}}else t.$showMessage(e.data.message,"warning"),t.errors.id_card=e.data.message})).catch((function(e){return t.requestError(e)}))},setColorScore:function(t){return t>=350&&t<500?"text-danger":t>=500&&t<600?"text-warning":t>=600&&t<801?"text-primary":t>=801&&t<851?"text-success":void 0},indexMethod:function(t){return t+1+this.pageSize*(this.page-1)},changePage:function(t){this.page=t,this.changeUrl()},changeUrl:function(){this.$router.push({name:"expertise-2",query:this.setQuery()})},setQuery:function(){var t={};return this.page>1&&(t.page=this.page),t},goDetail:function(t){this.itemShow=t,this.dialog=!0},passLoan:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.$myCanExpertise()){e.next=2;break}return e.abrupt("return");case 2:return t.loading=!0,a={},a.loan_limit=t.$stringToNumber(t.loan_limit),a.list_steps={INFORMATION:{pass:t.information.status_check,note_fail:t.information.note_fail},CCCD:{pass:t.ocr.status_check,note_fail:t.ocr.note_fail},PORTRAIT:{pass:t.portrait.status_check,note_fail:t.portrait.note_fail}},t.labor_contract&&(a.list_steps.LABOR_CONTRACT={pass:t.labor_contract.status_check,note_fail:t.labor_contract.note_fail}),t.company_logo&&(a.list_steps.COMPANY_LOGO={pass:t.company_logo.status_check,note_fail:t.company_logo.note_fail}),e.next=10,Object(s["f"])(t.id,a).then((function(e){e.data.success===API_STATUS_SUCCESS?(t.$showMessage(e.data.message,"success"),t.goList()):t.$showMessage(e.data.message,"warning")})).catch((function(e){t.requestError(e)}));case 10:t.loading=!1;case 11:case"end":return e.stop()}}),e)})))()},failLoan:function(){var t=this;if(this.$myCanExpertise()){var e={};this.note_fail&&(e.note_fail=this.note_fail),Object(s["d"])(this.id,e).then((function(e){t.$showMessage(e.data.message,"success"),t.goList()})).catch((function(e){t.requestError(e)}))}},backToExpertise1:function(){var t=this;if(this.$myCanExpertise()){var e={};e.list_steps={INFORMATION:{pass:this.information.status_check,note_fail:this.information.note_fail},CCCD:{pass:this.ocr.status_check,note_fail:this.ocr.note_fail},PORTRAIT:{pass:this.portrait.status_check,note_fail:this.portrait.note_fail}},this.labor_contract&&(e.list_steps.LABOR_CONTRACT={pass:this.labor_contract.status_check,note_fail:this.labor_contract.note_fail}),this.company_logo&&(e.list_steps.COMPANY_LOGO={pass:this.company_logo.status_check,note_fail:this.company_logo.note_fail}),Object(s["a"])(this.id,e).then((function(e){t.$showMessage(e.data.message,"success"),t.goList()})).catch((function(e){t.requestError(e,!0)}))}},requestError:function(t,e){t.status===HTTP_CODE_GONE?this.$showMessage(t.data.message,"warning"):t.status===HTTP_CODE_UNPROCESSABLE_ENTITY&&(e&&this.$showMessage(t.data.data.data.list_steps,"warning"),this.errors=t.data.data.data)},getPathGoList:function(){var t="/expertise-2";return t+this.redirect},goList:function(){this.$router.push({path:this.getPathGoList()})}}},l=r,c=(a("e24f"),a("2877")),m=Object(c["a"])(l,n,o,!1,null,null,null);e["default"]=m.exports},e24f:function(t,e,a){"use strict";a("5273")}}]);
//# sourceMappingURL=expertise-2-show.d59b03a1.js.map