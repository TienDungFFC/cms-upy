(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b6ca9"],{"1f53":function(t,a,s){"use strict";s.r(a);var i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"show-loan-history"},[s("ldc-dialog",{attrs:{title:"Thông tin giao dịch",width:"60%",visible:t.dialog},on:{"update:visible":function(a){t.dialog=a}}},[s("div",{staticClass:"container"},[s("div",{staticClass:"row main mt-5"},[s("div",{staticClass:"col-12 d-flex justify-content-between align-items-center"},[s("div",[s("span",{staticClass:"mr-3 font-weight-bolder"},[t._v(" Đã thanh toán: 10/10 kỳ ")]),s("span",{staticClass:"font-weight-bolder"},[t._v(" Kỳ bị chậm: 1/10 kỳ ")])]),s("div",{staticClass:"d-flex"},[s("input",{staticClass:"form-control rounded mr-2",attrs:{type:"date",placeholder:"Từ ngày"}}),s("input",{staticClass:"form-control rounded",attrs:{type:"date",placeholder:"Đến ngày"}})])]),s("div",{staticClass:"col-12 mt-3"},[s("div",{staticClass:"table-responsive"},[s("table",{staticClass:"table"},[s("thead",[s("tr",[s("th",[t._v("Kỳ")]),s("th",[t._v("Số tiền")]),s("th",[t._v("Phương thức")]),s("th",[t._v("Thời gian")]),s("th",[t._v("Trạng thái")]),s("th",[t._v("Tình trạng")]),s("th",{staticClass:"text-center"},[t._v(" Chậm khoản vay ")])])]),s("tbody",[t._l(t.LIST_INFO,(function(a){return s("tr",{key:a.period},[s("td",[t._v(t._s(a.period))]),s("td",[t._v(t._s(a.amountOfMoney))]),s("td",[t._v(t._s(a.method))]),s("td",[t._v(t._s(a.time))]),s("td",[a.status1?s("span",[t._v("Thành công")]):s("span",[t._v("Thất bại")])]),s("td",[a.status2?s("span",[t._v("Đã thanh toán")]):s("span",[t._v("Chưa thanh toán")])]),s("td",{staticClass:"text-center"},[a.delay?s("span",[t._v("có")]):s("span",[t._v("Không")])])])})),s("no-data",{attrs:{data:t.LIST_INFO,colspan:"7"}})],2)])])])])])])],1)},n=[],e={props:["visible","loanHistory"],data:function(){return{dialog:!1,data:{},LIST_INFO:[]}},watch:{visible:function(t){this.dialog=t,t?this.data=this.loanHistory:(this.dialog=!1,this.data={})},dialog:function(t){this.$emit("update:visible",t)}},created:function(){},methods:{}},o=e,d=s("2877"),l=Object(d["a"])(o,i,n,!1,null,"241fe479",null);a["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0b6ca9.3636d785.js.map