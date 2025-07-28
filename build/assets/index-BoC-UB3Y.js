(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver((l) => {
    for (const i of l)
      if (i.type === 'childList')
        for (const s of i.addedNodes)
          s.tagName === 'LINK' && s.rel === 'modulepreload' && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const i = {};
    return (
      l.integrity && (i.integrity = l.integrity),
      l.referrerPolicy && (i.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === 'use-credentials'
        ? (i.credentials = 'include')
        : l.crossOrigin === 'anonymous'
          ? (i.credentials = 'omit')
          : (i.credentials = 'same-origin'),
      i
    );
  }
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const i = n(l);
    fetch(l.href, i);
  }
})();
function mc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e;
}
var qo = { exports: {} },
  ll = {},
  bo = { exports: {} },
  z = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Gn = Symbol.for('react.element'),
  vc = Symbol.for('react.portal'),
  yc = Symbol.for('react.fragment'),
  gc = Symbol.for('react.strict_mode'),
  wc = Symbol.for('react.profiler'),
  kc = Symbol.for('react.provider'),
  xc = Symbol.for('react.context'),
  _c = Symbol.for('react.forward_ref'),
  Sc = Symbol.for('react.suspense'),
  Ec = Symbol.for('react.memo'),
  Cc = Symbol.for('react.lazy'),
  Zs = Symbol.iterator;
function Nc(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (Zs && e[Zs]) || e['@@iterator']),
      typeof e == 'function' ? e : null);
}
var ea = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  ta = Object.assign,
  na = {};
function sn(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = na),
    (this.updater = n || ea));
}
sn.prototype.isReactComponent = {};
sn.prototype.setState = function (e, t) {
  if (typeof e != 'object' && typeof e != 'function' && e != null)
    throw Error(
      'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
    );
  this.updater.enqueueSetState(this, e, t, 'setState');
};
sn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
};
function ra() {}
ra.prototype = sn.prototype;
function Wi(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = na),
    (this.updater = n || ea));
}
var Hi = (Wi.prototype = new ra());
Hi.constructor = Wi;
ta(Hi, sn.prototype);
Hi.isPureReactComponent = !0;
var Us = Array.isArray,
  la = Object.prototype.hasOwnProperty,
  Yi = { current: null },
  ia = { key: !0, ref: !0, __self: !0, __source: !0 };
