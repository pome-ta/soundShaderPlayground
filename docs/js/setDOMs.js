const btnW = '2.5rem';
const btnRadius = '16%';

function _createButtonWrap(width, height) {
  const wrap = document.createElement('div');
  // xxx: 最大数問題
  wrap.style.minWidth = width;
  wrap.style.height = height;
  wrap.style.display = 'flex';
  wrap.style.justifyContent = 'center';
  wrap.style.alignItems = 'center';
  return wrap;
}

function createIcon(char) {
  const icon = document.createElement('span');
  icon.textContent = char;
  icon.style.fontSize = '1.0rem';
  icon.style.color = '#f2f2f7'; // gray6
  return icon;
}

function createActionButton(iconChar) {
  const wrap = _createButtonWrap(btnW, '100%');
  const button = _createButtonWrap('90%', '90%');
  const icon = createIcon(iconChar);
  wrap.appendChild(button);
  wrap.style.cursor = 'pointer';
  button.style.borderRadius = btnRadius;
  button.style.backgroundColor = '#8e8e93'; // light gray
  button.style.filter = 'drop-shadow(2px 2px 2px rgba(28, 28, 30, 0.9))';
  button.appendChild(icon);
  return wrap;
}

/* -- set layout */
export const screenDiv = document.createElement('div');
screenDiv.id = 'screen-wrap';
screenDiv.style.position = 'relative';
screenDiv.style.display = 'grid';
screenDiv.style.gridTemplateRows = '1fr auto';
screenDiv.style.height = '100%';
screenDiv.style.overflow = 'auto';

export const accessoryDiv = document.createElement('div');
accessoryDiv.id = 'accessory-div';
accessoryDiv.style.padding = '0.2rem';
accessoryDiv.style.backgroundColor = '#1c1c1e80'; // Gray6
// todo: 常に下部に表示
accessoryDiv.style.position = 'sticky';
accessoryDiv.style.bottom = 0;

export const statusLogDiv = document.createElement('div');
statusLogDiv.id = 'statusLog-div';
statusLogDiv.style.height = '1.6rem';
//statusLogDiv.style.minHeight = '1.28rem';
//statusLogDiv.style.maxHeight = '2.4rem';
statusLogDiv.style.overflow = 'hidden';
statusLogDiv.style.textOverflow = 'ellipsis';
// テキストの上下センター表示
statusLogDiv.style.display = 'flex';
statusLogDiv.style.justifyContent = 'space-between';
statusLogDiv.style.alignItems = 'center';
statusLogDiv.style.fontSize = '0.64rem';
statusLogDiv.style.fontFamily =
  'Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace';

export const logText = document.createElement('p');
logText.id = 'logText-p';
logText.style.margin = 'auto 0';
logText.style.padding = 0;

export const buttonArea = document.createElement('div');
buttonArea.id = 'buttonArea-div';
buttonArea.style.padding = '0.2rem 0';
buttonArea.style.display = 'flex';
buttonArea.style.justifyContent = 'space-around';
buttonArea.style.display = 'none';

export const [
  commentButton,
  selectLineButton,
  leftButton,
  downButton,
  upButton,
  rightButton,
  selectAllButton,
  redoButton,
  undoButton,
  reIndentButton,
] = ['//', '▭', '←', '↓', '↑', '→', '⎁', '⤻', '⤺', '↹'].map((str) => {
  const ele = createActionButton(str);
  buttonArea.appendChild(ele);
  return ele;
});

export const modeSelect = document.createElement('select');
modeSelect.id = 'mode-select';
modeSelect.style.background = '#1c1c1e80';

const modeOptions = [
  'classic',
  'geek',
  'geeker',
  'geekest',
  'classic (300 es)',
  'geek (300 es)',
  'geeker (300 es)',
  'geekest (300 es)',
  'classic (MRT)',
  'geek (MRT)',
  'geeker (MRT)',
  'geekest (MRT)',
];
modeOptions.forEach((option, index) => {
  const optionElement = document.createElement('option');
  optionElement.value = index;
  optionElement.text = option;
  if ([0, 4].includes(index)) {
    modeSelect.appendChild(optionElement);
  }
});
