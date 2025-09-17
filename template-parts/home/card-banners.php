<?php 
$card_banners = get_query_var('card_banners');
?>

<!-- <div class="wrapper-1310"> -->
  <div class="card-banners">
    <?php foreach($card_banners as $banner) : ?>

      <div class="item">
        <img src="<?php echo $banner['icon']['url'] ?>" alt="<?php echo $banner['text']; ?>" height="40px">
        <span><?php echo $banner['text']; ?></span>
      </div>

    <?php endforeach; ?>
  </div>
<!-- </div> -->