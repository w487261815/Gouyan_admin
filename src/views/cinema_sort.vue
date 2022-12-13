<template>
	<div style="padding: 20px;background-color: white;">
		<el-card shadow="never" style="padding: 5px 20px 5px 20px">
			<div style="display:flex;justify-content: space-between;align-items: baseline">
				<i class="el-icon-tickets">&nbsp;数据列表</i>
				<div>
					<el-button size="mini" @click="insert"><i class="el-icon-plus">添加</i></el-button>
					<el-button size="mini" @click="DelMore"><i class="el-icon-plus">批量删除</i></el-button>

					<el-dialog :title="title" :visible.sync="dialogVisible" width="25%" :before-close="handleClose">
						<div>
							<Dialog @hideAddDialog="hideAddDialog" @cancelAdd="closeAdd"></Dialog>
						</div>
					</el-dialog>
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
					<el-table-column label="内容" width="240">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.content}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="排序值" width="80">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.sort}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="添加时间" width="200">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.adddate}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="使用状态" width="120">
						<template slot-scope="scope">
							<div style="text-align: center;">
								<span v-if="scope.row.use=='true'" style="color: limegreen;">
									正常
								</span>
								<span v-else style="color: red;">
									禁用
								</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="类型" width="150">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.type}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="设置" width="150">
						<template slot-scope="scope">
							<div style="text-align: center;">
								<el-button v-if="scope.row.level<3 && scope.row.type=='行政区'" size="mini" @click="runLevel(scope.row)">查看下级</el-button>
								<el-button v-else size="mini" disabled>查看下级</el-button>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" @click="change(scope.row)">修改分类</el-button>
							<el-button @click="DelOnly(scope.row.id)" size="mini" type="danger">删除分类</el-button>
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
	import { getCinemaBrand, addCinemaBrand, delCinemaBrand, updateCinemaBrand, updateSta } from '@/service/cinemabrand'
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
				level: 0,
			};
		},
		methods: {
			...mapMutations([
				'setclassify',
				'settype'
			]),
			async UpdateStatus(type, params) {
				const {
					resultCode
				} = await updateSta(type, params)
				if(resultCode == 200) {
					this.getClassify()
					this.$message({
						type: 'success',
						message: this.value
					});
				}
			},
			runLevel(i) {
				console.log(i)
				this.page.current = 1
				this.level = i.id
				this.getClassify()
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
						this.DeleteClassify(Ids)
					}
					if(this.value == 3) {
						this.UpdateStatus(2, {
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
				this.DeleteClassify(Ids)
			},
			DelMore() {
				let Ids = new Array();
				for(let i = 0; i < this.multipleTable.length; i++) {
					Ids.push(this.multipleTable[i].id)
				}
				this.DeleteClassify(Ids)
			},
			change(i) {
				let type = [{
						value: '品牌',
						label: '品牌'
					}, {
						value: '行政区',
						label: '行政区'
					}, {
						value: '影厅类型',
						label: '影厅类型'
					},
					{
						value: '影院服务',
						label: '影院服务'
					},
					{
						value: '放映时间',
						label: '放映时间'
					}
				]
				this.settype(type)
				this.title = '修改分类'
				console.log(i)
				let obj = {
					sort: i.sort,
					content: i.content,
					type: i.type,
					id: i.id
				}
				this.setclassify(obj)
				this.dialogVisible = true;
				console.log(i)
			},
			async DeleteClassify(i) {
				const {
					resultCode
				} = await delCinemaBrand({
					data: {
						ids: i
					}
				})
				if(resultCode == 200) {
					this.getClassify()
					this.$message({
						message: '删除成功',
						type: 'success'
					});
				}
			},
			handleSelectionChange(val) {
				this.multipleTable = val;
			},
			async hideAddDialog(b) {
				this.setclassify(this.classifyObj)
				if(this.title == '修改分类') {
					const {
						resultCode
					} = await updateCinemaBrand(this.classifyObj)
					if(resultCode == 200) {
						this.dialogVisible = false
						this.getClassify()
						this.$message({
							message: '修改成功',
							type: 'success'
						});
					}
				} else {
					console.log(this.classifyObj)
					this.classifyObj.parent_id = this.level
					const {
						resultCode
					} = await addCinemaBrand(this.classifyObj)
					if(resultCode == 200) {
						this.dialogVisible = false
						this.getClassify()
						this.$message({
							message: '添加成功',
							type: 'success'
						});
					}
				}

			},
			changPage(i) {
				this.page.current = 1
				this.page.pageSize = i
				this.$forceUpdate()
				this.getClassify()
				this.$forceUpdate()
			},
			currentChange(i) {
				this.page.current = i
				this.getClassify()
			},
			insert() {
				let type = [{
						value: '品牌',
						label: '品牌'
					}, {
						value: '行政区',
						label: '行政区'
					}, {
						value: '影厅类型',
						label: '影厅类型'
					},
					{
						value: '影院服务',
						label: '影院服务'
					},
					{
						value: '放映时间',
						label: '放映时间'
					}
				]
				this.settype(type)
				this.title = '添加分类'
				let obj = {
					sort: '',
					content: '',
					type: '',
				}
				this.setclassify(obj)
				console.log(obj)
				this.dialogVisible = true;
			},
			handleClose() {
				this.dialogVisible = false
			},
			add() {

			},
			async getClassify() {
				const {
					data,
					resultCode
				} = await getCinemaBrand({
					pageNumber: this.page.current,
					pageSize: this.page.pageSize,
					configType: this.level
				})
				this.classifydata = data.data
				this.page.totalSize = data.totalSize
				this.page.totalPage = data.pageSize * 10
			},
		},
		async mounted() {

			this.getClassify()
		}
	}
</script>

<style>

</style>