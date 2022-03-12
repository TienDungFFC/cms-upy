<template>
    <div class="formLoans bg-light px-md-5 py-md-2 py-3 px-2 container-fluid">
                <div class="">
                    <div class="position-relative">
                        <i v-show="$detect === 'mobile'" @click="$router.go(-1)" class="icon ion-md-arrow-back position-absolute h4 ml-2"></i>
                        <i v-show="!showDetail" @click="showDetail = !showDetail" class="icon ion-md-arrow-back position-absolute h4 pointer"></i>
                        <p class="h5 font-weight-bolder text-center m-0"> {{showDetail ? 'Thông tin giao dịch' : 'Chi tiết giao dịch'}}</p>
                    </div>
                    <div v-show="showDetail" class="w-100">
                        <div v-if="$detect === 'web'" class="col-12">
                            <div class="d-flex justify-content-end align-items-end">
                                <div class="m-2" style="width: 250px;">
                                    <p class="font-weight-bolder mb-2">Từ ngày</p>
                                    <input class="form-control p-1" type="date" style="width: 100%;height: 30px;" v-model="date.date_from"/>
                                </div>
                                <div class="m-2" style="width: 250px;">
                                    <p class="font-weight-bolder mb-2">Đến ngày</p>
                                    <input class="form-control p-1" type="date" style="width: 100%;height: 30px;" v-model="date.date_to"/>
                                </div>
                                <button class="btn btn-primary m-2 h-50" :disabled="loading" @click="searchDate()">Tìm kiếm</button>
                                <button class="btn btn-secondary m-2 h-50" :disabled="date.date_from === '' && date.date_to === ''" @click="clearFilter()">Bỏ lọc</button>
                            </div>
                        </div>
                        <div class="mt-3">
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="font-weight-bolder m-0">
                                    Đã thanh toán: {{infoLoan.period_is_paid}}/{{infoLoan.total_period}} kỳ
                                </p>
                                <div v-if="$detect === 'mobile'" class="filter" @click="dialog=true">
                                    <i class="h3 icon ion-md-funnel"></i>
                                </div>
                            </div>
                        </div>
                        
                        <ldc-model-mobile
                        v-if="$detect === 'mobile'"
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
                                                <input class="form-control input-mobile size-input rounded bg-white pl-2 input-date" 
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
                                                <input class="form-control input-mobile size-input rounded bg-white pl-2 input-date" 
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

                        <div class="border-bottom mt-2">
                            <div class="table-responsive">
                                <table :class="{'table table-striped' : true, 'table-mobile': $detect === 'mobile'}">
                                    <thead>
                                        <tr>
                                            <th>Kỳ</th>
                                            <th>Số tiền</th>
                                            <th>Phương thức</th>
                                            <th>Thời gian</th>
                                            <th>Trạng thái</th>
                                            <th>Tình trạng</th>
                                            <th class="text-center">Chậm khoản vay</th>
                                            <th
                                                class="text-right"
                                                style="min-width: 100px"
                                                width="100px"
                                            >
                                                Hành động
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(info, i) in loans" :key="i">
                                            <td>{{ i + 1 }}</td>
                                            <td>{{ info.payment_amount }}</td>
                                            <td>{{ info.data_user_pay ? info.data_user_pay.method : ''}}</td>
                                            <td>{{ info.payment_term }}</td>
                                            <td>{{ info.payment_term }}</td>
                                            <td>
                                                <span v-if="info.status == 'OUT_OF_DATE'">Quá hạn</span>
                                                <span v-if="info.status == 'DEADLINE'">Đến hạn</span>
                                                <span v-if="info.status == 'UNPAID'">Chưa thanh toán</span>
                                                <span v-if="info.status == 'PAID'">Đã thanh toán</span>
                                            </td>
                                            <td class="text-center">{{ info.loan_delay }}</td>
                                            <td v-if="info.status == 'UNPAID' || info.status == 'DEADLINE' || 'OUT_OF_DATE'"></td>
                                            <td v-else class="d-flex justify-content-end">
                                                <button
                                                    v-if="$detect === 'web'"
                                                    width="100px"
                                                    class="btn btn-primary"
                                                    @click="goDetail(info, 'web')"
                                                >
                                                    Chi tiết
                                                </button>
                                                <button
                                                    v-else
                                                    width="100px"
                                                    class="btn btn-primary"
                                                    @click="goDetail(info, 'mobile')"
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
                        <p class="font-weight-bolder mt-5">Tổng thanh toán: {{ $formatNumber(infoLoan.amount_paid >=0 ? infoLoan.amount_paid : '') }}</p>
                    </div>
                </div>
                <detailTransaction v-show="!showDetail" v-if="$detect=== 'web'" :infoDetail="infoDetail"></detailTransaction>
            </div>
</template>
<script>
import { detailLoans, getInfoDetail } from "@/repositories/loan.js";
import detailTransaction from "../views/detail"
export default{
    components: {
        detailTransaction: detailTransaction
    },
    props: {
        propsInfo : {
            type: Object,
            default: {}
        },
        visible : {
            type: Boolean,
            default: false
        }
    },
    data() {
        return{
            infoDetail: {},
            showDetail: true,
            dialog: false,
            loading: false,
            id_loan: '',
            id_user: '',
            loans: [],
            infoLoan: {},
            date: {
                date_from: '',
                date_to: ''
            },   
            isShowPlhd1: true,
            isShowPlhd2: true
        }
    },
    watch: {
        visible(val){
            if(val){
                this.id_loan = this.propsInfo.id_loan
                this.id_user = this.propsInfo.id_user
                this.getDetailLoans();
                this.getInfoDetail();
            }
        },
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
    created() {
        if(this.$detect === 'mobile'){
            this.id_loan = this.propsInfo.id_loan
            this.id_user = this.propsInfo.id_user
            this.getDetailLoans();
            this.getInfoDetail();
        }
    },
    methods: {
        getDetailLoans(){
            let query = {
                id_user: this.id_user,
                loan_id: this.id_loan,
            }
            detailLoans(query).then(res => {
                this.loans = res.data.data
            })
        },
        getInfoDetail(){
            getInfoDetail(this.id_loan).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.infoLoan = res.data.data
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }
            })
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
                loan_id : this.id_loan,
                date_from : this.date.date_from,
                date_to : this.date.date_to
            }
            detailLoans(query).then((res) => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.loans = res.data.data
                }else {
                    this.$showMessage(res.data.message, 'warning');
                }
            })
            this.loading = false;
        },
        goDetail(info, key) {
            if(key === 'web'){
                this.showDetail = !this.showDetail
                this.infoDetail = info;
            }else{
                this.$router.push({
                    name: 'formLoans-detail',
                    query: {
                        infoDetail: info
                    }
                })
            }
            
        },
        clearFilter() {
            this.date.date_from = ''
            this.date.date_to = ''
            this.getDetailLoans()
        },
    }
}
</script>
<style lang="scss">
.formLoans{
    .table-mobile{
        table-layout: fixed;
        th,td{
            text-align: center;
            &:nth-child(1){
                width: 50px;
            }
            &:nth-child(2){
                width: 110px;
            }
            &:nth-child(3){
                width: 130px;
            }
            &:nth-child(4){
                width: 100px;
            }
            &:nth-child(5){
                width: 130px;
            }
            &:nth-child(6){
                width: 120px;
            }
            &:nth-child(7){
                width: 140px;
            }
        }
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
    }.ion-md-arrow-back{
        left: -10px;
        z-index: 1;
    }
}
</style>
