var triggerKeyCode = 188  // ,
var escKeyCode = 27  // esc

function onKeyDown(event) {
  if (event.target.tagName.toLowerCase() != "body") {
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
    if (consumable(keyCode)) {
      consumeKeyNav(keyCode)
    } else {
      return
    }
  }

  event.preventDefault()
}

$(document).keydown(onKeyDown)
