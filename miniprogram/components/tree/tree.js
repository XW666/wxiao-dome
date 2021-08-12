// component/tree/tree.js
Component({
  properties: {},
  /**
   * 页面的初始数据
   */
  data: {
    seachValue: '',
    treeList: [{
      label: '一级 1',
      child: false, //子集是否展开
      check: false, //是否x选中
      indeterminate: true, //子集是否全部选中
      children: [{
        label: '二级 1-1',
        child: false, //子集是否展开
        check: false, //是否x选中
        indeterminate: true, //子集是否全部选中
        children: [{
          label: '三级 1-1-1',
          child: false, //子集是否展开
          check: false, //是否x选中
          indeterminate: true, //子集是否全部选中
          children: [{
            label: '四级 1-1-1',
            child: false, //子集是否展开
            check: false, //是否x选中
            indeterminate: true, //子集是否全部选中
          }, {
            label: '四级 1-2-1',
            child: false, //子集是否展开
            check: false, //是否x选中
            indeterminate: true, //子集是否全部选中
          }]
        }, {
          label: '三级 1-2-1',
          child: false, //子集是否展开
          check: false, //是否x选中
          indeterminate: true, //子集是否全部选中
          children: []
        }]
      }, {
        label: '二级 1-2',
        child: false, //子集是否展开
        check: false, //是否x选中
        indeterminate: true, //子集是否全部选中,
        children: []
      }]
    }, {
      label: '一级 2',
      child: false, //子集是否展开
      check: false, //是否x选中
      indeterminate: true, //子集是否全部选中
      children: [{
        label: '二级 2-1',
        child: false, //子集是否展开
        check: false, //是否x选中
        indeterminate: true, //子集是否全部选中
        children: [{
          label: '三级 2-1-1',
          child: false, //子集是否展开
          check: false, //是否x选中
          indeterminate: true, //子集是否全部选中
        }]
      }, {
        label: '二级 2-2',
        child: false, //子集是否展开
        check: false, //是否x选中
        indeterminate: true, //子集是否全部选中
        children: [{
          label: '三级 2-2-1',
          child: false, //子集是否展开
          check: false, //是否x选中
          indeterminate: true, //子集是否全部选中
        }]
      }]
    }, {
      label: '一级 3',
      child: false, //子集是否展开
      check: false, //是否x选中
      indeterminate: true, //子集是否全部选中
      children: [{
        label: '二级 3-1',
        child: false, //子集是否展开
        check: false, //是否x选中
        indeterminate: true, //子集是否全部选中
        children: [{
          label: '三级 3-1-1',
          child: false, //子集是否展开
          check: false, //是否x选中
          indeterminate: true, //子集是否全部选中
        }]
      }, {
        label: '二级 3-2',
        child: false, //子集是否展开
        check: false, //是否x选中
        indeterminate: true, //子集是否全部选中
        children: [{
          label: '三级 3-2-1',
          child: false, //子集是否展开
          check: false, //是否x选中
          indeterminate: true, //子集是否全部选中
        }]
      }]
    }],
    indexList:[],
    seachTreeList:[{
      label: '四级 1-1-1',
      text:"小来/采购部/人事部",
      check: false, //是否x选中
    }]
  },
  methods: {
    int_seach(e) {
      //搜素匹配值
      let value = e.detail.value
      this.setData({
        seachValue:value
      })
    },
    seachBoxTap(e){
      //所搜下拉值确定
      let pid = e.target.dataset.pid;
      let arr = this.data.seachTreeList[pid]
      let value = arr.label
      this.setData({
        ['seachTreeList[' + pid + '].check']: true,
        seachValue:''
      })
      this.getCheckValue(value)
      if(this.data.indexList.length >0 ){
        //输入有匹配值
       let bb = this.data.indexList[0]
       let arr = bb.split('-')
       arr.splice(0,1)
       this.setId(arr)
      }
    },
    setId(list){
      if(list.length === 1){
        //第一层级选中
        console.log(1)
        let pid =Number(list[0]) 
        let tree = this.data.treeList[pid]
        this.setSeachTreeList(tree)
        this.setData({
          ['treeList[' + pid + ']']: tree
        })
      }
      if(list.length === 2){
        //第二层级选中
        console.log(2)
        let pid =Number(list[0]) 
        let cid =Number(list[1]) 
        let parr = this.data.treeList[pid];
        let carr = parr.children[cid];
        this.setSeachTreeList(carr)

        this.setData({
          ['treeList[' + pid + '].children[' + cid + ']']: carr,
          ['treeList[' + pid + '].child']: true
        })
          //改变第一层级勾选状态
        this.setParr(pid)
      }
      if(list.length === 3){
        //第三层级选中
        console.log(3)
        let pid =Number(list[0]) 
        let cid =Number(list[1]) 
        let sid =Number(list[2])  
        let parr = this.data.treeList[pid]
        let carr = parr.children[cid];
        let sarr = carr.children[sid]
        this.setSeachTreeList(sarr)
        this.setData({
          ['treeList[' + pid + '].children[' + cid + '].children[' + sid + ']']: sarr,
          ['treeList[' + pid + '].child']: true,
          ['treeList[' + pid + '].children['+cid+'].child']: true
        })
         //改变第二层级勾选状态
        this.setCarr(pid, cid)
      }
      if(list.length === 4){
        //第四层级选中
        console.log(4)
        let pid =Number(list[0]) 
        let cid =Number(list[1]) 
        let sid =Number(list[2]) 
        let ssid = Number(list[3]) 
        let parr = this.data.treeList[pid]
        let carr = parr.children[cid];
        let sarr = carr.children[sid];
        let ssarr = sarr.children[ssid]
      
        this.setSeachTreeList(ssarr)
       
        this.setData({
          ['treeList[' + pid + '].children[' + cid + '].children[' + sid + '].children[' + ssid + ']']: ssarr,
          ['treeList[' + pid + '].child']: true,
          ['treeList[' + pid + '].children['+cid+'].child']: true,
          ['treeList[' + pid + '].child']: true,
          ['treeList[' + pid + '].children['+cid+'].children['+sid+'].child']: true
        })
      
        //改变第三层级勾选状态
        this.setSarr(pid, cid, sid)
      }
    },
    setSeachTreeList(tree){
     
      const func = arr => {
          arr.indeterminate = true,
            arr.check = true
        if (arr.children && arr.children.length > 0) {
          arr.children.forEach(item => {
            func(item)
          })
        }
      }
      func(tree)
    },
    getCheckValue(value){
      let arr =[]
      let carr={}
      let list = this.data.treeList;
      let func = (list,label) =>{
      
        list.forEach((item,index) => {
            carr[item.label]= carr[label]+'-'+index
          if(item.label == value){
            arr.push(carr[item.label])
          }else{
            
             if(item.children && item.children.length > 0){
              
              func(item.children,item.label)
             }
          }
       })
      }
      func(list)
     
       this.setData({
        indexList:arr
       })
    },
    lableTap(e) {
      //第一级lable点击事件
      let pid = e.target.dataset.pid;
      let arr = this.data.treeList[pid]
      this.setData({
        ['treeList[' + pid + '].child']: !arr.child
      })
    },
    lableChidTap(e) {
      //第二级lable点击事件
      let pid = e.target.dataset.pid;
      let cid = e.target.dataset.cid;
      let parr = this.data.treeList[pid].children
      if (!parr || parr.length === 0) {
        return
      }
      let carr = parr[cid]

      this.setData({
        ['treeList[' + pid + '].children[' + cid + '].child']: !carr.child
      })
    },
    lableSonTap(e) {
      //第三级lable点击事件
      let pid = e.target.dataset.pid;
      let cid = e.target.dataset.cid;
      let sid = e.target.dataset.sid;
      let parr = this.data.treeList[pid].children
      let carr = parr[cid].children
      if (!carr || carr.length === 0) {
        return
      }
      let sarr = carr[sid]
      this.setData({
        ['treeList[' + pid + '].children[' + cid + '].children[' + sid + '].child']: !sarr.child
      })
    },
    boxTap(e) {
      //第一级checkbox事件
      let pid = e.target.dataset.pid;
      let list = this.data.treeList[pid];
      let isIndeterminate = this.data.treeList[pid].indeterminate;
      this.setArr(list, isIndeterminate)

      this.setData({
        ['treeList[' + pid + ']']: list
      })

    },
    boxChidTap(e) {
      //第二级checkbox事件
      let pid = e.target.dataset.pid;
      let cid = e.target.dataset.cid;
      let parr = this.data.treeList[pid];
      let carr = parr.children[cid];
      let isIndeterminate = carr.indeterminate;
      this.setArr(carr, isIndeterminate)

      this.setData({
        ['treeList[' + pid + '].children[' + cid + ']']: carr
      })
        //改变第一层级勾选状态
      this.setParr(pid)

    },
    boxSonTap(e) {
      //第三级checkbox事件
      let pid = e.target.dataset.pid;
      let cid = e.target.dataset.cid;
      let sid = e.target.dataset.sid;
      let parr = this.data.treeList[pid]
      let carr = parr.children[cid];
      let sarr = carr.children[sid]
      let isIndeterminate = sarr.indeterminate;
      this.setArr(sarr, isIndeterminate)

      this.setData({
        ['treeList[' + pid + '].children[' + cid + '].children[' + sid + ']']: sarr
      })
       //改变第二层级勾选状态
      this.setCarr(pid, cid)
    },
    boxSSonTap(e) {
      //第四级checkbox事件
      let pid = e.target.dataset.pid;
      let cid = e.target.dataset.cid;
      let sid = e.target.dataset.sid;
      let ssid = e.target.dataset.ssid;
      let parr = this.data.treeList[pid]
      let carr = parr.children[cid];
      let sarr = carr.children[sid];
      let ssarr = sarr.children[ssid]
      // let isIndeterminate = ssarr.indeterminate;
      this.setArr(ssarr)
      this.setData({
        ['treeList[' + pid + '].children[' + cid + '].children[' + sid + '].children[' + ssid + ']']: ssarr
      })
      //改变第三层级勾选状态
      this.setSarr(pid, cid, sid)

      // this.setParr(pid)
    },
 
    setArr(list, isIndeterminate) {
      //改变当前选中 层级的值
      const func = arr => {
        if (isIndeterminate || isIndeterminate=== undefined) {
          //当前对象下子集无选中状态
          arr.check = !arr.check
        } else {
           //当前对象下子集有选中状态
          arr.indeterminate = true,
            arr.check = false
        }
        if (arr.children && arr.children.length > 0) {
          arr.children.forEach(item => {
            func(item)
          })
        }
      }
      func(list)
    },
    setParr(pid) {
      //一级父级是否选中
      let list = this.data.treeList[pid];
      let carr = list.children.filter(item => item.check);
      let carr2 = list.children.filter(item => !item.indeterminate);
      let isCheck = 'treeList[' + pid + '].check';
      let isIndeterminate = 'treeList[' + pid + '].indeterminate';
      this.allSetArr(carr, carr2, list, isCheck, isIndeterminate)
    },
    setCarr(pid, cid) {
      //二级父级是否选中
      let list = this.data.treeList[pid].children[cid];
      let carr = list.children.filter(item => item.check);
      let carr2 = list.children.filter(item => !item.indeterminate);
      let isCheck = 'treeList[' + pid + '].children[' + cid + '].check'
      let isIndeterminate = 'treeList[' + pid + '].children[' + cid + '].indeterminate'
      this.allSetArr(carr, carr2, list, isCheck, isIndeterminate)
      this.setParr(pid)
    },
    setSarr(pid, cid, sid) {
      //三级父级是否选中
      let list = this.data.treeList[pid].children[cid].children[sid];
      let carr = list.children.filter(item => item.check);
      let carr2 = list.children.filter(item => !item.indeterminate);
     
      let isCheck = 'treeList[' + pid + '].children[' + cid + '].children[' + sid + '].check'
      let isIndeterminate = 'treeList[' + pid + '].children[' + cid + '].children[' + sid + '].indeterminate'
      this.allSetArr(carr, carr2, list, isCheck, isIndeterminate)
      this.setCarr(pid, cid)
    },
    allSetArr(carr, carr2, list, isCheck, isIndeterminate) {
      //父级是否全选和半选
      if (carr.length === 0 && carr2.length === 0) {
        //子集全不选中
        this.setData({
          [isCheck]: false,
          [isIndeterminate]: true,
        })
      } else {
      
        if (carr.length === list.children.length) {
          //子集全选中
          this.setData({
            [isCheck]: true,
            [isIndeterminate]: true,
          })
        }
        if (carr.length < list.children.length || carr2.length > 0) {
          //子集个别选中
          this.setData({
            [isCheck]: false,
            [isIndeterminate]: false,
          })
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载.
   */
  onLoad: function (options) {

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