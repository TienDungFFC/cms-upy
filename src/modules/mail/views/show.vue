<template>
    <div class="mail-show">
        <span class="h5 font-weight-bold">
        {{ id ? `Chi tiết ` : `Thêm mới ` }}email</span
        >
        <div class="mt-3 font-weight-bold">
            <label for="title">Loại Email</label>
            <div class="input-group mb-3">
                <input
                :disabled="!$myCanUpdate()"
                v-model="form.title"
                placeholder="Tên mail"
                type="text"
                class="form-control"
                id="title"
                :class="{ 'is-invalid': errors.title }"
                />
                <div class="invalid-feedback">{{ errors.title }}</div>
            </div>
        </div>
        <div class="form-group">
            <label class="font-weight-bold">Nội dung</label>
            <editor v-model="form.content" :class="{ 'is-invalid': errors.content }" :disabled="!$myCanUpdate()"/>
            <div class="invalid-feedback">{{ errors.content }}</div>
        </div>
        <buttom-fixed v-if="$myCanUpdate() || $myCanDelete()">
            <div :class="{'w-100 d-flex justify-content-between': $detect === 'mobile'}">
                <template>      
                    <button v-if="id && $myCanUpdate()"
                        class="btn btn-primary px-5 mr-2 mt-3 size-button"
                        :style="$detect === 'mobile' && $myCanDelete() ? 'width:49%;' : 'width:100%'"
                        @click="updateMail()"
                        :disabled="loading">
                        Sửa
                    </button>
                    <button v-else-if="!id && $myCanCreate()"
                        class="btn btn-success px-5 mr-2 mt-3 size-button"
                        :style="$detect === 'mobile' && $myCanDelete() ? 'width:49%;' : 'width:100%'"
                        @click="addMail()"
                        :disabled="loading">
                        Lưu
                    </button>
                </template>
                <button 
                v-if="$myCanDelete()"
                class="btn btn-danger px-5 mt-3 size-button"
                :style="$detect === 'mobile' && ($myCanUpdate() || $myCanCreate()) ? 'width:49%;' : 'width:100%'"
                :disabled="isDelete"
                @click="deleteMail()"
                >Xóa</button>
            </div>
        </buttom-fixed>
        
    </div>
</template>
<script>
import { addMail, detailMail, updateMail, deleteMail } from "@/repositories/mail.js";
export default {
    components: {
        editor: () => import('@/components/form/editor'),
    },
    data() {
        return {
            id: this.$route.params.id,
            title: '',
            errors: {},
            isDelete: true,
            loading: false,
            form: {
                title: "",
                content: "",
            },
        };
    },
    created() {
        if(this.id){
            this.getData();
        }
    },
    methods: { 
        getData() {
            if(this.$route.params.id){
                this.isDelete = false;
                this.id = this.$route.params.id
                detailMail(this.id).then(res => {
                    if(res.data.success === API_STATUS_SUCCESS) {
                        this.form.title = res.data.data.title;
                        this.form.content = res.data.data.content;
                    }
                })
            }else{
                this.id = this.$route.params.id
                this.isDelete = true,
                this.form.title = "";
                this.form.content = "";
            }
        },
        async addMail() {
            this.loading = true;
            this.errors = {};
            let query = {};

            if(this.form.title !== null && this.form.title !== ''){
                query.title = this.form.title
            }
            if(this.form.content !== null && this.form.content !== ''){
                query.content = this.form.content
            }
            await addMail(query).then(res => {
                    if(res.data.success === API_STATUS_SUCCESS) {
                    this.$route.params.id = res.data.data.id
                    this.$showMessage(res.data.message, 'success');
                            this.loading = true;
                            this.getData()
                    } else {
                        this.$showMessage(res.data.message, 'warning');
                    }
                }).catch(err => {
                    this.requestError(err)
                }
            )
            this.loading = false;
        },
        async updateMail(){
            this.loading = true;
            this.errors = {};
            let query = {};

            if(this.form.title !== null && this.form.title !== ''){
                query.title = this.form.title
            }
            if(this.form.content !== null && this.form.content !== ''){
                query.content = this.form.content
            }
            await updateMail(this.id, query).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.$showMessage(res.data.message,'success');
                    this.loading = true;
                }else {
                        this.$showMessage(res.data.message, 'warning');
                    }
                }).catch(
                err => {
                    this.requestError(err)
                }
            )
            this.loading = false;
        },
        async deleteMail(){

            this.isDelete = true;
            await this.$confirm(
                `Bạn có chắc muốn xóa ${this.title} <b>${this.form.title}</b>`,`Xóa ${this.title}`,
                {
                    confirmButtonText: "Đồng ý",
                    cancelButtonText: "Hủy",
                    type: "error",
                }).then(async () => {
                    await deleteMail(this.id).then((res) => {
                        if(res.data.success === API_STATUS_SUCCESS) {
                            this.$showMessage( res.data.message, "success");
                            this.$route.params.id = '';
                            this.getData();
                        }else {
                        this.$showMessage(res.data.message, 'warning');
                    }
                    }).catch((err) => {
                        if (err.status == HTTP_CODE_GONE) {
                        this.$showMessage( err.data.data.message,"warning");
                        }
                    });
                }).catch(() => {});
        },
        requestError(err) {
        if (err.status === HTTP_CODE_GONE) {
            this.$showMessage(err.data.message, "warning");
        } else if (err.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
            this.errors = err.data.data.data;
        }
        },
    },
};
</script>
<style lang="scss">
</style>