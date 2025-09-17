class ProductControlPanel {
  constructor() {
    this.controlMenuElements = document.querySelectorAll('.control-panel-trigger'),
    this.controlNextTriggerElements = document.querySelectorAll('.control-panel-items .next'),
    this.controlTargetElement = document.getElementById('control-panel');

    this.init();
  }

  init() {
    if (!this.controlMenuElements) return;
    this.controlMenuElements.forEach(item => {
      item.addEventListener('click', () => {
        this.handleActiveStep(item)
      })
    })
    this.controlNextTriggerElements.forEach(item => {
      item.addEventListener('click', () => {
        this.handleActiveStep(item)
      })
    })
  }
  
  handleActiveStep(item) {

    const currentItemTarget = item.dataset.target;
    this.controlTargetElement.dataset.active = currentItemTarget;

  }
}

const productControlPanel = new ProductControlPanel();