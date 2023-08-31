//'use strict';
import Streamgraph from "./stack.js";
import * as d3 from "d3";
import csvstack from "./assets/stackdata.csv";
import attackdata from "./assets/attackdata.csv"
import simulator from "./attack.js";
import ArgVsAus from "./assets/2-1.csv"
import pitch from "./ArgVsAus.js"
import playerdata from "./assets/playerdataFromFIFA.csv"
import pie from "./playerdata.js"
 
d3.csv(csvstack).then((data)=>{
  //console.log(data);
  Streamgraph(data, {})
});

d3.csv(attackdata,d3.autoType).then((data, error) => { 
  if (error) {
    console.log(error);
  } else {
     console.log(data);
    var lineColor = "#000";
    var lineWidth = 1;
    var pitchColor = "#55bb8a";
    var pitchMultiplier = 9;
    var pitchWidth = 105;
    var pitchHeight = 68;
    var margin = {top: 20, right: 20, bottom: 20, left: 20};
    var width = 840+105;
    var height = 544+68;
    simulator(data,width,height,margin,pitchColor,lineWidth,lineColor,pitchMultiplier,pitchWidth,pitchHeight);

  };
}); 

d3.csv(ArgVsAus).then((data, error) => { 
  if (error) {
    console.log(error);
  } else {
     console.log(data);
    var lineColor = "#000";
    var lineWidth = 1;
    var pitchColor = "#eee";
    var pitchMultiplier = 9;
    var pitchWidth = 105;
    var pitchHeight = 68;
    var margin = {top: 10, right: 10, bottom: 10, left: 10};
    var width = 840+105;
    var height = 544+68;
    pitch(data,width,height,margin,pitchColor,lineWidth,lineColor,pitchMultiplier,pitchWidth,pitchHeight);

  };
}); 

d3.csv(playerdata,d3.autoType).then((data, error) => { 
  if (error) {
    console.log(error);
  } else {
     console.log(data);
     var margin={left: 40, bottom: 50, top: 10, right: 150};
     var width=1220;
     var height=670;
     pie(data,width,height,margin);

  };
}); 