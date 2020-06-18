<template>
	<view class="classify_wrapper">
		<view class="classify_item" v-for="(item,index) in classifylist" :key="index" @click="tabClick(index)">
			<view class="classify_icon iconfont" v-html="item.icon"></view>
			<view class="classify_title">{{item.title}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			classifylist:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data(){
			return {
				
			}
		},
		methods:{
			tabClick(index){
				this.$emit('classifyTap',index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.classify_wrapper{
		width: 100%;
		height: 180rpx;
		@include f-j-around;
		.classify_item{
			height: 140rpx;
			padding: 0 20rpx;
			@include f-center;
			flex-direction: column;
			.classify_icon{
				width: 80rpx;
				height: 80rpx;
				border-radius: 100%;
				overflow: hidden;
				font-size: 64rpx;
				text-align: center;
				color: #FF2C2C;
			}
			.classify_title{
				font-size: 28rpx;
				font-weight: bold;
			}
		}
	}
</style>
