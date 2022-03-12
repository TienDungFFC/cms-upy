<template>
    <tr v-if="data.length === 0">
        <td :colspan="colspan" class="text-center text-black-50 py-4 bg-white">Không có dữ liệu</td>
    </tr>
</template>

<script>
export default {
    props: ['data', 'colspan']
}
</script>

<style>

</style>