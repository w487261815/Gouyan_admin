<template>
	<div>
		<div style="min-height:700px">
			<el-row :gutter="20">
				<el-col :span="24" style="margin-bottom: 30px;">
					<el-card shadow="never">
						<div style="display: flex;">
							<page2 style="width:100%"></page2>
							<div>
								
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card shadow="never">
						<div style="display: flex;width:500px">
							<page1 style="width:300px"></page1>
							<div style="display: flex;flex-direction: column;justify-content: space-evenly">
								<div>
									<span style="font-size: 30px;color: rgb(45, 140, 240);">
										20000
									</span>
									<br>
									<span class="content_header border_color_blue" style="font-size:12px;">
										总电影数
									</span>
								</div>
								<div>
									<span style="font-size: 30px;color: rgb(242, 94, 67);">
										20000
									</span>
									<br>
									<span class="content_header" style="font-size:12px">
										总电影数
									</span>
								</div>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="16">
					<el-card shadow="never">
						<div style="display: flex;">
							<page3 style="width:100%"></page3>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import page1 from '@/components/Echarts/page1.vue'
	import page2 from '@/components/Echarts/page2.vue'
	import page3 from '@/components/Echarts/page3.vue'
	export default {
		name: 'App',
		components: {
			page1,
			page2,
			page3
		}
	}
</script>
<style>
	.border_color_red{
		border-left: 4px solid #f03d37 !important;
	}
	.border_color_green{
		border-left: 4px solid #67C23A !important;
	}
	.border_color_blue{
		border-left: 4px solid #0000FF !important;
	}
	.border_color_yellow{
		border-left: 4px solid orangered !important;
	}
	.content_header {
		font-size: 18px;
		color: #333;
		border-left: 4px solid #f03d37;
		padding-left: 6px;
		line-height: 18px;
		margin: 0;
		position: relative;
	}
</style>