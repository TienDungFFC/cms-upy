
<template>
    <div class="loan-detail">
        <ldc-dialog 
        :visible.sync="dialogDetail" 
        title=""
        width="50%">
            <p class="font-weight-bolder h5">Chi tiết thanh toán kỳ 5 ({{info.payment_term}} - 01/11/2021)</p>
            <div class="d-flex justify-content-between p-3">
                <div class="w-50">
                    <div class="d-flex">
                        <p class="font-weight-bolder w-50">Thời gian thanh toán</p>
                        <p> {{info.payment_date}} </p>
                    </div>
                        <div class="d-flex">
                            <p class="font-weight-bolder w-50">Số tiền phải trả</p>
                            <p> {{info.payment_amount}} </p>
                        </div>
                        <div class="d-flex">
                            <p class="font-weight-bolder w-50">Đã thanh toán</p>
                            <p> {{info.amount_paid}} </p>
                        </div>
                    <div class="d-flex">
                        <p class="font-weight-bolder w-50">Trạng thái</p>
                        <p>Hoàn tất</p>
                    </div>
                </div>
                <div class="w-50">
                    <div class="d-flex">
                        <p class="font-weight-bolder w-50">Số ngày chậm</p>
                        <p> {{info.overdue_day}} </p>
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
                    <img :src="$getUrlImage('')" style="width: 250px; height:160px;" alt="">
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
        </ldc-dialog>
    </div>
</template>
<script>
export default {
    props: ['visible', 'info'],
    data() {
        return {
            dialogDetail: false,
            loading: false,
        }
    },
    watch: {
        visible(val) {
            this.dialogDetail = val;
        },
        dialogDetail(val) {
            this.$emit('update:visible', val);
            if(!val) {
                this.closeDialog();
            }
        },    
    },
    created() {
    },
    methods: {
        closeDialog() {
            this.errors = {};
        },

    }
}
</script>

<style lang="scss">

</style>

                                