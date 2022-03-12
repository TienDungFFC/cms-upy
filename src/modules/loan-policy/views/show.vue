<template>
    <div class="loan-policy-show container-fluid">
        <p v-if="$detect === 'web'" class="h5 font-weight-bold">Chính sách cho vay</p>
        <div class="row mt-md-4">
            <div class="col-lg-6 mt-3">
                <div :class="{'bg-mb rounded-top p-1 shadow-sm': $detect === 'mobile'}">
                    <p class="font-weight-bold m-0">Tiền vay</p>
                    <div class="d-md-flex justify-content-between align-items-center mt-md-3 p-md-0 py-2">
                        <label style="width: 250px;" :class="{'m-0': $detect === 'mobile'}">Số kỳ  hạn</label>
                        <div class="input-group">
                            <input
                            :disabled="!$myCanUpdate()"
                            placeholder="Số kỳ hạn"
                            v-model="form.tenor"
                            type="text"
                            inputmode="numeric"
                            @focus="e => e.target.select()"
                            @input="formatInt('tenor')"
                            class="form-control rounded size-input" 
                            :class="{ 'is-invalid': errors.tenor }">
                            <form-invalid :error="errors.tenor"/>
                        </div>
                    </div>
                    <div class="d-md-flex justify-content-between align-items-center mt-md-3">
                        <label style="width: 250px;" :class="{'m-0': $detect === 'mobile'}">Lãi suất hàng tháng</label>
                        <div class="input-group position-relative align-items-center">
                            <input
                            :disabled="!$myCanUpdate()"
                            placeholder="Lãi suất"
                            v-model="form.interest_rate"
                            type="number"
                            inputmode="decimal"
                            @input="formatPercent('interest_rate')"
                            @focus="e => e.target.select()"
                            class="form-control rounded size-input pr-4" 
                            :class="{ 'is-invalid': errors.interest_rate }">
                            <span :class="{'ml-3 font-weight-bold position-absolute': true, 'percent': $detect === 'web', 'percentMb': $detect === 'mobile'}">%</span>
                            <div class="invalid-feedback">{{ errors.interest_rate }}</div>
                        </div>
                    </div>
                </div>
                <div :class="{'mt-4': true, 'bg-mb rounded-top p-1 shadow-sm': $detect === 'mobile'}">
                    <p class="font-weight-bold m-0">Phí phạt</p>
                    <div class="d-md-flex justify-content-between align-items-center mt-md-3 p-md-0 py-2">
                        <label style="width: 250px;" :class="{'m-0': $detect === 'mobile'}">Thanh toán trước kì hạn/thừa</label>
                        <div class="input-group position-relative align-items-center">
                            <input
                            :disabled="!$myCanUpdate()"
                            placeholder="Thanh toán trước kì hạn/thừa"
                            v-model="form.prepayment_penalty"
                            type="number"
                            inputmode="decimal"
                            @input="formatPercent('prepayment_penalty')"
                            @focus="e => e.target.select()"
                            class="form-control rounded size-input pr-4" 
                            :class="{ 'is-invalid': errors.prepayment_penalty }">
                            <div class="invalid-feedback">{{ errors.prepayment_penalty }}</div>
                            <span :class="{'ml-3 font-weight-bold position-absolute': true, 'percent': $detect === 'web', 'percentMb': $detect === 'mobile'}">%</span>
                        </div>
                    </div>
                    <div class="d-md-flex justify-content-between align-items-center mt-md-3 p-md-0 pb-2">
                        <label style="width: 250px;" :class="{'m-0': $detect === 'mobile'}">Nợ quá hạn</label>
                        <ldc-select
                            :disabled="!$myCanUpdate()"
                            v-if="$detect === 'web'"
                            placeholder="Theo ngày hoặc theo lãi suất"
                            v-model="form.type_punishment"
                            class="size-input"
                            style="width: 100%"
                            >
                            <ldc-option
                                v-for="item in optionPunish"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                            >
                            </ldc-option>
                        </ldc-select>
                        <select
                            v-else
                            :disabled="!$myCanUpdate()"
                            placeholder="Theo ngày hoặc theo lãi suất"
                            v-model="form.type_punishment"
                            :class="{'size-input form-control': true, 'select-ios' : !$isAndroid, 'pl-1': $isAndroid}"
                            style="width: 100%;">
                            <option value="" disabled hidden>Nợ quá hạn</option>
                            <option 
                                v-for="item in optionPunish"
                                :key="item.value"
                                :value="item.value">{{item.label}}</option>
                        </select>
                    </div>
                    <div v-if="form.type_punishment == 'DATE' || form.type_punishment == ''" class="d-md-flex justify-content-between align-items-center mt-md-3">
                            <label style="width: 250px;" :class="{'m-0': $detect === 'mobile'}">Số tiền</label>
                            <div class="input-group">
                                <input
                                :disabled="!$myCanUpdate()"
                                v-model="form.number_punishment"
                                placeholder="Số tiền"
                                type="text"
                                inputmode="numeric"
                                @focus="e => e.target.select()"
                                @input="formatInt('number_punishment')" 
                                class="form-control rounded size-input" 
                                :class="{ 'is-invalid': errors.number_punishment }">
                                <div class="invalid-feedback">{{ errors.number_punishment }}</div>
                            </div>
                    </div>
                    <div v-else class="d-md-flex justify-content-between align-items-center mt-md-3 p-md-0 pb-2"> 
                            <label style="width: 250px;" :class="{'m-0': $detect === 'mobile'}">Lãi suất</label>
                            <div class="input-group position-relative align-items-center">
                            <input
                            :disabled="!$myCanUpdate()"
                            v-model="form.number_punishment"
                            placeholder="Lãi suất"
                            type="number"
                            inputmode="decimal"
                            @input="formatPercent('number_punishment')"
                            @focus="e => e.target.select()"
                            class="form-control rounded size-input pr-4" 
                            :class="{ 'is-invalid': errors.number_punishment }">
                            <div class="invalid-feedback">{{ errors.number_punishment }}</div>
                            <span :class="{'ml-3 font-weight-bold position-absolute': true, 'percent': $detect === 'web', 'percentMb': $detect === 'mobile'}">%</span>
                        </div>
                    </div>
                </div>
                <div :class="{'mt-4': true, 'bg-mb rounded-top p-1 shadow-sm': $detect === 'mobile'}">
                    <p class="font-weight-bold m-0">Phí thành viên</p>
                    <div class="d-md-flex justify-content-between align-items-center mt-md-3 p-md-0 py-2">
                        <label style="width: 250px;" :class="{'m-0': $detect === 'mobile'}">Phí TV1</label>
                        <div class="input-group">
                            <input
                            :disabled="!$myCanUpdate()"
                            placeholder="Phí TV1"
                            v-model="form.tv1"
                            type="text"
                            inputmode="numeric"
                            @focus="e => e.target.select()"
                            @input="formatInt('tv1')" 
                            class="form-control rounded size-input" 
                            :class="{ 'is-invalid': errors.tv1 }">
                            <div class="invalid-feedback">{{ errors.tv1 }}</div>
                        </div>
                    </div>
                    <div class="d-md-flex justify-content-between align-items-center mt-md-3 p-md-0 pb-2">
                        <label style="width: 250px;" :class="{'m-0': $detect === 'mobile'}">Phí TV2</label>
                        <div class="input-group">
                            <input
                            :disabled="!$myCanUpdate()"
                            placeholder="Phí TV2"
                            v-model="form.tv2"
                            type="text"
                            inputmode="numeric"
                            @focus="e => e.target.select()"
                            @input="formatInt('tv2')"
                            class="form-control rounded size-input" 
                            :class="{ 'is-invalid': errors.tv2 }">
                            <div class="invalid-feedback">{{ errors.tv2 }}</div>
                        </div>
                    </div>
                    <div class="d-md-flex justify-content-between align-items-center mt-md-3">
                        <label style="width: 250px;" :class="{'m-0': $detect === 'mobile'}">Hạn mức TV1</label>
                        <div class="input-group">
                            <input
                            :disabled="!$myCanUpdate()"
                            placeholder="Hạn mức TV1"
                            v-model="form.money_tv"
                            type="text"
                            inputmode="numeric"
                            @focus="e => e.target.select()"
                            @input="formatInt('money_tv')"
                            class="form-control rounded size-input" 
                            :class="{ 'is-invalid': errors.money_tv }">
                            <div class="invalid-feedback">{{ errors.money_tv }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 mt-3">
                <div  :class="{'bg-mb rounded-top p-1 shadow-sm': $detect === 'mobile'}">
                <p class="font-weight-bold m-0">Ưu đãi tất toán</p>
                    <div class="d-md-flex justify-content-between align-items-center mt-md-3 p-md-0 pb-2">
                        <label style="width: 250px;" :class="{'m-0': $detect === 'mobile'}">Số ngày miễn full phí vay</label>
                        <div class="input-group">
                            <input
                            :disabled="!$myCanUpdate()"
                            placeholder="Số ngày miễn full phí vay"
                            v-model="form.max_day_free"
                            type="text"
                            inputmode="numeric"
                            @focus="e => e.target.select()"
                            @input="formatInt('max_day_free')" 
                            class="form-control rounded size-input"
                            :class="{ 'is-invalid': errors.max_day_free }">
                            <div class="invalid-feedback">{{ errors.max_day_free }}</div>
                        </div>
                    </div>
                    <div class="d-md-flex justify-content-between align-items-center mt-md-3">
                        <label style="width: 250px;" :class="{'m-0': $detect === 'mobile'}">Số ngày miễn 1 phần phí</label>
                        <div class="input-group">
                            <input
                            :disabled="!$myCanUpdate()"
                            placeholder="Số ngày miễn 1 phần phí"
                            v-model="form.max_day_free_costs_incurred"
                            type="text"
                            inputmode="numeric"
                            @focus="e => e.target.select()"
                            @input="formatInt('max_day_free_costs_incurred')"
                            class="form-control rounded size-input" 
                            :class="{ 'is-invalid': errors.max_day_free_costs_incurred }">
                            <div class="invalid-feedback">{{ errors.max_day_free_costs_incurred }}</div>
                        </div>
                    </div>
                </div>
                <div :class="{'mt-4': true, 'bg-mb rounded-top p-1 shadow-sm': $detect === 'mobile'}">
                    <p class="font-weight-bold m-0">Phí khoản vay</p>
                        <div class="d-md-flex justify-content-between align-items-center mt-md-3 p-md-0 py-2">
                            <label style="width: 250px;" :class="{'m-0': $detect === 'mobile'}">Phí khoản vay</label>
                            <ldc-select
                                v-if="$detect === 'web'"
                                :disabled="!$myCanUpdate()"
                                placeholder="Trả trước hoặc trả sau"
                                v-model="typeFees"
                                class="size-input"
                                style="width: 100%"
                            >
                                <ldc-option
                                v-for="item in optionTypeFees"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                                >
                                </ldc-option>
                            </ldc-select>
                            <select
                                v-else
                                :disabled="!$myCanUpdate()"
                                placeholder="Trả trước hoặc trả sau"
                                v-model="typeFees"
                                :class="{'size-input form-control': true, 'select-ios' : !$isAndroid, 'pl-1': $isAndroid}"
                                style="width: 100%">
                                <option value="" disabled hidden>Phí khoản vay</option>
                                <option 
                                    v-for="item in optionTypeFees"
                                    :key="item.value"
                                    :value="item.value">{{item.label}}</option>
                            </select>
                        </div>
                        <div class="d-md-flex justify-content-between align-items-center mt-md-3 p-md-0 pb-2">
                            <label style="width: 250px;" :class="{'m-0': $detect === 'mobile'}">Phí chuyển đổi khoản vay</label>
                            <div class="input-group position-relative align-items-center">
                                <input
                                :disabled="!$myCanUpdate()"
                                placeholder="Phí chuyển đổi khoản vay"
                                v-model="form.loan_conversion_fee"
                                type="number"
                                inputmode="decimal"
                                @input="formatPercent('loan_conversion_fee')"
                                @focus="e => e.target.select()"
                                class="form-control rounded size-input pr-4" 
                                :class="{ 'is-invalid': errors.loan_conversion_fee }">
                                <div class="invalid-feedback">{{ errors.loan_conversion_fee }}</div>
                                <span :class="{'ml-3 font-weight-bold position-absolute': true, 'percent': $detect === 'web', 'percentMb': $detect === 'mobile'}">%</span>
                            </div>
                        </div>
                        <div  class="d-md-flex justify-content-between align-items-center mt-md-3">
                            <label style="width: 250px;" :class="{'m-0': $detect === 'mobile'}">Phí bảo hiểm</label>
                            <div class="input-group position-relative align-items-center">
                                <input
                                :disabled="!$myCanUpdate()"
                                placeholder="Phí bảo hiểm"
                                v-model="form.insurance_fees"
                                type="number"
                                inputmode="decimal"
                                @input="formatPercent('insurance_fees')"
                                @focus="e => e.target.select()"
                                class="form-control rounded size-input pr-4" 
                                :class="{ 'is-invalid': errors.insurance_fees }">
                                <div class="invalid-feedback">{{ errors.insurance_fees }}</div>
                                <span :class="{'ml-3 font-weight-bold position-absolute': true, 'percent': $detect === 'web', 'percentMb': $detect === 'mobile'}">%</span>
                            </div>
                        </div>
                        <div v-for="(item, i) in form.other_fees" :key="i" 
                            class="d-flex justify-content-between align-items-end mt-3" 
                            :class="{ 'is-invalid': errors.other_fees }">
                            <div :class="$detect === 'web' ? 'mr-4' : 'mr-1'" style="width: 240px;">
                                <label>Tiêu đề phí</label>
                                <div class="input-group">
                                    <input
                                    :disabled="!$myCanUpdate()"
                                    v-model="item.label"
                                    placeholder="Tiêu đề phí"
                                    type="text" 
                                    class="form-control rounded size-input">
                                </div>
                            </div>
                            <div style="width: 100%;"> 
                                <label>Phần trăm phí</label>
                                <div class="input-group position-relative align-items-center">
                                    <input
                                    :disabled="!$myCanUpdate()"
                                    placeholder="Phần trăm phí"
                                    v-model="item.value"
                                    type="number"
                                    inputmode="decimal"
                                    @input="formatPercent('insurance_fees')"
                                    @focus="e => e.target.select()"
                                    class="form-control rounded size-input pr-4">
                                    <span :class="{'ml-3 font-weight-bold position-absolute': true, 'percent': $detect === 'web', 'percentMb': $detect === 'mobile'}">%</span>
                                </div>
                            </div>
                            <button v-if="$myCanUpdate()"
                                    type="button" class="btn btn-danger btn-delete rounded-circle ml-2 h-50" 
                                    @click="removeOther(i)"><i class="icon ion-md-trash"></i></button>
                        </div>
                        <div class="invalid-feedback">Vui lòng nhập lại thông tin thêm</div>
                    <button v-if="$myCanUpdate()" class="btn btn-primary mt-3" @click="addOther()">Thêm khoản phí</button>
                </div>
            </div>
        </div>
        <buttom-fixed v-if="$myCanUpdate()">
            <div :class="{'w-100': $detect === 'mobile'}">
                <button :class="{'btn btn-success px-5 mt-5': true, 'w-100 size-button': $detect === 'mobile'}" :disabled="loading" @click="update()">Lưu</button>
            </div>
        </buttom-fixed>
        
    </div>
</template>
<script>
import { detaiLoanPolicy,updateLoanPolicy } from "@/repositories/loan-policy.js";
import { optionPunish } from "@/constants/optionPunish.js";
import { optionTypeFees } from "@/constants/optionTypeFees.js"
export default {
    data() {
        return {
            id: this.$route.params.id,
            loading: false,
            errors: {},
            form: {
                tenor:'',
                interest_rate: '',
                other_fees: [],
                insurance_fees: '',
                loan_conversion_fee: '',
                max_day_free: '',
                max_day_free_costs_incurred: '',
                tv1: '',
                tv2: '',
                money_tv: '',
                type_punishment: '',
                number_punishment: '',
                prepayment_penalty: ''          
            },
            fees_other_item: {
                label: '',
                value: ''
            },
            optionPunish: optionPunish,
            typeFees: '',
            optionTypeFees: optionTypeFees,
            checkPunishment: [],
            moneny_date: '',
            number_percent: ''
        };
    },
    computed: {
    },
    watch: {
        'form.number_punishment'(val){
            if(this.form.type_punishment == 'DATE'){
                this.moneny_date = this.form.number_punishment
            }else{
                this.number_percent = this.form.number_punishment
            }
        },
        'form.type_punishment'(val){
            this.checkPunishment.push(val)
            if(this.checkPunishment.length == 1){
                return
            }else{
                if(val == 'DATE'){
                    this.form.number_punishment = this.moneny_date
                }else{
                    this.form.number_punishment = this.number_percent
                }
            }
            
        }
    },
    created() {
        if(this.id){
            this.getData()
        }
    },
    methods: {
        getData() {
            detaiLoanPolicy(this.id).then((res) => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.form.tenor = res.data.data.tenor
                    let data = res.data.data
                    this.form.interest_rate = data.interest_rate
                    this.form.insurance_fees = data.insurance_fees
                    this.form.loan_conversion_fee = data.loan_conversion_fee
                    this.form.max_day_free = data.max_day_free
                    this.form.max_day_free_costs_incurred = data.max_day_free_costs_incurred
                    this.form.tv1 = this.$formatNumber(data.tv1)
                    this.form.tv2 = this.$formatNumber(data.tv2)
                    this.form.money_tv = this.$formatNumber(data.money_tv)
                    this.form.type_punishment = data.type_punishment ? data.type_punishment : 'DATE'
                    if(data.type_punishment === 'DATE'){
                        this.form.number_punishment = this.$formatNumber(data.number_punishment)
                    }else{
                        this.form.number_punishment = data.number_punishment
                    }
                    this.form.prepayment_penalty = data.prepayment_penalty
                    this.form.other_fees = data.other_fees
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }
            });
        },
        formatInt(key) {
            this.form[key] = this.$formatNumber(this.form[key]);
        },
        async addOther(){
            if(!this.$myCanUpdate()) return;
            let checkLabel = this.form.other_fees.some(x => {
                   return x.label == ''
            })
            let checkValue = this.form.other_fees.some(x => {
                   return x.value == ''
            })
            if(!checkLabel && !checkValue){
                let feesPush = {...this.fees_other_item}
                this.form.other_fees.push(feesPush);
            }else{
                this.$showMessage('Khoản phí thêm chưa được nhập đầy đủ! ', 'warning');
            }
            
        },
        removeOther(index) { 
            if(!this.$myCanUpdate()) return;
            this.form.other_fees.splice(index,1);
        },
        async update(){
            if(!this.$myCanUpdate()) return;
            this.errors = {};
            this.loading = true;
            this.form.other_fees.forEach(x => {
                x.value = parseFloat(x.value)
            })
            const form = {
                insurance_fees: parseFloat(this.form.insurance_fees),
                interest_rate : parseFloat(this.form.interest_rate),
                loan_conversion_fee: parseFloat(this.form.loan_conversion_fee),
                max_day_free: this.stringToNumber(this.form.max_day_free),
                max_day_free_costs_incurred: this.stringToNumber(this.form.max_day_free_costs_incurred),
                money_tv: this.stringToNumber(this.form.money_tv),
                number_punishment: this.form.type_punishment == 'DATE' ? this.stringToNumber(this.form.number_punishment) : parseFloat(this.form.number_punishment),
                prepayment_penalty: parseFloat(this.form.prepayment_penalty),
                tenor: this.stringToNumber(this.form.tenor),
                tv1: this.stringToNumber(this.form.tv1),
                tv2: this.stringToNumber(this.form.tv2),
                type_punishment : this.form.type_punishment,
                other_fees: this.form.other_fees
            }
            await updateLoanPolicy(this.id, form).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.$showMessage(res.data.message,'success');
                    this.loading = true;
                    this.getData();
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }
                }).catch(
                err => {
                    this.requestError(err)
                }
            )
            this.loading = false;
            },
            requestError(err) {
                if (err.status === HTTP_CODE_GONE) {
                    this.$showMessage(err.data.message,"warning");
                } else if (err.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
                    this.errors = err.data.data.data;
                }
            },
            formatPercent(key) {
                this.form[key] = this.form[key].toString().replace(/,/g, '.')
            },
            stringToNumber(number) {
                number = number.toString().replace(/\./g, '');
                if(number === '') number = 0;
                number = parseInt(number);
                return number;
            }
    },
};
</script>
<style lang="scss">
.loan-policy-show{
    .percent{
        top: 6px;
        right: 5px;
        z-index: 5;
        color: #495057;
    }
    .percentMb{
        top: 11px;
        right: 5px;
        z-index: 5;
        color: #495057;
    }
    @media only screen and (max-width: 1023px){
        .btn-delete{
            height: 40px;
            min-height: 40px;
            width: 40px;
            min-width: 40px;
        }
    }
}
</style>
