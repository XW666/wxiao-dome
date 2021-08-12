// component/tree-node/tree-node.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    treeList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    treeList: []
  },
  ready() {
    //初始化 下拉菜单赋值
   
    this.setData({
      treeList: this.data.treeList
    })

  },
  /**
   * 组件的方法列表
   */
  methods: {
    boxTap(e) {
      //第一级checkbox事件
      let pid = e.target.dataset.pid;
      this.triggerEvent('treeRadioTap',pid)
    },
    getMask(e){
      let pid = e.detail;
      this.triggerEvent('treeRadioTap',pid)
    },
   
  }
})