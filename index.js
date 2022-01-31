// De verhoudingen en de margin van de grafiek.
var margin = {top: 50, right: 40, bottom: 125, left: 50},
    width = 960 - margin.left - margin.right,
    height = 850 - margin.top - margin.bottom;
    

// parse het jaar.
var parseTime = d3.timeParse("%y");

// de afmetingen van de assen.
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 50]);


// Het aanmaken van de Burgwallen Oude-Zijde lijn.
var lijn1 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.burgwallenoudezijde); });

// Het aanmaken van de Burgwallen Nieuwe-Zijde lijn.
var lijn2 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.burgwallennieuwezijde); });

// Het aanmaken van de Grachtengordel-West lijn.
var lijn3 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.grachtengordelwest); });

// Het aanmaken van de Grachtengordel-Zuid lijn.
var lijn4 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.grachtengordelzuid); });

// Het aanmaken van de Nieuwmarkt/Lastage lijn.
var lijn5 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.nieuwmarktlastage); });

// Het aanmaken van de Haarlemmerbuurt lijn.
var lijn6 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.haarlemmerbuurt); });

// Het aanmaken van de Jordaan lijn.
var lijn7 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.jordaan); });



// Een svg toevoegen aan de body.
// Een group toevoegen aan de svg.
// Verplaatst de svg naar linksboven in de pagina.
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


// Titel line chart
// Hier wordt de titel van de line chart aangemaakt.
  svg.append("text")
        .attr("transform","translate(100,0)")
        .attr("x", 90)
        .attr("y", -10)
        .attr("font-size", "30px")
        .text("Criminaliteitsindex Centrum Amsterdam");



// Gridlijn x as functie aanmaken.
    function xGridlines() {		
        return d3.axisBottom(x)
            .ticks(5)
    }
    
// Gridlijn y as functie aanmaken.
    function yGridlines() {		
        return d3.axisLeft(y)
            .ticks(5)
    }

// Data ophalen uit een csv bestand.
d3.csv("veiligheidsindexAmsterdamCentrum.csv").then(function(data) {

// De data formateren.
  data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.burgwallenoudezijde = +d.burgwallenoudezijde;
      d.burgwallennieuwezijde = +d.burgwallennieuwezijde;
      d.grachtengordelwest = +d.grachtengordelwest;
      d.grachtengordelzuid = +d.grachtengordelzuid;
      d.nieuwmarktlastage = +d.nieuwmarktlastage;
      d.haarlemmerbuurt = +d.haarlemmerbuurt;
      d.jordaan = +d.jordaan;
  });

// De schaal van de range bepalen voor de data.
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d){ return d.burgwallenoudezijde;})]);


