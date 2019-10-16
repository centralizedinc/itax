<template>
<div>
  <a-row>
    <!-- <a-col :span="24">
        <a-card style="background: linear-gradient(to right, #000046, #1cb5e0);">
            <h2 style="color: #FFFFFF">Welcome {{$store.state.account_session.user.name.first}}!</h2>
            <a-divider></a-divider>
            
        </a-card>
    </a-col> -->
    <a-col :span="24" style="margin-top:1vh">
       <a-card
        title="Activity Feeds"
        style="box-shadow: 0px 0px 10px 2px #88888847"
        :headStyle="{'background-color': 'e6e6e6'}"
      >
        <span slot="extra">
            <a-row type="flex" justify="end" align="bottom" style="margin-right: 2vh">
                <template v-if="!loading">
              <a-col :span="3" v-for="i in subscribers" :key="i.name" >
                  <a-badge status="success" :offset="[-10,3]">
                  <a-avatar style="border: solid 1px #1cb5e0" :src="i.avatar"></a-avatar>
                  </a-badge>
              </a-col>
              </template>
              <template v-else>
              <a-col :span="2" v-for="i in 4" :key="i" >
                  <a-skeleton active avatar :paragraph="{rows: 0}" :title="{width:0}" />
              </a-col>
              </template>
            </a-row>
        </span>
        <a-row type="flex" justify="end" >
          <a-col :span="24">
              <a-textarea rows="4" placeholder="Post something..."></a-textarea>
          </a-col>
          <a-col :span="6" style="margin-top:1vh">
              <a-button-group block>
                    <a-button type="primary" ghost icon="link">Attach</a-button>
                    <a-button icon="upload" type="primary">Post</a-button>
                </a-button-group>
          </a-col>
        </a-row>
        
       </a-card>
       
       <template v-if="!loading">
        <a-card v-for="item in data" :key="item.content" style="margin-top:1vh; margin-bottom:1vh" >
            <a-comment 
                :author="item.created_by.display_name"
                :avatar="item.created_by.avatar.location"
            >
                <template slot="actions">
                <span v-for="action in item.actions" :key="action">{{action}}</span>
                </template>
                <template slot="content">
                    <p>{{item.description}}</p>
                    <!-- <pdf style="width:100%" src="https://s3.us-west-2.amazonaws.com/fdav3.0/upload/l20191609000130/1568606860737?response-content-disposition=inline&X-Amz-Security-Token=AgoJb3JpZ2luX2VjEBAaCXVzLWVhc3QtMSJIMEYCIQC8EdsUBT%2B1zMxasM6oVBaqReA0JdoWpxN3ftMX3UvM2wIhAKsuUgpjp%2BAkuQ2JUcJVKGwejeWZKiv%2BtCRSoKkyJ812KqYCCPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMOTk3NTE0NjM1MDM5IgxYfKtTd4hHPC%2BjmVAq%2BgEIE00Rl03i5XapW%2FxkKSDHyFayTCd%2FIMrFDcMLwIqUCc1gRayv9UZhqQfNDH%2BMMkFEVu%2BLpzkwmiBmZcdzmNI66NDOqm5TJN5Av%2FM5C3ek80otEY%2FbDDqW5zJ42fQhooUzWyFWYUNAUKQQOAcIRdhLS5plzssBOjv4174GapvN7PiR%2BELOBRi8QwmMc5AiV1B8Ivt%2FBaRT5dKeVryvmvrB%2FXmsiiSKIeniGDrdO6PaPzo0rG2Fpxl0aNUZ0Wq8qaOie0V1CfxMHiyD12b7%2FCaPCPmQF47g6AvRaXAqbCJ3ZL%2FtnmyaAaSH6DPn8WqRkWpXWzIggLVUo%2Ff5MKTTie0FOrMB2%2F%2F%2FGCUsMxwr5fGiLYlkiFq7dsqZT1oYjXR3VmY%2BKJq4vWiuwg8rKhgNcwdujH6rCLF%2Fn2RnMClMOtagVzlzW6rItrhDjwuj%2BOvGIMbPom4XmaCYC5dpDR0wWJRnEQ5bCEpYxE4eXPGLiFVM0A6%2BvkIBc01tSsLdAG2k9jAgkMnwFIzwMFzo%2F3j6NuQ2%2Flsw5f1r94behFyyuBpEyAdK%2B%2FcNZJQ0dzjwFWTxL06gHf99FUc%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20191013T000527Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA6QQEBM4P5CLLYPVJ%2F20191013%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=dce88311e7a2dd7521c9dc8a19f07ed79b796c9cb4202f8a578139d3a3f13d36"></pdf> -->
                </template>
                <a-tooltip slot="datetime" >
                <span>{{moment(item.created_date).fromNow()}}</span>
                </a-tooltip>
            </a-comment>
            </a-card>
       </template>
       <template v-else>
           <a-card v-for="i in 4" :key="i" style="margin-top: 1vh">
            <a-skeleton active avatar :paragraph="{rows: 4}" />
            <!-- <a-divider></a-divider> -->
        </a-card>
       </template>
    </a-col>
  </a-row>

  
  <!-- <a-row type="flex" align="center" :gutter="16" style="margin-top: 2vh">
      <a-col :span="8">
        <a-card >
             <a-row type="flex" align="middle">
              <a-col :span="8">
                  <a-icon type="idcard" theme="twoTone"  style="font-size: 40px"></a-icon>
              </a-col>
              <a-col :span="16">
                  <h3>Taxpayers</h3>
                  <p>0</p>
              </a-col>
            </a-row>
        </a-card>
    </a-col>
    <a-col :span="8">
        <a-card >
            <a-row type="flex" align="middle">
              <a-col :span="8">
                  <a-icon type="file" theme="twoTone"  style="font-size: 40px"></a-icon>
              </a-col>
              <a-col :span="16">
                  <h3>Tax Returns</h3>
                  <p>0</p>
              </a-col>
            </a-row>
            
        </a-card>
    </a-col>
    <a-col :span="8">
        <a-card >
             <a-row type="flex" align="middle">
              <a-col :span="8">
                  <a-icon type="credit-card" theme="twoTone"  style="font-size: 40px"></a-icon>
              </a-col>
              <a-col :span="16">
                  <h3>Payments</h3>
                  <p>0</p>
              </a-col>
            </a-row>
        </a-card>
    </a-col>
    
  </a-row> -->
  <!-- <a-row type="flex" align="middle" justify="center" :gutter="16" style="margin-top: 5vh">
    <a-col :span="24">
        <h3>Quick View</h3>
        <a-divider></a-divider>
    </a-col>
    <a-col :span="1" style="margin-right: 2vh">
        <a-avatar shape="square"><a-icon type="left"></a-icon></a-avatar>
    </a-col>
    <a-col :span="6" v-for="i in 3" :key="i">
        <a-card>
            <img style="width:60%"
                alt="example"
                src="https://busapcom.files.wordpress.com/2014/10/1601-c.jpg?w=350&h=200&crop=1"
                slot="cover"
            />
            <template class="ant-card-actions" slot="actions">
                <a-icon type="edit" />
                <a-icon type="credit-card" />
                <a-icon type="download" />
            </template>
            <a-card-meta
                title="1603"
                description="09/20/2019">
            </a-card-meta>
        </a-card>
    </a-col>
    <a-col :span="1">
        <a-avatar shape="square"><a-icon type="right"></a-icon></a-avatar>
    </a-col>
  </a-row> -->
  </div>
