<template>
	<div>
		<el-card shadow="never" style="padding: 20px;">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="行政地区" prop="city_id">
					<el-cascader @change="changeCity" v-model="ruleForm.city_id" style="width:280px" :props="props"></el-cascader>
				</el-form-item>
				<el-form-item label="选择影院" prop="cinema_id">
					<el-select style="width:280px" v-model="ruleForm.cinema_id" placeholder="请选择">
						<el-option v-for="(item,index) in cinemaList" :key="item.id" :label="item.cinema_name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="选择语言" prop="language">
					<el-select style="width:280px" v-model="ruleForm.language" placeholder="请选择">
						<el-option v-for="(item,index) in cinemaLanguage" :key="item.id" :label="item.label" :value="item.label">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="选择屏幕" prop="screen">
					<el-select style="width:280px" v-model="ruleForm.screen" placeholder="请选择">
						<el-option v-for="(item,index) in cinemaScreen" :key="item.id" :label="item.label" :value="item.label">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="库存" prop="stock">
					<el-input v-model="ruleForm.stock" style="width: 280px;"></el-input>
				</el-form-item>
				<el-form-item label="价格" prop="price">
					<el-input v-model="ruleForm.price" style="width: 280px;"></el-input>
				</el-form-item>
				<el-form-item label="放映日期" prop="show_time">
					<el-date-picker style="width: 280px;" type="date" placeholder="选择日期" v-model="ruleForm.show_time"></el-date-picker>
				</el-form-item>
				<el-form-item label="开始时间" prop="start">
					<el-input v-model="ruleForm.start" style="width: 280px;"></el-input>
				</el-form-item>
				<el-form-item label="结束时间" prop="end">
					<el-input v-model="ruleForm.end" style="width: 280px;"></el-input>
				</el-form-item>

			</el-form>
			<div style="margin-left: 100px;">
				<el-button type="primary" @click="submitForm('ruleForm')">{{buttonTitle}}</el-button>
			</div>

		</el-card>
	</div>
</template>

