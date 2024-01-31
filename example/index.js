import { createEditor, createToolbar, Boot } from '@wangeditor/editor'
import module from '../src/index'

// 注册
Boot.registerModule(module)

// 编辑器配置
const editorConfig = {
  onChange(editor) {
    const html = editor.getHtml()
    document.getElementById('text-html').value = html
    const contentStr = JSON.stringify(editor.children, null, 2)
    document.getElementById('text-json').value = contentStr
  },
}

// 创建编辑器
const editor = createEditor({
  selector: '#editor-container',
  config: editorConfig,
  html: `<p>hello world</p>`,
})
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: {
    insertKeys: {
      index: 0,
      keys: ['findReplace'],
    },
  },
})

// @ts-ignore 为了便于调试，暴露到 window
window.editor = editor
// @ts-ignore
window.toolbar = toolbar
