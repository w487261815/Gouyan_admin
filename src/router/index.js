import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default new Router({
	routes: [{
			path: '/',
			redirect: '/main'
		},
		{
			path: '/login',
			component: () =>
				import( /* webpackChunkName: "dashboard" */ '@/views/login.vue'),
			meta: {
				title: '登录页'
			}
		},
		{
			path: '/find_pass',
			component: () =>
				import( /* webpackChunkName: "dashboard" */ '@/views/findpass.vue'),
			meta: {
				title: '登录页'
			}
		},
		{
			path: '/',
			component: () =>
				import( /* webpackChunkName: "home" */ '@/components/Home.vue'),
			meta: {
				title: '自述文件'
			},
			children: [
				{
					path: '/addfilm',
					component: () =>
						import( /* webpackChunkName: "dashboard" */ '@/views/add_film.vue'),
					meta: {
						title: '添加电影'
					}
				},
				{
					path: '/main',
					component: () =>
						import( /* webpackChunkName: "dashboard" */ '@/views/main.vue'),
					meta: {
						title: '系统首页'
					}
				},
				{
					path: '/film_sort',
					component: () =>
						import( /* webpackChunkName: "dashboard" */ '@/views/film_sort.vue'),
					meta: {
						title: '电影类型'
					}
				},
				{
					path: '/cinema_sort',
					component: () =>
						import( /* webpackChunkName: "dashboard" */ '@/views/cinema_sort.vue'),
					meta: {
						title: '影院类型'
					}
				},
				{
					path: '/city_sort',
					component: () =>
						import( /* webpackChunkName: "dashboard" */ '@/views/city_sort.vue'),
					meta: {
						title: '地区分类'
					}
				},
				{
					path: '/sysmanage',
					component: () =>
						import( /* webpackChunkName: "icon" */ '@/views/sysmanage.vue'),
					meta: {
						title: '自定义图标'
					}
				},
				{
					path: '/sysutil',
					component: () =>
						import( /* webpackChunkName: "table" */ '@/views/sysutil.vue'),
					meta: {
						title: '基础表格'
					}
				},
				{
					path: '/goodsrz',
					component: () =>
						import( /* webpackChunkName: "tabs" */ '@/views/goodsrz.vue'),
					meta: {
						title: 'tab选项卡'
					}
				},
				{
					path: '/echarts',
					component: () =>
						import( /* webpackChunkName: "tabs" */ '@/views/echarts.vue'),
					meta: {
						title: 'echars图标'
					}
				},
				{
					path: '/films',
					component: () =>
						import( /* webpackChunkName: "tabs" */ '@/views/films.vue'),
					meta: {
						title: '电影管理'
					}
				},
				{
					path: '/404',
					component: () =>
						import( /* webpackChunkName: "404" */ '@/views/404.vue'),
					meta: {
						title: '404'
					}
				},
			]
		},
		/* {
		     path: '/login',
		     component: () => import('../components/page/Login.vue'),
		     meta: { title: '登录' }
		 },*/
		{
			path: '*',
			redirect: '/404'
		}
	]
});