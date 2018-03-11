(function () {
  'use strict'

  if (!window.addEventListener) return // Check for IE9+

  var options = INSTALL_OPTIONS
  var element

  // updateElement runs every time the options are updated.
  // Most of your code will end up inside this function.
  function updateElement () {
    element = INSTALL.createElement(options.location, element)

    // Set the app attribute to your app's dash-delimited alias.
    element.setAttribute('app', 'example')
    document.body.addEventListener("mouseup", (event) => {
      const selection = window.getSelection()
      const message = selection.toString()
      if (message) {
        const span = document.createElement("span")
        span.innerText = "Tweet!"
        const aTag = document.createElement("a")
        aTag.className = "CloudflareAppsTweetThisTooltip"
        aTag.href = "https://twitter.com/intent/tweet?text=" + encodeURI(message)
        if (options.username) aTag.href += " - " + options.username
        aTag.target = "_blank"
        aTag.appendChild(span)
        selection.anchorNode.parentNode.prepend(aTag)

      }
    })

    document.body.addEventListener("mousedown", (event) => {
      const tooltip = document.body.querySelector(".CloudflareAppsTweetThisTooltip")
      if (tooltip) {
        if (event.target.contains(tooltip.childNodes[0])) {
          return
        }
        tooltip.parentNode.removeChild(tooltip)
      }
    })
  }

  // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
  window.INSTALL_SCOPE = {
    setOptions: function setOptions (nextOptions) {
      options = nextOptions

      updateElement()
    }
  }

  // This code ensures that the app doesn't run before the page is loaded.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateElement)
  } else {
    updateElement()
  }
}())
