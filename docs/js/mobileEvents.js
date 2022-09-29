import {
  editorDiv,
  EditorSelection,
  undo,
  redo,
  selectAll,
  selectLine,
  indentSelection,
  cursorLineUp,
  cursorLineDown,
  cursorCharLeft,
  cursorCharRight,
  toggleComment,
} from './modules/cmEditor.bundle.js';

import {
  statusLogDiv,
  accessoryDiv,
  buttonArea,
  commentButton,
  selectLineButton,
  reIndentButton,
  undoButton,
  redoButton,
  selectAllButton,
  leftButton,
  rightButton,
  upButton,
  downButton,
} from './setDOMs.js';

export const mobileEventListeners = (editor) => {
  function visualViewportHandler() {
    buttonArea.style.display = editor.hasFocus ? 'flex' : 'none';
    const upBottom =
      window.innerHeight -
      visualViewport.height +
      visualViewport.offsetTop -
      visualViewport.pageTop;
    const editorDivHeight = visualViewport.height - upBottom;
    accessoryDiv.style.bottom = `${upBottom}px`;
    //editorDiv.style.height = `${editorDivHeight}px`;
    /*
    console.log('---')
    console.log(`innerHeight: ${window.innerHeight}`)
    console.log(`height: ${visualViewport.height}`)
    console.log(`offsetTop: ${visualViewport.offsetTop}`)
    console.log(`pageTop: ${visualViewport.pageTop}`)
    */
  }

  function moveCaret(pos) {
    editor.dispatch({
      selection: EditorSelection.create([EditorSelection.cursor(pos)]),
    });
    editor.focus();
  }

  let caret, headLine, endLine;
  let startX = 0;
  let endX = 0;
  function statusLogDivSwipeStart(event) {
    const selectionMain = editor.state.selection.main;
    caret = selectionMain.anchor;
    headLine = editor.moveToLineBoundary(selectionMain, 0).anchor;
    endLine = editor.moveToLineBoundary(selectionMain, 1).anchor;
    startX = event.touches ? event.touches[0].pageX : event.pageX;
  }

  function statusLogDivSwipeMove(event) {
    event.preventDefault();
    endX = event.touches ? event.touches[0].pageX : event.pageX;
    const moveDistance = Math.round((endX - startX) / 9); // xxx: スワイプでの移動距離数値
    caret += moveDistance;
    if (caret < headLine) {
      caret = headLine;
    } else if (caret >= endLine) {
      caret = endLine;
    }
    startX = endX;
    moveCaret(caret);
  }

  visualViewport.addEventListener('scroll', visualViewportHandler);
  visualViewport.addEventListener('resize', visualViewportHandler);
  statusLogDiv.addEventListener('touchstart', statusLogDivSwipeStart);
  statusLogDiv.addEventListener('touchmove', statusLogDivSwipeMove);

  undoButton.addEventListener('click', () => {
    undo(editor);
    editor.focus();
  });

  redoButton.addEventListener('click', () => {
    redo(editor);
    editor.focus();
  });

  selectAllButton.addEventListener('click', () => {
    selectAll(editor);
    editor.focus();
  });

  leftButton.addEventListener('click', () => {
    cursorCharLeft(editor);
    editor.focus();
  });

  rightButton.addEventListener('click', () => {
    cursorCharRight(editor);
    editor.focus();
  });

  upButton.addEventListener('click', () => {
    cursorLineUp(editor);
    editor.focus();
  });

  downButton.addEventListener('click', () => {
    cursorLineDown(editor);
    editor.focus();
  });

  commentButton.addEventListener('click', () => {
    toggleComment(editor);
    editor.focus();
  });

  selectLineButton.addEventListener('click', () => {
    selectLine(editor);
    editor.focus();
  });

  reIndentButton.addEventListener('click', () => {
    //selectAll(editor);
    //indentSelection(editor);
    //cursorLineUp(editor);
    //editor.focus();
  });
};

export { reIndentButton };
