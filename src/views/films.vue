<template>
	<div style="padding: 20px;background-color: white;">
		<el-card shadow="never" style="padding: 5px 20px 5px 20px">
			<div style="display:flex;justify-content: space-between;align-items: baseline">
				<i class="el-icon-search">&nbsp;数据筛选</i>
				<div>
					<el-button size="mini" @click="resetData"><i class="el-icon-delete">重置数据</i></el-button>
					<el-button size="mini" @click="searchData"><i class="el-icon-search">搜索查询</i></el-button>

					<el-dialog :title="title" :visible.sync="dialogVisible" width="25%" :before-close="handleClose">
						<div>
							<Dialog @hideAddDialog="hideAddDialog" @cancelAdd="closeAdd"></Dialog>
						</div>
					</el-dialog>
				</div>
			</div>
			<div style="margin-left: 30px;margin-top: 10px;">
				<el-form style="display: flex;flex-wrap: wrap" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item style="margin-right: 40px;" label="电影名称">
						<el-input style="width:203px" size="mini" v-model="ruleForm.content"></el-input>
					</el-form-item>
					<el-form-item style="margin-right: 40px;" label="演员姓名">
						<el-input style="width:203px" size="mini" v-model="ruleForm.actor"></el-input>
					</el-form-item>
					<el-form-item style="margin-right: 40px;" label="标签类型">
						<el-select style="width:203px" size="mini" v-model="ruleForm.labelType" placeholder="请选择">
							<el-option v-for="(item,index) in labelType" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item style="margin-right: 40px;" label="电影类型">
						<el-select style="width:203px" size="mini" v-model="ruleForm.type" placeholder="请选择">
							<el-option v-for="(item,index) in ruleForm.types" :key="item.id" :label="item.content" :value="item.content">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item style="margin-right: 40px;" label="上映年代">
						<el-select style="width:203px" size="mini" v-model="ruleForm.age" placeholder="请选择">
							<el-option v-for="(item,index) in ruleForm.ages" :key="item.id" :label="item.content" :value="item.content">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item style="margin-right: 40px;" label="上映城市">
						<el-select style="width:203px" size="mini" v-model="ruleForm.city" placeholder="请选择">
							<el-option v-for="(item,index) in ruleForm.citys" :key="item.id" :label="item.content" :value="item.content">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
		<br>
		<el-card shadow="never" style="padding: 5px 20px 5px 20px">
			<div style="display:flex;justify-content: space-between;align-items: baseline">
				<i class="el-icon-tickets">&nbsp;数据操作</i>
				<div>
					<el-button size="mini" @click="insert"><i class="el-icon-plus">添加</i></el-button>
					<el-button size="mini" @click="DelMore"><i class="el-icon-delete">批量删除</i></el-button>

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
					<el-table-column label="电影图片" width="120">
						<template slot-scope="scope">
							<div style="text-align: center;">
								<img style="width:60px;height:80px" :src="base_data['imgbase']+scope.row.img_src">
							</div>
						</template>
					</el-table-column>
					<el-table-column label="电影名称" width="190">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.content}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="排序值" width="100">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.sort}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="上映时间" width="150">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.showdate.slice(0,12)}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="使用状态" width="100">
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
					<el-table-column label="类型" width="100">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.type}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="演员" width="100">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.actor}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="标签" width="150">
						<template slot-scope="scope">
							<div style="text-align: center;">
								<span>热映：</span>
								<el-switch @change="Changhot(scope.row)" active-value="1" inactive-value="0" v-model="scope.row.ishot" active-color="rgb(64,158,255)" inactive-color="rgb(220,223,230)">
								</el-switch>
							</div>
							<div style="text-align: center;margin-top: 10px;">
								<span>最新：</span>
								<el-switch @change="Changnew(scope.row)" active-value="1" inactive-value="0" v-model="scope.row.isnew" active-color="rgb(64,158,255)" inactive-color="rgb(220,223,230)">
								</el-switch>
							</div>
							<div style="text-align: center;margin-top: 10px;">
								<span>经典：</span>
								<el-switch @change="Changcla(scope.row)" active-value="1" inactive-value="0" v-model="scope.row.iscla" active-color="rgb(64,158,255)" inactive-color="rgb(220,223,230)">
								</el-switch>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<div style="text-align: center;">
								<el-button size="mini" @click="changeFilm(scope.row)">修改电影</el-button>
								<el-button @click="DelOnly(scope.row.id)" size="mini" type="danger">删除电影</el-button>
							</div>
							<div style="text-align: center;margin-top: 10px;">
								<el-button size="mini" @click="change(scope.row)">查看详情</el-button>
								<el-button @click="DelOnly(scope.row.id)" size="mini" type="primary">查看票房</el-button>
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
	import { getFilm, addClassify, delClassify, updateClassify, updateSta } from '@/service/films'
	import { getClassifies } from '@/service/classify'
	import Dialog from '@/components/Dialog/ClassifyDialog.vue'
	export default {
		components: {
			Dialog
		},
		computed: {
			...mapGetters([
				'classifyObj',
				'typeObj',
				'filmSearchObj'
			])
		},
		data() {
			return {
				labelType: [{
					value: '1',
					label: '热映电影'
				}, {
					value: '2',
					label: '最新电影'
				}, {
					value: '3',
					label: '经典电影'
				}],
				ruleForm: {
					actor: '',
					content: '',
					labelType: '',
					type: '',
					age: '',
					city: '',
					types: [],
					ages: [],
					citys: [],
				},
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
					},
					{
						value: 4,
						label: "设置批量热映"
					},
					{
						value: 5,
						label: "批量取消热映"
					},
					{
						value: 6,
						label: "设置批量最新"
					},
					{
						value: 7,
						label: "批量取消最新"
					},
					{
						value: 8,
						label: "设置批量经典"
					},
					{
						value: 9,
						label: "批量取消经典"
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
				base_data: [],
			};
		},
		methods: {
			...mapMutations([
				'setclassify',
				'settype',
				'setfilmSearch'
			]),
			changeFilm(i) {
				//console.log(this.$router.push('add_film'))
				this.$router.push('addfilm', query: {
					id: i.id
				})
			},
			resetData() {
				this.ruleForm.actor = ''
				this.ruleForm.content = ''
				this.ruleForm.labelType = ''
				this.ruleForm.type = ''
				this.ruleForm.age = ''
				this.ruleForm.city = ''
			},
			Changcla(i) {
				let Ids = new Array();
				Ids.push(i.id)
				console.log(i.iscla)
				this.ChangeSt(3, Ids, i.iscla)
			},
			Changnew(i) {
				let Ids = new Array();
				Ids.push(i.id)
				console.log(i.isnew)
				this.ChangeSt(2, Ids, i.isnew)
			},
			Changhot(i) {
				let Ids = new Array();
				Ids.push(i.id)
				console.log(i.ishot)
				this.ChangeSt(1, Ids, i.ishot)
			},
			async ChangeSt(i, j, k) {
				const {
					data,
					resultCode
				} = await updateSta(i, {
					ids: j,
					sta: k
				})
				if(resultCode == 200) {
					this.$message({
						type: 'success',
						message: "操作成功"
					});
				}
			},
			searchData() {
				let param = {
					pageNumber: 1,
					pageSize: this.page.pageSize,
					actor: this.ruleForm.actor,
					content: this.ruleForm.content,
					labelType: this.ruleForm.labelType,
					type: this.ruleForm.type,
					age: this.ruleForm.age,
					city: this.ruleForm.city,
				}
				this.setfilmSearch(param)
				this.page.current = 1
				this.getFilms()
			},
			async getclassifies(type, params) {
				const {
					data,
					resultCode
				} = await getClassifies()
				if(resultCode == 200) {
					this.ruleForm.types = data.type
					this.ruleForm.ages = data.age
					this.ruleForm.citys = data.city
				}
			},
			async UpdateStatus(type, params) {
				const {
					resultCode
				} = await updateSta(type, params)
				if(resultCode == 200) {
					this.getFilms()
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
						this.ChangeSt(4, Ids, 0)
					}
					if(this.value == 2) {
						this.DeleteClassify(Ids)
					}
					if(this.value == 3) {
						this.ChangeSt(4, Ids, 1)
					}
					if(this.value == 4) {
						this.ChangeSt(1, Ids, 1)
					}
					if(this.value == 5) {
						this.ChangeSt(1, Ids, 0)
					}
					if(this.value == 6) {
						this.ChangeSt(2, Ids, 1)
					}
					if(this.value == 7) {
						this.ChangeSt(2, Ids, 0)
					}
					if(this.value == 8) {
						this.ChangeSt(3, Ids, 1)
					}
					if(this.value == 9) {
						this.ChangeSt(3, Ids, 0)
					}
					this.getFilm()
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
					value: 'type',
					label: '类型'
				}, {
					value: 'city',
					label: '区域'
				}, {
					value: 'age',
					label: '年代'
				}]
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
				} = await delClassify({
					data: {
						ids: i
					}
				})
				if(resultCode == 200) {
					this.getFilms()
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
					} = await updateClassify(this.classifyObj)
					if(resultCode == 200) {
						this.dialogVisible = false
						this.getFilms()
						this.$message({
							message: '修改成功',
							type: 'success'
						});
					}
				} else {
					const {
						resultCode
					} = await addClassify(this.classifyObj)
					if(resultCode == 200) {
						this.dialogVisible = false
						this.getFilms()
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
				this.getFilms()
			},
			currentChange(i) {
				this.page.current = i
				this.getFilms()
			},
			insert() {
				let type = [{
					value: 'type',
					label: '类型'
				}, {
					value: 'city',
					label: '区域'
				}, {
					value: 'age',
					label: '年代'
				}]
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
			async getFilms() {
				this.filmSearchObj.pageNumber = this.page.current
				this.filmSearchObj.pageSize = this.page.pageSize
				const {
					data,
					resultCode
				} = await getFilm(this.filmSearchObj)
				this.classifydata = data.data
				this.page.totalSize = data.totalSize
				this.page.totalPage = data.pageSize * 10
			},
		},
		async mounted() {
			this.base_data = pathMap
			this.getFilms()
			this.getclassifies()
		}
	}
</script>

<style>

</style>