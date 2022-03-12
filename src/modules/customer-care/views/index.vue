<template>
    <div class="loan-show container-fluid">
        <div class="px-md-5 py-4 bg-light">
            <label class="font-weight-bolder">Tra cứu thông tin</label>
            <div class="d-flex justify-content-between align-items-start">
                <div class="input-group position-relative">
                    <input
                        v-model="keyword_search"
                        placeholder="Số điện thoại/CCCD"
                        type="text"
                        class="form-control mr-2 rounded"
                        :class="{ 'is-invalid': errors.keyword }"
                        @input="setKeyword"
                        @keyup.enter="searchIdUser()"
                        />
                        <span
                            v-if="keyword_search !== ''"
                            class="position-absolute"
                            style="top: 50%; right: 15px; transform: translateY(-50%);z-index:10;"
                            @click="keyword_search = ''">
                            <i class="icon ion-md-close-circle-outline" style="color: #d5d5d5; font-size: 18px;"></i>
                        </span>
                       <form-invalid :error="errors.keyword"/>
                </div>
                <button class="btn btn-primary" 
                        :disabled="keyword_search === ''"
                        :style="$detect === 'web' ? 'width: 300px;' : 'width:150px'" 
                        @click="searchIdUser()"
                        >Tìm kiếm</button>
            </div>
        </div>
        <p :hidden="ischeck" class="h5 mt-5 text-center text-secondary">Không tìm thấy người dùng!!!</p>
        <div v-if="id_user">
            <div class="d-flex align-items-center p-md-5 mt-md-0 mt-2">
                    <div
                        :class="{'avatar d-flex align-items-center rounded-circle overflow-hidden flex-shrink-0 flex-grow-0': true, 
                                'mr-3': $detect === 'mobile', 'mr-5': $detect === 'web'}"
                        :style="$detect === 'web' ? 'width: 132px; height: 132px;' : 'width: 100px; height: 100px;'" >
                        <img
                            :src="$getUrlImage(infoUser.avatar)"
                            @error="$errorImage"
                            width="100%"
                        />
                    </div>
                    <div>
                        <p :class="{'h3 font-weight-bolder m-0': $detect === 'web',
                                    'h5 font-weight-bolder m-0': $detect === 'mobile'}">
                            {{ infoUser.name }}</p>
                        <p class="m-0">{{ infoUser.email }}</p>
                        <p class="m-0">{{ infoUser.phone }}</p>
                    </div>
            </div>

            <div class="bg-light p-md-5 py-3 mt-md-0 mt-3">
                <p class="col-12 font-weight-bolder p-0 mb-3">Thông tin ứng lương</p>
                <div class="table-responsive">
                    <table :class="{'table table-striped' : true, 'table-mobile': $detect === 'mobile'}">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Số tiền ứng</th>
                                <th>Thời gian</th>
                                <th>Trạng thái</th>
                                <th class="text-center" width="100px">Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(loan, i) in loans" :key="i">
                                <td>{{ i + 1 }}</td>
                                <td>{{ loan.loan }}</td>
                                <td>{{ loan.disbursement_date}}</td>
                                <td>{{ loan.type}}</td>
                                <td v-if="loan.show" class="text-right">
                                    <button
                                        v-if="$detect === 'web'" 
                                        class="btn btn-primary"
                                        @click="goDetail(loan, 'web')">
                                        Chi tiết
                                    </button>
                                    <button 
                                        v-else
                                        class="btn btn-primary"
                                        @click="goDetail(loan, 'mobile')">
                                        Chi tiết
                                    </button>
                                </td>
                                <td v-else></td>
                            </tr>
                            <no-data :data="loans" :colspan="5" />
                        </tbody>
                    </table>
                </div>
            </div>
            

            <div class="px-md-5 py-4 mt-4 bg-light">
                <label class="font-weight-bolder">Lưu lịch sử CSKH</label>
                <div class="d-flex justify-content-between align-items-start">
                    <div class="input-group">
                        <input
                            :disabled="!$myCanUpdate()"
                            v-model="content"
                            placeholder="Nội dung"
                            type="text"
                            class="form-control mr-2"
                            :class="{ 'is-invalid': errors.content }"
                        />
                       <form-invalid :error="errors.content"/>
                    </div>
                    <button class="btn btn-success" 
                            :disabled="!$myCanUpdate()"
                            :style="$detect === 'web' ? 'width: 300px;' : 'width:150px'" 
                            @click="addCustomerCare()">Lưu</button>
                </div>

                <div class="col-12 border-bottom mt-4 p-0">
                        <div class="table-responsive">
                            <table :class="{'table table-cutomer-care table-striped' : true, 'table-care-history-mobile': $detect === 'mobile'}">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Admin Note</th>
                                        <th>Thời gian</th>
                                        <th>Nội dung CSKH</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, i) in customer_care_list" :key="i">
                                        <td>{{ i + 1 }}</td>
                                        <td>{{ item.userCare? item.userCare.data.name : ''}}</td>
                                        <td>{{ item.time_created }}</td>
                                        <td class="text-break">{{ item.content }}</td>
                                    </tr>
                                    <no-data :data="customer_care_list" :colspan="4" />
                                </tbody>
                            </table>
                        </div>
                        <div class="d-flex justify-content-end">
                            <ldc-pagination
                                :current_page="page"
                                :last_page="totalPages"
                                :scroll_top="false"
                                :callData="changePage"
                                class="pt-4"/>  
                        </div> 
                    </div>
            </div>
        </div>
        <detailLoan
            v-if="$detect === 'web'"
            :visible.sync="dialogDetail"
            :infoLoan="infoLoan"
        />
    </div>
