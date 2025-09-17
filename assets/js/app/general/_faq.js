class Accordion {
  
  constructor(accordionClass) {
    this.accordionElements = document.querySelectorAll(accordionClass)
  }

  init() {
    console.log(this.accordionElements)
    if (!this.accordionElements) return;

    this.accordionElements && this.accordionElements.forEach(item => {
      item.addEventListener('click', () => {
        this.toggleAccordionActive(item);
      })
    })
  }

  toggleAccordionActive(item) {
    if(!item.classList.contains('active')) {
      document.querySelector('.accordion.active') && document.querySelector('.accordion.active').classList.remove('active');
    }

    item.classList.toggle('active')
  }
}

export const faqAccordion = new Accordion('.faq-section .accordion');
