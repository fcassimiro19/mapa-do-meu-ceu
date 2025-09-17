var coords, mouseX, mouseY, TOPVIEW = 0,
  // SIDEVIEW = 1,
  // CONSTELLATIONVIEW = 2,
  currentView = TOPVIEW,
  // changedViewToConstellation = !1,
  canvasback = document.getElementById("LAYER1"),
  contextback = canvasback.getContext("2d"),
  canvas = document.getElementById("LAYER2"),
  context = canvas.getContext("2d"),
  fullscreenMode = !1,
  orreryWidth = 800,
  is_safari = -1 < navigator.userAgent.indexOf("Safari"),
  is_explorer = -1 < navigator.userAgent.indexOf("MSIE");
var xDeltaCO, yDeltaCO, distanceCO, ePF2, semiminorPF2,
  orbitPointColor,
  orbitDashedColor,
  current, newdd, newmm, newyyyy, newhour, YEAR, MONTH, DAY, HOUR, newDate, jupiterScaleDivider, saturnScaleDivider, uranusScaleDivider, neptuneScaleDivider,
  mouseDelta = 0,
  keyUp = !1,
  keyDown = !1,
  keyLeft = !1,
  keyRight = !1,
  keySpace = !1,
  started = !1,
  ended = !1,
  zoomOffSetX = 0,
  zoomOffSetY = 0,
  K = Math.PI / 180,
  enddate = new Date(2050, 0, 1),
  monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
setPlanetAUScale("compressed");
var conjunctionOppositionDateSort, solarConjunction = !1,
  speedOfLightMs = 299792458,
  AU = 149597870700,
  signalTimePerAUSeconds = AU / speedOfLightMs,
  conjunctionOppositionDates = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""]
  ];
var LGen, iGen, wGen, WGen, pGen, MGen, EGen, trueAnomalyArgGen, nGen, xGen, yGen, zGen, XGen, YGen, ZGen, TGen, mercuryAphelionPoint, mercuryPerihelionPoint, venusAphelionPoint, venusPerihelionPoint, earthAphelionPoint, earthPerihelionPoint, marsAphelionPoint, marsPerihelionPoint, jupiterPerihelionPoint, jupiterAphelionPoint, saturnPerihelionPoint, saturnAphelionPoint, uranusPerihelionPoint, uranusAphelionPoint, neptunePerihelionPoint, neptuneAphelionPoint, plutoPerihelionPoint, plutoAphelionPoint, PFIntersectPointEarth, PFIntersectPointMars, aMercury, eMercury, XMercury, YMercury, ZMercury, MMercury, nMercury, rMercury, LMercury, WMercury, wMercury, iMercury, EMercury, pMercury, aVenus, eVenus, XVenus, YVenus, ZVenus, MVenus, nVenus, rVenus, LVenus, WVenus, wVenus, iVenus, EVenus, pVenus, aEarth, eEarth, XEarth, YEarth, ZEarth, MEarth, nEarth, rEarth, LEarth, WEarth, wEarth, iEarth, EEarth, pEarth, aMars, eMars, XMars, YMars, ZMars, MMars, nMars, rMars, LMars, WMars, wMars, iMars, EMars, pMars, aJupiter, eJupiter, XJupiter, YJupiter, ZJupiter, MJupiter, nJupiter, rJupiter, LJupiter, WJupiter, wJupiter, iJupiter, EJupiter, pJupiter, aSaturn, eSaturn, XSaturn, YSaturn, ZSaturn, MSaturn, nSaturn, rSaturn, LSaturn, WSaturn, wSaturn, iSaturn, ESaturn, pSaturn, aUranus, eUranus, XUranus, YUranus, ZUranus, MUranus, nUranus, rUranus, LUranus, WUranus, wUranus, iUranus, EUranus, pUranus, aNeptune, eNeptune, XNeptune, YNeptune, ZNeptune, MNeptune, nNeptune, rNeptune, LNeptune, WNeptune, wNeptune, iNeptune, ENeptune, pNeptune, aPath, ePath, XPath, YPath, ZPath, MPath, nPath, rPath, LPath, WPath, wPath, iPath, EPath, pPath, aIo, eIo, XIo, YIo, ZIo, MIo, nIo, rIo, LIo, WIo, wIo, iIo, EIo, pIo, aEuropa, eEuropa, XEuropa, YEuropa, ZEuropa, MEuropa, nEuropa, rEuropa, LEuropa, WEuropa, wEuropa, iEuropa, EEuropa, pEuropa, aGanymede, eGanymede, XGanymede, YGanymede, ZGanymede, MGanymede, nGanymede, rGanymede, LGanymede, WGanymede, wGanymede, iGanymede, EGanymede, pGanymede, aCallisto, eCallisto, XCallisto, YCallisto, ZCallisto, MCallisto, nCallisto, rCallisto, LCallisto, WCallisto, wCallisto, iCallisto, ECallisto, pCallisto,
  aRhea, eRhea, XRhea, YRhea, ZRhea, MRhea, nRhea, rRhea, LRhea, WRhea, wRhea, iRhea, ERhea, pRhea, aIapetus, eIapetus, XIapetus, YIapetus, ZIapetus, MIapetus, nIapetus, rIapetus, LIapetus, WIapetus, wIapetus, iIapetus, EIapetus, pIapetus, aDione, eDione, XDione, YDione, ZDione, MDione, nDione, rDione, LDione, WDione, wDione, iDione, EDione, pDione, aTethys, eTethys, XTethys, YTethys, ZTethys, MTethys, nTethys, rTethys, LTethys, WTethys, wTethys, iTethys, ETethys, pTethys, now, delta, nowFPS, staticstartpostAngle, conjunctionOppositionDatesRunning = ["", "", "", "", "", "", ""],
  planetInfoIndex = 10,
  starInfo = [
    ["SIRIUS A", "2.063", "Also known as the", "Nile Star. When", "Ancient Egyptians", "saw Sirius rising", "just before sunrise", "in summer, they", "knew the Nile", "would flood soon.", "It signified new", "year as well. 36", "so-called 'decans'", "in total were used."],
    ["ALPHA CEN.", "1.100", "'Proxima b' is an", "exoplanet orbiting", "Proxima Centauri.", "Its estimated", "mass is at least", "1.3 times that of", "Earth.", "It is unlikely to be", "habitable due", "to stellar wind.", "", ""],
    ["ANDROMEDA", "1 TRILLION", "Andromeda is the", "closest galaxy to", "our Milky Way.", "Andromeda is a", "spiral galaxy and", "is 1.5 billion years", "younger than the", "Milky Way.", "Our galaxy will", "collide with", "Andromeda in", "4.5 billion years."],
    ["PLEIADES", "800", "Pleiades is the", "closest star", "cluster to Earth.", "The Babylonians", "called them", "'star star' (stars)", "in their star", "catalogue dating", "back 3,100 years.", "Also named", "'Subaru' in Japan,", "meaning 'to unite'."],
    ["ORION NEBULA", "2,000", "The Orion Nebula", "is the second", "brightest nebula", "in the sky and can", "be seen with the", "naked eye.", "Located in the", "Milky Way, it", "is studied to", "understand how", "stars are born", "from gas and dust."],
    ["CARINA NEBULA", "900,000", "The Carina Nebula", "is the brightest", "nebula in the night", "night sky.", "Although it is four", "times bigger and", "also brighter", "than Orion, it is", "less known due to", "its location on", "the Southern", "Hemisphere."]
  ],
  planetElements = [
    [.38709927, 37e-8, 252.2503235, 149472.67411175, .20563593, 1906e-8, 7.00497902, -.00594749, 77.45779628, .16047689, 48.33076593, -.1253408],
    [.72333566, 39e-7, 181.9790995, 58517.81538729, .00677672, -4107e-8, 3.39467605, -7889e-7, 131.60246718, .00268329, 76.67984255, -.27769418],
    [1.00000261, 562e-8, 100.46457166, 35999.37244981, .01671123, -4392e-8, -1531e-8, -.01294668, 102.93768193, .32327364, 0, 0],
    [1.52371034, 1847e-8, -4.55343205, 19140.30268499, .0933941, 7882e-8, 1.84969142, -.00813131, -23.94362959, .44441088, 49.55953891, -.29257343],
    [5.202887, -11607e-8, 34.39644051, 3034.74612775, .04838624, -13253e-8, 1.30439695, -.00183714, 14.72847983, .21252668, 100.47390909, .20469106],
    [9.53667594, -.0012506, 49.95424423, 1222.49362201, .05386179, -50991e-8, 2.48599187, .00193609, 92.59887831, -.41897216, 113.66242448, -.28867794],
    [19.18916464, -.00196176, 313.23810451, 428.48202785, .04725744, -4397e-8, .77263783, -.00242939, 170.9542763, .40805281, 74.01692503, .04240589],
    [30.06992276, 26291e-8, -55.12002969, 218.45945325, .00859048, 5105e-8, 1.77004347, 35372e-8, 44.96476227, -.32241464, 131.78422574, -.00508664],
    [.0028195588481728304, 0, 110.127, 7432434.201907501, .0041, 0, .036, 0, 128.106, 22153.846153846152, 43.977, 4851.752021563342],
    [.004486026417754353, 0, 119.092, 3702711.801405, .0094, 0, .466, 0, 308.076, 25824.96413199426, 219.106, 1192.684866154254],
    [.007155182055676144, 0, 213.509, 1837850.60298, .0013, 0, .177, 0, 255.969, 566.491998300524, 63.552, 271.38269483015966],
    [.012585072175094802, 0, 172.899, 21.5710728 * 36525, .0074, 0, .192, 0, 351.491, 174.9696233292831, 298.848, 106.25110678236231],
    [384400 / (AU / 1e3), 0, 218.5, 481266.47595, .0554, 0, 5.16, 0, 83.23, 6003.001500750375, 125.08, 1935.483870967742],
    [354759 / (AU / 1e3), 0, 236.007, 61.2572638 * 36525, 0, 0, 156.865, 0, 243.75, 93.17469478816992, 177.608, 52.367749612333185],
    [1221865 / (AU / 1e3), 0, 11.902, 824624.03379, .0288, 0, .306, 0, 208.592, 102.2378734522322, 28.06, 51.092818620493894],
    [527068 / (AU / 1e3), 0, 52.442, 2910678.9264975, 2e-4, 0, .333, 0, 321.3090459, 2006.800825018117, 351.042, 1004.6885465505693],
    [3560854 / (AU / 1e3), 0, 194.5, 165748.31694, .0293, 0, 8.298, 0, 352.711, 21.470874162785012, 81.105, 10.46898128087986],
    [377415 / (AU / 1e3), 0, 176.962, 131.5349307 * 36525, .0022, 0, .028, 0, 574.73, 6151.742993848257, 290.415, 3074.558032282859],
    [294672 / (AU / 1e3), 0, 188.411, 6965241.1956225, 1e-4, 0, 1.091, 0, 305.044, 14457.831325301206, 259.842, 7226.013649136893]
  ],
  launchPoint = [],
  landingPoint = [],
  launchPointMars = [],
  fps = 20,
  then = Date.now(),
  interval = 1e3 / fps,
  thenFPS = Date.now(),
  // avgFPSCount = 0,
  FPSCount = 0,
  // deltaFPS = 0,
  rotAngle = 0,
  // getstartposAngle = !0,
  // secondLastDistance = 0,
  // lastDistance = 0,
  oppositionMode = !1,
  // firstOppositionFrame = !1,
  galileanMoonMode = !1,
  moonMoonMode = !1,
  neptunianMoonMode = !1,
  saturnianMoonMode = !1,
  images = loadImages(["https://static.thenounproject.com/png/201244-200.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATYAAACjCAMAAAA3vsLfAAAAeFBMVEX///8AAACFhYXl5eXr6+vz8/P7+/snJyfw8PCCgoK6urqenp719fU9PT2zs7Nra2t9fX3Y2NjFxcXKysqmpqaWlpYsLCxbW1tISEhmZmaoqKh2dnYODg6Kiop5eXnOzs5BQUFVVVUgICA5OTlPT08yMjLe3t4WFhbscU4RAAAGmklEQVR4nO2d2XriMAyFkxKWhjWhLGUpS4F5/zccKMMMjOTEi4rTE//36LMPjhdJlqMoEKgJvUa2ydM0zcfZqeO7MT+B5rj7Md/H96z675NBw3fDqkszX29jFe1lkI6hlc6Ukt3odxPfzawW+bBUsyvzRct3WyvDoK0p2hfrsEicab2ZaPbFMsxyC2PRLnw0fbfbK9mnlWpnFr6b7o+O7kLAcdz4br4ncgfRLqx9d8ALr46qxfG2fmtqYj2r3ZP67saTGUuIdubVd0eeykBItTge+u7KE5mIqRbHB9+deRovgqrF8WfPd3+ew0hUtThu10K30i90OuwOsqTTbPU6SSN/G6mdcH/o++7SEyg5hI5S6lPrjSfTwh/tPPTjuRQeDYa58nenyaroh0/sgQ+ygr5PSuaotGCHPHlO8z3R2is73tVw247VwkEf7JUuj6XmaqieGYE9cKrDwTTTNtFTKT//xnb7paEaakZWVNq/fVOrvdPn+2vqxmgodiOg0UDFMNH/QG+05qyh2Te02T8ttq8rqzHyLjJsfwTsAX5vuQAu2b9AtsGVgF8PrOcjNvUBcFVgNw4ne3vcAX8Fl+nADraxg8HWL8ZgV6y9FYGLU7lF7NjjrVBrq0KP6eLW0WaXsTkQaGuF4HyTzlHOA7UJ5rFkPB/u8xA3XzosMtWDmYemAmbX1OxIwGxlYBYEl1X0Rovx+AqYrQy0dzJ+HialUOLvqAhMAEEdNTCBOecCpTfQb/QoZJmu0L+ELFcAmtIstb/q0OEGs5Y2ad/EPP/0SA+Tnkqntncx2ymxbeZirzB0eyXnUKSLQlvMtmdoDEEw2WVHjKPEFEjHJE+O9EAPEmlOSMdeBK1viHWQNYEeSEVjJcQ6SD4IXexE70yRTaHcMu0VOvuIuvxJ8A/E50b2H3tR8ySQCLID+fi/X7LJjyQJCSRcSkJ9spMPnToxUqDJsVE2ZZTKhnEVa/d/t2Qd1/TEi3FM+GbZ6PUtDNnCR2oF2ViFJUEHklQlm79Hsw0xEmjIflQqkHCFhBNAogk0TCJqnmwLQQ5X9CsSXerIFQ+QHF7qERMNARPrIBUbqJtS0iN2ItZRcgNJxyTP8vQ6kUzA3z/0+oWgcZoTjFI4iniOJKMkxDaI34hbSuVOpfRECrKQslmPYht5eq8DJAITceltUtM2k6kFEiaNuGlb6ktirr8JWa4ATOeE0qloChhQtQHmVoJM75g0TaRrfsxFRpHdFXOxF8PZdoUZFRKzG/Pxg4Tkr3BXcN0XU84qUKJ4xF6bdfcmMjWmYI4IV6ifIo4/HG1yFQdx9rpXuNvGbosek0iNErT6B/VVxo5eXuZ+H9Jdjj9wRSjaDkdTtngeRmD5Hrb2qf3NK7Z4Ht5gU9RSsN298aVY0Ga2C3xFCzvd+McCUIIIjzCXZs9sLeY33pLExd4qwnY23hvP44paZObFkn4GqrqUZtf9VAW1ttkJI/mDoKq4uzTob2Fd7dkAsmigqrbkSvfAcOI2uQ8grguqeoHnHZzOzNTUKRC9ApzjCj6xWVnsJNGtRQ5WeuYCv3e4sh0UzHFjg4djAD9UtmDdX96Z2thR1NsYFr0H1G1X0uXpaLBJ/g67zimd8KUo66aboiDqI/tp/7A97osKiddMt5aWbq7g6Rbtgm5WuDynVmfdZJ+DqY9u9O5K0E2HpPidkqCbCpqbGnTTYaN+q0ODhdY+BlE3h+fVZgkf06mHbie+Fn0Z7UveTfHpFlu3KNsZi7a/eoZ030/E1C3KzEZc++YJZioF1kq3KNGf45Z3zszSV+rQdYuiXGemOiwe/Jj6jzfj6nbej7wcC3q+WqYkKlUaj6mFbufpKp8caM58PH8ZsBnSXLJhLXW70Gvkg7fJ63K4fF1PFvmpqY4wGJxsAR88scdgvxx0u6MoEhZ0U2PguQu63RF0syN8p3YE3ewIutkRdLPDYF0AKQItQ1hP7Qi62RF0syPoZkdYF+wIutkRdLODez026FZO0M2OoJsdBrqhlGMUwUA3vLv1DujrBlR+SwB93WCelxRBWzeoSlLu6Nyg/AL0wrMtuuMNqwKXO5rjDa2WlDN6usE8AiuG1ncKU9xYDp3xJvvCGwYauoUNL0O5biBvUghTqhtgFQcJynRDrF0mQbFun76bV1kKdUMqpS1MgW6oJd9EUOsW3LtFqHSTffETD163cEIog8sbDC7Kcujl0+Ay0qH56BAZojwi9u0k3dsF1OM6hF5MaGZ5mmfhQBUA4Dc0NUnImzwoWAAAAABJRU5ErkJggg=="]),
  nextImgY = 78, scaleImgX = (zoomImgX = (fullscreenImgX = orreryWidth - (pauseImgX = nextImgX = playImgX = 30) - 23) - 30) - 22 + 3, topviewImgX = orreryWidth - 30 - 23 - 30 - 22 - 11 - 16, telescopeImgX = orreryWidth - 30 - 23 - 30 - 22 - 11 - 19 - 22 - 8, infoImgX = orreryWidth - 30 - 23 - 30 - 22 - 11 - 19 - 25 - 22 - 13, infoImgY = telescopeImgY = topviewImgY = scaleImgY = zoomImgY = fullscreenImgY = pauseImgY = playImgY = 43, detailImgX = canvas.width - 35, detailImgY = 687, detailImgMoonX = canvas.width - 133, constellationImgX = orreryWidth - 30 - 23 - 30 - 22 - 11 - 16;
