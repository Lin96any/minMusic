<template>
	<view class="search-wrapper">
		<navbar :isSearch="false" :isIcon="true"></navbar>
		<view class="search-wrappers">
			<view class="search"><input type="text" v-model="searchValue" placeholder="请输入搜索关键字" @input="inputvalue" focus="true" /></view>
			<view class="search-icon" v-show="searchValue" @click="clearValue">x</view>
		</view>
		<view class="search-list" v-if="searchList.length > 0 && searchValue.length">
			<block v-for="(item, index) in searchList" :key="index">
				<view class="list" @click="tapSelected(item)">
					<view class="list-search"><uni-icons type="search" color="#9999"></uni-icons></view>
					<view class="list-item">{{ item.name }}</view>
				</view>
			</block>
		</view>

		<view class="search-explain" v-show="!searchValue.length">
			<!-- 搜索历史 -->
			<search-history :History="history" @select="select"></search-history>

			<!-- 热门搜索 -->
			<hot-search @select="select"></hot-search>
		</view>
	</view>
</template>

<script>
import SearchHistory from './children/search-history.vue';
import HotSearch from './children/hot-search.vue';
import {searchStorege} from '@/utils/storege.js';
export default {
	data() {
		return {
			timer: false,
			inter: null,
			offset: 1,
			searchList: [],
			searchValue: '',
			history:[]
		};
	},
	components: {
		SearchHistory,
		HotSearch,
	},
	onShow() {
		this.init()
	},
	methods: {
		/* 初始化 */
		init(){
			/* 初始化 */
			const Hisory = uni.getStorageSync('searchHistory')
			this.history = Hisory
		},
		select(item){
			this.search(item,1)
			this.searchValue = item
		},
		clearValue() {
			this.searchValue = '';
		},
		inputvalue(e) {
			if (this.inter) {
				clearInterval(this.inter);
			}
			this.inter = setTimeout(() => {
				const value = e.detail.value;
				const offset = this.offset;
				if (value.length) {
					this.search(value, offset);
				}
			}, 800);
		},
		tapSelected(item) {
			try{
				searchStorege(item)
			}catch(e){
				//TODO handle the exception
			}
			this.getitemCont(item.id);
		},
		search(keywords, offset) {
			this.$api.Search(keywords, offset).then(res => {
				const { code, result } = res;
				if (code === 200 && result.songs) {
					const searchList = result.songs;
					let list = [];
					let listObj = {};
					searchList.forEach(item => {
						const { name, id } = item;
						listObj = {
							name,
							id
						};
						list.push(listObj);
					});
					this.searchList = list;
				}
			});
		},
		getitemCont(id) {
			this.$api.getMusicContent(id).then(res => {
				const { code, songs } = res;
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
				});

				this.$store.commit('SET-MUSICITEM', itemObj);
				uni.navigateTo({
					url: '/pages/musicPlay/musicPlay'
				});
			});
		}
	}
};
</script>

<style lang="scss">
.search-wrappers {
	width: 100%;
	height: 80rpx;
	border-radius: 80rpx;
	padding-right: 20rpx;
	box-sizing: border-box;
	display: flex;
	background-color: rgba(0, 0, 0, 0.1);
	align-items: center;
	.search-icon {
		width: 60rpx;
		height: 60rpx;
		font-size: 40rpx;
		overflow: hidden;
		line-height: 60rpx;
		text-align: center;
		color: #999999;
	}
	.search {
		height: 100%;
		padding: 0 20rpx;
		flex: 1;
		overflow: hidden;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		input {
			width: 100%;
			height: 80rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			text-align: center;
		}
	}
}
.search-list {
	width: 100%;
	padding: 0 20rpx;
	box-sizing: border-box;
	.list {
		margin: 20rpx 0;
		display: flex;
		align-items: center;
		padding: 10rpx 0;
		.list-search {
			width: 40rpx;
			height: 40rpx;
			overflow: hidden;
		}
		.list-item {
			margin-left: 10rpx;
			flex: 1;
			line-height: 40rpx;
		}
	}
}
.search-explain {
	margin-top: 20rpx;
	width: 100%;
	padding: 0 20rpx;
	box-sizing: border-box;
}
</style>
