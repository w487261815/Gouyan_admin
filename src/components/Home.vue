<template>
	<div class="wrapper">
		<el-container>
			<el-aside width="200px">
				<SideBar/>
			</el-aside>
			<el-container style="padding: 0px!important;margin: 0px!important;">
				<el-header height="100px">
					<Header />
					<Tags />
				</el-header>
				<el-main>
					<div class="content">
						<router-view></router-view>
						<el-backtop target=".content"></el-backtop>
					</div>
				</el-main>
			</el-container>
		</el-container>

	</div>
</template>

<script>
	import SideBar from '@/components/SideBar.vue'
	import Header from '@/components/Header.vue'
	import Tags from '@/components/Tags.vue'
	export default {
		name: 'App',
		components: {
			SideBar,
			Header,
			Tags
		}
	}
</script>

<style>
	.content{
		padding: 0px;
		width:100%;
		overflow:none!important;
	}
	.el-card__body, .el-main {
  	  padding: 7px;
	}
</style>