(function() {
  var BackGround, JSEN, LsModel, Notify,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

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

  LsModel = (function() {

    function LsModel(option) {
      this.option = {
        ls: window.localStorage,
        key: "",
        data: {}
      };
      this._extends(option);
      this._init();
    }

    LsModel.prototype._extends = function(option) {
      var param;
      if (option === void 0) return;
      for (param in option) {
        this.option[param] = option[param];
      }
      return this;
    };

    LsModel.prototype._init = function() {
      var data;
      data = this.getData();
      if (data != null) {
        this.option.data = data;
      } else {
        this.setDatas();
      }
      return this;
    };

    LsModel.prototype.getData = function() {
      if (this.option.key !== "") {
        return JSON.parse(this.option.ls.getItem(this.option.key));
      } else {
        return null;
      }
    };

    LsModel.prototype.setData = function(key, val) {
      var _ref;
      if ((_ref = this.option.data) != null) _ref[key] = val;
      this.setDatas();
      return this;
    };

    LsModel.prototype.setDatas = function() {
      if (this.option.key !== "") {
        this.option.ls.setItem(this.option.key, JSON.stringify(this.option.data));
      }
      return this;
    };

    return LsModel;

  })();

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

  BackGround = (function() {

    function BackGround(option) {
      this.notify = null;
      this.model = null;
      this.option = {};
      this._extends(option);
      this._init();
    }

    BackGround.prototype._extends = function(option) {
      var param;
      if (option === void 0) return;
      for (param in option) {
        this.option[param] = option[param];
      }
      return this;
    };

    BackGround.prototype._init = function() {
      this.model = new LsModel(JSEN.model);
      this.notify = new Notify();
      this._setEvent();
      return this;
    };

    BackGround.prototype._setEvent = function() {
      var _this = this;
      chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
        var data;
        data = _this.model.getData();
        _this.notify.option.timeout = data.timeout;
        _this.notify.show(JSEN.IMG_ICON, request.filename, request.message + JSEN.LINE + request.lineno, data.delay);
        return _this;
      });
      return this;
    };

    return BackGround;

  })();

  new BackGround();

}).call(this);
