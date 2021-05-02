var wxDraw = require("../../utils/wxdraw.min.js").wxDraw;
var Shape = require("../../utils/wxdraw.min.js").Shape;
Component({
  data: {
    //1.姓名
    userNames: "",
    //2.专业
    userMajor: "",
    //3.联系方式
    userContact: "",
    //4.服务内容
    serverContent: {
      //未选择是false选择是true
      reserve: false,
      guide: false
    },
    //5.故障简述
    problemShow: "",
    //6.志愿者姓名
    volunteerName: "",
    //7.服务时长
    serverLast: "",
    //8.提交预约的日期2021-03-21格式
    date: "",
    //9.1志愿者态度分
    attitudeStar: 0,
    //9.2志愿者技术分
    skillStar: 0,
    //9.3服务综合体验分
    serverStar: 0,
    //10.给志愿者的评语
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
    userNameInput(e) {
      this.setData({userName: e.detail.value})
    },
    userNameBlur(e) {
      console.log(e.detail.value)
      let pattern = /^[\u4e00-\u9fa5]{2,5}$/
      if(e.detail.value != "" && e.detail.value.match(pattern) == null) {
        this.setData({userNames: ""})
        console.log(this.data.userName)
        wx.showModal({
          title: "输入姓名不合法(请输入2到5个汉字)",
          showCancel: false
        })
      }
    },
    getUserInfo(e) {
      this.setData({userMajor: e.detail})
    },
    userContactInput(e) {
      this.setData({userContact: e.detail.value})
    },
    userContactBlur(e) {
      let patternPhone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if(e.detail.value != "" && e.detail.value.match(patternPhone) == null) {
        this.setData({userContact: ""})
        wx.showModal({
          title: "手机号输入有误",
          showCancel: false
        })
      }
    },
    problemShowInput(e) {
      this.setData({problemShow: e.detail.value})
    },
    problemShowBlur(e) {
      let pattern = /[\u4e00-\u9fa5]/
      if(e.detail.value != "" && e.detail.value.match(pattern) == null) {
        this.setData({problemShow: ""})
        wx.showModal({
          title: "故障简述输入不合法",
          showCancel: false
        })
      }
    },
    volunteerNameInput(e) {
      this.setData({volunteerName: e.detail.value})
    },
    volunteerNameBlur(e) {
      let pattern = /^[\u4e00-\u9fa5]{2,5}$/
      if(e.detail.value != "" && e.detail.value.match(pattern) == null) {
        this.setData({volunteerName: ""})
        wx.showModal({
          title: "输入志愿者姓名不合法(请输入2到5个汉字)",
          showCancel: false
        })
      }
    },
    serverLastInput(e) {
      this.setData({serverLast: e.detail.value})
    },
    serverLastBlur(e) {
      let pattern = /^[0-9]{0,100}$/
      if(e.detail.value != "" && e.detail.value.match(pattern) == null) {
        this.setData({serverLast: ""})
        wx.showModal({
          title: "输入天数不合法",
          showCancel: false
        })
      }
    },
    volunteerAssessInput(e) {
      this.setData({volunteerAssess: e.detail.value})
    },
    btnClick(e) {
      //下述是检验数据是否获取成功
      // let test = this.data
      // console.log(test.userNameMajor,test.userContact,test.serverContent,test.problemShow,test.volunteerName,test.serverLast,test.date,test.attitudeStar,test.skillStar,test.serverStar,test.volunteerAssess)

      if(this.data.userName == "" || this.data.userMajor == "" || this.data.userContact == "" || this.data.serverContent == "" || this.data.problemShow == "" || this.data.volunteerName == "" || this.data.serverLast == "" || this.data.date == "" || this.data.attitudeStar == "" || this.data.skillStar == "" || this.data.serverStar == "")
        wx.showModal({
          title: "上述必要内容没有填写完毕",
          showCancel: false
        })
      else{
        var obj = {
          //1.姓名(string)
          userName: this.data.userNames,
          //2.专业
          userMajor: this.data.userMajor,
          //3.联系方式(string)
          userContact: this.data.userContact,
          //4.服务内容(string)
          serverContent: this.data.serverContent,
          //5.故障简述(string)
          problemShow: this.data.problemShow,
          //6.志愿者姓名(string)
          volunteerName: this.data.volunteerName,
          //7.服务时长(int)
          serverLast: this.data.serverLast,
          //8.提交预约的日期2021-03-21格式(string)
          date: this.data.date,
          //9.1志愿者态度分(int,0-5代表星星个数)
          attitudeStar: this.data.attitudeStar,
          //9.2志愿者技术分(int)
          skillStar: this.data.skillStar,
          //9.3服务综合体验分(int)
          serverStar: this.data.serverStar,
          //10.给志愿者的评语(string,可为空)
          volunteerAssess: this.data.volunteerAssess
        }
        console.log(obj)
        wx.request({
          url: 'https://mylifemeaning.cn:8888/feedback',
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
