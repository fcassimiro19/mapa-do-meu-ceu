import { ProductMapUtils } from './_map-utils';
import { $ } from 'jquery';

class MapaDosPlanetas extends ProductMapUtils {
  constructor() {
    super();
    this.buyButton = document.querySelector('#buyButton'),
      this.generatePdfButton = document.querySelector('#generatePdf'),
      this.isMapPage = document.getElementById('custom-map-page'),
      this.currentMapColor = "rgb(0,0,0)",
      this.currentMapType = 538,
      this.corMoldura = "black",
      this.currentMapSku = "A3",

      this.previewMapContent = document.querySelector(".map-content"),
      this.previewMapContentBlock = document.querySelector(".map-content-scaled"),
      this.previewMapBorder = document.querySelector(".map-border-block"),



      this.mapLayoutTrigger = document.querySelectorAll('.layout-trigger'),
      this.mapIlustrationTrigger = document.querySelectorAll('.ilustration-group input'),
      this.mapColor = document.querySelectorAll('[name="map-color"]'),
      this.mapCustomColor = document.getElementById('custom-color'),
      this.mapCustomColorTrigger = document.getElementById('custom-color-trigger'),
      this.mapWhiteBackgroundInput = document.querySelector('[name="white-bg"]'),
      this.mapBorder = document.getElementById("map-border"),
      this.mapBorderTypeInput = document.querySelector('[name="border-type"]:checked'),
      this.mapBorderType = document.querySelectorAll('[name="border-type"]'),
      this.mapFrameColor = document.querySelectorAll('[name="map-frame-color"]'),
      this.mapDay = document.getElementById("date-day").value.padStart(2, '0'),
      this.mapMonth = document.getElementById("date-month").value.padStart(2, '0'),
      this.mapYear = document.getElementById("date-year").value,
      this.mapDateTrigger = document.querySelectorAll('.date-trigger'),
      this.mapSpotify = document.querySelector('[name="spotify"]'),
      this.mapSpotifyValue = document.getElementById('spotify-url')?.value,


      this.activeLayout = document.querySelector('[name="layout"]:checked'),
      this.activeIlustrationSvg = document.querySelector('input[name="ilustration"]:checked + label svg'),
      this.activeMapColor = document.querySelector('[name="map-color"]:checked'),
      this.activeMapBorder = document.querySelector('[name="map-border"]').checked ? "Sim" : "Não",
      this.activeFont = document.querySelector('[name="font-family"]:checked').value,
      this.activeFrameColor = document.querySelector('[name="map-frame-color"]:checked').value,
      this.activePdf = '',
      this.activeSvg = '',

      this.wcDesign = document.querySelector(".wc-pao-addon-design-do-mapa input"),
      this.wcPosterColor = document.querySelector(".wc-pao-addon-cor-do-poster input"),
      this.wcPosterBorderInput = document.querySelector(".wc-pao-addon-borda-do-poster input"),
      this.wcFont = document.querySelector(".wc-pao-addon-fonte input"),
      this.wcDate = document.querySelector(".wc-pao-addon-data input"),
      this.wcMapBorder = document.querySelector(".wc-pao-addon-borda-do-mapa input"),

      this.wcFrameColor = document.querySelector(".wc-pao-addon-cor-da-moldura input"),
      this.wcPdfInput = document.querySelector(".wc-pao-addon-link-do-pdf input"),
      this.wcSvgInput = document.querySelector(".wc-pao-addon-link-do-svg input"),
      this.wcSpotifyInput = document.querySelector(".wc-pao-addon-qr-code-spotify input");


    this.init();
  }

  init() {
    if (!this.isMapPage) return;

    document.querySelector('html').classList.add('map-page')

    this.initListeners();
    this.updateSvgImage();
  }

  initListeners() {
    const self = this;

    self.buyButton.addEventListener('click', function () {
      self.handleBuy();
    })

    if (self.generatePdfButton) {
      self.generatePdfButton.addEventListener('click', function () {
        self.handleBuy(true);
      })
    }

    self.mapLayoutTrigger.forEach(item => {
      item.addEventListener('change', function () {
        self.toggleLayout(this);
      })
    })
    self.mapIlustrationTrigger.forEach(item => {
      item.addEventListener('change', function () {
        self.activeIlustrationSvg = document.querySelector('input[name="ilustration"]:checked + label svg');
        self.updateIlustration();
      })
    })

    self.mapColor.forEach(item => {
      item.addEventListener('change', function () {
        self.changeMapColor(this.value);
      })
    })

    self.mapDateTrigger.forEach(item => {
      item.addEventListener('change', () => {
        self.setNewDate();
      })
    })
  }

