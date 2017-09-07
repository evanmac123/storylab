import route from './route'

export default {

  add: (a) => {

    [...a].forEach((el) => el.onclick = route)
  },

  remove: (a) => {

    [...a].forEach((el) => el.onclick = null)
  }
}
