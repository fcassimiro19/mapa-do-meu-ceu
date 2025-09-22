import { ProductMapUtils } from './_map-utils';
import moment from 'moment-timezone';
import tzLookup from 'tz-lookup';

class MapaDasEstrelas extends ProductMapUtils {
  constructor() {
    super();
    this.buyButton = document.querySelector('#buyButton'),
    this.generatePdfButton = document.querySelector('#generatePdf'),
    this.isMapPage = document.getElementById('mde-page'),
    this.hourHided = document.querySelector('[name="hide-hour"]').checked,
    this.currentMapColor = "rgb(0,0,0)",
    this.currentMapType = 538,
    this.corMoldura = "black",
    this.currentMapSku = "A3",
    this.latitude = -23.5432,
    this.longitude = -46.6292,
    this.timezone = 3,
    this.timestampGlobal = 1458000000,
    this.updateLocationOptions = '',

    this.previewMapContent = document.querySelector(".map-content"),
    this.previewMapContentBlock = document.querySelector(".map-content-scaled"),
    this.previewMapBorder = document.querySelector(".map-border-block"),
    this.previewMapTextLat = document.querySelector(".-lat"),
    this.previewMapTextLng = document.querySelector(".-long"),
    this.previewTextAddress = document.querySelector(".-address"),
    this.previewDateTime = document.getElementById("datetime"),
    this.previewDateText = document.querySelector(".-date"),
    
    this.mapTimezone = 3,
    
    this.mapLayoutTrigger = document.querySelectorAll('.layout-trigger'),
    this.mapColor = document.querySelectorAll('[name="map-color"]'),
    this.mapCustomColor = document.getElementById('custom-color'),
    this.mapCustomColorTrigger = document.getElementById('custom-color-trigger'),
    this.mapWhiteBackgroundInput = document.querySelector('[name="white-bg"]'),
    this.mapLocationsInputLabel = document.querySelector(".-locations"),
    this.mapMainLocationInput = document.querySelector("#place"),
    this.mapMainLocationNameInput = document.querySelector("#place-name"),
    this.mapLocationsLabel = document.querySelector(".locations-results"),
    this.mapLocationsResults = document.querySelectorAll(".locations-results li"),
    this.mapLocationsBlockResults = document.querySelector(".-location-text-block"),
    this.mapCurrentLocationText = document.querySelector(".-location-text input"),
    this.mapBorderTypeInput = document.querySelector('[name="border-type"]:checked'),
    this.mapBorderType = document.querySelectorAll('[name="border-type"]'),
    this.mapDay = document.getElementById("date-day").value.padStart(2, '0'),
    this.mapMonth = document.getElementById("date-month").value.padStart(2, '0'),
    this.mapYear = document.getElementById("date-year").value.padStart(2, '0'),
    this.mapHour = document.getElementById("time-hour").value.padStart(2, '0'),
    this.mapMinute = document.getElementById("time-minute").value.padStart(2, '0'),
    this.mapDateTrigger = document.querySelectorAll('.date-trigger'),
    this.mapHourTrigger = document.querySelector('[name="hide-hour"]'),
    this.mapHourBlock = document.getElementById("hour-block"),
    this.mapAdvancedOptionsItens = document.querySelectorAll('.advanced-options-item'),
    this.mapLinesInput = document.querySelector('[name="linhas-imaginarias"]'),
    this.mapContellationsInput = document.querySelector('[name="constelacoes"]'),
    this.mapMilkwayInput = document.querySelector('[name="via-lactea"]'),
    this.mapConstellationsNameInput = document.querySelector('[name="constellations-name"]'),
    this.mapMoonInput = document.querySelector('[name="moon"]'),


    this.activeLayout = document.querySelector('[name="layout"]:checked'),
    this.activeMapColor = document.querySelector('[name="map-color"]:checked'),
    this.activeWhiteBg = document.querySelector('[name="white-bg"]').checked ? "Sim" : "Não",
    this.activeMapBorder = document.querySelector('[name="map-border"]').checked ? "Sim" : "Não",
    this.activeHourHidden = document.querySelector('[name="hide-hour"]').checked ? "(Escondida)" : "",
    this.activeFont = document.querySelector('[name="font-family"]:checked').value,
    this.activeBorderType = document.querySelector('[name="border-type"]:checked').value,
    this.activeFrameColor = document.querySelector('[name="map-frame-color"]:checked').value,
    this.activeLines = document.querySelector('[name="linhas-imaginarias"]').checked ? "Sim" : "Não",
    this.activeContellations = document.querySelector('[name="constelacoes"]').checked ? "Sim" : "Não",
    this.activeMilkway = document.querySelector('[name="via-lactea"]').checked ? "Sim" : "Não",
    this.activeConstellationsName = document.querySelector('[name="constellations-name"]').checked ? "Sim" : "Não",
    this.activeMoon = document.querySelector('[name="moon"]').checked ? "Sim" : "Não",
    this.activePdf = '',
    this.activeSvg = '',

    this.wcDesign = document.querySelector(".wc-pao-addon-design-do-mapa input"),
    this.wcPosterColor = document.querySelector(".wc-pao-addon-cor-do-poster input"),
    this.wcWhiteBg = document.querySelector(".wc-pao-addon-fundo-branco input"),
    this.wcPosterBorderInput = document.querySelector(".wc-pao-addon-borda-do-poster input"),
    this.wcFont = document.querySelector(".wc-pao-addon-fonte input"),
    this.wcDate = document.querySelector(".wc-pao-addon-data input"),
    this.wcHour = document.querySelector(".wc-pao-addon-horario input"),
    this.wcLat = document.querySelector(".wc-pao-addon-latitude input"),
    this.wcLng = document.querySelector(".wc-pao-addon-longitude input"),
    this.wcLocationText = document.querySelector(".wc-pao-addon-nome-do-local input"),
    this.wcOriginalLocationText = document.querySelector('.wc-pao-addon-nome-original-do-local input'),
    this.wcMapBorder = document.querySelector(".wc-pao-addon-borda-do-mapa input"),
    
    this.wcFrameColor = document.querySelector(".wc-pao-addon-cor-da-moldura input"),
    this.wcConstellationsInput = document.querySelector(".wc-pao-addon-constelacoes input"),
    this.wcLinesInput = document.querySelector(".wc-pao-addon-linhas-imaginarias input"),
    this.wcMilkwayInput = document.querySelector(".wc-pao-addon-via-lactea input"),
    this.wcConstellationsNameInput = document.querySelector(".wc-pao-addon-nome-das-constelacoes input"),
    this.wcMoonInput = document.querySelector(".wc-pao-addon-lua input"),
    this.wcPdfInput = document.querySelector(".wc-pao-addon-link-do-pdf input"),
    
    this.formLat = document.getElementById("lat"),
    this.formLng = document.getElementById("lon"),

    this.locationUpdated = false,


    this.init();
  }

