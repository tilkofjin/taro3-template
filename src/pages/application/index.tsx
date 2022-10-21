import { View, Text } from "@tarojs/components";
import React, { FC, useEffect } from "react";
import styles from "./index.module.less";

const Application: FC = () => {
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
