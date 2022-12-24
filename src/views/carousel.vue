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
					<el-table-column label="轮播图" width="150">
						<template slot-scope="scope">
							<div style="text-align: center;">
								<img style="width:100px;height:60px" :src="base_data['imgbase']+scope.row.carousel_url">
							</div>
						</template>
					</el-table-column>
					<el-table-column label="跳转链接" width="240">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.redirect_url}}
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
					<el-table-column label="排序值" width="150">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.rank}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="添加时间" width="200">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.create_time}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<div style="text-align: center;">
								<el-button size="mini" @click="change(scope.row)">修改分类</el-button>
								<el-button @click="DelOnly(scope.row.id)" size="mini" type="danger">删除分类</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<br>
			<div style="display: flex;justify-content: space-between">
				<div>
					<template>
						<el-select limit='5' size="mini" v-model="value" placeholder="请选择">
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
	import { updateSta } from '@/service/classify'
	import { getCarousel, addCarousel, delCarousel,updateCarouselOnly } from '@/service/carousel'
	import Dialog from '@/components/Dialog/CarouselDialog.vue'
	export default {
		components: {
			Dialog
		},
		computed: {
			...mapGetters([
				'carouselObj',
				'typeObj'
			])
		},
		data() {

			return {
				ids:0,
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
			...mapMutations([
				'setcarousel',
				'settype'
			]),
			async UpdateStatus(type, params) {
				const {
					resultCode
				} = await updateSta(type, params)
				if(resultCode == 200) {
					this.getCarousel()
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
						this.DeleteCarousel(Ids)
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
				this.DeleteCarousel(Ids)
			},
			DelMore() {
				let Ids = new Array();
				for(let i = 0; i < this.multipleTable.length; i++) {
					Ids.push(this.multipleTable[i].id)
				}
				this.DeleteCarousel(Ids)
			},
			change(i) {
				this.title = '修改轮播图'
				this.ids=i.id
				let obj = {
					content:i.content,
					imageUrl:i.carousel_url,
					rank:i.rank,
					redirect_url:i.redirect_url
				}
				this.setcarousel(obj)
				this.dialogVisible = true;
			},
			async DeleteCarousel(i) {
				const {
					resultCode
				} = await delCarousel({
					data: {
						ids: i
					}
				})
				if(resultCode == 200) {
					this.getCarousel()
					this.$message({
						message: '删除成功',
						type: 'success'
					});
				}
			},
			handleSelectionChange(val) {
				this.multipleTable = val;
			},
			async hideAddDialog() {
				this.setcarousel(this.carouselObj)
				
				if(this.title == '修改轮播图') {
					const {
						resultCode
					} = await updateCarouselOnly(this.ids,this.carouselObj)
					if(resultCode == 200) {
						this.dialogVisible = false
						this.getCarousel()
						this.$message({
							message: '修改成功',
							type: 'success'
						});
					}
				} else {
					const {
						resultCode
					} = await addCarousel(this.carouselObj)
					if(resultCode == 200) {
						this.dialogVisible = false
						this.getCarousel()
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
				this.getCarousel()
			},
			currentChange(i) {
				this.page.current = i
				this.getCarousel()
			},
			insert() {
				this.title = '添加轮播图'
				let obj = {
					content:"",
					imageUrl:"",
					rank:"",
					redirect_url:""
				}
				this.setcarousel(obj)
				this.dialogVisible = true;
			},
			handleClose() {
				this.dialogVisible = false
			},
			add() {

			},
			async getCarousel() {
				const {
					data,
					resultCode
				} = await getCarousel({
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
			this.getCarousel()
		}
	}
</script>

<style>

</style>