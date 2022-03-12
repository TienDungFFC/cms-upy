<template>
    <div class="find-user">
        <div class="position-relative text-white px-2 py-3 bg-header-mb">
            <i @click="$router.go(-1)" class="icon ion-md-arrow-back position-absolute h4"></i>
            <h5 class="font-weight-bold text-center mb-0">Tìm kiếm người dùng</h5>
        </div>
        <div class="px-2 mt-3">
            <div class="position-relative">
                <input
                v-model="keyword"
                ref="input"
                class="form-control size-input"
                placeholder="Tìm kiếm theo tên hoặc số điện thoại"
                @input="search($event, 'auto')"
                @Keyup.enter="search($event, 'active')"
                />
                <span
                    v-if="keyword !== ''"
                    class="position-absolute"
                    style="top: 50%; right: 6px; transform: translateY(-50%);"
                    @click="clearKeyword()">
                    <i class="icon ion-md-close-circle-outline" style="color: #d5d5d5; font-size: 18px;"></i>
                </span>
            </div>
            <div>
                <ul>
                    <li v-for="(user, i) in users" :key="i" @click="selected(user)"
                        :class="{'p-3 mt-1 bg-light': true, 'text-primary font-weight-bold' : id_user === user.id}"
                        >{{ `${user.name}-(${user.phone})` }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { getUsers } from "@/repositories/user.js";
export default({
    data() {
        return{
            users: [],
            user: '',
            id_user: this.$route.query?.id ? this.$route.query.id : "",
            keyword: this.$route.query?.keyword ? this.$route.query.keyword : "",

        }
    },
    created() {
        this.getData();
    },
    mounted() {
        this.focusInput();
    },
    methods: {
        focusInput() {
            let input = this.$refs.input
            if(input){
                input.focus()
            }
        },
        getData(){
            let query = {
                keyword: this.keyword,
            }
            getUsers(query).then((res) => {
                this.users = res.data.data;
                });
        },
        search(e, key) {
            if(e){
                this.keyword = e.target.value;
            }
            if(key === 'auto'){
                if (this.timeOut) clearTimeout(this.timeOut);
                this.timeOut = setTimeout(() => {
                    this.getData();
                }, 500);
            }else{
                this.getData();
            }
        },
        selected(user){
            this.$router.push({
                name: 'loan-amount',
                query: {
                    id_user: user.id,
                    keywordMb: this.keyword
                }
            })
        },
        clearKeyword(){
            this.keyword = '';
            this.getData();
        }
    }
})
</script>
<style lang="scss">
</style>
