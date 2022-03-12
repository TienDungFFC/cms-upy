<template>
    <div class="input-password">
        <input :type="showPassword ? 'text' : 'password'" 
            :placeholder="placeholder" 
            :value="value"
            :readonly="readonly"
            autocomplete="new-password"
            class="form-control"
            @input="$emit('input', $event.target.value)">
            <i v-if="showPassword && value" class="icon ion-md-eye" @click="changeType"></i>
            <i v-else-if="!showPassword && value" class="icon ion-md-eye-off" @click="changeType"></i>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },                            
        readonly: {
            type: Boolean,
            default: false
        },        
    },
    data() {
       return {
            showPassword: false,
       }
    },
    watch: {
        'value'(val) {
            if(!val) {
                this.showPassword = false;
            }
        }
    },
    methods: {
        changeType() {
            this.showPassword = !this.showPassword
        },
    }
}
</script>

<style lang="scss">
.input-password {
    position: relative;
    i {
        font-size: 16px;
        color: #c0c4cc;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 999;
        cursor: pointer;
    }
    &.is-invalid {
        .form-control {
            border-color: #dc3545;
            padding-right: calc(1.5em + 0.75rem);
        }
    }
    &.size-input {
        input {
            height: 32px;
        }
    }
}
</style>