<template>
    <configuration>
        <div class="row">
            <div class="col-5">
                <h3>Hình ảnh</h3>
                <div :class="{'image' : true, 'is-invalid': errors.image_share}">
                    <imageBlock :url="$getUrlImage(form.image_share.url_image)" @changeFile="changeShareFile"/>
                </div>
                <form-invalid :error="errors.image_share" />
            </div>
            <div class="col-7">               
                <div class="form-group">
                    <label class="col-form-label font-weight-bold">Mô tả</label>
                    <textarea
                        v-model="form.content_share"
                        rows="3"
                        placeholder="Mô tả"
                        :class="{
                            'form-control': true,
                            'is-invalid': errors.content_share,
                        }"
                    >
                    </textarea>
                    <form-invalid :error="errors.content_share" />
                </div>
            </div>
            <div class="col-12">
                <button class="btn btn-primary mt-3" @click="save()">
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
                image_share: {}
            },
            file_share: '',
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
        changeShareFile(file) {
            this.file_share = file;
        },
        async save() {
            this.loading = true;
            let form = this.form;
            let query = {};
                query.content_share = form.content_share;
                if(this.file_share) {
                    query.image_share =await this.$uploadFile(this.file_share);
                }
        
            updateConfiguration(query).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.form = res.data.data;
                    this.$showMessage(res.data.message, 'success');
                    this.file_share = null;
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