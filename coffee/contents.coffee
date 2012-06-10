window.addEventListener "error", ((e)->
  error = 
    filename:e.filename || location.href
    message:e.message || "no message"
    lineno:e.lineno || "no line"
    
  chrome.extension.sendRequest error, (response)->
    @
  @
), false