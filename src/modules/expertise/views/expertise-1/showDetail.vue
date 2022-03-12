<template>
    <div class="show-loan-history">
        <ldc-dialog
            title="Thông tin giao dịch"
            width="60%"
            :visible.sync="dialog">
            <div class="container">
                <div class="row main mt-5">
                    <div class="col-12 d-flex justify-content-between align-items-center">
                        <div>
                            <span class="mr-3 font-weight-bolder">
                                Đã thanh toán: 10/10 kỳ
                            </span>
                            <span class="font-weight-bolder">
                                Kỳ bị chậm: 1/10 kỳ
                            </span>
                        </div>
                        <div class="d-flex">
                            <input
                                type="date"
                                class="form-control rounded mr-2"
                                placeholder="Từ ngày"/>
                            <input
                                type="date"
                                class="form-control rounded"
                                placeholder="Đến ngày"/>
                        </div>
                    </div>
                    <div class="col-12 mt-3">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Kỳ</th>
                                        <th>Số tiền</th>
                                        <th>Phương thức</th>
                                        <th>Thời gian</th>
                                        <th>Trạng thái</th>
                                        <th>Tình trạng</th>
                                        <th class="text-center">
                                            Chậm khoản vay
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="info in LIST_INFO"
                                        :key="info.period">
                                        <td>{{ info.period }}</td>
                                        <td>{{ info.amountOfMoney }}</td>
                                        <td>{{ info.method }}</td>
                                        <td>{{ info.time }}</td>
                                        <td>
                                            <span v-if="info.status1"
                                                >Thành công</span
                                            >
                                            <span v-else>Thất bại</span>
                                        </td>
                                        <td>
                                            <span v-if="info.status2"
                                                >Đã thanh toán</span
                                            >
                                            <span v-else>Chưa thanh toán</span>
                                        </td>
                                        <td class="text-center">
                                            <span v-if="info.delay">có</span>
                                            <span v-else>Không</span>
                                        </td>
                                    </tr>
                                    <no-data :data="LIST_INFO" colspan="7"/>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- <div class="col-12">
                        <ldc-pagination
                            :current_page="page"
                            :last_page="totalPages"
                            :scroll_top="true"
                            :callData="changePage"
                            class="pt-4 border-top">
                        </ldc-pagination>
                    </div> -->
                </div>
            </div>
        </ldc-dialog>
    </div>
</template>

<script>
export default {
    props: ["visible", "loanHistory"],
    data() {
        return {
            dialog: false,
            data: {},
            LIST_INFO: [],
        };
    },
    watch: {
        visible(val) {
            this.dialog = val;
            if (val) {
                this.data = this.loanHistory;
            } else {
                this.dialog = false;
                this.data = {}
            }
        },
        dialog(val) {
            this.$emit('update:visible', val);
        },
    },
    created() {
    },
    methods: {
    },
};
</script>
<style scoped></style>
