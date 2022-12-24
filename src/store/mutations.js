const mutations = {
  setShowNav (state, ShowNav) {
    state.ShowNav = ShowNav
  },
  resetVuex (state) {
    state.ShowNav = true
  },
  setclassify (state, classifyObj) {
    state.classifyObj = classifyObj
  },
  setfilmSearch(state,filmSearchObj){
  	state.filmSearchObj = filmSearchObj
  },
  settype (state, typeObj) {
    state.typeObj = typeObj
  },
  setcinema (state, cinemaObj) {
    state.cinemaObj = cinemaObj
  },
  setcarousel (state, carouselObj) {
    state.carouselObj = carouselObj
  },
  resetVuex (state) {
  	state.carouselObj = {}
    state.cinemaObj = {}
    state.typeObj = {}
    state.filmSearchObj = {}
    state.classifyObj = {}
  }
}

export default mutations
