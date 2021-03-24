Component({
  data: {
    firstSrc: "../../../assets/images/greyStar.png",
    secondSrc: "../../../assets/images/greyStar.png",
    thirdSrc: "../../../assets/images/greyStar.png",
    fourthSrc: "../../../assets/images/greyStar.png",
    fifthSrc: "../../../assets/images/greyStar.png",
    grey: "../../../assets/images/greyStar.png",
    gold: "../../../assets/images/goldStar.png",
    starNum: 0
  },
  observers: {
    starNum: function(val) {
      //向父组件通信
      this.triggerEvent('getStarNum',val)
    }
  },
  methods: {
    firstClick(e) {
      if(this.data.firstSrc == this.data.grey)
        this.setData({firstSrc: this.data.gold, starNum: 1})
      else {
        //只选择一个星时才能把第一个星点灭，避免选择多于一个星时可以点灭第一个星选择
        if(this.data.starNum == 1)
          this.setData({firstSrc: this.data.grey, starNum: 0})
      }
    },
    secondClick(e) {
      if(this.data.secondSrc == this.data.grey)
        this.setData({firstSrc: this.data.gold, secondSrc: this.data.gold, starNum: 2})
      else {
        //只选择两个星时才能把第一个星点灭，避免选择多于两个星时可以点灭前两个星选择
        if(this.data.starNum == 2)
          this.setData({firstSrc: this.data.grey,secondSrc: this.data.grey, starNum: 0})
      }
    },
    thirdClick(e) {
      if(this.data.thirdSrc == this.data.grey)
        this.setData({firstSrc: this.data.gold, secondSrc: this.data.gold, thirdSrc: this.data.gold, starNum: 3})
      else {
         //只选择三个星时才能把第一个星点灭，避免选择多于三个星时可以点灭前三个星选择
        if(this.data.starNum == 3)
          this.setData({firstSrc: this.data.grey, secondSrc: this.data.grey, thirdSrc: this.data.grey, starNum: 0})
      }
    },
    fourthClick(e) {
      if(this.data.fourthSrc == this.data.grey)
        this.setData({firstSrc: this.data.gold, secondSrc: this.data.gold, thirdSrc: this.data.gold, fourthSrc: this.data.gold ,starNum: 4})
      else {
        //只选择四个星时才能把第一个星点灭，避免选择多于四个星时可以点灭前四个星选择
        if(this.data.starNum == 4)
          this.setData({firstSrc: this.data.grey, secondSrc: this.data.grey, thirdSrc: this.data.grey, fourthSrc: this.data.grey,starNum: 0})
      }
    },
    fifthClick(e) {
      if(this.data.fifthSrc == this.data.grey)
        this.setData({firstSrc: this.data.gold, secondSrc: this.data.gold, thirdSrc: this.data.gold, fourthSrc: this.data.gold , fifthSrc: this.data.gold ,starNum: 5})
      else {
        //只选择五个星时才能把第一个星点灭，避免选择多于五个星时可以点灭前五个星选择
        if(this.data.starNum == 5)
          this.setData({firstSrc: this.data.grey, secondSrc: this.data.grey, thirdSrc: this.data.grey, fourthSrc: this.data.grey, fifthSrc: this.data.grey, starNum: 0})
      }
    }
  }
})
