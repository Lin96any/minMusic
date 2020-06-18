<template>
	<view class="play-wrapper">
		<view class="background" :style="setbg"></view>
		<navbar :isSearch="false"></navbar>
		<view class="scroll-wrapper">
			<scroll-view scroll-y="true" class="scroll" @scrolltolower="scrolltolower">
				<view class="scroll-center">
					<view class="scroll-img">
						<view class="bgimage" :class="{ rotate: palyStatus === 'stop' }" :style="setbg"></view>
						<view class="iconfont icons" v-html="getPlyStatus" @click="tapStatus"></view>
					</view>
					<view class="lrc-wrapper">
						<scroll-view scroll-y="true" class="lrc-content" :scroll-into-view="itemId" scroll-with-animation>
							<block v-for="(item, index) in storelrcContent" :key="index">
								<view class="lrc-text" :class="{ active: currentIndex === index }" :id="disposeId(item)">{{ item[1] }}</view>
							</block>
						</scroll-view>
					</view>
					<view class="related-wrapper"><related :musicId="getMusicId" @selected="selected"></related></view>
					<view class="comments-wrapper"><comments :musicItem="musicItem" :offset="offset"></comments></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import related from './children/related.vue';
import comments from './children/comments.vue';
export default {
	data() {
		return {
			musicItem: null,
			audioObj: null,
			palyStatus: 'play',
			lrc: '',
			itemId: 'scroll-0',
			/* 歌词转化后的数组 */
			storelrcContent: [],
			/* 歌词滚动的距离 */
			storeMarginTop: 0,
			/* 当前显示第几行 */
			currentIndex: 0,
			/* 评论页数 */
			offset: 1
		};
	},
	components: {
		related,
		comments
	},
	onLoad() {
		/* 判断当前是否播放的是统一首歌 */
		const music = this.$store.getters.getMusic;
		const oldMusicId = this.$store.getters.getmusicId;
		if (oldMusicId && music.musicId === oldMusicId) {
			this.musicItem = music;
			this.palyStatus = this.$store.getters.getplayStatus;
			this.audioObj =  this.$store.getters.getAudio;
			this.getDesc(oldMusicId);
			this.cureentTime(this.audioObj)
		} else {
			if (this.audioObj) {
				this.audioObj.stop();
			}
			this.musicItem = music;
			this.getMusicSrc(music.musicId);
		}
	},
	computed: {
		setbg() {
			return this.musicItem && this.musicItem.alpicUrl ? 'background-image:url(' + this.musicItem.alpicUrl + ')' : '';
		},
		getPlyStatus() {
			return this.palyStatus === 'play' ? '&#xe615;' : '&#xe79f;';
		},
		getMusicId() {
			return this.$store.getters.getMusic.musicId;
		}
	},
	watch: {
		storelrcContent(newValue) {
			this.itemId = 'scroll-00-00-00';
		}
	},
	methods: {
		/* Id处理 */
		disposeId(item) {
			return 'scroll-' + String(item[0]).replace('.', '-');
		},
		audios(src, id) {
			/* 获取音频对象 */
			const audio = uni.getBackgroundAudioManager();
			this.audioObj = audio;
			audio.src = src;
			const { musicName, alName, arName, alpicUrl, musicId } = this.musicItem;
			audio.title = musicName;
			audio.epname = alName;
			audio.singer = arName;
			audio.coverImgUrl = alpicUrl;
			this.$store.commit('SET-PlayStatus', 'stop');
			this.$store.commit('SET-MUSICID', musicId);
			this.$store.commit('SET-AUdio', audio);
			audio.onCanplay(res => {
				this.palyStatus = 'stop';
				audio.play();
				/* 获取歌词 */
				try {
					this.getDesc(id);
				} catch (e) {
					//TODO handle the exception
					this.lrc = '暂时没有歌词噢';
				}
			});

			audio.onError(() => {
				uni.showToast({
					title: '播放失败',
					icon: 'none'
				});
				this.palyStatus = 'play';
				audio.pause();
			});
			/* 音乐进度监听 */
			this.cureentTime(audio)
		},
		/* 音乐进度监听 */
		cureentTime(audio){
			audio.onTimeUpdate(res => {
				/* 获取歌词转化后的数组 */
				const storelrcContent = this.storelrcContent;
			
				for (let i = 0; i < storelrcContent.length; i++) {
					const next = storelrcContent[i + 1];
					const timer = audio.currentTime.toFixed(3);
			
					if (next && timer > storelrcContent[i][0] && timer < next[0]) {
						this.currentIndex = i;
						//延迟滚动
						if (i < 3) return;
						this.itemId = 'scroll-' + String(storelrcContent[i][0]).replace('.', '-');
					}
				}
			});
		},
		/* 获取音乐播放地址 */
		getMusicSrc(id) {
			this.$api.getSrc(id).then(res => {
				const { code, data } = res;
				if (code === 200) {
					const src = data[0].url;
					if(!src){
						uni.showToast({
							title:"此歌曲暂不能播放",
							icon:'none'
						})
					}else{
						this.audios(src, id);
					}
					
				}
			});
		},
		/* 获取歌词 */
		getDesc(id) {
			/* 获取歌词 */
			this.$api.getDesc(id).then(res => {
				const { code, lrc } = res;
				if (code === 200) {
					const lyric = lrc.lyric;
					const result = this.sliceNull(this._disposeLrc(lyric));
					this.storelrcContent = result;
				} else {
					this.lrc = '暂时没有歌词噢';
				}
			});
		},
		/* 歌词处理 */
		_disposeLrc(lrc) {
			const result = [];
			let lines = lrc.split('\n'); //切割每一行

			const pattern = /\[\d{2}:\d{2}.\d{2,3}\]/g; //正则匹配

			/* 除去不包含时间的行 */
			while (!pattern.test(lines[0])) {
				lines = lines.slice(1);
			}

			lines[lines.length - 1].length === 0 && lines.pop(); //消除最后一个为空元素，这里将去掉
			lines.forEach(function(v /*数组元素值*/, i /*元素索引*/, a /*数组本身*/) {
				//提取出时间[xx:xx.xx]
				var time = v.match(pattern);
				//提取歌词
				let value = v.replace(pattern, '');
				// 因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
				time.forEach(function(v1, i1, a1) {
					//去掉时间里的中括号得到xx:xx.xx
					var t = v1.slice(1, -1).split(':');
					//将结果压入最终数组
					result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
				});
			});

			//最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
			result.sort(function(a, b) {
				return a[0] - b[0];
			});
			return result;
		},
		/* 去除空白 */
		sliceNull: function(lrc) {
			var result = [];
			for (var i = 0; i < lrc.length; i++) {
				if (lrc[i][1] == '') {
				} else {
					result.push(lrc[i]);
				}
			}
			return result;
		},
		/* 状态切换 */
		tapStatus() {
			if (this.palyStatus === 'play') {
				this.audioObj.play();
				this.palyStatus = 'stop';
			} else {
				this.audioObj.pause();
				this.palyStatus = 'play';
			}
		},
		/* 获取选中的相似歌曲 */
		selected(item) {
			this.audioObj.stop();
			this.getMusicSrc(item.musicId);
			this.musicItem = item;
			this.offset = 1;
		},
		/* 触底事件 */
		scrolltolower() {
			this.offset++;
		}
	}
};
</script>