  init() {
    if (!this.isMapPage) return;

    document.querySelector('html').classList.add('map-page')

    this.initListeners();
    this.updateStarsPreview();

    console.log(this.mapMainLocationNameInput);
    console.log(this.mapCurrentLocationText);
  }
  initListeners() {
    const self = this;

    self.buyButton.addEventListener('click', function() {
      self.handleBuy();
    })

    if (self.generatePdfButton) {
      self.generatePdfButton.addEventListener('click', function() {
        self.handleBuy(true);
      })
    }

    self.mapMainLocationInput.addEventListener('input', function() {
      if (this.value.trim().length >= 3) {
        self.updateLocationOptionsOnDelay(this);
      }
    })

    self.mapMainLocationNameInput.addEventListener('change', function() {
      self.updateLocationText();
      self.updateMapPreviewOnText(self);
    })

    self.mapDateTrigger.forEach(item => {
      item.addEventListener('change', () => {
        self.setNewDate();
      })
    })

    self.mapHourTrigger.addEventListener('change', () => {
      self.toggleHour();
    })

    self.mapCurrentLocationText.addEventListener('keyup', () => {
      self.updateLocationText();
    })

    self.mapAdvancedOptionsItens.forEach(item => {
      item.addEventListener('change', () => {
        self.updateAdvancedOptions();
      })
    })

    self.mapLayoutTrigger.forEach(item => {
      item.addEventListener('change', function() {
        self.toggleLayout(this);
      })
    })

    self.mapColor.forEach(item => {
      item.addEventListener('change', function() {
        self.changeMapColor(this.value);
      })
    })

    if (self.mapCustomColor) {

      self.mapCustomColor.addEventListener('change', function() {
        self.changeMapColor(this.value);
      })
      
      self.mapCustomColorTrigger.addEventListener('click', function() {
        self.changeMapColor(self.mapCustomColor.value);
      })
    }

    self.mapWhiteBackgroundInput.addEventListener('change', function () {
      self.changeMapColor();
    })

    self.mapBorderType.forEach(item => {
      item.addEventListener('change', function () {
        self.updateBorderType();
      })
    })

    
  }

