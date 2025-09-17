import { Utils, mqMax } from '../utils/general';

class ProductMapUtils {
  constructor() {
      this.mapTitle = document.getElementById("title"),
      this.mapMessage = document.getElementById('message'),
      this.mapSizeInputs = document.querySelectorAll('input[name="map-size"]'),
      this.mapSkuValue = document.querySelector('input[name="map-size"]:checked').value,
      this.mapFont = document.querySelectorAll('[name="font-family"]'),
      this.mapBorder = document.getElementById("map-border"),
      this.mapSpotify = document.querySelector('[name="spotify"]'),
      this.mapSpotifyInput = document.getElementById('spotify-url'),
      this.mapSpotifyValue = document.getElementById('spotify-url')?.value,
      this.mapSpotifyImageBlock = document.querySelector('.map-spotify-qrcode'),
      this.mapSpotifyImage = document.querySelector('.map-spotify-qrcode img'),
      this.mapFrameColor = document.querySelectorAll('[name="map-frame-color"]'),

      this.mapPricePlaceholder = document.getElementById("current-price"),
      this.mapInstallmentsPlaceholder = document.querySelector('.price-installments'), 

      this.previewBlockElement = document.getElementById('preview'),
      this.previewTitle = document.querySelector(".map-info .-title"),
      this.previewMessage = document.querySelector(".map-text .preview-message"),
      this.previewMapContent = document.querySelector(".map-content"),
      this.previewMapContentBlock = document.querySelector(".map-content-scaled"),
      this.previewMapText = document.querySelector(".map-content .map-text"),
      this.previewMapInfo = document.querySelector(".map-content .map-info"),
      this.previewMapInfoTitle = document.querySelector(".map-content .map-info .-title"),
      this.previewMapCanvas = document.querySelector(".map-content-scaled canvas"),
      
      this.wcTitle = document.querySelector(".wc-pao-addon-titulo input")
      this.wcMessage = document.querySelector(".wc-pao-addon-mensagem textarea"),
      this.wcSvgInput = document.querySelector(".wc-pao-addon-link-do-svg input"),
      this.wcSpotifyInput = document.querySelector(".wc-pao-addon-qr-code-spotify input"),

      this.formPrice = '',
      this.formMapSize = document.getElementById('formato'),
      
      this.messageSize = document.getElementById("textarea-size"),
      this.titleSize = document.getElementById("title-size"),
      this.textareaSizeTotal = document.querySelector(".textarea-size-total"),
      
      this.mapZoomBlock = document.querySelector('div[data-modal="map-zoom"] .modal-block'),
      this.mapZoomBlockTrigger = document.querySelector('i[data-target="map-zoom"]'),
        this.regex = "1%234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMáÁãÃàÀâÂäÄéÉèÈêÊëËíÍìÌîÎïÏóÓõÕòÒôÔöÖúÚùÙûÛüÜçÇ,~˜°.!?;:'“‘\"$-+{}[]()_=@#^&<>/★✩✮✪ ❤♥♡♫\n\r",
      this.lines = 1,
        this.allowedLines = document.querySelector('#signos-kids-map-page') ? 4 : 11,

      this.controlPanel = document.querySelector('.control-panel-items'),
      this.selectItemElements = document.querySelectorAll('.control-panel-items select'),

      this.utils = new Utils();


      this.initMapUtils();
  }

  initMapUtils() { 
    this.initMapUtilsListeners()
    this.updatePrice();
    setTimeout(() => {
      if (document.getElementById('date-day')) {
        this.setDefaultSelectValue();
      }
    }, 500)
  };

  modalMapZoom() {
    this.mapZoomBlockTrigger.addEventListener('click', () => {
      let preview = document.getElementById('preview');
      let mapSnapshotBlock = document.getElementById('mapSnapshotBlock');

      if (document.querySelector('div[data-modal="map-zoom"] .modal-block #mapSnapshotBlock')) {

        preview.appendChild(mapSnapshotBlock)
      } else {
        this.mapZoomBlock.appendChild(mapSnapshotBlock)

      }

    })
  }

  setDefaultSelectValue() {
    console.log('updating')
    document.getElementById('date-day').options[0].selected = true; //01
    document.getElementById('date-month').options[0].selected = true; //janeiro
    document.getElementById('date-year').options[421].selected = true; //2021
    if (document.getElementById('time-hour')) {
      document.getElementById('time-hour').options[22].selected = true; //22
    }
    if (document.getElementById('time-minute')) {
      document.getElementById('time-minute').options[0].selected = true; //00
    }
    document.getElementById('message').value = '';
  }

  updateMapUtilsConstructor() {
    this.mapSkuValue = document.querySelector('input[name="map-size"]:checked').value;
    this.formPrice = document.querySelector("form.cart .woocommerce-Price-amount");
    this.mapSnapshotBlock = document.getElementById('mapSnapshotBlock');
    this.mapSpotifyValue = document.getElementById('spotify-url')?.value;
  }

