import { flickitySliders } from '../general/_sliders-config';
import { Utils } from '../utils/general';

class PingenteDosPlanetas {
  constructor() {
    this.buyButton = document.querySelector('.pendant-buy-trigger'),
    this.generateImageTrigger = document.getElementById('generate-pendant-image'),

    this.pendantType = document.getElementById('select-acabamento'),
    this.pendantMaterial = document.getElementById('select-material'),
    this.pendantDateBlock = document.querySelector('.pendant-date'),
    this.pendantDateItem = document.querySelector('.pendant-date-item'),
    this.pendanteDay = document.getElementById('pendant-day'),
    this.pendanteMonth = document.getElementById('pendant-month'),
    this.pendanteYear = document.getElementById('pendant-year'),
    this.pendantChain = document.getElementById('pendant-chain'),
    this.pendantChainBlock = document.querySelector('.pendant-chain-block'),

    this.singleProductSubmit = document.querySelector('.single_add_to_cart_button'),

    this.wcPendantType = document.getElementById(`acabamento`),
    this.wcPendantMaterial = document.getElementById(`material`), // Campo material do WooCommerce
    this.wcDayInput = document.querySelector(`.wc-pao-addon-dia input`),
    this.wcMonthInput = document.querySelector(`.wc-pao-addon-mes input`),
    this.wcYearInput = document.querySelector(`.wc-pao-addon-ano input`),
    this.wcPendentImage = document.querySelector('.wc-pao-addon-link-do-svg input');

    this.utils = new Utils();

    this.init();
  }

  init() {
    this.initListeners();
    this.updatePendantDate();
    this.handleSimulator();
    
    // Detectar material da URL e inicializar
    const initialMaterial = this.getUrlParameter('material') === 'ouro' ? 'ouro' : 'prata';
    console.log('Material inicial detectado da URL:', initialMaterial);
    
    // Atualizar o select de material se estiver disponível
    if (this.pendantMaterial && initialMaterial === 'ouro') {
      this.pendantMaterial.value = 'ouro';
      console.log('Select de material atualizado para ouro');
    }
    
    this.updateMaterialOptions(initialMaterial);
    
    // Intervalo para atualizar preço e tipo do pingente
    // setInterval(() => {
      this.updateProductPrice();
      this.updatePendantType();
    // }, 1000)
  }

