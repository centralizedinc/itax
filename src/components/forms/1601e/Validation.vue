<template>
<v-dialog
    v-model="dialog"
    scrollable fullscreen 
    persistent :overlay="false"
    max-width="500px"
    transition="dialog-transition"
>
    <v-card>
        <v-toolbar color="primary">
            <v-btn flat icon @click="exit">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Validation</v-toolbar-title>
        </v-toolbar>
        <v-card-title primary-title>
            Validation Results
        </v-card-title>
        <v-card-text>
            <v-data-table
                headers="headers"
                items="items"
                hide-actions
                class="elevation-1"
                select-all
                pagination.sync="pagination"
                item-key="id"
                loading="true"
                search="search"
            >
                
            </v-data-table>
        </v-card-text>
    </v-card>

    
</v-dialog>
</template>

<script>
export default {
    props:['dialog', 'items'],
    methods:{
        exit(){
            this.$emit('exit')
        }
    }

}
</script>

<style>

</style>
