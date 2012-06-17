class BackGround
  
  constructor:(option)->
    @notify = null
    @model = null
    @option = {}
    @_extends option
    @_init()
    
  # オプションを継承
  _extends:(option)->
    if option is undefined
      return
    for param of option
      @option[param] = option[param]
    @
    
  _init:->
    @model = new LsModel JSEN.model
    @notify = new Notify()
    @_setEvent()
    @
    
  _setEvent:->
    chrome.extension.onRequest.addListener (request, sender, sendResponse)=>
      data = @model.getData()
      @notify.option.timeout = data.timeout
      @notify.show JSEN.IMG_ICON, request.filename, request.message + JSEN.LINE + request.lineno, data.delay
      @
    @
    
new BackGround()
