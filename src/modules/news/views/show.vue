<template>
    <div v-loading="loading" class="news-show container-fluid">
        <span v-if="$detect === 'web'" class="h5 font-weight-bold">{{ id ? `Chi tiết ${title}` : `Thêm mới ${title}` }}</span>
        <div :hidden="title == 'chương trình ưu đãi' ? false : true" class="mt-md-4 mt-2">
            <p class="font-weight-bold mb-2">{{ id ? 'Ảnh' : 'Thêm mới ảnh' }} {{title}}</p>
            <div>
                <div v-if="id" 
                class="overflow-hidden d-flex align-items-center rounded img" 
                :style="$detect === 'mobile' ? 'max-height: 160px;width: 100%;' :'max-height: 150px;max-width: 380px;'">
                    <imageBlock :url="$getUrlImage(form.url)" :edit="$myCanUpdate()" :preview="$detect === 'mobile' ? false : true" @changeFile="changeFile"/>
                </div>
                
                <div v-else class="overflow-hidden d-flex align-items-center rounded img" 
                    :style="$detect === 'mobile'?'max-height: 160px;width: 100%;' :'max-height: 150px;max-width: 380px;'">
                    <ldc-upload v-model="file" @input="makeUrlFile(file)">
                        <div class="upload_image-add position-relative" :upload="$myCanCreate()">
                            <img
                            alt=""
                            :src="$getUrlImage(form.url)"
                            class="w-100 rounded" 
                            :style="form.url? '' : 'border-style: dashed'"
                            />
                            <div v-if="$myCanCreate()" class="iconEdit-add position-absolute d-flex align-items-center justify-content-center">
                                <i class="icon icon-add ion-md-cloud-upload h3" />
                            </div>
                        </div>
                    </ldc-upload>
                    
                    <!-- <imageBlock :url="$getUrlImage(form.url)" @changeFile="changeFile"/> -->
                </div>
            </div>
        </div>
        <div class="mt-3 font-weight-bold">
            <label for="title">Tên {{title}}</label>
            <div class="input-group mb-3">
                <input
                :disabled="!$myCanUpdate()"
                v-if="$detect === 'web'"
                v-model="form.title"
                :placeholder="`Tên ${title}`"
                type="text"
                class="form-control"
                id="title"
                :class="{ 'is-invalid': errors.title }"
                />
                <textarea 
                    v-else
                    :disabled="!$myCanUpdate()"
                    v-model="form.title"
                    :placeholder="`Tên ${title}`"
                    type="text"
                    class="form-control"
                    id="title"
                    :class="{ 'is-invalid': errors.title }"/>
                <form-invalid class="font-weight-bold" :error="form.title.length === 0 ? `Vui lòng nhập tên ${title}` : form.title.length > 100 ? 'Vui lòng nhập tên dưới 100 kí tự' : ''"/>
            </div>
        </div>
        <div class="form-group">
            <label class="font-weight-bold">Nội dung</label>
            <editor v-model="form.content" :class="{ 'is-invalid': errors.content }" :disabled="!$myCanUpdate()" />
            <form-invalid class="font-weight-bold" :error="errors.content"/>
        </div>
        <div>
            <p class="font-weight-bold mb-md-2 mb-1">Trạng thái</p>
            <div class="form-check-inline">
                <label class="form-check-label mr-5 d-flex align-items-center">
                <input
                    :disabled="!$myCanUpdate()"
                    type="radio"
                    class="form-check-input"
                    name="optradio"
                    v-model="form.active"
                    value="1"
                />Kích hoạt
                </label>
                <label class="form-check-label d-flex align-items-center">
                <input
                    :disabled="!$myCanUpdate()"
                    type="radio"
                    class="form-check-input"
                    name="optradio"
                    v-model="form.active"
                    value="0"
                />Tạm khóa
                </label>
            </div>
        </div>
        <buttom-fixed v-if="$myCanUpdate() || $myCanCreate() || $myCanDelete()">
            <div :class="{'w-100 d-flex justify-content-between form-btn': $detect === 'mobile'}">
                <template>      
                        <button v-if="id && $myCanUpdate()"
                            class="btn btn-responsive btn-primary px-5 mt-3 mr-2 size-button"
                            :style="$detect === 'mobile' && $myCanDelete() ? 'width:49%;' : 'width:100%'"
                            @click="updateNew()"
                            :disabled="loading">
                            Sửa
                        </button>
                        <button v-else-if="!id && $myCanCreate()"
                            class="btn btn-responsive btn-success px-5 mt-3 mr-2 size-button"
                            :style="$detect === 'mobile' && $myCanDelete() ? 'width:49%;' : 'width:100%'"
                            @click="addNew()"
                            :disabled="loading">
                            Lưu
                        </button>
                </template>
                <button 
                v-if="$myCanDelete()"
                class="btn btn-responsive btn-danger px-5 mt-3 size-button"
                :style="$detect === 'mobile' && ($myCanUpdate() || $myCanCreate()) ? 'width:49%;' : 'width:100%'"
                :disabled="isDelete"
                @click="deleteNew()"
                >Xóa</button>
            </div>
        </buttom-fixed>
    </div>
