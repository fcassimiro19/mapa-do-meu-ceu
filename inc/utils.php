<?php

function date_formated($postid) {
  $date = get_the_time('j/m/Y', $postid);
  return $date;
}

function get_alternative_image_alt($img_description, $alternative_alt) {
  if($img_description) {
    return $img_description;
  }

  return $alternative_alt;

}
 
function hide_header_and_footer($post) {
		if(!is_single()) return false;
		$cat_slug = !empty(get_the_terms( $post->ID, 'product_cat' )) ? get_the_terms( $post->ID, 'product_cat' )[0]->slug : '';
		$custom_map_images = get_field('custom_map', $post->ID);
		if(is_archive()) return false;
		// if(!empty($custom_map_images['images'])) return true;
		switch($cat_slug) {
			case "mapa-das-estrelas" :
				return true;
				break;
			case "mapa-dos-planetas" :
				return true;
				break;
			case "quadro-signos" :
				return true;
				break;
			case "quadro-signos-kids" :
				return true;
				break;
			default :
				return false;
		}
}

function get_real_site_url(){
  echo sprintf(
    "%s://%s",
    isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
    $_SERVER['SERVER_NAME']
  );
}

function getInstallments($idProductOrPrice, $type = "product"){


		$config = get_option('woocommerce_loja5_woo_novo_erede_settings');
		$enviar_juros_embutido = true;
		$linhas = array();
		$minimo = 5.00;

		$price = null;
		if ($type == 'product') {
			$product = wc_get_product($idProductOrPrice);
			$price = $product->get_price();
		}elseif ($type == 'price'){
			$price = $idProductOrPrice;
		}		

		$divmax = (int)$config['div'];
		$divsem = (int)$config['sem'];
		$juros  = (float)$config['juros'];
		$total  = $price;
		$total = $total_limpo = number_format($total, 2, '.', '');

		$split = (int)$total/$minimo;
		if($split>=$divmax){
				$div = (int)$divmax;
		}elseif($split<$divmax){
				$div = (int)$split;
		}elseif($total<=$minimo){
				$div = 1;
		}

		if(isset($config['parcelamento']) && $config['parcelamento']=='operadora'){
				$pcom = 3;
		}else{
				$pcom = 2;
		}

		if($div<2) return $div;

		for($i=1;$i<=$div;$i++){
				if($i<1) continue;
				
				if($i<=$divsem){
						$total = number_format($total, 2, '.', '');
						$linhas[base64_encode(''.$i.'|2|'.number_format(($total), 2, '.', '').'|'.base64_encode($total).'|'.md5($total))] = $i;
				}
		}
		return end($linhas);
}

function ab_cart_shipping_calculate() {
	echo '
		<script>
			jQuery(function ($) {
				$(document).ready(function () {
					if (document.querySelector("#calc_shipping_postcode")) {
						let calcShippingCountry = document.getElementById("calc_shipping_country");
						if (calcShippingCountry) {
							calcShippingCountry.value = "BR";
						}
						let formSubmitButton = document.querySelector(`.shipping-calculator-form button[type="submit"]`);
						function limpa_formulário_cep() {
							// Limpa valores do formulário de cep.
							$("#calc_shipping_city").val("");
							$("#calc_shipping_state").val("");
						}
						//Quando o campo cep perde o foco.
						$("#calc_shipping_postcode").keyup(function () {
							//Nova variável "cep" somente com dígitos.
							var cep = $(this).val().replace(/\D/g, "");
							//Verifica se campo cep possui valor informado.
							if (cep.length == 8) {
								//Expressão regular para validar o CEP.
								var validacep = /^[0-9]{8}$/;
								//Valida o formato do CEP.
								if (validacep.test(cep)) {
									//Preenche os campos com "..." enquanto consulta webservice.
									$("#calc_shipping_city").val("...");
									$("#calc_shipping_state").val("...");
									//Consulta o webservice viacep.com.br/
									$.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {
										if (!("erro" in dados)) {
											//Atualiza os campos com os valores da consulta.
											$("#calc_shipping_city").val(dados.localidade);
											$("#calc_shipping_state").val(dados.uf);
											formSubmitButton.removeAttribute("disabled")
										} else {
											//CEP pesquisado não foi encontrado.
											limpa_formulário_cep();
											alert("CEP não encontrado.");
											formSubmitButton.setAttribute("disabled", true)
										}
									});
								} else {
									//cep é inválido.
									limpa_formulário_cep();
									alert("Formato de CEP inválido.");
									formSubmitButton.setAttribute("disabled", true)
								}
							} else {
								//cep sem valor, limpa formulário.
								formSubmitButton.setAttribute("disabled", true)
								limpa_formulário_cep();
							}
						});
					}
				});
			})
		</script>
		<style>
			.woocommerce-shipping-totals.shipping .shipping-calculator-button,
			.shipping-calculator-form #calc_shipping_country_field,
			.shipping-calculator-form #calc_shipping_state_field,
			.shipping-calculator-form #calc_shipping_city_field {
				display: none !important;
			}
			.woocommerce-shipping-totals.shipping .shipping-calculator-form {
				display: block !important;
			}
		</style>
	';
}
add_action('woocommerce_after_cart', 'ab_cart_shipping_calculate');


add_action( 'woocommerce_variation_options_pricing', 'bbloomer_add_custom_field_to_variations', 10, 3 );
 
function bbloomer_add_custom_field_to_variations( $loop, $variation_data, $variation ) {
   woocommerce_wp_text_input( array(
		'id' => 'custom_product_type[' . $loop . ']',
		'class' => 'short',
		'label' => __( 'Tipo do produto', 'woocommerce' ),
		'value' => get_post_meta( $variation->ID, 'custom_product_type', true )
			) );
}
 
// -----------------------------------------
// 2. Save custom field on product variation save
 
add_action( 'woocommerce_save_product_variation', 'bbloomer_save_custom_field_variations', 10, 2 );
 
function bbloomer_save_custom_field_variations( $variation_id, $i ) {
   $custom_field = $_POST['custom_product_type'][$i];
   if ( isset( $custom_field ) ) update_post_meta( $variation_id, 'custom_product_type', esc_attr( $custom_field ) );
}
 
// -----------------------------------------
// 3. Store custom field value into variation data
 
add_filter( 'woocommerce_available_variation', 'bbloomer_add_custom_field_variation_data' );
 
function bbloomer_add_custom_field_variation_data( $variations ) {
   $variations['custom_product_type'] = '<div class="woocommerce_custom_product_type"><span style="display:block;">Tipo do produto:</span> <span>' . get_post_meta( $variations[ 'variation_id' ], 'custom_product_type', true ) . '</span></div>';
   return $variations;
}