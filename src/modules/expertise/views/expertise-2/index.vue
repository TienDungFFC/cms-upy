<template>
    <div class="expertise-2 container-fluid">
        <div v-if="$detect === 'web'" class="d-flex justify-content-end align-items-end flex-wrap pb-4">
                <div>
                    <label class="font-weight-bold">Từ khoá</label>
                    <div v-if="!user_name" class="search" v-click-outside="outsideSearch">
                        <input v-model="keyword" 
                            type="text" 
                            class="form-control size-input" 
                            placeholder="Tìm kiếm theo họ tên, SĐT" 
                            @focus="focusSearch()"
                            @input="searchUser(keyword)">
                        <ul v-if="showSearch && keyword" class="user-list">                                        
                            <li v-for="(user, index) in users"
                                :key="index"
                                @click="search(user)"
                                class="user-item">
                                {{ user.name }} ({{ user.phone }})
                            </li>
                            <li v-if="users.length === 0" class="user-item text-center text-black-50">
                                <span v-if="loading">Đang tìm kiếm</span>
                                <span v-else>Không có dữ liệu</span>
                            </li>
                        </ul>                                                       
                    </div>  
                    <input
                        v-else
                        v-model="user_name"
                        @input="clearFilter()"
                        @click="focusSearch()"
                        class="form-control size-input"
                        placeholder="Tìm kiếm"
                    >                            
                </div>
                <div class="px-4">
                    <label class="font-weight-bold">Trạng thái</label>
                    <ldc-select
                        v-model="status"
                        placeholder="Lọc trạng thái"
                        style="width: 100%"
                        @change="changeStatus">
                        <ldc-option
                            v-for="item in optionsStatus"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :actionKeyBoard="false">
                        </ldc-option>
                    </ldc-select>
                </div>               
                <div>
                    <button class="btn btn-secondary"
                        :disabled="status === '' && id_user === '' && keyword === '' && user_name === ''"
                        style="height:32px; width:100%"
                        @click="clearFilter()">
                            Bỏ lọc
                    </button>
                </div>       
        </div>

        <div v-else class="d-flex align-items-center justify-content-end py-3">
            <div class="mb-0 flex-grow-1 mr-2">
                <div class="position-relative">
                    <div v-if="!user_name" :class="{'search' : true , 'search-mobile' : $detect === 'mobile'}" v-click-outside="outsideSearch">
                        <input v-model="keyword" 
                            type="text" 
                            class="form-control size-input" 
                            placeholder="Tìm kiếm theo họ tên, SĐT" 
                            @focus="focusSearchMobile()"
                            @input="searchUser(keyword)">
                        <ul v-if="showSearch && keyword" class="user-list">                                        
                            <li v-for="(user, index) in users"
                                :key="index"
                                @click="search(user)"
                                class="user-item">
                                {{ user.name }} ({{ user.phone }})
                            </li>
                            <li v-if="users.length === 0" class="user-item text-center text-black-50">
                                <span v-if="loading">Đang tìm kiếm</span>
                                <span v-else>Không có dữ liệu</span>
                            </li>
                        </ul>                                                       
                    </div>  
                    <input
                        v-else
                        v-model="user_name"
                        @input="clearFilter()"
                        @focus="focusSearchMobile()"
                        class="form-control size-input"
                        placeholder="Tìm kiếm"
                    >   
                    <span
                        v-if="user_name !== ''"
                        class="position-absolute"
                        style="top: 50%; right: 6px; transform: translateY(-50%);"
                        @click="clearUsername()">
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
                        <ldc-select-show-option
                            v-model="status"
                            placeholder="Lọc trạng thái"
                            style="width: 100%"
                            :actionKeyBoard="false">
                            <ldc-option-show
                                v-for="item in optionsStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </ldc-option-show>
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
            <div class="text-right" @click="dialog = true">
                <i class="h3 icon ion-md-funnel"></i>
            </div>
        </div>     

        <div class="row main position-relative bg-white">
            <div class="col-12">
                <div class="table-responsive">
                    <table :class="{'table table-striped' : true, 'table-mobile' : $detect === 'mobile'}">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Họ tên</th>
                                <th>Số điện thoại</th>
                                <th>Công ty</th>
                                <th v-if="$detect === 'web'">Thời gian phê duyệt TĐ1</th>
                                <th>Trạng thái</th>
                                <th width="100">Hành động</th>  
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in expertiseList" :key="item.id">
                                <td> {{ item.loan_id }} </td>
                                <td>
                                    <router-link 
                                        :to="item.appraised ? goDetail(item) : ''" 
                                        class="format-link" 
                                        :style="!item.appraised ? 'cursor: default' : ''">
                                            {{ item.user ? item.user.data.name : item.name_user }} 
                                    </router-link>
                                </td>
                                <td> {{ item.user ? item.user.data.phone : item.phone_user }} </td>
                                <td> {{ item.name_enterprise }} </td>
                                <td v-if="$detect === 'web'"> {{ item.time_updated }} </td>
                                <td> {{ item.status_text }} </td>
                                <td>
                                    <router-link v-if="item.appraised" :to="goDetail(item)">
                                        <button :disabled="loading" class="btn btn-primary">
                                            Chi tiết
                                        </button>
                                    </router-link>
                                </td>                                
                            </tr>
                            <no-data :data="expertiseList" :colspan="$detect === 'web' ? 7 : 6" />
                        </tbody>
                    </table>
                </div>
            </div>  

            <div class="col-12">
                <ldc-pagination
                    :current_page="page"
                    :last_page="total"
                    :scroll_top="true"
                    :callData="changePage"
                    class="pt-4 border-top"
                >
                </ldc-pagination>  
            </div>           
                    
        </div>
    </div>
