<template>
    <configuration>
        <div class="row">
            <div class="col-12">
                <div class="form-group row">
                    <label class="col-2 col-form-label font-weight-bold">Từ</label>
                    <div class="col-10">
                        <input
                            v-model="loan.min"
                            placeholder="Hạn mức tối thiểu"
                            :class="{
                                'form-control size-input': true,
                                'is-invalid': errors.min,
                            }"
                        />
                        <form-invalid :error="errors.min" />
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="form-group row">
                    <label class="col-2 col-form-label font-weight-bold">Đến</label>
                    <div class="col-10">
                        <input
                            v-model="loan.max"
                            placeholder="Hạn mức tối đa"
                            :class="{
                                'form-control size-input': true,
                                'is-invalid': errors.max,
                            }"
                        />
                        <form-invalid :error="errors.max" />
                    </div>
                </div>
            </div>
            <div class="col-12">
                <button class="btn btn-primary">
                    Cập nhật
                </button>
            </div>
        </div>
    </configuration>
</template>

<script>
import { getConfiguration, updateConfiguration } from "@/repositories/configuration";
export default {
    components: {
        configuration: () => import('./configuration'),
        imageBlock: () => import('@/components/imageBlock'),
    },
    data() {
        return {
            loan: {},
            form: {
                image_sign: {}
            },
            file_sign: '',
            loading: false,
            errors: {}
        }
    },
    created() {
        this.getConfiguration();
    },
    methods: {
        getConfiguration() {
            getConfiguration().then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.form = res.data.data
                } else {
                    this.$showMessage(res.data.message, 'warning')
                }
            })
        },
        changeSignFile(file) {
            this.file_sign = file;
        },
        async save() {
            this.loading = true;
            let form = this.form;
            let query = {};
                query.title_sign = form.title_sign;
                query.text_sign = form.text_sign;
                if(this.file_sign) {
                    query.image_sign =await this.$uploadFile(this.file_sign);
                }
        
            updateConfiguration(query).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.form = res.data.data;
                    this.$showMessage(res.data.message, 'success');
                    this.file_sign = null;
                } else {
                    this.$showMessage(res.data.message, 'warning')
                }
            }).catch(err => this.requestError(err));
            this.loading = false;
        },
        requestError(err) {
            if (err.status === HTTP_CODE_GONE) {
                this.$showMessage(err.data.message, "warning");
            } else if (err.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
                this.errors = err.data.data.data;
            }
        },
    }
}
</script>

<style lang="scss">
</style>