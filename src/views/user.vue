<template>
	<div style="padding: 20px;background-color: white;">
		<el-card shadow="never" style="padding: 5px 20px 5px 20px">
			<div style="display:flex;justify-content: space-between;align-items: baseline">
				<i class="el-icon-tickets">&nbsp;数据列表</i>
				<div>
					<el-button size="mini" @click="locked(1)"><i class="el-icon-plus">禁用用户</i></el-button>
					<el-button size="mini" @click="locked(0)"><i class="el-icon-plus">解除禁用</i></el-button>
				</div>

			</div>
		</el-card>
		<div style="margin-top: 20px;">
			<template>
				<el-table :data="usersdata" ref="multipleTable" :border="true" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55">

					</el-table-column>
					<el-table-column label="昵称" width="200">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.nickname}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="用户名" width="200">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.username}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="身份状态" width="200">
						<template slot-scope="scope">
							<div style="text-align: center;">
								<span style="color: green;" v-if="scope.row.locked==0">
									正常
								</span>
								<span style="color: red;" v-else>
									禁用
								</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="是否注销" width="200">
						<template slot-scope="scope">
							<div style="text-align: center;">
								<span style="color: green;" v-if="scope.row.delete==0">
									正常
								</span>
								<span style="color: red;" v-else>
									禁用
								</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="注册时间" width="200">
						<template slot-scope="scope">
							<div style="text-align: center;">
								{{scope.row.create_time}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<div style="text-align: center;">
								<el-button size="mini" @click="resetpass(scope.row.id)">重置密码</el-button>
								<el-button @click="lockedOnly(1,scope.row.id)" size="mini" type="danger">禁用用户</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<br>
			<div style="display: flex;justify-content: space-between">
				<div>
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
	import { getUsers, updateSta, resetPass } from '@/service/users'
	import { addClassify, delClassify, updateClassify } from '@/service/classify'
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
				multipleTable: [],
				usersdata: [],
				tableData: {
					usersdata: [],
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
				'setclassify',
				'settype'
			]),
			async resetpass(i){
				const {
					resultCode
				} = await resetPass(i)
				if(resultCode == 200) {
					this.getUsers()
					this.$message({
						type: 'success',
						message: "重置成功"
					});
				}
	
			},
			lockedOnly(i,j){
				let Ids = new Array();
				Ids.push(j)
				this.UpdateStatus(i,{
					ids:Ids
				})
			},
			locked(i){
				let Ids = new Array();
				for(let i = 0; i < this.multipleTable.length; i++) {
					Ids.push(this.multipleTable[i].id)
				}
				this.UpdateStatus(i,{
					ids:Ids
				})
			},
			async UpdateStatus(type, ids) {
				const {
					resultCode
				} = await updateSta(type, ids)
				if(resultCode == 200) {
					this.getUsers()
					this.$message({
						type: 'success',
						message: "操作成功"
					});
				}
			},
			handleSelectionChange(val) {
				this.multipleTable = val;
			},
			changPage(i) {
				this.page.current = 1
				this.page.pageSize = i
				this.getUsers()
			},
			currentChange(i) {
				this.page.current = i
				this.getUsers()
			},
			add() {

			},
			async getUsers() {
				const {
					data,
					resultCode
				} = await getUsers({
					pageNumber: this.page.current,
					pageSize: this.page.pageSize
				})
				this.usersdata = data.data
				this.page.totalSize = data.totalSize
				this.page.totalPage = data.pageSize * 10
			},
		},
		async mounted() {

			this.getUsers()
		}
	}
</script>

<style>

</style>