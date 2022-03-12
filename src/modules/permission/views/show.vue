<template>
    <div v-loading="loading" class="group_superadmin container-fluid pt-3">
        <div class="row">
            <div class="col-12">
                <h1 class="h5 font-weight-bold" v-if="id && $detect === 'web'">Chi tiết nhóm quyền {{ type === type_admin ? 'Admin' : 'đối tác'}}</h1>
                <h1 class="h5 font-weight-bold" v-else-if="!id && $detect === 'web'">Tạo mới nhóm quyền</h1>
                <p v-if="id">Số lượng user: <span>{{ count_user }}</span></p>
            </div>
        </div>
        <form>
            <div class="row">
                <div class="col-sm-12 col-md-6">
                    <div class="form-group">
                        <label class="font-weight-bold">Tên nhóm</label>
                        <input v-model="permission" placeholder="Tên nhóm" 
                            :disabled="!$myCanUpdate()"
                            :class="{'form-control size-input' : true, 'is-invalid' : errors.permission }">
                        <form-invalid :error="errors.permission"/>                        
                    </div>                   
                </div>
                <div class="col-sm-12 col-md-6">
                    <div class="form-group">
                        <label class="font-weight-bold">Loại tài khoản</label>
                        <ldc-select 
                            v-if="$detect === 'web'"
                            v-model="type"
                            placeholder="Loại tài khoản" style="width:100%"
                            :class="{'is-invalid' : errors.type }"
                            :disabled="id ? true : false"
                            @change="onChangeType"
                            :actionKeyBoard="false">
                            <ldc-option
                                v-for="item in optionsType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </ldc-option>
                        </ldc-select>
                        <select 
                            v-else
                            v-model="type"
                            style="width:100%"
                            :class="{'disabled' : id, 'is-invalid' : errors.type, 'select-ios' : !$isAndroid, 'form-control size-input' : true }"
                            :disabled="id ? true : false"
                            @change="onChangeType">
                            <option value="" disabled hidden>Loại tài khoản</option>
                            <option
                                v-for="item in optionsType"
                                :key="item.value"
                                :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                        <form-invalid :error="errors.type"/>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6">
                    <div class="form-group">
                        <label class="font-weight-bold">Trạng thái</label>
                        <ldc-select 
                            v-if="$detect === 'web'"
                            v-model="active"
                            placeholder="Trạng thái" style="width:100%"                                
                            :class="{'is-invalid' : errors.active }"
                            :disabled="!$myCanUpdate()"
                            :actionKeyBoard="false">
                            <ldc-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </ldc-option>
                        </ldc-select>
                        <select 
                            v-else
                            v-model="active"
                            style="width:100%"
                            :disabled="!$myCanUpdate()"
                            :class="{'is-invalid' : errors.active, 'select-ios' : !$isAndroid, 'form-control size-input' : true }">
                            <option value="" disabled hidden>Trạng thái</option>
                            <option
                                v-for="item in options"
                                :key="item.value"
                                :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                        <form-invalid :error="errors.active"/>
                    </div>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-sm-12 col-md-6 my-2" v-for="(item, index) in groupManages" :key="index" :class="{'is-invalid' : errors.id_permission }">
                    <div class="mb-2 d-flex align-items-center">
                        <input v-model="group[index]" :disabled="!$myCanUpdate()" :value="item" :id="`permission-${index}`" type="checkbox" @change="checkAll(item, index)">
                        <label 
                            :for="`permission-${index}`" 
                            class="font-weight-bold pl-2 mb-0">
                                {{ item.name }}
                        </label>
                    </div>
                    <div :class="{'row ml-2' : true, 'col pb-2' : Object.keys(item.permission_details).length <= 3}">
                        <div v-for="(one, k) in item.permission_details" :key="k" 
                        :class="{'col-sm-12 col-lg-6 d-flex align-items-center' : Object.keys(item.permission_details).length > 3, 'mr-5 d-flex align-items-center' : Object.keys(item.permission_details).length <= 3}">
                                <input type="checkbox" :value="one.id" :id="k" v-model="checkList" :disabled="!$myCanUpdate()" @change="fillCheckAll()">
                                <label :for="k" class="pl-2 mb-0">{{ one.name }}</label>
                        </div>                      
                    </div>
                </div>
                <form-invalid :error="errors.id_permission"/>
            </div>
            <div class="row">
                <buttom-fixed>
                    <div class="col-12">
                        <button v-if="id && $myCanUpdate()" :class="{'btn btn-primary size-button' : true, 'w-100' : $detect === 'mobile'}"
                                :disabled="loading" @click.prevent="update">Cập nhật thay đổi
                        </button>
                        <div v-else>
                            <button v-if="$myCanCreate()" :disabled="loading" :class="{'btn btn-success size-button' : true, 'w-100' : $detect === 'mobile'}" @click.prevent="add()">
                                Thêm mới
                            </button>
                            <button v-if="$detect === 'web'" class="btn btn-danger ml-3" @click="goList()">
                                Hủy
                            </button>
                        </div>
                    </div>
                </buttom-fixed>
            </div>
            
        </form>
    </div>
