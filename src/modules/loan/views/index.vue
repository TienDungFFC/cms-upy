<template>
    <div class="loan container-fluid">
        <div v-if="$detect === 'web'" class="d-flex align-items-end justify-content-end pb-4">
            <div class="mr-3" style="width: 300px;">
                <label class="font-weight-bold">Tìm kiếm người dùng</label>
                <div class="search" v-click-outside="outsideSearch">
                <input
                    v-model="keywordUser"
                    type="text"
                    class="form-control size-input"
                    placeholder="Tìm kiếm theo tên hoặc số điện thoại"
                    @focus="e => {
                        e.target.select();
                        focusSearch('web')
                    }"
                    @input="searchUser"
                />
                <ul v-if="showSearch" class="user-list">
                    <template v-if="keywordUser == ''">
                        <li v-for="(user, index) in users"
                            :key="index"
                            @click="search(user)"
                            class="user-item">
                            {{ user.name }}-({{user.phone}})
                        </li>
                    </template>
                    <template v-else>
                        <li v-for="(user, index) in users"
                            :key="index"
                            @click="search(user)"
                            class="user-item">
                            {{ user.name }}-({{user.phone}})
                        </li>
                        <li v-if="users.length === 0"
                            class="user-item text-center text-black-50">
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
                v-model="type"
                placeholder="Lọc trạng thái"
                class="size-input"
                @change="changeActive"
                style="width: 100%"
                >
                <ldc-option
                v-for="item in optionsLoan"
                :key="item.value"
                :value="item.value"
                :label="item.label">
                </ldc-option>
                </ldc-select>
            </div>
            <div>
                <button
                class="btn btn-secondary"
                :disabled=" 
                type === '' && 
                keywordUser === '' && 
                id_user === ''"
                style="height: 32px; width: 100%"
                @click="clearFilter()"
                >
                Bỏ lọc
                </button>
            </div>
        </div>
        <div v-if="$detect === 'mobile'" class="filter d-flex align-items-center justify-content-between mt-3">
            <div class="position-relative w-100 mr-3">
                <input
                v-model="keywordUser"
                type="text"
                class="form-control size-input"
                placeholder="Tìm kiếm theo tên hoặc số điện thoại"
                @focus="focusSearch('mobile')"
                />
                <span
                    v-if="keywordUser !== ''"
                    class="position-absolute"
                    style="top: 50%; right: 6px; transform: translateY(-50%);"
                    @click="clearKeyword()">
                    <i class="icon ion-md-close-circle-outline" style="color: #d5d5d5; font-size: 18px;"></i>
                </span>
            </div>
            <i @click="dialog=true" class="h3 icon ion-md-funnel mb-0"></i>
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
                    <ldc-select-show-option v-model="type" placeholder="Lọc trạng thái">
                        <ldc-option-show 
                            v-for="item in optionsLoan"
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
        <div class="row mt-3 mt-md-5">
            <div class="col-12 border-bottom bg-white">
                <div class="table-responsive">
                    <table :class="{'table table-striped' : true, 'table-mobie': $detect === 'mobile'}">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Họ tên</th>
                                <th>Số điện thoại</th>
                                <th>Số tiền ứng</th>
                                <th>Thời gian cập nhật</th>
                                <th class="text-center">Số kỳ</th>
                                <th class="text-center">Trạng thái Khoản vay</th>
                                <th class="text-right" style="min-width: 100px" width="100px">
                                Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(loan, i) in loans" :key="i">
                                <td>{{ loan.loan_contract_id }}</td>
                                <td>
                                    <router-link 
                                        :to="loan.show ? goDetail(loan) : ''"  
                                        class="format-link" 
                                        :style="!loan.show ? 'cursor: default' : ''">
                                        {{ loan.user ? loan.user.data.name : ''}}
                                    </router-link>
                                </td>
                                <td>{{ loan.user ? loan.user.data.phone : ''}}</td>
                                <td>{{ $formatNumber(loan.loan) }}</td>
                                <td>{{ loan.time_updated }}</td>
                                <td class="text-center">{{ `${loan.period_is_paid}/${loan.total_period}` }}</td>
                                <td class="text-center"> {{loan.type}} </td>
                                <td class="text-right">
                                    <router-link v-if="loan.show" :to="goDetail(loan)">
                                        <button :disabled="loading" class="btn btn-primary">
                                            Chi tiết
                                        </button>
                                    </router-link>
                                </td>
                            </tr>
                            <no-data :data="loans" :colspan="8" />
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
                class="pt-4"
                />
            </div>
        </div>
    </div>
