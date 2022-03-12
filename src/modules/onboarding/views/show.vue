<template>
    <div class="show-onboarding">
        <ldc-dialog
            :title="status === 'create' ? 'Tạo mới Onboarding' : 'Chi tiết Onboarding'"
            :visible.sync="dialog"
            width="600px"
        >
            <form>
                <div class="form-group">
                    <label>Hình ảnh</label>
                    <div class="image_onboarding">
                        <imageBlock :url="urlImage()" :preview="false" :edit="$myCanUpdate()" @changeFile="changeFile"/>
                    </div>
                </div>
                <div class="form-group">
                    <label>Trạng thái</label>
                    <ldc-select
                            v-model="form.active"
                            placeholder="Trạng thái"
                            style="width: 100%"
                            :class="{
                            'size-input': true,
                            'is-invalid': errors.active
                            }"
                            :disabled="!$myCanUpdate()">
                            <ldc-option
                                v-for="item in optionsActive"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"/>
                    </ldc-select>
                    <form-invalid :error="errors.active"/>
                </div>
                <div class="form-group">
                    <label>Tiêu đề <span>(giới hạn 100 kí tự)</span></label>
                    <input 
                        type="text" 
                        maxlength="100"
                        :class="{
                            'form-control': true,
                            'is-invalid': errors.title
                        }"
                        placeholder="Tiêu đề"
                        v-model="form.title"
                        :disabled="!$myCanUpdate()">
                    <form-invalid :error="errors.title"/>
                </div>
                <div class="form-group">
                    <label>Mô tả <span>(giới hạn 100 kí tự)</span></label>
                    <textarea  
                        type="text" 
                        maxlength="100"
                        :class="{
                            'form-control': true,
                            'is-invalid': errors.content
                        }"
                        id="description" 
                        placeholder="Mô tả"
                        v-model="form.content"
                        :disabled="!$myCanUpdate()"> </textarea >
                    <form-invalid :error="errors.content"/>
                </div>
                <div class="form-group mb-0" v-if="status !== 'create' && $myCanUpdate()">
                    <button class="btn btn-primary" @click.prevent="updateOnboarding()" >Cập nhật</button>
                </div>
                 <div class="form-group mb-0" v-if="status === 'create' && $myCanCreate()">
                    <button type="submit" class="btn btn-success" @click.prevent="addOnboarding()">Thêm mới</button>
                </div>
            </form>
        </ldc-dialog>
    </div>
</template>

<script>
import { optionsActive } from "@/constants/optionsActive";
import { updateOnboarding, addOnboarding } from '@/repositories/onboarding';
export default {
    props: ['visible', 'status', 'onboarding'],
    components: {
        imageBlock: () => import('@/components/imageBlock'),
    },
    data() {
        return{
            dialog:false,
            errors: {},
            optionsActive: optionsActive,
            form: {
                active: 1,
                content: '',
                id: '',
                image: '',
                title: '',
            },
        }
    },
    watch: {
        visible(val) {
            this.dialog = val;
            if (val) {
                this.setForm();
            }else{
                this.closeDialog()
            }
        },
        dialog(val) {
            this.$emit('update:visible', val);
        },    
    },
    created() {
        this.setForm();
        this.errors = {};
    },
    methods: {
       
        setForm(){
            this.form = {
                ...{
                    active: 1
                },
                ...(this.status == 'show' ? this.onboarding : {}),
            }
        },
        closeDialog() {
            this.errors = {};
        },
        // Update Onboarding
        async updateOnboarding(){
            if(!this.$myCanUpdate()) return;
            let form = {};
            this.errors = {};
            form.active = this.form.active
            form.title = this.form.title
            form.content = this.form.content
            if(typeof this.form.image === 'object'){
                let image = await this.$uploadFile(this.form.image);
                form.image = image;
            }
            await updateOnboarding(this.form.id, this.$returnForm(form)).then(res => { 
                let data = res.data;
                this.form = {
                    ...data.data
                }
                this.$showMessage(data.message);
                this.$emit('callData', true);
                this.dialog = false;
            }).catch(err => {
                this.requestError(err)
            })
        },
        // Add Onboarding
        async addOnboarding(){
            if(!this.$myCanCreate()) return;
            let form = {};
            this.errors = {};
            form.active = this.form.active
            form.title = this.form.title
            form.content = this.form.content
            let image = await this.$uploadFile(this.form.image);
            form.image = image;
            await addOnboarding(this.$returnForm(form)).then(res => {
                let data = res.data;
                this.$showMessage(data.message);
                this.$emit('callData', true);
                this.dialog = false;
            }).catch(err => {
                this.requestError(err)
            });
        },
        // Error Onboarding
        requestError(err) {
            if (err.status === HTTP_CODE_GONE) {
                this.$showMessage(err.data.message, 'warning')
                this.dialog = false;
            } else if (err.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
                this.errors = err.data.data.data;
            }
        },
        // Upload image
        makeUrlFile(file){
            return URL.createObjectURL(file);
        },
        urlImage() {
            if(this.status == 'create') {
                if(this.form.image) {
                    return this.makeUrlFile(this.form.image)
                }
            }else {
                if(typeof this.form.image == 'string'){
                    return this.form.image;
                }else if(this.form.image){
                    return this.makeUrlFile(this.form.image);
                }
            }
            return '';
        },
        changeFile(file) {
            this.form.image = file;
        },
    }
}
</script>

<style lang="scss">
.show-onboarding {
    .title-dialog{
        font-size: 24px !important;
        font-weight: 500;
        border-bottom: 1px solid #c1c1c1;
        padding-bottom: 10px;
    }
    .image_onboarding{
        width: 140px;
        height: 140px;
    }
    .warning{
        color: red;
        margin-top: 10px;
        display: flex;
        font-size: 16px;
    }
}    
</style>