// Gridlijn x as toevoegen.
  svg.append("g")			
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(xGridlines()
          .tickSize(-height)
          .tickFormat("")
      )

  // Gridlijn y as toevoegen.
  svg.append("g")			
      .attr("class", "grid")
      .call(yGridlines()
          .tickSize(-width)
          .tickFormat("")
      )


  // Burgwallen Oude-Zijde waarde lijn.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("id", "bozLijn")
      .attr("d", lijn1);

  // Burgwallen Nieuwe-Zijde waarde lijn.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("id", "bnzLijn")
      .attr("d", lijn2);

  // Grachtengordel-West waarde lijn.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("id", "ggwLijn")
      .attr("d", lijn3);

  // Grachtengordel-Zuid waarde lijn.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("id", "ggzLijn")
      .attr("d", lijn4);

  // Nieuwmarkt/Lastage waarde lijn.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("id", "nmlLijn")
      .attr("d", lijn5);

  // Haarlemmerbuurt waarde lijn.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("id", "hlbLijn")
      .attr("d", lijn6);

  // Jordaan waarde lijn.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("id", "jorLijn")
      .attr("d", lijn7);



  // Toevoegen X as.
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Toevoegen Burgwallen Oude-Zijde Y as.
  svg.append("g")
      .attr("class", "bozlijnkleur")
      .call(d3.axisLeft(y));

  // Toevoegen Burgwallen Nieuwe-Zijde Y as.
  svg.append("g")
  .attr("class", "bnzlijnkleur")
  .call(d3.axisLeft(y));

  // Toevoegen Grachtengordel-West Y as.
  svg.append("g")
      .attr("class", "ggwlijnkleur")
      .call(d3.axisLeft(y));

  // Toevoegen Grachtengordel-Zuid Y as.
  svg.append("g")
  .attr("class", "ggzlijnkleur")
  .call(d3.axisLeft(y));

  // Toevoegen Nieuwmarkt/Lastage Y as.
  svg.append("g")
      .attr("class", "nmllijnkleur")
      .call(d3.axisLeft(y));

  // Toevoegen Haarlemmerbuurt Y as.
  svg.append("g")
  .attr("class", "hlblijnkleur")
  .call(d3.axisLeft(y));

  // Toevoegen Jordaan Y as.
  svg.append("g")
      .attr("class", "jorlijnkleur")
      .call(d3.axisLeft(y));



  // Burgwallen Oude Zijde.
  svg.append("text")
     .attr("x", 0)             
     .attr("y", height + margin.top + 30)    
     .attr("class", "legenda")
     .style("fill", "#264653")         
     .on("click", function(){
       // Bepalen of de huidige lijn zichtbaar is.
       var active   = bozLijn.active ? false : true,
       newOpacity = active ? 0 : 1;
       // Verberg of toon de elementen.
       d3.select("#bozLijn").style("opacity", newOpacity);
       // Update of elementen.
       bozLijn.active = active;
     })
     .text("Burgwallen Oude-Zijde");


  // Burgwallen Nieuwe Zijde
  svg.append("text")
     .attr("x", 250)             
     .attr("y", height + margin.top + 30)    
     .attr("class", "legenda")
     .style("fill", "#287271")         
     .on("click", function(){
       // Bepalen of de huidige lijn zichtbaar is.
       var active   = bnzLijn.active ? false : true,
       newOpacity = active ? 0 : 1;
       // Verberg of toon de elementen.
       d3.select("#bnzLijn").style("opacity", newOpacity);
       // Update of elementen.
       bnzLijn.active = active;
     })
     .text("Burgwallen Nieuwe-Zijde");


  // Grachtengordel West
  svg.append("text")
     .attr("x", 525)             
     .attr("y", height + margin.top + 30)    
     .attr("class", "legenda")
     .style("fill", "#2a9d8f")         
     .on("click", function(){
       // Bepalen of de huidige lijn zichtbaar is.
       var active   = ggwLijn.active ? false : true,
       newOpacity = active ? 0 : 1;
       // Verberg of toon de elementen.
       d3.select("#ggwLijn").style("opacity", newOpacity);
       // Update of elementen.
       ggwLijn.active = active;
     })
     .text("Grachtengordel-West");


     // Grachtengordel-Zuid
  svg.append("text")
     .attr("x", 0)             
     .attr("y", height + margin.top + 65)    
     .attr("class", "legenda")
     .style("fill", "#8ab17d")      
     .on("click", function(){
       // Bepalen of de huidige lijn zichtbaar is.
       var active   = ggzLijn.active ? false : true,
       newOpacity = active ? 0 : 1;
       // Verberg of toon de elementen.
       d3.select("#ggzLijn").style("opacity", newOpacity);
       // Update of elementen.
       ggzLijn.active = active;
     })
     .text("Grachtengordel-Zuid");


     // Nieuwmarkt/Lastage
  svg.append("text")
     .attr("x", 230)             
     .attr("y", height + margin.top + 65)    
     .attr("class", "legenda")
     .style("fill", "#e9c46a")         
     .on("click", function(){
       // Bepalen of de huidige lijn zichtbaar is.
       var active   = nmlLijn.active ? false : true,
       newOpacity = active ? 0 : 1;
       // Verberg of toon de elementen.
       d3.select("#nmlLijn").style("opacity", newOpacity);
       // Update of elementen.
       nmlLijn.active = active;
     })
     .text("Nieuwmarkt/Lastage");


     // Haarlemmerbuurt
  svg.append("text")
     .attr("x", 455)             
     .attr("y", height + margin.top + 65)    
     .attr("class", "legenda")
     .style("fill", "#f4a261")         
     .on("click", function(){
       // Bepalen of de huidige lijn zichtbaar is.
       var active   = hlbLijn.active ? false : true,
       newOpacity = active ? 0 : 1;
       // Verberg of toon de elementen.
       d3.select("#hlbLijn").style("opacity", newOpacity);
       // Update of elementen.
       hlbLijn.active = active;
     })
     .text("Haarlemmerbuurt");


     // Jordaan
  svg.append("text")
     .attr("x", 650)             
     .attr("y", height + margin.top + 65)    
     .attr("class", "legenda")
     .style("fill", "#e76f51")         
     .on("click", function(){
       // Bepalen of de huidige lijn zichtbaar is.
       var active   = jorLijn.active ? false : true,
       newOpacity = active ? 0 : 1;
       // Verberg of toon de elementen.
       d3.select("#jorLijn").style("opacity", newOpacity);
       // Update of elementen.
       jorLijn.active = active;
     })
     .text("Jordaan");

});