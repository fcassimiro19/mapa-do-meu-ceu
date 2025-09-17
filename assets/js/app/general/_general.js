import { scrollSlider, flickitySliders } from './_sliders-config.js';
import { faqAccordion } from './_faq.js';
import { Modal, Utils, mqMax } from '../utils/general.js';
const $ = require('jquery');

class InitializeProject {
  constructor(){
    this.menuTrigger = document.getElementById('mobile-menu-trigger'),
    this.menuHasChildrenTrigger = document.querySelectorAll('.menu-item-has-children a'),
    this.modalTriggerElements = document.querySelectorAll('.modal-trigger'),
    this.toggleInputTrigger = document.querySelectorAll('.toggle-input-trigger'),
    this.cartMapVariationTrigger = document.querySelectorAll('.woocommerce-cart dl.variation');
    this.maskDateItems = document.querySelectorAll('.mask-date');
    this.progressCover = document.querySelector('.readingProgressbar');
    this.indiceBlock = document.querySelector('.indice');

    this.utils = new Utils();
  }

  init() {
    // this.hideLogs();

    setInterval(() => {
      let nitroElement = document.querySelector('div[style="display:                            block                            !important;clear:                            both                            !important;"]')
      if (nitroElement) {
        nitroElement.parentNode.removeChild(nitroElement);
      }
    }, 1000);
    
    if (this.utils.isiOSDevice()) {
      document.body.classList.add('ios-device')
    }

    
    if (this.modalTriggerElements) {
      this.modalTriggerElements.forEach(item => {
        let currentTarget = item.dataset.target;
        let newModal = new Modal(currentTarget);
        item.addEventListener('click', () => {
          newModal.open();
        })
      })
    }

    if (this.toggleInputTrigger) {
      this.toggleInputTrigger.forEach(item => {
        item.addEventListener('change', () => {
          item.parentNode.parentNode.classList.toggle('-active')
        })
      })
    }

    this.maskDateItems?.forEach(item => {
      item.addEventListener('keyup', () => {
        item.value = this.maskDate(item.value);
      })
    })

    $(document).on('scroll', () => {
      this.updateScrollBodyClass();
      if (this.progressCover) {
        this.progressBarUpdate();
      }
    });

    this.setUserEmail();
    this.removePdfSvgFromNode();
    this.generalListerners();
    
    scrollSlider.init();
    flickitySliders.init();
    faqAccordion.init();
    
  }

  generalListerners() {
    let self = this;
    if (self.cartMapVariationTrigger) {
      self.cartMapVariationTrigger.forEach(item => {
        item.addEventListener('click', function() {
          self.toggleMapVariation(this);
        })
      })
    }

    if (self.menuTrigger) {
      self.menuTrigger.addEventListener('click', function() {
        self.toggleMenu();
      })
    }

    if (self.menuHasChildrenTrigger && mqMax) {
      self.menuHasChildrenTrigger.forEach(item => {
        item.addEventListener('click', function() {
          item.classList.toggle('-active');
        })
      })
    }

    if (self.indiceBlock) {
      self.generateIndice();
    }
  }

  generateIndice() {
    let titles = document.querySelectorAll('.single-post-content h2');
    let titlesH3 = document.querySelectorAll('.single-post-content h3');
    if (!titles.length || !titlesH3.length) return;
    const indiceUl = this.indiceBlock.querySelector('ul');
    titles.forEach(item => {
      const slug = this.utils.stringToSlug(item.innerText);

      item.setAttribute('id', slug);

      indiceUl.innerHTML += `
        <li>
          <a href="#${slug}">${item.innerText}</a>
        </li>
      `
    })
    titlesH3.forEach(item => {
      const slug = this.utils.stringToSlug(item.innerText);

      item.setAttribute('id', slug);

      indiceUl.innerHTML += `
        <li>
          <a href="#${slug}">${item.innerText}</a>
        </li>
      `
    })
  }

  

  progressBarUpdate() {
    const contentContainer = document.querySelector('.single-post-content');
    const mainHeader = document.querySelector('.main-header');
    let scroll = window.pageYOffset - mainHeader.scrollHeight + 100

    this.progressCover.setAttribute('max', contentContainer.scrollHeight)
    this.progressCover.value = scroll;
  }

  hideLogs() {
    var inProduction = ('www.mapadomeuceu.com.br' === window.location.hostname);
    var inDevMode = ('?development' === window.location.search);
    var inProductionAndNotDevMode = inProduction && !inDevMode;
    if (inProductionAndNotDevMode) {
      window.console = {};
      console.assert = console.clear = console.constructor = console.count = console.debug = console.dir = console.dirxml = console.error = console.group = console.groupCollapsed = console.groupEnd = console.info = console.log = console.markTimeline = console.profile = console.profileEnd = console.table = console.time = console.timeEnd = console.timeStamp = console.timeline = console.timelineEnd = console.trace = console.warn = function () { return false; };
    }
  }

  removePdfSvgFromNode() {
    let pdfLinks = document.querySelectorAll('.variation-LinkdoPDF');
    let svgLinks = document.querySelectorAll('.variation-LinkdoSVG');

    if (pdfLinks) {
      pdfLinks.forEach(item => {
        let parent = item.parentNode;
        parent.removeChild(item)
      })
    }
    if (svgLinks) {
      svgLinks.forEach(item => {
        let parent = item.parentNode;
        parent.removeChild(item)
      })
    }
  }

  updateScrollBodyClass() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollY < 600) {
      document.body.classList.remove("-scroll");
    }
    if (scrollY > 600) {
      document.body.classList.add("-scroll");
    }
  }

  setUserEmail() {
    if (localStorage.getItem('useremail') && document.getElementById('billing_email')) {
      document.getElementById('billing_email').value = localStorage.getItem('useremail');
    }

    if (localStorage.getItem('useremail') && document.querySelector('.rd-email-placeholder')) {
      document.querySelector('.rd-email-placeholder').value = localStorage.getItem('useremail');
    }
  }

  toggleMapVariation(item) {
    item.classList.toggle('active');
  }

  toggleMenu() {
    document.body.classList.toggle('-menu-active');
  }

  maskDate(v) {
    v = v.replace(/\D/g, "");
    v = v.replace(/(\d{2})(\d)/, "$1/$2");
    v = v.replace(/(\d{2})(\d)/, "$1/$2");
    v = v.replace(/(\d{2})(\d{2})$/, "$1$2");
    v = v.slice(0, 10)
    return v;
  }

  
}

window.handleMapLoading = function (loadingPercentage) {
  let modal = document.querySelector('.modal[data-modal="custom-loading"]');
  let loadingElement = document.querySelector('.loading-element');

  modal.dataset.hidden = false;
  setTimeout(() => {
    loadingElement.style.maxWidth = `${loadingPercentage}%`;
  }, 1500)
}

const initalizeProject = new InitializeProject();
initalizeProject.init();