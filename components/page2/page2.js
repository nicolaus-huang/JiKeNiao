Component({
  data: {
    //1.订单密钥
    orderNumber: "",
    //2.服务内容
    serverContent: {
      //未选择是false选择是true
      reserve: false,
      guide: false
    },
    //3.故障简述
    problemShow: "",
    //4.服务时长
    serverLast: "",
    //5.1志愿者态度分
    attitudeStar: 0,
    //5.2志愿者技术分
    skillStar: 0,
    //5.3服务综合体验分
    serverStar: 0,
    //6.给志愿者的评语
    volunteerAssess: "",
    //查询框
    searchDisplay: "none",
    searchZIndex: 2,
    //确认框
    ensureDisplay: "none",
    ensureZIndex: 3,
    //遮罩层
    coverDisplay: "none",
    coverZIndex: 1,
    //从服务器获得的订单信息
    orderInfo: {}
  },
  lifetimes: {
    attached () {
      wx.showModal({
        title: "志愿者服务时长涉及到志愿者的志愿学时，虚假填写时长会被极客鸟拉黑",
        showCancel: false
      })
    }
  },
  methods: {
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
    //密钥响应时更新
    orderNumberInput(e) {
      this.setData({orderNumber: e.detail.value})
    },
    //密钥检验
    orderNumberBlur(e) {
      let pattern = /^[a-zA-Z]{30}$/
      if(e.detail.value != "" && e.detail.value.match(pattern) == null) {
        this.setData({orderNumber: ""})
        wx.showModal({
          title: "密钥请输入志愿者提供的30位字符串",
          showCancel: false
        })
      }
    },
    //查询按钮事件
    btnSearch(e) {
      let pattern = /^[a-zA-Z]{30}$/
      if(this.data.orderNumber.match(pattern) == null){
        //密钥不合法
        this.setData({orderNumber: ""})
        wx.showModal({
          title: "密钥请输入志愿者提供的30位字符串",
          showCancel: false
        })
      }
      else{
        //密钥合法时执行下述操作
        let obj = {
          "orderNumber": this.data.orderNumber
        }
        try{
          wx.request({
            url: 'https://mylifemeaning.cn:8888/feedback',
            method: 'post',
            data: JSON.stringify(obj),
            dataType: JSON,
            success(data) {
              //显示查询结果
              this.setData({coverDisplay: "block"})
              this.setData({searchDisplay: "flex"})
              //存储返回的信息
              this.setData({orderInfo: data})
            },
            fail() {
              wx.showModal({
                title: "提交失败",
                showCancel: false
              })
            }
          })//wx.request
        } catch(err) {
          console.log(err)
        }//try & catch
      }//else
    },
    //查询关闭事件
    searchClosed(){
      this.setData({searchDisplay: "none"})
      this.setData({coverDisplay: "none"})
    },
    //提交前的确认框取消按钮事件
    btnCancel() {
      this.setData({ensureDisplay: "none"})
      this.setData({coverDisplay: "none"})
    },
    //提交前的确认框确认按钮事件
    btnEnsure() {
      this.setData({ensureDisplay: "none"})
      this.setData({coverDisplay: "none"})
      //在弹出信息确认框前已经保证输入信息已经填完，此时提交安全不需要再检验
      this.commit()
    }, 
    //表单内容提交
    commit() {
      var obj = {
        //1.订单密钥
        orderNumber: this.data.orderNumber,
        //2.服务内容(string)
        serverContent: this.data.serverContent,
        //3.故障简述(string)
        problemShow: this.data.problemShow,
        //4.服务时长(int)
        serverLast: this.data.serverLast,
        //5.1志愿者态度分(int,0-5代表星星个数)
        attitudeStar: this.data.attitudeStar,
        //5.2志愿者技术分(int)
        skillStar: this.data.skillStar,
        //5.3服务综合体验分(int)
        serverStar: this.data.serverStar,
        //6.给志愿者的评语(string,可为空)
        volunteerAssess: this.data.volunteerAssess
      }
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
    },
    //故障简述响应式更新
    problemShowInput(e) {
      this.setData({problemShow: e.detail.value})
    },
    //故障简述输入检验
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
    //服务时长响应式更新
    serverLastInput(e) {
      this.setData({serverLast: e.detail.value})
    },
    //服务时长输入检验
    serverLastBlur(e) {
      let pattern = /^[0-9]{0,100}$/
      if(e.detail.value != "" && e.detail.value.match(pattern) == null) {
        this.setData({serverLast: ""})
        wx.showModal({
          title: "输入天数不合法，请输入数字",
          showCancel: false
        })
      }
    },
    //志愿者评分响应式更新
    volunteerAssessInput(e) {
      this.setData({volunteerAssess: e.detail.value})
    },
    //提交按钮事件(检验)
    btnClick(e) {
      if(this.orderNumber == "" || this.data.serverContent == "" || this.data.problemShow == "" || this.data.serverLast == "" || this.data.attitudeStar == "" || this.data.skillStar == "" || this.data.serverStar == "")
        wx.showModal({
          title: "上述必要内容没有填写完毕",
          showCancel: false
        })
      else{
        //必要信息填写完毕后弹出信息检验弹窗
        this.setData({coverDisplay: "block"})
        this.setData({ensureDisplay: "flex"})
      }
    }//btnClick
  }//methods
})
