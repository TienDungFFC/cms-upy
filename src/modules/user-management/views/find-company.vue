<template>
    <div class="find-company">
        <div class="position-relative text-white px-2 py-3 bg-header-mb">
            <i @click="$router.go(-1)" class="icon ion-md-arrow-back position-absolute h4"></i> 
            <p class="text-center h5 mb-0 font-weight-normal">Tìm kiếm công ty</p>
        </div>
        <div class="px-2 mt-3">
            <div class="position-relative">
                <input
                v-model="keyword"
                ref="input"
                class="form-control size-input"
                placeholder="Tìm kiếm công ty"
                @input="search($event, 'auto')"
                @keyup.enter="search($event, 'active')"
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
                    <li v-for="(company, i) in companies" :key="i" @click="selected(company)"
                        :class="{'p-3 mt-1 bg-light': true, 'text-primary font-weight-bold' : id_business === company.id}"
                        >{{ company.name }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { getPartner } from "@/repositories/partner.js";
export default({
    data() {
        return{
            companies: [],
            company: '',
            id_business: this.$route.query?.id ? this.$route.query.id : "",
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
            getPartner(query).then((res) => {
                this.companies = res.data.data;
                });
        },
        search(e, key) {
            if(e) {
                this.keyword = e.target.value;
            }
            if(key === 'auto'){
                if (this.timeOut) clearTimeout(this.timeOut);
                this.timeOut = setTimeout(() => {
                    this.getData();
                }, 500);
            }else{
                this.getData()
            }
            
        },
        selected(company){
            this.$router.push({
                name: 'user',
                query: {
                    id_business: company.id,
                    keywordCompanyMb: this.keyword
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
