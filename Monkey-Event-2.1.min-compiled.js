var MonkeyEventInit = function () {
  var a = {};var n = !/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent);
  a.MOUSE_DOWN = "mousedown";a.MOUSE_UP = "mouseup";a.MOUSE_MOVE = "mousemove";a.MOUSE_OVER = "mouseover";a.MOUSE_OUT = "mouseout";if (!n) {
    a.MOUSE_DOWN = "touchstart";
    a.MOUSE_UP = "touchend";a.MOUSE_MOVE = "touchmove";
  }a.addEventListener = function (x, v, w, u) {
    if (u == null) {
      u = false;
    }if (x.addEventListener) {
      x.addEventListener(v, w, u);
      return true;
    } else {
      if (x.attachEvent) {
        x.attachEvent("on" + v, w);return true;
      }
    }
  };a.removeEventListener = function (w, u, v) {
    if (w.removeEventListener) {
      w.removeEventListener(u, v);
      return true;
    } else {
      if (w.detachEvent) {
        w.detachEvent("on" + u, v);return true;
      }
    }
  };var q = [],
      g = [],
      f = [],
      j = [],
      i = [],
      k = stry = 0,
      l,
      b,
      d = { x: 0, y: 0 },
      p = 50,
      t = {},
      h = null,
      o,
      s,
      e = function (w) {
    if (!h) {
      return;
    }var v = j[0] - k,
        u = i[0] - stry;if (typeof h.up === "function") {
      h.up({ distanceX: v, distanceY: u, speedX: d.x, speedY: d.y, x: t.x, y: t.y });
    }if (Math.abs(v) >= Math.abs(u)) {
      if (v >= p) {
        if (typeof h.right === "function") {
          h.right(v);
        }
      } else {
        if (v <= -p) {
          if (typeof h.left === "function") {
            h.left(v);
          }
        }
      }
    } else {
      if (u >= p) {
        if (typeof h.bottom === "function") {
          h.bottom(u);
        }
      } else {
        if (u <= -p) {
          if (typeof h.top === "function") {
            h.top(u);
          }
        }
      }
    }a.removeEventListener(window, a.MOUSE_MOVE, r);a.removeEventListener(window, a.MOUSE_UP, e);h = s = o = null;d = { x: 0, y: 0 };
  },
      r = function (y) {
    if (!h) {
      return;
    }if (!n) {
      j[0] = y.targetTouches[0].pageX;
      i[0] = y.targetTouches[0].pageY;if (y.targetTouches.length > 1) {
        j[1] = y.targetTouches[1].pageX;i[1] = y.targetTouches[1].pageY;var u = Math.sqrt(Math.pow(j[1] - j[0], 2) + Math.pow(i[1] - i[0], 2));
        var w = Math.atan((i[1] - i[0]) / (j[1] - j[0]));if (o && typeof h.scale === "function") {
          h.scale({ distance: u, speed: u - o });
        }if (s && typeof h.rotate === "function") {
          var v = w - s;
          if (v > 2.5) {
            v = -(1.57 - w + 1.57 + s);
          } else {
            if (v < -2.5) {
              v = 1.57 - s + 1.57 + w;
            }
          }h.rotate({ angle: w, speed: v });
        }o = u;s = w;
      }
    } else {
      j[0] = y.clientX;i[0] = y.clientY;
    }t = { x: j[0], y: i[0] };
    b = Date.now();var x = b - l || 5;l = b;var u = { x: j[0] - g[0], y: i[0] - f[0] };g[0] = j[0];f[0] = i[0];v = { x: u.x / x, y: u.y / x };if (typeof h.move === "function") {
      h.move({ distanceX: u.x, distanceY: u.y, speedX: v.x, speedY: v.y });
    }
  };function m(v) {
    var u = this;this.top = this.left = this.right = this.bottom = this.down = this.move = this.up = null;this.e = v;this.MOUSE_DOWN = function (w) {
      a.addEventListener(window, a.MOUSE_MOVE, r);
      a.addEventListener(window, a.MOUSE_UP, e);h = u;if (!n) {
        k = g[0] = j[0] = w.targetTouches[0].pageX;stry = f[0] = i[0] = w.targetTouches[0].pageY;
      } else {
        k = g[0] = j[0] = w.clientX;
        stry = f[0] = i[0] = w.clientY;
      }if (typeof u.down === "function") {
        u.down(w);
      }l = Date.now();t = { x: j[0], y: i[0] };
    };this.addEvent();
  }m.prototype.addEvent = function () {
    var u = this;
    a.addEventListener(u.e, a.MOUSE_DOWN, u.MOUSE_DOWN);
  };m.prototype.removeEvent = function () {
    var u = this;u.top = u.left = u.right = u.bottom = u.down = u.move = u.up = null;
    a.removeEventListener(u.e, a.MOUSE_DOWN, u.MOUSE_DOWN);
  };function c(w) {
    for (var u = 0; u < q.length; u++) {
      if (q[u].e == w) {
        return q[u];
      }
    }var v = new m(w);q.push(v);return v;
  }return c;
}();

//# sourceMappingURL=Monkey-Event-2.1.min-compiled.js.map