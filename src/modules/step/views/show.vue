<template>
    <div class="step-show container-fluid">
        <div class="mt-3 font-weight-bold">
            <label for="title">Tên</label>
            <div class="input-group mb-3">
                <input
                :disabled="!$myCanUpdate()"
                v-model="form.title"
                placeholder="Tên"
                type="text"
                class="form-control"
                id="title"
                :class="{ 'is-invalid': errors.title }"
                />
                <div class="invalid-feedback">{{ errors.title }}</div>
            </div>
        </div>
        <div class="form-group">
            <label class="font-weight-bold">Hướng dẫn chụp hình</label>
            <editor v-model="form.instruct" :class="{ 'is-invalid': errors.instruct }" :disabled="!$myCanUpdate()"/>
            <div class="invalid-feedback">{{ errors.instruct }}</div>
        </div>
        <div>
            <p class="font-weight-bold mb-1">Trạng thái</p>
            <div class="form-check-inline">
                <label class="form-check-label mr-5 d-flex align-items-center">
                    <input
                        :disabled="!$myCanUpdate()"
                        type="radio"
                        class="form-check-input"
                        name="optradio"
                        v-model="form.default_include"
                        :value="1"
                    />Mặc định
                </label>
                <label class="form-check-label d-flex align-items-center">
                    <input
                        :disabled="!$myCanUpdate()"
                        type="radio"
                        class="form-check-input"
                        name="optradio"
                        v-model="form.default_include"
                        :value="0"
                    />Không hoạt động
                </label>
            </div>
        </div>
        <buttom-fixed v-if="$myCanUpdate()">
            <div :class="{'w-100': $detect === 'mobile'}">    
                <button
                    :class="{'btn btn-success px-5 mr-md-3 mt-3': true, 'w-100 size-button': $detect === 'mobile'}"
                    @click="updateStep()"
                    :disabled="loading">
                    Lưu
                </button>
            </div>
        </buttom-fixed>
        
    </div>
</template>
<script>
import { detailStep, updateStep } from "@/repositories/step.js";
export default {
    components: {
        editor: () => import('@/components/form/editor'),
    },
    data() {
        return {
        id: this.$route.params.id,
        title: '',
        errors: {},
        loading: false,
        form: {
            title: "",
            instruct: "",
            default_include: 1
        },
        };
    },
    created() {
        if(this.id){
            this.getStepDetail();
        }
    },
    methods: {
        getStepDetail() {
            detailStep(this.id).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.form.title = res.data.data.title;
                    this.form.instruct = res.data.data.instruct;
                    this.form.default_include = res.data.data.default_include;
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }
            })
        },
        async updateStep(){
            if(!this.$myCanUpdate()) return;
            this.loading = true;
            this.errors = {};
            let query = {};
            query.default_include = parseInt(this.form.default_include)
            if(this.form.title !== null && this.form.title !== ''){
                query.title = this.form.title
            }
            if(this.form.instruct !== null && this.form.instruct !== ''){
                query.instruct = this.form.instruct
            }
            await updateStep(this.id, query).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.$showMessage( res.data.message, 'success');
                    this.loading = true;
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
    },
};
</script>
<style lang="scss">
</style>