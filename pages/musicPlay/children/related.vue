<template>
	<view class="related-wrapper">
		<view class="card-title"><h1>相似歌曲</h1></view>
		<view class="card-scroll-view">
			<scroll-view scroll-x class="scroll-cores"  enable-flex scroll-with-animation>
				<view class="contents" v-for="(item, index) in relatedMusic" :key="index" @click="tapClick(item, modse)">
					<view class="scroll-imgs"><image :src="item.alpicUrl"></image></view>
					<view class="scroll-name">
						<text class="name">{{ item.musicName }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		musicId: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			relatedMusic: []
		};
	},
	mounted() {
		this.getRelatedMusic();
	},
	methods: {
		getRelatedMusic() {
			this.$api.related(this.musicId).then(res => {
				const { code, songs } = res;
				if (code === 200) {
					const musicItem = [];
					let newData = {};
					/* 遍历循环 */
					songs.forEach(item => {
						let musicId = item.id;
						let musicName = item.name;
						let album = item.album;
						let { id: alId, name: alName, picUrl: alpicUrl, artists } = album;
						let { name: arName, id: arId } = artists[0];
						newData = {
							musicId,
							musicName,
							alId,
							alName,
							alpicUrl,
							arName,
							arId
						};
						musicItem.push(newData);
					});
					this.relatedMusic = musicItem;
				}
			});
		},
		tapClick(item) {
			this.$store.commit('SET-MUSICITEM',item)
			this.$emit('selected',item)
		}
	}
};
</script>

<style lang="scss" scoped>
.related-wrapper {
	width: 100%;
	height: 400rpx;
	overflow: hidden;
	.card-title {
		margin-top: 20rpx;
		font-size: 38rpx;
		font-weight: bold;
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	.card-scroll-view {
		width: 100%;
		height: 100%;
		margin-top: 10rpx;
		.scroll-cores {
			width: 100%;
			display: flex;
			padding: 0 20rpx;
			box-sizing: border-box;
			.contents {
				flex-shrink: 0;
				margin-top: 20rpx;
				margin-right: 20rpx;
				display: flex;
				flex-direction: column;
				:last-child {
					margin-right: 0;
				}
				width: 160rpx;
				.scroll-imgs {
					width: 100%;
					height: 160rpx;
					overflow: hidden;
					border-radius: 10rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.scroll-name {
					margin-top: 20rpx;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					text {
						font-size: 24rpx;
						line-height: 48rpx;
						font-weight: 400;
					}
				}
			}
		}
	}
}
</style>
