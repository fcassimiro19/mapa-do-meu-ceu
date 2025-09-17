<?php 
  get_header();

  $indice = get_field('indice_active');
?>



<?php 
  if(have_posts()) :
    while (have_posts()) : the_post(); 
?>
      <div class="single-post-content-header">
        <h1><?php echo get_the_title()?></h1>
      </div>
      <div class="single-post-content wrapper-808">
        <div class="post-body text-content">
          <?php the_content() ?>
        </div>
        <?php 
        if($indice) : ?>

          <div class="indice">
            <progress class="readingProgressbar" data-height="7" value="0" max="100"></progress>
            <div class="indice-header">
              <label class="toggle-indice" for="toggle-indice">
                <?php echo get_the_title()?>
              </label>
            </div>
            <input class="hidden" type="checkbox" name="toggle-indice" id="toggle-indice" />
            <div class="indice-content">
              <p>O que você vai ler nesse artigo</p>
              <ul></ul>
            </div>
          </div>
        <?php endif; ?>
      </div>


<?php 
    endwhile; 
  endif;
?>

<?php
$args = array(
  'post_type' => 'post',
  'posts_per_page' => 3,
  'orderby' => 'rand'
);

$blog_query = new WP_Query($args);
?>
<div class="blog-page-content wrapper-1310 -space-bottom--large">
  <h2 class="section-title">
			Continue lendo
		</h2>
  <div class="blog-list">
<?php
  while($blog_query->have_posts(  )): $blog_query->the_post(  );
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
      endwhile; 
  ?>
  </div>
</div>
<?php 
  get_footer();
?>