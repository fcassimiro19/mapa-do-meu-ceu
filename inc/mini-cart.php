<?php

/**
 * Ajax Cart Count Shortcode
 */

add_shortcode ('woo_cart_but', 'woo_cart_but' );
/**
 * Create Shortcode for WooCommerce Cart Menu Item
 */
function woo_cart_but() {
	ob_start();
 
        $cart_count = WC()->cart->cart_contents_count; // Set variable for cart item count
        $cart_url = wc_get_cart_url();  // Set Cart URL
  
        ?>
        <span class="cart-contents">
	    <?php
        if ( $cart_count > 0 ) {
       ?>
            <?php echo $cart_count; ?>
        <?php
        }
        ?>
        </span>
        <?php
	        
    return ob_get_clean();
 
}


add_filter( 'woocommerce_add_to_cart_fragments', 'woo_cart_but_count' );
/**
 * Add AJAX Shortcode when cart contents update
 */
function woo_cart_but_count( $fragments ) {
 
    ob_start();
    
    $cart_count = WC()->cart->cart_contents_count;
    $cart_url = wc_get_cart_url();
    
    ?>
    <span class="cart-contents">
	<?php
    if ( $cart_count > 0 ) {
        ?>
        <?php echo $cart_count; ?>
        <?php            
    }
        ?></span>
    <?php
 
    $fragments['span.cart-contents'] = ob_get_clean();
     
    return $fragments;
}