<template>
    <div class="mail container-fluid">
        <p class="h5 font-weight-bold">Quản lý mail</p>
        <!-- <div class="btn btn-success mt-5" @click="goCreate()">+ Thêm mới mail</div> -->
        <div class="row main mt-4">
            <div class="col-12 border-bottom">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Loại email</th>
                                <th
                                    class="text-center"
                                    width="145px"
                                >
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, i) in mails" :key="i">
                                <td>{{ item.new_id }}</td>
                                <td class="pointer">{{ item.title }}</td>
                                <td class="text-center">
                                    <button
                                        class="btn btn-primary mr-2"
                                        @click="goDetail(item)"
                                    >
                                        Chi tiết
                                    </button>
                                    <button
                                        v-if="$myCanDelete()"
                                        @click="deleteNew(item)"
                                        class="btn btn-danger"
                                    >
                                        xóa
                                    </button>
                                </td>
                            </tr>
                            <no-data :data="mails" :colspan="3" />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getMails } from "@/repositories/mail.js";
export default {
    data() {
        return {
            mails: [],
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
            let query = {};
            getMails(query).then((res) => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.mails = res.data.data.data;
                }
            });
        },
        
        goCreate() {
            if(!this.$myCanCreate()) return; 
            this.$router.push({
                name: `mail-add`,
            });
        },
        goDetail(item) {
            this.$router.push({
                name: `mail-show`,
                params: {
                    id: item.id,
                },
            });
        },
    },
};
</script>
<style lang="scss"></style>
