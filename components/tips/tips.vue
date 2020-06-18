<template>
	<view class="tips" :class="{active:isActive}">
		<text>{{text}}</text>
	</view>
</template>

<script>
	export default {
		props:{
			text:{
				type:String,
			default:'我也是有底线的噢~~~'
			},
			isActive:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.tips{
	font-size: 24rpx;
	color: #737373;
	@include f-center;
	margin-bottom: 20rpx;
	width: 100%;
	line-height: 30rpx;
	background-color: #fff;
	&.active{
		margin-top: 20rpx;
		background-color: transparent;
	}
}
</style>
