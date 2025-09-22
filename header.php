<?php
	$param = '';
	if(!empty($_GET['p_type'])) {
		$param = $_GET['p_type'];
	}
	$cart_data = array();

if(is_cart() || is_checkout()) {
	global $woocommerce;
	$items = $woocommerce->cart->get_cart();

	if(!empty($items)) {
		foreach($items as $item => $values) { 
			$terms = get_post_meta( $values['data']->get_id(), 'custom_product_type' );
			if($terms) {
				$cart_data[] = $terms[0];
			}
		}
		$cart_data = array_unique($cart_data);
		$cart_data = implode(',',$cart_data);
	} else {
		$cart_data = 'unset';
	}
}
if(empty($cart_data)) {
	$cart_data = 'unset';
}
if(is_cart() && !$param && empty( is_wc_endpoint_url('order-received') )) {
	$cart_url = wc_get_cart_url() . '?p_type=' . $cart_data;
	wp_safe_redirect( $cart_url, '307');
}
if(is_checkout() && !$param && empty( is_wc_endpoint_url('order-received') )) {
	$cart_url = wc_get_checkout_url() . '?p_type=' . $cart_data;
	wp_safe_redirect( $cart_url, '307');
}
	$template_dir = get_template_directory_uri();
	$img_url = $template_dir . '/assets/images';
	$cart_count = WC()->cart->get_cart_contents_count();
	$current_user = wp_get_current_user();
	$is_blog = is_page_template('page-blog.php') || is_single() || is_category()  || is_tag();
?>

<html lang="pt-br">
<head>
		<meta name="p:domain_verify" content="2845f1f56781c610a35c62c8893377bc"/>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<link rel="icon" type="image/png" href="<?php echo $img_url ?>/favicon.png">
		<link rel="preconnect" href="https://fonts.gstatic.com">
		<link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<title><?php wp_title(); ?></title>
		<meta name="nitro-verify" content="nitro-6092f41ec2b50c51c828f6c6822f445bcd0821d607bfc">
		<meta name="google-site-verification" content="LVwnud5j1grcPZPLpN9L4kqSKSmIb66TeVN_ajO0nsQ" />
		<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.5/dist/html2canvas.min.js"></script>
		<?php wp_head(); ?>

		<?php $general_warning = get_field('general_warning', 'option') ?>
		<?php if($is_blog) : ?>
			<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9018546816203963"
     crossorigin="anonymous"></script>
		<?php endif; ?>
		<!-- Hotjar Tracking Code for https://mapadomeuceu.com.br -->
		<script>
				(function(h,o,t,j,a,r){
						h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
						h._hjSettings={hjid:2789378,hjsv:6};
						a=o.getElementsByTagName('head')[0];
						r=o.createElement('script');r.async=1;
						r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
						a.appendChild(r);
				})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
		</script>
