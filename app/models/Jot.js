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
        let wordsArr = this.content.split(' ')
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
        <div class="col-11 text-center p-2 jot-card">
          <!-- Active Jot Header -->
          <div class="d-flex justify-content-between p-3">
          <p class="fs-3"> ${this.title}<i class="mdi mdi-star-circle-outline color-icon" style="color: ${this.color};"></i></p>
            <div class="d-flex">
                <button onclick="app.JotsController.openJot(-1)" class="btn btn-secondary rounded-5 mx-2"><i class="mdi mdi-arrow-left"></i></button>
                <button onclick="app.JotsController.deleteJot('${this.id}')" class="btn btn-danger rounded-5"><i class="mdi mdi-trash-can"></i></button>
            </div>
          </div>

          <!-- Jot Body -->
          <div class="row p-3">
            <!-- Jot Data -->
            <div class="col-5 text-grey text-start">
              <p class="mb-3">Created: ${this.createdDate.toLocaleString()}</p>
              <p class="mb-3">Edited: ${this.editedDate.toLocaleString()}</p>
              <p> Words: ${this.wordCount}, Characters: ${this.charCount}</p>
            </div>
            <!-- Jot Writing Area -->
            <div class="col-7 text-start">
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