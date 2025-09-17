<?php
function list_inactive_plugins() {
    // Obtém a lista de todos os plugins ativos
    $active_plugins = get_option('active_plugins');

    // Obtém a lista de todos os plugins instalados
    $all_plugins = get_plugins();

    // Inicializa um array para armazenar plugins desativados
    $inactive_plugins = array();

    // Verifica quais plugins instalados não estão na lista de ativos
    foreach ($all_plugins as $plugin_file => $plugin_info) {
        if (!in_array($plugin_file, $active_plugins)) {
            $inactive_plugins[] = $plugin_info;
        }
    }

    // Exibe a lista de plugins desativados
    echo '<h2 style="color: #fff">Plugins Desativados:</h2>';
    echo '<ul style="color: #fff">';
    foreach ($inactive_plugins as $plugin_info) {
        echo '<li>' . $plugin_info['Name'] . '</li>';
    }
    echo '</ul>';
}

//add_action('admin_init', 'list_inactive_plugins');

function activate_all_plugins() {
    $active_plugins = get_option('active_plugins');
    $all_plugins = get_plugins();

    // Verifica quais plugins instalados não estão na lista de ativos e ativa-os
    foreach ($all_plugins as $plugin_file => $plugin_info) {
        if (!in_array($plugin_file, $active_plugins)) {
            activate_plugin($plugin_file);
        }
    }
}

//activate_all_plugins();

//list_inactive_plugins();
//ativar_todos_os_plugins();
//die('');
function mdmc_add_woocommerce_support() {
  add_theme_support('woocommerce');
}
add_action('after_setup_theme', 'mdmc_add_woocommerce_support');

include(get_template_directory() . '/inc/functions-old.php');
include(get_template_directory() . '/inc/mini-cart.php');
include(get_template_directory() . '/inc/utils.php');
include(get_template_directory() . '/inc/product.php');

function mdmc_css() {
  global $site_version;
  wp_enqueue_media();
  wp_enqueue_script('mdmc-script', get_template_directory_uri() . '/assets/js/main.min.js', [], $site_version, true);
  wp_register_style('mdmc-style', get_template_directory_uri() . '/style.css', [], $site_version, false);
  wp_enqueue_style('mdmc-style');
}
add_action('wp_enqueue_scripts', 'mdmc_css');

//add css to admin section
function admin_style() {
	wp_enqueue_style('admin-styles', get_template_directory_uri().'/admin-default.css');
	wp_enqueue_script(
		'admin-script', get_template_directory_uri() . '/admin-default.js',
		array('jquery'),
        filemtime( get_template_directory() . '/admin-default.js' ), // Adiciona o timestamp da última modificação como versão,
		true
	);

	wp_localize_script(
		'admin-script',
		'coupon_trigger_ajax_obj',
		array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) )
	);
}
add_action('admin_enqueue_scripts', 'admin_style');

add_action('after_setup_theme', 'enqueue_download_script');

if ( ! function_exists( 'enqueue_download_script' ) ){
    function enqueue_download_script(){
        add_action( 'wp_enqueue_scripts', 'download_script');
    }
}

if ( ! function_exists( 'download_script' ) ){
    function download_script() {
        wp_enqueue_script( 'download-script', get_template_directory_uri().'/assets/js/app/ajax/download-script.js', array( 'jquery'), '1.0.0', true );
        wp_localize_script( 'download-script', 'ajax_object', array(
            'ajaxurl' => admin_url( 'admin-ajax.php' ),
        ));
    }
}

add_filter( 'manage_edit-shop_order_columns', 'mdmc_add_new_order_admin_column' );
function mdmc_add_new_order_admin_column($columns) {

		$edit_columns['mdmc_spotify'] = __('QR Code Spotify');
 
		return array_merge( $columns, $edit_columns );
}

add_action( 'manage_shop_order_posts_custom_column', 'mdmc_add_new_order_admin_column_content', 20, 2 );
function mdmc_add_new_order_admin_column_content( $column, $order_id ) {

		$order = wc_get_order($order_id);
		if(is_wp_error($order)) return;

		if ($column === 'mdmc_spotify') {

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

            if($has_spotify) {
                echo '<input type="checkbox" style="pointer-events: none;" checked />';
            } else {
                echo '<input type="checkbox" style="pointer-events: none;"/>';
            }
		}
}

add_image_size('img-11x4-1320x480', 1320, 480, true);
add_image_size('img-11x4-440x160', 440, 160, true);
add_image_size('img-7x11-700x1060', 700, 1060, true);
add_image_size('img-1x1-768x768', 768, 768, true);
add_image_size('img-1x1-450x450', 450, 450, true);
add_image_size('img-1x1-240x240', 240, 240, true);
add_image_size('img-1x1-100x100', 100, 100, true);

