<template>
    <div class="container-fluid py-3 onboarding-show_mobile">
        <form>
            <div class="form-group">
                <label class="font-weight-bold">Hình ảnh</label>
                <div class="image_onboarding">
                    <imageBlock :url="urlImage()" :preview="id ? true : false" :edit="$myCanUpdate()" @changeFile="changeFile"/>
                </div>
            </div>
            <div class="form-group">
                <label class="font-weight-bold">Trạng thái</label>
                <select
                    v-model="form.active"
                    style="width: 100%"
                    :class="{
                        'form-control size-input': true,
                        'is-invalid': errors.active,
                        'select-ios': !$isAndroid
                    }"
                    :disabled="!$myCanUpdate()">
                    <option value="" disabled hidden>Trạng thái</option>
                    <option
                        v-for="item in optionsActive"
                        :key="item.value"
                        :value="item.value">
                        {{ item.label }}
                    </option>
                </select>
                <form-invalid :error="errors.active"/>
            </div>
            <div class="form-group">
                <label class="font-weight-bold">Tiêu đề <span class="font-weight-normal text-black-50">(giới hạn 100 kí tự)</span></label>
                <input 
                    type="text" 
                    maxlength="100"
                    :class="{
                        'form-control size-input': true,
                        'is-invalid': errors.title
                    }"
                    placeholder="Tiêu đề"
                    v-model="form.title"
                    :disabled="!$myCanUpdate()">
                <form-invalid :error="errors.title"/>
            </div>
            <div class="form-group">
                <label class="font-weight-bold">Mô tả <span class="font-weight-normal text-black-50">(giới hạn 100 kí tự)</span></label>
                <textarea  
                    type="text" 
                    maxlength="100"
                    :class="{
                        'form-control': true,
                        'is-invalid': errors.content
                    }"
                    id="description" 
                    placeholder="Mô tả"
                    rows="4"
                    v-model="form.content"
                    :disabled="!$myCanUpdate()"> </textarea >
                <form-invalid :error="errors.content"/>
            </div>
            <buttom-fixed>
                <button v-if="id && $myCanUpdate()" 
                    :class="{'btn btn-primary size-button' : true, 'w-100' : $detect === 'mobile'}" 
                    @click.prevent="updateOnboarding()">
                    Cập nhật
                </button>
                <button v-if="!id && $myCanCreate()"
                    :class="{'btn btn-success size-button' : true, 'w-100' : $detect === 'mobile'}" 
                    @click.prevent="addOnboarding()">
                    Thêm mới
                </button>
            </buttom-fixed>
        </form>
    </div>
</template>

<script>
import { optionsActive } from '@/constants/optionsActive';
import { detailOnboarding, updateOnboarding, addOnboarding } from '@/repositories/onboarding';
export default {
    components: {
        imageBlock: () => import('@/components/imageBlock'),
    },
    data() {
        return {
            id: this.$route.params.id,
            form: {
                active: 1
            },
            errors: {},
            optionsActive: optionsActive
        }
    },
    computed: {
        redirect() {
            return this.$store.state.general.redirect;
        },
    },
    created() {
        if(this.id) {
            this.getData();
        }
    },
    methods: {
        getData() {
            detailOnboarding(this.id).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.form = res.data.data;
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }
            })
        },
        // Add Onboarding
        async addOnboarding(){
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
                this.goList();
            }).catch(err => {
                this.requestError(err)
            });
        },
        async updateOnboarding(){
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
            }).catch(err => {
                this.requestError(err)
            })
        },
        // Error Onboarding
        requestError(err) {
            if (err.status === HTTP_CODE_GONE) {
                this.$showMessage(err.data.message, 'warning')
            } else if (err.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
                this.errors = err.data.data.data;
            }
        },
        // Upload image
        makeUrlFile(file){
            return URL.createObjectURL(file);
        },
        urlImage() {
            if(!this.id) {
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
        getPathGoList() {
            let path = '/onboarding';
            return path + this.redirect;
        },
        goList() {
            this.$router.push({
                path: this.getPathGoList()
            })
        },
    }
}
</script>

<style lang="scss">
.onboarding-show_mobile {
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