axios.defaults.headers.post["Content-Type"] = "application/json";

const instance=axios.create({
    baseURL: "https://www.fastmock.site/mock/353b3ff6ec4bb5e23761589b516b7615/api",
})
instance.interceptors.request.use(
    function (config) {
        $('.loging').show()
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
//请求结束
instance.interceptors.response.use(
    function (res) {
        $('.loging').hide()
        return res;
    },
    function (err) {
        return Promise.reject(err);
    }
);

function get(url, params) {
    return new Promise((resolve, reject) => {
        instance
            .get(url, {
                params: params,
            })
            .then((res) => {
                resolve(res.data);
            })
    });
}
export {
    get,
};