add_filter('woocommerce_get_return_url','override_return_url',10,2);



function override_return_url($return_url,$order){

    //create empty array to store url parameters in 
    $sku_list = array();

    // retrive products in order
    foreach($order->get_items() as $key => $item)
    {
        $product = wc_get_product($item['product_id']);
        //get sku of each product and insert it in array 
        $sku_list['product_'.$item['product_id'] . '-sku'] = $product->get_sku();
    }
    //build query strings out of the SKU array
    $url_extension = http_build_query($sku_list);
    //append our strings to original url
    $modified_url = $return_url.'&'.$url_extension;

    return $modified_url;

}

add_filter( 'woocommerce_email_recipient_customer_completed_order', 'product_pdf_avoid_completed_email_notification', 10, 2 );
function product_pdf_avoid_completed_email_notification( $recipient, $order ) {
    // if( is_admin() ) return $recipient;

    // Loop through order items
    foreach ( $order->get_items() as $item ) {
        // Get an instance of the WC_Product object
        $product = $item->get_product(); 
        // Get the correct product ID (for variations we take the parent product ID)
        $product_id = $product->is_type('variation') ? $product->get_parent_id() : $product->get_id();

        if( get_post_meta( $product->get_id(), 'custom_product_type')[0] === 'pdf' )
            return '';
    }
    return $recipient;
}

function remove_mercadopago_script() {
    // Remove o script inserido no hook 'wp_head'
    if (!is_home() && !is_front_page()) {
        ob_start(function($buffer) {
            return str_replace('<script src="https://www.mercadopago.com/v2/security.js"></script>', '', $buffer);
        });
    }
}
add_action('wp_head', 'remove_mercadopago_script', 1);


$site_version = '2.6.36';

/**
 * Registra e enfileira os scripts da modal do Dia das Mães
 */
function mdmc_enqueue_modal_dia_das_maes_scripts() {
    global $site_version;
    
    wp_enqueue_style(
        'modal-dia-das-maes-style',
        get_template_directory_uri() . '/assets/css/modal-dia-das-maes.css',
        [],
        $site_version
    );
    
    wp_enqueue_script(
        'modal-dia-das-maes-script',
        get_template_directory_uri() . '/assets/js/modal-dia-das-maes.js',
        ['jquery'],
        $site_version,
        true
    );
    
    wp_localize_script(
        'modal-dia-das-maes-script',
        'mdmc_vars',
        [
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('mdmc_modal_nonce')
        ]
    );
}
add_action('wp_enqueue_scripts', 'mdmc_enqueue_modal_dia_das_maes_scripts');

/**
 * Função AJAX para carregar a modal do Dia das Mães
 */
function mdmc_load_modal_dia_das_maes() {
    check_ajax_referer('mdmc_modal_nonce', 'nonce');
    
    ob_start();
    include(get_template_directory() . '/template-parts/modal-dia-das-maes.php');
    $modal_html = ob_get_clean();
    
    wp_send_json_success($modal_html);
}
add_action('wp_ajax_load_modal_dia_das_maes', 'mdmc_load_modal_dia_das_maes');
add_action('wp_ajax_nopriv_load_modal_dia_das_maes', 'mdmc_load_modal_dia_das_maes');

/**
 * Adiciona a modal ao rodapé para usuários não logados
 */
function mdmc_add_modal_to_footer() {
    // Apenas carregar se o usuário não estiver logado
    if (!is_user_logged_in()) {
        include(get_template_directory() . '/template-parts/modal-dia-das-maes.php');
    }
}
add_action('wp_footer', 'mdmc_add_modal_to_footer', 100);

/**
 * Cria um cupom de 100% para variações específicas quando um pedido for aprovado
 * com valor igual ou superior a R$150
 */
