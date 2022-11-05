<template>
	<view class="box">
		<view class="hot">
			<view class="hotname">本地热销车型</view>
			<view class="more">查看更多</view>
		</view>
		<!-- 列表组件 -->
		<List :content="content"></List>
	</view>
</template>

<script setup>
	import List from "@/componet/List/List.vue";

	import {
		getList
	} from "@/plugins/apis.js"

	import {
		ref
	} from "vue";

	const latitude = ref('')
	const longitude = ref('')
	const content = ref([])

	uni.getLocation({
		type: 'gcj02',
		success: res => {
			//赋值经纬度
			console.log(res.latitude);
			console.log(res.longitude);
			latitude.value = res.latitude
			longitude.value = res.longitude
		}
	})
	
	getList({}).then(res => {
		res.data.data.content.forEach(ele => {
			let date = new Date(ele.dateOfRegistration); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			let Y = date.getFullYear() + '-';
			let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
			ele.dateOfRegistration = Y + M + D
		});
		content.value = res.data.data.content
		// console.log(res.data.data.content);
	})
</script>

<style scoped>
	.map {
		width: 100%;
		height: 500rpx;
	}

	.echarts {
		width: 100%;
		height: 500rpx;
	}

	ec-canvas {
		width: 100%;
		height: 100%;
	}

	.box {
		width: 90%;
		margin: 0 auto;
	}

	.hot {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 25rpx;
	}

	.hotname {
		font-size: 35rpx;
		font-weight: 600;
	}

	.more {
		font-size: 25rpx;
		color: rgb(144, 150, 144);
	}
</style>
