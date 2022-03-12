<template>
    <div class="content-edit position-relative">
        <vue-mce v-if="!disabled" v-model="content" :config="config"/>
        <div v-else v-html="content" class="p-2 border isDisabled" style="min-height:40px;"></div>
        <div :class="{
                'dialog-edit': true,
                'dialog-edit-mobile': $detect == 'mobile'
            }">
            <ldc-dialog
                title="Thêm ảnh"
                :clickoutside="true"
                colorTitle="#007bff"
                width="50%"
                :fullscreen="$detect == 'mobile' ? true : false"
                :visible.sync="dialog">
                <div class="my-img vg-scrollbar" v-loading="loading">
                    <div class="d-flex flex-wrap px-2 pb-3">
                        <div class="upload-img text-center">
                            <div class="btn-upload" role="button" @click="upload()">
                                <i class="icon ion-md-cloud-upload"></i>
                                <p class="mb-0 fs-14px">
                                    Tải ảnh lên
                                </p>
                            </div>
                        </div>
                        <div class="img position-relative" role="button" v-for="(item, index) in images" :key="index"
                            @click="pushImage(item)">
                            <img class="w-100 h-100" :src="item.url_file"/>
                            <div class="delete-img position-absolute" @click="destroy(item, index)" v-if="false">
                                <i class="icon ion-ios-close"></i>
                            </div>
                            <div class="checked-img position-absolute" v-if="imageSelect.includes(item.url_file)">
                                <div class="btn-check">
                                    <i class="icon ion-ios-checkmark"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dots-loading mb-3" v-if="loadingPage">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div class="btn-loadmore-img text-center mb-3">
                        <button class="btn btn-outline-primary btn-sm" v-if="next_page && !loadingPage" @click="getData(next_page)">Tải thêm ảnh</button>
                    </div>
                </div>
                <div class="footer-dialog border-top border-primary text-center p-10px">
                    <button class="btn btn-primary btn-sm" @click="insert()"
                        :disabled="loading || loadingPage">Chọn ảnh</button>
                </div>
            </ldc-dialog>
        </div>
        <input type="file" v-show="false" multiple class="input-upload"
            @change="postImage" accept="image/*"/>
    </div>
</template>

<script>
import { list } from "@/repositories/upload";
export default {
    data() {
        return {
            content: "",
            config: {
                theme: 'modern',
                height: 400,
                plugins: "textcolor",
                toolbar: 'styleselect | fontsizeselect | forecolor | bold italic underline | alignleft aligncenter alignright alignjustify | outdent indent | mybutton',
                fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
                branding: false,
                convert_urls: false,
                setup:  (editor)=> {
                    editor.addButton('mybutton', {
                        text: false,
                        icon: 'mce-ico mce-i-image',
                        onclick:  () =>{
                            this.dialog = true;
                        }
                    });
                }
            },
            dialog: false,
            loading: false,
            loadingPage: false,
            images: [],
            next_page: 0,
            imageSelect: [],
            imageSelectDefault: [],
            files: [],
        }
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
    },
    watch: {
        defaultContent(val) {
            this.setContentEditor();
        },
        content(val) {
            this.$emit("input", val)
        },
        value(val) {
            this.content = val;
        }
    },
    created() {
        this.setContentEditor();
        this.getData();
    },
    methods: {
        setContentEditor() {
            this.content = this.value;
        },
        async postImage(e) {
            let iamges = e.target.files;
            this.loading = true;
            for await (let item of iamges){
                if(this.$fileIsImage(item.type)){
                    await this.$uploadFile(item);
                }
            }
            await this.getData(1);
            this.loading = false;
        },
        upload(){
            let input = this.$el.querySelector('.input-upload');
            input.click();
        },
        pushImage(image){
            if(!this.imageSelect.includes(image.url_file)){
                this.imageSelect.push(image.url_file);
            }else{
                this.imageSelect.map((item, index) => {
                    if(item === image.url_file){
                        this.imageSelect.splice(index, 1);
                    }
                })
            }
        },
        insert(){
            if(this.imageSelect.length == 0){
                this.$message({
                    message: 'Vui lòng chọn ít nhất 1 ảnh',
                    type: 'warning',
                    center: true,
                })
            }else{
                let dom = '';
                this.imageSelect.map(item => {
                    dom += `<img src="${item}" alt="${item}" style="max-width: 100% !important"/>`;
                });
                tinymce.activeEditor.execCommand('mceInsertContent', false, dom);
                this.imageSelect = [];
                this.dialog = false;
            }
        },
        async getData(page) {
            this.loadingPage = true;
            let params = {
                type: 'image',
                page: page ? page : 1
            }
            await list(params).then(res => {
                let data = res.data;
                let images = data.data;

                if(page == 1) this.images = [];

                images.map(item => {
                    this.images.push(item)
                })

                let pagination = data.meta.pagination;
                if(pagination.current_page == pagination.total_pages) {
                    this.next_page = null;
                }else {
                    this.next_page = pagination.current_page + 1;
                }
            }).catch(err => {})
            this.loadingPage = false;
        },
    },
    
};
</script>
<style lang="scss">
.Vue-Mce {
    height: 500px;
}

