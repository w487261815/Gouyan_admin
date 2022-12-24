<template>
	<div style="padding: 20px;background-color: white;">
		<el-card shadow="never" style="padding: 5px 20px 5px 20px">
			<div style="display:flex;justify-content: space-between;align-items: baseline">
				<i class="el-icon-search">&nbsp;数据筛选</i>
				<div>
					<el-button size="mini" @click="resetData"><i class="el-icon-delete">重置数据</i></el-button>
					<el-button size="mini" @click="searchData"><i class="el-icon-search">搜索查询</i></el-button>
				</div>
			</div>
			<div style="margin-left: 30px;margin-top: 10px;">
				<el-form style="display: flex;flex-wrap: wrap" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item style="margin-right: 40px;" label="影院名称">
						<el-input style="width:203px" size="mini" v-model="ruleForm.content"></el-input>
					</el-form-item>
					<el-form-item style="margin-right: 40px;" label="最低价格">
						<el-input style="width:203px" size="mini" v-model="ruleForm.low_money"></el-input>
					</el-form-item>
					<el-form-item style="margin-right: 40px;" label="影院品牌">
						<el-select style="width:203px" size="mini" v-model="ruleForm.brand_id" placeholder="请选择">
							<el-option v-for="(item,index) in base_types.brandlist" :key="item.id" :label="item.content" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item style="margin-right: 40px;" label="影院类型">
						<el-select style="width:203px" size="mini" v-model="ruleForm.label_id" placeholder="请选择">
							<el-option v-for="(item,index) in base_types.typelist" :key="item.id" :label="item.content" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item style="margin-right: 40px;" label="服务类型">
						<el-select style="width:203px" size="mini" v-model="ruleForm.serve_id" placeholder="请选择">
							<el-option v-for="(item,index) in base_types.servelist" :key="item.id" :label="item.content" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item style="margin-right: 40px;" label="行政地区">
						<el-cascader v-model="ruleForm.city_id" style="width:203px" size="mini" :props="props"></el-cascader>
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
				</div>

			</div>
		</el-card>
		<div style="margin-top: 20px;">
			<template>
				<el-table :data="classifydata" ref="multipleTable" :border="true" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55">

					</el-table-column>
					<el-table-column label="影院名称" width="180">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.cinema_name}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="影院地址" width="190">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.cinema_address}}
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
					<el-table-column label="影院标签" width="150">
						<template slot-scope="scope">
							<div style="text-align: center;">
								<div v-for="(item,index) in scope.row.label.slice(0,3)">
									<el-tag size="mini">
										{{item}}
									</el-tag>
								</div>
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
					<el-table-column label="服务类型" width="100">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.serve_label}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="手机号" width="150">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.cinema_tel}}
							</div>
						</template>
					</el-table-column>

					<el-table-column label="操作">
						<template slot-scope="scope">
							<div style="text-align: center;">
								<el-button size="mini" @click="changeFilm(scope.row)">修改影院</el-button>
								<el-button @click="DelOnly(scope.row.id)" size="mini" type="danger">删除影院</el-button>
							</div>
							<div style="text-align: center;margin-top: 10px;">
								<el-button size="mini" @click="">查看详情</el-button>
								<el-button @click="" size="mini" type="primary">查看票房</el-button>
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
	import { getCinema, delCinema, updateSta } from '@/service/cinema'
	import { getClassifies } from '@/service/classify'
	import { getCinemaBrandCity, getCinemaBrandType } from '@/service/cinemabrand'
	let id = 1
	export default {
		computed: {
			...mapGetters([
				'classifyObj',
				'typeObj',
				'filmSearchObj'
			])
		},
		data() {
			return {
				props: {
					lazy: true,
					async lazyLoad(node, resolve) {
						const {
							level = 0, value
						} = node;
						let params={
							ConfigType:value||0,
							pageNumber:1,
							pageSize:1000,
						}
						const {
							resultCode,
							data
						} = await getCinemaBrandCity(params)
						setTimeout(() => {
							const list = data.data
							const nodes = list.map(item => ({
								value: item.id,
								label: item.content,
								leaf: level > 1|| item.childs=='false'
							}))
							resolve(nodes);
						}, 500);
					}
				},
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
					brand_id: '',
					city_id: '',
					serve_id: '',
					label_id: '',
					content: '',
					low_money: '',
				},
				title: '',
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
				base_data: [],
				base_types: [],
			};
		},
		methods: {
			...mapMutations([
				'setclassify',
				'settype',
				'setfilmSearch',
			]),
			insert(){
				this.$router.push({
					path: '/addcinema'
				})
			},
			changeFilm(i) {
				this.$router.push({
					path: '/addcinema',
					query: {
						id: i.id
					}
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
			async ChangeSt(i, j) {
				const {
					data,
					resultCode
				} = await updateSta(i, {
					ids: j
				})
				if(resultCode == 200) {
					this.$message({
						type: 'success',
						message: "操作成功"
					});
				}
			},
			searchData() {
				console.log(this.ruleForm)
				let param = {
					pageNumber: 1,
					pageSize: this.page.pageSize,
					brand_id: this.ruleForm.brand_id,
					content: this.ruleForm.content,
					city_id: this.ruleForm.city_id==undefined?"":this.ruleForm.city_id[this.ruleForm.city_id.length-1],
					label_id: this.ruleForm.label_id,
					low_money: this.ruleForm.low_money,
					serve_id: this.ruleForm.serve_id,
				}
				this.setfilmSearch(param)
				this.page.current = 1
				this.getCinemas()
			},
			async UpdateStatus(type, params) {
				const {
					resultCode
				} = await updateSta(type, params)
				if(resultCode == 200) {
					this.getCinemas()
					this.$message({
						type: 'success',
						message: this.value
					});
				}
			},
			async GetCinemaBrandType() {
				const {
					data,
					resultCode
				} = await getCinemaBrandType()
				this.base_types = data
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
						this.ChangeSt(1, Ids)
					}
					if(this.value == 2) {
						this.DeleteFilms(Ids)
					}
					if(this.value == 3) {
						this.ChangeSt(0, Ids)
					}
					this.getCinemas()
				});
			},
			DelOnly(i) {
				let Ids = new Array();
				Ids.push(i)
				this.DeleteFilms(Ids)
			},
			DelMore() {
				let Ids = new Array();
				for(let i = 0; i < this.multipleTable.length; i++) {
					Ids.push(this.multipleTable[i].id)
				}
				this.DeleteFilms(Ids)
			},
			async DeleteFilms(i) {
				const {
					resultCode
				} = await delCinema({
					data: {
						ids: i
					}
				})
				if(resultCode == 200) {
					this.getCinemas()
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
				this.getCinemas()
			},
			currentChange(i) {
				this.page.current = i
				this.getCinemas()
			},
			add() {

			},
			async getCinemas() {
				this.filmSearchObj.pageNumber = this.page.current
				this.filmSearchObj.pageSize = this.page.pageSize
				const {
					data,
					resultCode
				} = await getCinema(this.filmSearchObj)
				this.classifydata = data.data
				this.page.totalSize = data.totalSize
				this.page.totalPage = data.pageSize * 10
			},
		},
		async mounted() {
			this.base_data = pathMap
			this.getCinemas()
			this.GetCinemaBrandType()
		}
	}
</script>

<style>

</style>