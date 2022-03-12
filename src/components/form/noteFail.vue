<template>
    <div class="form-group mb-0">
        <textarea
            :value="value"
            @input="$emit('input', $event.target.value)"
            :class="{'form-control mt-3' : true, 'is-invalid' : error}" 
            :rows="rows" 
            :cols="cols" 
            :placeholder="placeholder"
            :disabled="disabled">
        </textarea>
        <form-invalid :error="error"/> 
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        rows: {
            type: Number,
            default: 4
        },
        cols: {
            type: Number,
            default: 50
        },
        placeholder: {
            type: String,
            default: 'Lý do'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        error: {
            type: String,
            default: ''
        }
    }
}
</script>

<style>

</style>