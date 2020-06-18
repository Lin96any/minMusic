<template>
	<swiper class="swiper_wrappers" @change="swiperChange">
		<swiper-item v-for="(item,index) in swiperlist" :key="index">
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		data() {
			return {
				current:0
			};
		},
		methods:{
			swiperChange(e){
				this.current = e.detail.current
			}
		}
	}
</script>

<style lang="scss">
.swiper_wrappers{
	width: 100%;
	height: 100%;
	border: 1px solid blue;
}
</style>
