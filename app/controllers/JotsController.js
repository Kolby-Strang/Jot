import { AppState } from "../AppState.js"
import { jotsService } from "../services/JotsService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML, setText } from "../utils/Writer.js"

export class JotsController {
    constructor() {
        _drawJotMenu()
        AppState.on('jots', _drawJotMenu)
        _drawActiveJot()
        AppState.on('activeJot', _drawActiveJot)
    }

    createJot(event) {
        event.preventDefault()
        const form = event.target
        const newJotData = getFormData(form)
        jotsService.createJot(newJotData)
        form.reset()
        _closeOffCanvas()
    }

    async deleteJot(jotId) {
        const wantsToDeleteJot = await Pop.confirm('Are you sure you want to delete this Jot?')
        if (wantsToDeleteJot) {
            jotsService.deleteJot(jotId)
            Pop.success('Jot Deleted!')
        } else {
            Pop.success('Deletion Canceled')
        }
    }

    openJot(jotId) {
        jotsService.openJot(jotId)
        _closeOffCanvas()
    }

    saveActiveJot() {
        jotsService.saveActiveJot()
    }

}

function _closeOffCanvas() {
    bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasJotMenu')).hide()
}

function _drawActiveJot() {
    const activeJot = AppState.activeJot
    if (!activeJot) {
        setHTML('active-jot-container', 'nothing')
    } else {
        setHTML('active-jot-container', activeJot.activeCardTemplate)
    }
}

function _drawJotMenu() {
    const jots = AppState.jots
    let content = ''
    jots.forEach(jot => content += jot.menuCardTemplate)
    setHTML('jots-menu', content)
    setText('jot-count', jots.length)
}