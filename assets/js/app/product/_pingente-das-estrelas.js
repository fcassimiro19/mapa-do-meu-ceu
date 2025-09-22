import { flickitySliders } from '../general/_sliders-config';
import { Utils } from '../utils/general';
import moment from 'moment-timezone';
import tzLookup from 'tz-lookup';

class PingenteDasEstrelas {
  constructor() {
    this.buyButton = document.querySelector('#buyButton'),
    this.generateImageTrigger = document.getElementById('generate-pendant-image'),

    this.latitude = -23.5432,
    this.longitude = -46.6292,
    this.timezone = 3,
    this.timestampGlobal = 1458000000,
    this.updateLocationOptions = '',
    this.mapTimezone = 3,

    this.mapLocationsInputLabel = document.querySelector(".-locations"),
    this.mapMainLocationInput = document.querySelector("#place"),
    this.mapLocationsLabel = document.querySelector(".locations-results"),
    this.mapLocationsResults = document.querySelectorAll(".locations-results li"),
    this.mapDay = document.getElementById("date-day").value.padStart(2, '0'),
    this.mapMonth = document.getElementById("date-month").value.padStart(2, '0'),
    this.mapYear = document.getElementById("date-year").value.padStart(2, '0'),
    this.mapHour = document.getElementById("time-hour").value.padStart(2, '0'),
    this.mapMinute = document.getElementById("time-minute").value.padStart(2, '0'),
    this.mapDateTrigger = document.querySelectorAll('.date-trigger'),

    this.pendantChain = document.getElementById('pendant-chain'),
    this.pendantMaterial = document.getElementById('select-material'),
    this.pendantChainBlock = document.querySelector('.pendant-chain-block'),

    this.wcPendantMaterial = document.getElementById('material'), // Campo material do WooCommerce

    this.activeSvg = '',

    this.wcDate = document.querySelector(".wc-pao-addon-data input"),
    this.wcHour = document.querySelector(".wc-pao-addon-horario input"),
    this.wcLocationText = document.querySelector(".wc-pao-addon-nome-do-local input"),
    this.wcSvgInput = document.querySelector(".wc-pao-addon-link-do-svg input"),
    this.wcLat = document.querySelector(".wc-pao-addon-latitude input"),
    this.wcLng = document.querySelector(".wc-pao-addon-longitude input"),

    this.formLat = document.getElementById("lat"),
    this.formLng = document.getElementById("lon"),
    this.formDateTime = document.getElementById("datetime"),

    this.locationUpdated = false,

    this.utils = new Utils();

    this.init();
  }

  initListeners() { 
    const self = this;
    
    self.buyButton.addEventListener('click', function () {
      self.handleBuy();
    })
    
    if (self.generateImageTrigger) {
      self.generateImageTrigger.addEventListener('click', function () {
        self.handleBuy(true);
      })
    }

    self.mapMainLocationInput.addEventListener('keyup', function () {
      self.updateLocationOptionsOnDelay(this);
    })

    self.mapDateTrigger.forEach(item => {
      item.addEventListener('change', () => {
        self.setNewDate();
      })
    })

    self.pendantChain.addEventListener('change', function () {
      self.updateProductPrice();
    })

    // Listener para mudança de material
    if (self.pendantMaterial) {
      self.pendantMaterial.addEventListener('change', function() {
        self.updateMaterialOptions(this.value);
        self.updateProductPrice();
      })
    }
 
  }

  init() {

    this.initListeners();
    
    // Detectar material da URL e inicializar
    const initialMaterial = this.getUrlParameter('material') === 'ouro' ? 'ouro' : 'prata';
    console.log('Material inicial detectado da URL (estrelas):', initialMaterial);
    
    // Atualizar o select de material se estiver disponível
    if (this.pendantMaterial && initialMaterial === 'ouro') {
      this.pendantMaterial.value = 'ouro';
      console.log('Select de material atualizado para ouro (estrelas)');
    }
    
    this.updateMaterialOptions(initialMaterial);

    setInterval(() => {
      this.updateProductPrice();
    }, 1000)
  }

  // Função para obter parâmetros da URL
  getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  updateMaterialOptions(material) {
    console.log('=== updateMaterialOptions chamado (estrelas) ===', material);
    
    const chainBlock = this.pendantChainBlock;
    const chainSelect = this.pendantChain;
    
    // Gerenciar imagens do slider
    this.updateGalleryImages(material);
    
    // Atualizar informações do produto
    this.updateProductInfo(material);
    
    // Comportamento específico para ouro
    if (material === 'ouro') {
      // Selecionar "sem corrente"
      chainSelect.value = 'sem-corrente';
      console.log('Sem corrente selecionado para ouro (estrelas)');
      // Esconder o bloco da corrente
      chainBlock.style.display = 'none';
    } else {
      // Mostrar o bloco da corrente para prata
      chainBlock.style.display = 'block';
      console.log('Bloco da corrente mostrado para prata (estrelas)');
    }
    
    // Atualizar material no WooCommerce
    this.updatePendantMaterial(material);
    
    // Atualizar preço após mudança
    console.log('Chamando updateProductPrice (estrelas)...');
    this.updateProductPrice();
  }

