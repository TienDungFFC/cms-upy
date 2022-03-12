
<template>
    <div class="Step">
        <ldc-dialog 
        :visible.sync="dialog" 
        title="Sắp xếp các bước"
        width="30%">
            

        </ldc-dialog>
    </div>
</template>
<script>
export default {
    props: ['visible'],
    data() {
        return {
            dialog: false,
            loading: false,
        }
    },
    watch: {
        visible(val) {
            this.dialog = val;
        },
        dialog(val) {
            this.$emit('update:visible', val);
            if(!val) {
                this.closeDialog();
            }
        },    
    },
    created() {
        
    },
    methods: {
        closeDialog() {
            this.errors = {};
        },

    }
}
</script>

<style lang="scss">

</style>

                                