import md5 from "md5";
const BASE_URL = "https://api.imooc-blog.lgdsunday.club/api";

function request({ url, data, method }) {
  // 添加验证
  let e = parseInt(Date.now() / 1e3),
    n = e + "LGD_Sunday-1991-uni";

  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      data,
      method,
      header: {
        // Authorization: store.state.user.token,
        icode: md5(n),
        codeType: e,
      },
      success: ({ data }) => {
        if (data.success) {
          resolve(data);
        } else {
          uni.showToast({
            title: data.message,
            icon: "none",
            mask: true,
            duration: 3000,
          });
          reject(data.message);
        }
      },
      fail: (error) => {
        reject(error);
      },
      complete: () => {
        // 关闭加载
        uni.hideLoading();
      },
    });
  });
}

export default request;
