<?php
/**
 * Downloads
 *
 * Shows downloads on the account page.
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/downloads.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 7.8.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$has_pdf = false;
$user_id = get_current_user_id();
$orders = wc_get_orders([
    'limit'       => - 1,
    'status'      => ['processing','completed'],
    'customer_id' => $user_id,
]);

foreach($orders as $order) {

  $order_real_id = $order->get_order_number();
  $order_id = $order->get_id();
 
  $order = wc_get_order( $order_id );
  $items = $order->get_items();
  foreach ( $items as $item_id => $item ) {
     $product_id = $item->get_variation_id() ? $item->get_variation_id() : $item->get_product_id();
     if ( $product_id === 15136 || $product_id === 19896 || $product_id === 20491 || $product_id === 15191 || $product_id === 15500 || $product_id === 19970 || $product_id === 15190 || $product_id === 23323 || $product_id === 34697) {
        foreach ( $item->get_formatted_meta_data() as $meta_id => $meta ) {
					$display_pdf_value = wp_strip_all_tags( $meta->display_value );
					if($meta->display_key === 'Link do PDF') {
						$replace_normal = str_replace('normal-space', '%20', $display_pdf_value);
						$replace_quotes = str_replace('double-quotes', '%22', $replace_normal);
						$replace_dots = str_replace('double-dots', ':', $replace_quotes);
						$replace_hash = str_replace('#', 'icon-hash', $replace_dots);
						$replace_hash_bug = str_replace('icon-hash038;', '', $replace_hash);
						$replace_icon_black_start = str_replace('★', 'icon-black-star', $replace_hash_bug);
						$replace_icon_round_star= str_replace('✪', 'icon-round-star', $replace_icon_black_start);
						$replace_icon_light_star = str_replace('✩', 'icon-light-star', $replace_icon_round_star);
						$replace_icon_mixed_star = str_replace('✮', 'icon-mixed-star', $replace_icon_light_star);
						$replace_icon_black_hearth = str_replace('♥', 'icon-black-hearth', $replace_icon_mixed_star);
						$replace_icon_transparent_hearth = str_replace('♡', 'icon-transparent-hearth', $replace_icon_black_hearth);
						$replace_icon_music = str_replace('♫', 'icon-music', $replace_icon_transparent_hearth);
						$link = str_replace('enter-space', '%0A', $replace_icon_music);
						$link = str_replace('http://www.mapadomeuceu.com.br', '', $link);
						$isPlanet = ($product_id === 23323 ? 'isPlanet' : '');
						
						// update_post_meta( 8410, 'downloaded_pdf', 'alo'); 

            $message = '<div class="pdf-account-order-info" style="position: relative">'; 
            $message .= 'Pedido: #' . $order_real_id; 
            $message .= '<span style="position: absolute; top:0; right: 0; font-size: 11px;">Data do último download: ' . get_post_meta( $order_id, 'downloaded_pdf', true ) . '</span>'; 
            $message .= '<span style="position: absolute; top:20px; right: 0; font-size: 11px;">№ de downloads: ' . get_post_meta( $order_id, 'downloaded_quantity', true ) . '</span>'; 
						$message .= '<p><button class="woocommerce-Button button '. $isPlanet .'"data-pid="'.$product_id.'" onclick="" data-id="' . $order_id . '" data-value="' . $link .'&order_id=' . $order_real_id . '">Baixar PDF</button></p>';
            $message .= '<hr />';
            $message .= '</div>';

						echo $message;

            $has_pdf = true;
					}
				}
		 }
		 
  }

}


// Show PDF link on old pdf generator
// foreach($orders as $order) {

//   $order_id = $order->id;
//   $notes = wc_get_order_notes($order_id);
//   $notes = get_private_order_notes($order_id);

//   foreach($notes as $note) {
//       if( strpos($note['note_content'],'-PDF-') !== false ) {
//             $pdf_url = $note['note_content'];
//             echo $pdf_url;
//     }
//   }

// }

$downloads     = WC()->customer->get_downloadable_products();
$has_downloads = (bool) $downloads;

do_action( 'woocommerce_before_account_downloads', $has_downloads ); ?>

<!-- <#?php if ( $has_downloads ) : ?>

	<#?php do_action( 'woocommerce_before_available_downloads' ); ?>

	<#?php do_action( 'woocommerce_available_downloads', $downloads ); ?>

	<#?php do_action( 'woocommerce_after_available_downloads' ); ?>

<#?php else : ?> -->
<?php if ( !$has_pdf ) : ?>
	<div class="woocommerce-Message woocommerce-Message--info woocommerce-info">
		<?php esc_html_e( 'No downloads available yet.', 'woocommerce' ); ?>
	</div>
<?php endif; ?>

<?php do_action( 'woocommerce_after_account_downloads', $has_downloads ); ?>
