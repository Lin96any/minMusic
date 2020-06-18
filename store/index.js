import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		newMusicList:[],
		MusicItem:null,
		offset:1,
		dj:{},
		playlist:{},
		palyStatus:'',
		musicId:0,
		audioObj:{},
		mvObj:{}
	},
	mutations:{
		'SET-MUSIC-LIST':(state,list) =>{state.newMusicList= list},
		"SET-MUSICITEM":(state,item) =>{state.MusicItem = item},
		"SET-DJ":(state,dj) =>{state.dj = dj},
		"SET-PLAYLIST":(state,playlist) =>{state.playlist = playlist},
		'SET-OFFSET':(state) =>{state.offset+=1},
		'SET-PlayStatus':(state,status) =>{
			state.palyStatus=status
		},
		'SET-MUSICID':(state,id) =>{
			state.musicId=id
		},
		'SET-AUdio':(state,audio) =>{
			state.audioObj=audio
		},
		'SET-Video':(state,video) =>{
			state.mvObj=video
		},
	},
	actions:{
		setMusicList:({commit},list) =>{
			commit('SET-MUSIC-LIST',list)
		}
	},
	getters:{
		getAudio:(state) =>state.audioObj,
		getNewList:(state) => state.newMusicList,
		getMusic:(state) => state.MusicItem,
		getoffset:(state) =>state.offset,
		getdj:(state) =>state.dj,
		getplaylist:(state) =>state.playlist,
		getplayStatus:(state) =>state.palyStatus,
		getmusicId:(state) =>state.musicId,
		getMV:(state) =>state.mvObj
	}
})

export default store