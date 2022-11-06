<template>
	<Area></Area>
	<view class="classify">
		<view class="classify-box">
			<view class="classify_text">排序</view>
			<image src="../../img/下三角.png" class="classify-img"></image>
		</view>
		<view class="classify-box">
			<view class="classify_text" @click="dian">品牌</view>
			<image src="../../img/下三角.png" class="classify-img"></image>
			<view class="classify-clincd" v-if="flag">
				<view class="brand" v-for="(item,index) in brandlist" :key="index" data-id="{{item.id}}"
					@click="branddian(item.id)">
					<view class="brand_c" v-if="flagg">
						<image :src="item.imageUrl" class="brand_img"></image>
						<view class="brand_text">{{item.brand}}</view>
					</view>
				</view>
				<view class="clincd_er" v-if="flaggg">
					<block v-for="(item,index) in brandclicnds" :key="index">
						<view class="clincd_txt" @click="transfer(item.id)">{{item.series}}</view>
					</block>
				</view>
			</view>
		</view>
		<view class="classify-box">
			<view class="classify_text" @click="pricedian">价格</view>
			<image src="../../img/下三角.png" class="classify-img"></image>
			<view class="classify_price" v-if="pticeflag">
				<view class="price" v-for="(item,index) in prices" :key="index">
					<view class="price_text" @click="ptices">{{item.label}}</view>
				</view>
			</view>
		</view>
		<view class="classify-box">
			<view class="classify_text" @click="vehcledian">车型</view>
			<image src="../../img/下三角.png" class="classify-img"></image>
			<view class="classify_price" v-if="vehicleflag">
				<view class="price"  v-for="(item,index) in vehiclelist" :key="index" @click="vehcledians(item.id)">
					
					<image class="vehcle" :src="item.logo"></image>
					<view class="price_text">{{item.model}}</view>
				</view>
			</view>
		</view>
		<view class="classify-box">
			<view class="classify_text">更多</view>
			<image src="../../img/下三角.png" class="classify-img"></image>
		</view>
	</view>
	<List :content="content"></List>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		getList,
		brand,
		price,
		vehicle,
		brandclicnd
	} from "@/plugins/apis.js";
	import Area from "@/compoents/area/area";
	import List from "@/compoents/list/list";
	import {
		getCurrentInstance,
		ref
	} from "vue";

	let content = ref([])
	let brandlist = ref([])
	let brandclicnds = ref([])
	let flagg = ref("true")
	let flaggg = ref("")
	let flag = ref("")
	let prices = ref([])
	let pticeflag = ref("")
	let vehiclelist =ref([])
	let vehicleflag = ref("")
	onLoad(options => {
		//请求初始数据
		getList({}).then(res => {
			res.data.data.content.forEach(ele => {
				let date = new Date(ele.dateOfRegistration)
				let Y = date.getFullYear() + '-'
				let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +
					1) + '-'
				let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ''
				ele.dateOfRegistration = Y + M + D
			})
			content.value = res.data.data.content
		})
		//车辆请求
		brand({}).then(res => {
			brandlist.value = res.data.data.content
		})
		//价格请求
		let query = []
		price({}).then(res => {
			res.data.data.forEach(e => {
				query.value = e.queryRules
				query.value.replace(" ", "")
				e.queryRules = JSON.parse(query.value)
			})
			prices.value = res.data.data
		})
		//车型
		vehicle({}).then(res => {
			vehiclelist.value = res.data.data.content
			console.log(vehiclelist.value);
		})
	})
	//显示品牌
	let dian = () => {
		flag.value = "true"
		flagg.value = "true"
		flaggg.value = ""
	}
	//品牌点击事件
	const branddian = (e) => {
		console.log(e);
		flagg.value = ""
		flaggg.value = "true"
		brandclicnd({
			brandId: e
		}).then(res => {
			brandclicnds.value = res.data.data.content
		})
	}
	//品牌点点点事件
	const transfer = (e) => {
		console.log(1);
		getList({
			Page: "1",
			carSeries: e
		}).then(res => {
			res.data.data.content.forEach(ele => {
				let date = new Date(ele.dateOfRegistration); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +
					1) + '-';
				let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
				ele.dateOfRegistration = Y + M + D
			});
			flag.value = "",
				content.value = res.data.data.content
		})
	}
	//价格显示事件
	const pricedian = (e) => {
		pticeflag.value = "true"
	}
	//价格点击事件
	const ptices=()=>{
				pticeflag.value=""
		}
		//车型显示事件
    const vehcledian=()=>{
		console.log(1);
				vehicleflag.value="true"
		}
		//车型点击事件
	const vehcledians=(e)=>{
		 	vehicleflag.value=""
			getList({
				Page: "1",
				carModel: e
			}).then(res => {
				res.data.data.content.forEach(ele => {
					let date = new Date(ele.dateOfRegistration); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
					let Y = date.getFullYear() + '-';
					let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +
						1) + '-';
					let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
					ele.dateOfRegistration = Y + M + D
				});
				
					flag.value="",
					content.value=res.data.data.content
			})
		}
</script>

<style scoped>
	.classify {
		margin: 30rpx 0;
	}

	.classify-box {
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: relative;
		z-index: 10;
	}

	.clincd_er {
		position: absolute;
		top: 0;
	}

	.clincd_txt {
		margin: 10rpx;
	}

	.brand_c {
		display: flex;
	}

	.classify-img {
		width: 40rpx;
		height: 40rpx;
	}

	.classify_text {
		font-size: 14px;
	}

	.classify {
		display: flex;
		justify-content: space-around;
	}

	.classify_price {
		width: 220rpx;
		background-color: white;
		position: absolute;
		top: 40rpx;
		text-align: center;
		font-size: 14px;
		z-index:10;
	}

	.price {
		margin: 15rpx;
		display: flex;
	}

	.vehcle {
		width: 50rpx;
		height: 50rpx;
	}

	.classify-clincd {
		width: 370rpx;
		height: 400rpx;
		position: absolute;
		top: 50rpx;
		background-color: white;
		overflow: auto;
	}

	.brand {
		display: flex;
		padding: 10rpx;
	}

	.brand_img {
		width: 50rpx;
		height: 50rpx;
	}
</style>
