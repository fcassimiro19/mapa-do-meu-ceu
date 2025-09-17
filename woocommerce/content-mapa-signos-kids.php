<?php 
$template_dir = get_template_directory_uri(); 
$site_version = $GLOBALS['site_version'];
?>


<?php 
$server_name = $_SERVER['SERVER_NAME'];
if (substr_count($server_name, 'homolog') > 0 || substr_count($server_name, 'development') > 0) {
  echo '<div class="wpcf7-form sent" data-status="sent"></div>';
} 
?>

<?php
  if(have_posts()) { while(have_posts()) { the_post();
  $product_formated = format_single_product(get_the_ID());
  $custom_map_images = get_field('custom_map');
?>

<!-- Map Container -->
<div class="map-container" id="signos-kids-map-page">

  <!-- Map Preview -->
  <div id="preview">

    <div id="mapSnapshotBlock">
      <div id="mapSnapshot">

        <div class="map-content planet-map signos-map -custom2 -bg-stars" data-bg="kids1" id="mapContent">
          <p class="placeholder-info">Imagem Ilustrativa</p>
          <div class="map-content-scaled" data-color="black">
            <!-- <img class="" src="<?php echo $template_dir ?>/assets/images/signos/constelacao-leao-white.png" /> -->
          </div>
          <div class="map-text">
            <p class="preview-message"></p>
            <p class="text-signo">Capricórnio</p>
            <p class="text-signo-info">DISCIPLINADO • AMBICIOSO • DETERMINADO</p>
            <p class="text-signo-data">Dez 22 a Jan 20</p>
            
          </div> 

          <div id="map-planet-simulator">
            <i class="icon-star"></i>
            <i class="icon-star"></i>
            <i class="icon-star"></i>
            <i class="icon-star"></i>
            <i class="icon-star"></i>
            <i class="icon-star"></i>
            <i class="icon-star"></i>
            <i class="icon-star"></i>
            <img class="" src="<?php echo $template_dir ?>/assets/images/signos/simbolo-kids-capricornio.png" />
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
        <div class="item-block hidden">
          <label>Modelo</label>
          <div class="label-group label-group--4">
            <input class="layout-trigger" type="radio" value="Modelo 2" data-pdf="2" name="layout"  id="layout-2" autocomplete="off" checked>
            <label class="layout-map" for="layout-2" style="background-image: url(<?php echo $template_dir; ?>/assets/images/mdp2.jpg)"></label>

            <input class="layout-trigger" type="radio" value="Modelo 3" data-pdf="3" name="layout"  id="layout-3" autocomplete="off">
            <label class="layout-map" for="layout-3" style="background-image: url(<?php echo $template_dir; ?>/assets/images/mdp3.jpg)"></label>
          </div>
        </div>
        <!-- Item Block -->

        <!-- Item Block -->
        <div class="item-block hidden">
          <label>Estilo</label>
          <div class="label-group label-stile-group label-group--3">
            <!-- <input name="estilo" type="radio" id="estilo-constelacao" value="constelacao" checked />
            <label for="estilo-constelacao">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/constelacao-leao-black.png" alt="Constelação" />
            </label> -->
            <input name="estilo" type="radio" id="estilo-simbolo" value="simbolo" checked />
            <label for="estilo-simbolo">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/simbolo-kids-leao.png" alt="Símbolo" />
            </label>
          </div>
        </div>

        <!-- Item Block -->
        <div class="item-block ilustration-section" data-ilustration="simbolo">
          <label>Ilustração</label>
          <div class="label-group ilustration-group label-group--4 -ilustration-simbolo">

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-simbolo-capricornio" 
            data-ilustration-type="simbolo"
            value="capricornio"
            data-texto="Capricórnio"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Dez 22 a Jan 20"
            checked
            />
            <label for="ilustration-simbolo-capricornio">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/simbolo-kids-capricornio.png" alt="Símbolo" />
              <p>Capricórnio</p>
              <small>Dez 22 a Jan 20</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-simbolo-aquario" 
            data-ilustration-type="simbolo"
            value="aquario" 
            data-texto="Aquário"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Jan 21 a Fev 19"
            />
            <label for="ilustration-simbolo-aquario">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/simbolo-kids-aquario.png" alt="Símbolo" />
              <p>Aquário</p>
              <small>Jan 21 a Fev 19</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-simbolo-peixes" 
            data-ilustration-type="simbolo"
            value="peixes"
            data-texto="Peixes"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Fev 20 a Mar 20" 
            />
            <label for="ilustration-simbolo-peixes">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/simbolo-kids-peixes.png" alt="Símbolo" />
              <p>Peixes</p>
              <small>Fev 20 a Mar 20</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-simbolo-aries" 
            data-ilustration-type="simbolo"
            value="aries" 
            data-texto="Áries"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Mar 21 a Abr 20"
            />
            <label for="ilustration-simbolo-aries">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/simbolo-kids-aries.png" alt="Símbolo" />
              <p>Áries</p>
              <small>Mar 21 a Abr 20</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-simbolo-touro" 
            data-ilustration-type="simbolo"
            value="touro" 
            data-texto="Touro"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Abr 21 a Mai 20"
            />
            <label for="ilustration-simbolo-touro">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/simbolo-kids-touro.png" alt="Símbolo" />
              <p>Touro</p>
              <small>Abr 21 a Mai 20</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-simbolo-gemeos" 
            data-ilustration-type="simbolo"
            value="gemeos" 
            data-texto="Gêmeos"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Mai 21 a Jun 20"
            />
            <label for="ilustration-simbolo-gemeos">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/simbolo-kids-gemeos.png" alt="Símbolo" />
              <p>Gêmeos</p>
              <small>Mai 21 a Jun 20</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-simbolo-cancer" 
            data-ilustration-type="simbolo"
            value="cancer" 
            data-texto="Câncer"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Jun 21 a Jul 21"
            />
            <label for="ilustration-simbolo-cancer">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/simbolo-kids-cancer.png" alt="Símbolo" />
              <p>Câncer</p>
              <small>Jun 21 a Jul 21</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-simbolo-leao" 
            data-ilustration-type="simbolo"
            value="leao" 
            data-texto="Leão"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Jul 22 a Ago 22"
            />
            <label for="ilustration-simbolo-leao">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/simbolo-kids-leao.png" alt="Símbolo" />
              <p>Leão</p>
              <small>Jul 22 a Ago 22</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-simbolo-virgem" 
            data-ilustration-type="simbolo"
            value="virgem" 
            data-texto="Virgem"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Ago 23 a Set 22"
            />
            <label for="ilustration-simbolo-virgem">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/simbolo-kids-virgem.png" alt="Símbolo" />
              <p>Virgem</p>
              <small>Ago 23 a Set 22</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-simbolo-libra" 
            data-ilustration-type="simbolo"
            value="libra" 
            data-texto="Libra"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Set 23 a Out 22"
            />
            <label for="ilustration-simbolo-libra">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/simbolo-kids-libra.png" alt="Símbolo" />
              <p>Libra</p>
              <small>Set 23 a Out 22</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-simbolo-escorpiao" 
            data-ilustration-type="simbolo"
            value="escorpiao" 
            data-texto="Escorpião"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Out 23 a Nov 21"
            />
            <label for="ilustration-simbolo-escorpiao">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/simbolo-kids-escorpiao.png" alt="Símbolo" />
              <p>Escorpião</p>
              <small>Out 23 a Nov 21</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-simbolo-sagitario" 
            data-ilustration-type="simbolo"
            value="sagitario" 
            data-texto="Sagitário"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Nov 21 a Dez 21"
            />
            <label for="ilustration-simbolo-sagitario">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/simbolo-kids-sagitario.png" alt="Símbolo" />
              <p>Sagitário</p>
              <small>Nov 21 a Dez 21</small>
            </label>

          </div>

          <!-- <div class="label-group ilustration-group label-group--4 -ilustration-constelacao">

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-constelacao-capricornio" 
            data-ilustration-type="constelacao"
            value="capricornio" 
            data-texto="Capricórnio"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Dez 22 a Jan 20"
            checked
            />
            <label for="ilustration-constelacao-capricornio">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/constelacao-capricornio-black.png" alt="Símbolo" />
              <p>Capricórnio</p>
              <small>Dez 22 a Jan 20</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-constelacao-aquario" 
            data-ilustration-type="constelacao"
            value="aquario" 
            data-texto="Aquário"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Jan 21 a Fev 19"
            />
            <label for="ilustration-constelacao-aquario">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/constelacao-aquario-black.png" alt="Símbolo" />
              <p>Aquário</p>
              <small>Jan 21 a Fev 19</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-constelacao-peixes" 
            data-ilustration-type="constelacao"
            value="peixes" 
            data-texto="Peixes"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Fev 20 a Mar 20"
            />
            <label for="ilustration-constelacao-peixes">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/constelacao-peixes-black.png" alt="Símbolo" />
              <p>Peixes</p>
              <small>Fev 20 a Mar 20</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-constelacao-aries" 
            data-ilustration-type="constelacao"
            value="aries" 
            data-texto="Áries"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Mar 21 a Abr 20"
            />
            <label for="ilustration-constelacao-aries">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/constelacao-aries-black.png" alt="Símbolo" />
              <p>Áries</p>
              <small>Mar 21 a Abr 20</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-constelacao-touro" 
            data-ilustration-type="constelacao"
            value="touro" 
            data-texto="Touro"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Abr 21 a Mai 20"
            />
            <label for="ilustration-constelacao-touro">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/constelacao-touro-black.png" alt="Símbolo" />
              <p>Touro</p>
              <small>Abr 21 a Mai 20</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-constelacao-gemeos" 
            data-ilustration-type="constelacao"
            value="gemeos" 
            data-texto="Gêmeos"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Mai 21 a Jun 20"
            />
            <label for="ilustration-constelacao-gemeos">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/constelacao-gemeos-black.png" alt="Símbolo" />
              <p>Gêmeos</p>
              <small>Mai 21 a Jun 20</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-constelacao-cancer" 
            data-ilustration-type="constelacao"
            value="cancer" 
            data-texto="Câncer"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Jun 21 a Jul 21"
            />
            <label for="ilustration-constelacao-cancer">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/constelacao-cancer-black.png" alt="Símbolo" />
              <p>Câncer</p>
              <small>Jun 21 a Jul 21</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-constelacao-leao" 
            data-ilustration-type="constelacao"
            value="leao" 
            data-texto="Leão"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Jul 22 a Ago 22"
            />
            <label for="ilustration-constelacao-leao">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/constelacao-leao-black.png" alt="Símbolo" />
              <p>Leão</p>
              <small>Jul 22 a Ago 22</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-constelacao-virgem" 
            data-ilustration-type="constelacao"
            value="virgem" 
            data-texto="Virgem"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Ago 23 a Set 22"
            />
            <label for="ilustration-constelacao-virgem">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/constelacao-virgem-black.png" alt="Símbolo" />
              <p>Virgem</p>
              <small>Ago 23 a Set 22</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-constelacao-libra" 
            data-ilustration-type="constelacao"
            value="libra" 
            data-texto="Libra"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Set 23 a Out 22"
            />
            <label for="ilustration-constelacao-libra">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/constelacao-libra-black.png" alt="Símbolo" />
              <p>Libra</p>
              <small>Set 23 a Out 22</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-constelacao-escorpiao" 
            data-ilustration-type="constelacao"
            value="escorpiao" 
            data-texto="Escorpião"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Out 23 a Nov 21"
            />
            <label for="ilustration-constelacao-escorpiao">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/constelacao-escorpiao-black.png" alt="Símbolo" />
              <p>Escorpião</p>
              <small>Out 23 a Nov 21</small>
            </label>

            <input 
            name="ilustration" 
            type="radio" 
            id="ilustration-constelacao-sagitario" 
            data-ilustration-type="constelacao"
            value="sagitario" 
            data-texto="Sagitário"
            data-info="ENERGETIC • OUTGOING • SELF-ASSURED"
            data-date="Nov 21 a Dez 21"
            />
            <label for="ilustration-constelacao-sagitario">
              <img class="" src="<?php echo $template_dir; ?>/assets/images/signos/constelacao-sagitario-black.png" alt="Símbolo" />
              <p>Sagitário</p>
              <small>Nov 21 a Dez 21</small>
            </label>

          </div> -->
        </div>

        <!-- Item Block -->
        <div class="item-block">
          <label>Cor do Pôster</label>
          <div class="label-group label-group--4 custom-label-colors" style="flex-wrap:wrap;">
            <input type="radio" name="map-color" value="kids1" data-bg-color="85bef5" data-image-color="kids1" id="map-color-kids1" checked autocomplete="off">
            <label class="map-color-item" for="map-color-kids1" style="background: url(<?php echo $template_dir; ?>/assets/images/icon-kids1.png)"></label>

            <input type="radio" name="map-color" value="kids2" data-bg-color="e59eb0" data-image-color="kids2" id="map-color-kids2" autocomplete="off">
            <label class="map-color-item" for="map-color-kids2" style="background: url(<?php echo $template_dir; ?>/assets/images/icon-kids2.png)"></label>

            <input type="radio" name="map-color" value="kids3" data-bg-color="fcfae3" data-image-color="kids3" id="map-color-kids3" autocomplete="off">
            <label class="map-color-item" for="map-color-kids3" style="background: url(<?php echo $template_dir; ?>/assets/images/icon-kids3.png)"></label>

            <input type="radio" name="map-color" value="kids4" data-bg-color="fff6ed" data-image-color="kids4" id="map-color-kids4" autocomplete="off">
            <label class="map-color-item" for="map-color-kids4" style="background: url(<?php echo $template_dir; ?>/assets/images/icon-kids4.png)"></label>
          </div>

        </div>
        <!-- Item Block -->

        <!-- Item Block -->
        <div class="item-block">
          <div class="switch-group">
            <span class="text">Fundo de Estrelas</span>
            <label class="switch --primary">
              <input type="checkbox" name="fundo" value="Sim" id="fundo" class="toggle-input-trigger" autocomplete="off">
              <span></span>
            </label>
            <div class="toggled-item label-group label-group--2">
              <input type="radio" name="fundo-kids" value="bg-stars-kids-1" id="bg-stars-kids-1" checked autocomplete="off">
              <label class="bg-stars-kids" for="bg-stars-kids-1" style="height: 80px; background-color: #fff; background-image: url(<?php echo $template_dir; ?>/assets/icons/star.svg)"></label>

              <input type="radio" name="fundo-kids" value="bg-stars-kids-2" id="bg-stars-kids-2" autocomplete="off">
              <label class="bg-stars-kids" for="bg-stars-kids-2" style="height: 80px; background-color: #fff; background-size: cover; background-image: url(<?php echo $template_dir; ?>/assets/images/bg-stars-kids-2.png)"></label>
            </div>
          </div>
        </div>
        <!-- Item Block -->

        <!-- Item Block -->
        <div class="item-block">
          <label>Fonte</label>
          <div class="label-group label-group--2">
            <input type="radio" name="font-family" value="Agane" id="font-a" checked autocomplete="off">
            <label class="font-item" for="font-a" style="background-image: url(<?php echo $template_dir; ?>/assets/images/font-a.png)"></label>

            <input type="radio" name="font-family" value="Courgette" id="font-b" autocomplete="off">
            <label class="font-item" for="font-b" style="background-image: url(<?php echo $template_dir; ?>/assets/images/font-c.png)"></label>
          </div>
        </div>
        <!-- Item Block -->

        <div class="next-block">
          <button class="next" data-target="3">Próximo</button>
        </div>
      </div>
      <!-- Item -->

      <!-- Item -->
      <div class="item" id="step2">

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
        <div class="item-block hidden">
          <label class="title-group">
            <span>Título</span>
            <span><span id="title-size">15</span>/50</span>
          </label>
          <input type="text" id="title" maxlength=50 value="Mapa do Meu Céu" autocomplete="off"/>
        </div>
        <!-- Item Block -->

        <!-- Item Block -->
        <div class="item-block">
          <div class="switch-group switch-group--icon -space-bottom--small">
            <div class="label-group">
              <span class="label-default">Customizar Data</span>
            </div>
            <label class="switch --primary">
              <input class="toggle-input-trigger" name="custom-date" id="customDate" value="Sim" type="checkbox" autocomplete="off">
              <span></span>
            </label>
            <input type="text" class="toggled-item mask-date" id="customDateValue" placeholder="01/01/2000" style="text-align: center">
          </div>

        </div>
        <!-- Item Block -->

        <div class="next-block">
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
          <!-- <small class="-text-center" style="display: block">A produção dos impressos só voltará na primeira semana de Janeiro de 2022.</small> -->

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