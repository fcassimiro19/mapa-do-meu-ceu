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
 * @version 8.6.0
 */

?>

<?php get_header(); ?>
<?php 
$template_dir = get_template_directory_uri();
$img_url = $template_dir . '/assets/images';
$search_query = $_GET['s'];

?>

<div class="category-page">
		<input type="hidden" name="search-query" value="<?php echo $search_query; ?>">

		<?php
		global $wp_query;
		$the_query = $wp_query;

		if (isset($_GET['s'])) {
				$paged = ( get_query_var( 'paged' ) ) ? absint( get_query_var( 'paged' ) ) : 1;
        $per_page = '18';
				$args = array(
            'post_type' => 'product',
            'posts_per_page' => $per_page,
            'orderby' => 'menu_order',
            'order' => 'ASC',
						'paged' => $paged,
						's' => $search_query,
				);

				$the_query = new WP_Query($args);
				// $the_query->posts = array_unique(array_merge($wp_query->posts, $the_query->posts), SORT_REGULAR );
				$the_query->post_count = count($the_query->posts);
		}
		
		if ($the_query->have_posts()) {
		?>


        <?php
				$array_products_ids = array();
				while($the_query->have_posts()) { 
					$the_query->the_post(); 
					$array_products_ids[] = get_the_ID();
				}
				?>
 
	<!-- Wrapper-sidebar --> 
	<div class="wrapper-1310">

		<!-- Wrapper-sidebar main-content -->
		<div class="main-content <?php echo (isset($_GET["filter"]) ? '-loading' : '') ?>">
			<div class="header">
				<p style="margin: 20px 0 40px">
          Produtos relacionados a: <strong><?php echo $search_query; ?></strong>
        </p>
			</div>

			<div class="product-list">

        <?php 
        if ( ! empty($array_products_ids)) :
          $count = 0;
          for ($i=0; $i < count($array_products_ids); $i++) { 
              if (empty($array_products_ids[$i])) continue;

              set_query_var('product_id', $array_products_ids[$i]);
              get_template_part('template-parts/product-card');
              
              $count++;
          }
        endif;
        ?>
					
			</div>
      <div class="navigation pagination" role="navigation">
        <nav class="nav-links">
            <?php
            $big = 999999999; // need an unlikely integer

            echo paginate_links( array(
              'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
              'format' => '?paged=%#%',
              'prev_text'          => __('«'),
              'next_text'          => __('»'),
              'current' => max( 1, get_query_var('paged') ),
              'total' => $the_query->max_num_pages
            ) );
            ?>
        </nav>
      </div>

      <?php $the_query = null; $the_query = $temp; ?>

		</div>
		<!-- Wrapper-sidebar main-content -->

	</div>
	<!-- Wrapper-sidebar -->

	<!-- Card Banners -->
	<!-- <#?php get_template_part( 'template-parts/card-banners'); ?> -->
	<!-- Card Banners -->


	<?php } else { ?>
		<div class="search-notfounded wrapper-1310">
			<div class="-text-center text">
				Não encontramos resultados relacionados a: <strong><?php echo $search_query ?></strong>
			</div>
      <p class="-text-center" style="margin: 24px auto 48px; font-weight: 600; font-size: 24px; line-height: 32px; color: #333;">Verifique a ortografia da sua busca ou <br/> <a href="/contato" style="color: #ED6E33; text-decoration: underline">entre em contato conosco</a></p>
		</div>

	<?php } ?> 

</div>

<?php get_footer(); ?>
