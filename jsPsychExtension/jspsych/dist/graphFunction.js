//Generates data object to feed into graph
function dataGenerator(dataSet){
  var dataConstructor = [];
  for (var i=0; i<dataSet.length; i++) {
      var randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
      dataConstructor[i] = {
          data: dataSet[i],
          borderColor: randomColor,
          fill: false 
      };
  }
  return(dataConstructor)
}

//Generates graph and appends to given element by ID
function graphCustom(dataSet, id, type){
  var dataConstructor = dataGenerator(dataSet)
  new Chart(id, {
    type: type,
    data: {
      datasets: dataConstructor },
    options: {
      legend: {display: false}
    }
  });
};
