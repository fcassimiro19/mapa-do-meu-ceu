<?php 

function format_single_product($id, $img_size = 'large') {
    $product = wc_get_product($id);

    $gallery_ids = $product->get_gallery_attachment_ids();
    $gallery = [];
    if($gallery_ids) {
      foreach($gallery_ids as $key => $img_id) {
        $gallery[$key]['img'] = wp_get_attachment_image_src($img_id, $img_size)[0];
        $gallery[$key]['img_medium'] = wp_get_attachment_image_src($img_id, 'img-1x1-768x768')[0];
        $gallery[$key]['img_small'] = wp_get_attachment_image_src($img_id, 'img-1x1-100x100')[0];
        $gallery[$key]['title'] = get_the_title($img_id);
      }
    }

    return [
      'id' => $id,
      'name' => $product->get_name(),
      'price' => $product->get_price_html(),
      'link' => $product->get_permalink(),
      'description' => $product->get_description(),
      'img' => !empty(wp_get_attachment_image_src($product->get_image_id(), $img_size)) ? wp_get_attachment_image_src($product->get_image_id(), $img_size)[0] : '',
      'img_medium' => !empty(wp_get_attachment_image_src($product->get_image_id(), 'img-1x1-768x768')) ? wp_get_attachment_image_src($product->get_image_id(), 'img-1x1-768x768')[0] : '',
      'img_small' => !empty(wp_get_attachment_image_src($product->get_image_id(), 'img-1x1-100x100')) ? wp_get_attachment_image_src($product->get_image_id(), 'img-1x1-100x100')[0] : '',
      'upsells' => $product->get_upsells(),
      'gallery' => $gallery,
    ];
  }