function sa(e, t, n) {
  var r,
    l = {},
    i = null,
    s = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (s = t.ref),
    t.key !== void 0 && (i = '' + t.key),
    t))
      la.call(t, r) && !ia.hasOwnProperty(r) && (l[r] = t[r]);
  var o = arguments.length - 2;
  if (o === 1) l.children = n;
  else if (1 < o) {
    for (var a = Array(o), c = 0; c < o; c++) a[c] = arguments[c + 2];
    l.children = a;
  }
  if (e && e.defaultProps)
    for (r in ((o = e.defaultProps), o)) l[r] === void 0 && (l[r] = o[r]);
  return {
    $$typeof: Gn,
    type: e,
    key: i,
    ref: s,
    props: l,
    _owner: Yi.current,
  };
}
function Tc(e, t) {
  return {
    $$typeof: Gn,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Qi(e) {
  return typeof e == 'object' && e !== null && e.$$typeof === Gn;
}
function jc(e) {
  var t = { '=': '=0', ':': '=2' };
  return (
    '$' +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var $s = /\/+/g;
function Sl(e, t) {
  return typeof e == 'object' && e !== null && e.key != null
    ? jc('' + e.key)
    : t.toString(36);
}
function kr(e, t, n, r, l) {
  var i = typeof e;
  (i === 'undefined' || i === 'boolean') && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else
    switch (i) {
      case 'string':
      case 'number':
        s = !0;
        break;
      case 'object':
        switch (e.$$typeof) {
          case Gn:
          case vc:
            s = !0;
        }
    }
  if (s)
    return (
      (s = e),
      (l = l(s)),
      (e = r === '' ? '.' + Sl(s, 0) : r),
      Us(l)
        ? ((n = ''),
          e != null && (n = e.replace($s, '$&/') + '/'),
          kr(l, t, n, '', function (c) {
            return c;
          }))
        : l != null &&
          (Qi(l) &&
            (l = Tc(
              l,
              n +
                (!l.key || (s && s.key === l.key)
                  ? ''
                  : ('' + l.key).replace($s, '$&/') + '/') +
                e
            )),
          t.push(l)),
      1
    );
  if (((s = 0), (r = r === '' ? '.' : r + ':'), Us(e)))
    for (var o = 0; o < e.length; o++) {
      i = e[o];
      var a = r + Sl(i, o);
      s += kr(i, t, n, a, l);
    }
  else if (((a = Nc(e)), typeof a == 'function'))
    for (e = a.call(e), o = 0; !(i = e.next()).done; )
      ((i = i.value), (a = r + Sl(i, o++)), (s += kr(i, t, n, a, l)));
  else if (i === 'object')
    throw (
      (t = String(e)),
      Error(
        'Objects are not valid as a React child (found: ' +
          (t === '[object Object]'
            ? 'object with keys {' + Object.keys(e).join(', ') + '}'
            : t) +
          '). If you meant to render a collection of children, use an array instead.'
      )
    );
  return s;
}
function nr(e, t, n) {
  if (e == null) return e;
  var r = [],
    l = 0;
  return (
    kr(e, r, '', '', function (i) {
      return t.call(n, i, l++);
    }),
    r
  );
}
function Pc(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var ue = { current: null },
  xr = { transition: null },
  zc = {
    ReactCurrentDispatcher: ue,
    ReactCurrentBatchConfig: xr,
    ReactCurrentOwner: Yi,
  };
function oa() {
  throw Error('act(...) is not supported in production builds of React.');
}
z.Children = {
  map: nr,
  forEach: function (e, t, n) {
    nr(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      nr(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      nr(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Qi(e))
      throw Error(
        'React.Children.only expected to receive a single React element child.'
      );
    return e;
  },
};
z.Component = sn;
z.Fragment = yc;
z.Profiler = wc;
z.PureComponent = Wi;
z.StrictMode = gc;
z.Suspense = Sc;
z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = zc;
z.act = oa;
z.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      'React.cloneElement(...): The argument must be a React element, but you passed ' +
        e +
        '.'
    );
  var r = ta({}, e.props),
    l = e.key,
    i = e.ref,
    s = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((i = t.ref), (s = Yi.current)),
      t.key !== void 0 && (l = '' + t.key),
      e.type && e.type.defaultProps)
    )
      var o = e.type.defaultProps;
    for (a in t)
      la.call(t, a) &&
        !ia.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && o !== void 0 ? o[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    o = Array(a);
    for (var c = 0; c < a; c++) o[c] = arguments[c + 2];
    r.children = o;
  }
  return { $$typeof: Gn, type: e.type, key: l, ref: i, props: r, _owner: s };
};
z.createContext = function (e) {
  return (
    (e = {
      $$typeof: xc,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: kc, _context: e }),
    (e.Consumer = e)
  );
};
z.createElement = sa;
z.createFactory = function (e) {
  var t = sa.bind(null, e);
  return ((t.type = e), t);
};
z.createRef = function () {
  return { current: null };
};
z.forwardRef = function (e) {
  return { $$typeof: _c, render: e };
};
z.isValidElement = Qi;
z.lazy = function (e) {
  return { $$typeof: Cc, _payload: { _status: -1, _result: e }, _init: Pc };
};
z.memo = function (e, t) {
  return { $$typeof: Ec, type: e, compare: t === void 0 ? null : t };
};
z.startTransition = function (e) {
  var t = xr.transition;
  xr.transition = {};
  try {
    e();
  } finally {
    xr.transition = t;
  }
};
z.unstable_act = oa;
z.useCallback = function (e, t) {
  return ue.current.useCallback(e, t);
};
z.useContext = function (e) {
  return ue.current.useContext(e);
};
z.useDebugValue = function () {};
z.useDeferredValue = function (e) {
  return ue.current.useDeferredValue(e);
};
z.useEffect = function (e, t) {
  return ue.current.useEffect(e, t);
};
z.useId = function () {
  return ue.current.useId();
};
z.useImperativeHandle = function (e, t, n) {
  return ue.current.useImperativeHandle(e, t, n);
};
z.useInsertionEffect = function (e, t) {
  return ue.current.useInsertionEffect(e, t);
};
z.useLayoutEffect = function (e, t) {
  return ue.current.useLayoutEffect(e, t);
};
z.useMemo = function (e, t) {
  return ue.current.useMemo(e, t);
};
z.useReducer = function (e, t, n) {
  return ue.current.useReducer(e, t, n);
};
z.useRef = function (e) {
  return ue.current.useRef(e);
};
z.useState = function (e) {
  return ue.current.useState(e);
};
z.useSyncExternalStore = function (e, t, n) {
  return ue.current.useSyncExternalStore(e, t, n);
};
z.useTransition = function () {
  return ue.current.useTransition();
};
z.version = '18.3.1';
bo.exports = z;
var X = bo.exports;
const Lc = mc(X);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Rc = X,
  Mc = Symbol.for('react.element'),
  Oc = Symbol.for('react.fragment'),
  Bc = Object.prototype.hasOwnProperty,
  Dc = Rc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Ic = { key: !0, ref: !0, __self: !0, __source: !0 };
function aa(e, t, n) {
  var r,
    l = {},
    i = null,
    s = null;
  (n !== void 0 && (i = '' + n),
    t.key !== void 0 && (i = '' + t.key),
    t.ref !== void 0 && (s = t.ref));
  for (r in t) Bc.call(t, r) && !Ic.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
  return {
    $$typeof: Mc,
    type: e,
    key: i,
    ref: s,
    props: l,
    _owner: Dc.current,
  };
}
ll.Fragment = Oc;
ll.jsx = aa;
ll.jsxs = aa;
qo.exports = ll;
var f = qo.exports,
  ua = { exports: {} },
  ke = {},
  ca = { exports: {} },
  da = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(E, j) {
    var P = E.length;
    E.push(j);
    e: for (; 0 < P; ) {
      var W = (P - 1) >>> 1,
        G = E[W];
      if (0 < l(G, j)) ((E[W] = j), (E[P] = G), (P = W));
      else break e;
    }
  }
  function n(E) {
    return E.length === 0 ? null : E[0];
  }
  function r(E) {
    if (E.length === 0) return null;
    var j = E[0],
      P = E.pop();
    if (P !== j) {
      E[0] = P;
      e: for (var W = 0, G = E.length, er = G >>> 1; W < er; ) {
        var yt = 2 * (W + 1) - 1,
          _l = E[yt],
          gt = yt + 1,
          tr = E[gt];
        if (0 > l(_l, P))
          gt < G && 0 > l(tr, _l)
            ? ((E[W] = tr), (E[gt] = P), (W = gt))
            : ((E[W] = _l), (E[yt] = P), (W = yt));
        else if (gt < G && 0 > l(tr, P)) ((E[W] = tr), (E[gt] = P), (W = gt));
        else break e;
      }
    }
    return j;
  }
  function l(E, j) {
    var P = E.sortIndex - j.sortIndex;
    return P !== 0 ? P : E.id - j.id;
  }
  if (typeof performance == 'object' && typeof performance.now == 'function') {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var s = Date,
      o = s.now();
    e.unstable_now = function () {
      return s.now() - o;
    };
  }
  var a = [],
    c = [],
    v = 1,
    m = null,
    h = 3,
    w = !1,
    k = !1,
    _ = !1,
    O = typeof setTimeout == 'function' ? setTimeout : null,
    d = typeof clearTimeout == 'function' ? clearTimeout : null,
    u = typeof setImmediate < 'u' ? setImmediate : null;
  typeof navigator < 'u' &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(E) {
    for (var j = n(c); j !== null; ) {
      if (j.callback === null) r(c);
      else if (j.startTime <= E)
        (r(c), (j.sortIndex = j.expirationTime), t(a, j));
      else break;
      j = n(c);
    }
  }
  function y(E) {
    if (((_ = !1), p(E), !k))
      if (n(a) !== null) ((k = !0), kl(x));
      else {
        var j = n(c);
        j !== null && xl(y, j.startTime - E);
      }
  }
  function x(E, j) {
    ((k = !1), _ && ((_ = !1), d(T), (T = -1)), (w = !0));
    var P = h;
    try {
      for (
        p(j), m = n(a);
        m !== null && (!(m.expirationTime > j) || (E && !je()));

      ) {
        var W = m.callback;
        if (typeof W == 'function') {
          ((m.callback = null), (h = m.priorityLevel));
          var G = W(m.expirationTime <= j);
          ((j = e.unstable_now()),
            typeof G == 'function' ? (m.callback = G) : m === n(a) && r(a),
            p(j));
        } else r(a);
        m = n(a);
      }
      if (m !== null) var er = !0;
      else {
        var yt = n(c);
        (yt !== null && xl(y, yt.startTime - j), (er = !1));
      }
      return er;
    } finally {
      ((m = null), (h = P), (w = !1));
    }
  }
  var C = !1,
    N = null,
    T = -1,
    V = 5,
    L = -1;
  function je() {
    return !(e.unstable_now() - L < V);
  }
  function un() {
    if (N !== null) {
      var E = e.unstable_now();
      L = E;
      var j = !0;
      try {
        j = N(!0, E);
      } finally {
        j ? cn() : ((C = !1), (N = null));
      }
    } else C = !1;
  }
  var cn;
  if (typeof u == 'function')
    cn = function () {
      u(un);
    };
  else if (typeof MessageChannel < 'u') {
    var Fs = new MessageChannel(),
      hc = Fs.port2;
    ((Fs.port1.onmessage = un),
      (cn = function () {
        hc.postMessage(null);
      }));
  } else
    cn = function () {
      O(un, 0);
    };
  function kl(E) {
    ((N = E), C || ((C = !0), cn()));
  }
  function xl(E, j) {
    T = O(function () {
      E(e.unstable_now());
    }, j);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (E) {
      E.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      k || w || ((k = !0), kl(x));
    }),
    (e.unstable_forceFrameRate = function (E) {
      0 > E || 125 < E
        ? console.error(
            'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
          )
        : (V = 0 < E ? Math.floor(1e3 / E) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return h;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (E) {
      switch (h) {
        case 1:
        case 2:
        case 3:
          var j = 3;
          break;
        default:
          j = h;
      }
      var P = h;
      h = j;
      try {
        return E();
      } finally {
        h = P;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (E, j) {
      switch (E) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          E = 3;
      }
      var P = h;
      h = E;
      try {
        return j();
      } finally {
        h = P;
      }
    }),
    (e.unstable_scheduleCallback = function (E, j, P) {
      var W = e.unstable_now();
      switch (
        (typeof P == 'object' && P !== null
          ? ((P = P.delay), (P = typeof P == 'number' && 0 < P ? W + P : W))
          : (P = W),
        E)
      ) {
        case 1:
          var G = -1;
          break;
        case 2:
          G = 250;
          break;
        case 5:
          G = 1073741823;
          break;
        case 4:
          G = 1e4;
          break;
        default:
          G = 5e3;
      }
      return (
        (G = P + G),
        (E = {
          id: v++,
          callback: j,
          priorityLevel: E,
          startTime: P,
          expirationTime: G,
          sortIndex: -1,
        }),
        P > W
          ? ((E.sortIndex = P),
            t(c, E),
            n(a) === null &&
              E === n(c) &&
              (_ ? (d(T), (T = -1)) : (_ = !0), xl(y, P - W)))
          : ((E.sortIndex = G), t(a, E), k || w || ((k = !0), kl(x))),
        E
      );
    }),
    (e.unstable_shouldYield = je),
    (e.unstable_wrapCallback = function (E) {
      var j = h;
      return function () {
        var P = h;
        h = j;
        try {
          return E.apply(this, arguments);
        } finally {
          h = P;
        }
      };
    }));
})(da);
ca.exports = da;
var Fc = ca.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Zc = X,
  we = Fc;
function g(e) {
  for (
    var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, n = 1;
    n < arguments.length;
    n++
  )
    t += '&args[]=' + encodeURIComponent(arguments[n]);
  return (
    'Minified React error #' +
    e +
    '; visit ' +
    t +
    ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
  );
}
var pa = new Set(),
  Rn = {};
function Lt(e, t) {
  (qt(e, t), qt(e + 'Capture', t));
}
function qt(e, t) {
  for (Rn[e] = t, e = 0; e < t.length; e++) pa.add(t[e]);
}
var Ye = !(
    typeof window > 'u' ||
    typeof window.document > 'u' ||
    typeof window.document.createElement > 'u'
  ),
  Jl = Object.prototype.hasOwnProperty,
  Uc =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  As = {},
  Vs = {};
function $c(e) {
  return Jl.call(Vs, e)
    ? !0
    : Jl.call(As, e)
      ? !1
      : Uc.test(e)
        ? (Vs[e] = !0)
        : ((As[e] = !0), !1);
}
function Ac(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case 'function':
    case 'symbol':
      return !0;
    case 'boolean':
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== 'data-' && e !== 'aria-');
    default:
      return !1;
  }
}
function Vc(e, t, n, r) {
  if (t === null || typeof t > 'u' || Ac(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function ce(e, t, n, r, l, i, s) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = s));
}
var te = {};
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
  .split(' ')
  .forEach(function (e) {
    te[e] = new ce(e, 0, !1, e, null, !1, !1);
  });
[
  ['acceptCharset', 'accept-charset'],
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['httpEquiv', 'http-equiv'],
].forEach(function (e) {
  var t = e[0];
  te[t] = new ce(t, 1, !1, e[1], null, !1, !1);
});
['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
  te[e] = new ce(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  'autoReverse',
  'externalResourcesRequired',
  'focusable',
  'preserveAlpha',
].forEach(function (e) {
  te[e] = new ce(e, 2, !1, e, null, !1, !1);
});
'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
  .split(' ')
  .forEach(function (e) {
    te[e] = new ce(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
  te[e] = new ce(e, 3, !0, e, null, !1, !1);
});
['capture', 'download'].forEach(function (e) {
  te[e] = new ce(e, 4, !1, e, null, !1, !1);
});
['cols', 'rows', 'size', 'span'].forEach(function (e) {
  te[e] = new ce(e, 6, !1, e, null, !1, !1);
});
['rowSpan', 'start'].forEach(function (e) {
  te[e] = new ce(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Ki = /[\-:]([a-z])/g;
function Gi(e) {
  return e[1].toUpperCase();
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(Ki, Gi);
    te[t] = new ce(t, 1, !1, e, null, !1, !1);
  });
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(Ki, Gi);
    te[t] = new ce(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
  });
['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
  var t = e.replace(Ki, Gi);
  te[t] = new ce(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
});
['tabIndex', 'crossOrigin'].forEach(function (e) {
  te[e] = new ce(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
te.xlinkHref = new ce(
  'xlinkHref',
  1,
  !1,
  'xlink:href',
  'http://www.w3.org/1999/xlink',
  !0,
  !1
);
['src', 'href', 'action', 'formAction'].forEach(function (e) {
  te[e] = new ce(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Xi(e, t, n, r) {
  var l = te.hasOwnProperty(t) ? te[t] : null;
  (l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== 'o' && t[0] !== 'O') ||
      (t[1] !== 'n' && t[1] !== 'N')) &&
    (Vc(t, n, l, r) && (n = null),
    r || l === null
      ? $c(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
      : l.mustUseProperty
        ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : '') : n)
        : ((t = l.attributeName),
          (r = l.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((l = l.type),
              (n = l === 3 || (l === 4 && n === !0) ? '' : '' + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Xe = Zc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  rr = Symbol.for('react.element'),
  Ot = Symbol.for('react.portal'),
  Bt = Symbol.for('react.fragment'),
  Ji = Symbol.for('react.strict_mode'),
  ql = Symbol.for('react.profiler'),
  fa = Symbol.for('react.provider'),
  ha = Symbol.for('react.context'),
  qi = Symbol.for('react.forward_ref'),
  bl = Symbol.for('react.suspense'),
  ei = Symbol.for('react.suspense_list'),
  bi = Symbol.for('react.memo'),
  qe = Symbol.for('react.lazy'),
  ma = Symbol.for('react.offscreen'),
  Ws = Symbol.iterator;
function dn(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (Ws && e[Ws]) || e['@@iterator']),
      typeof e == 'function' ? e : null);
}
var $ = Object.assign,
  El;
function wn(e) {
  if (El === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      El = (t && t[1]) || '';
    }
  return (
    `
` +
    El +
    e
  );
}
var Cl = !1;
function Nl(e, t) {
  if (!e || Cl) return '';
  Cl = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, 'props', {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == 'object' && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (c) {
          var r = c;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (c) {
          r = c;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (c) {
        r = c;
      }
      e();
    }
  } catch (c) {
    if (c && r && typeof c.stack == 'string') {
      for (
        var l = c.stack.split(`
`),
          i = r.stack.split(`
`),
          s = l.length - 1,
          o = i.length - 1;
        1 <= s && 0 <= o && l[s] !== i[o];

      )
        o--;
      for (; 1 <= s && 0 <= o; s--, o--)
        if (l[s] !== i[o]) {
          if (s !== 1 || o !== 1)
            do
              if ((s--, o--, 0 > o || l[s] !== i[o])) {
                var a =
                  `
` + l[s].replace(' at new ', ' at ');
                return (
                  e.displayName &&
                    a.includes('<anonymous>') &&
                    (a = a.replace('<anonymous>', e.displayName)),
                  a
                );
              }
            while (1 <= s && 0 <= o);
          break;
        }
    }
  } finally {
    ((Cl = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : '') ? wn(e) : '';
}
function Wc(e) {
  switch (e.tag) {
    case 5:
      return wn(e.type);
    case 16:
      return wn('Lazy');
    case 13:
      return wn('Suspense');
    case 19:
      return wn('SuspenseList');
    case 0:
    case 2:
    case 15:
      return ((e = Nl(e.type, !1)), e);
    case 11:
      return ((e = Nl(e.type.render, !1)), e);
    case 1:
      return ((e = Nl(e.type, !0)), e);
    default:
      return '';
  }
}
function ti(e) {
  if (e == null) return null;
  if (typeof e == 'function') return e.displayName || e.name || null;
  if (typeof e == 'string') return e;
  switch (e) {
    case Bt:
      return 'Fragment';
    case Ot:
      return 'Portal';
    case ql:
      return 'Profiler';
    case Ji:
      return 'StrictMode';
    case bl:
      return 'Suspense';
    case ei:
      return 'SuspenseList';
  }
  if (typeof e == 'object')
    switch (e.$$typeof) {
      case ha:
        return (e.displayName || 'Context') + '.Consumer';
      case fa:
        return (e._context.displayName || 'Context') + '.Provider';
      case qi:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ''),
            (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
          e
        );
      case bi:
        return (
          (t = e.displayName || null),
          t !== null ? t : ti(e.type) || 'Memo'
        );
      case qe:
        ((t = e._payload), (e = e._init));
        try {
          return ti(e(t));
        } catch {}
    }
  return null;
}
function Hc(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return 'Cache';
    case 9:
      return (t.displayName || 'Context') + '.Consumer';
    case 10:
      return (t._context.displayName || 'Context') + '.Provider';
    case 18:
      return 'DehydratedFragment';
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ''),
        t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
      );
    case 7:
      return 'Fragment';
    case 5:
      return t;
    case 4:
      return 'Portal';
    case 3:
      return 'Root';
    case 6:
      return 'Text';
    case 16:
      return ti(t);
    case 8:
      return t === Ji ? 'StrictMode' : 'Mode';
    case 22:
      return 'Offscreen';
    case 12:
      return 'Profiler';
    case 21:
      return 'Scope';
    case 13:
      return 'Suspense';
    case 19:
      return 'SuspenseList';
    case 25:
      return 'TracingMarker';
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == 'function') return t.displayName || t.name || null;
      if (typeof t == 'string') return t;
  }
  return null;
}
function pt(e) {
  switch (typeof e) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'undefined':
      return e;
    case 'object':
      return e;
    default:
      return '';
  }
}
function va(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === 'input' &&
    (t === 'checkbox' || t === 'radio')
  );
}
function Yc(e) {
  var t = va(e) ? 'checked' : 'value',
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = '' + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < 'u' &&
    typeof n.get == 'function' &&
    typeof n.set == 'function'
  ) {
    var l = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (s) {
          ((r = '' + s), i.call(this, s));
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (s) {
          r = '' + s;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function lr(e) {
  e._valueTracker || (e._valueTracker = Yc(e));
}
function ya(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = '';
  return (
    e && (r = va(e) ? (e.checked ? 'true' : 'false') : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Or(e) {
  if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u'))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function ni(e, t) {
  var n = t.checked;
  return $({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Hs(e, t) {
  var n = t.defaultValue == null ? '' : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  ((n = pt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === 'checkbox' || t.type === 'radio'
          ? t.checked != null
          : t.value != null,
    }));
}
function ga(e, t) {
  ((t = t.checked), t != null && Xi(e, 'checked', t, !1));
}
function ri(e, t) {
  ga(e, t);
  var n = pt(t.value),
    r = t.type;
  if (n != null)
    r === 'number'
      ? ((n === 0 && e.value === '') || e.value != n) && (e.value = '' + n)
      : e.value !== '' + n && (e.value = '' + n);
  else if (r === 'submit' || r === 'reset') {
    e.removeAttribute('value');
    return;
  }
  (t.hasOwnProperty('value')
    ? li(e, t.type, n)
    : t.hasOwnProperty('defaultValue') && li(e, t.type, pt(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked));
}
function Ys(e, t, n) {
  if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
    var r = t.type;
    if (
      !(
        (r !== 'submit' && r !== 'reset') ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    ((t = '' + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((n = e.name),
    n !== '' && (e.name = ''),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== '' && (e.name = n));
}
function li(e, t, n) {
  (t !== 'number' || Or(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = '' + e._wrapperState.initialValue)
      : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
}
var kn = Array.isArray;
function Yt(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t['$' + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      ((l = t.hasOwnProperty('$' + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0));
  } else {
    for (n = '' + pt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        ((e[l].selected = !0), r && (e[l].defaultSelected = !0));
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function ii(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(g(91));
  return $({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: '' + e._wrapperState.initialValue,
  });
}
function Qs(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(g(92));
      if (kn(n)) {
        if (1 < n.length) throw Error(g(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ''), (n = t));
  }
  e._wrapperState = { initialValue: pt(n) };
}
function wa(e, t) {
  var n = pt(t.value),
    r = pt(t.defaultValue);
  (n != null &&
    ((n = '' + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = '' + r));
}
function Ks(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== '' && t !== null && (e.value = t);
}
function ka(e) {
  switch (e) {
    case 'svg':
      return 'http://www.w3.org/2000/svg';
    case 'math':
      return 'http://www.w3.org/1998/Math/MathML';
    default:
      return 'http://www.w3.org/1999/xhtml';
  }
}
function si(e, t) {
  return e == null || e === 'http://www.w3.org/1999/xhtml'
    ? ka(t)
    : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
      ? 'http://www.w3.org/1999/xhtml'
      : e;
}
var ir,
  xa = (function (e) {
    return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e)
      e.innerHTML = t;
    else {
      for (
        ir = ir || document.createElement('div'),
          ir.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
          t = ir.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Mn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Sn = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Qc = ['Webkit', 'ms', 'Moz', 'O'];
Object.keys(Sn).forEach(function (e) {
  Qc.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Sn[t] = Sn[e]));
  });
});
function _a(e, t, n) {
  return t == null || typeof t == 'boolean' || t === ''
    ? ''
    : n || typeof t != 'number' || t === 0 || (Sn.hasOwnProperty(e) && Sn[e])
      ? ('' + t).trim()
      : t + 'px';
}
function Sa(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf('--') === 0,
        l = _a(n, t[n], r);
      (n === 'float' && (n = 'cssFloat'), r ? e.setProperty(n, l) : (e[n] = l));
    }
}
var Kc = $(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function oi(e, t) {
  if (t) {
    if (Kc[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(g(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(g(60));
      if (
        typeof t.dangerouslySetInnerHTML != 'object' ||
        !('__html' in t.dangerouslySetInnerHTML)
      )
        throw Error(g(61));
    }
    if (t.style != null && typeof t.style != 'object') throw Error(g(62));
  }
}
function ai(e, t) {
  if (e.indexOf('-') === -1) return typeof t.is == 'string';
  switch (e) {
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return !1;
    default:
      return !0;
  }
}
var ui = null;
function es(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var ci = null,
  Qt = null,
  Kt = null;
function Gs(e) {
  if ((e = qn(e))) {
    if (typeof ci != 'function') throw Error(g(280));
    var t = e.stateNode;
    t && ((t = ul(t)), ci(e.stateNode, e.type, t));
  }
}
function Ea(e) {
  Qt ? (Kt ? Kt.push(e) : (Kt = [e])) : (Qt = e);
}
function Ca() {
  if (Qt) {
    var e = Qt,
      t = Kt;
    if (((Kt = Qt = null), Gs(e), t)) for (e = 0; e < t.length; e++) Gs(t[e]);
  }
}
function Na(e, t) {
  return e(t);
}
function Ta() {}
var Tl = !1;
function ja(e, t, n) {
  if (Tl) return e(t, n);
  Tl = !0;
  try {
    return Na(e, t, n);
  } finally {
    ((Tl = !1), (Qt !== null || Kt !== null) && (Ta(), Ca()));
  }
}
function On(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = ul(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
    case 'onMouseEnter':
      ((r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === 'button' ||
          e === 'input' ||
          e === 'select' ||
          e === 'textarea'
        ))),
        (e = !r));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != 'function') throw Error(g(231, t, typeof n));
  return n;
}
var di = !1;
if (Ye)
  try {
    var pn = {};
    (Object.defineProperty(pn, 'passive', {
      get: function () {
        di = !0;
      },
    }),
      window.addEventListener('test', pn, pn),
      window.removeEventListener('test', pn, pn));
  } catch {
    di = !1;
  }
function Gc(e, t, n, r, l, i, s, o, a) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (v) {
    this.onError(v);
  }
}
var En = !1,
  Br = null,
  Dr = !1,
  pi = null,
  Xc = {
    onError: function (e) {
      ((En = !0), (Br = e));
    },
  };
function Jc(e, t, n, r, l, i, s, o, a) {
  ((En = !1), (Br = null), Gc.apply(Xc, arguments));
}
function qc(e, t, n, r, l, i, s, o, a) {
  if ((Jc.apply(this, arguments), En)) {
    if (En) {
      var c = Br;
      ((En = !1), (Br = null));
    } else throw Error(g(198));
    Dr || ((Dr = !0), (pi = c));
  }
}
function Rt(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Pa(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Xs(e) {
  if (Rt(e) !== e) throw Error(g(188));
}
function bc(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Rt(e)), t === null)) throw Error(g(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var i = l.alternate;
    if (i === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === i.child) {
      for (i = l.child; i; ) {
        if (i === n) return (Xs(l), e);
        if (i === r) return (Xs(l), t);
        i = i.sibling;
      }
      throw Error(g(188));
    }
    if (n.return !== r.return) ((n = l), (r = i));
    else {
      for (var s = !1, o = l.child; o; ) {
        if (o === n) {
          ((s = !0), (n = l), (r = i));
          break;
        }
        if (o === r) {
          ((s = !0), (r = l), (n = i));
          break;
        }
        o = o.sibling;
      }
      if (!s) {
        for (o = i.child; o; ) {
          if (o === n) {
            ((s = !0), (n = i), (r = l));
            break;
          }
          if (o === r) {
            ((s = !0), (r = i), (n = l));
            break;
          }
          o = o.sibling;
        }
        if (!s) throw Error(g(189));
      }
    }
    if (n.alternate !== r) throw Error(g(190));
  }
  if (n.tag !== 3) throw Error(g(188));
  return n.stateNode.current === n ? e : t;
}
function za(e) {
  return ((e = bc(e)), e !== null ? La(e) : null);
}
function La(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = La(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Ra = we.unstable_scheduleCallback,
  Js = we.unstable_cancelCallback,
  ed = we.unstable_shouldYield,
  td = we.unstable_requestPaint,
  H = we.unstable_now,
  nd = we.unstable_getCurrentPriorityLevel,
  ts = we.unstable_ImmediatePriority,
  Ma = we.unstable_UserBlockingPriority,
  Ir = we.unstable_NormalPriority,
  rd = we.unstable_LowPriority,
  Oa = we.unstable_IdlePriority,
  il = null,
  Ze = null;
function ld(e) {
  if (Ze && typeof Ze.onCommitFiberRoot == 'function')
    try {
      Ze.onCommitFiberRoot(il, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Me = Math.clz32 ? Math.clz32 : od,
  id = Math.log,
  sd = Math.LN2;
function od(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((id(e) / sd) | 0)) | 0);
}
var sr = 64,
  or = 4194304;
function xn(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Fr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    i = e.pingedLanes,
    s = n & 268435455;
  if (s !== 0) {
    var o = s & ~l;
    o !== 0 ? (r = xn(o)) : ((i &= s), i !== 0 && (r = xn(i)));
  } else ((s = n & ~l), s !== 0 ? (r = xn(s)) : i !== 0 && (r = xn(i)));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (i = t & -t), l >= i || (l === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      ((n = 31 - Me(t)), (l = 1 << n), (r |= e[n]), (t &= ~l));
  return r;
}
function ad(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function ud(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      i = e.pendingLanes;
    0 < i;

  ) {
    var s = 31 - Me(i),
      o = 1 << s,
      a = l[s];
    (a === -1
      ? (!(o & n) || o & r) && (l[s] = ad(o, t))
      : a <= t && (e.expiredLanes |= o),
      (i &= ~o));
  }
}
function fi(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function Ba() {
  var e = sr;
  return ((sr <<= 1), !(sr & 4194240) && (sr = 64), e);
}
function jl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Xn(e, t, n) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Me(t)),
    (e[t] = n));
}
function cd(e, t) {
  var n = e.pendingLanes & ~t;
  ((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements));
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Me(n),
      i = 1 << l;
    ((t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~i));
  }
}
function ns(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Me(n),
      l = 1 << r;
    ((l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l));
  }
}
var M = 0;
function Da(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var Ia,
  rs,
  Fa,
  Za,
  Ua,
  hi = !1,
  ar = [],
  lt = null,
  it = null,
  st = null,
  Bn = new Map(),
  Dn = new Map(),
  et = [],
  dd =
    'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
      ' '
    );
function qs(e, t) {
  switch (e) {
    case 'focusin':
    case 'focusout':
      lt = null;
      break;
    case 'dragenter':
    case 'dragleave':
      it = null;
      break;
    case 'mouseover':
    case 'mouseout':
      st = null;
      break;
    case 'pointerover':
    case 'pointerout':
      Bn.delete(t.pointerId);
      break;
    case 'gotpointercapture':
    case 'lostpointercapture':
      Dn.delete(t.pointerId);
  }
}
function fn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [l],
      }),
      t !== null && ((t = qn(t)), t !== null && rs(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function pd(e, t, n, r, l) {
  switch (t) {
    case 'focusin':
      return ((lt = fn(lt, e, t, n, r, l)), !0);
    case 'dragenter':
      return ((it = fn(it, e, t, n, r, l)), !0);
    case 'mouseover':
      return ((st = fn(st, e, t, n, r, l)), !0);
    case 'pointerover':
      var i = l.pointerId;
      return (Bn.set(i, fn(Bn.get(i) || null, e, t, n, r, l)), !0);
    case 'gotpointercapture':
      return (
        (i = l.pointerId),
        Dn.set(i, fn(Dn.get(i) || null, e, t, n, r, l)),
        !0
      );
  }
  return !1;
}
function $a(e) {
  var t = xt(e.target);
  if (t !== null) {
    var n = Rt(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Pa(n)), t !== null)) {
          ((e.blockedOn = t),
            Ua(e.priority, function () {
              Fa(n);
            }));
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function _r(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = mi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ((ui = r), n.target.dispatchEvent(r), (ui = null));
    } else return ((t = qn(n)), t !== null && rs(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function bs(e, t, n) {
  _r(e) && n.delete(t);
}
function fd() {
  ((hi = !1),
    lt !== null && _r(lt) && (lt = null),
    it !== null && _r(it) && (it = null),
    st !== null && _r(st) && (st = null),
    Bn.forEach(bs),
    Dn.forEach(bs));
}
function hn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    hi ||
      ((hi = !0),
      we.unstable_scheduleCallback(we.unstable_NormalPriority, fd)));
}
function In(e) {
  function t(l) {
    return hn(l, e);
  }
  if (0 < ar.length) {
    hn(ar[0], e);
    for (var n = 1; n < ar.length; n++) {
      var r = ar[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    lt !== null && hn(lt, e),
      it !== null && hn(it, e),
      st !== null && hn(st, e),
      Bn.forEach(t),
      Dn.forEach(t),
      n = 0;
    n < et.length;
    n++
  )
    ((r = et[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < et.length && ((n = et[0]), n.blockedOn === null); )
    ($a(n), n.blockedOn === null && et.shift());
}
var Gt = Xe.ReactCurrentBatchConfig,
  Zr = !0;
function hd(e, t, n, r) {
  var l = M,
    i = Gt.transition;
  Gt.transition = null;
  try {
    ((M = 1), ls(e, t, n, r));
  } finally {
    ((M = l), (Gt.transition = i));
  }
}
function md(e, t, n, r) {
  var l = M,
    i = Gt.transition;
  Gt.transition = null;
  try {
    ((M = 4), ls(e, t, n, r));
  } finally {
    ((M = l), (Gt.transition = i));
  }
}
function ls(e, t, n, r) {
  if (Zr) {
    var l = mi(e, t, n, r);
    if (l === null) (Fl(e, t, r, Ur, n), qs(e, r));
    else if (pd(l, e, t, n, r)) r.stopPropagation();
    else if ((qs(e, r), t & 4 && -1 < dd.indexOf(e))) {
      for (; l !== null; ) {
        var i = qn(l);
        if (
          (i !== null && Ia(i),
          (i = mi(e, t, n, r)),
          i === null && Fl(e, t, r, Ur, n),
          i === l)
        )
          break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else Fl(e, t, r, null, n);
  }
}
var Ur = null;
function mi(e, t, n, r) {
  if (((Ur = null), (e = es(r)), (e = xt(e)), e !== null))
    if (((t = Rt(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Pa(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((Ur = e), null);
}
function Aa(e) {
  switch (e) {
    case 'cancel':
    case 'click':
    case 'close':
    case 'contextmenu':
    case 'copy':
    case 'cut':
    case 'auxclick':
    case 'dblclick':
    case 'dragend':
    case 'dragstart':
    case 'drop':
    case 'focusin':
    case 'focusout':
    case 'input':
    case 'invalid':
    case 'keydown':
    case 'keypress':
    case 'keyup':
    case 'mousedown':
    case 'mouseup':
    case 'paste':
    case 'pause':
    case 'play':
    case 'pointercancel':
    case 'pointerdown':
    case 'pointerup':
    case 'ratechange':
    case 'reset':
    case 'resize':
    case 'seeked':
    case 'submit':
    case 'touchcancel':
    case 'touchend':
    case 'touchstart':
    case 'volumechange':
    case 'change':
    case 'selectionchange':
    case 'textInput':
    case 'compositionstart':
    case 'compositionend':
    case 'compositionupdate':
    case 'beforeblur':
    case 'afterblur':
    case 'beforeinput':
    case 'blur':
    case 'fullscreenchange':
    case 'focus':
    case 'hashchange':
    case 'popstate':
    case 'select':
    case 'selectstart':
      return 1;
    case 'drag':
    case 'dragenter':
    case 'dragexit':
    case 'dragleave':
    case 'dragover':
    case 'mousemove':
    case 'mouseout':
    case 'mouseover':
    case 'pointermove':
    case 'pointerout':
    case 'pointerover':
    case 'scroll':
    case 'toggle':
    case 'touchmove':
    case 'wheel':
    case 'mouseenter':
    case 'mouseleave':
    case 'pointerenter':
    case 'pointerleave':
      return 4;
    case 'message':
      switch (nd()) {
        case ts:
          return 1;
        case Ma:
          return 4;
        case Ir:
        case rd:
          return 16;
        case Oa:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var nt = null,
  is = null,
  Sr = null;
function Va() {
  if (Sr) return Sr;
  var e,
    t = is,
    n = t.length,
    r,
    l = 'value' in nt ? nt.value : nt.textContent,
    i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === l[i - r]; r++);
  return (Sr = l.slice(e, 1 < r ? 1 - r : void 0));
}
function Er(e) {
  var t = e.keyCode;
  return (
    'charCode' in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function ur() {
  return !0;
}
function eo() {
  return !1;
}
function xe(e) {
  function t(n, r, l, i, s) {
    ((this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = s),
      (this.currentTarget = null));
    for (var o in e)
      e.hasOwnProperty(o) && ((n = e[o]), (this[o] = n ? n(i) : i[o]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? ur
        : eo),
      (this.isPropagationStopped = eo),
      this
    );
  }
  return (
    $(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
          (this.isDefaultPrevented = ur));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
          (this.isPropagationStopped = ur));
      },
      persist: function () {},
      isPersistent: ur,
    }),
    t
  );
}
var on = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  ss = xe(on),
  Jn = $({}, on, { view: 0, detail: 0 }),
  vd = xe(Jn),
  Pl,
  zl,
  mn,
  sl = $({}, Jn, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: os,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return 'movementX' in e
        ? e.movementX
        : (e !== mn &&
            (mn && e.type === 'mousemove'
              ? ((Pl = e.screenX - mn.screenX), (zl = e.screenY - mn.screenY))
              : (zl = Pl = 0),
            (mn = e)),
          Pl);
    },
    movementY: function (e) {
      return 'movementY' in e ? e.movementY : zl;
    },
  }),
  to = xe(sl),
  yd = $({}, sl, { dataTransfer: 0 }),
  gd = xe(yd),
  wd = $({}, Jn, { relatedTarget: 0 }),
  Ll = xe(wd),
  kd = $({}, on, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  xd = xe(kd),
  _d = $({}, on, {
    clipboardData: function (e) {
      return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Sd = xe(_d),
  Ed = $({}, on, { data: 0 }),
  no = xe(Ed),
  Cd = {
    Esc: 'Escape',
    Spacebar: ' ',
    Left: 'ArrowLeft',
    Up: 'ArrowUp',
    Right: 'ArrowRight',
    Down: 'ArrowDown',
    Del: 'Delete',
    Win: 'OS',
    Menu: 'ContextMenu',
    Apps: 'ContextMenu',
    Scroll: 'ScrollLock',
    MozPrintableKey: 'Unidentified',
  },
  Nd = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    45: 'Insert',
    46: 'Delete',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'NumLock',
    145: 'ScrollLock',
    224: 'Meta',
  },
  Td = {
    Alt: 'altKey',
    Control: 'ctrlKey',
    Meta: 'metaKey',
    Shift: 'shiftKey',
  };
function jd(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Td[e]) ? !!t[e] : !1;
}
function os() {
  return jd;
}
var Pd = $({}, Jn, {
    key: function (e) {
      if (e.key) {
        var t = Cd[e.key] || e.key;
        if (t !== 'Unidentified') return t;
      }
      return e.type === 'keypress'
        ? ((e = Er(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
        : e.type === 'keydown' || e.type === 'keyup'
          ? Nd[e.keyCode] || 'Unidentified'
          : '';
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: os,
    charCode: function (e) {
      return e.type === 'keypress' ? Er(e) : 0;
    },
    keyCode: function (e) {
      return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === 'keypress'
        ? Er(e)
        : e.type === 'keydown' || e.type === 'keyup'
          ? e.keyCode
          : 0;
    },
  }),
  zd = xe(Pd),
  Ld = $({}, sl, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  ro = xe(Ld),
  Rd = $({}, Jn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: os,
  }),
  Md = xe(Rd),
  Od = $({}, on, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Bd = xe(Od),
  Dd = $({}, sl, {
    deltaX: function (e) {
      return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return 'deltaY' in e
        ? e.deltaY
        : 'wheelDeltaY' in e
          ? -e.wheelDeltaY
          : 'wheelDelta' in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Id = xe(Dd),
  Fd = [9, 13, 27, 32],
  as = Ye && 'CompositionEvent' in window,
  Cn = null;
Ye && 'documentMode' in document && (Cn = document.documentMode);
var Zd = Ye && 'TextEvent' in window && !Cn,
  Wa = Ye && (!as || (Cn && 8 < Cn && 11 >= Cn)),
  lo = ' ',
  io = !1;
function Ha(e, t) {
  switch (e) {
    case 'keyup':
      return Fd.indexOf(t.keyCode) !== -1;
    case 'keydown':
      return t.keyCode !== 229;
    case 'keypress':
    case 'mousedown':
    case 'focusout':
      return !0;
    default:
      return !1;
  }
}
function Ya(e) {
  return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
}
var Dt = !1;
function Ud(e, t) {
  switch (e) {
    case 'compositionend':
      return Ya(t);
    case 'keypress':
      return t.which !== 32 ? null : ((io = !0), lo);
    case 'textInput':
      return ((e = t.data), e === lo && io ? null : e);
    default:
      return null;
  }
}
function $d(e, t) {
  if (Dt)
    return e === 'compositionend' || (!as && Ha(e, t))
      ? ((e = Va()), (Sr = is = nt = null), (Dt = !1), e)
      : null;
  switch (e) {
    case 'paste':
      return null;
    case 'keypress':
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case 'compositionend':
      return Wa && t.locale !== 'ko' ? null : t.data;
    default:
      return null;
  }
}
var Ad = {
  color: !0,
  date: !0,
  datetime: !0,
  'datetime-local': !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function so(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === 'input' ? !!Ad[e.type] : t === 'textarea';
}
function Qa(e, t, n, r) {
  (Ea(r),
    (t = $r(t, 'onChange')),
    0 < t.length &&
      ((n = new ss('onChange', 'change', null, n, r)),
      e.push({ event: n, listeners: t })));
}
var Nn = null,
  Fn = null;
function Vd(e) {
  lu(e, 0);
}
function ol(e) {
  var t = Zt(e);
  if (ya(t)) return e;
}
function Wd(e, t) {
  if (e === 'change') return t;
}
var Ka = !1;
if (Ye) {
  var Rl;
  if (Ye) {
    var Ml = 'oninput' in document;
    if (!Ml) {
      var oo = document.createElement('div');
      (oo.setAttribute('oninput', 'return;'),
        (Ml = typeof oo.oninput == 'function'));
    }
    Rl = Ml;
  } else Rl = !1;
  Ka = Rl && (!document.documentMode || 9 < document.documentMode);
}
function ao() {
  Nn && (Nn.detachEvent('onpropertychange', Ga), (Fn = Nn = null));
}
function Ga(e) {
  if (e.propertyName === 'value' && ol(Fn)) {
    var t = [];
    (Qa(t, Fn, e, es(e)), ja(Vd, t));
  }
}
function Hd(e, t, n) {
  e === 'focusin'
    ? (ao(), (Nn = t), (Fn = n), Nn.attachEvent('onpropertychange', Ga))
    : e === 'focusout' && ao();
}
function Yd(e) {
  if (e === 'selectionchange' || e === 'keyup' || e === 'keydown')
    return ol(Fn);
}
function Qd(e, t) {
  if (e === 'click') return ol(t);
}
function Kd(e, t) {
  if (e === 'input' || e === 'change') return ol(t);
}
function Gd(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Be = typeof Object.is == 'function' ? Object.is : Gd;
function Zn(e, t) {
  if (Be(e, t)) return !0;
  if (typeof e != 'object' || e === null || typeof t != 'object' || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Jl.call(t, l) || !Be(e[l], t[l])) return !1;
  }
  return !0;
}
function uo(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function co(e, t) {
  var n = uo(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = uo(n);
  }
}
function Xa(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? Xa(e, t.parentNode)
          : 'contains' in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Ja() {
  for (var e = window, t = Or(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == 'string';
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Or(e.document);
  }
  return t;
}
function us(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === 'input' &&
      (e.type === 'text' ||
        e.type === 'search' ||
        e.type === 'tel' ||
        e.type === 'url' ||
        e.type === 'password')) ||
      t === 'textarea' ||
      e.contentEditable === 'true')
  );
}
function Xd(e) {
  var t = Ja(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Xa(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && us(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        'selectionStart' in n)
      )
        ((n.selectionStart = t),
          (n.selectionEnd = Math.min(e, n.value.length)));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var l = n.textContent.length,
          i = Math.min(r.start, l);
        ((r = r.end === void 0 ? i : Math.min(r.end, l)),
          !e.extend && i > r && ((l = r), (r = i), (i = l)),
          (l = co(n, i)));
        var s = co(n, r);
        l &&
          s &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== s.node ||
            e.focusOffset !== s.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(s.node, s.offset))
            : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == 'function' && n.focus(), n = 0; n < t.length; n++)
      ((e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top));
  }
}
var Jd = Ye && 'documentMode' in document && 11 >= document.documentMode,
  It = null,
  vi = null,
  Tn = null,
  yi = !1;
function po(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  yi ||
    It == null ||
    It !== Or(r) ||
    ((r = It),
    'selectionStart' in r && us(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Tn && Zn(Tn, r)) ||
      ((Tn = r),
      (r = $r(vi, 'onSelect')),
      0 < r.length &&
        ((t = new ss('onSelect', 'select', null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = It))));
}
function cr(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n['Webkit' + e] = 'webkit' + t),
    (n['Moz' + e] = 'moz' + t),
    n
  );
}
var Ft = {
    animationend: cr('Animation', 'AnimationEnd'),
    animationiteration: cr('Animation', 'AnimationIteration'),
    animationstart: cr('Animation', 'AnimationStart'),
    transitionend: cr('Transition', 'TransitionEnd'),
  },
  Ol = {},
  qa = {};
Ye &&
  ((qa = document.createElement('div').style),
  'AnimationEvent' in window ||
    (delete Ft.animationend.animation,
    delete Ft.animationiteration.animation,
    delete Ft.animationstart.animation),
  'TransitionEvent' in window || delete Ft.transitionend.transition);
function al(e) {
  if (Ol[e]) return Ol[e];
  if (!Ft[e]) return e;
  var t = Ft[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in qa) return (Ol[e] = t[n]);
  return e;
}
var ba = al('animationend'),
  eu = al('animationiteration'),
  tu = al('animationstart'),
  nu = al('transitionend'),
  ru = new Map(),
  fo =
    'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
      ' '
    );
function ht(e, t) {
  (ru.set(e, t), Lt(t, [e]));
}
for (var Bl = 0; Bl < fo.length; Bl++) {
  var Dl = fo[Bl],
    qd = Dl.toLowerCase(),
    bd = Dl[0].toUpperCase() + Dl.slice(1);
  ht(qd, 'on' + bd);
}
ht(ba, 'onAnimationEnd');
ht(eu, 'onAnimationIteration');
ht(tu, 'onAnimationStart');
ht('dblclick', 'onDoubleClick');
ht('focusin', 'onFocus');
ht('focusout', 'onBlur');
ht(nu, 'onTransitionEnd');
qt('onMouseEnter', ['mouseout', 'mouseover']);
qt('onMouseLeave', ['mouseout', 'mouseover']);
qt('onPointerEnter', ['pointerout', 'pointerover']);
qt('onPointerLeave', ['pointerout', 'pointerover']);
Lt(
  'onChange',
  'change click focusin focusout input keydown keyup selectionchange'.split(' ')
);
Lt(
  'onSelect',
  'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
    ' '
  )
);
Lt('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
Lt(
  'onCompositionEnd',
  'compositionend focusout keydown keypress keyup mousedown'.split(' ')
);
Lt(
  'onCompositionStart',
  'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
);
Lt(
  'onCompositionUpdate',
  'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
);
var _n =
    'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
      ' '
    ),
  ep = new Set('cancel close invalid load scroll toggle'.split(' ').concat(_n));
function ho(e, t, n) {
  var r = e.type || 'unknown-event';
  ((e.currentTarget = n), qc(r, t, void 0, e), (e.currentTarget = null));
}
function lu(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var s = r.length - 1; 0 <= s; s--) {
          var o = r[s],
            a = o.instance,
            c = o.currentTarget;
          if (((o = o.listener), a !== i && l.isPropagationStopped())) break e;
          (ho(l, o, c), (i = a));
        }
      else
        for (s = 0; s < r.length; s++) {
          if (
            ((o = r[s]),
            (a = o.instance),
            (c = o.currentTarget),
            (o = o.listener),
            a !== i && l.isPropagationStopped())
          )
            break e;
          (ho(l, o, c), (i = a));
        }
    }
  }
  if (Dr) throw ((e = pi), (Dr = !1), (pi = null), e);
}
function D(e, t) {
  var n = t[_i];
  n === void 0 && (n = t[_i] = new Set());
  var r = e + '__bubble';
  n.has(r) || (iu(t, e, 2, !1), n.add(r));
}
function Il(e, t, n) {
  var r = 0;
  (t && (r |= 4), iu(n, e, r, t));
}
var dr = '_reactListening' + Math.random().toString(36).slice(2);
function Un(e) {
  if (!e[dr]) {
    ((e[dr] = !0),
      pa.forEach(function (n) {
        n !== 'selectionchange' && (ep.has(n) || Il(n, !1, e), Il(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[dr] || ((t[dr] = !0), Il('selectionchange', !1, t));
  }
}
function iu(e, t, n, r) {
  switch (Aa(t)) {
    case 1:
      var l = hd;
      break;
    case 4:
      l = md;
      break;
    default:
      l = ls;
  }
  ((n = l.bind(null, t, n, e)),
    (l = void 0),
    !di ||
      (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
        ? e.addEventListener(t, n, { passive: l })
        : e.addEventListener(t, n, !1));
}
function Fl(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var s = r.tag;
      if (s === 3 || s === 4) {
        var o = r.stateNode.containerInfo;
        if (o === l || (o.nodeType === 8 && o.parentNode === l)) break;
        if (s === 4)
          for (s = r.return; s !== null; ) {
            var a = s.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = s.stateNode.containerInfo),
              a === l || (a.nodeType === 8 && a.parentNode === l))
            )
              return;
            s = s.return;
          }
        for (; o !== null; ) {
          if (((s = xt(o)), s === null)) return;
          if (((a = s.tag), a === 5 || a === 6)) {
            r = i = s;
            continue e;
          }
          o = o.parentNode;
        }
      }
      r = r.return;
    }
  ja(function () {
    var c = i,
      v = es(n),
      m = [];
    e: {
      var h = ru.get(e);
      if (h !== void 0) {
        var w = ss,
          k = e;
        switch (e) {
          case 'keypress':
            if (Er(n) === 0) break e;
          case 'keydown':
          case 'keyup':
            w = zd;
            break;
          case 'focusin':
            ((k = 'focus'), (w = Ll));
            break;
          case 'focusout':
            ((k = 'blur'), (w = Ll));
            break;
          case 'beforeblur':
          case 'afterblur':
            w = Ll;
            break;
          case 'click':
            if (n.button === 2) break e;
          case 'auxclick':
          case 'dblclick':
          case 'mousedown':
          case 'mousemove':
          case 'mouseup':
          case 'mouseout':
          case 'mouseover':
          case 'contextmenu':
            w = to;
            break;
          case 'drag':
          case 'dragend':
          case 'dragenter':
          case 'dragexit':
          case 'dragleave':
          case 'dragover':
          case 'dragstart':
          case 'drop':
            w = gd;
            break;
          case 'touchcancel':
          case 'touchend':
          case 'touchmove':
          case 'touchstart':
            w = Md;
            break;
          case ba:
          case eu:
          case tu:
            w = xd;
            break;
          case nu:
            w = Bd;
            break;
          case 'scroll':
            w = vd;
            break;
          case 'wheel':
            w = Id;
            break;
          case 'copy':
          case 'cut':
          case 'paste':
            w = Sd;
            break;
          case 'gotpointercapture':
          case 'lostpointercapture':
          case 'pointercancel':
          case 'pointerdown':
          case 'pointermove':
          case 'pointerout':
          case 'pointerover':
          case 'pointerup':
            w = ro;
        }
        var _ = (t & 4) !== 0,
          O = !_ && e === 'scroll',
          d = _ ? (h !== null ? h + 'Capture' : null) : h;
        _ = [];
        for (var u = c, p; u !== null; ) {
          p = u;
          var y = p.stateNode;
          if (
            (p.tag === 5 &&
              y !== null &&
              ((p = y),
              d !== null && ((y = On(u, d)), y != null && _.push($n(u, y, p)))),
            O)
          )
            break;
          u = u.return;
        }
        0 < _.length &&
          ((h = new w(h, k, null, n, v)), m.push({ event: h, listeners: _ }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((h = e === 'mouseover' || e === 'pointerover'),
          (w = e === 'mouseout' || e === 'pointerout'),
          h &&
            n !== ui &&
            (k = n.relatedTarget || n.fromElement) &&
            (xt(k) || k[Qe]))
        )
          break e;
        if (
          (w || h) &&
          ((h =
            v.window === v
              ? v
              : (h = v.ownerDocument)
                ? h.defaultView || h.parentWindow
                : window),
          w
            ? ((k = n.relatedTarget || n.toElement),
              (w = c),
              (k = k ? xt(k) : null),
              k !== null &&
                ((O = Rt(k)), k !== O || (k.tag !== 5 && k.tag !== 6)) &&
                (k = null))
            : ((w = null), (k = c)),
          w !== k)
        ) {
          if (
            ((_ = to),
            (y = 'onMouseLeave'),
            (d = 'onMouseEnter'),
            (u = 'mouse'),
            (e === 'pointerout' || e === 'pointerover') &&
              ((_ = ro),
              (y = 'onPointerLeave'),
              (d = 'onPointerEnter'),
              (u = 'pointer')),
            (O = w == null ? h : Zt(w)),
            (p = k == null ? h : Zt(k)),
            (h = new _(y, u + 'leave', w, n, v)),
            (h.target = O),
            (h.relatedTarget = p),
            (y = null),
            xt(v) === c &&
              ((_ = new _(d, u + 'enter', k, n, v)),
              (_.target = p),
              (_.relatedTarget = O),
              (y = _)),
            (O = y),
            w && k)
          )
            t: {
              for (_ = w, d = k, u = 0, p = _; p; p = Mt(p)) u++;
              for (p = 0, y = d; y; y = Mt(y)) p++;
              for (; 0 < u - p; ) ((_ = Mt(_)), u--);
              for (; 0 < p - u; ) ((d = Mt(d)), p--);
              for (; u--; ) {
                if (_ === d || (d !== null && _ === d.alternate)) break t;
                ((_ = Mt(_)), (d = Mt(d)));
              }
              _ = null;
            }
          else _ = null;
          (w !== null && mo(m, h, w, _, !1),
            k !== null && O !== null && mo(m, O, k, _, !0));
        }
      }
      e: {
        if (
          ((h = c ? Zt(c) : window),
          (w = h.nodeName && h.nodeName.toLowerCase()),
          w === 'select' || (w === 'input' && h.type === 'file'))
        )
          var x = Wd;
        else if (so(h))
          if (Ka) x = Kd;
          else {
            x = Yd;
            var C = Hd;
          }
        else
          (w = h.nodeName) &&
            w.toLowerCase() === 'input' &&
            (h.type === 'checkbox' || h.type === 'radio') &&
            (x = Qd);
        if (x && (x = x(e, c))) {
          Qa(m, x, n, v);
          break e;
        }
        (C && C(e, h, c),
          e === 'focusout' &&
            (C = h._wrapperState) &&
            C.controlled &&
            h.type === 'number' &&
            li(h, 'number', h.value));
      }
      switch (((C = c ? Zt(c) : window), e)) {
        case 'focusin':
          (so(C) || C.contentEditable === 'true') &&
            ((It = C), (vi = c), (Tn = null));
          break;
        case 'focusout':
          Tn = vi = It = null;
          break;
        case 'mousedown':
          yi = !0;
          break;
        case 'contextmenu':
        case 'mouseup':
        case 'dragend':
          ((yi = !1), po(m, n, v));
          break;
        case 'selectionchange':
          if (Jd) break;
        case 'keydown':
        case 'keyup':
          po(m, n, v);
      }
      var N;
      if (as)
        e: {
          switch (e) {
            case 'compositionstart':
              var T = 'onCompositionStart';
              break e;
            case 'compositionend':
              T = 'onCompositionEnd';
              break e;
            case 'compositionupdate':
              T = 'onCompositionUpdate';
              break e;
          }
          T = void 0;
        }
      else
        Dt
          ? Ha(e, n) && (T = 'onCompositionEnd')
          : e === 'keydown' && n.keyCode === 229 && (T = 'onCompositionStart');
      (T &&
        (Wa &&
          n.locale !== 'ko' &&
          (Dt || T !== 'onCompositionStart'
            ? T === 'onCompositionEnd' && Dt && (N = Va())
            : ((nt = v),
              (is = 'value' in nt ? nt.value : nt.textContent),
              (Dt = !0))),
        (C = $r(c, T)),
        0 < C.length &&
          ((T = new no(T, e, null, n, v)),
          m.push({ event: T, listeners: C }),
          N ? (T.data = N) : ((N = Ya(n)), N !== null && (T.data = N)))),
        (N = Zd ? Ud(e, n) : $d(e, n)) &&
          ((c = $r(c, 'onBeforeInput')),
          0 < c.length &&
            ((v = new no('onBeforeInput', 'beforeinput', null, n, v)),
            m.push({ event: v, listeners: c }),
            (v.data = N))));
    }
    lu(m, t);
  });
}
function $n(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function $r(e, t) {
  for (var n = t + 'Capture', r = []; e !== null; ) {
    var l = e,
      i = l.stateNode;
    (l.tag === 5 &&
      i !== null &&
      ((l = i),
      (i = On(e, n)),
      i != null && r.unshift($n(e, i, l)),
      (i = On(e, t)),
      i != null && r.push($n(e, i, l))),
      (e = e.return));
  }
  return r;
}
function Mt(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function mo(e, t, n, r, l) {
  for (var i = t._reactName, s = []; n !== null && n !== r; ) {
    var o = n,
      a = o.alternate,
      c = o.stateNode;
    if (a !== null && a === r) break;
    (o.tag === 5 &&
      c !== null &&
      ((o = c),
      l
        ? ((a = On(n, i)), a != null && s.unshift($n(n, a, o)))
        : l || ((a = On(n, i)), a != null && s.push($n(n, a, o)))),
      (n = n.return));
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var tp = /\r\n?/g,
  np = /\u0000|\uFFFD/g;
function vo(e) {
  return (typeof e == 'string' ? e : '' + e)
    .replace(
      tp,
      `
`
    )
    .replace(np, '');
}
function pr(e, t, n) {
  if (((t = vo(t)), vo(e) !== t && n)) throw Error(g(425));
}
function Ar() {}
var gi = null,
  wi = null;
function ki(e, t) {
  return (
    e === 'textarea' ||
    e === 'noscript' ||
    typeof t.children == 'string' ||
    typeof t.children == 'number' ||
    (typeof t.dangerouslySetInnerHTML == 'object' &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var xi = typeof setTimeout == 'function' ? setTimeout : void 0,
  rp = typeof clearTimeout == 'function' ? clearTimeout : void 0,
  yo = typeof Promise == 'function' ? Promise : void 0,
  lp =
    typeof queueMicrotask == 'function'
      ? queueMicrotask
      : typeof yo < 'u'
        ? function (e) {
            return yo.resolve(null).then(e).catch(ip);
          }
        : xi;
function ip(e) {
  setTimeout(function () {
    throw e;
  });
}
function Zl(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === '/$')) {
        if (r === 0) {
          (e.removeChild(l), In(t));
          return;
        }
        r--;
      } else (n !== '$' && n !== '$?' && n !== '$!') || r++;
    n = l;
  } while (n);
  In(t);
}
function ot(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break;
      if (t === '/$') return null;
    }
  }
  return e;
}
function go(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === '$' || n === '$!' || n === '$?') {
        if (t === 0) return e;
        t--;
      } else n === '/$' && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var an = Math.random().toString(36).slice(2),
  Fe = '__reactFiber$' + an,
  An = '__reactProps$' + an,
  Qe = '__reactContainer$' + an,
  _i = '__reactEvents$' + an,
  sp = '__reactListeners$' + an,
  op = '__reactHandles$' + an;
function xt(e) {
  var t = e[Fe];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[Qe] || n[Fe])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = go(e); e !== null; ) {
          if ((n = e[Fe])) return n;
          e = go(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function qn(e) {
  return (
    (e = e[Fe] || e[Qe]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Zt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(g(33));
}
function ul(e) {
  return e[An] || null;
}
var Si = [],
  Ut = -1;
function mt(e) {
  return { current: e };
}
function I(e) {
  0 > Ut || ((e.current = Si[Ut]), (Si[Ut] = null), Ut--);
}
function B(e, t) {
  (Ut++, (Si[Ut] = e.current), (e.current = t));
}
var ft = {},
  se = mt(ft),
  fe = mt(!1),
  Nt = ft;
function bt(e, t) {
  var n = e.type.contextTypes;
  if (!n) return ft;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    i;
  for (i in n) l[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function he(e) {
  return ((e = e.childContextTypes), e != null);
}
function Vr() {
  (I(fe), I(se));
}
function wo(e, t, n) {
  if (se.current !== ft) throw Error(g(168));
  (B(se, t), B(fe, n));
}
function su(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != 'function'))
    return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(g(108, Hc(e) || 'Unknown', l));
  return $({}, n, r);
}
function Wr(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || ft),
    (Nt = se.current),
    B(se, e),
    B(fe, fe.current),
    !0
  );
}
function ko(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(g(169));
  (n
    ? ((e = su(e, t, Nt)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      I(fe),
      I(se),
      B(se, e))
    : I(fe),
    B(fe, n));
}
var Ae = null,
  cl = !1,
  Ul = !1;
function ou(e) {
  Ae === null ? (Ae = [e]) : Ae.push(e);
}
function ap(e) {
  ((cl = !0), ou(e));
}
function vt() {
  if (!Ul && Ae !== null) {
    Ul = !0;
    var e = 0,
      t = M;
    try {
      var n = Ae;
      for (M = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      ((Ae = null), (cl = !1));
    } catch (l) {
      throw (Ae !== null && (Ae = Ae.slice(e + 1)), Ra(ts, vt), l);
    } finally {
      ((M = t), (Ul = !1));
    }
  }
  return null;
}
var $t = [],
  At = 0,
  Hr = null,
  Yr = 0,
  _e = [],
  Se = 0,
  Tt = null,
  Ve = 1,
  We = '';
function wt(e, t) {
  (($t[At++] = Yr), ($t[At++] = Hr), (Hr = e), (Yr = t));
}
function au(e, t, n) {
  ((_e[Se++] = Ve), (_e[Se++] = We), (_e[Se++] = Tt), (Tt = e));
  var r = Ve;
  e = We;
  var l = 32 - Me(r) - 1;
  ((r &= ~(1 << l)), (n += 1));
  var i = 32 - Me(t) + l;
  if (30 < i) {
    var s = l - (l % 5);
    ((i = (r & ((1 << s) - 1)).toString(32)),
      (r >>= s),
      (l -= s),
      (Ve = (1 << (32 - Me(t) + l)) | (n << l) | r),
      (We = i + e));
  } else ((Ve = (1 << i) | (n << l) | r), (We = e));
}
function cs(e) {
  e.return !== null && (wt(e, 1), au(e, 1, 0));
}
function ds(e) {
  for (; e === Hr; )
    ((Hr = $t[--At]), ($t[At] = null), (Yr = $t[--At]), ($t[At] = null));
  for (; e === Tt; )
    ((Tt = _e[--Se]),
      (_e[Se] = null),
      (We = _e[--Se]),
      (_e[Se] = null),
      (Ve = _e[--Se]),
      (_e[Se] = null));
}
var ge = null,
  ye = null,
  F = !1,
  Re = null;
function uu(e, t) {
  var n = Ee(5, null, null, 0);
  ((n.elementType = 'DELETED'),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function xo(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (ge = e), (ye = ot(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (ge = e), (ye = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Tt !== null ? { id: Ve, overflow: We } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Ee(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (ge = e),
            (ye = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Ei(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ci(e) {
  if (F) {
    var t = ye;
    if (t) {
      var n = t;
      if (!xo(e, t)) {
        if (Ei(e)) throw Error(g(418));
        t = ot(n.nextSibling);
        var r = ge;
        t && xo(e, t)
          ? uu(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (F = !1), (ge = e));
      }
    } else {
      if (Ei(e)) throw Error(g(418));
      ((e.flags = (e.flags & -4097) | 2), (F = !1), (ge = e));
    }
  }
}
function _o(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  ge = e;
}
function fr(e) {
  if (e !== ge) return !1;
  if (!F) return (_o(e), (F = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== 'head' && t !== 'body' && !ki(e.type, e.memoizedProps))),
    t && (t = ye))
  ) {
    if (Ei(e)) throw (cu(), Error(g(418)));
    for (; t; ) (uu(e, t), (t = ot(t.nextSibling)));
  }
  if ((_o(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(g(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === '/$') {
            if (t === 0) {
              ye = ot(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== '$' && n !== '$!' && n !== '$?') || t++;
        }
        e = e.nextSibling;
      }
      ye = null;
    }
  } else ye = ge ? ot(e.stateNode.nextSibling) : null;
  return !0;
}
function cu() {
  for (var e = ye; e; ) e = ot(e.nextSibling);
}
function en() {
  ((ye = ge = null), (F = !1));
}
function ps(e) {
  Re === null ? (Re = [e]) : Re.push(e);
}
var up = Xe.ReactCurrentBatchConfig;
function vn(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != 'function' && typeof e != 'object')
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(g(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(g(147, e));
      var l = r,
        i = '' + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == 'function' &&
        t.ref._stringRef === i
        ? t.ref
        : ((t = function (s) {
            var o = l.refs;
            s === null ? delete o[i] : (o[i] = s);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != 'string') throw Error(g(284));
    if (!n._owner) throw Error(g(290, e));
  }
  return e;
}
function hr(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      g(
        31,
        e === '[object Object]'
          ? 'object with keys {' + Object.keys(t).join(', ') + '}'
          : e
      )
    )
  );
}
function So(e) {
  var t = e._init;
  return t(e._payload);
}
function du(e) {
  function t(d, u) {
    if (e) {
      var p = d.deletions;
      p === null ? ((d.deletions = [u]), (d.flags |= 16)) : p.push(u);
    }
  }
  function n(d, u) {
    if (!e) return null;
    for (; u !== null; ) (t(d, u), (u = u.sibling));
    return null;
  }
  function r(d, u) {
    for (d = new Map(); u !== null; )
      (u.key !== null ? d.set(u.key, u) : d.set(u.index, u), (u = u.sibling));
    return d;
  }
  function l(d, u) {
    return ((d = dt(d, u)), (d.index = 0), (d.sibling = null), d);
  }
  function i(d, u, p) {
    return (
      (d.index = p),
      e
        ? ((p = d.alternate),
          p !== null
            ? ((p = p.index), p < u ? ((d.flags |= 2), u) : p)
            : ((d.flags |= 2), u))
        : ((d.flags |= 1048576), u)
    );
  }
  function s(d) {
    return (e && d.alternate === null && (d.flags |= 2), d);
  }
  function o(d, u, p, y) {
    return u === null || u.tag !== 6
      ? ((u = Ql(p, d.mode, y)), (u.return = d), u)
      : ((u = l(u, p)), (u.return = d), u);
  }
  function a(d, u, p, y) {
    var x = p.type;
    return x === Bt
      ? v(d, u, p.props.children, y, p.key)
      : u !== null &&
          (u.elementType === x ||
            (typeof x == 'object' &&
              x !== null &&
              x.$$typeof === qe &&
              So(x) === u.type))
        ? ((y = l(u, p.props)), (y.ref = vn(d, u, p)), (y.return = d), y)
        : ((y = Lr(p.type, p.key, p.props, null, d.mode, y)),
          (y.ref = vn(d, u, p)),
          (y.return = d),
          y);
  }
  function c(d, u, p, y) {
    return u === null ||
      u.tag !== 4 ||
      u.stateNode.containerInfo !== p.containerInfo ||
      u.stateNode.implementation !== p.implementation
      ? ((u = Kl(p, d.mode, y)), (u.return = d), u)
      : ((u = l(u, p.children || [])), (u.return = d), u);
  }
  function v(d, u, p, y, x) {
    return u === null || u.tag !== 7
      ? ((u = Ct(p, d.mode, y, x)), (u.return = d), u)
      : ((u = l(u, p)), (u.return = d), u);
  }
  function m(d, u, p) {
    if ((typeof u == 'string' && u !== '') || typeof u == 'number')
      return ((u = Ql('' + u, d.mode, p)), (u.return = d), u);
    if (typeof u == 'object' && u !== null) {
      switch (u.$$typeof) {
        case rr:
          return (
            (p = Lr(u.type, u.key, u.props, null, d.mode, p)),
            (p.ref = vn(d, null, u)),
            (p.return = d),
            p
          );
        case Ot:
          return ((u = Kl(u, d.mode, p)), (u.return = d), u);
        case qe:
          var y = u._init;
          return m(d, y(u._payload), p);
      }
      if (kn(u) || dn(u))
        return ((u = Ct(u, d.mode, p, null)), (u.return = d), u);
      hr(d, u);
    }
    return null;
  }
  function h(d, u, p, y) {
    var x = u !== null ? u.key : null;
    if ((typeof p == 'string' && p !== '') || typeof p == 'number')
      return x !== null ? null : o(d, u, '' + p, y);
    if (typeof p == 'object' && p !== null) {
      switch (p.$$typeof) {
        case rr:
          return p.key === x ? a(d, u, p, y) : null;
        case Ot:
          return p.key === x ? c(d, u, p, y) : null;
        case qe:
          return ((x = p._init), h(d, u, x(p._payload), y));
      }
      if (kn(p) || dn(p)) return x !== null ? null : v(d, u, p, y, null);
      hr(d, p);
    }
    return null;
  }
  function w(d, u, p, y, x) {
    if ((typeof y == 'string' && y !== '') || typeof y == 'number')
      return ((d = d.get(p) || null), o(u, d, '' + y, x));
    if (typeof y == 'object' && y !== null) {
      switch (y.$$typeof) {
        case rr:
          return (
            (d = d.get(y.key === null ? p : y.key) || null),
            a(u, d, y, x)
          );
        case Ot:
          return (
            (d = d.get(y.key === null ? p : y.key) || null),
            c(u, d, y, x)
          );
        case qe:
          var C = y._init;
          return w(d, u, p, C(y._payload), x);
      }
      if (kn(y) || dn(y)) return ((d = d.get(p) || null), v(u, d, y, x, null));
      hr(u, y);
    }
    return null;
  }
  function k(d, u, p, y) {
    for (
      var x = null, C = null, N = u, T = (u = 0), V = null;
      N !== null && T < p.length;
      T++
    ) {
      N.index > T ? ((V = N), (N = null)) : (V = N.sibling);
      var L = h(d, N, p[T], y);
      if (L === null) {
        N === null && (N = V);
        break;
      }
      (e && N && L.alternate === null && t(d, N),
        (u = i(L, u, T)),
        C === null ? (x = L) : (C.sibling = L),
        (C = L),
        (N = V));
    }
    if (T === p.length) return (n(d, N), F && wt(d, T), x);
    if (N === null) {
      for (; T < p.length; T++)
        ((N = m(d, p[T], y)),
          N !== null &&
            ((u = i(N, u, T)),
            C === null ? (x = N) : (C.sibling = N),
            (C = N)));
      return (F && wt(d, T), x);
    }
    for (N = r(d, N); T < p.length; T++)
      ((V = w(N, d, T, p[T], y)),
        V !== null &&
          (e && V.alternate !== null && N.delete(V.key === null ? T : V.key),
          (u = i(V, u, T)),
          C === null ? (x = V) : (C.sibling = V),
          (C = V)));
    return (
      e &&
        N.forEach(function (je) {
          return t(d, je);
        }),
      F && wt(d, T),
      x
    );
  }
  function _(d, u, p, y) {
    var x = dn(p);
    if (typeof x != 'function') throw Error(g(150));
    if (((p = x.call(p)), p == null)) throw Error(g(151));
    for (
      var C = (x = null), N = u, T = (u = 0), V = null, L = p.next();
      N !== null && !L.done;
      T++, L = p.next()
    ) {
      N.index > T ? ((V = N), (N = null)) : (V = N.sibling);
      var je = h(d, N, L.value, y);
      if (je === null) {
        N === null && (N = V);
        break;
      }
      (e && N && je.alternate === null && t(d, N),
        (u = i(je, u, T)),
        C === null ? (x = je) : (C.sibling = je),
        (C = je),
        (N = V));
    }
    if (L.done) return (n(d, N), F && wt(d, T), x);
    if (N === null) {
      for (; !L.done; T++, L = p.next())
        ((L = m(d, L.value, y)),
          L !== null &&
            ((u = i(L, u, T)),
            C === null ? (x = L) : (C.sibling = L),
            (C = L)));
      return (F && wt(d, T), x);
    }
    for (N = r(d, N); !L.done; T++, L = p.next())
      ((L = w(N, d, T, L.value, y)),
        L !== null &&
          (e && L.alternate !== null && N.delete(L.key === null ? T : L.key),
          (u = i(L, u, T)),
          C === null ? (x = L) : (C.sibling = L),
          (C = L)));
    return (
      e &&
        N.forEach(function (un) {
          return t(d, un);
        }),
      F && wt(d, T),
      x
    );
  }
  function O(d, u, p, y) {
    if (
      (typeof p == 'object' &&
        p !== null &&
        p.type === Bt &&
        p.key === null &&
        (p = p.props.children),
      typeof p == 'object' && p !== null)
    ) {
      switch (p.$$typeof) {
        case rr:
          e: {
            for (var x = p.key, C = u; C !== null; ) {
              if (C.key === x) {
                if (((x = p.type), x === Bt)) {
                  if (C.tag === 7) {
                    (n(d, C.sibling),
                      (u = l(C, p.props.children)),
                      (u.return = d),
                      (d = u));
                    break e;
                  }
                } else if (
                  C.elementType === x ||
                  (typeof x == 'object' &&
                    x !== null &&
                    x.$$typeof === qe &&
                    So(x) === C.type)
                ) {
                  (n(d, C.sibling),
                    (u = l(C, p.props)),
                    (u.ref = vn(d, C, p)),
                    (u.return = d),
                    (d = u));
                  break e;
                }
                n(d, C);
                break;
              } else t(d, C);
              C = C.sibling;
            }
            p.type === Bt
              ? ((u = Ct(p.props.children, d.mode, y, p.key)),
                (u.return = d),
                (d = u))
              : ((y = Lr(p.type, p.key, p.props, null, d.mode, y)),
                (y.ref = vn(d, u, p)),
                (y.return = d),
                (d = y));
          }
          return s(d);
        case Ot:
          e: {
            for (C = p.key; u !== null; ) {
              if (u.key === C)
                if (
                  u.tag === 4 &&
                  u.stateNode.containerInfo === p.containerInfo &&
                  u.stateNode.implementation === p.implementation
                ) {
                  (n(d, u.sibling),
                    (u = l(u, p.children || [])),
                    (u.return = d),
                    (d = u));
                  break e;
                } else {
                  n(d, u);
                  break;
                }
              else t(d, u);
              u = u.sibling;
            }
            ((u = Kl(p, d.mode, y)), (u.return = d), (d = u));
          }
          return s(d);
        case qe:
          return ((C = p._init), O(d, u, C(p._payload), y));
      }
      if (kn(p)) return k(d, u, p, y);
      if (dn(p)) return _(d, u, p, y);
      hr(d, p);
    }
    return (typeof p == 'string' && p !== '') || typeof p == 'number'
      ? ((p = '' + p),
        u !== null && u.tag === 6
          ? (n(d, u.sibling), (u = l(u, p)), (u.return = d), (d = u))
          : (n(d, u), (u = Ql(p, d.mode, y)), (u.return = d), (d = u)),
        s(d))
      : n(d, u);
  }
  return O;
}
var tn = du(!0),
  pu = du(!1),
  Qr = mt(null),
  Kr = null,
  Vt = null,
  fs = null;
function hs() {
  fs = Vt = Kr = null;
}
function ms(e) {
  var t = Qr.current;
  (I(Qr), (e._currentValue = t));
}
function Ni(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Xt(e, t) {
  ((Kr = e),
    (fs = Vt = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (pe = !0), (e.firstContext = null)));
}
function Ne(e) {
  var t = e._currentValue;
  if (fs !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Vt === null)) {
      if (Kr === null) throw Error(g(308));
      ((Vt = e), (Kr.dependencies = { lanes: 0, firstContext: e }));
    } else Vt = Vt.next = e;
  return t;
}
var _t = null;
function vs(e) {
  _t === null ? (_t = [e]) : _t.push(e);
}
function fu(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), vs(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    Ke(e, r)
  );
}
function Ke(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    ((e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return));
  return n.tag === 3 ? n.stateNode : null;
}
var be = !1;
function ys(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function hu(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }));
}
function He(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function at(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), R & 2)) {
    var l = r.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      Ke(e, n)
    );
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), vs(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    Ke(e, n)
  );
}
function Cr(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), ns(e, n));
  }
}
function Eo(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var s = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        (i === null ? (l = i = s) : (i = i.next = s), (n = n.next));
      } while (n !== null);
      i === null ? (l = i = t) : (i = i.next = t);
    } else l = i = t;
    ((n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n));
    return;
  }
  ((e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t));
}
function Gr(e, t, n, r) {
  var l = e.updateQueue;
  be = !1;
  var i = l.firstBaseUpdate,
    s = l.lastBaseUpdate,
    o = l.shared.pending;
  if (o !== null) {
    l.shared.pending = null;
    var a = o,
      c = a.next;
    ((a.next = null), s === null ? (i = c) : (s.next = c), (s = a));
    var v = e.alternate;
    v !== null &&
      ((v = v.updateQueue),
      (o = v.lastBaseUpdate),
      o !== s &&
        (o === null ? (v.firstBaseUpdate = c) : (o.next = c),
        (v.lastBaseUpdate = a)));
  }
  if (i !== null) {
    var m = l.baseState;
    ((s = 0), (v = c = a = null), (o = i));
    do {
      var h = o.lane,
        w = o.eventTime;
      if ((r & h) === h) {
        v !== null &&
          (v = v.next =
            {
              eventTime: w,
              lane: 0,
              tag: o.tag,
              payload: o.payload,
              callback: o.callback,
              next: null,
            });
        e: {
          var k = e,
            _ = o;
          switch (((h = t), (w = n), _.tag)) {
            case 1:
              if (((k = _.payload), typeof k == 'function')) {
                m = k.call(w, m, h);
                break e;
              }
              m = k;
              break e;
            case 3:
              k.flags = (k.flags & -65537) | 128;
            case 0:
              if (
                ((k = _.payload),
                (h = typeof k == 'function' ? k.call(w, m, h) : k),
                h == null)
              )
                break e;
              m = $({}, m, h);
              break e;
            case 2:
              be = !0;
          }
        }
        o.callback !== null &&
          o.lane !== 0 &&
          ((e.flags |= 64),
          (h = l.effects),
          h === null ? (l.effects = [o]) : h.push(o));
      } else
        ((w = {
          eventTime: w,
          lane: h,
          tag: o.tag,
          payload: o.payload,
          callback: o.callback,
          next: null,
        }),
          v === null ? ((c = v = w), (a = m)) : (v = v.next = w),
          (s |= h));
      if (((o = o.next), o === null)) {
        if (((o = l.shared.pending), o === null)) break;
        ((h = o),
          (o = h.next),
          (h.next = null),
          (l.lastBaseUpdate = h),
          (l.shared.pending = null));
      }
    } while (!0);
    if (
      (v === null && (a = m),
      (l.baseState = a),
      (l.firstBaseUpdate = c),
      (l.lastBaseUpdate = v),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do ((s |= l.lane), (l = l.next));
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    ((Pt |= s), (e.lanes = s), (e.memoizedState = m));
  }
}
function Co(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != 'function'))
          throw Error(g(191, l));
        l.call(r);
      }
    }
}
var bn = {},
  Ue = mt(bn),
  Vn = mt(bn),
  Wn = mt(bn);
function St(e) {
  if (e === bn) throw Error(g(174));
  return e;
}
function gs(e, t) {
  switch ((B(Wn, t), B(Vn, e), B(Ue, bn), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : si(null, '');
      break;
    default:
      ((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = si(t, e)));
  }
  (I(Ue), B(Ue, t));
}
function nn() {
  (I(Ue), I(Vn), I(Wn));
}
function mu(e) {
  St(Wn.current);
  var t = St(Ue.current),
    n = si(t, e.type);
  t !== n && (B(Vn, e), B(Ue, n));
}
function ws(e) {
  Vn.current === e && (I(Ue), I(Vn));
}
var Z = mt(0);
function Xr(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === '$?' || n.data === '$!')
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var $l = [];
function ks() {
  for (var e = 0; e < $l.length; e++)
    $l[e]._workInProgressVersionPrimary = null;
  $l.length = 0;
}
var Nr = Xe.ReactCurrentDispatcher,
  Al = Xe.ReactCurrentBatchConfig,
  jt = 0,
  U = null,
  Q = null,
  J = null,
  Jr = !1,
  jn = !1,
  Hn = 0,
  cp = 0;
function re() {
  throw Error(g(321));
}
function xs(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Be(e[n], t[n])) return !1;
  return !0;
}
function _s(e, t, n, r, l, i) {
  if (
    ((jt = i),
    (U = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Nr.current = e === null || e.memoizedState === null ? hp : mp),
    (e = n(r, l)),
    jn)
  ) {
    i = 0;
    do {
      if (((jn = !1), (Hn = 0), 25 <= i)) throw Error(g(301));
      ((i += 1),
        (J = Q = null),
        (t.updateQueue = null),
        (Nr.current = vp),
        (e = n(r, l)));
    } while (jn);
  }
  if (
    ((Nr.current = qr),
    (t = Q !== null && Q.next !== null),
    (jt = 0),
    (J = Q = U = null),
    (Jr = !1),
    t)
  )
    throw Error(g(300));
  return e;
}
function Ss() {
  var e = Hn !== 0;
  return ((Hn = 0), e);
}
function Ie() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (J === null ? (U.memoizedState = J = e) : (J = J.next = e), J);
}
function Te() {
  if (Q === null) {
    var e = U.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Q.next;
  var t = J === null ? U.memoizedState : J.next;
  if (t !== null) ((J = t), (Q = e));
  else {
    if (e === null) throw Error(g(310));
    ((Q = e),
      (e = {
        memoizedState: Q.memoizedState,
        baseState: Q.baseState,
        baseQueue: Q.baseQueue,
        queue: Q.queue,
        next: null,
      }),
      J === null ? (U.memoizedState = J = e) : (J = J.next = e));
  }
  return J;
}
function Yn(e, t) {
  return typeof t == 'function' ? t(e) : t;
}
function Vl(e) {
  var t = Te(),
    n = t.queue;
  if (n === null) throw Error(g(311));
  n.lastRenderedReducer = e;
  var r = Q,
    l = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var s = l.next;
      ((l.next = i.next), (i.next = s));
    }
    ((r.baseQueue = l = i), (n.pending = null));
  }
  if (l !== null) {
    ((i = l.next), (r = r.baseState));
    var o = (s = null),
      a = null,
      c = i;
    do {
      var v = c.lane;
      if ((jt & v) === v)
        (a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: c.action,
              hasEagerState: c.hasEagerState,
              eagerState: c.eagerState,
              next: null,
            }),
          (r = c.hasEagerState ? c.eagerState : e(r, c.action)));
      else {
        var m = {
          lane: v,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null,
        };
        (a === null ? ((o = a = m), (s = r)) : (a = a.next = m),
          (U.lanes |= v),
          (Pt |= v));
      }
      c = c.next;
    } while (c !== null && c !== i);
    (a === null ? (s = r) : (a.next = o),
      Be(r, t.memoizedState) || (pe = !0),
      (t.memoizedState = r),
      (t.baseState = s),
      (t.baseQueue = a),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do ((i = l.lane), (U.lanes |= i), (Pt |= i), (l = l.next));
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Wl(e) {
  var t = Te(),
    n = t.queue;
  if (n === null) throw Error(g(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var s = (l = l.next);
    do ((i = e(i, s.action)), (s = s.next));
    while (s !== l);
    (Be(i, t.memoizedState) || (pe = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i));
  }
  return [i, r];
}
function vu() {}
function yu(e, t) {
  var n = U,
    r = Te(),
    l = t(),
    i = !Be(r.memoizedState, l);
  if (
    (i && ((r.memoizedState = l), (pe = !0)),
    (r = r.queue),
    Es(ku.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (J !== null && J.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Qn(9, wu.bind(null, n, r, l, t), void 0, null),
      q === null)
    )
      throw Error(g(349));
    jt & 30 || gu(n, t, l);
  }
  return l;
}
function gu(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = U.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (U.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function wu(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), xu(t) && _u(e));
}
function ku(e, t, n) {
  return n(function () {
    xu(t) && _u(e);
  });
}
function xu(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Be(e, n);
  } catch {
    return !0;
  }
}
function _u(e) {
  var t = Ke(e, 1);
  t !== null && Oe(t, e, 1, -1);
}
function No(e) {
  var t = Ie();
  return (
    typeof e == 'function' && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Yn,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = fp.bind(null, U, e)),
    [t.memoizedState, e]
  );
}
function Qn(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = U.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (U.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Su() {
  return Te().memoizedState;
}
function Tr(e, t, n, r) {
  var l = Ie();
  ((U.flags |= e),
    (l.memoizedState = Qn(1 | t, n, void 0, r === void 0 ? null : r)));
}
function dl(e, t, n, r) {
  var l = Te();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (Q !== null) {
    var s = Q.memoizedState;
    if (((i = s.destroy), r !== null && xs(r, s.deps))) {
      l.memoizedState = Qn(t, n, i, r);
      return;
    }
  }
  ((U.flags |= e), (l.memoizedState = Qn(1 | t, n, i, r)));
}
function To(e, t) {
  return Tr(8390656, 8, e, t);
}
function Es(e, t) {
  return dl(2048, 8, e, t);
}
function Eu(e, t) {
  return dl(4, 2, e, t);
}
function Cu(e, t) {
  return dl(4, 4, e, t);
}
function Nu(e, t) {
  if (typeof t == 'function')
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Tu(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null),
    dl(4, 4, Nu.bind(null, t, e), n)
  );
}
function Cs() {}
function ju(e, t) {
  var n = Te();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && xs(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function Pu(e, t) {
  var n = Te();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && xs(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function zu(e, t, n) {
  return jt & 21
    ? (Be(n, t) || ((n = Ba()), (U.lanes |= n), (Pt |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (pe = !0)), (e.memoizedState = n));
}
function dp(e, t) {
  var n = M;
  ((M = n !== 0 && 4 > n ? n : 4), e(!0));
  var r = Al.transition;
  Al.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((M = n), (Al.transition = r));
  }
}
function Lu() {
  return Te().memoizedState;
}
function pp(e, t, n) {
  var r = ct(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Ru(e))
  )
    Mu(t, n);
  else if (((n = fu(e, t, n, r)), n !== null)) {
    var l = ae();
    (Oe(n, e, r, l), Ou(n, t, r));
  }
}
function fp(e, t, n) {
  var r = ct(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Ru(e)) Mu(t, l);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var s = t.lastRenderedState,
          o = i(s, n);
        if (((l.hasEagerState = !0), (l.eagerState = o), Be(o, s))) {
          var a = t.interleaved;
          (a === null
            ? ((l.next = l), vs(t))
            : ((l.next = a.next), (a.next = l)),
            (t.interleaved = l));
          return;
        }
      } catch {
      } finally {
      }
    ((n = fu(e, t, l, r)),
      n !== null && ((l = ae()), Oe(n, e, r, l), Ou(n, t, r)));
  }
}
function Ru(e) {
  var t = e.alternate;
  return e === U || (t !== null && t === U);
}
function Mu(e, t) {
  jn = Jr = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t));
}
function Ou(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), ns(e, n));
  }
}
var qr = {
    readContext: Ne,
    useCallback: re,
    useContext: re,
    useEffect: re,
    useImperativeHandle: re,
    useInsertionEffect: re,
    useLayoutEffect: re,
    useMemo: re,
    useReducer: re,
    useRef: re,
    useState: re,
    useDebugValue: re,
    useDeferredValue: re,
    useTransition: re,
    useMutableSource: re,
    useSyncExternalStore: re,
    useId: re,
    unstable_isNewReconciler: !1,
  },
  hp = {
    readContext: Ne,
    useCallback: function (e, t) {
      return ((Ie().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: Ne,
    useEffect: To,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Tr(4194308, 4, Nu.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Tr(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Tr(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Ie();
      return (
        (t = t === void 0 ? null : t),
        (e = e()),
        (n.memoizedState = [e, t]),
        e
      );
    },
    useReducer: function (e, t, n) {
      var r = Ie();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = pp.bind(null, U, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Ie();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: No,
    useDebugValue: Cs,
    useDeferredValue: function (e) {
      return (Ie().memoizedState = e);
    },
    useTransition: function () {
      var e = No(!1),
        t = e[0];
      return ((e = dp.bind(null, e[1])), (Ie().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = U,
        l = Ie();
      if (F) {
        if (n === void 0) throw Error(g(407));
        n = n();
      } else {
        if (((n = t()), q === null)) throw Error(g(349));
        jt & 30 || gu(r, t, n);
      }
      l.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (l.queue = i),
        To(ku.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        Qn(9, wu.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Ie(),
        t = q.identifierPrefix;
      if (F) {
        var n = We,
          r = Ve;
        ((n = (r & ~(1 << (32 - Me(r) - 1))).toString(32) + n),
          (t = ':' + t + 'R' + n),
          (n = Hn++),
          0 < n && (t += 'H' + n.toString(32)),
          (t += ':'));
      } else ((n = cp++), (t = ':' + t + 'r' + n.toString(32) + ':'));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  mp = {
    readContext: Ne,
    useCallback: ju,
    useContext: Ne,
    useEffect: Es,
    useImperativeHandle: Tu,
    useInsertionEffect: Eu,
    useLayoutEffect: Cu,
    useMemo: Pu,
    useReducer: Vl,
    useRef: Su,
    useState: function () {
      return Vl(Yn);
    },
    useDebugValue: Cs,
    useDeferredValue: function (e) {
      var t = Te();
      return zu(t, Q.memoizedState, e);
    },
    useTransition: function () {
      var e = Vl(Yn)[0],
        t = Te().memoizedState;
      return [e, t];
    },
    useMutableSource: vu,
    useSyncExternalStore: yu,
    useId: Lu,
    unstable_isNewReconciler: !1,
  },
  vp = {
    readContext: Ne,
    useCallback: ju,
    useContext: Ne,
    useEffect: Es,
    useImperativeHandle: Tu,
    useInsertionEffect: Eu,
    useLayoutEffect: Cu,
    useMemo: Pu,
    useReducer: Wl,
    useRef: Su,
    useState: function () {
      return Wl(Yn);
    },
    useDebugValue: Cs,
    useDeferredValue: function (e) {
      var t = Te();
      return Q === null ? (t.memoizedState = e) : zu(t, Q.memoizedState, e);
    },
    useTransition: function () {
      var e = Wl(Yn)[0],
        t = Te().memoizedState;
      return [e, t];
    },
    useMutableSource: vu,
    useSyncExternalStore: yu,
    useId: Lu,
    unstable_isNewReconciler: !1,
  };
function ze(e, t) {
  if (e && e.defaultProps) {
    ((t = $({}, t)), (e = e.defaultProps));
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Ti(e, t, n, r) {
  ((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : $({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
var pl = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Rt(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = ae(),
      l = ct(e),
      i = He(r, l);
    ((i.payload = t),
      n != null && (i.callback = n),
      (t = at(e, i, l)),
      t !== null && (Oe(t, e, l, r), Cr(t, e, l)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = ae(),
      l = ct(e),
      i = He(r, l);
    ((i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = at(e, i, l)),
      t !== null && (Oe(t, e, l, r), Cr(t, e, l)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = ae(),
      r = ct(e),
      l = He(n, r);
    ((l.tag = 2),
      t != null && (l.callback = t),
      (t = at(e, l, r)),
      t !== null && (Oe(t, e, r, n), Cr(t, e, r)));
  },
};
function jo(e, t, n, r, l, i, s) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == 'function'
      ? e.shouldComponentUpdate(r, i, s)
      : t.prototype && t.prototype.isPureReactComponent
        ? !Zn(n, r) || !Zn(l, i)
        : !0
  );
}
function Bu(e, t, n) {
  var r = !1,
    l = ft,
    i = t.contextType;
  return (
    typeof i == 'object' && i !== null
      ? (i = Ne(i))
      : ((l = he(t) ? Nt : se.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? bt(e, l) : ft)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = pl),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function Po(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == 'function' &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && pl.enqueueReplaceState(t, t.state, null));
}
function ji(e, t, n, r) {
  var l = e.stateNode;
  ((l.props = n), (l.state = e.memoizedState), (l.refs = {}), ys(e));
  var i = t.contextType;
  (typeof i == 'object' && i !== null
    ? (l.context = Ne(i))
    : ((i = he(t) ? Nt : se.current), (l.context = bt(e, i))),
    (l.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == 'function' && (Ti(e, t, i, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == 'function' ||
      typeof l.getSnapshotBeforeUpdate == 'function' ||
      (typeof l.UNSAFE_componentWillMount != 'function' &&
        typeof l.componentWillMount != 'function') ||
      ((t = l.state),
      typeof l.componentWillMount == 'function' && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == 'function' &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && pl.enqueueReplaceState(l, l.state, null),
      Gr(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == 'function' && (e.flags |= 4194308));
}
function rn(e, t) {
  try {
    var n = '',
      r = t;
    do ((n += Wc(r)), (r = r.return));
    while (r);
    var l = n;
  } catch (i) {
    l =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Hl(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Pi(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var yp = typeof WeakMap == 'function' ? WeakMap : Map;
function Du(e, t, n) {
  ((n = He(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (el || ((el = !0), (Zi = r)), Pi(e, t));
    }),
    n
  );
}
function Iu(e, t, n) {
  ((n = He(-1, n)), (n.tag = 3));
  var r = e.type.getDerivedStateFromError;
  if (typeof r == 'function') {
    var l = t.value;
    ((n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        Pi(e, t);
      }));
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == 'function' &&
      (n.callback = function () {
        (Pi(e, t),
          typeof r != 'function' &&
            (ut === null ? (ut = new Set([this])) : ut.add(this)));
        var s = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: s !== null ? s : '',
        });
      }),
    n
  );
}
function zo(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new yp();
    var l = new Set();
    r.set(t, l);
  } else ((l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l)));
  l.has(n) || (l.add(n), (e = Lp.bind(null, e, t, n)), t.then(e, e));
}
function Lo(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ro(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = He(-1, 1)), (t.tag = 2), at(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var gp = Xe.ReactCurrentOwner,
  pe = !1;
function oe(e, t, n, r) {
  t.child = e === null ? pu(t, null, n, r) : tn(t, e.child, n, r);
}
function Mo(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return (
    Xt(t, l),
    (r = _s(e, t, n, r, i, l)),
    (n = Ss()),
    e !== null && !pe
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        Ge(e, t, l))
      : (F && n && cs(t), (t.flags |= 1), oe(e, t, r, l), t.child)
  );
}
function Oo(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == 'function' &&
      !Ms(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), Fu(e, t, i, r, l))
      : ((e = Lr(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !(e.lanes & l))) {
    var s = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Zn), n(s, r) && e.ref === t.ref)
    )
      return Ge(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = dt(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Fu(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Zn(i, r) && e.ref === t.ref)
      if (((pe = !1), (t.pendingProps = r = i), (e.lanes & l) !== 0))
        e.flags & 131072 && (pe = !0);
      else return ((t.lanes = e.lanes), Ge(e, t, l));
  }
  return zi(e, t, n, r, l);
}
function Zu(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === 'hidden')
    if (!(t.mode & 1))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        B(Ht, ve),
        (ve |= n));
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          B(Ht, ve),
          (ve |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        B(Ht, ve),
        (ve |= r));
    }
  else
    (i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
      B(Ht, ve),
      (ve |= r));
  return (oe(e, t, l, n), t.child);
}
function Uu(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function zi(e, t, n, r, l) {
  var i = he(n) ? Nt : se.current;
  return (
    (i = bt(t, i)),
    Xt(t, l),
    (n = _s(e, t, n, r, i, l)),
    (r = Ss()),
    e !== null && !pe
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        Ge(e, t, l))
      : (F && r && cs(t), (t.flags |= 1), oe(e, t, n, l), t.child)
  );
}
function Bo(e, t, n, r, l) {
  if (he(n)) {
    var i = !0;
    Wr(t);
  } else i = !1;
  if ((Xt(t, l), t.stateNode === null))
    (jr(e, t), Bu(t, n, r), ji(t, n, r, l), (r = !0));
  else if (e === null) {
    var s = t.stateNode,
      o = t.memoizedProps;
    s.props = o;
    var a = s.context,
      c = n.contextType;
    typeof c == 'object' && c !== null
      ? (c = Ne(c))
      : ((c = he(n) ? Nt : se.current), (c = bt(t, c)));
    var v = n.getDerivedStateFromProps,
      m =
        typeof v == 'function' ||
        typeof s.getSnapshotBeforeUpdate == 'function';
    (m ||
      (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof s.componentWillReceiveProps != 'function') ||
      ((o !== r || a !== c) && Po(t, s, r, c)),
      (be = !1));
    var h = t.memoizedState;
    ((s.state = h),
      Gr(t, r, s, l),
      (a = t.memoizedState),
      o !== r || h !== a || fe.current || be
        ? (typeof v == 'function' && (Ti(t, n, v, r), (a = t.memoizedState)),
          (o = be || jo(t, n, o, r, h, a, c))
            ? (m ||
                (typeof s.UNSAFE_componentWillMount != 'function' &&
                  typeof s.componentWillMount != 'function') ||
                (typeof s.componentWillMount == 'function' &&
                  s.componentWillMount(),
                typeof s.UNSAFE_componentWillMount == 'function' &&
                  s.UNSAFE_componentWillMount()),
              typeof s.componentDidMount == 'function' && (t.flags |= 4194308))
            : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (s.props = r),
          (s.state = a),
          (s.context = c),
          (r = o))
        : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
          (r = !1)));
  } else {
    ((s = t.stateNode),
      hu(e, t),
      (o = t.memoizedProps),
      (c = t.type === t.elementType ? o : ze(t.type, o)),
      (s.props = c),
      (m = t.pendingProps),
      (h = s.context),
      (a = n.contextType),
      typeof a == 'object' && a !== null
        ? (a = Ne(a))
        : ((a = he(n) ? Nt : se.current), (a = bt(t, a))));
    var w = n.getDerivedStateFromProps;
    ((v =
      typeof w == 'function' ||
      typeof s.getSnapshotBeforeUpdate == 'function') ||
      (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof s.componentWillReceiveProps != 'function') ||
      ((o !== m || h !== a) && Po(t, s, r, a)),
      (be = !1),
      (h = t.memoizedState),
      (s.state = h),
      Gr(t, r, s, l));
    var k = t.memoizedState;
    o !== m || h !== k || fe.current || be
      ? (typeof w == 'function' && (Ti(t, n, w, r), (k = t.memoizedState)),
        (c = be || jo(t, n, c, r, h, k, a) || !1)
          ? (v ||
              (typeof s.UNSAFE_componentWillUpdate != 'function' &&
                typeof s.componentWillUpdate != 'function') ||
              (typeof s.componentWillUpdate == 'function' &&
                s.componentWillUpdate(r, k, a),
              typeof s.UNSAFE_componentWillUpdate == 'function' &&
                s.UNSAFE_componentWillUpdate(r, k, a)),
            typeof s.componentDidUpdate == 'function' && (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
          : (typeof s.componentDidUpdate != 'function' ||
              (o === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate != 'function' ||
              (o === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = k)),
        (s.props = r),
        (s.state = k),
        (s.context = a),
        (r = c))
      : (typeof s.componentDidUpdate != 'function' ||
          (o === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 4),
        typeof s.getSnapshotBeforeUpdate != 'function' ||
          (o === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Li(e, t, n, r, i, l);
}
function Li(e, t, n, r, l, i) {
  Uu(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return (l && ko(t, n, !1), Ge(e, t, i));
  ((r = t.stateNode), (gp.current = t));
  var o =
    s && typeof n.getDerivedStateFromError != 'function' ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && s
      ? ((t.child = tn(t, e.child, null, i)), (t.child = tn(t, null, o, i)))
      : oe(e, t, o, i),
    (t.memoizedState = r.state),
    l && ko(t, n, !0),
    t.child
  );
}
function $u(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? wo(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && wo(e, t.context, !1),
    gs(e, t.containerInfo));
}
function Do(e, t, n, r, l) {
  return (en(), ps(l), (t.flags |= 256), oe(e, t, n, r), t.child);
}
var Ri = { dehydrated: null, treeContext: null, retryLane: 0 };
function Mi(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Au(e, t, n) {
  var r = t.pendingProps,
    l = Z.current,
    i = !1,
    s = (t.flags & 128) !== 0,
    o;
  if (
    ((o = s) ||
      (o = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    o
      ? ((i = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    B(Z, l & 1),
    e === null)
  )
    return (
      Ci(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === '$!'
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((s = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (s = { mode: 'hidden', children: s }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = s))
                : (i = ml(s, r, 0, null)),
              (e = Ct(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = Mi(n)),
              (t.memoizedState = Ri),
              e)
            : Ns(t, s))
    );
  if (((l = e.memoizedState), l !== null && ((o = l.dehydrated), o !== null)))
    return wp(e, t, s, r, o, l, n);
  if (i) {
    ((i = r.fallback), (s = t.mode), (l = e.child), (o = l.sibling));
    var a = { mode: 'hidden', children: r.children };
    return (
      !(s & 1) && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = a),
          (t.deletions = null))
        : ((r = dt(l, a)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      o !== null ? (i = dt(o, i)) : ((i = Ct(i, s, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (s = e.child.memoizedState),
      (s =
        s === null
          ? Mi(n)
          : {
              baseLanes: s.baseLanes | n,
              cachePool: null,
              transitions: s.transitions,
            }),
      (i.memoizedState = s),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = Ri),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = dt(i, { mode: 'visible', children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Ns(e, t) {
  return (
    (t = ml({ mode: 'visible', children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function mr(e, t, n, r) {
  return (
    r !== null && ps(r),
    tn(t, e.child, null, n),
    (e = Ns(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function wp(e, t, n, r, l, i, s) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Hl(Error(g(422)))), mr(e, t, s, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((i = r.fallback),
          (l = t.mode),
          (r = ml({ mode: 'visible', children: r.children }, l, 0, null)),
          (i = Ct(i, l, s, null)),
          (i.flags |= 2),
          (r.return = t),
          (i.return = t),
          (r.sibling = i),
          (t.child = r),
          t.mode & 1 && tn(t, e.child, null, s),
          (t.child.memoizedState = Mi(s)),
          (t.memoizedState = Ri),
          i);
  if (!(t.mode & 1)) return mr(e, t, s, null);
  if (l.data === '$!') {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var o = r.dgst;
    return (
      (r = o),
      (i = Error(g(419))),
      (r = Hl(i, r, void 0)),
      mr(e, t, s, r)
    );
  }
  if (((o = (s & e.childLanes) !== 0), pe || o)) {
    if (((r = q), r !== null)) {
      switch (s & -s) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      ((l = l & (r.suspendedLanes | s) ? 0 : l),
        l !== 0 &&
          l !== i.retryLane &&
          ((i.retryLane = l), Ke(e, l), Oe(r, e, l, -1)));
    }
    return (Rs(), (r = Hl(Error(g(421)))), mr(e, t, s, r));
  }
  return l.data === '$?'
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Rp.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = i.treeContext),
      (ye = ot(l.nextSibling)),
      (ge = t),
      (F = !0),
      (Re = null),
      e !== null &&
        ((_e[Se++] = Ve),
        (_e[Se++] = We),
        (_e[Se++] = Tt),
        (Ve = e.id),
        (We = e.overflow),
        (Tt = t)),
      (t = Ns(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Io(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  (r !== null && (r.lanes |= t), Ni(e.return, t, n));
}
function Yl(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = l));
}
function Vu(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    i = r.tail;
  if ((oe(e, t, r.children, n), (r = Z.current), r & 2))
    ((r = (r & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Io(e, n, t);
        else if (e.tag === 19) Io(e, n, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    r &= 1;
  }
  if ((B(Z, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case 'forwards':
        for (n = t.child, l = null; n !== null; )
          ((e = n.alternate),
            e !== null && Xr(e) === null && (l = n),
            (n = n.sibling));
        ((n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          Yl(t, !1, l, n, i));
        break;
      case 'backwards':
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && Xr(e) === null)) {
            t.child = l;
            break;
          }
          ((e = l.sibling), (l.sibling = n), (n = l), (l = e));
        }
        Yl(t, !0, n, null, i);
        break;
      case 'together':
        Yl(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function jr(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Ge(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Pt |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(g(153));
  if (t.child !== null) {
    for (
      e = t.child, n = dt(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      ((e = e.sibling),
        (n = n.sibling = dt(e, e.pendingProps)),
        (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function kp(e, t, n) {
  switch (t.tag) {
    case 3:
      ($u(t), en());
      break;
    case 5:
      mu(t);
      break;
    case 1:
      he(t.type) && Wr(t);
      break;
    case 4:
      gs(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      (B(Qr, r._currentValue), (r._currentValue = l));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (B(Z, Z.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? Au(e, t, n)
            : (B(Z, Z.current & 1),
              (e = Ge(e, t, n)),
              e !== null ? e.sibling : null);
      B(Z, Z.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Vu(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        B(Z, Z.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), Zu(e, t, n));
  }
  return Ge(e, t, n);
}
var Wu, Oi, Hu, Yu;
Wu = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      ((n.child.return = n), (n = n.child));
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    ((n.sibling.return = n.return), (n = n.sibling));
  }
};
Oi = function () {};
Hu = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    ((e = t.stateNode), St(Ue.current));
    var i = null;
    switch (n) {
      case 'input':
        ((l = ni(e, l)), (r = ni(e, r)), (i = []));
        break;
      case 'select':
        ((l = $({}, l, { value: void 0 })),
          (r = $({}, r, { value: void 0 })),
          (i = []));
        break;
      case 'textarea':
        ((l = ii(e, l)), (r = ii(e, r)), (i = []));
        break;
      default:
        typeof l.onClick != 'function' &&
          typeof r.onClick == 'function' &&
          (e.onclick = Ar);
    }
    oi(n, r);
    var s;
    n = null;
    for (c in l)
      if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null)
        if (c === 'style') {
          var o = l[c];
          for (s in o) o.hasOwnProperty(s) && (n || (n = {}), (n[s] = ''));
        } else
          c !== 'dangerouslySetInnerHTML' &&
            c !== 'children' &&
            c !== 'suppressContentEditableWarning' &&
            c !== 'suppressHydrationWarning' &&
            c !== 'autoFocus' &&
            (Rn.hasOwnProperty(c)
              ? i || (i = [])
              : (i = i || []).push(c, null));
    for (c in r) {
      var a = r[c];
      if (
        ((o = l != null ? l[c] : void 0),
        r.hasOwnProperty(c) && a !== o && (a != null || o != null))
      )
        if (c === 'style')
          if (o) {
            for (s in o)
              !o.hasOwnProperty(s) ||
                (a && a.hasOwnProperty(s)) ||
                (n || (n = {}), (n[s] = ''));
            for (s in a)
              a.hasOwnProperty(s) &&
                o[s] !== a[s] &&
                (n || (n = {}), (n[s] = a[s]));
          } else (n || (i || (i = []), i.push(c, n)), (n = a));
        else
          c === 'dangerouslySetInnerHTML'
            ? ((a = a ? a.__html : void 0),
              (o = o ? o.__html : void 0),
              a != null && o !== a && (i = i || []).push(c, a))
            : c === 'children'
              ? (typeof a != 'string' && typeof a != 'number') ||
                (i = i || []).push(c, '' + a)
              : c !== 'suppressContentEditableWarning' &&
                c !== 'suppressHydrationWarning' &&
                (Rn.hasOwnProperty(c)
                  ? (a != null && c === 'onScroll' && D('scroll', e),
                    i || o === a || (i = []))
                  : (i = i || []).push(c, a));
    }
    n && (i = i || []).push('style', n);
    var c = i;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
Yu = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function yn(e, t) {
  if (!F)
    switch (e.tailMode) {
      case 'hidden':
        t = e.tail;
        for (var n = null; t !== null; )
          (t.alternate !== null && (n = t), (t = t.sibling));
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case 'collapsed':
        n = e.tail;
        for (var r = null; n !== null; )
          (n.alternate !== null && (r = n), (n = n.sibling));
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function le(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      ((n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling));
  else
    for (l = e.child; l !== null; )
      ((n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling));
  return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function xp(e, t, n) {
  var r = t.pendingProps;
  switch ((ds(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (le(t), null);
    case 1:
      return (he(t.type) && Vr(), le(t), null);
    case 3:
      return (
        (r = t.stateNode),
        nn(),
        I(fe),
        I(se),
        ks(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (fr(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Re !== null && (Ai(Re), (Re = null)))),
        Oi(e, t),
        le(t),
        null
      );
    case 5:
      ws(t);
      var l = St(Wn.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        (Hu(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(g(166));
          return (le(t), null);
        }
        if (((e = St(Ue.current)), fr(t))) {
          ((r = t.stateNode), (n = t.type));
          var i = t.memoizedProps;
          switch (((r[Fe] = t), (r[An] = i), (e = (t.mode & 1) !== 0), n)) {
            case 'dialog':
              (D('cancel', r), D('close', r));
              break;
            case 'iframe':
            case 'object':
            case 'embed':
              D('load', r);
              break;
            case 'video':
            case 'audio':
              for (l = 0; l < _n.length; l++) D(_n[l], r);
              break;
            case 'source':
              D('error', r);
              break;
            case 'img':
            case 'image':
            case 'link':
              (D('error', r), D('load', r));
              break;
            case 'details':
              D('toggle', r);
              break;
            case 'input':
              (Hs(r, i), D('invalid', r));
              break;
            case 'select':
              ((r._wrapperState = { wasMultiple: !!i.multiple }),
                D('invalid', r));
              break;
            case 'textarea':
              (Qs(r, i), D('invalid', r));
          }
          (oi(n, i), (l = null));
          for (var s in i)
            if (i.hasOwnProperty(s)) {
              var o = i[s];
              s === 'children'
                ? typeof o == 'string'
                  ? r.textContent !== o &&
                    (i.suppressHydrationWarning !== !0 &&
                      pr(r.textContent, o, e),
                    (l = ['children', o]))
                  : typeof o == 'number' &&
                    r.textContent !== '' + o &&
                    (i.suppressHydrationWarning !== !0 &&
                      pr(r.textContent, o, e),
                    (l = ['children', '' + o]))
                : Rn.hasOwnProperty(s) &&
                  o != null &&
                  s === 'onScroll' &&
                  D('scroll', r);
            }
          switch (n) {
            case 'input':
              (lr(r), Ys(r, i, !0));
              break;
            case 'textarea':
              (lr(r), Ks(r));
              break;
            case 'select':
            case 'option':
              break;
            default:
              typeof i.onClick == 'function' && (r.onclick = Ar);
          }
          ((r = l), (t.updateQueue = r), r !== null && (t.flags |= 4));
        } else {
          ((s = l.nodeType === 9 ? l : l.ownerDocument),
            e === 'http://www.w3.org/1999/xhtml' && (e = ka(n)),
            e === 'http://www.w3.org/1999/xhtml'
              ? n === 'script'
                ? ((e = s.createElement('div')),
                  (e.innerHTML = '<script><\/script>'),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == 'string'
                  ? (e = s.createElement(n, { is: r.is }))
                  : ((e = s.createElement(n)),
                    n === 'select' &&
                      ((s = e),
                      r.multiple
                        ? (s.multiple = !0)
                        : r.size && (s.size = r.size)))
              : (e = s.createElementNS(e, n)),
            (e[Fe] = t),
            (e[An] = r),
            Wu(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((s = ai(n, r)), n)) {
              case 'dialog':
                (D('cancel', e), D('close', e), (l = r));
                break;
              case 'iframe':
              case 'object':
              case 'embed':
                (D('load', e), (l = r));
                break;
              case 'video':
              case 'audio':
                for (l = 0; l < _n.length; l++) D(_n[l], e);
                l = r;
                break;
              case 'source':
                (D('error', e), (l = r));
                break;
              case 'img':
              case 'image':
              case 'link':
                (D('error', e), D('load', e), (l = r));
                break;
              case 'details':
                (D('toggle', e), (l = r));
                break;
              case 'input':
                (Hs(e, r), (l = ni(e, r)), D('invalid', e));
                break;
              case 'option':
                l = r;
                break;
              case 'select':
                ((e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = $({}, r, { value: void 0 })),
                  D('invalid', e));
                break;
              case 'textarea':
                (Qs(e, r), (l = ii(e, r)), D('invalid', e));
                break;
              default:
                l = r;
            }
            (oi(n, l), (o = l));
            for (i in o)
              if (o.hasOwnProperty(i)) {
                var a = o[i];
                i === 'style'
                  ? Sa(e, a)
                  : i === 'dangerouslySetInnerHTML'
                    ? ((a = a ? a.__html : void 0), a != null && xa(e, a))
                    : i === 'children'
                      ? typeof a == 'string'
                        ? (n !== 'textarea' || a !== '') && Mn(e, a)
                        : typeof a == 'number' && Mn(e, '' + a)
                      : i !== 'suppressContentEditableWarning' &&
                        i !== 'suppressHydrationWarning' &&
                        i !== 'autoFocus' &&
                        (Rn.hasOwnProperty(i)
                          ? a != null && i === 'onScroll' && D('scroll', e)
                          : a != null && Xi(e, i, a, s));
              }
            switch (n) {
              case 'input':
                (lr(e), Ys(e, r, !1));
                break;
              case 'textarea':
                (lr(e), Ks(e));
                break;
              case 'option':
                r.value != null && e.setAttribute('value', '' + pt(r.value));
                break;
              case 'select':
                ((e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? Yt(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      Yt(e, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof l.onClick == 'function' && (e.onclick = Ar);
            }
            switch (n) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                r = !!r.autoFocus;
                break e;
              case 'img':
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return (le(t), null);
    case 6:
      if (e && t.stateNode != null) Yu(e, t, e.memoizedProps, r);
      else {
        if (typeof r != 'string' && t.stateNode === null) throw Error(g(166));
        if (((n = St(Wn.current)), St(Ue.current), fr(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Fe] = t),
            (i = r.nodeValue !== n) && ((e = ge), e !== null))
          )
            switch (e.tag) {
              case 3:
                pr(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  pr(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Fe] = t),
            (t.stateNode = r));
      }
      return (le(t), null);
    case 13:
      if (
        (I(Z),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (F && ye !== null && t.mode & 1 && !(t.flags & 128))
          (cu(), en(), (t.flags |= 98560), (i = !1));
        else if (((i = fr(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(g(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(g(317));
            i[Fe] = t;
          } else
            (en(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (le(t), (i = !1));
        } else (Re !== null && (Ai(Re), (Re = null)), (i = !0));
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || Z.current & 1 ? K === 0 && (K = 3) : Rs())),
          t.updateQueue !== null && (t.flags |= 4),
          le(t),
          null);
    case 4:
      return (
        nn(),
        Oi(e, t),
        e === null && Un(t.stateNode.containerInfo),
        le(t),
        null
      );
    case 10:
      return (ms(t.type._context), le(t), null);
    case 17:
      return (he(t.type) && Vr(), le(t), null);
    case 19:
      if ((I(Z), (i = t.memoizedState), i === null)) return (le(t), null);
      if (((r = (t.flags & 128) !== 0), (s = i.rendering), s === null))
        if (r) yn(i, !1);
        else {
          if (K !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((s = Xr(e)), s !== null)) {
                for (
                  t.flags |= 128,
                    yn(i, !1),
                    r = s.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  ((i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (s = i.alternate),
                    s === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = s.childLanes),
                        (i.lanes = s.lanes),
                        (i.child = s.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = s.memoizedProps),
                        (i.memoizedState = s.memoizedState),
                        (i.updateQueue = s.updateQueue),
                        (i.type = s.type),
                        (e = s.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling));
                return (B(Z, (Z.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          i.tail !== null &&
            H() > ln &&
            ((t.flags |= 128), (r = !0), yn(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Xr(s)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              yn(i, !0),
              i.tail === null && i.tailMode === 'hidden' && !s.alternate && !F)
            )
              return (le(t), null);
          } else
            2 * H() - i.renderingStartTime > ln &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), yn(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((s.sibling = t.child), (t.child = s))
          : ((n = i.last),
            n !== null ? (n.sibling = s) : (t.child = s),
            (i.last = s));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = H()),
          (t.sibling = null),
          (n = Z.current),
          B(Z, r ? (n & 1) | 2 : n & 1),
          t)
        : (le(t), null);
    case 22:
    case 23:
      return (
        Ls(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? ve & 1073741824 && (le(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : le(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(g(156, t.tag));
}
function _p(e, t) {
  switch ((ds(t), t.tag)) {
    case 1:
      return (
        he(t.type) && Vr(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        nn(),
        I(fe),
        I(se),
        ks(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return (ws(t), null);
    case 13:
      if ((I(Z), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(g(340));
        en();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (I(Z), null);
    case 4:
      return (nn(), null);
    case 10:
      return (ms(t.type._context), null);
    case 22:
    case 23:
      return (Ls(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var vr = !1,
  ie = !1,
  Sp = typeof WeakSet == 'function' ? WeakSet : Set,
  S = null;
function Wt(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == 'function')
      try {
        n(null);
      } catch (r) {
        A(e, t, r);
      }
    else n.current = null;
}
function Bi(e, t, n) {
  try {
    n();
  } catch (r) {
    A(e, t, r);
  }
}
var Fo = !1;
function Ep(e, t) {
  if (((gi = Zr), (e = Ja()), us(e))) {
    if ('selectionStart' in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            (n.nodeType, i.nodeType);
          } catch {
            n = null;
            break e;
          }
          var s = 0,
            o = -1,
            a = -1,
            c = 0,
            v = 0,
            m = e,
            h = null;
          t: for (;;) {
            for (
              var w;
              m !== n || (l !== 0 && m.nodeType !== 3) || (o = s + l),
                m !== i || (r !== 0 && m.nodeType !== 3) || (a = s + r),
                m.nodeType === 3 && (s += m.nodeValue.length),
                (w = m.firstChild) !== null;

            )
              ((h = m), (m = w));
            for (;;) {
              if (m === e) break t;
              if (
                (h === n && ++c === l && (o = s),
                h === i && ++v === r && (a = s),
                (w = m.nextSibling) !== null)
              )
                break;
              ((m = h), (h = m.parentNode));
            }
            m = w;
          }
          n = o === -1 || a === -1 ? null : { start: o, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (wi = { focusedElem: e, selectionRange: n }, Zr = !1, S = t; S !== null; )
    if (((t = S), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (S = e));
    else
      for (; S !== null; ) {
        t = S;
        try {
          var k = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (k !== null) {
                  var _ = k.memoizedProps,
                    O = k.memoizedState,
                    d = t.stateNode,
                    u = d.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? _ : ze(t.type, _),
                      O
                    );
                  d.__reactInternalSnapshotBeforeUpdate = u;
                }
                break;
              case 3:
                var p = t.stateNode.containerInfo;
                p.nodeType === 1
                  ? (p.textContent = '')
                  : p.nodeType === 9 &&
                    p.documentElement &&
                    p.removeChild(p.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(g(163));
            }
        } catch (y) {
          A(t, t.return, y);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (S = e));
          break;
        }
        S = t.return;
      }
  return ((k = Fo), (Fo = !1), k);
}
function Pn(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        ((l.destroy = void 0), i !== void 0 && Bi(t, n, i));
      }
      l = l.next;
    } while (l !== r);
  }
}
function fl(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Di(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == 'function' ? t(e) : (t.current = e);
  }
}
function Qu(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), Qu(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Fe], delete t[An], delete t[_i], delete t[sp], delete t[op])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function Ku(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Zo(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Ku(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Ii(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Ar)));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Ii(e, t, n), e = e.sibling; e !== null; )
      (Ii(e, t, n), (e = e.sibling));
}
function Fi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Fi(e, t, n), e = e.sibling; e !== null; )
      (Fi(e, t, n), (e = e.sibling));
}
var b = null,
  Le = !1;
function Je(e, t, n) {
  for (n = n.child; n !== null; ) (Gu(e, t, n), (n = n.sibling));
}
function Gu(e, t, n) {
  if (Ze && typeof Ze.onCommitFiberUnmount == 'function')
    try {
      Ze.onCommitFiberUnmount(il, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ie || Wt(n, t);
    case 6:
      var r = b,
        l = Le;
      ((b = null),
        Je(e, t, n),
        (b = r),
        (Le = l),
        b !== null &&
          (Le
            ? ((e = b),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : b.removeChild(n.stateNode)));
      break;
    case 18:
      b !== null &&
        (Le
          ? ((e = b),
            (n = n.stateNode),
            e.nodeType === 8
              ? Zl(e.parentNode, n)
              : e.nodeType === 1 && Zl(e, n),
            In(e))
          : Zl(b, n.stateNode));
      break;
    case 4:
      ((r = b),
        (l = Le),
        (b = n.stateNode.containerInfo),
        (Le = !0),
        Je(e, t, n),
        (b = r),
        (Le = l));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ie &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next;
        do {
          var i = l,
            s = i.destroy;
          ((i = i.tag),
            s !== void 0 && (i & 2 || i & 4) && Bi(n, t, s),
            (l = l.next));
        } while (l !== r);
      }
      Je(e, t, n);
      break;
    case 1:
      if (
        !ie &&
        (Wt(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == 'function')
      )
        try {
          ((r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount());
        } catch (o) {
          A(n, t, o);
        }
      Je(e, t, n);
      break;
    case 21:
      Je(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ie = (r = ie) || n.memoizedState !== null), Je(e, t, n), (ie = r))
        : Je(e, t, n);
      break;
    default:
      Je(e, t, n);
  }
}
function Uo(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new Sp()),
      t.forEach(function (r) {
        var l = Mp.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      }));
  }
}
function Pe(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var i = e,
          s = t,
          o = s;
        e: for (; o !== null; ) {
          switch (o.tag) {
            case 5:
              ((b = o.stateNode), (Le = !1));
              break e;
            case 3:
              ((b = o.stateNode.containerInfo), (Le = !0));
              break e;
            case 4:
              ((b = o.stateNode.containerInfo), (Le = !0));
              break e;
          }
          o = o.return;
        }
        if (b === null) throw Error(g(160));
        (Gu(i, s, l), (b = null), (Le = !1));
        var a = l.alternate;
        (a !== null && (a.return = null), (l.return = null));
      } catch (c) {
        A(l, t, c);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) (Xu(t, e), (t = t.sibling));
}
function Xu(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Pe(t, e), De(e), r & 4)) {
        try {
          (Pn(3, e, e.return), fl(3, e));
        } catch (_) {
          A(e, e.return, _);
        }
        try {
          Pn(5, e, e.return);
        } catch (_) {
          A(e, e.return, _);
        }
      }
      break;
    case 1:
      (Pe(t, e), De(e), r & 512 && n !== null && Wt(n, n.return));
      break;
    case 5:
      if (
        (Pe(t, e),
        De(e),
        r & 512 && n !== null && Wt(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          Mn(l, '');
        } catch (_) {
          A(e, e.return, _);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var i = e.memoizedProps,
          s = n !== null ? n.memoizedProps : i,
          o = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            (o === 'input' && i.type === 'radio' && i.name != null && ga(l, i),
              ai(o, s));
            var c = ai(o, i);
            for (s = 0; s < a.length; s += 2) {
              var v = a[s],
                m = a[s + 1];
              v === 'style'
                ? Sa(l, m)
                : v === 'dangerouslySetInnerHTML'
                  ? xa(l, m)
                  : v === 'children'
                    ? Mn(l, m)
                    : Xi(l, v, m, c);
            }
            switch (o) {
              case 'input':
                ri(l, i);
                break;
              case 'textarea':
                wa(l, i);
                break;
              case 'select':
                var h = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!i.multiple;
                var w = i.value;
                w != null
                  ? Yt(l, !!i.multiple, w, !1)
                  : h !== !!i.multiple &&
                    (i.defaultValue != null
                      ? Yt(l, !!i.multiple, i.defaultValue, !0)
                      : Yt(l, !!i.multiple, i.multiple ? [] : '', !1));
            }
            l[An] = i;
          } catch (_) {
            A(e, e.return, _);
          }
      }
      break;
    case 6:
      if ((Pe(t, e), De(e), r & 4)) {
        if (e.stateNode === null) throw Error(g(162));
        ((l = e.stateNode), (i = e.memoizedProps));
        try {
          l.nodeValue = i;
        } catch (_) {
          A(e, e.return, _);
        }
      }
      break;
    case 3:
      if (
        (Pe(t, e), De(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          In(t.containerInfo);
        } catch (_) {
          A(e, e.return, _);
        }
      break;
    case 4:
      (Pe(t, e), De(e));
      break;
    case 13:
      (Pe(t, e),
        De(e),
        (l = e.child),
        l.flags & 8192 &&
          ((i = l.memoizedState !== null),
          (l.stateNode.isHidden = i),
          !i ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (Ps = H())),
        r & 4 && Uo(e));
      break;
    case 22:
      if (
        ((v = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ie = (c = ie) || v), Pe(t, e), (ie = c)) : Pe(t, e),
        De(e),
        r & 8192)
      ) {
        if (
          ((c = e.memoizedState !== null),
          (e.stateNode.isHidden = c) && !v && e.mode & 1)
        )
          for (S = e, v = e.child; v !== null; ) {
            for (m = S = v; S !== null; ) {
              switch (((h = S), (w = h.child), h.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Pn(4, h, h.return);
                  break;
                case 1:
                  Wt(h, h.return);
                  var k = h.stateNode;
                  if (typeof k.componentWillUnmount == 'function') {
                    ((r = h), (n = h.return));
                    try {
                      ((t = r),
                        (k.props = t.memoizedProps),
                        (k.state = t.memoizedState),
                        k.componentWillUnmount());
                    } catch (_) {
                      A(r, n, _);
                    }
                  }
                  break;
                case 5:
                  Wt(h, h.return);
                  break;
                case 22:
                  if (h.memoizedState !== null) {
                    Ao(m);
                    continue;
                  }
              }
              w !== null ? ((w.return = h), (S = w)) : Ao(m);
            }
            v = v.sibling;
          }
        e: for (v = null, m = e; ; ) {
          if (m.tag === 5) {
            if (v === null) {
              v = m;
              try {
                ((l = m.stateNode),
                  c
                    ? ((i = l.style),
                      typeof i.setProperty == 'function'
                        ? i.setProperty('display', 'none', 'important')
                        : (i.display = 'none'))
                    : ((o = m.stateNode),
                      (a = m.memoizedProps.style),
                      (s =
                        a != null && a.hasOwnProperty('display')
                          ? a.display
                          : null),
                      (o.style.display = _a('display', s))));
              } catch (_) {
                A(e, e.return, _);
              }
            }
          } else if (m.tag === 6) {
            if (v === null)
              try {
                m.stateNode.nodeValue = c ? '' : m.memoizedProps;
              } catch (_) {
                A(e, e.return, _);
              }
          } else if (
            ((m.tag !== 22 && m.tag !== 23) ||
              m.memoizedState === null ||
              m === e) &&
            m.child !== null
          ) {
            ((m.child.return = m), (m = m.child));
            continue;
          }
          if (m === e) break e;
          for (; m.sibling === null; ) {
            if (m.return === null || m.return === e) break e;
            (v === m && (v = null), (m = m.return));
          }
          (v === m && (v = null),
            (m.sibling.return = m.return),
            (m = m.sibling));
        }
      }
      break;
    case 19:
      (Pe(t, e), De(e), r & 4 && Uo(e));
      break;
    case 21:
      break;
    default:
      (Pe(t, e), De(e));
  }
}
function De(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Ku(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(g(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Mn(l, ''), (r.flags &= -33));
          var i = Zo(e);
          Fi(e, i, l);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo,
            o = Zo(e);
          Ii(e, o, s);
          break;
        default:
          throw Error(g(161));
      }
    } catch (a) {
      A(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Cp(e, t, n) {
  ((S = e), Ju(e));
}
function Ju(e, t, n) {
  for (var r = (e.mode & 1) !== 0; S !== null; ) {
    var l = S,
      i = l.child;
    if (l.tag === 22 && r) {
      var s = l.memoizedState !== null || vr;
      if (!s) {
        var o = l.alternate,
          a = (o !== null && o.memoizedState !== null) || ie;
        o = vr;
        var c = ie;
        if (((vr = s), (ie = a) && !c))
          for (S = l; S !== null; )
            ((s = S),
              (a = s.child),
              s.tag === 22 && s.memoizedState !== null
                ? Vo(l)
                : a !== null
                  ? ((a.return = s), (S = a))
                  : Vo(l));
        for (; i !== null; ) ((S = i), Ju(i), (i = i.sibling));
        ((S = l), (vr = o), (ie = c));
      }
      $o(e);
    } else
      l.subtreeFlags & 8772 && i !== null ? ((i.return = l), (S = i)) : $o(e);
  }
}
function $o(e) {
  for (; S !== null; ) {
    var t = S;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ie || fl(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ie)
                if (n === null) r.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : ze(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var i = t.updateQueue;
              i !== null && Co(t, i, r);
              break;
            case 3:
              var s = t.updateQueue;
              if (s !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Co(t, s, n);
              }
              break;
            case 5:
              var o = t.stateNode;
              if (n === null && t.flags & 4) {
                n = o;
                var a = t.memoizedProps;
                switch (t.type) {
                  case 'button':
                  case 'input':
                  case 'select':
                  case 'textarea':
                    a.autoFocus && n.focus();
                    break;
                  case 'img':
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var c = t.alternate;
                if (c !== null) {
                  var v = c.memoizedState;
                  if (v !== null) {
                    var m = v.dehydrated;
                    m !== null && In(m);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(g(163));
          }
        ie || (t.flags & 512 && Di(t));
      } catch (h) {
        A(t, t.return, h);
      }
    }
    if (t === e) {
      S = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (S = n));
      break;
    }
    S = t.return;
  }
}
function Ao(e) {
  for (; S !== null; ) {
    var t = S;
    if (t === e) {
      S = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (S = n));
      break;
    }
    S = t.return;
  }
}
function Vo(e) {
  for (; S !== null; ) {
    var t = S;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            fl(4, t);
          } catch (a) {
            A(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == 'function') {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              A(t, l, a);
            }
          }
          var i = t.return;
          try {
            Di(t);
          } catch (a) {
            A(t, i, a);
          }
          break;
        case 5:
          var s = t.return;
          try {
            Di(t);
          } catch (a) {
            A(t, s, a);
          }
      }
    } catch (a) {
      A(t, t.return, a);
    }
    if (t === e) {
      S = null;
      break;
    }
    var o = t.sibling;
    if (o !== null) {
      ((o.return = t.return), (S = o));
      break;
    }
    S = t.return;
  }
}
var Np = Math.ceil,
  br = Xe.ReactCurrentDispatcher,
  Ts = Xe.ReactCurrentOwner,
  Ce = Xe.ReactCurrentBatchConfig,
  R = 0,
  q = null,
  Y = null,
  ee = 0,
  ve = 0,
  Ht = mt(0),
  K = 0,
  Kn = null,
  Pt = 0,
  hl = 0,
  js = 0,
  zn = null,
  de = null,
  Ps = 0,
  ln = 1 / 0,
  $e = null,
  el = !1,
  Zi = null,
  ut = null,
  yr = !1,
  rt = null,
  tl = 0,
  Ln = 0,
  Ui = null,
  Pr = -1,
  zr = 0;
function ae() {
  return R & 6 ? H() : Pr !== -1 ? Pr : (Pr = H());
}
function ct(e) {
  return e.mode & 1
    ? R & 2 && ee !== 0
      ? ee & -ee
      : up.transition !== null
        ? (zr === 0 && (zr = Ba()), zr)
        : ((e = M),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Aa(e.type))),
          e)
    : 1;
}
function Oe(e, t, n, r) {
  if (50 < Ln) throw ((Ln = 0), (Ui = null), Error(g(185)));
  (Xn(e, n, r),
    (!(R & 2) || e !== q) &&
      (e === q && (!(R & 2) && (hl |= n), K === 4 && tt(e, ee)),
      me(e, r),
      n === 1 && R === 0 && !(t.mode & 1) && ((ln = H() + 500), cl && vt())));
}
function me(e, t) {
  var n = e.callbackNode;
  ud(e, t);
  var r = Fr(e, e === q ? ee : 0);
  if (r === 0)
    (n !== null && Js(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Js(n), t === 1))
      (e.tag === 0 ? ap(Wo.bind(null, e)) : ou(Wo.bind(null, e)),
        lp(function () {
          !(R & 6) && vt();
        }),
        (n = null));
    else {
      switch (Da(r)) {
        case 1:
          n = ts;
          break;
        case 4:
          n = Ma;
          break;
        case 16:
          n = Ir;
          break;
        case 536870912:
          n = Oa;
          break;
        default:
          n = Ir;
      }
      n = ic(n, qu.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function qu(e, t) {
  if (((Pr = -1), (zr = 0), R & 6)) throw Error(g(327));
  var n = e.callbackNode;
  if (Jt() && e.callbackNode !== n) return null;
  var r = Fr(e, e === q ? ee : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = nl(e, r);
  else {
    t = r;
    var l = R;
    R |= 2;
    var i = ec();
    (q !== e || ee !== t) && (($e = null), (ln = H() + 500), Et(e, t));
    do
      try {
        Pp();
        break;
      } catch (o) {
        bu(e, o);
      }
    while (!0);
    (hs(),
      (br.current = i),
      (R = l),
      Y !== null ? (t = 0) : ((q = null), (ee = 0), (t = K)));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = fi(e)), l !== 0 && ((r = l), (t = $i(e, l)))), t === 1)
    )
      throw ((n = Kn), Et(e, 0), tt(e, r), me(e, H()), n);
    if (t === 6) tt(e, r);
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !Tp(l) &&
          ((t = nl(e, r)),
          t === 2 && ((i = fi(e)), i !== 0 && ((r = i), (t = $i(e, i)))),
          t === 1))
      )
        throw ((n = Kn), Et(e, 0), tt(e, r), me(e, H()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(g(345));
        case 2:
          kt(e, de, $e);
          break;
        case 3:
          if (
            (tt(e, r), (r & 130023424) === r && ((t = Ps + 500 - H()), 10 < t))
          ) {
            if (Fr(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              (ae(), (e.pingedLanes |= e.suspendedLanes & l));
              break;
            }
            e.timeoutHandle = xi(kt.bind(null, e, de, $e), t);
            break;
          }
          kt(e, de, $e);
          break;
        case 4:
          if ((tt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var s = 31 - Me(r);
            ((i = 1 << s), (s = t[s]), s > l && (l = s), (r &= ~i));
          }
          if (
            ((r = l),
            (r = H() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * Np(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = xi(kt.bind(null, e, de, $e), r);
            break;
          }
          kt(e, de, $e);
          break;
        case 5:
          kt(e, de, $e);
          break;
        default:
          throw Error(g(329));
      }
    }
  }
  return (me(e, H()), e.callbackNode === n ? qu.bind(null, e) : null);
}
function $i(e, t) {
  var n = zn;
  return (
    e.current.memoizedState.isDehydrated && (Et(e, t).flags |= 256),
    (e = nl(e, t)),
    e !== 2 && ((t = de), (de = n), t !== null && Ai(t)),
    e
  );
}
function Ai(e) {
  de === null ? (de = e) : de.push.apply(de, e);
}
function Tp(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            i = l.getSnapshot;
          l = l.value;
          try {
            if (!Be(i(), l)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      ((n.return = t), (t = n));
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function tt(e, t) {
  for (
    t &= ~js,
      t &= ~hl,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Me(t),
      r = 1 << n;
    ((e[n] = -1), (t &= ~r));
  }
}
function Wo(e) {
  if (R & 6) throw Error(g(327));
  Jt();
  var t = Fr(e, 0);
  if (!(t & 1)) return (me(e, H()), null);
  var n = nl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = fi(e);
    r !== 0 && ((t = r), (n = $i(e, r)));
  }
  if (n === 1) throw ((n = Kn), Et(e, 0), tt(e, t), me(e, H()), n);
  if (n === 6) throw Error(g(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    kt(e, de, $e),
    me(e, H()),
    null
  );
}
function zs(e, t) {
  var n = R;
  R |= 1;
  try {
    return e(t);
  } finally {
    ((R = n), R === 0 && ((ln = H() + 500), cl && vt()));
  }
}
function zt(e) {
  rt !== null && rt.tag === 0 && !(R & 6) && Jt();
  var t = R;
  R |= 1;
  var n = Ce.transition,
    r = M;
  try {
    if (((Ce.transition = null), (M = 1), e)) return e();
  } finally {
    ((M = r), (Ce.transition = n), (R = t), !(R & 6) && vt());
  }
}
function Ls() {
  ((ve = Ht.current), I(Ht));
}
function Et(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), rp(n)), Y !== null))
    for (n = Y.return; n !== null; ) {
      var r = n;
      switch ((ds(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && Vr());
          break;
        case 3:
          (nn(), I(fe), I(se), ks());
          break;
        case 5:
          ws(r);
          break;
        case 4:
          nn();
          break;
        case 13:
          I(Z);
          break;
        case 19:
          I(Z);
          break;
        case 10:
          ms(r.type._context);
          break;
        case 22:
        case 23:
          Ls();
      }
      n = n.return;
    }
  if (
    ((q = e),
    (Y = e = dt(e.current, null)),
    (ee = ve = t),
    (K = 0),
    (Kn = null),
    (js = hl = Pt = 0),
    (de = zn = null),
    _t !== null)
  ) {
    for (t = 0; t < _t.length; t++)
      if (((n = _t[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          i = n.pending;
        if (i !== null) {
          var s = i.next;
          ((i.next = l), (r.next = s));
        }
        n.pending = r;
      }
    _t = null;
  }
  return e;
}
function bu(e, t) {
  do {
    var n = Y;
    try {
      if ((hs(), (Nr.current = qr), Jr)) {
        for (var r = U.memoizedState; r !== null; ) {
          var l = r.queue;
          (l !== null && (l.pending = null), (r = r.next));
        }
        Jr = !1;
      }
      if (
        ((jt = 0),
        (J = Q = U = null),
        (jn = !1),
        (Hn = 0),
        (Ts.current = null),
        n === null || n.return === null)
      ) {
        ((K = 1), (Kn = t), (Y = null));
        break;
      }
      e: {
        var i = e,
          s = n.return,
          o = n,
          a = t;
        if (
          ((t = ee),
          (o.flags |= 32768),
          a !== null && typeof a == 'object' && typeof a.then == 'function')
        ) {
          var c = a,
            v = o,
            m = v.tag;
          if (!(v.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var h = v.alternate;
            h
              ? ((v.updateQueue = h.updateQueue),
                (v.memoizedState = h.memoizedState),
                (v.lanes = h.lanes))
              : ((v.updateQueue = null), (v.memoizedState = null));
          }
          var w = Lo(s);
          if (w !== null) {
            ((w.flags &= -257),
              Ro(w, s, o, i, t),
              w.mode & 1 && zo(i, c, t),
              (t = w),
              (a = c));
            var k = t.updateQueue;
            if (k === null) {
              var _ = new Set();
              (_.add(a), (t.updateQueue = _));
            } else k.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              (zo(i, c, t), Rs());
              break e;
            }
            a = Error(g(426));
          }
        } else if (F && o.mode & 1) {
          var O = Lo(s);
          if (O !== null) {
            (!(O.flags & 65536) && (O.flags |= 256),
              Ro(O, s, o, i, t),
              ps(rn(a, o)));
            break e;
          }
        }
        ((i = a = rn(a, o)),
          K !== 4 && (K = 2),
          zn === null ? (zn = [i]) : zn.push(i),
          (i = s));
        do {
          switch (i.tag) {
            case 3:
              ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
              var d = Du(i, a, t);
              Eo(i, d);
              break e;
            case 1:
              o = a;
              var u = i.type,
                p = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof u.getDerivedStateFromError == 'function' ||
                  (p !== null &&
                    typeof p.componentDidCatch == 'function' &&
                    (ut === null || !ut.has(p))))
              ) {
                ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
                var y = Iu(i, o, t);
                Eo(i, y);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      nc(n);
    } catch (x) {
      ((t = x), Y === n && n !== null && (Y = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function ec() {
  var e = br.current;
  return ((br.current = qr), e === null ? qr : e);
}
function Rs() {
  ((K === 0 || K === 3 || K === 2) && (K = 4),
    q === null || (!(Pt & 268435455) && !(hl & 268435455)) || tt(q, ee));
}
function nl(e, t) {
  var n = R;
  R |= 2;
  var r = ec();
  (q !== e || ee !== t) && (($e = null), Et(e, t));
  do
    try {
      jp();
      break;
    } catch (l) {
      bu(e, l);
    }
  while (!0);
  if ((hs(), (R = n), (br.current = r), Y !== null)) throw Error(g(261));
  return ((q = null), (ee = 0), K);
}
function jp() {
  for (; Y !== null; ) tc(Y);
}
function Pp() {
  for (; Y !== null && !ed(); ) tc(Y);
}
function tc(e) {
  var t = lc(e.alternate, e, ve);
  ((e.memoizedProps = e.pendingProps),
    t === null ? nc(e) : (Y = t),
    (Ts.current = null));
}
function nc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = _p(n, t)), n !== null)) {
        ((n.flags &= 32767), (Y = n));
        return;
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((K = 6), (Y = null));
        return;
      }
    } else if (((n = xp(n, t, ve)), n !== null)) {
      Y = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      Y = t;
      return;
    }
    Y = t = e;
  } while (t !== null);
  K === 0 && (K = 5);
}
function kt(e, t, n) {
  var r = M,
    l = Ce.transition;
  try {
    ((Ce.transition = null), (M = 1), zp(e, t, n, r));
  } finally {
    ((Ce.transition = l), (M = r));
  }
  return null;
}
function zp(e, t, n, r) {
  do Jt();
  while (rt !== null);
  if (R & 6) throw Error(g(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(g(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var i = n.lanes | n.childLanes;
  if (
    (cd(e, i),
    e === q && ((Y = q = null), (ee = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      yr ||
      ((yr = !0),
      ic(Ir, function () {
        return (Jt(), null);
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    ((i = Ce.transition), (Ce.transition = null));
    var s = M;
    M = 1;
    var o = R;
    ((R |= 4),
      (Ts.current = null),
      Ep(e, n),
      Xu(n, e),
      Xd(wi),
      (Zr = !!gi),
      (wi = gi = null),
      (e.current = n),
      Cp(n),
      td(),
      (R = o),
      (M = s),
      (Ce.transition = i));
  } else e.current = n;
  if (
    (yr && ((yr = !1), (rt = e), (tl = l)),
    (i = e.pendingLanes),
    i === 0 && (ut = null),
    ld(n.stateNode),
    me(e, H()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest }));
  if (el) throw ((el = !1), (e = Zi), (Zi = null), e);
  return (
    tl & 1 && e.tag !== 0 && Jt(),
    (i = e.pendingLanes),
    i & 1 ? (e === Ui ? Ln++ : ((Ln = 0), (Ui = e))) : (Ln = 0),
    vt(),
    null
  );
}
function Jt() {
  if (rt !== null) {
    var e = Da(tl),
      t = Ce.transition,
      n = M;
    try {
      if (((Ce.transition = null), (M = 16 > e ? 16 : e), rt === null))
        var r = !1;
      else {
        if (((e = rt), (rt = null), (tl = 0), R & 6)) throw Error(g(331));
        var l = R;
        for (R |= 4, S = e.current; S !== null; ) {
          var i = S,
            s = i.child;
          if (S.flags & 16) {
            var o = i.deletions;
            if (o !== null) {
              for (var a = 0; a < o.length; a++) {
                var c = o[a];
                for (S = c; S !== null; ) {
                  var v = S;
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pn(8, v, i);
                  }
                  var m = v.child;
                  if (m !== null) ((m.return = v), (S = m));
                  else
                    for (; S !== null; ) {
                      v = S;
                      var h = v.sibling,
                        w = v.return;
                      if ((Qu(v), v === c)) {
                        S = null;
                        break;
                      }
                      if (h !== null) {
                        ((h.return = w), (S = h));
                        break;
                      }
                      S = w;
                    }
                }
              }
              var k = i.alternate;
              if (k !== null) {
                var _ = k.child;
                if (_ !== null) {
                  k.child = null;
                  do {
                    var O = _.sibling;
                    ((_.sibling = null), (_ = O));
                  } while (_ !== null);
                }
              }
              S = i;
            }
          }
          if (i.subtreeFlags & 2064 && s !== null) ((s.return = i), (S = s));
          else
            e: for (; S !== null; ) {
              if (((i = S), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Pn(9, i, i.return);
                }
              var d = i.sibling;
              if (d !== null) {
                ((d.return = i.return), (S = d));
                break e;
              }
              S = i.return;
            }
        }
        var u = e.current;
        for (S = u; S !== null; ) {
          s = S;
          var p = s.child;
          if (s.subtreeFlags & 2064 && p !== null) ((p.return = s), (S = p));
          else
            e: for (s = u; S !== null; ) {
              if (((o = S), o.flags & 2048))
                try {
                  switch (o.tag) {
                    case 0:
                    case 11:
                    case 15:
                      fl(9, o);
                  }
                } catch (x) {
                  A(o, o.return, x);
                }
              if (o === s) {
                S = null;
                break e;
              }
              var y = o.sibling;
              if (y !== null) {
                ((y.return = o.return), (S = y));
                break e;
              }
              S = o.return;
            }
        }
        if (
          ((R = l), vt(), Ze && typeof Ze.onPostCommitFiberRoot == 'function')
        )
          try {
            Ze.onPostCommitFiberRoot(il, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((M = n), (Ce.transition = t));
    }
  }
  return !1;
}
function Ho(e, t, n) {
  ((t = rn(n, t)),
    (t = Du(e, t, 1)),
    (e = at(e, t, 1)),
    (t = ae()),
    e !== null && (Xn(e, 1, t), me(e, t)));
}
function A(e, t, n) {
  if (e.tag === 3) Ho(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Ho(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == 'function' ||
          (typeof r.componentDidCatch == 'function' &&
            (ut === null || !ut.has(r)))
        ) {
          ((e = rn(n, e)),
            (e = Iu(t, e, 1)),
            (t = at(t, e, 1)),
            (e = ae()),
            t !== null && (Xn(t, 1, e), me(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function Lp(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = ae()),
    (e.pingedLanes |= e.suspendedLanes & n),
    q === e &&
      (ee & n) === n &&
      (K === 4 || (K === 3 && (ee & 130023424) === ee && 500 > H() - Ps)
        ? Et(e, 0)
        : (js |= n)),
    me(e, t));
}
function rc(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = or), (or <<= 1), !(or & 130023424) && (or = 4194304))
      : (t = 1));
  var n = ae();
  ((e = Ke(e, t)), e !== null && (Xn(e, t, n), me(e, n)));
}
function Rp(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), rc(e, n));
}
function Mp(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(g(314));
  }
  (r !== null && r.delete(t), rc(e, n));
}
var lc;
lc = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || fe.current) pe = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((pe = !1), kp(e, t, n));
      pe = !!(e.flags & 131072);
    }
  else ((pe = !1), F && t.flags & 1048576 && au(t, Yr, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (jr(e, t), (e = t.pendingProps));
      var l = bt(t, se.current);
      (Xt(t, n), (l = _s(null, t, r, e, l, n)));
      var i = Ss();
      return (
        (t.flags |= 1),
        typeof l == 'object' &&
        l !== null &&
        typeof l.render == 'function' &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            he(r) ? ((i = !0), Wr(t)) : (i = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            ys(t),
            (l.updater = pl),
            (t.stateNode = l),
            (l._reactInternals = t),
            ji(t, r, e, n),
            (t = Li(null, t, r, !0, i, n)))
          : ((t.tag = 0), F && i && cs(t), oe(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (jr(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = Bp(r)),
          (e = ze(r, e)),
          l)
        ) {
          case 0:
            t = zi(null, t, r, e, n);
            break e;
          case 1:
            t = Bo(null, t, r, e, n);
            break e;
          case 11:
            t = Mo(null, t, r, e, n);
            break e;
          case 14:
            t = Oo(null, t, r, ze(r.type, e), n);
            break e;
        }
        throw Error(g(306, r, ''));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : ze(r, l)),
        zi(e, t, r, l, n)
      );
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : ze(r, l)),
        Bo(e, t, r, l, n)
      );
    case 3:
      e: {
        if (($u(t), e === null)) throw Error(g(387));
        ((r = t.pendingProps),
          (i = t.memoizedState),
          (l = i.element),
          hu(e, t),
          Gr(t, r, null, n));
        var s = t.memoizedState;
        if (((r = s.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: s.cache,
              pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
              transitions: s.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            ((l = rn(Error(g(423)), t)), (t = Do(e, t, r, n, l)));
            break e;
          } else if (r !== l) {
            ((l = rn(Error(g(424)), t)), (t = Do(e, t, r, n, l)));
            break e;
          } else
            for (
              ye = ot(t.stateNode.containerInfo.firstChild),
                ge = t,
                F = !0,
                Re = null,
                n = pu(t, null, r, n),
                t.child = n;
              n;

            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((en(), r === l)) {
            t = Ge(e, t, n);
            break e;
          }
          oe(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        mu(t),
        e === null && Ci(t),
        (r = t.type),
        (l = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (s = l.children),
        ki(r, l) ? (s = null) : i !== null && ki(r, i) && (t.flags |= 32),
        Uu(e, t),
        oe(e, t, s, n),
        t.child
      );
    case 6:
      return (e === null && Ci(t), null);
    case 13:
      return Au(e, t, n);
    case 4:
      return (
        gs(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = tn(t, null, r, n)) : oe(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : ze(r, l)),
        Mo(e, t, r, l, n)
      );
    case 7:
      return (oe(e, t, t.pendingProps, n), t.child);
    case 8:
      return (oe(e, t, t.pendingProps.children, n), t.child);
    case 12:
      return (oe(e, t, t.pendingProps.children, n), t.child);
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (i = t.memoizedProps),
          (s = l.value),
          B(Qr, r._currentValue),
          (r._currentValue = s),
          i !== null)
        )
          if (Be(i.value, s)) {
            if (i.children === l.children && !fe.current) {
              t = Ge(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var o = i.dependencies;
              if (o !== null) {
                s = i.child;
                for (var a = o.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (i.tag === 1) {
                      ((a = He(-1, n & -n)), (a.tag = 2));
                      var c = i.updateQueue;
                      if (c !== null) {
                        c = c.shared;
                        var v = c.pending;
                        (v === null
                          ? (a.next = a)
                          : ((a.next = v.next), (v.next = a)),
                          (c.pending = a));
                      }
                    }
                    ((i.lanes |= n),
                      (a = i.alternate),
                      a !== null && (a.lanes |= n),
                      Ni(i.return, n, t),
                      (o.lanes |= n));
                    break;
                  }
                  a = a.next;
                }
              } else if (i.tag === 10) s = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((s = i.return), s === null)) throw Error(g(341));
                ((s.lanes |= n),
                  (o = s.alternate),
                  o !== null && (o.lanes |= n),
                  Ni(s, n, t),
                  (s = i.sibling));
              } else s = i.child;
              if (s !== null) s.return = i;
              else
                for (s = i; s !== null; ) {
                  if (s === t) {
                    s = null;
                    break;
                  }
                  if (((i = s.sibling), i !== null)) {
                    ((i.return = s.return), (s = i));
                    break;
                  }
                  s = s.return;
                }
              i = s;
            }
        (oe(e, t, l.children, n), (t = t.child));
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        Xt(t, n),
        (l = Ne(l)),
        (r = r(l)),
        (t.flags |= 1),
        oe(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (l = ze(r, t.pendingProps)),
        (l = ze(r.type, l)),
        Oo(e, t, r, l, n)
      );
    case 15:
      return Fu(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : ze(r, l)),
        jr(e, t),
        (t.tag = 1),
        he(r) ? ((e = !0), Wr(t)) : (e = !1),
        Xt(t, n),
        Bu(t, r, l),
        ji(t, r, l, n),
        Li(null, t, r, !0, e, n)
      );
    case 19:
      return Vu(e, t, n);
    case 22:
      return Zu(e, t, n);
  }
  throw Error(g(156, t.tag));
};
function ic(e, t) {
  return Ra(e, t);
}
function Op(e, t, n, r) {
  ((this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function Ee(e, t, n, r) {
  return new Op(e, t, n, r);
}
function Ms(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function Bp(e) {
  if (typeof e == 'function') return Ms(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === qi)) return 11;
    if (e === bi) return 14;
  }
  return 2;
}
function dt(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Ee(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Lr(e, t, n, r, l, i) {
  var s = 2;
  if (((r = e), typeof e == 'function')) Ms(e) && (s = 1);
  else if (typeof e == 'string') s = 5;
  else
    e: switch (e) {
      case Bt:
        return Ct(n.children, l, i, t);
      case Ji:
        ((s = 8), (l |= 8));
        break;
      case ql:
        return (
          (e = Ee(12, n, t, l | 2)),
          (e.elementType = ql),
          (e.lanes = i),
          e
        );
      case bl:
        return ((e = Ee(13, n, t, l)), (e.elementType = bl), (e.lanes = i), e);
      case ei:
        return ((e = Ee(19, n, t, l)), (e.elementType = ei), (e.lanes = i), e);
      case ma:
        return ml(n, l, i, t);
      default:
        if (typeof e == 'object' && e !== null)
          switch (e.$$typeof) {
            case fa:
              s = 10;
              break e;
            case ha:
              s = 9;
              break e;
            case qi:
              s = 11;
              break e;
            case bi:
              s = 14;
              break e;
            case qe:
              ((s = 16), (r = null));
              break e;
          }
        throw Error(g(130, e == null ? e : typeof e, ''));
    }
  return (
    (t = Ee(s, n, t, l)),
    (t.elementType = e),
    (t.type = r),
    (t.lanes = i),
    t
  );
}
function Ct(e, t, n, r) {
  return ((e = Ee(7, e, r, t)), (e.lanes = n), e);
}
function ml(e, t, n, r) {
  return (
    (e = Ee(22, e, r, t)),
    (e.elementType = ma),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Ql(e, t, n) {
  return ((e = Ee(6, e, null, t)), (e.lanes = n), e);
}
function Kl(e, t, n) {
  return (
    (t = Ee(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Dp(e, t, n, r, l) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = jl(0)),
    (this.expirationTimes = jl(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = jl(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null));
}
function Os(e, t, n, r, l, i, s, o, a) {
  return (
    (e = new Dp(e, t, n, o, a)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = Ee(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    ys(i),
    e
  );
}
function Ip(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Ot,
    key: r == null ? null : '' + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function sc(e) {
  if (!e) return ft;
  e = e._reactInternals;
  e: {
    if (Rt(e) !== e || e.tag !== 1) throw Error(g(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (he(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(g(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (he(n)) return su(e, n, t);
  }
  return t;
}
function oc(e, t, n, r, l, i, s, o, a) {
  return (
    (e = Os(n, r, !0, e, l, i, s, o, a)),
    (e.context = sc(null)),
    (n = e.current),
    (r = ae()),
    (l = ct(n)),
    (i = He(r, l)),
    (i.callback = t ?? null),
    at(n, i, l),
    (e.current.lanes = l),
    Xn(e, l, r),
    me(e, r),
    e
  );
}
function vl(e, t, n, r) {
  var l = t.current,
    i = ae(),
    s = ct(l);
  return (
    (n = sc(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = He(i, s)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = at(l, t, s)),
    e !== null && (Oe(e, l, s, i), Cr(e, l, s)),
    s
  );
}
function rl(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Yo(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Bs(e, t) {
  (Yo(e, t), (e = e.alternate) && Yo(e, t));
}
function Fp() {
  return null;
}
var ac =
  typeof reportError == 'function'
    ? reportError
    : function (e) {
        console.error(e);
      };
function Ds(e) {
  this._internalRoot = e;
}
yl.prototype.render = Ds.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(g(409));
  vl(e, t, null, null);
};
yl.prototype.unmount = Ds.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (zt(function () {
      vl(null, e, null, null);
    }),
      (t[Qe] = null));
  }
};
function yl(e) {
  this._internalRoot = e;
}
yl.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Za();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < et.length && t !== 0 && t < et[n].priority; n++);
    (et.splice(n, 0, e), n === 0 && $a(e));
  }
};
function Is(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function gl(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
  );
}
function Qo() {}
function Zp(e, t, n, r, l) {
  if (l) {
    if (typeof r == 'function') {
      var i = r;
      r = function () {
        var c = rl(s);
        i.call(c);
      };
    }
    var s = oc(t, r, e, 0, null, !1, !1, '', Qo);
    return (
      (e._reactRootContainer = s),
      (e[Qe] = s.current),
      Un(e.nodeType === 8 ? e.parentNode : e),
      zt(),
      s
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == 'function') {
    var o = r;
    r = function () {
      var c = rl(a);
      o.call(c);
    };
  }
  var a = Os(e, 0, !1, null, null, !1, !1, '', Qo);
  return (
    (e._reactRootContainer = a),
    (e[Qe] = a.current),
    Un(e.nodeType === 8 ? e.parentNode : e),
    zt(function () {
      vl(t, a, n, r);
    }),
    a
  );
}
function wl(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var s = i;
    if (typeof l == 'function') {
      var o = l;
      l = function () {
        var a = rl(s);
        o.call(a);
      };
    }
    vl(t, s, e, l);
  } else s = Zp(n, t, e, l, r);
  return rl(s);
}
Ia = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = xn(t.pendingLanes);
        n !== 0 &&
          (ns(t, n | 1), me(t, H()), !(R & 6) && ((ln = H() + 500), vt()));
      }
      break;
    case 13:
      (zt(function () {
        var r = Ke(e, 1);
        if (r !== null) {
          var l = ae();
          Oe(r, e, 1, l);
        }
      }),
        Bs(e, 1));
  }
};
rs = function (e) {
  if (e.tag === 13) {
    var t = Ke(e, 134217728);
    if (t !== null) {
      var n = ae();
      Oe(t, e, 134217728, n);
    }
    Bs(e, 134217728);
  }
};
Fa = function (e) {
  if (e.tag === 13) {
    var t = ct(e),
      n = Ke(e, t);
    if (n !== null) {
      var r = ae();
      Oe(n, e, t, r);
    }
    Bs(e, t);
  }
};
Za = function () {
  return M;
};
Ua = function (e, t) {
  var n = M;
  try {
    return ((M = e), t());
  } finally {
    M = n;
  }
};
ci = function (e, t, n) {
  switch (t) {
    case 'input':
      if ((ri(e, n), (t = n.name), n.type === 'radio' && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            'input[name=' + JSON.stringify('' + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = ul(r);
            if (!l) throw Error(g(90));
            (ya(r), ri(r, l));
          }
        }
      }
      break;
    case 'textarea':
      wa(e, n);
      break;
    case 'select':
      ((t = n.value), t != null && Yt(e, !!n.multiple, t, !1));
  }
};
Na = zs;
Ta = zt;
var Up = { usingClientEntryPoint: !1, Events: [qn, Zt, ul, Ea, Ca, zs] },
  gn = {
    findFiberByHostInstance: xt,
    bundleType: 0,
    version: '18.3.1',
    rendererPackageName: 'react-dom',
  },
  $p = {
    bundleType: gn.bundleType,
    version: gn.version,
    rendererPackageName: gn.rendererPackageName,
    rendererConfig: gn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Xe.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = za(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: gn.findFiberByHostInstance || Fp,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
  var gr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!gr.isDisabled && gr.supportsFiber)
    try {
      ((il = gr.inject($p)), (Ze = gr));
    } catch {}
}
ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Up;
ke.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Is(t)) throw Error(g(200));
  return Ip(e, t, null, n);
};
ke.createRoot = function (e, t) {
  if (!Is(e)) throw Error(g(299));
  var n = !1,
    r = '',
    l = ac;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = Os(e, 1, !1, null, null, n, !1, r, l)),
    (e[Qe] = t.current),
    Un(e.nodeType === 8 ? e.parentNode : e),
    new Ds(t)
  );
};
ke.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == 'function'
      ? Error(g(188))
      : ((e = Object.keys(e).join(',')), Error(g(268, e)));
  return ((e = za(t)), (e = e === null ? null : e.stateNode), e);
};
ke.flushSync = function (e) {
  return zt(e);
};
ke.hydrate = function (e, t, n) {
  if (!gl(t)) throw Error(g(200));
  return wl(null, e, t, !0, n);
};
ke.hydrateRoot = function (e, t, n) {
  if (!Is(e)) throw Error(g(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    i = '',
    s = ac;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
    (t = oc(t, null, e, 1, n ?? null, l, !1, i, s)),
    (e[Qe] = t.current),
    Un(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      ((n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l));
  return new yl(t);
};
ke.render = function (e, t, n) {
  if (!gl(t)) throw Error(g(200));
  return wl(null, e, t, !1, n);
};
ke.unmountComponentAtNode = function (e) {
  if (!gl(e)) throw Error(g(40));
  return e._reactRootContainer
    ? (zt(function () {
        wl(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[Qe] = null));
        });
      }),
      !0)
    : !1;
};
ke.unstable_batchedUpdates = zs;
ke.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!gl(n)) throw Error(g(200));
  if (e == null || e._reactInternals === void 0) throw Error(g(38));
  return wl(e, t, n, !1, r);
};
ke.version = '18.3.1-next-f1338f8080-20240426';
function uc() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(uc);
    } catch (e) {
      console.error(e);
    }
}
(uc(), (ua.exports = ke));
var Ap = ua.exports,
  cc,
  Ko = Ap;
((cc = Ko.createRoot), Ko.hydrateRoot);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var Vp = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Wp = (e) =>
    e
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .toLowerCase()
      .trim(),
  ne = (e, t) => {
    const n = X.forwardRef(
      (
        {
          color: r = 'currentColor',
          size: l = 24,
          strokeWidth: i = 2,
          absoluteStrokeWidth: s,
          className: o = '',
          children: a,
          ...c
        },
        v
      ) =>
        X.createElement(
          'svg',
          {
            ref: v,
            ...Vp,
            width: l,
            height: l,
            stroke: r,
            strokeWidth: s ? (Number(i) * 24) / Number(l) : i,
            className: ['lucide', `lucide-${Wp(e)}`, o].join(' '),
            ...c,
          },
          [
            ...t.map(([m, h]) => X.createElement(m, h)),
            ...(Array.isArray(a) ? a : [a]),
          ]
        )
    );
    return ((n.displayName = `${e}`), n);
  };
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Hp = ne('AlertCircle', [
  ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  ['line', { x1: '12', x2: '12', y1: '8', y2: '12', key: '1pkeuh' }],
  ['line', { x1: '12', x2: '12.01', y1: '16', y2: '16', key: '4dfq90' }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const dc = ne('Calendar', [
  ['path', { d: 'M8 2v4', key: '1cmpym' }],
  ['path', { d: 'M16 2v4', key: '4m81vk' }],
  [
    'rect',
    { width: '18', height: '18', x: '3', y: '4', rx: '2', key: '1hopcy' },
  ],
  ['path', { d: 'M3 10h18', key: '8toen8' }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Yp = ne('Car', [
  [
    'path',
    {
      d: 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2',
      key: '5owen',
    },
  ],
  ['circle', { cx: '7', cy: '17', r: '2', key: 'u2ysq9' }],
  ['path', { d: 'M9 17h6', key: 'r8uit2' }],
  ['circle', { cx: '17', cy: '17', r: '2', key: 'axvx0g' }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Qp = ne('ChevronLeft', [
  ['path', { d: 'm15 18-6-6 6-6', key: '1wnfg3' }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Kp = ne('ChevronRight', [
  ['path', { d: 'm9 18 6-6-6-6', key: 'mthhwq' }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Gp = ne('ChevronsLeft', [
  ['path', { d: 'm11 17-5-5 5-5', key: '13zhaf' }],
  ['path', { d: 'm18 17-5-5 5-5', key: 'h8a8et' }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Xp = ne('ChevronsRight', [
  ['path', { d: 'm6 17 5-5-5-5', key: 'xnjwq' }],
  ['path', { d: 'm13 17 5-5-5-5', key: '17xmmf' }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Jp = ne('Film', [
  [
    'rect',
    { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' },
  ],
  ['path', { d: 'M7 3v18', key: 'bbkbws' }],
  ['path', { d: 'M3 7.5h4', key: 'zfgn84' }],
  ['path', { d: 'M3 12h18', key: '1i2n21' }],
  ['path', { d: 'M3 16.5h4', key: '1230mu' }],
  ['path', { d: 'M17 3v18', key: 'in4fa5' }],
  ['path', { d: 'M17 7.5h4', key: 'myr1c1' }],
  ['path', { d: 'M17 16.5h4', key: 'go4c1d' }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const qp = ne('Loader2', [
  ['path', { d: 'M21 12a9 9 0 1 1-6.219-8.56', key: '13zald' }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const bp = ne('MapPin', [
  [
    'path',
    { d: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z', key: '2oe9fu' },
  ],
  ['circle', { cx: '12', cy: '10', r: '3', key: 'ilqhr7' }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ef = ne('RefreshCw', [
  [
    'path',
    { d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', key: 'v9h5vc' },
  ],
  ['path', { d: 'M21 3v5h-5', key: '1q7to0' }],
  [
    'path',
    { d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', key: '3uifl3' },
  ],
  ['path', { d: 'M8 16H3v5', key: '1cv678' }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const tf = ne('Rocket', [
  [
    'path',
    {
      d: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z',
      key: 'm3kijz',
    },
  ],
  [
    'path',
    {
      d: 'm12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z',
      key: '1fmvmk',
    },
  ],
  ['path', { d: 'M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0', key: '1f8sc4' }],
  ['path', { d: 'M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5', key: 'qeys4' }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const pc = ne('Ruler', [
  [
    'path',
    {
      d: 'M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z',
      key: 'icamh8',
    },
  ],
  ['path', { d: 'm14.5 12.5 2-2', key: 'inckbg' }],
  ['path', { d: 'm11.5 9.5 2-2', key: 'fmmyf7' }],
  ['path', { d: 'm8.5 6.5 2-2', key: 'vc6u1g' }],
  ['path', { d: 'm17.5 15.5 2-2', key: 'wo5hmg' }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const nf = ne('Search', [
  ['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
  ['path', { d: 'm21 21-4.3-4.3', key: '1qie3q' }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Rr = ne('User', [
  ['path', { d: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2', key: '975kel' }],
  ['circle', { cx: '12', cy: '7', r: '4', key: '17ys0d' }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const fc = ne('Weight', [
  ['circle', { cx: '12', cy: '5', r: '3', key: 'rqqgnr' }],
  [
    'path',
    {
      d: 'M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z',
      key: '56o5sh',
    },
  ],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const rf = ne('X', [
    ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
    ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
  ]),
  Gl = 'starwars-search-term',
  lf = ({ onSearch: e, isLoading: t }) => {
    const [n, r] = X.useState(localStorage.getItem(Gl) || '');
    X.useEffect(() => {
      const o = localStorage.getItem(Gl);
      o && e(o, 1);
    }, [e]);
    const l = (o) => {
        r(o.target.value);
      },
      i = () => {
        const o = n.trim();
        (localStorage.setItem(Gl, o), e(o, 1));
      },
      s = (o) => {
        o.key === 'Enter' && i();
      };
    return f.jsx('div', {
      className: 'bg-white shadow-sm border-b border-gray-200 p-6',
      children: f.jsxs('div', {
        className: 'max-w-4xl mx-auto',
        children: [
          f.jsx('h1', {
            className: 'text-3xl font-bold text-gray-900 mb-6 text-center',
            children: 'Star Wars Character Search',
          }),
          f.jsxs('div', {
            className:
              'flex flex-col sm:flex-row gap-4 items-stretch sm:items-center',
            children: [
              f.jsxs('div', {
                className: 'flex-1 relative',
                children: [
                  f.jsx(nf, {
                    className:
                      'absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400',
                  }),
                  f.jsx('input', {
                    'data-testid': 'search-box',
                    type: 'text',
                    value: n,
                    onChange: l,
                    onKeyPress: s,
                    placeholder: 'Search for Star Wars characters...',
                    disabled: t,
                    className:
                      'w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed',
                  }),
                ],
              }),
              f.jsx('button', {
                'data-testid': 'search-button',
                onClick: i,
                disabled: t,
                className:
                  'px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium',
                children: t ? 'Searching...' : 'Search',
              }),
            ],
          }),
        ],
      }),
    });
  },
  sf = (e) => {
    const t = [];
    return (
      e.gender !== 'unknown' && t.push(e.gender),
      e.birth_year !== 'unknown' && t.push(`Born ${e.birth_year}`),
      e.height !== 'unknown' && t.push(`${e.height}cm tall`),
      e.mass !== 'unknown' && t.push(`${e.mass}kg`),
      t.join(' • ')
    );
  },
  of = ({ character: e, onClick: t }) => {
    const n = sf(e),
      r = () => {
        t && t(e);
      };
    return f.jsx('div', {
      className:
        'bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 border border-gray-200 cursor-pointer hover:border-blue-300 hover:scale-[1.02]',
      onClick: r,
      children: f.jsxs('div', {
        className: 'flex items-start space-x-4',
        children: [
          f.jsx('div', {
            className: 'flex-shrink-0',
            children: f.jsx('div', {
              className:
                'w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center',
              children: f.jsx(Rr, {
                'data-testid': 'avatar',
                className: 'w-6 h-6 text-white',
              }),
            }),
          }),
          f.jsxs('div', {
            className: 'flex-1 min-w-0',
            children: [
              f.jsx('h3', {
                className: 'text-lg font-semibold text-gray-900 mb-2',
                children: e.name,
              }),
              n &&
                f.jsx('p', {
                  className: 'text-gray-600 text-sm mb-3',
                  children: n,
                }),
              f.jsxs('div', {
                className: 'flex flex-wrap gap-4 text-xs text-gray-500',
                children: [
                  e.height !== 'unknown' &&
                    f.jsxs('div', {
                      className: 'flex items-center space-x-1',
                      children: [
                        f.jsx(pc, { className: 'w-3 h-3' }),
                        f.jsxs('span', { children: [e.height, 'cm'] }),
                      ],
                    }),
                  e.mass !== 'unknown' &&
                    f.jsxs('div', {
                      className: 'flex items-center space-x-1',
                      children: [
                        f.jsx(fc, { className: 'w-3 h-3' }),
                        f.jsxs('span', { children: [e.mass, 'kg'] }),
                      ],
                    }),
                  e.birth_year !== 'unknown' &&
                    f.jsxs('div', {
                      className: 'flex items-center space-x-1',
                      children: [
                        f.jsx(dc, { className: 'w-3 h-3' }),
                        f.jsx('span', { children: e.birth_year }),
                      ],
                    }),
                ],
              }),
            ],
          }),
        ],
      }),
    });
  },
  af = () =>
    f.jsxs('div', {
      className: 'flex flex-col items-center justify-center py-12',
      children: [
        f.jsx(qp, {
          'data-testid': 'spinner',
          className: 'w-8 h-8 text-blue-600 animate-spin mb-4',
        }),
        f.jsx('p', {
          className: 'text-gray-600',
          children: 'Searching the galaxy...',
        }),
      ],
    }),
  uf = ({ message: e, onRetry: t }) =>
    f.jsx('div', {
      className: 'flex flex-col items-center justify-center py-12',
      children: f.jsxs('div', {
        className:
          'bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full',
        children: [
          f.jsxs('div', {
            className: 'flex items-center mb-4',
            children: [
              f.jsx(Hp, {
                'data-testid': 'error-icon',
                className: 'w-6 h-6 text-red-600 mr-3',
              }),
              f.jsx('h3', {
                className: 'text-lg font-semibold text-red-800',
                children: 'Error',
              }),
            ],
          }),
          f.jsx('p', { className: 'text-red-700 mb-4', children: e }),
          f.jsxs('button', {
            onClick: t,
            className:
              'flex items-center justify-center w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors',
            children: [f.jsx(ef, { className: 'w-4 h-4 mr-2' }), 'Try Again'],
          }),
        ],
      }),
    }),
  cf = ({ pagination: e, onPageChange: t, isLoading: n }) => {
    const {
      currentPage: r,
      totalPages: l,
      totalCount: i,
      hasNext: s,
      hasPrevious: o,
    } = e;
    if (l <= 1) return null;
    const c = (() => {
      const m = [],
        h = [];
      for (let w = Math.max(2, r - 2); w <= Math.min(l - 1, r + 2); w++)
        m.push(w);
      return (
        r - 2 > 2 ? h.push(1, '...') : h.push(1),
        h.push(...m),
        r + 2 < l - 1 ? h.push('...', l) : l > 1 && h.push(l),
        h
      );
    })();
    return f.jsxs('div', {
      className: 'flex flex-col items-center space-y-4 py-6',
      children: [
        f.jsxs('div', {
          className: 'text-sm text-gray-600',
          children: [
            'Showing page ',
            r,
            ' of ',
            l,
            ' (',
            i,
            ' total characters)',
          ],
        }),
        f.jsxs('div', {
          className: 'flex items-center space-x-1',
          children: [
            f.jsx('button', {
              onClick: () => t(1),
              disabled: !o || n,
              className:
                'p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
              title: 'First page',
              children: f.jsx(Gp, { className: 'w-4 h-4' }),
            }),
            f.jsx('button', {
              onClick: () => t(r - 1),
              disabled: !o || n,
              className:
                'p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
              title: 'Previous page',
              children: f.jsx(Qp, { className: 'w-4 h-4' }),
            }),
            f.jsx('div', {
              className: 'flex items-center space-x-1',
              children: c.map((v, m) =>
                f.jsx(
                  Lc.Fragment,
                  {
                    children:
                      v === '...'
                        ? f.jsx('span', {
                            className: 'px-3 py-2 text-gray-500',
                            children: '...',
                          })
                        : f.jsx('button', {
                            onClick: () => t(v),
                            disabled: n,
                            className: `px-3 py-2 rounded-md border transition-colors ${v === r ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'} disabled:opacity-50 disabled:cursor-not-allowed`,
                            children: v,
                          }),
                  },
                  m
                )
              ),
            }),
            f.jsx('button', {
              onClick: () => t(r + 1),
              disabled: !s || n,
              className:
                'p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
              title: 'Next page',
              children: f.jsx(Kp, { className: 'w-4 h-4' }),
            }),
            f.jsx('button', {
              onClick: () => t(l),
              disabled: !s || n,
              className:
                'p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
              title: 'Last page',
              children: f.jsx(Xp, { className: 'w-4 h-4' }),
            }),
          ],
        }),
      ],
    });
  },
  df = ({
    characters: e,
    pagination: t,
    isLoading: n,
    error: r,
    onRetry: l,
    onPageChange: i,
    onCharacterClick: s,
  }) =>
    f.jsx('div', {
      className: 'flex-1 p-6 bg-gray-50 transition-all duration-300',
      children: f.jsxs('div', {
        className: 'max-w-4xl mx-auto',
        children: [
          n && f.jsx(af, {}),
          r && f.jsx(uf, { message: r, onRetry: l }),
          !n &&
            !r &&
            e.length === 0 &&
            f.jsx('div', {
              className: 'text-center py-12',
              children: f.jsx('p', {
                className: 'text-gray-500 text-lg',
                children: 'No characters found. Try a different search term.',
              }),
            }),
          !n &&
            !r &&
            e.length > 0 &&
            f.jsxs('div', {
              children: [
                f.jsx('div', {
                  className: 'mb-6',
                  children: f.jsxs('h2', {
                    className: 'text-xl font-semibold text-gray-900',
                    children: [
                      'Search Results',
                      t &&
                        f.jsxs('span', {
                          className: 'text-gray-600 font-normal',
                          children: [
                            ' ',
                            '(',
                            t.totalCount,
                            ' character',
                            t.totalCount !== 1 ? 's' : '',
                            ' found)',
                          ],
                        }),
                    ],
                  }),
                }),
                f.jsx('div', {
                  className: 'grid gap-4 md:grid-cols-2 lg:grid-cols-1',
                  children: e.map((o, a) =>
                    f.jsx(of, { character: o, onClick: s }, `${o.url}-${a}`)
                  ),
                }),
                t &&
                  f.jsx(cf, { pagination: t, onPageChange: i, isLoading: n }),
              ],
            }),
        ],
      }),
    }),
  pf = ({ character: e, isOpen: t, onClose: n }) => {
    if (!t || !e) return null;
    const r = (i, s) =>
        !i || i.length === 0
          ? null
          : f.jsxs('div', {
              className: 'mb-4',
              children: [
                f.jsx('h4', {
                  className: 'font-semibold text-gray-900 mb-2',
                  children: s,
                }),
                f.jsxs('p', {
                  className: 'text-gray-600 text-sm',
                  children: [i.length, ' ', s.toLowerCase()],
                }),
              ],
            }),
      l = (i, s = 'Unknown') => (i && i !== 'unknown' && i !== 'n/a' ? i : s);
    return f.jsxs(f.Fragment, {
      children: [
        f.jsx('div', {
          className: 'fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden',
          onClick: n,
        }),
        f.jsx('div', {
          className: `fixed top-0 right-0 h-full w-full lg:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${t ? 'translate-x-0' : 'translate-x-full'}`,
          children: f.jsxs('div', {
            className: 'flex flex-col h-full',
            children: [
              f.jsxs('div', {
                className:
                  'flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600',
                children: [
                  f.jsx('h2', {
                    className: 'text-xl font-bold text-white truncate pr-4',
                    children: e.name,
                  }),
                  f.jsx('button', {
                    onClick: n,
                    className:
                      'p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors flex-shrink-0',
                    'aria-label': 'Close details panel',
                    children: f.jsx(rf, { className: 'w-5 h-5 text-white' }),
                  }),
                ],
              }),
              f.jsxs('div', {
                className: 'flex-1 overflow-y-auto p-6',
                children: [
                  f.jsx('div', {
                    className: 'flex justify-center mb-6',
                    children: f.jsx('div', {
                      className:
                        'w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center',
                      children: f.jsx(Rr, {
                        className: 'w-10 h-10 text-white',
                      }),
                    }),
                  }),
                  f.jsxs('div', {
                    className: 'space-y-4 mb-6',
                    children: [
                      f.jsx('h3', {
                        className:
                          'text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2',
                        children: 'Basic Information',
                      }),
                      f.jsxs('div', {
                        className: 'grid grid-cols-2 gap-4',
                        children: [
                          f.jsxs('div', {
                            className: 'flex items-center space-x-2',
                            children: [
                              f.jsx(Rr, { className: 'w-4 h-4 text-gray-500' }),
                              f.jsxs('div', {
                                children: [
                                  f.jsx('p', {
                                    className:
                                      'text-xs text-gray-500 uppercase tracking-wide',
                                    children: 'Gender',
                                  }),
                                  f.jsx('p', {
                                    className:
                                      'text-sm font-medium text-gray-900',
                                    children: l(e.gender),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          f.jsxs('div', {
                            className: 'flex items-center space-x-2',
                            children: [
                              f.jsx(dc, { className: 'w-4 h-4 text-gray-500' }),
                              f.jsxs('div', {
                                children: [
                                  f.jsx('p', {
                                    className:
                                      'text-xs text-gray-500 uppercase tracking-wide',
                                    children: 'Birth Year',
                                  }),
                                  f.jsx('p', {
                                    className:
                                      'text-sm font-medium text-gray-900',
                                    children: l(e.birth_year),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          f.jsxs('div', {
                            className: 'flex items-center space-x-2',
                            children: [
                              f.jsx(pc, { className: 'w-4 h-4 text-gray-500' }),
                              f.jsxs('div', {
                                children: [
                                  f.jsx('p', {
                                    className:
                                      'text-xs text-gray-500 uppercase tracking-wide',
                                    children: 'Height',
                                  }),
                                  f.jsxs('p', {
                                    className:
                                      'text-sm font-medium text-gray-900',
                                    children: [
                                      l(e.height, 'Unknown'),
                                      e.height !== 'unknown' &&
                                        e.height !== 'n/a' &&
                                        ' cm',
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          f.jsxs('div', {
                            className: 'flex items-center space-x-2',
                            children: [
                              f.jsx(fc, { className: 'w-4 h-4 text-gray-500' }),
                              f.jsxs('div', {
                                children: [
                                  f.jsx('p', {
                                    className:
                                      'text-xs text-gray-500 uppercase tracking-wide',
                                    children: 'Mass',
                                  }),
                                  f.jsxs('p', {
                                    className:
                                      'text-sm font-medium text-gray-900',
                                    children: [
                                      l(e.mass, 'Unknown'),
                                      e.mass !== 'unknown' &&
                                        e.mass !== 'n/a' &&
                                        ' kg',
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  f.jsxs('div', {
                    className: 'space-y-4 mb-6',
                    children: [
                      f.jsx('h3', {
                        className:
                          'text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2',
                        children: 'Physical Appearance',
                      }),
                      f.jsxs('div', {
                        className: 'space-y-3',
                        children: [
                          f.jsxs('div', {
                            children: [
                              f.jsx('p', {
                                className:
                                  'text-xs text-gray-500 uppercase tracking-wide mb-1',
                                children: 'Hair Color',
                              }),
                              f.jsx('p', {
                                className: 'text-sm text-gray-900',
                                children: l(e.hair_color),
                              }),
                            ],
                          }),
                          f.jsxs('div', {
                            children: [
                              f.jsx('p', {
                                className:
                                  'text-xs text-gray-500 uppercase tracking-wide mb-1',
                                children: 'Skin Color',
                              }),
                              f.jsx('p', {
                                className: 'text-sm text-gray-900',
                                children: l(e.skin_color),
                              }),
                            ],
                          }),
                          f.jsxs('div', {
                            children: [
                              f.jsx('p', {
                                className:
                                  'text-xs text-gray-500 uppercase tracking-wide mb-1',
                                children: 'Eye Color',
                              }),
                              f.jsx('p', {
                                className: 'text-sm text-gray-900',
                                children: l(e.eye_color),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  f.jsxs('div', {
                    className: 'space-y-4 mb-6',
                    children: [
                      f.jsx('h3', {
                        className:
                          'text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2',
                        children: 'Associations',
                      }),
                      f.jsxs('div', {
                        className: 'space-y-4',
                        children: [
                          f.jsxs('div', {
                            className: 'flex items-center space-x-2',
                            children: [
                              f.jsx(bp, { className: 'w-4 h-4 text-gray-500' }),
                              f.jsxs('div', {
                                children: [
                                  f.jsx('p', {
                                    className:
                                      'text-xs text-gray-500 uppercase tracking-wide',
                                    children: 'Homeworld',
                                  }),
                                  f.jsx('p', {
                                    className: 'text-sm text-gray-900',
                                    children: e.homeworld ? 'Known' : 'Unknown',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          r(e.films, 'Films') &&
                            f.jsxs('div', {
                              className: 'flex items-center space-x-2',
                              children: [
                                f.jsx(Jp, {
                                  className: 'w-4 h-4 text-gray-500',
                                }),
                                f.jsxs('div', {
                                  children: [
                                    f.jsx('p', {
                                      className:
                                        'text-xs text-gray-500 uppercase tracking-wide',
                                      children: 'Films',
                                    }),
                                    f.jsxs('p', {
                                      className: 'text-sm text-gray-900',
                                      children: [
                                        'Appeared in ',
                                        e.films.length,
                                        ' film',
                                        e.films.length !== 1 ? 's' : '',
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          e.species.length > 0 &&
                            f.jsxs('div', {
                              className: 'flex items-center space-x-2',
                              children: [
                                f.jsx(Rr, {
                                  className: 'w-4 h-4 text-gray-500',
                                }),
                                f.jsxs('div', {
                                  children: [
                                    f.jsx('p', {
                                      className:
                                        'text-xs text-gray-500 uppercase tracking-wide',
                                      children: 'Species',
                                    }),
                                    f.jsxs('p', {
                                      className: 'text-sm text-gray-900',
                                      children: [
                                        e.species.length,
                                        ' species association',
                                        e.species.length !== 1 ? 's' : '',
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          e.starships.length > 0 &&
                            f.jsxs('div', {
                              className: 'flex items-center space-x-2',
                              children: [
                                f.jsx(tf, {
                                  className: 'w-4 h-4 text-gray-500',
                                }),
                                f.jsxs('div', {
                                  children: [
                                    f.jsx('p', {
                                      className:
                                        'text-xs text-gray-500 uppercase tracking-wide',
                                      children: 'Starships',
                                    }),
                                    f.jsxs('p', {
                                      className: 'text-sm text-gray-900',
                                      children: [
                                        'Piloted ',
                                        e.starships.length,
                                        ' starship',
                                        e.starships.length !== 1 ? 's' : '',
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          e.vehicles.length > 0 &&
                            f.jsxs('div', {
                              className: 'flex items-center space-x-2',
                              children: [
                                f.jsx(Yp, {
                                  className: 'w-4 h-4 text-gray-500',
                                }),
                                f.jsxs('div', {
                                  children: [
                                    f.jsx('p', {
                                      className:
                                        'text-xs text-gray-500 uppercase tracking-wide',
                                      children: 'Vehicles',
                                    }),
                                    f.jsxs('p', {
                                      className: 'text-sm text-gray-900',
                                      children: [
                                        'Used ',
                                        e.vehicles.length,
                                        ' vehicle',
                                        e.vehicles.length !== 1 ? 's' : '',
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                        ],
                      }),
                    ],
                  }),
                  f.jsxs('div', {
                    className: 'space-y-4 pt-4 border-t border-gray-200',
                    children: [
                      f.jsx('h3', {
                        className: 'text-lg font-semibold text-gray-900',
                        children: 'Record Information',
                      }),
                      f.jsxs('div', {
                        className: 'space-y-2 text-xs text-gray-500',
                        children: [
                          f.jsxs('p', {
                            children: [
                              'Created: ',
                              new Date(e.created).toLocaleDateString(),
                            ],
                          }),
                          f.jsxs('p', {
                            children: [
                              'Last edited: ',
                              new Date(e.edited).toLocaleDateString(),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    });
  },
  Go = [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: ['https://swapi.dev/api/films/1/'],
      species: [],
      vehicles: ['https://swapi.dev/api/vehicles/14/'],
      starships: ['https://swapi.dev/api/starships/12/'],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
    },
    {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
      eye_color: 'yellow',
      birth_year: '41.9BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: ['https://swapi.dev/api/films/1/'],
      species: [],
      vehicles: [],
      starships: ['https://swapi.dev/api/starships/13/'],
      created: '2014-12-10T15:18:20.704000Z',
      edited: '2014-12-20T21:17:50.313000Z',
      url: 'https://swapi.dev/api/people/4/',
    },
    {
      name: 'Leia Organa',
      height: '150',
      mass: '49',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: '19BBY',
      gender: 'female',
      homeworld: 'https://swapi.dev/api/planets/2/',
      films: ['https://swapi.dev/api/films/1/'],
      species: [],
      vehicles: ['https://swapi.dev/api/vehicles/30/'],
      starships: [],
      created: '2014-12-10T15:20:09.791000Z',
      edited: '2014-12-20T21:17:50.315000Z',
      url: 'https://swapi.dev/api/people/5/',
    },
    {
      name: 'Han Solo',
      height: '180',
      mass: '80',
      hair_color: 'brown',
      skin_color: 'fair',
      eye_color: 'brown',
      birth_year: '29BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/22/',
      films: ['https://swapi.dev/api/films/1/'],
      species: [],
      vehicles: [],
      starships: ['https://swapi.dev/api/starships/10/'],
      created: '2014-12-10T16:49:14.582000Z',
      edited: '2014-12-20T21:17:50.334000Z',
      url: 'https://swapi.dev/api/people/14/',
    },
    {
      name: 'Chewbacca',
      height: '228',
      mass: '112',
      hair_color: 'brown',
      skin_color: 'unknown',
      eye_color: 'blue',
      birth_year: '200BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/14/',
      films: ['https://swapi.dev/api/films/1/'],
      species: ['https://swapi.dev/api/species/3/'],
      vehicles: ['https://swapi.dev/api/vehicles/19/'],
      starships: ['https://swapi.dev/api/starships/10/'],
      created: '2014-12-10T16:42:45.066000Z',
      edited: '2014-12-20T21:17:50.332000Z',
      url: 'https://swapi.dev/api/people/13/',
    },
    {
      name: 'Obi-Wan Kenobi',
      height: '182',
      mass: '77',
      hair_color: 'auburn, white',
      skin_color: 'fair',
      eye_color: 'blue-gray',
      birth_year: '57BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/20/',
      films: ['https://swapi.dev/api/films/1/'],
      species: [],
      vehicles: ['https://swapi.dev/api/vehicles/38/'],
      starships: ['https://swapi.dev/api/starships/48/'],
      created: '2014-12-10T16:16:29.192000Z',
      edited: '2014-12-20T21:17:50.325000Z',
      url: 'https://swapi.dev/api/people/10/',
    },
    {
      name: 'C-3PO',
      height: '167',
      mass: '75',
      hair_color: 'n/a',
      skin_color: 'gold',
      eye_color: 'yellow',
      birth_year: '112BBY',
      gender: 'n/a',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: ['https://swapi.dev/api/films/1/'],
      species: ['https://swapi.dev/api/species/2/'],
      vehicles: [],
      starships: [],
      created: '2014-12-10T15:10:51.357000Z',
      edited: '2014-12-20T21:17:50.309000Z',
      url: 'https://swapi.dev/api/people/2/',
    },
    {
      name: 'R2-D2',
      height: '96',
      mass: '32',
      hair_color: 'n/a',
      skin_color: 'white, blue',
      eye_color: 'red',
      birth_year: '33BBY',
      gender: 'n/a',
      homeworld: 'https://swapi.dev/api/planets/8/',
      films: ['https://swapi.dev/api/films/1/'],
      species: ['https://swapi.dev/api/species/2/'],
      vehicles: [],
      starships: [],
      created: '2014-12-10T15:11:50.376000Z',
      edited: '2014-12-20T21:17:50.311000Z',
      url: 'https://swapi.dev/api/people/3/',
    },
    {
      name: 'Anakin Skywalker',
      height: '188',
      mass: '84',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '41.9BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: ['https://swapi.dev/api/films/4/'],
      species: [],
      vehicles: ['https://swapi.dev/api/vehicles/44/'],
      starships: ['https://swapi.dev/api/starships/39/'],
      created: '2014-12-10T16:20:44.310000Z',
      edited: '2014-12-20T21:17:50.327000Z',
      url: 'https://swapi.dev/api/people/11/',
    },
    {
      name: 'Padmé Amidala',
      height: '185',
      mass: '45',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: '46BBY',
      gender: 'female',
      homeworld: 'https://swapi.dev/api/planets/8/',
      films: ['https://swapi.dev/api/films/4/'],
      species: [],
      vehicles: [],
      starships: ['https://swapi.dev/api/starships/39/'],
      created: '2014-12-19T17:28:26.926000Z',
      edited: '2014-12-20T21:17:50.401000Z',
      url: 'https://swapi.dev/api/people/27/',
    },
    {
      name: 'Yoda',
      height: '66',
      mass: '17',
      hair_color: 'white',
      skin_color: 'green',
      eye_color: 'brown',
      birth_year: '896BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/28/',
      films: ['https://swapi.dev/api/films/2/'],
      species: ['https://swapi.dev/api/species/6/'],
      vehicles: [],
      starships: [],
      created: '2014-12-15T12:26:01.042000Z',
      edited: '2014-12-20T21:17:50.345000Z',
      url: 'https://swapi.dev/api/people/20/',
    },
    {
      name: 'Mace Windu',
      height: '188',
      mass: '84',
      hair_color: 'none',
      skin_color: 'dark',
      eye_color: 'brown',
      birth_year: '72BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/22/',
      films: ['https://swapi.dev/api/films/4/'],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.375000Z',
      edited: '2014-12-20T21:17:50.375000Z',
      url: 'https://swapi.dev/api/people/51/',
    },
    {
      name: 'Qui-Gon Jinn',
      height: '193',
      mass: '89',
      hair_color: 'brown',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '92BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/28/',
      films: ['https://swapi.dev/api/films/4/'],
      species: [],
      vehicles: ['https://swapi.dev/api/vehicles/38/'],
      starships: [],
      created: '2014-12-19T16:54:53.618000Z',
      edited: '2014-12-20T21:17:50.375000Z',
      url: 'https://swapi.dev/api/people/32/',
    },
    {
      name: 'Palpatine',
      height: '170',
      mass: '75',
      hair_color: 'grey',
      skin_color: 'pale',
      eye_color: 'yellow',
      birth_year: '82BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/8/',
      films: ['https://swapi.dev/api/films/4/'],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-15T12:48:05.971000Z',
      edited: '2014-12-20T21:17:50.347000Z',
      url: 'https://swapi.dev/api/people/21/',
    },
    {
      name: 'Count Dooku',
      height: '193',
      mass: '80',
      hair_color: 'white',
      skin_color: 'fair',
      eye_color: 'brown',
      birth_year: '102BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/7/',
      films: ['https://swapi.dev/api/films/5/'],
      species: [],
      vehicles: ['https://swapi.dev/api/vehicles/55/'],
      starships: [],
      created: '2014-12-20T21:17:50.408000Z',
      edited: '2014-12-20T21:17:50.408000Z',
      url: 'https://swapi.dev/api/people/67/',
    },
    {
      name: 'Jar Jar Binks',
      height: '196',
      mass: '66',
      hair_color: 'none',
      skin_color: 'orange',
      eye_color: 'orange',
      birth_year: '52BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/8/',
      films: ['https://swapi.dev/api/films/4/'],
      species: ['https://swapi.dev/api/species/12/'],
      vehicles: [],
      starships: [],
      created: '2014-12-19T17:29:32.489000Z',
      edited: '2014-12-20T21:17:50.383000Z',
      url: 'https://swapi.dev/api/people/36/',
    },
    {
      name: 'General Grievous',
      height: '216',
      mass: '159',
      hair_color: 'none',
      skin_color: 'brown, white',
      eye_color: 'green, yellow',
      birth_year: 'unknown',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/23/',
      films: ['https://swapi.dev/api/films/6/'],
      species: ['https://swapi.dev/api/species/28/'],
      vehicles: ['https://swapi.dev/api/vehicles/60/'],
      starships: ['https://swapi.dev/api/starships/74/'],
      created: '2014-12-20T21:17:50.395000Z',
      edited: '2014-12-20T21:17:50.395000Z',
      url: 'https://swapi.dev/api/people/79/',
    },
    {
      name: 'Boba Fett',
      height: '183',
      mass: '78.2',
      hair_color: 'black',
      skin_color: 'fair',
      eye_color: 'brown',
      birth_year: '31.5BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/10/',
      films: ['https://swapi.dev/api/films/2/'],
      species: [],
      vehicles: [],
      starships: ['https://swapi.dev/api/starships/21/'],
      created: '2014-12-15T12:49:32.457000Z',
      edited: '2014-12-20T21:17:50.349000Z',
      url: 'https://swapi.dev/api/people/22/',
    },
    {
      name: 'Jango Fett',
      height: '183',
      mass: '79',
      hair_color: 'black',
      skin_color: 'tan',
      eye_color: 'brown',
      birth_year: '66BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/53/',
      films: ['https://swapi.dev/api/films/5/'],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.383000Z',
      edited: '2014-12-20T21:17:50.383000Z',
      url: 'https://swapi.dev/api/people/79/',
    },
    {
      name: 'Lando Calrissian',
      height: '177',
      mass: '79',
      hair_color: 'black',
      skin_color: 'dark',
      eye_color: 'brown',
      birth_year: '31BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/30/',
      films: ['https://swapi.dev/api/films/2/'],
      species: [],
      vehicles: [],
      starships: ['https://swapi.dev/api/starships/10/'],
      created: '2014-12-15T12:56:32.683000Z',
      edited: '2014-12-20T21:17:50.357000Z',
      url: 'https://swapi.dev/api/people/25/',
    },
    {
      name: 'Ahsoka Tano',
      height: '166',
      mass: '46',
      hair_color: 'none',
      skin_color: 'blue',
      eye_color: 'blue',
      birth_year: '36BBY',
      gender: 'female',
      homeworld: 'https://swapi.dev/api/planets/47/',
      films: [],
      species: ['https://swapi.dev/api/species/18/'],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.400000Z',
      edited: '2014-12-20T21:17:50.400000Z',
      url: 'https://swapi.dev/api/people/80/',
    },
    {
      name: 'Captain Rex',
      height: '183',
      mass: '78',
      hair_color: 'black',
      skin_color: 'tan',
      eye_color: 'brown',
      birth_year: '32BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/10/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.401000Z',
      edited: '2014-12-20T21:17:50.401000Z',
      url: 'https://swapi.dev/api/people/81/',
    },
    {
      name: 'Commander Cody',
      height: '183',
      mass: '78',
      hair_color: 'black',
      skin_color: 'tan',
      eye_color: 'brown',
      birth_year: '32BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/10/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.402000Z',
      edited: '2014-12-20T21:17:50.402000Z',
      url: 'https://swapi.dev/api/people/82/',
    },
    {
      name: 'Kanan Jarrus',
      height: '191',
      mass: '77',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'green',
      birth_year: '33BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/5/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.403000Z',
      edited: '2014-12-20T21:17:50.403000Z',
      url: 'https://swapi.dev/api/people/83/',
    },
    {
      name: 'Ezra Bridger',
      height: '165',
      mass: '56',
      hair_color: 'black',
      skin_color: 'light',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/22/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.404000Z',
      edited: '2014-12-20T21:17:50.404000Z',
      url: 'https://swapi.dev/api/people/84/',
    },
    {
      name: 'Hera Syndulla',
      height: '175',
      mass: '50',
      hair_color: 'none',
      skin_color: 'green',
      eye_color: 'green',
      birth_year: '29BBY',
      gender: 'female',
      homeworld: 'https://swapi.dev/api/planets/37/',
      films: [],
      species: ['https://swapi.dev/api/species/15/'],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.405000Z',
      edited: '2014-12-20T21:17:50.405000Z',
      url: 'https://swapi.dev/api/people/85/',
    },
    {
      name: 'Sabine Wren',
      height: '166',
      mass: '45',
      hair_color: 'black',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: '21BBY',
      gender: 'female',
      homeworld: 'https://swapi.dev/api/planets/56/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.406000Z',
      edited: '2014-12-20T21:17:50.406000Z',
      url: 'https://swapi.dev/api/people/86/',
    },
    {
      name: 'Zeb Orrelios',
      height: '190',
      mass: '75',
      hair_color: 'none',
      skin_color: 'purple',
      eye_color: 'green',
      birth_year: '28BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/58/',
      films: [],
      species: ['https://swapi.dev/api/species/35/'],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.407000Z',
      edited: '2014-12-20T21:17:50.407000Z',
      url: 'https://swapi.dev/api/people/87/',
    },
    {
      name: 'Rey',
      height: '170',
      mass: '54',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'hazel',
      birth_year: '15ABY',
      gender: 'female',
      homeworld: 'https://swapi.dev/api/planets/60/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.408000Z',
      edited: '2014-12-20T21:17:50.408000Z',
      url: 'https://swapi.dev/api/people/88/',
    },
    {
      name: 'Finn',
      height: '178',
      mass: '73',
      hair_color: 'black',
      skin_color: 'dark',
      eye_color: 'dark',
      birth_year: '11ABY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/28/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.409000Z',
      edited: '2014-12-20T21:17:50.409000Z',
      url: 'https://swapi.dev/api/people/89/',
    },
    {
      name: 'Poe Dameron',
      height: '172',
      mass: '80',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: '2ABY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/28/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.410000Z',
      edited: '2014-12-20T21:17:50.410000Z',
      url: 'https://swapi.dev/api/people/90/',
    },
    {
      name: 'Kylo Ren',
      height: '189',
      mass: '89',
      hair_color: 'black',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: '5ABY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/28/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.411000Z',
      edited: '2014-12-20T21:17:50.411000Z',
      url: 'https://swapi.dev/api/people/91/',
    },
    {
      name: 'Supreme Leader Snoke',
      height: '200',
      mass: 'unknown',
      hair_color: 'none',
      skin_color: 'pale',
      eye_color: 'blue',
      birth_year: 'unknown',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/28/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.412000Z',
      edited: '2014-12-20T21:17:50.412000Z',
      url: 'https://swapi.dev/api/people/92/',
    },
    {
      name: 'Captain Phasma',
      height: '200',
      mass: 'unknown',
      hair_color: 'unknown',
      skin_color: 'unknown',
      eye_color: 'unknown',
      birth_year: 'unknown',
      gender: 'female',
      homeworld: 'https://swapi.dev/api/planets/28/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.413000Z',
      edited: '2014-12-20T21:17:50.413000Z',
      url: 'https://swapi.dev/api/people/93/',
    },
    {
      name: 'Din Djarin',
      height: '183',
      mass: '80',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: '30BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/58/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.414000Z',
      edited: '2014-12-20T21:17:50.414000Z',
      url: 'https://swapi.dev/api/people/94/',
    },
    {
      name: 'Grogu',
      height: '66',
      mass: '6.5',
      hair_color: 'none',
      skin_color: 'green',
      eye_color: 'brown',
      birth_year: '41BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/28/',
      films: [],
      species: ['https://swapi.dev/api/species/6/'],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.415000Z',
      edited: '2014-12-20T21:17:50.415000Z',
      url: 'https://swapi.dev/api/people/95/',
    },
    {
      name: 'Cara Dune',
      height: '173',
      mass: '70',
      hair_color: 'black',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: '21BBY',
      gender: 'female',
      homeworld: 'https://swapi.dev/api/planets/2/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.416000Z',
      edited: '2014-12-20T21:17:50.416000Z',
      url: 'https://swapi.dev/api/people/96/',
    },
    {
      name: 'Greef Karga',
      height: '175',
      mass: '79',
      hair_color: 'black',
      skin_color: 'dark',
      eye_color: 'brown',
      birth_year: '52BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/58/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.417000Z',
      edited: '2014-12-20T21:17:50.417000Z',
      url: 'https://swapi.dev/api/people/97/',
    },
    {
      name: 'Moff Gideon',
      height: '183',
      mass: '90',
      hair_color: 'black',
      skin_color: 'dark',
      eye_color: 'brown',
      birth_year: '31BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/28/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.418000Z',
      edited: '2014-12-20T21:17:50.418000Z',
      url: 'https://swapi.dev/api/people/98/',
    },
    {
      name: 'Grand Admiral Thrawn',
      height: '191',
      mass: '77',
      hair_color: 'none',
      skin_color: 'blue',
      eye_color: 'red',
      birth_year: '59BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/60/',
      films: [],
      species: ['https://swapi.dev/api/species/15/'],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.419000Z',
      edited: '2014-12-20T21:17:50.419000Z',
      url: 'https://swapi.dev/api/people/99/',
    },
    {
      name: 'Bo-Katan Kryze',
      height: '175',
      mass: '57',
      hair_color: 'blonde',
      skin_color: 'light',
      eye_color: 'green',
      birth_year: '67BBY',
      gender: 'female',
      homeworld: 'https://swapi.dev/api/planets/56/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.420000Z',
      edited: '2014-12-20T21:17:50.420000Z',
      url: 'https://swapi.dev/api/people/100/',
    },
    {
      name: 'Fennec Shand',
      height: '166',
      mass: '50',
      hair_color: 'black',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: '31BBY',
      gender: 'female',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.421000Z',
      edited: '2014-12-20T21:17:50.421000Z',
      url: 'https://swapi.dev/api/people/101/',
    },
    {
      name: 'Cad Bane',
      height: '185',
      mass: '75',
      hair_color: 'none',
      skin_color: 'blue',
      eye_color: 'red',
      birth_year: '62BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/40/',
      films: [],
      species: ['https://swapi.dev/api/species/25/'],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.422000Z',
      edited: '2014-12-20T21:17:50.422000Z',
      url: 'https://swapi.dev/api/people/102/',
    },
    {
      name: 'Asajj Ventress',
      height: '179',
      mass: '50',
      hair_color: 'none',
      skin_color: 'pale',
      eye_color: 'blue',
      birth_year: '50BBY',
      gender: 'female',
      homeworld: 'https://swapi.dev/api/planets/43/',
      films: [],
      species: ['https://swapi.dev/api/species/30/'],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.423000Z',
      edited: '2014-12-20T21:17:50.423000Z',
      url: 'https://swapi.dev/api/people/103/',
    },
    {
      name: 'Savage Opress',
      height: '218',
      mass: '88',
      hair_color: 'none',
      skin_color: 'yellow',
      eye_color: 'yellow',
      birth_year: '54BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/43/',
      films: [],
      species: ['https://swapi.dev/api/species/22/'],
      vehicles: [],
      starships: [],
      created: '2014-12-20T21:17:50.424000Z',
      edited: '2014-12-20T21:17:50.424000Z',
      url: 'https://swapi.dev/api/people/104/',
    },
    {
      name: 'Darth Maul',
      height: '175',
      mass: '80',
      hair_color: 'none',
      skin_color: 'red',
      eye_color: 'yellow',
      birth_year: '54BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/43/',
      films: ['https://swapi.dev/api/films/4/'],
      species: ['https://swapi.dev/api/species/22/'],
      vehicles: ['https://swapi.dev/api/vehicles/42/'],
      starships: ['https://swapi.dev/api/starships/41/'],
      created: '2014-12-19T16:57:31.319000Z',
      edited: '2014-12-20T21:17:50.375000Z',
      url: 'https://swapi.dev/api/people/44/',
    },
    {
      name: 'IG-88',
      height: '200',
      mass: '140',
      hair_color: 'none',
      skin_color: 'metal',
      eye_color: 'red',
      birth_year: 'unknown',
      gender: 'none',
      homeworld: 'https://swapi.dev/api/planets/28/',
      films: ['https://swapi.dev/api/films/2/'],
      species: ['https://swapi.dev/api/species/2/'],
      vehicles: [],
      starships: [],
      created: '2014-12-15T12:51:10.076000Z',
      edited: '2014-12-20T21:17:50.351000Z',
      url: 'https://swapi.dev/api/people/23/',
    },
    {
      name: 'Bossk',
      height: '190',
      mass: '113',
      hair_color: 'none',
      skin_color: 'green',
      eye_color: 'red',
      birth_year: '53BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/29/',
      films: ['https://swapi.dev/api/films/2/'],
      species: ['https://swapi.dev/api/species/7/'],
      vehicles: [],
      starships: [],
      created: '2014-12-15T12:53:49.297000Z',
      edited: '2014-12-20T21:17:50.355000Z',
      url: 'https://swapi.dev/api/people/24/',
    },
    {
      name: 'Dengar',
      height: '183',
      mass: '78',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: 'unknown',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/28/',
      films: ['https://swapi.dev/api/films/2/'],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-15T12:56:32.683000Z',
      edited: '2014-12-20T21:17:50.357000Z',
      url: 'https://swapi.dev/api/people/69/',
    },
    {
      name: 'Grand Moff Tarkin',
      height: '180',
      mass: 'unknown',
      hair_color: 'auburn, grey',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '64BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/21/',
      films: ['https://swapi.dev/api/films/1/'],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-10T16:26:56.138000Z',
      edited: '2014-12-20T21:17:50.330000Z',
      url: 'https://swapi.dev/api/people/12/',
    },
    {
      name: 'Admiral Ozzel',
      height: '180',
      mass: '85',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: 'unknown',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/28/',
      films: ['https://swapi.dev/api/films/2/'],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-15T12:49:32.457000Z',
      edited: '2014-12-20T21:17:50.349000Z',
      url: 'https://swapi.dev/api/people/105/',
    },
    {
      name: 'Admiral Piett',
      height: '175',
      mass: '80',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: 'unknown',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/28/',
      films: ['https://swapi.dev/api/films/2/'],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-15T12:49:32.457000Z',
      edited: '2014-12-20T21:17:50.349000Z',
      url: 'https://swapi.dev/api/people/106/',
    },
    {
      name: 'Wicket W. Warrick',
      height: '88',
      mass: '20',
      hair_color: 'brown',
      skin_color: 'brown',
      eye_color: 'brown',
      birth_year: '8BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/7/',
      films: ['https://swapi.dev/api/films/3/'],
      species: ['https://swapi.dev/api/species/9/'],
      vehicles: [],
      starships: [],
      created: '2014-12-18T11:21:58.954000Z',
      edited: '2014-12-20T21:17:50.332000Z',
      url: 'https://swapi.dev/api/people/30/',
    },
    {
      name: 'Logray',
      height: '88',
      mass: '20',
      hair_color: 'grey',
      skin_color: 'brown',
      eye_color: 'brown',
      birth_year: 'unknown',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/7/',
      films: ['https://swapi.dev/api/films/3/'],
      species: ['https://swapi.dev/api/species/9/'],
      vehicles: [],
      starships: [],
      created: '2014-12-18T11:26:29.426000Z',
      edited: '2014-12-20T21:17:50.334000Z',
      url: 'https://swapi.dev/api/people/31/',
    },
    {
      name: 'Jawa',
      height: '165',
      mass: 'unknown',
      hair_color: 'n/a',
      skin_color: 'brown',
      eye_color: 'orange',
      birth_year: 'unknown',
      gender: 'n/a',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: ['https://swapi.dev/api/films/1/'],
      species: ['https://swapi.dev/api/species/5/'],
      vehicles: ['https://swapi.dev/api/vehicles/36/'],
      starships: [],
      created: '2014-12-10T15:52:14.024000Z',
      edited: '2014-12-20T21:17:50.317000Z',
      url: 'https://swapi.dev/api/people/8/',
    },
    {
      name: 'Tusken Raider',
      height: '180',
      mass: '30',
      hair_color: 'n/a',
      skin_color: 'grey',
      eye_color: 'unknown',
      birth_year: 'unknown',
      gender: 'n/a',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: ['https://swapi.dev/api/films/1/'],
      species: ['https://swapi.dev/api/species/4/'],
      vehicles: ['https://swapi.dev/api/vehicles/20/'],
      starships: [],
      created: '2014-12-10T15:53:32.628000Z',
      edited: '2014-12-20T21:17:50.323000Z',
      url: 'https://swapi.dev/api/people/19/',
    },
    {
      name: 'Watto',
      height: '137',
      mass: 'unknown',
      hair_color: 'black',
      skin_color: 'blue, grey',
      eye_color: 'yellow',
      birth_year: 'unknown',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/34/',
      films: ['https://swapi.dev/api/films/4/'],
      species: ['https://swapi.dev/api/species/20/'],
      vehicles: [],
      starships: [],
      created: '2014-12-19T17:48:54.647000Z',
      edited: '2014-12-20T21:17:50.395000Z',
      url: 'https://swapi.dev/api/people/40/',
    },
    {
      name: 'Sebulba',
      height: '112',
      mass: '40',
      hair_color: 'none',
      skin_color: 'grey, red',
      eye_color: 'orange',
      birth_year: 'unknown',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/33/',
      films: ['https://swapi.dev/api/films/4/'],
      species: ['https://swapi.dev/api/species/12/'],
      vehicles: ['https://swapi.dev/api/vehicles/46/'],
      starships: [],
      created: '2014-12-19T17:43:53.348000Z',
      edited: '2014-12-20T21:17:50.393000Z',
      url: 'https://swapi.dev/api/people/41/',
    },
    {
      name: 'Nute Gunray',
      height: '191',
      mass: '90',
      hair_color: 'none',
      skin_color: 'mottled green',
      eye_color: 'red',
      birth_year: 'unknown',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/18/',
      films: ['https://swapi.dev/api/films/4/'],
      species: ['https://swapi.dev/api/species/18/'],
      vehicles: [],
      starships: [],
      created: '2014-12-19T17:05:57.357000Z',
      edited: '2014-12-20T21:17:50.377000Z',
      url: 'https://swapi.dev/api/people/33/',
    },
    {
      name: 'Rune Haako',
      height: '196',
      mass: '85',
      hair_color: 'none',
      skin_color: 'grey',
      eye_color: 'orange',
      birth_year: 'unknown',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/18/',
      films: ['https://swapi.dev/api/films/4/'],
      species: ['https://swapi.dev/api/species/18/'],
      vehicles: [],
      starships: [],
      created: '2014-12-19T17:07:35.696000Z',
      edited: '2014-12-20T21:17:50.379000Z',
      url: 'https://swapi.dev/api/people/34/',
    },
  ],
  Vi = 'https://swapi.dev/api',
  wr = 2,
  Xo = 1e3,
  Mr = 10,
  Xl = (e = '', t = 1) => {
    const n = e
        ? Go.filter((o) => o.name.toLowerCase().includes(e.toLowerCase()))
        : Go,
      r = (t - 1) * Mr,
      l = r + Mr,
      i = n.slice(r, l),
      s = Math.ceil(n.length / Mr);
    return {
      count: n.length,
      next: t < s ? `${Vi}/people/?page=${t + 1}` : null,
      previous: t > 1 ? `${Vi}/people/?page=${t - 1}` : null,
      results: i,
    };
  },
  Jo = (e) => new Promise((t) => setTimeout(t, e)),
  ff = (e, t) => {
    const n = Math.ceil(e.count / Mr);
    return {
      currentPage: t,
      totalPages: n,
      totalCount: e.count,
      hasNext: e.next !== null,
      hasPrevious: e.previous !== null,
    };
  };
class hf {
  static async searchCharacters(t = '', n = 1, r = 0) {
    try {
      let l = `${Vi}/people/`;
      const i = new URLSearchParams();
      if (
        (t && i.append('search', t),
        i.append('page', n.toString()),
        i.toString())
      ) {
        const v = l + `?${i.toString()}`;
        l = encodeURI(v);
      }
      const s = new AbortController(),
        o = setTimeout(() => s.abort(), 1e4),
        a = await fetch(l, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          signal: s.signal,
        });
      if ((clearTimeout(o), !a.ok))
        throw a.status >= 400 && a.status < 500
          ? new Error(
              `Client error (${a.status}): ${a.statusText}. Please check your request and try again.`
            )
          : a.status >= 500
            ? new Error(
                `Server error (${a.status}): ${a.statusText}. The service is temporarily unavailable.`
              )
            : new Error(
                `Request failed with status ${a.status}: ${a.statusText}`
              );
      return await a.json();
    } catch (l) {
      if (l instanceof Error) {
        if (l.name === 'AbortError')
          return r < wr
            ? (console.log(`Request timed out, retrying... (${r + 1}/${wr})`),
              await Jo(Xo * (r + 1)),
              this.searchCharacters(t, n, r + 1))
            : (console.warn(
                'Request timed out after multiple attempts. Using enhanced mock data as fallback.'
              ),
              Xl(t, n));
        if (
          l.message.includes('Failed to fetch') ||
          l.message.includes('NetworkError')
        )
          return r < wr
            ? (console.log(`Network error, retrying... (${r + 1}/${wr})`),
              await Jo(Xo * (r + 1)),
              this.searchCharacters(t, n, r + 1))
            : (console.warn(
                'Network error: Unable to connect to the Star Wars API. Using enhanced mock data as fallback.'
              ),
              Xl(t, n));
        if (l.message.includes('CORS'))
          return (
            console.warn(
              'CORS error: Unable to access the Star Wars API. Using enhanced mock data as fallback.'
            ),
            Xl(t, n)
          );
        throw l;
      }
      throw new Error('An unexpected error occurred while fetching data.');
    }
  }
}
const mf = () => {
  const [e, t] = X.useState([]),
    [n, r] = X.useState(null),
    [l, i] = X.useState(!1),
    [s, o] = X.useState(null),
    [a, c] = X.useState(''),
    [v, m] = X.useState(null),
    [h, w] = X.useState(!1),
    k = X.useCallback(async (p, y = 1) => {
      (i(!0), o(null), c(p));
      try {
        const x = await hf.searchCharacters(p, y);
        (t(x.results), r(ff(x, y)));
      } catch (x) {
        (console.error('Search error:', x),
          o(x instanceof Error ? x.message : 'An unexpected error occurred'),
          t([]),
          r(null));
      } finally {
        i(!1);
      }
    }, []),
    _ = X.useCallback(
      (p) => {
        k(a, p);
      },
      [a, k]
    ),
    O = () => {
      const p = (n == null ? void 0 : n.currentPage) || 1;
      k(a, p);
    },
    d = (p) => {
      (m(p), w(!0));
    },
    u = () => {
      (w(!1), m(null));
    };
  return f.jsxs('div', {
    className: 'min-h-screen bg-gray-50 flex flex-col relative',
    children: [
      f.jsx(lf, { onSearch: k, isLoading: l }),
      f.jsx(df, {
        characters: e,
        pagination: n,
        isLoading: l,
        error: s,
        onRetry: O,
        onPageChange: _,
        onCharacterClick: d,
      }),
      f.jsx(pf, { character: v, isOpen: h, onClose: u }),
    ],
  });
};
cc(document.getElementById('root')).render(
  f.jsx(X.StrictMode, { children: f.jsx(mf, {}) })
);