  updateConstructor() {
    this.mapLocationsResults = document.querySelectorAll(".locations-results li");
    this.mapDay = document.getElementById("date-day").value.padStart(2, '0');
    this.mapMonth = document.getElementById("date-month").value.padStart(2, '0');
    this.mapYear = document.getElementById("date-year").value.padStart(2, '0');
    this.mapHour = document.getElementById("time-hour").value.padStart(2, '0');
    this.mapMinute = document.getElementById("time-minute").value.padStart(2, '0');
    this.hourHided = document.querySelector('[name="hide-hour"]').checked;
  }

  updateConstructorActiveItems() {
    this.activeLayout = document.querySelector('[name="layout"]:checked');
    this.activeMapColor = document.querySelector('[name="map-color"]:checked');
    this.activeWhiteBg = document.querySelector('[name="white-bg"]').checked ? "Sim" : "Não";
    this.activeMapBorder = document.querySelector('[name="map-border"]').checked ? "Sim" : "Não";
    this.activeHourHidden = document.querySelector('[name="hide-hour"]').checked ? "(Escondida)" : "";
    this.activeFont = document.querySelector('[name="font-family"]:checked').value;
    this.activeBorderType = document.querySelector('[name="border-type"]:checked').value;
    this.activeFrameColor = (document.querySelector('[name="map-size"]:checked').value.includes('Com') ? document.querySelector('[name="map-frame-color"]:checked').value : '');
    this.activeLines = document.querySelector('[name="linhas-imaginarias"]').checked ? "Sim" : "Não";
    this.activeContellations = document.querySelector('[name="constelacoes"]').checked ? "Sim" : "Não";
    this.activeMilkway = document.querySelector('[name="via-lactea"]').checked ? "Sim" : "Não";
    this.activeConstellationsName = document.querySelector('[name="constellations-name"]').checked ? "Sim" : "Não";
    this.activeMoon = document.querySelector('[name="moon"]').checked ? "Sim" : "Não";
    this.mapSpotify = document.querySelector('[name="spotify"]');
    this.mapSpotifyValue = document.getElementById('spotify-url').value;

  }

