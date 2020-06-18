<template>
	<view class="mv-wrapper">
		<scroll-view scroll-y="true" scroll-with-animation @scrolltolower="scrolltolowers" class="scroll-wrapper">
			<commv></commv>
			<wangyi :offset="offset"></wangyi>
		<tips :isActive="true" text="上拉加载更多"></tips>
		</scroll-view>
		</view>
</template>

<script>
import commv from './children/comMv.vue';
import wangyi from './children/wangyi.vue'
export default {
	data() {
		return {
			offset:1
		};
	},
	components: {
		commv,
		wangyi
	},
	methods: {
		scrolltolowers(){
			this.offset+=1
		}
	}
};
</script>

<style lang="scss">
	.mv-wrapper{
		width: 100%;
		height: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		.scroll-wrapper{
			width: 100%;
			height: 100%;
		}
	}
</style>
