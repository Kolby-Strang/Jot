import { AppState } from "../AppState.js";
import { Jot } from "../models/Jot.js"
import { Pop } from "../utils/Pop.js";
import { saveState } from "../utils/Store.js";

class JotsService {

    constructor() {
        AppState.on('jots', _saveJots)
        AppState.on('activeJot', _saveActiveJot)
    }

    createJot(jotData) {
        const jot = new Jot(jotData)
        AppState.jots.push(jot)
        AppState.emit('jots')
        this.openJot(jot.id)
        Pop.success('Jot Created!')
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
        if (AppState.activeJot == null) return
        AppState.activeJot.content = document.getElementById('activeJotContent').value
        AppState.activeJot.editedDate = new Date()
        AppState.emit('activeJot')
        _saveJots()
        Pop.success('Jots saved!')
    }

}

function _saveJots() {
    saveState('jots', AppState.jots)
}

function _saveActiveJot() {
    saveState('activeJot', AppState.activeJot)
}

export const jotsService = new JotsService()