<?php
/**
 * Customer on-hold order email
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/customer-on-hold-order.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates/Emails
 * @version 3.7.0
 */

defined( 'ABSPATH' ) || exit;

/*
 * @hooked WC_Emails::email_header() Output the email header
 */
do_action( 'woocommerce_email_header', $email_heading, $email ); ?>

<?php /* translators: %s: Customer first name */ ?>
<p><?php printf( esc_html__( 'Hi %s,', 'woocommerce' ), esc_html( $order->get_billing_first_name() ) ); ?></p>
<p><?php esc_html_e( 'Thanks for your order. It’s on-hold until we confirm that payment has been received. In the meantime, here’s a reminder of what you ordered:', 'woocommerce' ); ?></p>
<p style="background: red; color: #fff; padding: 10px;margin-bottom: 5px;">IMPRESSO / QUADRO: O prazo de produção é de 5 dias úteis SOMADOS ao prazo de entrega contados à partir do dia seguinte da aprovação do pedido.</p>
<p style="background: red; color: #fff; padding: 10px;margin-bottom: 5px;">CÓDIGO DE RASTREAMENTO: Após o status mudar para ENVIADO você receberá um email com o código de rastreamento da transportadora (Mandaê) para acompanhar a entrega. Verifique a sua caixa de SPAM.</p>
<!-- <p style="background: red; color: #fff; padding: 10px">Se você comprou: PDF DIGITAL: o seu mapa é enviado por email assim que o pagamento for confirmado. Por favor confira também a sua caixa de SPAM e/ou busque pelo email com o título "O SEU POSTER ESTA PRONTO PARA DOWNLOAD"</p> -->
<p style="background: red; color: #fff; padding: 10px">SE VOCÊ COMPROU O FORMATO PDF/DIGITAL: o seu mapa estará disponível na sessão downloads do menu assim que o pagamento for confirmado. <strong>Caso tenha efetuado via boleto esse processo leva em média 24 horas.</strong></p>
<?php

/*
 * @hooked WC_Emails::order_details() Shows the order details table.
 * @hooked WC_Structured_Data::generate_order_data() Generates structured data.
 * @hooked WC_Structured_Data::output_structured_data() Outputs structured data.
 * @since 2.5.0
 */
do_action( 'woocommerce_email_order_details', $order, $sent_to_admin, $plain_text, $email );

/*
 * @hooked WC_Emails::order_meta() Shows order meta data.
 */
do_action( 'woocommerce_email_order_meta', $order, $sent_to_admin, $plain_text, $email );

/*
 * @hooked WC_Emails::customer_details() Shows customer details
 * @hooked WC_Emails::email_address() Shows email address
 */
do_action( 'woocommerce_email_customer_details', $order, $sent_to_admin, $plain_text, $email );

/**
 * Show user-defined additional content - this is set in each email's settings.
 */
if ( $additional_content ) {
	echo wp_kses_post( wpautop( wptexturize( $additional_content ) ) );
}

/*
 * @hooked WC_Emails::email_footer() Output the email footer
 */
do_action( 'woocommerce_email_footer', $email );