</template>

<script>
import moment from 'moment'
import pdf from "vue-pdf";
export default {
     components: {
    pdf
  },
    data(){
        return{
            loading:false,
            subscribers:[],
            data: [],
            moment
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            this.loading =true;
            this.$http.get(`/activities/${this.$store.state.account_session.user.tin}`)
            .then(result=>{
                console.log('RESULT ::: ', JSON.stringify(result.data))
                this.data = result.data.model
                this.loading=false;                
            })
            .catch(error=>{
                console.log('ERROR ::::',error);
                this.loading=false;
            })
        }
        // this.$http
        //     .get("https://randomuser.me/api/?results=6")
        //     .then(results => {
        //     this.loading =false;
        //   console.log("::::", JSON.stringify(results));
        //   const subscribers = results.data.results.map(v => {
        //     var sub = {
        //       name: v.name,
        //       avatar: v.picture.thumbnail,
        //       post: [
        //         {
        //           name: v.name,
        //           avatar: v.picture.thumbnail,
        //           date_created: new Date()
        //         }
        //       ]
        //     };
        //     return sub;
        //   });
        //   this.subscribers = subscribers;
        // })
        // .catch(err => {
        //   console.log(err);
        //   this.loading = false;
        //   // this.$notification.error({
        //   // })
        // });
        // }
    }
}
</script>

<style>
.ant-skeleton-content .ant-skeleton-title {
  height: 9px;
}
.ant-skeleton-content .ant-skeleton-paragraph > li {
  height: 9px;
}
</style>