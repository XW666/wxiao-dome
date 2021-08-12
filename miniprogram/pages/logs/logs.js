//logs.js
const util = require('../../utils/util.js')
var wxlocker = require("../../utils/wxlocker.js");
Page({
  data: {
    
    title: '请设置手势密码',
    msg: '',
    resetHidden: false,
    titleColor: ""
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

  onLoad: function () {
    // wx.setStorageSync('passwordxx', '[{"index":1},{"index":2},{"index":5},{"index":8},{"index":9}]');
    // wx.setStorageSync('signNum', 5);
    wxlocker.lock.init();
    this.initState();
  },
  //设置提示语与重置按钮
  initState: function () {
    var resetHidden = wxlocker.lock.resetHidden;
    var title = wxlocker.lock.title;
    var titleColor = wxlocker.lock.titleColor;
    var msg = wxlocker.lock.msg;
    var signNum = wxlocker.lock.signNum;
    this.setData({
      resetHidden: resetHidden,
      title: title,
      titleColor: titleColor,
      msg: msg
    });
  },
  touchS: function (e) { //touchstart事件绑定
    wxlocker.lock.bindtouchstart(e);
  },
  touchM: function (e) { //touchmove事件绑定
    wxlocker.lock.bindtouchmove(e);
  },
  touchE: function (e) { //touchend事件绑定
    wxlocker.lock.bindtouchend(e, this.lockSucc);
    this.initState();
  },
  lockSucc: function () { //解锁成功的回调函数
    wx.redirectTo({
      url: '/pages/payroll/payroll'
    })

    //do something
  },
  lockreset: function () {
    if (this.data.title === '重新设置') {
      wxlocker.lock.updatePassword();
      this.initState();
    }
    if (this.data.title === '忘记手势密码') {
      wx.navigateTo({
        url: '/pages/password/password'
      })
    }

  }
})