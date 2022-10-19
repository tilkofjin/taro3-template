import { useDidShow } from '@tarojs/taro';
import { ReactNode } from 'react'
import VConsole from 'vconsole';
import { updateWeapp } from './utils';
import { jsBridge, setupWebViewJavascriptBridge } from './utils/jsBridge';
import './app.less'

setupWebViewJavascriptBridge(jsBridge);

const App: ReactNode = ({ children }) => {
  IS_H5 && process.env.APP_ENV === 'dev' && new VConsole({ theme: 'dark' });
  // Taro.loadFontFace({
  //   family: 'SFProDisplay',
  //   source: 'url("带https的字体下载地址")',
  //   success: console.log
  // })

  useDidShow(() => {
    if (IS_WEAPP) {
      updateWeapp()
    }
  })

  return children
}

export default App
