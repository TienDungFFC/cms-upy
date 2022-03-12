<template>
    <div :class="{'fixed-box mt-4': $detect === 'mobile'}">
        <div :class="{'fixed-btn w-100 bg-white position-fixed d-flex align-items-center': $detect === 'mobile'}">
            <slot/>
        </div>
    </div>
</template>
<style lang="scss">
    .fixed-box{
        height: 60px;
        margin-bottom: -0.5rem;
        .fixed-btn{
            bottom: 0;
            left: 0;
            height:60px;
            box-shadow: 1px 0.5px 6px rgb(133, 115, 115);
            z-index: 1000;
            padding: 0 0.5rem 0 0.5rem;
            .btn{
                margin-top: 0 !important;
            }
        }
    }
</style>