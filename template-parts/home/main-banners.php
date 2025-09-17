<?php 

$main_banners = get_query_var('primary_banners');
?>

<div class="primary-banner single-slider">
  <?php foreach($main_banners as $banner) : ?>

    <?php if($banner['link']) : ?>
      <a href="<?php echo $banner['link']; ?>" class="item">
    <?php else: ?>
      <div class="item">
    <?php endif; ?>
      <picture>
        <source media="(max-width: 799px)" srcset="<?php echo $banner['image_mobile']['url']; ?>">
        <source media="(min-width: 800px)" srcset="<?php echo $banner['image_desktop']['url']; ?>">
        <img data-flickity-lazyload="<?= $banner['image_desktop']['url'] ?>" alt="<?php echo get_alternative_image_alt($banner['image_desktop']['description'], $banner['title']) ?>">
      </picture>

      <div class="-text">
        <strong>
          <?php echo $banner['title']; ?>
        </strong>
        <p>
          <?php echo $banner['text']; ?>
        </p>
      </div>
    <?php if($banner['link']) : ?>
      </a>
    <?php else: ?>
      </div>
    <?php endif; ?>

  <?php endforeach; ?>

</div>