</template>
<script>
import { TYPE_ADMIN, optionsType } from '@/constants/permission';
import { optionsActive } from '@/constants/optionsActive';
import { detailPermission, getListPermission, addPermission, updatePermission } from '@/repositories/permission';
export default {
    data() {
        return {
            id: this.$route.params.id,
            type_admin: TYPE_ADMIN,
            type: TYPE_ADMIN,
            count_user: 0,
            permission: '',
            active: 1,
            options: optionsActive,
            optionsType: optionsType,
            groupManages: [],
            errors: {},
            loading: false,
            checkList: [],
            group: []
        }
    },
    computed: {
        redirect() {
            return this.$store.state.general.redirect;
        },
    },
    async created() {
        if (this.id) {
            await this.detail();
        }
        await this.listPermission();
        this.fillCheckAll();
    },
    methods: {
        checkAll(item, index) {
            let list = Object.keys(item.permission_details).map(key => {
                return item.permission_details[key].id;
            })
            if(this.group[index]) {
                this.checkList = Array.from(new Set([...this.checkList, ...list]));
            } else {
                let removeCheckList = this.checkList.filter(prop => {
                    return !list.includes(prop);
                })
                this.checkList = removeCheckList
            }
        },
        fillCheckAll() {
            let loadGroup = [];
            let arr = this.groupManages.map(item => {
                return item.permission_details;
            })
            arr.map((item, index) => {
                let isCheckAll = Object.keys(item).every((val) => this.checkList.includes(val));
                if(isCheckAll) {
                    loadGroup[index] = true
                } else {
                    loadGroup[index] = false
                }
            });
            this.group = loadGroup;
        },
        async listPermission() {
            let query = {
                type: this.type
            }
            await getListPermission(query).then(res => {
                let data = res.data.data;
                for (const key in data) {
                    data[key].permission = [];
                    this.groupManages.push(data[key]);
                }
            })
        },
        async detail() {
            this.loading = true;
            await detailPermission(this.id).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    let data = res.data.data;
                    this.count_user = data.count_user;
                    this.permission = data.permission;
                    this.type = data.type;
                    this.active = data.active;
                    this.userActive = data.count;
                    this.checkList = data.id_permission;
                } else {
                    this.$showMessage(res.data.message, 'warning');
                    this.goList();
                }
            }).catch(err => this.requestError(err));
            this.loading = false;            
        },
        onChangeType() {
            if(!this.id) {
                this.checkList = [];
                this.groupManages = [];
                this.listPermission();
            }
        },
        getPathGoList() {
            let path = '/permission';
            return path + this.redirect;
        },
        goList() {
            this.$router.push({
                path: this.getPathGoList()
            })
        },
        async add() {  
            if(!this.$myCanCreate()) return
            this.errors = {};
            this.loading = true;

            let form = {
                permission: this.permission,
                active: this.active,
                id_permission: this.checkList,
                type: this.type,
            }

            await addPermission(form).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    this.$showMessage(res.data.message, 'success');
                    this.goList();                    
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }
            }).catch(err => this.requestError(err));
            this.loading = false;
        },
        async update() {
            if(!this.$myCanUpdate()) return
            this.loading = true;
            this.errors = {};

            let form = {
                permission: this.permission,
                active: this.active,
                id_permission: this.checkList
            }

            await updatePermission(this.id, form).then(res => {
                if(res.data.success === API_STATUS_SUCCESS) {
                    let data = res.data.data;
                    this.$showMessage(res.data.message, 'success');
                    this.permission = data.permission;
                    this.active = data.active;
                    this.userActive = data.count;
                    this.checkList = data.id_permission;
                    this.fillCheckAll();
                } else {
                    this.$showMessage(res.data.message, 'warning');
                }
            }).catch(err => this.requestError(err));
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
    },
}
</script>

<style lang="scss">
</style>