var playImgX, playImgY, nextImgX, nextImgY, pauseImgX, pauseImgY, fullscreenImgX, fullscreenImgY, zoomImgX, zoomImgY, detailImgX, detailImgY, detailImgMoonX, detailImgMoonY, scaleImgX, scaleImgY, telescopeImgX, telescopeImgY, infoImgX, infoImgY, topviewImgX, topviewImgY, constellationImgX, constellationImgY, xDeltaTransfer, yDeltaTransfer, distanceTransfer, smAxisTransfer, semiMajorAxisProbeOrbit, eccentricityProbeOrbit, orbitalProbeFlightTimeDays, xDeltaPF, yDeltaPF, semimajorPF, semiminorPF, ePF, flighttimePF, scale, scaleChange, planetScaleAdjustment, zoomratio, orbitalElements, fullscreenButtonHighlight = !(constellationImgY = 43),
  playButtonHighlight = !(detailImgMoonY = 607),
  pauseButtonHighlight = !1,
  zoomButtonHighlight = !1,
  detailButtonHighlight = !1,
  detailButtonMoonHighlight = !1,
  nextButtonHighlight = !1,
  scaleHighlight = !1,
  telescopeHighlight = !1,
  infoHighlight = !1,
  topviewHighlight = !1,
  constellationHighlight = !1,
  AlphaLoop = 30,
  AlphaLoopChange = -1,
  mission1996Highlight = !1,
  mission2003Highlight = !1,
  mission2011Highlight = !1,
  mission2018Highlight = !1,
  mission2020Highlight = !1,
  runningmission1996 = !1,
  launchDate1996 = new Date(1996, 11, 4),
  landingDate1996 = new Date(1997, 6, 4),
  runningmission2003 = !1,
  launchDate2003 = new Date(2003, 6, 7),
  landingDate2003 = new Date(2004, 0, 25),
  runningmission2011 = !1,
  launchDate2011 = new Date(2011, 10, 26),
  landingDate2011 = new Date(2012, 7, 6),
  runningmission2018 = !1,
  launchDate2018 = new Date(2018, 4, 5),
  landingDate2018 = new Date(2018, 10, 26),
  runningmission2020 = !1,
  launchDate2020 = new Date(2020, 6, 17),
  landingDate2020 = new Date(2021, 1, 18),
  ePFset = !1,
  startScreenWidth = 700,
  startScreenHeight = 575,
  startScreenX = orreryWidth / 2 - startScreenWidth / 2,
  startScreenY = canvas.height / 2 - startScreenHeight / 2,
  endScreenWidth = 600,
  endScreenHeight = 200,
  endScreenX = orreryWidth / 2 - endScreenWidth / 2,
  endScreenY = canvas.height / 2 - endScreenHeight / 2,
  playing = !1,
  zoomedin = !1,
  scaleCompressed = !0,
  mobileDevice = !1,
  mobileMultiplier = 1,
  mobileAdjustX = 0,
  mobileExtraX = 0,
  mobileExtraX2 = 0,
  mobileExtraX3 = 0,
  mobileExtraX4 = 0,
  mobileExtraX5 = 0,
  mobilePadding = 0,
  mobilezoomAdjustX = 0,
  redrawback = !1,
  nextMode = !1,
  zoomedinscale = 50,
  zoomedoutscale = 1000,
  zoomedoutscaleActual = 7.5;
var zoomincrement = 1000;
scaleChange = 100;
var lOPX100, lOPY100, scaleMoon = 100000,
  avgSpeedProbe = 0,
  missionRot = 0,
  missionDay = 0,
  YVoyagerI = canvas.height / 2 + 40.5 * zoomedoutscaleActual,
  XVoyagerI = orreryWidth / 2 + 0,
  voyagerMode = !1,
  telescopeMode = !1,
  infoMode = !1,
  constellationView = !1,
  planetSizeAdjust = 1,
  planetPadding = 20,
  phaseAngleAtDeparture = 0,
  sweepAngle = 0,
  GMSun = 132712440018e9,
  AUValue = 149597870.7,
  gravitationalConstantKG = 6673889e-17,
  massEarthKG = 59723e20,
  massMarsKG = 64171e19,
  radiusEarthM = 6371e3,
  radiusEarthLEO200_M = 2e5,
  radiusEarthLEO300_M = 3e5,
  radiusEarthLEO640_M = 64e4,
  radiusEarthGEO35786_M = 35786e3,
  velocityAtLEO200KMS = Math.sqrt(massEarthKG * gravitationalConstantKG / (radiusEarthM + radiusEarthLEO200_M)) / 1e3,
  escapeVelocityEarthLEO200KMS = Math.sqrt(2 * gravitationalConstantKG * massEarthKG / (radiusEarthM + radiusEarthLEO200_M)) / 1e3,
  velocityAtLEO300KMS = Math.sqrt(massEarthKG * gravitationalConstantKG / (radiusEarthM + radiusEarthLEO300_M)) / 1e3,
  escapeVelocityEarthLEO300KMS = Math.sqrt(2 * gravitationalConstantKG * massEarthKG / (radiusEarthM + radiusEarthLEO300_M)) / 1e3,
  velocityAtGEO35786KMS = Math.sqrt(massEarthKG * gravitationalConstantKG / (radiusEarthM + radiusEarthGEO35786_M)) / 1e3,
  escapeVelocityEarthGEO35786KMS = Math.sqrt(2 * gravitationalConstantKG * massEarthKG / (radiusEarthM + radiusEarthGEO35786_M)) / 1e3,
  meanSemiMajorAxisEarthAU = 1.00000011,
  meanSemiMajorAxisMarsAU = 1.52366231,
  meanOrbitalVelocityEarthKMS = 29.78,
  VEarthSquared = Math.pow(meanOrbitalVelocityEarthKMS, 2),
  ETransferOrbitRightSide = 2 * VEarthSquared * (1 - meanSemiMajorAxisEarthAU / meanSemiMajorAxisMarsAU),
  ETransferOrbitLeftSide = 1 - Math.pow(meanSemiMajorAxisEarthAU, 2) / Math.pow(meanSemiMajorAxisMarsAU, 2),
  VSpacecraftLaunchKMS = Math.sqrt(ETransferOrbitRightSide / ETransferOrbitLeftSide),
  deltaVLaunch = VSpacecraftLaunchKMS - meanOrbitalVelocityEarthKMS,
  VSpacecraftArrivalKMS = meanSemiMajorAxisEarthAU / meanSemiMajorAxisMarsAU * VSpacecraftLaunchKMS,
  habitableZone = calculateHabitableZoneStar(),
  speedEarth = 0,
  speedMars = 0,
  speedSpacecraft = 0,
  speedSide = 0,
  topView = !0,
  limitAU = -10,
  rLegend = 75,
  xLegend = 950,
  yLegend = canvas.height - 30 - 1 - rLegend - 40,
  lineLegend = 1,
  wAngleLegend = 0,
  WAngleLegend = 0,
  zAU2 = 0,
  LAngleLegend = 0,
  nAngleLegend = 0,
  mylatesttap = 0,
  timesince = 0,
  touched = !1,
  touchX = 0,
  touchY = 0,
  celestCoord = [],
  celestCoordSunX = [],
  meanObliquityForJ2000 = 23.43928,
  monthCount = 0,
  storedMonth = null,
  solsticeWLabelled = !1,
  solsticeSLabelled = !1,
  fallLabelled = !1,
  springLabelled = !1,
  currentDateLabelled = !1,
  smallestDecl = 0,
  largestDecl = 300,
  alphaCentauriJ2000 = [
    [14, 39, 36.5, -60, -50, -2.3]
  ],
  raAlphaCentauri = [],
  declAlphaCentauri = [],
  pleiadesJ2000 = [
    [3, 49, 11.22, 24, 8, 12.2],
    [3, 49, 9.75, 24, 3, 12.3],
    [3, 47, 29.07, 24, 6, 18.9],
    [3, 45, 54.48, 24, 33, 16.2],
    [3, 45, 49.61, 24, 22, 3.9],
    [3, 45, 12.5, 24, 28, 2.2],
    [3, 44, 48.22, 24, 17, 22.1],
    [3, 44, 52.53, 24, 6, 48.4],
    [3, 46, 19.58, 23, 56, 54.1]
  ],
  raPleiades = [],
  declPleiades = [],
  andromedaJ2000 = [
    [0, 42, 44.33, 41, 16, 7.5]
  ],
  raAndromeda = [],
  declAndromeda = [],
  orionJ2000 = [
    [5, 35, 17.31, -5, -23, -28]
  ],
  raOrion = [],
  declOrion = [],
  carinaJ2000 = [
    [10, 44, 19.01, -59, -53, -21.1]
  ],
  raCarina = [],
  declCarina = [],
  siriusJ2000 = [
    [6, 45, 8.92, -16, -42, -58]
  ],
  raSirius = [],
  declSirius = [],
  polarisJ2000 = [
    [2, 31, 47.17, 89, 15, 50.9]
  ],
  raPolaris = [],
  declPolaris = [],
  polarisAustralisJ2000 = [
    [21, 8, 46.88, -88, -57, -23.4]
  ],
  raPolarisAustralis = [],
  declPolarisAustralis = [],
  cruxJ2000 = [
    [12, 31, 9.96, -57, -6, -47.6],
    [12, 26, 35.9, -63, -5, 56.7],
    [12, 47, 43.27, -59, -41, -19.6],
    [12, 15, 8.72, -58, -44, -56.2]
  ],
  raCrux = [],
  declCrux = [],
  zodiacAriesJ2000 = [
    [1, 53, 31.77, 19, 17, 38.7],
    [1, 54, 38.36, 20, 48, 29.8],
    [2, 7, 10.3, 23, 27, 45.9],
    [2, 49, 59.04, 27, 15, 37.8]
  ],
  raAries = [],
  declAries = [],
  zodiacTaurusJ2000 = [
    [5, 37, 38.69, 21, 8, 33.3],
    [4, 35, 55.24, 16, 30, 33.5],
    [4, 28, 39.75, 15, 52, 15.2],
    [4, 19, 47.61, 15, 37, 39.5],
    [4, 0, 40.82, 12, 29, 25.3],
    [3, 24, 48.8, 9, 1, 44],
    [5, 26, 17.52, 28, 36, 26.8],
    [4, 42, 14.71, 22, 57, 25],
    [4, 28, 37, 19, 10, 49.6],
    [4, 25, 29.39, 17, 55, 40.5],
    [4, 22, 56.1, 17, 32, 33.1],
    [3, 49, 9.75, 24, 3, 12.3]
  ],
  raTaurus = [],
  declTaurus = [],
  zodiacCancerJ2000 = [
    [8, 46, 41.82, 28, 45, 35.6],
    [8, 20, 3.87, 27, 13, 3.7],
    [8, 43, 17.15, 21, 28, 6.6],
    [8, 44, 41.11, 18, 9, 15.5],
    [8, 58, 29.22, 11, 51, 27.7],
    [8, 16, 30.93, 9, 11, 8]
  ],
  raCancer = [],
  declCancer = [],
  zodiacLeoJ2000 = [
    [9, 45, 51.08, 23, 46, 27.3],
    [9, 52, 45.82, 26, 0, 25],
    [10, 16, 41.41, 23, 25, 2.4],
    [10, 19, 58.36, 19, 50, 29.4],
    [10, 7, 19.96, 16, 45, 45.6],
    [10, 8, 22.32, 11, 58, 1.9],
    [11, 14, 14.41, 15, 25, 46.5],
    [11, 49, 3.58, 14, 34, 19.4],
    [11, 14, 6.42, 20, 31, 26.5]
  ],
  raLeo = [],
  declLeo = [],
  zodiacVirgoJ2000 = [
    [11, 45, 51.57, 6, 31, 45.8],
    [12, 18, 40.32, -0, -47, -13.9],
    [12, 41, 39.99, -1, -26, -58.2],
    [12, 55, 36.21, 3, 23, 50.9],
    [13, 2, 10.6, 10, 57, 32.9],
    [13, 34, 41.75, -0, -35, -45.4],
    [13, 25, 11.58, -11, -9, -40.8],
    [14, 12, 53.75, -10, -16, -25.3],
    [14, 16, .89, -5, -59, -58.4],
    [14, 43, 3.57, -5, -39, -26.8],
    [14, 1, 38.8, 1, 32, 40.3],
    [14, 46, 14.93, 1, 53, 34.4]
  ],
  raVirgo = [],
  declVirgo = [],
  zodiacLibraJ2000 = [
    [15, 17, .47, -9, -22, -58.3],
    [14, 50, 52.72, -16, -2, -30.4],
    [15, 4, 4.22, -25, -16, -55.1],
    [15, 35, 31.54, -14, -47, -22.4],
    [15, 53, 49.54, -16, -43, -45.5]
  ],
  raLibra = [],
  declLibra = [],
  zodiacScorpioJ2000 = [
    [17, 33, 36.53, -37, -6, -13.8],
    [17, 42, 29.28, -39, -1, -47.9],
    [17, 47, 35.09, -40, -7, -37.2],
    [17, 37, 19.14, -42, -59, -52.2],
    [17, 12, 9.2, -43, -14, -21.1],
    [16, 54, 35.01, -42, -21, -40.7],
    [16, 51, 52.24, -38, -2, -50.4],
    [16, 50, 9.82, -34, -17, -35.6],
    [16, 35, 52.96, -28, -12, -57.7],
    [16, 29, 24.47, -26, -25, -55.2],
    [16, 5, 26.24, -19, -48, -19.4],
    [16, 0, 20.01, -22, -37, -18.2],
    [15, 58, 51.13, -26, -6, -50.6]
  ],
  raScorpio = [],
  declScorpio = [],
  zodiacSagittariusJ2000 = [
    [19, 23, 13.14, -44, -47, -59.2],
    [19, 55, 15.7, -41, -52, -5.8],
    [19, 59, 44.18, -35, -16, -34.7],
    [20, 2, 39.48, -27, -42, -35.4],
    [19, 36, 1.66, -24, -43, -8.7],
    [19, 6, 56.41, -27, -40, -13.5],
    [19, 2, 36.72, -29, -52, -48.4],
    [18, 24, 10.32, -34, -23, -4.6],
    [18, 17, 37.64, -36, -45, -42.1],
    [17, 47, 33.63, -27, -49, -50.9],
    [18, 5, 48.49, -30, -25, -26.8],
    [18, 20, 59.65, -29, -49, -41.2],
    [18, 27, 58.25, -25, -25, -18.1],
    [18, 13, 45.81, -21, -3, -31.8],
    [18, 45, 39.39, -26, -59, -26.8],
    [18, 55, 15.93, -26, -17, -48.2],
    [18, 57, 43.81, -21, -6, -24],
    [19, 4, 40.99, -21, 44, 29.4],
    [19, 17, 38.08, -18, -57, -10.5],
    [19, 21, 40.36, -17, -50, -49.9],
    [19, 23, 53.18, -40, -36, -57.4]
  ],
  raSagittarius = [],
  declSagittarius = [],
  zodiacCapricornusJ2000 = [
    [20, 18, 3.23, -12, -32, -41.5],
    [20, 21, .68, -14, -46, -53.1],
    [21, 5, 56.79, -17, -13, -57.8],
    [21, 22, 14.8, -16, -50, -4.3],
    [21, 40, 5.35, -16, -39, -44.1],
    [21, 47, 2.3, -16, -7, -35.7],
    [20, 46, 5.77, -25, -16, -13.9],
    [20, 51, 49.3, -26, -55, -8.9],
    [21, 26, 40.03, -22, -24, -41]
  ],
  raCapricornus = [],
  declCapricornus = [],
  zodiacAquariusJ2000 = [
    [20, 47, 40.56, -9, -29, -44.8],
    [20, 52, 39.24, -8, -59, -0],
    [21, 31, 33.53, -5, -34, -16.2],
    [22, 5, 47.04, -0, -19, -11.5],
    [22, 21, 39.31, -1, -23, -14.5],
    [22, 28, 49.81, -0, -1, -12.2],
    [22, 35, 21.34, -0, -7, -2.5],
    [22, 52, 36.87, -7, -34, -46.8],
    [23, 15, 53.5, -9, -5, -15.9],
    [23, 22, 58.3, -20, -6, -1.3],
    [22, 16, 50.04, -7, -46, -59.8],
    [22, 30, 38.82, -10, -40, -40.7],
    [22, 49, 35.51, -13, -35, -33.5],
    [22, 54, 39.04, -15, -49, -14.8],
    [23, 9, 26.77, -21, -10, -20.9],
    [22, 6, 26.23, -13, -52, -10.8]
  ],
  raAquarius = [],
  declAquarius = [],
  zodiacPiscesJ2000 = [
    [23, 17, 9.94, 3, 16, 56.2],
    [23, 26, 55.96, 1, 15, 20.2],
    [23, 42, 2.81, 1, 46, 48.1],
    [23, 39, 57.05, 5, 37, 34.6],
    [23, 27, 58.1, 6, 22, 44.4],
    [23, 59, 18.69, 6, 51, 47.9],
    [0, 20, 35.87, 8, 11, 25],
    [0, 48, 17.42, 7, 17, 59.7],
    [1, 2, 56.61, 7, 53, 24.5],
    [1, 30, 11.12, 6, 8, 37.8],
    [1, 41, 25.9, 5, 29, 15.4],
    [1, 53, 33.36, 3, 11, 15.1],
    [2, 2, 2.83, 2, 45, 49.4],
    [1, 45, 23.64, 9, 9, 27.9],
    [1, 31, 29.02, 15, 20, 45],
    [1, 13, 44.95, 24, 35, 1.4],
    [1, 2, 49.1, 31, 48, 15.3],
    [1, 19, 28, 27, 15, 50.6]
  ],
  raPisces = [],
  declPisces = [],
  zodiacGeminiJ2000 = [
    [7, 45, 18.95, 28, 1, 34.3],
    [7, 35, 55.35, 26, 53, 44.7],
    [7, 20, 7.39, 21, 58, 56.4],
    [7, 18, 5.58, 16, 32, 25.4],
    [6, 45, 17.37, 12, 53, 44.1],
    [7, 4, 6.54, 20, 34, 13.1],
    [6, 37, 42.71, 16, 23, 57.3],
    [7, 44, 26.85, 24, 23, 52.8],
    [7, 25, 43.6, 27, 47, 53.1],
    [7, 34, 35.87, 31, 53, 17.8],
    [7, 11, 8.37, 30, 14, 42.6],
    [6, 52, 47.34, 33, 57, 40.5],
    [6, 43, 55.93, 25, 7, 52.1],
    [6, 28, 57.79, 20, 12, 43.7],
    [6, 22, 57.6, 22, 30, 49.8],
    [6, 14, 52.7, 22, 30, 24.6],
    [6, 4, 7.21, 23, 15, 48]
  ],
  raGemini = [],
  declGemini = [];

// orbit color
var orbitLineWidth = 5,
  orbitLineColor = '#989898',
  backgroundColor = 'transparent';

// planet colors
var planetColorDefault = '#777'
var planetMercuryColor = planetColorDefault,
  planetVenusColor = planetColorDefault,
  planetEarthColor = planetColorDefault,
  planetMarsColor = planetColorDefault,
  planetJupiterColor = planetColorDefault,
  planetSaturnColor = planetColorDefault,
  planetSaturnColor = planetColorDefault,
  planetUranusColor = planetColorDefault,
  planetNeptuneColor = planetColorDefault,
  sunColor = planetColorDefault;

