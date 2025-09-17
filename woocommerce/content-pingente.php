<?php $template_dir = get_template_directory_uri(); ?>

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

<!-- <div class="under-header-message" style="background: red; text-align: center;">
  <p style="color: #fff; font-weight: bold;">Pingentes comprados entre 11/02 à 01/03 serão produzidos à partir do dia 02/03 por conta de manutenção do maquinário.</p>
</div> -->

<main class="container pendant-container" id="pp-page">
<?php
  if(have_posts()) { while(have_posts()) { the_post();
    global $product;
  $produto = format_single_product(get_the_ID());

  $upsells = $produto['upsells'];
  $upsell_product = new WC_Product(array_shift($upsells));
  $upsell_product_id = $upsell_product->get_id();
  $upsell_product_price = $upsell_product->get_price();

  // var_dump(explode(',',$product->get_categories())[0]);
  $terms = get_the_terms( 203, 'product_cat');
  $term = $product->get_category_ids()[0];
  $catp = get_field('teste', 'product_cat_' . $term);
  $out_of_stock = true;
  if ( $product->is_type( 'variable' ) ) {
    foreach ( $product->get_available_variations() as $variation ) {
        $variation_product = new WC_Product_Variation( $variation['variation_id'] );
        if ( $variation_product->get_stock_status() !== 'outofstock' ) {
            $out_of_stock = false;
        }
    }
  } else if ( $product->is_type( 'grouped' ) ) {
    foreach ( $product->get_children() as $child_id ) {
        $child_product = wc_get_product( $child_id );
        if ( !$child_product->is_out_of_stock() ) {
            $out_of_stock = false;
        }
    }
  } else {
      if ( !$product->is_out_of_stock() ) {
          $out_of_stock = false;
      }
  }

  var_dump($out_of_stock);
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
        <img class="carousel-cell" data-gallery="list" src="<?php echo $produto['img_medium']; ?>" alt="<?= $produto['name']; ?>">
        <?php foreach($produto['gallery'] as $gallery_item) { ?>
          <img class="carousel-cell" data-gallery="list" src="<?php echo $gallery_item['img_medium']; ?>" alt="<?= $produto['name']; ?>">
        <?php } ?>
      </div>
      <div class="product-gallery-list">
        <img class="carousel-cell" data-gallery="list" src="<?php echo $produto['img_small']; ?>" alt="<?= $produto['name']; ?>">
        <?php foreach($produto['gallery'] as $gallery_item) { ?>
          <img class="carousel-cell" data-gallery="list" data-image="<?php echo $gallery_item['title']; ?>" src="<?php echo $gallery_item['img_small']; ?>" alt="<?= $produto['name']; ?>">
        <?php } ?>
      </div>
    </div>
    
    <!-- Slider de Ouro (oculto inicialmente) -->
    <div class="product-gallery-ouro" data-material="ouro" data-gallery-count="6" style="display: none;">
      <div class="product-gallery-main">
        <img class="carousel-cell" data-gallery="list" src="<?php echo $template_dir; ?>/assets/images/pingente-ouro/planetas/1.jpeg" alt="Pingente de Ouro">
        <img class="carousel-cell" data-gallery="list" src="<?php echo $template_dir; ?>/assets/images/pingente-ouro/planetas/2.jpeg" alt="Pingente de Ouro">
        <img class="carousel-cell" data-gallery="list" src="<?php echo $template_dir; ?>/assets/images/pingente-ouro/planetas/3.jpeg" alt="Pingente de Ouro">
        <img class="carousel-cell" data-gallery="list" src="<?php echo $template_dir; ?>/assets/images/pingente-ouro/planetas/4.jpeg" alt="Pingente de Ouro">
        <img class="carousel-cell" data-gallery="list" src="<?php echo $template_dir; ?>/assets/images/pingente-ouro/planetas/5.jpeg" alt="Pingente de Ouro">
        <img class="carousel-cell" data-gallery="list" src="<?php echo $template_dir; ?>/assets/images/pingente-ouro/planetas/6.jpeg" alt="Pingente de Ouro">
      </div>
      <div class="product-gallery-list">
        <img class="carousel-cell" data-gallery="list" src="<?php echo $template_dir; ?>/assets/images/pingente-ouro/planetas/1.jpeg" alt="Pingente de Ouro">
        <img class="carousel-cell" data-gallery="list" src="<?php echo $template_dir; ?>/assets/images/pingente-ouro/planetas/2.jpeg" alt="Pingente de Ouro">
        <img class="carousel-cell" data-gallery="list" src="<?php echo $template_dir; ?>/assets/images/pingente-ouro/planetas/3.jpeg" alt="Pingente de Ouro">
        <img class="carousel-cell" data-gallery="list" src="<?php echo $template_dir; ?>/assets/images/pingente-ouro/planetas/4.jpeg" alt="Pingente de Ouro">
        <img class="carousel-cell" data-gallery="list" src="<?php echo $template_dir; ?>/assets/images/pingente-ouro/planetas/5.jpeg" alt="Pingente de Ouro">
        <img class="carousel-cell" data-gallery="list" src="<?php echo $template_dir; ?>/assets/images/pingente-ouro/planetas/6.jpeg" alt="Pingente de Ouro">
      </div>
    </div>


    <div id="pendant-simulator" style="position: absolute; left: -9999px">
    <!-- <div id="pendant-simulator"> -->
      <div class="canvas-block">
        <canvas id="LAYER1" width="800" height="800" style="position: absolute; left: 0; top: 0; z-index: 0;">
        </canvas>
        <canvas id="LAYER2" width="800" height="800" style="position: absolute; left: 0; top: 0; z-index: 1;">
        </canvas>
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
      <h2 style="font-family: serif; color: #1f6d75; font-size: 26px; line-height: 30px; margin-bottom: 12px; text-transform: uppercase; ">O Alinhamento dos Planetas em uma Data Especial</h2>
      <p>A representação perfeita do sistema solar registrando a data de sua escolha em um lindo pingente.</p>
      <strong id="material-info" style="display: block; margin: 12px 0">Material: Prata banhado a ródio</strong>
      <strong style="display: block; margin: 12px 0">Diâmetro: 2,5cm</strong>
      <strong id="chain-info" style="display: none; margin: 12px 0">Já acompanha corrente</strong>
    </div>


    <div class="product-block pendant-date">
      <h3 class="-title">
        Data do seu momento
      </h3>
      <div class="input-group">
        <select data-type="dia"  required id="pendant-day" class="pendant-date-item" autocomplete="off">
          <?php for($i=1;$i<32;$i++): ?>
            <option value="<?=$i?>"><?=sprintf("%02d",$i)?></option>
          <?php endfor; ?>
        </select>
        <select id='pendant-month' class="pendant-date-item" data-type="mes" autocomplete="off">
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
        <select required id='pendant-year'class="pendant-date-item" data-type="ano" autocomplete="off">
          <?php for($i=1600;$i<2201;$i++): ?>
            <option value="<?=$i?>" <?php if($i == 2020) echo "selected"; ?>><?=$i?></option>
          <?php endfor; ?>
        </select>
      </div>
    </div>

    <div class="card card-material product-block" style="position: relative">
      <h3 class="-title">
        Material
      </h3>
      <select name="pendant-material" id="select-material" autocomplete="off">
        <option value="prata" data-name="Prata" selected>Prata</option>
        <option value="ouro" data-name="Ouro">Ouro</option>
      </select>
    </div>

    <div class="card card-acabamento product-block" style="position: relative">
      <h3 class="-title">
        Acabamento
      </h3>
      <select name="pendant-acabamento" id="select-acabamento" autocomplete="off">
        <!-- Opções de Prata -->
        <option value="Liso Perfurado" data-name="Liso Perfurado" data-variation-id="0" data-material="prata" selected>Liso Perfurado - R$<?php echo $product->get_available_variations()[0]['display_price'] ?>,00</option>
        <option value="Resina Azul" data-name="Resina Azul" data-variation-id="1" data-material="prata">Resina Azul - R$<?php echo $product->get_available_variations()[1]['display_price'] ?>,00</option>
        <option value="Cravejado com Zircônia" data-name="Cravejado com Zircônia" data-variation-id="2" data-material="prata">Cravejado com Zircônia - R$<?php echo $product->get_available_variations()[2]['display_price'] ?>,00</option>
        
        <!-- Opções de Ouro (ocultas inicialmente) -->
        <option value="Liso Perfurado" data-name="Liso Perfurado" data-variation-id="3" data-material="ouro" style="display: none;">Liso Perfurado - R$<?php echo $product->get_available_variations()[3]['display_price'] ?>,00</option>
        <option value="Resina Azul" data-name="Resina Azul" data-variation-id="4" data-material="ouro" style="display: none;">Resina Azul - R$<?php echo $product->get_available_variations()[4]['display_price'] ?>,00</option>
        <option value="Cravejado com Zircônia" data-name="Cravejado com Zircônia" data-variation-id="5" data-material="ouro" style="display: none;">Cravejado com Zircônia - R$<?php echo $product->get_available_variations()[5]['display_price'] ?>,00</option>
      </select>
      	
    </div>

    <div class="product-block pendant-chain-block">
      <h3 class="-title">Corrente</h3>
      <select name="pendant-chain" id="pendant-chain" autocomplete="off">
        <option value="veneziana" selected>Veneziana - 45cm (Fem.) - R$<?php echo $upsell_product->get_price(); ?>,00</option>
        <option value="sem-corrente">Sem corrente - R$0,00</option>
      </select> 
    </div>

    <div class="price-block-info">
      <p class="-price -tertiary"><span id="current-price">R$ 390,00</span></p>
      <p><i class=""></i> 3x de R$<span class="price-installments">130,00</span> sem juros.</p>
    </div>
    <div class="pendant-totals">
      <button class="pendant-buy-trigger button-default" style="text-transform: unset;">Eternize seu momento</button>
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

<script type="text/javascript" src="<?php echo $template_dir ?>/assets/js/app/product/planet-orbit-pingente.js"></script>