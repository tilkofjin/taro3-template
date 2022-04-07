import { View, Text } from "@tarojs/components";
import { useEffect } from "react";
import styles from "./index.module.less";

const Application: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <View className={styles.container}>
      <View>
        <Text>应用页</Text>
      </View>
    </View>
  );
};

export default Application;
