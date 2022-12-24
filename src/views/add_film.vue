<template>
	<div>
		<el-card shadow="never" style="padding: 20px;">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="电影类型" prop="type">
					<el-select multiple filterable allow-create default-first-option :multiple-limit="limits" style="width:280px" v-model="ruleForm.type" placeholder="请选择">
						<el-option v-for="(item,index) in ruleForm.types" :key="item.id" :label="item.content" :value="item.content">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="上映年代" prop="age">
					<el-select style="width:280px" v-model="ruleForm.age" placeholder="请选择">
						<el-option v-for="(item,index) in ruleForm.ages" :key="item.id" :label="item.content" :value="item.content">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="上映城市" prop="city">
					<el-select style="width:280px" v-model="ruleForm.city" placeholder="请选择">
						<el-option v-for="(item,index) in ruleForm.citys" :key="item.id" :label="item.content" :value="item.content">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="电影名称" prop="content">
					<el-input v-model="ruleForm.content" style="width: 280px;"></el-input>
				</el-form-item>
				<el-form-item label="上映时间" prop="showdate">
					<el-date-picker v-model="ruleForm.showdate" type="date" placeholder="选择日期" style="width: 280px;">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="主要演员" prop="name">
					<el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
						{{tag}}
					</el-tag>
					<div v-if="showAdd" style="display: inline;">
						<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
						</el-input>
						<el-button v-else class="button-new-tag" size="small" @click="showInput">新增演员</el-button>
					</div>
				</el-form-item>
				<el-form-item label="排序值" prop="sort">
					<el-input v-model="ruleForm.sort" style="width: 280px;"></el-input>
				</el-form-item>
				<el-form-item label="展示状态">
					<template>
						<el-radio v-model="ruleForm.check" label="1">使用</el-radio>
						<el-radio v-model="ruleForm.check" label="2">禁用</el-radio>
					</template>
				</el-form-item>
				<el-form-item label="电影图片" prop="imageUrl">
					<el-upload class="avatar-uploader" action="http://150.158.191.247:28089/admin-api/v1/uploadImg" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="ruleForm.imageUrl" :src="base_data['imgbase']+ruleForm.imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

			</el-form>
			<div style="margin-left: 100px;">
				<el-button type="primary" @click="submitForm('ruleForm')">{{buttonTitle}}</el-button>
			</div>

		</el-card>
	</div>
</template>

<script>
	import { getClassifies } from '@/service/classify'
	import { pathMap } from '@/until/index'
	import { addFilm, getFilmOnly, updateFilmOnly } from '@/service/films'
	export default {
		data() {
			return {
				buttonTitle: '立即创建',
				dynamicTags: [],
				inputVisible: false,
				inputValue: '',
				showAdd: true,
				base_data: [],
				film_base: [],
				ruleForm: {
					age: '',
					type: '',
					city: '',
					types: [],
					ages: [],
					citys: [],
					content: '',
					showdate: '',
					check: '1',
					sort: 0,
					imageUrl: '',
					imgSrc: '',
					typed: '',
				},
				limits: 3,
				rules: {
					type: [{
						required: true,
						message: '请选择电影类型',
						trigger: 'blur'
					}],
					city: [{
						required: true,
						message: '请选择上映城市',
						trigger: 'blur'
					}],
					age: [{
						required: true,
						message: '请选择上映年代',
						trigger: 'blur'
					}],
					showdate: [{
						required: true,
						message: '请输入电影上映时间',
						trigger: 'blur'
					}],
					content: [{
						required: true,
						message: '请输入电影名称',
						trigger: 'blur'
					}],
					sort: [{
						required: true,
						message: '请输入排序值',
						trigger: 'blur'
					}],
					imgsrc: [{
						required: true,
						message: '请选择图片',
						trigger: 'blur'
					}]
				}
			};
		},
		watch: {
			dynamicTags(newName, oldName) {
				if(newName.length >= 3)
					this.showAdd = false
				else
					this.showAdd = true
			},
		},
		methods: {

			handleAvatarSuccess(res, file) {
				this.ruleForm.imageUrl = res.message
				this.ruleForm.imgSrc = res.message
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			handleClose(tag) {
				this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
			},
			showInput() {
				this.inputVisible = true
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			handleInputConfirm() {
				let inputValue = this.inputValue;
				if(inputValue) {
					this.dynamicTags.push(inputValue);
				}
				this.inputVisible = false;
				this.inputValue = '';
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
						this.addfilms()
					} else {
						console.log(this.ruleForm)
						return false;
					}
				});
			},
			async addfilms() {
				let param = {
					img_src: this.ruleForm.imgSrc,
					sort: this.ruleForm.sort,
					age: this.ruleForm.age,
					city: this.ruleForm.city,
					type: this.getLists(this.ruleForm.type),
					actor: this.getLists(this.dynamicTags),
					content: this.ruleForm.content,
					showdate: typeof(this.ruleForm.showdate) == 'string' ? this.ruleForm.showdate : this.getTime(this.ruleForm.showdate),
					use: this.ruleForm.check == 1 ? 'true' : 'false'
				}
				if(this.buttonTitle == '立即创建') {
					const {
						data,
						resultCode
					} = await addFilm(param)
					if(resultCode == 200) {
						location.reload()
					}
				} else {
					const {
						data,
						resultCode
					} = await updateFilmOnly(this.film_base.id,param)
					if(resultCode == 200) {
						location.reload()
					}
				}
			},
			getTime(date) {
				return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
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
				console.log(this.ruleForm)
			},
			async getOnlyFilms(ids) {
				const {
					data,
					resultCode
				} = await getFilmOnly(ids)

				this.ruleForm.age = data.age
				this.ruleForm.type = data.typeList
				this.ruleForm.city = data.city
				this.ruleForm.content = data.content
				this.ruleForm.showdate = data.showdate.slice(0, 12)
				this.dynamicTags = data.actorList
				this.ruleForm.sort = data.sort
				this.ruleForm.imageUrl = data.img_src
				console.log(this.ruleForm.showdate.slice(0, 12))
				this.ruleForm.imgSrc = data.img_src
				this.film_base = data
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
			this.getclassifies()
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