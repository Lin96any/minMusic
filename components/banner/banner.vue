<template>
	<view class="banner_wrapper">
		<swiper :indicator-dots="true" :autoplay="true" class="swiper_wrappers" circular indicator-color="#f7f7f7" indicator-active-color="#fb7813" :duration="1500">
			<swiper-item class="swiper-item" v-for="(item, index) in bannerlist" :key="index">
				<view class="item">
					<view class="item_image"><image :src="item.pic" lazy-load></image></view>
					<view class="item_title">
						<text>{{ item.typeTitle }}</text>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	props:{
		SystemCode:{
			type:Number,
			default:2
		}
	},
	data() {
		return {
			bannerlist: []
		};
	},
	created() {
		this.getbanner();
	},
	methods: {
		/* 获取banner */
		async getbanner() {
			const banner = await this.$api.banner(this.SystemCode);
			const { banners } = banner;
			this.bannerlist = banners;
		}
	}
};
</script>

<style lang="scss" scoped>
.banner_wrapper {
	.swiper_wrappers {
		.swiper-item{
			.item {
				width: 100%;
				position: relative;
				.item_image {
					width: 100%;
					height: 300rpx;
					overflow: hidden;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.item_title {
					position: absolute;
					bottom: 30rpx;
					right: 20rpx;
					color: #f7f7f7;
					font-size: 28rpx;
					font-weight: bold;
					padding: 0 20rpx;
					height: 40rpx;
					border-radius: 40rpx;
					background-color: #fb7813;
				}
			}
		}
	}
}
</style>
