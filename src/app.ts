import { ReactNode } from 'react'
import './app.less'

const App: ReactNode = ({ children }) => {
  // Taro.loadFontFace({
  //   family: 'SFProDisplay',
  //   source: 'url("带https的字体下载地址")',
  //   success: console.log
  // })
  return children
}

export default App
