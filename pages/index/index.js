import {
  request
} from '../../utils/requers';
import Toast from '../../miniprogram/miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    popshow: false
  },
  //点击转账
  traAcc(e) {
    let data = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../tanacc/tanacc?data=' + data,
    })
  },
  onClose() {
    this.setData({
      popshow: false
    });
  },
  fenxiang: function () {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  shoukuan: function (e) {
    wx.navigateTo({
      url: '../newlogs/newlogs?id=' + JSON.stringify(e.currentTarget.dataset.id),
    })
  },
  login: function () {
    if(app.userInfo){
      Toast('已经登陆过了');
    }else{
      wx.navigateTo({
        url: '../getuser/geruser',
      })
    }
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    if (app.userInfo) {
      this.setData({
        avatarUrl: app.userInfo.avatarUrl,
      })
    }else{
      wx.getUserInfo({
        success: res => {
          app.userInfo = res.userInfo
          this.setData({
            avatarUrl: res.userInfo.avatarUrl,
          })
        }
      })
    }
    let data = await request('/yishu')
    this.setData({
      show: false,
      list: data
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
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