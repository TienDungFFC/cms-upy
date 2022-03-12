<template>
    <div class="loan-policy container-fluid">
        <p v-if="$detect === 'web'" class="h5 font-weight-bold">Quản lý chính sách cho vay</p>
        <div class="row main mt-md-5 mt-2">
            <div class="col-12 border-bottom">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr> 
                                <th>ID</th>
                                <th>Số kỳ hạn</th>
                                <th>Lãi suất</th>
                                <th
                                    class="text-center"
                                    width="100px"
                                >
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, i) in LoanPolicies" :key="i">
                                <td>{{ item.loan_term_package_id }}</td>
                                <td>{{ item.tenor }}</td>
                                <td>{{ item.total_interest_rate }} %</td>
                                <td class="text-center">
                                    <router-link :to="goDetail(item)">
                                        <button class="btn btn-primary">
                                            Chi tiết
                                        </button>
                                    </router-link>
                                </td>
                            </tr>
                            <no-data :data="LoanPolicies" :colspan="4" />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getLoanPolicies } from "@/repositories/loan-policy.js";
export default {
    data() {
        return {
            LoanPolicies: [],
        };
    },
    computed: {

    },
    watch: {
    },
    async created() {
        this.getData()
    },
    methods: {
            getData() {
            let query = {}
            getLoanPolicies(query).then((res) => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.LoanPolicies = res.data.data.data;
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }
            });
        },
        goDetail(item) {
            return {
                name: 'loan-policy-show',
                params: {
                    id: item.id,
                },
            }
        },
    },
};
</script>
<style lang="scss">
</style>
