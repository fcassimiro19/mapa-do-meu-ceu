/**
 * Modal Dia das Mães
 * 
 * Script para controlar a exibição da modal do Dia das Mães.
 * A modal será exibida apenas para usuários que não visitaram o site nas últimas 48 horas
 * e que não estão logados.
 */

(function($) {
    'use strict';

    /**
     * Constantes
     */
    const STORAGE_KEY = 'mdmc_last_visit';
    const MODAL_DELAY = 1500; // Tempo de espera em ms antes de exibir a modal
    const COOKIE_EXPIRY = 48; // Tempo em horas para o cookie expirar (48 horas)

    /**
     * Verifica se deve mostrar a modal
     * @return {boolean} Verdadeiro se deve mostrar a modal
     */
    function shouldShowModal() {
        // Não mostrar para usuários logados
        if (document.body.classList.contains('logged-in')) {
            console.log('Usuário logado, não mostrar modal');
            return false;
        }

        // Verificar o último acesso
        const lastVisit = localStorage.getItem(STORAGE_KEY);
        if (!lastVisit) {
            console.log('Primeira visita, mostrar a modal');
            // Primeira visita, mostrar a modal
            return true;
        }

        const lastVisitDate = new Date(parseInt(lastVisit));
        const now = new Date();
        const diffTime = Math.abs(now - lastVisitDate);
        const diffHours = diffTime / (1000 * 60 * 60);

        console.log('Diferença de horas: aaaaaa', diffHours);

        // Mostrar modal se passaram mais de 48 horas desde a última visita
        return diffHours > COOKIE_EXPIRY;
    }

    /**
     * Registra a visita atual
     */
    function registerVisit() {
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }

    /**
     * Inicializa a modal
     */
    function initModal() {
        console.log('initModal oooooooo');
        const $modal = jQuery('#modal-dia-das-maes');
        
        if (!$modal.length) {
            console.warn('Modal Dia das Mães não encontrada no DOM');
            return;
        }

        // Verificar se deve mostrar a modal
        if (!shouldShowModal()) {
            console.log('Não deve mostrar a modal');
            return;
        }

        console.log('Mostrar a modal');
        // Mostrar a modal após um breve delay
        setTimeout(function() {
            console.log('Mostrar a modal 2');
            $modal.addClass('active');
            jQuery('body').addClass('modal-open');
        }, MODAL_DELAY);

        // Evento de fechamento da modal
        $modal.on('click', '.modal-dia-das-maes__close', function(e) {
            e.preventDefault();
            closeModal();
        });

        // Fechar ao clicar fora da modal
        $modal.on('click', function(e) {
            if (jQuery(e.target).is($modal)) {
                closeModal();
            }
        });

        // Fechar com a tecla ESC
        jQuery(document).on('keydown', function(e) {
            if (e.key === 'Escape' && $modal.hasClass('active')) {
                closeModal();
            }
        });

        // Registrar o acesso atual
        registerVisit();
    }

    /**
     * Fecha a modal
     */
    function closeModal() {
        const $modal = jQuery('#modal-dia-das-maes');
        $modal.removeClass('active');
        jQuery('body').removeClass('modal-open');
    }

    /**
     * Carrega a modal via AJAX
     */
    function loadModal() {
        console.log('loadModal');
        if (!shouldShowModal()) {
            console.log('Não deve mostrar a modal');
            return;
        }

        // Verificar se o conteúdo da modal já está na página
        if (jQuery('#modal-dia-das-maes').length) {
            initModal();
            return;
        }

        jQuery.ajax({
            url: mdmc_vars.ajax_url,
            type: 'POST',
            data: {
                action: 'load_modal_dia_das_maes',
                nonce: mdmc_vars.nonce
            },
            success: function(response) {
                if (response.success) {
                    jQuery('body').append(response.data);
                    initModal();
                }
            }
        });
    }

    /**
     * Inicialização quando o DOM estiver pronto
     */
    jQuery(document).ready(function() {
        console.log('ready');
        loadModal();
    });

})(jQuery); 