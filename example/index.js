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
  html: `<p>DefaultResourceLoader介绍</p>
  <p>DefaultResourceLoader是spring提供的一个默认的资源加载器，DefaultResourceLoader实现了ResourceLoader接口，提供了基本的资源加载能力。</p>
  <p>DefaultResourceLoader包含了一个protocolResolvers的set集，可以通过添加ProtocolResolver来提供不同协议资源的读取能力，默认情况下protocolResolvers是空的，我们可以通过添加ProtocolResolver扩展DefaultResourceLoader的能力。</p>
  <p>      还有一点ProtocolResolver spring并没有提供他的实现类，所有一般情况下DefaultResourceLoader只能读取本机文件系统下的资源</p>
  <p>DefaultResourceLoader内部维护这一个ClassPathContextResource，一般情况都是new一个ClassPathContextResource返回</p>`,
})
editor.on('scroll', () => {
  editor.emit('modalOrPanelShow', {})
})
editor.on('modalOrPanelShow', modalOrPanel => {
  if (modalOrPanel.type !== 'modal') return

  const { $elem } = modalOrPanel
  const width = $elem.width()
  const height = $elem.height()

  $elem.css({
    left: '50%',
    top: '50%',
    marginLeft: `-${width / 2}px`,
    marginTop: `-${height / 2}px`,
    zIndex: 1000,
  })
})
editor.on('modalOrPanelHide', () => {
  console.log('hide')
})
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: {
    insertKeys: {
      index: 0,
      keys: ['findReplace'],
    },
    modalAppendToBody: true,
  },
})

// @ts-ignore 为了便于调试，暴露到 window
window.editor = editor
// @ts-ignore
window.toolbar = toolbar
