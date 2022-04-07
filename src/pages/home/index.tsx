import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { useEffect } from "react";
import { getStorage } from "@/utils/index";
import styles from "./index.module.less";

const Home: React.FC = () => {
  const userInfo = getStorage("userInfo");
  const goLogin = async () => {
    Taro.navigateTo({
      url: `/pages/login/index`
    });
  };

  useEffect(() => {}, []);

  return (
    <View className={styles.container}>
      <View onClick={() => goLogin()}>
        <Text>Hello world!</Text>
      </View>
    </View>
  );
};

export default Home;
