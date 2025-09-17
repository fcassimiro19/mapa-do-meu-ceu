let el = document.querySelectorAll('.display_meta th')


setTimeout(function() {
    if (el) {

  

    el.forEach(function (item) {
      if (item.innerText === 'Link do PDF:') {
        // let arr = [];
        // let link;
        // let parent = item.parentNode.querySelector('td');
        // let blocks = item.parentNode.querySelectorAll('p');
        // console.log(parent)

        // blocks.forEach(function (p) {
        //   arr.push(p.innerText)
        // })

        // link = arr.join('%0A');

        // parent.innerHTML = `<a class="" href="${link}" target="_blank">Ver PDF</a>`
        let orderText = document.querySelector('.woocommerce-order-data__heading').innerText;
        let orderId = orderText.match(/(\d+)/)[0];
        let link = item.parentNode.querySelector('p');
        linkUrl = link.innerText.replace(/enter-space/g, '%0A').replace(/normal-space/g, '%20').replace(/double-quotes/g, '%22').replace(/double-dots/g, ':').replace(/#/g, 'icon-hash').replace(/★/g, 'icon-black-star').replace(/✪/g, 'icon-round-star').replace(/✮/g, 'icon-mixed-star').replace(/✩/g, 'icon-light-star').replace(/❤/g, 'icon-black-hearth').replace(/♥/g, 'icon-black-hearth').replace(/♡/g, 'icon-transparent-hearth').replace(/♫/g, 'icon-music').replace('https://', 'http://').replace('http://www.mapadomeuceu.com.br', '');
        if (!linkUrl.includes('product=')) {
          link.innerHTML = `<a href="http://${location.host}${linkUrl}&product=stars&order_id=${orderId}" target="_blank">Ver PDF</a>`;
        } else {
          link.innerHTML = `<a href="http://${location.host}${linkUrl}&order_id=${orderId}" target="_blank">Ver PDF</a>`;
        }
      }
      if (item.innerText === 'Link do SVG:') {
        console.log('veio')
        let link = item.parentNode.querySelector('p');
        if (link && !link.innerText.includes('mapadomeuceu')) {
          link.innerHTML = `<a href="http://${location.host}/photos/${link.innerText}" target="_blank">Ver PNG</a>`;
        }
      } else {
        console.log('nao achou')
      }
    })
  } else {
    console.log('sem el')
  }
  
}, 1000)