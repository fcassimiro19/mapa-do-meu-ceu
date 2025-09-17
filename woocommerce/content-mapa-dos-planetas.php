<?php 
$template_dir = get_template_directory_uri(); 
$site_version = $GLOBALS['site_version'];
?>

<script>
(function () {
  // --- helpers para encontrar as fontes oficiais ---
  function getPriceSource() {
    return document.getElementById('current-price');
  }
  function getOfficialBlock() {
    var src = getPriceSource();
    return src ? src.closest('.price-block-info') : null;
  }
  function getInstallmentsSource() {
    var block = getOfficialBlock();
    // Preferimos o que está no mesmo bloco do preço oficial
    return (block && block.querySelector('.price-installments')) || document.querySelector('.price-installments');
  }

  // --- espelha um valor de uma fonte para todos os clones data-ref ---
  function mirror(attr, sourceNode) {
    if (!sourceNode) return;
    var val = (sourceNode.textContent || '').trim();
    document.querySelectorAll('[data-ref="' + attr + '"]').forEach(function (n) {
      if (n !== sourceNode) n.textContent = val;
    });
  }

  function syncAll() {
    mirror('current-price', getPriceSource());
    mirror('price-installments', getInstallmentsSource());
  }

  // Observa mudanças de texto na fonte e resincroniza
  function observe(node, cb) {
    if (!node) return null;
    var obs = new MutationObserver(cb);
    obs.observe(node, { childList: true, characterData: true, subtree: true });
    return obs;
  }

  function init() {
    syncAll();

    // Observa tanto o preço quanto as parcelas oficiais
    var priceObs = observe(getPriceSource(), syncAll);
    var instObs  = observe(getInstallmentsSource(), syncAll);

    // Mudanças de seleção que normalmente alteram preço/parcelas
    document.body.addEventListener('change', function (e) {
      // ajuste os seletores conforme o que altera o preço no seu min.js
      if (e.target && (
        e.target.matches('input[name="map-size"]') ||
        e.target.matches('.date-trigger') ||
        e.target.matches('.layout-trigger') ||
        e.target.matches('[name="map-color"]')
      )) {
        setTimeout(syncAll, 0);
      }
    });

    // Opcional: expõe para debug manual no console
    window.__priceSync = { sync: syncAll, priceObs: priceObs, instObs: instObs };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>

<?php 
$server_name = $_SERVER['SERVER_NAME'];
if (substr_count($server_name, 'homolog') > 0 || substr_count($server_name, 'development') > 0) {
  echo '<div class="wpcf7-form sent" data-status="sent"></div>';
} 
?>

<?php
  if(have_posts()) { while(have_posts()) { the_post();
  $product_formated = format_single_product(get_the_ID());
?>

<!-- Map Container -->
<div class="map-container" id="mdp-page">

  <!-- Map Preview -->
  <div id="preview">
    <img class="map-placeholder" src="<?php echo $template_dir; ?>/assets/images/map-planet-placeholder.jpg" alt="Mapa dos Planetas - Imagem Ilustrativa">
    <div id="mapSnapshotBlock">
      <div id="mapSnapshot">

        <div class="map-content planet-map -bg-stars" id="mapContent">
          <p class="placeholder-info">Imagem Ilustrativa</p>
          <div class="map-content-scaled" data-color="black"><div class="-cborder"></div></div>
          <div class="map-text">
            <p class="preview-message"></p>
          </div> 
          <div class="map-info">
            <div class="map-spotify-qrcode hidden">
              <img class="" src="" alt="Spotify QR Code">
            </div>
            <p class="-title">Mapa do Meu Céu</p>
            <p class="-date">01/01/2020</p>
          </div>
          <div id="map-planet-simulator">
            <div class="canvas-block">
              <canvas id="LAYER1" width="2000" height="2000" style="position: absolute; left: 0; top: 0; z-index: 0;">
              </canvas>
              <canvas id="LAYER2" width="2000" height="2000" style="position: absolute; left: 0; top: 0; z-index: 1;">
              </canvas>
            </div>
          </div>
          <div class="planet-subs">
            <ul> 
              <li class="-sun">Sol</li>
              <li class="-mercury">Mercúrio</li>
              <li class="-venus">Vênus</li>
              <li class="-earth">Terra</li>
              <li class="-mars">Marte</li>
              <li class="-jupiter">Júpiter</li>
              <li class="-saturn">Saturno</li>
              <li class="-uranus">Urano</li>
              <li class="-neptune">Netuno</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
    <i class="icon-zoom-in modal-trigger" data-target="map-zoom"></i>
  </div>
  <!-- Map Preview -->

  <!-- Control Panel -->
  <div id="control-panel" data-active="1">

    <!-- Control Menu -->
    <div class="control-panel-menu">
      <button class="control-panel-trigger" data-target="1">Design</button>
      <button class="control-panel-trigger" data-target="2">Momento</button>
      <button class="control-panel-trigger" data-target="3">Tamanho</button>
    </div>
    <!-- Control Menu -->

    <!-- Control Items -->
    <div class="control-panel-items">

      <!-- Item -->
      <div class="item" id="step1">
        <!-- Item Block -->
        <div class="item-block">
          <label>Modelo</label>
          <div class="label-group label-group--4">
            <input class="layout-trigger" type="radio" value="Modelo 1" data-pdf="1" name="layout" id="layout-1" checked autocomplete="off">
            <label class="layout-map" for="layout-1" style="background-image: url(<?php echo $template_dir; ?>/assets/images/mdp1.jpg)"></label>

            <input class="layout-trigger" type="radio" value="Modelo 2" data-pdf="2" name="layout"  id="layout-2" autocomplete="off">
            <label class="layout-map" for="layout-2" style="background-image: url(<?php echo $template_dir; ?>/assets/images/mdp2.jpg)"></label>

            <input class="layout-trigger" type="radio" value="Modelo 3" data-pdf="3" name="layout"  id="layout-3" autocomplete="off">
            <label class="layout-map" for="layout-3" style="background-image: url(<?php echo $template_dir; ?>/assets/images/mdp3.jpg)"></label>
          </div>
        </div>
        <!-- Item Block -->

        <!-- Item Block -->
        <div class="item-block">
          <label>Cor do Pôster</label>
          <div class="label-group label-group--2">
            <input type="radio" name="map-color" value="rgb(0,0,0)" data-colorhex="000000" data-colorname="rgb(0,0,0) - Preto" id="map-color-black" checked autocomplete="off">
            <label class="map-color-item -planet" for="map-color-black" style="background-color: rgb(0,0,0)"></label>

            <input type="radio" name="map-color" value="rgb(255,255,255)" data-colorhex="ffffff" data-colorname="rgb(255,255,255) - Branco" id="map-color-white" autocomplete="off">
            <label class="map-color-item -planet" for="map-color-white" style="background-color: rgb(255,255,255)"></label>
          </div>
          <?php if ( current_user_can( 'manage_options' ) ) { ?>
            <label style="margin-top: 10px">Cor Customizada</label>
            <div class="input-group input-group--cta">
              <input type="text" id="custom-color" autocomplete="off">
              <button class="cta cta--medium cta--primary" id="custom-color-trigger">Aplicar</button>
            </div>
          <?php } ?>
        </div>
        <!-- Item Block -->

        <!-- Item Block -->
        <div class="item-block">
          <div class="switch-group">
            <span class="text">Fundo de Estrelas</span>
            <label class="switch --primary">
              <input type="checkbox" name="fundo" value="Sim" id="fundo" checked autocomplete="off">
              <span></span>
            </label>
          </div>
        </div>
        <!-- Item Block -->

        <!-- Item Block -->
        <div class="item-block map-border-block">
          <div class="switch-group">
            <span class="text">Borda do Pôster</span>
            <label class="switch --primary">
              <input type="checkbox" name="map-border" value="Sim" id="map-border" checked autocomplete="off">
              <span></span>
            </label>
          </div>
        </div>
        <!-- Item Block -->

        <div class="next-block">
				<div style="padding-bottom: 0.5rem; font-weight: 600; display: flex; flex-position: row; justify-content: space-between;">
				  <div style="display: flex; flex-position: row">
					  R$ <span data-ref="current-price">185,00</span>
				</div>
				<p class="installments-inline">
				  <i class="icon-card"></i> 3x de R$
				  <span data-ref="price-installments">58,33</span>
				  sem juros.
				</p>			
			</div>
          <button class="next" data-target="2">Próximo</button>
        </div>
      </div>
      <!-- Item -->

      <!-- Item -->
      <div class="item" id="step2">

        <!-- Item Block -->
        <div class="item-block">
          <label>Quando foi esse momento?</label>
          <div class="input-group">
            <select class="date-trigger" required id="date-day" autocomplete="off"  >
              <?php for($i=1;$i<32;$i++): ?>
                <option value="<?=$i?>"><?=sprintf("%02d",$i)?></option>
              <?php endfor; ?>
            </select>

            <select class="date-trigger" required id="date-month" autocomplete="off"  >
                <option value="1">Janeiro</option>
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

            <select class="date-trigger" required id="date-year" autocomplete="off"  >
              <?php for($i=1600;$i<2201;$i++): ?>
                <option value="<?=$i?>" <?php if($i == 2020) echo "selected"; ?>><?=$i?></option>
              <?php endfor; ?>
            </select>

          </div>
        </div>
        <!-- Item Block -->


        <!-- Item Block -->
        <div class="item-block">
          <label class="title-group">
            <span>Escreva sua Mensagem</span>
            <span><span id="textarea-size">0</span>/<span class="textarea-size-total">300</span></span>
          </label>
          <textarea rows=4 id="message" maxlength=300 style="resize:none;" autocomplete="off"></textarea>
        </div>
        <!-- Item Block -->

        <!-- Item Block -->
        <div class="item-block">
          <label class="title-group">
            <span>Título</span>
            <span><span id="title-size">15</span>/50</span>
          </label>
          <input type="text" id="title" maxlength=50 value="Mapa do Meu Céu" autocomplete="off"/>
        </div>
        <!-- Item Block -->

        <!-- Item Block -->
        <div class="item-block">
          <label>Fonte</label>
          <div class="label-group label-group--2">
            <input type="radio" name="font-family" value="Agane" id="font-a" checked autocomplete="off">
            <label class="font-item" for="font-a" style="background-image: url(<?php echo $template_dir; ?>/assets/images/font-a.png)"></label>

            <input type="radio" name="font-family" value="Courgette" id="font-b" autocomplete="off">
            <label class="font-item" for="font-b" style="background-image: url(<?php echo $template_dir; ?>/assets/images/font-b.png)"></label>
          </div>
        </div>
        <!-- Item Block -->

        <!-- Item Block -->
        <div class="item-block">
          <div class="switch-group switch-group--icon -space-bottom--small">
            <div class="label-group">
              <span class="label-default">QR Code Spotify</span>
            </div>
            <label class="switch --primary">
              <input class="toggle-input-trigger" name="spotify" id="spotify" value="Sim" type="checkbox" autocomplete="off">
              <span></span>
            </label>
            <input type="text" class="toggled-item" id="spotify-url" placeholder="spotify:track:2tpWsVSb9UEmDRxAl1zhX1">
          </div>

        </div>
        <!-- Item Block -->

        <div class="next-block">
				<div style="padding-bottom: 0.5rem; font-weight: 600; display: flex; flex-position: row; justify-content: space-between;">
				  <div style="display: flex; flex-position: row">
					  R$ <span data-ref="current-price">185,00</span>
				</div>
				<p class="installments-inline">
				  <i class="icon-card"></i> 3x de R$
				  <span data-ref="price-installments">58,33</span>
				  sem juros.
				</p>			
			</div>
          <button class="next" data-target="3">Próximo</button>
        </div>
      </div>
      <!-- Item -->


      <!-- Item -->
      <div class="item" id="step3">
        <!-- Item Block -->
        <div class="item-block">
          <label class="modal-trigger" data-target="map-size">Tamanhos <i class="icon-info"></i></label>
          <div class="label-group label-group--column">

            <strong style="margin-bottom: 10px;">Com Moldura</strong>

            <input type="radio" name="map-size" id="size-a4" value="A4 - Com Moldura" autocomplete="off">
            <label class="map-size-item" for="size-a4">
              <span>A4
               <!-- <small>com moldura</small> -->
               </span>
              <span>21 x 30cm</span>
              <strong>R$<?php echo wc_get_product(get_the_id())->get_available_variations()[1]['display_price'] ?></strong>
            </label>
            
            <input type="radio" name="map-size" id="size-a3" value="A3 - Com Moldura" checked autocomplete="off">
            <label class="map-size-item" for="size-a3">
              <span>A3
               <!-- <small>com moldura</small> -->
               </span>
              <span>30 x 42cm</span>
              <strong>R$<?php echo wc_get_product(get_the_id())->get_available_variations()[2]['display_price'] ?></strong>
            </label>

            <input type="radio" name="map-size" id="size-a2" value="A2 - Com Moldura" autocomplete="off">
            <label class="map-size-item" for="size-a2">
              <span>A2
               <!-- <small>com moldura</small> -->
               </span>
              <span>42 x 60cm</span>
              <strong>R$<?php echo wc_get_product(get_the_id())->get_available_variations()[3]['display_price'] ?></strong>
            </label>

            <strong style="margin-bottom: 10px;" class="modal-trigger" data-target="border-premium">Com Moldura Premium <i class="icon-info"></i></strong>

            <input type="radio" name="map-size" id="size-a4p" value="A4 - Com Moldura Premium" autocomplete="off">
            <label class="map-size-item" for="size-a4p">
              <span>A4
               <!-- <small>com moldura</small> -->
               </span>
              <span>21 x 30cm</span>
              <strong>R$<?php echo wc_get_product(get_the_id())->get_available_variations()[7]['display_price'] ?></strong>
            </label>
            
            <input type="radio" name="map-size" id="size-a3p" value="A3 - Com Moldura Premium" autocomplete="off">
            <label class="map-size-item" for="size-a3p">
              <span>A3
               <!-- <small>com moldura</small> -->
               </span>
              <span>30 x 42cm</span>
              <strong>R$<?php echo wc_get_product(get_the_id())->get_available_variations()[8]['display_price'] ?></strong>
            </label>

            <input type="radio" name="map-size" id="size-a2p" value="A2 - Com Moldura Premium" autocomplete="off">
            <label class="map-size-item" for="size-a2p">
              <span>A2
               <!-- <small>com moldura</small> -->
               </span>
              <span>42 x 60cm</span>
              <strong>R$<?php echo wc_get_product(get_the_id())->get_available_variations()[9]['display_price'] ?></strong>
            </label>

            <strong style="margin-bottom: 10px;">Sem Moldura</strong>

            <input type="radio" name="map-size" id="size-a4-sem" value="A4 - Sem Moldura" autocomplete="off">
            <label class="map-size-item" for="size-a4-sem">
              <span>A4
               <!-- <small>sem moldura</small> -->
               </span>
              <span>21 x 30cm</span>
              <strong>R$<?php echo wc_get_product(get_the_id())->get_available_variations()[4]['display_price'] ?></strong>
            </label>
            
            <input type="radio" name="map-size" id="size-a3-sem" value="A3 - Sem Moldura" autocomplete="off">
            <label class="map-size-item" for="size-a3-sem">
              <span>A3
               <!-- <small>sem moldura</small> -->
               </span>
              <span>30 x 42cm</span>
              <strong>R$<?php echo wc_get_product(get_the_id())->get_available_variations()[5]['display_price'] ?></strong>
            </label>

            <input type="radio" name="map-size" id="size-a2-sem" value="A2 - Sem Moldura" autocomplete="off">
            <label class="map-size-item" for="size-a2-sem">
              <span>A2
               <!-- <small>sem moldura</small> -->
               </span>
              <span>42 x 60cm</span>
              <strong>R$<?php echo wc_get_product(get_the_id())->get_available_variations()[6]['display_price'] ?></strong>
            </label> 

            <input type="radio" name="map-size" id="size-pdf" value="PDF" autocomplete="off">
            <label class="map-size-item" for="size-pdf">
              <span>PDF</span>
              <span>(Arq. Digital)</span>
              <strong>R$<?php echo wc_get_product(get_the_id())->get_available_variations()[0]['display_price'] ?></strong>
            </label>

            <?php if (isset($_GET['homolog']) && $_GET['homolog'] === 'true'): ?>
            <strong style="margin-bottom: 10px;" class="modal-trigger" data-target="azulejo">Azulejo <i class="icon-info"></i></strong>

            <input type="radio" name="map-size" id="size-azulejo" value="Azulejo" autocomplete="off">
            <label class="map-size-item" for="size-azulejo">
              <span>Azulejo</span>
              <span>20 x 30cm</span>
              <strong>R$<?php echo wc_get_product(get_the_id())->get_available_variations()[10]['display_price'] ?></strong>
            </label>
            <?php endif; ?>
          </div>
        </div>
        <!-- Item Block -->

        <!-- Item Block -->
        <div class="item-block border-type-block">
          <label class="modal-trigger" data-target="border-type">Moldura <i class="icon-info"></i></label>
          <div class="label-group label-group--3">
            <input type="radio" name="map-frame-color" value="Preto" id="map-frame-black" checked autocomplete="off">
            <label class="map-frame-color-item map-frame-color-item--black" for="map-frame-black" style="background: #000; color: #fff">Preta</label>

            <input type="radio" name="map-frame-color" value="Branco" id="map-frame-white" autocomplete="off">
            <label class="map-frame-color-item map-frame-color-item--white" for="map-frame-white" style="background: #fff">Branca</label>

            <input type="radio" name="map-frame-color" value="Madeira" id="map-frame-wood" autocomplete="off">
            <label class="map-frame-color-item map-frame-color-item--wood" for="map-frame-wood" style="background: #6d5a4b; color: #fff;">Madeira</label>

            <input type="radio" name="map-frame-color" value="Natural" id="map-frame-beige" autocomplete="off">
            <label class="map-frame-color-item map-frame-color-item--beige" for="map-frame-beige" style="background: #ead7a7; color: #fff;">Natural</label>
          </div>
        </div>
        <!-- Item Block -->

        <div class="finish-block">

          <div class="item-block">
            <label class="">Deixe seu email para confirmar que conferiu todos os dados</label>
            <input placeholder="email@email.com" type="email" required class="rd-email-placeholder">
          </div>

          <div class="item-block">
            <a class="modal-trigger button-default -primary -outline" data-target="calc-shipping">Calcular Frete</a>
          </div>
          
          <div class="price-block-info">
            <p class="-price">R$ <span id="current-price">185,00</span></p>
            <p><i class="icon-card"></i> 3x de R$<span class="price-installments">58,33</span> sem juros.</p>
          </div>

          <?php if ( current_user_can( 'manage_options' ) ) { ?>
            <button type="button" class="button-default -primary -outline -full" id="generatePdf">Gerar PDF</button>
          <?php } ?>

          <small class="-text-center" style="display: block">O prazo de produção é de 5 dias úteis somados ao prazo de envio e contados à partir do dia seguinte da aprovação do pedido.</small>

          <div class="next-block">
            <button class="buy-button" id="buyButton">Eternizar Momento</button>
          </div>
        </div>

      </div>
      <!-- Item -->

    </div>
    <!-- Control Items -->

  </div>
  <!-- Control Panel -->


  <?php woocommerce_template_single_add_to_cart(); ?>
</div>
<!-- Map Container -->

<?php } } // Fecha o loop ?>

<div class="modal modal--dark" data-modal="map-size" data-hidden="true">
  <i class="icon-close-round modal-close"></i>
  <div class="modal-block">
    <img src="<?php echo $template_dir; ?>/assets/images/guia-de-tamanhos-large.jpg" alt="Guia de Tamanhos" loading="lazy" />              
  </div>
</div>

<div class="modal modal--dark" data-modal="border-premium" data-hidden="true">
  <i class="icon-close-round modal-close"></i>
  <div class="modal-block">
    <img src="<?php echo $template_dir; ?>/assets/images/moldura-premium.jpg" alt="Guia de Tamanhos" loading="lazy" />              
  </div>
</div>

<div class="modal modal--dark" data-modal="azulejo" data-hidden="true">
  <i class="icon-close-round modal-close"></i>
  <div class="modal-block">
    <img src="<?php echo $template_dir; ?>/assets/images/moldura-premium.jpg" alt="Em azulejo" loading="lazy" />              
  </div>
</div>

<div class="modal modal--dark" data-modal="border-type" data-hidden="true">
  <i class="icon-close-round modal-close"></i>
  <div class="modal-block">
    <picture>
      <source media="(max-width: 799px)" srcset="<?php echo $template_dir; ?>/assets/images/border-type-small.jpg">
      <source media="(min-width: 800px)" src="<?php echo $template_dir; ?>/assets/images/border-type.jpg">
      <img src="<?php echo $template_dir; ?>/assets/images/border-type.jpg" alt="Guia de Borda" loading="lazy" />
    </picture>
  </div>
</div>

<div class="modal modal--dark" data-modal="map-zoom" data-hidden="true">
  <i class="icon-close-round modal-close"></i>
  <div class="modal-block">
    <img class="map-placeholder" src="<?php echo $template_dir; ?>/assets/images/map-planet-placeholder.jpg" loading="lazy" alt="Mapa dos Planetas - Imagem Ilustrativa">
  </div>
</div>

<div class="modal" data-modal="custom-loading" data-hidden="true">
  <div class="modal-block">
    <div class="loading-block">
      <div class="loading-element"></div>
    </div>
  </div>
</div>


<div class="modal" data-modal="calc-shipping" data-hidden="true">
  <i class="icon-close-round modal-close"></i>
  <div class="modal-block">
    <?php echo do_shortcode(' [shipping_calculator_on_product_page]'); ?>
  </div>
</div>

<div>
  <?php echo do_shortcode('[contact-form-7 id="281" title="RD - Email"]') ?>
</div>

<script type="text/javascript" src="<?php echo $template_dir ?>/assets/js/app/product/planets-orbit.js"></script>