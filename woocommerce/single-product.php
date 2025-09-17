<?php 

/**
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 1.6.4
 */

?>

<?php get_header(); ?>

<?php 
global $post;

$terms = wp_get_post_terms( $post->ID, 'product_cat' );
$custom_map = get_field('custom_map');

foreach ( $terms as $term ) $categories[] = $term->slug;
if ( in_array( 'mapa-das-estrelas', $categories ) ) {
    wc_get_template_part( 'content', 'mapa-das-estrelas' );
} elseif( in_array( 'pingente-dos-planetas', $categories ) ) {
    wc_get_template_part( 'content', 'pingente' );
} elseif( in_array( 'pingente-das-estrelas', $categories ) ) {
    wc_get_template_part( 'content', 'pingente-das-estrelas' );
} elseif( in_array( 'mapa-dos-planetas', $categories ) ) {
    wc_get_template_part( 'content', 'mapa-dos-planetas' );
} elseif( in_array( 'vale-presente', $categories ) ) {
    wc_get_template_part( 'content', 'vale-presente' );
} elseif( in_array( 'quadro-signos', $categories ) ) {
    wc_get_template_part( 'content', 'mapa-signos' );
} elseif( in_array( 'quadro-signos-kids', $categories ) ) {
    wc_get_template_part( 'content', 'mapa-signos-kids' );
} elseif( !empty($custom_map) ) {
    wc_get_template_part( 'content', 'custom-map' );
} else {
  wc_get_template_part( 'content', 'single-product' );
}

?>

<?php get_footer(); ?>
