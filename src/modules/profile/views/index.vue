<template>
    <div class="profile p-lg-5 container-fluid">
        <div :class="{'pt-3 px-1 p-lg-5': true,'bg-light': $detect === 'web', 'bg-mb': $detect === 'mobile'}">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center rounded h-100">
                        <div :class="{'mr-4 avatar rounded-circle overflow-hidden' : true, 'flex-grow-0 flex-shrink-0' : $detect === 'mobile'}"
                            :style="$detect === 'web' ? 'min-width:132px;width: 132px; height: 132px;' : 'min-width:100px;width: 100px; height: 100px;'">
                            <imageBlock :url="$getUrlImage(infoUser.avatar)" @changeFile="changeFile"/>
                        </div>
                        <div class="mt-lg-3">
                            <p :class="{'text-break': true, 'h3 font-weight-bold m-0': $detect === 'web',
                                        'h5 font-weight-bold m-0': $detect === 'mobile'}">{{nameUser}}</p>
                            <p class="font-weight-bold m-0">ID: <span class="text-success">{{infoUser.id_custom}}</span></p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 mt-3 mt-lg-5">
                    <div class="rounded">
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <h4 class="font-weight-bold m-0">Thông tin</h4>
                            <span>Cập nhật lần cuối: {{infoUser.time_updated}}</span>
                        </div>
                        <div class="form-group row">
                            <label class="font-weight-bold col-form-label col-12 col-lg-3">Loại tài khoản</label>
                            <div class="col-12 col-lg-9">
                                <input 
                                    :value="$isAdmin() ? 'Admin' : 'Đối tác'"
                                    type="text"
                                    placeholder="Loại Tài khoản"
                                    class="form-control size-input"
                                    disabled/>
                            </div>
                        </div>
                        <div v-if="business" class="form-group row">
                            <label class="font-weight-bold col-form-label col-12 col-lg-3">Tên công ty</label>
                            <div class="col-12 col-lg-9">
                                <input 
                                    :value="business"
                                    type="text"
                                    placeholder="Loại Tài khoản"
                                    class="form-control size-input"
                                    disabled/>
                            </div>
                        </div>
                        <div v-if="permissions" class="form-group row">
                            <label class="font-weight-bold col-form-label col-12 col-lg-3">Danh sách phân quyền</label>
                            <div class="col-12 col-lg-9">
                                <div class="bg-white  pl-2 py-1 rounded" style="border: 1px solid #ced4da;">
                                    <p v-for="(item, i) in permissions" :key="i" class="ml-1 m-0">{{item.permission}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="font-weight-bold col-form-label col-12 col-lg-3">User name</label>
                            <div class="col-12 col-lg-9">
                                <input 
                                    v-model="infoUser.username"
                                    type="text"
                                    placeholder="User"
                                    class="form-control size-input"
                                    disabled/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="font-weight-bold col-form-label col-12 col-lg-3">Họ tên</label>
                            <div class="col-12 col-lg-9">
                                <input
                                    v-model="infoUser.name"
                                    type="text"
                                    placeholder="Họ tên"
                                    class="form-control size-input"
                                    :class="{'is-invalid' : errors.name}"/>
                                <form-invalid :error="errors.name"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="font-weight-bold col-form-label col-12 col-lg-3">Số điện thoại</label>
                            <div class="col-12 col-lg-9">
                                <input
                                    v-model="infoUser.phone"
                                    type="text"
                                    placeholder="Số điện thoại"
                                    class="form-control size-input"
                                    disabled
                                />
                            </div>
                        </div> 
                        <div class="form-group row">
                            <label class="font-weight-bold col-form-label col-12 col-lg-3">Email</label>
                            <div class="col-12 col-lg-9">
                                <input
                                    v-model="infoUser.email"
                                    type="email"
                                    placeholder="Email"
                                    class="form-control size-input"
                                    :class="{'is-invalid' : errors.email}"/>
                                <form-invalid :error="errors.email"/>
                            </div>
                        </div> 
                        <div class="form-group row">
                            <label class="font-weight-bold col-form-label col-12 col-lg-3">Địa chỉ</label>
                            <div class="col-12 col-lg-9">
                                <input
                                    v-model="infoUser.address"
                                    type="text"
                                    placeholder="Địa chỉ"
                                    class="form-control size-input"
                                    :class="{'is-invalid' : errors.address}"/>
                                <form-invalid :error="errors.address"/>
                            </div>
                        </div>  
                        <div class="form-group row">
                            <div class="col-12 col-lg-3"></div>
                            <div class="col-12 col-lg-9">
                                <div :class="{'w-100': $detect === 'mobile'}">    
                                    <button :class="{'btn btn-primary px-5 mr-md-3 mt-3 btn-responsive': true, 'w-100 size-button': $detect === 'mobile'}"
                                            @click="updateProfile()">
                                        Cập nhật
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
           
            
        <div :class="{'mt-3 p-1 p-lg-5  rounded': true, 'bg-light': $detect === 'web', 'bg-mb': $detect === 'mobile'}">
            <div>
                <h4 class="font-weight-bold ">Thay đổi mật khẩu</h4>
            </div>
            
            <div class="form-group row">
                <label class="font-weight-bold col-form-label col-lg-3">Mật khẩu hiện tại</label>
                <div class="col-lg-9">
                    <input-password 
                        v-model="currentPassword"
                        class="size-input"
                        placeholder="Mật khẩu hiện tại"
                        :class="{'is-invalid' : errors.password }"/>
                    <form-invalid :error="errors.password"/>
                </div>
            </div> 
            <div class="form-group row">
                <label class="font-weight-bold col-form-label col-lg-3">Mật khẩu mới</label>
                <div class="col-lg-9">
                    <input-password 
                        v-model="newPassword"
                        class="size-input"
                        placeholder="Mật khẩu mới"
                        :class="{'is-invalid' : errors.password_new }"/>
                    <form-invalid :error="errors.password_new"/>
                </div>
            </div> 
            <div class="form-group row">
                <label class="font-weight-bold col-form-label col-lg-3">Xác nhận mật khẩu mới</label>
                <div class="col-lg-9">
                    <input-password 
                        v-model="confirmPassword"
                        class="size-input"
                        placeholder="Xác nhận mật khẩu mới"
                        :class="{'is-invalid' : errors.password_confirm }"/>
                    <form-invalid :error="errors.password_confirm"/>
                </div>
            </div> 
            <div class="form-group row">
                <div class="col-lg-3"></div>
                <div class="col-lg-9">
                    <div :class="{'w-100': $detect === 'mobile'}">    
                        <button
                            :disabled="currentPassword === '' || newPassword === '' || confirmPassword === ''"
                            :class="{'btn btn-primary px-5 mr-md-3 mt-3 btn-responsive': true, 'w-100 size-button': $detect === 'mobile'}"
                            @click="updatePassword()">
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
import { getProfile, updateProfile, updatePassword } from "@/repositories/profile.js";
export default {
    components: {
        imageBlock: () => import('@/components/imageBlock'),
    },
    data() {
        return {
            breadcrumb: [
                {
                    "title": "Trang chủ",
                    "name": null
                },
                {
                    "title": "Thông tin cá nhân",
                    "name": null
                }
            ],
            nameUser: '',
            errors: {},
            infoUser : {},
            permissions: '',
            business: '',
            file: '',
            currentPassword: '',
            newPassword : '',
            confirmPassword : '',
            
        }
    },
    computed: {
    },
    watch: {
    },
    created() {
        $store.commit('general/setActiveDashboard', "10000");
        $store.commit('general/setBreadcrumbs', this.breadcrumb)
        this.$store.state.general.title = 'Thông tin cá nhân'
        this.getData()
    },
    methods: {
        getData() {
            getProfile().then(res =>{
                const data = res.data.user
                this.infoUser = data;
                this.business = data.business ? data.business.data.name : ''
                this.permissions = data.permissions.data
                this.nameUser = data.name
            })
        },
        async updateProfile(){
            this.errors = {}
            let form = {
                name: this.infoUser.name,
                email: this.infoUser.email,
                address: this.infoUser.address
            }
            if(this.file == null || this.file == '' || this.file == undefined){
            }else{
                    await this.$uploadFile(this.file).then(res =>{
                        form.avatar = res 
                        }).catch(err => {
                            this.requestError(err)
                        })
                }
            
            updateProfile(form).then(res =>{
                this.$showMessage(res.data.message,'success');
                this.infoUser = res.data.data;
                this.nameUser = res.data.data.name;
                this.$store.state.profile.user.avatar = res.data.data.avatar;
                this.$store.state.profile.user.name =  res.data.data.name;
            }).catch(err =>{
                this.requestError(err)
            })
        },
        changeFile(file) {
            this.file = file
        },
        updatePassword(){
            this.errors = {}
            updatePassword({password: this.currentPassword,password_new: this.newPassword,password_confirm : this.confirmPassword}).then(res =>{
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.$showMessage(res.data.message, 'success')
                    this.$logout()
                }else {
                    this.$showMessage(res.data.message, 'warning')
                }
            }).catch(err =>{
                this.requestError(err)
            })
        },
        requestError(err) {
        if (err.status === HTTP_CODE_GONE) {
            this.$showMessage(err.data.data.message,"warning");
        } else if (err.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
            this.errors = err.data.data.data;
        }
        },
    }
}
</script>

<style lang="scss">
.profile{
    @media only screen and (min-width: 768px){
        .btn-responsive{
            width: auto !important;
        }
    }
}
</style>