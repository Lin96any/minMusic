<template>
	<view class="list-wrapper">
		<view class="list-img">
			<image :src="musicItem.alpicUrl" lazy-load></image>
		</view>
		<view class="list-music-wrapper">
			<view class="music-name">{{musicItem.musicName}}</view>
			<view class="music-ar-al">{{musicItem.arName}} - {{musicItem.alName}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			musicItem:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.list-wrapper{
	margin: 20rpx 0;
	display: flex;
	.list-img{
		width: 80rpx;
		height: 80rpx;
		border-radius: 10rpx;
		overflow: hidden;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.list-music-wrapper{
		margin-left: 20rpx;
		.music-name{
			font-size: 28rpx;
			margin-bottom: 10rpx;
		}
		.music-ar-al{
			font-size: 26rpx;
			color: #999;
		}
	}
}
</style>
