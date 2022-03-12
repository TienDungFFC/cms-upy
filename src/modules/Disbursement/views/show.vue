<template>
    <div v-loading="loading" class="container-fluid user-management-show py-3">
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
            <div class="col-12 col-lg-8">
                <form>
                    <div class="form-group row">
                        <label class="font-weight-bold col-12 col-md-4">Thời gian ứng:</label>
                        <div class="col-12 col-md-8">
                            {{ time_created }}
                        </div>
                    </div>      
                    <div class="form-group row">
                        <label class="font-weight-bold col-12 col-md-4">Thời gian ký hợp đồng:</label>
                        <div class="col-12 col-md-8">
                            {{ contract_signing_date }}
                        </div>
                    </div>      
                    <div class="form-group row">
                        <label class="font-weight-bold col-12 col-md-4">Số tiền ứng: </label>
                        <div class="col-12 col-md-8">
                            {{ loan }}
                        </div>
                    </div>      
                    <div class="form-group row">
                        <label class="font-weight-bold col-12 col-md-4">Số tiền giải ngân: </label>
                        <div class="col-12 col-md-8">
                            {{ money_disbursement }}
                        </div>
                    </div>      
                    <div class="form-group row">
                        <label class="font-weight-bold col-12 col-md-4">Trạng thái hiện tại: </label>
                        <div :class="{
                            'col-12 col-md-8 font-weight-bold' : true,
                            'text-warning' : status === 0,
                            'text-success' : status === 1,
                            'text-danger' : status === 2,
                            }">
                            {{ status_text }}
                        </div>
                    </div>
                    <div v-if="status !== 1" class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-md-4">Lý do từ chối giải ngân:</label>
                        <div class="col-12 col-md-8">
                            <textarea 
                                v-model="note" 
                                :class="{'form-control' : true , 'is-invalid' : errors.note }" 
                                rows="3" 
                                placeholder="Lý do từ chối giải ngân"
                                style="max-width: 400px">
                            </textarea>
                            <form-invalid :error="errors.note"/>          
                        </div>
                    </div>
                    <div v-if="status === 0" class="form-group row">
                        <label class="font-weight-bold col-form-label col-12 col-md-4">Chuyển trạng thái: </label>
                        <div class="col-12 col-md-8">
                            <button v-if="status !== 1" :disabled="loading" class="btn btn-success mr-3" @click.prevent="changeStatus(1)">
                                Đã giải ngân
                            </button>
                            <button v-if="status !== 2" :disabled="loading" class="btn btn-danger" @click.prevent="changeStatus(2)">
                                Từ chối giải ngân
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-12 col-lg-4">
                <div class="form-group row">
                    <label class="font-weight-bold col-12 col-md-4 col-lg-5">Tên ngân hàng: </label>
                    <div class="col-12 col-md-8 col-lg-7">
                        {{ bankAccount.bank }}
                    </div>
                </div>
                <div class="form-group row">
                    <label class="font-weight-bold col-12 col-md-4 col-lg-5">Tên chủ thẻ: </label>
                    <div class="col-12 col-md-8 col-lg-7">
                        {{ bankAccount.bank_name }}
                    </div>
                </div>
                <div class="form-group row">
                    <label class="font-weight-bold col-12 col-md-4 col-lg-5">Số tài khoản: </label>
                    <div class="col-12 col-md-8 col-lg-7">
                        {{ bankAccount.bank_number }}
                    </div>
                </div>
                <div>
                    <p class="mb-2 font-weight-bold">Ảnh thẻ ngân hàng:</p>
                    <div style="width: 280px; height: 180px; object-fit: cover">
                        <imageBlock :url="$getUrlImage(bankAccount.bank_image)" :edit="false" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { detailDisbursement, updateStatus } from "@/repositories/disbursement.js";
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
            time_created: '',
            contract_signing_date: '',
            loan: '',
            money_disbursement: '',
            status: '',
            status_text: '',
            note: '',
            id: this.$route.params.id,
            loading: false,
            bankAccount: {},
            errors: {},
        };
    },
    created() {
        if (this.id) {
            this.getData();
        }
    },
    methods: {
        async getData() {
            this.loading = true;
            await detailDisbursement(this.id).then((res) => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    let data = res.data.data;
                    this.setData(data);
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }
            });  
            this.loading = false;         
        },
        setData(data) {
            this.avatar = data.user?.data.avatar;
            this.email = data.user?.data.email;
            this.phone = data.user ? data.user.data.phone : data.phone_user;
            this.name = data.user ? data.user.data.name : data.name_user;
            this.time_created = data.time_created;
            this.contract_signing_date = data.contract_signing_date;
            this.loan = data.loan ? this.$formatNumber(data.loan) : '';
            this.money_disbursement = data.disbursement?.money_disbursement ? this.$formatNumber(data.disbursement?.money_disbursement) : '';
            this.status_text = data.disbursement?.status.status_text;
            this.status = data.disbursement?.status.status_int;
            this.bankAccount = data?.bank_account;
        },
        async changeStatus(status) {
            this.errors = {};
            this.loading = true;
            await this.$confirm(
                `Bạn có chắc muốn chuyển trạng thái`,`Chuyển trạng thái`, {
                    confirmButtonText: 'Đồng ý',
                    cancelButtonText: 'Hủy',
                    type: 'warning',
            }).then(async () => {
                let query = {};
                query.status = status;
                if(status === 2) {
                    query.note = this.note;
                }
                updateStatus(this.id, query).then((res) => {
                    if(res.data.success === API_STATUS_SUCCESS) {
                        let data = res.data.data;
                        this.setData(data);
                        this.$showMessage(res.data.message, 'success');
                    } else {
                        this.$showMessage(res.data.message, 'warning');
                    }
                }).catch(err => {
                    this.errors = err.data.data.data;
                })
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
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
