<template>
    <div class="loan-detail">
        <div v-if="$detect === 'web'">
            <p class="font-weight-bolder">Chi tiết thanh toán kỳ 5 ( - 01/11/2021)</p>
            <div class="d-flex justify-content-between p-3">
                <div class="w-50">
                    <div class="d-flex">
                        <p class="font-weight-bolder w-50">Thời gian thanh toán</p>
                        <p> {{infoDetail.payment_term}} </p>
                    </div>
                        <div class="d-flex">
                            <p class="font-weight-bolder w-50">Số tiền phải trả</p>
                            <p>{{infoDetail.payment_amount}}</p>
                        </div>
                        <div class="d-flex">
                            <p class="font-weight-bolder w-50">Đã thanh toán</p>
                            <p>  </p>
                        </div>
                    <div class="d-flex">
                        <p class="font-weight-bolder w-50">Trạng thái</p>
                        <p>Hoàn tất</p>
                    </div>
                </div>
                <div class="w-50">
                    <div class="d-flex">
                        <p class="font-weight-bolder w-50">Số ngày chậm</p>
                        <p>{{infoDetail.overdue_day}}</p>
                    </div>
                    <div class="d-flex">
                        <p class="font-weight-bolder w-50">Số tiền thực tế cần trả</p>
                        <p>10.200.000</p>
                    </div>
                    <div class="d-flex">
                        <p class="font-weight-bolder w-50">Ngày phát sinh khoản vay</p>
                        <p>10:00 01/10/2021</p>
                    </div>
                </div>
            </div>
            <div class="bg-light d-flex p-3 mt-3">
                <div class="w-50">
                    <p class="font-weight-bolder">Ảnh thanh toán</p>
                    <div class="img d-flex align-items-center" style="width: 250px; height:160px; overflow: hidden" >
                        <img :src="$getUrlImage('')" style="width: 100%" alt="">
                    </div>
                </div>
                
                <div class="w-50">
                    <div class="d-flex">
                        <p class="font-weight-bolder w-50">Tên phương thức</p>
                        <p>Ví Momo</p>
                    </div>
                    <div class="d-flex mt-1">
                        <p class="font-weight-bolder w-50">Ngân hàng</p>
                        <p>VIB VIB VIB VIB VIB</p>
                    </div>
                    <div class="d-flex mt-1">
                        <p class="font-weight-bolder w-50">Số tài khoản</p>
                        <p>12345678901234567890</p>
                    </div> 
                    <div class="d-flex mt-1">
                        <p class="font-weight-bolder w-50">Chủ tài khoản</p>
                        <p>Nguyễn Văn A</p>
                    </div>
                    <div class="d-flex mt-1">
                        <p class="font-weight-bolder w-50">Nội dung chuyển khoản</p>
                        <p class="w-50">N ộ i d u n g</p>
                    </div>
                    <div class="d-flex mt-1">
                        <p class="font-weight-bolder w-50">Thời gian</p>
                        <p>10:00 10/01/2021</p>
                    </div>
                    <div class="d-flex mt-1">
                        <p class="font-weight-bolder w-50">Chi nhánh</p>
                        <p>Hà Nội</p>
                    </div>
                </div>    
            </div>
        </div>
        <div v-else class="p-md-5 p-2 transaction-details">
            <p class="font-weight-bolder">Chi tiết thanh toán kỳ 5 ( - 01/11/2021)</p>
            <div class="d-md-flex justify-content-between">
                <div class="w-50 form-box">
                    <div class="d-flex">
                        <p class="font-weight-bolder w-50">Thời gian thanh toán</p>
                        <p class="w-50">{{infoDetailMb.payment_term}} </p>
                    </div>
                    <div class="d-flex">
                        <p class="font-weight-bolder w-50">Số tiền phải trả</p>
                        <p class="w-50">{{infoDetailMb.payment_amount}}</p>
                    </div>
                    <div class="d-flex">
                        <p class="font-weight-bolder w-50">Đã thanh toán</p>
                        <p class="w-50">1.000.000</p>
                    </div>
                    <div class="d-flex">
                        <p class="font-weight-bolder w-50">Trạng thái</p>
                        <p class="w-50">Hoàn tất</p>
                    </div>
                </div>
                <div class="w-50 form-box">
                    <div class="d-flex">
                        <p class="font-weight-bolder w-50">Số ngày chậm</p>
                        <p class="w-50">{{infoDetailMb.overdue_day}}</p>
                    </div>
                    <div class="d-flex">
                        <p class="font-weight-bolder w-50">Số tiền thực tế cần trả</p>
                        <p class="w-50">10.200.000</p>
                    </div>
                    <div class="d-flex">
                        <p class="font-weight-bolder w-50">Ngày phát sinh khoản vay</p>
                        <p class="w-50">10:00 01/10/2021</p>
                    </div>
                </div>
            </div>
            <div class="bg-light d-md-flex p-md-3 py-2 mt-3">
                <div class="w-50 form-box">
                    <p class="font-weight-bolder mb-2">Ảnh thanh toán</p>
                    <div class="img d-flex align-items-center" style="width: 250px; height:160px; overflow: hidden" >
                        <img :src="$getUrlImage('')" style="width: 100%" alt="">
                    </div>
                </div>
                
                <div class="w-50 form-box mt-2">
                    <div class="d-flex">
                        <p class="font-weight-bolder w-50">Tên phương thức</p>
                        <p class="w-50">Ví Momo</p>
                    </div>
                    <div class="d-flex mt-1">
                        <p class="font-weight-bolder w-50">Ngân hàng</p>
                        <p class="w-50">VIB VIB VIB VIB VIB</p>
                    </div>
                    <div class="d-flex mt-1">
                        <p class="font-weight-bolder w-50">Số tài khoản</p>
                        <p class="w-50">12345678901234567890</p>
                    </div> 
                    <div class="d-flex mt-1">
                        <p class="font-weight-bolder w-50">Chủ tài khoản</p>
                        <p class="w-50">Nguyễn Văn A</p>
                    </div>
                    <div class="d-flex mt-1">
                        <p class="font-weight-bolder w-50">Nội dung chuyển khoản</p>
                        <p class="w-50">N ộ i d u n g</p>
                    </div>
                    <div class="d-flex mt-1">
                        <p class="font-weight-bolder w-50">Thời gian</p>
                        <p class="w-50">10:00 10/01/2021</p>
                    </div>
                    <div class="d-flex mt-1">
                        <p class="font-weight-bolder w-50">Chi nhánh</p>
                        <p class="w-50">Hà Nội</p>
                    </div>
                </div>    
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        infoDetail : {
            type: Object,
            default() {
                return {}
            }
        },
    },
    data() {
        return {
            loading: false,
            infoDetailMb: {}
        }
    },
    created() {
        if(this.$detect === 'mobile'){
            this.infoDetailMb = this.$route.query.infoDetail
        }else{

        }
    },
}
</script>

<style lang="scss">
.transaction-details{
    @media only screen and (max-width: 767px){
        .form-box{
            width: 100% !important;
        }
        .img{
            width: 100% !important;
        }
    }
}
</style>
