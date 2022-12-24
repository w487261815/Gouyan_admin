<template>
	<div class="wrapperd">
		<div style="margin-left:10px;display: flex;align-items: center;">
			<div style="margin-left: 30px;">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item>狗眼电影后台</el-breadcrumb-item>
					<el-breadcrumb-item>{{name}}</el-breadcrumb-item>
				</el-breadcrumb>
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
				name: '系统首页',
				message: 2,
			};
		},
		computed: {

		},
		watch: {
			$route(newName, oldName) {
				this.name = newName.meta.title
			},
		},
		methods: {
			collapseChage() {

			}
		},
		mounted() {
			this.name = this.$route.meta.title

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