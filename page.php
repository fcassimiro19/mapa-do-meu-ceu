<?php 
  get_header(); 
?>

<?php 
  if(have_posts()) :
    while (have_posts()) : the_post(); 
?>

<?php if(is_cart() || is_checkout() || is_account_page() || is_shop()) : ?>

  <?php the_content() ?>

<?php else : ?>

  <div class="single-post-content wrapper-808">
    <div class="header">
      <h1><?php echo get_the_title()?></h1>
    </div>
    <div class="post-body text-content">
      <?php the_content() ?>
    </div>
  </div>
  
<?php endif; ?>

<?php 
    endwhile; 
  endif; 
?>

<?php 
  get_footer();
?>