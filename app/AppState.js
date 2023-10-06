import { Jot } from "./models/Jot.js"
import { EventEmitter } from "./utils/EventEmitter.js"
import { isValidProp } from "./utils/IsValidProp.js"
import { loadState } from "./utils/Store.js"

class ObservableAppState extends EventEmitter {
  page = ''

  jots = [
    new Jot({ title: 'This jot is cool', color: '#f00' })
  ]

  activeJot = null

  // NOTE Used to load initial data
  init() {
    this.jots = loadState('jots', [Jot])
  }

}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
