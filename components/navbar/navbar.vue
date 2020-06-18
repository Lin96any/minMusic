<template>
	<view class="nav_wrapper">
		<view class="nav_fixed" :style="isOpacity">
			<view class="nav_status" :style="{ height: statusHeight + 'px' }"></view>
			<view class="nav_content" 
			:class="{active:!isSearch}"
			:style="{ height: navHeight + 'px', width: navWidth ? navWidth + 'px' : '100%' }">
				<view class="nav_search" v-if="isSearch" @click="tapClick">
					<view class="iconfont nav_search_icon">&#xe63d;</view>
					<view class="nav_search_text">请输入歌手/歌曲</view>
				</view>
				<view class="nosearch" v-else>
					<view class="icon">
						<view class="back" @click="goback"><uni-icons type="arrowleft" size="20" :color="isIcon?'black':'white'"></uni-icons></view>
						<view class="home"   @click="gohome"><uni-icons type="home-filled" size="20" :color="isIcon?'black':'white'"></uni-icons></view>
					</view>
				</view>
			
			<view class="nav-title"><slot></slot></view>
			</view>
		</view>
		<view class="nav_zoom" :style="{ height: navHeight + statusHeight + 'px' }"></view>
	</view>
</template>

<script>
export default {
	props: {
		isSearch: {
			type: Boolean,
			default: true
		},
		isIcon: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			statusHeight: 0,
			navHeight: 44,
			navWidth: 0
		};
	},
	created() {
		/* 获取系统信息 */
		const info = uni.getSystemInfoSync();
		/* 获取状态栏的高度 */
		const statusHeight = info.statusBarHeight;
		this.statusHeight = statusHeight;
		/* 获取胶囊位置 */
		/* 条件编译 */
		// #ifndef APP-PLUS|| H5
		const MenueButten = uni.getMenuButtonBoundingClientRect();
		//计算navbar的高度
		const navHeight = MenueButten.bottom - statusHeight + 2 * (MenueButten.top - statusHeight);
		this.navHeight = navHeight;
		//计算navbar的宽度
		this.navWidth = MenueButten.left;
		// #endif
	},
	computed: {
		isOpacity() {
			return this.isSearch ? 'background-color: #fff;' : 'background-color: transparent;';
		}
	},
	methods:{
		gohome(){
			uni.reLaunch({
				url:'/pages/tabbar/index/index'
			})
		},
		/* 跳转到搜索页 */
		tapClick(){
			uni.navigateTo({
				url:'/pages/search/search'
			})
		},
		goback(){
			uni.navigateBack({
				delta:1
			})
		}
	}
};
</script>

<style lang="scss">
.nav_wrapper {
	width: 100%;
	.nav_fixed {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 999;
		.nav_content {
			@include f-center();
			box-sizing: border-box;
			padding: 0 30rpx;
			.nav_search {
				width: 100%;
				height: 60rpx;
				border-radius: 60rpx;
				@include f-a-center();
				box-sizing: border-box;
				padding: 0 20rpx;
				background-color: #f1f2f6;
				.nav_search_icon {
					width: 40rpx;
					height: 40rpx;
					font-size: 32rpx;
					margin-right: 20rpx;
					@include f-center();
					color: #999;
				}
				.nav_search_text {
					font-size: 28rpx;
					color: #999;
				}
			}
			.nosearch {
				border-radius: 30rpx;
				border: 1px solid #C0C0C0;
				padding: 0 10px;
				
				.icon{
					display: flex;
					align-items: center;
					.back {
						padding: 10rpx;
						&.activeIcon{
							color: black;
						}
					}
					.home {
						padding: 10rpx;
						&.activeIcon{
							color: black;
						}
					}
				}
			}
			.nav-title{
				flex: 1;
				overflow: hidden;
				font-size: 32rpx;
				text-align: center;
				color: white;
			}
			&.active{
				justify-content: space-between;
			}
		}
	}
}
</style>
