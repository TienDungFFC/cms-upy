<template>
    <div class="permissions_area container-fluid">
        <div class="d-flex align-items-end justify-content-between flex-wrap py-3">
            <div :class="{'d-flex align-items-center justify-content-between' : true, 'w-100' : $detect === 'mobile'}">
                <router-link v-if="$myCanCreate()" :to="goCreate()">
                    <button class="btn btn-success">
                        + Tạo nhóm quyền
                    </button>
                </router-link>
                <div v-if="$detect === 'mobile'" class="filter" @click="dialog=true">
                    <i class="h3 icon ion-md-funnel"></i>
                </div>
            </div>
            <div v-if="$detect === 'web'" class="row align-items-end flex-wrap pt-lg-3 pt-xl-0">
                <div class="col-sm-12 col-md-6 col-lg pt-3 pt-sm-3 pt-lg-0">
                    <label class="font-weight-bold">Từ khoá</label>
                    <input
                        v-model="keyword"
                        class="form-control size-input"
                        placeholder="Tìm kiếm"
                        @input="search()"
                    >                        
                </div>               
                <div class="col-sm-12 col-md-6 col-lg pt-3 pt-sm-3 pt-lg-0">
                    <label class="font-weight-bold">Loại tài khoản</label>
                    <ldc-select
                        v-model="type"
                        placeholder="Loại tài khoản"
                        style="width: 100%"
                        class="size-input"
                        @change="changeActive"
                        :actionKeyBoard="false">
                        <ldc-option
                            v-for="item in optionsType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </ldc-option>
                    </ldc-select>
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
                        :disabled="active === '' && type === '' && keyword === ''"
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
                    <ldc-select-show-option v-model="type" placeholder="Loại tài khoản">
                        <ldc-option-show 
                            v-for="item in optionsType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"/>
                    </ldc-select-show-option>
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
                                <th>Tên nhóm</th>
                                <th>Số user</th>
                                <th v-if="$detect === 'web'">Sửa đổi cuối</th>
                                <th>Loại tài khoản</th>
                                <th>Trạng thái</th>
                                <th width="160px">Hành động</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in permissions" :key="item.id">
                                <td>{{ item.permission_id }}</td>
                                <td>
                                    <router-link :to="goDetail(item)" class="format-link">
                                        {{ item.permission }}
                                    </router-link>
                                </td>
                                <td>{{ item.count_user }}</td>
                                <td v-if="$detect === 'web'">{{ item.time_updated }}</td>
                                <td>{{ item.type_text }}</td>
                                <td>
                                    <span :style="item.active === 1 ? 'color: #67c23a' : 'color: #f56c6c'">
                                        {{ item.active_text }}
                                    </span>
                                </td>
                                <td>
                                    <router-link :to="goDetail(item)">
                                        <button :disabled="loading" class="btn btn-primary mr-3">
                                            Chi tiết
                                        </button>
                                    </router-link>
                                    <button v-if="$myCanDelete()" :disabled="loading" @click="destroy(item)" class="btn btn-danger mt-sm-2 mt-md-0">
                                        Xoá
                                    </button>
                                </td>                                
                            </tr>
                            <no-data :data="permissions" :colspan="$detect === 'web' ? 6 : 5"/>
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
                    class="pt-4 border-top"/>
            </div>          
        </div>
    </div>
</template>

<script>
import { optionsType } from '@/constants/permission';
import { optionsActive } from '@/constants/optionsActive';
import { getPermission, deletePermission } from '@/repositories/permission';
export default {
    data() {
        return {
            dialog: false,
            loading: false,
            optionsActive: optionsActive,            
            optionsType: optionsType,            
            permissions: [],
            type: this.$route.query.type ? this.$route.query.type : '',
            page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
            pageSize: 0,
            totalPages: 0,
            timeOut: null,
            active: this.$route.query.active ? parseInt(this.$route.query.active) : '',
            keyword: this.$route.query.keyword ? this.$route.query.keyword : '',
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
    created() {
        this.getData();        
    },
    methods: {
        changePage(page) {
            this.page = page;
            this.changeUrl();
        },
        changeUrl() {
            this.$router.push({
                name: 'permission',
                query: this.setQuery(),
            })
        },
        setQuery() {
            let query = {};
            if (this.active !== '') query.active = parseInt(this.active);
            if (this.type !== '') query.type = this.type;
            if (this.keyword !== '') query.keyword = this.keyword;
            if (this.page > 1) query.page = this.page;
            return query;
        },
        clearFilter() {
            this.keyword = '';
            this.type = '';
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
        getData() {
            let query = this.setQuery();            
            getPermission(query).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.permissions = res.data.data.data;
                    let pagination = res.data.data.meta.pagination;
                    this.page = pagination.current_page;
                    this.pageSize = pagination.per_page;
                    this.totalPages = pagination.total_pages;
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }                
            })
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
            return {
                name: 'permission-add',
                query: {
                    redirect: this.$encodeRedirect(this.setQuery())
                }
            }
        },
        goDetail(permission) { 
            return {
                name: 'permission-show',
                params: {
                    id: permission.id,
                },
                query: {
                    redirect: this.$encodeRedirect(this.setQuery())
                }
            }
        },
        async destroy(permission) {
            if(!this.$myCanDelete()) return
            await this.$confirm(`Bạn có chắc chắn xóa nhóm quyền <b>${permission.permission}</b>`, 'Xóa nhóm quyền', {
                confirmButtonText: 'Đồng ý',
                cancelButtonText: 'Hủy',
                type: 'error'
            }).then(async () => {
                this.loading = true;
                await deletePermission(permission.id).then(res => {
                    if(res.data.data.success === API_STATUS_SUCCESS) {
                        this.$showMessage(res.data.data.message, 'success');
                        this.getData();
                    } else {
                        this.$showMessage( res.data.data.message, 'warning');
                    }
                }).catch(err => {
                    if (err.status === HTTP_CODE_GONE) {
                        this.$showMessage( err.data.data.message, 'warning');
                    }
                })
                this.loading = false;
            }).catch(err => {})
        },
    }
}
</script>

<style lang="scss">
.permissions_area {
    .table-mobile {
        table-layout: fixed;
        th,td {
            width: 160px;
            &:first-child {
                width: 60px;
            }
            &:nth-child(3), &:nth-child(5) {
                width: 100px;
            }
            &:last-child {
                text-align: center;
            }
        }
    }
}
</style>