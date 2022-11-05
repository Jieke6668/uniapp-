
// 封装axios
const axios = (obj) => {
	return new Promise((res, rej) => {
		uni.showLoading({
			title: '正在可劲加载~ ~',
		})
		uni.request({
			...obj,
			header: {
				"User-Agent":
					"Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
				PlatformType: "h5"
			},
			success(data) {
				res(data)
				uni.hideLoading()
			},
			fail(err) {
				rej(err)
				uni.hideLoading()
			}
		})
	})
}

export default axios