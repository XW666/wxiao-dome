// pages/demo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    result: ['a', 'b'],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    options: [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }],
    type: 'file', //image图片 file文件
    filename: '',
    path: '',
    imgName: '',
    objectMultiArray: [
      [],
      [],
      [{
          id: '上午',
          name: '上午'
        },
        {
          id: '下午',
          name: '下午'
        }
      ]
    ],
    multiIndex: [],
    treeList: [{
      id: '1',
      label: '一级 1',
      child: false, //子集是否展开
      check: false, //是否x选中
      indeterminate: true, //子集是否全部选中
      children: [{
        id: '1-1',
        label: '二级 1-1',
        child: false, //子集是否展开
        check: false, //是否x选中
        indeterminate: true, //子集是否全部选中
        children: [{
          id: '1-1-1',
          label: '三级 1-1-1',
          child: false, //子集是否展开
          check: false, //是否x选中
          indeterminate: true, //子集是否全部选中
          children: [{
            id: '1-1-1-1',
            label: '四级 1-1-1',
            child: false, //子集是否展开
            check: false, //是否x选中
            indeterminate: true, //子集是否全部选中
            children:[
              {
                id: '1-1-1-1-1',
                label: '五级 1-1-1-1',
                child: false, //子集是否展开
                check: false, //是否x选中
                indeterminate: true, //子集是否全部选中
              },
              {
                id: '1-1-1-1-2',
                label: '五级 1-1-1-2',
                child: false, //子集是否展开
                check: false, //是否x选中
                indeterminate: true, //子集是否全部选中
              }
            ]
          }, {
            id: '1-1-1-2',
            label: '四级 1-2-1',
            child: false, //子集是否展开
            check: false, //是否x选中
            indeterminate: true, //子集是否全部选中
          }]
        }, {
          id: '1-2-1',
          label: '三级 1-2-1',
          child: false, //子集是否展开
          check: false, //是否x选中
          indeterminate: true, //子集是否全部选中
          children: []
        }]
      }, {
        id: '1-2',
        label: '二级 1-2',
        child: false, //子集是否展开
        check: false, //是否x选中
        indeterminate: true, //子集是否全部选中,
        children: []
      }]
    }, {
      id: '2',
      label: '一级 2',
      child: false, //子集是否展开
      check: false, //是否x选中
      indeterminate: true, //子集是否全部选中
      children: [{
        id: '2-1',
        label: '二级 2-1',
        child: false, //子集是否展开
        check: false, //是否x选中
        indeterminate: true, //子集是否全部选中
        children: [{
          id: '2-1-1',
          label: '三级 2-1-1',
          child: false, //子集是否展开
          check: false, //是否x选中
          indeterminate: true, //子集是否全部选中
        }]
      }, {
        id: '2-2',
        label: '二级 2-2',
        child: false, //子集是否展开
        check: false, //是否x选中
        indeterminate: true, //子集是否全部选中
        children: [{
          id: '2-2-1',
          label: '三级 2-2-1',
          child: false, //子集是否展开
          check: false, //是否x选中
          indeterminate: true, //子集是否全部选中
        }]
      }]
    }, {
      id: '3',
      label: '一级 3',
      child: false, //子集是否展开
      check: false, //是否x选中
      indeterminate: true, //子集是否全部选中
      children: [{
        id: '3-1',
        label: '二级 3-1',
        child: false, //子集是否展开
        check: false, //是否x选中
        indeterminate: true, //子集是否全部选中
        children: [{
          id: '3-1-1',
          label: '三级 3-1-1',
          child: false, //子集是否展开
          check: false, //是否x选中
          indeterminate: true, //子集是否全部选中
        }]
      }, {
        id: '3-2',
        label: '二级 3-2',
        child: false, //子集是否展开
        check: false, //是否x选中
        indeterminate: true, //子集是否全部选中
        children: [{
          id: '3-2-1',
          label: '三级 3-2-1',
          child: false, //子集是否展开
          check: false, //是否x选中
          indeterminate: true, //子集是否全部选中
        }]
      }]
    }],
    seachTreeList: [],
    seachValue: '',
    seachValueId: '',
    radioShow: false,
    seachRadioShow: false,
    checkData:'',
    configByObjectVoOne:234567900
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setHour()
    this.setMinute()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //注册弹框
    this.toast = this.selectComponent("#toast");
  },

  //  单选组织树事件

  /**
   * 单选组织树输入框事件
   */
  int_seach(e) {
    let value = e.detail.value;
    this.setData({
      seachValue: value,
      seachValueId:'',
      radioShow: false,
      seachRadioShow: true
    })
    this.getSeachTree(value)
  },
  // 获取焦点
  inputFoucus() {
    this.setData({
      radioShow: true
    })
    if (this.data.seachValueId) {
      this.serListPub(this.data.seachValueId)
    }
  },
  // 失去焦点
  inputBlur() {
    // this.setData({
    //   radioShow:false
    // })
  },
  //inco事件
  iconTap(){
    this.setData({
      seachTreeList: [],
      seachValue:'',
      seachValueId: '',
      radioShow: false,
      seachRadioShow: false
    })
    let list = this.data.treeList;
    this.setCloseTreeList(list)
    this.setData({
      treeList: list
    })
  },
  seachRadioTap(e) {
    //搜素下拉值的点击事件
    let dom = e.target.dataset.item;
    this.setData({
      seachTreeList: [],
      seachValue: dom.label,
      seachValueId: dom.id,
      radioShow: false,
      seachRadioShow: false
    })
  },
  getSeachTree(val) {
    //匹配搜素值
    let value = val;
    let map = {}
    if (value.trim()) {
      //有值
      const reg = new RegExp(value)
      let arr = []
      let list = this.data.treeList;
      const func = (arr, plable) => {
        arr.forEach(item => {
        
          if (reg.test(item.label)) {
            if (!map[item.id]) {
              map[item.id] = {
                ...item,
                text: plable ? plable + '/' + item.label : item.label
              }
            }
          }
          if (item.children && item.children.length > 0) {
            let plables = item.label
            // if(plables){
            //   plables = plables +'/'+item.label
            // }else{
            //   plables = item.label
            // }
            func(item.children, plables)
          }
        })
      }
      func(list)

      this.setData({
        seachTreeList: Object.values(map)
      })
    } else {
      //搜素无值
      this.setData({
        seachTreeList: [],
        seachValueId:'',
        radioShow: true,
        seachRadioShow: false
      })

    }
  },
  treeRadioTap(e) {
    //tree视图 分类选中事件
    let id = e.detail;
    this.serListPub(id)
    this.setData({
      seachValue: this.data.checkData.label,
      seachValueId: this.data.checkData.id,
      radioShow: false
    })
  },
  serListPub(id) {
    //tree视图 当前选中后，父级和自己 选中值得改变
    let list = this.data.treeList;
    this.setArr(list, id)
    this.setData({
      treeList: list
    })
  },
  setArr(list, pid) {
    //改变当前选中 层级的值
    let checkData = ''
    const func = (arr,pparr) => {
      arr.forEach(item => {
        item.check = false
        item.indeterminate = true
       
        if (item.id === pid) {
          item.check = true
          checkData = item
        }
        if (pparr && item.check) {
          pparr.forEach(item => {
            item.indeterminate = false
          })
        }
        if (pparr && !item.indeterminate) {
          pparr.forEach(item => {
            item.indeterminate = false
          })
        }
        if (item.children && item.children.length > 0) {
          //lists所有的父级信息
          let lists = pparr
          if(lists){
            lists.push(item)
          }else{
           lists = [item]
          }
          func(item.children, lists)
        }
      })
    }
    func(list)

    this.setData({
      checkData:checkData
      // seachValue: checkData.label,
      // seachValueId: checkData.id,
      // radioShow: false
    })
  },
  setCloseTreeList(list){
    
     const func = (arr) => {
      arr.forEach(item => {
        item.check = false
        item.indeterminate = true
        if (item.children && item.children.length > 0) {
          func(item.children)
        }
      })
    }
    func(list)

  },
  //
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
  },
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
  },
  onChange2(event) {
    this.setData({
      result: event.detail,
    });
  },
  uploadImg(event) {
    let {
      detail
    } = event
    console.log(detail)
  },
  showTost(event) {
    let {
      type
    } = event.currentTarget.dataset
    this.toast.showToast({
      value: '提示内容哈哈哈', //提示内容
      type: type, //提示类型（warning、info、success、error）
      icon: 'icon-daochu-01', //显示的icon
      duration: 1500, //隐藏弹框时间（不传默认1500）
    });
  },
  search: function (value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{
          text: '搜索结果',
          value: 1
        }, {
          text: '搜索结果2',
          value: 2
        }])
      }, 200)
    })
  },
  selectResult: function (e) {
    console.log('select result', e.detail)
  },
  uploadWord: function () {
    //上传文件、获取文件信息
    var that = this;
    wx.chooseMessageFile({
      count: 1, //能选择文件的数量
      type: 'file', //能选择文件的类型,我这里只允许上传文件.还有视频,图片,或者都可以
      success(res) {
        // var size = res.tempFiles[0].size; //文件大小
        var filename = res.tempFiles[0].name; //文件名字
        // var newfilename = filename + "";

        // if (size > 4194304 || newfilename.indexOf(".pdf") == -1) { //我还限制了文件的大小和具体文件类型
        //   wx.showToast({
        //     title: '文件大小不能超过4MB,格式必须为pdf！',
        //     icon: "none",
        //     duration: 2000,
        //     mask: true
        //   })
        // } else {
        that.setData({
          path: res.tempFiles[0].path, //将文件的路径保存在页面的变量上,方便 wx.uploadFile调用
          filename: filename //渲染到wxml方便用户知道自己选择了什么文件
        })

        that.uploadFunc('file', res.tempFiles[0].path)
        // }
      },
      fail() {
        wx.showToast({
          title: '请求出错',
        })
      }
    })
  },
  uploadImage: function () {
    //上传图片
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera', 'album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        wx.showToast({
          title: '正在上传...',
          icon: 'none'
        })
        const tempFilePaths = res.tempFilePaths
        that.setData({
          imgName: tempFilePaths
        })
        that.uploadFunc('images', tempFilePaths)
      }
    })
  },
  uploadFunc: function (type, path) {
    //上传到服务器
    let that = this;
    wx.uploadFile({
      url: '', //上传的路径
      filePath: path, //刚刚在data保存的文件路径
      name: type, //后台获取的凭据
      success() {
        wx.showToast({ //做个提示或者别的操作
          title: '成功',
          icon: "none",
        })
      },
      fail() {

        wx.showToast({
          title: '请求出错',
        })
      }
    })
  },
  uploadClose: function () {
    //删除文件
    this.setData({
      filename: ''
    })
  },
  uploadImgClose: function () {
    //删除图片
    this.setData({
      imgName: ''
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  setHour: function () {
    let list = [];
    for (let i = 0; i < 24; i++) {
      let value = i < 10 ? '0' + i : i
      list.push({
        id: value,
        name: i + '时'
      })
    }
    this.setData({
      'objectMultiArray[0]': list
    })
  },
  setMinute: function () {
    let list = []
    for (let i = 0; i < 60; i++) {
      let value = i < 10 ? '0' + i : i
      list.push({
        id: value,
        name: i + '分'
      })
    }
    this.setData({
      'objectMultiArray[1]': list
    })
  },
})