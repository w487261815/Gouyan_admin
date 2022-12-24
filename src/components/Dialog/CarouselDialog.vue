<template>
	<div>
		<!--div>{{sendParam}}</div-->
		<el-form :model="state.ruleForm" ref="formRef" label-width="100px" class="good-form">
			<el-form-item label="轮播图" prop="url">
				<el-upload class="avatar-uploader" action="http://150.158.191.247:28089/admin-api/v1/uploadImg" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img width="150px" v-if="carouselObj.imageUrl" :src="base_data['imgbase']+carouselObj.imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			
			<el-form-item label="跳转链接" prop="redirect_url">
				<el-input type="text" v-model="carouselObj.redirect_url"></el-input>
			</el-form-item>
			<el-form-item label="内容" prop="content">
				<el-input type="text" v-model="carouselObj.content"></el-input>
			</el-form-item>
			<el-form-item label="排序值" prop="rank">
				<el-input type="number" v-model="carouselObj.rank"></el-input>
			</el-form-item>
		</el-form>
		<div class="dialogFooter" style="text-align: right;margin-top: 60px;">
			<el-button type="primary" @click="newAddressData">确 定</el-button>
			<el-button @click="cancelAdd">取 消</el-button>
		</div>
	</div>
</template>

<script>
	import { pathMap } from '@/until/index'
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		name: 'Child',
		props: ['sendParam'],
		data() {
			return {
				base_data: [],
				value: '',
				state: {
					visible: false,
					ImgSrc: '',
					ruleForm: {
						redirect_url: '',
						content: '',
						id: '',
						imageUrl:'',
						imgSrc:'',
						rank: ''
					},
				},

			}
		},
		computed: {
			...mapGetters([
				'carouselObj',
				'typeObj'// 新增修改收货地址
			])
		},
		methods: {
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
			handleAvatarSuccess(res, file) {
				this.state.ruleForm.imageUrl = res.message
				this.state.ruleForm.imgSrc = res.message
			},
			cancelAdd() {
				this.$emit('cancelAdd')
			},
			newAddressData() {
				this.carouselObj.imageUrl=this.state.ruleForm.imageUrl
				this.$emit('hideAddDialog')
			},
			change() {

			},
		},
		mounted() {
			this.base_data = pathMap
		}
	}
</script>

<style>
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
		width: 200px;
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
		width: 200px;
		height: 100px;
		display: block;
		z-index: 3;
	}
</style>