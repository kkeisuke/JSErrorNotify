(function() {
  var JSEN;

  JSEN = {
    model: {
      key: "JSEN",
      data: {
        delay: 500,
        timeout: 10000
      }
    },
    opt: {
      delay_step: 100,
      timeout_step: 1000,
      min: 0
    },
    contents: {
      no_msg: "no message",
      no_line: "no line"
    },
    IMG_ICON: "../img/icon32.png",
    LINE: " line:"
  };

  window.addEventListener("error", (function(e) {
    var error;
    error = {
      filename: e.filename || location.href,
      message: e.message || JSEN.contents.no_msg,
      lineno: e.lineno || JSEN.contents.no_line
    };
    chrome.extension.sendRequest(error);
    return this;
  }), false);

}).call(this);
