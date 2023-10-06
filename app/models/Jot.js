import { generateId } from "../utils/GenerateId.js"

export class Jot {
    constructor(data) {
        this.title = data.title
        this.color = data.color
        this.content = data.content || ''
        this.createdDate = data.createdDate ? new Date(data.createdDate) : new Date()
        this.editedDate = data.editedDate ? new Date(data.editedDate) : new Date()
        this.id = generateId()
    }

    get wordCount() {
        if (this.content == '')
            return 0
        const regex = new RegExp("\\s")
        let wordsArr = this.content.split(regex)
        for (let i = wordsArr.length - 1; i >= 0; i--) {
            if (wordsArr[i] == '') {
                wordsArr.splice(i, 1)
            }
        }
        return wordsArr.length
    }
    get charCount() {
        return this.content.length
    }

    get activeCardTemplate() {
        return /*html*/`
        <div class="col-9 text-center p-2 jot-card">
            <!-- Active Jot Header -->
            <div class="d-flex justify-content-between p-3">
                <p class="fs-3"> ${this.title}<i class="mdi mdi-star-circle-outline color-icon" style="color: ${this.color};"></i></p>
                <div class="d-flex">
                    <button onclick="app.JotsController.openJot(-1)" class="btn btn-secondary rounded-5 mx-2"><i class="mdi mdi-arrow-left"></i></button>
                    <button onclick="app.JotsController.deleteJot('${this.id}')" class="btn btn-danger rounded-5"><i class="mdi mdi-trash-can"></i></button>
                </div>
            </div>
                
            <!-- Jot Body -->
            <div class="row p-3 ">
                <!-- Jot Data -->
                <div class="col-12 col-md-5 text-grey text-start">
                    <p class="mb-3">Created: ${this.createdDate.toLocaleString()}</p>
                    <p class="mb-3">Edited: ${_readableTime((new Date() - this.editedDate))} Ago</p>
                    <p> Words: ${this.wordCount}, Characters: ${this.charCount}</p>
                </div>
                <!-- Jot Writing Area -->
                <div class="col-12 col-md-7 text-start">
                    <textarea onblur="app.JotsController.saveActiveJot()" name="content" id="activeJotContent" class="rounded p-2 w-100" rows="14"
                        placeholder="Jot Down Your Thoughts...">${this.content}</textarea>
                </div>
            </div>
        </div>
        `
    }

    get menuCardTemplate() {
        return /*html*/`
        <div class="col-12 my-2">
          <p role="button" onclick="app.JotsController.openJot('${this.id}')" class="fs-3">${this.title}<i class="mdi mdi-star-circle color-icon" style="color: ${this.color};"></i></p>
        </div>
        `
    }
}

function _readableTime(milliseconds) {
    const millisecondValues = [1000, 60000, 3600000, 86400000, 2628000000, 31536000000, 315360000000]
    const valueNames = ['second', 'minute', 'hour', 'day', 'month', 'year', 'a really long time']
    if (milliseconds > millisecondValues[6]) return valueNames[6]
    for (let i = millisecondValues.length; i >= 0; i--) {
        if (milliseconds / millisecondValues[i] > 1) {
            const number = (milliseconds / millisecondValues[i]).toFixed(0)
            return number + ' ' + valueNames[i] + (number == 1 ? '' : 's')
        }
    }
    return '0 seconds'

}