  initMapUtilsListeners() {
    const self = this;
    self.mapMessage.addEventListener('keyup', function () {
      self.updateMapMessage(this);
    })

    self.mapMessage.addEventListener('blur', function () {
      self.updateMapPreviewOnText(self);
    })

    self.mapTitle.addEventListener('keyup', function () {
      self.updateMapTitle(this);
    })
    self.mapTitle.addEventListener('blur', function () {
      self.updateMapPreviewOnText(self);
    })

    self.mapSizeInputs.forEach(function(item) {
      item.addEventListener('change', function() {
        let mapSnapshotBlock = document.getElementById('mapSnapshotBlock');

        if (mapSnapshotBlock.classList.contains('-pdf') && (!this.value === 'PDF' || !this.value.includes('Sem Moldura'))) {
          mapSnapshotBlock.classList.remove('-pdf');
          self.controlPanel.classList.remove('-pdf');
          // self.updateMapPreviewImage();
        }

        console.log("TCL: ProductMapUtils -> initMapUtilsListeners -> this.value", this.value)
        
        if(this.value === 'PDF' || this.value.includes('Sem Moldura')) {
          mapSnapshotBlock.classList.add('-pdf');
          self.controlPanel.classList.add('-pdf');
          // self.updateMapPreviewImage();
        } 
        
        if(this.value === 'Azulejo') {
          mapSnapshotBlock.classList.add('-azulejo');
          self.controlPanel.classList.add('-azulejo');
          // self.updateMapPreviewImage();
        } else {
          mapSnapshotBlock.classList.remove('-azulejo');
          self.controlPanel.classList.remove('-azulejo');
        }
        
        console.log("TCL: ProductMapUtils -> initMapUtilsListeners -> this.value.includes('Premium')", this.value.includes('Premium'))
        if(this.value.includes('Premium')) {
          mapSnapshotBlock.classList.add('-premium');
          self.controlPanel.classList.add('-premium');

          if (document.querySelector('#map-frame-beige').checked) {
            document.querySelector('#map-frame-wood').checked = true
            document.querySelector('#map-frame-wood').dispatchEvent(new Event('change', { bubbles: true }));
          }
          // self.updateMapPreviewImage();
        } else {
          mapSnapshotBlock.classList.remove('-premium');
          self.controlPanel.classList.remove('-premium');

          if (document.querySelector('#map-frame-wood').checked) {
            document.querySelector('#map-frame-beige').checked = true
            document.querySelector('#map-frame-beige').dispatchEvent(new Event('change', { bubbles: true }));
          }
        }
        
        self.updatePrice();
      })
    })

    self.mapFont.forEach(item => {
      item.addEventListener('change', function () {
        console.log('change')
        self.updateFontFamily(this.value);
      })
    })

    if (self.mapBorder) {

      self.mapBorder.addEventListener('change', function () {
        self.toggleBorder();
      })
    }

    self.mapFrameColor.forEach(item => {
      item.addEventListener('change', function () {
        self.updateFrameColor(this);
      }) 
    })

    self.mapZoomBlockTrigger.addEventListener('click', () => {
      let preview = document.getElementById('preview');
      let mapSnapshotBlock = document.getElementById('mapSnapshotBlock');

      if (document.querySelector('div[data-modal="map-zoom"] .modal-block #mapSnapshotBlock')) {

        preview.appendChild(mapSnapshotBlock)
      } else {
        self.mapZoomBlock.appendChild(mapSnapshotBlock)

      }

    })

    self.mapSpotify?.addEventListener('change', function() {
      self.updateSpotifyImage()
    })

    self.mapSpotifyInput?.addEventListener('change', function() {
      self.updateSpotifyImage()
    })

  }



  updateSpotifyImage() {
    let colorSelected = document.querySelector('#white-bg')?.checked ? 'ffffff' : '';
    colorSelected = colorSelected ? colorSelected : document.querySelector('input[name="map-color"]:checked').dataset.colorhex;

    let insideColor = colorSelected === 'ffffff' ? 'black' : 'white';
    if (this.mapSpotifyInput.value && !this.mapSpotifyInput.value.includes('track')) {
      alert('QR Code Spotify: URL incorreta. Para conseguir gerar um QR Code é necessário ir até a música no Spotify -> Share -> Copy Song Link.')
      this.mapSpotifyInput.value = '';
      return;
    }
    if (this.mapSpotify.checked && this.mapSpotifyInput.value) {
      if (this.mapSpotifyInput.value.includes('track/')) {
        this.mapSpotifyInput.value = `spotify:track:${this.mapSpotifyInput.value.split('track/')[1].split('?si')[0]}`
      }

      this.mapSpotifyImageBlock.classList.remove('hidden');
      this.mapSpotifyImage.src = `https://scannables.scdn.co/uri/plain/png/${colorSelected}/${insideColor}/640/${this.mapSpotifyInput.value}`;
    } else {
      this.mapSpotifyImageBlock.classList.add('hidden');
    }
  }

  updateMapPreviewOnText() {
    if(!mqMax) {
      // this.updateMapPreviewImage();
      return;
    }

    let intvl = setInterval(() => {
      console.log(this.utils.keyboardActive())
      if (this.utils.keyboardActive()) return

      setTimeout(() => {
        // this.updateMapPreviewImage();
      }, 500)
      clearInterval(intvl);
    }, 100)
  }

