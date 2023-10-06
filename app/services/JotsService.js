import { AppState } from "../AppState.js";
import { Jot } from "../models/Jot.js"
import { saveState } from "../utils/Store.js";

class JotsService {

    constructor() {
        AppState.on('jots', _saveJots)
    }

    createJot(jotData) {
        const jot = new Jot(jotData)
        AppState.jots.push(jot)
        AppState.emit('jots')
        this.openJot(jot.id)
    }

    deleteJot(jotId) {
        const jots = AppState.jots
        const index = jots.findIndex(jot => jot.id == jotId)
        jots.splice(index, 1)
        AppState.activeJot = null
        AppState.emit('jots')
    }

    openJot(jotId) {
        const targetJot = AppState.jots.find(jot => jot.id == jotId)
        AppState.activeJot = targetJot
    }

    saveActiveJot() {
        AppState.activeJot.content = document.getElementById('activeJotContent').value
        AppState.activeJot.editedDate = new Date()
        AppState.emit('activeJot')
        const appActiveJot = AppState.jots.find(jot => jot.id = AppState.activeJot.id)
        _saveJots()
    }

}

function _saveJots() {
    saveState('jots', AppState.jots)
}

export const jotsService = new JotsService()