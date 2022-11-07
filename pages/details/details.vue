<template>
	<swiper class="swiper" indicator-dots autoplay circular indicator-active-color="#ffffff">
		<swiper-item v-for="(item,index) in photoVo.carousel" :key="item">
			<image class="carouselimg" :src="item"></image>
		</swiper-item>
	</swiper>
	<view class="price_line1">
		<view class="price_line_top">
			{{priceVo.caHallPrice}}
			<text>万</text>
		</view>
		<view class="price_line_bottom"  v-if="save">
			<view class="price_small">新车完税价：{{priceVo.carNetPrice}}万</view>
			<view class="price_small">为您节约 {{thrift}}万</view>
		</view>
		<view class="price_line_bottom" v-if="!save">
			<view class="price_small cross">新车价：0万</view>
		</view>
	</view>
	<view class="detail_car_title">
		<view class="car_title">{{particulars.carName}}</view>
		<view class="detail_anjie">
			<view class="detail_anjie_title">
				<image src="https://api.tf2sc.cn/img/anjie.png"></image>
				<text>灵活按揭</text>
			</view>
			<view class="monthlyRepayment">
				首付
				<view>30%</view>
				月供约
				<view>{{priceVo.monthlyRepayment}}元</view>
				(36期)
			</view>
		</view>
		<view class="detail_service">
			<image src="../../imgs/commitment.png"></image>
		</view>
	</view>
	<view class="car_base_info">
		<view class="detail_model_title">
			基本信息
		</view>
		<view class="base_info">
			<view class="base_info_div">
				<view class="base_info_item">
					<view>上牌时间</view>
					<text>{{particulars.dateOfRegistration || '-'}}</text>
				</view>
				<view class="base_info_item">
					<view>公里数</view>
					<text>{{particulars.mileage || '-'}}万公里</text>
				</view>
			</view>
			<view class="base_info_div">
				<view class="base_info_item">
					<view>车身颜色</view>
					<text>{{parameterVo.carColor || '-'}}</text>
				</view>
				<view class="base_info_item">
					<view>变速箱</view>
					<text>{{parameterVo.gearbox || '-'}}</text>
				</view>
			</view>
			<view class="base_info_div">
				<view class="base_info_item">
					<view>排量</view>
					<text>{{particulars.displacement || '-'}}</text>
				</view>
				<view class="base_info_item">
					<view>排放标准</view>
					<text>{{parameterVo.emissionStandard || '-'}}</text>
				</view>
			</view>
			<view class="base_info_div">
				<view class="base_info_item">
					<view>燃烧方式</view>
					<text>{{parameterVo.fuel || '-'}}</text>
				</view>
				<view class="base_info_item">
					<view>过户次数</view>
					<text>{{parameterVo.carTransfer || '-'}}</text>
				</view>
			</view>
			<view class="base_info_div">
				<view class="base_info_item">
					<view>出厂日期</view>
					<text>{{parameterVo.deliveryTime || '-'}}</text>
				</view>
				<view class="base_info_item">
					<view>车架号</view>
					<text>{{particulars.carId || '-'}}</text>
				</view>
			</view>
			<view class="base_info_div">
				<view class="base_info_item">
					<view>座位数</view>
					<text>{{particulars.seat || '-'}}</text>
				</view>
				<view class="base_info_item">
					<view>驱动方式</view>
					<text>{{parameterVo.drive || '-'}}</text>
				</view>
			</view>
			<view class="base_info_div">
				<view class="base_info_item">
					<view>车辆描述</view>
					<text>暂无</text>
				</view>
			</view>
		</view>
	</view>
	<view class="warn_info">
		看车前，请先电话咨询商家预约看车，确认车辆在店后前往看车。交易时，注意查验车辆信息和车况，以车辆相关证件为准。
	</view>
	<view class="car_photos">
		<view class="detail_model_titles">车辆图片</view>
		<view class="photos_detail">
			<view class="photos_detail_item" v-for="(item,index) in photoVo.detail" key="item">
				<image :src="item"></image>
			</view>
		</view>
		<view class="photos_remark">注：车辆具体配置信息以实车为准</view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'

	import {
		getCurrentInstance,
		ref
	} from "vue";
	import {
		getParticulars
	} from "@/plugins/apis.js"


	let particulars = ref({})
	let save = ref(true)
	let thrift = ref('')
	let carousel = ref([])
	let caHallPrice = ref('')
	let monthlyRepayment = ref('')
	let carColor = ref('')
	let gearbox = ref('')
	
	
	let parameterVo = ref({})
	let photoVo = ref({})
	let priceVo = ref({})


	onLoad(options => {
		Particulars(options.id)
	})

	let Particulars = (id) => {
		getParticulars(id).then(res => {
			res.data.data.photoVo.carousel = (res.data.data.photoVo.carousel).split(",")
			res.data.data.photoVo.detail = (res.data.data.photoVo.detail).split(",")
			let num = (res.data.data.priceVo.carNetPrice - res.data.data.priceVo.caHallPrice).toFixed(2)

			let apply = (res.data.data.dateOfRegistration).split('-')
			if (apply[1][0]) {
				res.data.data.dateOfRegistration = apply[0] + '年' + apply[1].substr(1) + '月'
			}

			if (res.data.data.parameterVo.deliveryTime) {
				let deliveryTime = (res.data.data.parameterVo.deliveryTime).split('-')
				res.data.data.parameterVo.deliveryTime = deliveryTime[0] + '年' + deliveryTime[1].substr(1) +
					'月'
			}
			res.data.data.carId = (res.data.data.carId).substr(8)


			
			particulars.value = res.data.data
			parameterVo.value = res.data.data.parameterVo
			photoVo.value = res.data.data.photoVo
			priceVo.value = res.data.data.priceVo
			
			console.log(num);
			if (num) {
				save.value = false
				console.log(66);
			}else{
				console.log(22);
				thrift.value = num
			}
		})
	}