</head>
<?php $hide_header_and_footer = hide_header_and_footer($post) ? 'hide-header-and-footer' : 'show-header-footer' ?>
<body <?php body_class($hide_header_and_footer); ?>>
<!-- <div><a href="https://planetcalc.com/522/" data-lang="pt" data-code="" data-colors="#263238,#435863,#090c0d,#fa7014,#fb9b5a,#c25004" data-v="4137">PLANETCALC, Fases da Lua</a><script src="https://embed.planetcalc.com/widget.js?v=4137"></script></div> -->

	<?php if(hide_header_and_footer($post)) return; ?>
	<header class="main-header">
		<div class="over-header">
			<div class="wrapper-1310">
				<p><?php echo $general_warning; ?></p>
			</div>
		</div>
		<div class="wrapper-1310">
			<?php
			if ( ! is_checkout()) :
			?>
				<div class="account-block">
					<a class="item-menu -mobile" id="mobile-menu-trigger">  
							<span class="-closed">
								<i class="icon-menu"></i> Menu
							</span>
							<span class="-open">
								<i class="icon-close"></i> Fechar
							</span>
						</a>
				</div>
			<?php endif; ?>

			<a class="logo" href="<?php echo get_home_url(); ?>">
				<?php if(is_front_page() || is_page()) : ?>
					<h1>Mapa do Meu Céu</h1>
				<?php else : ?>
					<h3>Mapa do Meu Céu</h3>
				<?php endif; ?>
			</a>
			<?php
			if ( ! is_checkout()) :
			?>
				<form class="search-block" action="<?php bloginfo('url'); ?>/" method="get">
					<input
					type="text"
					name="s"
					id="s"
					placeholder="O que você está buscando?"
					value="<?php the_search_query(); ?>"
					autocomplete="off"
					>
					<!-- <input type="text" name="post_type" value="product" class="hidden"> -->
					<button type="submit" id="searchbutton">Buscar</button>
				</form>

				<nav class="account-block">
					<a href="/minha-conta" class="item-account -desktop  <?= (is_user_logged_in() ? '-logged' : '-unlogged') ?>">
					<?php  if( is_user_logged_in() ) : ?>
							<i class="icon-user"></i> 
							<span><?= $current_user->first_name . ' ' . $current_user->last_name ?></span>
						<?php else : ?>
							<span>Acesse sua conta!</span>
							Entrar <i class="icon-arrow-right2"></i>
						<?php endif; ?>

					</a>
					<a href="<?php echo wc_get_cart_url(); ?>" class="item-cart">
            <i class="icon-cart"></i>
						<?php if($cart_count) { ?>
							<!-- <span class="carrinho-count"><#?= $cart_count; ?></span> -->
							<span class="carrinho-count"><?php echo do_shortcode("[woo_cart_but]"); ?></span>
						<?php } ?>
					</a>
				</nav>
			<?php endif; ?>
		</div>
		
		<?php
		if ( ! is_checkout()) :
		?>
			<nav class="main-menu">
				<div class="wrapper-1310">
					<div class="account-block -mobile <?= (is_user_logged_in() ? '-logged' : '-unlogged') ?>">
						<?php  if( is_user_logged_in() ) : ?>
							<div class="item-account">
								<i class="icon-user"></i> 
								<span><?= $current_user->first_name . ' ' . $current_user->last_name ?></span>
							</div>
							<a class="button-default -primary" href="/minha-conta" style="width: 108px">Conta</a>
						<?php else : ?>
							<div class="item-account">
								<i class="icon-user"></i> 
								<span>Olá!</span>
								<small>Entre e acesse benefícios exclusivos.</small>
							</div>
							<a class="button-default -full -primary" href="/minha-conta">Entrar</a>
						<?php endif; ?>
						<div class="submenu-header">
							<div class="submenu-header-title">
								<strong></strong>
							</div>
							<div class="navigation">
								<a onclick="closeSubMenu()" class="-menu-previous">Voltar</a>
								<a class="-category-link" href="">Ver tudo</a>
							</div>
						</div>
					</div>

          <nav class="list">
              <ul id="menu-main-menu" class="menu">
                <li class="menu-item menu-item-has-children">
                  <a href="#">Quadros</a>
                  <ul class="sub-menu">
                    <li class="menu-item">
                      <a href="<?php echo get_home_url() ?>/produto/mapa-das-estrelas/">Mapa das Estrelas</a>
                    </li>
                    <li class="menu-item">
                      <a href="<?php echo get_home_url() ?>/produto/mapa-dos-planetas/">Mapa dos Planetas</a>
                    </li>
                    <li class="menu-item">
                      <a href="<?php echo get_home_url() ?>/produto/quadro-signos/">Signos</a>
                    </li>
                    <li class="menu-item">
                      <a href="<?php echo get_home_url() ?>/produto/quadro-signos-kids/">Signos Kids</a>
                    </li>
                  </ul>
                </li>
                <li class="menu-item menu-item-has-children">
                  <a href="#">Jóias e Acessórios</a>
                  <ul class="sub-menu">
                    <li class="menu-item">
                      <a href="<?php echo get_home_url() ?>/produto/pingente-dos-planetas/">Pingente dos Planetas</a>
                    </li>
                    <li class="menu-item">
                      <a href="<?php echo get_home_url() ?>/produto/pingente-das-estrelas/">Pingente das Estrelas</a>
                    </li>
                    <!-- <li class="menu-item">
                      <a href="#">Pingente das Estrelas</a>
                    </li> -->
                  </ul>
                </li>
                <li class="menu-item">
                  <a href="<?php echo get_home_url() ?>/produto/vale-presente-virtual/">Vale Presente</a>
                </li>
              </ul>
							<ul class="secondary-menu menu">
								<li class="menu-item">
									<a href="<?php echo get_home_url() ?>/blog">Blog</a>
								</li>
								<li class="menu-item">
								<?php if(is_front_page()) : ?>
									<a href="#reviews">Reviews</a>
								<?php else : ?>
									<a href="<?php echo get_home_url(); ?>/#reviews">Reviews</a>
								<?php endif; ?>
								</li>
								<li class="menu-item">
									<?php if(is_front_page()) : ?>
										<a href="#ajuda">Ajuda</a>
									<?php else : ?>
										<a href="<?php echo get_home_url(); ?>/#ajuda">Ajuda</a>
									<?php endif; ?>
								</li>
								<li class="social">
									<a href="https://www.instagram.com/mapadomeuceu/" target="_blank"><i class="icon-instagram"></i> <span>Instagram</span></a>
									<a href="https://twitter.com/mapadomeuceu" target="_blank"><i class="icon-twitter"></i> <span>Twitter</span></a>
									<a href="https://www.facebook.com/mapadomeuceu/" target="_blank"><i class="icon-facebook"></i> <span>Facebook</span></a>
									<!-- <a href=""><i class="icon-youtube"></i> <span>Youtube</span></a> -->
								</li>
							</ul>
          </nav>
				</div>
			</nav>
			<?php endif; ?>
	</header>