.content-edit {
    iframe{
        img{
            max-width: 100vw !important;
        }
    }
    .edit-img {
        position: absolute;
        top: 0;
        left: 445px;
        height: 33.6px;
        line-height: 33.6px;
        border-left: 1px solid #d9d9d9;
        padding: 0 10px;
    }
    .dialog-edit {
        .my-img {
            height: 400px;
            overflow: auto;
            .img {
                width: 20%;
                height: 140px;
                padding: 16px 8px 0;
                &:hover {
                    .delete-img {
                        display: block !important;
                    }
                }
                img {
                    box-shadow: 0 4px 6px rgba(50,50,93,.11),0 1px 3px rgba(0,0,0,.08);
                    object-fit: cover;
                    border-radius: 4px;
                }
                .delete-img {
                    background: rgba(189, 195, 199,0.8);
                    top: 16px;
                    right: 8px;
                    width: 25px;
                    height: 25px;
                    line-height: 25px;
                    text-align: center;
                    border-radius: 0 4px 0 0;
                    display: none;
                    i {
                        font-size: 20px;
                        color: #fff;
                    }
                }
            }
            .upload-img {
                width: 20%;
                height: 140px;
                padding: 16px 8px 0;
                .btn-upload {
                    border-radius: 4px;
                    border: 2px dashed rgba(0,0,0,0.2);
                    height: 100%;
                    padding: 20px 0px;
                    i {
                        font-size: 30px;
                        color: #666;
                    }
                    p {
                        color: #666;
                    }
                }
            }
            .checked-img {
                bottom: 0;
                right: 8px;
                color: #fff;
                border-radius: 0 0 4px 0;
                overflow: hidden;
                .btn-check {
                    width: 0;
                    height: 0;
                    border-bottom: 28px solid #28a745;
                    border-left: 28px solid transparent;
                    i {
                        margin-left: -14px;
                        font-size: 25px;
                    }
                }
            }
        }
        .ldc-dialog-content {
            padding: 0 !important;
            .title-dialog {
                font-size: 16px !important;
                padding: 10px !important;
                margin: 0 !important;
                border-bottom: 1px solid #007bff;
            }
        }
        .footer-dialog {
            z-index: 4000;
            button {
                width: 120px;
            }
            .btn-outline-primary {
                &:hover {
                    background: #fff !important;
                    color: #007bff !important;
                }
            }
        }
        .btn-loadmore-img {
            button {
                width: 200px;
                &:hover {
                    background: #fff !important;
                    color: #007bff !important;
                }
            }
        }
        .dots-loading {
            display: flex;
            justify-content: center;
        }
        .dots-loading > div {
            width: 10px;
            height: 10px;
            border-radius: 10px;
            background-color: #ccc;
            margin: 0 10px;
            animation: dotLoading 1s forwards infinite linear;
        }
        .dots-loading > div:nth-child(2) {
            animation-delay: 0.1s;
        }
        .dots-loading > div:nth-child(3) {
            animation-delay: 0.2s;
        }
        .dots-loading > div:nth-child(4) {
            animation-delay: 0.3s;
        }
        @keyframes dotLoading {
            to {
                opacity: 0;
            }
        }
    }
    .tinymce > .mce-container {
        width: unset !important;
    }
    .dialog-edit-mobile {
        .ldc-dialog-content {
            overflow: auto;
            .my-img {
                height: unset !important;
                margin-bottom: 61px;
            }
        }
        .title-dialog {
            top: 0 !important;
            z-index: 1;
            background: #007bff;
            color: #fff !important;
            text-align: center;
        }
        .close-modal-mobile {
            position: absolute;
            top: 0;
            z-index: 1;
            padding-top: 5px;
            i {
                color: #fff;
                font-size: 22px;
                padding: 15px;
            }
        }
        .footer-dialog {
            position: fixed;
            bottom: 0 !important;
            width: 100%;
            left: 0 !important;
            background: #fff;
            button {
                height: 40px;
                width: 200px !important;
            }
        }
        .upload-img {
            width: 33.33333333333333% !important;
            height: 100px !important;
            padding: 16px 8 0 !important;
            .btn-upload {
                width: 100% !important;
                height: 100% !important;
                padding: 5px 0 !important;
            }
        }
        .img {
            width: 33.33333333333333% !important;
            padding: 16px 8 0 !important;
            height: 100px !important;
            img {
                width: 100% !important;
                height: 100% !important;
            }
            .delete-img {
                display: block !important;
                top: 16px !important;
                right: 8px !important;
            }
        }
    }
    .isDisabled{
        span {
            color: #495057 !important;
        }
        
    }
}

.vg-scrollbar {
  scrollbar-color: rgba(12, 129, 246, 0.6) transparent;
  scrollbar-width: thin;
}
.vg-scrollbar::-webkit-scrollbar {
  width: 7px;
}
.vg-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(12, 129, 246, 0.6);
  border-radius: 20px;
}
.vg-scrollbar::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 20px;
}


</style>