// planet sizes
var planetMercurySize = 1000,
  planetVenusSize = 1000,
  planetEarthSize = 1000,
  planetMarsSize = 1000,
  planetJupiterSize = 1000,
  planetSaturnSize = 1000,
  planetSaturnSize = 1000,
  planetUranusSize = 1000,
  planetNeptuneSize = 1000,
  sunSize = 8;


var scale = 100;

function init() {
  mobileDevice && (document.getElementById("CONTAINER").style.top = "0%",
    document.getElementById("CONTAINER").style.left = "0%",
    document.getElementById("CONTAINER").style.transform = "translateX(0%) translateY(0%)",
    document.getElementById("LAYER1").style.top = "50%",
    document.getElementById("LAYER1").style.left = "50%",
    document.getElementById("LAYER1").style.transform = "translateX(-50%) translateY(-50%)",
    document.getElementById("LAYER2").style.top = "50%",
    document.getElementById("LAYER2").style.left = "50%",
    document.getElementById("LAYER2").style.transform = "translateX(-50%) translateY(-50%)",
    mobileMultiplier = 4,
    mobileAdjustX = 50,
    mobileExtraX = 30,
    mobileExtraX2 = 0,
    mobileExtraX5 = mobileExtraX4 = mobileExtraX3 = 80,
    mobilezoomAdjustX = mobilePadding = 10),
    mercuryAphelionPoint = plotPlanet(0, 1985, 7, 22, !1),
    mercuryPerihelionPoint = plotPlanet(0, 1985, 6, 8, !1),
    venusAphelionPoint = plotPlanet(1, 1986, 1, 27, !1),
    venusPerihelionPoint = plotPlanet(1, 1985, 10, 7, !1),
    earthAphelionPoint = plotPlanet(2, 1986, 7, 5, !1),
    earthPerihelionPoint = plotPlanet(2, 1987, 1, 4, !1),
    marsAphelionPoint = plotPlanet(3, 1987, 9, 4, !1),
    marsPerihelionPoint = plotPlanet(3, 1988, 8, 13, !1),
    jupiterPerihelionPoint = plotPlanet(4, 1999, 5, 8, !1),
    jupiterAphelionPoint = plotPlanet(4, 1993, 6, 2, !1),
    saturnPerihelionPoint = plotPlanet(5, 2003, 6, 26, !1),
    saturnAphelionPoint = plotPlanet(5, 1988, 10, 8, !1),
    uranusPerihelionPoint = plotPlanet(6, 1966, 10, 7, !1),
    uranusAphelionPoint = plotPlanet(6, 2008, 10, 18, !1),
    neptunePerihelionPoint = plotPlanet(7, 1881, 3, 9, !1),
    neptuneAphelionPoint = plotPlanet(7, 1963, 6, 23, !1),
    PFIntersectPointEarth = plotPlanet(2, 1997, 2, 5.5, !1),
    PFIntersectPointMars = plotPlanet(3, 1996, 8, 8, !1),
    conjunctionOppositionDates[0] = nextConjunctionOppositionCalc(0, !0, !1),
    conjunctionOppositionDates[1] = nextConjunctionOppositionCalc(1, !0, !1),
    conjunctionOppositionDates[3] = nextConjunctionOppositionCalc(3, !0, !1),
    conjunctionOppositionDates[4] = nextConjunctionOppositionCalc(4, !0, !1),
    conjunctionOppositionDates[5] = nextConjunctionOppositionCalc(5, !0, !1),
    conjunctionOppositionDates[6] = nextConjunctionOppositionCalc(6, !0, !1),
    conjunctionOppositionDates[7] = nextConjunctionOppositionCalc(7, !0, !1),
    (conjunctionOppositionDateSort = [new Date(conjunctionOppositionDates[0][0], conjunctionOppositionDates[0][1], conjunctionOppositionDates[0][2], 0), new Date(conjunctionOppositionDates[1][0], conjunctionOppositionDates[1][1], conjunctionOppositionDates[1][2], 1), new Date(conjunctionOppositionDates[3][0], conjunctionOppositionDates[3][1], conjunctionOppositionDates[3][2], 3), new Date(conjunctionOppositionDates[4][0], conjunctionOppositionDates[4][1], conjunctionOppositionDates[4][2], 4), new Date(conjunctionOppositionDates[5][0], conjunctionOppositionDates[5][1], conjunctionOppositionDates[5][2], 5), new Date(conjunctionOppositionDates[6][0], conjunctionOppositionDates[6][1], conjunctionOppositionDates[6][2], 6), new Date(conjunctionOppositionDates[7][0], conjunctionOppositionDates[7][1], conjunctionOppositionDates[7][2], 7)]).sort(date_sort_asc),
    current = new Date,
    DAY = 1,
    MONTH = 1,
    YEAR = 2000,
    HOUR = current.getHours(),
    orbitalElements = plotPlanet(0, YEAR, MONTH, DAY, !1), aMercury = orbitalElements[3], eMercury = orbitalElements[4], wMercury = orbitalElements[10], orbitalElements = plotPlanet(1, YEAR, MONTH, DAY, !1), aVenus = orbitalElements[3], eVenus = orbitalElements[4], wVenus = orbitalElements[10], orbitalElements = plotPlanet(2, YEAR, MONTH, DAY, !1), aEarth = orbitalElements[3], eEarth = orbitalElements[4], wEarth = orbitalElements[10], orbitalElements = plotPlanet(3, YEAR, MONTH, DAY, !1), aMars = orbitalElements[3], eMars = orbitalElements[4], wMars = orbitalElements[10], orbitalElements = plotPlanet(4, YEAR, MONTH, DAY, !1), aJupiter = orbitalElements[3], eJupiter = orbitalElements[4], wJupiter = orbitalElements[10], orbitalElements = plotPlanet(5, YEAR, MONTH, DAY, !1), aSaturn = orbitalElements[3], eSaturn = orbitalElements[4], wSaturn = orbitalElements[10], orbitalElements = plotPlanet(6, YEAR, MONTH, DAY, !1), aUranus = orbitalElements[3], eUranus = orbitalElements[4], wUranus = orbitalElements[10], orbitalElements = plotPlanet(7, YEAR, MONTH, DAY, !1), aNeptune = orbitalElements[3], eNeptune = orbitalElements[4], wNeptune = orbitalElements[10], is_explorer || renderBackground(), init_ra_decl_stars(), orbitalElements = plotPlanet(2, YEAR, MONTH, DAY, !1, "J2000", HOUR), XEarth = orbitalElements[0], YEarth = orbitalElements[1], ZEarth = orbitalElements[2], celestCoordSunX[0] = calculateRightAscensionAndDeclination(XEarth, YEarth, ZEarth, 0, 0, 0, "", "")


}

function run() {
  if (is_explorer) showErrorIE();
  else {
    if (now = Date.now(), delta = now - then, playing && updateSpeedControls(), 10 != planetInfoIndex && updatePlanetControls(), interval < delta) {
      switch (then = now - delta % interval, enddate < current && (playing = !(ended = !0)), playing && (galileanMoonMode || moonMoonMode || neptunianMoonMode || saturnianMoonMode ? (updateDate(0, 1), redrawback = !0) : updateDate(1, 0)), currentView) {
        case TOPVIEW:
          playing ? (runningmission1996 || runningmission2003 || runningmission2011 || runningmission2018 || runningmission2020) && missionDay++ : (galileanMoonMode || moonMoonMode || neptunianMoonMode || saturnianMoonMode) && (redrawback = !0), oppositionMode && (conjunctionOppositionDatesRunning = nextConjunctionOppositionCalc(planetInfoIndex, !1, !1), intersectCalc()), (runningmission1996 || runningmission2003 || runningmission2011 || runningmission2018 || runningmission2020) && (conjunctionOppositionDatesRunning = nextConjunctionOppositionCalc(3, !1, !1), speedEarth = calculateOrbitalSpeed(aEarth, eEarth, MEarth, "KM/S", 1), speedMars = calculateOrbitalSpeed(aMars, eMars, MMars, "KM/S", 1), runningmission1996 ? speedSpacecraft = calculateOrbitalSpeed(1.335, 1 - launchPoint[7] / 1.335, missionRot, "KM/S", 1) : runningmission2003 ? speedSpacecraft = calculateOrbitalSpeed(1.25, 1 - launchPoint[7] / 1.25, missionRot, "KM/S", 1) : runningmission2011 ? speedSpacecraft = calculateOrbitalSpeed(1.313, 1 - launchPoint[7] / 1.313, missionRot, "KM/S", 1) : runningmission2018 ? speedSpacecraft = calculateOrbitalSpeed(1.228, 1 - launchPoint[7] / 1.228, missionRot, "KM/S", 1) : runningmission2020 && (speedSpacecraft = calculateOrbitalSpeed(1.314, 1 - launchPoint[7] / 1.314, missionRot, "KM/S", 1))), (rotAngle -= 5) < -360 && (rotAngle = 0);
          break;
        case SIDEVIEW:
          if (10 != planetInfoIndex) switch (planetInfoIndex) {
            case 0:
              speedSide = calculateOrbitalSpeed(aMercury, eMercury, MMercury, "KM/S", 1);
              break;
            case 1:
              speedSide = calculateOrbitalSpeed(aVenus, eVenus, MVenus, "KM/S", 1);
              break;
            case 2:
              speedSide = calculateOrbitalSpeed(aEarth, eEarth, MEarth, "KM/S", 1);
              break;
            case 3:
              speedSide = calculateOrbitalSpeed(aMars, eMars, MMars, "KM/S", 1);
              break;
            case 4:
              speedSide = calculateOrbitalSpeed(aJupiter, eJupiter, MJupiter, "KM/S", 1);
              break;
            case 5:
              speedSide = calculateOrbitalSpeed(aSaturn, eSaturn, MSaturn, "KM/S", 1);
              break;
            case 6:
              speedSide = calculateOrbitalSpeed(aUranus, eUranus, MUranus, "KM/S", 1);
              break;
            case 7:
              speedSide = calculateOrbitalSpeed(aNeptune, eNeptune, MNeptune, "KM/S", 1)
          }
      }
      updateAllPlanets(), zoomedin ? (scale < zoomedinscale && (redrawback = !0, (scale += scaleChange) % 1 != 0 && (scale -= 1.5)), galileanMoonMode ? planetSystemZoomIn(XJupiter, YJupiter, jupiterScaleDivider) : moonMoonMode ? planetSystemZoomIn(XEarth, YEarth, 1) : neptunianMoonMode ? planetSystemZoomIn(XNeptune, YNeptune, neptuneScaleDivider) : saturnianMoonMode && planetSystemZoomIn(XSaturn, YSaturn, saturnScaleDivider)) : zoomedin || (scaleCompressed ? zoomedoutscale < scale && (redrawback = !0, scale -= scaleChange) : zoomedoutscaleActual < scale && (redrawback = !0, scale -= 12 < scale ? scaleChange : .5), galileanMoonMode && moonMoonMode && neptunianMoonMode && saturnianMoonMode || planetSystemZoomOut()), redrawback && (redrawback = !1, renderBackground()), requestAnimationFrame(renderForeground), FPSCount++, nowFPS = Date.now(), 1e3 < (deltaFPS = nowFPS - thenFPS) && (avgFPSCount = FPSCount, FPSCount = 0, thenFPS = nowFPS - deltaFPS % 1e3), 0 == (AlphaLoop += AlphaLoopChange) && (AlphaLoopChange = -AlphaLoopChange), 30 == AlphaLoop && (AlphaLoopChange = -AlphaLoopChange)
    }
    setTimeout(run, 0)
  }
}

function renderBackground() {
  contextback.fillStyle = backgroundColor;
  contextback.fillRect(0, 0, canvas.width, canvas.height), currentView;
  orbitPointColor = orbitColor = orbitLineColor, "#646464",
    drawOrbit(0, contextback, mercuryPerihelionPoint[0], mercuryPerihelionPoint[1], aMercury, eMercury, -wMercury, !1, orbitColor, !1, 2, .975, 1, 1, orbitDashedColor, 'transparent'),
    drawOrbit(1, contextback, venusPerihelionPoint[0], venusPerihelionPoint[1], aVenus, eVenus, -wVenus, !1, orbitColor, !1, 2, 1, .995, 1, orbitDashedColor, 'transparent'),
    drawOrbit(2, contextback, earthPerihelionPoint[0], earthPerihelionPoint[1], aEarth, eEarth, -wEarth, !1, orbitColor, !1, 2, 1, 1, 1, orbitDashedColor, 'transparent'),
    drawOrbit(3, contextback, marsPerihelionPoint[0], marsPerihelionPoint[1], aMars, eMars, -(360 + wMars), !1, orbitColor, !1, 2, 1, .998, 1, orbitDashedColor, 'transparent'),
    drawOrbit(4, contextback, jupiterPerihelionPoint[0], jupiterPerihelionPoint[1], aJupiter, eJupiter, -wJupiter, !1, orbitColor, !1, 2, 1, 1, jupiterScaleDivider, orbitDashedColor, 'transparent'),
    drawOrbit(5, contextback, saturnPerihelionPoint[0], saturnPerihelionPoint[1], aSaturn, eSaturn, -wSaturn, !1, orbitColor, !1, 2, 1, 1, saturnScaleDivider, orbitDashedColor, 'transparent'),
    drawOrbit(6, contextback, uranusPerihelionPoint[0], uranusPerihelionPoint[1], aUranus, eUranus, -wUranus, !1, orbitColor, !1, 2, 1, 1, uranusScaleDivider, orbitDashedColor, 'transparent'),
    drawOrbit(7, contextback, neptunePerihelionPoint[0], neptunePerihelionPoint[1], aNeptune, eNeptune, -wNeptune, !1, orbitColor, !1, 2, 1, 1, neptuneScaleDivider, orbitDashedColor, 'transparent')
}

function renderMarsMissions(e, t) {
  (runningmission1996 || runningmission2003 || runningmission2011 || runningmission2018 || runningmission2020) && (t || (renderPoint(orreryWidth / 2 + launchPoint[0] * scale, canvas.height / 2 - launchPoint[1] * scale, 100 <= scale ? 2 : .25, 0, 2 * Math.PI, !0, "Yellow", "GoldenRod", e), 100 <= scale && renderText("LAUNCH", "Arial", "left", orreryWidth / 2 + launchPoint[0] * scale + 10, canvas.height / 2 - launchPoint[1] * scale + 4, 12, "GoldenRod", e), renderPoint(orreryWidth / 2 + landingPoint[0] * scale, canvas.height / 2 - landingPoint[1] * scale, 100 <= scale ? 2 : .25, 0, 2 * Math.PI, !0, "Yellow", "GoldenRod", e), 100 <= scale && (runningmission1996 || runningmission2003 || runningmission2011 || runningmission2018 ? renderText("LANDING", "Arial", "left", orreryWidth / 2 + landingPoint[0] * scale + 10, canvas.height / 2 - landingPoint[1] * scale + 4, 12, "GoldenRod", e) : runningmission2020 && renderText("LANDING", "Arial", "left", orreryWidth / 2 + landingPoint[0] * scale + 10, canvas.height / 2 - landingPoint[1] * scale - 4, 12, "GoldenRod", e)), renderText("TRANSFER ORBIT SIMULATED", "Arial", "left", 30, 689, 20, "GoldenRod", e), renderText("NO ACTUAL FLIGHT DATA USED FOR TRAJECTORY", "Arial", "left", 30, 704, 12, "GoldenRod", e), renderText("TYPE-I TRAJECTORY", "Arial", "right", orreryWidth - 30, 689, 20, "GoldenRod", e), renderText("TOTAL SWEEP ANGLE <180Â°", "Arial", "right", orreryWidth - 30, 704, 12, "GoldenRod", e), renderText("EARTH", "Arial", "left", 30, 609, 20, "SteelBlue", e), renderText("PROBE", "Arial", "left", 30, 629, 20, "RebeccaPurple", e), renderText("MARS", "Arial", "left", 30, 649, 20, "red", e)), runningmission1996 ? renderTransferOrbit(e, launchPoint[0], launchPoint[1], landingPoint[0], landingPoint[1], -72.3, 1.295, 211, sweepAngle, 212, 34, 22.3, t) : runningmission2003 ? renderTransferOrbit(e, launchPoint[0], launchPoint[1], landingPoint[0], landingPoint[1], 75.6, 1.315, 230, sweepAngle, 202, 34, 26.5, t) : runningmission2011 ? renderTransferOrbit(e, launchPoint[0], launchPoint[1], landingPoint[0], landingPoint[1], -63.3, 1.265, 190, sweepAngle, 254, 34, 18.7, t) : runningmission2018 ? renderTransferOrbit(e, launchPoint[0], launchPoint[1], landingPoint[0], landingPoint[1], 135.9, 1.225, 208, sweepAngle, 205, 34, 22.9, t) : runningmission2020 && renderTransferOrbit(e, launchPoint[0], launchPoint[1], landingPoint[0], landingPoint[1], 65.4, 1.314, 210, sweepAngle, 216, 34, 22.2, t))
}

