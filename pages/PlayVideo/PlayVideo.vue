<template>
	<view class="video-wrapper">
		<navbar :isSearch="false" :isIcon="true"></navbar>
		<view class="video-content">
			<video :src="mvUrl" autoplay show-play-btn enable-progress-gesture enable-play-gesture :poster="mvCom.cover" @error="error" class="video"></video>
		</view>
		<view class="desc">
			<scroll-view scroll-y="true" class="scroll-wrapper">
				<view class="video-explain">
					<view class="video-Name">
						<text>{{ mvCom.name }}</text>
					</view>
					<view class="video-desc">
						<text>{{ mvCom.desc }}</text>
					</view>
					<view class="video-play">
						<text>{{ (mvCom.playCount / 10000).toFixed(1) }} 万次播放 {{ mvCom.publishTime }}</text>
					</view>
				</view>
				<view class="correlation">
					<view class="correlation-title"><text>相似MV</text></view>

					<block v-for="(item, index) in correlation" :key="index">
						<view class="item" @click="tapItem(item)">
							<view class="img" :style="{ 'background-image': 'url(' + item.mvPicUrl + ')' }"></view>
							<view class="content">
								<view class="name">{{ item.mvName }}</view>
								<view class="count">
									<text>播放次数：{{ item.playCount }}</text>
								</view>
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
			mvCom: {},
			mvUrl: '',
			correlation: []
		};
	},
	created() {
		this.getMvObj();
	},
	methods: {
		tapItem(item) {
			this.$store.commit('SET-Video', item);
			this.getMvObj();
		},
		error(err) {},
		/* 初始化数据 */
		getMvObj() {
			const mvObj = this.$store.getters.getMV;
			const { mvId } = mvObj;
			const getMvCom = this.$api.Mvcom(mvId);
			const correlation = this.$api.correlation(mvId);
			let correlations = [];
			let correlationObj = {};
			/* 获取mv地址 */
			const mvurl = this.$api.MvUrl(mvId);

			try {
				Promise.all([getMvCom, mvurl, correlation]).then(res => {
					const { data: OneData } = res[0];
					const { data: TwoData } = res[1];
					const { mvs } = res[2];
					const { artistName, cover, desc, name, playCount, publishTime } = OneData;
					const { url } = TwoData;

					(this.mvUrl = url),
						(this.mvCom = {
							artistName,
							cover,
							desc,
							name,
							playCount,
							publishTime
						});
					mvs.forEach(item => {
						const { id: mvId, name: mvName, cover: mvPicUrl, playCount } = item,
							correlationObj = {
								mvId,
								mvName,
								mvPicUrl,
								playCount
							};
						correlations.push(correlationObj);
					});

					this.correlation = correlations;

					console.log(this.mvUrl);
					console.log(this.mvCom);
				});
			} catch (e) {
				//TODO handle the exception
			}
		}
	}
};
</script>

<style lang="scss">
.video-wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.video-content {
		width: 100%;
		.video {
			width: 100%;
		}
	}
	.desc {
		flex: 1;
		overflow: hidden;
		.scroll-wrapper {
			width: 100%;
			height: 100%;
			padding: 0 20rpx;
			box-sizing: border-box;
			.video-explain {
				font-size: 24rpx;
				color: #999999;
				margin-top: 20rpx;
				.video-Name {
					font-size: 32rpx;
					color: #333333;
				}
				.video-desc {
					margin: 10rpx 0;
				}
			}
			.correlation {
								padding-bottom: 20rpx;
				.correlation-title {
					margin: 10rpx 0;
					font-size: 32rpx;
				}
				.item {
					display: flex;
					margin: 20rpx 0;
					.img {
						width: 300rpx;
						height: 150rpx;
						overflow: hidden;
						border-radius: 10rpx;
						background-size: cover;
						background-repeat: no-repeat;
						margin-right: 30rpx;
					}
					.content {
						flex: 1;
						overflow: hidden;
						.name {
							font-size: 28rpx;
							padding: 10rpx 0;
						}
						.count {
							font-size: 24rpx;
							color: #999999;
						}
					}
				}
			}
		}
	}
}
</style>
