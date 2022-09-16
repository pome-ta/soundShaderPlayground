import {
  EditorView,
  highlightSpecialChars,
  EditorState,
  StateField,
  StateEffect,
  Decoration,
  initExtensions,
  editorDiv,
} from './modules/cmEditor.bundle.js';

import {
  screenDiv,
  statusLogDiv,
  logText,
  modeSelect,
  accessoryDiv,
  buttonArea,
} from './setDOMs.js';

import { mobileEventListeners } from './mobileEvents.js';

const hasTouchScreen = () => {
  if (navigator.maxTouchPoints > 0) {
    return true;
  }
  if (navigator.msMaxTouchPoints > 0) {
    return true;
  }
  if (window.matchMedia('(pointer:coarse)').matches) {
    return true;
  }
  if ('orientation' in window) {
    return true;
  }

  return false;
};

async function fetchShader(path) {
  const res = await fetch(path);
  const shaderText = await res.text();
  return shaderText;
}

const updateCallback = EditorView.updateListener.of(
  (update) => update.docChanged && onChange(update.state.doc.toString())
);

// xxx: `fragman.js` で`#version 300 es` が付与されるため、ここで削除
const sendSource = (doc) =>
  currentMode ? doc.replace(/^#version 300 es/, '') : doc;

function onChange(docs) {
  bgRectangleSet(editor);
  /*
  if (fragmen === null) {
    return;
  }
  fragmen.render(sendSource(docs));
  */
}

/**
 * backGround Rectangle span
 */
const bgRectangleClassName = 'cm-bgRectangle';
const bgRectangleMark = Decoration.mark({ class: bgRectangleClassName });
const bgRectangleTheme = EditorView.baseTheme({
  '.cm-bgRectangle': { backgroundColor: '#23232380' },
});

const bgRectEffect = {
  add: StateEffect.define({ from: 0, to: 0 }),
  remove: StateEffect.define({ from: 0, to: 0 }),
};

const bgRectangleField = StateField.define({
  create() {
    return Decoration.none;
  },
  update(bgRectangles, tr) {
    bgRectangles = bgRectangles.map(tr.changes);
    for (const ef of tr.effects) {
      if (ef.is(bgRectEffect.add)) {
        bgRectangles = bgRectangles.update({
          add: [bgRectangleMark.range(ef.value.from, ef.value.to)],
        });
      } else if (ef.is(bgRectEffect.remove)) {
        bgRectangles = bgRectangles.update({
          // filter: (from, to, value) => {
          //   let shouldRemove =
          //     from === e.value.from &&
          //     to === e.value.to &&
          //     value.spec.class === bgRectangleClassName;
          //   return !shouldRemove;
          // },
          filter: (f, t, value) => !(value.class === bgRectangleClassName),
        });
      }
    }
    return bgRectangles;
  },
  provide: (f) => EditorView.decorations.from(f),
});

function bgRectangleSet(view) {
  const { state, dispatch } = view;
  const { from, to } = state.selection.main.extend(0, state.doc.length);
  const decoSet = state.field(bgRectangleField, false);

  const addFromTO = (from, to) => bgRectEffect.add.of({ from, to });
  const removeFromTO = (from, to) => bgRectEffect.remove.of({ from, to });

  let effects = [];
  effects.push(
    !decoSet ? StateEffect.appendConfig.of([bgRectangleField]) : null
  );
  decoSet?.between(from, to, (decoFrom, decoTo) => {
    if (from === decoTo || to === decoFrom) {
      return;
    }
    effects.push(removeFromTO(from, to));
    effects.push(removeFromTO(decoFrom, decoTo));
    effects.push(decoFrom < from ? addFromTO(decoFrom, from) : null);
    effects.push(decoTo > to ? addFromTO(to, decoTo) : null);
  });
  effects.push(addFromTO(from, to));
  if (!effects.length) {
    return false;
  }
  dispatch({ effects: effects.filter((ef) => ef) });
  return true;
}

/**
 * whitespaceShow
 */
const u22c5 = '⋅'; // DOT OPERATOR
const ivory = '#abb2bf44'; // todo: oneDark から拝借
const whitespaceShow = highlightSpecialChars({
  render: (code) => {
    let node = document.createElement('span');
    node.classList.add('cm-whoteSpace');
    node.style.color = ivory;
    node.innerText = u22c5;
    node.title = '\\u' + code.toString(16);
    return node;
  },
  // specialChars: /\x20/g,
  addSpecialChars: /\x20/g,
});

const resOutlineTheme = EditorView.baseTheme({
  '&.cm-editor': {
    '&.cm-focused': {
      outline: '0px dotted #212121',
    },
  },
});

/* -- main */

const canvasDiv = document.createElement('div');
canvasDiv.id = 'canvas-div';
canvasDiv.style.width = '100%';
canvasDiv.style.height = '100%';

canvasDiv.style.position = 'fixed';
canvasDiv.style.top = 0;
canvasDiv.style.left = 0;
canvasDiv.style.zIndex = 0;

const container = document.createElement('main');
container.id = 'container-main';
container.style.height = '100%';

const darkBackground = '#21252b';
document.body.backgroundColor = darkBackground;

const logColor = {
  success: '#1da1f2',
  warn: 'orangered',
  error: '#ff517b',
};

logText.textContent = ' ● ready';
logText.style.color = logColor['warn'];

statusLogDiv.appendChild(logText);
statusLogDiv.appendChild(modeSelect);

accessoryDiv.appendChild(statusLogDiv);
accessoryDiv.appendChild(buttonArea);
screenDiv.appendChild(editorDiv);
screenDiv.appendChild(accessoryDiv);

container.appendChild(canvasDiv);
container.appendChild(screenDiv);
document.body.appendChild(container);

/* -- loadSource */
let loadSource;
const fsPath = './shaders/sound/soundMain.js';
loadSource = await fetchShader(fsPath);

const fontSizeTheme = EditorView.theme({
  '&': {
    fontSize: hasTouchScreen ? '0.72rem' : '1.0rem',
  },
});

const extensions = [
  fontSizeTheme,
  ...initExtensions,
  whitespaceShow,
  resOutlineTheme,
  bgRectangleTheme,
  //whitespaceShow,
  updateCallback,
];
const state = EditorState.create({
  doc: loadSource,
  extensions: extensions,
});

const editor = new EditorView({
  state,
  parent: editorDiv,
});

bgRectangleSet(editor);

let currentMode = initMode;
// const fragmen = new Fragmen(option);
// fragmen.onBuild((status, msg) => {
//   logText.style.color = logColor[status];
//   logText.textContent = msg;
// });
// fragmen.mode = currentMode;
// fragmen.render(sendSource(loadSource));

modeSelect.value = currentMode;
modeSelect.style.color = logColor.success;

// modeSelect.addEventListener('change', () => {
//   fragmen.mode = parseInt(modeSelect.value);
//   currentMode = fragmen.mode;
//   onChange(editor.state.doc.toString());
// });

hasTouchScreen() ? mobileEventListeners(editor) : null;