  // Função para obter parâmetros da URL
  getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  initListeners() {
    const self = this;

    self.buyButton.addEventListener('click', function () {
      self.handleBuy();
    })

    self.pendanteDay.addEventListener('change', function() {
      self.updatePendantDate();
    })

    self.pendanteMonth.addEventListener('change', function() {
      self.updatePendantDate();
    })

    self.pendanteYear.addEventListener('change', function() {
      self.updatePendantDate();
    })

    if (self.generateImageTrigger) {
      self.generateImageTrigger.addEventListener('click', function () {
        self.updatePendantDate()
        setTimeout(() => {
          self.sendImageToServer(true);
        }, 2000)
      })
    }

    self.pendantType.addEventListener('change', function() {
      self.updatePendantType();
      self.updateProductPrice();
    })

    self.pendantChain.addEventListener('change', function() {
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

  updateMaterialOptions(material) {
    console.log('=== updateMaterialOptions chamado ===', material);
    
    const acabamentoSelect = this.pendantType;
    const chainBlock = this.pendantChainBlock;
    const chainSelect = this.pendantChain;
    
    console.log('Elementos encontrados:', {
      acabamentoSelect,
      chainBlock,
      chainSelect
    });
    
    // Ocultar todas as opções
    Array.from(acabamentoSelect.options).forEach(option => {
      option.style.display = 'none';
    });
    
    // Mostrar apenas as opções do material selecionado
    Array.from(acabamentoSelect.options).forEach(option => {
      if (option.dataset.material === material) {
        option.style.display = 'block';
        console.log('Opção mostrada:', option.value, option.dataset.variationId);
      }
    });
    
    // Selecionar a primeira opção disponível do material com a variação correta
    const firstOption = acabamentoSelect.querySelector(`option[data-material="${material}"]`);
    if (firstOption) {
      acabamentoSelect.value = firstOption.value;
      console.log('Primeira opção selecionada:', firstOption.value);
      
      // Selecionar a variação correta baseada no material
      if (material === 'ouro') {
        // Para ouro, selecionar variação 3 (primeira opção de ouro)
        const ouroOptionIndex = Array.from(acabamentoSelect.options).findIndex(opt => opt.dataset.variationId === '3');
        console.log('Índice da opção de ouro (variação 3):', ouroOptionIndex);
        if (ouroOptionIndex !== -1) {
          acabamentoSelect.selectedIndex = ouroOptionIndex;
          console.log('Variação 3 selecionada para ouro');
        }
      } else {
        // Para prata, selecionar variação 0 (primeira opção de prata)
        const prataOptionIndex = Array.from(acabamentoSelect.options).findIndex(opt => opt.dataset.variationId === '0');
        console.log('Índice da opção de prata (variação 0):', prataOptionIndex);
        if (prataOptionIndex !== -1) {
          acabamentoSelect.selectedIndex = prataOptionIndex;
          console.log('Variação 0 selecionada para prata');
        }
      }
    }
    
    // Gerenciar imagens do slider
    this.updateGalleryImages(material);
    
    // Atualizar informações do produto
    this.updateProductInfo(material);
    
    // Comportamento específico para ouro
    if (material === 'ouro') {
      // Selecionar "sem corrente"
      chainSelect.value = 'sem-corrente';
      console.log('Sem corrente selecionado para ouro');
      // Esconder o bloco da corrente
      chainBlock.style.display = 'none';
    } else {
      // Mostrar o bloco da corrente para prata
      chainBlock.style.display = 'block';
      console.log('Bloco da corrente mostrado para prata');
    }
    
    // Atualizar material no WooCommerce
    this.updatePendantMaterial(material);
    
    // Atualizar tipo do pingente no WooCommerce
    this.updatePendantType();
    
    // Atualizar preço após mudança
    console.log('Chamando updateProductPrice...');
    this.updateProductPrice();
  }

  updateGalleryImages(material) {
    console.log('=== updateGalleryImages chamado ===', material);
    
    // Controlar visibilidade dos sliders
    const prataGallery = document.querySelector('.product-gallery-prata');
    const ouroGallery = document.querySelector('.product-gallery-ouro');
    
    console.log('Prata gallery:', prataGallery);
    console.log('Ouro gallery:', ouroGallery);
    
    if (material === 'ouro') {
      // Mostrar slider de ouro e ocultar prata
      if (prataGallery) prataGallery.style.display = 'none';
      if (ouroGallery) ouroGallery.style.display = 'block';
      
      // Reinicializar slider de ouro agora que está visível
      console.log('Reinicializando slider de ouro...');
      flickitySliders.reinitializePendantSlider('ouro');
      
      // Atualizar atributo data-gallery-count do container principal
      const mainGallery = document.querySelector('.product-gallery');
      if (mainGallery) {
        mainGallery.setAttribute('data-gallery-count', '6');
      }
    } else {
      // Mostrar slider de prata e ocultar ouro
      if (ouroGallery) ouroGallery.style.display = 'none';
      if (prataGallery) prataGallery.style.display = 'block';
      
      // Reinicializar slider de prata se necessário
      console.log('Reinicializando slider de prata...');
      flickitySliders.reinitializePendantSlider('prata');
      
      // Atualizar atributo data-gallery-count do container principal
      const mainGallery = document.querySelector('.product-gallery');
      if (mainGallery && prataGallery) {
        const prataCount = prataGallery.getAttribute('data-gallery-count');
        mainGallery.setAttribute('data-gallery-count', prataCount);
      }
    }
  }

  handleBuy() {
    this.updatePendantDate();
    this.handleSimulator();
    this.handlePendentProduct();
    this.updateProductPrice();
  }

  updatePendantDate() {
    this.wcDayInput.value = this.pendanteDay.value;
    this.wcMonthInput.value = this.pendanteMonth.value;
    this.wcYearInput.value = this.pendanteYear.value;

    this.handleSimulator();
  }

  handleSimulator() {
      DAY = parseInt(this.pendanteDay.value);
      MONTH = parseInt(this.pendanteMonth.value);
      YEAR = parseInt(this.pendanteYear.value);
  }

  updatePendantMaterial(material) {
    console.log('=== updatePendantMaterial chamado ===', material);
    console.log('wcPendantMaterial element:', this.wcPendantMaterial);
    
    if (this.wcPendantMaterial) {
      // Converter para o formato esperado pelo WooCommerce (primeira letra maiúscula)
      const materialValue = material.charAt(0).toUpperCase() + material.slice(1);
      this.wcPendantMaterial.value = materialValue;
      this.wcPendantMaterial.dispatchEvent(new Event('change', { bubbles: true }));
      console.log('Material atualizado no WooCommerce:', materialValue);
    } else {
      console.log('Campo material do WooCommerce não encontrado - provavelmente não está no modo homolog');
    }
  }

  updatePendantType() {
    console.log('=== updatePendantType chamado ===');
    console.log('Valor selecionado:', this.pendantType.value);
    console.log('wcPendantType element:', this.wcPendantType);
    
    if (this.wcPendantType) {
      this.wcPendantType.value = this.pendantType.value
      this.wcPendantType.dispatchEvent(new Event('change', { bubbles: true }));
      console.log('Evento change disparado no WooCommerce');
    } else {
      console.log('ERRO: wcPendantType não encontrado!');
    }

    this.updateProductPrice();
  }

  sendImageToServer(generateImage) {
    console.log('sending...')
    var bottleCanvas = document.getElementById('LAYER1');
    var designCanvas = document.getElementById('LAYER2');

    var bottleContext = bottleCanvas.getContext('2d');
    bottleContext.drawImage(designCanvas, 0, 0);

    var file = bottleCanvas.toDataURL("image/png");

    let photoId = this.utils.makeid(5);
    let photoName = `pingente-${photoId}`;

    jQuery.ajax({
      method: 'POST',
      url: '/photo-upload.php',
      data: {
        photo: file,
        name: photoName
      }
    }).done(() => {
      let imagePath = `http://${location.hostname}/photos/${photoName}.png`

      let data = {
        action: 'mdmc_add_to_cart',
        product_id: `${chainId}`,
      }

      if (generateImage) {
        // window.open(imagePath, '_blank');
        // location.reload();
        location.href = imagePath;
        return;
      }

      this.wcPendentImage.value = imagePath;

      console.log(this.pendantChain.value);
      if (this.pendantChain.value !== 'veneziana') {
        console.log('01')
        document.querySelector('.single_add_to_cart_button').click();
        return;
      }

      console.log('02')

      jQuery
        .get('/wp-admin/admin-ajax.php', data)
        .done(function (response) {
          
          handleMapLoading(100);
          document.querySelector('.single_add_to_cart_button').click();
        })

    });

  }

  handlePendentProduct() {
    handleMapLoading(40);
    this.sendImageToServer();
  }

  updateProductPrice() {
    console.log('=== updateProductPrice chamado ===');
    
    let currentPriceBlock = document.querySelector("form.cart .wc-pao-subtotal-line .price .amount");
    console.log('currentPriceBlock encontrado:', currentPriceBlock);
    
    let onlyNum;
    if (currentPriceBlock) {
      let currentPrice = currentPriceBlock.innerText;
      console.log('Preço original:', currentPrice);
      
      // Remover R$ e espaços, depois converter formato brasileiro para número
      currentPrice = currentPrice.replace('R$', '').trim();
      console.log('Preço após remover R$:', currentPrice);
      
      // Converter formato brasileiro (1.400,00) para número
      // Remove pontos (separador de milhares) e substitui vírgula por ponto
      let numericPrice = currentPrice.replace(/\./g, '').replace(',', '.');
      console.log('Preço convertido para formato numérico:', numericPrice);
      
      let basePrice = parseFloat(numericPrice);
      console.log('Preço base (float):', basePrice);

      if (this.pendantChain.value === 'veneziana') {
        console.log('Corrente veneziana selecionada, adicionando:', chainPrice);
        basePrice = basePrice + parseFloat(chainPrice);
      } else {
        console.log('Sem corrente selecionada');
      }

      onlyNum = Math.round(basePrice);
      console.log('Preço total calculado:', onlyNum);
      
      // Formatar o preço final
      let finalPrice = basePrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
      console.log('Preço formatado:', finalPrice);
      
      const priceElement = document.getElementById("current-price");
      const installmentsElement = document.querySelector('.price-installments');
      
      console.log('Elemento de preço:', priceElement);
      console.log('Elemento de parcelas:', installmentsElement);
      
      if (priceElement) {
        priceElement.innerText = finalPrice;
        console.log('Preço atualizado no DOM');
      }
      
      if (installmentsElement) {
        installmentsElement.innerText = this.utils.getInstallments(onlyNum);
        console.log('Parcelas atualizadas no DOM');
      }
    } else {
      console.log('ERRO: currentPriceBlock não encontrado!');
      console.log('Elementos form.cart encontrados:', document.querySelectorAll('form.cart'));
      console.log('Elementos .wc-pao-subtotal-line encontrados:', document.querySelectorAll('.wc-pao-subtotal-line'));
    }
  }

  updateProductInfo(material) {
    console.log('=== updateProductInfo chamado ===', material);
    
    const materialInfo = document.getElementById('material-info');
    const chainInfo = document.getElementById('chain-info');
    
    if (material === 'ouro') {
      // Para ouro: Material diferente e mostrar "já acompanha corrente"
      if (materialInfo) {
        materialInfo.textContent = 'Material: Prata banhado a ouro 18k';
        console.log('Material atualizado para ouro');
      }
      if (chainInfo) {
        chainInfo.style.display = 'block';
        console.log('Informação da corrente mostrada para ouro');
      }
    } else {
      // Para prata: Material padrão e esconder "já acompanha corrente"
      if (materialInfo) {
        materialInfo.textContent = 'Material: Prata banhado a ródio';
        console.log('Material atualizado para prata');
      }
      if (chainInfo) {
        chainInfo.style.display = 'none';
        console.log('Informação da corrente escondida para prata');
      }
    }
  }
  
}

if (document.getElementById('pp-page')) {
  const mapaDosPlanetas = new PingenteDosPlanetas();
}

