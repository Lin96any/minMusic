<template>
	<view class="swiper_wrappers"><list-card 
	:mode="modeData" 
	:isShows="isShows"
	:listData="listData[tapcurrent]" 
	:rankings="rankings" ></list-card></view>
</template>

<script>
import ListCard from './listcard.vue';
export default {
	props: {
		lists: {
			type: Array,
			default() {
				return [];
			}
		},
		tapcurrent: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			current: 0,
			song: [],
			listData: {},
			newType: 0,
			isShows:false
		};
	},
	computed: {
		modeData() {
			let mode = this.lists[this.tapcurrent].mode;
			return mode;
		}
	},
	watch: {
		tapcurrent: {
			handler(newvalue) {
				switch (newvalue) {
					case 0:
						this.init();
						break;
					case 1:
						this.getRanking();
						break;
					case 2:
						this.getBigMusic(this.newType);
						break;
				}
			},
			immediate: true
		}
	},
	created() {},
	components: {
		ListCard
	},
	methods: {
		/* 初始化数据 获取推荐数据*/
		init() {
			const tapcurrent = this.tapcurrent;
			if (this.listData[tapcurrent]) return;
			const api = this.$api;
			const song = api.song(12);
			const djprogram = api.djprogram();
			const newMusic = api.newMusic();
			const array = [song, djprogram, newMusic];
			this.proAll(array, tapcurrent);
		},
		/* 获取排行榜数据 */
		getRanking() {
			const tapcurrent = this.tapcurrent;
			if (this.listData[tapcurrent]) return;
			const api = this.$api;
			const ranking0 = api.singerRanking(0); /* 云音乐新歌榜*/
			const ranking1 = api.singerRanking(31); /* 云音乐欧美热歌榜 */
			const ranking2 = api.singerRanking(2); /* 网易原创歌曲榜 */
			const ranking3 = api.singerRanking(3); /* 云音乐飙升榜 */
			const ranking4 = api.singerRanking(4); /* 云音乐电音榜 */
			const ranking5 = api.singerRanking(26); /* 抖音排行榜 */
			const array = [ranking0, ranking1, ranking2, ranking3, ranking4, ranking5];
			this.proAll(array, tapcurrent);
		},
		/* 获取新歌速递 */
		getBigMusic(type) {
			const tapcurrent = this.tapcurrent;
			const getNewList = this.$store.getters.getNewList
			if (getNewList&&getNewList.length>0) return;
			const api = this.$api;
			const musicData = api.bigMusic(type);
			const array = [musicData];
			this.proAll(array, tapcurrent);
		},
		/* 网络请求 */
		proAll(array, tapcurrent) {
			this.isShows = true
			const arryas = [];
			let obj = {};
			Promise.all(array).then(res => {
				if (tapcurrent === 1) {
					/* 数据处理 */
					res.forEach(item => {
						let { tracks, id, name, description } = item.playlist;
						obj = {
							tracks,
							id,
							name,
							description
						};
						arryas.push(obj);
						this.$set(this.listData, tapcurrent, arryas);
					});
				} else if (tapcurrent === 2) {
					const newMusicList = [];
					let newData = {};
					const data = res[0].data;
					/* 遍历循环 */
					data.forEach(item => {
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
						newMusicList.push(newData);
					});
					this.$store.dispatch('setMusicList', newMusicList.slice(0, 20));
				} else {
					this.$set(this.listData, tapcurrent, res);
				}
				this.isShows = false
			});
		}
	}
};
</script>

<style lang="scss">
.swiper_wrappers {
	width: 100%;
}
</style>
