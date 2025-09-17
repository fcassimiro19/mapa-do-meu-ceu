import { ProductMapUtils } from './_map-utils';
import { $ } from 'jquery';

class ZodiacKidsMap extends ProductMapUtils {
  constructor() {
    super();
    this.buyButton = document.querySelector('#buyButton'),
      this.generatePdfButton = document.querySelector('#generatePdf'),
      this.isMapPage = document.getElementById('signos-kids-map-page'),
      this.currentMapColor = "rgb(0,0,0)",
      this.currentMapType = 538,
      this.corMoldura = "black",
      this.currentMapSku = "A3",

      this.previewMapContent = document.querySelector(".map-content"),
      this.previewMapContentBlock = document.querySelector(".map-content-scaled"),
      this.previewMapZodiacText = document.querySelector(".text-signo"),
      this.previewMapZodiacInfo = document.querySelector(".text-signo-info"),
      this.previewMapZodiacDate = document.querySelector(".text-signo-data"),

      this.mapColor = document.querySelectorAll('[name="map-color"]'),
      this.mapFrameColor = document.querySelectorAll('[name="map-frame-color"]'),
      this.mapIlustration = document.querySelectorAll('input[name="ilustration"]'),
      this.mapEstilo = document.querySelectorAll('input[name="estilo"]'),
      this.mapIlustrationElement = document.querySelector('#map-planet-simulator img'),
      this.mapIlustrationSection = document.querySelector('.ilustration-section'),
      this.mapBgStars = document.querySelector('input[name="fundo"]'),
      this.mapBgStarsKids = document.querySelectorAll('input[name="fundo-kids"]'),
      this.mapCustomDate = document.getElementById('customDateValue'),

      this.activeMapColor = document.querySelector('[name="map-color"]:checked'),
      this.activeFont = document.querySelector('[name="font-family"]:checked').value,
      this.activeFrameColor = document.querySelector('[name="map-frame-color"]:checked').value,
      this.activeBgColor = document.querySelector('[name="map-color"]:checked').dataset.bgColor,
      this.activeImageColor = document.querySelector('[name="map-color"]:checked').dataset.imageColor,
      this.activeBlockColor = document.querySelector('[name="map-color"]:checked').value,
      this.activeCustomDate = document.querySelector('[name="custom-date"]'),
      this.ilustrationType = document.querySelector('input[name="estilo"]:checked').value,
      this.activeBgStars = this.mapBgStars.checked ? "Sim" : "Não",
      this.activeBgStarsValue = 'bg-stars-kids-1';
      this.activeIlustration = 'capricornio',
      this.activeIlustrationTexto = 'Capricórnio',
      this.activeIlustrationInfo = 'ENERGETIC • OUTGOING • SELF-ASSURED',
      this.activeIlustrationDate = 'Dez 22 - Jan 20',
      this.activePdf = '',
      this.activeSvg = '',

      this.wcMapStyle = document.querySelector(".wc-pao-addon-estilo input"),
      this.wcIlustration = document.querySelector(".wc-pao-addon-ilustracao input"),
      this.wcFrameColor = document.querySelector(".wc-pao-addon-cor-da-moldura input"),
      this.wcPosterColor = document.querySelector(".wc-pao-addon-cor-do-poster input"),
      this.wcFont = document.querySelector(".wc-pao-addon-fonte input"),
      this.wcDate = document.querySelector(".wc-pao-addon-data input"),
      this.wcSvgInput = document.querySelector(".wc-pao-addon-link-do-svg input"),
      this.wcPdfInput = document.querySelector(".wc-pao-addon-link-do-pdf input"),
      this.wcBgStarsInput = document.querySelector(".wc-pao-addon-fundo-de-estrelas input"),

      this.mapCharacteristics = [
        {
          name: 'Áries',
          characteristics: 'CORAJOSO • ENTUSIASTA • COMPETITIVO'
        },
        {
          name: 'Touro',
          characteristics: 'DETERMINADO • PRODUTIVO • PACIENTE'
        },
        {
          name: 'Gêmeos',
          characteristics: 'COMUNICATIVO • CURIOSO • ADAPTÁVEL'
        },
        {
          name: 'Câncer',
          characteristics: 'AFETIVO • SENSÍVEL • PROTETOR'
        },
        {
          name: 'Leão',
          characteristics: 'FORTE • ALEGRE • VAIDOSO'
        },
        {
          name: 'Virgem',
          characteristics: 'PRÁTICO • OBSERVADOR • ORGANIZADO'
        },
        {
          name: 'Libra',
          characteristics: 'DIPLOMÁTICO • ESTÉTICO • INDECISO'
        },
        {
          name: 'Escorpião',
          characteristics: 'SEDUTOR • INTENSO • ESTRATÉGICO'
        },
        {
          name: 'Sagitário',
          characteristics: 'OTIMISTA • DESBRAVADOR • IDEALIZADOR'
        },
        {
          name: 'Capricórnio',
          characteristics: 'DISCIPLINADO • AMBICIOSO • DETERMINADO'
        },
        {
          name: 'Aquário',
          characteristics: 'COOPERATIVO • INOVADOR • SOCIÁVEL'
        },
        {
          name: 'Peixes',
          characteristics: 'INTUITIVO • SONHADOR • RECEPTIVO'
        },
      ],

      this.mapActiveCharacteristic = 'DISCIPLINADO • AMBICIOSO • DETERMINADO',

      this.init();
  }

