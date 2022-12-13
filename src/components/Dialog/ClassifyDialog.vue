<template>
	<div>
		<!--div>{{sendParam}}</div-->
		<el-form :model="state.ruleForm" ref="formRef" label-width="100px" class="good-form">
			<el-form-item label="类型" prop="type">
				<el-select v-model="classifyObj.type" placeholder="请选择" style="width:100%">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="内容" prop="content">
				<el-input type="text" v-model="classifyObj.content"></el-input>
			</el-form-item>
			<el-form-item label="排序值" prop="sort">
				<el-input type="number" v-model="classifyObj.sort"></el-input>
			</el-form-item>
		</el-form>
		<div class="dialogFooter" style="text-align: right;margin-top: 60px;">
			<el-button type="primary" @click="newAddressData">确 定</el-button>
			<el-button @click="cancelAdd">取 消</el-button>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		name: 'Child',
		props: ['sendParam'],
		data() {
			return {
				options: [],
				value: '',
				state: {
					visible: false,
					ImgSrc: '',
					ruleForm: {
						type: '',
						content: '',
						sort: '',
						id: ''
					},
				},

			}
		},
		computed: {
			...mapGetters([
				'classifyObj',
				'typeObj'// 新增修改收货地址
			])
		},
		methods: {
			cancelAdd() {
				this.$emit('cancelAdd')
			},
			newAddressData() {
				if(this.classifyObj.type == '') {
					this.$message.error("请选择类型")
					return
				}
				if(this.classifyObj.sort == '') {
					this.$message.error("请输入排序值")
					return
				}
				if(this.classifyObj.content == '') {
					this.$message.error("请输入内容")
					return
				}
				this.$emit('hideAddDialog', this.state.ImgSrc)
			},
			change() {

			},
		},
		mounted() {
			this.options = this.typeObj
			console.log(this.options)
		}
	}
</script>

<style>
	.el-button--small {
		padding: 9px 15px;
		font-size: 12px;
		border-radius: 3px;
	}
	
	.avatar-uploader .el-upload {
		border: 1px solid #d9d9d9;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		text-align: center;
	}
	
	.avatar {
		width: 100px;
		height: 100px;
		display: block;
	}
</style>