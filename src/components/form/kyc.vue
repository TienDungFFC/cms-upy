<template>
    <div class="d-flex align-items-center">                           
        <div class="">
            <input 
                :value="true"
                :checked="value" 
                class="form-check-input" 
                type="radio" :id="id+'-pass'" 
                :disabled="disabled" 
                @change="$emit('input', $event.target._value)"
                hidden>
            <label :class="{'btn btn-secondary px-4 d-flex align-items-center justify-content-center size-button' : true, 'btn-success' : value, 'disabled' : disabled}" :for="id + '-pass'" style="width: 80px">
                Pass
            </label>
        </div>
        <div class="ml-3">
            <input 
                :value="false"
                :checked="!value" 
                class="form-check-input" 
                type="radio" 
                :id="id+'-fail'" 
                :disabled="disabled" 
                @change="$emit('input', $event.target._value)"
                hidden>
            <label :class="{'btn btn-secondary px-4 d-flex align-items-center justify-content-center size-button' : true, 'btn-danger' : value === false, 'disabled' : disabled}" :for="id+'-fail'" style="width: 80px">
                Fail
            </label>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean
        },
        id: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
    }

}
</script>

<style>

</style>