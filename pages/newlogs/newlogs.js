let QRCode = require("./weapp-qrcode.js");
import {
  request
} from '../../utils/requers';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    qrcode: null,
    show: false,
    actions: [],
  },
  //获得value
  getvalue(event) {
    let data = this.data.actions;
    let newdata = data.filter((item) => {
      return item.name.indexOf(event.detail.value) != -1
    })
    this.setData({
      newdata: newdata
    });
  },
  clickchange(e) {
    this.setData({
      rightredshow: e.currentTarget.dataset.item.id,
      items: e.currentTarget.dataset.item,
      show: false
    })
    this.data.qrcode.makeCode(this.data.items.name)

  },
  Roa: function () {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },

  onGetUserInfo(e) {
    console.log(e.detail);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onclick: function (e) {
    this.setData({
      items: e.detail
    })
    this.data.qrcode.makeCode(this.data.items.name)
  },
  onLoad: async function (options) {
    let id = JSON.parse(options.id);
    let data = await request('/yishu')
    let array = data.lists;
    let items = array.filter((item) => {
      return item.id == id
    })
    console.log(items)
    this.setData({
      rightredshow: items[0].id,
      actions: array,
      items: items[0]
    })
    this.data.qrcode = new QRCode('canvas', {
      text: items[0].name,
      width: 128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
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