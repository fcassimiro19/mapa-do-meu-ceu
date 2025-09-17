<?php 
/**
 * Template Name: Blog
 */
get_header();


    $paged = ( get_query_var( 'paged' ) ) ? absint( get_query_var( 'paged' ) ) : 1;
    $per_page = '12';


	$args = array(
		'post_type' => 'post',
		'posts_per_page' => $per_page,
		'paged' => $paged,
	);

	$blog_query = new WP_Query($args);
	if ($blog_query->have_posts()) :  ?>
	<div class="blog-page-content wrapper-1310 -space-bottom--large">
		<h2 class="section-title">
			Nosso conteúdo intergalático
		</h2>
		<div class="blog-list">
		
		<?php while($blog_query->have_posts()) : $blog_query->the_post();
		?>
			<?php $post_id = get_the_id(); ?>
			<a href="<?php echo get_the_permalink($post_id) ?>" class="item" target="_blank">
				<div class="image">
					<img src="<?php echo get_the_post_thumbnail_url($post_id, 'img-11x4-440x160') ?>" alt="<?php echo get_the_title($post_id) ?>" loading="lazy">
				</div>
				<div class="text">
					<p class="category"><?php echo get_the_category($post_id)[0]->name ?> <time>• <?php echo date_formated($post_id) ?></time></p>
					<strong class="title"><?php echo get_the_title($post_id) ?></strong>
					<p class="description"><?php echo get_the_excerpt($post_id) ?></p>
					<?php if(get_the_tags($post_id)) : ?>
					<p class="tags">
						<?php foreach(get_the_tags($post_id) as $highlight_tag) : ?>
							#<?php echo $highlight_tag->name ?>
						<?php endforeach; ?>
					</p>
					<?php endif; ?>
				</div>
			</a>
		<?php
	endwhile; ?>

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
					'total' => $blog_query->max_num_pages
				) );
				?>
		</nav>
	</div>

	<?php $blog_query = null; $blog_query = $temp; ?>
</div>

<?php endif; ?>




  

<?php
  get_footer( );
?>