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
      var string = ""
      var noun = 0 // means false
      var verb = 0
      const span = document.createElement("span")

      if (message) { //needs to be httpS or else it'll get mad and insecure XD
        fetch(`https://words.bighugelabs.com/api/2/cd528563d795dfe1c620323d697711cd/${message}/json`, { // objects inside of objects
            //headers is an object, holds 2 key value pairs
            //when fetch hits endpoint it promises to get something back
          //these are headers for other apis haha headers: {"app_id": "8714dd51", "app_key": "883357ef64ad36458555d09693015af5"} //X mashape key is the key, value is 2nd string

        }).then(function(data) {//data is the information promised from fetch, can be any word bc its an argument
          return data.json()
          //console.log(data)
        }).then(function(words) {
          console.log(words) // words is an object w key of adjective, adjective is an object inside that object
          //each key inside has the value of an array
          //access each array inside
          //loop through the keys of an object
          const array = Object.keys(words)
          for (var i = 0; i < array.length; i++) {
              console.log("ths is array[i] " + array[i]) // just accesses part of speech

              console.log("this is words[array[i]] " + words[array[i]]) //access the whole object
              console.log("this is words[array[i]][\"ant\"] " + Object.values(words[array[i]]["ant"])) //accesses synonyms, loop through this and add to string
              const arr2 = Object.values(words[array[i]]["syn"])
              console.log("synonyms for " + message.toLowerCase() + " are " + arr2)



              //words.words[array[i]].syn.forEach(function(werd){
                //string += werd + ", "
              //})
              //when words comes back, find each key, loop through each key, get synonyms, push all that into one really big string and put string in span
            }
            span.className = "CloudflareAppsWordsHelp"
            span.innerText = "hello "// + Object.values(words[array[1]]["syn"])
          //words.adjective.sim.forEach(function(word){
            //string += word + ", "
            //})
        })
        console.log(string)

        verb += 1
        if (verb) {
          console.log("hello again bb")
        }
        //const aTag = document.createElement("a")
        //aTag.className = "CloudflareAppsWordSynonyms"
        //aTag.href = "https://twitter.com/intent/tweet?text=" + encodeURI(message) // change this
        //if (options.username) aTag.href += " - " + options.username
        //aTag.target = "_blank"
        //aTag.appendChild(span)
        selection.anchorNode.parentNode.prepend(span)
        selection.anchorNode.parentNode.appendChild(span) //adds to the beginning
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
