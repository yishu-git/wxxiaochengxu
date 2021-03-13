// pages/tanacc/tanacc.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      hintshow:false,
      checked:true,
      hidetow:false,
      clickshow:null
      
   },
   //点击扫码
   clickshow(){
     let that=this
      wx.scanCode({
         success (res) {                    
            that.setData({
               clickshow:res.result
            })
         }
       })
   },
   //输入地址
   address(e){
     if(e.detail.value){
        this.setData({
         hidetow:false
        })
     }else{
      this.setData({
         hidetow:true
        })
     }
   },
   //输入金额时候触发

   shuruinput(e){
      if(e.detail.value-0>this.data.lists.assets-0){
         this.setData({
            hintshow:true,
            balance:(this.data.lists.assets-e.detail.value).toFixed(2)
         })
      }else{
         this.setData({
            hintshow:false,
            balance:(this.data.lists.assets-e.detail.value).toFixed(2)
         })
      }
   },
   onChangetow({ detail }) {
      // 需要手动对 checked 状态进行更新
      this.setData({ checked: detail });
    },
   onChange(event) {
      wx.showToast({
        icon: 'none',
        title: `当前值：${event.detail}`,
      });
    },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
     let data=JSON.parse(options.data);
     console.log(data)
     this.setData({
        lists:data,
        balance: Number(data.assets).toFixed(2)
     })
   },

   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {

   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {

   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function () {

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function () {

   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {

   }
})
