
<template>
    <div v-loading="loading" class="show-account_area">
        <ldc-dialog
            :title="status === 'create' ? `Tạo tài khoản ${account_type}` : `Chi tiết tài khoản ${account_type}`"
            :visible.sync="dialog"
            width="50%">

           <div class="container">
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

                        <div :class="{'col-sm-12 col-md-6' : true, 'col-md-12' : status === 'create' }">
                            <div class="form-group" v-if="status === 'show'"> 
                                <label class="font-weight-bold">Danh sách phân quyền</label>
                                <div v-for="item in permissionsAvailable" :key="item.id" class="permission-item">
                                    - {{ item.permission }}
                                </div>
                            </div>
                            <div class="form-group" v-else>
                                <label class="font-weight-bold">Phân quyền</label>
                                <ldc-select                                                 
                                    v-model="form.id_permission"
                                    multiple              
                                    placeholder="Phân quyền"
                                    :class="{'is-invalid' : errors.id_permission }"
                                    :actionKeyBoard="false">
                                    <ldc-option
                                        v-for="(item, index) in permissions"
                                        :key="index"
                                        :label="item.permission"
                                        :value="item.id">
                                    </ldc-option>
                                </ldc-select>
                                <form-invalid :error="errors.id_permission"/>
                            </div>                         
                        </div>
                        <div class="col-sm-12 col-md-6">
                            <div class="form-group" v-if="status === 'show' && permissionsNotAvailable.length > 0">
                                <label class="font-weight-bold">Bổ sung phân quyền</label>
                                <ldc-select                                                
                                    v-model="form.add_permission"
                                    multiple
                                    placeholder="Bổ sung phân quyền"
                                    :actionKeyBoard="false"
                                    :disabled="!$myCanUpdate()">
                                    <ldc-option
                                        v-for="(item, index) in permissionsNotAvailable"
                                        :key="index"
                                        :label="item.permission"
                                        :value="item.id">
                                    </ldc-option>
                                </ldc-select>           
                            </div>
                        </div>

                        
                        <div class="col-12">
                            <div class="form-group" v-if="status !== 'create'">
                                <span class="font-weight-bold">Đăng nhập lần cuối:</span> <span>{{ form.last_login }}</span>
                            </div>
                        </div>

                        <div class="col-sm-12 col-md-6">
                            <div class="form-group">
                                <label v-if="status === 'create'" class="font-weight-bold">Mật khẩu</label>
                                <label v-else class="font-weight-bold">Đổi mật khẩu</label>
                                <input-password
                                    v-model="form.password" 
                                    :readonly="!$myCanUpdate()"
                                    :placeholder="status === 'show' ? 'Mật khẩu mới' : 'Mật khẩu'"
                                    :class="{'size-input' : true, 'is-invalid' : errors.password}"/>
                                <form-invalid :error="errors.password"/>
                            </div>
                        </div>

                        <div class="col-sm-12 col-md-6">
                            <div class="form-group">
                                <label class="font-weight-bold">Xác nhận mật khẩu</label>
                                <input-password
                                    :readonly="!$myCanUpdate()"
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
                                <div :class="{'form-check' : true, 'is-invalid' : errors.active}">
                                    <input :disabled="!$myCanUpdate()" class="form-check-input" type="radio"  value="0" v-model="form.active" id="inactive">
                                    <label class="form-check-label" for="inactive">
                                        Tạm khoá
                                    </label>
                                </div>
                                <form-invalid :error="errors.active"/>                        
                            </div>
                        </div>

                    </div>
                    <div class="text-center" style="text-align:center">
                        <button 
                            v-if="status === 'create' ? $myCanCreate() : $myCanUpdate()"
                            :disabled="loading"
                            :loading="loading"
                            :class="{'btn btn-success' : status === 'create', 'btn btn-primary' : status !== 'create' }"
                            @click="status === 'create' ? create() : update()">
                        {{ status === 'create' ? 'Tạo mới' : 'Cập nhật thay đổi' }}</button>
                    </div>
                </form> 
           </div>
           
        </ldc-dialog>
    </div>
</template>
<script>
import { getPermission } from '@/repositories/permission';
import { getPartner } from '@/repositories/partner';
import { addAccountAdmin, updateAccountAdmin } from '@/repositories/account-admin';
export default {
    props: ['visible', 'status', 'account', ],
    data() {
        return {
            dialog: false,
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
                id_permission: [],
                id_business: '',
                password: '',
                password_confirm: '',
                active: 1,
                add_permission: [],
            },
            showbusiness: false,
            selectedbusiness: '',
            account_type: '',
        }
    },
    watch: {
        visible(val) {
            this.dialog = val;
            if (val) {
                this.setForm();
                this.getPermission();
            }
        },
        dialog(val) {
            this.$emit('update:visible', val);
            if(!val) {
                this.closeDialog();
            }
        },    
    },
    created() {
        this.setForm();
        if(this.$route.name === 'account-cms') {
            this.account_type = 'Admin';
        } else {
            this.account_type = 'đối tác'
        }
    },
    methods: {
        focusBusiness() {
            this.showbusiness = true;
        },
        outsideBusiness() {
            this.showbusiness = false;
        },
        selectBusiness(business) {
            this.selectedbusiness = business.id;
            this.form.id_business = business.name;
            this.showbusiness = false;
        },
        setForm() {
            if (this.status === 'create') {
                this.form = {
                    name: '',
                    username: '',
                    id_permission: [],
                    id_business: '',
                    password: '',
                    password_confirm: '',
                    active: 1,
                    last_login: '',
                }
            } else {
                this.form = {
                    name: this.account.name,
                    username: this.account.username,
                    id_permission: this.account.id_permissions,
                    active: this.account.active,
                    password: this.account.password,
                    password_confirm: this.account.password_confirm,
                    last_login: this.account.last_login,
                    id_business: this.account.business?.data.name,
                    add_permission: [],
                }
            }
        },
        closeDialog() {
            this.errors = {};
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
            if(this.account.permissions) {
                this.permissionsAvailable = this.account.permissions.data;
                this.permissionsNotAvailable = [];
                this.permissions.map(item => {
                    if(!this.account.id_permissions?.includes(item.id)) {
                        this.permissionsNotAvailable.push(item)
                    }
                })
            };
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
            if (this.$route.name === 'account-cms') {
                query.classify = 'ADMIN_CMS'
            } else {
                query.classify = 'PARTNER';
                query.id_business = this.$route.params.id;
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
                    this.$emit('callData', true)
                    // this.$listeners.callData()    
                    this.dialog = false;
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


            await updateAccountAdmin(this.account.id, query).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.$showMessage(res.data.message, 'success');
                    this.$emit('callData', true)
                    this.dialog = false;
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
                this.dialog = false;
            } else if (err.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
                this.errors = err.data.data.data;
            }
        },

    }
}
</script>

<style lang="scss">
.show-account_area {
    .permission-item {
        line-height: 1.5;
    }
}
</style>

                                