  updateAddonsValue() {
    this.updateConstructorActiveItems();

    this.wcDesign.value = this.activeLayout.value;
    this.wcPosterColor.value = this.activeMapColor.dataset.colorname;
    this.wcWhiteBg.value = this.activeWhiteBg;
    this.wcPosterBorderInput.value = (this.activeLayout.dataset.pdf == 2 ? 'Não' : this.activeMapBorder);
    this.wcOriginalLocationText.value = this.mapMainLocationInput.value;
    this.wcLocationText.value = this.mapMainLocationNameInput.value;
    this.wcLat.value = Number(this.latitude).toFixed(4);
    this.wcLng.value = Number(this.longitude).toFixed(4);
    this.wcDate.value = `${this.mapDay}/${this.mapMonth}/${this.mapYear}`;
    this.wcHour.value = `${this.mapHour}:${this.mapMinute} ${this.activeHourHidden}`;
    this.wcMessage.value = this.mapMessage.value;
    this.wcTitle.value = this.mapTitle.value;
    this.wcFont.value = this.activeFont;
    this.wcMapBorder.value = this.activeBorderType;
    this.wcFrameColor.value = this.activeFrameColor;
    this.wcConstellationsInput.value = this.activeContellations;
    this.wcLinesInput.value = this.activeLines;
    this.wcMilkwayInput.value = this.activeMilkway;
    this.wcConstellationsNameInput.value = this.activeConstellationsName;
    this.wcMoonInput.value = this.activeMoon;
    this.wcPdfInput.value = this.activePdf;
    this.wcSvgInput.value = this.activeSvg;
    this.wcSpotifyInput.value = (this.mapSpotify.checked ? this.mapSpotifyValue : '');

    this.currentMapColor = this.activeMapColor.value;
    this.currentMapSku = this.mapSkuValue;

  }

  
  
  
  

  toggleLayout(item) {
    let layout = item.value;
    if (layout === 'Modelo 2') {
      this.previewMapContent.classList.add("-custom");
      this.previewMapBorder.classList.add("hidden");
      this.mapMessage.setAttribute("maxlength", 140);
      this.textareaSizeTotal.innerText = "140";

    } else {
      this.previewMapContent.classList.remove("-custom");
      this.previewMapBorder.classList.remove("hidden");
      this.mapMessage.setAttribute("maxlength", 300);
      this.textareaSizeTotal.innerText = "300";

    }
    
    this.mapMessage.value = "";
    this.previewMessage.innerText = "";
    this.messageSize.innerText = "0";

    this.updateMapMessage(item);
    this.updateMapPreviewImage();
  };

