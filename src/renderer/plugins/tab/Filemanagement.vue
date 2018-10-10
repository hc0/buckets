<style lang='less' scoped>
	.filemanagement{
		height:700px;
		header{
			margin-bottom: 20px;
		}
	}
</style>
<template>
	<div class="filemanagement">
		<header>
			<Button :size="buttonSize" type="primary">上传文件</Button>
			<Button :size="buttonSize" type="primary">新建目录</Button>
			<Button :size="buttonSize" type="primary">授权</Button>
			<Button :size="buttonSize" type="primary">刷新</Button>
			<Dropdown style="margin-left: 20px">
				<Button type="primary">
					批量操作
					<Icon type="ios-arrow-down"></Icon>
				</Button>
				<DropdownMenu slot="list">
					<DropdownItem>下载</DropdownItem>
					<DropdownItem>删除</DropdownItem>
					<DropdownItem divided>导出URL列表</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</header>
		<Content>
			<v-table
	            is-horizontal-resize
	            column-width-drag
	            style="width:90%"
	            :columns="columns"
	            :table-data="tableData"
	            row-hover-color="#eee"
	            row-click-color="#edf7ff"
	            :select-all="selectALL"
	            :select-change="selectChange"
	            :select-group-change="selectGroupChange"
	            :cell-merge="cellMerge"
		    ></v-table>
		</Content>
	</div>
</template>
<script>
	import Vue from 'vue'
	export default {
		data(){
			return {
				buttonSize:"default",
				tableData: [
                    {"fileName":"**",_disabled:true},
                    {"fileName":"文件1","fileSize":"145kb","sType":"标准存储","updateTime":"2018-09-07 11:05"},
                    {"fileName":"文件2","fileSize":"145kb","sType":"标准存储","updateTime":"2018-09-07 11:05"},
                    {"fileName":"文件3","fileSize":"145kb","sType":"标准存储","updateTime":"2018-09-07 11:05"},
                    {"fileName":"文件4","fileSize":"145kb","sType":"标准存储","updateTime":"2018-09-07 11:05"},
                    {"fileName":"文件5","fileSize":"145kb","sType":"标准存储","updateTime":"2018-09-07 11:05"}
                ],
                columns: [
                	{width: 60, titleAlign: 'center',columnAlign:'center',type: 'selection',isResize:true},
                    {field: 'fileName', title: '文件名', width: 80, titleAlign: 'left', columnAlign: 'left',isResize:true},
                    {field: 'fileSize', title: '文件大小', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'sType', title: '存储类型', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'updateTime', title: '更新时间', width: 280, titleAlign: 'center', columnAlign: 'left',isResize:true}
                ]
			}
		},
		methods: {
			selectALL(selection){

                 console.log('select-aLL',selection);
             },

             selectChange(selection,rowData){
                 console.log('select-change',selection,rowData);
             },

             selectGroupChange(selection){
                 console.log('select-group-change',selection);
             },
             update(){
             	console.log(31232)
             },
             cellMerge(rowIndex,rowData,field){
				if (field === 'fileName' && rowData[field] === '**') {
                    return {
                        colSpan: 4,
                        rowSpan: 1,
                        content: '<span style="background:yellow;width:auto;height:20px;line-height:20px;display:inline-block;" click="fn">文件夹根 /<a href="javascript:void(0);" onclick="update()">编辑</a></span>',
                        componentName: ''

                    }
                }
             }
        }
	}
	window.update = ()=>{
		console.log(Vue.data)
	}
	// // 自定义列组件
 //    Vue.component('table-operation',{
 //        template:`<span>
 //        <a href="" @click.stop.prevent="update(rowData,index)">编辑</a>&nbsp;
 //        <a href="" @click.stop.prevent="deleteRow(rowData,index)">删除</a>
 //        </span>`,
 //        props:{
 //            rowData:{
 //                type:Object
 //            },
 //            field:{
 //                type:String
 //            },
 //            index:{
 //                type:Number
 //            }
 //        },
 //        methods:{
 //            update(){

 //               // 参数根据业务场景随意构造
 //               let params = {type:'edit',index:this.index,rowData:this.rowData};
 //               this.$emit('on-custom-comp',params);
 //            },

 //            deleteRow(){

 //                // 参数根据业务场景随意构造
 //                let params = {type:'delete',index:this.index};
 //                this.$emit('on-custom-comp',params);

 //            }
 //        }
 //    })
</script>