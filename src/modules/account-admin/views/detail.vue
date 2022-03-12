<template>
    <div class="account-admin-responsive container-fluid pt-3">
        <form>
            <div class="row">
                <div class="col-12">
                    <div class="form-group">
                        <label class="font-weight-bold">Họ tên</label>
                        <input type="text" 
                            v-model="form.name"
                            placeholder="Họ tên" 
                            :disabled="!$myCanUpdate()"
                            :class="{'form-control size-input' : true, 'is-invalid' : errors.name }">
                        <form-invalid :error="errors.name"/>
                    </div>
                </div>

                <div class="col-12">
                    <div class="form-group">
                        <label class="font-weight-bold">Username</label>
                        <input 
                            v-model="form.username"
                            :disabled="!$myCanUpdate()"
                            type="text" 
                            placeholder="Username" 
                            :class="{'form-control size-input' : true, 'is-invalid' : errors.username }">
                        <form-invalid :error="errors.username"/>
                    </div>
                </div>
                <div :class="{'col-sm-12 col-md-6' : true, 'col-md-12' : !id && permissionsNotAvailable.length === 0}">
                    <div class="form-group" v-if="id"> 
                        <label class="font-weight-bold">Danh sách phân quyền</label>
                        <div v-for="item in permissionsAvailable" :key="item.id" class="permission-item">
                            - {{ item.permission }}
                        </div>
                    </div>
                    <div class="form-group" v-else>
                        <label class="font-weight-bold">Phân quyền</label>
                        <select  
                            v-if="$detect === 'mobile'"                                              
                            v-model="form.id_permission"
                            multiple
                            :class="{'is-invalid' : errors.id_permission, 'select-ios' : !$isAndroid, 'form-control size-input' : true }">
                            <option value="" disabled hidden>Phân quyền</option>
                            <option
                                v-for="(item, index) in permissions"
                                :key="index"
                                :disabled="false"
                                :value="item.id">
                                {{ item.permission }}
                            </option>
                        </select>
                        <form-invalid :error="errors.id_permission"/>
                    </div>                         
                </div>
                <div class="col-sm-12 col-md-6" v-if="id && permissionsNotAvailable.length > 0">
                    <div class="form-group">
                        <label class="font-weight-bold">Bổ sung phân quyền</label>
                        <select                                                
                            v-model="form.add_permission"
                            multiple
                            :class="{'select-ios' : !$isAndroid, 'form-control size-input' : true }">>
                            <option value="" disabled hidden>Bổ sung phân quyền</option>
                            <option
                                v-for="(item, index) in permissionsNotAvailable"
                                :key="index"
                                :disabled="!$myCanUpdate()"
                                :value="item.id">
                                {{ item.permission }}
                            </option>
                        </select>           
                    </div>
                </div>

                
                <div class="col-12">
                    <div class="form-group" v-if="id">
                        <span class="font-weight-bold">Đăng nhập lần cuối:</span> <span>{{ form.last_login }}</span>
                    </div>
                </div>

                <div class="col-sm-12 col-md-6">
                    <div class="form-group">
                        <i class="icon-loading"></i>
                        <label v-if="!id" class="font-weight-bold">Mật khẩu</label>
                        <label v-else class="font-weight-bold">Đổi mật khẩu</label>
                        <input-password
                            v-model="form.password" 
                            :disabled="!$myCanUpdate()"
                            :placeholder="id ? 'Mật khẩu mới' : 'Mật khẩu'"
                            :class="{'size-input' : true, 'is-invalid' : errors.password}"/>
                        <form-invalid :error="errors.password"/>
                    </div>
                </div>

                <div class="col-sm-12 col-md-6">
                    <div class="form-group">
                        <label class="font-weight-bold">Xác nhận mật khẩu</label>
                        <input-password
                            :disabled="!$myCanUpdate()"
                            v-model="form.password_confirm" 
                            placeholder="Xác nhận mật khẩu"
                            :class="{'size-input' : true, 'is-invalid' : errors.password_confirm}"/>
                        <form-invalid :error="errors.password_confirm"/>                              
                    </div>
                </div>

                <div class="col-12">
                    <div class="form-group" :error="errors.active ? errors.active : ''">
                        <label class="font-weight-bold">Kích hoạt tài khoản</label>
                        <div class="form-check">
                            <input :disabled="!$myCanUpdate()" class="form-check-input" type="radio" value="1" v-model="form.active" id="active">
                            <label class="form-check-label" for="active">
                                Hoạt động
                            </label>
                        </div>
                        <div :class="{'form-check mt-2' : true, 'is-invalid' : errors.active}">
                            <input :disabled="!$myCanUpdate()" class="form-check-input" type="radio"  value="0" v-model="form.active" id="inactive">
                            <label class="form-check-label" for="inactive">
                                Tạm khoá
                            </label>
                        </div>
                        <form-invalid :error="errors.active"/>                        
                    </div>
                </div>

            </div>
            <buttom-fixed v-if="!id ? $myCanCreate() : $myCanUpdate()">
                <button 
                    :disabled="loading"
                    :loading="loading"
                    :class="{'btn btn-success' : !id, 'btn btn-primary' : id, 'w-100 size-button' : true }"
                    @click.prevent="!id ? create() : update()">
                    {{ !id ? 'Tạo mới' : 'Cập nhật thay đổi' }}
                </button>
            </buttom-fixed>
        </form> 
    </div>
</template>

