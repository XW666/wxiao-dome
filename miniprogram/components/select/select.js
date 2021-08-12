// component/select/select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否多选
    multiple: {
      type: Boolean,
      value: false
    },
    //下拉值
    options: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    seachShow: false, //下拉菜单是否显示
    selectList: [], //下拉值
    value: '', //单选时，选中中的值
    value2: '',
    checkList: [], //多选状态下，选中的值
    checkObj: {}, //选中值的对象
    allCheck: false, //是否全选
    indeterminate: true, //子集是否部分选中
  },
  ready() {
    //初始化 下拉菜单赋值
    this.setData({
      selectList: this.data.options
    })

  },
  /**
   * 组件的方法列表
   */
  methods: {
    seachTap() {
      //下拉菜单显示/隐藏
      this.setData({
        seachShow: !this.data.seachShow
      })
    },
    int_seach(e) {
      //搜素
      let value = e.detail.value;
      const reg = new RegExp(value)
      var arr = []
      if (value.trim()) {
        //有值
        for (let i = 0; i < this.data.options.length; i++) {
          const label = this.data.options[i].label
          if (reg.test(label)) {
            arr.push(this.data.options[i])
          }
        }
        this.setData({
          selectList: arr
        })
      } else {
        //搜素无值
        this.setData({
          selectList: this.data.options
        })
        if (this.data.multiple) {
          //多选状态下，清空搜素值，改变下拉菜单勾选状态
          this.setAllCheck()
        }
      }
    },
    downTap(e) {
      //选择值
      let pid = e.currentTarget.dataset.pid;
      let obj = this.data.selectList[pid]
      if (this.data.multiple) {
        //多选
        let mm = this.data.checkObj
        let list = this.data.checkList
        if (mm[obj.value]) {
          //已经选中的值，点击，丛选中数组中 删除
          delete mm[obj.value]
          list = list.filter(item => item.value !== obj.value)
        } else {
          //没选中的值，点击添加到选中数组中
          mm[obj.value] = obj.value
          list.push(obj)
        }

        this.setData({
          checkObj: mm,
          checkList: list
        })
        this.setAllCheck()
      } else {
        //单选/
        let mm = {}
        mm[obj.value] = obj.value
        this.setData({
          value: obj.label,
          checkObj: mm
        })
      }

    },
    allDownTap() {
      //全选
      if (this.data.indeterminate) {
        //下拉值中无选中
        this.setData({
          allCheck: !this.data.allCheck,
          indeterminate: true
        })
      } else {
        //下拉值中有选中
        this.setData({
          allCheck: false,
          indeterminate: true
        })
      }

      if (this.data.allCheck) {
        //全选
        let mm = {};
        this.data.selectList.forEach(item => {
          mm[item.value] = item.value
        })
        this.setData({
          checkObj: mm,
          checkList: this.data.selectList
        })
      } else {
        //全不选
        this.setData({
          checkObj: {},
          checkList: []
        })
      }
    },
    setAllCheck() {
      //设置全选按钮状态
      let carr = this.data.checkList; //选中的值
      let larr = this.data.selectList //当前所有的值
      if (carr.length === 0) {
        //下拉值无选中
        this.setData({
          allCheck: false,
          indeterminate: true
        })
      } else {
        if (carr.length === larr.length) {
          //下拉值全选中
          this.setData({
            allCheck: true,
            indeterminate: true
          })
        } else {
          //下拉值部分选中
          this.setData({
            allCheck: false,
            indeterminate: false
          })
        }
      }

    },
    tagClose(e) {
      //多选状态下，选中tag事件
      //删除当前选中的值，下拉值中相应值的状态页改变
      let pid = e.currentTarget.dataset.pid;
      let obj = this.data.checkList[pid]
      let list = this.data.checkList.filter(item => item.value !== obj.value)
      let mm = this.data.checkObj;
      delete mm[obj.value]
      this.setData({
        checkList: list,
        checkObj: mm
      })
      this.setAllCheck()
    }
  }
})