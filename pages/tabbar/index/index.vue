<template>
	<view class="content">
		<!-- navbar -->
		<navbar></navbar>
		<!-- banner -->
		<banner :SystemCode="SystemCode"></banner>
		<!-- classify -->
		<classify @classifyTap="tapClassify" :classifylist="classifylist"></classify>
		<home-list :lists="classifylist" :tapcurrent="tapcurrent"></home-list>
	</view>
</template>

<script>
	import HomeList from './children/HomeList.vue'
	import classify from './children/home_classify.vue'
	export default {
		data() {
			return {
				SystemCode:2,
				classifylist:[
					{icon:'&#xe7a0;',title:"推荐",mode:'recommend'},      
					{icon:'&#xe760;',title:"排行榜",mode:'ranking'},
					{icon:'&#xe618;',title:"新歌速递",mode:'newmusic'},
				],
				current:0,
				tapcurrent:0
			}
		},
		onLoad() {
			this.getSystemInfo()
		},
		components:{
			classify,
			HomeList
		},
		methods: {
			getSystemInfo(){
				/* 获取系统信息 */
				const info = uni.getSystemInfoSync();
				const SystemIos = info.system
				if(SystemIos.includes("iOS")){
					this.SystemCode = 2
				}else{
					this.SystemCode = 1
				}
			},
			/* 获取classify传递值 */
			tapClassify(index){
				this.tapcurrent = index
			},
			/* 获取swiper下标索引 */
			change(index){
				this.current = index
			}
		}
	}
</script>

<style lang="scss" scoped>
.content{
	height: 100%;
	display: flex;
	flex-direction: column;
}
	
</style>
