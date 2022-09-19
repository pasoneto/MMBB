//Generates data object to feed into graph
function dataGenerator(yAxis, labels){
  var dataConstructor = [];
  for (var i=0; i<yAxis.length; i++) {
      var randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
      var label = labels[i]
      dataConstructor[i] = {
          label: label,
          data: yAxis[i],
          borderColor: randomColor,
          fill: false 
      };
  }
  console.log(dataConstructor)
  return(dataConstructor)
}

//Generates graph and appends to given element by ID
function graphCustom(xAxis, yAxis, labels, id, type){
  var dataConstructor = dataGenerator(yAxis, labels)
  new Chart(id, {
    type: type,
    data: {
      labels: xAxis,
      datasets: dataConstructor },
    options: {
      legend: {display: true}
    }
  });
};

