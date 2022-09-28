import sys
import pathlib

sys.path.append(str(pathlib.Path.cwd()) + '/pythonista-webview')
from wkwebview import WKWebView
from objc_util import create_objc_class, ObjCInstance
import ui


def webView_didFinishNavigation_(_self, _cmd, _webview, _navigation):
  print('読み込み')
  webview = ObjCInstance(_webview)
  this = ObjCInstance(_self)
  js_code = 'document.querySelector("#mode-select")'
  #out = this.eval_js(js_code)
  print(this)
  

myWKNavigationDelegate = create_objc_class(
  'myWKNavigationDelegate',
  methods=[webView_didFinishNavigation_],
  protocols=['WKNavigationDelegate']
)

js_func = '''function add(a, b) {
  return a + b;
}
'''

class View(ui.View):
  def __init__(self, url, *args, **kwargs):
    ui.View.__init__(self, *args, **kwargs)
    self.wv = WKWebView()
    self.wv.add_script(js_func)
    #self.wv.webview.setNavigationDelegate_(myWKNavigationDelegate.new())
    self.wv.load_url(str(url))
    self.wv.flex = 'WH'
    #self.present(style='fullscreen', orientations=['portrait'])
    self.refresh_webview()
    self.add_subview(self.wv)
    self.set_reload_btn()

  def will_close(self):
    #self.wv.eval_js_async('window', lambda v: out(v))
    #self.wv.eval_js_async('add(1, 2);', lambda v: out(v))
    #js_code = 'document.querySelector("#outlog").textContent'
    #js_code = 'document'
    #js_code = 'document.querySelector("#mode-select")'
    #js_code = 'console.log("#mode-select")'
    #js_code = 'window.webkit'
    js_code = 'add(1, 2)'
    self.wv.eval_js_async(js_code, lambda v: out(v))
    #self.wv.eval_js()
    #self.refresh_webview()
    #pass
    '''
    self.eval()
  
  @ui.in_background
  def eval(self):
    #js_code = 'document.querySelector("#outlog").textContent'
    #self.wv.eval_js_async(js_code, lambda v: out(v))
    #js_code = 'location.protocol'
    js_code = 'document.querySelector("#mode-select")'
    out = self.wv.eval_js(js_code)
    print(out)
    '''
  
  def set_reload_btn(self):
    self.close_btn = self.create_btn('iob:ios7_refresh_outline_32')
    self.close_btn.action = (lambda sender: self.refresh_webview())
    self.right_button_items = [self.close_btn]

  def create_btn(self, icon):
    btn_icon = ui.Image.named(icon)
    return ui.ButtonItem(image=btn_icon)

  def refresh_webview(self):
    self.wv.clear_cache()
    self.wv.reload()

def out(value):
  print(f'outttt: {value}')

if __name__ == '__main__':
  sys.path.append(str(pathlib.Path.cwd()) + '/pystaObjcPrint')
  import pdbg
  uri_path = pathlib.Path('./docs/index.html')
  view = View(uri_path)
  view.present(style='fullscreen', orientations=['portrait'])
  #view.present(style='panel', orientations=['portrait'])