<script>
import { getPermission } from '@/repositories/permission';
import { getPartner } from '@/repositories/partner';
import { addAccountAdmin, updateAccountAdmin, detailAccountAdmin } from '@/repositories/account-admin';
export default {
    data() {
        return {
            id: this.$route.params.id,
            errors: {},
            loading: false,
            permissions: [],
            permissionsAvailable: [],
            permissionsNotAvailable: [],
            timeOut: null,            
            business: [],
            form: {
                name: '',
                username: '',
                classify: '',
                id_permission: [],
                id_business: '',
                password: '',
                password_confirm: '',
                active: 1,
                add_permission: [],
            },
            showbusiness: false,
            selectedbusiness: '',
            id_business: this.$route.params.id_business,
        }
    },
    computed: {
        redirect() {
            return this.$store.state.general.redirect;
        },
    },
    async created() {
        if(this.$detect === 'web') {
            this.$showMessage('Bạn không có quyền vào trang này', 'warning')
            this.goList();
            return
        }
        if(this.id) {
            await this.getData();
        }
        this.getPermission();
    },
    methods: {        
        async getData() {
            await detailAccountAdmin(this.id).then(res => {
                let data = res.data.data;
                this.form = data;
                this.form.id_business = data.business?.data.name;
                this.form.add_permission = [];
            })
        },
        async getPermission() {
            let query = {}
            if(this.$route.name === 'account-cms') {
                query.type = 'ADMIN'}
            else {
                query.type = 'PARTNER';
            };
            query.active = 1
            query.all = true;
            await getPermission(query).then(res => {
                this.permissions = res.data.data.data;
            });
            if(this.form.permissions) {
                this.detachPermissions();
            };
        },
        detachPermissions() {
            this.permissionsAvailable = this.form.permissions.data;
            this.permissionsNotAvailable = [];
            this.permissions.map(item => {
                if(!this.form.id_permissions?.includes(item.id)) {
                    this.permissionsNotAvailable.push(item)
                }
            })
        },
        getPartner(keyword) {
            this.loading = true;
            this.business = [];
            let query = {};
            if(keyword) query.keyword = keyword
            if (this.timeOut) clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() => {
                getPartner(query).then(res => {
                    this.business = res.data.data;
                    this.loading = false;
                });                
            }, 500);
        },
        async create() {
            if(!this.$myCanCreate()) return;
            this.loading = true;
            this.errors = {};
            let query = {};
            if (this.form.name !== null && this.form.name !== '') {
                query.name = this.form.name
            }
            if (this.form.username !== null && this.form.username !== '') {
                query.username = this.form.username
            }
            if (this.$route.name === 'account-cms-add') {
                query.classify = 'ADMIN_CMS'
            } else {
                query.classify = 'PARTNER';
                query.id_business = this.id_business;
            }
            if (this.form.id_permission.length > 0) {
                query.id_permission = this.form.id_permission
            }
            if (this.selectedbusiness !== null && this.selectedbusiness !== '') {
                query.id_business = this.selectedbusiness
            }
            if (this.form.active !== null && this.form.active !== '') {
                query.active = this.form.active
            }
            if (this.form.password !== null && this.form.password !== '') {
                query.password = this.form.password
            }
            if (this.form.password_confirm !== null && this.form.password_confirm !== '') {
                query.password_confirm = this.form.password_confirm
            }

            await addAccountAdmin(query).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.$showMessage(res.data.message, 'success');
                    this.goList();
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }
            }).catch(err => {
                this.requestError(err);
            })
            this.loading = false;
        },
        async update() {
            if(!this.$myCanUpdate()) return;
            this.loading = true;
            this.errors = {};
            let query = {};
            if (this.form.name !== null && this.form.name !== '') {
                query.name = this.form.name
            }
            if (this.form.username !== null && this.form.username !== '') {
                query.username = this.form.username
            }
            if (this.form.classify !== null && this.form.classify !== '') {
                query.classify = this.form.classify
            }
            
            if (this.form.active !== null && this.form.active !== '') {
                query.active = this.form.active
            }
            if (this.form.password !== null && this.form.password !== '') {
                query.password = this.form.password
            }
            if (this.form.password_confirm !== null && this.form.password_confirm !== '') {
                query.password_confirm = this.form.password_confirm
            }
            if (this.form.add_permission && this.form.add_permission.length > 0) {
                query.id_permission = this.form.add_permission
            }


            await updateAccountAdmin(this.id, query).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.$showMessage(res.data.message, 'success');
                    let data = res.data.data;
                    this.form = data;
                    this.form.id_business = data.business?.data.name;
                    this.form.add_permission = [];
                    this.permissionsNotAvailable = [];
                    this.detachPermissions();
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }
            }).catch(
                err => {
                    this.requestError(err)
                }
            )
            this.loading = false;
        },
        requestError(err) {
            if (err.status === HTTP_CODE_GONE) {
                this.$showMessage(err.data.message, 'warning');
                this.goList();
            } else if (err.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
                this.errors = err.data.data.data;
            }
        },
        getPathGoList() {
            let path = '';
            if(this.$route.name === 'account-cms-add') {
                path = '/account-admin';
            } else if (this.$route.name === 'company-information-account-add') {
                path = '/company-information'
            } else {
                path = `/partner/${this.id_business}`
            }
            return path + this.redirect;
        },
        goList() {
            this.$router.push({
                path: this.getPathGoList()
            })
        },
    }
}
</script>

<style lang="scss">
.account-admin-responsive {
    .permission-item {
        line-height: 1.5;
    }
}
</style>