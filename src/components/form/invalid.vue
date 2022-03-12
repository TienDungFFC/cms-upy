<template>
    <div class="invalid-feedback" v-if="error">
        {{error}}
    </div>
</template>
<script>
export default {
    props: ['error'],
}
</script>
