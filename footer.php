<?php
	$template_dir = get_template_directory_uri();
	$img_url = $template_dir . '/assets/images';
	$site_version = $GLOBALS['site_version']; 
?>
	</div>

	<?php if(!hide_header_and_footer($post)) : ?>
		<footer class="main-footer">
			<div class="wrapper-1310">

				<div class="site-map">
					<ul class="list">
						<li class="title">Como funciona</li>
						<li><a href="/politica-de-devolucao/">Trocas e Devoluções</a></li>
						<li><a href="/termos-de-servico">Termos de Serviço</a></li>
					</ul>
					<ul class="list">
						<li class="title">Nos conheça melhor</li>
						<li><a href="/quem-somos">Sobre nós</a></li> 
						<li><a href="/blog" target="_blank">Nosso Blog</a></li>
					</ul>
					<ul class="list">
						<li class="title">Redes sociais</li>
						<li><a href="https://www.facebook.com/mapadomeuceu/" target="_blank">Facebook</a></li>
						<li><a href="https://instagram.com/mapadomeuceu" target="_blank">Instagram</a></li>
					</ul>
					<ul class="list">
						<li class="title">Entre em contato</li>
						<li><a href="https://api.whatsapp.com/send?l=pt_BR&amp;phone=5511973192224" target="_blank" class="item">+55 (11) 97319-2224 (somente Whatsapp)</a></li>
					</ul>        
					
					<ul class="list -security-seals">
						<li class="title">Selos de segurança</li>
						<li>
							<a href="">
									<img class="" width="100" src="<?= $img_url; ?>/lets-encrypt.png" alt="SSL Segurança">
							</a>
							<a href="">
									<img class="" width="100" src="<?= $img_url; ?>/google-seguro.png" alt="Google Seguro">
							</a>
						</li>
					</ul>
					<ul class="list -payment-methods">
						<li class="title">Formas de Pagamento</li>
						<li>
							<img class="-mobile" src="<?= $img_url; ?>/payment-mobile.png" alt="Formas de pagamento">
							<img class="-desktop" src="<?= $img_url; ?>/payment-desktop.png" alt="Formas de pagamento">
						</li>
					</ul>
				</div>
				<div class="site-info">
					<small class="">Dovicca Comércio de Pôster e Acessórios LTDA ME, CNPJ: <br/> 30.783.036/0001-50. CEP 04116-170 - São Paulo/SP, -<br/> Rua Ernesto de Oliveira, 40, Chácara Klabin. <br /> v.:<?php echo $site_version ?></small>
				</div>
			</div>
		</footer>
	<?php endif; ?>

	<?php wp_footer(); ?>
</body>