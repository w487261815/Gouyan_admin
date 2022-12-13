<template>
	<div class="wrapperd">
		<div style="margin-left:10px;display: flex;align-items: center;">
			<div class="collapse-btn" @click="collapseChage">
				<i v-if="!collapse" class="el-icon-s-fold"></i>
				<i v-else class="el-icon-s-unfold"></i>
			</div>
			<div style="margin-left: 30px;">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item>活动列表</el-breadcrumb-item>
					<el-breadcrumb-item>活动详情</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div style="display: flex;align-items: center;">
			<div style="font-size: 20px;">
				<i class="el-icon-edit"></i>
				<i class="el-icon-share"></i>
				<i class="el-icon-delete"></i>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				collapse: false,
				fullscreen: false,
				name: 'linxin',
				message: 2
			};
		},
		computed: {

		},
		methods: {
			collapseChage() {

			}
		},
		mounted() {

		}
	};
</script>

<style scoped>
	.collapse-btn {
		font-size: 20px;
	}
	
	.wrapperd {
		background-color: rgb(255,255,255);
		line-height: 64px;
		height: 64px;
		border-bottom: 2px solid #eee;
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: space-between
	}
</style>