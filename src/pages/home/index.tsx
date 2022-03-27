import { View, Text } from "@tarojs/components";
import { login } from "@/services/login";
import { useEffect } from "react";
import { getStorage } from "@/utils/index";
import styles from "./index.less";

const Home: React.FC = () => {
  const userInfo = getStorage("userInfo");
  const goLogin = async () => {
    await login({
      nickName: "王小二",
      code: "loginCode",
      avatar: "userAvatar"
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