  init() {
    if (!this.isMapPage) return;

    document.querySelector('html').classList.add('map-page')

    this.initListeners();
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

    self.mapColor.forEach(item => {
      item.addEventListener('change', function () {
        self.changeMapColor();
      })
    })

    self.mapIlustration.forEach(item => {
      item.addEventListener('change', function () {
        self.activeIlustrationText = this.dataset.texto;
        self.activeIlustrationInfo = this.dataset.info;

        self.activeIlustrationTexto = this.dataset.texto;
        self.previewMapZodiacText.innerText = this.dataset.texto;
        self.previewMapZodiacInfo.innerText = this.dataset.info;
        self.updateCustomDate();


        self.ilustrationType = this.dataset.ilustrationType;

        self.activeIlustration = this.value;

        self.mapIlustrationElement.src = `${location.origin}/wp-content/themes/mdmc/assets/images/signos/${self.ilustrationType}-kids-${self.activeIlustration}.png`
        self.updateActiveCharacteristic();
      })
    })

    self.mapEstilo.forEach(item => {
      item.addEventListener('change', function () {
        self.mapIlustrationSection.dataset.ilustration = this.value;
        document.querySelector(`.-ilustration-${this.value} input[value="${self.activeIlustration}"]`).click();

      })
    })

    self.mapBgStars.addEventListener('change', function () {
      self.toggleBgStars();
    })

    self.mapBgStarsKids.forEach(item => {

      item.addEventListener('change', function () {
        console.log('change')
        self.toggleBgStars();
      })
    })

    self.activeCustomDate.addEventListener('change', function () {
      self.updateCustomDate();
    })

    self.mapCustomDate.addEventListener('keyup', function() {
      self.updateCustomDate();
    })

  }

  updateCustomDate() {
    const customDateInput = document.getElementById('customDateValue');
    const ilustrationActive = document.querySelector('[name="ilustration"]:checked').dataset.date;
    if (!this.activeCustomDate.checked || !customDateInput.value) {
      this.previewMapZodiacDate.innerText = ilustrationActive;
      this.activeIlustrationDate = ilustrationActive;
      this.wcDate.value = ilustrationActive;
    } else {
      this.previewMapZodiacDate.innerText = customDateInput.value;
      this.activeIlustrationDate = customDateInput.value;
      this.wcDate.value = customDateInput.value;
    }
  }

  updateActiveCharacteristic() {
    const currentActive = this.mapCharacteristics.filter(item => item.name === this.activeIlustrationTexto);
    this.mapActiveCharacteristic = currentActive[0].characteristics;

    this.previewMapZodiacInfo.innerText = this.mapActiveCharacteristic;
  }

  updateConstructorActiveItems() {
    this.ilustrationType = document.querySelector('input[name="estilo"]:checked').value;
    this.activeMapColor = document.querySelector('[name="map-color"]:checked');
    this.activeFont = document.querySelector('[name="font-family"]:checked').value;
    this.activeFrameColor = (document.querySelector('[name="map-size"]:checked').value.includes('Com') ? document.querySelector('[name="map-frame-color"]:checked').value : '');
    this.activeBgStars = this.mapBgStars.checked;

  }

  updateAddonsValue() {
    this.updateConstructorActiveItems();
    this.updateCustomDate();
 

    this.wcMapStyle.value = this.ilustrationType;
    this.wcIlustration.value = this.mapIlustrationSection.querySelector('input:checked').value;
    this.wcPosterColor.value = this.activeMapColor.value;
    this.wcFont.value = this.activeFont;
    this.wcFrameColor.value = this.activeFrameColor;
    this.wcPdfInput.value = this.activePdf;
    this.wcSvgInput.value = this.activeSvg;
    this.wcBgStarsInput.value = this.mapBgStars.checked ? this.activeBgStarsValue : 'Não';

    this.currentMapColor = this.activeMapColor.value;
    this.currentMapSku = this.mapSkuValue;
  }