  changeMapColor(color = this.currentMapColor) {
    config.background.fill = color;
    this.currentMapColor = color;
    this.mapWhiteBackgroundInput.parentNode.classList.remove('-disabled');
    this.previewMapContentBlock.style.background = 'transparent';

    if (this.mapWhiteBackgroundInput.checked) {
      this.previewMapContentBlock.style.backgroundColor = "#fff";
      this.previewMapContentBlock.classList.add("-gray-border");
      document.documentElement.style.setProperty("--selection-color", color);
      this.previewMapText.style.color = color;
      this.previewMapInfo.style.color = color;
      this.previewMapInfoTitle.style.borderColor = color;
      // mapCanvas.style.boxShadow = `inset 0 0 0 3px ${color}`;
      this.previewMapCanvas.style.backgroundColor = color;
      this.previewMapContentBlock.classList.add("-bgwhite");
    } else {
      this.previewMapContentBlock.classList.remove("-bgwhite");
      this.previewMapContentBlock.style.backgroundColor = color;
      this.previewMapContentBlock.classList.remove("-gray-border");
      document.documentElement.style.setProperty("--selection-color", "#fff");
      this.previewMapText.style.color = "#fff";
      this.previewMapInfo.style.color = "#fff";
      this.previewMapInfoTitle.style.borderColor = "#fff";
      this.previewMapCanvas.style.backgroundColor = color;
    }

    if (color === 'estrelas-blue' || color === 'estrelas-dark' || color === 'estrelas-aranha-vermelho' || color === 'estrelas-aranha-azul' || color === 'estrelas-namorados-vermelho' || color === 'estrelas-namorados-rosa' || color === 'estrelas-flores-azul' || color === 'estrelas-flores-azul-claro') {
      config.background.fill = 'transparent';
      this.previewMapCanvas.style.backgroundColor = 'transparent';

      if (color === 'estrelas-blue') {
        this.previewMapContentBlock.style.background = `url(${window.THEME_URL}/assets/images/estrelas-blue.jpg) no-repeat center center`;
      } else if (color === 'estrelas-dark') {
        this.previewMapContentBlock.style.background = `url(${window.THEME_URL}/assets/images/estrelas-dark.jpg) no-repeat center center`;
      } else if (color === 'estrelas-aranha-vermelho') {
        this.previewMapContentBlock.style.background = `url(${window.THEME_URL}/assets/images/estrelas-aranha-vermelho.jpg) no-repeat center center`;
      } else if (color === 'estrelas-aranha-azul') {
        this.previewMapContentBlock.style.background = `url(${window.THEME_URL}/assets/images/estrelas-aranha-azul.jpg) no-repeat center center`;
      } else if (color === 'estrelas-namorados-vermelho') {
        this.previewMapContentBlock.style.background = `url(${window.THEME_URL}/assets/images/estrelas-namorados-vermelho.jpg) no-repeat center center`;
      } else if (color === 'estrelas-namorados-rosa') {
        this.previewMapContentBlock.style.background = `url(${window.THEME_URL}/assets/images/estrelas-namorados-rosa.jpg) no-repeat center center`;
        document.documentElement.style.setProperty("--selection-color", "rgb(223,82,118)");
        this.previewMapText.style.color = "rgb(223,82,118)";
        this.previewMapInfo.style.color = "rgb(223,82,118)";
        this.previewMapInfoTitle.style.borderColor = "rgb(223,82,118)";
        this.previewMapCanvas.style.backgroundColor = 'rgb(223,82,118)';
        config.background.fill = 'rgb(223,82,118)';
        this.previewMapCanvas.style.backgroundColor = 'rgb(223,82,118)';
      } else if (color === 'estrelas-flores-azul') {
        this.previewMapContentBlock.style.background = `url(${window.THEME_URL}/assets/images/estrelas-flores-azul.jpg) no-repeat center center`;
      } else if (color === 'estrelas-flores-azul-claro') {
        this.previewMapContentBlock.style.background = `url(${window.THEME_URL}/assets/images/estrelas-flores-azul-claro.jpg) no-repeat center center`;
      }

      this.previewMapContentBlock.style.backgroundSize = '100% 100%';
      this.mapWhiteBackgroundInput.parentNode.classList.add('-disabled');
      if (this.mapWhiteBackgroundInput.checked) {
        this.mapWhiteBackgroundInput.checked = false;
        this.mapWhiteBackgroundInput.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }

    
    this.updateBorderType();
    this.updateSpotifyImage();
  }
  

  updateBorderType() {
    this.mapBorderTypeInput = document.querySelector('[name="border-type"]:checked');
    let borderType = this.mapBorderTypeInput.value;
    let colorText = this.getColorText(this.currentMapColor);

    this.previewMapContentBlock.classList.remove("-bc");
    this.previewMapContentBlock.classList.remove("-border-double");
    this.previewMapContentBlock.classList.remove("-bgwhite");
    this.previewMapContentBlock.dataset.color = colorText;

    if (borderType === 'Dupla') {
      this.previewMapCanvas.style.boxShadow = `none`;
      this.previewMapCanvas.style.backgroundColor = this.currentMapColor;
      if (this.mapWhiteBackgroundInput.checked) {
        this.previewMapContentBlock.classList.add("-bgwhite");
      }
      this.previewMapContentBlock.classList.add("-border-double");
      this.previewMapCanvas.style.boxShadow = `none`;
      this.previewMapCanvas.style.borderColor = "transparent";
    } else if (borderType === 'Simples') {
      this.previewMapCanvas.style.boxShadow = `none`;
      this.previewMapCanvas.style.backgroundColor = this.currentMapColor;
      if (this.mapWhiteBackgroundInput.checked) {
        this.previewMapCanvas.style.border = "5px solid";
        this.previewMapCanvas.style.borderColor = this.currentMapColor;
      } else {
        this.previewMapCanvas.style.border = "5px solid #fff";
      }
    } else {
      this.previewMapCanvas.style.boxShadow = `none`;
      this.previewMapCanvas.style.backgroundColor = this.currentMapColor;
      if (this.mapWhiteBackgroundInput.checked) {
        this.previewMapContentBlock.classList.add("-bgwhite");
      }
      this.previewMapContentBlock.classList.add("-bc");
      this.previewMapCanvas.style.boxShadow = `none`;
      this.previewMapCanvas.style.borderColor = "transparent";
    }

    Celestial.apply(config);
    this.updateStarsPreview();
    this.updateMapPreviewImage();
  }

  createLocationOptions(data) {
    let self = this;
    this.mapLocationsLabel.classList.remove('active');
    this.mapLocationsLabel.innerHTML = "";
    data.forEach((item) => {
      this.latitude = item.geometry.location.lat();
      this.longitude = item.geometry.location.lng();

      let formatedName = item.formatted_address;

      const timezoneName = tzLookup(this.latitude, this.longitude);

      const offsetMinutes = moment.tz(timezoneName).utcOffset();
      const hours = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(2, '0');
      const minutes = String(Math.abs(offsetMinutes) % 60).padStart(2, '0');
      const sign = offsetMinutes >= 0 ? '+' : '-';
      const mapTimezone = `${sign}${hours}${minutes}`;

      this.mapLocationsLabel.innerHTML += `
      <li data-timezone="${mapTimezone}" data-latitude="${this.latitude}" data-longitude="${this.longitude}">
        ${formatedName}
      </li>`;
    });

    setTimeout(() => {
      self.mapLocationsResults = document.querySelectorAll(".locations-results li")
      self.mapLocationsResults.forEach(function (locationResult) {
        locationResult.addEventListener('click', function () {
          self.setMapLocation(this);
        })
      })
      this.mapLocationsInputLabel.classList.remove("-loading");
      this.mapLocationsLabel.classList.add('active');
      this.updateConstructor();
    }, 300);

  }

  getLocations(value) {
    geocoder.geocode({ address: value }, (results, status) => {
      if (status === "OK") {
        this.createLocationOptions(results);
      }
    });
  }

  updateLocationOptionsOnDelay(item) {
    if (this.updateLocationOptions) {
      clearTimeout(this.updateLocationOptions);
    }

    this.updateLocationOptions = setTimeout(() => {
      this.getLocations(item.value).finally(() => {

        this.mapLocationsInputLabel.classList.remove("-loading");
      });
    }, 700);
  };

  setDateByTimeZone(timestamp) {
    let timestampTimezone = Math.abs(this.timezone) * 60 * 60000;

    let realTimestamp;
    if (this.timezone < 0) {
      realTimestamp = timestamp + timestampTimezone;
    } else {
      realTimestamp = timestamp - timestampTimezone;
    }
    this.timestampGlobal = realTimestamp;

    return realTimestamp;
  }

  setNewDate() {
    this.updateConstructor();

    let currentTimestamp = new Date(
      `${this.mapYear}-${this.mapMonth}-${this.mapDay} ${this.mapHour}:${this.mapMinute}:00`.replace(/-/g, "/")
    ).getTime();


    let dateUpdated = new Date(this.setDateByTimeZone(currentTimestamp));


    this.previewDateTime.value = `${dateUpdated.getFullYear()}-${dateUpdated.getMonth() + 1
      }-${dateUpdated.getDate()} ${dateUpdated.getHours()}:${dateUpdated.getMinutes()}:00 ±0000`;

    if (this.hourHided) {
      this.previewDateText.innerText = `${this.mapDay}/${this.mapMonth}/${this.mapYear}`;
    } else {
      this.previewDateText.innerText = `${this.mapDay}/${this.mapMonth}/${this.mapYear} - ${this.mapHour}:${this.mapMinute}`;
    }

    this.updateStarsPreview();
    this.updateMapPreviewImage();
  };

  setMapLocation(item) {
    this.mapLocationsLabel.classList.remove('active');

    let currentLat = item.dataset.latitude;
    let currentLng = item.dataset.longitude;

    this.mapCurrentLocationText.value = item.innerText;
    this.mapTimezone = item.dataset.timezone;
    this.timezone = parseInt(item.dataset.timezone.replace("00", ""));

    this.formLat.value = currentLat;
    this.formLng.value = currentLng;
    this.previewMapTextLat.innerText = `${Number(currentLat).toFixed(4)}°`;
    this.previewMapTextLng.innerText = `${Number(currentLng).toFixed(4)}°`;

    this.wcLat.value = Number(currentLat).toFixed(4);
    this.wcLng.value = Number(currentLng).toFixed(4);

    this.mapMainLocationInput.value = item.innerText;

    this.latitude = Number(currentLat);
    this.longitude = Number(currentLng);

    this.mapLocationsLabel.innerHTML = "";
    this.updateLocationText();
    this.updateStarsPreview();
    this.updateMapPreviewOnText(this);
    this.locationUpdated = true;
  }

  updateStarsPreview() {
      go();
      go();
  }

  updateLocationText() {
    if (this.mapCurrentLocationText.value.replace(/\s+/, '').length === 0) {
      this.mapCurrentLocationText.value = this.mapMainLocationInput.value;
    }
    let currentLocationText = this.mapCurrentLocationText.value;
    let locationTextDefault = this.mapMainLocationInput.value;

    // if (currentLocationText.length === 0) {
    //   this.previewTextAddress.innerText = locationTextDefault;
    //   setTimeout(function () {
    //     if (currentLocationText.length === 0) {
    //       currentLocationText = locationTextDefault;
    //       this.wcLocationText.value = locationTextDefault;
    //     }

    //   }, 3000);
    // } else {
      this.previewTextAddress.innerText = currentLocationText;
      this.wcLocationText.value = currentLocationText;
      this.mapLocationsBlockResults.style.display = "block";
    // }

    this.wcOriginalLocationText.value = locationTextDefault;
  };

  toggleHour() {
    this.setNewDate();
    if (this.hourHided) {
      this.mapHourBlock.classList.add("hidden");
      return;
    }
    this.mapHourBlock.classList.remove("hidden");

    this.updateMapPreviewImage();
  };

  updateAdvancedOptions() {

    if (this.mapLinesInput.checked) {
      config.lines.graticule.opacity = "0.75";
    } else {
      config.lines.graticule.opacity = "0";
    }

    config.planets.show = this.mapMoonInput.checked;
    config.constellations.names = this.mapConstellationsNameInput.checked;
    config.constellations.lines = this.mapContellationsInput.checked;
    config.mw.show = this.mapMilkwayInput.checked;

    Celestial.apply(config);
    this.updateStarsPreview();
    this.updateMapPreviewImage();
  }

  

  

  updatePdfLink() {
    this.updateAddonsValue();

    let layout = this.activeLayout.dataset.pdf;
    let border = (layout == 2 ? 'nao' : this.utils.stringToSlug(this.wcPosterBorderInput.value));
    let borderType = this.utils.stringToSlug(this.activeBorderType);
    let date = this.wcDate.value;
    let hour = this.activeHourHidden ? '' : this.wcHour.value;
    let font = this.wcFont.value;
    let lat = Number(this.latitude).toFixed(4);
    let lng = Number(this.longitude).toFixed(4);
    let locationText = this.wcLocationText.value;
    let white = this.utils.stringToSlug(this.wcWhiteBg.value);
    let posterColor = this.currentMapColor;
    let text = this.wcMessage.value;
    let title = this.wcTitle.value
    let sku = this.utils.stringToSlug(this.currentMapSku);
    let spotify = this.mapSpotify.checked ? this.mapSpotifyValue : '';

    text = text
      .replace(/&/g, "commercial-e")
      .replace(/%/g, "icon-percent")
      .replace(/\+/g, "icon-plus")
      .replace(/</g, "icon-minor");
    title = title
      .replace(/&/g, "commercial-e")
      .replace(/%/g, "icon-percent")
      .replace(/\+/g, "icon-plus")
      .replace(/</g, "icon-minor");

    locationText = locationText.replace(/&/g, "commercial-e").replace(/\+/g, "icon-plus");
    let linkUrl = `/pdf/?product=stars&layout=${layout}&border=${border}&border_type=${borderType}&date=${date}&hour=${hour}&font=${font}&lat=${lat}&lng=${lng}&location=${locationText}&white=${white}&poster_color=${posterColor}&text=${text}&title=${title}&sku=${sku}&spotify=${spotify}`;
    linkUrl = encodeURI(linkUrl);
    linkUrl = linkUrl
      .replace(/%0A/g, "enter-space")
      .replace(/%20/g, "normal-space")
      .replace(/%22/g, "double-quotes")
      .replace(/:/g, "double-dots");

    this.wcPdfInput.value = linkUrl;
  }

  updateMapConfig(generatePDF) {
    this.updatePdfLink();

    let actualWidth = 1000;
    let actualHeight = 1125;
    config.background.width = 0.4;
    config.constellations.linestyle.width = 1.6;
    config.lines.graticule.width = 0.4;
    config.stars.data = "stars.8.json";
    config.stars.size = 0.006 * actualWidth;
    config.stars.size = 4;
    config.stars.limit = 7;
    if (this.mapLinesInput.checked) {
      config.lines.graticule.opacity = "0.75";
    }

    (config.width = actualWidth * 0.75),
    (config.mapShift = [actualWidth * 0.125, actualHeight * 0.09]),
    Celestial.apply(config);
    go();

    handleMapLoading(45);
    setTimeout(function () {
      if (generatePDF) {
        saveSVG(this.currentMapColor, generatePDF);
      } else {
        saveSVG(this.currentMapColor);
      }
    }, 2000);
  };


  handleBuy(generatePDF) {
    this.updateAddonsValue();
    let emailPlaceHolder = document.querySelector('.rd-email-placeholder');
    let RDEmailPlaceHolder = document.querySelector('#rd-email-field');

    let submited = false;
    if (!this.mapMainLocationInput.value && !generatePDF || !this.locationUpdated && !generatePDF) {
      alert('Necessário adicionar a localização');
      document.querySelector('.control-panel-trigger[data-target="2"]').click();
      this.mapMainLocationInput.focus();
      return;
    }
    if (!emailPlaceHolder.value && !generatePDF) {
      alert('Necessário confirmar o e-mail');
      emailPlaceHolder.focus();
      return;
    }

    handleMapLoading(10);

    // if (!document.querySelector('.wpcf7-form[data-status="sent"]')) {

      localStorage.setItem('useremail', emailPlaceHolder.value);

      // RDEmailPlaceHolder.value = emailPlaceHolder.value;

      // document.getElementById('rd-email-field-submit').click();
    // }

    // setInterval(() => {
      // if (document.querySelector('.wpcf7-form[data-status="sent"]') && !submited) {
      //   submited = true;
        this.updateMapConfig(generatePDF)
        handleMapLoading(25);
      // }
    // }, 500)
  }
  
}

if (document.getElementById('mde-page')) {
  const mapaDasEstrelas = new MapaDasEstrelas();
}