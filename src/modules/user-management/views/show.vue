<template>
    <div class="container-fluid user-management-show py-3">
        <div class="row">
            <div :class="$detect === 'web' ? 'col-6' : 'col-12'">
                <div class="d-flex">
                    <div :class="{'mr-3 avatar' : true, 'flex-grow-0 flex-shrink-0' : $detect === 'mobile'}">
                        <imageBlock :url="$getUrlImage(urlAvatar)" :edit="false" />
                    </div>
                 <div :class="{'d-flex flex-column align-items-left justify-content-center overflow-hidden' : true, 'pl-4' : $detect === 'web', 'pl-0' : $detect === 'mobile'}">
                        <h3 :class="{'h5 font-weight-bold' : $detect === 'mobile' }">{{ userName }}</h3>
                        <p v-if="$detect === 'mobile' && bad_bebit" class="mb-2 font-weight-bold">Tình trạng: Nợ xấu</p>
                        <p v-if="$detect === 'mobile'" class="m-0">Cập nhật lần cuối {{ timeUpdate }}</p>
                    </div>
                </div>
            </div>
            <div v-if="$detect === 'web'" class="col-6">
                <div :class="{
                        'd-flex h-100 flex-column' : true,
                        'justify-content-between' : bad_bebit,
                        'justify-content-end' : !bad_bebit
                    }">
                    <p v-if="bad_bebit" class="mb-2 font-weight-bold text-right">Tình trạng: Nợ xấu</p>
                    <p class="m-0 text-right">Cập nhật lần cuối {{ timeUpdate }}</p>
                </div>
            </div>
        </div>
        <div class="row mt-4 mx-0 rounded px-0 px-lg-4 py-2 py-lg-3 shadow-sm bg-light">
            <div class="col-12 mb-2 mb-lg-3">
                <h5 class="mb-0 font-weight-bold">Thông tin hồ sơ</h5>
            </div>
            <div class="col-12">
                <form>
                    <div class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-2">Họ tên</label>
                        <div class="col-12 col-lg-10">
                            <input
                                v-model="formUpdate.name"
                                type="text"
                                placeholder="Họ tên"
                                class="form-control size-input"
                                :disabled="!$myCanUpdate()"
                                :class="{ 'is-invalid': errors.name }"
                            />
                            <form-invalid :error="errors.name"/>
                        </div>
                    </div>      
                    <div class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-2">Số điện thoại</label>
                        <div class="col-12 col-lg-10">
                            <input
                                v-model="formUpdate.phone"
                                type="text"
                                placeholder="Số điện thoại"
                                class="form-control size-input"
                                :disabled="!$myCanUpdate()"
                                :class="{ 'is-invalid': errors.phone }"
                            />
                            <form-invalid :error="errors.phone"/>
                        </div>
                    </div>      
                    <div class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-2">Loại tài khoản</label>
                        <div class="col-12 col-lg-10">
                            <input
                                v-model="formUpdate.borrowed_money"
                                type="text"
                                placeholder="Số điện thoại"
                                class="form-control size-input"
                                :disabled="true"
                                :class="{ 'is-invalid': errors.borrowed_money }"
                            />
                        </div>
                    </div>      
                    <div class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-2">Mật khẩu mới</label>
                        <div class="col-12 col-lg-10">
                            <input-password 
                                v-model="formUpdate.password"
                                class="size-input"
                                placeholder="Mật khẩu mới"
                                :disabled="!$myCanUpdate()"
                                :class="{'is-invalid' : errors.password }"/>
                            <form-invalid :error="errors.password"/>
                        </div>
                    </div>      
                    <div class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-2">Xác nhận mật khẩu mới</label>
                        <div class="col-12 col-lg-10">
                            <input-password 
                                v-model="formUpdate.password_confirm"
                                class="size-input"
                                placeholder="Nhập lại mật khẩu"
                                :disabled="!$myCanUpdate()"
                                :class="{'is-invalid' : errors.password_confirm }"/>
                            <form-invalid :error="errors.password_confirm"/>
                        </div>
                    </div>      
                    <div class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-2">Kích hoạt tài khoản</label>
                        <div class="col-12 col-lg-10">
                            <div :class="{'form-check-inline' : true, 'is-invalid' : errors.active }">
                                <label class="form-check-label d-flex align-items-center mr-5">
                                    <input
                                        type="radio"
                                        class="form-check-input"
                                        name="optradio"
                                        v-model="formUpdate.active"
                                        value="1"
                                        :disabled="!$myCanUpdate()"
                                    />Kích hoạt
                                </label>
                                <label class="form-check-label d-flex align-items-center">
                                    <input
                                        type="radio"
                                        class="form-check-input"
                                        name="optradio"
                                        v-model="formUpdate.active"
                                        value="0"
                                        :disabled="!$myCanUpdate()"
                                    />Tạm khóa
                                </label>
                            </div>
                            <form-invalid :error="errors.active"/>
                        </div>
                    </div>
                    <div v-if="$myCanUpdate()" class="form-group row mb-0">
                        <div class="col-12">
                            <button
                                :disabled="loading"
                                :class="{'btn btn-primary px-5 size-button': true,
                                        'mt-2 w-100 is-tablet': $detect === 'mobile'}"
                                @click.prevent="updateChange()"
                            >
                                Cập nhật thay đổi
                            </button>
                        </div>
                    </div> 
                </form>
            </div>
        </div>
        <div v-if="bankAccount" class="row mt-4 mx-0 rounded px-0 px-lg-4 py-2 py-lg-3 shadow-sm bg-light">
            <div class="col-12 mb-lg-3">
                <h5 class="mb-0 font-weight-bold">Thông tin</h5>
            </div>
            <div class="col-12 col-lg-8">
                <form>
                    <div class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-3">Số tiền đã ứng</label>
                        <div class="col-12 col-lg-9">
                            <input v-model="money_loan" type="text" class="form-control size-input" placeholder="Số tiền đã ứng" disabled/>
                        </div>
                    </div>            
                    <div class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-3">Công ty</label>
                        <div class="col-12 col-lg-9">
                            <input v-model="business.name" type="text" class="form-control size-input" placeholder="Công ty" disabled />
                        </div>
                    </div>            
                    <div class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-3">Tên ngân hàng</label>
                        <div class="col-12 col-lg-9">
                            <input v-model="bankAccount.bank" type="text" class="form-control size-input" placeholder="Tên ngân hàng" disabled />
                        </div>
                    </div>            
                    <div class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-3">Tên chủ thẻ</label>
                        <div class="col-12 col-lg-9">
                            <input v-model="bankAccount.bank_name" type="text" class="form-control size-input" placeholder="Tên chủ thẻ" disabled />
                        </div>
                    </div>            
                    <div class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-3">Số tài khoản ngân hàng</label>
                        <div class="col-12 col-lg-9">
                            <input v-model="bankAccount.bank_number" type="text" class="form-control size-input" placeholder="Số tài khoản ngân hàng" disabled />
                        </div>
                    </div>            
                </form>
            </div>
            <div class="col-12 col-lg-4">
                <div class="d-lg-flex justify-content-lg-center">
                    <div>
                        <p class="mb-2 font-weight-bold">Ảnh thẻ ngân hàng</p>
                        <div class="card-image">
                            <imageBlock :url="$getUrlImage(bankAccount.image)" :edit="false" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="formOCR" class="row mt-4 mx-0 rounded px-0 px-lg-4 py-2 py-lg-3 shadow-sm bg-light">
            <div class="col-12 mb-2 mb-lg-3">
                <h5 class="mb-0 font-weight-bold">Thông tin OCR</h5>
            </div>
            <div class="col-12 col-lg-4">
                <div>
                    <p class="mb-2 font-weight-bold">Ảnh căn cước công dân mặt trước</p>
                    <div class="card-image">
                        <imageBlock :url="$getUrlImage(formOCR.image.front)" :edit="false" />
                    </div>
                </div>
                <div class="mt-3 mt-lg-5">
                    <p class="mb-2 font-weight-bold">Ảnh căn cước công dân mặt sau</p>
                    <div class="card-image">
                        <imageBlock :url="$getUrlImage(formOCR.image.backside)" :edit="false" />
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-8">
                <table class="table mt-3 mt-lg-0">
                    <tbody>
                        <tr>
                            <th class="font-weight-bold pt-0">Số căn cước</th>
                            <td class="pt-0">{{formOCR.id_number }}</td>
                        </tr>
                        <tr>
                            <th class="font-weight-bold ">Họ và Tên</th>
                            <td>{{formOCR.name }}</td>
                        </tr>
                        <tr>
                            <th class="font-weight-bold ">Ngày sinh</th>
                            <td>{{formOCR.birthday }}</td>
                        </tr>
                        <tr>
                            <th class="font-weight-bold ">Giới tính</th>
                        <td>
                            <span v-if="formOCR.sex === 1">Nam</span>
                            <span v-else>Nữ</span>
                        </td>
                        </tr>
                        <tr>
                            <th class="font-weight-bold ">Quê quán</th>
                            <td>{{formOCR.home_town }}</td>
                        </tr>
                        <tr>
                            <th class="font-weight-bold ">Ngày cấp</th>
                            <td>{{formOCR.date_range }}</td>
                        </tr>
                        <tr>
                            <th class="font-weight-bold ">Nơi cấp</th>
                            <td>{{formOCR.issued_by }}</td>
                        </tr>                    
                    </tbody>
                </table>
            </div>
        </div>
        <div v-if="portrait" class="row mt-4 mx-0 rounded px-0 px-lg-4 py-2 py-lg-3 shadow-sm bg-light">
            <div class="col-12">
                <p class="mb-2 font-weight-bold">Ảnh chân dung</p>
                <div class="rounded border"
                    style="width: 150px; height: 200px">
                    <imageBlock :url="$getUrlImage('')" :edit="false" />
                </div>
            </div>
        </div>
        
        <div class="mt-4 mx-0 rounded px-0 px-lg-4 py-2 py-lg-3 shadow-sm bg-light">
                <p class="col-12 font-weight-bold p-0 mb-3 h5">Thông tin ứng lương</p>
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
            <detailLoan
                v-if="$detect === 'web'"
                :visible.sync="dialogDetail"
                :infoLoan="infoLoan"
            />
    </div>
