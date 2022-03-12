<template>
    <div class="image-block">
        <img :src="clone_url" alt="" @error="$errorImage" @click="previewMobile()">
        <div v-if="!($detect === 'mobile' && !edit)" class="action-img">
            <div>
                <i v-if="preview" class="icon ion-md-search" @click="previewAvatar = true"></i>
                <ldc-upload v-if="edit" v-model="file" @input="makeUrlFile(file)">  
                    <i upload class="icon ion-md-create"></i>
                </ldc-upload>
            </div>
        </div>
        <previewImage
            :visible.sync="previewAvatar"
            :url="$getUrlImage(clone_url)"
        />        
    </div>
</template>

<script>
export default {
    components: {
        previewImage: () => import('@/components/previewImage'),
    },
    props: {
        url: {
            type: String,
            default: ''
        },
        preview: {
            type: Boolean,
            default: true,
        },
        edit: {
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {
            previewAvatar: false,
            clone_url: '',
            file: ''
        }
    },
    created() {
        this.clone_url = this.url;
    },
    watch: {
        url(val) {
            this.clone_url = val
        }
    },
    methods: {
        makeUrlFile(file) {
            if (file) {
                this.clone_url = URL.createObjectURL(file);
                this.$emit('changeFile', file)
            } else {
                this.clone_url = "";
            }
        },
        previewMobile() {
            if (this.$detect === 'web' || this.edit) return;
            this.previewAvatar = true
        }
    }
}
</script>

<style lang="scss" scoped>
.image-block{
    width: 100%;
    height: 100%;
    position: relative;
    &:hover{
        .action-img{
            opacity: 1;
        }
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .action-img{
        background: rgba(0,0,0,.5);
        position: absolute;
        top: 0;
        height: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity .3s;
        >div{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            i {
                margin-left: 5px;
                margin-right: 5px;
                color: #fff;
                cursor: pointer;
                font-size: 18px;
            }
        }
    }
}
</style>