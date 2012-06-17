class LsModel
  
  constructor:(option)->
    @option = 
      ls:window.localStorage
      key:""
      data:{}
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
    data = @getData()
    if data?
      @option.data = data
    else
      @setDatas()
    @
    
  getData:->
    if @option.key != ""
      JSON.parse @option.ls.getItem(@option.key)
    else
      null
    
  setData:(key, val)->
    @option.data?[key] = val
    @setDatas()
    @
    
  setDatas:()->
    if @option.key != ""
      @option.ls.setItem @option.key, JSON.stringify(@option.data)
    @
    