import { useDidShow } from '@tarojs/taro';
import { ReactNode } from 'react'
import { isWeapp, updateWeapp } from './utils';
import './app.less'

const App: ReactNode = ({ children }) => {
  // Taro.loadFontFace({
  //   family: 'SFProDisplay',
  //   source: 'url("带https的字体下载地址")',
  //   success: console.log
  // })

  useDidShow(() => {
    if (isWeapp()) {
      updateWeapp()
    }
  })
  return children
}

export default App
