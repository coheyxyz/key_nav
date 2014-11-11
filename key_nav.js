var keyNavs = []

function showKeyNavs() {
  var targets = $('a[href]:visible');
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

function consumable(keyCode) {
  var ch = String.fromCharCode(keyCode).toLowerCase()
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
    location.href = matchedTarget.attr('href')
    return
  }

  keyNavs = newKeyNavs
}

function _createKeyNav(target, parent) {
  var seq = nextNavSeq()
  var elem = $(_createKeyNavHtml(seq))
  var offset = $(target).offset()
  elem.css({
    'left': (offset.left - 16) + 'px',
    'top': (offset.top - 18) + 'px',
  })
  return elem
}

function _createKeyNavHtml(seq) {
  return '<span class="key_nav nav">' +
    '<span class="key_nav consumed"></span>' +
    '<span class="key_nav supplying">' + seq + '</span>' +
    '</span>'
}
