<template>
    <div class="account-admin_area container-fluid">
        <slot/>
        <div class="d-flex align-items-end justify-content-between flex-wrap py-3">
            <div :class="{'d-flex align-items-center justify-content-between' : true, 'w-100' : $detect === 'mobile'}">
                <button v-if="$myCanCreate()" class="btn btn-success" @click="goCreate()">
                    + Tạo tài khoản
                </button>
                <div v-if="$detect === 'mobile'" class="filter" @click="dialog=true">
                    <i class="h3 icon ion-md-funnel"></i>
                </div>
            </div>
            <div v-if="$detect === 'web'"  class="row align-items-end flex-wrap pt-lg-3 pt-xl-0">
                <div class="col-sm-12 col-md-6 col-lg pt-3 pt-sm-3 pt-lg-0">
                    <label class="font-weight-bold">Từ khoá</label>
                    <input
                        v-model="keyword"
                        class="form-control size-input"
                        placeholder="Tìm kiếm"
                        @input="search()">                    
                </div>
                <div class="col-sm-12 col-md-6 col-lg pt-3 pt-sm-3 pt-lg-0">
                    <label class="font-weight-bold">Trạng thái</label>
                    <ldc-select
                        v-model="active"
                        placeholder="Lọc trạng thái"
                        style="width: 100%"
                        @change="changeActive"
                        :actionKeyBoard="false">
                        <ldc-option
                            v-for="item in optionsActive"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </ldc-option>
                    </ldc-select>
                </div>               
                <div class="col-sm-12 col-md-6 col-lg-2 pt-3 pt-sm-3 pt-lg-0">
                    <button class="btn btn-secondary"
                        :disabled="active === '' && keyword === ''"
                        style="height:32px; width:100%"
                        @click="clearFilter()">
                            Bỏ lọc
                    </button>
                </div>
            </div>            
        </div>
        <div v-if="$detect === 'mobile'" input-search>
            <div class="position-relative" content-input-search>
                <input
                    v-model="keyword"
                    class="form-control size-input"
                    placeholder="Tìm kiếm"
                    @input="search()"
                    @keyup.enter="getData()">
                    <span
                        v-if="keyword !== ''"
                        class="position-absolute"
                        style="top: 50%; right: 6px; transform: translateY(-50%);"
                        @click="clearKeyword()">
                        <i class="icon ion-md-close-circle-outline" style="color: #d5d5d5; font-size: 18px;"></i>
                    </span>
            </div>                    
            <ldc-model-mobile
                titileCancel="Hủy"
                :showCancel="false"
                :showTitle="true"
                title="Tìm kiếm nâng cao"
                :customButton="true"
                :visible.sync="dialog">
                <div slot="content-model">                   
                    <ldc-select-show-option v-model="active" placeholder="Trạng thái">
                        <ldc-option-show 
                            v-for="item in optionsActive"
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
        <div class="row">
            <div class="col-12">
                <div class="table-responsive">
                    <table :class="{'table table-striped' : true, 'table-mobile' : $detect === 'mobile'}">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Họ tên</th>
                                <th>Username</th>
                                <th v-if="$detect === 'web'">Truy cập cuối</th>
                                <th v-if="$detect === 'web'">Quyền</th>
                                <th>Trạng thái</th>
                                <th width="100px">Hành động</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in accountAdmin" :key="item.id">
                                <td>{{ item.user_id }}</td>
                                <td @click="goDetail(item)" class="pointer">{{ item.name }}</td>
                                <td>{{ item.username }}</td>
                                <td v-if="$detect === 'web'">{{ item.last_login }}</td>
                                <td v-if="$detect === 'web'"> 
                                    <div v-for="item_permision in item.permissions.data" :key="item_permision.id"> 
                                        {{ item_permision.permission}}
                                    </div> 
                                </td>
                                <td> 
                                    <span v-if="item.active == 1" style="color: #67c23a">Hoạt động </span>
                                    <span v-else style="color: #f56c6c">Tạm khóa</span>
                                </td>
                                <td>
                                    <button :disabled="loading" @click="goDetail(item)" class="btn btn-primary">
                                        Chi tiết
                                    </button>
                                </td>                                
                            </tr>
                            <no-data :data="accountAdmin" :colspan="$detect === 'web' ? 7 : 5"/>
                        </tbody>
                    </table>
                </div>
            </div>  
            <div class="col-12">
                <ldc-pagination
                    :current_page="page"
                    :last_page="totalPages"
                    :scroll_top="true"
                    :callData="changePage"
                    class="pt-4 border-top"
                >
                </ldc-pagination>  
            </div>          
        </div>
       <detailAccount
            :visible.sync="dialogAccount"
            :status="statusDetailAccount"
            :account="accountShow"
            @callData="callData"
        />
        
        
    </div>
