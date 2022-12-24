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
					path: '/cinemadetail',
					component: () =>
						import( /* webpackChunkName: "dashboard" */ '@/views/cinema_detail.vue'),
					meta: {
						title: '影院详情'
					}
				},
				{
					path: '/addticket',
					component: () =>
						import( /* webpackChunkName: "dashboard" */ '@/views/add_ticket.vue'),
					meta: {
						title: '添加商品'
					}
				},
				{
					path: '/film_detail',
					component: () =>
						import( /* webpackChunkName: "dashboard" */ '@/views/film_detail.vue'),
					meta: {
						title: '电影详情'
					}
				},
				{
					path: '/addgoods',
					component: () =>
						import( /* webpackChunkName: "dashboard" */ '@/views/add_goods.vue'),
					meta: {
						title: '添加商品'
					}
				},
				{
					path: '/carousel',
					component: () =>
						import( /* webpackChunkName: "dashboard" */ '@/views/carousel.vue'),
					meta: {
						title: '添加商品'
					}
				},
				{
					path: '/goods',
					component: () =>
						import( /* webpackChunkName: "dashboard" */ '@/views/goods.vue'),
					meta: {
						title: '商品管理'
					}
				},
				{
					path: '/order_detail',
					component: () =>
						import( /* webpackChunkName: "dashboard" */ '@/views/order_detail.vue'),
					meta: {
						title: '详细订单'
					}
				},
				{
					path: '/order',
					component: () =>
						import( /* webpackChunkName: "dashboard" */ '@/views/order.vue'),
					meta: {
						title: '订单管理'
					}
				},
				{
					path: '/user',
					component: () =>
						import( /* webpackChunkName: "dashboard" */ '@/views/user.vue'),
					meta: {
						title: '用户管理'
					}
				},
				{
					path: '/addcinema',
					component: () =>
						import( /* webpackChunkName: "dashboard" */ '@/views/add_cinema.vue'),
					meta: {
						title: '添加影院'
					}
				},
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
					path: '/cinemas',
					component: () =>
						import( /* webpackChunkName: "tabs" */ '@/views/cinemas.vue'),
					meta: {
						title: '影院管理'
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