<template>
	<div>
		<el-card shadow="never" style="padding: 20px;">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="品牌类型" prop="brand_id">
					<el-select  style="width:280px" v-model="ruleForm.brand_id" placeholder="请选择">
						<el-option v-for="(item,index) in base_types.brandlist" :key="item.id" :label="item.content" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="服务类型" prop="serve_label">
					<el-select multiple filterable allow-create default-first-option :multiple-limit="limits" style="width:280px" v-model="ruleForm.serve_label" placeholder="请选择">
						<el-option v-for="(item,index) in base_types.servelist" :key="item.id" :label="item.content" :value="item.content">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="影院类型" prop="cinema_label">
					<el-select multiple filterable allow-create default-first-option :multiple-limit="limits" style="width:280px" v-model="ruleForm.cinema_label" placeholder="请选择">
						<el-option v-for="(item,index) in base_types.typelist" :key="item.id" :label="item.content" :value="item.content">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="行政地区" prop="city_id">
						<el-cascader v-model="ruleForm.city_id" style="width:280px"  :props="props"></el-cascader>
				</el-form-item>
				<el-form-item label="影院名称" prop="content">
					<el-input v-model="ruleForm.content" style="width: 280px;"></el-input>
				</el-form-item>
				<el-form-item label="影院地址" prop="address">
					<el-input v-model="ruleForm.address" style="width: 280px;"></el-input>
				</el-form-item>
				<el-form-item label="排序值" prop="sort">
					<el-input v-model="ruleForm.sort" style="width: 280px;"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="tel">
					<el-input v-model="ruleForm.tel" style="width: 280px;"></el-input>
				</el-form-item>
				<el-form-item label="最低价格" prop="low_money">
					<el-input v-model="ruleForm.low_money" style="width: 280px;"></el-input>
				</el-form-item>
				<el-form-item label="展示状态">
					<template>
						<el-radio v-model="ruleForm.use" label="1">使用</el-radio>
						<el-radio v-model="ruleForm.use" label="2">禁用</el-radio>
					</template>
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
	import { addFilm, getFilmOnly, updateFilmOnly } from '@/service/films'
	import { getCinemaBrandCity, getCinemaBrandType } from '@/service/cinemabrand'
	import { addCinema, getCinemaOnly, updateCinemaOnly } from '@/service/cinema'
	export default {
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
				buttonTitle: '立即创建',
				dynamicTags: [],
				inputVisible: false,
				inputValue: '',
				showAdd: true,
				base_data: [],
				film_base: [],
				base_types: [],
				ruleForm: {
					brand_id: '',
					city_id: '',
					serve_label: '',
					cinema_label: '',
					content: '',
					low_money: '',
					address: '',
					tel: '',
					sort: 0,
					use:'1',
					city_list:'',
				},
				limits: 3,
				rules: {
					brand_id: [{
						required: true,
						message: '请选择品牌类型',
						trigger: 'blur'
					}],
					city_id: [{
						required: true,
						message: '请选择行政地区',
						trigger: 'blur'
					}],
					serve_label: [{
						required: true,
						message: '请选择服务类型',
						trigger: 'blur'
					}],
					cinema_label: [{
						required: true,
						message: '请输入影院类型',
						trigger: 'blur'
					}],
					content: [{
						required: true,
						message: '请输入影院名称',
						trigger: 'blur'
					}],
					sort: [{
						required: true,
						message: '请输入排序值',
						trigger: 'blur'
					}],
					low_money: [{
						required: true,
						message: '请输入最低价格',
						trigger: 'blur'
					}],
					address: [{
						required: true,
						message: '请输入排序值',
						trigger: 'blur'
					}],
					tel: [{
						required: true,
						message: '请输入最低价格',
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
		
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
						this.addfilms()
					} else {
						console.log(this.ruleForm)
						return false;
					}
				});
			},
			fixedContent(co){
				let str = ""
				for(let i = 0;i<co.length;i++){
					str+=co[i]+" "
				}
				return str
			},
			async addfilms() {
				let param = {
					brand_id: this.ruleForm.brand_id,
					address: this.ruleForm.address,
					cinema_label: this.fixedContent(this.ruleForm.cinema_label),
					city_id: this.ruleForm.city_id==undefined?"":this.ruleForm.city_id[this.ruleForm.city_id.length-1],
					content: this.ruleForm.content,
					low_money: this.ruleForm.low_money,
					tel: this.ruleForm.tel,
					sort: this.ruleForm.sort,
					serve_label: this.fixedContent(this.ruleForm.serve_label),
					use: this.ruleForm.check == 1 ? 'true' : 'false',
					city_list: this.ruleForm.city_id==undefined?"":this.ruleForm.city_id
				}
				if(this.buttonTitle == '立即创建') {
					const {
						data,
						resultCode
					} = await addCinema(param)
					if(resultCode == 200) {
						location.reload()
					}
					console.log(param)
				} else {
					const {
						data,
						resultCode
					} = await updateCinemaOnly(this.$route.query.id,param)
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
			async getOnlyFilms(ids) {
				const {
					data,
					resultCode
				} = await getCinemaOnly(ids)
				this.ruleForm.brand_id = data.brand_id
				this.ruleForm.sort = data.sort
				this.ruleForm.content = data.content
				this.ruleForm.address = data.address
				
				this.ruleForm.serve_label = data.serve_list
				this.ruleForm.cinema_label = data.cinema_list
				this.ruleForm.city_id = data.city_list
				this.ruleForm.tel = data.tel
				this.ruleForm.use = (data.use=='true')?'1':'0'
				this.ruleForm.low_money = data.low_money
				this.$forceUpdate()
			}
		},
		async mounted() {
			console.log(this.$route.query.id)
			let pand = this.$route.query.id
			
			if(pand != undefined) {
				this.buttonTitle = '立即修改'
				this.getOnlyFilms(pand)
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