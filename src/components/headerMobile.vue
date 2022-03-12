<template>
    <div class="header-mobile">
        <div class="title-header">{{title}}</div>
        <div class="icon-menu" @click="activeMenu()">
            <img :src="$urlImage('/images/menu.svg')"
                onerror="errorImage(this)"/>
        </div>
        <div class="search" v-if="iconSearch" @click="activeSearch ? hidenSearch() : showSearch()">
            <i :class="{
                'icon': true,
                'ion-ios-search': !activeSearch,
                'ion-md-close': activeSearch
            }"></i>
        </div>
        <div class="menu-mobile-dashboard" v-show="showMenu">
            <div class="menu-mobile" ref="menu-mobile" :style="'background-image: url('+$urlImage('/images/bg_menu.svg')+')'" v-click-outside="clickOut">
                <div class="menu-header">
                    <div class="avatar-info py-3 pl-3">
                        <img :src="user.avatar ? user.avatar : $urlImage('/images/example_avatar.svg')"
                            onerror="errorImage(this)"  @click="goProfile()"/>
                        <div class="avatar-info-content"  @click="goProfile()">
                            <p class="mb-0 user fs-14px text-white fw-600">{{user.name ? user.name : user.email}}</p>
                            <p class="mb-0 fs-12px status text-white"><span class="icon-online"></span> Online</p>
                        </div>
                        <div class="log-out" @click="$logout()">
                            <i class="icon ion-ios-log-out"></i>
                        </div>
                    </div>
                </div>
                <menuVatgia :showMenu="showMenu"
                    @dataShow="showMenu = $event"/>
            </div>
        </div>
    </div>
</template>
<script>
import { showMenu } from '@/config/functions';
export default {
    components: {
        menuVatgia: () => import('@/components/menu.jsx'),
    },
    data(){
        return {
            showMenu: false,
            activeSearch: false,
        }
    },
    computed: {
        user(){
            return this.$store.state.profile.user;
        },
        title(){
            return this.$store.state.general.title;
        },
        iconSearch(){
            return this.$store.state.general.showIconSearch;
        },
    },
    watch: {
        showMenu(val){
            if(val){
                this.$overflowHidenBody();
            }else{
                this.$removeOverflowHidenBody();
            }
        }
    },
    created() {

    },
    mounted(){
    },
    methods: {
        goProfile(){
            this.$router.push({
                name: 'profile'
            })
            this.showMenu = false;
        },
        goLink(link){
            location.href = link;
        },
        activeMenu(){
            this.showMenu = true;
            let menu = this.$refs['menu-mobile'];
            showMenu(menu)
        },
        showSearch(){
            this.activeSearch = true;
            let input = document.querySelector('[input-search]');
            if(input){
                let content = input.querySelector('[content-input-search]');
                if(content){
                    input.style.height = content.offsetHeight + 'px';
                    input.style.marginBottom = '1rem'
                }
            }
        },
        hidenSearch(){
            this.activeSearch = false;
            let input = document.querySelector('[input-search]');
            if(input){
                let content = input.querySelector('[content-input-search]');
                if(content){
                    input.style.height = '0px';
                    input.style.marginBottom = '0'
                }
            }
        },
        clickOut(e){
            if(e.target.classList[0] === 'menu-mobile-dashboard'){
                this.showMenu = false;
            }
        },
    }
}
</script>
<style lang="scss">
    .header-mobile{
        position: relative;
        height: 50px;
        background: #1e90ff;
        .title-header{
            font-size: 16px;
            text-align: center;
            line-height: 50px;
            color: #fff;
        }
        .icon-menu{
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            img{
                width: 20px;
                height: 20px;
            }
        }
        .search{
            position: absolute;
            right: 10px;
            top: calc(50% - 17px);
            i{
                font-size: 25px;
                color: #fff;
            }
        }
        .menu-mobile-dashboard {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1031;
            background-color: rgba(0,0, 0, 0.5);
            background-position: bottom right;
            background-repeat: no-repeat;
            background-size: cover;
            width: 100vw;
            height: 100vh;
        }
        .menu-mobile{
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1001;
            background-color: #fff;
            background-position: bottom right;
            background-repeat: no-repeat;
            background-size: cover;
            width: 80%;
            height: 100vh;
            .menu-vatgia {
                .title {
                    color: #303133 !important;
                }
            }
            .menu-header {
                background: #0c81f6;
                .out-menu {
                    height: 40px;
                    width: 40px;
                    z-index: 1;
                    position: absolute;
                    top: 0;
                    right: 0;
                    padding: 3px 10px;
                    i {
                        font-size: 25px;
                        color: #fff;
                    }
                }
                .avatar-info {
                    display: flex;
                    align-items: center;
                    img {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        margin-right: 16px;
                        object-fit: cover;
                        filter: none;
                        flex-shrink: 0;
                    }
                    .icon-online {
                        background: #4cd137;
                        height: 10px;
                        width: 10px;
                        border-radius: 50%;
                        display: inline-block;
                        margin-right: 5px;
                    }
                    .status {
                        margin-top: 2px;
                    }
                    .log-out {
                        font-size: 25px;
                        color: #fff;
                        width: 40px;
                        height: 40px;
                        padding: 0 5px;
                    }
                    .avatar-info-content {
                        width: calc(100% - 46px - 40px);
                    }
                }
            }
            .dashboard-vatgia {
                .menu-vatgia {
                    box-shadow: none;
                }
                .title-submenu {
                    background: transparent !important;
                }
            }
            .href-link-page {
                height: 50px;
                line-height: 50px;
                padding: 0 20px;
                cursor: pointer;
                font-size: 14px;
                color: #303133;
                white-space: nowrap;
                i {
                    margin-right: 10px;
                    font-size: 22px;
                }
            }
        }
    }
</style>
