<template>
    <div v-loading="loading" class="container-fluid payment-show py-3">
        <div class="row">
            <div :class="$detect === 'web' ? 'col-6' : 'col-12'">
                <div class="d-flex">
                    <div :class="{'mr-3 avatar' : true, 'flex-grow-0 flex-shrink-0' : $detect === 'mobile'}">
                        <imageBlock :url="$getUrlImage(avatar)" :edit="false" type="avatar"/>
                    </div>
                 <div :class="{'d-flex flex-column align-items-left justify-content-center overflow-hidden' : true, 'pl-4' : $detect === 'web', 'pl-0' : $detect === 'mobile'}">
                        <h3 :class="{'h5 font-weight-bold' : $detect === 'mobile' }">{{ name }}</h3>
                        <p v-if="email" class="mb-2">Email: {{ email }}</p>
                        <p class="m-0">{{ phone }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-4 mx-0 rounded px-0 px-lg-4 py-2 py-lg-3 shadow-sm bg-light">
            <div class="col-12 col-lg-7">
                <form>
                    <div class="form-group row">
                        <label class="font-weight-bold col-12 col-lg-4">Kỳ thanh toán:</label>
                        <div class="col-12 col-lg-8">
                            {{ payment_periods.content }}
                        </div>
                    </div>   
                    <div class="form-group row">
                        <label class="font-weight-bold col-12 col-lg-4">Thời gian thanh toán:</label>
                        <div class="col-12 col-lg-8">
                            {{ payment_time }}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="font-weight-bold col-12 col-lg-4">Phạt trả trước:</label>
                        <div class="col-12 col-lg-8">
                            {{ prepay_penalty }}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="font-weight-bold col-12 col-lg-4">Tiền nợ:</label>
                        <div class="col-12 col-lg-8">
                            <div class="d-flex">
                                <div>{{ lack_money }}</div>
                                <div 
                                    v-if="lack_money"
                                    :class="{
                                    'form-check ml-5 pl-4 pr-2' : true, 
                                    'border border-primary text-primary rounded' : waive_penalty,
                                    'border border-secondary text-secondary rounded' : waive_penalty && status_origin !== 'PAYING',
                                    }">
                                    <input
                                        v-model="waive_penalty" 
                                        :disabled="status_origin !== 'PAYING'" 
                                        type="checkbox" 
                                        class="form-check-input" 
                                        id="waivePenalty"
                                        @change="confirmWaive">
                                    <label class="form-check-label" for="waivePenalty">Bỏ phạt</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="font-weight-bold col-12 col-lg-4">Tiền gốc: </label>
                        <div class="col-12 col-lg-8">
                            {{ money_origin }}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="font-weight-bold col-12 col-lg-4">Tổng tiền cần thanh toán: </label>
                        <div class="col-12 col-lg-8">
                            {{ waive_penalty ? payment_total : payment_amount }}
                        </div>
                    </div>  
                    <div class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-lg-4">Số tiền thanh toán: </label>
                        <div class="col-12 col-lg-8">
                            <input 
                                v-model="amount_paid" 
                                type="text" 
                                :class="{'form-control size-input w-auto' : true, 'is-invalid' : errors.money_pay}" 
                                :disabled="status_origin !== 'PAYING'"
                                placeholder="Số tiền thanh toán"
                                @input="convertPaymentAmount"
                                >
                            <form-invalid :error="errors.money_pay"/>
                        </div>
                    </div>  
                    <div class="form-group row">
                        <label class="font-weight-bold col-12 col-lg-4">Trạng thái hiện tại: </label>
                        <div :class="{
                                'col-12 col-lg-8 font-weight-bold': true,
                                'text-warning' : status_origin == 'PAYING',
                                'text-success' : status_origin == 'PAID',
                                'text-danger' : status_origin == 'FAIL'
                            }">
                            {{ status }}
                        </div>
                    </div>      
                    <div v-if="status_origin === 'PAYING'" class="form-group row mb-0">
                        <label class="font-weight-bold col-form-label col-12 col-lg-4">Xác nhận thanh toán: </label>
                        <div class="col-12 col-lg-8">
                            <button 
                                class="btn btn-primary" 
                                @click.prevent="changeStatus()">
                                Thanh toán
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-12 col-lg-5">
                <div class="form-group row">
                    <label class="font-weight-bold col-12 col-md-4 col-lg-5">Phương thức thanh toán:</label>
                    <div class="col-12 col-lg-7">
                        {{ payment_method }}
                    </div>
                </div>
                <div v-for="(item, index) in data_user_pay" :key="`item-${index}`" class="form-group row">
                    <label class="font-weight-bold col-12 col-md-4 col-lg-5">{{ item.label === 'note' ? 'Nội dung thanh toán' : item.label }}:</label>
                    <div class="col-12 col-lg-7">
                        {{ item.value }}
                    </div>
                </div>
                <div class="form-group row">
                    <label class="font-weight-bold col-12">Ảnh thanh toán: </label>
                    <div class="col-12">
                        <div class="border" style="width:250px; height:350px;">
                            <imageBlock :url="payment_photo" :edit="false"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { detailPayment, updateStatus } from "@/repositories/payment.js";
