const longurl = 'https://www.fastmock.site/mock/353b3ff6ec4bb5e23761589b516b7615/api';
export function request(url, data = null, method = 'GET') {
   return new Promise((resolve, reject) => {
      wx.request({
         url: longurl + url,
         method: method,
         data: data,
         success: (msg) => {
            resolve(msg.data)
         },
         fail: (err) => {
            reject(err)
         }
      })
   })
}
