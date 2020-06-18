<template>
	<view class="search-history">
		<view class="search-title">热门搜索</view>
		<view class="search-body">
			<block v-for="(item, index) in History" :key="index">
				<view class="list-item" @click="tapItem(item)">
					<text>{{ item.name }}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		History: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {};
	},
	created() {},
	methods: {
		tapItem(item) {
			this.$emit('select', item.name);
		}
	}
};
</script>

<style lang="scss">
.search-history {
	width: 100%;
	min-height: 100rpx;
	.search-title {
		font-size: 40rpx;
		font-weight: bold;
		white-space: wrap;
	}
	.search-body {
		min-height: 200rpx;
		.list-item {
			display: inline-block;
			margin: 10rpx;
			padding: 10rpx;
			flex-shrink: 0;
			border: 1px solid #999999;
			border-radius: 10rpx;
		}
	}
}
</style>
