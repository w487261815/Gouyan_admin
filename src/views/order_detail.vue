<template>
	<div style="padding: 20px;background-color: white;">
		<el-card shadow="never" style="padding: 5px 20px 5px 20px">
			<el-row :gutter="20">
				<el-col :span="8">
					<div class="grid-content bg-purple">
						<el-card style="height:120px" shadow="never">
							<div style="justify-content: space-between;line-height:25px;padding: 10px;border-bottom: 2px solid #eee;display: flex;">
								<span>订单状态</span>
							</div>
							<div style="padding: 20px 0 0 10px;">
								<span v-if="data_base.pay_status==1">
									待支付
								</span>
								<span v-else-if="data_base.pay_status==2">
									已支付
								</span>
								<span v-else-if="data_base.pay_status==3">
									配货完成
								</span>
								<span v-else-if="data_base.pay_status==4">
									出库成功
								</span>
								<span v-else-if="data_base.pay_status==5">
									交易成功
								</span>
								<span v-else-if="data_base.pay_status==6">
									订单关闭
								</span>
							</div>
						</el-card>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						<el-card style="height:120px" shadow="never">
							<div style="justify-content: space-between;line-height:25px;padding: 10px;border-bottom: 2px solid #eee;display: flex;">
								<span>创建时间</span>
							</div>
							<div style="padding: 20px 0 0 10px;">
								{{data_base.create_time}}
							</div>
						</el-card>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						<el-card style="height:120px" shadow="never">
							<div style="justify-content: space-between;line-height:25px;padding: 10px;border-bottom: 2px solid #eee;display: flex;">
								<span>订单号</span>
							</div>
							<div style="padding: 20px 0 0 10px;">
								{{data_base.order_no}}
							</div>
						</el-card>
					</div>
				</el-col>
			</el-row>
		</el-card>
		<div style="margin-top: 20px;">
			<template>
				<el-table :data="data_base.data" ref="multipleTable" :border="true" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55">

					</el-table-column>
					<el-table-column label="商品图片" width="120">
						<template slot-scope="scope">
							<div style="text-align: center;">
								<img style="width:60px;height:80px" :src="base_data['imgbase']+scope.row.img_src">
							</div>
						</template>
					</el-table-column>
					<el-table-column label="商品编号" width="150">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.ticket_id}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="商品内容" width="260">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.content}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="价格" width="200">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.price}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="商品数量" width="150">
						<template slot-scope="scope">
							<div style="text-align: center;">
								1
							</div>
						</template>
					</el-table-column>
					<el-table-column label="出售商">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.cinema_name}}
							</div>
						</template>
					</el-table-column>

				</el-table>
			</template>
			<br>
			<div style="display: flex;justify-content: space-between">
				<div>
					<template>
						<el-select size="mini" v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<template>
							<el-button @click="open" style="margin-left: 20px;" size="mini" type="primary">确定</el-button>
						</template>
					</template>
				</div>
				<div style="display: flex;">
					<template>
						<div style="display: flex;align-items: baseline;margin-top: 3px;">
							<span style="font-size: 13px;margin-right: 20px;">共{{page.totalSize}}条</span>
							<el-select @change="changPage" style="margin-right:10px;width:93px" size="mini" v-model="page.pageSize" placeholder="请选择">
								<el-option v-for="item in page_choice" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</template>
					<el-pagination @current-change="currentChange" :current-page="page.current" background layout="prev, pager, next" :total="page.totalPage">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { pathMap } from '@/until/index'
	import { mapGetters, mapMutations } from 'vuex'
	import { getOrderDetail } from '@/service/order'
	import { getClassify, addClassify, delClassify, updateClassify, updateSta } from '@/service/classify'
	import Dialog from '@/components/Dialog/ClassifyDialog.vue'
	export default {
		components: {
			Dialog
		},
		computed: {
			...mapGetters([
				'classifyObj',
				'typeObj'
			])
		},
		data() {

			return {
				base_data: [],
				title: '',
				dialogVisible: false,
				multipleTable: [],
				classifydata: [],
				tableData: {
					classifydata: [],
				},
				data_base: [],
				options: [{
						value: 1,
						label: "批量禁用"
					},
					{
						value: 2,
						label: "批量删除"
					},
					{
						value: 3,
						label: "批量解除禁用"
					}
				],
				page_choice: [{
						value: 5,
						label: "5条/页"
					},
					{
						value: 10,
						label: "10条/页"
					},
					{
						value: 15,
						label: "15条/页"
					}
				],
				page: {
					totalCount: 0,
					current: 1,
					pageSize: 10,
					totalSize: 0,
					totalPage: 0
				},
				value: '',
			};
		},
		methods: {
			async getDetail() {
				const {
					data,
					resultCode
				} = await getOrderDetail(this.$route.query.id)
				this.data_base = data
			}
		},
		async mounted() {
			this.base_data = pathMap
			console.log(this.$route.query.id)
			this.getDetail()
		}
	}
</script>

<style>

</style>