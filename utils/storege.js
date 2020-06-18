/* 设置 */
export const setStorege = (key, value) => {
	uni.setStorage({
		key,
		data:value
	})
}

/* 设置搜索Storege */
export const searchStorege = (value) => {
	let search = uni.getStorageSync('searchHistory')

	if (!search.length) {
		search = []
	}
	const index = search.findIndex(item => {
		return item.id === value.id
	})

	if (index === -1) {
		search.push(value)
		setStorege('searchHistory', search)
	}
}

/* 获取 */
