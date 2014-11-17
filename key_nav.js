var keyNavs = []
var targetSelector = 'a[href]:visible, button:visible, input:visible'

function showKeyNavs() {
  var targets = $(targetSelector);
  resetNavSeq(targets.length)

  var fragment = $(document.createDocumentFragment())
  targets.each(function(i, node) {
    var nav = _createKeyNav(node)
    keyNavs.push({nav: nav, target: $(node)})
    fragment.append(nav)
  })
  $(document.body).append(fragment)
}

function hideKeyNavs() {
  for (var i = 0; i < keyNavs.length; i++) {
    keyNavs[i].nav.remove()
  }
  keyNavs = []
}

function isShown() {
  return keyNavs.length > 0
}

function consumable(event) {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
    return false;
  }

  var ch = String.fromCharCode(event.keyCode).toLowerCase()
  return isNavChar(ch)
}

function consumeKeyNav(keyCode) {
  var ch = String.fromCharCode(keyCode).toLowerCase()
  var newKeyNavs = []
  var matchedTarget = null
  for (var i = 0; i < keyNavs.length; i++) {
    var keyNav = keyNavs[i]

    var supplying = $('.supplying', keyNav.nav)
    var text = supplying.text()
    if (text[0] != ch) {
      keyNav.nav.remove()
      continue
    }

    if (text.length == 1) {
      matchedTarget = keyNav.target
      break
    }

    var consumed = $('.consumed', keyNav.nav)
    consumed.text(consumed.text() + text[0])
    supplying.text(text.substr(1))
    newKeyNavs.push(keyNav)
  }

  if (matchedTarget) {
    hideKeyNavs()
    _doAction(matchedTarget)
    return
  }

  keyNavs = newKeyNavs
}

function _createKeyNav(target, parent) {
  var seq = nextNavSeq()
  var elem = $(_createKeyNavHtml(seq))
  var offset = $(target).offset()
  elem.css({
    'left': Math.max(0, offset.left - 14) + 'px',
    'top': Math.max(0, offset.top) + 'px',
  })
  return elem
}

function _createKeyNavHtml(seq) {
  return '<span class="key_nav nav">' +
    '<span class="key_nav consumed"></span>' +
    '<span class="key_nav supplying">' + seq + '</span>' +
    '</span>'
}

function _doAction(targetNode) {
  if (targetNode[0].tagName.toLowerCase() == 'a') {
      var href = targetNode.attr('href')
      if (href) {
          location.href = href
          return
      }
  }

  targetNode.focus()
  targetNode.click()
}
