<template>
    <div>
        <div class="position-relative bg-header-mb px-3" style="height: 50px; line-height: 50px">
            <i @click="$router.go(-1)" class="text-white icon ion-md-arrow-back position-absolute h4 mb-0" style="top:50%; transform: translateY(-50%)"></i>
            <p class="text-white text-center mb-0" style="font-size: 16px">Tìm kiếm người dùng</p>
        </div>
        <div class="container-fluid py-3">
            <div class="position-relative">
                <input v-model="keyword" 
                    ref="input"
                    type="text" 
                    class="form-control size-input" 
                    placeholder="Tìm kiếm theo họ tên, SĐT"
                    @input="searchUser"
                    @keyup.enter="searchUser()">
                <span
                    v-if="keyword !== ''"
                    class="position-absolute"
                    style="top: 50%; right: 6px; transform: translateY(-50%);"
                    @click="clearFilter()">
                    <i class="icon ion-md-close-circle-outline" style="color: #d5d5d5; font-size: 18px;"></i>
                </span>
            </div>
            <ul class="user-list">                                        
                <li v-for="(user, index) in users"
                    :key="index"
                    @click="selectUser(user)"
                    :class="{'user-item bg-light mt-1 p-3' : true, 'text-primary font-weight-bold' : id_user === user.id }">
                    {{ user.name }} ({{ user.phone }})
                </li>
                <li v-if="users.length === 0" class="user-item text-center text-black-50 pt-3">
                    <span v-if="loading">Đang tìm kiếm</span>
                    <span v-else>Không có dữ liệu</span>
                </li>
            </ul> 
        </div>
    </div>
</template>

<script>
import { getUsers } from '@/repositories/user';
export default {
    data() {
        return {
            keyword: this.$route.query.keywordUser ? this.$route.query.keywordUser : '',
            users: [],
            loading: false,
            id_user: this.$route.query.id_user ? this.$route.query.id_user : '',
        }
    },
    async created() {
        await this.searchUser();
    },
    mounted() {
        this.focusInput()
    },
    methods: {
        focusInput() {
            this.$refs.input.focus()
        },
        async searchUser(e) {
            if(e) {
                this.keyword = e.target.value;
            }
            this.loading = true;
            let query = {}
            query.keyword = this.keyword;
            if (this.timeOut) clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() => {
                getUsers(query).then(res => {
                    this.users = res.data.data
                    this.loading = false;     
                })
            }, 500)
        },
        selectUser(user) {
            let query = this.$route.query;
            query.id_user = user.id;
            if(this.keyword) {
                query.keywordUser = this.keyword
            } else {
                delete query.keywordUser
            }
            this.$router.push({
                name: 'disbursement',
                query: query
            })
        },
        clearFilter() {
            this.keyword = '';
            this.searchUser();
        }
    }
}
</script>

<style>

</style>