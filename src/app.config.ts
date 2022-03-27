export default defineAppConfig({
  pages: [
    'pages/personalCenter/index',
    'pages/home/index',
    'pages/login/index',
  ],
  entryPagePath: "pages/home/index",
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'Taro3.4.2小程序基础模板',
  },
  tabBar: {
    color: "#999999",
    selectedColor: "#333333",
    backgroundColor: "#fff",
    position: 'bottom',
    list: [{
      text: "首页",
      pagePath: "pages/home/index",
    }, {
      text: "个人中心",
      pagePath: "pages/personalCenter/index",
    }
    ]
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示'
    }
  },
  appId: "",
  requiredBackgroundModes: ["audio", "location"],
})
