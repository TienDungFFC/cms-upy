<template>
    <div v-loading="v_loading" class="payment container-fluid">
        <div class="d-flex justify-content-between flex-column flex-md-row border-bottom pt-3 pt-lg-0 pb-lg-3 mb-lg-3">
            <div class="text-warning">
                <tr>
                    <td width="120">Chờ xác nhận: </td>
                    <td> {{ statistics.count_payment_paying }} hồ sơ</td>
                </tr>
                <tr>
                    <td>Tổng thanh toán: </td>
                    <td>{{ statistics.total_payment_amount_paying }}</td>
                </tr>
            </div>
            <div class="text-danger my-3 my-md-0">
                <tr>
                    <td width="120">Thất bại: </td>
                    <td> {{ statistics.count_payment_fail }} hồ sơ</td>
                </tr>
                <tr>
                    <td>Tổng thanh toán: </td>
                    <td>{{ statistics.total_payment_amount_fail }}</td>
                </tr>
            </div>
            <div class="text-success">
                <tr>
                    <td width="120">Thành công: </td>
                    <td> {{ statistics.count_payment_success }} hồ sơ</td>
                </tr>
                <tr>
                    <td>Tổng thanh toán: </td>
                    <td>{{ statistics.total_payment_amount_success }}</td>
                </tr>
            </div>
            
        </div>
        <div v-if="$detect === 'web'" class="d-flex align-items-end justify-content-between pb-4">
            <div class="mr-3 flex-shrink-0">
                <button
                    class="btn btn-success size-button"
                    @click="exportExcel()">
                    Xuất file
                </button>
            </div>
            <div class="d-flex align-items-end justify-content-between ">
                <div class="mr-3">
                    <p class="font-weight-bold mb-2">Từ ngày</p>
                    <input
                        class="p-1 size-button form-control" 
                        type="date" 
                        style="width: 100%;height: 30px;" 
                        v-model="date.date_from"
                        @change="changeUrl()"/>
                </div>
                <div class="mr-3">
                    <p class="font-weight-bold mb-2">Đến ngày</p>
                    <input 
                        class="p-1 size-button form-control" 
                        type="date" 
                        style="width: 100%;height: 30px;" 
                        v-model="date.date_to"
                        @change="changeUrl()"/>
                </div>
                <div class="mr-3">
                    <label class="font-weight-bold">Tìm kiếm người dùng</label>
                    <div class="search" v-click-outside="outsideUser">
                        <input
                            v-model="keywordUser"
                            type="text"
                            class="form-control size-input"
                            placeholder="Tìm kiếm theo họ tên, SĐT"
                            @focus="focusUser('web')"
                            @input="searchUser"
                        />
                        <ul v-if="showUser" class="company-list">
                            <li
                                v-for="(user, index) in users"
                                :key="index"
                                @click="selectUser(user)"
                                class="company-item"
                            >
                                {{ user.name }} ({{user.phone}})
                            </li>
                            <li
                                v-if="users.length === 0"
                                class="company-item text-center text-black-50"
                            >
                                <span v-if="loading">Đang tìm kiếm</span>
                                <span v-else>Không có dữ liệu</span>
                            </li>
                        </ul>
                    </div>
            </div>
                <div v-if="$isAdmin()" class="mr-3">
                    <label class="font-weight-bold">Tìm công ty</label>
                    <div class="search" v-click-outside="outsideSearch">
                        <input
                            v-model="keywordCompany"
                            type="text"
                            class="form-control size-input"
                            placeholder="Tìm kiếm công ty"
                            @focus="focusSearch('web')"
                            @input="searchCompany"
                        />
                        <ul v-if="showSearch" class="company-list">
                            <template>
                                <li
                                    v-for="(company, index) in companies"
                                    :key="index"
                                    @click="search(company)"
                                    class="company-item">
                                    {{ company.name }}
                                </li>
                                <li
                                    v-if="companies.length === 0"
                                    class="company-item text-center text-black-50"
                                >
                                    <span v-if="loading">Đang tìm kiếm</span>
                                    <span v-else>Không có dữ liệu</span>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
                <div class="mr-3">
                    <label class="font-weight-bold">Lọc trạng thái</label>
                    <ldc-select
                    v-model="status"
                    placeholder="Lọc trạng thái"
                    style="width: 100%"
                    class="size-input"
                    @change="changeActive"
                    >
                    <ldc-option
                        v-for="item in optionPayment"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </ldc-option>
                    </ldc-select>
                </div>
                <div>
                    <button
                    class="btn btn-secondary"
                    :disabled="
                        status === '' &&
                        id_user === '' &&
                        date.date_from === '' &&
                        date.date_to === '' &&
                        id_business === ''
                    "
                    style="height: 32px; width: 80px"
                    @click="clearFilter()"
                    >
                    Bỏ lọc
                    </button>
                </div>
            </div>
        </div>

        <div v-if="$detect === 'mobile'" class="filter d-flex align-items-center justify-content-between mt-3">
            <div class="position-relative w-100 mr-3">
                <div class="search" v-click-outside="outsideUser">
                    <input
                        v-model="keywordUser"
                        type="text"
                        class="form-control size-input"
                        placeholder="Tìm kiếm theo họ tên, SĐT"
                        @focus="focusUser('mobile')"
                    />
                </div>
                <span
                    v-if="keywordUser !== ''"
                    class="position-absolute"
                    style="top: 50%; right: 6px; transform: translateY(-50%);"
                    @click="clearKeywordUser()">
                    <i class="icon ion-md-close-circle-outline" style="color: #d5d5d5; font-size: 18px;"></i>
                </span>
            </div>
            <i @click="dialog=true" class="h3 icon ion-md-funnel mb-0 py-2"></i>
        </div>
        
        <div v-if="$detect === 'mobile'">
            <ldc-model-mobile
                titileCancel="Hủy"
                :showCancel="false"
                :showTitle="true"
                title="Tìm kiếm nâng cao"
                :customButton="true"
                :visible.sync="dialog">
                <div slot="content-model">
                    <div v-if="$isAdmin()" :class="{'mx-2 position-relative':true, 'mt-2': $isAndroid}">
                        <input
                        type="text"
                        @focus="focusSearch('mobile')"
                        v-model="keywordCompany"
                        class="form-control size-input"
                        placeholder="Tìm kiếm công ty"
                        />
                        <span
                            v-if="keywordCompany !== ''"
                            class="position-absolute"
                            style="top: 50%; right: 6px; transform: translateY(-50%);"
                            @click="clearKeywordCompany()">
                            <i class="icon ion-md-close-circle-outline" style="color: #d5d5d5; font-size: 18px;"></i>
                        </span>
                    </div>
                    <div class="d-flex p-2">
                        <div class="mr-1 input-mb w-50">
                            <!-- <p class="font-weight-bolder mb-2 text-left">Từ ngày</p> -->
                            <div class="position-relative">
                                <input class="form-control input-mobile size-input rounded bg-white pl-2 input-date" 
                                type="date" 
                                style="width: 100%;height: 30px;" 
                                v-model="date.date_from"/>
                                <span v-if="date.date_from === ''" 
                                class="position-absolute">Từ ngày</span>
                            </div>
                        </div>
                        <div class="ml-1 input-mb w-50">
                            <!-- <p class="font-weight-bolder mb-2 text-left">Đến ngày</p> -->
                            <div class="position-relative">
                                <input class="form-control input-mobile size-input rounded bg-white pl-2 input-date" 
                                type="date" 
                                style="width: 100%;height: 30px;"
                                v-model="date.date_to"/>
                                <span v-if="date.date_to === ''" 
                                class="position-absolute">Đến ngày</span>
                            </div>
                        </div>
                    </div>
                    <ldc-select-show-option v-model="borrowed_money" placeholder="Lọc tài khoản">
                        <ldc-option-show 
                            v-for="item in optionPayment"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"/>
                    </ldc-select-show-option>
                </div>
                <div slot="custom-buttom">
                    <div :class="{
                        'btn-confirm-android': $isAndroid,
                        'btn-confirm-ios mb-10px btn-custom-ios': !$isAndroid
                        }">
                        <button class="btn btn-primary radius-ios text-uppercase mr-10px fs-14px btn-apply"
                        @click="changeUrl()" close-model-mobile>áp dụng</button>
                        <button class="btn btn-light radius-ios text-uppercase ml-10px fs-14px btn-cancel"
                        @click="clearFilter()" close-model-mobile>Bỏ lọc</button>
                    </div>
                </div>
            </ldc-model-mobile>
        </div>

        <div :class="{'row': $detect === 'web', 'row bg-white position-relative mt-3': $detect === 'mobile'}">
            <div class="col-12 border-bottom">
                <div class="table-responsive">
                    <table :class="{'table table-striped' : true, 'table-mobie': $detect === 'mobile'}">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Thời gian</th>
                            <th>Số tiền</th>
                            <th>Công ty</th>
                            <th>Loại thanh toán</th>
                            <th>Trạng thái</th>
                            <th class="text-center" width="100px">
                            Hành động
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, i) in payments" :key="i">
                                <td>{{ item.payment_id }}</td>
                                <td>
                                    <router-link :to="goDetail(item)" class="format-link">
                                        {{ item.user ? item.user.data.name : '' }}
                                    </router-link>
                                </td>
                                <td>{{ item.user ? item.user.data.phone : '' }}</td>
                                <td>
                                    {{ item.payment_date }}
                                </td>
                                <td class="text-danger font-weight-bold">{{ item.payment_amount ? $formatNumber(item.payment_amount) : '' }}</td>
                                <td>
                                    {{ item.business ? item.business.data.name : '' }}
                                </td>
                                <td> {{ item.type }}</td>
                                <td :class="{
                                        'text-warning' : item.status_origin == 'PAYING',
                                        'text-success' : item.status_origin == 'PAID',
                                        'text-danger' : item.status_origin == 'FAIL'
                                    }">
                                    {{ item.status }}
                                </td>
                                <td>
                                    <router-link :to="goDetail(item)">
                                        <button :disabled="loading" class="btn btn-primary">
                                            Chi tiết
                                        </button>
                                    </router-link>
                                </td>
                            </tr>
                            <no-data :data="payments" :colspan="8" />
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="col-12 d-flex justify-content-end">
                            <ldc-pagination
                            :current_page="page"
                            :last_page="totalPages"
                            :scroll_top="true"
                            :callData="changePage"
                            class="pt-4"/>   
            </div>
        </div>
    </div>
