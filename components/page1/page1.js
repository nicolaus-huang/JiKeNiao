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
      disabled: false,
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
            userInfo: this.data.userInfo,
            phoneNumber: this.data.phoneNumber,
            QQ: this.data.QQ,
            computerInfo: this.data.computerInfo,
            problemDetail: this.data.problemDetail
          }
          wx.request({
            url: 'http://42.193.96.13:5000/appointment',
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
    userNameBlur(e) {
      //控制姓名输入为汉字
      let pattern = /^[\u4e00-\u9fa5]{2,20}$/
      if(e.detail.value != "" && e.detail.value.match(pattern) == null) {
        this.setData({userName: ""})
        wx.showModal({
          title: "姓名输入不合法",
          showCancel: false
        })
      }
    },
    getUserInfo(e) {
      this.setData({userMajor: e.detail})
    },
    phoneNumberInput(e) {
      this.data.phoneNumber = e.detail.value
    },
    phoneNumberBlur(e) {
      //控制手机号输入是数字且符合规范178,630,256,19
      let pattern = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if(e.detail.value != "" && e.detail.value.match(pattern) == null) {
        this.setData({phoneNumber: ""})
        wx.showModal({
          title: "请输入中国大陆11位非座机手机号",
          showCancel: false
        })
      }
    },
    QQInput(e) {
      this.data.QQ = e.detail.value
    },
    QQBlur(e) {
      let pattern = /^[1-9][0-9]{4,14}$/
      if(e.detail.value != "" && e.detail.value.match(pattern) == null) {
        this.setData({QQ: ""})
        wx.showModal({
          title: "QQ号输入不合法",
          showCancel: false
        })
      }
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
