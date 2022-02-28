import { View, Text } from "@tarojs/components";
import { Icon, NavBar } from "@antmjs/vantui";
import { browser } from "@/utils/index";
import { login } from "@/services/login";
import styles from "./index.less";

const { weixin } = browser();

const Home: React.FC = () => {
  const goLogin = async () => {
    await login({ username: "ceshi", password: "123456" });
  };

  return (
    <View className={styles.container}>
      {process.env.TARO_ENV && !weixin ? (
        <NavBar
          title='首页'
          leftArrow={false}
          safeAreaInsetTop={false}
          renderLeft={<Icon name='wap-home-o' className='icon' size='36' />}
          renderRight={<Icon name='search' className='icon' size='36' />}
        />
      ) : null}
      <View onClick={() => goLogin()}>
        <Text>Hello world!</Text>
      </View>
    </View>
  );
};

export default Home;
