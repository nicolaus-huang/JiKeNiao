Component({
  data: {
      //和Vue不一样这里的数据不是响应式的,要手动实现,下面数据更改时使用自带的setData进行响应式更新
      userName: "",
      userMajor: "",
      phoneNumber: "",
      QQ: "",
      computerInfo: "",
      problemDetail: "",
      //表示是否选择阅读协议,0表示没有,1为有
      checked: 0,
      disabled: false
  },
  methods: {
    btnClick() {
      if(!this.data.checked)
       wx.showModal({
         title: "没有阅读免责协议",
         showCancel: false
       })
      else{
        if(this.data.userName == "" || this.data.userMajor == "" || this.data.phoneNumber == "" || this.data.QQ =="" || this.data.computerInfo == "" || this.data.problemDetail == "")
          wx.showModal({
            title: "上述内容没有填写完毕",
            showCancel: false
          })
        else{
          var obj = {
            userName: this.data.userName,
            userMajor: this.data.userMajor,
            phoneNumber: this.data.phoneNumber,
            QQ: this.data.QQ,
            computerInfo: this.data.computerInfo,
            problemDetail: this.data.problemDetail
          }
          wx.request({
            url: 'http://42.193.96.13:5000/test',
            method: 'post',
            data: JSON.stringify(obj),
            success() {
              wx.showModal({
                title: "您的预约表已经提交",
                showCancel: false
              })
            },
            fail() {
              wx.showModal({
                title: "提交失败",
                showCancel: false
              })
            }
          })
        }
      }
    },
    //以下是绑定输入事件，对组件中的data进行更新，做到响应式的效果。由于不需要更改渲染端的内容所以这里没有用setData方法
    userNameInput(e) {
      this.data.userName = e.detail.value
    },
    userMajorInput(e) {
      this.data.userMajor = e.detail.value
    },
    phoneNumberInput(e) {
      this.data.phoneNumber = e.detail.value
    },
    QQInput(e) {
      this.data.QQ = e.detail.value
    },
    computerInfoInput(e) {
      this.data.computerInfo = e.detail.value
    },
    problemDetailInput(e) {
      this.data.problemDetail = e.detail.value
    },
    getChecked(e) {
      this.data.checked = e.detail.value.length
    }
  }
})
