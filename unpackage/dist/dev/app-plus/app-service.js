var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(callback()).then(() => value), (reason) => promise.resolve(callback()).then(() => {
      throw reason;
    }));
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const ON_LOAD = "onLoad";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const axios = (obj) => {
    return new Promise((res, rej) => {
      uni.showLoading({
        title: "\u6B63\u5728\u53EF\u52B2\u52A0\u8F7D~ ~"
      });
      uni.request(__spreadProps(__spreadValues({}, obj), {
        header: {
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
          PlatformType: "h5"
        },
        success(data) {
          res(data);
          uni.hideLoading();
        },
        fail(err) {
          rej(err);
          uni.hideLoading();
        }
      }));
    });
  };
  const baseUrl = "https://api.tf2sc.cn/api/tfcar/car";
  function getList(obj) {
    return axios({
      url: baseUrl + "/list?",
      data: __spreadValues({}, obj)
    });
  }
  function seach(obj) {
    return axios({
      url: baseUrl + "/list",
      data: __spreadValues({}, obj)
    });
  }
  function brand(obj) {
    return axios({
      url: baseUrl + "/brand300",
      data: __spreadValues({}, obj)
    });
  }
  function brandclicnd(obj) {
    return axios({
      url: baseUrl + "/series300?",
      data: __spreadValues({}, obj)
    });
  }
  function price(obj) {
    return axios({
      url: baseUrl + "/price?",
      data: __spreadValues({}, obj)
    });
  }
  function vehicle(obj) {
    return axios({
      url: baseUrl + "/model",
      data: __spreadValues({}, obj)
    });
  }
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$6 = {
    __name: "index",
    setup(__props) {
      const latitude = vue.ref("");
      const longitude = vue.ref("");
      const content = vue.ref([]);
      uni.getLocation({
        type: "gcj02",
        success: (res) => {
          formatAppLog("log", "at pages/index/index.vue:31", res.latitude);
          formatAppLog("log", "at pages/index/index.vue:32", res.longitude);
          latitude.value = res.latitude;
          longitude.value = res.longitude;
        }
      });
      getList({}).then((res) => {
        res.data.data.content.forEach((ele) => {
          let date = new Date(ele.dateOfRegistration);
          let Y = date.getFullYear() + "-";
          let M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
          let D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
          ele.dateOfRegistration = Y + M + D;
        });
        content.value = res.data.data.content;
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "box" }, [
          vue.createElementVNode("view", { class: "hot" }, [
            vue.createElementVNode("view", { class: "hotname" }, "\u672C\u5730\u70ED\u9500\u8F66\u578B"),
            vue.createElementVNode("view", { class: "more" }, "\u67E5\u770B\u66F4\u591A")
          ]),
          vue.createCommentVNode(" \u5217\u8868\u7EC4\u4EF6 "),
          vue.createCommentVNode(' <List :content="content"></List> ')
        ]);
      };
    }
  };
  var PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-57280228"], ["__file", "D:/uin-app/2/uniapp-tefa/pages/index/index.vue"]]);
  var _imports_0$1 = "/img/\u4E0B\u4E09\u89D2.png";
  var _imports_0 = "/img/\u5730\u56FE-\u5730\u6807.png";
  var _imports_1 = "/img/\u641C\u7D22\u6846.png";
  const _sfc_main$5 = {
    __name: "area",
    setup(__props) {
      let inputvalue = vue.ref("");
      const tiao = () => {
        uni.navigateTo({
          url: "/pages/area/area"
        });
      };
      const bindKeyInput = (e) => {
        inputvalue.value = e.detail.value;
      };
      let page = vue.ref("1");
      const seachs = () => {
        formatAppLog("log", "at compoents/area/area.vue:30", 1);
        formatAppLog("log", "at compoents/area/area.vue:31", inputvalue.value);
        seach({
          page: page.value,
          carName: inputvalue.value
        }).then((res) => {
          formatAppLog("log", "at compoents/area/area.vue:36", res);
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "search" }, [
          vue.createElementVNode("image", {
            src: _imports_0,
            class: "search-img"
          }),
          vue.createElementVNode("view", {
            class: "search-text",
            onClick: tiao
          }, "\u5168\u56FD"),
          vue.createElementVNode("view", { class: "search-input" }, [
            vue.createElementVNode("input", {
              type: "text",
              class: "inputs",
              placeholder: "\u641C\u7D22\u54C1\u724C\u3001\u8F66\u578B",
              onInput: bindKeyInput
            }, null, 32),
            vue.createElementVNode("image", {
              class: "input-img",
              src: _imports_1,
              onClick: seachs
            })
          ])
        ]);
      };
    }
  };
  var Area = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-b8dd0cec"], ["__file", "D:/uin-app/2/uniapp-tefa/compoents/area/area.vue"]]);
  const _sfc_main$4 = {
    __name: "list",
    props: ["content"],
    setup(__props) {
      const details = (e) => {
        formatAppLog("log", "at compoents/list/list.vue:25", e);
        uni.navigateTo({
          url: "/pages/details/details",
          success(res) {
          }
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "contentbox" }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.content, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "content",
              onClick: ($event) => details(item.ind),
              key: item
            }, [
              vue.createElementVNode("image", {
                class: "contentimg",
                src: item.cover
              }, null, 8, ["src"]),
              vue.createElementVNode("view", { class: "deploybox" }, [
                vue.createElementVNode("view", { class: "carname" }, vue.toDisplayString(item.carName), 1),
                vue.createElementVNode("view", { class: "deploy" }, [
                  vue.createElementVNode("view", { class: "time" }, vue.toDisplayString(item.dateOfRegistration), 1),
                  vue.createElementVNode("view", { class: "gang" }, " / "),
                  vue.createElementVNode("view", { class: "kilometre" }, vue.toDisplayString(item.mileage) + "\u4E07\u516C\u91CC", 1)
                ]),
                vue.createElementVNode("view", { class: "price" }, vue.toDisplayString(item.currentPrice) + "\u4E07", 1)
              ])
            ], 8, ["onClick"]);
          }), 128))
        ]);
      };
    }
  };
  var List = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-d124e7ac"], ["__file", "D:/uin-app/2/uniapp-tefa/compoents/list/list.vue"]]);
  const _sfc_main$3 = {
    __name: "second",
    setup(__props) {
      let content = vue.ref([]);
      let brandlist = vue.ref([]);
      let brandclicnds = vue.ref([]);
      let flagg = vue.ref("true");
      let flaggg = vue.ref("");
      let flag = vue.ref("");
      let prices = vue.ref([]);
      let pticeflag = vue.ref("");
      let vehiclelist = vue.ref([]);
      let vehicleflag = vue.ref("");
      onLoad((options) => {
        getList({}).then((res) => {
          res.data.data.content.forEach((ele) => {
            let date = new Date(ele.dateOfRegistration);
            let Y = date.getFullYear() + "-";
            let M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
            let D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "";
            ele.dateOfRegistration = Y + M + D;
          });
          content.value = res.data.data.content;
        });
        brand({}).then((res) => {
          brandlist.value = res.data.data.content;
        });
        let query = [];
        price({}).then((res) => {
          res.data.data.forEach((e) => {
            query.value = e.queryRules;
            query.value.replace(" ", "");
            e.queryRules = JSON.parse(query.value);
          });
          prices.value = res.data.data;
        });
        vehicle({}).then((res) => {
          vehiclelist.value = res.data.data.content;
          formatAppLog("log", "at pages/second/second.vue:112", vehiclelist.value);
        });
      });
      let dian = () => {
        flag.value = "true";
        flagg.value = "true";
        flaggg.value = "";
      };
      const branddian = (e) => {
        formatAppLog("log", "at pages/second/second.vue:123", e);
        flagg.value = "";
        flaggg.value = "true";
        brandclicnd({
          brandId: e
        }).then((res) => {
          brandclicnds.value = res.data.data.content;
        });
      };
      const transfer = (e) => {
        formatAppLog("log", "at pages/second/second.vue:134", 1);
        getList({
          Page: "1",
          carSeries: e
        }).then((res) => {
          res.data.data.content.forEach((ele) => {
            let date = new Date(ele.dateOfRegistration);
            let Y = date.getFullYear() + "-";
            let M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
            let D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
            ele.dateOfRegistration = Y + M + D;
          });
          flag.value = "", content.value = res.data.data.content;
        });
      };
      const pricedian = (e) => {
        pticeflag.value = "true";
      };
      const ptices = () => {
        pticeflag.value = "";
      };
      const vehcledian = () => {
        formatAppLog("log", "at pages/second/second.vue:161", 1);
        vehicleflag.value = "true";
      };
      const vehcledians = (e) => {
        vehicleflag.value = "";
        getList({
          Page: "1",
          carModel: e
        }).then((res) => {
          res.data.data.content.forEach((ele) => {
            let date = new Date(ele.dateOfRegistration);
            let Y = date.getFullYear() + "-";
            let M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
            let D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
            ele.dateOfRegistration = Y + M + D;
          });
          flag.value = "", content.value = res.data.data.content;
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createVNode(vue.unref(Area)),
          vue.createElementVNode("view", { class: "classify" }, [
            vue.createElementVNode("view", { class: "classify-box" }, [
              vue.createElementVNode("view", { class: "classify_text" }, "\u6392\u5E8F"),
              vue.createElementVNode("image", {
                src: _imports_0$1,
                class: "classify-img"
              })
            ]),
            vue.createElementVNode("view", { class: "classify-box" }, [
              vue.createElementVNode("view", {
                class: "classify_text",
                onClick: _cache[0] || (_cache[0] = (...args) => vue.unref(dian) && vue.unref(dian)(...args))
              }, "\u54C1\u724C"),
              vue.createElementVNode("image", {
                src: _imports_0$1,
                class: "classify-img"
              }),
              vue.unref(flag) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "classify-clincd"
              }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(brandlist), (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "brand",
                    key: index,
                    "data-id": "{{item.id}}",
                    onClick: ($event) => branddian(item.id)
                  }, [
                    vue.unref(flagg) ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "brand_c"
                    }, [
                      vue.createElementVNode("image", {
                        src: item.imageUrl,
                        class: "brand_img"
                      }, null, 8, ["src"]),
                      vue.createElementVNode("view", { class: "brand_text" }, vue.toDisplayString(item.brand), 1)
                    ])) : vue.createCommentVNode("v-if", true)
                  ], 8, ["onClick"]);
                }), 128)),
                vue.unref(flaggg) ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "clincd_er"
                }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(brandclicnds), (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: index,
                      class: "clincd_txt",
                      onClick: ($event) => transfer(item.id)
                    }, vue.toDisplayString(item.series), 9, ["onClick"]);
                  }), 128))
                ])) : vue.createCommentVNode("v-if", true)
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("view", { class: "classify-box" }, [
              vue.createElementVNode("view", {
                class: "classify_text",
                onClick: pricedian
              }, "\u4EF7\u683C"),
              vue.createElementVNode("image", {
                src: _imports_0$1,
                class: "classify-img"
              }),
              vue.unref(pticeflag) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "classify_price"
              }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(prices), (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "price",
                    key: index
                  }, [
                    vue.createElementVNode("view", {
                      class: "price_text",
                      onClick: ptices
                    }, vue.toDisplayString(item.label), 1)
                  ]);
                }), 128))
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("view", { class: "classify-box" }, [
              vue.createElementVNode("view", {
                class: "classify_text",
                onClick: vehcledian
              }, "\u8F66\u578B"),
              vue.createElementVNode("image", {
                src: _imports_0$1,
                class: "classify-img"
              }),
              vue.unref(vehicleflag) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "classify_price"
              }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(vehiclelist), (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "price",
                    key: index,
                    onClick: ($event) => vehcledians(item.id)
                  }, [
                    vue.createElementVNode("image", {
                      class: "vehcle",
                      src: item.logo
                    }, null, 8, ["src"]),
                    vue.createElementVNode("view", { class: "price_text" }, vue.toDisplayString(item.model), 1)
                  ], 8, ["onClick"]);
                }), 128))
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("view", { class: "classify-box" }, [
              vue.createElementVNode("view", { class: "classify_text" }, "\u66F4\u591A"),
              vue.createElementVNode("image", {
                src: _imports_0$1,
                class: "classify-img"
              })
            ])
          ]),
          vue.createVNode(vue.unref(List), { content: vue.unref(content) }, null, 8, ["content"])
        ], 64);
      };
    }
  };
  var PagesSecondSecond = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-80faf974"], ["__file", "D:/uin-app/2/uniapp-tefa/pages/second/second.vue"]]);
  const _sfc_main$2 = {};
  function _sfc_render$1(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("h1", null, "\u5356\u8F66");
  }
  var PagesSellcarSellcar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "D:/uin-app/2/uniapp-tefa/pages/sellcar/sellcar.vue"]]);
  const _sfc_main$1 = {};
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", null, " fdsds ");
  }
  var PagesAreaArea = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/uin-app/2/uniapp-tefa/pages/area/area.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/second/second", PagesSecondSecond);
  __definePage("pages/sellcar/sellcar", PagesSellcarSellcar);
  __definePage("pages/area/area", PagesAreaArea);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/uin-app/2/uniapp-tefa/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
