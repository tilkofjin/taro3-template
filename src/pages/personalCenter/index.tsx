import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { FC, useEffect } from "react";
import styles from "./index.module.less";

const Home: FC = () => {
  useEffect(() => {}, []);
  return (
    <View className={styles.container}>
      <View
        onClick={() =>
          Taro.navigateTo({
            url: `/pages/login/index`
          })
        }
      >
        去登录
      </View>
    </View>
  );
};

export default Home;
