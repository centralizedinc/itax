<template>
  <a-card style="margin-top: 2vh;">
    <a-row v-if="visible" type="flex" :gutter="10">
      <a-col :span="24">
        <a-row :gutter="15">
          <a-col :span="12">
            <a-button type="primary" @click="visible=false">Close and Submit</a-button>
          </a-col>
          <a-col :span="12" style="text-align: right">
            <a-button type="danger" @click="cancelData">Close without saving</a-button>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="12">
        <a-form-item>
          <a-input-number
            v-model="record_data.x"
            placeholder="Row"
            style="width: 100%;"
            @blur="data_changes.apply=!data_changes.apply"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item>
          <a-input-number
            v-model="record_data.y"
            placeholder="Column"
            style="width: 100%;"
            @blur="data_changes.apply=!data_changes.apply"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item>
          <a-input
            v-model="record_data.text"
            placeholder="Text"
            @blur="data_changes.apply=!data_changes.apply"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item>
          <a-input
            v-model="record_data.key"
            placeholder="Keyword"
            @blur="data_changes.apply=!data_changes.apply"
          />
        </a-form-item>
      </a-col>
      <a-col :span="9">
        <a-form-item>
          <a-input-number
            style="width: 100%;"
            v-model="record_data.options.colSpan"
            placeholder="Column Span"
            @blur="data_changes.apply=!data_changes.apply"
          />
        </a-form-item>
      </a-col>
      <a-col :span="9">
        <a-form-item>
          <a-input-number
            style="width: 100%;"
            v-model="record_data.options.rowSpan"
            placeholder="Row Span"
            @blur="data_changes.apply=!data_changes.apply"
          />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item>
          <a-checkbox
            v-model="record_data.options.noWrap"
            @change="data_changes.apply=!data_changes.apply"
          >No wrap</a-checkbox>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          label="Margin"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          style="text-align: left"
        >
          <a-row type="flex" :gutter="5">
            <a-col :span="6">
              <a-tooltip title="Left">
                <a-input-number
                  style="width: 100%;"
                  v-model="record_data.options.margin[0]"
                  placeholder="Left"
                  @change="data_changes.apply=!data_changes.apply"
                />
              </a-tooltip>
            </a-col>
            <a-col :span="6">
              <a-tooltip title="Top">
                <a-input-number
                  style="width: 100%;"
                  v-model="record_data.options.margin[1]"
                  placeholder="Top"
                  @change="data_changes.apply=!data_changes.apply"
                />
              </a-tooltip>
            </a-col>
            <a-col :span="6">
              <a-tooltip title="Right">
                <a-input-number
                  style="width: 100%;"
                  v-model="record_data.options.margin[2]"
                  placeholder="Right"
                  @change="data_changes.apply=!data_changes.apply"
                />
              </a-tooltip>
            </a-col>
            <a-col :span="6">
              <a-tooltip title="Bottom">
                <a-input-number
                  style="width: 100%;"
                  v-model="record_data.options.margin[3]"
                  placeholder="Bottom"
                  @change="data_changes.apply=!data_changes.apply"
                />
              </a-tooltip>
            </a-col>
          </a-row>
        </a-form-item>
      </a-col>
      <a-col :span="9">
        <a-form-item>
          <a-input-number
            style="width: 100%;"
            v-model="record_data.options.fontSize"
            placeholder="Font Size"
            @change="data_changes.apply=!data_changes.apply"
          />
        </a-form-item>
      </a-col>
      <a-col :span="9">
        <a-form-item>
          <a-input-number
            style="width: 100%;"
            v-model="record_data.options.characterSpacing"
            placeholder="Character Spacing"
            @change="data_changes.apply=!data_changes.apply"
          />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item>
          <a-checkbox
            v-model="record_data.options.bold"
            @change="data_changes.apply=!data_changes.apply"
          >Font Bold</a-checkbox>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item>
          <a-select
            v-model="record_data.options.alignment"
            style="width: 100%;"
            placeholder="Alignment"
            @change="data_changes.apply=!data_changes.apply"
          >
            <a-select-option value="justified">Justified</a-select-option>
            <a-select-option value="left">Left</a-select-option>
            <a-select-option value="right">Right</a-select-option>
            <a-select-option value="center">Center</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row v-else>
      <a-col :span="24">
        <a-form-item :validate-status="name_err ? 'error':''" :help="name_err" has-feedback>
          <a-input v-model="record.name" :disabled="loading" placeholder="Name*" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item :validate-status="code_err ? 'error':''" :help="code_err" has-feedback>
          <a-tooltip title="Use as identifier/code to match the needed pdf template">
            <a-input v-model="record.code" :disabled="loading" placeholder="Code*" />
          </a-tooltip>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item>
          <a-input v-model="record.page" :disabled="loading" placeholder="Page No" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item>
          <a-input v-model="record.background_image" :disabled="loading" placeholder="Background Image Url" />
        </a-form-item>
      </a-col>
      <a-col :span="24" style="text-align: right">
        <a-button type="primary" @click="add" :disabled="loading">Add Data</a-button>
      </a-col>
      <a-col :span="24">
        <a-table :loading="loading" :columns="cols" :bordered="true" :dataSource="record.datas">
          <div slot="options" slot-scope="text">
            <a-tooltip placement="right">
              <template slot="title">
                <span v-for="(item, index) in Object.keys(text)" :key="index">
                  {{item}}: {{text[item]}}
                  <br />
                </span>
              </template>
              <a-icon type="info-circle" />
            </a-tooltip>
          </div>
          <a-button-group slot="action" slot-scope="text, record, index">
            <a-button icon="edit" :disabled="loading" type="primary" @click="edit(record)" />
            <a-button icon="delete" :disabled="loading" type="danger" @click="remove(index)" />
          </a-button-group>
        </a-table>
      </a-col>
      <a-col :span="24">
        <a-row :gutter="15">
          <a-col :span="16">
            <a-button style="width: 100%;" type="primary" @click="saveTemplate" :loading="loading">SAVE TEMPLATE</a-button>
          </a-col>
          <a-col :span="8">
            <a-button type="danger" style="width: 100%;" :disabled="loading">CANCEL</a-button>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
