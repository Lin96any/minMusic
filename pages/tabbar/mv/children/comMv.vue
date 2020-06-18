<template>
	<view class="wrapper">
		<view class="com-title"><text>推荐MV</text></view>
		<view class="com-body">
			<scroll-view scroll-x="true" class="scroll-wrapper" scroll-with-animation>
				<view class="scroll-item">
					<block v-for="(item, index) in comMvList" :key="index">
						<view class="mv-item" @click="tapmv(item)">
							<view class="mv-img"><image :src="item.mvPicUrl" mode="aspectFit"></image></view>

							<view class="mv-name">
								<text>{{ item.mvName }}</text>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			comMvList: []
		};
	},
	created() {
		this.getComMv();
	},
	methods: {
		/* 获取推荐Mv数据 */
		getComMv() {
			this.$api.getCommentsMv().then(res => {
				const { code, result } = res;
				let mvObj = {};
				const mvList = [];
				if (code === 200) {
					result.forEach(item => {
						const { id: mvId, name: mvName, copywriter: mvDesc, picUrl: mvPicUrl, playCount } = item,
							mvObj = {
								mvId,
								mvName,
								mvDesc,
								mvPicUrl,
								playCount
							};
						mvList.push(mvObj);
					});
					this.comMvList = mvList;
				}
			});
		},
		/* 获取选中项 */
		tapmv(item){
			this.$store.commit('SET-Video',item)
			uni.navigateTo({
				url:'/pages/PlayVideo/PlayVideo'
			})
		},
	}
};
</script>

<style lang="scss">
.wrapper {
	width: 100%;
	.com-title {
		font-size: 38rpx;
		font-weight: bold;
	}
	.com-body {
		width: 100%;
		.scroll-wrapper {
			margin-top: 10rpx;
			width: 100%;
			.scroll-item {
				display: flex;
				.mv-item {
					margin-right: 10rpx;
					&:last-child {
						margin-right: 0;
					}
					.mv-img {
						width: 300rpx;
						height: 160rpx;
						border-radius: 20rpx;
						overflow: hidden;
						image {
							width: 100%;
							height: 100%;
						}
					}
					.mv-name {
						display: flex;
						justify-content: center;
						text {
							font-size: 24rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							line-height: 36rpx;
						}
					}
				}
			}
		}
	}
}
</style>
