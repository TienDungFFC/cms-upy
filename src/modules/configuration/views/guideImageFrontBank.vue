<template>
    <configuration>
        <editor v-model="form.guide_image_front_bank" :class="{ 'is-invalid': errors.guide_image_front_bank }" />
        <button class="btn btn-primary mt-3"  @click="save">
            Cập nhật
        </button>
    </configuration>
</template>

<script>
import { getConfiguration, updateConfiguration } from "@/repositories/configuration";
export default {
    components: {
        configuration: () => import('./configuration'),
        editor: () => import('@/components/form/editor'),
    },
    data() {
        return {
            form: {},
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
            query.guide_image_front_bank = form.guide_image_front_bank;
        
            updateConfiguration(query).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.form = res.data.data;
                    this.$showMessage(res.data.message, 'success');
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