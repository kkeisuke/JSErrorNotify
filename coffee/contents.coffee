window.addEventListener "error", ((e)->
  error = 
    filename:e.filename || location.href
    message:e.message || JSEN.contents.no_msg
    lineno:e.lineno || JSEN.contents.no_line
    
  chrome.extension.sendRequest error
  @
), false