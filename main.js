var triggerKeyCode = 188  // ,
var escKeyCode = 27  // esc
var ignoreTags = ['input', 'textarea']

function onKeyDown(event) {
  if (ignoreTags.indexOf(event.target.tagName.toLowerCase()) >= 0) {
    return
  }

  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
    return
  }

  var keyCode = event.keyCode
  switch (keyCode) {
  case triggerKeyCode:
    showKeyNavs()
    break
  case escKeyCode:
    hideKeyNavs()
    break
  default:
    if (isShown() && consumable(event)) {
      consumeKeyNav(keyCode)
    } else {
      return
    }
  }

  event.preventDefault()
}

$(document).keydown(onKeyDown)
