<template>
    <div>
        <ldc-dialog v-if="$detect === 'web'"
                :title="status === 'create' ? 'Thêm Phương thức' : 'Chi tiết Phương thức thanh toán'"
                :visible.sync="dialog"
                width="800px"
            >
                <form style="overflow: hidden;">
                    <div class="form-group row">
                        <label class="col-sm-3">Trạng thái:</label>
                        <div class="col-sm-9">
                            <ldc-select
                                :disabled="!$myCanUpdate()"
                                v-model="form.active"
                                placeholder="Trạng thái"
                                style="width: 100%"
                            >
                                <ldc-option
                                    v-for="item in optionsActive"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"/>
                            </ldc-select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3">Tên phương thức:</label>
                        <div class="col-sm-9">
                            <input 
                                :disabled="!$myCanUpdate()"
                                type="text" 
                                v-model="form.name"
                                placeholder="Tên phương thức"
                                :class="{
                                    'form-control': true,
                                    'is-invalid': errors.name
                                }"
                                
                            >
                            <form-invalid :error="'Vui lòng nhập tên phương thức'"/>
                        </div>
                    </div>
                    <!-- get data other -->
                    <h2 class="title-add-infor" v-if="form.data_other!=undefined || this.data_other_add!=''">Thông tin thêm</h2>
                    <div v-if="form.data_other!=undefined">
                        <div v-for="(item, index) in form.data_other" :key="index" class="get-data-other form-group row">
                            <div class="col-3" style="padding-right:0">
                                <input :disabled="!$myCanUpdate()" v-model="item.label" type="text" class="form-control" placeholder="Tiêu đề">
                            </div>
                            <div class="col-8">
                                <input :disabled="!$myCanUpdate()" v-model="item.value" type="text" class="form-control" placeholder="Nội dung">
                            </div>
                            <div class="removeOther" @click="removeOther(index)">
                            <button v-if="$myCanUpdate()" type="button" class="btn btn-danger"><i class="icon ion-md-trash"></i></button>
                        </div>
                        </div>
                    </div>
                    <!-- add data other -->
                    <div 
                    v-for="(item, index) in data_other_add" 
                    :key="index" 
                    :class="{
                        'add-data-other form-group row':true,
                        'is-invalid': errors.data_other
                        }">
                        <div class="col-3" style="padding-right:0">
                            <input :disabled="!$myCanUpdate()" v-model="item.label" type="text" class='form-control' 
                                    placeholder="Tiêu đề">
                        </div>
                        <div class="col-8">
                            <input :disabled="!$myCanUpdate()" v-model="item.value" type="text" class="form-control" placeholder="Nội dung">
                        </div>
                        <div class="removeOther" @click="removeOtherAdd(index)">
                            <button  v-if="$myCanUpdate()" type="button" class="btn btn-danger"><i class="icon ion-md-trash"></i></button>
                        </div>
                        
                    </div>
                    <form-invalid :error="errors.data_other"/>          
                    <div class="form-group row">
                        <div class="col-12">
                                <button v-if="$myCanUpdate()" class="btn btn-success" @click.prevent="addOther()" >Thêm thông tin</button>
                                <div class="note" v-if="form.data_other!=undefined || this.data_other_add!=''">! Chú ý. Không nhập nội dung thanh toán tại đây.</div>
                        </div>
                        <div class="col-12" style="text-align: center;margin-top:20px">
                            <button 
                                class="btn btn-primary" 
                                v-if="status !== 'create' && $myCanUpdate()"
                                :disabled="loading" 
                                @click.prevent="update()" 
                                >Cập nhật thay đổi</button>
                            <button 
                                v-else-if="status == 'create' && $myCanCreate()" 
                                type="submit" 
                                class="btn btn-primary" 
                                :disabled="loading"
                                @click.prevent="add()" 
                                >Thêm mới</button>
                        </div>
                    </div>
                    
                </form>
        </ldc-dialog>
        <div v-else class="container-fluid mt-3">
            <form>
                <div class="form-group row">
                    <label class="col-sm-3">Trạng thái:</label>
                    <div class="col-sm-9">
                        <ldc-select
                            :disabled="!$myCanUpdate()"
                            v-model="form.active"
                            placeholder="Trạng thái"
                            style="width: 100%"
                        >
                            <ldc-option
                                v-for="item in optionsActive"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"/>
                        </ldc-select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-3">Tên phương thức:</label>
                    <div class="col-sm-9">
                        <input 
                            :disabled="!$myCanUpdate()"
                            type="text" 
                            v-model="form.name"
                            placeholder="Tên phương thức"
                            :class="{
                                'form-control': true,
                                'is-invalid': errors.name
                            }"
                            
                        >
                        <form-invalid :error="'Vui lòng nhập tên phương thức'"/>
                    </div>
                </div>
                <!-- get data other -->
                <h2 class="title-add-infor" v-if="form.data_other!=undefined || this.data_other_add!=''">Thông tin thêm</h2>
                <div v-if="form.data_other!=undefined">
                    <div v-for="(item, index) in form.data_other" :key="index" class="get-data-other form-group d-flex">
                        <input :disabled="!$myCanUpdate()" v-model="item.label" type="text" class='form-control mr-2' style="width: 30%" placeholder="Tiêu đề">
                        <input :disabled="!$myCanUpdate()" v-model="item.value" type="text" class='form-control' style="width: 65%" placeholder="Nội dung">
                        <div class="removeOther ml-1" @click="removeOther(index)">
                            <button v-if="$myCanUpdate()"  type="button" class="btn btn-danger"><i class="icon ion-md-trash"></i></button>
                        </div>
                    </div>
                </div>
                <!-- add data other -->
                <div v-for="(item, index) in data_other_add" :key="index" 
                    :class="{'add-data-other form-group d-flex':true,'is-invalid': errors.data_other}">
                    <input v-model="item.label" type="text" class='form-control mr-2' style="width: 30%" placeholder="Tiêu đề">
                    <input v-model="item.value" type="text" class='form-control' style="width: 65%" placeholder="Nội dung">
                    <div class="removeOther ml-1" @click="removeOtherAdd(index)">
                        <button type="button" class="btn btn-danger"><i class="icon ion-md-trash"></i></button>
                    </div>
            </div>
                <form-invalid :error="errors.data_other"/>          
                <div class="form-group row">
                    <div class="col-12">
                            <button v-if="$myCanUpdate()" class="btn btn-success" @click.prevent="addOther()" >Thêm thông tin</button>
                            <div class="note" v-if="form.data_other!=undefined || this.data_other_add!=''">! Chú ý. Không nhập nội dung thanh toán tại đây.</div>
                    </div>
                    </div>
                <buttom-fixed>
                    <div class="w-100">
                        <button 
                                class="btn btn-primary size-button w-100" 
                                v-if="statusMb !== 'create' && $myCanUpdate()"
                                :disabled="loading" 
                                @click.prevent="update()" 
                                >Cập nhật thay đổi</button>
                            <button 
                                v-else-if="statusMb == 'create' && $myCanCreate()" 
                                type="submit" 
                                class="btn btn-success size-button w-100" 
                                :disabled="loading"
                                @click.prevent="add()" 
                                >Thêm mới</button>
                    </div>
                </buttom-fixed>
            </form>
        </div>
    </div>    
