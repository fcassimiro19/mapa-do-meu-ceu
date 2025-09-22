<?php $template_dir = get_template_directory_uri(); ?>

<script type="text/javascript" src="<?php echo $template_dir ?>/lib/d3.min.js"></script>

<?php
	function get_real_site_url(){
	  echo sprintf(
	    "%s://%s",
	    isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
	    $_SERVER['SERVER_NAME']
	  );
  }
  ?>

  <?php 
      $server_name = $_SERVER['SERVER_NAME'];
      if (substr_count($server_name, 'homolog') > 0 || substr_count($server_name, 'development') > 0) {
        echo '<div class="wpcf7-form sent"></div>';
      } 
    ?>
  
<div class="container py-5 mb-5">
		<div class="row map-row">
			<div id="content" class="col-md-6 map-planet-options">
        <a class="-anchor" id="steps"></a>
        <div class="accordion-steps">
          <button class="step1-trigger active" onclick="mobileGoTo(1)">Design do Mapa</button>
          <button class="step2-trigger" onclick="mobileGoTo(2)">Dados do Mapa</button>
          <button class="step3-trigger" onclick="mobileGoTo(3)">Dados do Quadro</button>
        </div>
        <div class="accordion" id="accordionExample">
          <div class="card mt-0" id="step-1">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn btn-link text-uppercase btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Design do Mapa
                </button>
              </h5>
              <div onclick="scrollToEl('headingOne')" style="position:absolute;top:15px;right:15px;font-size:2.25rem;cursor:pointer;" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"><i class="fa fa-caret-square-down text-blue"></i></div>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
              <div class="card-body">
                <div id="layout-div" class="mt-4 mb-4">
                  <div class="row">
                    <div class="col-3 text-center" style="">
                      Modelo 1
                      <div onclick="toggleLayout(1)" id="layout-1" class="layout-card  active" style="">
                        <div class="-circle"><span>◎</span></div>
                        <div class="-info">
                          <span class="-title"></span>
                          <span>___&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <span>___&nbsp;&nbsp;&nbsp;&nbsp;-</span>
                          <span>___&nbsp;&nbsp;&nbsp;&nbsp;-</span>
                          <span>___&nbsp;&nbsp;&nbsp;&nbsp;-</span>
                          <span>___&nbsp;&nbsp;&nbsp;&nbsp;-</span>
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span>
                          <span>___&nbsp;&nbsp;&nbsp;&nbsp;-</span>
                          <span>___&nbsp;&nbsp;&nbsp;&nbsp;-</span>
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span>
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-3 text-center" style="">
                      Modelo 2
                      <div onclick="toggleLayout(2)" id="layout-2" class="layout-card" style="">
                        <div class="-circle"><span>◎</span></div>
                        <div class="-text">
                          <span>______</span>
                          <span>__________</span>
                          <span>________</span>
                          <span>______</span>
                          <span>_________</span> 
                        </div>
                        <div class="-info">
                          <span class="-title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__</span>
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__</span>
                          <span style="margin-left: -20px">--------&nbsp;&nbsp;</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-3 text-center" style="">
                      Modelo 3
                      <div onclick="toggleLayout(3)" id="layout-3" class="layout-card" style="">
                        <div class="-circle"><span>◎</span></div>
                        <div class="-text">
                          <span>______</span>
                          <span>__________</span>
                          <span>________</span>
                          <span>______</span>
                          <span>_________</span>
                        </div>
                        <div class="-info">
                          <span class="-title">___</span>
                          <span>___</span>
                          <span>___</span>
                          <span style="height: 12px;"></span>
                          <span>---------</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <div class="mt-4 text-right">
                  <button type="button" onclick="mobileGoTo(2)" class="btn btn-map-secondary text-uppercase -mobile">próximo</button>
                  <button type="button" onclick="desktopGoTo(2)" class="btn btn-map-secondary text-uppercase -desktop">próximo</button>
                </div>
              </div>
            </div>
          </div>
          <div class="card" id="step-2">
            <div class="card-header" id="headingTwo">
              <h5 class="mb-0">
                <button class="btn btn-link text-uppercase btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                  Dados do mapa
                </button>
              </h5>
              <div onclick="scrollToEl('headingTwo')" style="position:absolute;top:15px;right:15px;font-size:2.25rem;cursor:pointer;" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo"><i class="fa fa-caret-square-down text-blue"></i></div>
            </div>

            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
              <div class="card-body">

              <form onsubmit="saveMapCookies(event, 'buy');" id="add-map" method="POST">

                <div class="mt-4">
                  <p class="mb-0"><label class="text-uppercase">Data</label></p>
                  <div class="row">
                    <div class="col-4">
                      <select oninput="setNewDate()" required id="date-day" class="form-control">
                      <?php for($i=1;$i<32;$i++): ?>
                        <option value="<?=$i?>"><?=sprintf("%02d",$i)?></option>
                      <?php endfor; ?>
                      </select>
                    </div>
                    <div class="col-4">
                      <select oninput="setNewDate()" required id="date-month" class="form-control">
                      <?php for($i=1;$i<13;$i++): ?>
                        <option value="<?=$i?>" <?php if($i == 1) echo "selected"; ?>><?=sprintf("%02d",$i)?></option>
                      <?php endfor; ?>
                      </select>
                    </div>
                    <div class="col-4">
                      <select oninput="setNewDate()" required id="date-year" class="form-control">
                      <?php for($i=1600;$i<2201;$i++): ?>
                        <option value="<?=$i?>" <?php if($i == 2020) echo "selected"; ?>><?=$i?></option>
                      <?php endfor; ?>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="mt-4 map-text-block">
                  <div class="row">
                    <div class="col-10">
                      <p class="mb-0"><label class='text-uppercase'>Escreva sua mensagem</label></p>
                    </div>
                    <div class="col-2 text-right">
                      <p class="mb-0"><label><span id="textarea-size">0</span>/<span class="textarea-size-total">300</span></label></p>
                    </div>
                  </div>
                  <textarea rows=4 onkeydown="return limitLines(this, event)" onkeyup="updateMapText(event)" id="message" class="form-control" maxlength=300 style="resize:none;"></textarea>

                </div>

                <div class="mt-4">
                  <div class="row">
                    <div class="col-10">
                      <p class="mb-0"><label class="text-uppercase">Título</label></p>
                    </div>
                    <div class="col-2 text-right">
                      <p class="mb-0"><label><span id="title-size">15</span>/50</label></p>
                    </div>
                  </div>
                  <input id="title" onkeyup="updateMapTitle(event)" maxlength=50 class="form-control" value="Mapa do Meu Céu"/>
                </div>

                <div class="mt-4">
                  <p class="mb-0"><label class="text-uppercase">fontes</label></p>
                  <div class="row">
                    <div class="col-6">
                      <div class="form-check">
                        <input onchange="updateFontFamily()" required class="form-check-input" type="radio" name="font" id="font-a" val="Agane" checked>
                        <label class="form-check-label" for="font-a"><img src="<?php echo $template_dir ?>/map-images/font-a.png" style="max-width:100px;"></label>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-check">
                        <input onchange="updateFontFamily(true)" class="form-check-input" type="radio" name="font" id="font-b" val="Courgette">
                        <label class="form-check-label" for="font-b"><img src="<?php echo $template_dir ?>/map-images/font-b.png" style="max-width:100px;"></label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-4 text-right">
                  <button onclick="mobileGoTo(3)" type="button" class="btn btn-map-secondary text-uppercase -mobile">Próximo</button>
                  <button onclick="desktopGoTo(3)" type="button" class="btn btn-map-secondary text-uppercase -desktop">Próximo</button>
                </div>
              </div>
            </div>
          </div>

          <div id="step-3" class="card">
            <div class="card-header" id="headingThree">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed text-uppercase btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Dados do Quadro
                </button>
              </h5>
              <div onclick="scrollToEl('headingThree')" style="position:absolute;top:15px;right:15px;font-size:2.25rem;cursor:pointer;" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"><i class="fa fa-caret-square-down text-blue"></i></div>
            </div> 
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
              <div class="card-body">

                <div>
                  <p class="mb-0"><label class="text-uppercase">Formato</label></p>
                  <div class="row text-center map-format-block">
                    <div class="col-3">
                      <div id="board-4" onclick="changeMap(536);setBoardType('pdf');setMapPreview()" class="card board text-uppercase py-4 py-md-5 w-100 text-center text-mobile">PDF<br><small class="text-mobile-8px">DIGITAL</small></div>
                    </div>
                    <div class="col-3">
                      <div id="board-3" onclick="changeMap(537);setBoardType();setMapPreview()" class="card board text-uppercase py-4 py-md-5 w-100 text-center">A4<br><small class="text-mobile-8px">IMPRESSO</small></div>
                    </div>
                    <div class="col-3">
                      <div style="position:absolute;top:-18px;right:-5px;z-index: 9;"><img src="<?php echo $template_dir ?>/map-images/mapa-selo-1.png" style="max-width:45px"/></div>	
                      <div id="board-2" onclick="changeMap(538);setBoardType();setMapPreview()" class="active-board card board text-uppercase py-4 py-md-5 w-100 text-center">A3<br><small class="text-mobile-8px">IMPRESSO</small></div>
                    </div>
                    <div class="col-3">
                      <div id="board-1" onclick="changeMap(539);setBoardType();setMapPreview()" class="card board text-uppercase py-4 py-md-5 w-100 text-center">A2<br><small class="text-mobile-8px">IMPRESSO</small></div>
                    </div>
                  </div>
                </div>
                

                <div class="mt-4">
                  <p class="mb-0"><label class="text-uppercase">cor do pôster</label></p>
                  <div class="-poster-color">
                    <div class="text-center">
                      <input id="poster-1" onchange="changeMapColor(1);setMapPreview();" required class="mb-3" type="radio" name="color" val="rgb(0,0,0)" checked style="display:none;">
                      <label for="poster-1" style="cursor:pointer;box-shadow:0px 0px 10px 5px rgba(0,0,0,0.5)">
                        <div class="planet-map-color">
                          <span>◎</span>
                        </div>
                      </label>
                    </div>
                    <div class="text-center" style="margin-left: 10px;">
                      <input id="poster-2" onchange="changeMapColor(2);setMapPreview();" class="mb-3" type="radio" name="color" val="rgb(255,255,255)" style="display:none;">
                      <label for="poster-2" style="cursor:pointer;">
                        <div class="planet-map-color">
                          <span>◎</span>
                        </div>
                      </label>
                    </div>

                  </div>
                </div>

                <div id="cor-moldura-div" class="mt-4">
                  <p class="mb-0"><label class="text-uppercase">Cor da moldura</label></p>
                  <div class="row">
                    <div class="col-4 text-center">
                      <div onclick="setMapFrameColor(event, '#000')" id="cor-moldura-1" class="card board text-uppercase py-4 w-100 text-center active" style="border:12px solid black!important;">Preta</div>
                    </div>
                    <div class="col-4 text-center">
                      <div onclick="setMapFrameColor(event, '#fff')" id="cor-moldura-2" class="card board text-uppercase w-100 text-center" style="border:1px solid white!important;box-shadow:0px 0px 5px 2px rgba(0,0,0,0.3);"><div style="border:10px solid white;"><div style="border:1px solid #F1F1F1!important" class="py-4">Branca</div></div></div>
                    </div>
                    <div class="col-4 text-center">
                      <div onclick="setMapFrameColor(event, 'wood')" id="cor-moldura-3" class="card board text-uppercase py-4 w-100 text-center" style="border:12px solid #9a7348!important;box-shadow:0px 0px 5px 2px rgba(0,0,0,0.3);">Madeira</div>
                    </div>
                  </div>
                </div>

                <div class="mt-4">
                  <div class="row align-items-center">
                    <div class="col-9">
                      <p class="mb-0"><label class="text-uppercase">fundo de estrelas</label></p>
                    </div>
                    <div class="col-3 text-right">
                      <label class="switch">
                        <input onchange="toggleBgStars(); setMapPreview()" name="fundo" type="checkbox" checked>
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="mt-2 map-border-block">
                  <div class="row align-items-center">
                    <div class="col-9">
                      <p class="mb-0"><label class="text-uppercase">borda do pôster</label></p>
                    </div>
                    <div class="col-3 text-right">
                      <label class="switch">
                        <input onchange="setMapPreview()" name="borda" type="checkbox" checked>
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div id="finish" class="">

        	<div class="mt-4 row align-items-center mx-0 p-2" style="background-color:#f7f7f7;border:1px solid rgba(0,0,0,.125);">
        		<div class="col-12 mb-2">
        			<label style="cursor:pointer;" class="mb-0" for="agree-checkbox"><p class="mb-0">Deixe seu email para confirmar que conferiu todos os dados</p></label>
        		</div>
        		<div class="col-12 text-right">
              <input type="email" required class="form-control rd-email-placeholder">
        		</div>
        			    
          </div>

          <div class="price-block-info">
            <p class="-price -secondary">R$ <span id="current-price">187,00</span></p>
            <p><i class="fas fa-credit-card"></i> 4x de R$<span class="price-installments">46,75</span> sem juros.</p>
          </div>
          
        	<button class="mt-4 btn btn-block btn-map-secondary text-uppercase" data-type="buy" >Compre agora</button>

          <div class="shipping-block-info -secondary">
            <p><i class="fas fa-truck"></i> Entrega para todo o Brasil</p>
          </div>

          <?php echo do_shortcode(' [shipping_calculator_on_product_page]'); ?>

          <?php if ( current_user_can( 'manage_options' ) ) { ?>
            <button type="button" class='mt-4 btn btn-block btn-map-secondary text-uppercase' onclick="saveMapCookies(event);showEmailModal(true)">Gerar PDF</button>
          <?php } ?>

        </form>

        <div>
            <?php echo do_shortcode('[contact-form-7 id="281" title="RD - Email"]') ?>
        </div>

        </div>
			</div>

      <div class="map-content planet-map" id="mapContent">
        <div class="map-content-scaled" data-color="black"><div class="-cborder"></div></div>
        <div class="map-text">
          <p></p>
        </div> 
        <div class="map-info">
          <p class="-title">Mapa do Meu Céu</p>
          <p class="-date">01/01/2020</p>
        </div>
        <div id="board-size" style="position:absolute;bottom:-30;left:0;" class="w-100 text-center">
          <p class="mb-0"><span id="largura">30,0</span> cm (L) x <span id="altura">42,0</span> cm (A)</p>
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


  <!-- Modal -->
  <div class="modal fade modal-planet" id="confirm-modal" tabindex="-1" role="dialog" aria-labelledby="confir-modal-label" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="confir-modal-label">Confirme sua compra</h5>
          <button onclick="moveMapToBlock()" type="button" class="close" data-dismiss="modal" aria-label="Fechar">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="-alert-error">
          Esta é sua última chance de conferir o seu mapa e fazer correções antes de prosseguir.
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4 col-12 text-center modal-map-content">
              <img id="map-confirm-preview" class="img-fluid"/>
            </div>
            <div class="col-md-8 col-12 mt-md-0 mt-4 text-center text-md-left">
              <p id="map-confirm-text"></p>
            </div>
          </div>

          <hr>

          <div class="row">
            <div class="col-12">
              <h3 class="mb-4 text-md-left text-center">O que nossos clientes dizem</h3>
            </div>

            <div class="col-12 row align-items-center">
              <div class="col-4">
                <img src="https://cdn3.iconfinder.com/data/icons/avatars-business-human1/180/woman2-512.png" class="img-fluid"/>
              </div>
              <div class="col-8">
                <p class="text-warning font-weight-bold"><i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i></p>
                <p class="text-muted font-italic">"Melhor empresa que já adquiri produtos antes, foram muito prestativos, atenciosos e educados comigo! Vale muito a pena fazer a compra."</p>

                <p><strong>Marina Santos</strong>, 08/05/2020</p>
              </div>
            </div>
          </div>

        </div>
        <div class="modal-footer row mx-0">
          <div class="col-md-6 col-12 mx-0">
            <button onclick="moveMapToBlock()" type="button" class="btn btn-secondary btn-block text-uppercase" data-dismiss="modal">Revisar</button>
          </div>
          <div class="col-12 col-md-6 mx-0 mt-4 mt-md-0">
            <a class="btn btn-map-secondary btn-block text-uppercase" onclick="showEmailModal()">Finalizar Compra</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="email-modal -loading hidden">
    <div class="email-modal-block hidden">
      <label class='mb-1'><small></small></label>
      <!-- <input onkeyup="setEnterSubmit(event)" class='form-control' type='email' placeholder='seu@email.com' id='user-email'/> -->
      <!-- <a id="go-checkout" class="btn btn-map-secondary btn-block text-uppercase" href="#" style="pointer-events: none; opacity: .4"> Finalizar Compra</a> -->
      <a class="btn btn-map-secondary btn-block text-uppercase" href="/produto/mapa-dos-planetas/">Fechar</a>
    </div>
  </div>
  <a class="map-content-scrollto -planets" href="#mapContent">Veja como ficou<i class="fa fa-search-plus" aria-hidden="true"></i></a>
 
<!-- <#?php woocommerce_simple_add_to_cart(); ?> -->
<?php woocommerce_template_single_add_to_cart(); ?>

</script>
<style>
  .quantity {
    display: none;
  }
  form.cart {
    display: none;
  }
</style>

<script type="text/javascript" src="<?php echo $template_dir ?>/assets/src/js/planet-orbit.js"></script>
<script type="text/javascript" src="<?php echo $template_dir ?>/assets/src/js/product/product-planets.js"></script>