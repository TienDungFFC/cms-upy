<template>
    <configuration>
        <div class="row">
            <div class="col-5">
                <h3>Hình ảnh</h3>
                <div :class="{'image' : true, 'is-invalid': errors.image_sign}">
                    <imageBlock :url="$getUrlImage(form.image_sign.url_image)" @changeFile="changeSignFile"/>
                </div>
                <form-invalid :error="errors.image_sign" />
            </div>
            <div class="col-7">
                <div class="form-group">
                    <label class="col-form-label font-weight-bold">Tiêu đề</label>
                    <div>
                        <input
                            v-model="form.title_sign"
                            placeholder="Tiêu đề"
                            :class="{
                                'form-control size-input': true,
                                'is-invalid': errors.title_sign,
                            }"
                        />
                        <form-invalid :error="errors.title_sign" />
                    </div>
                </div>
                <div class="form-group mt-3">
                    <label class="col-form-label font-weight-bold">Mô tả</label>
                    <textarea
                        v-model="form.text_sign"
                        rows="3"
                        placeholder="Mô tả"
                        :class="{
                            'form-control': true,
                            'is-invalid': errors.text_sign,
                        }"
                    >
                    </textarea>
                    <form-invalid :error="errors.text_sign" />
                </div>
            </div>
            <div class="col-12">
                <button class="btn btn-primary" @click="save()">
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