const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// // Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it

    d3.json(url).then(function(data) {
        console.log(data);
      
        //Create Variable for Sample Data
      
        let sampleData = data.samples;
      
        //Create Filter for the data
      
        // let sampleFilter = sampleData.filter(firstRow=>firstRow.id == sample);
      
        // let sampleFilterIndexed = sampleFilter[0];
      
        //Create Variables for sampleValues,otuId's,otuLabels
      
        // let samepleValues = sampleFilterIndexed.sample_values;
      
        // let OtuIds = sampleFilterIndexed.otu_ids;
      
        // let otuLabels = sampleFilter.otu_labels;
        
    // Sort the Otu values in descending order and slice to get the top 10

    let SortedData = sampleData.sort(function compareFunction(firstnum,secondnum){
        return secondnum.sample_values - firstnum.sample_values
    });

    let top10Slice = SortedData.slice(0,10);
    
    // Create Horizontal Bar Chart using the sliced data

        let trace1 = {
        x: top10Slice.map(object=>object.sample_values),
        y: top10Slice.map(object=>object.otu_ids),
        text: top10Slice.map(object=>object.otu_labels),
        type: 'bar',
        orientation: 'h'

    };

    let barData = [trace1];

    Plotly.newPlot('bar', barData);
    
    // Create Buble Chart 

    let trace2 = {
        x: sampleData.map(object=>object.otu_ids),
        y: sampleData.map(object=>object.sample_values),
        mode: 'markers',
        marker: {
          color: sampleData.map(object=>object.otu_ids),
          text: sampleData.map(object=>object.otu_labels),
          size: sampleData.map(object=>object.sample_values)
        }
      };
      
      let bubbleData = [trace2];
      
      let layout = {
        showlegend: false,
        height: 600,
        width: 600
      };
      
      Plotly.newPlot('myDiv', bubbleData, layout);


    // Create Drop Down Menu Options

    function init() {
        // Grab a reference to the dropdown select element
        let selector = d3.select("#selDataset");
      
        // Use the list of sample names to populate the select options
        d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
          let sampleNames = data.names;
      
          for (let i = 0; i < sampleNames.length; i++){
            selector
              .append("option")
              .text(sampleNames[i])
              .property("value", sampleNames[i]);
          };
      
          // Use the first sample from the list to build the initial plots
          let firstSample = sampleNames[0];
          buildCharts(firstSample);
          buildMetadata(firstSample);
        });
      
      
      
      //use map to get the full data
      
     
      
    init()}});



