<script>
// Map Config
var config = {
  controls: false,
  container: "map",
  datapath: '/wp-content/themes/mdmc/data/',
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
    names: false,
    desig: false,
    limit: 7,
    size: 4,
    style: { fill: "#f0f0f0", opacity: 1 },
    // data: starsdata,
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
    lines: true,
    linestyle: { stroke: "#cccccc", width: 1, opacity: .6 },
  },

  mw: { show: true, style: { fill: "#ffffff", opacity: "0.23" } },
  lines: {
    graticule: { show: true, stroke: "#ffffff", opacity: "0.75", width: .6 },
    equatorial: { show: false },
    ecliptic: { show: false },
    galactic: { show: false },
    supergalactic: { show: false }
  }
};

Celestial.display(config);

</script>