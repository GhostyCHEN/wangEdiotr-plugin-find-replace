import { FIND_REPLACE_SVG } from '../../constants/icon-svg'
import { DomEditor } from '@wangeditor/editor'
import $ from '../../utils/dom'

class FindReplace {
  constructor() {
    this.title = '查找与替换'
    this.iconSvg = FIND_REPLACE_SVG
    this.tag = 'button'
    this.showModal = true
    this.modalWidth = 400
  }

  getValue(editor) {
    return ''
  }

  isActive(editor) {
    return false
  }

  isDisabled(editor) {
    return false
  }

  exec(editor, value) {}

  getModalPositionNode(editor) {
    return null
  }

  getModalContentElem(editor) {
    const editorDOM = editor.getEditableContainer()
    const nodeId = editorDOM.getElementsByClassName('w-e-scroll')[0].childNodes[0].id
    const findInputId = `find-input-${Math.random().toString(16).slice(-8)}`
    const replaceInputId = `replace-input-${Math.random().toString(16).slice(-8)}`
    const $container = $(`<div></div>`)
    const $title = $(`<div class="fr_title">查找与替换</div>`)
    const $findInput = $(`<div class="fr_find">
      <input type="text" id="${findInputId}" placeholder="查找">
    </div>`)
    const $prev = $(`
    <span id="prev">
      <svg width="24" height="24"><path fill-rule="nonzero" d="M18.3 15.7a1 1 0 0 0 1.4-1.4L12 6.6l-7.7 7.7a1 1 0 0 0 1.4 1.4L12 9.4l6.3 6.3z"></path></svg>
    </span>`)
    const $next = $(`<span id="next">
    <svg width="24" height="24"><path fill-rule="nonzero" d="M5.7 7.3a1 1 0 0 0-1.4 1.4l7.7 7.7 7.7-7.7a1 1 0 1 0-1.4-1.4L12 13.6 5.7 7.3z"></path></svg>
    </span>`)

    $findInput.append($prev).append($next)

    const $replaceInput = $(`<div class="fr_replace">
      <input type="text" id="${replaceInputId}" placeholder="替换为">
    </div>`)

    const $opera = $(`<div class="fr_opera"></div>`)

    const $find = $(`<span id="find" class="button">查找</span>`)
    const $replace = $(`<span id="replace" class="button">替换</span>`)
    const $replaceAll = $(`<span id="replace-all" class="button">全部替换</span>`)

    $opera.append($find).append($replace).append($replaceAll)
    $container.append($title).append($findInput).append($replaceInput).append($opera)

    $prev.on('click', e => {
      e.preventDefault()
      console.log('prev')
    })
    $next.on('click', e => {
      e.preventDefault()
      console.log('next')
    })

    return $container[0]
  }
}

export const findReplaceMenuConf = {
  key: 'findReplace',
  factory() {
    return new FindReplace()
  },
}
