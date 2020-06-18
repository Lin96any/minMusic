<template>
	<scroll-view scroll-y="true" class="scroll-core">
		<slot></slot>
	</scroll-view>
</template>

<script>
export default {
	props:{
		current:{
			type:Number,
			default:0
		}
	},
	data() {
		return {

		};
	},
	created() {
		
	},
	methods:{

	}
};
</script>

<style lang="scss">
.scroll-core {
	width: 100%;
	height: 100%;
}
</style>
