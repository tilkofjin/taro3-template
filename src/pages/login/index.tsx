import { View, Text } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import styles from "./index.less";

const Login: React.FC = () => {
  useDidShow(() => {
    Taro.setNavigationBarTitle({
      title: "登录",
    });
  });
  return (
    <View className={styles.container}>
      <Text>登录页</Text>
    </View>
  );
};

export default Login;
