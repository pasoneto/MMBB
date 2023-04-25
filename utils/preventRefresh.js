//For safari IOS
function preventRefresh1(event){ event.preventDefault(); }
window.onbeforeunload = preventRefresh1;

//For all browsers except Safari IOS
function preventRefresh0(event){ return "If you leave now, data may not be saved"; }
window.onbeforeunload = preventRefresh0

function allowRefresh(){
  window.onbeforeunload = function(){}
}
