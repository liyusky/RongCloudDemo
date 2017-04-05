;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-fanhui" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M340.154 535.273l421.05-421.05c9.077-9.077 9.077-23.832 0-32.908-9.076-9.076-23.83-9.076-32.907 0l-437.481 437.48c-9.076 9.077-9.076 23.832 0 32.908l437.48 437.481c9.077 9.076 23.832 9.076 32.908 0 9.077-9.076 9.077-23.831 0-32.908l-421.05-421.003z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-card" viewBox="0 0 1295 1024">' +
    '' +
    '<path d="M1178.710968 0H116.651636C52.510595 0 0 52.22128 0 116.058541v129.670792h1295.492795V116.058541C1295.492795 52.22128 1242.924337 0 1178.710968 0zM0.014466 907.883596c0 63.837261 52.510595 116.087472 116.651636 116.087473h1062.044866c64.227835 0 116.796293-52.264678 116.796293-116.087473v-488.073685H0.014466v488.073685z m1059.715884-171.563542h96.023507v109.230717h-96.037973v-109.201785z m-123.47946 0h95.965644v109.230717h-95.98011v-109.201785z m-118.358592 0h96.052438v109.230717h-96.081369v-109.201785z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-XiaLa" viewBox="0 0 1911 1024">' +
    '' +
    '<path d="M1892.44877 19.470003a66.543859 66.543859 0 0 0-94.062317 0L953.746981 864.109475 113.206457 23.462208a66.345316 66.345316 0 0 0-93.720738 93.934224l887.422242 887.251452a67.397806 67.397806 0 0 0 94.531988 0L1892.470119 113.53232a66.543859 66.543859 0 0 0 0-94.062317z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)