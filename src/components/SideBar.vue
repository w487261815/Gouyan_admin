<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="rgb(0,20,40)"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
        	<div style="margin-top:20px;margin-bottom:30px;color: white;display: flex;align-items: center;justify-content: space-evenly">
        		<img src="http://rluy2ixw3.hn-bkt.clouddn.com/manage/QQ%E5%9B%BE%E7%89%8720221201200505.jpg" style="width:40px;height:40px;">
        		<span style="font-weight: 700;">修狗后台管理系统</span>
        	</div>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'main',
                    title: '首页'
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    title: '分类管理',
                    subs: [
                        {
                        	icon: 'el-icon-film',
                            index: 'film_sort',
                            title: '电影类型'
                        },
                        {
                            icon: 'el-icon-video-camera',
                            index: 'cinema_sort',
                            title: '影院类型'
                        }
                    ]
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: 'addfilm',
                    title: '添加电影'
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: 'echarts',
                    title: '系统监控'
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: 'films',
                    title: '电影管理'
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: 'goodsrz',
                    title: '商铺认证'
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: 'sysutil3',
                    title: '订单信息'
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: 'sysutil4',
                    title: '优惠促销'
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: 'sysutil5',
                    title: '问答管理'
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: 'sysutil6',
                    title: '积分明细'
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: 'sysutil7',
                    title: '内容管理'
                },
                
                
            ]
        };
    },
    computed: {
        onRoutes() {
            //return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
      /*  bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });*/
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-y: scroll;
    
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
	text-align: left !important;
    width: 200px;
}
.sidebar > ul {
    height: 100%;
}
.el-menu-item{
	
}
</style>
