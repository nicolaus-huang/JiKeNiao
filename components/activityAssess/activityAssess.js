// components/activityAssess/activityAssess.js
Component({
  properties: {
    width: String,
    height: String,
    marignTop: String,
    marginLeft: String,
  },
  data: {
    attitudeStar: 0,
    skillStar: 0,
    serverStar: 0
  },
  observers: {
    //三种评分中任意一种星星数量发生变化都会传给page2(反馈页面)根组件
    'attitudeStar,skillStar,serverStar': function(attitudeStar,skillStar,serverStar){
      var obj = {
        attitudeStar,
        skillStar,
        serverStar
      }
      this.triggerEvent('getStarNum',obj)
    }
  },
  methods: {
    firstAssess(e) {
      this.setData({attitudeStar: e.detail})
    },
    secondAssess(e) {
      this.setData({skillStar: e.detail})
    },
    thirdAssess(e) {
      this.setData({serverStar: e.detail})
    }
  }
})