</template>
<script>
import { getLoans } from "@/repositories/loan.js";
import { getUsers, detailUser } from "@/repositories/user.js";
import { optionsLoan } from "@/constants/optionsLoan.js";
export default {
    data() {
        return {
        dialog: false,
        loans:[],
        optionsLoan: optionsLoan,
        users: [],
        id_user: this.$route.query.id_user ? this.$route.query.id_user : "",
        type: this.$route.query.type ? parseInt(this.$route.query.type) : "",
        keywordUser:"",
        page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
        totalPages: 0,
        timeOut: null,
        showSearch: false,
        loading: false,
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
        this.getData();
        this.getUser();
    },
    methods: {
        async getData() {
            let query = this.setQuery();
            this.loadingTable = true;
            await getLoans(query).then((res) => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.loans = res.data.data.data;
                    let pagination = res.data.data.meta.pagination;
                    this.page = pagination.current_page;
                    this.totalPages = pagination.total_pages;
                }
            });
            this.loadingTable = false;
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
                name: "loan-amount",
                query: this.setQuery(),
            });
        }, 
        //danh sach user
        async searchUser(e) {
            if(e){
                this.keywordUser = e.target.value;
            }
            this.users = [];
            this.loading = true;
            let query = {};
            query.keyword = this.keywordUser
                await getUsers(query).then((res) => {
                    if(res.data.success === API_STATUS_SUCCESS) {
                        this.users = res.data.data;
                        this.loading = false;
                    } else {
                        this.$showMessage(res.data.message, 'warning');
                    }
                });
        },
        //tim user theo ten user
        search(user) {
            this.page = 1;
            this.keywordUser = `${user.name}-(${user.phone})`;
            this.id_user = user.id;
            this.showSearch = false;
            this.changeUrl();
        },
        getUser() {
            getUsers().then((res) => {
                this.users = res.data.data;
                this.setUser();
            });
        },
        setUser(){
            if(this.$route.query.id_user){
                detailUser(this.$route.query.id_user).then((res) => {
                    this.keywordUser = `${res.data.data ? res.data.data.name+'-'+res.data.data.phone : ''}`;
                });
            }
        },
        focusSearch(key) { 
            if(key === 'web'){
                this.showSearch = true;
            }else{
                this.$router.push({
                name: 'loan-amount-find-user',
                query: {
                    id: this.$route.query.id_user,
                    keyword: this.$route.query?.keywordMb ? this.$route.query.keywordMb : ''
                }
                })
            }
            
        },
        async outsideSearch() {
            this.showSearch = false;
        },

        clearKeyword(){
            this.keywordUser = '';
            this.id_user = '';
            this.page = 1;
            this.changeUrl();
        },

        setQuery() {
            let query = {};
            if (this.type !== "") query.type = parseInt(this.type);
            if (this.id_user !== "") query.id_user = this.id_user
            if (this.page > 1) query.page = this.page;
            return query;
        },
        // bo chon
        clearFilter() {
            this.id_user = "";
            this.keywordUser = "";
            this.type = "";
            this.page = 1;
            this.changeUrl();
        },
        goDetail(loan) {
            return {
                name: 'loan-amount-show',
                params: {
                    id: loan.id,
                    id_user: loan.id_user,
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
.loan{
    .search {
        position: relative;
        .user-list {
            max-height: 300px;
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
            .user-item {
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
    
    .search-mobile {
        .user-list {
            max-height: 250px;
            min-width: unset;
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
                width: 150px;
            }
            &:nth-child(6){
                width: 100px;
            }
            &:nth-child(7){
                width: 200px;
            }
        }
    }
}
</style>