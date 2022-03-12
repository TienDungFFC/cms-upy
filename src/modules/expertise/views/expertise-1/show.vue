<template>
  <div class="container-fluid expertise-1_detail py-3">
        <div class="row">
            <div :class="$detect === 'web' ? 'col-6' : 'col-12'">
                <div class="d-flex">
                    <div :class="{'mr-3 avatar' : true, 'flex-grow-0 flex-shrink-0' : $detect === 'mobile'}">
                        <imageBlock :url="$getUrlImage(user.avatar)" :edit="false" />
                    </div>
                 <div :class="{'d-flex flex-column align-items-left justify-content-center overflow-hidden' : true, 'pl-4' : $detect === 'web', 'pl-0' : $detect === 'mobile'}">
                        <h3 :class="{'h5 font-weight-bold' : $detect === 'mobile' }">{{ user.name }}</h3>
                        <p class="mb-2 overflow-hidden" style="text-overflow: ellipsis">{{ user.email }}</p>
                        <p :class="$detect === 'web' ? 'mb-0' : 'mb-2'">{{ user.phone }}</p>
                        <p v-if="!information.is_employee" 
                            :class="{
                               'mt-2 mb-0' : $detect === 'web',
                               'mb-2' : $detect === 'mobile',
                               'text-danger' : true,
                            }">
                            Không thuộc danh sách nhân viên công ty hiện có
                        </p>
                        <p v-if="$detect === 'mobile'" class="mb-0">Số lần ứng lương: {{ total }}</p>
                    </div>
                </div>
            </div>
            <div v-if="$detect === 'web'" class="col-6">
                <div class="text-right">
                    Số lần ứng lương: {{ total }}
                </div>
            </div>
        </div>
        <div class="row mt-4 mx-0 rounded px-0 px-lg-4 py-2 py-lg-5 shadow-sm bg-light">
            <div class="col-12 mb-2 mb-lg-5">
                <div class="d-flex align-items-lg-center flex-column flex-lg-row justify-content-between">
                    <h4 class="mb-0 font-weight-bold">Thông tin</h4>
                    <p class="mb-0">Cập nhật lần cuối {{ time_updated }}</p>
                </div>
            </div>
            <div class="col-12">
                <form>
                    <div class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-2">Số tiền cần ứng</label>
                        <div class="col-12 col-lg-10">
                            <input type="text" 
                                v-model="information.loan" 
                                placeholder="Số tiền cần ứng" 
                                class="form-control size-input"
                                readonly>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-2">Công ty</label>
                        <div class="col-12 col-lg-10">
                            <input type="text" 
                            v-model="information.name_business" 
                            placeholder="Công ty" 
                            class="form-control size-input"
                            readonly>
                            <div v-if="!information.is_exist_business" class="text-danger mt-2">
                                Không thuộc danh sách công ty hiện có
                            </div>
                        </div>                        
                    </div>
                    <div v-if="information.name_employee" class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-2">Họ tên</label>
                        <div class="col-12 col-lg-10">
                            <input type="text" 
                            v-model="information.name_employee" 
                            placeholder="Họ tên" 
                            class="form-control size-input"
                            readonly>
                        </div>                        
                    </div>
                    <div v-if="information.email_employee" class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-2">Email</label>
                        <div class="col-12 col-lg-10">
                            <input type="text" 
                            v-model="information.email_employee" 
                            placeholder="Email" 
                            class="form-control size-input"
                            readonly>
                        </div>                        
                    </div>
                    <div v-if="information.phone_employee" class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-2">Số điện thoại</label>
                        <div class="col-12 col-lg-10">
                            <input type="text" 
                            v-model="information.phone_employee" 
                            placeholder="Số điện thoại" 
                            class="form-control size-input"
                            readonly>
                        </div>                        
                    </div>
                    <div class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-2">Thu nhập</label>
                        <div class="col-12 col-lg-10">
                            <input type="text" 
                            v-model="information.income " 
                            placeholder="Thu nhập" 
                            class="form-control size-input"
                            readonly>
                            <div v-if="information.salary_employee" class="text-danger mt-2">
                                Thu nhập công ty cung cấp: {{ information.salary_employee }}
                            </div>
                        </div>                        
                    </div>
                    <div class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-2">Tên ngân hàng</label>
                        <div class="col-12 col-lg-10">
                            <input type="text" 
                            v-model="information.bank"
                            placeholder="Tên ngân hàng" 
                            class="form-control size-input"
                            readonly>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-2">Tên chủ thẻ</label>
                        <div class="col-12 col-lg-10">
                            <input type="text" 
                                v-model="information.bank_name"
                                placeholder="Tên chủ thẻ"
                                class="form-control size-input"
                                readonly>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-2">Số tài khoản ngân hàng</label>
                        <div class="col-12 col-lg-10">
                            <input type="text" 
                                v-model="information.bank_number"
                                placeholder="Số tài khoản ngân hàng"
                                class="form-control size-input"
                                readonly>
                        </div>
                    </div>                    
                </form>
            </div>
            <div class="col-12">
                <div class="d-flex flex-column flex-lg-row mt-2 mt-lg-5">
                    <div class="atm-card">
                        <p class="mb-2 font-weight-bolder">Ảnh thẻ ngân hàng</p>
                        <div class="card-image">
                            <imageBlock :url="$getUrlImage(information.bank_image)" :edit="false" />
                        </div>
                    </div>
                    <div class="d-flex flex-column ml-lg-5 pl-lg-5 mt-lg-4 pt-2">  
                        <kyc v-model="information.status_check" id="information" :disabled="type === 'REFUSE' || !$myCanExpertise()"/>
                        <note-fail 
                            v-if="!information.status_check" 
                            v-model="information.note_fail"
                            :disabled="type === 'REFUSE' || !$myCanExpertise()"
                            :error="errors.list_steps"/>                        
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div class="p-2 p-lg-5 mt-3 mt-lg-5 d-flex flex-wrap rounded shadow-sm bg-light">
                <p class="mb-3 font-weight-bolder h5 w-100">Thông tin OCR</p>
            <div :class="{'w-100' : $detect === 'mobile'}">
                <div>
                    <p class="mb-2 font-weight-bolder">Ảnh căn cước công dân mặt trước</p>
                    <div class="card-image">
                        <imageBlock :url="$getUrlImage(ocr.frontside_identity_card)" :edit="false" />
                    </div>
                </div>
                <div class="mt-3 mt-lg-5">
                    <p class="mb-2 font-weight-bolder">Ảnh căn cước công dân mặt sau</p>
                    <div class="card-image">
                        <imageBlock :url="$getUrlImage(ocr.backside_identity_card)" :edit="false" />
                    </div>
                </div>
            </div>
            <div :class="{'ml-lg-5 pl-lg-5' : true, 'w-100' : $detect === 'mobile'}">
                <table class="table" style="width:300px">
                    <tbody>
                        <tr>
                            <td class="font-weight-bolder ">Số căn cước</td>
                            <td>{{ ocr.id_number }}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bolder ">Họ và Tên</td>
                            <td>{{ ocr.name }}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bolder ">Ngày sinh</td>
                            <td>{{ ocr.birthday }}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bolder ">Giới tính</td>
                        <td>
                            <span v-if="ocr.sex === 1">Nam</span>
                            <span v-else>Nữ</span>
                        </td>
                        </tr>
                        <tr>
                            <td class="font-weight-bolder ">Quê quán</td>
                            <td>{{ ocr.home_town }}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bolder ">Ngày cấp</td>
                            <td>{{ ocr.date_range }}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bolder ">Nơi cấp</td>
                            <td>{{ ocr.issued_by }}</td>
                        </tr>                    
                    </tbody>
                </table>
                <div class="d-flex flex-column mt-2 ml-lg-1 pt-lg-3 pl-lg-2">
                    <kyc v-model="ocr.status_check" id="ocr" :disabled="type === 'REFUSE' || !$myCanExpertise()"/>
                    <note-fail 
                        v-if="!ocr.status_check" 
                        v-model="ocr.note_fail"
                        :disabled="type === 'REFUSE' || !$myCanExpertise()"
                        :error="errors.list_steps"/>                
                </div>
            </div>
        </div>

        <div class="p-2 p-lg-5 mt-3 mt-lg-5 d-flex flex-column flex-lg-row bg-light rounded shadow-sm">
            <div class="mr-lg-5" :style="$detect === 'web' ? 'width:278px' : 'width: 100%'">
                <p class="mb-2 font-weight-bolder">Ảnh chân dung</p>
                <div class="card-image portrait-image">
                    <imageBlock :url="$getUrlImage(portrait.image_portrait)" :edit="false" />
                </div>                    
            </div>
            <div class="d-flex flex-column mt-3 mt-lg-0 ml-lg-3 pl-lg-5">
                <p class="font-weight-bold mb-2">
                    Tỉ lệ trùng khớp: <span class="text-success">{{ portrait.match_rate }}%</span>
                </p>
                <kyc v-model="portrait.status_check" id="portrait" :disabled="type === 'REFUSE' || !$myCanExpertise()"/>
                <note-fail 
                    v-if="!portrait.status_check" 
                    v-model="portrait.note_fail"
                    :disabled="type === 'REFUSE' || !$myCanExpertise()"
                    :error="errors.list_steps"/>
            </div>
        </div>

        <div v-if="company_logo" class="p-2 p-lg-5 mt-3 mt-lg-5 d-flex flex-column flex-lg-row bg-light rounded shadow-sm">
            <div class="mr-5" :style="$detect === 'web' ? 'width:278px' : 'width: 100%'">
                <p class="mb-2 font-weight-bolder">Ảnh biển công ty</p>
                <div class="card-image">
                    <imageBlock :url="company_logo.image_company_logo" :edit="false" />
                </div>                    
            </div>
            <div class="d-flex flex-column ml-lg-3 pl-lg-5 mt-3 mt-lg-4 pt-2">
                <kyc v-model="company_logo.status_check" id="company_logo" :disabled="type === 'REFUSE' || !$myCanExpertise()"/>
                <note-fail  
                    v-if="!company_logo.status_check" 
                    v-model="company_logo.note_fail"
                    :disabled="type === 'REFUSE' || !$myCanExpertise()"
                    :error="errors.list_steps"/>
            </div>
        </div>
        
        <div v-if="labor_contract" class="p-2 p-lg-5 mt-3 mt-lg-5 d-flex flex-column flex-lg-row bg-light rounded shadow-sm">
            <div class="mr-lg-5">
                <p class="mb-2 font-weight-bolder">Ảnh hợp đồng lao động</p>
                <div class="d-flex justify-between flex-wrap">
                    <div v-for="(item, index) in labor_contract.image_labor_contract" :key="'labor-' + index" class="card-image portrait-image mr-2 mb-2">
                        <imageBlock :url="item" :edit="false" />
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column ml-lg-3 mt-2 mt-lg-4 pt-lg-2">
                <kyc v-model="labor_contract.status_check" id="labor_contract" :disabled="type === 'REFUSE' || !$myCanExpertise()"/>
                <note-fail 
                    v-if="!labor_contract.status_check" 
                    v-model="labor_contract.note_fail"
                    :disabled="type === 'REFUSE' || !$myCanExpertise()"
                    :error="errors.list_steps"/>
            </div>
        </div>    
        </div>     

        <div v-if="extra_information.length !== 0" class="p-2 p-lg-5 mt-3 mt-lg-5 bg-light rounded shadow-sm">
            <div>
                <p class="mb-3 font-weight-bolder h5">Thông tin bổ sung</p>

                <div v-for="(item, index) in extra_information" :key="index" :class="{'form-check py-2' : true, 'is-invalid' : extra.length !== 0 && errors.list_steps}">
                    <input v-model="extra" :value="item" type="checkbox" 
                    class="form-check-input" :id="index"
                    :disabled="type === 'REFUSE' || !$myCanExpertise()"/>
                    <label class="form-check-label" :for="index">{{ item.label }}</label>
                </div>
                <form-invalid v-if="extra.length !== 0 && errors.list_steps" error="Hồ sơ này còn thiếu thông tin bổ sung"/>                
            </div>
        </div>


        <div v-if="list_paying_done.length !== 0" class="row px-5 mt-5">
            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Số tiền</th>
                                <th>Ngày ứng lương</th>
                                <th>Ngày tất toán</th>
                                <th class="text-center" width="100">Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in list_paying_done" :key="item.id">
                                <td> {{ indexMethod(index) }} </td>
                                <td> {{ item.loan ? $formatNumber(item.loan) : '' }} </td>
                                <td> {{ item.contract_signing_date }} </td>
                                <td> {{ item.contract_end_date }} </td>
                                <td class="text-center"> 
                                    <button class="btn btn-primary"  @click="goDetail(item)">
                                        Chi tiết
                                    </button>
                                </td>                                
                            </tr>
                            <no-data :data="list_paying_done" colspan="5" />
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

        <div class="bg-light rounded shadow-sm mt-3 mt-lg-5 p-2 p-lg-5">
            <div class="row">
                <div class="col-lg-12 ml-auto">
                    <div class="input-group d-lg-flex align-items-center">
                        <span :class="{'font-weight-bold mr-3' : true, 'w-100' : $detect == 'mobile'}">Hạn mức</span>
                        <div :class="{'form-group d-flex align-items-center mb-0 mt-2 mt-lg-0' : true, 'w-100 justify-content-between' : $detect === 'mobile'}">
                            <span class="pr-3 px-lg-3">{{ limit_range.min_money }}</span>
                            <div class="position-relative flex-grow-1 text-center text-lg-left">
                                <ldc-select 
                                            v-if="$detect === 'web'"
                                            v-model="loan_limit"
                                            placeholder="Hạn mức" style="width:100%"
                                            :class="{'is-invalid' : errors.loan_limit}"
                                            :filterable="true"
                                            :actionKeyBoard="false"
                                            :disabled="type === 'REFUSE' || !$myCanExpertise()">
                                        <ldc-option
                                            v-for="(item, index) in limit_range.options"
                                            :key="index"
                                            :label="item ? $formatNumber(item) : ''"
                                            :value="item ? $formatNumber(item) : ''">
                                        </ldc-option>
                                </ldc-select>

                                <select 
                                    v-else
                                    v-model="loan_limit"
                                    :class="{'px-2' : true, 'is-invalid' : errors.loan_limit, 'select-ios' : !$isAndroid, 'w-100 text-center' : $detect === 'mobile'}"
                                    :disabled="type === 'REFUSE' || !$myCanExpertise()">
                                        <option value="" disabled hidden>Hạn mức</option>
                                        <option
                                            v-for="(item, index) in limit_range.options"
                                            :key="index"
                                            :value="item ? $formatNumber(item) : ''">
                                            {{ item ? $formatNumber(item) : '' }}
                                        </option>
                                </select>
                                <form-invalid :error="errors.loan_limit" class="position-absolute"/>
                            </div>
                            <span class="pl-3">{{ limit_range.max_money }}</span>
                        </div>                            
                    </div>
                </div>
                <div  class="col-lg-12 ml-auto mt-3 mt-lg-5">
                    <button class="btn btn-success size-button" 
                        :disabled="loading || type === 'REFUSE'"
                        :style="$detect === 'web' ? 'width:200px' : 'width: 100%'"
                    @click="passLoan()">
                        Duyệt
                    </button>
                    <button class="btn btn-danger mx-lg-2 my-3 my-lg-2 size-button" :style="$detect === 'web' ? 'width:200px' : 'width: 100%'"
                        :disabled="type === 'REFUSE' || !$myCanExpertise()"
                        @click="failLoan()">
                        Từ chối hồ sơ
                    </button>
                    <button :disabled="type === 'REFUSE' || !$myCanExpertise()" class="btn btn-warning text-white size-button" 
                        :style="$detect === 'web' ? 'width:200px' : 'width: 100%'"
                        @click="updateLoan()">
                        Yêu cầu cập nhật
                    </button>
                </div>
                <div class="col-lg-12 mt-3 mb-0">
                    <div class="form-group mb-0">
                        <textarea v-model="note_fail" :class="{'form-control' : true, 'is-invalid' : errors.note_fail}" rows="3" placeholder="Lý do"></textarea>
                        <form-invalid :error="errors.note_fail"/>
                    </div>
                </div>
            </div>
        </div>
        
        <detail
            :visible.sync="dialog"
            :loanHistory="itemShow"
        />

    </div>