  updateGalleryImages(material) {
    console.log('=== updateGalleryImages chamado (estrelas) ===', material);
    
    // Controlar visibilidade dos sliders
    const prataGallery = document.querySelector('.product-gallery-prata');
    const ouroGallery = document.querySelector('.product-gallery-ouro');
    const starsPreview = document.getElementById('stars-preview');
    
    console.log('Prata gallery (estrelas):', prataGallery);
    console.log('Ouro gallery (estrelas):', ouroGallery);
    console.log('Stars preview element:', starsPreview);
    
    if (material === 'ouro') {
      // Mostrar slider de ouro e ocultar prata
      if (prataGallery) prataGallery.style.display = 'none';
      if (ouroGallery) ouroGallery.style.display = 'block';
      
      // Mover o #stars-preview para o slider de ouro
      if (starsPreview && ouroGallery) {
        const ouroMain = ouroGallery.querySelector('.product-gallery-main');
        if (ouroMain) {
          // Inserir o stars-preview como primeiro elemento do slider de ouro
          ouroMain.insertBefore(starsPreview, ouroMain.firstChild);
          console.log('Stars preview movido para slider de ouro');
        }
      }
      
      // Reinicializar slider de ouro agora que está visível
      console.log('Reinicializando slider de ouro (estrelas)...');
      flickitySliders.reinitializePendantSlider('ouro');
      
      // Atualizar atributo data-gallery-count do container principal
      const mainGallery = document.querySelector('.product-gallery');
      if (mainGallery) {
        mainGallery.setAttribute('data-gallery-count', '4'); // 3 imagens + 1 preview
      }
    } else {
      // Mostrar slider de prata e ocultar ouro
      if (ouroGallery) ouroGallery.style.display = 'none';
      if (prataGallery) prataGallery.style.display = 'block';
      
      // Mover o #stars-preview de volta para o slider de prata
      if (starsPreview && prataGallery) {
        const prataMain = prataGallery.querySelector('.product-gallery-main');
        if (prataMain) {
          // Inserir o stars-preview como primeiro elemento do slider de prata
          prataMain.insertBefore(starsPreview, prataMain.firstChild);
          console.log('Stars preview movido para slider de prata');
        }
      }
      
      // Reinicializar slider de prata se necessário
      console.log('Reinicializando slider de prata (estrelas)...');
      flickitySliders.reinitializePendantSlider('prata');
      
      // Atualizar atributo data-gallery-count do container principal
      const mainGallery = document.querySelector('.product-gallery');
      if (mainGallery && prataGallery) {
        const prataCount = prataGallery.getAttribute('data-gallery-count');
        mainGallery.setAttribute('data-gallery-count', prataCount);
      }
    }
  }

  updateProductInfo(material) {
    console.log('=== updateProductInfo chamado (estrelas) ===', material);
    
    const materialInfo = document.getElementById('material-info-estrelas');
    const chainInfo = document.getElementById('chain-info-estrelas');
    
    if (material === 'ouro') {
      // Para ouro: Material diferente e mostrar "já acompanha corrente"
      if (materialInfo) {
        materialInfo.textContent = 'Material: Prata banhado a ouro 18k';
        console.log('Material atualizado para ouro (estrelas)');
      }
      if (chainInfo) {
        chainInfo.style.display = 'block';
        console.log('Informação da corrente mostrada para ouro (estrelas)');
      }
    } else {
      // Para prata: Material padrão e esconder "já acompanha corrente"
      if (materialInfo) {
        materialInfo.textContent = 'Material: Prata com banho de ródio';
        console.log('Material atualizado para prata (estrelas)');
      }
      if (chainInfo) {
        chainInfo.style.display = 'none';
        console.log('Informação da corrente escondida para prata (estrelas)');
      }
    }
  }

