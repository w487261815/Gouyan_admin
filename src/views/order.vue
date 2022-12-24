<template>
	<div style="padding: 20px;background-color: white;">
		<el-card shadow="never" style="padding: 5px 20px 5px 20px">
			<div style="display:flex;justify-content: space-between;align-items: baseline">
				<i class="el-icon-tickets">&nbsp;数据列表</i>
				<div style="display: flex;">
					<el-select @change="changeType" size="small" style="width:200px;margin-right: 10px;" v-model="searchForm.type" placeholder="请选择">
						<el-option v-for="item in optionsta" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-input @blur="blurs" style="width:200px;margin-right: 10px;" v-model="searchForm.ordernum" size="small" placeholder="请输入订单号"></el-input>
					<el-button size="mini" @click="checkdone"><i class="el-icon-plus">配货完成</i></el-button>
					<el-button size="mini" @click="checkout"><i class="el-icon-plus">出库</i></el-button>
					<el-button size="mini" @click="Close"><i class="el-icon-plus">关闭订单</i></el-button>
				</div>

			</div>
		</el-card>
		<div style="margin-top: 20px;">
			<template>
				<el-table :data="classifydata" ref="multipleTable" :border="true" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55">

					</el-table-column>
					<el-table-column label="订单号" width="200">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.order_no}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="订单总价" width="150">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.total_price}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="订单状态" width="150">
						<template slot-scope="scope">
							<div style="text-align: center;">
								<span v-if="scope.row.pay_status==1">
									待支付
								</span>
								<span v-else-if="scope.row.pay_status==2">
									已支付
								</span>
								<span v-else-if="scope.row.pay_status==3">
									配货完成
								</span>
								<span v-else-if="scope.row.pay_status==4">
									出库成功
								</span>
								<span v-else-if="scope.row.pay_status==5">
									交易成功
								</span>
								<span v-else-if="scope.row.pay_status==6">
									订单关闭
								</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="支付方式" width="150">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.pay_type}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="商品类型" width="150">
						<template slot-scope="scope">
							<div style="text-align: center;">
								<span v-if="scope.row.ticket_status=='1'" style="color: limegreen;">
									电影票
								</span>
								<span v-else style="color: limegreen;">
									商品
								</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" width="200">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.create_time}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<div style="text-align: center;">
								<el-button size="mini" @click="goDetail(scope.row)">订单详情</el-button>
								<el-button @click="closeOnly(scope.row)" size="mini" type="danger">关闭订单</el-button>
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
	import { mapGetters, mapMutations } from 'vuex'
	import { getOrders ,checkDone, checkOut, close } from '@/service/order'
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
				title: '',
				dialogVisible: false,
				multipleTable: [],
				classifydata: [],
				tableData: {
					classifydata: [],
				},
				searchForm:{
					type:'',
					ordernum:'',
				},
				optionsta: [{
						value: 0,
						label: "全部"
					},
					{
						value: 1,
						label: "待支付"
					},
					{
						value: 2,
						label: "已支付"
					},
					{
						value: 3,
						label: "配货完成"
					},
					{
						value: 4,
						label: "出库成功"
					},
					{
						value: 5,
						label: "交易成功"
					},
					{
						value: 6,
						label: "订单关闭"
					}
					
				],
				options: [{
						value: 1,
						label: "批量配货"
					},
					{
						value: 2,
						label: "批量出库"
					},
					{
						value: 3,
						label: "批量关闭"
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
			goDetail(i){
				this.$router.push({
					path: '/order_detail',
					query: {
						id: i.order_id
					}
				})
				console.log(i.order_id)
			},
			async checkdone(){
				let Ids = new Array();
				for(let i = 0; i < this.multipleTable.length; i++) {
					Ids.push(this.multipleTable[i].order_id)
				}
				const {
					resultCode
				} = await checkDone({
					ids: Ids
				})
				if(resultCode == 200) {
					this.getOrders()
					this.$message({
						message: '配货成功',
						type: 'success'
					});
				}
			},
			async checkout(){
				let Ids = new Array();
				for(let i = 0; i < this.multipleTable.length; i++) {
					Ids.push(this.multipleTable[i].order_id)
				}
				const {
					resultCode
				} = await checkOut({
					ids: Ids
				})
				if(resultCode == 200) {
					this.getOrders()
					this.$message({
						message: '出库成功',
						type: 'success'
					});
				}
			},
			async closeOnly(i){
				let Ids = new Array();
				Ids.push(i.order_id)
				const {
					resultCode
				} = await close({
					ids: Ids
				})
				if(resultCode == 200) {
					this.getOrders()
					this.$message({
						message: '关闭成功',
						type: 'success'
					});
				}
			},
			async Close(){
				let Ids = new Array();
				for(let i = 0; i < this.multipleTable.length; i++) {
					Ids.push(this.multipleTable[i].order_id)
				}
				const {
					resultCode
				} = await close({
					ids: Ids
				})
				if(resultCode == 200) {
					this.getOrders()
					this.$message({
						message: '关闭成功',
						type: 'success'
					});
				}
			},
			changeType(){
				this.getOrders()
			},
			blurs(){
				this.getOrders()
			},
			...mapMutations([
				'setclassify',
				'settype'
			]),
			async UpdateStatus(type, params) {
				const {
					resultCode
				} = await updateSta(type, params)
				if(resultCode == 200) {
					this.getOrders()
					this.$message({
						type: 'success',
						message: this.value
					});
				}
			},
			open() {
				if(this.value == '') {
					this.$message({
						message: '请选择操作类型！',
						type: 'warning'
					});
					return
				}
				this.$confirm('是否执行该批量操作', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(this.value == 1) {
						this.checkdone()
					}
					if(this.value == 2) {
						this.checkout() 
					}
					if(this.value == 3) {
						this.Close()
					}
				});
			},
			handleSelectionChange(val) {
				this.multipleTable = val;
			},
			changPage(i) {
				this.page.current = 1
				this.page.pageSize = i
				this.getOrders()
			},
			currentChange(i) {
				this.page.current = i
				this.getOrders()
			},
			add() {

			},
			async getOrders() {
				const {
					data,
					resultCode
				} = await getOrders({
					pageNumber: this.page.current,
					pageSize: this.page.pageSize,
					configType: this.searchForm.type,
					configType2: this.searchForm.ordernum
				})
				this.classifydata = data.data
				this.page.totalSize = data.totalSize
				this.page.totalPage = data.pageSize * 10
			},
		},
		async mounted() {

			this.getOrders()
		}
	}
</script>

<style>

</style>