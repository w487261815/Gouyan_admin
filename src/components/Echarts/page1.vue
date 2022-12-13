<template>
	<div shadow="never" id="main" class="page" style="height:250px;">
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
				var myChart = echarts.init(document.getElementById('main'));
				let option = {
					series: [{
						name: '影片分析',
						type: 'pie',
						radius: [10,
							100
						],
						labelLine:{
							length:1,
							length2:1
						},
						roseType: 'radius',
						data: [{
								value: 10,
								name: '爱情'
							},
							{
								value: 10,
								name: '喜剧'
							},
							{
								value: 15,
								name: '动画'
							},
							{
								value: 25,
								name: '剧情'
							},
							{
								value: 20,
								name: '武侠'
							},
							{
								value: 24,
								name: '动作'
							},
							{
								value: 19,
								name: '灾难'
							},
							{
								value: 28,
								name: '历史'
							}
						]
					}]
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