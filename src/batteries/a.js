async function func1() {
  let myPromise = new Promise(function(resolve) {
    setTimeout(function() {resolve("First one");}, 3000);
  });
}
async function func2() {
  let myPromise = new Promise(function(resolve) {
    setTimeout(function() {resolve("First one");}, 3000);
  });
}

async function a(){
  var one = await func1()
  var two = await func2()
  console.log(one)
  console.log(two)
}

a()