<style lang="scss">
@keyframes rotate {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
page {
	width: 100%;
	height: 100%;
	.play-wrapper {
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
		.scroll-wrapper {
			flex: 1;
			overflow: hidden;
			.scroll {
				width: 100%;
				height: 100%;
				.scroll-center {
					width: 100%;
					min-height: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					.scroll-img {
						width: 500rpx;
						height: 500rpx;
						overflow: hidden;
						margin-top: 100rpx;
						position: relative;
						.bgimage {
							width: 100%;
							height: 100%;
							border-radius: 50%;
							background-size: cover;
							background-repeat: no-repeat;
							background-position: center;
							&.rotate {
								animation: rotate 5s linear infinite;
							}
						}
						.icons {
							width: 80rpx;
							height: 80rpx;
							position: absolute;
							top: 0;
							left: 0;
							bottom: 0;
							right: 0;
							margin: auto;
							font-size: 64rpx;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
					.lrc-wrapper {
						width: 100%;
						margin-top: 50rpx;
						height: 200rpx;
						.lrc-content {
							width: 100%;
							height: 100%;
							overflow: hidden;
							.lrc-text {
								width: 100%;
								text-align: center;
								font-size: 24rpx;
								line-height: 40rpx;
								margin: 10rpx 0;
								transition: all 0.5s linear;
								&.active {
									color: #f07373;
								}
							}
						}
					}
					.related-wrapper {
						width: 100%;
					}
				}
			}
		}
	}
}
</style>
