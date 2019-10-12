<template>
<div>
  <a-row>
    <!-- <a-col :span="24">
        <a-card style="background: linear-gradient(to right, #000046, #1cb5e0);">
            <h2 style="color: #FFFFFF">Welcome {{$store.state.account_session.user.name.first}}!</h2>
            <a-divider></a-divider>
            
        </a-card>
    </a-col> -->
    <a-col :span="24" style="margin-top:2vh">
        <!-- <h3>Updates</h3>
        <a-divider></a-divider> -->
        <!-- <a-card> -->
        <!-- <a-list
            itemLayout="horizontal"
            :dataSource="data"
        > -->
            <!-- <a-list-item slot="renderItem" slot-scope="item" > -->
        <a-card v-for="item in data" :key="item.content" style="margin-bottom:1vh">
            <a-comment 
                :author="item.author"
                :avatar="item.avatar"
            >
                <template slot="actions">
                <span v-for="action in item.actions" :key="action">{{action}}</span>
                </template>
                <p slot="content">{{item.content}}</p>
                <a-tooltip slot="datetime" :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
                <span>{{item.datetime.fromNow()}}</span>
                </a-tooltip>
            </a-comment>
            </a-card>
            <!-- </a-list-item>
        </a-list> -->
        <!-- </a-card> -->
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
export default {
    data(){
        return{
            data: [
                {
                actions: ['Reply to'],
                author: 'Han Solo',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                datetime: moment().subtract(1, 'days'),
                },
                {
                actions: ['Reply to'],
                author: 'Han Solo',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                datetime: moment().subtract(2, 'days'),
                },
                {
                actions: ['Reply to'],
                author: 'Han Solo',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                datetime: moment().subtract(2, 'days'),
                },
                {
                actions: ['Reply to'],
                author: 'Han Solo',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                datetime: moment().subtract(2, 'days'),
                },
                {
                actions: ['Reply to'],
                author: 'Han Solo',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                datetime: moment().subtract(2, 'days'),
                },
                {
                actions: ['Reply to'],
                author: 'Han Solo',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                datetime: moment().subtract(2, 'days'),
                },
            ],
            moment
        }
    }
}
</script>

<style>

</style>