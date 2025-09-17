<?php $template_dir = get_template_directory_uri(); ?>

<script type="text/javascript" src="<?php echo $template_dir ?>/assets/js/lib/d3.min.js"></script>
<script type="text/javascript" src="<?php echo $template_dir ?>/assets/js/lib/d3.geo.projection.min.js"></script>
<script type="text/javascript" src="<?php echo $template_dir ?>/assets/js/app/product/map-preview-pendant.js?v=<?php echo $site_version ?>"></script>

<style> 
  #wscp-button { 
    background: #1f6d75 !important;
    border-color:#1f6d75 !important;
  }
  .product-detail {
    padding: 12px;
  }
  .pendant-totals {
    position: relative;
  }
  .product-gallery-main img {
    border-radius: 0;
  }
</style>
<!-- 
<div class="under-header-message" style="background: red; text-align: center;">
  <p style="color: #fff; font-weight: bold;">Pingentes comprados entre 11/02 à 01/03 serão produzidos à partir do dia 02/03 por conta de manutenção do maquinário.</p>
</div> -->

<main class="container pendant-container" id="pe-page">
<?php
  if(have_posts()) { while(have_posts()) { the_post();
    global $product;
  $produto = format_single_product(get_the_ID());

  $upsells = $produto['upsells'];
  $upsell_product = new WC_Product(array_shift($upsells));
  $upsell_product_id = $upsell_product->get_id();
  $upsell_product_price = $upsell_product->get_price();
?>
<script>
  // let chainPrice = <#?php echo $upsell_product_price ?>;
  let chainPrice = '90.00';
  let chainId = <?php echo $upsell_product_id ?>;
</script>



  
  <div class="product-gallery" data-gallery="gallery">
    <!-- Slider de Prata -->
    <div class="product-gallery-prata" data-material="prata" data-gallery-count="<?php echo count($produto['gallery']) + 1 ?>">
      <div class="product-gallery-main">
        <div id="stars-preview" class="">
          <div class="map-content-scaled" data-color="black"></div>
          <div id="celestial-form"></div>
        </div>
        <img class="carousel-cell" data-gallery="list" src="<?php echo $produto['img_medium']; ?>" alt="<?= $produto['name']; ?>">
        <?php foreach($produto['gallery'] as $gallery_item) { ?>
          <img class="carousel-cell" data-gallery="list" src="<?php echo $gallery_item['img_medium']; ?>" alt="<?= $produto['name']; ?>">
        <?php } ?>
      </div>
      <div class="product-gallery-list">
        <img class="" src="<?php echo $template_dir; ?>/assets/images/pendant-stars-preview.png" alt="Preview Pingente das Estrelas">
        <img class="carousel-cell" data-gallery="list" src="<?php echo $produto['img_small']; ?>" alt="<?= $produto['name']; ?>">
        <?php foreach($produto['gallery'] as $gallery_item) { ?>
          <img class="carousel-cell" data-gallery="list" data-image="<?php echo $gallery_item['title']; ?>" src="<?php echo $gallery_item['img_small']; ?>" alt="<?= $produto['name']; ?>">
        <?php } ?>
      </div>
    </div>
    
    <!-- Slider de Ouro (oculto inicialmente) -->
    <div class="product-gallery-ouro" data-material="ouro" data-gallery-count="4" style="display: none;">
      <div class="product-gallery-main">
        <img class="carousel-cell" data-gallery="list" src="<?php echo $template_dir; ?>/assets/images/pingente-ouro/estrelas/1.jpeg" alt="Pingente das Estrelas - Ouro">
        <img class="carousel-cell" data-gallery="list" src="<?php echo $template_dir; ?>/assets/images/pingente-ouro/estrelas/2.jpeg" alt="Pingente das Estrelas - Ouro">
        <img class="carousel-cell" data-gallery="list" src="<?php echo $template_dir; ?>/assets/images/pingente-ouro/estrelas/3.jpeg" alt="Pingente das Estrelas - Ouro">
      </div>
      <div class="product-gallery-list">
        <img class="" src="<?php echo $template_dir; ?>/assets/images/pendant-stars-preview.png" alt="Preview Pingente das Estrelas">
        <img class="carousel-cell" data-gallery="list" src="<?php echo $template_dir; ?>/assets/images/pingente-ouro/estrelas/1.jpeg" alt="Pingente das Estrelas - Ouro">
        <img class="carousel-cell" data-gallery="list" src="<?php echo $template_dir; ?>/assets/images/pingente-ouro/estrelas/2.jpeg" alt="Pingente das Estrelas - Ouro">
        <img class="carousel-cell" data-gallery="list" src="<?php echo $template_dir; ?>/assets/images/pingente-ouro/estrelas/3.jpeg" alt="Pingente das Estrelas - Ouro">
      </div>
    </div>

    <?php 
      $server_name = $_SERVER['SERVER_NAME'];
      if (substr_count($server_name, 'homolog') > 0 || substr_count($server_name, 'development') > 0) {
        echo '<div class="wpcf7-form sent"></div>';
      } 
    ?>

  </div>
  <div class="product-detail">
    <div class="product-block">
      <h2 style="font-family: serif; color: #1f6d75; font-size: 26px; line-height: 30px; margin-bottom: 12px; text-transform: uppercase; ">COMO ESTAVAM AS ESTRELAS EM UM MOMENTO ESPECIAL</h2>
      <p>A representação perfeita das estrelas mais brilhantes que estavam no céu em um momento de sua escolha gravadas em um lindo pingente.</p>
      <strong id="material-info-estrelas" style="display: block; margin: 12px 0">Material: Prata com banho de ródio</strong>
      <strong style="display: block; margin: 12px 0">Diâmetro: 2,5cm</strong>
      <strong id="chain-info-estrelas" style="display: none; margin: 12px 0">Já acompanha corrente</strong>
    </div>

    <!-- Item Block -->
    <div class="product-block">
      <h3 class="-title">Local do seu momento</h3>
      <div class="-locations">
        <input placeholder="" type="text" name="place" id="place" class="--full" autocomplete="off">
        <ul class="locations-results"></ul>
      </div>
    </div>
    <!-- Item Block -->

    <div class="product-block pendant-date">
      <h3 class="-title">
        Data do seu momento
      </h3>
      <div class="input-group">
        <select data-type="dia"  required id="date-day" class="pendant-date-item date-trigger" autocomplete="off">
          <?php for($i=1;$i<32;$i++): ?>
            <option value="<?=$i?>"><?=sprintf("%02d",$i)?></option>
          <?php endfor; ?>
        </select>
        <select id='date-month' class="pendant-date-item date-trigger" data-type="mes" autocomplete="off">
          <option value="0"  disabled>- Selecione -</option>
          <option value="1" selected>Janeiro</option>
          <option value="2">Fevereiro</option>
          <option value="3">Março</option>
          <option value="4">Abril</option>
          <option value="5">Maio</option>
          <option value="6">Junho</option>
          <option value="7">Julho</option>
          <option value="8">Agosto</option>
          <option value="9">Setembro</option>
          <option value="10">Outubro</option>
          <option value="11">Novembro</option>
          <option value="12">Dezembro</option>
        </select>
        <select required id='date-year'class="pendant-date-item date-trigger" data-type="ano" autocomplete="off">
          <?php for($i=1600;$i<2201;$i++): ?>
            <option value="<?=$i?>" <?php if($i == 2020) echo "selected"; ?>><?=$i?></option>
          <?php endfor; ?>
        </select>
      </div>
    </div>

    <!-- Item Block -->
    <div class="card product-block" id="hour-block">
      <h3 class="-title">
        Hora do seu momento
      </h3> 
      <div class="input-group">

        <select class="date-trigger" id="time-hour" autocomplete="off">
        <?php for($i=0;$i<24;$i++): ?>
          <option value="<?=$i?>" <?php if($i == 22) echo "selected"; ?>><?=sprintf("%02d",$i)?></option>
        <?php endfor; ?>
        </select> 

        <strong>:</strong>


        <select class="date-trigger" id="time-minute" autocomplete="off">
        <?php for($i=0;$i<60;$i++): ?>
          <option value="<?=$i?>"><?=sprintf("%02d",$i)?></option>
        <?php endfor; ?>
        </select>

      </div>
    </div>
    <!-- Item Block -->

    <div class="card card-material product-block" style="position: relative">
      <h3 class="-title">
        Material
      </h3>
      <select name="pendant-material" id="select-material" autocomplete="off">
        <option value="prata" data-name="Prata" selected>Prata - R$<?php echo $product->get_available_variations()[0]['display_price'] ?>,00</option>
        <option value="ouro" data-name="Ouro">Ouro - R$<?php echo $product->get_available_variations()[1]['display_price'] ?>,00</option>
      </select>
    </div>

    <div class="product-block pendant-chain-block"> 
      <h3 class="-title">Corrente</h3>
      <select class="" name="pendant-chain" id="pendant-chain" autocomplete="off">
        <option value="veneziana" selected>Veneziana - 45cm (Fem.) - R$<?php echo $upsell_product->get_price(); ?>,00</option>
        <option value="sem-corrente">Sem corrente - R$0,00</option>
      </select>  
    </div>

    <div class="price-block-info">
      <p class="-price -tertiary"><span id="current-price">R$ 390,00</span></p>
      <p><i class=""></i> 3x de R$<span class="price-installments">130,00</span> sem juros.</p>
    </div>
    <div class="pendant-totals">
    
      <button class="pendant-buy-trigger button-default" id="buyButton" style="text-transform: unset;">Eternize seu momento</button>
      <?php woocommerce_template_single_add_to_cart(); ?>
    </div>
    <div class="shipping-block-info -tertiary">
      <p>Entrega para todo o Brasil</p>
    </div>
 
    <div class="-pendant-shipping">
      <?php echo do_shortcode(' [shipping_calculator_on_product_page]'); ?>
    </div>

    <?php if ( current_user_can( 'manage_options' ) ) { ?>
      <button type="button" class='button-default -tertiary -full' id="generate-pendant-image" style="margin-bottom: 10px;">Gerar Imagem</button>
    <?php } ?>

    <!--<div class="pendant-card-info">
      <p><strong>IMPORTANTE:</s></p>
      <p>São 5 dias úteis de produção + prazo de envio</p>
    </div>-->
  </div>

<?php } } // Fecha o loop ?>

<div class="modal loader-modal" data-visible="false">
</div>
</main>

<div class="modal" data-modal="custom-loading" data-hidden="true">
  <div class="modal-block">
    <div class="loading-block -pendant">
      <div class="loading-element"></div>
    </div>
  </div>
</div>


<?php get_template_part('template-parts/product/pingente-das-estrelas', 'config'); ?>

<script>
var geocoder;
function initMap() {
  geocoder = new google.maps.Geocoder();
}
</script>


<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBRYq3CZSMCtkliT-0H3-pzviPKID3pEd4&callback=initMap"></script>