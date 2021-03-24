Component({
  data: {
    //1.专业和姓名
    userNameMajor: "",
    //2.联系方式
    userContact: "",
    //3.服务内容
    serverContent: {
      //未选择是false选择是true
      reserve: false,
      guide: false
    },
    //4.故障简述
    problemShow: "",
    //5.志愿者姓名
    volunteerName: "",
    //6.服务时长
    serverLast: "",
    //7.提交预约的日期2021-03-21格式
    date: "",
    //8.1志愿者态度分
    attitudeStar: 0,
    //8.2志愿者技术分
    skillStar: 0,
    //8.3服务综合体验分
    serverStar: 0,
    //9.给志愿者的评语
    volunteerAssess: ""
  },
  methods: {
    //获取并填写预约日期
    pickerChange(e) {
      this.setData({date: e.detail.value})
    },
    //通过子组件接收到星星个数
    getStarNum(e) {
      this.setData({attitudeStar: e.detail.attitudeStar, skillStar: e.detail.skillStar, serverStar: e.detail.serverStar})
    },
    //获取用户多选题的结果
    getChecked(e) {
      let obj = e.detail.value
      //只选中一个
      if(obj.length == 1){
        if(obj[0] == 'reserve')
          this.setData({serverContent: {reserve: true, guide: false}})
        else
          this.setData({serverContent: {reserve: false, guide: true}})
      }
      //两个都选中了
      if(obj.length == 2)
        this.setData({serverContent: {reserve: true, guide: true}})
    },
    userNameMajorInput(e) {
      this.setData({userNameMajor: e.detail.value})
    },
    userContactInput(e) {
      this.setData({userContact: e.detail.value})
    },
    problemShowInput(e) {
      this.setData({problemShow: e.detail.value})
    },
    volunteerNameInput(e) {
      this.setData({volunteerName: e.detail.value})
    },
    serverLastInput(e) {
      this.setData({serverLast: e.detail.value})
    },
    volunteerAssessInput(e) {
      this.setData({volunteerAssess: e.detail.value})
    },
    btnClick(e) {
      //下述是检验数据是否获取成功
      // let test = this.data
      // console.log(test.userNameMajor,test.userContact,test.serverContent,test.problemShow,test.volunteerName,test.serverLast,test.date,test.attitudeStar,test.skillStar,test.serverStar,test.volunteerAssess)

      if(this.data.userNameMajor == "" || this.data.userContact == "" || this.data.serverContent == "" || this.data.problemShow == "" || this.data.volunteerName == "" || this.data.serverLast == "" || this.data.date == "" || this.data.attitudeStar == "" || this.data.skillStar == "" || this.data.serverStar == "")
        wx.showModal({
          title: "上述必要内容没有填写完毕",
          showCancel: false
        })
      else{
        var obj = {
          //1.专业和姓名(string)
          userNameMajor: this.data.userNameMajor,
          //2.联系方式(string)
          userContact: this.data.userContact,
          //3.服务内容(string)
          serverContent: this.data.serverContent,
          //4.故障简述(string)
          problemShow: this.data.problemShow,
          //5.志愿者姓名(string)
          volunteerName: this.data.volunteerName,
          //6.服务时长(int)
          serverLast: this.data.serverLast,
          //7.提交预约的日期2021-03-21格式(string)
          date: this.data.date,
          //8.1志愿者态度分(int,0-5代表星星个数)
          attitudeStar: this.data.attitudeStar,
          //8.2志愿者技术分(int)
          skillStar: this.data.skillStar,
          //8.3服务综合体验分(int)
          serverStar: this.data.serverStar,
          //9.给志愿者的评语(string,可为空)
          volunteerAssess: this.data.volunteerAssess
        }
        wx.request({
          url: 'http://42.193.96.13:5000:test',
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
        })//wx.request
      }//btnClick
    }//methods
  }//Component
})
