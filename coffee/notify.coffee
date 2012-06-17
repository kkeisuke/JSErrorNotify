class Notify

  constructor: (option)->
    @option =
      ondisplay:->
      onclose:->
      timeout:5000
    @_extends option
    @_init()
  
  Notify.permission =
    PERMISSION_ALLOWED:0
    PERMISSION_NOT_ALLOWED:1
    PERMISSION_DENIED:2
  
  # オプションを継承
  _extends:(option)->
    if option is undefined
      return
    for param of option
      @option[param] = option[param]
    @
  
  _init:->
    @
  
  hasPermission:->
    window.webkitNotifications.checkPermission() == Notify.permission.PERMISSION_ALLOWED
  
  show:(image, title, body, delay)->
    setTimeout (=>
      @_show(image, title, body)
      @
    ), delay || 0
  
  _show:(image, title, body)=>
    if window.webkitNotifications
      if !@hasPermission()
        window.webkitNotifications.requestPermission => @_show(image, title, body)
      else
        notification = window.webkitNotifications.createNotification(image, title, body)
        notification.ondisplay = @option.ondisplay
        notification.onclose = @option.onclose
        notification.show()
        setTimeout (=>
          notification?.cancel()
          notification = null
          @
        ), @option.timeout
    @