  updateIlustration() {
    const clonedNode = this.activeIlustrationSvg.cloneNode(true);
    console.log(clonedNode);
    document.querySelector(".map-content-scaled").innerHTML = '';
    document.querySelector(".map-content-scaled").appendChild(clonedNode)
  }

  updateConstructor() {
    this.mapDay = document.getElementById("date-day").value.padStart(2, '0');
    this.mapMonth = document.getElementById("date-month").value.padStart(2, '0');
    this.mapYear = document.getElementById("date-year").value;
  }

  updateConstructorActiveItems() {
    this.activeLayout = document.querySelector('[name="layout"]:checked');
    this.activeMapColor = document.querySelector('[name="map-color"]:checked');
    this.activeMapBorder = document.querySelector('[name="map-border"]').checked ? "Sim" : "Não";
    this.activeFont = document.querySelector('[name="font-family"]:checked').value;
    this.activeFrameColor = (document.querySelector('[name="map-size"]:checked').value.includes('Com') ? document.querySelector('[name="map-frame-color"]:checked').value : '');
    this.mapSpotify = document.querySelector('[name="spotify"]');
    this.mapSpotifyValue = document.getElementById('spotify-url').value;

  }

  updateSvgImage() {
    this.updateAddonsValue();
    document.querySelectorAll('img.svg').forEach((img) => {
      var imgID = img.id;
      var imgClass = img.className;
      var imgURL = img.src;

      fetch(imgURL).then((response) => {
        return response.text();
      }).then((text) => {

        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(text, "text/xml");

        // Get the SVG tag, ignore the rest
        var svg = xmlDoc.getElementsByTagName('svg')[0];

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
          svg.setAttribute('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
          svg.setAttribute('class', imgClass + ' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        svg.removeAttribute('xmlns:a');

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
          svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
        }

        // Replace image with new SVG
        img.parentNode.replaceChild(svg, img);

        this.activeIlustrationSvg = svg;
      });

      
    });
  }

  updateAddonsValue() {
    this.updateConstructorActiveItems();

    this.wcDesign.value = this.activeLayout.value;
    this.wcPosterColor.value = this.activeMapColor.dataset.colorname;
    this.wcPosterBorderInput.value = (this.activeLayout.dataset.pdf == 3 ? 'Não' : this.activeMapBorder);
    this.wcMessage.value = this.mapMessage.value;
    this.wcTitle.value = this.mapTitle.value;
    this.wcFont.value = this.activeFont;
    this.wcFrameColor.value = this.activeFrameColor;
    this.wcPdfInput.value = this.activePdf;
    this.wcSvgInput.value = this.activeSvg;
    this.wcSpotifyInput.value = (this.mapSpotify.checked ? this.mapSpotifyValue : '');

    this.currentMapColor = this.activeMapColor.value;
    this.currentMapSku = this.mapSkuValue;
  }

  updatePendentOrderImage(imagePath) {
    // let pendentImage = document.querySelector(".wc-pao-addon-link-do-svg input");
    // pendentImage.value = imagePath;
  }


  toggleLayout(item) {
    let layout = item.value;
    if (layout === 'Modelo 3') {
      this.previewMapContent.classList.remove("-custom2");
      this.previewMapContent.classList.add("-custom");
      this.previewMapBorder.classList.add("hidden");
      this.mapMessage.setAttribute("maxlength", 140);
      this.textareaSizeTotal.innerText = "140";

    } else if (layout === 'Modelo 2') {
      this.previewMapContent.classList.remove("-custom");
      this.previewMapContent.classList.add("-custom2");
      this.previewMapBorder.classList.remove("hidden");
      this.mapMessage.setAttribute("maxlength", 300);
      this.textareaSizeTotal.innerText = "300";

    } else {
      this.previewMapContent.classList.remove("-custom");
      this.previewMapContent.classList.remove("-custom2");
      this.previewMapBorder.classList.remove("hidden");
      this.mapMessage.setAttribute("maxlength", 300);
      this.textareaSizeTotal.innerText = "300";

    }
    this.mapMessage.value = "";
    this.previewMessage.innerText = "";
    this.messageSize.innerText = "0";

    this.updateMapMessage(item);
  };


  changeMapColor(color = this.currentMapColor) {
    this.currentMapColor = color;

    if (color === 'rgb(255,255,255)') {

      this.previewMapContentBlock.style.backgroundColor = this.currentMapColor;
      this.previewMapContentBlock.classList.add("-gray-border");
      document.documentElement.style.setProperty("--selection-color", '#000');
      this.previewMapText.style.color = '#000';
      this.previewMapInfo.style.color = '#000';
      this.previewMapInfoTitle.style.borderColor = '#000';

    } else {
      this.previewMapContentBlock.style.backgroundColor = this.currentMapColor;
      this.previewMapContentBlock.classList.remove("-gray-border");
      document.documentElement.style.setProperty("--selection-color", "#fff");
      this.previewMapText.style.color = "#fff";
      this.previewMapInfo.style.color = "#fff";
      this.previewMapInfoTitle.style.borderColor = "#fff";
    }

    // this.previewMapContentBlock.dataset.colorhex = this.activeMapColor.dataset.colorhex;
    // this.previewMapContentBlock.dataset.colorhex = `${color === 'rgb(255,255,255)' ? 'ffffff' : ''}`;
    this.updateSpotifyImage();

    // setTimeout(() => {
    //   this.updateMapPreviewImage();
    // }, 50)
  }

  handleBuy(generatePDF) {
    this.updateAddonsValue();
    let emailPlaceHolder = document.querySelector('.rd-email-placeholder');
    let RDEmailPlaceHolder = document.querySelector('#rd-email-field');

    let submited = false;

    if (!emailPlaceHolder.value && !generatePDF) {
      alert('Necessário confirmar o e-mail');
      emailPlaceHolder.focus();
      return;
    }

    handleMapLoading(10);

    // if (!document.querySelector('.wpcf7-form[data-status="sent"]')) {

      localStorage.setItem('useremail', emailPlaceHolder.value);

      // RDEmailPlaceHolder.value = emailPlaceHolder.value;

    //   document.getElementById('rd-email-field-submit').click();
    // }

    // setInterval(() => {
      // if (document.querySelector('.wpcf7-form[data-status="sent"]') && !submited) {
        // submited = true;
        this.sendImageToServer(generatePDF)
        handleMapLoading(25);
      // }
    // }, 500)
  }


  updatePdfLink() {
    this.updateAddonsValue();

    let layout = this.activeLayout.dataset.pdf;
    let border = (layout == 3 ? 'nao' : this.utils.stringToSlug(this.wcPosterBorderInput.value));
    let font = this.wcFont.value;
    let posterColor = this.currentMapColor;
    let text = this.wcMessage.value;
    let title = this.wcTitle.value
    let sku = this.utils.stringToSlug(this.currentMapSku);
    let spotify = this.mapSpotify.checked ? this.mapSpotifyValue : '';


    let titleEl = document.querySelector('.map-info .-title');
    let doubleLine = '&double_line='
    if (titleEl.offsetHeight > 20) {
      doubleLine = '&double_line=true';
    }

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
    let linkUrl = `/pdf/?product=planets&layout=${layout}&border=${border}&font=${font}&poster_color=${posterColor}&text=${text}&title=${title}&sku=${sku}${doubleLine}&spotify=${spotify}`;
    linkUrl = encodeURI(linkUrl);
    linkUrl = linkUrl
      .replace(/%0A/g, "enter-space")
      .replace(/%20/g, "normal-space")
      .replace(/%22/g, "double-quotes")
      .replace(/:/g, "double-dots");

    this.wcPdfInput.value = linkUrl;
  }




  sendImageToServer(generatePDF) {
    this.updatePdfLink();


    let linkFormated;
    let fullLink = `${this.wcPdfInput.value}&img=${photoName}`;
    linkFormated = fullLink.replace(/enter-space/g, '%0A').replace(/normal-space/g, '%20').replace(/double-quotes/g, '%22').replace(/double-dots/g, ':').replace(/#/g, 'icon-hash').replace(/★/g, 'icon-black-star').replace(/✪/g, 'icon-round-star').replace(/✮/g, 'icon-mixed-star').replace(/✩/g, 'icon-light-star').replace(/❤/g, 'icon-black-hearth').replace(/♥/g, 'icon-black-hearth').replace(/♡/g, 'icon-transparent-hearth').replace(/♫/g, 'icon-music');
    this.wcPdfInput.value = fullLink;

    handleMapLoading(45);

    if (generatePDF) {
      // window.open(
      //   `http://${location.hostname}${linkFormated}&order_id=`,
      //   '_blank'
      // );
      // location.reload();

      location.href = `http://${location.hostname}${linkFormated}&order_id=`;
    } else {
      console.log(photoName);
      handleMapLoading(100);
      document.querySelector('.single_add_to_cart_button').click();
    }
  };
}

if (document.getElementById('custom-map-page')) {
  const mapaDosPlanetas = new MapaDosPlanetas();
}