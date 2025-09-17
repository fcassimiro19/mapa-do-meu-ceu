<?php
/**
 * Cart totals
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/cart/cart-totals.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 2.3.6
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="cart_totals <?php echo ( WC()->customer->has_calculated_shipping() ) ? 'calculated_shipping' : ''; ?>">

    <?php if ( WC()->cart->needs_shipping() && WC()->cart->show_shipping() ) : ?>

    <?php do_action( 'woocommerce_cart_totals_before_shipping' ); ?>

    <p style="order: -1; font-weight: bold; margin-bottom: -12px;font-size: 18px;">Calcular frete</p>
    <?php wc_cart_totals_shipping_html(); ?>

    <?php do_action( 'woocommerce_cart_totals_after_shipping' ); ?>

    <?php elseif ( WC()->cart->needs_shipping() && 'yes' === get_option( 'woocommerce_enable_shipping_calc' ) ) : ?>

    <tr class="shipping">
        <th><?php esc_html_e( 'Shipping', 'woocommerce' ); ?></th>
        <td data-title="<?php esc_attr_e( 'Shipping', 'woocommerce' ); ?>"><?php woocommerce_shipping_calculator(); ?></td>
    </tr>

    <?php endif; ?>

    <?php do_action( 'woocommerce_before_cart_totals' ); ?>

    <div class="cart__actions__item cart__totals">
        <h2 class="cart__actions__title">Resumo do pedido</h2>

        <table class="cart__totals__list">
            <tr class="cart__totals__item cart__totals__item--subtotal">
                <th><?php
                    $quantity = WC()->cart->cart_contents_count;
                    echo $quantity.' ';
                    echo ($quantity == 1) ? 'produto' : 'produtos';
                ?></th>
                <td data-title="<?php esc_attr_e( 'Subtotal', 'woocommerce' ); ?>" class="subtotal"><?php wc_cart_totals_subtotal_html(); ?></td>
            </tr>

            <?php foreach ( WC()->cart->get_fees() as $fee ) : ?>
                <tr class="cart__totals__item cart__totals__item--fee">
                    <th><?php echo esc_html( $fee->name ); ?></th>
                    <td data-title="<?php echo esc_attr( $fee->name ); ?>"><?php wc_cart_totals_fee_html( $fee ); ?></td>
                </tr>
            <?php endforeach; ?>

            <?php foreach ( WC()->cart->get_coupons() as $code => $coupon ) : ?>
                <tr class="cart__totals__item cart__totals__item--coupon cart__totals__item--coupon-<?php echo esc_attr( sanitize_title( $code ) ); ?>"> 
                    <th><?php echo $coupon->get_code(); ?></th>
                    <td data-title="<?php echo esc_attr( wc_cart_totals_coupon_label( $coupon, false ) ); ?>">
                        <?php wc_cart_totals_coupon_html( $coupon ); ?>
                    </td>
                </tr>
            <?php endforeach; ?>

            <?php if ( WC()->cart->needs_shipping() && 'yes' === get_option('woocommerce_enable_shipping_calc') ) : ?>
                <?php foreach ( WC()->session->get('shipping_for_package_0')['rates'] as $method_id => $rate) : ?>
                    <?php if (WC()->session->get('chosen_shipping_methods')[0] == $method_id) : ?>
                        <tr class="cart__totals__item cart__totals__item--shipping">
                            <th>Frete</th>
                            <td class="<?php echo (WC()->cart->get_cart_shipping_total() === "Grátis!" ? "-freeshipping" : '') ?>"><?php echo WC()->cart->get_cart_shipping_total(); ?></td>
                        </tr>
                        <?php break; ?>
                    <?php endif; ?>
                <?php endforeach; ?>
            <?php endif; ?>
        </table>

        <?php do_action( 'woocommerce_cart_totals_before_order_total' ); ?>

        <!-- <#?php $order_installments = getInstallments(WC()->cart->cart_contents_total, $type = "price"); ?> -->
        <div class="cart__totals__total">
            <div>TOTAL</div>
            <div class='cart__totals__total--amount'>
                <?php wc_cart_totals_order_total_html(); ?>
                <!-- <#?php if($order_installments > 1) : ?>
                    <small>em até <?php echo $order_installments; ?>x sem juros</small>
                <#?php endif; ?> -->
            </div>
        </div>

        <?php do_action( 'woocommerce_cart_totals_after_order_total' ); ?>

        <div class="cart__totals__proceed-to-checkout wc-proceed-to-checkout">
            <?php do_action( 'woocommerce_proceed_to_checkout' ); ?>
            <button class="-full -outline -primary button-default" onclick="window.history.back()" style="margin-top: 15px;">
                Continuar comprando
            </button>
        </div>
        
    </div>

	<?php do_action( 'woocommerce_after_cart_totals' ); ?>

</div>