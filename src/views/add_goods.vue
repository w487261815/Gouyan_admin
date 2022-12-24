<template>
	<div>
		<el-card shadow="never" style="padding: 20px;">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="商品名称" prop="content">
					<el-input v-model="ruleForm.content" style="width: 280px;"></el-input>
				</el-form-item>
				<el-form-item label="商品简介" prop="intro">
					<el-input maxlength="100" style="width: 280px;" type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.intro">
					</el-input>
				</el-form-item>

				<el-form-item label="商品价格" prop="origin_price">
					<el-input type="number" v-model="ruleForm.origin_price" style="width: 280px;"></el-input>
				</el-form-item>
				<el-form-item label="商品售卖价" prop="selling_price">
					<el-input type="number" v-model="ruleForm.selling_price" style="width: 280px;"></el-input>
				</el-form-item>
				<el-form-item label="商品库存" prop="stock">
					<el-input max="50000" type="number" v-model="ruleForm.stock" style="width: 280px;"></el-input>
				</el-form-item>

				<el-form-item label="座机号" prop="tel">
					<el-input v-model="ruleForm.tel" style="width: 280px;"></el-input>
				</el-form-item>
				<el-form-item label="公司" prop="company">
					<el-input v-model="ruleForm.company" style="width: 280px;"></el-input>
				</el-form-item>
				<el-form-item label="商品主图" prop="imageUrl">
					<el-upload class="avatar-uploader" action="http://150.158.191.247:28089/admin-api/v1/uploadImg" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="ruleForm.imageUrl" :src="base_data['imgbase']+ruleForm.imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="图片轮播" prop="carousel">
					<el-upload :file-list="fileLists" id="lunbo" style="width:100px;" class="upload-demo" action="http://150.158.191.247:28089/admin-api/v1/uploadImg" :on-preview="handlePreview" :on-success="handleSuccess" :on-remove="handleRemove" list-type="picture">
						<el-button size="small" type="primary">点击上传</el-button>
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
	import { pathMap } from '@/until/index'
	import { addGood, getGoodOnly, updateGoodOnly } from '@/service/goods'
	export default {
		data() {
			return {
				fileLists: [],
				fileList:[],
				buttonTitle: '立即创建',
				inputVisible: false,
				inputValue: '',
				showAdd: true,
				base_data: [],
				film_base: [],
				ruleForm: {
					content: '',
					intro: '',
					origin_price: '',
					selling_price: '',
					stock: '',
					imageUrl: '',
					imgSrc: '',
					tel: '',
					company: '',
					carousel: [],
				},
				limits: 3,
				rules: {
					intro: [{
						required: true,
						message: '请输入商品介绍',
						trigger: 'blur'
					}],
					origin_price: [{
						required: true,
						message: '请输入原始价格',
						trigger: 'blur'
					}],
					selling_price: [{
						required: true,
						message: '请输入销售价格',
						trigger: 'blur'
					}],
					stock: [{
						required: true,
						message: '请输入库存数',
						trigger: 'blur'
					}],
					imageUrl: [{
						required: true,
						message: '你选择主图',
						trigger: 'blur'
					}],
					content: [{
						required: true,
						message: '请输入电影名称',
						trigger: 'blur'
					}],
					tel: [{
						required: true,
						message: '请输入座机号',
						trigger: 'blur'
					}],
					company: [{
						required: true,
						message: '请选择图片',
						trigger: 'blur'
					}]

				}
			};
		},
		methods: {
			handleRemove(i) {
				try{
					this.fileList = this.fileList.filter((num) => {
						return num != i.response.message;
					});
				}catch{
					this.fileList = this.fileList.filter((num) => {
						return num != i.name;
					});
				}
			},
			handleSuccess(i) {
				this.fileList.push(i.message)
			},
			handleAvatarSuccess(res, file) {
				this.ruleForm.imageUrl = res.message
				this.ruleForm.imgSrc = res.message
			},
			handlePreview() {

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
						this.addgoods()
					} else {
						return false;
					}
				});
			},
			async addgoods() {
				let param = {
					img_src: this.ruleForm.imgSrc,
					intro: this.ruleForm.intro,
					origin_price: this.ruleForm.origin_price,
					selling_price: this.ruleForm.selling_price,
					stock: this.ruleForm.stock,
					company: this.ruleForm.company,
					carousel: this.getLists(this.fileList),
					content: this.ruleForm.content,
					tel: this.ruleForm.tel
				}
				
				if(this.buttonTitle == '立即创建') {
					const {
						data,
						resultCode
					} = await addGood(param)
					if(resultCode == 200) {
						location.reload()
					}
				} else {
					const {
						data,
						resultCode
					} = await updateGoodOnly(this.film_base.id, param)
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
			async getOnlyGoods(ids) {
				const {
					data,
					resultCode
				} = await getGoodOnly(ids)

				this.ruleForm.intro = data.intro
				this.ruleForm.origin_price = data.origin_price
				this.ruleForm.selling_price = data.selling_price
				this.ruleForm.content = data.content
				this.ruleForm.stock = data.stock
				this.ruleForm.imageUrl = data.img_src
				this.ruleForm.imgSrc = data.img_src
				this.ruleForm.tel = data.tel
				this.ruleForm.carousel = data.carousel
				this.ruleForm.company = data.company
				this.ruleForm.imgSrc = data.img_src
				this.film_base = data

				for(let i = 0; i < data.carousel_list.length; i++) {
					this.fileLists.push({
						name: data.carousel_list[i],
						url: pathMap['imgbase'] + data.carousel_list[i]
					})
					this.fileList.push(data.carousel_list[i])
				}
			}
		},
		async mounted() {
			let pand = this.$route.query.id
			if(pand != undefined) {
				this.buttonTitle = '立即修改'
				this.getOnlyGoods(pand)
			}
			this.base_data = pathMap
		}
	}
</script>

<style>
	#lunbo>ul {
		display: flex;
	}
	
	#lunbo>div {
		height: 50px
	}
	
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