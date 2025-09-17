jQuery(document).ready(function ($) {
  $('.woocommerce-Button').on('click', function () {
    document.body.classList.add('-loading')
    let post_id = $(this).attr('data-id');
    let link = $(this).attr('data-value');

    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

    // if (!link.includes('product=')) {
    //   link = `https://${location.hostname}${link}&product=stars`;
    // } else if (!link.includes('layout=')) {
    //   link = `https://${location.hostname}${link}&layout=1`;
    // } else if ($(this).hasClass('isPlanet') && !isAndroid){
    //   link = `http://${location.hostname}${link}`;
    // } else{
    //   link = `https://${location.hostname}${link}`;
    // }

    //update to fix spotify
    if (!link.includes('product=')) {
      link = `http://${location.hostname}${link}&product=stars`;
    } else if (!link.includes('layout=')) {
      link = `http://${location.hostname}${link}&layout=1`;
    } else if ($(this).hasClass('isPlanet') && !isAndroid){
      link = `http://${location.hostname}${link}`;
    } else{
      link = `http://${location.hostname}${link}`;
    }


      
    $.ajax({
      type: 'POST',
      url: ajax_object.ajaxurl,
      data: {
        action: 'custom_update_post',
        post_id: post_id
      }
    }).done(function (data) {
      // alert('01')
      // // location.href = link;
      // window.open(link);
      // alert('02')
      // location.reload();

      var a = document.createElement('a');
      // a.target = "_blank";
      a.href = link;
      a.click();
    });
  });
});