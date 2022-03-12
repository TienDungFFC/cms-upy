<template>
    <div class="accordion">
        <div class="card">
            <div class="card-header position-relative" @click="isShow = !isShow">
                <slot name="header"></slot>
                <div class="position-absolute arrow">
                    <i v-if="!isShow" class="icon ion-md-arrow-dropright"></i>
                    <i v-else class="icon ion-md-arrow-dropdown"></i>
                </div>
            </div>
            <div v-if="isShow" class="card-body">
                <slot name="body"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShow: false
        }
    }
}
</script>

<style lang="scss" scoped>
.accordion {
    .arrow {
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
        i {
            font-size: 25px;
            color: #c3c3c3;
        }
    }
}
</style>