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

<script type="text/javascript" src="<?php echo $template_dir ?>/assets/js/lib/d3.min.js"></script>
<script type="text/javascript" src="<?php echo $template_dir ?>/assets/js/lib/d3.geo.projection.min.js"></script>
<script type="text/javascript" src="<?php echo $template_dir ?>/assets/js/app/product/map-preview.js?v=<?php echo $site_version ?>"></script>

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
<div class="map-container" id="mde-page">
	<!-- debug: 2025-09-11 17h -->
<!-- Teste -->

  <!-- Map Preview -->
  <div id="preview">
    <img class="map-placeholder" src="<?php echo $template_dir; ?>/assets/images/map-placeholder.jpg" alt="Mapa das Estrelas - Imagem Ilustrativa">

    <div id="mapSnapshotBlock">
      <div id="mapSnapshot">
        <div class="map-content" id="mapContent">
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
            <p class="-address">Curitiba, PR, Brasil</p>
            <p class="-date">01/01/1900 - 22:00</p>
            <p class="-location">Lat: <span class="-lat">-25.4290°</span> Long: <span class="-long">-49.2671°</span></p>
          </div>
          <div id="celestial-form"></div>
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
      <button class="control-panel-trigger" data-target="3">Personalize</button>
      <button class="control-panel-trigger" data-target="4">Tamanho</button>
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
            <label class="layout-map" for="layout-1" style="background-image: url(<?php echo $template_dir; ?>/assets/images/mde1.png)"></label>

            <input class="layout-trigger" type="radio" value="Modelo 2" data-pdf="2" name="layout"  id="layout-2" autocomplete="off">
            <label class="layout-map" for="layout-2" style="background-image: url(<?php echo $template_dir; ?>/assets/images/mde2.png)"></label>
          </div>
        </div>
        <!-- Item Block -->

        <!-- Item Block -->
        <div class="item-block">
          <label>Cor do Pôster</label>
          <div class="label-group label-group--4 custom-label-colors" style="flex-wrap:wrap;">
            <input type="radio" name="map-color" value="rgb(0,0,0)" data-colorhex="000000" data-colorname="rgb(0,0,0) - Preto" id="map-color-black" checked autocomplete="off">
            <label class="map-color-item" for="map-color-black" style="background-color: rgb(0,0,0)"></label>

            <input type="radio" name="map-color" value="rgb(27,27,83)" data-colorhex="1b1b53" data-colorname="rgb(27,27,83) - Azul" id="map-color-blue" autocomplete="off">
            <label class="map-color-item" for="map-color-blue" style="background-color: rgb(27, 27, 83)"></label>

            <input type="radio" name="map-color" value="rgb(0,121,131)" data-colorhex="007983" data-colorname="rgb(0,121,131) - Turquesa" id="map-color-green" autocomplete="off">
            <label class="map-color-item" for="map-color-green" style="background-color: rgb(0, 121, 131)"></label>

            <input type="radio" name="map-color" value="rgb(223,82,118)" data-colorhex="df5276" data-colorname="rgb(223,82,118) - Rosa" id="map-color-pink" autocomplete="off">
            <label class="map-color-item" for="map-color-pink" style="background-color: rgb(223, 82, 118)"></label>

            <input type="radio" name="map-color" value="estrelas-dark" data-colorhex="df5276" data-colorname="Estrelas da Noite" id="map-color-estrelas-dark" autocomplete="off">
            <label for="map-color-estrelas-dark" class="map-color-item" style="background: url(<?php echo $template_dir; ?>/assets/images/estrelas-dark-icon.png) no-repeat center center; background-size: 100% 100%;"></label>

            <input type="radio" name="map-color" value="estrelas-blue" data-colorhex="df5276" data-colorname="Estrelas Azul" id="map-color-estrelas-blue" autocomplete="off">
            <label for="map-color-estrelas-blue" class="map-color-item" style="background: url(<?php echo $template_dir; ?>/assets/images/estrelas-blue-icon.png) no-repeat center center; background-size: 100% 100%;"></label>

            <input type="radio" name="map-color" value="estrelas-aranha-vermelho" data-colorhex="df5276" data-colorname="Estrelas Aranha Vermelho" id="map-color-estrelas-aranha-vermelho" autocomplete="off">
            <label for="map-color-estrelas-aranha-vermelho" class="map-color-item" style="background: url(<?php echo $template_dir; ?>/assets/images/estrelas-aranha-vermelho-icon.png) no-repeat center center; background-size: 100% 100%;"></label>

            <input type="radio" name="map-color" value="estrelas-aranha-azul" data-colorhex="df5276" data-colorname="Estrelas Aranha Azul" id="map-color-estrelas-aranha-azul" autocomplete="off">
            <label for="map-color-estrelas-aranha-azul" class="map-color-item" style="background: url(<?php echo $template_dir; ?>/assets/images/estrelas-aranha-azul-icon.png) no-repeat center center; background-size: 100% 100%;"></label>

            <input type="radio" name="map-color" value="estrelas-namorados-vermelho" data-colorhex="df5276" data-colorname="Estrelas Namorados Vermelho" id="map-color-namorados-vermelho" autocomplete="off">
            <label for="map-color-namorados-vermelho" class="map-color-item" style="background: url(<?php echo $template_dir; ?>/assets/images/estrelas-namorados-vermelho-icon.png) no-repeat center center; background-size: 100% 100%;"></label>

            <input type="radio" name="map-color" value="estrelas-namorados-rosa" data-colorhex="df5276" data-colorname="Estrelas Namorados Rosa" id="map-color-namorados-rosa" autocomplete="off">
            <label for="map-color-namorados-rosa" class="map-color-item" style="background: url(<?php echo $template_dir; ?>/assets/images/estrelas-namorados-rosa-icon.png) no-repeat center center; background-size: 100% 100%;"></label>

            <input type="radio" name="map-color" value="estrelas-flores-azul" data-colorhex="df5276" data-colorname="Estrelas Flores Azul" id="map-color-flores-azul" autocomplete="off">
            <label for="map-color-flores-azul" class="map-color-item" style="background: url(<?php echo $template_dir; ?>/assets/images/estrelas-flores-azul-icon.png) no-repeat center center; background-size: 100% 100%;"></label>

            <input type="radio" name="map-color" value="estrelas-flores-azul-claro" data-colorhex="df5276" data-colorname="Estrelas Flores Azul Claro" id="map-color-flores-azul-claro" autocomplete="off">
            <label for="map-color-flores-azul-claro" class="map-color-item" style="background: url(<?php echo $template_dir; ?>/assets/images/estrelas-flores-azul-claro-icon.png) no-repeat center center; background-size: 100% 100%;"></label>
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
            <span class="text">Fundo Branco</span>
            <label class="switch --primary">
              <input type="checkbox" name="white-bg" value="Sim" id="white-bg" autocomplete="off">
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
					  R$ <span data-ref="current-price">187,00</span>
				</div>
				<p class="installments-inline">
				  <i class="icon-card"></i> 4x de R$
				  <span data-ref="price-installments">46,75</span>
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
          <label>De onde você quer ver o céu?</label>
          <div class="-locations">
            <input placeholder="" type="text" name="place" id="place" class="--full" autocomplete="off">
            <ul class="locations-results"></ul>
          </div>
        </div>
        <!-- Item Block -->

        <!-- Item Block -->
        <div class="item-block">
          <label>Mude o nome do local</label>
          <div class="-location-text-block">
            <div class="-location-text">
              <input placeholder="" type="text" name="place-name" id="place-name" class="--full" autocomplete="off">
            </div>
          </div>
        </div>
        <!-- Item Block -->

        <!-- Item Block -->
        <div class="item-block">
          <label>Quando foi esse momento?</label>
          <div class="input-group">
            <select class="date-trigger" required id="date-day" autocomplete="off" >
              <?php for($i=1;$i<32;$i++): ?>
                <option value="<?=$i?>"><?=sprintf("%02d",$i)?></option>
              <?php endfor; ?>
            </select>

            <select class="date-trigger" required id="date-month" autocomplete="off" >
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
        <div class="item-block" id="hour-block">
          <label>Horário do Momento</label>
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

        <!-- Item Block -->
        <div class="item-block hide-hour-block">
          <div class="switch-group">
            <span>Esconder horário</span>
            <label class="switch --primary">
              <input name="hide-hour" value="Sim" type="checkbox" autocomplete="off">
              <span></span>
            </label>
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
        <div class="next-block">
						<div style="padding-bottom: 0.5rem; font-weight: 600; display: flex; flex-position: row; justify-content: space-between;">
				  <div style="display: flex; flex-position: row">
					  R$ <span data-ref="current-price">187,00</span>
				</div>
				<p class="installments-inline">
				  <i class="icon-card"></i> 4x de R$
				  <span data-ref="price-installments">46,75</span>
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

          <label>Opções Avançadas</label>

          <div class="label-group label-group--column advanced-options">

            <div class="switch-group switch-group--icon -space-bottom--small">
              <div class="text-icon label-group">
                <label class="sky-details constellation-item" for="constelacoes" style="background-image: url(<?php echo $template_dir; ?>/assets/images/constellation.png)"></label>
                <span>Constelações</span>
              </div>
              <label class="switch --primary">
                <input class="advanced-options-item" name="constelacoes" id="constellation" value="Sim" type="checkbox" checked autocomplete="off">
                <span></span>
              </label>
            </div>

            <div class="switch-group switch-group--icon -space-bottom--small">
              <div class="text-icon label-group">
                <label class="sky-details constellation-name-item" for="constellations-name" style="background-image: url(<?php echo $template_dir; ?>/assets/images/constellation-name.png)"></label>
                <span>Nome das Constelações</span>
              </div>
              <label class="switch --primary">
                <input class="advanced-options-item" name="constellations-name" id="constellation-name" value="Sim" type="checkbox" autocomplete="off">
                <span></span>
              </label>
            </div>

            <div class="switch-group switch-group--icon -space-bottom--small">
              <div class="text-icon label-group">
                <label class="sky-details globe-item" for="linhas-imaginarias" style="background-image: url(<?php echo $template_dir; ?>/assets/images/globe.png)"></label>
                <span>Linhas Imaginárias</span>
              </div>
              <label class="switch --primary">
                <input class="advanced-options-item" name="linhas-imaginarias" id="globe" value="Sim" type="checkbox" checked autocomplete="off">
                <span></span>
              </label>
            </div>

            <div class="switch-group switch-group--icon -space-bottom--small">
              <div class="text-icon label-group">
                <label class="sky-details moon-item" for="moon" style="background-image: url(<?php echo $template_dir; ?>/assets/images/moon.png)"></label>
                <span>Lua</span>
              </div>
              <label class="switch --primary">
                <input class="advanced-options-item" name="moon" type="checkbox" id="moon" value="Sim" checked autocomplete="off">
                <span></span>
              </label>
            </div>

            <div class="switch-group switch-group--icon -space-bottom--small">
              <div class="text-icon label-group">
                <label class="sky-details milkyway-item" for="via-lactea" style="background-image: url(<?php echo $template_dir; ?>/assets/images/milkyway.png)"></label>
                <span>Via Láctea</span>
              </div>
              <label class="switch --primary">
                <input class="advanced-options-item" name="via-lactea" id="milkyway" value="Sim" type="checkbox" checked autocomplete="off">
                <span></span>
              </label>
            </div>
            
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
            <input type="text" class="toggled-item" id="spotify-url" placeholder="spotify:track:2tpWsVSb9UEmDRxAl1zhX1" autocomplete="off">
          </div>

        </div>
        <!-- Item Block -->

        <!-- Item Block -->
        <div class="item-block">
          <label>Borda do Mapa</label>
          <div class="label-group label-group--3">
            <input type="radio" name="border-type" value="Simples" id="border-simple" checked autocomplete="off">
            <label class="border-item" for="border-simple" style="background-image: url(<?php echo $template_dir; ?>/assets/images/border-simple-grey.jpg)"></label>
            
            <input type="radio" name="border-type" value="Dupla" id="border-double" autocomplete="off">
            <label class="border-item" for="border-double" style="background-image: url(<?php echo $template_dir; ?>/assets/images/border-double-grey.jpg)"></label>

            <input type="radio" name="border-type" value="Coordenadas" id="border-custom" autocomplete="off">
            <label class="border-item" for="border-custom" style="background-image: url(<?php echo $template_dir; ?>/assets/images/border-custom-grey.jpg)"></label>
          </div>
        </div>
        <!-- Item Block -->

        <div class="next-block">
						<div style="padding-bottom: 0.5rem; font-weight: 600; display: flex; flex-position: row; justify-content: space-between;">
				  <div style="display: flex; flex-position: row">
					  R$ <span data-ref="current-price">187,00</span>
				</div>
				<p class="installments-inline">
				  <i class="icon-card"></i> 4x de R$
				  <span data-ref="price-installments">46,75</span>
				  sem juros.
				</p>			
			</div>
          <button class="next" data-target="4">Próximo</button>
        </div>
      </div>
      <!-- Item -->

      <!-- Item -->
      <div class="item" id="step4">
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
            <p class="-price">R$ <span id="current-price">187,00</span></p>
<p><i class="icon-card"></i> 4x de R$<span class="price-installments">46,75</span> sem juros.</p>
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
    <img class="map-placeholder" src="<?php echo $template_dir; ?>/assets/images/map-placeholder.jpg" loading="lazy" alt="Mapa das Estrelas - Imagem Ilustrativa">
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

<?php get_template_part('template-parts/product/mapa-das-estrelas', 'config'); ?>

<script>
// Variável global com URL base do tema
window.THEME_URL = '<?php echo $template_dir; ?>';

var geocoder;
function initMap() {
  geocoder = new google.maps.Geocoder();
}
</script>


<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBRYq3CZSMCtkliT-0H3-pzviPKID3pEd4&callback=initMap"></script>