(function() {
  var JSEN, LsModel, OptView;

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

  OptView = (function() {

    function OptView(option) {
      this.delay = null;
      this.timeout = null;
      this.model = null;
      this.option = {};
      this._extends(option);
      this._init();
    }

    OptView.prototype._extends = function(option) {
      var param;
      if (option === void 0) return;
      for (param in option) {
        this.option[param] = option[param];
      }
      return this;
    };

    OptView.prototype._init = function() {
      this.delay = document.getElementById("delay");
      this.timeout = document.getElementById("timeout");
      this.model = new LsModel(JSEN.model);
      this._setData();
      this._setEvent();
      return this;
    };

    OptView.prototype._setData = function() {
      this.delay.step = JSEN.opt.delay_step;
      this.delay.min = JSEN.opt.min;
      this.delay.value = this.model.option.data["delay"];
      this.timeout.step = JSEN.opt.timeout_step;
      this.timeout.min = JSEN.opt.min;
      this.timeout.value = this.model.option.data["timeout"];
      return this;
    };

    OptView.prototype._setEvent = function() {
      var _this = this;
      this.delay.addEventListener("change", (function(e) {
        return _this.model.setData(e.target.id, Number(e.target.value));
      }), false);
      this.timeout.addEventListener("change", (function(e) {
        return _this.model.setData(e.target.id, Number(e.target.value));
      }), false);
      return this;
    };

    return OptView;

  })();

  new OptView();

}).call(this);
