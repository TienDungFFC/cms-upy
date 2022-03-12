<template>
    <div class="user-management container-fluid">
        <div v-if="$detect === 'web'" class="d-flex align-items-end justify-content-end pb-4">
            <div class="mr-3">
                <label class="font-weight-bold">Tìm kiếm người dùng</label>
                <input
                v-model="keywordUser"
                type="text"
                class="form-control size-input"
                placeholder="Tìm kiếm người dùng"
                @input="searchUser"
                />
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
                        <template v-if="keywordCompany == ''">
                            <li
                                v-for="(company, index) in companies"
                                :key="index"
                                @click="search(company)"
                                class="company-item"
                            >
                                {{ company.name }}
                            </li>
                        </template>
                        <template v-else>
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
                v-model="active"
                placeholder="Lọc trạng thái"
                class="size-input"
                @change="changeActive"
                style="width: 100%"
                >
                <ldc-option
                    v-for="item in optionsActive"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                >
                </ldc-option>
                </ldc-select>
            </div>
            <div class="mr-3">
                <label class="font-weight-bold">Lọc tài khoản</label>
                <ldc-select
                v-model="borrowed_money"
                placeholder="Loại tài khoản"
                style="width: 100%"
                class="size-input"
                @change="changeActive"
                >
                <ldc-option
                    v-for="item in optionsType"
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
                    active === '' &&
                    keywordUser === '' &&
                    borrowed_money === '' &&
                    keywordCompany === '' &&
                    id_business === ''
                "
                style="height: 32px; width: 80px"
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
                placeholder="Tìm kiếm người dùng"
                @input="searchUser"
                />
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
                    <ldc-select-show-option v-model="active" placeholder="Lọc trạng thái">
                        <ldc-option-show 
                            v-for="item in optionsActive"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"/>
                    </ldc-select-show-option>
                    <ldc-select-show-option v-model="borrowed_money" placeholder="Lọc tài khoản">
                        <ldc-option-show 
                            v-for="item in optionsType"
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
                            <th>Nợ xấu</th>
                            <th>Công ty</th>
                            <th>Loại User</th>
                            <th>Trạng thái</th>
                            <th class="text-center" style="min-width: 150px" width="150px">
                            Hành động
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, i) in users" :key="i">
                                <td>{{ user.user_id }}</td>
                                <td>
                                    <router-link :to="goDetail(user)" class="format-link">
                                        {{ user.name }}
                                    </router-link>
                                </td>
                                <td>{{ user.phone }}</td>
                                <td>
                                    <span v-if="user.bad_bebit">Có</span>
                                    <span v-else>Không</span>
                                </td>
                                <td>{{ user.business ? user.business.data.name : user.name_business }}</td>
                                <td>
                                    {{ user.borrowed_money }}
                                </td>
                                <td>
                                    <span class="text-success" v-if="user.active == 1">Hoạt động</span>
                                    <span class="text-danger" v-else>Tạm khóa</span>
                                </td>
                                <td>
                                    <router-link :to="goDetail(user)">
                                        <button class="btn btn-primary mr-2">
                                            Chi tiết
                                        </button>
                                    </router-link>
                                    <button v-if="$myCanDelete()" @click="destroy(user)" class="btn btn-danger">
                                        xóa
                                    </button>
                                </td>
                            </tr>
                            <no-data :data="users" :colspan="8" />
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
import { getUsers, deleteUser } from "@/repositories/user.js";
import { getPartner, detailPartner } from "@/repositories/partner.js";
import { optionsActive } from "@/constants/optionsActive.js";
import { optionsType } from "@/constants/userType.js";
export default {
    data() {
        return {
            dialog: false,
            users: [],
            companies: [],
            optionsActive: optionsActive,
            optionsType: optionsType,
            active: this.$route.query.active ? parseInt(this.$route.query.active): "",
            borrowed_money: this.$route.query.borrowed_money? parseInt(this.$route.query.borrowed_money): "",
            id_business: this.$route.query?.id_business ? this.$route.query.id_business : "",
            keywordUser: this.$route.query?.keyword ? this.$route.query.keyword : "",
            keywordCompany: "",
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
         this.getCompany();
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
        getData() {
            let query = this.setQuery();
            getUsers(query).then((res) => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.users = res.data.data;
                    let pagination = res.data.meta.pagination;
                    this.page = pagination.current_page;
                    this.totalPages = pagination.total_pages;
                    } else {
                            this.$showMessage(res.data.message, 'warning');
                    }
            });
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
                name: "user",
                query: this.setQuery(),
            });
        },
        searchUser(e) {
            if(e) {
                this.keywordUser = e.target.value;
            }
            if (this.timeOut) clearTimeout(this.timeOut);
                this.timeOut = setTimeout(() => {
                    this.page = 1;
                    this.changeUrl();
                }, 500);
        },
        setQuery() {
            let query = {};
            if (this.active !== "") query.active = parseInt(this.active);
            if (this.borrowed_money !== "")query.borrowed_money = this.borrowed_money;
            if (this.id_business !== "") query.id_business = this.id_business;
            if (this.keywordUser !== "") query.keyword = this.keywordUser;
            if (this.page > 1) query.page = this.page;
            return query;
        },

        //xoa user
        async destroy(user) {
            if(!this.$myCanDelete()) return;
            await this.$confirm(
                `Bạn có chắc muốn xóa người dùng <b>${user.name}</b>`,
                "Xóa người dùng",
                {
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Hủy",
                type: "error",
                }).then(async () => {
                    this.loading = true;
                    await deleteUser(user.id).then((res) => {
                       if(res.data.data.success === API_STATUS_SUCCESS) {
                        this.$showMessage(res.data.data.message, 'success');
                        this.getData();
                        } else {
                            this.$showMessage( res.data.data.message, 'warning');
                        }
                    }).catch((err) => {
                        if (err.status == HTTP_CODE_GONE) {
                            this.$showMessage(err.data.data.message,"warning");
                        }
                    });
                    this.loading = false;
                }).catch(() => {});
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
        //tim user theo ten cty
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
            }else{
                this.$router.push({
                name: 'user-find-company',
                query: {
                    id: this.$route.query.id_business,
                    keyword: this.$route.query?.keywordCompanyMb ? this.$route.query.keywordCompanyMb : ''
                    }
                })
            }
        },

        async outsideSearch() {
            this.showSearch = false;
        },
        clearKeywordUser() {
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
            this.id_business = "";
            this.keywordUser = "";
            this.keywordCompany = "";
            this.active = "";
            this.borrowed_money = "";
            this.getCompany();
            this.changeUrl();
        },
        goDetail(user) {
            return {
                name: 'user-show',
                params: {
                    id: user.id,
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
.user-management {
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
                width: 100px;
            }
            &:nth-child(5){
                width: 200px;
            }
            &:nth-child(6){
                width: 110px;
            }
            &:nth-child(7){
                width: 100px;
            }
        }
    }
}
</style>