</template>
<script>
import { getPayment, getStatistics, exportExcel } from "@/repositories/payment.js";
import { getUsers, detailUser } from "@/repositories/user.js";
import { getPartner, detailPartner } from "@/repositories/partner.js";
import { optionPayment } from "@/constants/payment.js";
export default {
    data() {
        return {
            dialog: false,
            payments: [],
            companies: [],
            users: [],
            optionPayment: optionPayment,
            status: this.$route.query.status ? parseInt(this.$route.query.status): "",
            borrowed_money: this.$route.query.borrowed_money? parseInt(this.$route.query.borrowed_money): "",
            id_business: this.$route.query?.id_business ? this.$route.query.id_business : "",
            id_user: this.$route.query?.id_user ? this.$route.query.id_user : "",
            keywordUser: "",
            keywordCompany: "",
            page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
            totalPages: 0,
            timeOut: null,
            showSearch: false,
            showUser: false,
            loading: false,
            v_loading: false,
            statistics:  {},
            date: {
                date_from: this.$route.query?.date_from ? this.$route.query.date_from : "",
                date_to: this.$route.query?.date_to ? this.$route.query.date_to : "",
            },
        };
    },
    computed: {
        query() {
            return this.$route.query;
        },
    },
    watch: {
        query(val) {
            this.getData();
        },
    },
    created() {
        if (this.id_user) {
            this.setUser(this.id_user);
        }
        if (this.id_business) {
            this.setCompany();
        }
        this.getData();
    },
    methods: {
        getCompany() {
            getPartner().then((res) => {
                this.companies = res.data.data;
                this.setCompany();
            });
        },
    
        setCompany(){
            if(this.$route.query.id_business){
                detailPartner(this.$route.query.id_business).then((res) => {
                    this.keywordCompany = `${res.data.data ? res.data.data.name : ''}`;
                });
            }
        },
        setUser(){
            detailUser(this.id_user).then((res) => {
                this.keywordUser = `${res.data.data ? res.data.data.name : ''}`;
            });
        },
        getData() {
            let query = this.setQuery();
            getPayment(query).then((res) => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.payments = res.data.data;
                    let pagination = res.data.meta.pagination;
                    this.page = pagination.current_page;
                    this.totalPages = pagination.total_pages;
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }
            });
            getStatistics().then((res) => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    let data = res.data.data
                    this.statistics = {
                        count_payment_fail: this.$formatNumber(data.count_payment_fail),
                        count_payment_paying: this.$formatNumber(data.count_payment_paying),
                        count_payment_success: this.$formatNumber(data.count_payment_success),
                        total_payment_amount_fail: this.$formatNumber(data.total_payment_amount_fail),
                        total_payment_amount_paying: this.$formatNumber(data.total_payment_amount_paying),
                        total_payment_amount_success: this.$formatNumber(data.total_payment_amount_success),
                    }
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }
            })
        },
        async exportExcel() {
            this.v_loading = true;
            await exportExcel().then(res => {
                if(res.data.success === API_STATUS_SUCCESS && res.data.urlDownload) {
                    window.open(res.data.urlDownload);
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }
            }).catch(err => {
                this.v_loading = false;
            });
            this.v_loading = false;
            
        },
        changePage(page) {
            this.page = page;
            this.changeUrl();
        },
        changeActive() {
            this.page = 1;
            this.changeUrl();
        },
        changeUrl() {
            this.$router.push({
                name: "payment",
                query: this.setQuery(),
            });
        },
        searchUser(e) {
            if(e) {
                this.keywordUser = e.target.value;
            }
            if (this.timeOut) clearTimeout(this.timeOut);
            let query = {};
            query.keyword = this.keywordUser;
            this.timeOut = setTimeout(() => {
                getUsers(query).then(res => {
                    this.users = res.data.data
                })
            }, 500);
        },
        setQuery() {
            let query = {};
            if (this.status !== "") query.status = parseInt(this.status);
            if (this.date.date_from !== "") query.date_from = this.date.date_from;
            if (this.date.date_to !== "") query.date_to = this.date.date_to;
            if (this.id_business !== "") query.id_business = this.id_business;
            if (this.keywordUser !== "") query.keyword = this.keywordUser;
            if (this.date.date_from !== "") query.date_from = this.date.date_from;
            if (this.date.date_to !== "") query.date_to = this.date.date_to;
            if (this.id_user !== "") query.id_user = this.id_user;
            if (this.page > 1) query.page = this.page;
            return query;
        },

        //danh sach cty
        async searchCompany(e) {
            if(e) {
                this.keywordCompany = e.target.value;
            }
            this.companies = [];
            this.loading = true;
            let query = {};
            query.keyword = this.keywordCompany;
            await getPartner(query).then((res) => {
                if(res.data.success === API_STATUS_SUCCESS) {
                this.companies = res.data.data;
                this.loading = false;
                } else {
                        this.$showMessage(res.data.message, 'warning');
                }
            });
        },
        //tim theo user
        selectUser(user) {
            this.page = 1;
            this.keywordUser = user.name;
            this.id_user = user.id;
            this.showUser = false;
            this.changeUrl();
        },

        //tim theo ten cty
        search(company) {
            this.page = 1;
            this.keywordCompany = company.name;
            this.id_business = company.id;
            this.showSearch = false;
            this.changeUrl();
        },

        focusSearch(key) { 
            if(key === 'web'){
                this.showSearch = true;
                this.getCompany();
            } else {                
                this.$router.push({
                    name: 'payment-find-company',
                    query: this.$route.query
                })
            }
        },

        focusUser(key) { 
            if(key === 'web'){
                this.showUser = true;
                this.searchUser();
            }else{
                this.$router.push({
                    name: 'payment-find-user',
                    query: this.$route.query
                })
            }
        },

        outsideSearch() {
            this.showSearch = false;
        },
        outsideUser() {
            this.showUser = false;
        },
        clearid_user() {
            this.id_user = "";            
            this.page = 1;
            this.changeUrl();
        },
        clearKeywordUser() {
            this.id_user = "";
            this.keywordUser = "";            
            this.page = 1;
            this.changeUrl();
        },
        clearKeywordCompany(){
            this.keywordCompany = "";
            this.id_business = "";
            this.page = 1;
            this.changeUrl();
        },
        // bo chon
        clearFilter() {
            this.id_business = ""
            this.id_user = ""
            this.date.date_from = "";
            this.date.date_to = "";
            this.status = "";
            this.keywordUser = "";
            this.keywordCompany = "";
            this.page = 1;
            this.changeUrl();
        },
        goDetail(payment) {
            return {
                name: 'payment-show',
                params: {
                    id: payment.id,
                },
                query: {
                    redirect: this.$encodeRedirect(this.setQuery()),
                },
            }
        },
  },
};
</script>
<style lang="scss">
.payment {
    .search {
        position: relative;
        .company-list {
            max-height: 250px;
            overflow-y: auto;
            padding: 5px;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
            transition: max-height 0.2s ease-in-out 0s;
            position: absolute;
            min-width: 100%;
            z-index: 2009;
            transform-origin: center top;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%);
            box-sizing: border-box;
            margin-top: 2px;
            margin-bottom: 0;
            border-color: #f7fafc !important;
            &::-webkit-scrollbar {
                width: 3px;
            }
            &::-webkit-scrollbar-thumb {
                background-color: darkgrey;
                border-radius: 3px;
            }
            .company-item {
                list-style: none;
                font-size: 14px;
                padding: 0 20px;
                position: relative;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #333;
                height: 34px;
                line-height: 34px;
                box-sizing: border-box;
                margin-bottom: 2px;
                cursor: pointer;
                font-weight: 400 !important;
                &:hover {
                    background-color: #eeeff2;
                    border-radius: 5px;
                }
                &.active {
                    color: #1f74ff !important;
                    background: rgba(31, 116, 255, 0.1) !important;
                    font-weight: 600 !important;
                    border-radius: 5px;
                }
            }
        }
        .disabled {
            background-color: #fff;
            cursor: not-allowed;
            }
        }
    .search-mobile{
        .company-list {
            min-width: unset;
            max-height: 250px;
            left: 0;
            right: 0;
        }
    }
    .table-mobie{
        table-layout: fixed;
        th,td{
            &:nth-child(1){
                width: 60px;
            }
            &:nth-child(2){
                width: 150px;
            }
            &:nth-child(3){
                width: 120px;
            }
            &:nth-child(4){
                width: 150px;
            }
            &:nth-child(5){
                width: 100px;
            }
            &:nth-child(6){
                width: 150px;
            }
            &:nth-child(7){
                width: 110px;
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
    }
    .slot-ios .ldc-select-show-option .title-select {
        width: auto;
    }
}
</style>