class OptView
  
  constructor:(option)->
    @delay = null
    @timeout = null
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
    @delay = document.getElementById "delay"
    @timeout = document.getElementById "timeout"
    @model = new LsModel JSEN.model
    @_setData()
    @_setEvent()
    @
    
  _setData:->
    @delay.step = JSEN.opt.delay_step
    @delay.min = JSEN.opt.min
    @delay.value = @model.option.data["delay"]
    @timeout.step = JSEN.opt.timeout_step
    @timeout.min = JSEN.opt.min
    @timeout.value = @model.option.data["timeout"]
    @
    
  _setEvent:->
    @delay.addEventListener "change", ((e)=>
      @model.setData e.target.id, Number e.target.value
    ), false
    @timeout.addEventListener "change", ((e)=>
      @model.setData e.target.id, Number e.target.value
    ), false
    @
    
new OptView()
