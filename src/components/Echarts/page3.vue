<template>
	<div shadow="never" id="main3" class="page" style="height:250px;">
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
				var myChart = echarts.init(document.getElementById('main3'));
				let option = {
					legend: {
						data: ['爱情', '喜剧', '动画', '历史', '武侠']
					},
					xAxis: [{
						type: 'value'
					}],
					yAxis: [{
						type: 'category',
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					}],
					series: [{
							name: '爱情',
							type: 'bar',
							stack: '总量',
							itemStyle: {
								normal: {
									label: {
										show: true,
										position: 'insideRight'
									}
								}
							},
							data: [320, 302, 301, 334, 390, 330, 320]
						},
						{
							name: '喜剧',
							type: 'bar',
							stack: '总量',
							itemStyle: {
								normal: {
									label: {
										show: true,
										position: 'insideRight'
									}
								}
							},
							data: [120, 132, 101, 134, 90, 230, 210]
						},
						{
							name: '动画',
							type: 'bar',
							stack: '总量',
							itemStyle: {
								normal: {
									label: {
										show: true,
										position: 'insideRight'
									}
								}
							},
							data: [220, 182, 191, 234, 290, 330, 310]
						},
						{
							name: '历史',
							type: 'bar',
							stack: '总量',
							itemStyle: {
								normal: {
									label: {
										show: true,
										position: 'insideRight'
									}
								}
							},
							data: [150, 212, 201, 154, 190, 330, 410]
						},
						{
							name: '武侠',
							type: 'bar',
							stack: '总量',
							itemStyle: {
								normal: {
									label: {
										show: true,
										position: 'insideRight'
									}
								}
							},
							data: [820, 832, 901, 934, 1290, 1330, 1320]
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