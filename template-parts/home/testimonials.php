<?php 
$clients = get_query_var('clients');
$clients_title = get_query_var('clients_title');
$clients_text = get_query_var('clients_text');
?>

<div class="section-title" id="reviews">
  <h2><?php echo $clients_title ?></h2>
  <small><?php echo $clients_text ?></small>
</div>

<div class="reviews-block">
  <div class="header">
    <p>Avaliações Verificadas</p>
    <strong>9.3</strong>
  </div>
  <div class="rating-block">
    <div class="stars-group">
      <i class="icon-star"></i>
      <i class="icon-star"></i>
      <i class="icon-star"></i>
      <i class="icon-star"></i>
      <i class="icon-star-half"></i>
    </div>
    <a href="https://www.feedbackcompany.com/pt-pt/reviews/mapa-do-meu-ceu" target="_blank">450+ avaliações verificadas</a>
  </div>

  <div style="position: relative">
    <div class="reviews">
      <?php foreach($clients['reviews'] as $key => $review) : ?>
        <?php 
          $total_reviews = (count($clients['reviews']) % 2 ? count($clients['reviews']) + 1 : count($clients['reviews']));
        ?>
        <?php if($key === 0) : ?>
          <div class="reviews-line" data-total="<?php echo $total_reviews ?>">
        <?php endif; ?>
        <?php if($key === $total_reviews / 2) : ?>
          </div>
          <div class="reviews-line">
        <?php endif; ?>
          <div class="item" data-key="<?php echo $key ?>">
            <div class="text">
              <?php echo $review['text'] ?>
            </div>
            <div class="details">
              <?php if(!empty($review['photo'])) : ?>
                <div class="photo">
                  <img src="<?php echo $review['photo']['sizes']['img-1x1-100x100'] ?>" alt="<?php echo $review['name'] ?>" loading="lazy">
                </div>
              <?php endif; ?>
              <div class="name-and-source">
                <span><?php echo $review['name'] ?></span>
                <small><?php echo $review['source'] ?></small>
              </div>
              <div class="stars-group" style="margin-left: 10px;">
                <i class="icon-star"></i>
                <i class="icon-star"></i>
                <i class="icon-star"></i>
                <i class="icon-star"></i>
                <i class="icon-star"></i>
              </div>
            </div>
          </div>

      <?php endforeach; ?>
      </div>
    </div>
    <button class="slider-actions prev"><svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow"></path></svg></button>
    <button class="slider-actions next"><svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg></button>
  </div>
 

</div>