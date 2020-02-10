<template>
    <div>
        <a-card>
            <a-row slot="title">
              <a-col :span="16" style="font-weight: bold;">
                PDF Template Records
              </a-col>
              <a-col :span="8" style="text-align: right;">
                <a-button type="primary" :disabled="loading" @click="addTemplate" icon="plus-circle">New Template</a-button>
              </a-col>
            </a-row>
            <a-row type="flex" justify="space-between">
                <a-col :span="10">
                    <a-input-search v-model="search" :disabled="loading" placeholder="Search"></a-input-search>
                </a-col>
                <a-col :span="4" style="text-align: right;">
                    <a-button type="primary" :disabled="loading" ghost icon="reload" @click="init(true)">Refresh</a-button>
                </a-col>
                <a-col :span="24">
                    <a-table :columns="cols" :dataSource="table_records" :bordered="true" :loading="loading">
                        <span slot="date_created" slot-scope="text">{{formatDate(text)}}</span>
                        <span slot="date_modified" slot-scope="text">{{formatDate(text)}}</span>
                        <a-button-group slot="action" slot-scope="text">
                            <a-button type="primary" icon="edit" @click="edit(text)" />
                            <a-button type="danger" icon="delete" @click="remove(text)" />
                        </a-button-group>
                    </a-table>
                </a-col>
            </a-row>
        </a-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cols: [{
                title: "Template Name",
                dataIndex: "name"
            },{
                title: "Code",
                dataIndex: "code"
            },{
                title: "Date Created",
                dataIndex: "date_created",
                scopedSlots: {  customRender: "date_created" }
            },{
                title: "Date Modified",
                dataIndex: "date_modified",
                scopedSlots: {  customRender: "date_modified" }
            },{
                title: "Action",
                dataIndex: "code",
                scopedSlots: {  customRender: "action" }
            }],
            loading: false,
            search: "",
            records: []
        }
    },
    computed: {
        table_records() {
            if(this.records && this.records.length) {
                var records = this.records;

                if(this.search) {
                    records = records.filter(v => {
                        return (
                            (v.name && v.name.toUpperCase().indexOf(_self.search.toUpperCase())) ||
                            (v.code && v.nacodeme.toUpperCase().indexOf(_self.search.toUpperCase()))
                        )
                    })
                }

                return records.sort((a,b) => new Date(b.date_modified) - new Date(a.date_modified));
            }
            return []
        }
    },
    created() {
        this.init()
    },
    methods: {
        init(refresh) {
            this.loading = true;
            this.$http.get('/pdf_config')
                .then((result) => {
                    console.log('### get all records :', result);
                    this.records = result.data;
                    this.loading = false;
                }).catch((err) => {
                    console.error(err);
                    this.loading = false;
                });
        },
        addTemplate() {
            this.$router.push(`/pdfview/new/${this.records.length}`)
        },
        edit(code) {
            this.$router.push(`/pdfview/edit/${code}`)
        },
        remove(code) {
            this.loading = true;
            this.$http.get(`/pdf_config/remove/${code}`)
                .then((result) => {
                    console.log('result.data :', result.data);
                    this.loading = false;
                }).catch((err) => {
                    console.error(err);
                    this.loading = false;
                });
        }
    },
}
</script>

<style>
</style>

