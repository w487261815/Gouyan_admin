<template>
	<div>
		<div style="width:100%;min-height:500px;">
			<el-row :gutter="10">
				<el-col :span="6">
					<el-card style="height:200px" shadow="never">
						<div style="justify-content: space-between;line-height:25px;padding: 10px;border-bottom: 2px solid #eee;display: flex;">
							<span>访问量</span>
							<el-tag size="medium" type="success">日</el-tag>
						</div>
						<div style="padding: 20px;border-bottom: 2px solid #eee;height:60px">
							<span style="font-size: 1.875rem;line-height: 2.25rem;">
								40,880
							</span>
							<div style="font-size:14px;display: flex;margin-top: 10px;justify-content: space-between;">
								<span>
									日同比 55%
								</span>
								<span>
									周同比 55%
								</span>
							</div>
						</div>
						<div style="padding:0 20px 0 20px">
							<div style="font-size:14px;display: flex;margin-top: 10px;justify-content: space-between;">
								<span>
									总访问量
								</span>
								<span>
									392,727
								</span>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="6">
					<el-card style="height:200px" shadow="never">
						<div style="justify-content: space-between;line-height:25px;padding: 10px;border-bottom: 2px solid #eee;display: flex;">
							<span>销售额</span>
							<el-tag size="medium">周</el-tag>
						</div>
						<div style="padding: 20px;border-bottom: 2px solid #eee;height:60px">
							<span style="font-size: 1.875rem;line-height: 2.25rem;">
								40,880
								<el-progress :percentage="50" :stroke-width="16"></el-progress>
							</span>

						</div>
						<div style="padding:0 20px 0 20px">
							<div style="font-size:14px;display: flex;margin-top: 10px;justify-content: space-between;">
								<span>
									总销售额
								</span>
								<span>
									392,727
								</span>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="6">
					<el-card style="height:200px" shadow="never">
						<div style="justify-content: space-between;line-height:25px;padding: 10px;border-bottom: 2px solid #eee;display: flex;">
							<span>订单量</span>
							<el-tag size="medium" type="warning">周</el-tag>
						</div>
						<div style="padding: 20px;border-bottom: 2px solid #eee;height:60px">
							<span style="font-size: 1.875rem;line-height: 2.25rem;">
								20,487
							</span>
							<div style="font-size:14px;display: flex;margin-top: 10px;justify-content: space-between;">
								<span>
									日同比 53%
								</span>
								<span>
									周同比 53%
								</span>
							</div>
						</div>
						<div style="padding:0 20px 0 20px">
							<div style="font-size:14px;display: flex;margin-top: 10px;justify-content: space-between;">
								<span>
									总访问量
								</span>
								<span>
									392,727
								</span>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="6">
					<el-card style="height:200px" shadow="never">
						<div style="justify-content: space-between;line-height:25px;padding: 10px;border-bottom: 2px solid #eee;display: flex;">
							<span>语言详情</span>
							<el-tag size="medium" type="danger">月</el-tag>
						</div>

						<div style="padding: 20px;border-bottom: 2px solid #eee;height:60px">
							<span>Java</span>
							<el-progress :text-inside="true" :stroke-width="16" :percentage="70"></el-progress>
							<span>Vue</span>
							<el-progress :text-inside="true" :stroke-width="16" :percentage="100" status="success"></el-progress>
						</div>
						<div style="padding:0 20px 0 20px">
							<div style="font-size:14px;display: flex;margin-top: 10px;justify-content: space-between;">
								<span>
									总技术数
								</span>
								<span>
									20
								</span>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="3" style="margin-top: 20px;text-align: center;">
					<a href="javascript:void" style="display: block;">
						<el-card shadow="never" style="height:120px">
							<i class="el-icon-user-solid" style="margin:20px 0 0 0;font-size: 30px;color: rgb(64, 158, 255);"></i>
							<div style="margin:10px 0 20px 0">
								<span>用户</span>
							</div>
						</el-card>
					</a>
				</el-col>
				<el-col :span="3" style="margin-top: 20px;text-align: center;">
					<a href="javascript:void" style="display: block;">
						<el-card shadow="never" style="height:120px">
							<i class="el-icon-video-camera" style="margin:20px 0 0 0;font-size: 30px;color: rgb(64, 158, 255);"></i>
							<div style="margin:10px 0 20px 0">
								<span>影院</span>
							</div>
						</el-card>
					</a>
				</el-col>
				<el-col :span="3" style="margin-top: 20px;text-align: center;">
					<a href="javascript:void" style="display: block;">
						<el-card shadow="never" style="height:120px">
							<i class="el-icon-s-ticket" style="margin:20px 0 0 0;font-size: 30px;color: rgb(255, 156, 110);"></i>
							<div style="margin:10px 0 20px 0">
								<span>订单</span>
							</div>
						</el-card>
					</a>
				</el-col>
				<el-col :span="3" style="margin-top: 20px;text-align: center;">
					<a href="javascript:void" style="display: block;">
						<el-card shadow="never" style="height:120px">
							<i class="el-icon-film" style="margin:20px 0 0 0;font-size: 30px;color: rgb(255, 156, 110);"></i>
							<div style="margin:10px 0 20px 0">
								<span>电影</span>
							</div>
						</el-card>
					</a>
				</el-col>
				<el-col :span="3" style="margin-top: 20px;text-align: center;">
					<a href="javascript:void" style="display: block;">
						<el-card shadow="never" style="height:120px">
							<i class="el-icon-pie-chart" style="margin:20px 0 0 0;font-size: 30px;color: rgb(179, 127, 235);"></i>
							<div style="margin:10px 0 20px 0">
								<span>图表</span>
							</div>
						</el-card>
					</a>
				</el-col>
				<el-col :span="3" style="margin-top: 20px;text-align: center;">
					<a href="javascript:void" style="display: block;">
						<el-card shadow="never" style="height:120px">
							<i class="el-icon-goods" style="margin:20px 0 0 0;font-size: 30px;color: rgb(179, 127, 235);"></i>
							<div style="margin:10px 0 20px 0">
								<span>商品</span>
							</div>
						</el-card>
					</a>
				</el-col>
				<el-col :span="3" style="margin-top: 20px;text-align: center;">
					<a href="javascript:void" style="display: block;">
						<el-card shadow="never" style="height:120px">
							<i class="el-icon-news" style="margin:20px 0 0 0;font-size: 30px;color: rgb(92, 219, 211);"></i>
							<div style="margin:10px 0 20px 0">
								<span>新闻</span>
							</div>
						</el-card>
					</a>
				</el-col>
				<el-col :span="3" style="margin-top: 20px;text-align: center;">
					<a href="javascript:void" style="display: block;">
						<el-card shadow="never" style="height:120px">
							<i class="el-icon-full-screen" style="margin:20px 0 0 0;font-size: 30px;color: rgb(92, 219, 211);"></i>
							<div style="margin:10px 0 20px 0">
								<span>预告片</span>
							</div>
						</el-card>
					</a>
				</el-col>

				<el-col :span="9" style="margin-top: 20px;">
					<el-card shadow="never">
						<div style="padding: 20px;display: flex;align-items: center;    border-bottom: 2px solid #ccc;">
							<img style="border-radius:50%;width:120px;height:120px" src="http://localhost:8080/static/img/img.146655c9.jpg">
							<div style="margin-left: 100px;">
								<span style="font-size: 30px;color: #222;">admin</span>
								<br>
								<span style="flex: 1;font-size: 14px;color: #999;">超级管理员</span>
							</div>
						</div>
						<div style="padding: 20px;">
							<div>
								<span style="flex: 1;font-size: 14px;color: #999;">上次登录时间</span>
								<span style="margin-left:30%;flex: 1;font-size: 14px;color: #999;">2022-12-6</span>
							</div>
							<div style="margin-top: 20px;">
								<span style="flex: 1;font-size: 14px;color: #999;">上次登录地点</span>
								<span style="margin-left:30%;flex: 1;font-size: 14px;color: #999;">江苏省苏州市</span>
							</div>
							
						</div>
					</el-card>
				</el-col>
				<el-col :span="15" style="margin-top: 20px;">
					<el-card shadow="never">
						<div style="border-bottom: 1px solid #ccc;padding:0 10px 0 10px;display: flex;justify-content: space-between;align-items: baseline">
							<span >用户留言</span>
							<el-button type="text">查看更多</el-button>
						</div>
						<div>
							<ul>
								<li>
									<div style="display: flex;align-items: center;border-bottom: 1px solid #ccc;">
										<div style="padding:7px 10px 7px 10px">
											<img style="border-radius:50%;width:50px;height:50px" src="http://localhost:8080/static/img/img.146655c9.jpg">
										</div>
										<div>
											<span>Ah Jung 刚才把工作台页面随便写了一些，凑合能看了！</span>
					
											<div style="margin-top: 10px;">
												<span style="flex: 1;font-size: 14px;color: #999;">2021-07-04 22:37:16</span>
											</div>
										</div>
									</div>
								</li>
								<li>
									<div style="display: flex;align-items: center;border-bottom: 1px solid #ccc;">
										<div style="padding:10px">
											<img style="border-radius:50%;width:50px;height:50px" src="http://localhost:8080/static/img/img.146655c9.jpg">
										</div>
										<div>
											<span>Ah Jung 刚才把工作台页面随便写了一些，凑合能看了！</span>
					
											<div style="margin-top: 10px;">
												<span style="flex: 1;font-size: 14px;color: #999;">2021-07-04 22:37:16</span>
											</div>
										</div>
									</div>
								</li>
								<li>
									<div style="display: flex;align-items: center;border-bottom: 1px solid #ccc;">
										<div style="padding:10px">
											<img style="border-radius:50%;width:50px;height:50px" src="http://localhost:8080/static/img/img.146655c9.jpg">
										</div>
										<div>
											<span>Ah Jung 刚才把工作台页面随便写了一些，凑合能看了！</span>
					
											<div style="margin-top: 10px;">
												<span style="flex: 1;font-size: 14px;color: #999;">2021-07-04 22:37:16</span>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>

	</div>
</template>

<script>
</script>

<style>
	ul{
		padding: 0px !important;
		margin: 0px !important;
	}
	.grid-content .bg-purple {
		background-color: rgb(255, 255, 255) !important;
	}
	
	.el-tag {
		font-size: 14px;
		padding-left: 5px !important;
		padding-right: 5px !important;
	}
	
	.el-row {
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}
	
	.el-col {
		border-radius: 4px;
	}
	
	.bg-purple-dark {
		background: #99a9bf;
	}
	
	.bg-purple {
		background: rgb(255, 255, 255);
	}
	
	.bg-purple-light {
		background: #e5e9f2;
	}
	
	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
	
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
</style>