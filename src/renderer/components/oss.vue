<style lang='less' scoped>
	.oss{
		width: 100%;
		min-width: 1100px;
	}
</style>
<template>
	<div class="oss">
		<Row>
			<Col span="4">
				<Sidebar></Sidebar>
			</Col>
			<Col span="20">
				<ViewBucket v-if="$store.state.Buckets.isShowbucketinfo"></ViewBucket>
			</Col>
		</Row>
	</div>
</template>
<script>
	import Sidebar from "./Sidebar/Sidebar.vue";
	import ViewBucket from "./buekctTab/ViewBucket.vue";
	export default {
		data(){
			return {
				
			}
		},
		computed:{
		
		},
		components:{
			Sidebar,
			ViewBucket
		}
	}
</script>