const getAppId = () => {
  switch (process.env.TARO_ENV) {
    case 'weapp':
      return "weappId"
    case 'h5':
      return 'app'  // 默认值对应 index.html 中的 Id 根节点，默认即可，无需修改
  }
}

export default defineAppConfig({
  pages: [
    'pages/personalCenter/index',
    'pages/home/index',
    'pages/application/index',
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
      iconPath: "assets/icons/tabBar/icon_home_default.png",
      selectedIconPath: 'assets/icons/tabBar/icon_home_selected.png',
    }, {
      text: "应用",
      pagePath: "pages/application/index",
      iconPath: "assets/icons/tabBar/icon_apps_default.png",
      selectedIconPath: 'assets/icons/tabBar/icon_apps_selected.png',
    },
    {
      text: "我的",
      pagePath: "pages/personalCenter/index",
      iconPath: "assets/icons/tabBar/icon_my_default.png",
      selectedIconPath: 'assets/icons/tabBar/icon_my_selected.png',
    }]
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示'
    }
  },
  appId: getAppId(),
  requiredBackgroundModes: ["audio", "location"],
})