</template>
<script>
import { addNew, detailNew, updateNew, deleteNew } from "@/repositories/news.js";
import { NEW_TYPE_TERMS_AND_SERVICE, NEW_TYPE_USER_MANUAL, NEW_TYPE_SPECIAL_OFFER } from "@/constants/news.js"
export default {
    components: {
        editor: () => import('@/components/form/editor'),
        imageBlock: () => import('@/components/imageBlock')
    },
    data() {
        return {
            file: '',
            id: this.$route.params.id,
            title: '',
            TYPE: '',
            link: '',
            errors: {},
            isDelete: true,
            loading: false,
            form: {
                title: "",
                url: '',
                content: "",
                active: 1
            },
        };
    },
    async created() {
        this.loading = true;
        if(this.id){
            this.setContent()
            this.getNewDetail();
        }else{
            this.setContent()
        }
    },
    methods: {
        changeFile(file) {
            this.file = file
        },
        setContent(){
            if(this.$route.name.search('user-manual') == 0){
                this.TYPE = NEW_TYPE_USER_MANUAL
                this.title = 'hướng dẫn'
                this.link = 'user-manual'
            }
            if(this.$route.name.search('loan-terms') == 0){
                this.TYPE = NEW_TYPE_TERMS_AND_SERVICE
                this.title = 'điều khoản vay'
                this.link = 'loan-terms'
            }
            if(this.$route.name.search('special-offers') == 0){
                this.TYPE = NEW_TYPE_SPECIAL_OFFER
                this.title = 'chương trình ưu đãi'
                this.link = 'special-offers' 
            }
            this.loading = false;
        },
        getNewDetail() {
            if(this.$route.params.id){
                this.isDelete = false;
                this.id = this.$route.params.id
                detailNew(this.id).then(res => {
                    if(res.data.success === API_STATUS_SUCCESS) {
                        this.form.url = res.data.data.image
                        this.form.title = res.data.data.title;
                        this.form.content = res.data.data.content;
                        this.form.active = res.data.data.active;
                    } else {
                        this.$showMessage(res.data.message, 'warning');
                    }
                })
            }else{
                this.id = this.$route.params.id
                this.form.url = "";
                this.isDelete = true,
                this.form.title = "";
                this.form.content = "";
                this.form.active = 1;
            }
            this.loading = false;
        },
        async addNew() {
            if(!this.$myCanCreate()) return;
            this.loading = true;
            this.errors = {};
            let query = {};

            query.active = parseInt(this.form.active)
            query.type = this.TYPE
            if(this.TYPE == NEW_TYPE_SPECIAL_OFFER){
                if(this.file){
                    await this.$uploadFile(this.file).then(res =>{
                        query.image = res 
                    }).catch(() => {
                        this.loading = false
                    })
                }else{
                    this.loading = false
                    this.$showMessage('Vui lòng chọn file', 'warning');
                    return;
                }
            }
            if(this.form.title !== null && this.form.title !== ''){
                query.title = this.form.title
            }
            if(this.form.content !== null && this.form.content !== ''){
                query.content = this.form.content
            }
            await addNew(query).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.$route.params.id = res.data.data.id
                    this.$showMessage('Thêm mới thành công','success');
                            this.loading = true;
                            this.getNewDetail()
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }
                }).catch(err => {
                        this.requestError(err)
                }
            )
            this.loading = false;
        },
        async updateNew(){
            if(!this.$myCanUpdate()) return;
            this.loading = true;
            this.errors = {};
            let query = {};

            query.active = parseInt(this.form.active)
            query.type = this.TYPE
            
            if(this.TYPE == NEW_TYPE_SPECIAL_OFFER){
                if(this.file == null || this.file == '' || this.file == undefined){
                }else{
                    await this.$uploadFile(this.file).then(res =>{
                        query.image = res 
                        }).catch(err => {
                            this.loading = false
                            this.requestError(err)
                        })
                }
                
            }
            
            if(this.form.title !== null && this.form.title !== ''){
                query.title = this.form.title
            }
            if(this.form.content !== null && this.form.content !== ''){
                query.content = this.form.content
            }
            await updateNew(this.id, query).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.$showMessage(res.data.message,'success');
                    this.loading = true;
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }}).catch(
                    err => {
                        this.requestError(err)
                }
            )
            this.loading = false;
        },
        async deleteNew(){
            if(!this.$myCanDelete()) return;
            this.isDelete = true;
            await this.$confirm(
                `Bạn có chắc muốn xóa ${this.title} <b>${this.form.title}</b>`,`Xóa ${this.title}`,
                {
                    confirmButtonText: "Đồng ý",
                    cancelButtonText: "Hủy",
                    type: "error",
                }).then(async () => {
                    await deleteNew(this.id).then((res) => {
                        if(res.data.data.success === API_STATUS_SUCCESS) {
                            this.$showMessage('Xóa thành công.',"success");
                            this.$route.params.id = '';
                            this.file = '';
                            this.getNewDetail();
                        } else {
                            this.$showMessage(res.data.data.message, 'warning');
                        }
                        }).catch((err) => {
                            if (err.status == HTTP_CODE_GONE) {
                                this.$showMessage( err.data.data.message,"warning");
                            }
                        });
                }).catch(() => {
                    this.isDelete = false;
                });
        },
        makeUrlFile(file) {
            if (file) {
                this.form.url = URL.createObjectURL(file);
            } else {
                this.form.url = "";
            }
        },
        requestError(err) {
        if (err.status === HTTP_CODE_GONE) {
            this.$showMessage(err.data.message,"warning");
        } else if (err.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
            this.errors = err.data.data.data;
        }
        },
    },
};
</script>
<style lang="scss">
.news-show{
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
    .upload_image-add{
        .iconEdit-add{
            cursor: pointer;
            top:0; 
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(160, 157, 157, 0.472);
            i{
                color:rgb(97, 89, 89);
                background: rgba(149, 143, 143, 0) !important;
            }
        }
        .iconEdit-add:hover{
            i{
                color:rgb(255, 255, 255)
            }
        }
    }
    .upload_image-add:hover .iconEdit-add{
        transition: ease .5s;
        background-color: rgba(49, 46, 46, 0.664);
        display:flex !important;
    }
    @media only screen and (max-width: 1024px) and (min-width: 768px){
        .img{
            width: 50% !important;
        }
    }
    @media only screen and (min-width: 768px){
        .form-btn{
            display: inline !important;       
        }
        .btn-responsive{
            width: auto !important;
        }
    }
}
</style>