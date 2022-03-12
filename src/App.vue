<template>
    <div id="app">
        <component :is="layout">
            <router-view :key="$route.name"/>
        </component>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    computed: {
        layout() {
            return this.$store.state.general.layout_main
        }
    },
}
</script>

<style lang="scss">
    *,body {
        font-size: 14px;
        padding: 0;
        margin: 0;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    }
    .bg-header-mb{
        background-color:rgb(30,144,255);
    }
    .bg-mb{
        background-color: rgba(224, 240, 240, 0.85);
    }
    #nprogress{
        z-index: 10000000;
        position: relative;
        .spinner{
            display: none!important;
        }
        .bar {
            background: #FF4800 !important;
            height: 3px !important;
        }
    }
    table {
        margin-bottom: 0 !important;
    }
    .size-input, .ldc-input, .ldc-input-multiple {
        height: 32px !important;
        line-height: 32px !important;
    }
    .ldc-input-multiple > div{
        height: 30px;
    }
    .size-button {
        height: 32px !important;
    }
    .ldc-select .ldc-input-select .ldc-input-multiple {
        padding: 0px 25px 0px 15px !important;
    }
    .form-control:focus {
        border-color: #409eff;
        outline: 0;
        box-shadow: unset;
    }
    .form-control.is-invalid {
        background-image: unset !important;        
    }
    .form-control:disabled, .form-control[readonly] {
        background-color: #fff;
    }
    .ldc-select {
        &.is-invalid {
            .ldc-input-select {
                input, .ldc-input-multiple {
                    border-color: #dc3545;
                    padding-right: calc(1.5em + 0.75rem);
                }
            }
        }
    }
    td{
        vertical-align: middle !important;
    }
    .close-dialog:hover{
        span,i{
            color: #ac313e !important;
        }
    }
    input::placeholder {
        color: #c0c4cc !important;
    }
    i.icon-loading {
        display: inline-block;
        font-size: 32px;
        margin-bottom: 15px;
        color: #606266;
        transition: color .15s linear;
        animation: rotating 2s linear infinite;
        &::before {
            content: "";
            width: 100px;
            height: 100px;
            border-radius: 50%;
            box-shadow: 0 4px 0 0 #138adf;
            transform-origin: 80px 82px;
        }
    }
    @keyframes rotating {
        0% { transform: rotate(0deg) }
        // 50% { transform: rotate(180deg) }
        100% { transform: rotate(360deg) }
    }
    div[input-search]{
        height: 0;
        animation-fill-mode: both;
        animation-timing-function: ease-out;
        transition: height 0.2s ease-in-out 0s;
        overflow: hidden;
    }
    .btn-confirm-ios {
        button {
            width: calc(50% - 2px);
            line-height: 50px;
            border-radius: 10px;
            padding: 0 !important;
            font-weight: 600;
            height: 50px;
        }
        .btn-cancel {
            margin: 10px 0 0 !important;
        }
        .btn-apply {
            margin: 0 !important;
            background: #fff !important;
            color: #0c81f6 !important;
            border: none !important;
        }
    }
    .btn-confirm-android {
        padding: 16px;
        background: #fff;
        button {
            width: calc(50% - 10px);
            line-height: 45px;
            padding: 0 !important;
            border-radius: 4px !important;
        }
        .btn-cancel {
            background: #dfe6e9;
        }
    }
    .btn-custom-ios {
        display: flex;
        justify-content: space-between;
        border-radius: 10px;
        overflow: hidden;
        .btn-cancel {
            margin-top: 0 !important;
        }
    }
    .ldc-model-mobile .slot-android {
        line-height: unset !important;
    }
    .slot-ios {
        line-height: 1!important;
        >div {
            padding: 5px 0;
        }
        .ldc-select-show-option {
            .title-select {
                text-align: left;
                width: 95px;
            }
        }
    }

    .mce-notification.mce-notification-warning {
        display: none !important;
    }

    .pointer {
        cursor: pointer !important;
    }
    
    .format-link {
        display: block;
        color: #212529;
        &:hover {
            text-decoration: none;
            color: #212529
        }
    }

    @media screen and (max-width: 1024px) {
        .container-fluid {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            .row {
                margin-right: -0.5rem;
                margin-left: -0.5rem;
                .col, .col-1, .col-10, .col-11, .col-12, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-auto, .col-lg, .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-auto, .col-md, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-auto, .col-sm, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-auto, .col-xl, .col-xl-1, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-auto {
                    padding-left: 0.5rem;
                    padding-right: 0.5rem;
                }
            }
        }
        .size-input {
            height: 40px !important;
            line-height: 40px !important;
            input {
                height: 40px !important;
            }
        }
        .size-button {
            height: 40px !important;
        }
        select {
            height: 40px;
            line-height: 40px;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;            
            &:disabled {
                opacity: 0.7;
                border-color: rgba(118, 118, 118, 0.3);
                background: rgba(0,0,0, 0.03);
            }
            &.size-input {
                line-height: 2 !important;
            }
        }
        .select-ios {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;   
            background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%23BEC5CB'><polygon points='0,0 100,0 50,50'/></svg>") no-repeat;
            background-size: 12px;
            background-position: calc(100% - 5px) 65%;
            background-repeat: no-repeat;
            background-color: #fff;
            color: #212529;
            padding-right: 18px !important;
        }
        .input-date{
            border: 1px solid #ced4da;
            color: #212529;
            line-height: unset !important;
            text-align: left !important;
            display: -webkit-inline-flex;
            align-items: center;
            justify-content: flex-start;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;   
            background: url('data:image/svg+xml;utf8,<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar" class="svg-inline--fa fa-calendar fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 64h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V160h352v298c0 3.3-2.7 6-6 6z"></path></svg>') no-repeat;
            background-size: 12px;
            background-position: calc(100% - 10px) 50%;
            background-repeat: no-repeat;
            background-color: #fff;
            padding-right: 18px !important;
            &::-webkit-date-and-time-value { 
                text-align:left; 
            }
        }
    }
    // Only tablet
    @media screen and (min-width: 768px){
        .is-tablet {
            width: auto !important;
        }
        .fixed-box {
            height: auto !important;
            margin-bottom: 1.5rem !important;
            .fixed-btn {
                position: unset !important;
                box-shadow: none !important;
                height: auto !important;
                padding: 0 !important;
                background-color: transparent !important;
                button.w-100 {
                    width: auto !important;
                }
            }
        }
    }
    .background-transparent {
        background: transparent !important;
    }
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
    /* Firefox */
    input[type=number] {
    -moz-appearance: textfield;
    }
</style>