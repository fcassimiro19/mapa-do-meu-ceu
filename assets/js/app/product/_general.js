setInterval(function() {
  let removedItems = ['variation-LinkdoSVG', 'variation-LinkdoPDF'];

  removedItems.forEach(item => {
    let itemElements = document.querySelectorAll(`.${item}`);
    if (itemElements) {
      itemElements.forEach(itemElement => {
        itemElement.parentNode.removeChild(itemElement);
      })
    }
  })
}, 1000);