import '@/assets/scss/menu.scss';
import { getImg } from '@/config/icon-menu.js';
export default {
    name: 'menu-profile',
    props: ['dataWidth', 'showMenu'],
    data() {
        return {
            width: 250,
            activeGroup: '',
            showTitle: true,
            zoomInDashboard: false,
            menuActive: false,
            zoomOutTemporary: false,
        }
    },
    created() {
        this.changeActive();
    },
    watch: {
        activeGroup(newVal, oldVal){
            if(newVal !== '' && (oldVal == 'undefined' || oldVal === '')){
                this.showSubMenu(newVal, 'create');
            }else if(newVal === '' && oldVal !== ''){
                this.closeSubMenu(oldVal)
            }else{
                this.showSubMenu(newVal);
                this.closeSubMenu(oldVal);
            }
        },
        zoomInDashboard(newVal, oldVal){
            if(newVal){
                this.width = 50;
                this.showTitle = false;
            }else{
                this.width = 250;
                setTimeout(() => {
                    this.showTitle = true;
                }, 100)
            }
        },
        width(val){
            this.$emit('dataWidth', val)
        },
        dataWidth(val){
            this.width = val;
        },
        showMenu(val){
            this.menuActive = val;
            setTimeout(() => {
                this.changeActive();
            }, 0)
        },
        menuActive(val){
            this.$emit('dataShow', val);
            if(val) {
                this.setheightMenu();
            }
        },
        active(val){
            this.changeActive();
        }
    },
    computed:{
        dashboard(){
            return this.$store.state.general.dashboard;
        },
        active(){
            return this.$store.state.general.activeDashboard;
        },
        routerName() {
            return this.$route.name;
        }
    },
    mounted(){
        let menu = document.querySelector('.dashboard-upy .menu-upy');
        menu.addEventListener('mouseover', () => {
            if(this.$detect == 'mobile') return;
            if(this.zoomInDashboard && !this.zoomOutTemporary){
                this.zoomInDashboard = false;
                this.zoomOutTemporary = true;
            }
        });
        menu.addEventListener('mouseleave', () => {
            if(this.$detect == 'mobile') return;
            if(!this.zoomInDashboard && this.zoomOutTemporary){
                this.zoomInDashboard = true;
                this.zoomOutTemporary = false;
            }
        })
    },
    methods: {
        setheightMenu() {
            let dashboard = document.querySelector('.dashboard-upy');
            let menu = dashboard.querySelector('.menu-upy');
            let headerMenu = document.querySelector('.menu-header');

            let height_header = headerMenu ? headerMenu.offsetHeight : 0;

            let maxHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
            maxHeight = maxHeight - height_header;
            dashboard.style.height = maxHeight + 'px';
            menu.style.height = maxHeight + 'px';
        },
        changeActive(){
            if(this.$detect == 'mobile' && !this.showMenu) return;
            if(this.dashboard.length > 0){
                this.activeGroup = this.active.toString().split('-')[0];
            }
        },
        show(index){
            index = index.toString();
            if(this.activeGroup === index){
                this.activeGroup = '';
            }else{
                this.activeGroup = index.toString();
            }
        },
        showSubMenu(index, check = null){
            if(check === 'create'){
                let dom;
                let setTimeout1 = setInterval(() => {
                    dom = this.$refs['sub-menu-' + index];
                    if(dom){
                        let conentDom = dom.querySelector('.sub-menu-conent');
                        dom.style.height = conentDom.offsetHeight + 'px';
        
                        let icon = this.$refs['title-sub-menu-' + index];
                        icon = icon.querySelector('.icon-sub-menu');
                        icon.style.transform = 'rotate(90deg)';
                        clearInterval(setTimeout1)
                    }
                }, 1);
            }else{
                let dom = this.$refs['sub-menu-' + index];
                if(dom){
                    let conentDom = dom.querySelector('.sub-menu-conent');
                    dom.style.height = conentDom.offsetHeight + 'px';
                    let icon = this.$refs['title-sub-menu-' + index];
                    icon = icon.querySelector('.icon-sub-menu');
                    icon.style.transform = 'rotate(90deg)';
                }
            }
        },
        closeSubMenu(index){
            let dom = this.$refs['sub-menu-' + index];
            if(dom){
                dom.style.height = '0px';

                let icon = this.$refs['title-sub-menu-' + index];
                icon = icon.querySelector('.icon-sub-menu');
                icon.style.transform = 'rotate(-90deg)';
            }
        },
        zoomDashboard(){
            this.zoomInDashboard = !this.zoomInDashboard;
        },        
        getImgIcon(icon) {
            return process.env.VUE_APP_BASE_ASSETS + 'images/icon-menu/' + icon;
        },
        hiddenMenu(){
            this.menuActive = false
        }
    },
    render(h){
        var dom = this.dashboard.map((item, index) => {
            if(item.sub_menu){
                return (
                    <li class="item-submenu-menu">
                        <div class="title-submenu"
                            ref={'title-sub-menu-' + index}
                            onClick={() => this.show(index)}
                            style={
                                this.zoomInDashboard ? 'padding: 0; text-align: center;' : ''
                            }>
                            <img src={this.getImgIcon(getImg(item.name))} class="icon"
                                style={
                                    this.zoomInDashboard ? 'margin: 0; background-color: "#000"' : ''
                                }
                                onError={errorImage}
                            />
                            {
                                this.showTitle ? (
                                    <span class="title">{item.title}</span>
                                ) : ('')
                            }
                            {
                                this.showTitle ? (
                                    <img src={this.$urlImage('/images/icon-menu.svg')} class="icon-sub-menu"
                                        onError={errorImage}/>
                                ) : ('')
                            }
                        </div>
                        {
                            this.zoomInDashboard ? (
                                <div class="sub-menu-conent-zomm-in">
                                    <div class="conent-zoom-in">
                                        {
                                            item.children.map((one, key) => {
                                                if(one.show){
                                                    return (
                                                        <li class={this.active == (index + '-' + key) ? 'item-submenu active' : 'item-submenu'}
                                                            onClick={() => this.hiddenMenu()}>
                                                            <router-link class="title" to={{name: one.name}}>
                                                                {one.title}
                                                            </router-link>
                                                        </li>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div class="sub-menu" ref={'sub-menu-' + index}>
                                    <div class="sub-menu-conent">
                                        {
                                            item.children.map((one, key) => {
                                                if(one.show){
                                                    return (
                                                        <li class={this.active == (index + '-' + key) ? 'item-submenu active' : 'item-submenu'}
                                                            onClick={() => this.hiddenMenu()}>
                                                            <router-link class="title" to={{name: one.name}}>
                                                                {one.title}
                                                            </router-link>
                                                        </li>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </li>
                );
            }else{
                if(item.show) {
                    return (
                        <li class={this.active == item.name ? 'item-menu active' : 'item-menu'}
                            style={
                                this.zoomInDashboard ? 'padding: 0; text-align: center;' : ''
                            } 
                            onClick={() => this.hiddenMenu()}>
                            <img src={this.getImgIcon(getImg(item.name, this.active == item.name))} class="icon"
                                style={
                                    this.zoomInDashboard ? 'margin: 0;' : ''
                                }
                                // onError={errorImage}
                                />
                            {
                                this.showTitle ? (
                                    <router-link class="title" to={{name: item.name}}>
                                        {item.title}
                                    </router-link>
                                ) : ('')
                            }
                            {
                                this.zoomInDashboard ? (
                                    <div class="hover-item-menu">
                                        <div class="conent-hover-item-menu">
                                            {item.title}
                                            <div class="conent-arrow"></div>
                                        </div>
                                    </div>
                                ) : ('')
                            }
                        </li>
                    );
                }
            }
        });
        let logo = this.$detect == 'web' ? (
            <div class={this.zoomInDashboard ? 'logo-dashboard-lite' : 'logo-dashboard-pc'} >
                    <a href="/">
                        <img src={this.$urlImage(this.zoomInDashboard ? '/images/logo_lite.png' : '/images/logo.png')}
                            onError={this.$errorAvatar}/>
                    </a>
            </div>
        ) : ('');
        return (
            <div class="dashboard-upy" style={this.$detect == 'web' ? 'width: ' + this.width + 'px' : ''}>
                {logo}
                <ul class="menu-upy mb-0">
                    {dom}
                </ul>
                {
                    this.$detect == 'web' ? (
                        <div class="button-zoom-dashboard"
                            onClick={() => this.zoomDashboard()}
                            style={
                                !this.zoomInDashboard ? 'padding-left: 20px;' : 'text-align: center;'
                            }>
                            <img src={this.$urlImage('/images/double-next.svg')}
                                style={
                                    !this.zoomInDashboard ? 'transform: rotate(180deg); margin-right: 10px;' : ''
                                }
                                onError={errorImage}
                            />
                            <span>
                                {
                                    !this.zoomInDashboard && this.showTitle ? ('Thu nhỏ') : ('')
                                }
                            </span>

                        </div>
                    ) : ('')
                }

            </div>
        )
    },
}
