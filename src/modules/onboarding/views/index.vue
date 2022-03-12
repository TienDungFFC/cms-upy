<template>
    <div class="onboarding_area container-fluid pb-">
        <div class="d-flex align-items-end justify-content-between flex-wrap py-3">
            <div :class="{'d-flex align-items-center justify-content-between' : true, 'w-100' : $detect === 'mobile'}">
                <button v-if="$myCanCreate()" class="btn btn-success" @click="goCreate()"> + Thêm mới</button>
                <div v-if="$detect === 'mobile'" class="filter" @click="dialogFilter=true">
                    <i class="h3 icon ion-md-funnel"></i>
                </div>
            </div>
            <div v-if="$detect === 'web'" class="row align-items-end flex-wrap pt-lg-3 pt-xl-0">
                <div class="col-sm-12 col-md-6 col-lg pt-3 pt-sm-3 pt-lg-0">
                    <label class="font-weight-bold">Tìm kiếm </label>
                    <input
                        v-model="keyword"
                        class="form-control size-input"
                        placeholder="Tìm kiếm"
                        @input="search()"
                    >                        
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
                :visible.sync="dialogFilter">
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
                    <table :class="{'table': true, 'table-mobile' : $detect === 'mobile' }">
                        <thead>
                            <tr>
                                <th width="80">ID</th>
                                <th width="250">Hình ảnh</th>
                                <th>Tiêu đề</th>
                                <th width="250">Trạng thái</th>
                                <th width="200">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in onboardings" :key="item.id">
                                <td> {{item.onboarding_id}} </td>
                                <td>
                                    <div class="image_onboarding">
                                        <imageBlock :url="$getUrlImage(item.image)" :edit="false" />
                                    </div>
                                </td>
                                <td style="min-width: 200px;" @click="goDetail(item)">
                                    <p class="title_onboarding pointer">
                                        {{item.title}} 
                                    </p>
                                </td>
                                <!-- <td> {{item.content}} </td> -->
                                <td>
                                    <span :class="item.active=='1'?'active':'unActive'">
                                        {{ item.active==1?'Hoạt động':'Tạm khóa'}}  
                                    </span>
                                </td>
                                <td>
                                    <button class="btn btn-primary" style="margin-right:5px" @click="goDetail(item)">
                                        Chi tiết
                                    </button>
                                    <button v-if="$myCanDelete()" class="btn btn-danger" @click="destroy(item)">
                                        Xóa
                                    </button>
                                </td>                                
                            </tr>
                            <no-data :data="onboardings" colspan="5" />
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
        <detailOnboarding
            :visible.sync="dialog"
            :status="statusDetailOnboarding"
            :onboarding="onboardingShow"
            @callData="callData"
        />
    </div>
</template>

<script>
import { optionsActive } from "@/constants/optionsActive";
import { getOnboarding, deleteOnboarding} from "@/repositories/onboarding.js";
export default {
    components: {
        detailOnboarding: () => import('./show'),
        imageBlock: () => import('@/components/imageBlock'),
    },
    data() {
        return{
            onboardings: [],
            optionsActive: optionsActive,
            dialog: false,
            dialogFilter: false,
            statusDetailOnboarding: 'create',
            onboardingShow: {},
            active: this.$route.query.active ? parseInt(this.$route.query.active) : '',
            keyword: this.$route.query?.keyword ? this.$route.query.keyword : '',
            timeOut: null,
            // phân trang
            page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
            pageSize : 0,
            totalPages: 0,
        }
    },
    computed: {
        query() {
            return this.$route.query;
        },
    },
   
    watch: {
        visible(val) {
            this.dialog = val;
            if (val) {
                this.setForm();
                if(this.form.classify) this.getPermission();
            }
        },
        dialog(val) {
            this.$emit('update:visible', val);
        }, 
        query(val) {
            this.getData();
        },
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            let query = {}
            if (this.active !== '') query.active = this.active;
            if (this.keyword !== '') query.keyword = this.keyword;
            if (this.page > 1) query.page = this.page;
            getOnboarding(query).then(res => { 
                this.onboardings = res.data.data.data;
                let pagination = res.data.data.meta.pagination;
                this.page = pagination.current_page;
                this.pageSize = pagination.per_page;
                this.totalPages = pagination.total_pages;
            })
        },
        async goDetail(onboarding){
            if(this.$detect === 'web') {
                this.onboardingShow = onboarding;
                this.dialog = true;
                this.statusDetailOnboarding = 'show';
            } else {
                this.$router.push({
                    name: 'onboarding-show',
                    params: {
                        id: onboarding.id
                    },
                    query: {
                        redirect: this.$encodeRedirect(this.setQuery())
                    }
                })
            }
        },
        goCreate() {
            if(this.$detect === 'web') {
                this.dialog = true;
                this.statusDetailOnboarding = 'create';
            } else {
                this.$router.push({
                    name: 'onboarding-add',
                    query: {
                        redirect: this.$encodeRedirect(this.setQuery())
                    }
                })
            }
        },
        callData(e) {
            if (e) {
                if (this.statusDetailOnboarding === 'create') {
                    this.page = 1;
                    this.getData();
                } else {
                    this.getData();
                }
            }
        },
        async destroy(onboarding) {
            if(!this.$myCanDelete()) return;
            await this.$confirm(`Bạn có chắc chắn xóa onboarding <b>${onboarding.title}</b>`, 'Xóa onboarding', {
                confirmButtonText: 'Đồng ý',
                cancelButtonText: 'Hủy',
                type: 'error'
            }).then(async () => {
                this.loading = true;
                await deleteOnboarding(onboarding.id).then(res => {
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
        //Fillter
        setQuery() {
            let query = {};
            if (this.active !== '') query.active = parseInt(this.active);
            if (this.keyword !== '') query.keyword = this.keyword;
            if (this.page > 1) query.page = parseInt(this.page);
            return query;
        },
        changeUrl() {
            this.$router.push({
                name: 'onboarding',
                query: this.setQuery(),
            })
        },
        changeActive() {
            this.page = 1;
            this.changeUrl();
        },
        search() {
            if (this.timeOut) clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() => {
                this.changeUrl();
            }, 500);
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
        //Pagination
        changePage(page = 1) {
            this.page = page;
            this.changeUrl();
        },
    }
    
}
</script>

<style lang="scss">
    .onboarding_area{
        .form-group{
            label {
                font-weight: 600;
                margin-bottom: 5px;
                color: #323232;
                span{
                    font-weight: 400;
                    color: #a3a0a0;
                }
            }
        }
        .btn-secondary{
            background-color: #a0a6ab;
            border-color: #a0a6ab;
        }
        .slot-ios .ldc-select-show-option .title-select {
            width: auto;
        }
        .image_onboarding{
            width: 120px;
            height: 120px;
            border-radius: 5px;
            overflow: hidden;
            object-fit: cover;
        }
        .title_onboarding{
            overflow: hidden;
            line-height: 25px;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            margin-bottom: 0;
        }
        .unActive{
            color: #F56C6C;
        }
        .active{
            color: #67C23A;
        }
        .table-mobile {
            table-layout: fixed;
            th,td {
                width: 160px;
                &:first-child {
                    width: 60px;
                }
                &:nth-child(2) {
                    width: 125px;
                }
                &:nth-child(3) {
                    width: 200px;
                }
                &:nth-child(4) {
                    width: 100px;
                }
                &:last-child {
                    text-align: center;
                }
            }
            .image_onboarding{
                width: 100px;
                height: 100px;
                border-radius: 5px;
                overflow: hidden;
                object-fit: cover;
            }
        }
    }
</style>