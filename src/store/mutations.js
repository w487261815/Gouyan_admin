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
}

export default mutations