</template>

<script>
import { optionsActive } from '@/constants/optionsActive';
import { getAccountAdmin, detailAccountAdmin } from '@/repositories/account-admin';
export default {
    components: {
        detailAccount: () => import('./show')
    },
    data() {
        return {
            dialog: false,
            loading: false,
            optionsActive: optionsActive, 
            accountAdmin: [],
            page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
            pageSize: 0,
            total: 0,
            totalPages: 0,
            timeOut: null,
            active: this.$route.query.active ? parseInt(this.$route.query.active) : '',
            keyword: this.$route.query.keyword ? this.$route.query.keyword : '',
            dialogAccount: false,
            statusDetailAccount: 'create',
            accountShow: {},
            id_business: this.$route.params.id
        }
    },
    computed: {
        query() {
            return this.$route.query;
        },
        id_business_partner() {
            return this.$store.state.profile.user.business?.data.id;
        }
    },
    watch: {
        query(val) {
            this.getData();
        },
    },
    created() {
        this.getData();
    },
    methods: {
        changePage(page = 1) {
            this.page = page;
            this.changeUrl();
        },
        changeUrl() {
            this.$router.push({
                name: this.$route.name,
                query: this.setQuery(),
            })
        },
        setQuery() {
            let query = {};
            if (this.active !== '') query.active = parseInt(this.active);
            if (this.keyword !== '') query.keyword = this.keyword;
            if (this.page > 1) query.page = this.page;
            return query;
        },
        clearFilter() {
            this.keyword = '';
            this.active = '';
            this.page = 1;
            this.changeUrl();
        },
        clearKeyword() {
            this.keyword = '';            
            this.page = 1;
            this.changeUrl();
        },
        changeActive() {
            this.page = 1;
            this.changeUrl();
        },
        async getData() {
            this.loading = true;
            let query = this.setQuery();
            if(this.$route.name === 'account-cms') {
                query.classify = 'ADMIN_CMS';
            } else {
                query.classify = 'PARTNER';
                query.id_business = this.id_business || this.id_business_partner;
            }
            await getAccountAdmin(query).then(res => {
                this.accountAdmin = res.data.data.data;
                let pagination = res.data.data.meta.pagination;
                this.page = pagination.current_page;
                this.pageSize = pagination.per_page;
                this.total = pagination.total;
                this.totalPages = pagination.total_pages;
            })
            this.loading = false;
        },
        search() {
            this.loading = true;
            if (this.timeOut) clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() => {
                this.page = 1;
                this.changeUrl();
                this.loading = false;
            }, 500);
        },
        goCreate() {
            if(this.$detect === 'web') {
                this.dialogAccount = true;
                this.statusDetailAccount = 'create';
            } else {
                if(this.$route.name === 'account-cms') {
                    this.navigationRoute('account-cms-add');
                } else if (this.$route.name === 'company-information') {
                    this.navigationRoute('company-information-account-add');
                } else {
                    this.$router.push({
                        name: 'account-partner-add',
                        params: {
                            id_business: this.id_business,
                        },
                        query: {
                            redirect: this.$encodeRedirect(this.setQuery())
                        }
                    })       
                }
            }
        },
        async goDetail(account) {
            if(this.$detect === 'web') {
                await detailAccountAdmin(account.id).then(res => {
                    this.accountShow = res.data.data
                })
                this.dialogAccount = true;
                this.statusDetailAccount = 'show';
            } else {
                if(this.$route.name === 'account-cms') {
                    this.navigationRoute('account-cms-show', account.id);
                } else if (this.$route.name === 'company-information') {
                    this.navigationRoute('company-information-account-show', account.id);
                } else {
                    this.navigationRoute('account-partner-show', account.id);                    
                }
            }
        },
        navigationRoute(routerName, id) {
            this.$router.push({
                name: routerName,
                params: {
                    id: id,
                },
                query: {
                    redirect: this.$encodeRedirect(this.setQuery())
                }
            })
        },
        callData(e) {
            if (e) {
                if (this.statusDetailAccount === 'create') {
                    this.page = 1;
                    this.keyword = '';
                    this.changeUrl();
                    this.getData();
                } else {
                    this.getData();
                }

            }
        },
    }
}
</script>

<style lang="scss">
.account-admin_area {
    .table-mobile {
        table-layout: fixed;
        th,td {
            width: 160px;
            overflow: hidden;
            text-overflow: ellipsis;
            &:first-child {
                width: 70px;
            }
            &:nth-child(4) {
                width: 130px;
            }
            &:nth-child(5) ,&:last-child {
                width: 100px;
            }
        }
    }
}
</style>