<?php 
/**
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.6.0
 */

$template_dir = get_template_directory_uri(); 
$custom_primary_color = '#1f6d75';
if(get_field('custom_primary_color')) {
  $custom_primary_color = get_field('custom_primary_color');
}
?>

<style>
h1 {
  text-align: center;
  font-weight: 500;
}

.product-detail *:not(i) {
  font-family: "PT Sans","HelveticaNeue","Helvetica Neue",sans-serif;
}

.product-detail a,
.latest-news__more-news, 
.article-grid .article__more-link, 
.article-grid .article__container:focus .article__more-link, 
.article-grid .article__container:hover .article__more-link, 
.article-grid .article__date, 
.article-grid .article__featured-image, 
.latest-news__date, .latest-news__image, 
.featured-product__price, 
.woonder-product__price, 
.pagination .page-numbers, 
.pagination .prev, 
.pagination .next, 
.woocommerce-pagination ul .page-numbers, 
.woocommerce-pagination ul .prev::after, 
.woocommerce-pagination ul .next::after, 
.product .price .amount, 
.woocommerce-tabs .tabs .active a, 
.woocommerce-tabs .tabs a:focus, 
.woocommerce-tabs .tabs a:hover, 
.woocommerce .quantity .ui-spinner-button, 
.breadcrumbs .current-item, 
.breadcrumbs .woocommerce-breadcrumb,
.shipping-block-info p,
.price-block-info .-price {
  color:  <?php echo $custom_primary_color ?> !important;
}

.product-detail .btn-primary,
.product-detail .button, 
.widget_tag_cloud a, 
.widget_tag_cloud a:focus, 
.widget_tag_cloud a:hover,
.shipping-block-info {
  border-color:  <?php echo $custom_primary_color ?> !important;
}

#wscp-button,
.variations > tbody > tr > .label,
.product-detail .btn-primary,
.product-detail .button, 
.widget_calendar caption, 
.wpf_slider.ui-slider .ui-slider-handle, 
.wpf_slider.ui-slider .ui-widget-header, 
.pw-instagram__item--cta {
  background-color:   <?php echo $custom_primary_color ?> !important;
}

.variations > tbody > tr > .label {
  color: #fff;
  pointer-events: none
}

.pendant-totals form {
  display: flex;
  height: auto;
}

.pendant-totals form button {
  order: -1;
  margin-right: 10px !important;
}

.single-product button[name="add-to-cart"] {
  display: block;
  width: 100%;
	font-size: .9rem;
	font-weight: 700;
	text-transform: uppercase; 
	letter-spacing: .5px;
	color: #fff;
	border-radius: 0;
	cursor: pointer;
	transition: all .1s ease-out;
  box-shadow: 5px 12px 24px rgba(0,0,0,.12), 0 6px 10px rgba(0,0,0,.12);
  background: <?php echo $custom_primary_color ?>;
  padding: 15px 30px !important;
  border-radius: 3px;
  border: 2px solid <?php echo $custom_primary_color ?>;
}

.single-product button[name="add-to-cart"]:focus,
.single-product button[name="add-to-cart"]:active,
.single-product button[name="add-to-cart"]:hover {
  background: <?php echo $custom_primary_color ?> !important;
  border: 2px solid <?php echo $custom_primary_color ?> !important;
}

.woocommerce-variation-add-to-cart {
  display: flex;
}

.footer {
  margin-top: 40px;
}

.product-detail textarea,
.product-detail input[type="text"] {
  font-size: 16px;
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 0;
	box-shadow: 0 1px 2px rgba(0,0,0,.1);
	width: 100% !important;
	height: 2.5rem;
	padding: .5rem 1.75rem .5rem 1rem;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	transition: all .1s ease-out;
  margin: 0;
}
.price-block-info .-price {
  margin-bottom: 20px;
}

.product-detail label {
  font-weight: 500;
}
.single_add_to_cart_button {
  display: inline-block;
	font-size: .9rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: .5px;
	color: #fff;
	border-radius: 0;
	padding: .65rem 1.5rem;
	cursor: pointer;
	transition: all .1s ease-out;
}

.single_add_to_cart_button.disabled {
  opacity: 1 !important;
}

.product-detail[class*="virtual"] .price-block-info,
.product-detail[class*="virtual"] .shipping-block-info {
  display: none;
}
@media (max-width: 1023px) {
  .single-product-container .quantity {
    max-width: 100%;
	  width: 100%;
  }
  .single_add_to_cart_button {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1000;
    line-height: 35px;
    z-index: 999;
  }
}
</style>

<div class="container notificacao">
  <?php wc_print_notices(); ?>
</div>

<main class="container single-product-container">
<?php
  if(have_posts()) { while(have_posts()) { the_post();
  $produto = format_single_product(get_the_ID());

?>

  <div class="product-gallery" data-gallery="gallery" data-gallery-count="<?php echo count($produto['gallery']) ?>">
    <div class="product-gallery-main">
      <img data-gallery="list" src="<?php echo $produto['img']; ?>" alt="<?= $produto['name']; ?>">
      <?php foreach($produto['gallery'] as $gallery_item) { ?>
        <img data-gallery="list" src="<?php echo $gallery_item['img']; ?>" alt="<?= $produto['name']; ?>">
      <?php } ?>
    </div>
    <div class="product-gallery-list">
      <?php foreach($produto['gallery'] as $gallery_item) { ?>
        <img data-gallery="list" data-image="<?php echo $gallery_item['title']; ?>" src="<?php echo $gallery_item['img']; ?>" alt="<?= $produto['name']; ?>">
      <?php } ?>
    </div>


    <?php 
      $server_name = $_SERVER['SERVER_NAME'];
      if (substr_count($server_name, 'homolog') > 0 || substr_count($server_name, 'development') > 0) {
        echo '<div class="wpcf7-form sent"></div>';
      } 
    ?>


  </div>
  <div class="product-detail __<?php echo $produto['slug'] ?>">

    <div class="product-block mb-4">
      <h1><?php echo $produto['name'] ?></h1>
      <p><?php echo $produto['description'] ?></p>
    </div>

    <div class="pendant-totals">
      <?php woocommerce_template_single_add_to_cart(); ?>
    </div>
    <div class="price-block-info">
      <p class="-price"><span id="current-price"><?php echo $produto['price'] ?></span></p>
      <!-- <p><i class="fas fa-credit-card"></i> 3x de R$<span class="price-installments">153,33</span> sem juros.</p> -->
    </div>
    <div class="shipping-block-info">
      <p><i class=""></i> Entrega para todo o Brasil</p>
    </div>

    <!-- <div class="pendant-card-info mt-2 mb-4">
      <p><strong>IMPORTANTE:</strong></p>
      <p>São 5 dias úteis de produção + prazo de envio</p>
    </div> -->

  </div>

<?php } } // Fecha o loop ?>

<div class="modal loader-modal" data-visible="false">
</div>
</main>

<!-- <script type="text/javascript" src="<#?php echo $template_dir ?>/assets/src/js/slick.min.js"></script> -->
<!-- <script type="text/javascript" src="<#?php echo $template_dir ?>/assets/src/js/planet-orbit-pingente.js"></script>
<script type="text/javascript" src="<#?php echo $template_dir ?>/assets/src/js/product/product-pingente.js"></script> -->


<script type="text/javascript">
  $(document).ready(function(){
    $('.product-gallery-main').slick({ 
      slidesToShow: 1, 
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.product-gallery-list'
    });
    $('.product-gallery-list').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.product-gallery-main',
      dots: false,
      centerMode: true,
      arrows: false,
      focusOnSelect: true,
      centerMode: true
    });
  });
</script>