function mdmc_create_coupon_on_order_complete($order_id, $old_status, $new_status) {
    error_log('Iniciando criação de cupom para pedido #' . $order_id . ' - Status: ' . $new_status);
    
    // Verificar se o status é processando ou completo
    if (!in_array($new_status, ['processing', 'completed'])) {
        error_log('Status não é processando ou completo: ' . $new_status);
        return;
    }

    // Obter o pedido
    $order = wc_get_order($order_id);
    if (!$order) {
        error_log('Pedido não encontrado: ' . $order_id);
        return;
    }

    // Verificar se o valor total é igual ou superior a R$150
    $total = $order->get_total();
    error_log('Valor total do pedido: ' . $total);
    if ($total < 150) {
        error_log('Valor total menor que R$150: ' . $total);
        return;
    }

    // Verificar se o cupom "kivia" foi utilizado
    $used_coupons = $order->get_coupon_codes();
    error_log('Cupons utilizados: ' . implode(', ', $used_coupons));
    
    if (!in_array('kivia', $used_coupons)) {
        error_log('Cupom "kivia" não foi utilizado nesta compra');
        return;
    }

    // Obter o usuário que fez o pedido
    $user_id = $order->get_user_id();
    if (!$user_id) {
        error_log('Usuário não encontrado para o pedido: ' . $order_id);
        return;
    }

    // Obter o email do usuário
    $user_email = $order->get_billing_email();
    if (!$user_email) {
        error_log('Email não encontrado para o usuário: ' . $user_id);
        return;
    }

    error_log('Todas as condições atendidas, criando cupom...');

    // Criar o código do cupom
    $coupon_code = 'KIVIAPDF100_' . strtoupper(substr(md5(uniqid()), 0, 8));
    error_log('Código do cupom gerado: ' . $coupon_code);

    // Criar o cupom usando a função existente
    $discount_type = 'percent'; // Tipo: percent para 100% de desconto
    $amount = 100; // 100% de desconto
    
    // Criar o post do cupom
    $coupon = array(
        'post_title' => $coupon_code,
        'post_content' => 'Cupom de 100% de desconto para Mapa dos Planetas e Mapa das Estrelas em PDF',
        'post_status' => 'publish',
        'post_author' => 1,
        'post_type' => 'shop_coupon'
    );

    $new_coupon_id = wp_insert_post($coupon);
    error_log('Cupom criado com ID: ' . $new_coupon_id);

    // Adicionar metadados do cupom
    update_post_meta($new_coupon_id, 'discount_type', $discount_type);
    update_post_meta($new_coupon_id, 'coupon_amount', $amount);
    update_post_meta($new_coupon_id, 'individual_use', 'yes');
    update_post_meta($new_coupon_id, 'product_ids', implode(',', [20491, 23323])); // IDs das variações específicas
    update_post_meta($new_coupon_id, 'exclude_product_ids', '');
    update_post_meta($new_coupon_id, 'usage_limit', '1');
    update_post_meta($new_coupon_id, 'usage_limit_per_user', '1');
    update_post_meta($new_coupon_id, 'expiry_date', '');
    update_post_meta($new_coupon_id, 'apply_before_tax', 'yes');
    update_post_meta($new_coupon_id, 'free_shipping', 'no');
    update_post_meta($new_coupon_id, 'customer_email', $user_email);

    // Salvar o código do cupom nos metadados do usuário
    update_user_meta($user_id, 'mdmc_100_percent_coupon', $coupon_code);
    error_log('Cupom salvo nos metadados do usuário');

    // Enviar email para o usuário com o código do cupom
    $subject = 'Seu cupom de 100% de desconto!';
    
    // Criar o template HTML do email
    $message = '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px" align="center">';
    $message .= '   <tbody>';
    $message .= '      <tr>';
    $message .= '         <td role="modules-container" style="padding:0px 0px 0px 0px;color:#000000;text-align:left" bgcolor="#ffffff" width="100%" align="center">';
    $message .= '         <p style="text-align:center"><img src="https://www.mapadomeuceu.com.br/wp-content/uploads/2019/07/LogoNOVO_MDMC_Compacto_x190.png" style="border:none;display:inline-block;font-weight:bold;height:auto;outline:none;text-decoration:none;text-transform:capitalize;vertical-align:middle;max-width:100%;font-size:14px;margin-left:0;margin-right:0;height:80px" /></p>';
    $message .= '         <p>Parabéns! Seu pedido #' . $order_id . ' foi aprovado e você ganhou um cupom especial!</p>';
    $message .= '         <p>Você recebeu um cupom de <strong>100% de desconto</strong> para Mapa dos Planetas e Mapa das Estrelas em PDF.</p>';
    $message .= '         <p style="font-size:18px;font-weight:bold;text-align:center;background-color:#f5f5f5;padding:15px;border-radius:5px;">CUPOM: ' . $coupon_code . '</p>';
    $message .= '         <p>Este cupom é válido apenas para as variações específicas e tem uso único.</p>';
    $message .= '         <p>Aproveite esta oportunidade especial para eternizar mais momentos em forma de estrelas!</p>';
    $message .= '         </td>';
    $message .= '      </tr>';
    $message .= '   </tbody>';
    $message .= '</table>';
    
    $headers = ['Content-Type: text/html; charset=UTF-8'];
    
    // Adicionar log para debug
    error_log('Tentando enviar email para: ' . $user_email);
    error_log('Assunto: ' . $subject);
    
    $mail_sent = wp_mail($user_email, $subject, $message, $headers);
    
    // Adicionar log para debug
    if ($mail_sent) {
        error_log('Email enviado com sucesso para: ' . $user_email);
    } else {
        error_log('Falha ao enviar email para: ' . $user_email);
    }
}
add_action('woocommerce_order_status_changed', 'mdmc_create_coupon_on_order_complete', 10, 3);
