import sys
from pathlib import Path

sys.path.append(str(Path.cwd()) + '/pythonista-webview')
from wkwebview import WKWebView
import ui

js_func = '''function getShaderCode() {
  const root = document.querySelector('#editor-div');
  const cme = Array.from(root.childNodes).find((cme) => cme);
  const cms = Array.from(cme.childNodes).find((cms) =>
    cms.classList.contains('cm-scroller')
  );
  const cmc = Array.from(cms.childNodes).find((cmc) =>
    cmc.classList.contains('cm-content')
  );
  const v = cmc.cmView.view.state.doc.toString();
  return v;
}
'''


class View(ui.View):
  def __init__(self, url, *args, **kwargs):
    ui.View.__init__(self, *args, **kwargs)
    self.wv = WKWebView()
    #self.refresh_webview()
    self.wv.add_script(js_func)
    self.wv.load_url(str(url))
    self.wv.flex = 'WH'
    self.add_subview(self.wv)
    self.set_reload_btn()

  def will_close(self):
    self.get_shader_code()
    self.refresh_webview()

  def set_reload_btn(self):
    self.refresh_btn = self.create_btn('iob:ios7_refresh_outline_32')
    self.refresh_btn.action = (lambda sender: self.reload_webview())
    self.right_button_items = [self.refresh_btn]

  def create_btn(self, icon):
    btn_icon = ui.Image.named(icon)
    return ui.ButtonItem(image=btn_icon)

  def refresh_webview(self):
    self.wv.clear_cache()
    self.wv.reload()

  def reload_webview(self):
    self.get_shader_code()
    self.wv.reload()

  def get_shader_code(self):
    js_code = 'getShaderCode()'
    self.wv.eval_js_async(js_code, lambda v: overwrite_code(v))


def overwrite_code(value):
  shader_path = './docs/shaders/sound/soundDev.js'
  shader_code = Path(shader_path)
  shader_code.write_text(value, encoding='utf-8')


if __name__ == '__main__':
  #sys.path.append(str(Path.cwd()) + '/pystaObjcPrint')
  #import pdbg
  uri_path = Path('./docs/index.html')
  view = View(uri_path)
  view.present(style='fullscreen', orientations=['portrait'])
  #view.present(style='panel', orientations=['portrait'])

