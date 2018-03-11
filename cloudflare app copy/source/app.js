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
      //var string2 = ""
      /*var noun = 0 // means false
      var verb = 0
      var adjective = 0
      var adverb = 0*/
      const span = document.createElement("span")
      //const span2 = document.createElement("span")
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
              console.log("This is array[i] " + array[i]) // just accesses part of speech

              /*if (array[i] == "noun") {noun += 1} //big if statement
              else if (array[i] == "verb") { verb += 1}
              else if (array[i] == "adjective") {adjective += 1}
              else if (array[i] == "adverb") {adverb += 1}

              if (verb || noun) {console.log(array[i]) + " tester"}*/


              string += " \n" + message.toUpperCase() + " (" + array[i] + "):"

              // console.log("this is words[array[i]] " + words[array[i]]) prints [Object object]
              console.log("this is words[array[i]][\"ant\"] " + words[array[i]]["ant"]) //accesses synonyms, loop through this and add to string
              const arr2 = Object.values(words[array[i]]["syn"])
              console.log("synonyms for " + message.toLowerCase() + " are " + arr2)
              string += " " + arr2[0] + "\n"

              span.className = "CloudflareAppsWordsHelp"
              span.innerText = string
              /*var person = prompt("Please choose one", "Syn, Ant, Sim, Ant").
              console.log(words[array[i]][person] + " heyo")
              */
              /*var text;
              var favDrink = prompt("What's your favorite cocktail drink?");
              switch(favDrink) {
                  case "Martini":
                      text = "Excellent choice! Martini is good for your soul.";
                      break;
                  case "Daiquiri":
                      text = "Daiquiri is my favorite too!";
                      break;
                  case "Cosmopolitan":
                      text = "Really? Are you sure the Cosmopolitan is your favorite?";
                      break;
                  default:
                      text = "I have never heard of that one..";
                      break;
              }*/
              //words.words[array[i]].syn.forEach(function(werd){
                //string += werd + ", "
              //})
              //when words comes back, find each key, loop through each key, get synonyms, push all that into one really big string and put string in span
            }
            /*for (var i = 0; i < array.length; i++) {
                string += " " + message.toUpperCase() + " (" + array[i] + "):"
                const arr2 = Object.values(words[array[i]]["sim"])
                string += " " + arr2[0] + "\n"
                span2.className = "CloudflareAppsAnts"
                span2.innerText = string2

              }*/
        })
        console.log(string)

        /*verb += 1
        if (verb) {
          console.log("hello again bb")
        }*/

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
      const tooltip = document.body.querySelector(".CloudflareAppsWordsHelp")
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
