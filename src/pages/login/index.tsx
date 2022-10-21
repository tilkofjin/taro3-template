import React, { FC, useLayoutEffect, useState } from "react";
import { Form, FormItem, Icon, Notify } from "@antmjs/vantui";
import { View, Image, Input } from "@tarojs/components";
import { login } from "@/services/login";
import { JSEncrypt } from "jsencrypt";
import loginIcon from "@/assets/icons/icon_wechat.png";
import styles from "./index.module.less";

const Login: FC = () => {
  const formIt = Form.useForm();
  const [showPassword, setShowPassword] = useState(true);

  // 注册不能回调函数设置必填的提示文案
  useLayoutEffect(() => {
    formIt.registerRequiredMessageCallback(label => {
      return `${label}真的不能为空啊`;
    });
  }, [formIt]);

  const handleLogin = () => {
    formIt.validateFields(async (errorMessage, fieldValues) => {
      if (errorMessage && errorMessage.length) {
        return console.info("errorMessage", errorMessage);
      } else {
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(LOGIN_PUB_KEY);
        const password = encrypt.encrypt(fieldValues?.password) || "";
        const res = await login({
          ...fieldValues,
          password
        });
        if (res?.success) {
          // do something
        } else {
          Notify.show({
            type: "warning",
            message: res?.message || "登录失败，请重试！"
          });
        }
      }
    });
  };

  return (
    <View className={styles.container}>
      <View className={styles.titleBox}>
        <View>欢迎登录</View>
      </View>
      <Form form={formIt} onFinish={handleLogin} className={styles.form}>
        <FormItem
          required
          label='用户名'
          name='username'
          trigger='onInput'
          validateTrigger='onBlur'
          className={styles.username}
          valueFormat={e => e.detail.value}
          renderRight={<Icon name='user-o' />}
        >
          <Input placeholder='请输入用户名' />
        </FormItem>
        <FormItem
          required
          label='密码'
          name='password'
          trigger='onInput'
          validateTrigger='onBlur'
          valueFormat={e => e.detail.value}
          renderRight={
            <Icon
              name={showPassword ? "closed-eye" : "eye-o"}
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        >
          <Input placeholder='请输入密码' password={showPassword} />
        </FormItem>
      </Form>
      <View className={styles.loginBtnBox}>
        <Image
          className={styles.loginIcon}
          src={loginIcon}
          onClick={handleLogin}
        />
      </View>
      <Notify id='login' />
    </View>
  );
};

export default Login;
