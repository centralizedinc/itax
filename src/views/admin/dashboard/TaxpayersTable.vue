<template>
  <div>
    <a-card>
      <a-row type="flex" align="middle">
        <a-col :span="16">
          <span class="taxpayer-title">Taxpayers</span>
        </a-col>
        <a-col :span="7">
          <a-input-search placeholder="Search" v-model="search" @search="onSearch" enterButton>
            <a-tooltip slot="suffix" title="Clear" v-if="search">
              <a-icon
                type="close"
                style="color: rgba(0,0,0,.45); cursor: pointer; margin-right: 0.5vw;"
                @click="clearSearch"
              />
            </a-tooltip>
          </a-input-search>
        </a-col>
        <!-- <a-col :span="1" style="text-align: right; color: blue">
          <a-tooltip>
            <span slot="title">Filter</span>
            <a-icon type="filter" style="cursor: pointer; font-size: 16px;" />
          </a-tooltip>
        </a-col>-->
      </a-row>
    </a-card>
    
    <!-- <scroll-loader v-if="search_mode" :loader-method="loadSearchMore" :loader-enable="load_search_more"> -->
      <a-row
        v-if="search_mode"
        :gutter="7"
        type="flex"
        justify="center"
        align="middle"
        style="margin-top: 2vh;"
      >
        <a-col
          v-for="(taxpayer, index) in search_filtered_taxpayers"
          :key="`tp${index}`"
          :xs="{ span: 24 }"
          :md="{ span: 12 }"
          :xl="{ span: 8 }"
          style="margin-bottom: 1vh;"
        >
          <a-card style="cursor: pointer;" @click="moreDetails(taxpayer)">
            <a-card-grid style="width: 100%; padding: 2vh;">
              <a-card-meta :title="taxpayer.registered_name || 'User'">
                <a-avatar
                  slot="avatar"
                  shape="square"
                  :size="60"
                  :src="taxpayer.avatar || 'https://www.mediaupdate.co.za/img/avatar.png'"
                />
                <div slot="description" v-html="getDescription(taxpayer)"></div>
              </a-card-meta>
            </a-card-grid>
          </a-card>
          <span class="top-star" v-if="taxpayer.top <= 10">
            <a-icon type="trophy" />
            <span>{{taxpayer.top}}</span>
          </span>
        </a-col>
        <a-col :span="24" style="text-align: center">
          <a-spin v-if="loading" />
          <span v-else-if="!load_search_more">Done Loading...</span>
        </a-col>
      </a-row>
    <!-- </scroll-loader> -->

    <!-- <scroll-loader v-else :loader-method="loadMore" :loader-enable="load_more"> -->
      <a-row v-else :gutter="7" type="flex" justify="center" align="middle">
        <a-divider style="margin: 5px 0">Top Taxpayers</a-divider>
        <a-col
          v-for="(taxpayer, index) in top_taxpayers(true)"
          :key="`top${index}`"
          :xs="{ span: 24 }"
          :md="{ span: 12 }"
          :xl="{ span: 8 }"
          style="margin-bottom: 1vh;"
        >
          <a-card style="cursor: pointer;" :bodyStyle="{ padding: 0 }" @click="moreDetails(taxpayer)">
            <!-- <a-badge style="width: 100%; height: 100%; line-height: 1.5; display: block;" :count="taxpayer.top <= 10 ? taxpayer.top : 0"> -->
            <a-card-grid style="width: 100%; height: 100%; padding: 15px;">
              <a-card-meta :title="taxpayer.registered_name || 'User'">
                <a-avatar
                  slot="avatar"
                  shape="square"
                  :size="60"
                  :src="taxpayer.avatar || 'https://www.mediaupdate.co.za/img/avatar.png'"
                />
                <div slot="description" v-html="getDescription(taxpayer)"></div>
              </a-card-meta>
            </a-card-grid>
            <!-- <span class="top-star" v-if="taxpayer.top <= 10"> -->
            <template v-if="taxpayer.top <= 10">
              <a-icon class="top-star" type="trophy" theme="filled" />
              <span class="rank-text">Rank {{taxpayer.top}}</span>
            </template>
            <!-- </a-badge> -->
          </a-card>
        </a-col>
        <a-divider style="margin: 5px 0">Other Taxpayers</a-divider>
        <a-col
          v-for="(taxpayer, index) in other_taxpayers"
          :key="`other${index}`"
          :xs="{ span: 24 }"
          :md="{ span: 12 }"
          :xl="{ span: 8 }"
          style="margin-bottom: 1vh;"
        >
          <a-card style="cursor: pointer;" @click="moreDetails(taxpayer)">
            <a-card-grid style="width: 100%; padding: 2vh;">
              <a-card-meta :title="taxpayer.registered_name || 'User'">
                <a-avatar
                  slot="avatar"
                  shape="square"
                  :size="60"
                  :src="taxpayer.avatar || 'https://www.mediaupdate.co.za/img/avatar.png'"
                />
                <div slot="description" v-html="getDescription(taxpayer)"></div>
              </a-card-meta>
            </a-card-grid>
          </a-card>
        </a-col>
        <a-col :span="24" style="text-align: center">
          <a-spin v-if="loading" />
          <span v-else-if="!load_more">Done Loading...</span>
        </a-col>
      </a-row>
    <!-- </scroll-loader> -->

    <!-- More Details -->
    <a-modal
      :visible="show_details"
      :closable="false"
      @cancel="show_details=false"
      class="more-details"
    >
      <a-row>
        <a-col :xs="{ span: 24 }" :md="{ span: 6 }">
          <a-row>
            <a-col :xs="24">
              <a-avatar :src="selected_taxpayer.avatar" shape="square" :size="100"></a-avatar>
            </a-col>
          </a-row>
        </a-col>
        <a-col :xs="{ span: 24 }" :md="{ span: 18 }">
          <a-row>
            <a-col :span="9" style="margin-bottom: 1vh">
              <b>Registered Name</b>:
            </a-col>
            <a-col :span="15" style="margin-bottom: 1vh">{{selected_taxpayer.registered_name}}</a-col>
            <a-col :span="9" style="margin-bottom: 1vh">
              <b>TIN</b>:
            </a-col>
            <a-col :span="15" style="margin-bottom: 1vh">{{formatTIN(selected_taxpayer.tin)}}</a-col>
            <a-col :span="9" style="margin-bottom: 1vh">
              <b>RDO</b>:
            </a-col>
            <a-col :span="15" style="margin-bottom: 1vh">{{selected_taxpayer.rdo_code}}</a-col>
            <a-col :span="9" style="margin-bottom: 1vh">
              <b>Tax Returns</b>:
            </a-col>
            <a-col
              :span="15"
              style="margin-bottom: 1vh"
            >{{formatAmount(selected_taxpayer.collections, true)}}</a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-button slot="footer" block @click="show_details=false">Close</a-button>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      search_mode: false,
      search: "",
      filtered_taxpayers: [],
      fetching_taxpayers: false,
      show_details: false,
      selected_taxpayer: {},
      load_more: true,
      load_search_more: true,
      load_size: 0,
      load_search_size: 0
    };
  },
  created() {
    this.loading = true;
    this.$store
      .dispatch("GET_TAXPAYERS")
      .then(result => {
        this.load_size = 9;
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
      });
  },
  computed: {
    taxpayers() {
      var taxpayers = this.deepCopy(this.$store.state.taxpayers.taxpayers);
      // Mock collections
      // taxpayers = taxpayers
      //   .map(v => {
      //     v.collections = this.getRandomArbitrary(10000000, 200000);
      //     return v;
      //   })
      //   .sort((a, b) => b.collections - a.collections)
      //   .map((v, i) => {
      //     v.top = i + 1;
      //     return v;
      //   });
      // console.log("this.login_rdo :", this.login_rdo);
      // if (this.login_rdo) {
      //   taxpayers = taxpayers.filter(
      //     v => v.rdo_code && v.rdo_code === this.login_rdo
      //   );
      // }
      return taxpayers;
    },
    other_taxpayers() {
      const other_taxpayers = this.top_taxpayers(false);
      return other_taxpayers.slice(0, this.load_size);
      // return other_taxpayers;
    },
    search_filtered_taxpayers(){
      return this.filtered_taxpayers.slice(0, this.load_search_size);
    },
    login_rdo() {
      return this.$store.state.tax_form.login_rdo;
    }
  },
  methods: {
    top_taxpayers(bool) {
      const top_length = 10;
      if (bool) return this.taxpayers.slice(0, top_length);
      else return this.taxpayers.slice(top_length, this.taxpayers.length);
    },
    getDescription(tp) {
      var test = <span></span>;
      return `TIN: <b>${this.formatTIN(tp.tin)}</b><br/>RDO: <b>${
        tp.rdo_code
      }</b><br/>Tax Returns: <b>${this.formatAmount(tp.collections, true)}</b>`;
    },
    getRandomArbitrary(max, min) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    moreDetails(tp) {
      console.log("tp :", tp);
      this.show_details = true;
      this.selected_taxpayer = tp;
    },
    onSearch(value) {
      console.log("search :", this.search);
      if (this.search) {
        this.search_mode = true;
        this.load_search_size = 9;
        this.filtered_taxpayers = this.taxpayers.filter(v => {
          return (
            v &&
            ((v.registered_name &&
              v.registered_name.indexOf(this.search) > -1) ||
              (v.tin && v.tin.indexOf(this.search) > -1) ||
              (v.rdo_code && v.rdo_code.indexOf(this.search) > -1))
          );
        });
      } else this.search_mode = false;
    },
    clearSearch() {
      this.search = "";
      this.search_mode = false;
    },
    loadMore(){
      console.log('enter loading more...');
      this.loading = true;
      setTimeout(() => {
        this.load_size += 9;
        console.log(`enter timeout ${this.top_taxpayers(false).length}:${this.load_size} = ${this.top_taxpayers(false).length <= this.load_size}`);
        if(this.top_taxpayers(false).length <= this.load_size) this.load_more = false;
        console.log(this.load_more);
        this.loading = false;
      }, 3000);
    },
    loadSearchMore(){
      this.loading = true;
      setTimeout(() => {
        this.load_search_size += 9;
        if(this.taxpayers.length <= this.load_search_size) this.load_search_more = false;
        this.loading = false;
      }, 1000);
    }
  }
};
</script>

<style>
.more-details .ant-modal-footer {
  padding: 0;
}

.taxpayer-title {
  font-weight: bold;
  font-size: 16px;
}

.top-star {
  position: absolute;
  color: yellow;
  right: 5px;
  top: 3px;
  font-size: 20px;
}

.rank-text {
  position: absolute;
  left: 16px;
  bottom: 24px;
  font-weight: bold;
  font-size: 12px;
  color: gray;
}

/* .top-star {
  position: absolute;
  right: 15px;
  top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.top-star i {
  position: absolute;
  color: yellow;
  font-size: 36px;
}

.top-star span {
  position: absolute;
  z-index: 1;
  font-size: 14px;
  font-weight: bold;
} */
</style>