</template>
<script>
import { detailExpertise1, getDoneLoan, passLoan, failLoan, updateLoan } from '@/repositories/expertise-1'
export default {
    components: {
        detail: () => import('./showDetail'),
        imageBlock: () => import('@/components/imageBlock')
    },
    data() {
        return {
            id: this.$route.params.id,
            user: {},
            information: {},
            ocr: {},
            portrait: {},
            labor_contract: {},
            company_logo: {},
            extra_information: [],
            time_updated: '',
            loan_limit: '',
            limit_range: {},
            list_paying_done: [],
            dialog: false,
            itemShow: {},
            total: 0,
            pageSize: 0,
            totalPages: 0,
            page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
            errors: {},
            note_fail: '',
            // check_steps: [],
            extra: [],
            type: '',
            loading: false,
        };
    },
    computed: {
        redirect() {
            return this.$store.state.general.redirect;
        },
    },
    async created() {
        await this.getData();
        this.getDoneLoan();
        this.$eventBus.$on('refresh_expertise1', data => {
            this.goList();
        })
    },
    methods: {
        async getData() {          
            await detailExpertise1(this.id).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    let data = res.data;
                    this.user = data.user ? data.user.data : {
                        name: data.name_user,
                        phone: data.phone_user,
                    };
                    this.time_updated = data.time_updated;
                    this.information = data.infomation;
                    this.information.loan = this.$formatNumber(data.infomation.loan);
                    this.information.income = this.information.income ? this.$formatNumber(data.infomation.income) : null;
                    this.information.salary_employee = this.information.salary_employee ? this.$formatNumber(data.infomation.salary_employee) : null;
                    this.labor_contract = data.labor_contract;
                    this.company_logo = data.company_logo;
                    this.ocr = data.ocr;
                    this.portrait = data.portrait;
                    this.extra_information = data.extra_information;
                    this.limit_range = {                    
                        min_money: data.limit_range.min_money ? this.$formatNumber(data.limit_range.min_money) : '',
                        max_money: data.limit_range.max_money ? this.$formatNumber(data.limit_range.max_money) : '',
                        options: data.limit_range.options
                    };
                    this.loan_limit = data.loan_limit ? this.$formatNumber(data.loan_limit) : '';
                    this.type = data.type;
                } else {
                    this.$showMessage(res.data.message, 'warning');
                    this.goList();
                }                
            })
        },
        getDoneLoan() {
            let query = {
                user_id: this.user?.id
            }
            getDoneLoan(query).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    let data = res.data;
                    this.list_paying_done = data.data;
                    
                    let pagination = data.meta.pagination;
                    this.page = pagination.current_page;
                    this.pageSize = pagination.per_page;
                    this.total = pagination.total;
                    this.totalPages = pagination.total_pages;
                } else {
                    this.list_paying_done = []
                }
            })
        },
        indexMethod(index) {   
            return index + 1 + this.pageSize * (this.page - 1);
        },
        changePage(page) {
            this.page = page;
            this.changeUrl();
        },
        changeUrl() {
            this.$router.push({
                name: 'expertise-1',
                query: this.setQuery(),
            })
        },
        setQuery() {
            let query = {};
            if (this.page > 1) query.page = this.page;
            return query;
        },
        goDetail(item){
            this.itemShow = item;
            this.dialog = true;
        },
        async passLoan() {
            if(!this.$myCanExpertise()) return
            this.loading = true;         
            let query = {};
            query.loan_limit = this.$stringToNumber(this.loan_limit);
            query.list_steps = {
                INFORMATION: {
                    pass: this.information.status_check,
                    note_fail: this.information.note_fail
                },
                CCCD: {
                    pass: this.ocr.status_check,
                    note_fail: this.ocr.note_fail
                },
                PORTRAIT: {
                    pass: this.portrait.status_check,
                    note_fail: this.portrait.note_fail
                },                
                INFORMATION_EXTRA: {
                    status: this.extra
                },
            }
            if(this.labor_contract) {                
                query.list_steps.LABOR_CONTRACT = {
                    pass: this.labor_contract ? this.labor_contract.status_check : null,
                    note_fail: this.labor_contract ? this.labor_contract.note_fail : null,
                }
            }
            if(this.company_logo) {
                query.list_steps.COMPANY_LOGO = {
                    pass: this.company_logo ? this.company_logo.status_check : null,
                    note_fail: this.company_logo ? this.company_logo.note_fail : null,
                }
            }
            await passLoan(this.id, query).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.$showMessage(res.data.message, 'success');
                    this.goList();
                } else {
                    this.$showMessage(res.data.message, 'warning');                    
                }                
            }).catch(err => {
                this.requestError(err)
            });  
            this.loading = false;
        },       

        failLoan() {
            if(!this.$myCanExpertise()) return
            let query = {}
            if (this.note_fail) {
                query.note_fail = this.note_fail
            }
            failLoan(this.id, query).then(res => {
                this.$showMessage(res.data.message, 'success');
                this.goList();
            }).catch(err => {
                this.requestError(err)
            });   
        },
        
        updateLoan() {
            if(!this.$myCanExpertise()) return
            let query = {};
            query.list_steps = {
                INFORMATION: {
                    pass: this.information.status_check,
                    note_fail: this.information.note_fail
                },
                CCCD: {
                    pass: this.ocr.status_check,
                    note_fail: this.ocr.note_fail
                },
                PORTRAIT: {
                    pass: this.portrait.status_check,
                    note_fail: this.portrait.note_fail
                },
            }
            if(this.labor_contract) {                
                query.list_steps.LABOR_CONTRACT = {
                    pass: this.labor_contract.status_check,
                    note_fail: this.labor_contract.note_fail,
                }
            }
            if(this.company_logo) {
                query.list_steps.COMPANY_LOGO = {
                    pass: this.company_logo.status_check,
                    note_fail: this.company_logo.note_fail,
                }
            }
            
            query.information_extra = this.extra.map(item => {
                return item.status
            });
            updateLoan(this.id, query).then(res=> {
                this.$showMessage(res.data.message, 'success');
                this.goList();
            }).catch(err => {
                this.requestError(err, true)
            });               
        },
        requestError(err, update) {
            if (err.status === HTTP_CODE_GONE) {
                this.$showMessage(err.data.data.message, 'warning')
                // this.dialog = false;
            } else if (err.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
                if(update) {
                    this.$showMessage(err.data.data.data.list_steps, 'warning');
                }
                this.errors = err.data.data.data;
            }
        },
        getPathGoList() {
            let path = '/expertise-1';
            return path + this.redirect;
        },
        goList() {
            this.$router.push({
                path: this.getPathGoList()
            })
        },
    }
};
</script>
<style lang="scss">
.expertise-1_detail {
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
    .ocr-info {
        span {
            height: 35px;
        }
    }

    .table td {
        border: none;
    }

    .form-control:disabled, .form-control[readonly] {
        background-color: #fff;
        opacity: 1;
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

    @media screen and (max-width: 1023px) {
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