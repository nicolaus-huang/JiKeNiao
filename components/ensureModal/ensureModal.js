Component({
  properties: {
    height: String,
    width: String,
    marginLeft: String,
    marginTop: String,
    Top: String,
    Left: String,
    time: String,
    volunteerName: String,
    userName: String,
    serverContent: Object,
    problemShow: String,
    serverLast: String,
    attitudeStar: String,
    skillStar: String,
    serverStar: String,
    zIndex: String,
    display: String
  },  
  data: {
    content: ""
  },
  observers: {
    'serverContent': function(serverContent) {
      if(serverContent.reserve == true && serverContent.guide == true)
        this.setData({content: "日常预约和产品导购"})
      if(serverContent.reserve == true && serverContent.guide == false)
        this.setData({content: "日常预约"})
      if(serverContent.reserve == false && serverContent.guide == true)
        this.setData({content: "产品导购"})
    }
  },
  methods: {
    btnEnsure() {
      this.triggerEvent('btnEnsure')
    },
    btnCancel() {
      this.triggerEvent('btnCancel')
    }
  }
})
