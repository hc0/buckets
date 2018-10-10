<style lang='less' scoped>
	.drawer-footer{
		position: absolute;
		bottom:20px;
		right:20px;
	}
</style>
<template>
	<div>
		<Drawer
		    title="新建 Bucket"
		    v-model="isShowCreateBucket.showorHide"
		    width="720"
		    :mask-closable="false"
		    :styles="styles"
		>
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
			    <FormItem label="Bucket 名称" prop="bucketname">
			    	<Row>
			    		<Col span="10">
			        		<Input v-model="formValidate.bucketname" placeholder="请输入bucket名称"></Input>
			    		</Col>
			    	</Row>
			    </FormItem>
			    <FormItem label="区域" prop="area">
		    		<Row>
		    			<Col span="10">
		    	    		<Select v-model="formValidate.area" placeholder="请输入存储区域">
		    	    		    <Option value="华北1">华北1</Option>
		    	    		    <Option value="华北2">华北2</Option>
		    	    		    <Option value="华北3">华北3</Option>
		    	    		    <Option value="华北4">华北4</Option>
		    	    		    <Option value="华北5">华北5</Option>
		    	    		</Select>
		    			</Col>
		    			<Col span="16">
		    				<span>相同区域内的产品内网可以互通；订购后不支持更换区域，请谨慎选择</span>
		    			</Col>
		    		</Row>
			    </FormItem>
			    <FormItem label="存储类型" prop="storageType">
			    	<Row>
			    		<Col span="16">
			    			<RadioGroup v-model="formValidate.storageType" type="button">
			    			    <Radio label="standard">标准存储</Radio>
			    			    <Radio label="lowFrequency">低频访问</Radio>
			    			    <Radio label="archive">归档存储</Radio>
			    			</RadioGroup>
			    		</Col>
			    		<Col span="16">
			    			<span>归档：数据长期存储、基本不访问，存储单价低于低频访问型。</span>
			    		</Col>
			    	</Row>
			    </FormItem>
			    <FormItem label="读写权限" prop="permission">
			    	<Row>
			    		<Col span="16">
			    			<RadioGroup v-model="formValidate.permission" type="button">
			    			    <Radio label="private">私有</Radio>
			    			    <Radio label="publicReading">公共读</Radio>
			    			    <Radio label="publicReadingAndWriting">公共读写</Radio>
			    			</RadioGroup>
			    		</Col>
			    		<Col span="16">
			    			<span>私有：对文件的所有访问操作需要进行身份验证。</span>
			    		</Col>
			    	</Row>
			    </FormItem>
			    <FormItem label="标签" prop="tag">
			        <Input v-model="formValidate.tag" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输出一个标签"></Input>
			    </FormItem>
			</Form>
		    <div class="drawer-footer">
		        <Button @click="isShowCreateBucket.showorHide = false">取消</Button>
		        <Button @click="handleReset('formValidate')">重置</Button>
		        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
		    </div>
		</Drawer>    
	</div>
</template>
<script>
	export default {
		props:["isShowCreateBucket"],
		data(){
			return{
	            styles: {
	                height: 'calc(100% - 55px)',
	                overflow: 'auto',
	                paddingBottom: '53px',
	                position: 'static'
	            },
				formValidate: {
                    bucketname: '',
                    area: '',
                    storageType:"",
                    permission:"",
                    tag: ''
                },
                ruleValidate: {
                    bucketname: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                        {type: "string", required: true, pattern: /^[a-z0-9]+$/,message: '请输入英文和数字'},
                        {type: "string", required: true, pattern: /^\S{3,63}$/,message: '请输入 3-63 个字符'}
                    ],
                    area: [
                        { required: true, message: '请选择存储区域', trigger: 'change' }
                    ],
                    storageType: [
                        { required: true, message: '请选择存储类型', trigger: 'change' }
                    ],
                    permission: [
                        { required: true, message: '请选择权限类型', trigger: 'change' }
                    ],
                    tag:[
                    	{ required: true, message: '请输入一个标签', trigger: 'blur' },
                        { type: 'string', min: 2, max: 20, message: '请输入 2-20 个字符', trigger: 'blur' }
                    ]

                }
			}
		},
		methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('验证成功,并已提交!');
                        this.isShowCreateBucket.showorHide = false;
                    } else {
                        this.$Message.error('验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
	}
</script>