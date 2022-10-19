import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { FC } from "react";
import styles from "./index.module.less";

const Home: FC = () => {
  const goLogin = () => {
    Taro.navigateTo({
      url: `/pages/login/index`
    });
  };

  return (
    <View className={styles.container}>
      <View onClick={() => goLogin()}>
        <Text>Hello world!</Text>
      </View>
    </View>
  );
};

export default Home;
