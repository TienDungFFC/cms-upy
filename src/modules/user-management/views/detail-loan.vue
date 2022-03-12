
<template>
    <div>
        <ldc-dialog
            v-if="$detect === 'web'"
            :visible.sync="dialogDetail" 
            title=""
            width="60%">
                
            <formLoans :propsInfo="infoLoan" :visible="dialogDetail">
            </formLoans>

        </ldc-dialog>
        
        <div v-else>
            
            <formLoans :propsInfo="infoLoanMb" :visible="dialogDetail">
            </formLoans>
        </div>
    </div>
</template>
<script>
import formLoan from "../../formLoans/views/index"
export default {
    props: ['visible', 'infoLoan'],
    data() {
        return {
            dialogDetail: false,
            infoLoanMb: {}
        }
    },
    components: {
        formLoans: formLoan
    },
    watch: {
        visible(val) {
            this.dialogDetail = val;
        },
        dialogDetail(val) {
            this.$emit('update:visible', val);
        },    
    },
    async created(){  
        if(this.$detect === 'mobile'){
            this.infoLoanMb = {
                id_loan: this.$route.query.id_loan,
                id_user: this.$route.query.id_user
            }
            this.dialogDetail = true
        }
    },
    methods: {
    }
}
</script>

<style lang="scss">

</style>

                                