(function() {

  window.addEventListener("error", (function(e) {
    var error;
    error = {
      filename: e.filename || location.href,
      message: e.message || "no message",
      lineno: e.lineno || "no line"
    };
    chrome.extension.sendRequest(error, function(response) {
      return this;
    });
    return this;
  }), false);

}).call(this);