  updatePendantMaterial(material) {
    console.log('=== updatePendantMaterial chamado (estrelas) ===', material);
    console.log('wcPendantMaterial element:', this.wcPendantMaterial);
    
    if (this.wcPendantMaterial) {
      // Converter para o formato esperado pelo WooCommerce (primeira letra maiúscula)
      const materialValue = material.charAt(0).toUpperCase() + material.slice(1);
      this.wcPendantMaterial.value = materialValue;
      this.wcPendantMaterial.dispatchEvent(new Event('change', { bubbles: true }));
      console.log('Material atualizado no WooCommerce (estrelas):', materialValue);
    } else {
      console.log('Campo material do WooCommerce não encontrado - provavelmente não está no modo homolog (estrelas)');
    }
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
    }, 2000); 

  }

  updateConstructor() {
    this.mapLocationsResults = document.querySelectorAll(".locations-results li");
    this.mapDay = document.getElementById("date-day").value.padStart(2, '0');
    this.mapMonth = document.getElementById("date-month").value.padStart(2, '0');
    this.mapYear = document.getElementById("date-year").value.padStart(2, '0');
    this.mapHour = document.getElementById("time-hour").value.padStart(2, '0');
    this.mapMinute = document.getElementById("time-minute").value.padStart(2, '0');
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
      this.mapLocationsInputLabel.classList.add("-loading");
      this.getLocations(item.value).finally(() => {

        this.mapLocationsInputLabel.classList.remove("-loading");
      });
    }, 300);
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


    this.formDateTime.value = `${dateUpdated.getFullYear()}-${dateUpdated.getMonth() + 1
      }-${dateUpdated.getDate()} ${dateUpdated.getHours()}:${dateUpdated.getMinutes()}:00 ±0000`;


    this.updateStarsPreview();
  };

  setMapLocation(item) {
    this.mapLocationsLabel.classList.remove('active');

    let currentLat = item.dataset.latitude;
    let currentLng = item.dataset.longitude;

    this.mapTimezone = item.dataset.timezone;
    this.timezone = parseInt(item.dataset.timezone.replace("00", ""));

    this.formLat.value = currentLat;
    this.formLng.value = currentLng;

    this.mapMainLocationInput.value = item.innerText;

    this.wcLat.value = Number(currentLat).toFixed(4);
    this.wcLng.value = Number(currentLng).toFixed(4);

    this.latitude = Number(currentLat);
    this.longitude = Number(currentLng);

    this.mapLocationsLabel.innerHTML = "";
    this.wcLocationText.value = this.mapMainLocationInput.value;
    this.updateStarsPreview();
    this.locationUpdated = true;
  }

  updateStarsPreview() {
    go();
    go();
  }

  updateProductPrice() {
    console.log('=== updateProductPrice chamado (estrelas) ===');
    
    let currentPriceBlock = document.querySelector("form.cart .wc-pao-subtotal-line .price .amount");
    console.log('currentPriceBlock encontrado (estrelas):', currentPriceBlock);
    
    let onlyNum;
    if (currentPriceBlock) {
      let currentPrice = currentPriceBlock.innerText;
      console.log('Preço original (estrelas):', currentPrice);
      
      // Remover R$ e espaços, depois converter formato brasileiro para número
      currentPrice = currentPrice.replace('R$', '').trim();
      console.log('Preço após remover R$ (estrelas):', currentPrice);
      
      // Converter formato brasileiro (1.400,00) para número
      // Remove pontos (separador de milhares) e substitui vírgula por ponto
      let numericPrice = currentPrice.replace(/\./g, '').replace(',', '.');
      console.log('Preço convertido para formato numérico (estrelas):', numericPrice);
      
      let basePrice = parseFloat(numericPrice);
      console.log('Preço base (float) (estrelas):', basePrice);

      if (this.pendantChain.value === 'veneziana') {
        console.log('Corrente veneziana selecionada (estrelas), adicionando:', chainPrice);
        basePrice = basePrice + parseFloat(chainPrice);
      } else {
        console.log('Sem corrente selecionada (estrelas)');
      }

      onlyNum = Math.round(basePrice);
      console.log('Preço total calculado (estrelas):', onlyNum);
      
      // Formatar o preço final
      let finalPrice = basePrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
      console.log('Preço formatado (estrelas):', finalPrice);
      
      const priceElement = document.getElementById("current-price");
      const installmentsElement = document.querySelector('.price-installments');
      
      console.log('Elemento de preço (estrelas):', priceElement);
      console.log('Elemento de parcelas (estrelas):', installmentsElement);
      
      if (priceElement) {
        priceElement.innerText = finalPrice;
        console.log('Preço atualizado no DOM (estrelas)');
      }
      
      if (installmentsElement) {
        installmentsElement.innerText = this.utils.getInstallments(onlyNum);
        console.log('Parcelas atualizadas no DOM (estrelas)');
      }
    } else {
      console.log('ERRO: currentPriceBlock não encontrado (estrelas)!');
      console.log('Elementos form.cart encontrados:', document.querySelectorAll('form.cart'));
      console.log('Elementos .wc-pao-subtotal-line encontrados:', document.querySelectorAll('.wc-pao-subtotal-line'));
    }
  }

  updateAddonsValue() {
    this.wcLocationText.value = this.mapMainLocationInput.value;

    this.wcDate.value = `${this.mapDay}/${this.mapMonth}/${this.mapYear}`;
    this.wcHour.value = `${this.mapHour}:${this.mapMinute}`;

    this.wcLat.value = Number(this.latitude).toFixed(4);
    this.wcLng.value = Number(this.longitude).toFixed(4);

    this.wcSvgInput.value = '';
  }


  handleBuy(generatePDF) {
    this.updateAddonsValue();


    if (!this.mapMainLocationInput.value && !generatePDF || !this.locationUpdated && !generatePDF) {
      alert('Necessário adicionar a localização');
      this.mapMainLocationInput.focus();
      return;
    } 

    handleMapLoading(25);
    saveSVG('#000', generatePDF);
  }

 
}

if (document.getElementById('pe-page')) {
  const pingenteDasEstrelas = new PingenteDasEstrelas();
}