import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { Checkbox, Icon, Image, Notify } from "@antmjs/vantui";
import { View, Button, Text } from "@tarojs/components";
import { login, uploadAvatar, vertifyPhone } from "@/services/login";
import wechatIcon from "@/assets/icons/icon_wechat.png";
import { getStorage, updateStorage } from "@/utils/index";
import "./index.less";

const Login: React.FC = () => {
  const token = getStorage("token");
  const [loginDecSelect, setLoginDecSelect] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    token && setIsLogin(true);
  }, [token]);

  const onChangeLoginDec = e => {
    setLoginDecSelect(e.detail);
  };

  // 获取用户头像、昵称
  const getUserProfile = async () => {
    return await Taro.getUserProfile({
      desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: res => {
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        return res.userInfo;
      }
    });
  };

  // 获取loginCode
  const getLoginCode = async () => {
    return await Taro.login({
      success: async res => {
        if (res.code) {
          return res.code;
        } else {
          return Taro.showToast({
            icon: "none",
            title: `登录失败！${res.errMsg}`
          });
        }
      }
    });
  };

  // 登录
  const wechatLogin = async () => {
    if (!loginDecSelect) {
      return Notify.show({
        type: "warning",
        message: "请同意平台协议后再登录！"
      });
    }
    const userrProfile = await getUserProfile();
    const { code } = await getLoginCode();
    setUserInfo(userrProfile.userInfo);
    await Taro.getImageInfo({
      src: userrProfile.userInfo.avatarUrl,
      success: async res => {
        const { data } = await uploadAvatar(res.path);
        const config = {
          code,
          avatar: data.objectName,
          nickName: userInfo.nickName,
        };
        await login(config).then(result => {
          if (result.success) {
            updateStorage("userInfo",userInfo);
            updateStorage("token", token);
            if (result.data?.memberInfo?.mobile) {
              return Taro.navigateTo({
                url: `/pages/home/index`
              });
            } else {
              setIsLogin(true);
            }
          }
        });
      }
    });
  };

  // 绑定手机号
  const onGetPhoneNumber = async e => {
    if (!loginDecSelect) {
      return Notify.show({
        type: "warning",
        message: "请同意平台协议后再绑定手机号！"
      });
    }
    const res = await vertifyPhone({
      id: userInfo.id,
      code: e.detail.code
    });
    if (res.success) {
      Taro.reLaunch({
        url: `/pages/personalCenter/index`
      });
    }
  };

  return (
    <View className='container'>
      <View className='titleBox'>
        <View>
          {!userInfo.avatarUrl ? (
            <Icon name='user-circle-o' size='200rpx' color='#01cffe' />
          ) : (
            <Image src={avatarUrl} width={200} height={200} round />
          )}
        </View>
        <View className='serviceCenter'>欢迎进入xxxx小程序</View>
        <View className='serviceWelcom'>
          欢迎，{userInfo?.nickName || "普通会员"}
        </View>
      </View>
      <View className='wechatBtnBox'>
        {!isLogin ? (
          <Button className='wechatAuth' onClick={wechatLogin}>
            微信授权登录
          </Button>
        ) : (
          <View>
            <View className='wechatPhoneDec'>
              请提供手机号码，让我们可以更好的为您服务
            </View>
            <Button
              className='wechatAuth'
              openType='getPhoneNumber'
              onGetPhoneNumber={e => onGetPhoneNumber(e)}
            >
              微信一键授权手机号
            </Button>
            <View
              className='notAuth'
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/memberBenefits/index`
                });
              }}
            >
              暂不授权
            </View>
          </View>
        )}
      </View>
      {/* 消息通知 */}
      <Notify id='vanNotify' />
      {/* 微信Icon */}
      <View className='wechatIconBox'>
        <Image src={wechatIcon} width={75} height={75} />
      </View>
      <View className='loginDecBox'>
        <Checkbox
          value={loginDecSelect}
          checkedColor='#07c160'
          onChange={onChangeLoginDec}
          iconSize={30}
        >
          <Text className='loginDecText'>
            登录代表同意平台的
            <Text className='loginDecExplain'>《用户服务协议》</Text>及
            <Text className='loginDecExplain'>《隐私政策》</Text>
          </Text>
        </Checkbox>
      </View>
    </View>
  );
};

export default Login;