function renderForeground() {
  switch (context.clearRect(0, 0, canvas.width, canvas.height), planetScaleAdjustment = (planetSizeAdjust = zoomedinscale / scale) * 1500, planetScaleAdjustment += 870 * (zoomratio = (3e3 - planetScaleAdjustment) / 1500), currentView) {
    case TOPVIEW:
      zoomedoutscale < scale && scale < zoomedinscale && (orbitDashedColor = mobileDevice ? (orbitPointColor = orbitColor = "dimgrey", "lightgray") : (orbitPointColor = orbitColor = "#282828", "#646464"),
        topView && (drawOrbit(0, context, mercuryPerihelionPoint[0], mercuryPerihelionPoint[1], aMercury, eMercury, -wMercury, !1, orbitColor, !1, 2, .975, 1, 1, orbitDashedColor, orbitPointColor),
          drawOrbit(1, context, venusPerihelionPoint[0], venusPerihelionPoint[1], aVenus, eVenus, -wVenus, !1, orbitColor, !1, 2, 1, .995, 1, orbitDashedColor, orbitPointColor),
          drawOrbit(2, context, earthPerihelionPoint[0], earthPerihelionPoint[1], aEarth, eEarth, -wEarth, !1, orbitColor, !1, 2, 1, 1, 1, orbitDashedColor, orbitPointColor),
          drawOrbit(3, context, marsPerihelionPoint[0], marsPerihelionPoint[1], aMars, eMars, -(360 + wMars), !1, orbitColor, !1, 2, 1, .998, 1, orbitDashedColor, orbitPointColor),
          drawOrbit(4, context, jupiterPerihelionPoint[0], jupiterPerihelionPoint[1], aJupiter, eJupiter, -wJupiter, !1, orbitColor, !1, 2, 1, 1, jupiterScaleDivider, orbitDashedColor, orbitPointColor),
          drawOrbit(5, context, saturnPerihelionPoint[0], saturnPerihelionPoint[1], aSaturn, eSaturn, -wSaturn, !1, orbitColor, !1, 2, 1, 1, saturnScaleDivider, orbitDashedColor, orbitPointColor),
          drawOrbit(6, context, uranusPerihelionPoint[0], uranusPerihelionPoint[1], aUranus, eUranus, -wUranus, !1, orbitColor, !1, 2, 1, 1, uranusScaleDivider, orbitDashedColor, orbitPointColor),
          drawOrbit(7, context, neptunePerihelionPoint[0], neptunePerihelionPoint[1], aNeptune, eNeptune, -wNeptune, !1, orbitColor, !1, 2, 1, 1, neptuneScaleDivider, orbitDashedColor, orbitPointColor)),
        renderMarsMissions(context, !1)), oppositionMode ? renderLine(orreryWidth / 2 + conjunctionOppositionDatesRunning[4] * scale / conjunctionOppositionDatesRunning[6], canvas.height / 2 - conjunctionOppositionDatesRunning[5] * scale / conjunctionOppositionDatesRunning[6], orreryWidth / 2 + XEarth * scale, canvas.height / 2 - YEarth * scale, solarConjunction ? "red" : "goldenrod", 1, !1, context) : voyagerMode && renderLine(XVoyagerI, YVoyagerI, orreryWidth / 2 + XEarth * scale, canvas.height / 2 - YEarth * scale, "goldenRod", 1, !1, context),
        renderMarsMissions(context, !0), 100 <= scale && renderAxisRot(orreryWidth / 2 + XMercury * scale - zoomOffSetX, canvas.height / 2 - YMercury * scale - zoomOffSetY, "transparent", 90, -250, !0, (10 + 4879 / planetScaleAdjustment * .5) / planetSizeAdjust, context),
        renderPoint(orreryWidth / 2 + XMercury * scale - zoomOffSetX, canvas.height / 2 - YMercury * scale - zoomOffSetY, (5 + planetMercurySize / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, planetMercuryColor, "SaddleBrown", context), 175 < scale && renderText("M", "Arial", "center", orreryWidth / 2 + XMercury * scale - zoomOffSetX, canvas.height / 2 - YMercury * scale + 4 - zoomOffSetY, 9 / planetSizeAdjust, "black", context), 100 <= scale && renderAxisRot(orreryWidth / 2 + XVenus * scale - zoomOffSetX, canvas.height / 2 - YVenus * scale - zoomOffSetY, "transparent", 250, -90, !1, (10 + 12104 / planetScaleAdjustment * .5) / planetSizeAdjust, context),
        renderPoint(orreryWidth / 2 + XVenus * scale - zoomOffSetX, canvas.height / 2 - YVenus * scale - zoomOffSetY, (5 + planetVenusSize / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, planetVenusColor, "Peru", context), 175 < scale && renderText("V", "Arial", "center", orreryWidth / 2 + XVenus * scale - zoomOffSetX, canvas.height / 2 - YVenus * scale + 4 - zoomOffSetY, 9, "black", context), 100 <= scale && renderAxisRot(orreryWidth / 2 + XEarth * scale - zoomOffSetX, canvas.height / 2 - YEarth * scale - zoomOffSetY, "transparent", 90, -250, !0, (10 + 12756 / planetScaleAdjustment * .5) / planetSizeAdjust, context),
        renderPoint(orreryWidth / 2 + XEarth * scale - zoomOffSetX, canvas.height / 2 - YEarth * scale - zoomOffSetY, (5 + planetEarthSize / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, planetEarthColor, "MidnightBlue", context), 175 < scale && renderText("E", "Arial", "center", orreryWidth / 2 + XEarth * scale - zoomOffSetX, canvas.height / 2 - YEarth * scale + 4 - zoomOffSetY, 9, "black", context), 100 <= scale && renderAxisRot(orreryWidth / 2 + XMars * scale - zoomOffSetX, canvas.height / 2 - YMars * scale - zoomOffSetY, "transparent", 90, -250, !0, (10 + 6792 / planetScaleAdjustment * .5) / planetSizeAdjust, context),
        renderPoint(orreryWidth / 2 + XMars * scale - zoomOffSetX, canvas.height / 2 - YMars * scale - zoomOffSetY, (5 + planetMarsSize / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, planetMarsColor, "DarkRed", context), 175 < scale && renderText("M", "Arial", "center", orreryWidth / 2 + XMars * scale - zoomOffSetX, canvas.height / 2 - YMars * scale + 4 - zoomOffSetY, 9, "black", context), 100 <= scale && renderAxisRot(orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider - zoomOffSetY, "transparent", 90, -250, !0, (10 + 142984 / planetScaleAdjustment * .5) / planetSizeAdjust, context),
        renderPoint(orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider - zoomOffSetY, (5 + planetJupiterSize / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, planetJupiterColor, "Chocolate", context), 100 <= scale && renderText("J", "Arial", "center", orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider + 4 - zoomOffSetY, 9, "black", context), 100 <= scale && renderAxisRot(orreryWidth / 2 + XSaturn * scale / saturnScaleDivider - zoomOffSetX, canvas.height / 2 - YSaturn * scale / saturnScaleDivider - zoomOffSetY, "transparent", 90, -250, !0, (10 + 120536 / planetScaleAdjustment * .5) / planetSizeAdjust, context),
        renderPoint(orreryWidth / 2 + XSaturn * scale / saturnScaleDivider - zoomOffSetX, canvas.height / 2 - YSaturn * scale / saturnScaleDivider - zoomOffSetY, (5 + planetSaturnSize / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, planetSaturnColor, "PowderBlue", context), 100 <= scale && renderText("S", "Arial", "center", orreryWidth / 2 + XSaturn * scale / saturnScaleDivider - zoomOffSetX, canvas.height / 2 - YSaturn * scale / saturnScaleDivider + 4 - zoomOffSetY, 9, "black", context), 100 <= scale && renderAxisRot(orreryWidth / 2 + XUranus * scale / uranusScaleDivider - zoomOffSetX, canvas.height / 2 - YUranus * scale / uranusScaleDivider - zoomOffSetY, "transparent", 250, -90, !1, (10 + 51118 / planetScaleAdjustment * .5) / planetSizeAdjust, context),
        renderPoint(orreryWidth / 2 + XUranus * scale / uranusScaleDivider - zoomOffSetX, canvas.height / 2 - YUranus * scale / uranusScaleDivider - zoomOffSetY, (5 + planetUranusSize / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, planetUranusColor, "DodgerBlue", context), 100 <= scale && renderText("U", "Arial", "center", orreryWidth / 2 + XUranus * scale / uranusScaleDivider - zoomOffSetX, canvas.height / 2 - YUranus * scale / uranusScaleDivider + 4 - zoomOffSetY, 9, "black", context), 100 <= scale && renderAxisRot(orreryWidth / 2 + XNeptune * scale / neptuneScaleDivider - zoomOffSetX, canvas.height / 2 - YNeptune * scale / neptuneScaleDivider - zoomOffSetY, "transparent", 90, -250, !0, (10 + 49528 / planetScaleAdjustment * .5) / planetSizeAdjust, context),
        renderPoint(orreryWidth / 2 + XNeptune * scale / neptuneScaleDivider - zoomOffSetX, canvas.height / 2 - YNeptune * scale / neptuneScaleDivider - zoomOffSetY, (5 + planetNeptuneSize / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, planetNeptuneColor, "DodgerBlue", context), 100 <= scale && renderText("N", "Arial", "center", orreryWidth / 2 + XNeptune * scale / neptuneScaleDivider - zoomOffSetX, canvas.height / 2 - YNeptune * scale / neptuneScaleDivider + 4 - zoomOffSetY, 9, "black", context),
        renderPoint(orreryWidth / 2 - zoomOffSetX, canvas.height / 2 - zoomOffSetY, sunSize / planetSizeAdjust, 0, 2 * Math.PI, !0, sunColor, "orange", context), 100 <= scale && renderAxisRot(orreryWidth / 2 - zoomOffSetX, canvas.height / 2 - zoomOffSetY, "transparent", 90, -250, !0, 15 / planetSizeAdjust, context),
        renderPoint(orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider + XIo * scale * scaleMoon / scaleMoonIo - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider - YIo * scale * scaleMoon / scaleMoonIo - zoomOffSetY, (1 + 3643.2 / planetScaleAdjustment * 1) / planetSizeAdjust, 0, 2 * Math.PI, !0, "Gold", "GoldenRod", context),
        renderPoint(orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider + XEuropa * scale * scaleMoon / scaleMoonEuropa - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider - YEuropa * scale * scaleMoon / scaleMoonEuropa - zoomOffSetY, (1 + 3121.6 / planetScaleAdjustment * 1) / planetSizeAdjust, 0, 2 * Math.PI, !0, "LightSalmon", "Tomato", context),
        renderPoint(orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider + XGanymede * scale * scaleMoon / scaleMoonGanymede - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider - YGanymede * scale * scaleMoon / scaleMoonGanymede - zoomOffSetY, (1 + 5268.2 / planetScaleAdjustment * 1) / planetSizeAdjust, 0, 2 * Math.PI, !0, "#3F76A3", "SteelBlue", context),
        renderPoint(orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider + XCallisto * scale * scaleMoon / scaleMoonCallisto - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider - YCallisto * scale * scaleMoon / scaleMoonCallisto - zoomOffSetY, (1 + 2995.4 / planetScaleAdjustment * 1) / planetSizeAdjust, 0, 2 * Math.PI, !0, "DimGray", "#6E6E6E", context), 200 <= scale && galileanMoonMode && (mobileDevice ? (renderText("Io", "Arial", "left", orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider + XIo * scale * scaleMoon / scaleMoonIo + 7 - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider - YIo * scale * scaleMoon / scaleMoonIo + 3 - zoomOffSetY, 20, "white", context),
          renderText("4:1", "Arial", "left", orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider + XIo * scale * scaleMoon / scaleMoonIo + 7 - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider - YIo * scale * scaleMoon / scaleMoonIo + 3 + 10 - zoomOffSetY + 9, 20, "white", context),
          renderText("Europa", "Arial", "left", orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider + XEuropa * scale * scaleMoon / scaleMoonEuropa + 7 - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider - YEuropa * scale * scaleMoon / scaleMoonEuropa + 4 - zoomOffSetY, 20, "white", context),
          renderText("2:1", "Arial", "left", orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider + XEuropa * scale * scaleMoon / scaleMoonEuropa + 7 - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider - YEuropa * scale * scaleMoon / scaleMoonEuropa + 4 + 10 - zoomOffSetY + 9, 20, "white", context),
          renderText("Ganymede", "Arial", "left", orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider + XGanymede * scale * scaleMoon / scaleMoonGanymede + 7 - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider - YGanymede * scale * scaleMoon / scaleMoonGanymede + 4 - zoomOffSetY, 20, "white", context),
          renderText("1:1", "Arial", "left", orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider + XGanymede * scale * scaleMoon / scaleMoonGanymede + 7 - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider - YGanymede * scale * scaleMoon / scaleMoonGanymede + 4 + 13 - zoomOffSetY + 9, 20, "white", context),
          renderText("Callisto", "Arial", "left", orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider + XCallisto * scale * scaleMoon / scaleMoonCallisto + 7 - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider - YCallisto * scale * scaleMoon / scaleMoonCallisto + 1 - zoomOffSetY + 9, 20, "white", context)) :
          (renderText("Io", "Arial", "left", orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider + XIo * scale * scaleMoon / scaleMoonIo + 7 - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider - YIo * scale * scaleMoon / scaleMoonIo + 3 - zoomOffSetY, 10, "white", context),
            renderText("4:1", "Arial", "left", orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider + XIo * scale * scaleMoon / scaleMoonIo + 7 - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider - YIo * scale * scaleMoon / scaleMoonIo + 3 + 10 - zoomOffSetY, 10, "white", context),
            renderText("Europa", "Arial", "left", orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider + XEuropa * scale * scaleMoon / scaleMoonEuropa + 7 - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider - YEuropa * scale * scaleMoon / scaleMoonEuropa + 4 - zoomOffSetY, 10, "white", context),
            renderText("2:1", "Arial", "left", orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider + XEuropa * scale * scaleMoon / scaleMoonEuropa + 7 - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider - YEuropa * scale * scaleMoon / scaleMoonEuropa + 4 + 10 - zoomOffSetY, 10, "white", context),
            renderText("Ganymede", "Arial", "left", orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider + XGanymede * scale * scaleMoon / scaleMoonGanymede + 7 - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider - YGanymede * scale * scaleMoon / scaleMoonGanymede + 4 - zoomOffSetY, 10, "white", context),
            renderText("1:1", "Arial", "left", orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider + XGanymede * scale * scaleMoon / scaleMoonGanymede + 7 - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider - YGanymede * scale * scaleMoon / scaleMoonGanymede + 4 + 13 - zoomOffSetY, 10, "white", context),
            renderText("Callisto", "Arial", "left", orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider + XCallisto * scale * scaleMoon / scaleMoonCallisto + 7 - zoomOffSetX, canvas.height / 2 - YJupiter * scale / jupiterScaleDivider - YCallisto * scale * scaleMoon / scaleMoonCallisto + 4 - zoomOffSetY, 10, "white", context))),
        renderPoint(orreryWidth / 2 + XEarth * scale + XMoon * scale * scaleMoon / scaleMoonMoon - zoomOffSetX, canvas.height / 2 - YEarth * scale - YMoon * scale * scaleMoon / scaleMoonMoon - zoomOffSetY, (1 + 2159.3 / planetScaleAdjustment * 1) / planetSizeAdjust, 0, 2 * Math.PI, !0, "DimGray", "Gray", context), 200 <= scale && moonMoonMode && renderText("The Moon", "Arial", "left", orreryWidth / 2 + XEarth * scale + XMoon * scale * scaleMoon / scaleMoonMoon + 7 - zoomOffSetX, canvas.height / 2 - YEarth * scale - YMoon * scale * scaleMoon / scaleMoonMoon + 4 - zoomOffSetY, mobileDevice ? 20 : 10, "white", context),
        renderPoint(orreryWidth / 2 + XSaturn * scale / saturnScaleDivider + XTitan * scale * scaleMoon / scaleMoonTitan - zoomOffSetX, canvas.height / 2 - YSaturn * scale / saturnScaleDivider - YTitan * scale * scaleMoon / scaleMoonTitan - zoomOffSetY, (1 + 3199.73 / planetScaleAdjustment * 1) / planetSizeAdjust, 0, 2 * Math.PI, !0, "goldenrod", "orange", context), 200 <= scale && saturnianMoonMode && renderText("Titan", "Arial", "left", orreryWidth / 2 + XSaturn * scale / saturnScaleDivider + XTitan * scale * scaleMoon / scaleMoonTitan + 7 - zoomOffSetX, canvas.height / 2 - YSaturn * scale / saturnScaleDivider - YTitan * scale * scaleMoon / scaleMoonTitan + 4 - zoomOffSetY, mobileDevice ? 20 : 10, "white", context),
        renderPoint(orreryWidth / 2 + XNeptune * scale / neptuneScaleDivider + XTriton * scale * scaleMoon / scaleMoonTriton - zoomOffSetX, canvas.height / 2 - YNeptune * scale / neptuneScaleDivider - YTriton * scale * scaleMoon / scaleMoonTriton - zoomOffSetY, (1 + 1682.052 / planetScaleAdjustment * 1) / planetSizeAdjust, 0, 2 * Math.PI, !0, "DimGray", "Gray", context), 200 <= scale && neptunianMoonMode && renderText("Triton", "Arial", "left", orreryWidth / 2 + XNeptune * scale / neptuneScaleDivider + XTriton * scale * scaleMoon / scaleMoonTriton + 7 - zoomOffSetX, canvas.height / 2 - YNeptune * scale / neptuneScaleDivider - YTriton * scale * scaleMoon / scaleMoonTriton + 4 - zoomOffSetY, mobileDevice ? 20 : 10, "white", context);
      break;
    case SIDEVIEW:
      if (renderLine(0, canvas.height / 2, orreryWidth, canvas.height / 2, "#ED1C24", 2, !1, context), renderText("ECLIPTIC", "Arial", "left", 30, canvas.height / 2 + 30, 30, "#ED1C24", context), renderText("PLANE", "Arial", "left", 30, canvas.height / 2 + 60, 30, "#ED1C24", context), 7 != planetInfoIndex && 10 != planetInfoIndex || (renderSideView(.85, 0, 180, context, 1.3, 60.120953250543785 / neptuneScaleDivider / 2, -.364466192770568 / neptuneScaleDivider / 2, .0157612865279384 / neptuneScaleDivider / 2, "#0F0F42", "DodgerBlue", scale / 200 * 13.5, neptunePerihelionPoint[0] / neptuneScaleDivider, neptunePerihelionPoint[2] / neptuneScaleDivider, neptuneAphelionPoint[0] / neptuneScaleDivider, neptuneAphelionPoint[2] / neptuneScaleDivider, 2, 2, !1), 0 <= YNeptune && (renderAxialTilt(context, XNeptune / neptuneScaleDivider, ZNeptune / neptuneScaleDivider, 28.32, 49528, 10), renderPoint(orreryWidth / 2 + XNeptune * scale / neptuneScaleDivider, canvas.height / 2 - ZNeptune * scale / neptuneScaleDivider, (5 + 49528 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "MidnightBlue", "DodgerBlue", context), 100 <= scale && renderText("N", "Arial", "center", orreryWidth / 2 + XNeptune * scale / neptuneScaleDivider, canvas.height / 2 - ZNeptune * scale / neptuneScaleDivider + 4, 9, "black", context))), 6 != planetInfoIndex && 10 != planetInfoIndex || (renderSideView(.85, 180, 360, context, .75, 38.37915790877488 / uranusScaleDivider / 2, 1.791404383810328 / uranusScaleDivider / 2, -.02474824431078426 / uranusScaleDivider / 2, "#0A8FE0", "DodgerBlue", scale / 200 * 2.5, uranusPerihelionPoint[0] / uranusScaleDivider, uranusPerihelionPoint[2] / uranusScaleDivider, uranusAphelionPoint[0] / uranusScaleDivider, uranusAphelionPoint[2] / uranusScaleDivider, 2, 2, !1), 0 <= YUranus && (renderAxialTilt(context, XUranus / uranusScaleDivider, ZUranus / uranusScaleDivider, 97.77, 51118, 10), renderPoint(orreryWidth / 2 + XUranus * scale / uranusScaleDivider, canvas.height / 2 - ZUranus * scale / uranusScaleDivider, (5 + 51118 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "LightSkyBlue", "DodgerBlue", context), 100 <= scale && renderText("U", "Arial", "center", orreryWidth / 2 + XUranus * scale / uranusScaleDivider, canvas.height / 2 - ZUranus * scale / uranusScaleDivider + 4, 9, "black", context))), 5 != planetInfoIndex && 10 != planetInfoIndex || (renderSideView(.85, 0, 180, context, 2.3, 19.029706921128472 / saturnScaleDivider / 2, .045312436132313 / saturnScaleDivider / 2, .01592432484440587 / saturnScaleDivider / 2, "#79BFFF", "PowderBlue", scale / 200 * 8.5, saturnPerihelionPoint[0] / saturnScaleDivider, saturnPerihelionPoint[2] / saturnScaleDivider, saturnAphelionPoint[0] / saturnScaleDivider, saturnAphelionPoint[2] / saturnScaleDivider, 2, 2, !1), 0 <= YSaturn && (renderAxialTilt(context, XSaturn / saturnScaleDivider, ZSaturn / saturnScaleDivider, 26.73, 120536, 10), renderPoint(orreryWidth / 2 + XSaturn * scale / saturnScaleDivider, canvas.height / 2 - ZSaturn * scale / saturnScaleDivider, (5 + 120536 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "AliceBlue", "PowderBlue", context), 100 <= scale && renderText("S", "Arial", "center", orreryWidth / 2 + XSaturn * scale / saturnScaleDivider, canvas.height / 2 - ZSaturn * scale / saturnScaleDivider + 4, 9, "black", context))), 4 != planetInfoIndex && 10 != planetInfoIndex || (renderSideView(.85, 0, 180, context, 1.3, 10.402414194613497 / jupiterScaleDivider / 2, -.486689376291396 / jupiterScaleDivider / 2, .01144899863328919 / jupiterScaleDivider / 2, "#7E5021", "Chocolate", scale / 200 * 1.25, jupiterPerihelionPoint[0] / jupiterScaleDivider, jupiterPerihelionPoint[2] / jupiterScaleDivider, jupiterAphelionPoint[0] / jupiterScaleDivider, jupiterAphelionPoint[2] / jupiterScaleDivider, 1, 2, !1), 0 <= YJupiter && (renderAxialTilt(context, XJupiter / jupiterScaleDivider, ZJupiter / jupiterScaleDivider, 3.13, 142984, 10), renderPoint(orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider, canvas.height / 2 - ZJupiter * scale / jupiterScaleDivider, (5 + 142984 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "Peru", "Chocolate", context), 100 <= scale && renderText("J", "Arial", "center", orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider, canvas.height / 2 - ZJupiter * scale / jupiterScaleDivider + 4, 9, "black", context))), 3 != planetInfoIndex && 10 != planetInfoIndex || (renderSideView(.85, 180, 360, context, 1.4, 1.522171073953746, -.13003210927070016, .00437699524747638, "#8C0000", "DarkRed", scale / 200 * 6.5, marsPerihelionPoint[0], marsPerihelionPoint[2], marsAphelionPoint[0], marsAphelionPoint[2], 1, 2, !1), 0 <= YMars && (renderAxialTilt(context, XMars, ZMars, 25.19, 6792, 0), renderPoint(orreryWidth / 2 + XMars * scale, canvas.height / 2 - ZMars * scale, (5 + 6792 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "Red", "DarkRed", context), 175 < scale && renderText("M", "Arial", "center", orreryWidth / 2 + XMars * scale, canvas.height / 2 - ZMars * scale + 4, 9, "black", context))), 2 != planetInfoIndex && 10 != planetInfoIndex || (renderSideView(1, 0, 360, context, 0, aEarth, -.9961089034202898, 5.2449904755095e-7, "SteelBlue", "MidnightBlue", 0, earthPerihelionPoint[0], earthPerihelionPoint[2], earthAphelionPoint[0], earthAphelionPoint[2], 1, 2, !1, -.9960924685177724), 0 <= YEarth && (renderAxialTilt(context, XEarth, ZEarth, 23.44, 12756, 0), renderPoint(orreryWidth / 2 + XEarth * scale, canvas.height / 2 - ZEarth * scale, (5 + 12756 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "SteelBlue", "MidnightBlue", context), 175 < scale && renderText("E", "Arial", "center", orreryWidth / 2 + XEarth * scale, canvas.height / 2 - ZEarth * scale + 4, 9, "black", context))), 1 != planetInfoIndex && 10 != planetInfoIndex || (renderSideView(.85, 180, 360, context, 3.3, .7220793385279826, .00328289812688355, -.00024618776594048, "#BE8434", "Peru", scale / 200 * 2.2, venusPerihelionPoint[0], venusPerihelionPoint[2], venusAphelionPoint[0], venusAphelionPoint[2], 1, 2, !1), 0 <= YVenus && (renderAxialTilt(context, XVenus, ZVenus, 177.36, 12104, 0), renderPoint(orreryWidth / 2 + XVenus * scale, canvas.height / 2 - ZVenus * scale, (5 + 12104 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "BurlyWood", "Peru", context), 175 < scale && renderText("V", "Arial", "center", orreryWidth / 2 + XVenus * scale, canvas.height / 2 - ZVenus * scale + 4, 9, "black", context))), 0 != planetInfoIndex && 10 != planetInfoIndex || (renderSideView(.85, 180, 360, context, 5.6, .37751374226962847, -.017548506471699005, -.004319805778405265, "#844313", "SaddleBrown", scale / 200 * 6, mercuryPerihelionPoint[0], mercuryPerihelionPoint[2], mercuryAphelionPoint[0], mercuryAphelionPoint[2], 1, 2, !1), 0 <= YMercury && (renderAxialTilt(context, XMercury, ZMercury, .034, 4879, 0), renderPoint(orreryWidth / 2 + XMercury * scale, canvas.height / 2 - ZMercury * scale, (5 + 4879 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "Chocolate", "SaddleBrown", context), 175 < scale && renderText("M", "Arial", "center", orreryWidth / 2 + XMercury * scale, canvas.height / 2 - ZMercury * scale + 4, 9 / planetSizeAdjust, "black", context))), renderPoint(orreryWidth / 2, canvas.height / 2, 10 / planetSizeAdjust, 0, 2 * Math.PI, !0, "yellow", "orange", context), 0 != planetInfoIndex && 10 != planetInfoIndex || (0 == planetInfoIndex && renderSideView(.85, 0, 180, context, 5.6, .37751374226962847, -.017548506471699005, -.004319805778405265, "limegreen", "limegreen", scale / 200 * 0, mercuryPerihelionPoint[0], mercuryPerihelionPoint[2], mercuryAphelionPoint[0], mercuryAphelionPoint[2], 2, 1, !0), renderSideView(.85, 0, 180, context, 5.6, .37751374226962847, -.017548506471699005, -.004319805778405265, "Chocolate", "SaddleBrown", scale / 200 * 6, mercuryPerihelionPoint[0], mercuryPerihelionPoint[2], mercuryAphelionPoint[0], mercuryAphelionPoint[2], 2, 2, !1), YMercury < 0 && (renderAxialTilt(context, XMercury, ZMercury, .034, 4879, 0), renderPoint(orreryWidth / 2 + XMercury * scale, canvas.height / 2 - ZMercury * scale, (5 + 4879 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "Chocolate", "SaddleBrown", context), 175 < scale && renderText("M", "Arial", "center", orreryWidth / 2 + XMercury * scale, canvas.height / 2 - ZMercury * scale + 4, 9 / planetSizeAdjust, "black", context))), 1 != planetInfoIndex && 10 != planetInfoIndex || (1 == planetInfoIndex && renderSideView(.85, 0, 180, context, 3.3, .7220793385279826, .00328289812688355, -.00024618776594048, "limegreen", "limegreen", scale / 200 * 0, venusPerihelionPoint[0], venusPerihelionPoint[2], venusAphelionPoint[0], venusAphelionPoint[2], 2, 2, !0), renderSideView(.85, 0, 180, context, 3.3, .7220793385279826, .00328289812688355, -.00024618776594048, "BurlyWood", "Peru", scale / 200 * 2.2, venusPerihelionPoint[0], venusPerihelionPoint[2], venusAphelionPoint[0], venusAphelionPoint[2], 2, 2, !1), YVenus < 0 && (renderAxialTilt(context, XVenus, ZVenus, 177.36, 12104, 0), renderPoint(orreryWidth / 2 + XVenus * scale, canvas.height / 2 - ZVenus * scale, (5 + 12104 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "BurlyWood", "Peru", context), 175 < scale && renderText("V", "Arial", "center", orreryWidth / 2 + XVenus * scale, canvas.height / 2 - ZVenus * scale + 4, 9, "black", context))), 2 != planetInfoIndex && 10 != planetInfoIndex || YEarth < 0 && (renderAxialTilt(context, XEarth, ZEarth, 23.44, 12756, 0), renderPoint(orreryWidth / 2 + XEarth * scale, canvas.height / 2 - ZEarth * scale, (5 + 12756 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "SteelBlue", "MidnightBlue", context), 175 < scale && renderText("E", "Arial", "center", orreryWidth / 2 + XEarth * scale, canvas.height / 2 - ZEarth * scale + 4, 9, "black", context)), 3 != planetInfoIndex && 10 != planetInfoIndex || (3 == planetInfoIndex && renderSideView(.85, 0, 180, context, 1.4, 1.522171073953746, -.13003210927070016, .00437699524747638, "limegreen", "limegreen", scale / 200 * 0, marsPerihelionPoint[0], marsPerihelionPoint[2], marsAphelionPoint[0], marsAphelionPoint[2], 2, 1, !0), renderSideView(.85, 0, 180, context, 1.4, 1.522171073953746, -.13003210927070016, .00437699524747638, "Red", "DarkRed", scale / 200 * 6.5, marsPerihelionPoint[0], marsPerihelionPoint[2], marsAphelionPoint[0], marsAphelionPoint[2], 2, 2, !1), YMars < 0 && (renderAxialTilt(context, XMars, ZMars, 25.19, 6792, 0), renderPoint(orreryWidth / 2 + XMars * scale, canvas.height / 2 - ZMars * scale, (5 + 6792 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "Red", "DarkRed", context), 175 < scale && renderText("M", "Arial", "center", orreryWidth / 2 + XMars * scale, canvas.height / 2 - ZMars * scale + 4, 9, "black", context))), 4 != planetInfoIndex && 10 != planetInfoIndex || (4 == planetInfoIndex && renderSideView(1, 0, 180, context, 1.3, 10.402414194613497 / jupiterScaleDivider / 2, -.486689376291396 / jupiterScaleDivider / 2, .01144899863328919 / jupiterScaleDivider / 2, "limegreen", "limegreen", scale / 200 * 0, jupiterPerihelionPoint[0] / jupiterScaleDivider, jupiterPerihelionPoint[2] / jupiterScaleDivider, jupiterAphelionPoint[0] / jupiterScaleDivider, jupiterAphelionPoint[2] / jupiterScaleDivider, 2, 1, !0), renderSideView(.85, 180, 360, context, 1.3, 10.402414194613497 / jupiterScaleDivider / 2, -.486689376291396 / jupiterScaleDivider / 2, .01144899863328919 / jupiterScaleDivider / 2, "Peru", "Chocolate", scale / 200 * 1.25, jupiterPerihelionPoint[0] / jupiterScaleDivider, jupiterPerihelionPoint[2] / jupiterScaleDivider, jupiterAphelionPoint[0] / jupiterScaleDivider, jupiterAphelionPoint[2] / jupiterScaleDivider, 2, 2, !1), YJupiter < 0 && (renderAxialTilt(context, XJupiter / jupiterScaleDivider, ZJupiter / jupiterScaleDivider, 3.13, 142984, 10), renderPoint(orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider, canvas.height / 2 - ZJupiter * scale / jupiterScaleDivider, (5 + 142984 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "Peru", "Chocolate", context), 100 <= scale && renderText("J", "Arial", "center", orreryWidth / 2 + XJupiter * scale / jupiterScaleDivider, canvas.height / 2 - ZJupiter * scale / jupiterScaleDivider + 4, 9, "black", context))), 5 != planetInfoIndex && 10 != planetInfoIndex || (5 == planetInfoIndex && renderSideView(.85, 0, 180, context, 2.3, 19.029706921128472 / saturnScaleDivider / 2, .045312436132313 / saturnScaleDivider / 2, .01592432484440587 / saturnScaleDivider / 2, "limegreen", "limegreen", scale / 200 * 0, saturnPerihelionPoint[0] / saturnScaleDivider, saturnPerihelionPoint[2] / saturnScaleDivider, saturnAphelionPoint[0] / saturnScaleDivider, saturnAphelionPoint[2] / saturnScaleDivider, 1, 1, !0), renderSideView(.85, 180, 360, context, 2.3, 19.029706921128472 / saturnScaleDivider / 2, .045312436132313 / saturnScaleDivider / 2, .01592432484440587 / saturnScaleDivider / 2, "AliceBlue", "PowderBlue", scale / 200 * 8.5, saturnPerihelionPoint[0] / saturnScaleDivider, saturnPerihelionPoint[2] / saturnScaleDivider, saturnAphelionPoint[0] / saturnScaleDivider, saturnAphelionPoint[2] / saturnScaleDivider, 1, 2, !1), YSaturn < 0 && (renderAxialTilt(context, XSaturn / saturnScaleDivider, ZSaturn / saturnScaleDivider, 26.73, 120536, 10), renderPoint(orreryWidth / 2 + XSaturn * scale / saturnScaleDivider, canvas.height / 2 - ZSaturn * scale / saturnScaleDivider, (5 + 120536 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "AliceBlue", "PowderBlue", context), 100 <= scale && renderText("S", "Arial", "center", orreryWidth / 2 + XSaturn * scale / saturnScaleDivider, canvas.height / 2 - ZSaturn * scale / saturnScaleDivider + 4, 9, "black", context))), 6 != planetInfoIndex && 10 != planetInfoIndex || (6 == planetInfoIndex && renderSideView(.85, 0, 180, context, .75, 38.37915790877488 / uranusScaleDivider / 2, 1.791404383810328 / uranusScaleDivider / 2, -.02474824431078426 / uranusScaleDivider / 2, "limegreen", "limegreen", scale / 200 * 0, uranusPerihelionPoint[0] / uranusScaleDivider, uranusPerihelionPoint[2] / uranusScaleDivider, uranusAphelionPoint[0] / uranusScaleDivider, uranusAphelionPoint[2] / uranusScaleDivider, 1, 1, !0), renderSideView(.85, 0, 180, context, .75, 38.37915790877488 / uranusScaleDivider / 2, 1.791404383810328 / uranusScaleDivider / 2, -.02474824431078426 / uranusScaleDivider / 2, "LightSkyBlue", "DodgerBlue", scale / 200 * 2.5, uranusPerihelionPoint[0] / uranusScaleDivider, uranusPerihelionPoint[2] / uranusScaleDivider, uranusAphelionPoint[0] / uranusScaleDivider, uranusAphelionPoint[2] / uranusScaleDivider, 1, 2, !1), YUranus < 0 && (renderAxialTilt(context, XUranus / uranusScaleDivider, ZUranus / uranusScaleDivider, 97.77, 51118, 10), renderPoint(orreryWidth / 2 + XUranus * scale / uranusScaleDivider, canvas.height / 2 - ZUranus * scale / uranusScaleDivider, (5 + 51118 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "LightSkyBlue", "DodgerBlue", context), 100 <= scale && renderText("U", "Arial", "center", orreryWidth / 2 + XUranus * scale / uranusScaleDivider, canvas.height / 2 - ZUranus * scale / uranusScaleDivider + 4, 9, "black", context))), 7 != planetInfoIndex && 10 != planetInfoIndex || (7 == planetInfoIndex && renderSideView(.85, 0, 180, context, 1.3, 60.120953250543785 / neptuneScaleDivider / 2, -.364466192770568 / neptuneScaleDivider / 2, .0157612865279384 / neptuneScaleDivider / 2, "limegreen", "limegreen", scale / 200 * 0, neptunePerihelionPoint[0] / neptuneScaleDivider, neptunePerihelionPoint[2] / neptuneScaleDivider, neptuneAphelionPoint[0] / neptuneScaleDivider, neptuneAphelionPoint[2] / neptuneScaleDivider, 2, 1, !0), renderSideView(.85, 180, 360, context, 1.3, 60.120953250543785 / neptuneScaleDivider / 2, -.364466192770568 / neptuneScaleDivider / 2, .0157612865279384 / neptuneScaleDivider / 2, "MidnightBlue", "DodgerBlue", scale / 200 * 13.5, neptunePerihelionPoint[0] / neptuneScaleDivider, neptunePerihelionPoint[2] / neptuneScaleDivider, neptuneAphelionPoint[0] / neptuneScaleDivider, neptuneAphelionPoint[2] / neptuneScaleDivider, 1, 2, !1), YNeptune < 0 && (renderAxialTilt(context, XNeptune / neptuneScaleDivider, ZNeptune / neptuneScaleDivider, 28.32, 49528, 10), renderPoint(orreryWidth / 2 + XNeptune * scale / neptuneScaleDivider, canvas.height / 2 - ZNeptune * scale / neptuneScaleDivider, (5 + 49528 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "MidnightBlue", "DodgerBlue", context), 100 <= scale && renderText("N", "Arial", "center", orreryWidth / 2 + XNeptune * scale / neptuneScaleDivider, canvas.height / 2 - ZNeptune * scale / neptuneScaleDivider + 4, 9, "black", context))), 10 != planetInfoIndex) {
        switch (planetInfoIndex) {
          case 0:
            WAngleLegend = WMercury, wAngleLegend = wMercury, zAU2 = zMercury, LAngleLegend = LMercury, nAngleLegend = nMercury;
            break;
          case 1:
            WAngleLegend = WVenus, wAngleLegend = wVenus, zAU2 = zVenus, LAngleLegend = LVenus, nAngleLegend = nVenus;
            break;
          case 2:
            WAngleLegend = WEarth, wAngleLegend = wEarth, zAU2 = zEarth, LAngleLegend = LEarth, nAngleLegend = nEarth;
            break;
          case 3:
            WAngleLegend = WMars, wAngleLegend = wMars, zAU2 = zMars, LAngleLegend = LMars, nAngleLegend = nMars;
            break;
          case 4:
            WAngleLegend = WJupiter, wAngleLegend = wJupiter, zAU2 = zJupiter, LAngleLegend = LJupiter, nAngleLegend = nJupiter;
            break;
          case 5:
            WAngleLegend = WSaturn, wAngleLegend = wSaturn, zAU2 = zSaturn, LAngleLegend = LSaturn, nAngleLegend = nSaturn;
            break;
          case 6:
            WAngleLegend = WUranus, wAngleLegend = wUranus, zAU2 = zUranus, LAngleLegend = LUranus, nAngleLegend = nUranus;
            break;
          case 7:
            WAngleLegend = WNeptune, wAngleLegend = wNeptune, zAU2 = zNeptune, LAngleLegend = LNeptune, nAngleLegend = nNeptune
        }
        lOPX100 = 100 * Math.cos(toRadians(wAngleLegend)), lOPY100 = 100 * Math.sin(toRadians(wAngleLegend)), renderLine(xLegend, yLegend, xLegend + lOPX100, yLegend - lOPY100, "goldenRod", lineLegend, !1, context), renderPoint(xLegend + lOPX100, yLegend - lOPY100, 2, 0, 2 * Math.PI, !0, "goldenrod", "goldenrod", context), wAngleLegend < 180 ? renderText("P", "Arial", "center", 5 != planetInfoIndex ? xLegend + lOPX100 : xLegend + lOPX100 - 10, yLegend - lOPY100 - 5, 12, "goldenRod", context) : renderText("P", "Arial", "center", xLegend + lOPX100, yLegend - lOPY100 + 15, 12, "goldenRod", context), 2 != planetInfoIndex && (renderPoint(xLegend + 75 * Math.cos(toRadians(WAngleLegend)), yLegend - 75 * Math.sin(toRadians(WAngleLegend)), 1, 0, 2 * Math.PI, !0, "#E7C05A", "#E7C05A", context), renderText("â˜Š", "Arial", "center", xLegend + 75 * Math.cos(toRadians(WAngleLegend)), yLegend - 75 * Math.sin(toRadians(WAngleLegend)) + 15, 12, "#E7C05A", context), renderPoint(xLegend + 75 * Math.cos(toRadians(WAngleLegend + 180)), yLegend - 75 * Math.sin(toRadians(WAngleLegend + 180)), 1, 0, 2 * Math.PI, !0, "#E7C05A", "#E7C05A", context), renderText("â˜‹", "Arial", "center", xLegend + 75 * Math.cos(toRadians(WAngleLegend + 180)), yLegend - 75 * Math.sin(toRadians(WAngleLegend + 180)) + 15, 12, "#E7C05A", context), context.beginPath(), context.lineWidth = lineLegend, context.arc(xLegend, yLegend, 75, toRadians(360 - WAngleLegend), toRadians(180 - WAngleLegend), !0), context.strokeStyle = "#E7C05A", context.stroke(), context.closePath(), context.beginPath(), context.globalAlpha = mobileDevice ? .1 : .025, context.lineWidth = lineLegend, context.arc(xLegend, yLegend, 75, toRadians(360 - WAngleLegend), toRadians(180 - WAngleLegend), !0), context.strokeStyle = "#E7C05A", context.fill(), context.globalAlpha = 1, context.closePath()), renderPoint(xLegend + 75 * Math.cos(toRadians((nAngleLegend + wAngleLegend) % 360)), yLegend - 75 * Math.sin(toRadians((nAngleLegend + wAngleLegend) % 360)), 2, 0, 2 * Math.PI, !0, "#E7C05A", "#E7C05A", context), context.beginPath(), context.lineWidth = lineLegend, context.arc(xLegend, yLegend, 40, toRadians(360 - wAngleLegend), toRadians(0), !1), context.strokeStyle = "SeaGreen", context.stroke(), context.closePath(), renderText(3 != planetInfoIndex ? round(wAngleLegend, 0) + "Â°" : round(360 + wAngleLegend, 0) + "Â°", "Arial", "left", xLegend + 5, yLegend + 15, 12, "SeaGreen", context), renderText("LONGITUDE", "Arial", "left", xLegend + 5, yLegend + 15 + 12 + 5, 12, "SeaGreen", context), renderText("OF PERIHELION", "Arial", "left", xLegend + 5, yLegend + 15 + 24 + 5, 12, "SeaGreen", context), renderText(round((nAngleLegend + wAngleLegend) % 360, 0) + "Â°", "Arial", "right", orreryWidth - 30, 689, 30, "#E7C05A", context), renderText("TRUE", "Arial", "right", orreryWidth - 30 - 73, 676, 12, "#E7C05A", context), renderText("LONGITUDE", "Arial", "right", orreryWidth - 30 - 73, 689, 12, "#E7C05A", context)
      }
      break;
    case CONSTELLATIONVIEW:
      drawStars(raSirius, declSirius, context, "#1388ce", 5, !0, !0, 0), drawStars(raAlphaCentauri, declAlphaCentauri, context, "#1388ce", 5, !0, !0, 0), drawStars(raAndromeda, declAndromeda, context, "#1388ce", 5, !0, !0, 0), drawStars(raOrion, declOrion, context, "#1388ce", 5, !0, !0, 0), drawStars(raCarina, declCarina, context, "#1388ce", 5, !0, !0, 0), drawStars(raPleiades, declPleiades, context, "#1388ce", 5, !0, !0, 0), renderPoint(orreryWidth - 48.75 * celestCoord[0][7], canvas.height / 2 - 3.6 * celestCoord[0][8], 2, 1, 2 * Math.PI, !0, "#ED1C24", "#ED1C24", contextback), contextback.font = "10px Arial", contextback.textAlign = "left", contextback.fillStyle = "white", 1 == DAY && monthCount < 12 && (storedMonth != MONTH && (monthCount++, storedMonth = MONTH), contextback.fillStyle = "white", contextback.fillText(monthNames[MONTH - 1], orreryWidth - 48.75 * celestCoord[0][7] - 5, canvas.height / 2 - 3.6 * celestCoord[0][8] - 5), contextback.beginPath(), contextback.arc(orreryWidth - 48.75 * celestCoord[0][7], canvas.height / 2 - 3.6 * celestCoord[0][8], 2, 0, 2 * Math.PI, !0), contextback.fillStyle = "white", contextback.fill(), contextback.closePath()), currentDateLabelled || (currentDateLabelled = !0, renderLine(orreryWidth - 48.75 * celestCoordSunX[0][7] - 6, canvas.height / 2 - 3.6 * celestCoordSunX[0][8] - 6, orreryWidth - 48.75 * celestCoordSunX[0][7] + 6, canvas.height / 2 - 3.6 * celestCoordSunX[0][8] + 6, "white", 2, !1, contextback), renderLine(orreryWidth - 48.75 * celestCoordSunX[0][7] - 6, canvas.height / 2 - 3.6 * celestCoordSunX[0][8] + 6, orreryWidth - 48.75 * celestCoordSunX[0][7] + 6, canvas.height / 2 - 3.6 * celestCoordSunX[0][8] - 6, "white", 2, !1, contextback)), 12 == MONTH && (canvas.height / 2 - 3.6 * celestCoord[0][8] >= smallestDecl ? smallestDecl = canvas.height / 2 - 3.6 * celestCoord[0][8] : solsticeWLabelled || (solsticeWLabelled = !0, renderLine(orreryWidth - 48.75 * celestCoord[0][7], canvas.height / 2 - 3.6 * celestCoord[0][8] - 5, orreryWidth - 48.75 * celestCoord[0][7], canvas.height / 2 - 3.6 * celestCoord[0][8] + 120, "white", 2, !1, contextback), contextback.fillStyle = "white", contextback.fillText("WINTER", orreryWidth - 48.75 * celestCoord[0][7] + 5, canvas.height / 2 - 3.6 * celestCoord[0][8] - 5 + 24 + 10 + 80), contextback.fillText("SOLSTICE", orreryWidth - 48.75 * celestCoord[0][7] + 5, canvas.height / 2 - 3.6 * celestCoord[0][8] - 5 + 24 + 20 + 80))), 6 == MONTH && (canvas.height / 2 - 3.6 * celestCoord[0][8] <= largestDecl ? largestDecl = canvas.height / 2 - 3.6 * celestCoord[0][8] : solsticeSLabelled || (solsticeSLabelled = !0, renderLine(orreryWidth - 48.75 * celestCoord[0][7], canvas.height / 2 - 3.6 * celestCoord[0][8] + 5, orreryWidth - 48.75 * celestCoord[0][7], canvas.height / 2 - 3.6 * celestCoord[0][8] - 120, "white", 2, !1, contextback), contextback.fillStyle = "white", contextback.fillText("SUMMER", orreryWidth - 48.75 * celestCoord[0][7] + 5, canvas.height / 2 - 3.6 * celestCoord[0][8] + 5 - 18 - 20 - 80), contextback.fillText("SOLSTICE", orreryWidth - 48.75 * celestCoord[0][7] + 5, canvas.height / 2 - 3.6 * celestCoord[0][8] + 5 - 18 - 10 - 80))), 9 == MONTH && 3.6 * celestCoord[0][8] < 0 && !fallLabelled && (fallLabelled = !0, renderLine(orreryWidth / 2, canvas.height / 2 - 10, orreryWidth / 2, canvas.height / 2 + 40, "white", 2, !1, contextback), contextback.fillStyle = "white", contextback.fillText("FALL", orreryWidth / 2 + 5, canvas.height / 2 - 5 + 24 + 10), contextback.fillText("EQUINOX", orreryWidth / 2 + 5, canvas.height / 2 - 5 + 24 + 20)), renderPoint(orreryWidth - 48.75 * celestCoord[0][7], canvas.height / 2 - 3.6 * celestCoord[0][8], 10, 0, 2 * Math.PI, !0, "yellow", "orange", context), renderPoint(orreryWidth - 48.75 * celestCoord[1][7], canvas.height / 2 - 3.6 * celestCoord[1][8], (5 + 4879 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "Chocolate", "SaddleBrown", context), renderPoint(orreryWidth - 48.75 * celestCoord[2][7], canvas.height / 2 - 3.6 * celestCoord[2][8], (5 + 12104 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "BurlyWood", "Peru", context), renderPoint(orreryWidth - 48.75 * celestCoord[3][7], canvas.height / 2 - 3.6 * celestCoord[3][8], (5 + 6792 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "Red", "DarkRed", context), renderPoint(orreryWidth - 48.75 * celestCoord[4][7], canvas.height / 2 - 3.6 * celestCoord[4][8], (5 + 142984 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "Peru", "Chocolate", context), renderText("J", "Arial", "center", orreryWidth - 48.75 * celestCoord[4][7], canvas.height / 2 - 3.6 * celestCoord[4][8] + 4, 9, "black", context), renderPoint(orreryWidth - 48.75 * celestCoord[5][7], canvas.height / 2 - 3.6 * celestCoord[5][8], (5 + 120536 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "AliceBlue", "PowderBlue", context), renderText("S", "Arial", "center", orreryWidth - 48.75 * celestCoord[5][7], canvas.height / 2 - 3.6 * celestCoord[5][8] + 4, 9, "black", context), renderPoint(orreryWidth - 48.75 * celestCoord[6][7], canvas.height / 2 - 3.6 * celestCoord[6][8], (5 + 51118 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "LightSkyBlue", "DodgerBlue", context), renderText("U", "Arial", "center", orreryWidth - 48.75 * celestCoord[6][7], canvas.height / 2 - 3.6 * celestCoord[6][8] + 4, 9, "black", context), renderPoint(orreryWidth - 48.75 * celestCoord[7][7], canvas.height / 2 - 3.6 * celestCoord[7][8], (5 + 49528 / planetScaleAdjustment * .5) / planetSizeAdjust, 0, 2 * Math.PI, !0, "MidnightBlue", "DodgerBlue", context), renderText("N", "Arial", "center", orreryWidth - 48.75 * celestCoord[7][7], canvas.height / 2 - 3.6 * celestCoord[7][8] + 4, 9, "black", context)
  }
}


function updateAllPlanets() {
  orbitalElements = plotPlanet(0, YEAR, MONTH, DAY, !1, "J2000", HOUR), XMercury = orbitalElements[0], YMercury = orbitalElements[1], ZMercury = orbitalElements[2], aMercury = orbitalElements[3], eMercury = orbitalElements[4], MMercury = orbitalElements[5], nMercury = orbitalElements[6], rMercury = orbitalElements[7], LMercury = orbitalElements[8], WMercury = orbitalElements[9], wMercury = orbitalElements[10], iMercury = orbitalElements[11], EMercury = orbitalElements[12], pMercury = orbitalElements[13], zMercury = orbitalElements[14], yMercury = orbitalElements[15], orbitalElements = plotPlanet(1, YEAR, MONTH, DAY, !1, "J2000", HOUR), XVenus = orbitalElements[0], YVenus = orbitalElements[1], ZVenus = orbitalElements[2], aVenus = orbitalElements[3], eVenus = orbitalElements[4], MVenus = orbitalElements[5], nVenus = orbitalElements[6], rVenus = orbitalElements[7], LVenus = orbitalElements[8], WVenus = orbitalElements[9], wVenus = orbitalElements[10], iVenus = orbitalElements[11], EVenus = orbitalElements[12], pVenus = orbitalElements[13], zVenus = orbitalElements[14], yVenus = orbitalElements[15], orbitalElements = plotPlanet(2, YEAR, MONTH, DAY, !1, "J2000", HOUR), XEarth = orbitalElements[0], YEarth = orbitalElements[1], ZEarth = orbitalElements[2], aEarth = orbitalElements[3], eEarth = orbitalElements[4], MEarth = orbitalElements[5], nEarth = orbitalElements[6], rEarth = orbitalElements[7], LEarth = orbitalElements[8], WEarth = orbitalElements[9], wEarth = orbitalElements[10], iEarth = orbitalElements[11], EEarth = orbitalElements[12], pEarth = orbitalElements[13], zEarth = orbitalElements[14], yEarth = orbitalElements[15], orbitalElements = plotPlanet(3, YEAR, MONTH, DAY, !1, "J2000", HOUR), XMars = orbitalElements[0], YMars = orbitalElements[1], ZMars = orbitalElements[2], aMars = orbitalElements[3], eMars = orbitalElements[4], MMars = orbitalElements[5], nMars = orbitalElements[6], rMars = orbitalElements[7], LMars = orbitalElements[8], WMars = orbitalElements[9], wMars = orbitalElements[10], iMars = orbitalElements[11], EMars = orbitalElements[12], pMars = orbitalElements[13], zMars = orbitalElements[14], yMars = orbitalElements[15], orbitalElements = plotPlanet(4, YEAR, MONTH, DAY, !1, "J2000", HOUR), XJupiter = orbitalElements[0], YJupiter = orbitalElements[1], ZJupiter = orbitalElements[2], aJupiter = orbitalElements[3], eJupiter = orbitalElements[4], MJupiter = orbitalElements[5], nJupiter = orbitalElements[6], rJupiter = orbitalElements[7], LJupiter = orbitalElements[8], WJupiter = orbitalElements[9], wJupiter = orbitalElements[10], iJupiter = orbitalElements[11], EJupiter = orbitalElements[12], pJupiter = orbitalElements[13], zJupiter = orbitalElements[14], yJupiter = orbitalElements[15], orbitalElements = plotPlanet(5, YEAR, MONTH, DAY, !1, "J2000", HOUR), XSaturn = orbitalElements[0], YSaturn = orbitalElements[1], ZSaturn = orbitalElements[2], aSaturn = orbitalElements[3], eSaturn = orbitalElements[4], MSaturn = orbitalElements[5], nSaturn = orbitalElements[6], rSaturn = orbitalElements[7], LSaturn = orbitalElements[8], WSaturn = orbitalElements[9], wSaturn = orbitalElements[10], iSaturn = orbitalElements[11], ESaturn = orbitalElements[12], pSaturn = orbitalElements[13], zSaturn = orbitalElements[14], ySaturn = orbitalElements[15], orbitalElements = plotPlanet(6, YEAR, MONTH, DAY, !1, "J2000", HOUR), XUranus = orbitalElements[0], YUranus = orbitalElements[1], ZUranus = orbitalElements[2], aUranus = orbitalElements[3], eUranus = orbitalElements[4], MUranus = orbitalElements[5], nUranus = orbitalElements[6], rUranus = orbitalElements[7], LUranus = orbitalElements[8], WUranus = orbitalElements[9], wUranus = orbitalElements[10], iUranus = orbitalElements[11], EUranus = orbitalElements[12], pUranus = orbitalElements[13], zUranus = orbitalElements[14], yUranus = orbitalElements[15], orbitalElements = plotPlanet(7, YEAR, MONTH, DAY, !1, "J2000", HOUR), XNeptune = orbitalElements[0], YNeptune = orbitalElements[1], ZNeptune = orbitalElements[2], aNeptune = orbitalElements[3], eNeptune = orbitalElements[4], MNeptune = orbitalElements[5], nNeptune = orbitalElements[6], rNeptune = orbitalElements[7], LNeptune = orbitalElements[8], WNeptune = orbitalElements[9], wNeptune = orbitalElements[10], iNeptune = orbitalElements[11], ENeptune = orbitalElements[12], pNeptune = orbitalElements[13], zNeptune = orbitalElements[14], yNeptune = orbitalElements[15], orbitalElements = plotPlanet(8, YEAR, MONTH, DAY, !1, "J1997", HOUR), XIo = orbitalElements[0], YIo = orbitalElements[1], ZIo = orbitalElements[2], aIo = orbitalElements[3], eIo = orbitalElements[4], MIo = orbitalElements[5], nIo = orbitalElements[6], rIo = orbitalElements[7], LIo = orbitalElements[8], WIo = orbitalElements[9], wIo = orbitalElements[10], iIo = orbitalElements[11], EIo = orbitalElements[12], pIo = orbitalElements[13], zIo = orbitalElements[14], yIo = orbitalElements[15], orbitalElements = plotPlanet(9, YEAR, MONTH, DAY, !1, "J1997", HOUR), XEuropa = orbitalElements[0], YEuropa = orbitalElements[1], ZEuropa = orbitalElements[2], aEuropa = orbitalElements[3], eEuropa = orbitalElements[4], MEuropa = orbitalElements[5], nEuropa = orbitalElements[6], rEuropa = orbitalElements[7], LEuropa = orbitalElements[8], WEuropa = orbitalElements[9], wEuropa = orbitalElements[10], iEuropa = orbitalElements[11], EEuropa = orbitalElements[12], pEuropa = orbitalElements[13], zEuropa = orbitalElements[14], yEuropa = orbitalElements[15], orbitalElements = plotPlanet(10, YEAR, MONTH, DAY, !1, "J1997", HOUR), XGanymede = orbitalElements[0], YGanymede = orbitalElements[1], ZGanymede = orbitalElements[2], aGanymede = orbitalElements[3], eGanymede = orbitalElements[4], MGanymede = orbitalElements[5], nGanymede = orbitalElements[6], rGanymede = orbitalElements[7], LGanymede = orbitalElements[8], WGanymede = orbitalElements[9], wGanymede = orbitalElements[10], iGanymede = orbitalElements[11], EGanymede = orbitalElements[12], pGanymede = orbitalElements[13], zGanymede = orbitalElements[14], yGanymede = orbitalElements[15], orbitalElements = plotPlanet(11, YEAR, MONTH, DAY, !1, "J1997", HOUR), XCallisto = orbitalElements[0], YCallisto = orbitalElements[1], ZCallisto = orbitalElements[2], aCallisto = orbitalElements[3], eCallisto = orbitalElements[4], MCallisto = orbitalElements[5], nCallisto = orbitalElements[6], rCallisto = orbitalElements[7], LCallisto = orbitalElements[8], WCallisto = orbitalElements[9], wCallisto = orbitalElements[10], iCallisto = orbitalElements[11], ECallisto = orbitalElements[12], pCallisto = orbitalElements[13], zCallisto = orbitalElements[14], yCallisto = orbitalElements[15], orbitalElements = plotPlanet(12, YEAR, MONTH, DAY, !1, "J2000", HOUR), XMoon = orbitalElements[0], YMoon = orbitalElements[1], ZMoon = orbitalElements[2], aMoon = orbitalElements[3], eMoon = orbitalElements[4], MMoon = orbitalElements[5], nMoon = orbitalElements[6], rMoon = orbitalElements[7], LMoon = orbitalElements[8], WMoon = orbitalElements[9], wMoon = orbitalElements[10], iMoon = orbitalElements[11], EMoon = orbitalElements[12], pMoon = orbitalElements[13], zMoon = orbitalElements[14], yMoon = orbitalElements[15], orbitalElements = plotPlanet(13, YEAR, MONTH, DAY, !1, "J2000", HOUR), XTriton = orbitalElements[0], YTriton = orbitalElements[1], ZTriton = orbitalElements[2], aTriton = orbitalElements[3], eTriton = orbitalElements[4], MTriton = orbitalElements[5], nTriton = orbitalElements[6], rTriton = orbitalElements[7], LTriton = orbitalElements[8], WTriton = orbitalElements[9], wTriton = orbitalElements[10], iTriton = orbitalElements[11], ETriton = orbitalElements[12], pTriton = orbitalElements[13], zTriton = orbitalElements[14], yTriton = orbitalElements[15], orbitalElements = plotPlanet(14, YEAR, MONTH, DAY, !1, "J2000", HOUR), XTitan = orbitalElements[0], YTitan = orbitalElements[1], ZTitan = orbitalElements[2], aTitan = orbitalElements[3], eTitan = orbitalElements[4], MTitan = orbitalElements[5], nTitan = orbitalElements[6], rTitan = orbitalElements[7], LTitan = orbitalElements[8], WTitan = orbitalElements[9], wTitan = orbitalElements[10], iTitan = orbitalElements[11], ETitan = orbitalElements[12], pTitan = orbitalElements[13], zTitan = orbitalElements[14], yTitan = orbitalElements[15], orbitalElements = plotPlanet(15, YEAR, MONTH, DAY, !1, "J2000", HOUR), XRhea = orbitalElements[0], YRhea = orbitalElements[1], ZRhea = orbitalElements[2], aRhea = orbitalElements[3], eRhea = orbitalElements[4], MRhea = orbitalElements[5], nRhea = orbitalElements[6], rRhea = orbitalElements[7], LRhea = orbitalElements[8], WRhea = orbitalElements[9], wRhea = orbitalElements[10], iRhea = orbitalElements[11], ERhea = orbitalElements[12], pRhea = orbitalElements[13], zRhea = orbitalElements[14], yRhea = orbitalElements[15], orbitalElements = plotPlanet(16, YEAR, MONTH, DAY, !1, "J2000", HOUR), XIapetus = orbitalElements[0], YIapetus = orbitalElements[1], ZIapetus = orbitalElements[2], aIapetus = orbitalElements[3], eIapetus = orbitalElements[4], MIapetus = orbitalElements[5], nIapetus = orbitalElements[6], rIapetus = orbitalElements[7], LIapetus = orbitalElements[8], WIapetus = orbitalElements[9], wIapetus = orbitalElements[10], iIapetus = orbitalElements[11], EIapetus = orbitalElements[12], pIapetus = orbitalElements[13], zIapetus = orbitalElements[14], yIapetus = orbitalElements[15], orbitalElements = plotPlanet(17, YEAR, MONTH, DAY, !1, "J2000", HOUR), XDione = orbitalElements[0], YDione = orbitalElements[1], ZDione = orbitalElements[2], aDione = orbitalElements[3], eDione = orbitalElements[4], MDione = orbitalElements[5], nDione = orbitalElements[6], rDione = orbitalElements[7], LDione = orbitalElements[8], WDione = orbitalElements[9], wDione = orbitalElements[10], iDione = orbitalElements[11], EDione = orbitalElements[12], pDione = orbitalElements[13], zDione = orbitalElements[14], yDione = orbitalElements[15], orbitalElements = plotPlanet(18, YEAR, MONTH, DAY, !1, "J2000", HOUR), XTethys = orbitalElements[0], YTethys = orbitalElements[1], ZTethys = orbitalElements[2], aTethys = orbitalElements[3], eTethys = orbitalElements[4], MTethys = orbitalElements[5], nTethys = orbitalElements[6], rTethys = orbitalElements[7], LTethys = orbitalElements[8], WTethys = orbitalElements[9], wTethys = orbitalElements[10], iTethys = orbitalElements[11], ETethys = orbitalElements[12], pTethys = orbitalElements[13], zTethys = orbitalElements[14], yTethys = orbitalElements[15], celestCoord[0] = calculateRightAscensionAndDeclination(XEarth, YEarth, ZEarth, 0, 0, 0, "", ""), celestCoord[1] = calculateRightAscensionAndDeclination(XEarth, YEarth, ZEarth, XMercury, YMercury, ZMercury, "", ""), celestCoord[2] = calculateRightAscensionAndDeclination(XEarth, YEarth, ZEarth, XVenus, YVenus, ZVenus, "", ""), celestCoord[3] = calculateRightAscensionAndDeclination(XEarth, YEarth, ZEarth, XMars, YMars, ZMars, "", ""), celestCoord[4] = calculateRightAscensionAndDeclination(XEarth, YEarth, ZEarth, XJupiter, YJupiter, ZJupiter, "", ""), celestCoord[5] = calculateRightAscensionAndDeclination(XEarth, YEarth, ZEarth, XSaturn, YSaturn, ZSaturn, "", ""), celestCoord[6] = calculateRightAscensionAndDeclination(XEarth, YEarth, ZEarth, XUranus, YUranus, ZUranus, "", ""), celestCoord[7] = calculateRightAscensionAndDeclination(XEarth, YEarth, ZEarth, XNeptune, YNeptune, ZNeptune, "", "")
}

function intersectCalc() {
  solarConjunction = collideLineCircle(orreryWidth / 2 + conjunctionOppositionDatesRunning[4] * scale / conjunctionOppositionDatesRunning[6], canvas.height / 2 - conjunctionOppositionDatesRunning[5] * scale / conjunctionOppositionDatesRunning[6], orreryWidth / 2 + XEarth * scale, canvas.height / 2 - YEarth * scale, orreryWidth / 2, canvas.height / 2, 20 / planetSizeAdjust)
}

function getJulianDate_JOV(e, t, n, a) {
  var r = new Date(e, t, Math.floor(n), a),
    i = new Date("1582", "10", "15") <= r;
  e < 0 && e++, 1 != t && 2 != t || (e -= 1, t += 12);
  var o = Math.floor(e / 100),
    l = 2 - o + Math.floor(o / 4);
  return i || (l = 0), Math.floor(365.25 * e) + Math.floor(30.6001 * (t + 1)) + n + .041666666666666664 * a + 1720994.5 + l
}

function updateDate(e, t) {
  newDate = new Date(current.getFullYear(), current.getMonth(), current.getDate() + e, current.getHours() + t),
    newhour = (current = newDate).getHours(), newdd = newDate.getDate(),
    newmm = newDate.getMonth() + 1,
    newyyyy = newDate.getFullYear(),
    YEAR = newyyyy, MONTH = newmm, DAY = newdd, HOUR = newhour;
}

function setDate(e, t, n) {
  YEAR = e, MONTH = t, DAY = n, newDate = new Date(e, t - 1, n), current = newDate
}

function nextConjunctionOppositionCalc(e, t, n) {
  var a, r, i, o, l = 0,
    s = !1,
    c = !1;
  switch (e) {
    case 0:
    case 1:
    case 2:
    case 3:
      o = 1;
      break;
    case 4:
      o = jupiterScaleDivider;
      break;
    case 5:
      o = saturnScaleDivider;
      break;
    case 6:
      o = uranusScaleDivider;
      break;
    case 7:
      o = neptuneScaleDivider
  }
  if (t)
    for (n || (current = new Date, DAY = current.getDate(), MONTH = current.getMonth() + 1, YEAR = current.getFullYear()), r = plotPlanet(2, YEAR, MONTH, DAY, !1), i = plotPlanet(e, YEAR, MONTH, DAY, !1); !s;) xDeltaCO = Math.abs(orreryWidth / 2 + i[0] * scale - (orreryWidth / 2 + r[0] * scale)), yDeltaCO = Math.abs(canvas.height / 2 - i[1] * scale - (canvas.height / 2 - r[1] * scale)), distanceCO = Math.sqrt(Math.pow(xDeltaCO, 2) + Math.pow(yDeltaCO, 2)) / scale, 0 == l && (a = distanceCO), 5 == l && (distanceCO < a ? c = !0 : closeCO = !1), 6 <= l && (c ? distanceCO <= a || (s = !0) : a < distanceCO || (c = !0)), a = distanceCO, l++, updateDate(1, 0), r = plotPlanet(2, YEAR, MONTH, DAY, !1), i = plotPlanet(e, YEAR, MONTH, DAY, !1);
  else r = plotPlanet(2, YEAR, MONTH, DAY, !1), i = plotPlanet(e, YEAR, MONTH, DAY, !1), xDeltaCO = Math.abs(orreryWidth / 2 + i[0] * scale - (orreryWidth / 2 + r[0] * scale)), yDeltaCO = Math.abs(canvas.height / 2 - i[1] * scale - (canvas.height / 2 - r[1] * scale)), distanceCO = Math.sqrt(Math.pow(xDeltaCO, 2) + Math.pow(yDeltaCO, 2)) / scale;
  return [YEAR, MONTH, DAY, distanceCO, i[0], i[1], o]
}

function calculateCurrentPhaseAngleEarthMars() {
  var e = Math.pow(sunMarsDistanceCalc(), 2) + Math.pow(sunEarthDistanceCalc(), 2) - Math.pow(earthMarsDistanceCalc(), 2),
    t = 2 * sunMarsDistanceCalc() * sunEarthDistanceCalc();
  return toDegrees(Math.acos(e / t))
}

function sunMarsDistanceCalc() {
  var e = Math.abs(orreryWidth / 2 - (orreryWidth / 2 + XMars * scale)),
    t = Math.abs(canvas.height / 2 - (canvas.height / 2 - YMars * scale));
  return Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2)) / scale
}

function sunEarthDistanceCalc() {
  var e = Math.abs(orreryWidth / 2 - (orreryWidth / 2 + XEarth * scale)),
    t = Math.abs(canvas.height / 2 - (canvas.height / 2 - YEarth * scale));
  return Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2)) / scale
}

function earthMarsDistanceCalc() {
  var e = Math.abs(orreryWidth / 2 + XMars * scale - (orreryWidth / 2 + XEarth * scale)),
    t = Math.abs(canvas.height / 2 - YMars * scale - (canvas.height / 2 - YEarth * scale));
  return Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2)) / scale
}

function parseDate(e) {
  var t = e.match(/(\d+)/g);
  return new Date(t[0], t[1] - 1, t[2])
}

function calculateHabitableZoneStar() {
  if (is_explorer) return null;
  var e = AUValue / 3085677581e4,
    t = -26.74 - 5 * Math.log10(e / 10) - .107,
    n = Math.pow(10, (t - t) / -2.5);
  return [Math.sqrt(n / 1.1), Math.sqrt(n / .53)]
}

function log10(e) {
  return Math.log(e) / Math.LN10
}

function calculateOrbitalSpeed(e, t, n, a, r) {
  e *= AUValue;
  var i = Math.sqrt(1 - Math.pow(t, 2)) * e,
    o = Math.pow(e, 2) - Math.pow(i, 2),
    l = Math.sqrt(o),
    s = e * Math.cos(toRadians(n)) - l,
    c = i * Math.sin(toRadians(n)),
    d = 0;
  return "KM/H" == a ? d = 3600 * Math.sqrt(GMSun * (2 / (Math.sqrt(Math.pow(s, 2) + Math.pow(c, 2)) * Math.pow(10, 9)) - 1 / (e * Math.pow(10, 9)))) : "KM/S" == a && (d = Math.sqrt(GMSun * (2 / (Math.sqrt(Math.pow(s, 2) + Math.pow(c, 2)) * Math.pow(10, 9)) - 1 / (e * Math.pow(10, 9))))), round(d, r)
}

function dateDiffInDays(e, t) {
  var n = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()),
    a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return Math.floor((a - n) / 864e5)
}

function numberWithCommas(e) {
  return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function plotPlanet(e, t, n, a, r, i, o) {
  return i = i || "J2000", TGen = getT(getJulianDate_JOV(t, n, a, o = o || 0), i), aGen = planetElements[e][0] + planetElements[e][1] * TGen, eGen = planetElements[e][4] + planetElements[e][5] * TGen, iGen = planetElements[e][6] + planetElements[e][7] * TGen, iGen %= 360, WGen = planetElements[e][10] + planetElements[e][11] * TGen, WGen %= 360, wGen = planetElements[e][8] + planetElements[e][9] * TGen, pGen = wGen %= 360, LGen = planetElements[e][2] + planetElements[e][3] * TGen, (MGen = (LGen %= 360) - pGen) < 0 && (MGen = 360 + MGen), EGen = EccAnom(eGen, MGen, 6), trueAnomalyArgGen = Math.sqrt((1 + eGen) / (1 - eGen)) * Math.tan(toRadians(EGen) / 2), nGen = trueAnomalyArgGen < 0 ? 2 * (Math.atan(trueAnomalyArgGen) / K + 180) : Math.atan(trueAnomalyArgGen) / K * 2, rGen = aGen * (1 - eGen * Math.cos(toRadians(EGen))), xGen = rGen * (Math.cos(toRadians(WGen)) * Math.cos(toRadians(wGen + nGen - WGen)) - Math.sin(toRadians(WGen)) * Math.sin(toRadians(wGen + nGen - WGen)) * Math.cos(toRadians(iGen))), yGen = rGen * (Math.sin(toRadians(WGen)) * Math.cos(toRadians(wGen + nGen - WGen)) + Math.cos(toRadians(WGen)) * Math.sin(toRadians(wGen + nGen - WGen)) * Math.cos(toRadians(iGen))), zGen = rGen * (Math.sin(toRadians(wGen + nGen - WGen)) * Math.sin(toRadians(iGen))), [XGen = xGen, YGen = yGen, ZGen = zGen, aGen, eGen, MGen, nGen, rGen, LGen, WGen, wGen, iGen, EGen, pGen, zGen, yGen]
}



function loadImages(e) {
  for (var t = 1, n = e.length, a = [], r = 0; r < e.length; r++) {
    var i = new Image;
    i.onload = function () {
      ++t == n && (init(), run())
    }, i.src = e[r], a[r] = i
  }
  return a
}
var date_sort_asc = function (e, t) {
  return t < e ? 1 : e < t ? -1 : 0
};

function planetSystemZoomIn(e, t, n) {
}

function planetSystemZoomOut() {
}

function renderAxialTilt(e, t, n, a, r, i) {
  e.save(), e.beginPath(), e.translate(orreryWidth / 2 + t * scale, canvas.height / 2 - n * scale), e.rotate(toRadians(a)), e.lineWidth = 1, e.strokeStyle = "goldenrod";
  var o = (25 + i + r / 2370 * 1) * (scale / 200);
  e.moveTo(0, 0 - o / 2), e.lineTo(0, 0 - o / 2 + o), e.stroke(), renderPoint(0, 0 - o / 2, scale / 200 * 1, 0, 2 * Math.PI, !0, "goldenrod", "goldenrod", e), e.restore()
}

function renderTransferOrbit(e, t, n, a, r, i, o, l, s, c, d, u, h) {
}

function renderHabitableZone(e, t, n, a) {
}

function drawOrbit(e, t, n, a, r, i, o, l, s, c, d, u, h, g, m, p) {
  var S = Math.sqrt(1 - Math.pow(i, 2)) * r,
    A = calculateFoci(r, S),
    y = r * Math.cos(toRadians(o)),
    x = S * Math.sin(toRadians(o));
  t.save(), t.beginPath(), t.translate(orreryWidth / 2 + y * scale / g - zoomOffSetX, canvas.height / 2 + x * scale / g - zoomOffSetY), t.rotate(toRadians(o)), 100 <= scale && (renderPoint(0 - A * scale / g, 0, 2, 0, 2 * Math.PI, !0, p, p, t), renderText("P", "Arial", "center", 0 - A * scale / g - 10, -7, 12, p, t), renderPoint(0 - (2 * r + A) * scale / g, 0, 2, 0, 2 * Math.PI, !0, p, p, t)), l && (t.beginPath(), t.rect(0 - (2 * r + A) * scale / g, 0 - S * scale / g, 2 * r * scale / g, 2 * S * scale / g), t.lineWidth = 1, t.strokeStyle = "GoldenRod", t.stroke(), t.closePath(), renderLine(0 - (2 * r + A) * scale / g, 0, (0 - A) * scale / g, 0, "GoldenRod", 1, !1, t)), t.beginPath(), planetInfoIndex != e ? (t.strokeStyle = s, t.lineWidth = orbitLineWidth) : mobileDevice ? (t.strokeStyle = m, t.lineWidth = 2) : (t.strokeStyle = m, t.lineWidth = 1, c = !0), c && t.setLineDash([2, 3]), t.ellipse(0 - (r + A) * (scale / g), 0, r * (scale / g), scale / g * S, 0, 0, 2 * Math.PI, !0), t.stroke(), t.closePath(), t.restore()
}

function renderAxisRot(e, t, n, a, r, i, o, l) {
  l.save(), l.beginPath(), l.translate(e, t), i ? l.rotate(toRadians(rotAngle)) : l.rotate(toRadians(-rotAngle));
  l.strokeStyle = n, l.arc(0, 0, o, toRadians(90), toRadians(270), !1), l.lineWidth = 1, l.stroke(), l.beginPath(), l.lineWidth = 3, l.arc(0, 0, o, toRadians(a), toRadians(r), !1), l.stroke(), l.restore()
}

function renderText(e, t, n, a, r, i, o, l) {
}

function renderLine(e, t, n, a, r, i, o, l) {
}

function renderPoint(e, t, n, a, r, i, o, l, s) {
  s.beginPath(),
    s.arc(e, t, n, a, r, i),
    s.fillStyle = o,
    s.fill(), s.lineWidth = 0;
}

function EccAnom(e, t, n) {
  var a, r, i = Math.PI,
    o = i / 180,
    l = 0,
    s = Math.pow(10, -n);
  for (t = 2 * i * ((t /= 360) - Math.floor(t)), r = (a = e < .8 ? t : i) - e * Math.sin(t) - t; Math.abs(r) > s && l < 30;) r = (a -= r / (1 - e * Math.cos(a))) - e * Math.sin(a) - t, l += 1;
  return a /= o, Math.round(a * Math.pow(10, n)) / Math.pow(10, n)
}

function getT(e, t) {
  return "J1900" == t ? (e - 2415020) / 36525 : "J2000" == t ? (e - 2451545) / 36525 : "J1996DEC4" == t ? (e - 2450421.5) / 36525 : "J1997" == t ? (e - 2450464.5) / 36525 : "J2004" == t ? (e - 2453005.5) / 36525 : void 0
}

function getJulianDate(e, t, n) {
  var a = new Date(e, t, Math.floor(n)),
    r = new Date("1582", "10", "15") <= a;
  e < 0 && e++, 1 != t && 2 != t || (e -= 1, t += 12);
  var i = Math.floor(e / 100),
    o = 2 - i + Math.floor(i / 4);
  return r || (o = 0), Math.floor(365.25 * e) + Math.floor(30.6001 * (t + 1)) + n + 1720994.5 + o
}

function toDegrees(e) {
  return e * (180 / Math.PI)
}

function toRadians(e) {
  return e * (Math.PI / 180)
}

function round(e, t) {
  return Number(Math.round(e + "e" + t) + "e-" + t)
}

function calculateFoci(e, t) {
  var n = Math.pow(e, 2) - Math.pow(t, 2);
  return Math.sqrt(n)
}

function setPlanetAUScale(e) {
  "compressed" == e ? (saturnScaleDivider = 3.75, uranusScaleDivider = 6.3, neptuneScaleDivider = 8.7, scaleMoonGanymede = !1, scaleMoonCallisto = 2.9, scaleMoonMoon = jupiterScaleDivider = 2.5, scaleMoonTriton = scaleMoonEuropa = !1, scaleMoonTitan = !1, scaleMoonRhea = !1, scaleMoonIapetus = !1, scaleMoonTethys = scaleMoonDione = scaleMoonIo = 1.2) : "uncompressed" == e && (scaleMoonMoon = !1, scaleMoonIapetus = 1.4, scaleMoonTethys = scaleMoonDione = scaleMoonRhea = scaleMoonTitan = scaleMoonTriton = scaleMoonCallisto = scaleMoonGanymede = scaleMoonEuropa = scaleMoonIo = neptuneScaleDivider = uranusScaleDivider = saturnScaleDivider = jupiterScaleDivider = 1)
}

function calculateRightAscensionAndDeclination(e, t, n, a, r, i, o, l) {
  return xGeo = a - e, yGeo = r - t, zGeo = i - n, xEq = xGeo, yEq = Math.cos(toRadians(meanObliquityForJ2000)) * yGeo - Math.sin(toRadians(meanObliquityForJ2000)) * zGeo, zEq = Math.sin(toRadians(meanObliquityForJ2000)) * yGeo + Math.cos(toRadians(meanObliquityForJ2000)) * zGeo, raPlanet = toDegrees(Math.atan(yEq / xEq)), xEq < 0 ? raPlanet += 180 : 0 < xEq && yEq < 0 && (raPlanet += 360), raPlanet /= 15, decPlanet = toDegrees(Math.atan(zEq / Math.sqrt(Math.pow(xEq, 2) + Math.pow(yEq, 2)))), distPlanet = Math.sqrt(Math.pow(xEq, 2) + Math.pow(yEq, 2) + Math.pow(zEq, 2)), raPlanetH = Math.floor(raPlanet), minfloat = 60 * (raPlanet - raPlanetH), raPlanetM = Math.floor(minfloat), secfloat = 60 * (minfloat - raPlanetM), raPlanetS = round(secfloat, 0), negative = !1, decPlanet < 0 && (decPlanet = Math.abs(decPlanet), negative = !0), decPlanetH = Math.floor(decPlanet), minfloat = 60 * (decPlanet - decPlanetH), decPlanetM = Math.floor(minfloat), secfloat = 60 * (minfloat - decPlanetM), decPlanetS = round(secfloat, 0), negative && (decPlanetH = -decPlanetH, decPlanet = -decPlanet), [raPlanetH, raPlanetM, raPlanetS, decPlanetH, decPlanetM, decPlanetS, distPlanet, raPlanet, decPlanet, o, l]
}

function hoursToDecimal(e, t, n) {
  return decimal = null, decimal = 15 * e, decimal += t / 60 * 15, decimal += n / 3600 * 15, decimal
}

function degreesToDecimal(e, t, n) {
  return decimal = null, decimal = e, decimal += t / 60, decimal += n / 3600, decimal
}

function drawRADeclGrid(e, t) {
  for (renderLine(orreryWidth / 2, 35, orreryWidth / 2, canvas.height - 20 - 15, t, 2, !1, e), renderLine(0, canvas.height / 2 - 324, canvas.width, canvas.height / 2 - 324, t, 2, !1, e), renderLine(0, canvas.height / 2, canvas.width, canvas.height / 2, t, 2, !1, e), renderLine(0, canvas.height / 2 + 324, canvas.width, canvas.height / 2 + 324, t, 2, !1, e), increase = 0, i = 0; i < 24; i++) renderLine(0 + increase, 35, 0 + increase, canvas.height - 20 - 15, t, 1, !1, e), increase += 48.75;
  for (e.font = "20px Arial", e.textAlign = "left", e.fillStyle = t, hourAdjustPx = 9, increase = 0, i = 0; i < 23; i += 1) i < 9 ? e.fillText("0" + (i + 1) + "h", orreryWidth - 41 - 20 - increase, 17 + hourAdjustPx) : e.fillText(i + 1 + "h", orreryWidth - 41 - 20 - increase, 17 + hourAdjustPx), increase += 48.75;
  for (increase = 0, i = 0; i < 23; i += 1) i < 9 ? e.fillText("0" + (i + 1) + "h", orreryWidth - 41 - 20 - increase, canvas.height - 2 - hourAdjustPx) : e.fillText(i + 1 + "h", orreryWidth - 41 - 20 - increase, canvas.height - 2 - hourAdjustPx), increase += 48.75;
  for (increase = 0, i = 0; i < 18; i++) renderLine(0, 72 + increase, orreryWidth, 72 + increase, t, 1, !1, e), increase += 36;
  e.font = "10px Arial", e.textAlign = "left", e.fillStyle = t, e.fillText("90Â°", orreryWidth / 2 + 3, canvas.height / 2 - 324 + 11), e.fillText("80Â°", orreryWidth / 2 + 3, canvas.height / 2 - 288 + 11), e.fillText("70Â°", orreryWidth / 2 + 3, canvas.height / 2 - 252 + 11), e.fillText("60Â°", orreryWidth / 2 + 3, canvas.height / 2 - 216 + 11), e.fillText("50Â°", orreryWidth / 2 + 3, canvas.height / 2 - 180 + 11), e.fillText("40Â°", orreryWidth / 2 + 3, canvas.height / 2 - 144 + 11), e.fillText("30Â°", orreryWidth / 2 + 3, canvas.height / 2 - 108 + 11), e.fillText("20Â°", orreryWidth / 2 + 3, canvas.height / 2 - 72 + 11), e.fillText("10Â°", orreryWidth / 2 + 3, canvas.height / 2 - 36 + 11), e.fillText("-10Â°", orreryWidth / 2 + 3, canvas.height / 2 + 36 - 4), e.fillText("-20Â°", orreryWidth / 2 + 3, canvas.height / 2 + 72 - 4), e.fillText("-30Â°", orreryWidth / 2 + 3, canvas.height / 2 + 108 - 4), e.fillText("-40Â°", orreryWidth / 2 + 3, canvas.height / 2 + 144 - 4), e.fillText("-50Â°", orreryWidth / 2 + 3, canvas.height / 2 + 180 - 4), e.fillText("-60Â°", orreryWidth / 2 + 3, canvas.height / 2 + 216 - 4), e.fillText("-70Â°", orreryWidth / 2 + 3, canvas.height / 2 + 252 - 4), e.fillText("-80Â°", orreryWidth / 2 + 3, canvas.height / 2 + 288 - 4), e.fillText("-90Â°", orreryWidth / 2 + 3, canvas.height / 2 + 324 - 4)
}


function drawStars(e, t, n, a, r, o, l, s) {
  for (null == l && (l = !1), null == s && (s = 0), null == a && (a = "#0e6396"), i = 0; i < e.length;) o && (n.globalAlpha = l ? AlphaLoop / (40 + s) : .5, n.beginPath(), n.arc(orreryWidth - 48.75 * e[i] / 15, canvas.height / 2 - 3.6 * t[i], 2 * r, 0, 2 * Math.PI, !0), n.fillStyle = a, n.fill(), n.closePath(), n.globalAlpha = 1), n.beginPath(), n.arc(orreryWidth - 48.75 * e[i] / 15, canvas.height / 2 - 3.6 * t[i], r, 0, 2 * Math.PI, !0), n.fillStyle = a, n.fill(), n.closePath(), i++
}

function init_ra_decl_stars() {
  for (raPolaris[0] = hoursToDecimal(polarisJ2000[0][0], polarisJ2000[0][1], polarisJ2000[0][2]), declPolaris[0] = degreesToDecimal(polarisJ2000[0][3], polarisJ2000[0][4], polarisJ2000[0][5]), raPolarisAustralis[0] = hoursToDecimal(polarisAustralisJ2000[0][0], polarisAustralisJ2000[0][1], polarisAustralisJ2000[0][2]), declPolarisAustralis[0] = degreesToDecimal(polarisAustralisJ2000[0][3], polarisAustralisJ2000[0][4], polarisAustralisJ2000[0][5]), raAlphaCentauri[0] = hoursToDecimal(alphaCentauriJ2000[0][0], alphaCentauriJ2000[0][1], alphaCentauriJ2000[0][2]), declAlphaCentauri[0] = degreesToDecimal(alphaCentauriJ2000[0][3], alphaCentauriJ2000[0][4], alphaCentauriJ2000[0][5]), i = 0; i < pleiadesJ2000.length;) raPleiades[i] = hoursToDecimal(pleiadesJ2000[i][0], pleiadesJ2000[i][1], pleiadesJ2000[i][2]), declPleiades[i] = degreesToDecimal(pleiadesJ2000[i][3], pleiadesJ2000[i][4], pleiadesJ2000[i][5]), i++;
  for (raAndromeda[0] = hoursToDecimal(andromedaJ2000[0][0], andromedaJ2000[0][1], andromedaJ2000[0][2]), declAndromeda[0] = degreesToDecimal(andromedaJ2000[0][3], andromedaJ2000[0][4], andromedaJ2000[0][5]), i = 0; i < cruxJ2000.length;) raCrux[i] = hoursToDecimal(cruxJ2000[i][0], cruxJ2000[i][1], cruxJ2000[i][2]), declCrux[i] = degreesToDecimal(cruxJ2000[i][3], cruxJ2000[i][4], cruxJ2000[i][5]), i++;
  for (i = 0; i < siriusJ2000.length;) raSirius[i] = hoursToDecimal(siriusJ2000[i][0], siriusJ2000[i][1], siriusJ2000[i][2]), declSirius[i] = degreesToDecimal(siriusJ2000[i][3], siriusJ2000[i][4], siriusJ2000[i][5]), i++;
  for (i = 0; i < orionJ2000.length;) raOrion[i] = hoursToDecimal(orionJ2000[i][0], orionJ2000[i][1], orionJ2000[i][2]), declOrion[i] = degreesToDecimal(orionJ2000[i][3], orionJ2000[i][4], orionJ2000[i][5]), i++;
  for (i = 0; i < carinaJ2000.length;) raCarina[i] = hoursToDecimal(carinaJ2000[i][0], carinaJ2000[i][1], carinaJ2000[i][2]), declCarina[i] = degreesToDecimal(carinaJ2000[i][3], carinaJ2000[i][4], carinaJ2000[i][5]), i++;
  for (i = 0; i < zodiacCancerJ2000.length;) raCancer[i] = hoursToDecimal(zodiacCancerJ2000[i][0], zodiacCancerJ2000[i][1], zodiacCancerJ2000[i][2]), declCancer[i] = degreesToDecimal(zodiacCancerJ2000[i][3], zodiacCancerJ2000[i][4], zodiacCancerJ2000[i][5]), i++;
  for (i = 0; i < zodiacLeoJ2000.length;) raLeo[i] = hoursToDecimal(zodiacLeoJ2000[i][0], zodiacLeoJ2000[i][1], zodiacLeoJ2000[i][2]), declLeo[i] = degreesToDecimal(zodiacLeoJ2000[i][3], zodiacLeoJ2000[i][4], zodiacLeoJ2000[i][5]), i++;
  for (i = 0; i < zodiacVirgoJ2000.length;) raVirgo[i] = hoursToDecimal(zodiacVirgoJ2000[i][0], zodiacVirgoJ2000[i][1], zodiacVirgoJ2000[i][2]), declVirgo[i] = degreesToDecimal(zodiacVirgoJ2000[i][3], zodiacVirgoJ2000[i][4], zodiacVirgoJ2000[i][5]), i++;
  for (i = 0; i < zodiacPiscesJ2000.length;) raPisces[i] = hoursToDecimal(zodiacPiscesJ2000[i][0], zodiacPiscesJ2000[i][1], zodiacPiscesJ2000[i][2]), declPisces[i] = degreesToDecimal(zodiacPiscesJ2000[i][3], zodiacPiscesJ2000[i][4], zodiacPiscesJ2000[i][5]), i++;
  for (i = 0; i < zodiacGeminiJ2000.length;) raGemini[i] = hoursToDecimal(zodiacGeminiJ2000[i][0], zodiacGeminiJ2000[i][1], zodiacGeminiJ2000[i][2]), declGemini[i] = degreesToDecimal(zodiacGeminiJ2000[i][3], zodiacGeminiJ2000[i][4], zodiacGeminiJ2000[i][5]), i++;
  for (i = 0; i < zodiacLibraJ2000.length;) raLibra[i] = hoursToDecimal(zodiacLibraJ2000[i][0], zodiacLibraJ2000[i][1], zodiacLibraJ2000[i][2]), declLibra[i] = degreesToDecimal(zodiacLibraJ2000[i][3], zodiacLibraJ2000[i][4], zodiacLibraJ2000[i][5]), i++;
  for (i = 0; i < zodiacScorpioJ2000.length;) raScorpio[i] = hoursToDecimal(zodiacScorpioJ2000[i][0], zodiacScorpioJ2000[i][1], zodiacScorpioJ2000[i][2]), declScorpio[i] = degreesToDecimal(zodiacScorpioJ2000[i][3], zodiacScorpioJ2000[i][4], zodiacScorpioJ2000[i][5]), i++;
  for (i = 0; i < zodiacSagittariusJ2000.length;) raSagittarius[i] = hoursToDecimal(zodiacSagittariusJ2000[i][0], zodiacSagittariusJ2000[i][1], zodiacSagittariusJ2000[i][2]), declSagittarius[i] = degreesToDecimal(zodiacSagittariusJ2000[i][3], zodiacSagittariusJ2000[i][4], zodiacSagittariusJ2000[i][5]), i++;
  for (i = 0; i < zodiacCapricornusJ2000.length;) raCapricornus[i] = hoursToDecimal(zodiacCapricornusJ2000[i][0], zodiacCapricornusJ2000[i][1], zodiacCapricornusJ2000[i][2]), declCapricornus[i] = degreesToDecimal(zodiacCapricornusJ2000[i][3], zodiacCapricornusJ2000[i][4], zodiacCapricornusJ2000[i][5]), i++;
  for (i = 0; i < zodiacAquariusJ2000.length;) raAquarius[i] = hoursToDecimal(zodiacAquariusJ2000[i][0], zodiacAquariusJ2000[i][1], zodiacAquariusJ2000[i][2]), declAquarius[i] = degreesToDecimal(zodiacAquariusJ2000[i][3], zodiacAquariusJ2000[i][4], zodiacAquariusJ2000[i][5]), i++;
  for (i = 0; i < zodiacAriesJ2000.length;) raAries[i] = hoursToDecimal(zodiacAriesJ2000[i][0], zodiacAriesJ2000[i][1], zodiacAriesJ2000[i][2]), declAries[i] = degreesToDecimal(zodiacAriesJ2000[i][3], zodiacAriesJ2000[i][4], zodiacAriesJ2000[i][5]), i++;
  for (i = 0; i < zodiacTaurusJ2000.length;) raTaurus[i] = hoursToDecimal(zodiacTaurusJ2000[i][0], zodiacTaurusJ2000[i][1], zodiacTaurusJ2000[i][2]), declTaurus[i] = degreesToDecimal(zodiacTaurusJ2000[i][3], zodiacTaurusJ2000[i][4], zodiacTaurusJ2000[i][5]), i++
}

// function start() {

//   var img = new Image();
//   img.crossOrigin = 'anonymous';
//   img.onload = start;

//   var bottleCanvas = document.getElementById('LAYER1');
//   var designCanvas = document.getElementById('LAYER2');
//   var ctxb = bottleCanvas.getContext('2d');
//   var ctxd = designCanvas.getContext('2d');

//   ctxb.drawImage(img, 0, 0);
//   ctxd.fillRect(0, 0, 0, 0);

//   downloadCanvas();
// }

// function downloadCanvas() {
//   var bottleCanvas = document.getElementById('LAYER1');
//   var designCanvas = document.getElementById('LAYER2');

//   var bottleContext = bottleCanvas.getContext('2d');
//   bottleContext.drawImage(designCanvas, 0, 0);

//   var dataURL = bottleCanvas.toDataURL("image/png");
//   var link = document.createElement('a');
//   link.download = "bottle-design.png";
//   link.href = bottleCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
//   link.click();

// }