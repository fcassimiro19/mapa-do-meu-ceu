<?php 
/**
 * Template Name: Resgatar Cupom
 */
  get_header(); 
?>

<?php 
  if(have_posts()) :
    while (have_posts()) : the_post(); 
?>

  <div class="single-post-content wrapper-808">
    <div class="header">
      <h1><?php echo get_the_title()?></h1>
    </div>
    <div class="post-body text-content"> 
      <form id="couponForm">
        <label>
          Seu e-mail
          <input type="email" name="user_email" id="user-email" required>
        </label>
        <label class="">
          E-mail do seu amigo(a)
          <input type="email" name="friend_email" id="friend-email" required>
        </label>
        <input type="hidden" name="coupon_code" id="couponCode">
        <input type="hidden" name="client_name" id="clientName">
        <input class="button-default -primary" type="submit" value="Surpreender amigo(a)" style="margin-top: 10px">
      </form>
    </div>
  </div>

  <script>
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const couponCode = urlParams.get('cc')
    const clientName = urlParams.get('cn')
    document.getElementById('couponCode').value = couponCode;
    document.getElementById('clientName').value = clientName;

    jQuery(document).ready(function ($) {
      $('#couponForm').on('submit', function (e) {
        e.preventDefault();
        document.body.classList.add('-loading')
        let friendEmail = document.getElementById('friend-email').value;
        let couponCode = document.getElementById('couponCode').value;
          
        $.ajax({
          type: 'POST',
          url: ajax_object.ajaxurl,
          data: {
            action: 'send_friend_coupon',
            friend_email: friendEmail,
            client_name: clientName,
            coupon_code: couponCode,
          }
        }).done(function (data) {
          document.body.classList.remove('-loading');
          document.querySelector('#couponForm').innerHTML = 'Enviado!';
        });
      });
    });
  </script>
  

<?php 
    endwhile; 
  endif; 
?>

<?php 
  get_footer();
?>