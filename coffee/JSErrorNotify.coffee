class JSErrorNotify

  constructor:(option)->
    @notify = null
    @option = 
      delay:500
    @_extends option
    @_init()
    
  JSErrorNotify.IMG_ICON = "../img/icon32.png"
  JSErrorNotify.LINE = ' line:'
  
  # オプションを継承
  _extends:(option)->
    if option is undefined
      return
    for param of option
      @option[param] = option[param]
    @
    
  _init:->
    @notify = new Notify timeout:10000
    @_setEvent();
    @
    
  _setEvent:->
    chrome.extension.onRequest.addListener (request, sender, sendResponse)=>
      @notify.show JSErrorNotify.IMG_ICON, request.filename, request.message + JSErrorNotify.LINE + request.lineno, @option.delay
      @
    @
    
new JSErrorNotify()
