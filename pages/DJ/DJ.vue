<template>
	<view class="dj-wrapper">
		<navbar :isSearch="false">
		</navbar>
		<view class="background" :style="setbg"></view>
		<view class="body">
			<text class="text">请在网易云音乐中查看</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dj: {}
		};
	},
	created() {
		const dj = this.$store.getters.getdj;
		this.dj = dj
	},
	computed:{
		setbg(){
			return this.dj && this.dj.alpicUrl ? 'background-image:url(' + this.dj.alpicUrl + ')' : '';
		}
	},
	methods:{

	}
};
</script>

<style lang="scss">
.dj-wrapper {
	color: white;
	width: 100%;
	height: 100%;
	position: relative;
	background-color: rgba(0, 0, 0, 0.8);
	display: flex;
	flex-direction: column;
	.background {
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		position: absolute;
		background-color: #333;
		filter: blur(10px);
		top: 0;
		right: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	.body{
		flex: 1;
		overflow: hidden;
		@include f-center;
		color: white;
		font-size: 28rpx;
	}
}
</style>
