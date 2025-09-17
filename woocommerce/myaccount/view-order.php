<?php
/**
 * View Order
 *
 * Shows the details of a particular order on the account page.
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/view-order.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.0.0
 */

defined( 'ABSPATH' ) || exit;

$notes = $order->get_customer_order_notes();

$order = wc_get_order($order_id);

$shipping_method_title = '';

// Iterating through order shipping items
foreach( $order->get_items( 'shipping' ) as $item_id => $shipping_item_obj ){
		$shipping_method_title       = $shipping_item_obj->get_method_title();
		$shipping_method_id          = $shipping_item_obj->get_method_id(); // The method ID
}
	
?>

<h2 class="section-title">Detalhes do pedido</h2>

<div class="header-account-order-details">
	<strong style="font-weight: 600;font-size: 18px;line-height: 24px;">Código do pedido: #<?= $order->get_order_number() ?></strong>
	<p style="text-transform: uppercase; font-weight: 600;font-size: 14px !important;line-height: 20px;color: $primary;">
		Status: 
		<?php 
			if($order->get_status() === 'completed') :
				echo (order_items_shipping_info($order) ? 'Download disponível' : 'Enviado');
			else :
				echo wc_get_order_status_name( $order->get_status() );
			endif;
		?>
	</p>
</div>

<?php if(valid_order_status($order->get_status())) : ?>
<div class="order-status-block">

	<?php if(order_items_shipping_info($order)) : ?>

		<strong>Informações do pedido</strong>
		<ul class="-<?= $order->get_status() ?>">
			<li>Pedido realizado</li>
			<li>Pagamento realizado</li>
			<li style="border-color: transparent">Download disponível</li>
		</ul>

	<?php else:  ?>

		<strong>Informações de rastreamento</strong>
		<ul class="-<?= $order->get_status() ?>">
			<li>Pedido realizado</li>
			<li>Em produção</li>
			<li>Enviado - <small>Acompanhamento feito via link da transportador - Veja abaixo</small></li>
		</ul>

	<?php endif; ?>
</div>
<?php endif; ?>
 <p style="padding: 10px; background: red; color: #fff; margin-bottom: 5px">
 IMPRESSO / QUADRO: O prazo de produção é de 5 dias úteis SOMADOS ao prazo de entrega contados à partir do dia seguinte da aprovação do pedido.
 </p>
 <p style="padding: 10px; background: red; color: #fff; margin-bottom: 5px">
 CÓDIGO DE RASTREAMENTO: Após o status mudar para ENVIADO você receberá um email com o código de rastreamento da transportadora (Mandaê) para acompanhar a entrega. Verifique a sua caixa de SPAM.
 </p>
 <p style="padding: 10px; background: red; color: #fff">
SE VOCÊ COMPROU O FORMATO PDF/DIGITAL: o seu mapa estará disponível na sessão downloads do menu assim que o pagamento for confirmado.
 </p>
<!--  -->

<?php do_action( 'woocommerce_view_order', $order_id ); ?>
