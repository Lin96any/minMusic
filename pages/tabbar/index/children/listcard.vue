<template>
	<view class="list-card">
		<view class="container" v-if="mode === 'recommend'">
			<card :cardList="listData[0].result" modse="song" cardTitle="推荐歌单" ></card>
			<card :cardList="listData[1].result" modse="dj" cardTitle="推荐电台" ></card>
			<card :cardList="listData[2].result" modse="newmusic" cardTitle="推荐新歌"></card>
		</view>

		<view class="container" v-if="mode === 'ranking'">
			<view v-for="(item,index) in listData" :key="index" class="car-list">
				<car-list :carTitle="item.name" :description="item.description" :ids="item.id" :list="item.tracks"></car-list>
			</view>
		</view>
		
		<scroll-view class="container newmusic" v-if="mode==='newmusic'">
				<block v-for="(item,index) in getList" :key="index">
					<music-list :musicItem="item" @click.native="tapmusic(item)"></music-list>
				</block>
		</scroll-view>
		
		<tips v-if="icoShow"></tips>
		<view class="quan" v-else>
			<loadding></loadding>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		mode: {
			type: String,
			default: ''
		},
		listData: {
			type: Array,
			default() {
				return [];
			}
		},
		isShows:{
			type:Boolean,
			default:false
		}
	},
	created() {
		
	},
	computed:{
		getList(){
			return this.$store.getters.getNewList
		},
		icoShow(){
			return this.isShows?false:true
		}
	},
	watch:{
		listData:{
			handler(newvalue){
				this.isTips = true
			},
			immediate:true
		}
	},
	data() {
		return {
			newMusicData:[]
		};
	},

	methods: {
	
	tapmusic(item){
			this.$store.commit('SET-MUSICITEM',item)
			uni.navigateTo({
				url:'/pages/musicPlay/musicPlay'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.list-card {
	width: 100%;
	padding: 0 10rpx;
	box-sizing: border-box;
	height: 100%;
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		.content {
			width: 100%;
		}
		.car-list{
			margin-bottom: 20rpx;
		}
		&.newmusic{
			padding-left: 20rpx;
		}
	}
}
</style>