</template>

<script>
import {addPaymentGuide , updatePaymentGuide, inforPaymentGuide} from '@/repositories/payment-guide';
import { optionsActive } from "@/constants/optionsActive.js";
export default {
    props:['visible','status','PaymentGuideShow'],
    data() {
        return{
            loading: false,
            dialog: false,
            optionsActive: optionsActive,
            form:{
                active: 1,
                name: '',
                data_other:[]
            },
            data_other_add:[],
            data_other_item: {
                label: '',
                value: ''
            },
            statusMb: 'create',
            PaymentGuideMb: {},
            //errors
            errors: {},
        }
    },
    watch: {
        visible(val) {
            this.dialog = val;
            if (val) {
                this.setForm();
                this.addOther();
            }else{
                this.closeDialog()
            }
        },
        dialog(val) {
            this.$emit('update:visible', val);
        },    
    },
    async created() {
        if(this.$detect === 'web'){
            this.setForm();
            this.errors = {};
        }else{
            if(this.$route.params.id){
                await inforPaymentGuide(this.$route.params.id).then(res => {
                     this.PaymentGuideMb = res.data.data
                })
                this.statusMb = 'show'
                this.setForm();
                this.errors = {};  
            }else{
                this.statusMb = 'create'
                this.setForm();
                this.errors = {}; 
            }
        }
        
    },
    methods: {
        setForm(){
            if(this.$detect === 'web'){
                this.form = {
                    active: 1,
                    ...(this.status === 'show' ? this.PaymentGuideShow : {}),
                }
            }else{
                this.form = {
                    active: 1,
                    ...(this.statusMb === 'show' ? this.PaymentGuideMb : {}),
                }
            }
            
            
        },
        closeDialog(){
            this.dialog = false;
            this.data_other_add = [];
            this.errors = {};
        },
        // Add payment guide
        async add(){
                if(!this.$myCanCreate()) return;
                this.loading = true;
                let form = {};
                this.errors = {};
                form.active =  this.form.active;
                form.name = this.form.name;
                form.data_other = this.data_other_add;
                await addPaymentGuide(this.$returnForm(form)).then(res => {
                    let data = res.data;
                    this.$showMessage(data.message);
                    if(this.$detect === 'web'){
                        this.$emit('callData', true);
                        this.dialog = false;
                    }else{
                        this.$router.push({
                            name: 'payment-guide'
                        })
                    }
                    
                }).catch(err => {
                    this.requestError(err)
                })
            this.loading = false;
        },
        // Update payment guide
        async update(){ 
            if(!this.$myCanUpdate()) return;
            this.loading = true;
            let form = {};
            this.errors = {};
            form.active =  this.form.active;
            form.name = this.form.name;
            form.data_other = [...this.form.data_other, ...this.data_other_add];
            await updatePaymentGuide(this.form.id , this.$returnForm(form)).then(res => {
            
                let data = res.data;
                this.$showMessage(data.message);
                if(this.$detect === 'web'){
                    this.$emit('callData', true);
                    this.dialog = false;
                    this.data_other_add = [];
                }
                
            }).catch(err => {
                this.requestError(err)
            })
            this.loading = false;
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
        // Update payment guide
        addOther() {
            if(!this.$myCanUpdate()) return;
            // let dataPush = {...this.data_other_item};
            // this.data_other_add.push(dataPush);

            let checkTitle = this.data_other_add.some(x => {
                   return x.label == ''
            })
            let checkValue = this.data_other_add.some(x => {
                   return x.value == ''
            })
            if(!checkTitle && !checkValue){
                let dataPush = {...this.data_other_item}
                this.data_other_add.push(dataPush);
            }else{
                this.$showMessage('Thông tin thêm chưa được nhập đầy đủ! ', 'warning');
            }
        },
        // Remove remove Other Add
        removeOtherAdd(index) { 
            if(!this.$myCanUpdate()) return;
            const data_other = this.data_other_add;
            data_other.splice(index,1);
        },
        // Remove remove Other
        removeOther(index) { 
            const data_other = this.form.data_other;
            data_other.splice(index,1);
        }
    }
}
</script>

<style lang="scss">
    .title-dialog{
        border-bottom: 1px solid #939393;
        padding-bottom: 10px;
        margin-bottom: 20px !important;
    }
    .main-dialog {
        label{
            font-weight: 600;
            color: #5c5c5c;
        }
    }
    .add-data-other,.get-data-other{
        position: relative;
        margin-top: 15px;
        
    }
    .removeOther{
        cursor: pointer;
        text-align: right;
        .btn{
            border-radius: 50%;
            width: 33px;
            height: 33px;
            background-color: #d15a65;
            border-color: #d15a65;
            &:hover{
                background-color: #dc3545;
                border-color: #dc3545;
            }
        }
    }
    .invalid-feedback{
        margin-bottom: 10px;
    }
    .note{
        color: orange;
        margin-top: 10px;
    }
    .title-add-infor{
        font-size: 18px;
        color: #484848;
    }
</style>