</template>
<script>
import { getIdUser, getCustomerCare, addCustomerCare } from "@/repositories/customer-care.js";
import { getLoans } from "@/repositories/loan.js";
export default {
    components: {
        detailLoan: () => import('./detail-loan'),
    },
    data() {
        return {
            ischeck: true,
            errors: {},
            loading: false,
            content: '',
            infoUser: {},
            infoLoan: {},
            loans: [],
            customer_care_list: [],
            dialogDetail: false,
            id: '',
            id_user: '',
            page: 0,
            totalPages: 0,
            keyword_search: this.$route.query.keyword ? this.$route.query.keyword : '',
        };
    },

    created() {
        if (this.keyword_search) {
            this.getIdUser();
        }
    },
    methods: {
        setKeyword(e){
            if(e){
                this.keyword_search = e.target.value;
            }
        },
        getIdUser(){
            this.errors = {};
            let query = this.setQuery()
            getIdUser(query).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.id_user = res.data.data.id
                    this.infoUser =  res.data.data
                    this.getLoans();
                    this.getCustomerCare();
                    this.ischeck = true;
                }
            }).catch(err =>{
                this.ischeck = false;
                this.id_user = ""
            });
        },
        getLoans(){
            getLoans({id_user: this.id_user}).then(res =>{
                this.loans = res.data.data.data
            })
        },
        searchIdUser(){     
            this.getIdUser();
            this.changeUrl();
        },
        setQuery(){
            let query = {}
            if(this.keyword_search !== "") query.keyword = this.keyword_search;
            return query;
        },
        getCustomerCare(){
            let query = {}
            if(this.id_user !== "") query.id_user = this.id_user;
            if (this.page > 1) query.page = this.page;
            getCustomerCare(query).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.customer_care_list = res.data.data.data
                    let pagination = res.data.data.meta.pagination;
                    this.page = pagination.current_page;
                    this.totalPages = pagination.total_pages;
                }
            })  
        },
        addCustomerCare(){
            if(!$myCanUpdate()) return;
            this.errors = {};
            let query = {
                id_user : this.id_user,
                content : this.content
            }
            addCustomerCare(query).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.$showMessage(res.data.message,'success');
                    this.page = 1
                    this.content = ''
                    this.getCustomerCare()
                }
            }).catch((err) => {
                    this.requestError(err);
                });
        },
        changePage(page) {
            this.page = page;
            this.getCustomerCare()
        },
        changeUrl() {
            this.$router.push({
                name: 'customer-care',
                query: this.setQuery(),
            })
        },
        goDetail(loan, key) {
            if(key === 'web'){
                this.infoLoan = {
                    id_loan : loan.id,
                    id_user : loan.id_user
                }
                
                this.dialogDetail = true;
            }else{
                this.$router.push({
                    name: 'customer-care-detail',
                    query: {
                        redirect: this.$encodeRedirect(this.setQuery()),
                        id_loan: loan.id,
                        id_user: loan.id_user
                    },
                })
            }
            
        },
        requestError(err) {
            if (err.status === HTTP_CODE_GONE) {
                this.$showMessage( err.data.data.message, "warning");
            } else if(err.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
                this.errors = err.data.data.data;
            }
        },
    },
};
</script>
<style lang="scss">
.loan-show{
    .table td {
        border: none;
    }   
    .fs-11{
        font-size:11.5px;
    }
    .table-mobile{
        table-layout: fixed;
        th,td{
            &:nth-child(1){
                width: 50px;
            }
            &:nth-child(2){
                width: 120px;
            }
            &:nth-child(3){
                width: 170px;
            }
            &:nth-child(4){
                width: 150px;
            }
        }
    }
    .table-cutomer-care{
        table-layout: fixed;
        th,td{
            &:nth-child(1){
                width: 50px;
            }
            &:nth-child(2){
                width: 150px;
            }
            &:nth-child(3){
                width: 150px;
            }
        }
    }
    .table-care-history-mobile{
        th,td{
            &:nth-child(1){
                width: 40px;
            }
            &:nth-child(2){
                width: 150px;
            }
            &:nth-child(3){
                width: 150px;
            }
            &:nth-child(4){
                width: 200px;
            }
        }
    }
}
</style>
