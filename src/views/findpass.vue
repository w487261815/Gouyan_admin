<template>
	<div>
		<el-input v-model="emails" placeholder="请输入内容"></el-input>
		<el-button type="primary" @click="send">发送</el-button>
		<el-input v-model="yzm" placeholder="请输入内容"></el-input>
		<el-button type="primary" @click="check">验证</el-button>
		
	</div>
</template>

<script>
	import { login, getUserInfo } from '@/service/user'
	import { localSet } from '@/until/index'
	import axios from '@/until/axios';
	export default {
		data() {
			return {
				emails:'',
				yzm:''
			}
		},
		methods: {
			async send() {
				
			},
			check(){
				
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

<style>
</style>