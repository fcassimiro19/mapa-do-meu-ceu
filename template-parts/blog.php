<?php 

$args = array(
		'post_status' => 'publish',
		'posts_per_page' => 3,
);

$blog = new WP_Query( $args );

if($blog->have_posts()) :

?>

<div class="wrapper-1310 -space-bottom--large">
  <h2 class="section-title">
    Nosso conteúdo intergalático
  </h2>
  <div class="blog-list">
    <?php while($blog->have_posts()): $blog->the_post(); ?>
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
    <?php endwhile; ?>
    
    <a href="/blog" class="button-default -secondary more-trigger -full-mobile">Visitar Blog</a>
  </div>
</div>

<?php endif; ?>