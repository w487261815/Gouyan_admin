<template>
	<div>
		<div class="banner">
			<div class="wrapper">
				<div class="celeInfo-left">
					<div class="avatar-shadow">
						<img class="avatar" :src="base_data['imgbase']+database.img_src">
					</div>
				</div>
				<div class="celeInfo-left">
					<h1 style="font-size:27px;color: white;">{{database.content}}</h1>
					<span style="font-size:17px;color: white;">Boonie Bears: Guardian Code</span>
					<br><br>
					<span style="color: white;">{{database.type}}</span>
					<br><br>
					<span style="color: white;">{{database.city}}</span>
					<br><br>
					<span style="color: white;">{{database.show_date}}{{database.city}}上映</span>
					<br><br>
					<span style="color: white;">评分:9.5</span>
					<br><br>
					<span style="color: white;">演员:{{database.actor}}</span>
				</div>
			</div>
		</div>
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
						<el-table-column label="影院名称" width="200">
							<template slot-scope="scope">
								<div style="text-align: center;">
									<span>{{scope.row.cinema_name}}</span>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="语言" width="100">
							<template slot-scope="scope">
								<div style="text-align: center;">
									{{scope.row.language}}
								</div>
							</template>
						</el-table-column>
						<el-table-column label="地点" width="200">
							<template slot-scope="scope">
								<div style="text-align: center;">
									{{scope.row.screen}}
								</div>
							</template>
						</el-table-column>
						<el-table-column label="库存" width="100">
							<template slot-scope="scope">
								<div style="text-align: center;">
									{{scope.row.stock}}
								</div>
							</template>
						</el-table-column>
						<el-table-column label="上映时间" width="100">
							<template slot-scope="scope">
								<div style="text-align: center;">
									{{scope.row.show_time}}
								</div>
							</template>
						</el-table-column>
						<el-table-column label="价格" width="100">
							<template slot-scope="scope">
								<div style="text-align: center;">
									{{scope.row.price}}
								</div>
							</template>
						</el-table-column>
						<el-table-column label="开始时间" width="100">
							<template slot-scope="scope">
								<div style="text-align: center;">
									{{scope.row.start}}
								</div>
							</template>
						</el-table-column>
						<el-table-column label="结束时间" width="100">
							<template slot-scope="scope">
								<div style="text-align: center;">
									{{scope.row.end}}
								</div>
							</template>
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<div style="text-align: center;">
									<el-button size="mini" @click="change(scope.row)">修改商品</el-button>
									<el-button @click="DelOnly(scope.row.id)" size="mini" type="danger">删除商品</el-button>
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
	</div>
</template>

<script>
	import { pathMap } from '@/until/index'
	import { mapGetters, mapMutations } from 'vuex'
	import { getTicket, delTicket} from '@/service/ticket'
	export default {
		computed: {
			...mapGetters([
				'carouselObj',
				'typeObj'
			])
		},
		data() {

			return {
				database:[],
				ids: 0,
				base_data: [],
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
			};
		},
		methods: {
			...mapMutations([
				'setcarousel',
				'settype'
			]),
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
	
				});
			},
			DelOnly(i) {
				let Ids = new Array();
				Ids.push(i)
				this.DeleteTicket(Ids)
			},
			DelMore() {
				let Ids = new Array();
				for(let i = 0; i < this.multipleTable.length; i++) {
					Ids.push(this.multipleTable[i].id)
				}
				this.DeleteTicket(Ids)
			},
			async DeleteTicket(i) {
				const {
					resultCode
				} = await delTicket({
					data: {
						ids: i
					}
				})
				if(resultCode == 200) {
					this.getTicket()
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
				this.getTicket()
			},
			currentChange(i) {
				this.page.current = i
				this.getTicket()
			},
			change(i){
				this.$router.push({
					path: '/addticket',
					query: {
						id: this.$route.query.id,
						tid:i.id
					}
				})
			},
			insert() {
				this.$router.push({
					path: '/addticket',
					query: {
						id: this.$route.query.id
					}
				})
			},
			add() {

			},
			async getTicket() {
				const {
					data,
					resultCode
				} = await getTicket({
					pageNumber: this.page.current,
					pageSize: this.page.pageSize,
					configType: this.$route.query.id
				})
				this.database = data
				this.classifydata = data.list
				this.page.totalSize = data.totalSize
				this.page.totalPage = data.pageSize * 10
			},
		},
		async mounted() {
			this.base_data = pathMap
			this.getTicket()
		}
	}
</script>

<style scoped>
	.celeInfo-left .avatar-shadow .avatar {
		border: 4px solid #fff;
		height: 322px;
		width: 232px;
	}
	
	.celeInfo-left .avatar-shadow,
	.cinema-left .avatar-shadow {
		position: relative;
		margin: 0 30px;
		width: 240px;
		height: 330px;
		padding-bottom: 40px;
		background: url("http://rluy2ixw3.hn-bkt.clouddn.com/gouyan/shadow.png") no-repeat bottom;
	}
	
	.banner .wrapper .celeInfo-left {
		width: 300px;
		float: left;
		position: relative;
		top: 20px;
		overflow: hidden;
		z-index: 9;
	}
	
	.banner {
		width: 100%;
		min-width: 1200px;
		height: 370px;
		overflow: hidden;
		background: #392f59 url("http://rluy2ixw3.hn-bkt.clouddn.com/back.jpg") no-repeat 50%;
	}
	
	.banner .wrapper {
		width: 1200px;
		margin: 0 auto;
		height: 326px;
		position: relative;
	}
</style>