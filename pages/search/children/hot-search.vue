<template>
	<view class="hot-search">
		<view class="hot-title">热门搜索</view>
		<view class="hot-body">
			<block v-for="(item,index) in hotlist" :key="index">
				
				<view class="list-item" @click="tapItem(item)" :style="{'color':colorList[index%10]}">
					<text>{{item}}</text>
				</view>
				
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				hotlist:[],
				colorList:['#ddf3f5','#a6dcef','#f2aaaa','#84a9ac','#709fb0','#a0c1b8','#127681','#0a97b0','#fce8d5','#2fc4b2'],
			}
		},
		created() {
			this.init()
		},
		methods:{
			init(){
				this.$api.hotsearch().then(res=>{
					const {code,data} = res
					if(code===200){
						let list = []
						data.forEach(item=>{
							const {searchWord} = item
							list.push(searchWord)
						})
						this.hotlist = list
					}
				})
			},
			tapItem(item){
				this.$emit('select',item)
			}
		}
	}
</script>

<style lang="scss">
	.hot-search{
		width: 100%;
		margin-top: 10rpx;
		.hot-title{
			font-size: 40rpx;
			font-weight: bold;
		}
		.hot-body{
			min-height: 200rpx;
			display: flex;
			flex-wrap: wrap;
			.list-item{
				margin: 10rpx;
				padding: 10rpx;
				flex-shrink: 0;
				border: 1px solid #999999;
				border-radius: 10rpx;
			}
		}

	}
</style>