  changeMapColor() {
    this.activeBgColor = document.querySelector('[name="map-color"]:checked').dataset.bgColor;
    this.activeImageColor = document.querySelector('[name="map-color"]:checked').dataset.imageColor;
    this.activeBlockColor = document.querySelector('[name="map-color"]:checked').value;

    this.previewMapContent.dataset.bg = this.activeBlockColor;
    this.previewMapContentBlock.getElementsByClassName.backgroundColor = `#${this.activeBgColor}`;
    this.mapIlustrationElement.src = `${location.origin}/wp-content/themes/mdmc/assets/images/signos/${this.ilustrationType}-kids-${this.activeIlustration}.png`
  }

  handleBuy(generatePDF) {
    this.updateAddonsValue();
    this.updatePdfLink();
    let emailPlaceHolder = document.querySelector('.rd-email-placeholder');
    let RDEmailPlaceHolder = document.querySelector('#rd-email-field');

    let submited = false;

    if (!emailPlaceHolder.value && !generatePDF) {
      alert('Necessário confirmar o e-mail');
      emailPlaceHolder.focus();
      return;
    }

    handleMapLoading(45);

    // if (!document.querySelector('.wpcf7-form[data-status="sent"]')) {

    localStorage.setItem('useremail', emailPlaceHolder.value);

    RDEmailPlaceHolder.value = emailPlaceHolder.value;

    //   document.getElementById('rd-email-field-submit').click();
    // }
    let linkFormated;
    let fullLink = `${this.wcPdfInput.value}`;
    linkFormated = fullLink.replace(/enter-space/g, '%0A').replace(/normal-space/g, '%20').replace(/double-quotes/g, '%22').replace(/double-dots/g, ':').replace(/#/g, 'icon-hash').replace(/★/g, 'icon-black-star').replace(/✪/g, 'icon-round-star').replace(/✮/g, 'icon-mixed-star').replace(/✩/g, 'icon-light-star').replace(/❤/g, 'icon-black-hearth').replace(/♥/g, 'icon-black-hearth').replace(/♡/g, 'icon-transparent-hearth').replace(/♫/g, 'icon-music');
    this.wcPdfInput.value = fullLink;

    if (generatePDF) {
      location.href = `http://${location.hostname}${linkFormated}&order_id=`;
    } else {
      handleMapLoading(100);
      document.querySelector('.single_add_to_cart_button').click();
    }

    // setInterval(() => {
    // if (document.querySelector('.wpcf7-form[data-status="sent"]') && !submited) {
    // submited = true;

    // }
    // }, 500)
  } 

  toggleBgStars() {
    this.activeBgStarsValue = document.querySelector('[name="fundo-kids"]:checked').value;
    console.log(this.activeBgStarsValue)
    
    if (this.mapBgStars.checked) {
      this.previewMapContent.classList.add('-bg-stars-kids');
      this.previewMapContent.dataset.activeBgStars = this.activeBgStarsValue;
    } else {
      this.previewMapContent.classList.remove('-bg-stars-kids');
      this.previewMapContent.dataset.activeBgStars = '';
    }

    this.changeMapColor();
  }


  updatePdfLink() {
    this.updateAddonsValue();

    let ilustration = this.wcIlustration.value;
    let ilustrationType = this.wcMapStyle.value;
    let font = this.wcFont.value;
    let bgstars = this.wcBgStarsInput.value;
    let posterColor = this.currentMapColor;
    let imageColor = this.activeImageColor;
    let sku = this.utils.stringToSlug(this.currentMapSku);
    let ilustationDate = this.wcDate.value;

    let text = this.wcMessage.value;

    let linkUrl = `/pdf/?product=signos&font=${font}&bgstars=${bgstars}&ilustration=${ilustration}&ilustration_type=${ilustrationType}&poster_color=${posterColor}&text=${text}&date=${ilustationDate}&image_color=${imageColor}&kids=true&sku=${sku}`;
    linkUrl = encodeURI(linkUrl);
    text = text
      .replace(/&/g, "commercial-e")
      .replace(/%/g, "icon-percent")
      .replace(/\+/g, "icon-plus")
      .replace(/</g, "icon-minor");
    linkUrl = linkUrl
      .replace(/%0A/g, "enter-space")
      .replace(/%20/g, "normal-space")
      .replace(/%22/g, "double-quotes")
      .replace(/:/g, "double-dots");

    this.wcPdfInput.value = linkUrl;
  }


  dataURLtoBlob(dataURL) {
    var array, binary, i;
    binary = atob(dataURL.split(',')[1]);
    array = [];
    i = 0;
    while (i < binary.length) {
      array.push(binary.charCodeAt(i));
      i++;
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/png'
    });
  };

}

if (document.getElementById('signos-kids-map-page')) {
  const zodiacKidsMap = new ZodiacKidsMap();
}