import {
	baseURL
} from "@/config.js"

export const request = obj => {
	const {
		url,
		method = 'GET',
		header,
		timeout,
		data
	} = obj
	return new Promise((resolve,reject) =>{
		uni.request({
			url: baseURL + url,
			method,
			data,
			header,
			timeout
		}).then(res=>{
			resolve(res[1].data)
		}).catch(err=>{
			reject(err)
		})
	})
}
