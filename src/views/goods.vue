<template>
	<div style="padding: 20px;background-color: white;">
		<el-card shadow="never" style="padding: 5px 20px 5px 20px">
			<div style="display:flex;justify-content: space-between;align-items: baseline">
				<i class="el-icon-tickets">&nbsp;数据列表</i>
				<div>
					<el-button size="mini" @click="insert"><i class="el-icon-plus">添加</i></el-button>
					<el-button size="mini" @click="DelMore"><i class="el-icon-plus">批量删除</i></el-button>
				</div>

			</div>
		</el-card>
		<div style="margin-top: 20px;">
			<template>
				<el-table :data="classifydata" ref="multipleTable" :border="true" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55">

					</el-table-column>
					<el-table-column label="编号" width="70">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.id}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="商品名" width="240">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.content}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="商品简介" width="240">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.intro}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="商品图片" width="120">
						<template slot-scope="scope">
							<div style="text-align: center;">
								<img style="width:80px;height:80px" :src="base_data['imgbase']+scope.row.img_src">
							</div>
						</template>
					</el-table-column>
					<el-table-column label="商品库存" width="110">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.stock}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="商品价格" width="110">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.selling_price}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="上架状态" width="120">
						<template slot-scope="scope">
							<div style="text-align: center;">
								<span v-if="scope.row.use=='true'" style="color: limegreen;">
									销售中
								</span>
								<span v-else style="color: red;">
									已下架
								</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<div style="text-align: center;">
								<div style="margin-bottom: 5px;">
									<el-button size="mini" @click="change(scope.row.id)">修改商品</el-button>
									<el-button @click="DelOnly(scope.row.id)" size="mini" type="danger">删除商品</el-button>
								</div>
								<div>
									<el-button size="mini">查看详情</el-button>
									<el-button v-if="scope.row.use=='true'" @click="changeS(0,scope.row.id)" size="mini" type="primary">商品下架</el-button>
									<el-button v-else @click="changeS(1,scope.row.id)" size="mini" type="primary">商品上架</el-button>
								</div>

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
	import { getGoods, delGoods, updateSta } from '@/service/goods'
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
				options: [{
						value: 1,
						label: "批量上架"
					},
					{
						value: 2,
						label: "批量删除"
					},
					{
						value: 3,
						label: "批量下架"
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
				level: 0,
			};
		},
		methods: {
			...mapMutations([
				'setclassify',
				'settype'
			]),
			change(i){
					this.$router.push({
					path: '/addgoods',
					query: {
						id: i
					}
				})
			},
			async UpdateStatus(type, params) {
				const {
					resultCode
				} = await updateSta(type, params)
				if(resultCode == 200) {
					this.getGoods()
					this.$message({
						type: 'success',
						message: "操作成功"
					});
				}
			},
			changeS(type,id){
				let Ids = new Array();
				Ids.push(id)
				this.UpdateStatus(type, {
					ids: Ids
				})
			},
			runLevel(i) {
				console.log(i)
				this.page.current = 1
				this.level = i.id
				this.getGoods()
			},
			open() {
				if(this.value == '') {
					this.$message({
						message: '请选择操作类型！',
						type: 'warning'
					});
					return
				}
				let Ids = new Array();
				for(let i = 0; i < this.multipleTable.length; i++) {
					Ids.push(this.multipleTable[i].id)
				}
				this.$confirm('是否执行该批量操作', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(this.value == 1) {
						this.UpdateStatus(1, {
							ids: Ids
						})
					}
					if(this.value == 2) {
						this.DeleteGoods(Ids)
					}
					if(this.value == 3) {
						this.UpdateStatus(0, {
							ids: Ids
						})
					}
				});
			},
			closeAdd() {
				this.dialogVisible = false
			},
			DelOnly(i) {
				let Ids = new Array();
				Ids.push(i)
				this.DeleteGoods(Ids)
			},
			DelMore() {
				let Ids = new Array();
				for(let i = 0; i < this.multipleTable.length; i++) {
					Ids.push(this.multipleTable[i].id)
				}
				this.DeleteGoods(Ids)
			},
			async DeleteGoods(i) {
				const {
					resultCode
				} = await delGoods({
					data: {
						ids: i
					}
				})
				if(resultCode == 200) {
					this.getGoods()
					this.$message({
						message: '删除成功',
						type: 'success'
					});
				}
			},
			handleSelectionChange(val) {
				this.multipleTable = val;
			},
			changPage(i) {
				this.page.current = 1
				this.page.pageSize = i
				this.$forceUpdate()
				this.getGoods()
				this.$forceUpdate()
			},
			currentChange(i) {
				this.page.current = i
				this.getGoods()
			},
			insert() {
				this.$router.push({
					path: '/addgoods'
				})
			},
			handleClose() {
				this.dialogVisible = false
			},
			add() {

			},
			async getGoods() {
				const {
					data,
					resultCode
				} = await getGoods({
					pageNumber: this.page.current,
					pageSize: this.page.pageSize
				})
				this.classifydata = data.data
				this.page.totalSize = data.totalSize
				this.page.totalPage = data.pageSize * 10
			},
		},
		async mounted() {
			this.base_data = pathMap
			this.getGoods()
		}
	}
</script>

<style>

</style>