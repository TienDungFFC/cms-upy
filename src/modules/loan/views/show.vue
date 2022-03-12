<template>
    <div class="loan-show container-fluid">
        <div class="d-flex align-items-center p-md-5 mt-md-0 mt-2">
            <div class="avatar d-flex align-items-center rounded-circle overflow-hidden flex-shrink-0 flex-grow-0 mr-md-5 mr-3"
                :style="$detect === 'web' ? 'width: 132px; height: 132px;' : 'width: 100px; height: 100px;'">
                    <img
                        :src="$getUrlImage(infoUser.avatar)"
                        @error="$errorImage"
                        width="100%"/>
                </div>
            <div>
                <p :class="{'h3 font-weight-bolder m-0': $detect === 'web',
                            'h5 font-weight-bolder m-0': $detect === 'mobile'}">{{ infoUser.name }}</p>
                <p class="m-0">{{ infoUser.email }}</p>
                <p class="m-0">{{ infoUser.phone }}</p>
                <p :class="{'mb-0 font-weight-bolder': true,'mt-4':  $detect === 'web', 'mt-2 fs-11':  $detect === 'mobile'}">
                    Đã thanh toán {{ infoLoan.period_is_paid }} kỳ, {{ infoLoan.period_unpaid }} kỳ chưa thanh toán
                </p>
            </div>
        </div>

        <div class="bg-light mt-md-4 p-md-5 py-3 mt-3">
            <p class="h5 font-weight-bolder mb-3">Thông tin ứng lương</p>
            <div class="d-md-flex justify-content-between">
                <div class="text-center mt-3 d-flex flex-md-column box-info">
                    <p class="font-weight-bolder">Số tiền ứng</p>
                    <p>{{ infoLoan ? infoLoan.loan : ""}}</p>
                </div>
                <div class="text-center mt-3 d-flex flex-md-column box-info">
                    <p class="font-weight-bolder">Thời gian ứng</p>
                    <p> {{infoLoan ? infoLoan.disbursement_date : ""}}</p>
                </div>
                <div class="text-center mt-3 d-flex flex-md-column box-info">
                    <p class="font-weight-bolder">Thời gian ký hợp đồng</p>
                    <p> {{infoLoan ? infoLoan.contract_signing_date : ""}}</p>
                </div>
                <div class="text-center mt-3 d-flex flex-md-column box-info">
                    <p class="font-weight-bolder">Thời gian giải ngân</p>
                    <p> {{infoLoan ? infoLoan.disbursement_date : ""}}</p>
                </div>
                <div class="text-center mt-3 d-flex flex-md-column box-info">
                    <p class="font-weight-bolder">Trạng thái</p>
                    <p> {{infoLoan ? infoLoan.type : ""}} </p>
                </div>
            </div>
        </div>

        <div  class="bg-light mt-md-4 p-md-5 py-3 mt-3">
            <div class="row">
                <p class="col-12 h5 font-weight-bolder">Thông tin khoản vay</p>
                <div class="col-12 d-md-flex justify-content-end align-items-end">
                    <div v-if="$detect === 'web'">
                        <div class="d-flex justify-content-end align-items-end">
                            <div class="m-2" style="width: 250px;">
                                <p class="font-weight-bolder mb-2">Từ ngày</p>
                                <input class="p-1" type="date" style="width: 100%;height: 30px;" v-model="date.date_from"/>
                            </div>
                            <div class="m-2" style="width: 250px;">
                                <p class="font-weight-bolder mb-2">Đến ngày</p>
                                <input class="p-1" type="date" style="width: 100%;height: 30px;" v-model="date.date_to"/>
                            </div>
                            <div class="ml-md-2 mt-md-0 mt-2 mb-2">
                                <button class="btn btn-primary mr-1 h-50" :disabled="loading" @click="searchDate()">Tìm kiếm</button>
                                <button class="btn btn-secondary ml-1 h-50" :disabled="date.date_from === '' && date.date_to === ''" @click="clearFilter()">Bỏ lọc</button>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <ldc-model-mobile
                            titileCancel="Hủy"
                            :showCancel="false"
                            :showTitle="true"
                            title="Tìm kiếm nâng cao"
                            :customButton="true"
                            :visible.sync="dialog">
                            <div slot="content-model">
                                <div class="d-flex p-2">
                                    <div class="mr-1 input-mb w-50">
                                        <p class="font-weight-bolder mb-2 text-left">Từ ngày</p>
                                        <div class="position-relative">
                                            <input class="input-mobile size-input rounded bg-white pl-2 input-date" 
                                            type="date" 
                                            style="width: 100%;height: 30px;" 
                                            v-model="date.date_from"/>
                                            <span v-if="isShowPlhd1" 
                                            class="position-absolute">Từ ngày</span>
                                        </div>
                                        
                                    </div>
                                    <div class="ml-1 input-mb w-50">
                                        <p class="font-weight-bolder mb-2 text-left">Đến ngày</p>
                                        <div class="position-relative">
                                            <input class="input-mobile size-input rounded bg-white pl-2 input-date" 
                                            type="date" 
                                            style="width: 100%;height: 30px;"
                                             v-model="date.date_to"/>
                                            <span v-if="isShowPlhd2" 
                                            class="position-absolute">Đến ngày</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div slot="custom-buttom">
                                <div :class="{
                                    'btn-confirm-android': $isAndroid,
                                    'btn-confirm-ios mb-10px btn-custom-ios': !$isAndroid
                                    }">
                                    <button class="btn btn-primary radius-ios text-uppercase mr-10px fs-14px btn-apply"
                                    @click="searchDate()" close-model-mobile>áp dụng</button>
                                    <button class="btn btn-light radius-ios text-uppercase ml-10px fs-14px btn-cancel"
                                    @click="clearFilter()" close-model-mobile>Bỏ lọc</button>
                                </div>
                            </div>
                        </ldc-model-mobile>
                    </div>
                </div>
                
                <div class="col-12 mt-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="font-weight-bolder m-0">Đã thanh toán: {{infoLoan.period_is_paid}}/{{infoLoan.total_period}} kỳ</p>
                        <i v-if="$detect === 'mobile'" @click="dialog=true" class="h3 filter icon ion-md-funnel"></i>
                    </div>
                </div>
                
                <div class="col-12 border-bottom mt-2">
                    <div class="table-responsive">
                        <table :class="{'table table-striped' : true, 'table-mobie': $detect === 'mobile'}">
                            <thead>
                                <tr>
                                    <th>Kỳ</th>
                                    <th>Số tiền</th>
                                    <th>Phương thức</th>
                                    <th>Thời gian</th>
                                    <th>Tình trạng</th>
                                    <th class="text-center">Chậm khoản vay</th>
                                    <th class="text-center">Nợ quá hạn(ngày)</th>
                                    <th class="text-center">Số tiền nợ</th>
                                    <th
                                        class="text-right"
                                        width="100px"
                                    >
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(info, i) in loans" :key="i">
                                    <td>{{ i + 1 }}</td>
                                    <td>{{ $formatNumber(info.payment_amount) }}</td>
                                    <td>{{ info.data_user_pay ? info.data_user_pay.method : ""}}</td>
                                    <td>{{ info.payment_term }}</td>
                                    <td>
                                        <span v-if="info.status == 'OUT_OF_DATE'">Quá hạn</span>
                                        <span v-if="info.status == 'DEADLINE'">Đến hạn</span>
                                        <span v-if="info.status == 'UNPAID'">Chưa thanh toán</span>
                                        <span v-if="info.status == 'PAID'">Đã thanh toán</span>
                                    </td>
                                    <td class="text-center">{{ info.loan_delay }}</td>
                                    <td class="text-center">{{ info.overdue_day ? info.overdue_day : 0 }}</td>
                                    <td class="text-center">{{ info.lack_money ? info.lack_money : 0 }}</td>
                                    <td v-if="info.status == 'UNPAID' || info.status == 'DEADLINE' || 'OUT_OF_DATE'"></td>
                                    <td v-else class="d-flex justify-content-end">
                                        <button
                                            width="100px"
                                            class="btn btn-primary"
                                            @click="goDetail(info)"
                                        >
                                            Chi tiết
                                        </button>
                                    </td>
                                </tr>
                                <no-data :data="loans" :colspan="9" />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        <p class="font-weight-bolder mt-5">Tổng thanh toán: {{ $formatNumber(infoLoan.amount_paid >=0 ? infoLoan.amount_paid : '') }}</p>
        </div>
        <detail
            :visible.sync="dialogDetail"
            :info="infoShow"
        />
    </div>
