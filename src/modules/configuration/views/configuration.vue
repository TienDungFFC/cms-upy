<template>
    <div class="configuration_area">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-lg-4">
                    <ul class="list-group">
                        <router-link :to="{name: 'configuration-limit'}" exact-active-class="active" class="text list-group-item">
                            Sét hạn mức
                        </router-link>
                        <router-link :to="{name: 'configuration-register'}" exact-active-class="active" class="text list-group-item">
                            Đăng ký
                        </router-link>
                        <router-link :to="{name: 'configuration-login'}" exact-active-class="active" class="text list-group-item">
                            Đăng nhập
                        </router-link>
                        <router-link :to="{name: 'configuration-share'}" exact-active-class="active" class="text list-group-item">
                            Chia sẻ
                        </router-link>
                        <router-link :to="{name: 'configuration-guide-image-company'}" exact-active-class="active" class="text list-group-item">
                            Hướng dẫn chụp ảnh biển công ty
                        </router-link>
                        <router-link :to="{name: 'configuration-guide-image-front-bank'}" exact-active-class="active" class="text list-group-item">
                            Hướng dẫn chụp hình ảnh mặt trước thẻ ngân hàng
                        </router-link>
                        <router-link :to="{name: 'configuration-guide-image-id-card'}" exact-active-class="active" class="text list-group-item">
                            Hướng dẫn chụp ảnh CCCD
                        </router-link>
                        <router-link :to="{name: 'configuration-guide-image-labor-contract'}" exact-active-class="active" class="text list-group-item">
                            Hướng dẫn chụp ảnh hợp đồng lao động
                        </router-link>
                        <router-link :to="{name: 'configuration-guide-image-portrait'}" exact-active-class="active" class="text list-group-item">
                            Hướng dẫn chụp ảnh chân dung
                        </router-link>
                    </ul>
                </div>
                <div class="col-12 col-lg-8">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.configuration_area {
    .image {
        width: 100%;
        height: 150px;
    }
    h2 {
        font-weight: bold;
        font-size: 1.1rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    h3 {
        font-weight: bold;
        font-size: 1rem;
        padding-top: calc(0.375rem + 1px);
        padding-bottom: calc(0.375rem + 1px);
    }
    .btn.focus, .btn:focus {
        box-shadow: unset;
    }
    a {
        color: #000;
        &:hover {
            text-decoration: none;
        }
    }
}
</style>