</template>
<script>
import { getUsers, detailUser } from '@/repositories/user';
import { getExpertise2, } from '@/repositories/expertise-2'
export default {
    data() {
        return {
            optionsStatus: [
                {
                    value: 1,
                    label: 'Pass TĐ1'
                },
                {
                    value: 2,
                    label: 'Duyệt thành công'
                },
                {
                    value: 3,
                    label: 'Từ chối'
                }
            ],
            expertiseList: [],
            page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
            pageSize: 0,
            total: 0,
            timeOut: null,
            status: this.$route.query.status ? parseInt(this.$route.query.status) : '',
            keyword: '',
            id_user: this.$route.query.id_user ? this.$route.query.id_user : '',
            user_name: '',
            loading: false,
            users: [],
            showSearch: false,
            dialog: false
        }
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
    async created() {
        if (this.id_user) {
            this.detailUser(this.id_user);
        } else {
            if(!this.$route.query.status) {
                this.status = 1;
                this.changeUrl();
            } else {
                this.getData();
            }
        }
        this.$eventBus.$on('refresh_list_td2', data => {
            this.getData()
        })

        if(this.page == 1) {
            this.$eventBus.$on('new_td2', data => {
                this.getData()
            })
        }
    },
    methods: {
        focusSearch() {
            this.showSearch = true
        },
        focusSearchMobile() {
            this.$router.push({
                name: 'expertise-2-search',
                query: this.$route.query
            })
        },
        outsideSearch() {
            this.keyword = '';
            this.showSearch = false;
        },
        searchUser(keyword) {
            this.users = [];
            if(keyword) {
                this.loading = true;
                let query = {}
                query.keyword = keyword;
                if (this.timeOut) clearTimeout(this.timeOut);
                this.timeOut = setTimeout(() => {
                    getUsers(query).then(res => {
                        this.users = res.data.data
                        this.loading = false;     
                    })
                }, 500);   
            }
        },
        detailUser(id) {
            detailUser(id).then(res => {
                let data = res.data.data;
                this.user_name = data.name + ' (' + data.phone + ')';
                this.getData();
            }).catch(err => {
                this.$showMessage(err.data.data.message, 'error');
                this.id_user = '';
                this.changeUrl();
            })
        },
        changePage(page) {
            this.page = page;
            this.changeUrl();
        },
        changeUrl() {
            let query = this.setQuery();           
            this.$router.push({
                name: 'expertise-2',
                query: query,
            })
        },
        setQuery() {
            let query = {};
            if (this.status !== '') query.status = this.status;
            if (this.id_user !== '') query.id_user = this.id_user;
            if (this.page > 1) query.page = this.page;
            return query;
        },
        clearFilter() {
            this.keyword = '';
            this.id_user = '';
            this.user_name = '';
            this.status = '';
            this.page = 1;
            this.changeUrl();
        },
        clearUsername() {
            this.user_name = '';
            this.id_user = '';            
            this.page = 1;
            this.changeUrl();
        },
        changeStatus() {
            this.page = 1;
            this.changeUrl();
        },
        async getData(id_user) {
            this.loading = true;
            let query = {};
            query = this.setQuery();
            if(id_user) {
                query.id_user = id_user
            }
            await getExpertise2(query).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    let data = res.data;
                    this.expertiseList = data.data;
                    let pagination = data.meta.pagination;
                    this.page = pagination.current_page;
                    this.pageSize = pagination.per_page;
                    this.total = pagination.total_pages;
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }
            })
            this.loading = false
        },
        async search(user) {
            this.id_user = user.id;
            this.user_name = user.name + ' (' + user.phone + ')';
            this.changeUrl();
            this.outsideSearch();
        },
        goDetail(item) {
            return {
                name: 'expertise-2-show',
                params: {
                    id: item.id,
                },
                query: {
                    redirect: this.$encodeRedirect(this.setQuery())
                }
            }
        },       
    }
}
</script>
<style lang="scss" scoped>
.expertise-2 {
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
                    background-color: #EEEFF2;
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
            left: 0;
            right: 0;
            min-width: unset;
            max-height: 200px;
        }
    }
    .table-mobile {
        table-layout: fixed;
        th,td {
            width: 160px;
            overflow: hidden;
            text-overflow: ellipsis;
            &:first-child {
                width: 70px;
            }
            &:nth-child(3) {
                width: 120px;
            }
            &:last-child {
                width: 100px;
            }
        }
    }
}
</style>