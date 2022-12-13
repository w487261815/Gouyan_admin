<template>
	<div id="main2" class="page" style="height:300px;">
	</div>
</template>

<script>
	import * as echarts from 'echarts';
	export default {
		data() {
			return {}
		},
		methods: {
			showLine1() {
				var myChart = echarts.init(document.getElementById('main2'));
				let option = {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['新增用户', '活跃用户', '充值用户', '当日订单', '当日收入']
					},
					calculable: true,
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						data: ['2022-11-30', '2022-12-01', '2022-12-02', '2022-12-03', '2022-12-04', '2022-12-05', '2022-12-06']
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [

						{
							color: ["#7EC0EE", "#FF9F7F", "#FFD700", "#C9C9C9", "#E066FF", "#C0FF3E"],
							name: '新增用户',
							type: 'line',
							stack: '总量',
							itemStyle: {
								normal: {
									areaStyle: {
										type: 'default'
									}
								}
							},
							data: [120, 132, 101, 134, 90, 230, 210]
						},
						{
							name: '活跃用户',
							type: 'line',
							stack: '总量',
							itemStyle: {
								normal: {
									areaStyle: {
										type: 'default'
									}
								}
							},
							data: [220, 182, 191, 234, 290, 330, 310]
						},
						{
							name: '充值用户',
							type: 'line',
							stack: '总量',
							itemStyle: {
								normal: {
									areaStyle: {
										type: 'default'
									}
								}
							},
							data: [150, 232, 201, 154, 190, 330, 410]
						},
						{
							name: '当日订单',
							type: 'line',
							stack: '总量',
							itemStyle: {
								normal: {
									areaStyle: {
										type: 'default'
									}
								}
							},
							data: [320, 332, 301, 334, 390, 330, 320]
						},
						{
							name: '当日收入',
							type: 'line',
							stack: '总量',
							itemStyle: {
								normal: {
									areaStyle: {
										type: 'default'
									}
								}
							},
							data: [820, 932, 901, 934, 1290, 1330, 1320]
						}
					]
				};

				myChart.setOption(option);
			},
		},
		computed: {},
		watch: {},
		mounted() {
			this.showLine1()
		}
	}
</script>

<style scoped>

</style>