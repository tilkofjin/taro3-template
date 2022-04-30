import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { Checkbox, Image, Notify } from "@antmjs/vantui";
import { View, Text, Input } from "@tarojs/components";
import { login, uploadAvatar, vertifyPhone } from "@/services/login";
import { getStorage, updateStorage } from "@/utils/index";
import loginIcon from "@/assets/icons/icon_wechat.png";
import styles from "./index.module.less";

const checkedColor = "#14ca94";
const Login: React.FC = () => {
  const token = getStorage("token");
  const [loginDecSelect, setLoginDecSelect] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({});

  useEffect(() => {
    token && setIsLogin(true);
  }, [token]);

  const onChangeLoginDec = (e) => {
    setLoginDecSelect(e.detail);
  };

  // 获取用户头像、昵称
  const getUserProfile = async () => {
    return await Taro.getUserProfile({
      desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        return res.userInfo;
      },
    });
  };

  // 获取loginCode
  const getLoginCode = async () => {
    return await Taro.login({
      success: async (res) => {
        if (res.code) {
          return res.code;
        } else {
          return Taro.showToast({
            icon: "none",
            title: `登录失败！${res.errMsg}`,
          });
        }
      },
    });
  };

  // 登录
  const wechatLogin = async () => {
    if (!loginDecSelect) {
      return Notify.show({
        type: "warning",
        message: "请同意平台协议后再登录！",
      });
    }
    const userrProfile = await getUserProfile();
    const { code } = await getLoginCode();
    setUserInfo(userrProfile.userInfo);
    await Taro.getImageInfo({
      src: userrProfile.userInfo.avatarUrl,
      success: async (res) => {
        const { data } = await uploadAvatar(res.path);
        const config = {
          code,
          avatar: data.objectName,
          nickName: userInfo.nickName,
        };
        await login(config).then((result) => {
          if (result?.success) {
            updateStorage("userInfo", userInfo);
            updateStorage("token", token);
            if (result.data?.memberInfo?.mobile) {
              return Taro.navigateTo({
                url: `/pages/home/index`,
              });
            } else {
              setIsLogin(true);
            }
          }
        });
      },
    });
  };

  // 绑定手机号
  const onGetPhoneNumber = async (e) => {
    if (!loginDecSelect) {
      return Notify.show({
        type: "warning",
        message: "请同意平台协议后再绑定手机号！",
      });
    }
    const res = await vertifyPhone({
      id: userInfo.id,
      code: e.detail.code,
    });
    if (res?.success) {
      Taro.reLaunch({
        url: `/pages/personalCenter/index`,
      });
    }
  };

  return (
    <View className={styles.container}>
      <View className={styles.titleBox}>
        <View>欢迎登录</View>
        <View className={styles.titleName}>Taro 模板小程序</View>
      </View>
      <View className={styles.inputBox}>
        <Input placeholder='请输入账号' />
        <Input placeholder='请输入密码' />
      </View>
      <View className={styles.loginBtnBox}>
        <Image
          className={styles.loginIcon}
          src={loginIcon}
          renderError={<Text>加载失败</Text>}
        />
      </View>
      <View className={styles.loginDecBox}>
        <Checkbox
          value={loginDecSelect}
          checkedColor={checkedColor}
          onChange={onChangeLoginDec}
          iconSize={30}
        >
          <Text className={styles.loginDecText}>登录代表同意平台的</Text>
        </Checkbox>
        <Text className={styles.loginDecExplain}>《用户服务协议》</Text>及
        <Text className={styles.loginDecExplain}>《隐私政策》</Text>
      </View>
      {/* 消息通知 */}
      <Notify id='vanNotify' />
    </View>
  );
};

export default Login;
