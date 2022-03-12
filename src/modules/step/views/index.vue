<template>
    <div class="step container-fluid">
        <p v-if="$detect === 'web'" class="h5 font-weight-bold">Quản lý các bước vay tiền</p>
        <button class="btn btn-success mt-3 mt-md-5" @click="sort()">Sắp xếp</button>
        
        <div class="row main mt-3 mt-md-4">
        <div class="col-12 border-bottom">
            <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th class="text-center">Trạng thái</th>
                        <th class="text-center" width="100px">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in steps" :key="i">
                        <td>{{ item.step_id }}</td>
                        <td>
                            <router-link 
                                :to="goDetail(item)" 
                                class="format-link" >
                                    {{ item.title }}
                            </router-link>
                        </td>
                        <td class="text-center">
                            <span class="text-success" v-if="item.default_include == 1">Mặc định</span>
                            <span class="text-danger" v-else>Không hoạt động</span>
                        </td>
                        <td class="text-center">
                            <router-link :to="goDetail(item)">
                                <button class="btn btn-primary">
                                    Chi tiết
                                </button>
                            </router-link>
                        </td>
                    </tr>
                    <no-data :data="steps" :colspan="4" />
                </tbody>
            </table>
            </div>
        </div>
        </div>
        <detailStep
        :visible.sync="dialog"
        @callData="callData"
        />
    </div>
</template>
<script>
import { getSteps } from "@/repositories/step.js";
export default {
    components: {
        detailStep: () => import('./sort')
    },
    data() {
        return {
            steps: [],
            dialog: false
        };
    },
    computed: {
        query() {
            return this.$route.query;
        },
    },
    watch: {
        query(val) {
            this.getData();
        },
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            getSteps().then((res) => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.steps = res.data.data.data;
                }
            });
        },
        goDetail(item){
            return {
                name: 'step-show',
                params: {
                    id: item.id,
                },
            }
        },
        sort(){
            this.dialog = true;
        },
        callData(e) {
            if (e) {
                this.changeUrl();
                this.getData();
            }
        },
        changeUrl() {
            this.$router.push({
                name: 'step',
            })
        },
        changePage(page) {
            this.page = page;
            this.changeUrl();
        },
    },
};
</script>
<style lang="scss">
</style>