<script>
	import { pathMap } from '@/until/index'
	import { delTicket, addTicket, getOnlyTicket, updateTicketOnly} from '@/service/ticket'
	import { getFilmOnly, updateFilmOnly } from '@/service/films'
	import { getCinemaBrandCity, getCinemaBrandType } from '@/service/cinemabrand'
	import { getCinemaByCity } from '@/service/cinema'
	export default {
		data() {
			return {
				props: {
					lazy: true,
					async lazyLoad(node, resolve) {
						const {
							level = 0, value
						} = node;
						let params = {
							ConfigType: value || 0,
							pageNumber: 1,
							pageSize: 1000,
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
								leaf: level > 1 || item.childs == 'false'
							}))
							resolve(nodes);
						}, 500);
					}
				},
				buttonTitle: '立即创建',
				dynamicTags: [],
				inputVisible: false,
				inputValue: '',
				showAdd: true,
				base_data: [],
				film_base: [],
				base_types: [],
				cinemaList: [],
				cinemaScreen: [{
					id: 1,
					label: 'SPHEREX厅'
				},
				{
					id: 2,
					label: '1号厅'
				},
				{
					id: 3,
					label: '2号厅'
				},
				{
					id: 4,
					label: '3号厅'
				},
				{
					id: 5,
					label: '4号厅'
				},
				{
					id: 6,
					label: '5号厅'
				}],
				cinemaLanguage: [{
					id: 1,
					label: '国语2D'
				},
				{
					id: 2,
					label: '国语3D'
				},
				{
					id: 3,
					label: '原版2D'
				},
				{
					id: 4,
					label: '原版3D'
				}],
				ruleForm: {
					cinema_id:'',
					language:'',
					screen: '',
					stock: 10,
					price: 0,
					show_time: '',
					start: '',
					end: ''
				},
				limits: 3,
				rules: {
					cinema_id: [{
						required: true,
						message: '请选择影院',
						trigger: 'blur'
					}],
					language: [{
						required: true,
						message: '请选择语言类型',
						trigger: 'blur'
					}],
					screen: [{
						required: true,
						message: '请选择屏幕类型',
						trigger: 'blur'
					}],
					stock: [{
						required: true,
						message: '请输入电影库存',
						trigger: 'blur'
					}],
					price: [{
						required: true,
						message: '请输入价格',
						trigger: 'blur'
					}],
					show_time: [{
						required: true,
						message: '请选择放映时间',
						trigger: 'blur'
					}],
					start: [{
						required: true,
						message: '请输入开始时间',
						trigger: 'blur'
					}],
					end: [{
						required: true,
						message: '请输入结束时间',
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			async getByCity(i) {
				const {
					data,
					resultCode
				} = await getCinemaByCity(i)
				if(resultCode == 200) {
					this.cinemaList = data
				}
			},
			changeCity(i) {
				this.getByCity(i[i.length - 1])
			},
			handleAvatarSuccess(res, file) {
				this.ruleForm.imageUrl = res.message
				this.ruleForm.imgSrc = res.message
			},

			showInput() {
				this.inputVisible = true
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			getLists(s) {
				let str = ""
				for(let i = 0; i < s.length; i++) {
					str += s[i] + " "
				}
				return str
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						console.log(this.ruleForm)
						this.addTickets()
					} else {
						console.log(this.ruleForm)
						return false;
					}
				});
			},
			getTime(date) {
				return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
			},
			fixedContent(co) {
				let str = ""
				for(let i = 0; i < co.length; i++) {
					str += co[i] + " "
				}
				return str
			},
			async addTickets() {
				let param = this.ruleForm
				if(typeof(param.show_time)!='string'){
					param.show_time = this.getTime(param.show_time)
				}
				param.filmid = this.$route.query.id
				if(this.buttonTitle == '立即创建') {
					console.log("dssd")
					const {
						data,
						resultCode
					} = await addTicket(param)
					if(resultCode == 200) {
						location.reload()
					}
					console.log(param)
				} else {
					const {
						data,
						resultCode
					} = await updateTicketOnly(this.$route.query.tid, param)
					if(resultCode == 200) {
						location.reload()
					}
				}
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			async getcinema_brand(type, params) {
				const {
					data,
					resultCode
				} = await getCinemaBrandType()
				this.base_types = data
				console.log(this.ruleForm)
			},
			async getOnlyTickets(ids) {
				const {
					data,
					resultCode
				} = await getOnlyTicket(ids)
				this.changeCity(data.city_id)
				this.ruleForm = data
				this.ruleForm.cinema_id = this.ruleForm.cinemaid
				/*this.ruleForm.brand_id = data.brand_id
				this.ruleForm.sort = data.sort
				this.ruleForm.content = data.content
				this.ruleForm.address = data.address

				this.ruleForm.serve_label = data.serve_list
				this.ruleForm.cinema_label = data.cinema_list
				this.ruleForm.city_id = data.city_list
				this.ruleForm.tel = data.tel
				this.ruleForm.use = (data.use == 'true') ? '1' : '0'
				this.ruleForm.low_money = data.low_money*/
				this.$forceUpdate()
			}
		},
		async mounted() {
			let pand = this.$route.query.tid
			if(pand != undefined) {
				this.buttonTitle = '立即修改'
				this.getOnlyTickets(pand)
			}
			this.base_data = pathMap
			this.getcinema_brand()
		}
	}
</script>

<style>
	.el-tag+.el-tag {
		margin-left: 10px;
	}
	
	.button-new-tag {
		margin-left: 10px;
		height: 32px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}
	
	.input-new-tag {
		width: 90px;
		margin-left: 10px;
		vertical-align: bottom;
	}
	
	.el-upload {
		width: 100px;
		height: 100px;
	}
	
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #ddd;
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
	}
	
	.avatar {
		width: 100px;
		height: 100px;
		display: block;
	}
</style>