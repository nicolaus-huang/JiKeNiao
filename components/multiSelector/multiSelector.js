Component({
  properties: {
    width: String,
    marginLeft: String,
    boxSizing: String
  },
  data: {
    userInfo: "",
    Grade: ['17级','18级','19级','20级','21级','22级','23级','24级'],
    School: ['机电院','海洋学院','商学院','文化传播学院','空间科学与物理学院','数学与统计学院','东北亚学院','翻译学院','法学院','艺术学院','联合理学院','马克思主义学院','前沿交叉科学研究院'],
    //映射参考表(不会实际用上,就是写mapMake时参照一下)
    Map: ['JiDian','HaiYang','ShangXue','WenHua','KongJian','ShuXue','DongBeiYa','FanYi','FaXue','YiShu','LiXue','MaKeSi','QianYan'],
    //机电院
    JiDian: ['材料成型及控制工程','通信(量子)','通信','计算机合','测控','软件工程','电子信息','机械','机械合','数媒','自动化','计算机','电子信息','人工智能','机信研究生'],
    //海洋学院
    HaiYang: ['生物技术','海洋资源与环境','生物科学','海洋资源开发(综合)','海洋资源开发(健康)','海洋资源开发(养护)','应用化学','药学','海洋资源开发(海洋药物)','生物科学','海洋科学(海洋生物)','海洋科学(海洋化学)','海洋科学(资源与环境)','海洋资源开发(海洋功能制品)','海洋资源开发(海洋生态工程)','海洋资源开发(海洋生物健康)','海洋科学','海洋资源开发','海洋研究生'],
    //商学院
    ShangXue: ['金融','中澳商科','会计学','物流管理','保险学','工商管理','国际经济与贸易','人力资源管理','电子商务','市场营销','金融合','旅游管理','金融(保险)','金融(证券,银行)','会计(国际实验班)','电子商务(大数据管理)','经济学类','物流管理(供应链)','工商管理类','国际经济与贸易+英语','商学研'],
    //文化传播学院
    WenHua: ['新闻学','汉语国际教育','汉语言文学','中国语言文学类','新闻学(法制新闻)','文传研'],
    //空间科学与物理学院
    KongJian: ['空间科学与技术','应用物理学','物理研'],
    //数学与统计学院
    ShuXue: ['统计学','数据科学与人工智能','数学与应用数学','信息与计算科学','数学类','数学研'],
    //东北亚学院
    DongBeiYa: ['日语','朝鲜语','国际政治','国际政治+国际经济','国际政治+国际经济贸易','朝鲜语(翻译方向)','朝鲜语(经贸方向)','东北亚研'],
    //翻译学院
    FanYi: ['英德','英语','口译','翻译','英法','英俄','英西','国际经济与贸易+英语','英日','外国语言文学类','法学+英语双学位','翻译研'],
    //法学院
    FaXue: ['法学','行政管理','社会工作','社会工作(司法社会工作)','法学(党内法规与监察法学)','计算法学','政治学与行政学','法学+英语双学位','法学类','法学研'],
    //艺术学院
    YiShu: ['环境设计(公共艺术设计)','环境设计(景观设计)','美术学(国画)','美术学(油画)','视觉传达设计','舞蹈编导(表演教育)','舞蹈编导','音乐学','环境设计','艺术研'],
    //联合理学院
    LiXue: ['数学合','物理合','化学合','生物合'],
    //马克思学院
    MaKeSi: ['马院研'],
    //前沿交叉科学研究院
    QianYan: ['前沿研'],
    ArrayList: [[],[],[]],
  },
  methods: {
    //JS没有映射，只能手写一个
    mapMake(index) {
      let that = this.data
      if (index == 0) 
        return that.JiDian
      else if(index == 1)
        return that.HaiYang
      else if(index == 2)
        return that.ShangXue
      else if(index == 3)
        return that.WenHua
      else if(index == 4)
        return that.KongJian
      else if(index == 5)
        return that.ShuXue
      else if(index == 6)
        return that.DongBeiYa
      else if(index == 7)
        return that.FanYi
      else if(index == 8)
        return that.FaXue
      else if(index == 9)
        return that.YiShu
      else if(index == 10)
        return that.LiXue
      else if(index == 11)
        return that.MaKeSi
      else 
        return that.QianYan
    },
    //数据响应式
    pickerChange(e) {
      let index = e.detail.value
      let list = this.data.ArrayList
      this.setData({userInfo: list[0][index[0]]+" "+list[1][index[1]]+" "+list[2][index[2]]})
      
      //检验年级的合法性
      let pattern = /^[0-9][0-9](?=[\u7ea7])/
      //当前选择的年级
      let grade = this.data.userInfo.match(pattern)[0]
      //当期年份后两位
      let standardGrade = new Date().getFullYear()-2000
      //当前月份
      let standardMonth = new Date().getMonth()
      //判断年级是否合法
      if(standardMonth >= 9 && grade > standardGrade) {
        //此时standardGrade为最小年级
        this.setData({userInfo: ""})
          wx.showModal({
            title: "年级不对",
            showCancel: false
          })
        }
      else if(standardMonth < 9 && grade > standardGrade-1) {
        //此时standardGrade-1为最小年级
        this.setData({userInfo: ""})
        wx.showModal({
          title: "年级不对",
          showCancel: false
        })
      }

      //检验专业和学院是否匹配(有可能滑动过快导致错位)
      //当前选择的学院
      let school = list[1][index[1]]
      //当前选择的专业
      let major = list[2][index[2]]
      //对应的学院的专业所在的数组
      let targetArray = this.mapMake(index[1])
      //检索位置,如果专业不是本学院则会返回-1
      if(targetArray.indexOf(major) == -1) {
        this.setData({userInfo: ""})
        wx.showModal({
          title: "专业和学院不匹配(滑动会有延迟,请慢点滑动)",
          showCancel: false
        })
      }
      //发送数据给父组件
      this.triggerEvent('getUserInfo',this.data.userInfo)
    },
    //切换学院同时切换专业
    pickerColumnChange(e) {
      if(e.detail.column == 1) {
        let list = this.data.ArrayList
        list[2] = this.mapMake(e.detail.value)
        this.setData({ArrayList: list})
      }
    }
  },
  lifetimes: {
    //初始化
    attached() {
      let newList = [this.data.Grade,this.data.School,this.data.JiDian]
      this.setData({ArrayList: newList})
    }
  }
})
