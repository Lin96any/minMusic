<template>
	<view class="car-list">
		<view class="car-title">
			<view class="title">{{carTitle}}</view>
		</view>
		<view class="description">
			{{description}}
		</view>
		<view class="car-body">
			<scroll-view scroll-y="true" class="car-wrapper">
				<block v-for="(item,index) in slice" :key="index">
					
					<view class="car-item" @click.stop="TapClick(item)">
						<view class="musicName">{{item.name}}</view>
						<view class="singer-al">{{item.ar[0].name}} - {{item.al.name}}</view>
					</view>
					
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			carTitle:{
				type:String,
				default:''
			},
			description:{
				type:String,
				default:''
			},
			list:{
				type:Array,
				default(){
					return []
				}
			},
			ids:{
				type:Number,
				default:0
			}
		},
		computed:{
			slice(){
				return this.list.slice(0,20)
			}
		},
		data() {
			return {
				current:-1
			};
		},
		methods:{
			TapClick(item){
				const {id:musicId,name:musicName,al,ar} = item
				const {id:alId,name:alName,picUrl:alpicUrl} = al
				const {id:arId,name:arName} = ar
				const obj = {
					musicId,
					musicName,
					alId,
					alName,
					alpicUrl,
					arId,
					arName
				}
				this.$store.commit('SET-MUSICITEM',obj)
				uni.navigateTo({
					url:'/pages/musicPlay/musicPlay'
				})
			}
		}
	}
</script>

<style lang="scss">
.car-list{
	.description{
		padding-top: 10rpx;
		padding-bottom: 20rpx;
		font-size: 14px;
	}
	.car-title{
		margin-bottom: 20rpx;
		font-size: 38rpx;
		font-weight: bold;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.more{
			font-size: 32px;
			padding: 0 20rpx;
		}
	}
	.car-body{
		height: 700rpx;
		width: 100%;
		border-radius: 10rpx;
		overflow: hidden;
		background-color: #f4f4f4;
		box-sizing: border-box;
		padding: 0 20rpx;
		.car-wrapper{
			height: 690rpx;
			.car-item{
				padding: 30rpx 0;
				.musicName{
					font-weight: bold;
					white-space: nowrap;
					display: -webkit-box;
					-webkit-box-orient:vertical;
					-webkit-line-clamp:1;
				}
				.singer-al{
					font-size: 28rpx;
					line-height: 38rpx;
					font-weight: 400;
					color:#999;
					margin-top: 10rpx;
					white-space: nowrap;
					display: -webkit-box;
					-webkit-box-orient:vertical;
					-webkit-line-clamp:1;
					&.active{
						color: #f07373;
					}
				}
			}
		}
	}
}
</style>
