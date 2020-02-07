<template>
  <a-card style="margin-top: 2vh;">
    <a-row v-if="visible" type="flex" :gutter="10">
      <a-col :span="24">
        <a-row type="flex" :gutter="10">
          <a-col :span="5">
            <a-button type="primary" @click="visible=false">Close and Submit</a-button>
          </a-col>
          <a-col :span="5">
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
        <a-form-item>
          <a-input v-model="record.name" placeholder="Name" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item>
          <a-input v-model="record.code" placeholder="Code" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item>
          <a-input v-model="record.page" placeholder="Page No" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item>
          <a-input v-model="record.background_image" placeholder="Background Image Url" />
        </a-form-item>
      </a-col>
      <a-col :span="24" style="text-align: right">
        <a-button type="primary" @click="add">Add Data</a-button>
      </a-col>
      <a-col :span="24">
        <a-table :columns="cols" :bordered="true" :dataSource="record.datas">
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
            <a-button icon="edit" type="primary" @click="edit(record)" />
            <a-button icon="delete" type="danger" @click="remove(index)" />
          </a-button-group>
        </a-table>
      </a-col>
      <a-modal :visible="false" @cancel="visible=false" title="New Data">
        <a-button-group slot="footer">
          <a-button type="primary" ghost @click="visible=false">Cancel</a-button>
          <a-button type="primary" @click="addData">Add</a-button>
        </a-button-group>
        <a-row type="flex" :gutter="10">
          <a-col :span="12">
            <a-form-item>
              <a-input-number v-model="record_data.x" placeholder="Row" style="width: 100%;" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item>
              <a-input-number v-model="record_data.y" placeholder="Column" style="width: 100%;" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item>
              <a-input v-model="record_data.text" placeholder="Text" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item>
              <a-input v-model="record_data.key" placeholder="Keyword" />
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item>
              <a-input-number
                style="width: 100%;"
                v-model="record_data.options.colSpan"
                placeholder="Column Span"
              />
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item>
              <a-input-number
                style="width: 100%;"
                v-model="record_data.options.rowSpan"
                placeholder="Row Span"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-checkbox v-model="record_data.options.noWrap">No wrap</a-checkbox>
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
                    />
                  </a-tooltip>
                </a-col>
                <a-col :span="6">
                  <a-tooltip title="Top">
                    <a-input-number
                      style="width: 100%;"
                      v-model="record_data.options.margin[1]"
                      placeholder="Top"
                    />
                  </a-tooltip>
                </a-col>
                <a-col :span="6">
                  <a-tooltip title="Right">
                    <a-input-number
                      style="width: 100%;"
                      v-model="record_data.options.margin[2]"
                      placeholder="Right"
                    />
                  </a-tooltip>
                </a-col>
                <a-col :span="6">
                  <a-tooltip title="Bottom">
                    <a-input-number
                      style="width: 100%;"
                      v-model="record_data.options.margin[3]"
                      placeholder="Bottom"
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
              />
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item>
              <a-input-number
                style="width: 100%;"
                v-model="record_data.options.characterSpacing"
                placeholder="Character Spacing"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-checkbox v-model="record_data.options.bold">Font Bold</a-checkbox>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item>
              <a-select
                v-model="record_data.options.alignment"
                style="width: 100%;"
                placeholder="Alignment"
              >
                <a-select-option value="justified">Justified</a-select-option>
                <a-select-option value="left">Left</a-select-option>
                <a-select-option value="right">Right</a-select-option>
                <a-select-option value="center">Center</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-modal>
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
      record_data: {
        options: {
          noWrap: true,
          margin: [0, 0, 0, 0],
          fontSize: 8
        }
      }
    };
  },
  methods: {
    add() {
      this.record.datas.push({
        x: 0,
        y: 0,
        text: "",
        options: {
          noWrap: true,
          margin: [0, 0, 0, 0],
          fontSize: 8
        }
      });
      this.record_data = this.record.datas[this.record.datas.length - 1];
      this.visible = true;
    },
    addData() {
      this.record.datas.push(this.record_data);
      this.visible = false;
      this.$notification.success({ message: "Success added data. " });
    },
    remove(index) {
      this.record.datas.splice(index, 1);
      this.data_changes.apply = !this.data_changes.apply;
      this.$notification.success({ message: "Success removed data. " });
    },
    cancelData() {
      this.record.datas.splice(this.record.datas.length - 1, 1);
      this.visible = false;
    },
    edit(record) {
      this.record_data = record;
      this.visible = true;
    }
  }
};
</script>

<style>
</style>