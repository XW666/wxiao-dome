Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持 
  },
  /** 
   * 私有数据,组件的初始数据 
   * 可用于模版渲染 
   */
  data: { // 弹窗显示控制 
    animationData: {},
    timer:'',//定时器
    content: '提示内容',
    typeClass:'',//对应类型的class名字
    icon:'',//对应的icon
  },
  /**
   * 组件的方法列表 
   */
  methods: {
    /** 
     * 显示toast，定义动画
     */
    showToast(obj = { value:'内容',type:'warning',icon:'',duration:1500}) {
      if(this.data.timer !== '') clearTimeout(this.data.timer)
      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease',
      })
      this.animation = animation
      animation.opacity(1).step()
      this.setData({
        animationData: animation.export(),
        content: obj.value,
        typeClass:obj.type,
        icon:obj.icon
      })
      /**
       * 延时消失
       */
      let my_setTimeout = setTimeout(function () {
        animation.opacity(0).step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), obj.duration || 1500)
      this.setData({
        timer : my_setTimeout
      })
    }
  }
})