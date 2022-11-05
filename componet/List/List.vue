<template>
	<view class="contentbox">
		<view class="content" @click="details(item.ind)" v-for="(item,index) in content" :key="item">
			<image class="contentimg" :src="item.cover"></image>
			<view class="deploybox">
				<view class="carname">{{item.carName}}</view>
				<view class="deploy">
					<view class="time">{{item.dateOfRegistration}}</view>
					<view class="gang"> / </view>
					<view class="kilometre">{{item.mileage}}万公里</view>
				</view>
				<view class="price">{{item.currentPrice}}万</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps
	} from "vue";
	const props = defineProps(["content"]);

	const details = (e)=>{
		wx.navigateTo({
			url: '/pages/details/details',
			success: res => {
				// 通过 eventChannel 向被打开页面传送数据
				res.eventChannel.emit('id', e.currentTarget.dataset.id)
			}
		})
		// console.log(e.currentTarget.dataset.id);
	}
</script>

<style scoped>
	.contentbox {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.content {
		width: 49%;
		border-radius: 15rpx;
		overflow: hidden;
		background-color: rgb(246, 247, 246);
		margin-bottom: 10rpx;
	}

	.content .contentimg {
		width: 100%;
		height: 250rpx;
	}

	.carname {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 600;
	}

	.deploybox {
		padding: 15rpx;
	}

	.deploy {
		margin: 10rpx 0;
		font-size: 24rpx;
		color: rgb(182, 187, 182);
		display: flex;
	}

	.gang {
		margin: 0 5rpx;
	}

	.price {
		color: red;
		font-weight: 600;
	}
</style>
