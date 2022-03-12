<template>
    <div :class="{'news container-fluid' : true, 'p-2' : $detect === 'mobile'}">
        <span v-if="$detect === 'web'" class="h5 font-weight-bold">Quản lý {{ title }}</span>
        <div :class="{'d-flex align-items-end mt-md-4 mt-2' : true, 
                    'justify-content-between':$myCanCreate(), 'justify-content-end': !$myCanCreate(), 
                    'align-items-center': $detect === 'mobile'}">
            <button class="btn btn-success" 
            v-if="$myCanCreate()"
            @click="goCreate()">
                + Thêm mới {{ title }}
            </button>
            <div v-if="$detect === 'web'" class="d-flex align-items-end">
                <div>
                    <label class="font-weight-bold">Tìm kiếm</label>
                    <input
                        v-model="keyword"
                        class="form-control size-input"
                        placeholder="Tìm kiếm"
                        @input="searchNew"
                    />
                </div>
                <div class="mx-3">
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
                <div>
                    <button
                        class="btn btn-secondary"
                        :disabled="active === '' && keyword === ''"
                        style="height: 32px; width: 80px"
                        @click="clearFilter()"
                    >
                        Bỏ lọc
                    </button>
                </div>
            </div>
            <div v-if="$detect === 'mobile'" class="filter" @click="dialog=true">
                <i class="h3 icon ion-md-funnel"></i>
            </div>
        </div>

        <div v-if="$detect === 'mobile'">
            <div input-search class="mt-3">
                <div class="position-relative" content-input-search>
                    <input
                        v-model="keyword"
                        class="form-control size-input"
                        placeholder="Tìm kiếm"
                        @input="searchNew"
                    />
                    <span
                        v-if="keyword !== ''"
                        class="position-absolute"
                        style="top: 50%; right: 6px; transform: translateY(-50%);"
                        @click="clearKeyword()">
                        <i class="icon ion-md-close-circle-outline" style="color: #d5d5d5; font-size: 18px;"></i>
                    </span>
                </div>
            </div>
            <ldc-model-mobile
                titileCancel="Hủy"
                :showCancel="false"
                :showTitle="true"
                title="Tìm kiếm nâng cao"
                :customButton="true"
                :visible.sync="dialog">
                <div slot="content-model">
                    <ldc-select-show-option v-model="active" placeholder="Lọc trạng thái">
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
        

        <div class="row main mt-md-4">
            <div class="col-12 border-bottom">
                <div class="table-responsive">
                    <table :class="{'table table-striped' : true, 
                                    'table-mobile': $detect === 'mobile'}">
                        <thead>
                            <tr>
                                <th width="50px">ID</th>
                                <th  width="250px"
                                    :hidden="title == 'chương trình ưu đãi' ? false : true">
                                    Ảnh {{ title }}
                                </th>
                                <th>Tên {{ title }}</th>
                                <th class="text-center" width="100px">
                                    Trạng thái
                                </th>
                                <th :class=" $myCanDelete() ? 'text-left' : 'text-right'"  width="160px">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, i) in news" :key="i">
                                <td>{{ item.new_id }}</td>
                                <td :hidden="title == 'chương trình ưu đãi' ? false : true"> 
                                    <img
                                        alt=""
                                        :src="$getUrlImage(item.image)"
                                        :style="$detect === 'mobile'?'width: 160px;height: 70px;':'width: 180px;height: 80px;'"
                                        class="rounded" 
                                        />
                                </td>
                                <td class="text-break">
                                    <router-link 
                                        :to="goDetail(item)" 
                                        class="format-link" >
                                            {{ item.title }}
                                    </router-link>
                                </td>
                                <td class="text-center">
                                    <span
                                        class="text-success"
                                        v-if="item.active == 1"
                                        >Hoạt động</span
                                    >
                                    <span class="text-danger" v-else
                                        >Tạm khóa</span
                                    >
                                </td>
                                <td class="text-right"> 
                                    <router-link :to="goDetail(item)">
                                        <button :disabled="loading" class="btn btn-primary">
                                            Chi tiết
                                        </button>
                                    </router-link>
                                    <button
                                        v-if="$myCanDelete()"
                                        :disabled="loading"
                                        @click="deleteNew(item)"
                                        class="btn btn-danger ml-2"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                            <no-data :data="news" :colspan="TYPE == isSpecialOffer ? 5 : 4" />
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
import { getNews, deleteNew } from "@/repositories/news.js";
import {
    NEW_TYPE_TERMS_AND_SERVICE,
    NEW_TYPE_USER_MANUAL,
    NEW_TYPE_SPECIAL_OFFER,
} from "@/constants/news.js";
import { optionsActive } from "@/constants/optionsActive.js";
export default {
    data() {
        return {
            dialog: false,
            loading: false,
            news: [],
            TYPE: "",
            link: "",
            title: "",
            optionsActive: optionsActive,
            active: this.$route.query.active ? parseInt(this.$route.query.active) : "",
            keyword: this.$route.query?.keyword ? this.$route.query.keyword : "",
            page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
            totalPages: 0,
            loading: false,
            timeOut: null,
            loaded: false,
            isSpecialOffer: NEW_TYPE_SPECIAL_OFFER
        };
    },
    computed: {
        query() {
            return this.$route.query;
        },
        routeName() {
            return this.$route.name;
        },
    },
    watch: {
        routeName(val) {
            this.loaded = true;
            this.active = "";
            this.keyword = "";
            this.page = 1;
            this.totalPages = 0;
            this.setSelectLink();
        },
        query() {
            if (this.loaded)
                return;
            this.getData();
        },
    },
    created() {
        this.setSelectLink();
    },
    methods: {
        setSelectLink() {
            switch (this.routeName) {
                case "user-manual":
                    this.TYPE = NEW_TYPE_USER_MANUAL;
                    this.title = "hướng dẫn";
                    this.link = "user-manual";
                    break;
                case "loan-terms":
                    this.TYPE = NEW_TYPE_TERMS_AND_SERVICE;
                    this.title = "điều khoản vay";
                    this.link = "loan-terms";
                    break;
                case "special-offers":
                    this.TYPE = NEW_TYPE_SPECIAL_OFFER;
                    this.title = "chương trình ưu đãi";
                    this.link = "special-offers";
                    break;
                default:
            }
            this.getData();
        },
        getData() {
            if (this.loader) return;
            let query =this.setQuery();
            query.type = this.TYPE;
            getNews(query).then((res) => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.news = res.data.data.data;
                    let pagination = res.data.data.meta.pagination;
                    this.page = pagination.current_page;
                    this.totalPages = pagination.total_pages;
                }
            });
        },
        searchNew(e) {
            if(e){
                this.keyword = e.target.value
            }
            if (this.timeOut) clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() => {
                this.page = 1;
                this.changeUrl();
            }, 500);
        },
        changeActive() {
            this.page = 1;
            this.changeUrl();
        },
        goCreate() {
            this.$router.push({
                name: `${this.link}-add`,
                query: {
                    redirect: this.$encodeRedirect(this.setQuery()),
                },
            });
        },
        goDetail(item) {
            return {
                name: `${this.link}-show`,
                params: {
                    id: item.id,
                },
                query: {
                    redirect: this.$encodeRedirect(this.setQuery()),
                },
            }
        },
        async deleteNew(item) {
            this.loading = true
            await this.$confirm(
                `Bạn có chắc muốn xóa ${this.title} <b>${item.title}</b>`,
                `Xóa ${this.title}`,
                {
                    confirmButtonText: "Đồng ý",
                    cancelButtonText: "Hủy",
                    type: "error",
                }
            ).then(async () => {
                await deleteNew(item.id).then((res) => {
                    if(res.data.data.success === API_STATUS_SUCCESS) {
                        this.$showMessage(res.data.data.message,"success");
                        this.getData();
                    } else {
                        this.$showMessage(res.data.data.message, 'warning');
                    }
                    }).catch((err) => {
                        if (err.status == HTTP_CODE_GONE) {
                            this.$showMessage(err.data.data.message,"warning");
                        }
                    });
            }).catch(() => {});
            this.loading = false;
        },
        setQuery() {
            let query = {};
            if (this.active !== "") query.active = parseInt(this.active);
            if (this.keyword !== "") query.keyword = this.keyword;
            if (this.page > 1) query.page = this.page;
            return query;
        },
        changeUrl() {
            this.loaded = false;
            this.$router.push({
                name: this.link,
                query: this.setQuery(),
            });
        },
        changePage(page) {
            this.page = page;
            this.changeUrl();
        },
        clearKeyword() {
            this.keyword = '';            
            this.page = 1;
            this.changeUrl();
        },
        clearFilter() {
            this.keyword = "";
            this.active = "";
            this.page = 1;
            this.changeUrl();
        },
    },
};
</script>
<style lang="scss">
.news{
    .table-mobile{
        table-layout: fixed;
        th,td{
            &:nth-child(1){
                width: 50px;
            }
            &:nth-child(2){
                width: 200px;
            }
             &:nth-child(3){
                width: 250px;
            }
             &:nth-child(4){
                width: 100px;
            }
        }
    }
}
</style>
