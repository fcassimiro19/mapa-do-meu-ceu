<?php 
$product = wc_get_product(get_query_var('product_id'));
if (empty($product)) return;

$product_card = format_single_product($product->get_id(), 'img-1x1-240x240');
$commercial_name = get_field('product_commercial_name', $product->get_id());
$envio_rapido = get_field('envio_rapido', $product->get_id());
set_query_var( 'product_ID', $product->get_id() );
?>
<a class="item product-card" href="<?php echo get_permalink( $product->get_id() ); ?>">
	<div class="image">
		<img src="<?php echo $product_card['img'] ?>" alt="">
	</div>
  <div class="info">
		<p class="category">
			<?php echo $commercial_name; ?></p>  
		<strong class="name">
			<?php echo $product->get_name(); ?>
		</strong>
		<p class="description">
			<?php echo $product->get_short_description(); ?>
		</p>
    <div class="price">
      <?php
      echo $product->get_price_html();
      ?>
    </div>
	</div>
	
</a>