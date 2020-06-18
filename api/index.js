import {request} from "@/utils/request.js"

/* 获取banner图 */
export const banner = (systemCode)=>{
		return request({
			url:'/banner?type='+systemCode
		})
}

/* 获取推荐歌单 */
export const song = (limit) =>{
	return request({
		url:'/personalized?limit='+limit,
	})
}

/* 获取推荐电台*/
export const djprogram = () =>{
	return request({
		url:'/personalized/djprogram'
	})
}

/* 获取推荐新音乐*/
export const newMusic = () =>{
	return request({
		url:'/personalized/newsong'
	})
}

/* 获取排行榜 */
export const singerRanking = (idx)=>{
	return request({
		url:'/top/list',
		data:{
			idx
		}
	})
}

/* 获取新歌速递 */
export const bigMusic = (type)=>{
	return request({
		url:'/top/song',
		data:{
			type
		}
	})
}

/* 获取音乐播放地址 */
export const getSrc = (id)=>{
	return request({
		url:'/song/url',
		data:{
			id
		}
	})
}

/* 获取音乐播放地址 */
export const getDesc = (id)=>{
	return request({
		url:'/lyric',
		data:{
			id
		}
	})
}

/* 获取相似歌曲 */
export const related = (id)=>{
	return request({
		url:'/simi/song',
		data:{
			id
		}
	})
}

/* 获取歌曲评论 */
export const Comments = (options)=>{
	const {id,offset} = options
	return request({
		url:'/comment/music',
		data:{
			id,
			offset
		}
	})
}

/* 获取电台详情 */
export const getDj = (id)=>{
	return request({
		url:'/dj/program/detail',
		data:{
			id
		}
	})
}

/* 获取歌单详情 */
export const getPlaylistContent = (id)=>{
	return request({
		url:'/playlist/detail',
		data:{
			id
		}
	})
}

/* 获取歌曲详情 */
export const getMusicContent = (id)=>{
	return request({
		url:'/song/detail',
		data:{
			ids:id
		}
	})
}

/* 获取推荐Mv*/
export const getCommentsMv = ()=>{
	return request({
		url:'/personalized/mv'
	})
}

/* 获取网易出品MV */
export const wangyiMv = (offset) =>{
	return request({
		url:'/mv/all',
		data:{
			limit:30,
			offset:offset*30
		}
	})
}

/* 获取MV数据 */
export const Mvcom = (id) =>{
	return request({
		url:'/mv/detail',
		data:{
			mvid:id
		}
	})
}


/* 获取MV地址 */
export const MvUrl = (id) =>{
	return request({
		url:'/mv/url',
		data:{
			id
		}
	})
}

/* 获取相关视频 */
export const correlation = (id) =>{
	return request({
		url:'/simi/mv',
		data:{
			mvid:id
		}
	})
}

/* 搜索 */
export const Search = (keywords,offset) =>{
	return request({
		url:'/search',
		data:{
			keywords,
			offset,
			limit:10
		}
	})
}

/* 热门搜索 */
export const hotsearch = () =>{
	return request({
		url:'/search/hot/detail'
	})
}