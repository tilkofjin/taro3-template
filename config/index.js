import path from "path";
import pxtransform from "postcss-pxtransform";
// eslint-disable-next-line import/no-commonjs
const pkg = require("../package.json");

const config = {
  projectName: pkg.name,
  date: "2022-2-23",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  compiler: "webpack5",
  cache: {
    enable: true // 持久化缓存配置
  },
  sourceRoot: "src",
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [],
  defineConstants: {
    IS_H5: process.env.TARO_ENV === "h5",
    IS_RN: process.env.TARO_ENV === "rn",
    IS_WEAPP: process.env.TARO_ENV === "weapp",
    LOGIN_PUB_KEY:
      '"MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALw7c4t+3xq3tzPESnciySAKJ+erVAjeSzkHJmHmA4y0AM1/WTTFHBlN3CsyXOf52fuE/KENRpJJ9UGku9sN8b0CAwEAEW=="'
  },
  alias: {
    "@/utils": path.resolve(__dirname, "..", "src/utils"),
    "@/components": path.resolve(__dirname, "..", "src/components"),
    "@/assets": path.resolve(__dirname, "..", "src/assets"),
    "@/services": path.resolve(__dirname, "..", "src/services"),
    "@/config": path.resolve(__dirname, "..", "src/config")
  },
  copy: {
    patterns: [],
    options: {}
  },
  framework: "react",
  mini: {
    webpackChain(chain) {
      const lessRule = chain.module.rules.get("less");
      const lessRuleCfg = {
        test: /@antmjs[\\/]vantui(.+?)\.less$/,
        oneOf: [
          {
            use: []
          }
        ]
      };
      lessRule.toConfig().oneOf[0].use.map(use => {
        if (/postcss-loader/.test(use.loader)) {
          const newUse = {
            loader: use.loader,
            options: {
              sourceMap: use.options.sourceMap,
              postcssOptions: {
                plugins: []
              }
            }
          };
          use.options.postcssOptions.plugins.map(xitem => {
            if (xitem.postcssPlugin === "postcss-pxtransform") {
              newUse.options.postcssOptions.plugins.push(
                pxtransform({
                  platform: process.env.TARO_ENV,
                  // 这里和你config的配置保持一致
                  designWidth: 750,
                  // 这里和你config的配置保持一致
                  deviceRatio: {
                    640: 2.34 / 2,
                    750: 1,
                    828: 1.81 / 2
                  },
                  selectorBlackList: []
                })
              );
            } else {
              newUse.options.postcssOptions.plugins.push(xitem);
            }
          });
          lessRuleCfg.oneOf[0].use.push({ ...newUse });
        } else {
          lessRuleCfg.oneOf[0].use.push({ ...use });
        }
      });
      chain.module.rule("vantuiLess").merge(lessRuleCfg);
      lessRule.exclude.clear().add(/@antmjs[\\/]vantui/);
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: [/van-/]
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    },
    optimizeMainPackage: {
      enable: true
    },
    miniCssExtractPluginOption: {
      ignoreOrder: true
    }
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    esnextModules: [/@antmjs[\\/]vantui/],
    output: {
      filename: "js/[name].[hash].js",
      chunkFilename: "js/[name].[chunkhash].js"
    },
    miniCssExtractPluginOption: {
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[name].[chunkhash].css"
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      pxtransform: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    }
  }
};

export default function(merge) {
  if (process.env.APP_ENV === "uat") {
    return merge({}, config, require("./uat"));
  } else if (process.env.APP_ENV === "dev") {
    return merge({}, config, require("./dev"));
  } else {
    return merge({}, config, require("./prod"));
  }
}
