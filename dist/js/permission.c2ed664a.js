(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["permission"],{"08ef":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"permissions_area container-fluid"},[n("div",{staticClass:"d-flex align-items-end justify-content-between flex-wrap py-3"},[n("div",{class:{"d-flex align-items-center justify-content-between":!0,"w-100":"mobile"===e.$detect}},[e.$myCanCreate()?n("router-link",{attrs:{to:e.goCreate()}},[n("button",{staticClass:"btn btn-success"},[e._v(" + Tạo nhóm quyền ")])]):e._e(),"mobile"===e.$detect?n("div",{staticClass:"filter",on:{click:function(t){e.dialog=!0}}},[n("i",{staticClass:"h3 icon ion-md-funnel"})]):e._e()],1),"web"===e.$detect?n("div",{staticClass:"row align-items-end flex-wrap pt-lg-3 pt-xl-0"},[n("div",{staticClass:"col-sm-12 col-md-6 col-lg pt-3 pt-sm-3 pt-lg-0"},[n("label",{staticClass:"font-weight-bold"},[e._v("Từ khoá")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.keyword,expression:"keyword"}],staticClass:"form-control size-input",attrs:{placeholder:"Tìm kiếm"},domProps:{value:e.keyword},on:{input:[function(t){t.target.composing||(e.keyword=t.target.value)},function(t){return e.search()}]}})]),n("div",{staticClass:"col-sm-12 col-md-6 col-lg pt-3 pt-sm-3 pt-lg-0"},[n("label",{staticClass:"font-weight-bold"},[e._v("Loại tài khoản")]),n("ldc-select",{staticClass:"size-input",staticStyle:{width:"100%"},attrs:{placeholder:"Loại tài khoản",actionKeyBoard:!1},on:{change:e.changeActive},model:{value:e.type,callback:function(t){e.type=t},expression:"type"}},e._l(e.optionsType,(function(e){return n("ldc-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),n("div",{staticClass:"col-sm-12 col-md-6 col-lg pt-3 pt-sm-3 pt-lg-0"},[n("label",{staticClass:"font-weight-bold"},[e._v("Trạng thái")]),n("ldc-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Lọc trạng thái",actionKeyBoard:!1},on:{change:e.changeActive},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},e._l(e.optionsActive,(function(e){return n("ldc-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),n("div",{staticClass:"col-sm-12 col-md-6 col-lg-2 pt-3 pt-sm-3 pt-lg-0"},[n("button",{staticClass:"btn btn-secondary",staticStyle:{height:"32px",width:"100%"},attrs:{disabled:""===e.active&&""===e.type&&""===e.keyword},on:{click:function(t){return e.clearFilter()}}},[e._v(" Bỏ lọc ")])])]):e._e()]),"mobile"===e.$detect?n("div",{attrs:{"input-search":""}},[n("div",{staticClass:"position-relative",attrs:{"content-input-search":""}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.keyword,expression:"keyword"}],staticClass:"form-control size-input",attrs:{placeholder:"Tìm kiếm"},domProps:{value:e.keyword},on:{input:[function(t){t.target.composing||(e.keyword=t.target.value)},function(t){return e.search()}],keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getData()}}}),""!==e.keyword?n("span",{staticClass:"position-absolute",staticStyle:{top:"50%",right:"6px",transform:"translateY(-50%)"},on:{click:function(t){return e.clearKeyword()}}},[n("i",{staticClass:"icon ion-md-close-circle-outline",staticStyle:{color:"#d5d5d5","font-size":"18px"}})]):e._e()]),n("ldc-model-mobile",{attrs:{titileCancel:"Hủy",showCancel:!1,showTitle:!0,title:"Tìm kiếm nâng cao",customButton:!0,visible:e.dialog},on:{"update:visible":function(t){e.dialog=t}}},[n("div",{attrs:{slot:"content-model"},slot:"content-model"},[n("ldc-select-show-option",{attrs:{placeholder:"Loại tài khoản"},model:{value:e.type,callback:function(t){e.type=t},expression:"type"}},e._l(e.optionsType,(function(e){return n("ldc-option-show",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),n("ldc-select-show-option",{attrs:{placeholder:"Trạng thái"},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},e._l(e.optionsActive,(function(e){return n("ldc-option-show",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),n("div",{attrs:{slot:"custom-buttom"},slot:"custom-buttom"},[n("div",{class:{"btn-confirm-android":e.$isAndroid,"btn-confirm-ios mb-10px btn-custom-ios":!e.$isAndroid}},[n("button",{staticClass:"btn btn-primary radius-ios text-uppercase mr-10px fs-14px btn-apply",attrs:{"close-model-mobile":""},on:{click:function(t){return e.changeUrl()}}},[e._v("áp dụng")]),n("button",{staticClass:"btn btn-light radius-ios text-uppercase ml-10px fs-14px btn-cancel",attrs:{"close-model-mobile":""},on:{click:function(t){return e.clearFilter()}}},[e._v("Bỏ lọc")])])])])],1):e._e(),n("div",{staticClass:"row"},[n("div",{staticClass:"col-12"},[n("div",{staticClass:"table-responsive"},[n("table",{class:{"table table-striped":!0,"table-mobile":"mobile"===e.$detect}},[n("thead",[n("tr",[n("th",[e._v("ID")]),n("th",[e._v("Tên nhóm")]),n("th",[e._v("Số user")]),"web"===e.$detect?n("th",[e._v("Sửa đổi cuối")]):e._e(),n("th",[e._v("Loại tài khoản")]),n("th",[e._v("Trạng thái")]),n("th",{attrs:{width:"160px"}},[e._v("Hành động")])])]),n("tbody",[e._l(e.permissions,(function(t){return n("tr",{key:t.id},[n("td",[e._v(e._s(t.permission_id))]),n("td",[n("router-link",{staticClass:"format-link",attrs:{to:e.goDetail(t)}},[e._v(" "+e._s(t.permission)+" ")])],1),n("td",[e._v(e._s(t.count_user))]),"web"===e.$detect?n("td",[e._v(e._s(t.time_updated))]):e._e(),n("td",[e._v(e._s(t.type_text))]),n("td",[n("span",{style:1===t.active?"color: #67c23a":"color: #f56c6c"},[e._v(" "+e._s(t.active_text)+" ")])]),n("td",[n("router-link",{attrs:{to:e.goDetail(t)}},[n("button",{staticClass:"btn btn-primary mr-3",attrs:{disabled:e.loading}},[e._v(" Chi tiết ")])]),e.$myCanDelete()?n("button",{staticClass:"btn btn-danger mt-sm-2 mt-md-0",attrs:{disabled:e.loading},on:{click:function(n){return e.destroy(t)}}},[e._v(" Xoá ")]):e._e()],1)])})),n("no-data",{attrs:{data:e.permissions,colspan:"web"===e.$detect?6:5}})],2)])])]),n("div",{staticClass:"col-12"},[n("ldc-pagination",{staticClass:"pt-4 border-top",attrs:{current_page:e.page,last_page:e.totalPages,scroll_top:!0,callData:e.changePage}})],1)])])},r=[],a=n("1da1"),s=(n("96cf"),n("0a01")),o=n("fb12"),c=n("0bc4"),u={data:function(){return{dialog:!1,loading:!1,optionsActive:o["a"],optionsType:s["b"],permissions:[],type:this.$route.query.type?this.$route.query.type:"",page:this.$route.query.page?parseInt(this.$route.query.page):1,pageSize:0,totalPages:0,timeOut:null,active:this.$route.query.active?parseInt(this.$route.query.active):"",keyword:this.$route.query.keyword?this.$route.query.keyword:""}},computed:{query:function(){return this.$route.query}},watch:{query:function(e){this.getData()}},created:function(){this.getData()},methods:{changePage:function(e){this.page=e,this.changeUrl()},changeUrl:function(){this.$router.push({name:"permission",query:this.setQuery()})},setQuery:function(){var e={};return""!==this.active&&(e.active=parseInt(this.active)),""!==this.type&&(e.type=this.type),""!==this.keyword&&(e.keyword=this.keyword),this.page>1&&(e.page=this.page),e},clearFilter:function(){this.keyword="",this.type="",this.active="",this.page=1,this.changeUrl()},clearKeyword:function(){this.keyword="",this.page=1,this.changeUrl()},changeActive:function(){this.page=1,this.changeUrl()},getData:function(){var e=this,t=this.setQuery();Object(c["e"])(t).then((function(t){if(t.data.success===API_STATUS_SUCCESS){e.permissions=t.data.data.data;var n=t.data.data.meta.pagination;e.page=n.current_page,e.pageSize=n.per_page,e.totalPages=n.total_pages}else e.$showMessage(t.data.message,"warning")}))},search:function(){var e=this;this.loading=!0,this.timeOut&&clearTimeout(this.timeOut),this.timeOut=setTimeout((function(){e.page=1,e.changeUrl(),e.loading=!1}),500)},goCreate:function(){return{name:"permission-add",query:{redirect:this.$encodeRedirect(this.setQuery())}}},goDetail:function(e){return{name:"permission-show",params:{id:e.id},query:{redirect:this.$encodeRedirect(this.setQuery())}}},destroy:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.$myCanDelete()){n.next=2;break}return n.abrupt("return");case 2:return n.next=4,t.$confirm("Bạn có chắc chắn xóa nhóm quyền <b>".concat(e.permission,"</b>"),"Xóa nhóm quyền",{confirmButtonText:"Đồng ý",cancelButtonText:"Hủy",type:"error"}).then(Object(a["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.loading=!0,n.next=3,Object(c["b"])(e.id).then((function(e){e.data.data.success===API_STATUS_SUCCESS?(t.$showMessage(e.data.data.message,"success"),t.getData()):t.$showMessage(e.data.data.message,"warning")})).catch((function(e){e.status===HTTP_CODE_GONE&&t.$showMessage(e.data.data.message,"warning")}));case 3:t.loading=!1;case 4:case"end":return n.stop()}}),n)})))).catch((function(e){}));case 4:case"end":return n.stop()}}),n)})))()}}},l=u,d=(n("c763"),n("2877")),p=Object(d["a"])(l,i,r,!1,null,null,null);t["default"]=p.exports},"0a01":function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return a}));var i="ADMIN",r="PARTNER",a=[{value:i,label:"Tài khoản Admin"},{value:r,label:"Tài khoản đối tác"}]},"0bc4":function(e,t,n){"use strict";n.d(t,"e",(function(){return a})),n.d(t,"c",(function(){return s})),n.d(t,"d",(function(){return o})),n.d(t,"a",(function(){return c})),n.d(t,"f",(function(){return u})),n.d(t,"b",(function(){return l}));var i=n("1da1"),r=(n("96cf"),n("e63b")),a=function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(r["b"])("/admin/v1/permission",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),s=function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(r["b"])("/admin/v1/permission/".concat(t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),o=function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(r["b"])("/admin/v1/permission/list_permissions",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),c=function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(r["c"])("/admin/v1/permission",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),u=function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(r["d"])("/admin/v1/permission/".concat(t),n);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),l=function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(r["a"])("/admin/v1/permission/".concat(t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},"156a":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"group_superadmin container-fluid pt-3"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12"},[e.id&&"web"===e.$detect?n("h1",{staticClass:"h5 font-weight-bold"},[e._v("Chi tiết nhóm quyền "+e._s(e.type===e.type_admin?"Admin":"đối tác"))]):e.id||"web"!==e.$detect?e._e():n("h1",{staticClass:"h5 font-weight-bold"},[e._v("Tạo mới nhóm quyền")]),e.id?n("p",[e._v("Số lượng user: "),n("span",[e._v(e._s(e.count_user))])]):e._e()])]),n("form",[n("div",{staticClass:"row"},[n("div",{staticClass:"col-sm-12 col-md-6"},[n("div",{staticClass:"form-group"},[n("label",{staticClass:"font-weight-bold"},[e._v("Tên nhóm")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.permission,expression:"permission"}],class:{"form-control size-input":!0,"is-invalid":e.errors.permission},attrs:{placeholder:"Tên nhóm",disabled:!e.$myCanUpdate()},domProps:{value:e.permission},on:{input:function(t){t.target.composing||(e.permission=t.target.value)}}}),n("form-invalid",{attrs:{error:e.errors.permission}})],1)]),n("div",{staticClass:"col-sm-12 col-md-6"},[n("div",{staticClass:"form-group"},[n("label",{staticClass:"font-weight-bold"},[e._v("Loại tài khoản")]),"web"===e.$detect?n("ldc-select",{class:{"is-invalid":e.errors.type},staticStyle:{width:"100%"},attrs:{placeholder:"Loại tài khoản",disabled:!!e.id,actionKeyBoard:!1},on:{change:e.onChangeType},model:{value:e.type,callback:function(t){e.type=t},expression:"type"}},e._l(e.optionsType,(function(e){return n("ldc-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1):n("select",{directives:[{name:"model",rawName:"v-model",value:e.type,expression:"type"}],class:{disabled:e.id,"is-invalid":e.errors.type,"select-ios":!e.$isAndroid,"form-control size-input":!0},staticStyle:{width:"100%"},attrs:{disabled:!!e.id},on:{change:[function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.type=t.target.multiple?n:n[0]},e.onChangeType]}},[n("option",{attrs:{value:"",disabled:"",hidden:""}},[e._v("Loại tài khoản")]),e._l(e.optionsType,(function(t){return n("option",{key:t.value,domProps:{value:t.value}},[e._v(" "+e._s(t.label)+" ")])}))],2),n("form-invalid",{attrs:{error:e.errors.type}})],1)]),n("div",{staticClass:"col-sm-12 col-md-6"},[n("div",{staticClass:"form-group"},[n("label",{staticClass:"font-weight-bold"},[e._v("Trạng thái")]),"web"===e.$detect?n("ldc-select",{class:{"is-invalid":e.errors.active},staticStyle:{width:"100%"},attrs:{placeholder:"Trạng thái",disabled:!e.$myCanUpdate(),actionKeyBoard:!1},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},e._l(e.options,(function(e){return n("ldc-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1):n("select",{directives:[{name:"model",rawName:"v-model",value:e.active,expression:"active"}],class:{"is-invalid":e.errors.active,"select-ios":!e.$isAndroid,"form-control size-input":!0},staticStyle:{width:"100%"},attrs:{disabled:!e.$myCanUpdate()},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.active=t.target.multiple?n:n[0]}}},[n("option",{attrs:{value:"",disabled:"",hidden:""}},[e._v("Trạng thái")]),e._l(e.options,(function(t){return n("option",{key:t.value,domProps:{value:t.value}},[e._v(" "+e._s(t.label)+" ")])}))],2),n("form-invalid",{attrs:{error:e.errors.active}})],1)])]),n("div",{staticClass:"row form-group"},[e._l(e.groupManages,(function(t,i){return n("div",{key:i,staticClass:"col-sm-12 col-md-6 my-2",class:{"is-invalid":e.errors.id_permission}},[n("div",{staticClass:"mb-2 d-flex align-items-center"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.group[i],expression:"group[index]"}],attrs:{disabled:!e.$myCanUpdate(),id:"permission-"+i,type:"checkbox"},domProps:{value:t,checked:Array.isArray(e.group[i])?e._i(e.group[i],t)>-1:e.group[i]},on:{change:[function(n){var r=e.group[i],a=n.target,s=!!a.checked;if(Array.isArray(r)){var o=t,c=e._i(r,o);a.checked?c<0&&e.$set(e.group,i,r.concat([o])):c>-1&&e.$set(e.group,i,r.slice(0,c).concat(r.slice(c+1)))}else e.$set(e.group,i,s)},function(n){return e.checkAll(t,i)}]}}),n("label",{staticClass:"font-weight-bold pl-2 mb-0",attrs:{for:"permission-"+i}},[e._v(" "+e._s(t.name)+" ")])]),n("div",{class:{"row ml-2":!0,"col pb-2":Object.keys(t.permission_details).length<=3}},e._l(t.permission_details,(function(i,r){return n("div",{key:r,class:{"col-sm-12 col-lg-6 d-flex align-items-center":Object.keys(t.permission_details).length>3,"mr-5 d-flex align-items-center":Object.keys(t.permission_details).length<=3}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.checkList,expression:"checkList"}],attrs:{type:"checkbox",id:r,disabled:!e.$myCanUpdate()},domProps:{value:i.id,checked:Array.isArray(e.checkList)?e._i(e.checkList,i.id)>-1:e.checkList},on:{change:[function(t){var n=e.checkList,r=t.target,a=!!r.checked;if(Array.isArray(n)){var s=i.id,o=e._i(n,s);r.checked?o<0&&(e.checkList=n.concat([s])):o>-1&&(e.checkList=n.slice(0,o).concat(n.slice(o+1)))}else e.checkList=a},function(t){return e.fillCheckAll()}]}}),n("label",{staticClass:"pl-2 mb-0",attrs:{for:r}},[e._v(e._s(i.name))])])})),0)])})),n("form-invalid",{attrs:{error:e.errors.id_permission}})],2),n("div",{staticClass:"row"},[n("buttom-fixed",[n("div",{staticClass:"col-12"},[e.id&&e.$myCanUpdate()?n("button",{class:{"btn btn-primary size-button":!0,"w-100":"mobile"===e.$detect},attrs:{disabled:e.loading},on:{click:function(t){return t.preventDefault(),e.update.apply(null,arguments)}}},[e._v("Cập nhật thay đổi ")]):n("div",[e.$myCanCreate()?n("button",{class:{"btn btn-success size-button":!0,"w-100":"mobile"===e.$detect},attrs:{disabled:e.loading},on:{click:function(t){return t.preventDefault(),e.add()}}},[e._v(" Thêm mới ")]):e._e(),"web"===e.$detect?n("button",{staticClass:"btn btn-danger ml-3",on:{click:function(t){return e.goList()}}},[e._v(" Hủy ")]):e._e()])])])],1)])])},r=[],a=n("2909"),s=n("1da1"),o=(n("d81d"),n("b64b"),n("a630"),n("3ca3"),n("d3b7"),n("6062"),n("ddb0"),n("99af"),n("4de4"),n("caad"),n("2532"),n("96cf"),n("0a01")),c=n("fb12"),u=n("0bc4"),l={data:function(){return{id:this.$route.params.id,type_admin:o["a"],type:o["a"],count_user:0,permission:"",active:1,options:c["a"],optionsType:o["b"],groupManages:[],errors:{},loading:!1,checkList:[],group:[]}},computed:{redirect:function(){return this.$store.state.general.redirect}},created:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.id){t.next=3;break}return t.next=3,e.detail();case 3:return t.next=5,e.listPermission();case 5:e.fillCheckAll();case 6:case"end":return t.stop()}}),t)})))()},methods:{checkAll:function(e,t){var n=Object.keys(e.permission_details).map((function(t){return e.permission_details[t].id}));if(this.group[t])this.checkList=Array.from(new Set([].concat(Object(a["a"])(this.checkList),Object(a["a"])(n))));else{var i=this.checkList.filter((function(e){return!n.includes(e)}));this.checkList=i}},fillCheckAll:function(){var e=this,t=[],n=this.groupManages.map((function(e){return e.permission_details}));n.map((function(n,i){var r=Object.keys(n).every((function(t){return e.checkList.includes(t)}));t[i]=!!r})),this.group=t},listPermission:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={type:e.type},t.next=3,Object(u["d"])(n).then((function(t){var n=t.data.data;for(var i in n)n[i].permission=[],e.groupManages.push(n[i])}));case 3:case"end":return t.stop()}}),t)})))()},detail:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,Object(u["c"])(e.id).then((function(t){if(t.data.success===API_STATUS_SUCCESS){var n=t.data.data;e.count_user=n.count_user,e.permission=n.permission,e.type=n.type,e.active=n.active,e.userActive=n.count,e.checkList=n.id_permission}else e.$showMessage(t.data.message,"warning"),e.goList()})).catch((function(t){return e.requestError(t)}));case 3:e.loading=!1;case 4:case"end":return t.stop()}}),t)})))()},onChangeType:function(){this.id||(this.checkList=[],this.groupManages=[],this.listPermission())},getPathGoList:function(){var e="/permission";return e+this.redirect},goList:function(){this.$router.push({path:this.getPathGoList()})},add:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.$myCanCreate()){t.next=2;break}return t.abrupt("return");case 2:return e.errors={},e.loading=!0,n={permission:e.permission,active:e.active,id_permission:e.checkList,type:e.type},t.next=7,Object(u["a"])(n).then((function(t){t.data.success===API_STATUS_SUCCESS?(e.$showMessage(t.data.message,"success"),e.goList()):e.$showMessage(t.data.message,"warning")})).catch((function(t){return e.requestError(t)}));case 7:e.loading=!1;case 8:case"end":return t.stop()}}),t)})))()},update:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.$myCanUpdate()){t.next=2;break}return t.abrupt("return");case 2:return e.loading=!0,e.errors={},n={permission:e.permission,active:e.active,id_permission:e.checkList},t.next=7,Object(u["f"])(e.id,n).then((function(t){if(t.data.success===API_STATUS_SUCCESS){var n=t.data.data;e.$showMessage(t.data.message,"success"),e.permission=n.permission,e.active=n.active,e.userActive=n.count,e.checkList=n.id_permission,e.fillCheckAll()}else e.$showMessage(t.data.message,"warning")})).catch((function(t){return e.requestError(t)}));case 7:e.loading=!1;case 8:case"end":return t.stop()}}),t)})))()},requestError:function(e){e.status===HTTP_CODE_GONE?(this.$showMessage(e.data.message,"warning"),this.goList()):e.status===HTTP_CODE_UNPROCESSABLE_ENTITY&&(this.errors=e.data.data.data)}}},d=l,p=n("2877"),f=Object(p["a"])(d,i,r,!1,null,null,null);t["default"]=f.exports},"4de4":function(e,t,n){"use strict";var i=n("23e7"),r=n("b727").filter,a=n("1dde"),s=a("filter");i({target:"Array",proto:!0,forced:!s},{filter:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})},"4fad":function(e,t,n){var i=n("d039"),r=n("861d"),a=n("c6b6"),s=n("d86b"),o=Object.isExtensible,c=i((function(){o(1)}));e.exports=c||s?function(e){return!!r(e)&&((!s||"ArrayBuffer"!=a(e))&&(!o||o(e)))}:o},6062:function(e,t,n){"use strict";var i=n("6d61"),r=n("6566");i("Set",(function(e){return function(){return e(this,arguments.length?arguments[0]:void 0)}}),r)},6566:function(e,t,n){"use strict";var i=n("9bf2").f,r=n("7c73"),a=n("e2cc"),s=n("0366"),o=n("19aa"),c=n("2266"),u=n("7dd0"),l=n("2626"),d=n("83ab"),p=n("f183").fastKey,f=n("69f3"),v=f.set,h=f.getterFor;e.exports={getConstructor:function(e,t,n,u){var l=e((function(e,i){o(e,f),v(e,{type:t,index:r(null),first:void 0,last:void 0,size:0}),d||(e.size=0),void 0!=i&&c(i,e[u],{that:e,AS_ENTRIES:n})})),f=l.prototype,m=h(t),g=function(e,t,n){var i,r,a=m(e),s=b(e,t);return s?s.value=n:(a.last=s={index:r=p(t,!0),key:t,value:n,previous:i=a.last,next:void 0,removed:!1},a.first||(a.first=s),i&&(i.next=s),d?a.size++:e.size++,"F"!==r&&(a.index[r]=s)),e},b=function(e,t){var n,i=m(e),r=p(t);if("F"!==r)return i.index[r];for(n=i.first;n;n=n.next)if(n.key==t)return n};return a(f,{clear:function(){var e=this,t=m(e),n=t.index,i=t.first;while(i)i.removed=!0,i.previous&&(i.previous=i.previous.next=void 0),delete n[i.index],i=i.next;t.first=t.last=void 0,d?t.size=0:e.size=0},delete:function(e){var t=this,n=m(t),i=b(t,e);if(i){var r=i.next,a=i.previous;delete n.index[i.index],i.removed=!0,a&&(a.next=r),r&&(r.previous=a),n.first==i&&(n.first=r),n.last==i&&(n.last=a),d?n.size--:t.size--}return!!i},forEach:function(e){var t,n=m(this),i=s(e,arguments.length>1?arguments[1]:void 0);while(t=t?t.next:n.first){i(t.value,t.key,this);while(t&&t.removed)t=t.previous}},has:function(e){return!!b(this,e)}}),a(f,n?{get:function(e){var t=b(this,e);return t&&t.value},set:function(e,t){return g(this,0===e?0:e,t)}}:{add:function(e){return g(this,e=0===e?0:e,e)}}),d&&i(f,"size",{get:function(){return m(this).size}}),l},setStrong:function(e,t,n){var i=t+" Iterator",r=h(t),a=h(i);u(e,t,(function(e,t){v(this,{type:i,target:e,state:r(e),kind:t,last:void 0})}),(function(){var e=a(this),t=e.kind,n=e.last;while(n&&n.removed)n=n.previous;return e.target&&(e.last=n=n?n.next:e.state.first)?"keys"==t?{value:n.key,done:!1}:"values"==t?{value:n.value,done:!1}:{value:[n.key,n.value],done:!1}:(e.target=void 0,{value:void 0,done:!0})}),n?"entries":"values",!n,!0),l(t)}}},"6d61":function(e,t,n){"use strict";var i=n("23e7"),r=n("da84"),a=n("e330"),s=n("94ca"),o=n("6eeb"),c=n("f183"),u=n("2266"),l=n("19aa"),d=n("1626"),p=n("861d"),f=n("d039"),v=n("1c7e"),h=n("d44e"),m=n("7156");e.exports=function(e,t,n){var g=-1!==e.indexOf("Map"),b=-1!==e.indexOf("Weak"),y=g?"set":"add",w=r[e],k=w&&w.prototype,_=w,x={},C=function(e){var t=a(k[e]);o(k,e,"add"==e?function(e){return t(this,0===e?0:e),this}:"delete"==e?function(e){return!(b&&!p(e))&&t(this,0===e?0:e)}:"get"==e?function(e){return b&&!p(e)?void 0:t(this,0===e?0:e)}:"has"==e?function(e){return!(b&&!p(e))&&t(this,0===e?0:e)}:function(e,n){return t(this,0===e?0:e,n),this})},$=s(e,!d(w)||!(b||k.forEach&&!f((function(){(new w).entries().next()}))));if($)_=n.getConstructor(t,e,g,y),c.enable();else if(s(e,!0)){var O=new _,T=O[y](b?{}:-0,1)!=O,A=f((function(){O.has(1)})),S=v((function(e){new w(e)})),j=!b&&f((function(){var e=new w,t=5;while(t--)e[y](t,t);return!e.has(-0)}));S||(_=t((function(e,t){l(e,k);var n=m(new w,e,_);return void 0!=t&&u(t,n[y],{that:n,AS_ENTRIES:g}),n})),_.prototype=k,k.constructor=_),(A||j)&&(C("delete"),C("has"),g&&C("get")),(j||T)&&C(y),b&&k.clear&&delete k.clear}return x[e]=_,i({global:!0,forced:_!=w},x),h(_,e),b||n.setStrong(_,e,g),_}},a4ab:function(e,t,n){},bb2f:function(e,t,n){var i=n("d039");e.exports=!i((function(){return Object.isExtensible(Object.preventExtensions({}))}))},c763:function(e,t,n){"use strict";n("a4ab")},d86b:function(e,t,n){var i=n("d039");e.exports=i((function(){if("function"==typeof ArrayBuffer){var e=new ArrayBuffer(8);Object.isExtensible(e)&&Object.defineProperty(e,"a",{value:8})}}))},f183:function(e,t,n){var i=n("23e7"),r=n("e330"),a=n("d012"),s=n("861d"),o=n("1a2d"),c=n("9bf2").f,u=n("241c"),l=n("057f"),d=n("4fad"),p=n("90e3"),f=n("bb2f"),v=!1,h=p("meta"),m=0,g=function(e){c(e,h,{value:{objectID:"O"+m++,weakData:{}}})},b=function(e,t){if(!s(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!o(e,h)){if(!d(e))return"F";if(!t)return"E";g(e)}return e[h].objectID},y=function(e,t){if(!o(e,h)){if(!d(e))return!0;if(!t)return!1;g(e)}return e[h].weakData},w=function(e){return f&&v&&d(e)&&!o(e,h)&&g(e),e},k=function(){_.enable=function(){},v=!0;var e=u.f,t=r([].splice),n={};n[h]=1,e(n).length&&(u.f=function(n){for(var i=e(n),r=0,a=i.length;r<a;r++)if(i[r]===h){t(i,r,1);break}return i},i({target:"Object",stat:!0,forced:!0},{getOwnPropertyNames:l.f}))},_=e.exports={enable:k,fastKey:b,getWeakData:y,onFreeze:w};a[h]=!0},fb12:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var i=[{value:1,label:"Hoạt động"},{value:0,label:"Tạm khóa"}]}}]);
//# sourceMappingURL=permission.c2ed664a.js.map