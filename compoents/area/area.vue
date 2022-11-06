<template>
	<view class="search">
		<image src="../../img/地图-地标.png" class="search-img"></image>
		<view class="search-text" @click="tiao">全国</view>
		<view class="search-input">
			<input type="text" class="inputs" placeholder="搜索品牌、车型" @input="bindKeyInput" />
			<image class="input-img" src="../../img/搜索框.png" @click="seachs"></image>
		</view>
	</view>
</template>

<script setup>
	import {
		seach
	} from "../../plugins/apis.js"
	import {
		ref
	} from "vue"
	let inputvalue = ref('')
	const tiao = () => {
		uni.navigateTo({
			url: '/pages/area/area',
		})
	}
	const bindKeyInput = (e) => {
		inputvalue.value = e.detail.value
	}
	let page = ref("1")
	const seachs = () => {
		console.log(1);
        console.log(inputvalue.value)
		seach({
			page: page.value,
			carName: inputvalue.value
		}).then(res => {
			console.log(res);
		})
	}
</script>

<style scoped>
	.search {
		display: flex;
		width: 700rpx;
		margin: 0 auto;
		margin-top: 10rpx;
	}

	.search-img {
		width: 50rpx;
		height: 50rpx;
	}

	.search-text {
		margin-left: 20rpx;
		font-size: 14px;
	}

	.search-input {
		margin-left: 50rpx;
	}

	.inputs {
		width: 400rpx;
		height: 50rpx;
		border: 1px solid black;
		border-radius: 25rpx;
		position: relative;
		padding-left: 70rpx;
		font-size: 13px;
	}

	.input-img {
		position: absolute;
		width: 50rpx;
		height: 50rpx;
		top: 1rpx;
		margin-left: 10rpx;
	}
</style>
