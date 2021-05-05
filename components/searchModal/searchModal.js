// components/searchModal/searchModal.js
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
    zIndex: String,
    display: String
  },
  data: {

  },
  methods: {
    btnClick() {
      this.triggerEvent('searchClosed')
    }
  }
})