export default {
    components: {
        imageBlock: () => import('@/components/imageBlock'),
    },
    data() {
        return {
            avatar: '',
            name: '',
            email: '',
            phone: '',
            period: '',
            prepay_penalty: '',
            lack_money: '',
            payment_periods: '',
            payment_time: '',
            lack_money: '',
            amount_paid: '',
            payment_amount: '',
            money_origin: '',
            payment_total: '',
            payment_photo: '',
            payment_method: '',
            waive_penalty: false,
            data_user_pay: [],
            status: '',
            status_origin: '',
            errors: {},
            loading: false,
            id: this.$route.params.id,
        };
    },
    created() {
        if (this.id) {
            this.getData();
        }
    },
    methods: {
        async getData() {
            await detailPayment(this.id).then((res) => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    let data = res.data;
                    this.setData(data)
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }
            });           
        },
        async confirmWaive() {
            if (!this.waive_penalty) return;
            await this.$confirm(
                `Bạn có chắc chắn muốn bỏ phạt`,`Xác nhận bỏ phạt`, {
                    confirmButtonText: 'Đồng ý',
                    cancelButtonText: 'Hủy',
                    type: 'warning',
            }).then(async () => {
               this.waive_penalty = true;
            }).catch(() => {
                this.waive_penalty = false;
            });
        },
        convertPaymentAmount() {
            this.amount_paid = this.$formatNumber(this.amount_paid)
        },
        setData(data) {
            this.avatar = data.user?.data.avatar;
            this.email = data.user?.data.email;
            this.phone = data.user?.data.phone;
            this.name = data.user?.data.name;
            this.period = 'Đang cập nhật';
            this.lack_money = data.lack_money;
            this.payment_periods = data.payment_periods;
            this.payment_time = data.payment_date;
            this.amount_paid = data.amount_paid ? this.$formatNumber(data.amount_paid) : 0;
            this.payment_amount = data.payment_amount ? this.$formatNumber(data.payment_amount) : 0;
            this.payment_total = data.payment_amount < 0 ? 
                                '-' + this.$formatNumber(data.payment_amount - data.lack_money) : 
                                this.$formatNumber(data.payment_amount - data.lack_money);
            this.money_origin = data.money_origin ? this.$formatNumber(data.money_origin) : 0;
            this.payment_photo = data.image;
            this.status = data.status;
            this.status_origin = data.status_origin;
            this.prepay_penalty = data.prepay_penalty ? this.$formatNumber(data.prepay_penalty) : 0;
            this.waive_penalty = data.waive_penalty;
            this.lack_money = data.lack_money ? this.$formatNumber(data.lack_money) : 0;
            this.payment_method = data.paymentForm?.data?.name;
            this.data_user_pay = Object.keys(data.data_user_pay).map(item => {
                return {
                    label: item,
                    value: data.data_user_pay[item]
                }
            }).filter(item => item.label !== 'image')
        },
        async changeStatus() {
            this.errors = {};
            await this.$confirm(
                `Bạn có chắc chắn muốn thanh toán khoản vay`,`Xác nhận thanh toán`, {
                    confirmButtonText: 'Đồng ý',
                    cancelButtonText: 'Hủy',
                    type: 'warning',
            }).then(async () => {
                let query = {};
                query.money_pay = this.amount_paid ? this.$stringToNumber(this.amount_paid) : '';
                query.waive_penalty = this.waive_penalty ? 1 : 0;
                updateStatus(this.id, query).then((res) => {
                    if(res.data.success === API_STATUS_SUCCESS) {
                        let data = res.data.data;
                        this.setData(data);
                        this.$showMessage(res.data.message, 'success');
                    } else {
                        this.$showMessage(res.data.message, 'warning');
                    }
                }).catch(err => this.requestError(err));
            }).catch(() => {
            });
        },
        requestError(err) {
            if (err.status === HTTP_CODE_GONE) { 
                this.$showMessage( err.data.message, "warning");
            } else if(err.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
                this.errors = err.data.data.data;
                console.log(this.errors);
            }
        },
    },
};
</script>
<style lang="scss">
.payment-show{
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
