console.log("app.js loaded");


// initialize variables that let me easily change labels of columns of data and axes of graphs
var stateLabel = "state";
var abbrLabel = "abbreviation";
var povertyLabel = "Percent of population who live in poverty";
var ageLabel = "Median age of population";
var incomeLabel = "Median income of population";
var healthcareLabel = "Percent of population who lack heathcare coverage";
var obesityLabel = "Percent of population who are obese";
var smokingLabel = "Percent of population who smoke";

//import data
// data = import data.csv
d3.csv("assets/data/data.csv").then(function(assignData) {

    console.log("data.csv loaded");
    console.log(assignData);
  
    // log a list of names
    var names = assignData.map(data => data.name);
    console.log("names", names);
  
    // Cast each numerical value in assignData as a number
    assignData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.age = +data.age;
      data.income = +data.income;
      data.healthcare = +data.healthcare;
      data.obesity = +data.obesity;
      data.smoking = +data.smokes;
      console.log("-_-_-_-_-_-_-_-_-_-_-_-");
      console.log(`${stateLabel}: ${data.state} (${data.abbr})`);
      console.log(`${ageLabel}: ${data.age}`);
      console.log(`${incomeLabel}: ${data.income}`);
      console.log(`${healthcareLabel}: ${data.healthcare}`);
      console.log(`${obesityLabel}: ${data.obesity}`);
      console.log(`${smokingLabel}: ${data.smokes}`);
    });
  }).catch(function(error) {
    console.log(error);
  });
