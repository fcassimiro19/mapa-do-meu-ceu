<?php 

$faq = get_query_var('faq_block');

?>

<div class="wrapper-1310 faq-section -space-bottom--large" id="ajuda">
  <div class="section-title">
    <h2>Perguntas Frequentes</h2>
  </div>

  <div class="questions">
    <?php foreach($faq as $key => $item):  ?>
      <div class="accordion <?php echo ($key === 0 ? 'active' : '') ?>">
        <div class="acc-title"><?php echo $item['question'] ?></div>
        <i class="icon-arrow-down icon-acc"></i>
      </div>
      <div class="panel">
        <p><?php echo $item['answer'] ?></p>
      </div>
      <?php if($key == 5) break; ?>
    <?php endforeach; ?>
    </div>

</div>