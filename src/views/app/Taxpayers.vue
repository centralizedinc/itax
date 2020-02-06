<template>
  <a-row type="flex" justify="center" :gutter="8" style="margin-top:1vh">
    <a-col :span="12">
      <a-card class="avatar_btn" @click="$router.push('/app/taxpayer/new')">
        <a-row type="flex" align="middle" :gutter="8">
          <a-col :span="8">
            <a-avatar
              shape="square"
              :size="60"
              style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);"
            >
              <a-icon style="font-size:24px" type="user-add"></a-icon>
            </a-avatar>
          </a-col>
          <a-col :span="16">
            <h4>Add New Taxpayer</h4>
            <p>Create a new taxpayer and add it on your connections</p>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card class="avatar_btn" @click="$router.push('/app/taxpayer/upload')">
        <a-row type="flex" align="middle" :gutter="8">
          <a-col :span="8">
            <a-avatar
              shape="square"
              :size="60"
              style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);"
            >
              <a-icon style="font-size:24px" type="upload"></a-icon>
            </a-avatar>
          </a-col>
          <a-col :span="16">
            <h4>Upload Taxpayer</h4>
            <p>Create several taxpayers at once using a smart tax template</p>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
    <!-- <a-col :span="8">
            <a-card>
            <a-row type="flex" align="middle" :gutter="8">
              <a-col :span="8">
                  <a-avatar class="avatar_btn" @click="$router.push('/app/taxpayer/search')"  shape="square" :size="60" style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);">
                        <a-icon style="font-size:24px" type="search"></a-icon>
                    </a-avatar>
              </a-col>
              <a-col :span="16">
                  <h4>Import Taxpayer</h4>
                  <p>Lorem ipsum dolor sit amet labore et dolore magna aliqua.</p>
              </a-col>
            </a-row>
            </a-card>
        </a-col> -->

    <a-col :span="24" style="margin-top: 1vh">
      <a-card>
        <h3>Taxpayers</h3>
        <span style="font-size:10px">All your registered taxpayers can be found here.</span>
        <a-divider></a-divider>
        <a-list
          itemLayout="horizontal"
          :dataSource="taxpayers"
          :loading="loading"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <!-- <a-card> -->
            <a slot="actions" @click="view()">edit</a>
            <a slot="actions" @click="view(item)">view</a>
            <a-list-item-meta>
              <template slot="description">
                <span style="font-weight:bold">{{
                  item.taxpayer_type == "I"
                    ? `${item.individual_details.lastName}, ${item.individual_details.firstName} ${item.individual_details.middleName}`
                    : `${item.registered_name}`
                }}
                </span>
                <br/>
                <span style="font-weight:bold">{{ formatTIN(item.tin) }}</span>
                <div style="font-size:10px">{{item.taxpayer_type == "I" ? "Individual" : "Non-Individual"}}</div>
                <div style="font-size:10px">{{item.address}}</div>
              </template>
              <a-avatar
                style="border: solid 1px #1cb5e0"
                slot="avatar"
                shape="square"
                :size="64"
              >
              {{item.registered_name[0]}}
              </a-avatar>
            </a-list-item-meta>
            <!-- </a-card> -->
          </a-list-item>
        </a-list>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      taxpayers: [],
      users: [],
      cols: [
        {
          title: "Name",
          dataIndex: "name",
          sorter: true
        },
        {
          title: "TIN",
          dataIndex: "tin"
        },
        {
          title: "Classification",
          dataIndex: "classification"
        },
        {
          title: "RDO",
          dataIndex: "rdo"
        }
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      this.$http
        .get(`/taxpayer/users/${this.$store.state.account_session.user.account_id}`)
        .then(results => {
          console.log("result1 ::: ", JSON.stringify(results.data));
          this.taxpayers = results.data.model;
          // this.users.push(results.data.model);  
          this.loading = false;        
        })
        .catch(err => {
          console.log(`err ::: `, err);
          this.loading = false;
        });
      // this.taxpayers = this.$store.state.taxpayers.records
    },
    getUserByTin(tin) {
      const user = this.users.find(v => v.tin === tin);
      return (
        user || {
          avatar: {
            location:
              "https://icon-library.net/images/my-profile-icon-png/my-profile-icon-png-3.jpg"
          }
        }
      );
    },
    view(item){      
      this.$router.push('/app/taxpayer/view')
    }
  }
};
</script>

<style></style>
