<template>
    <configuration>
        <div class="row">
            <div class="col-5">
                <h3>Hình ảnh</h3>
                <div :class="{'image' : true, 'is-invalid': errors.image_login}">
                    <imageBlock :url="$getUrlImage(form.image_login.url_image)" @changeFile="changeloginFile"/>
                </div>
                <form-invalid :error="errors.image_login" />
            </div>
            <div class="col-7">
                <div class="form-group">
                    <label class="col-form-label font-weight-bold">Tiêu đề</label>
                    <div>
                        <input
                            v-model="form.title_login"
                            placeholder="Tiêu đề"
                            :class="{
                                'form-control size-input': true,
                                'is-invalid': errors.title_login,
                            }"
                        />
                        <form-invalid :error="errors.title_login" />
                    </div>
                </div>
                <div class="form-group mt-3">
                    <label class="col-form-label font-weight-bold">Mô tả</label>
                    <textarea
                        v-model="form.text_login"
                        rows="3"
                        placeholder="Mô tả"
                        :class="{
                            'form-control': true,
                            'is-invalid': errors.text_login,
                        }"
                    >
                    </textarea>
                    <form-invalid :error="errors.text_login" />
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
                image_login: {}
            },
            file_login: '',
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
        changeloginFile(file) {
            this.file_login = file;
        },
        async save() {
            this.loading = true;
            let form = this.form;
            let query = {};
                query.title_login = form.title_login;
                query.text_login = form.text_login;
                if(this.file_login) {
                    query.image_login =await this.$uploadFile(this.file_login);
                }
        
            updateConfiguration(query).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.form = res.data.data;
                    this.$showMessage(res.data.message, 'success');
                    this.file_login = null;
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
.configuration_area {
    .image {
        width: 100%;
        height: 150px;
    }
    h2 {
        font-weight: bold;
        font-size: 1.1rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    h3 {
        font-weight: bold;
        font-size: 1rem;
        padding-top: calc(0.375rem + 1px);
        padding-bottom: calc(0.375rem + 1px);
    }
    .btn.focus, .btn:focus {
        box-shadow: unset;
    }
}
</style>