</template>
<script>
import { getInfoDetail,detailLoans } from "@/repositories/loan.js";
export default {
    components: {
        detail: () => import('./detail')
    },
    data() {
        return {
            loading: false,
            date: {
                date_from: '',
                date_to: ''
            },
            infoUser: {},
            infoLoan: {},
            loans: [],
            dialog: false,
            dialogDetail: false,
            id: this.$route.params.id,
            id_user: this.$route.params.id_user,
            infoShow: {},
            isShowPlhd1: true,
            isShowPlhd2: true
        };
    },
    computed: {
        redirect() {
            return this.$store.state.general.redirect;
        },
    },
    created() {
        if (this.id) {
            this.getInfoDetail();
            this.getData();
        }
    },
    watch: {
        'date.date_from'(val){
           if(val == ''){
                this.isShowPlhd1 = true;
           }else{
                this.isShowPlhd1 = false;
           }
        },
        'date.date_to'(val){
           if(val == ''){
                this.isShowPlhd2 = true;
           }else{
                this.isShowPlhd2 = false;
           }
        }
    },
    methods: {
        getInfoDetail(){
            getInfoDetail(this.id).then((res) => {
                if(res.data.success === API_STATUS_SUCCESS) {   
                    let data = res.data.data;
                    this.infoLoan = data
                    this.infoUser = data.user ? data.user.data : {}
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }
            }).catch((err) => {
                this.requestError(err)
            })
        },
        getData() {
            let query = {
                id_user : this.id_user,
                loan_id : this.id
            }
            detailLoans(query).then((res) => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.loans = res.data.data
                }
            });
        },
        goDetail(info) {
            this.infoShow = info
            this.dialogDetail = true;
        },
        searchDate(){
            this.loading = true;
            if(this.date.date_from === '' || this.date.date_to === ''){
                 this.$showMessage('Vui lòng nhập đầy đủ ngày tháng!', 'warning');
                 this.loading = false;
                 return;
            }
            let query = {
                id_user : this.id_user,
                loan_id : this.id,
                date_from : this.date.date_from,
                date_to : this.date.date_to
            }
            detailLoans(query).then((res) => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.loans = res.data.data
                }else {
                    this.$showMessage(res.data.message, 'warning');
                }
            });
            this.loading = false;
        },
        requestError(err) {
                if (err.status === HTTP_CODE_GONE) {
                    this.$showMessage(err.data.data.message,"warning");
                    this.goList();
                } else if (err.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
                    this.errors = err.data.data.data;
                }
        },
        getPathGoList() {
            let path = '/loan-amount';
            return path + this.redirect;
        },
        goList() {
            this.$router.push({
                path: this.getPathGoList()
            })
        },
        clearFilter() {
            this.date.date_from = ''
            this.date.date_to = ''
            this.getData()
        }
    },
};
</script>
<style lang="scss">
.loan-show{
    .table td {
        border: none;
    }   
    .table-mobie{
        table-layout: fixed;
        th,td{
            align-items: center;
            &:nth-child(1){
                width: 50px;
            }
            &:nth-child(2){
                width: 130px;
            }
            &:nth-child(3){
                width: 150px;
            }
            &:nth-child(4){
                width: 100px;
            }
            &:nth-child(5){
                width: 130px;
            }
            &:nth-child(6){
                width: 150px;
            }
            &:nth-child(7){
                width: 150px;
            }
            &:nth-child(8){
                width: 120px;
            }
        }
    }
    .fs-11{
        font-size:11.5px;
    }
    .input-mb{
        p{
            line-height:1 !important;
        }
        span{
            left: 10px;
            top:50%;
            transform: translateY(-50%);
            color: #474646;
        }
    }
    .input-mobile[type=date]::-webkit-datetime-edit-text {
        -webkit-appearance: none;
        display: none;
    }
    .input-mobile[type=date]::-webkit-datetime-edit-month-field{
        -webkit-appearance: none;
        display: none;
    }
    .input-mobile[type=date]::-webkit-datetime-edit-day-field {
        -webkit-appearance: none;
        display: none;
    }
    .input-mobile[type=date]::-webkit-datetime-edit-year-field {
        -webkit-appearance: none;
        display: none;
    }
    @media only screen and (max-width: 767px){
        .box-info{
            p{
                width: 50%;
                text-align: left;
            }
        }
    }
}
</style>
