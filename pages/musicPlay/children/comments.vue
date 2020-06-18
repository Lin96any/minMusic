<template>
	<view class="comments">
		 <view class="comments-title">
			 <text>精彩评论</text>
		 </view>
		 <view class="comments-content">
			 <block v-for="(item,index) in comments" :key="index">
				 <view class="content">
				 				 <view class="content-img">
									 <image :src="item.avatarUrl" mode="widthFix"></image>
								 </view>
				 				 <view class="content-text">
				 					 <view class="nickname">
										 {{item.nickname}}
									 </view>
				 					 <view class="text">
										 {{item.content}}
									 </view>
				 				 </view>
				 </view>
				 
			 </block>
			 <tips :isActive="true" text="上拉加载更多"></tips>
		 </view>
	</view>
</template>

<script>
	export default {
		props:{
			musicItem:{
				type:Object,
				default(){
					return {
						
					}
				}
			},
			offset:{
				type:Number,
				default:1
			}
		},
		data(){
			return {
				musicId:null,
				comments:[]
			}
		},
		mounted() {
			
		},
		computed:{
			
		},
		methods:{
			/* 获取歌曲评论 */
			getHotComments(id,offset){
				this.$api.Comments({
					id,
					offset
				}).then(res=>{
					if(res.code!==200)return 
					const {comments} = res
					let userObje = {}
					const userComments = []
					comments.forEach(item=>{
						const {content,user} = item
						const {avatarUrl,nickname} = user
						userObje = {
							content,
							avatarUrl,
							nickname
						}
						userComments.push(userObje)
					})
					/* 合并数组 */
					this.comments.push(...userComments)
				})
			}
		},
		watch:{
			musicItem(newvalue){
				this.comments = []
				const {musicId} = newvalue
				this.musicId = musicId
				this.getHotComments(musicId,this.offset)
			},
			offset(newValue){
				this.getHotComments(this.musicId,newValue)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comments{
		.comments-title{
			margin-bottom: 20rpx;
		}
		.comments-content{
			padding: 0 20rpx;
			box-sizing: border-box;
			.content{
				display: flex;
				margin-top: 20rpx;
				.content-img{
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 20rpx;
					image{
						width: 100%;
					}
				}
				.content-text{
					flex: 1;
					overflow: hidden;
					display: flex;
					flex-direction: column;
					border-bottom: 1px solid rgba(255,255,255,.2);
					.nickname{
						font-size: 24rpx;
						color:#999999;
						line-height: 60rpx;
					}
					.text{
						font-size: 28rpx;
						line-height: 40rpx;
						margin-bottom: 20rpx;
					}
				}
			}
		}
	}
</style>