  updatePrice() {
    this.updateMapUtilsConstructor();
    this.formMapSize.value = this.mapSkuValue;
    this.formMapSize.dispatchEvent(new Event('change', { bubbles: true }));
    this.updateMapUtilsConstructor();
    
    let updatePrice = setInterval(() => {
      if (this.formPrice) {
        let currentPrice = this.formPrice.innerText.replace('R$', '');
        this.mapPricePlaceholder.innerText = currentPrice;
        this.mapInstallmentsPlaceholder.innerText = this.utils.getInstallments(currentPrice);
        clearInterval(updatePrice);
      }
    }, 50)
  }

  updateMapPreviewImage() {}

  cloneCanvas(oldCanvas) {

    //create a new canvas
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');

    //set dimensions
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;

    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0);

    //return the new canvas
    return newCanvas;
  }
  

  updateMapMessage(item) {
    const customLayout = document.querySelector(".map-content.-custom");

    if (customLayout) {
      item.value = item.value.replace(/[\r\n\v]+/g, "");
    }
    
    item.value = this.removeUnlessCharacters(item)
    this.preventOverLines(item);

    this.messageSize.innerText = item.value.length;
    this.previewMessage.innerText = item.value;
    this.wcMessage.value = item.value;
  }

  updateMapTitle(item) {
    item.value = this.removeUnlessCharacters(item);

    this.titleSize.innerText = item.value.length;
    this.previewTitle.innerText = item.value;
    this.wcTitle.value = item.value;
  }


  removeUnlessCharacters(item) {
    let { value } = item;
    let newVal = value.replace("*", "").replace("|", "");

    if (newVal.split("&").length - 1 >= 2) {
      while (newVal.split("&").length - 1 >= 2) {
        newVal = newVal.replace("&", "");
      }
      item.parentNode.classList.add("error-input");
      item.parentNode.dataset.invalid = 'É permitido apenas um "&"';
    } else {
      setTimeout(function () {
        item.parentNode.classList.remove("error-input");
        item.parentNode.classList.remove("error-invalid-character");
      }, 10000);
    }

    for (var i = 0; i < value.length; i++) {
      if (!this.regex.includes(value.charAt(i))) {
        while (newVal.split(value.charAt(i)).length - 1 >= 1) {
          newVal = newVal.replace(value.charAt(i), "");
          item.parentNode.dataset.invalid = `${value.charAt(i)} é um caracter inválido`;
        }
        item.parentNode.classList.add("error-input");
      }
    }

    return newVal;
  }

  preventOverLines(item) {

    if (this.allowedLines < item.value.split("\n").length) {
      this.lines = item.value.split("\n").slice(0, this.allowedLines);
      item.value = this.lines.join("\n");
      item.parentNode.classList.add("error-lines");
      setTimeout(function () {
        item.parentNode.classList.remove("error-lines");
      }, 3000);
    }
  }

  getColorText(color) {
    let color_text;
    if (color === "rgb(0,0,0)") {
      color_text = "black";
    } else if (color === "rgb(27,27,83)") {
      color_text = "blue";
    } else if (color === "rgb(0,121,131)") {
      color_text = "green";
    } else if (color === "rgb(105,105,116)") {
      color_text = "grey";
    } else if (color === "rgb(223,82,118)") {
      color_text = "pink";
    }

    return color_text;
  }

  updateFontFamily(fontFamily) {
    console.log('fontfamily')
    if (fontFamily === 'Courgette') {
      this.previewMapContent.classList.add("-custom-font-family");
    } else {
      this.previewMapContent.classList.remove("-custom-font-family");
    }

    // this.updateMapPreviewImage();
  };

  toggleBorder() {
    if (this.mapBorder.checked) {
      document.documentElement.style.setProperty("--border-size", "5px");
    } else {
      document.documentElement.style.setProperty("--border-size", "0px");
    }
    // this.updateMapPreviewImage();
  }

  updateFrameColor(item) {

    let frameColor = item.value;

    if (frameColor === "Branco") {
      this.previewMapContent.classList.remove("-wood");
      this.previewMapContent.classList.remove("-beige");
      this.previewMapContent.classList.add("-white");
      // corMoldura = "white";
    } else if (frameColor === "Madeira") {
      this.previewMapContent.classList.remove("-white");
      this.previewMapContent.classList.remove("-beige");
      this.previewMapContent.classList.add("-wood");
      // corMoldura = "wood";
    } else if (frameColor === "Natural") {
      this.previewMapContent.classList.remove("-white");
      this.previewMapContent.classList.remove("-wood");
      this.previewMapContent.classList.add("-beige");
      // corMoldura = "black";
    } else {
      this.previewMapContent.classList.remove("-white");
      this.previewMapContent.classList.remove("-wood");
      this.previewMapContent.classList.remove("-beige");
      // corMoldura = "black";
    }

    this.wcFrameColor.value = frameColor

    // this.updateMapPreviewImage();
  };

}

export { ProductMapUtils };
