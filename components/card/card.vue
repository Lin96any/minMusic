<template>
	<view class="card">
		<view class="card-title">
			<h1>{{ cardTitle }}</h1>
		</view>
		<view class="card-scroll-view">
			<scroll-view scroll-x class="scroll-core">
				<view class="scroll-wrapper">
					<view class="content" v-for="(item, index) in cardList" :key="index" @click="tapClick(item, modse)">
						<view class="scroll-img"><image :src="item.picUrl"></image></view>
						<view class="scroll-name">
							<text class="name">{{ item.name }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		cardTitle: {
			type: String,
			default: '卡片标题'
		},
		modse: {
			type: String,
			default: 'song'
		},
		cardList: {
			type: Array,
			default() {
				return [];
				mode:''
			}
		}
	},
	methods: {
		tapClick(item, modes) {
			const { id: musicId, name: musicName, picUrl: alpicUrl, song } = item;
			let obj =null;
			if(song&&song.album){
				const { id: alId, name: alName } = song.album;
				const { id: arId, name: arName } = song.album.artists[0];
				obj = {
					musicId,
					musicName,
					alId,
					alName,
					alpicUrl,
					arId,
					arName
				};
			}else{
				obj = {
					musicId,
					musicName,
					alpicUrl
				}
			}
			this.mode = modes
			this.giveTo(modes,obj)
		},
		/* 跳转 */
		giveTo(modes,obj){
			switch(modes){
				case "newmusic":
				this.$store.commit('SET-MUSICITEM',obj)
				uni.navigateTo({
					url:'/pages/musicPlay/musicPlay'
				});
				break;
				case "dj":
				this.$store.commit('SET-DJ',obj)
				uni.navigateTo({
					url:'/pages/DJ/DJ'
				});
				break;
				case "song":
				this.$store.commit('SET-PLAYLIST',obj)
				uni.navigateTo({
					url:'/pages/playList/playList'
				});
				break;
			}
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.card {
	width: 100%;
	min-height: 400rpx;
	.card-title {
		margin-top: 20rpx;
		font-size: 38rpx;
		font-weight: bold;
	}
	.card-scroll-view {
		width: 100%;
		margin-top: 10rpx;
		.scroll-core {
			width: 100%;
			.scroll-wrapper {
				width: 100%;
				display: flex;
				justify-content: space-between;
				.content {
					flex-shrink: 0;
					margin-right: 20rpx;
					display: flex;
					flex-direction: column;
					:last-child {
						margin-right: 0;
					}
					width: 230rpx;
					.scroll-img {
						width: 100%;
						height: 230rpx;
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
							font-size: 30rpx;
							line-height: 48rpx;
							font-weight: 400;
						}
					}
				}
			}
		}
	}
}
</style>
