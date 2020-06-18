<template>
	<view class="wangyi">
		<view class="wangyi-title"><text>全部MV</text></view>
		<view class="wangyi-body">
			<!-- 循环遍历 -->
			<block v-for="(item, index) in lists" :key="index">
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
	</view>
</template>

<script>
export default {
	props: {
		offset: {
			tyrp: Number,
			default: 1
		}
	},
	data() {
		return {
			lists: []
		};
	},
	created() {
		this.getWangyiMV(this.offset);
	},
	watch: {
		offset(newValue) {
			this.getWangyiMV(newValue);
		}
	},
	methods: {
		/* 获取网易出品MV */
		getWangyiMV(offset) {
			const mvData = this.$api.wangyiMv(offset).then(res => {
				const { code, data } = res;
				if (code === 200) {
					let Obj = {};
					const list = [];
					data.forEach(item => {
						const { id: mvId, name: mvName, cover: mvPicUrl, playCount } = item,
							Obj = {
								mvId,
								mvName,
								mvPicUrl,
								playCount
							};
						list.push(Obj);
					});
					this.lists.push(...list);
				}
			});
		},
		/* 获取点击的项 */
		tapItem(item) {
			this.$store.commit('SET-Video', item);
			uni.navigateTo({
				url: '/pages/PlayVideo/PlayVideo'
			});
		}
	}
};
</script>

<style lang="scss">
.wangyi {
	margin: 20rpx 0;
	.wangyi-title {
		font-size: 38rpx;
		font-weight: bold;
	}
	.wangyi-body {
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
</style>
