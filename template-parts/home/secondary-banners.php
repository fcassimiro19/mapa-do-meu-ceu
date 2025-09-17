<?php 
$secondary_banners_title = get_query_var('secondary_banners_title');
$secondary_banners = get_query_var('secondary_banners');
?>

<div class="section-title">
  <h2><?php echo $secondary_banners_title ?></h2>
</div>
<div class="secondary-banner">
  <?php foreach($secondary_banners as $key => $banner) : ?>

    <?php if($key === 0) : ?>
      <div class="d-row d-row--3 -space-bottom--small">
    <?php endif; ?>

    <?php if(($key === 3 && count($secondary_banners) === 5)  ||($key === 4 && count($secondary_banners) === 6) ) : ?>
      <div class="d-row d-row--2">
    <?php endif; ?>

      <a href="<?php echo $banner['link']; ?>" class="item">
        <img src="<?= $banner['image']['url'] ?>" alt="<?php echo get_alternative_image_alt($banner['image']['description'], $banner['title']); ?>" loading="lazy">

        <div class="-text">
          <strong>
            <?php echo $banner['title']; ?>
          </strong>
          <p>
            <?php echo $banner['text']; ?>
          </p>
        </div>
      </a>

    <?php if(count($secondary_banners) === 5) : ?>
      <?php if($key === 2 || $key === 4 ) : ?>
        </div>
      <?php endif; ?>
    <?php endif; ?>

    <?php if(count($secondary_banners) === 6) : ?>
      <?php if($key === 3 || $key === 5 ) : ?>
        </div>
      <?php endif; ?>
    <?php endif; ?>

  <?php endforeach; ?>

  <div class="newsletter-banner">
      <strong>Fique por dentro das nossas ofertas</strong>
      <form action="">
        <input type="text" placeholder="seu@email.com" />
        <input type="submit" value="Cadastrar">
      </form>
  </div>

</div>