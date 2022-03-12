import '@/assets/scss/breadcrumb.scss';
export default {
    props: ['width'],
    data() {
        return {

        }
    },
    computed: {
        user(){
            return this.$store.state.profile.user;
        },
        breadcrumb(){
            return this.$store.state.general.breadcrumbs;
        },
        redirect(){
            return this.$store.state.general.redirect;
        },
    },
    methods: {
        goLink(item){
            let query = {};
            if(this.redirect) {
                query = this.redirect;
            }
            if(item.href){
                location.href = item.href;
            }else{
                this.$router.push({
                    name: item.name,
                    query: query
                });
            }
        },
        goProfile() {
            this.$router.push({
                name: 'profile',
            })
        }
    },
    render(h){
        let dom = this.breadcrumb.map((item, index) => {
            if(!item.name){
                return <li>{item.title}</li>
            }else{
                return <li class="has-path" onClick={() => this.goLink(item)}
                    >{item.title}</li>
            }
        })
        return (
            <div class="d-flex header-dashboard-pc" style={'width: calc(100% - ' + this.width + 'px)'}>
                <div class="breadcrumb-header-pc">
                    <ul class="breadcrumb-upy">
                        {dom}
                    </ul>
                </div>
                <div class="avatar-breadcrumb d-flex justify-content-end position-relative">
                    <div class="info-user">
                        <div class="avatar">
                            <img src={this.user && this.user.avatar ? this.user.avatar: this.$urlImage('/images/example_avatar.svg')}
                                onError={this.$errorAvatar}/>
                        </div>
                        <div class="user">
                            {
                                this.user.name ? this.user.name : (this.user.email)
                            }
                        </div>
                    </div>
                    <div class="dropdown-avatar">
                        <ul>
                            <li onclick={() =>this.goProfile() }>Thông tin cá nhân</li>
                            <li onclick={() => this.$logout()}>Đăng xuất</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