</template>
<script>
import { detailUser, updateUser } from "@/repositories/user.js";
import { getLoans } from "@/repositories/loan.js";
export default {
    components: {
        imageBlock: () => import('@/components/imageBlock'),
        detailLoan: () => import('./detail-loan'),
    },
    data() {
        return {
            infoLoan: {},
            loans: {},
            dialogDetail: false,
            dialog: false,
            date: {
                date_from: '',
                date_to: ''
            },
            isShowPlhd1: true,
            isShowPlhd2: true,
            id: this.$route.params.id,
            timeUpdate: "",
            bad_bebit: "",
            urlAvatar: "",
            userName: "",
            errors: {},
            loading: false,
            formUpdate: {
                name: "",
                phone: "",
                password: "",
                password_confirm: "",
                lastLogin: "",
                active: "",
                borrowed_money: ""
            },
            bankAccount: "",
            business: {},
            formOCR: "",
            portrait: '',
            list_transaction: [],
            page: '',
            money_loan: '',
        };
    },
    created() {
        if (this.id) {
            this.getData();
            this.getLoans();
        }
    },
    watch: {
        'date.date_from'(val) {
            if(val !== ''){
                this.isShowPlhd1 = false; 
            }else{
                this.isShowPlhd1 = true;
            }
        },
        'date.date_to'(val) {
            if(val !== ''){
                this.isShowPlhd2 = false; 
            }else{
                this.isShowPlhd2 = true;
            }
        }
    },
    methods: {
        async getData() {
            await detailUser(this.id).then((res) => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    let data = res.data.data;
                    this.urlAvatar = data.avatar;
                    this.bad_bebit = data.bad_bebit;
                    this.userName = data.name;
                    this.timeUpdate = data.time_updated;
                    this.formUpdate.name = data.name;
                    this.formUpdate.phone = data.phone;
                    this.formUpdate.borrowed_money = data.borrowed_money;
                    this.formUpdate.lastLogin = data.last_login;
                    this.formUpdate.active = data.active;
                    this.money_loan = data.money_loan.data.money ? this.$formatNumber(data.money_loan.data.money) : 0;
                    this.bankAccount = data.bankAccount ? data.bankAccount : '';
                    if (data.bankAccount) {
                        this.bankAccount.bank = data.bankAccount.bank.data.vn_name
                    }
                    this.business = data.business ? data.business.data : {};
                    this.formOCR = data.ocr ? data.ocr.data : '';
                } else {
                        this.$showMessage(res.data.message, 'warning');
                    }
            });           
        },
        getLoans(){
            getLoans({id_user: this.id}).then(res =>{
                this.loans = res.data.data.data
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
                    name: 'user-detail',
                    query: {
                        redirect: this.$encodeRedirect(this.setQuery()),
                        id_loan: loan.id,
                        id_user: loan.id_user
                    },
                })
            }
            
        },
        setQuery() {
            let query = {};
            if (this.page > 1) query.page = this.page;
            return query;
        },
        async updateChange() {
            if(!this.$myCanUpdate()) return;
            this.loading = true;
            this.errors = {};
            let query = {};

            query.active = parseInt(this.formUpdate.active);
            if (this.formUpdate.name !== null && this.formUpdate.name !== "") {
                query.name = this.formUpdate.name;
            }
            if (this.formUpdate.phone !== null && this.formUpdate.phone !== "") {
                query.phone = this.formUpdate.phone;
            }
            if (
                this.formUpdate.password !== null &&
                this.formUpdate.password !== ""
            ) {
                query.password = this.formUpdate.password;
            }
            if (
                this.formUpdate.password_confirm !== null &&
                this.formUpdate.password_confirm !== ""
            ) {
                query.password_confirm = this.formUpdate.password_confirm;
            }

            await updateUser(this.id, query).then((res) => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.$showMessage(res.data.message, "success");
                    this.formUpdate.password = "";
                    this.formUpdate.password_confirm = "";
                    this.loading = true;
                    this.getData();
                } else {
                        this.$showMessage(res.data.message, 'warning');
                    }
                })
                .catch((err) => {
                    this.requestError(err);
                });
            this.loading = false;
        },
        searchDate(){

        },
        clearFilter() {
            this.date.date_from = ''
            this.date.date_to = ''
        },
        requestError(err) {
            if (err.status === HTTP_CODE_GONE) {
                this.$showMessage( err.data.message, "warning");
            } else if(err.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
                this.errors = err.data.data.data;
            }
        },
    },
};
</script>
<style lang="scss">
.user-management-show{
    .avatar {
        width: 132px;
        height: 132px;
        border-radius: 50%;
        background-color: #ccc;
        border: 1px solid #ddd;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .card-image {
        width: 280px;
        height: 180px;
        border: 1px solid #ccc;
        background-color: #ddd;
        box-sizing: border-box;
        &.portrait-image {
            width: 150px;
            height: 200px;
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .ocr {
        p {
            margin-bottom: 0.5rem;
        }
    }
    .table {
        th {
            width: 120px;
            border: none;
        }
        td {
            border: none;
        }
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
    @media screen and (max-width: 1024px) {
        .avatar {
            width: 100px;
            height: 100px;
        }
        .card-image { 
            width: 100%;
           
        }
        label {
            margin-bottom: 0;
        }
    }
}
</style>