export default {
  props: ["record", "data_changes"],
  data() {
    return {
      cols: [
        {
          title: "Row",
          dataIndex: "x",
          width: "5%"
          //   scopedSlots: { customRender: "tin" }
        },
        {
          title: "Column",
          dataIndex: "y",
          width: "5%"
        },
        {
          title: "Text",
          dataIndex: "text"
        },
        {
          title: "Keyword",
          dataIndex: "key"
        },
        {
          title: "Options",
          dataIndex: "options",
          scopedSlots: { customRender: "options" }
        },
        {
          title: "Action",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
          width: "17%"
        }
      ],
      visible: false,
      record_data: {},
      default_data: {
        x: 0,
        y: 0,
        text: "",
        options: {
          noWrap: true,
          margin: [0, 0, 0, 0],
          fontSize: 8
        }
      },
      loading: false,
      code_err: "",
      name_err: ""
    };
  },
  created() {
    if(this.mode.toLowerCase() === 'new') {
      var randomCode = `template_${new Date().getTime()}${this.$route.params.code||''}`
      this.record.name = randomCode;
      this.record.code = randomCode;
      this.record_data = JSON.parse(JSON.stringify(this.default_data))
    } else if(this.mode.toLowerCase() === 'edit') {
      this.loading = true;
      this.$http
        .get(`/pdf_config/code/${this.$route.params.code}`)
        .then(results => {
          console.log("#results in getting pdf data :", results);
          if (results.data && !results.data.error) {
            this.record = results.data;
            this.data_changes.apply = !this.data_changes.apply;
          }
          else {
            console.error(results.data.error);
            this.$notification.error({ message: "Invalid Request." })
          }
          this.loading = false;
        })
        .catch(err => {
          console.error(err);
          this.loading = false;
        });
    } else {
      this.$notification.error({ message: "Invalid Request." })
      this.$router.push('/pdfview');
    }
  },
  computed: {
    mode(){
      return this.$route.params.mode;
    }
  },
  methods: {
    add() {
      this.record.datas.push(JSON.parse(JSON.stringify(this.default_data)));
      this.record_data = this.record.datas[this.record.datas.length - 1];
      this.visible = true;
    },
    remove(index) {
      this.record.datas.splice(index, 1);
      this.data_changes.apply = !this.data_changes.apply;
      this.$notification.success({ message: "Data has been removed." });
    },
    cancelData() {
      this.record.datas.splice(this.record.datas.length - 1, 1);
      this.visible = false;
    },
    edit(record) {
      this.record_data = record;
      this.visible = true;
    },
    saveTemplate() {
      this.code_err = "";
      this.name_err = ""
      if(!this.record.code) this.code_err = "Code is required.";
      else if(!this.record.name) this.name_err = "Name is required.";
      else if(this.mode.toLowerCase() === 'new') {
        this.loading = true;
        this.$http.post('/pdf_config', this.record)
          .then((result) => {
            console.log('### result :', result);
            if(result.data && result.data.error && result.data.error.code === 'code_err'){
              this.code_err = result.data.error.message;
              this.$notification.error({ message: result.data.error.message });
            } else {
              this.$notification.success({ message: "Saving template completed. " });
              this.$router.push('/pdfview');
            }
            this.loading = false;
          }).catch((err) => {
            this.$notification.error({ message: "Saving template error. " });
            console.error(err);
            this.loading = false;
          });
      } else if(this.mode.toLowerCase() === 'edit') {
        this.loading = true;
        this.$http.post(`/pdf_config/${this.record._id}`, this.record)
          .then((result) => {
            console.log('### result :', result);
            if(result.data && result.data.error && result.data.error.code === 'code_err'){
              this.code_err = result.data.error.message;
              this.$notification.error({ message: result.data.error.message });
            } else {
              this.$notification.success({ message: "Saving template completed. " });
              this.$router.push('/pdfview');
            }
            this.loading = false;
          }).catch((err) => {
            this.$notification.error({ message: "Saving template error. " });
            console.error(err);
            this.loading = false;
          });
      }
    }
  }
};
</script>

<style>
</style>