<?php get_header(); ?>

<?php if(have_posts()) { while (have_posts()) { the_post(); ?>

<?php 

$template_dir = get_template_directory_uri();
$img_url = $template_dir . '/assets/images';
$home_options = get_field('home_options', 'options');
?>

<div class="home-page">
  
  <!-- Front page Banners -->
  <?php 
  set_query_var('primary_banners', $home_options['primary_banners']);
  get_template_part( 'template-parts/home/main-banners'); 
  ?>
  <!-- Front page Banners -->
  
  <!-- Card Banners -->
  <?php 
  set_query_var('card_banners', $home_options['card_banners']);
  get_template_part( 'template-parts/home/card-banners'); 
  ?>
  <!-- Card Banners -->

  <div class="wrapper-1310">
    <!-- Secondary banners -->
    <?php 
    set_query_var('secondary_banners_title', $home_options['secondary_banners_title']);
    set_query_var('secondary_banners', $home_options['secondary_banners']);
    get_template_part( 'template-parts/home/secondary-banners'); 
    ?>
    <!-- Secondary banners -->
  </div>

  <!-- Testimonials -->
    <?php 
    set_query_var('clients', $home_options['clients']);
    set_query_var('clients_title', $home_options['clients_title']);
    set_query_var('clients_text', $home_options['clients_text']);
    get_template_part( 'template-parts/home/testimonials');
    ?>
  <!-- Testimonials -->

  <?php 
    set_query_var('faq_block', get_field('faq_block', 'option'));
    get_template_part('template-parts/faq'); 
  ?>
  
  <?php 
    $tertiary_banners_title = $home_options['tertiary_banners_title'];
    $tertiary_banners = $home_options['tertiary_banners'];
  ?>
  <div class="wrapper-1310">
    <div class="-space-bottom--large">
      <div class="section-title">
        <h2><?php echo $tertiary_banners_title ?></h2>
      </div>
      <div class="d-row d-row--3">

        <?php foreach($tertiary_banners as $key => $banner) : ?>
          <a href="<?php echo $banner['link']; ?>" class="item item-about br-6">
            <img src="<?= $banner['image']['url'] ?>" alt="<?php echo get_alternative_image_alt($banner['image']['description'], $banner['title']); ?>" loading="lazy">
          </a>
        <?php endforeach; ?>

      </div>
    </div>

  </div>

  <?php get_template_part('template-parts/blog'); ?>
  
  
  
</div>
<?php } } ?>

<?php get_footer(); ?>