<template>
	<view class="playlist-wrapper">
		<navbar :isSearch="false"></navbar>
		<view class="background" :style="setbg"></view>
		<view class="head">
			<view class="head-img">
				<image :src="headTop.coverImgUrl" mode="widthFix"></image>
			</view>
			<view class="head-content">
				<view class="head-title">
					{{headTop.name}}
				</view>
				<view class="head-desc">
					{{headTop.description}}
				</view>
			</view>
		</view>
		<view class="body">
			<scroll-view scroll-y="true" class="scroll-wrapper" scroll-with-animation @scrolltolower="scrolltolower">
				<block v-for="(item,index) in disposeList" :key="index">
					<view class="scroll-item" @click="tapClick(item)">
						<view class="item-image">
							<image :src="item.alpicUrl" mode="widthFix"></image>
						</view>
						<view class="item-content">
							<view class="name">
								<text>{{item.musicName}}</text>
							</view>
							<view class="desc">
								<text>{{item.arName}} - {{item.alName}}</text>
							</view>
						</view>
					</view>
				</block>
				<tips :isActive="true" text="上拉加载更多"></tips>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			Playlist: null,
			headTop: null,
			itemList: [],
			page:1,
			PageSize:10,
			disposeList:[]
		};
	},
	created() {
		this.init_PlayList();
	},
	computed: {
		setbg() {
			return this.Playlist && this.Playlist.alpicUrl ? 'background-image:url(' + this.Playlist.alpicUrl + ')' : '';
		}
	},
	methods: {
		/* 跳转到播放页 */
		tapClick(item){
			this.$store.commit('SET-MUSICITEM',item)
			uni.navigateTo({
				url:'/pages/musicPlay/musicPlay'
			})
		},
		/* 上拉加载更多 */
		scrolltolower(){
			this.page++
			const skip = this.SkipLimit(this.page, this.PageSize)
			this.disposeList.push(...skip)
		},
		/* 初始化数据 */
		init_PlayList() {
			const playlist = this.$store.getters.getplaylist;
			this.Playlist = playlist;
			const { musicId, musicName } = playlist;
			this.getPlayContent(musicId);
		},
		/* 获取歌单内容 */
		getPlayContent(id) {
			this.$api.getPlaylistContent(id).then(res => {
				if (res.code == 200) {
					const { playlist } = res;
					const { coverImgUrl, description, name, trackIds } = playlist;
					this.headTop = {
						coverImgUrl,
						description,
						name
					};
					this.disposeTrackIds(trackIds);
				}
			});
		},
		/* trackIds 处理 */
		disposeTrackIds(trackIds) {
			let Ids = [];
			trackIds.forEach(item => {
				const id = item.id;
				Ids.push(id);
			});
			Ids = Ids.join(',');
			this.$api.getMusicContent(Ids).then(res => {
				const { code, songs } = res;
				if (code === 200) {
					const itemList = [];
					let itemObj = {};
					songs.forEach(item => {
						const { id: musicId, name: musicName, al, ar } = item;
						const { id: alId, name: alName, picUrl: alpicUrl } = al;
						const { id: arId, name: arName } = ar[0];
						itemObj = {
							musicId,
							musicName,
							alId,
							alName,
							alpicUrl,
							arId,
							arName
						};
						itemList.push(itemObj);
					});
					this.itemList = itemList;
					this.disposeList = this.SkipLimit(this.page, this.PageSize)
				}
			});
			
		},
		/* 跳过 */
		skip(size, Pagesize) {
			const skip = (size-1) * Pagesize;
			return this.itemList.slice(skip);
		},
		/* 取值 */
		limit(array, Pagesize) {
			return array.slice(0, Pagesize);
		},
		/* 分页 */
		SkipLimit(size, Pagesize) {
			const array = this.skip(size, Pagesize);
			return this.limit(array, Pagesize);
		}
	}
};
</script>

<style lang="scss">
.playlist-wrapper {
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
	.head{
		display: flex;
		padding: 0 20rpx;
		box-sizing: border-box;
		margin: 20rpx 0;
		.head-img{
			width: 200rpx;
			height: 200rpx;
			border-radius: 20rpx;
			overflow: hidden;
			margin-right: 20rpx;
			image{
				width: 100%;
			}
		}
		.head-content{
			flex: 1;
			overflow: hidden;
			dispaly: flex;
			flex-direction: column;
			font-size: 28rpx;
			.head-title{
				font-size: 32rpx;
				font-weight: bold;
				color:#f07373;
				line-height: 40rpx;
				margin: 20rpx 0;
			}
			.head-desc{
				color: white;
				line-height: 40rpx;
				display: -webkit-box;
				 -webkit-line-clamp:2;
				-webkit-box-orient:vertical;
			}
		}
	}
	.body{
		flex: 1;
		overflow: hidden;
		padding: 0 50rpx;
		box-sizing: border-box;
		.scroll-wrapper{
			height: 100%;
			.scroll-item{
				display: flex;
				margin: 20rpx 0;
				.item-image{
					width: 120rpx;
					height: 120rpx;
					border-radius: 10rpx;
					overflow: hidden;
					margin-right: 30rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.item-content{
					.name{
						font-size: 28rpx;
						padding: 10rpx 0;
					}
					.desc{
						font-size: 26rpx;
						color: #999999;
					}
				}
			}
		}
	}
}
</style>
