const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// // // Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it

    // d3.json(url).then(function(data) {
    //     console.log(data);
      
        //Create Variable for Sample Data
      
        // let sampleData = data.samples;
      
        //Create Filter for the data
      
        // let sampleFilter = sampleData.filter(firstRow=>firstRow.id == sample);
      
        // let sampleFilterIndexed = sampleFilter[0];
      
        //Create Variables for sampleValues,otuId's,otuLabels
      
        // let samepleValues = sampleFilterIndexed.sample_values;
      
        // let OtuIds = sampleFilterIndexed.otu_ids;
      
        // let otuLabels = sampleFilter.otu_labels;

        // Create function for Charts

        function charts(sample) {

        d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {

            let sampleData = data.samples;
            
            let sortedData = sampleData.filter(firstRow=>firstRow.id == sample);

            let slice = sortedData[0];

            let samepleValues = slice.sample_values;
        
            let otuIds = slice.otu_ids;
        
            let otuLabels = slice.otu_labels;

               // Create Variables for bar chart

            let y = otuIds.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();

            let x = samepleValues.slice(0,10).reverse();

            let text = otuLabels.slice(0,10).reverse();

    
    // Create Horizontal Bar Chart using the sliced data

            let trace1 = {
            x: x,
            y: y,
            text: text,
            type: 'bar',
            orientation: 'h'

        };

            let barLayout = {
                titel: 'Top 10 Sample Vales',
                margin: { t: 30, l: 150 }
            }

        let barData = [trace1];

        Plotly.newPlot('bar', barData,barLayout);

        
    
        
    // Sort the Otu values in descending order and slice to get the top 10

    // let SortedData = sampleData.sort(function compareFunction(firstnum,secondnum){
    //     return secondnum.sample_values - firstnum.sample_values
    // });

// Create Bubble Chart

        let trace2 = {
        x: otuIds,
        y: samepleValues,
        mode: 'markers',
        marker: {
          color: otuIds,
          text: otuLabels,
          size: samepleValues,
          type: 'bubble'
        }
      };
      
      let bubbleData = [trace2];
      
      let bubbleLayout = {
        showlegend: false,
        height: 600,
        width: 1200
      };
      
      Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    });

    }

      //Get Meta Data
      function metadata (sample) {
        d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {

        let metaData = data.metadata;

        let filteredData = metaData.filter(firstRow=>firstRow.id == sample);

        let metaslice = filteredData[0];

        let PANEL = d3.select("#sample-metadata");

        for (key in metaslice) {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${metaslice[key]}`);
        }


      })

    }
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
            charts(firstSample);
            metadata(firstSample);

        });
    }

    // This Selector
    
    function optionChanged(sample) {
        charts(sample);
        metadata(sample);

    }
    
      init();