</script>

<style scoped>
	/* pages/details/details.wxss */
	.swiper {
		width: 100%;
		height: 480rpx;
	}

	.carouselimg {
		width: 100%;
	}

	.price_line1 {
		width: 100%;
		height: 100rpx;
		background-image: url(https://api.tf2sc.cn/img/jiagetiao1.png);
		background-size: 23.4375rem 3.375rem;
		padding: 20rpx 40rpx 0 30rpx;
		box-sizing: border-box;
		color: #FFFFFF;
		background-color: #FFFFFF;
	}

	.price_line_top {
		display: flex;
		align-items: flex-end;
		font-weight: 600;
	}

	.price_line_top text {
		font-size: 25rpx;
		font-weight: 100;
		margin-left: 10rpx;
	}

	.price_line_bottom {
		display: flex;
	}

	.price_small {
		font-size: 24rpx;
		color: #CCDAFF;
		margin-right: 10rpx;
	}

	.cross {
		text-decoration: line-through;
	}

	.detail_car_title {
		width: 90%;
		padding: 20rpx;
		margin: 0 auto;
	}

	.detail_anjie {
		display: flex;
		padding: 20rpx;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		margin: 0 auto;
		height: 80rpx;
		background: linear-gradient(90deg, #FFF8F3 0%, #FFEDE0 100%);
		border-radius: 15rpx;
		margin-bottom: 30rpx;
		font-size: 28rpx;
	}

	.car_title {
		font-weight: 600;
		margin: 30rpx 0;
	}

	.detail_anjie_title {
		display: flex;
		align-items: center;
	}

	.detail_anjie_title image {
		width: 45rpx;
		height: 45rpx;
	}
	.monthlyRepayment{
		display: flex;
	}
	.monthlyRepayment view {
		color: rgb(245, 153, 79);
	}

	.detail_service image {
		width: 100%;
		height: 250rpx;
	}

	.car_base_info {
		width: 90%;
		margin: 0 auto;
	}

	.detail_model_title {
		font-size: 38rpx;
		color: #333;
		font-weight: 600;
	}

	.base_info {
		font-size: 30rpx;
	}

	.base_info_div {
		display: flex;
		margin-top: 30rpx;
	}

	.base_info_item {
		display: flex;
		width: 50%;
		font-size: 30rpx;
	}

	.base_info_item view {
		color: #999999;
		width: 140rpx;
	}

	.base_info_item text {
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.warn_info {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 40rpx;
		width: 90%;
		margin: 0 auto;
		height: 200rpx;
		font-size: 30rpx;
		color: #333;
		background-color: #fff;
		opacity: .9;
		box-sizing: border-box;
	}

	.car_photos {
		width: 100%;
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
	}

	.detail_model_titles {
		font-size: 38rpx;
		color: #333;
		font-weight: 600;
		width: 90%;
		margin: 0 auto 30rpx;
	}

	.photos_detail_item image {
		width: 100%;
		height: 500rpx;
	}

	.photos_remark {
		text-align: center;
		padding: 20rpx 0;
		font-size: 28rpx;
		color: #999999;
	}
</style>
