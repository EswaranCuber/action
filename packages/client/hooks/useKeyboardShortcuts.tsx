import {DraftEditorCommand, EditorProps, EditorState, KeyBindingUtil, RichUtils} from 'draft-js'
import {SetEditorState} from '../types/draft'

const {hasCommandModifier} = KeyBindingUtil

type Handlers = Pick<EditorProps, 'handleKeyCommand' | 'keyBindingFn'>
type customDraftEditorCommand = 'fontsizeinc' | 'fontsizedec'
const useKeyboardShortcuts = (
  editorState: EditorState,
  setEditorState: SetEditorState,
  {handleKeyCommand, keyBindingFn}: Handlers
) => {
  const inlineStyles = {
    FONT_SIZE_11: 'FONT_SIZE_11',
    FONT_SIZE_13: 'FONT_SIZE_13',
    FONT_SIZE_15: 'FONT_SIZE_15',
    FONT_SIZE_18: 'FONT_SIZE_18',
    FONT_SIZE_20: 'FONT_SIZE_20'
  }

  const nextHandleKeyCommand: Handlers['handleKeyCommand'] = (
    command: DraftEditorCommand & customDraftEditorCommand
  ) => {
    if (handleKeyCommand) {
      const result = handleKeyCommand(command, editorState, Date.now())
      // @ts-ignore
      if (result === 'handled' || result === true) {
        return result
      }
    }
    if (command === 'strikethrough') {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'))
      return 'handled'
    }

    const selection = editorState.getSelection()
    const anchorKey = selection.getAnchorKey()
    const currentContent = editorState.getCurrentContent()
    const currentBlock = currentContent.getBlockForKey(anchorKey)
    const startOffset = selection.getStartOffset()
    let style = editorState.getInlineStyleOverride()

    if (command === 'fontsizeinc') {
      let fontSize = inlineStyles.FONT_SIZE_13
      let value
      let style = editorState.getInlineStyleOverride()
      if (style === null) {
        style = currentBlock.getInlineStyleAt(startOffset)
        value = style.last()
      }
      switch (value) {
        case inlineStyles.FONT_SIZE_11:
          fontSize = inlineStyles.FONT_SIZE_13
          break
        case inlineStyles.FONT_SIZE_13:
          fontSize = inlineStyles.FONT_SIZE_15
          break
        case inlineStyles.FONT_SIZE_15:
          fontSize = inlineStyles.FONT_SIZE_18
          break
        case inlineStyles.FONT_SIZE_18:
          fontSize = inlineStyles.FONT_SIZE_20
          break
        case inlineStyles.FONT_SIZE_20:
          fontSize = 'Stop'
          break
      }
      if (fontSize != 'Stop') {
        setEditorState(RichUtils.toggleInlineStyle(editorState, fontSize))
        return 'handled'
      }
    }
    if (command === 'fontsizedec') {
      let fontSize = inlineStyles.FONT_SIZE_18
      let value
      if (style === null) {
        style = currentBlock.getInlineStyleAt(startOffset)
        value = style.last()
      }
      switch (value) {
        case inlineStyles.FONT_SIZE_20:
          fontSize = inlineStyles.FONT_SIZE_18
          break
        case inlineStyles.FONT_SIZE_18:
          fontSize = inlineStyles.FONT_SIZE_15
          break
        case inlineStyles.FONT_SIZE_15:
          fontSize = inlineStyles.FONT_SIZE_13
          break
        case inlineStyles.FONT_SIZE_13:
          fontSize = inlineStyles.FONT_SIZE_11
          break
        case inlineStyles.FONT_SIZE_11:
          fontSize = 'Stop'
          break
      }
      if (fontSize != 'Stop') {
        setEditorState(RichUtils.toggleInlineStyle(editorState, fontSize))
        return 'handled'
      }
    }

    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  const nextKeyBindingFn: Handlers['keyBindingFn'] = (e) => {
    console.log(e, 'hotkeystroke')
    if (keyBindingFn) {
      const result = keyBindingFn(e)
      if (result) {
        return result
      }
    }
    if (hasCommandModifier(e) && e.shiftKey && e.key === 'x') {
      return 'strikethrough'
    }
    if (e.shiftKey && e.key === '=') {
      return 'fontsizeinc'
    }
    if (e.shiftKey && e.key === '-') {
      return 'fontsizedec'
    }
    return null
  }

  return {
    handleKeyCommand: nextHandleKeyCommand,
    keyBindingFn: nextKeyBindingFn
  }
}

export default useKeyboardShortcuts
