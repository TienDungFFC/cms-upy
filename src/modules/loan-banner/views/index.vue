<template>
   <div class="loan-banner container-fluid">
       <div class="bg-light p-md-4">
           <p v-if="$detect === 'web'" class="font-weight-bolder h5">Banner khoản vay</p>
           <div v-for="(banner, index) in banners" :key="index" class="mt-4">
                <label class="font-weight-bolder"> {{ banner.title }} </label>
                <div class="d-md-flex">
                    <div class="overflow-hidden d-flex align-items-center rounded mr-3 img" :style="$detect === 'mobile' ? 'height: 150px; width: 100%;' : ''">
                        <imageBlock :url="banner.image.url" :edit="$myCanUpdate()" @changeFile="changeFile($event, index)"/>
                    </div>
                    <div :class="{'form-group w-50': $detect == 'web', 'form-group w-100': $detect == 'mobile'}">
                        <textarea 
                            :disabled="!$myCanUpdate()"
                            v-model="banner.text"
                            class="form-control textarea-tablet" 
                            placeholder="Nội dung" 
                            rows="3"
                            :class="{ 'is-invalid': errors.banner, 'mt-1': $detect == 'mobile'}"/>
                        <form-invalid :error="errors.banner"/>
                    </div>
                </div>
            </div>
            <buttom-fixed v-if="$myCanUpdate()">
                <div :class="{'w-100': $detect === 'mobile'}">
                    <button 
                    :class="{'btn btn-success px-5 mt-4': true, 'w-100 size-button': $detect === 'mobile'}" 
                    :disabled="loading"
                    @click="updateBanner()">Lưu
                    </button>
                </div>
                    
            </buttom-fixed>
            
       </div>
   </div>
</template>
<script>
import { getBanner, updateBanner } from '@/repositories/loan-banner.js';
export default {
    components: {
        imageBlock: () => import('@/components/imageBlock'),
    },
    data() {
        return {
            loading: false,
            errors: {},
            banners: [],
            form: [],
        };
    },
    created() {
        this.getData()
    },
    methods: {
        changeFile(file, index) {
            this.banners[index].file = file;
        },
        getData(){
            let query = {}
            getBanner(query).then(res => {
                let data = res.data;
                this.banners = [];
                this.handlerData(data.data.data);
            })
        },
        handlerData(banners) {
            this.banners = [];
            let push;
            banners.map(item => {
                push = {...item}
                push.file = '';
                this.banners.push(push);
            });
        },
        makeUrlFile(file, index) {
            if (file) {
                this.banners[index].image.url = URL.createObjectURL(file);
            }
        },
        async updateBanner(){
            if(this.$myCanUpdate()){}
            else return;
            this.loading = true;
            this.errors = {};
            let form = [];
            let push = {};
            for await (const item of this.banners) {
                push = {
                    id: item.id,
                    text: item.text
                };
                if(item.file) {
                    push.image = await this.$uploadFile(item.file);
                }else {
                    push.image = item.image.name;
                }
                form.push(push);
            }
            await updateBanner({
                data: form
            }).then(res => {
                let data = res.data;
                if(data.success === API_STATUS_SUCCESS) {
                    this.$showMessage(data.message, 'success');
                    this.handlerData(data.data.data);
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }
            }).catch(err => {
                this.requestError(err)
            })
            this.loading = false;
        },
        requestError(err) {
            if (err.status === HTTP_CODE_GONE) {
                this.$showMessage({
                message: err.data.message,
                type: "warning",
                });
            } else if (err.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
                this.errors = err.data.data.data;
            }
            },
    }
}
</script>
<style lang="scss">
.loan-banner{
    .upload_image{
        .iconEdit{
            display:none !important;
            cursor: pointer;
            top:0; 
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(160, 157, 157, 0.472);
            i{
                background: rgba(149, 143, 143, 0) !important;
            }
        }
        .iconEdit:hover{
            i{
                color:rgb(255, 255, 255)
            }
        }
    }
    .upload_image:hover .iconEdit{
        display:block !important; 
        display:flex !important;
    }
    @media only screen and (min-width: 768px){
        .img{
            height: 140px !important; 
            min-width: 280px !important;
            width: 280px !important;
        }
        .textarea-tablet{
            margin-top: 0 !important;
        }
    }
}
</style>