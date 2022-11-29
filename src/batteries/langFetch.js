const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var lang = urlParams.get('lang')
console.log(lang)
if(lang === null){
  var lang = "eng"
}

