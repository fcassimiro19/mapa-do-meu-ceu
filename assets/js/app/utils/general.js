const mqMax = window.matchMedia("(max-width: 1023px)").matches;

class Modal {
  constructor(target) {
    this.modalElement = document.querySelector(`.modal[data-modal="${target}"]`),
    this.closeModalElement = this.modalElement.querySelector('.modal-close');

    this.init();
  }

  init() {
    this.closeModalElement.addEventListener('click', () => {
      let preview = document.getElementById('preview');
      let mapSnapshotBlock = document.getElementById('mapSnapshotBlock');
      
      if (document.querySelector('div[data-modal="map-zoom"] .modal-block #mapSnapshotBlock')) {
        preview.appendChild(mapSnapshotBlock)
      }
      this.hide();
    })
  }

  open() {
    this.modalElement.dataset.hidden = 'false';
  }

  hide() {
    this.modalElement.dataset.hidden = 'true';
  }

  
}

class Utils {
  constructor() {
    this.initialScreenSize = window.innerHeight;
  }

  stringToSlug(str) {
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àãáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  }

  toggleLoading(element) {
    console.log('loading...')
    element.classList.toggle('-loading')
  }

  keyboardActive() {
    let kbactive = window.innerHeight;

    console.log(kbactive, 'kbactive');
    console.table(this.initialScreenSize, 'this.initialScreenSize')
    if (kbactive === this.initialScreenSize) return false;

    return true;
  }

  isiOSDevice() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
      // iPad on iOS 13 detection
      || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }
  
  makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getInstallments(price) {
    return parseFloat(parseFloat(price) / 4).toFixed(2).replace('.', ',');
  }
}

export { mqMax, Modal, Utils };