<template>
	<div>
		<el-card class="login-form-layout">
			<el-form ref="state" :model="state" label-width="0px" style="text-align: center;">
				<el-form-item style="text-align: center;">
					<i class="el-icon-film" style="text-align:center;font-size: 56px;color: #409EFF"></i>
				</el-form-item>
				<h2>狗眼管理端</h2>
				<el-form-item style="text-align: left;">
					<el-input placeholder="请输入用户名" v-model="state.username" style="margin-left: 0px;" prefix-icon="el-icon-user-solid">

					</el-input>
				</el-form-item>
				<el-form-item style="text-align: left;">
					<el-input placeholder="请输入密码" v-model="state.password" style="margin-left: 0px;" show-password prefix-icon="el-icon-lock">

					</el-input>
				</el-form-item>
				<el-form-item style="text-align: center;">
					<el-button type="primary" style="width:45%" @click="submitForm">登录</el-button>
					<el-button type="primary" style="width:45%" @click="registerForm">注册</el-button>
				</el-form-item>
				<br><br>

			</el-form>
		</el-card>
		<img :src="login_center_bg" class="login-center-layout">
	</div>
</template>

<script>
	import { login, getUserInfo } from '@/service/user'
	import { localSet } from '@/until/index'
	import axios from '@/until/axios';
	export default {
		data() {
			return {
				login_center_bg: 'https://www.macrozheng.com/admin/static/img/login_center_bg.5307896.png',
				state: {
					username: 'admin',
					password: '123456',
				},
				input1: ''
			}
		},
		methods: {
			async registerForm() {
				const {
					data,
					resultCode
				} = await register({
					username: this.state.username,
					password: this.state.password
				})
				if(resultCode == 200) {
					this.$message({
						message: '注册成功',
						type: 'success'
					});
				}
			},
			async submitForm() {
				const {
					data,
					resultCode
				} = await login({
					username: this.state.username,
					password: this.state.password
				})
				if(resultCode == 200) {
					console.log(data)
					localSet('token', data.header + " " + data.token)
					window.location.reload()
				}
			},
			async getInfo() {
				const {
					data,
					resultCode
				} = await getUserInfo()
				console.log(data)
				if(resultCode == 200) {
					this.$router.push({
						path: 'main'
					})
				}
			}
		},
		async mounted() {
			if(this.$store.state.islogin == 1) {
				this.$router.push({
					path: 'mainpage'
				})
			}
			this.getInfo()
		}
	}
</script>

<style scoped>
	.login-form-layout {
		position: absolute;
		left: 0;
		right: 0;
		width: 360px;
		margin: 140px auto;
		border-top: 10px solid #409EFF;
	}
	
	.login-title {
		text-align: center;
	}
	
	.login-center-layout {
		background: #409EFF;
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 100%;
		margin-top: 200px;
	}
	
	h2 {
		color: #409eff;
		display: block;
		font-size: 1.5em;
		margin-block-start: 0.83em;
		margin-block-end: 0.83em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		font-weight: bold;
	}
</style>