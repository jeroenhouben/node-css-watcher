/*
* example client code
* assumes jQuery
*/

$(document).ready(function() {
  console.log('CSS auto-refresh enabled, waiting for changes...')

  var head = $('head');

  // make sure this points to the port where node script its 
  var source = new EventSource('http://localhost:4000');

  // whenever we receive a message from the node server, remove the stylehseet and add it to the DOM again
  // this will force a repaint in the browser with your updated CSS with reloading the page
  source.addEventListener('message', function (e) {
    head.append(head.find('link').last().remove());
    console.log('css updates: ', (new Date).toLocaleTimeString());
  });

});
