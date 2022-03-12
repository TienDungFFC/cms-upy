<template>
    <div class="payment-guide container-fluid p-md-3 p-2">
        <p v-if="$detect === 'web'" class="h5 font-weight-bold">Hướng dẫn thanh toán</p>
        <div class="d-md-flex align-items-end justify-content-between pb-md-4">
            <div>
                <button v-if="$myCanCreate()" class="btn btn-success px-2 mt-md-0 mt-2" @click="goCreate()"> + Thêm phương thức</button>
            </div>
            <div v-if="$detect === 'web'" class="d-flex align-items-end">
                <div>
                    <label class="font-weight-bold">Từ khóa</label>
                    <input
                        type="text"
                        v-model="keyword"
                        class="form-control size-input"
                        placeholder="Tìm kiếm"
                        @input="search">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </div>
                <button
                    class="btn btn-secondary ml-2"
                    :disabled="keyword === ''"
                    style="height: 32px;"
                    @click="clearFilter()"
                    >
                    Bỏ lọc
                </button>
            </div>  
            <div v-else input-search class="mt-2">
                <div content-input-search>
                    <input
                        type="text"
                        v-model="keyword"
                        class="form-control size-input"
                        placeholder="Tìm kiếm"
                        @input="search"
                    />
                </div>
            </div>          
        </div>
         <div class="row mt-md-0 mt-2">
            <div class="col-12">
                <div class="table-responsive">
                    <table :class="{'table table-striped' : true, 'table-mobie': $detect === 'mobile'}">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên phương thức</th>
                                <th>Trạng thái</th>
                                <th :class="$myCanDelete() ? 'text-center' : 'text-right'" width="150px">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in paymentGuide" :key="item.id">
                                <td> {{ item.payment_guide_id }}</td>
                                <td @click="goDetail(item)" class="pointer"> {{item.name}} </td>
                                <td :class="item.active=='1'?'text-success':'text-danger'">{{ item.active_text }}</td>
                                <td class="text-right">
                                    <button class="btn btn-primary" @click="goDetail(item)">
                                        Chi tiết
                                    </button>
                                    <button
                                    v-if="$myCanDelete()"
                                    class="btn btn-danger ml-2" @click="remove(item)">
                                        Xóa
                                    </button>
                                </td>                                
                            </tr>
                            <no-data :data="paymentGuide" :colspan="4" />
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
        <detailPaymentGuide
            v-if="$detect === 'web'"
            :visible.sync="dialog"
            :status="statusPay"
            :PaymentGuideShow="PaymentGuideShow"
            @callData="callData"
        />
    </div>
</template>

<script>
import {getPaymentGuide , deletePaymentGuide} from "@/repositories/payment-guide.js";

export default {
    components: {
        detailPaymentGuide: () => import('./show')
    },
    data() {
        return{
            paymentGuide:[],
            // pagination search
            page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
            keyword: this.$route.query?.keyword ? this.$route.query.keyword : '',
            pageSize : 0,
            totalPages: 0,
            timeOut: null,
            //detail Payment Guide
            dialog: false,
            statusPay:'create',
            PaymentGuideShow:{},
        }

    },
    
    computed: {
        query() {
            return this.$route.query;
        },
    },
    watch:{
        visible(val) {
            this.dialog = val;
            if (val) {
                this.setForm();
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
    
    methods:{
        getData(){
            let query = this.setQuery();
            getPaymentGuide(query).then(res => { 
                this.paymentGuide = res.data.data.data;
                let pagination = res.data.data.meta.pagination;
                this.page = pagination.current_page;
                this.pageSize = pagination.per_page;
                this.totalPages = pagination.total_pages ;
            })
        },

        // show detail
        async goDetail(payment_guide){
            if(this.$detect === 'web'){
                this.PaymentGuideShow = payment_guide;
                this.statusPay = 'show';
                this.dialog = true;
            }else{
                this.$router.push({
                    name: 'payment-guide-show',
                    params: {
                        id: payment_guide.id,
                    },
                    query: {
                        redirect: this.$encodeRedirect(this.setQuery()),
                    },
                });
            }
            
        },
        //end  show detail
        // show add new
        goCreate() {
            if(this.$detect === 'web'){
                this.dialog = true;
                this.statusPay = 'create';
            }else{
                this.$router.push({
                    name: 'payment-guide-add',
                    query: {
                        redirect: this.$encodeRedirect(this.setQuery()),
                    },
                });
            }
                
        },
        //end show add new
        callData(e) {
            if (e) {
                if (this.statusPay === 'create') {
                    this.page = 1;
                    this.getData();
                } else {
                    this.getData();
                }
            }
        },
        

        // Remove payment guide
        async remove(removePayment){
            await this.$confirm(`Bạn có chắc chắn xóa hướng dẫn thanh toán <b>${removePayment.name}</b>`, 'Xóa hướng dẫn thanh toán', {
                confirmButtonText: 'Đồng ý',
                cancelButtonText: 'Hủy',
                type: 'error'
            }).then(async () => {
                await deletePaymentGuide(removePayment.id).then(res => { 
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
            }).catch(err => {})
        },

        //Pagination
        changePage(page = 1) {
            this.page = page;
            this.changeUrl();
        },
        //Fillter
        setQuery() {
            let query = {};
            if (this.keyword !== '') query.keyword = this.keyword;
            if (this.page > 1) query.page = this.page;
            return query;
        },
        changeUrl() {
            this.$router.push({
                name: 'payment-guide',
                query: this.setQuery(),
            })
        },
        search(e) {
            if(e){
                this.key = e.target.value
            }
            if (this.timeOut) clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() => {
                this.changeUrl();
            }, 500);
        },
        clearFilter(){
            this.keyword = '';
            this.changeUrl()
        }
    }
}
</script>

<style lang="scss">
.payment-guide{
    .table-mobie{
        table-layout: fixed;
        th,td{
            align-items: center;
            &:nth-child(1){
                width: 40px;
            }
            &:nth-child(2){
                width: 150px;
            }
            &:nth-child(3){
                width: 100px;
            }
            &:nth-child(4){
                text-align: center;
            }
        }
    }
}
</style>