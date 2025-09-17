<script>

var config = {
  controls: false,
  container: "map",
  datapath: '/wp-content/themes/mdmc/data-pendant/',
  // datapath: "https://ofrohn.github.io/data/",
  width: 500,
  projection: "stereographic", 
  form: true,        // Display settings form
  location: false,    // Display location settings
  formFields: { "location": true, "general": false, "stars": false, "dsos": false, "constellations": true, "lines": false, "other": true },
  interactive: false,
  background: { fill: '#000000', opacity: 1, stroke: "transparent", width: 0 },
  stars: {
    colors: false,
    show: true,
    names: true,
    // mapa das estrelas
    // desig: false,
    // limit: 7,
    // size: 4,
    // style: { fill: "#f0f0f0", opacity: 1 },

    // Pingente das Estrelas
    designation: true, // Show star names (Bayer, Flamsteed, Variable star, Gliese or designation, 
                       // i.e. whichever of the previous applies first); may vary with culture setting
    designationType: "c",  // Which kind of name is displayed as designation (fieldname in starnames.json)
    designationStyle: { fill: "#f0f0f0", font: "60px 'Palatino Linotype', Georgia, Times, 'Times Roman', serif", align: "center", baseline: "top" },
    designationLimit: 0.3,  // Show only names for stars brighter than nameLimit
    limit: 4,
    size: 7, 
    exponent: -0.2,
    style: { fill: "#f0f0f0", opacity: 1 }, 
    data: 'stars.6.json',

  },
  dsos: { show: false },
  planets: {  //Show planet locations, if date-time is set
    show: true,
    which: ["ter", "lun"],
    symbolType: "symbol",  // Type of planet symbol: 'symbol' graphic planet sign, 'disk' filled circle scaled by magnitude
    symbols: {
      "ter": { symbol: "\u2295", letter: "T", fill: "#00ccff" },
      "lun": { symbol: "\u25cf", letter: "L", fill: "#ffffff", size: 15 },
    },
    symbolStyle: { fill: "yellow", font: "bold 17px 'Lucida Sans Unicode', Consolas, sans-serif", 
             align: "center", baseline: "middle" }

  },
  constellations: { 
    names: false,
    namesType: 'pt',
    nameStyle: {
      fill: "#fff", align: "right", baseline: "middle",
      font: ["6px sans-serif"]
    },
    lines: false,
    linestyle: { stroke: "#cccccc", width: 1, opacity: .6 },
  },

  mw: { show: false, style: { fill: "#ffffff", opacity: "0.23" } },
  lines: {
    graticule: { show: false, stroke: "#ffffff", opacity: "0", width: .6 },
    equatorial: { show: false },
    ecliptic: { show: false },
    galactic: { show: false },
    supergalactic: { show: false }
  }
};

Celestial.display(config);

</script>