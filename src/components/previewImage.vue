<template>
    <div class="preview-image">
        <ldc-dialog
            title=""
            :visible.sync="dialog"
            :fullscreen="$detect === 'mobile'"
            :class="{'dialog-mobile' : $detect === 'mobile'}"
        >
            <div class="preview-content">                
                <img :src="$getUrlImage(url)" @error="$errorImage">
            </div>
        </ldc-dialog>
    </div>
</template>

<script>
export default {
    props: ['visible', 'url'],
    data() {
        return {
            dialog: false,
        }
    },
    watch: {
        visible(val) {
            this.dialog = val;            
        },
        dialog(val) {
            this.$emit('update:visible', val);
        },    
    }

}
</script>

<style lang="scss">
.preview-image {
    img {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        display: block;
        margin: auto;
    }
    .preview-content {
        margin-top: 10px;
    }
    .dialog-mobile {
        z-index: 9999;
        .ldc-dialog-content {
            left: 0;
            transform: unset !important;
            background-color: #000 !important;
        }
        .main-dialog {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: unset !important;
        }
        .preview-content {
            margin-top: 0;
            img {
                width: auto;
                max-width: 100%;
                max-height: 100vh;
            }
        }
        .close-modal-mobile {
            position: absolute;
            z-index: 10;
            width: 20px;
            height: 20px;
            line-height: 20px;
            padding-left: 7px;
            background-color: #fff;
            border-radius: 50%;
            font-weight: bold;
            box-shadow: 0 0 0 1px #ccc;
            i {
                font-size: 14px;
            }
        }
    }
}
</style>