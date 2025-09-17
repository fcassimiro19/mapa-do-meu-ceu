import { mqMax } from '../utils/general';
const Flickity = require('flickity-as-nav-for');

class ScrollSlider {

  constructor(sliderClass) {
    this.sliderElement = document.querySelector(sliderClass),
    this.prevButton = this.sliderElement&&this.sliderElement.parentNode.querySelector('.prev'),
    this.nextButton = this.sliderElement&&this.sliderElement.parentNode.querySelector('.next'),
    this.clientWidth = document.body.offsetWidth,
    this.sliderElementWidth = this.sliderElement&&this.sliderElement.scrollWidth,
    this.translateValue = 0
  }


  init() {
    if (!this.sliderElement) return;

    this.sliderElement.dataset.translate = this.translateValue;
    this.updateActionsDisabled();
    
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => {
        this.prev();
      })
    }
    if (this.nextButton) {

      this.nextButton.addEventListener('click', () => {
        this.next();
      })
    }
  }

  next() {
    this.translateValue = parseInt(this.sliderElement.dataset.translate) + this.clientWidth;
    this.sliderElement.dataset.translate = this.translateValue;

    this.sliderElement.scroll({
      top: 0,
      left: this.translateValue,
      behavior: 'smooth'
    });

    this.updateActionsDisabled();

  }

  prev() {
    this.translateValue = parseInt(this.sliderElement.dataset.translate) - this.clientWidth;
    this.sliderElement.dataset.translate = this.translateValue;

    this.sliderElement.scroll({
      top: 0,
      left: this.translateValue,
      behavior: 'smooth'
    });

    this.updateActionsDisabled();

  }


  updateSliderScrollValue() {
    this.translateValue = this.sliderElementWidth - (parseInt(this.sliderElement.dataset.translate) + this.clientWidth);
    this.sliderElement.dataset.translate = this.translateValue;
  }

  updateActionsDisabled() {
    if (!this.nextButton || this.prevButton) return;
    if (this.translateValue + this.clientWidth > this.sliderElementWidth) {
      this.nextButton.classList.add('disabled');
    } else {
      this.nextButton.classList.remove('disabled');
    }

    if (this.translateValue <= 0) {
      this.prevButton.classList.add('disabled');
    } else {
      this.prevButton.classList.remove('disabled');
    }
  }

}

class FlickitySliders {
  constructor() {
    this.flktyGalleryClass = '.gallery',
    this.flktyGalleryElement = document.querySelectorAll(this.flktyGalleryClass),
    this.flktyCardBannersClass = '.card-banners',
    this.flktyCardBannersElement = document.querySelector(this.flktyCardBannersClass),
    this.flktySingleSliderClientsClass = '.clients-slider',
    this.flktySingleSliderClientsElement = document.querySelector(this.flktySingleSliderClientsClass),
    this.flktySingleSliderClass = '.single-slider',
    this.flktySingleSliderElement = document.querySelector(this.flktySingleSliderClass),
    this.flktySliderMainNavClass = '.product-gallery-main',
    this.flktySliderMainNavElement = document.querySelector(this.flktySliderMainNavClass),
    this.flktySliderNavClass = '.product-gallery-list',
    this.flktySliderNavElement = document.querySelector(this.flktySliderNavClass);
    
    // Armazenar instâncias dos sliders do pingente
    this.pendantSliders = {
      prata: { main: null, nav: null },
      ouro: { main: null, nav: null }
    };
  }

  init() {

    if (this.flktyCardBannersElement && mqMax) {
      new Flickity(this.flktyCardBannersClass, {
        contain: true,
        freeScroll: true,
        draggable: true,
        cellAlign: 'left',
        pageDots: false,
        prevNextButtons: false,
      });
    }

    if (this.flktySingleSliderClientsElement) {
      new Flickity(this.flktySingleSliderClientsClass, {
        prevNextButtons: false,
        wrapAround: true,
        pageDots: false
      });
    }

    if (this.flktySingleSliderElement) {
      new Flickity(this.flktySingleSliderClass, {
        autoPlay: true,
        autoPlay: 2500,
        lazyLoad: 1
      });
    }

    if (this.flktySliderMainNavElement) {
      const isPendantPage = document.getElementById('pp-page') || document.getElementById('pe-page');
      
      if (!isPendantPage) {
        // Página normal - inicializar sliders padrão
        new Flickity(this.flktySliderMainNavClass, {
          autoPlay: true,
          autoPlay: 1500,
          prevNextButtons: true,
          lazyLoad: 1
        });

        new Flickity(this.flktySliderNavClass, {
          asNavFor: this.flktySliderMainNavClass,
          contain: true,
          prevNextButtons: false,
          draggable: false,
          pageDots: false
        });
      } else {
        // Página do pingente - inicializar apenas o slider de prata (visível)
        console.log('Página do pingente detectada - inicializando apenas slider de prata');
        this.initPendantSlider('prata');
      }
    }

    if (this.flktyGalleryElement) {
      this.flktyGalleryElement.forEach(item => {

        new Flickity(item, {
          freeScroll: true,
          draggable: true,
          cellAlign: 'center',
          pageDots: false,
          prevNextButtons: true,
        });
      })
    }

  }

  initPendantSlider(material) {
    console.log(`Inicializando slider de ${material}`);
    
    const mainSliderSelector = `.product-gallery-${material} .product-gallery-main`;
    const navSliderSelector = `.product-gallery-${material} .product-gallery-list`;
    
    const mainSliderElement = document.querySelector(mainSliderSelector);
    const navSliderElement = document.querySelector(navSliderSelector);
    
    if (mainSliderElement && navSliderElement) {
      // Destruir sliders existentes se existirem
      if (this.pendantSliders[material].main) {
        this.pendantSliders[material].main.destroy();
      }
      if (this.pendantSliders[material].nav) {
        this.pendantSliders[material].nav.destroy();
      }
      
      // Inicializar novos sliders
      this.pendantSliders[material].main = new Flickity(mainSliderElement, {
        prevNextButtons: true,
        lazyLoad: 1
      });

      this.pendantSliders[material].nav = new Flickity(navSliderElement, {
        asNavFor: mainSliderSelector,
        contain: true,
        prevNextButtons: false,
        draggable: false,
        pageDots: false
      });
      
      console.log(`Slider de ${material} inicializado com sucesso`);
    } else {
      console.log(`Elementos de slider de ${material} não encontrados:`, mainSliderElement, navSliderElement);
    }
  }

  // Método público para reinicializar slider quando se torna visível
  reinitializePendantSlider(material) {
    setTimeout(() => {
      this.initPendantSlider(material);
    }, 50); // Pequeno delay para garantir que o elemento esteja visível
  }
}

export const scrollSlider = new ScrollSlider('.reviews')
export const flickitySliders = new FlickitySliders();
