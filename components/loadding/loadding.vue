<template>
	<view>
		<view class="loading">
			<view class="loader"></view>
			<text>正在加载哟~~~~</text>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.loading{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 30rpx 0;
		text{
			font-size: 24rpx;
			color: #999999;
			margin-top: 10rpx;
		}
	}
	.loader{
		display: inline-block;
		width: 40rpx;
		height: 40rpx;
		border: 7rpx solid #f07373;
		border-bottom-color: transparent;
		border-radius: 50%;
		animation: 1s loader linear infinite;
	}
	/* 360度旋转 */
	@keyframes loader{
		0%{
			transform: rotate(0deg);
		}
		100%{
			transform: rotate(360deg);
		}
	}
</style>
