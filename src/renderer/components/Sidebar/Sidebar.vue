<style lang='less' scoped>
.sidebar_box{
    position: relative;
    top:0px;
    left:0px;
    width:100%;
    min-width: 180px;
    background: #ebecec;
    color:#373d41;
    padding: 20px 10px;
    h3{
        height:50px;
        line-height: 50px;
        font-size: 14px;
        cursor: pointer;
        padding-left:10px;
        &:hover{
            background: #fff;
        };
    }
    .storage_space{

        h3{
            float: left;
            &:hover{
                background:none;
            };
        }
        .s_s_l{
            float: left;
            padding-top: 15px;
            margin-left: 5px;
            Button{
                line-height: 20px;
                border:none;
                color:#373d41;
            }
        }
    }
    .bucket_list{
        height: 400px;
        margin-top: 20px;
        ul{
            li{
                font-size: 14px;
                line-height: 50px;
                height:50px;
                position: relative;
                padding-left: 32px;
                cursor: pointer;
                &::before{
                    content:"";
                    width: 6px;
                    height: 6px;
                    background: #373d41;
                    position: absolute;
                    top:24px;
                    left:10px;
                    border-radius: 50%;
                };
                &:hover{
                    background: #fff;
                };
            }
        }
    }
    .page_part{
        margin-top: 20px;
        overflow:hidden;
    }
    .upload_btn{
        margin-top: 20px;
        width: 100%;
        Button{
            width: 100%;
            box-sizing: border-box;
        }
    }
}
</style>
<template>
    <div class="sidebar_box" v-height:allscreen ref="sidebar_box">
        <h3>
            <Poptip trigger="hover" content="对象存储" placement="left">
            对象存储
            </Poptip>
        </h3>
        <h3>
            <Poptip trigger="hover" content="概述" placement="left">
            概述
            </Poptip>
        </h3>
        <div class="storage_space">
            <h3>
                <Poptip trigger="hover" content="存储空间" placement="left">
                存储空间
                </Poptip>
            </h3>
            <div class="s_s_l">
                <ButtonGroup>
                    <Poptip trigger="hover" content="添加bucket" placement="top-start">
                        <Button ghost :size="buttonSize" icon="md-add"  @click="isShowCreateBucket.showorHide = true" ></Button>
                    </Poptip>
                    <Poptip trigger="hover" content="刷新bucket" placement="top-start">
                        <Button ghost :size="buttonSize" icon="md-refresh"></Button>
                    </Poptip>
                    <Poptip trigger="hover" content="放大窗口" placement="top-start">
                        <Button ghost :size="buttonSize" icon="md-resize"></Button>
                    </Poptip>
                </ButtonGroup>
            </div>
            <Input v-model="value4" icon="ios-search" placeholder="Bucket 名称" @input="addEventFilter($event)" />
        </div>
        <div class="bucket_list" v-height="420">
            <vue-scroll :ops="ops">
                <ul >
                    <li v-for="item in getbucket" @click="showbucketinfo(item)">
                    {{item}}
                    </li>
                </ul>
            </vue-scroll>
        </div>
        <div class="page_part" v-if="isShowPage">
            <Page :total="bucketTotal" :page-size="pageSize" simple @on-change="changePage" />
        </div>
        <div class="upload_btn">
            <Button size="large" icon="md-cloud-upload" >上传任务</Button>
        </div>
        <!-- 弹出层 -->
        <CreateBucket :isShowCreateBucket="isShowCreateBucket"></CreateBucket>
    </div>
</template>

<script>
import CreateBucket from "../../plugins/drawer/CreateBucket.vue";
export default {
    data(){
        return {
            value4:"",
            buttonSize: 'small',
            /*滚动条*/
            ops: {
                vuescroll: {},
                scrollPanel: {},
                rail: {

                },
                bar: {
                    background: '#2d8cf0'
                }
            },
            /*分页器*/
            isShowPage:true,
            tempbucketList:[],
            bucketTotal:0,
            pageSize:10,
            nowPage:1,
            /*过滤后的数组*/
            filterArr:[],
            /*是否显示创建bucket的抽屉*/
            isShowCreateBucket:{
                showorHide:false
            }
        }
    },
    created:function() {

    },
    mounted(){

    },
    computed:{
        getbucket(){
            if(this.filterArr.length){
                this.bucketTotal = this.filterArr.length;
                if(this.bucketTotal <= 10){
                    this.isShowPage = false;
                    return this.filterArr;
                }else{
                    this.isShowPage = true;
                    return this.filterArr.slice((this.nowPage - 1)*this.pageSize,this.pageSize*this.nowPage);
                }
            }else{
                this.tempbucketList = this.$store.state.Buckets.buckets.result;
                this.bucketTotal = this.tempbucketList.length;
                if(this.bucketTotal <= 10){
                    this.isShowPage = false;
                    return this.$store.state.Buckets.buckets.result;
                }else{
                    this.isShowPage = true;
                    return this.$store.state.Buckets.buckets.result.slice((this.nowPage - 1)*this.pageSize,this.pageSize*this.nowPage);
                }
            }
        }
    },
    methods:{
        changePage(n){
            this.nowPage = n;
        },
        addEventFilter(val){
            this.filterArr = this.tempbucketList.filter(item=>{
                return this.countSubstr(item,val) != 0;
            })

        },
        /*正则匹配*/
        countSubstr(str, substr) {
        var reg = new RegExp(substr, "g");
            //高亮要查找的字符串
            // str = str.replace(reg,"<mark>$1</mark>");
            // console.log(str)
            return str.match(reg) ? str.match(reg).length : 0;//若match返回不为null，则结果为true，输出match返回的数组(["test","test"])的长度
        },
        /*显示showbucketinfo*/
        showbucketinfo(info){
            this.$store.commit("SHOWBUCKETINFO",info)
        }
    },
    directives:{
        height:{
            // 指令的定义
            inserted: function (el,binding) {
                if(binding.arg == "allscreen"){
                    el.style.height = document.documentElement.clientHeight + "px";
                    window.onresize = function(){
                        el.style.height = document.documentElement.clientHeight + "px";
                        if( el.style.height <= "780px" ){
                            el.style.height = "780px";
                        }
                    }
                }

            } 
        }
    },
    components:{
        CreateBucket
    }
}
</script>