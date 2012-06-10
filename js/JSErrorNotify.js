(function() {
  var JSErrorNotify, Notify,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Notify = (function() {

    function Notify(option) {
      this._show = __bind(this._show, this);      this.option = {
        ondisplay: function() {},
        onclose: function() {},
        timeout: 5000
      };
      this._extends(option);
      this._init();
    }

    Notify.permission = {
      PERMISSION_ALLOWED: 0,
      PERMISSION_NOT_ALLOWED: 1,
      PERMISSION_DENIED: 2
    };

    Notify.prototype._extends = function(option) {
      var param;
      if (option === void 0) return;
      for (param in option) {
        this.option[param] = option[param];
      }
      return this;
    };

    Notify.prototype._init = function() {
      return this;
    };

    Notify.prototype.hasPermission = function() {
      return window.webkitNotifications.checkPermission() === Notify.permission.PERMISSION_ALLOWED;
    };

    Notify.prototype.show = function(image, title, body, delay) {
      var _this = this;
      return setTimeout((function() {
        _this._show(image, title, body);
        return _this;
      }), delay || 0);
    };

    Notify.prototype._show = function(image, title, body) {
      var notification,
        _this = this;
      if (window.webkitNotifications) {
        if (!this.hasPermission()) {
          window.webkitNotifications.requestPermission(function() {
            return _this._show(image, title, body);
          });
        } else {
          notification = window.webkitNotifications.createNotification(image, title, body);
          notification.ondisplay = this.option.ondisplay;
          notification.onclose = this.option.onclose;
          notification.show();
          setTimeout((function() {
            if (notification != null) notification.cancel();
            notification = null;
            return _this;
          }), this.option.timeout);
        }
      }
      return this;
    };

    return Notify;

  })();

  JSErrorNotify = (function() {

    function JSErrorNotify(option) {
      this.notify = null;
      this.option = {
        delay: 500
      };
      this._extends(option);
      this._init();
    }

    JSErrorNotify.IMG_ICON = "../img/icon32.png";

    JSErrorNotify.LINE = ' line:';

    JSErrorNotify.prototype._extends = function(option) {
      var param;
      if (option === void 0) return;
      for (param in option) {
        this.option[param] = option[param];
      }
      return this;
    };

    JSErrorNotify.prototype._init = function() {
      this.notify = new Notify({
        timeout: 10000
      });
      this._setEvent();
      return this;
    };

    JSErrorNotify.prototype._setEvent = function() {
      var _this = this;
      chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
        _this.notify.show(JSErrorNotify.IMG_ICON, request.filename, request.message + JSErrorNotify.LINE + request.lineno, _this.option.delay);
        return _this;
      });
      return this;
    };

    return JSErrorNotify;

  })();

  new JSErrorNotify();

}).call(this);
