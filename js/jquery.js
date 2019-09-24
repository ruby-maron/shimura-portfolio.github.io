$(function () {

    // headerクリック時にアンダーライン引く処理=======
    var red = $('header a');
    red.click(function () {
        $(this).addClass('red-border');
        red.not(this).removeClass('red-border');
        // 変数redに$('.header-right a')コレを代入.
        // 変数redがクリックされた時、
        // そのクリックされた要素にred - borderクラスを付与し、
        // red全ての要素の中の、これ(クリックされた要素)以外の要素から,
        // red - borderクラスを外す
    });

    // ドロワーメニューの使用宣言 ====-
    $(document).ready(function () {
        $('.drawer').drawer();
    });

    // リンクジャンプ。#で始まるアンカーをクリックした場合に処理
    $('a[href^="#"]').click(function () {
        // スクロールの速度
        var speed = 400; // ミリ秒
        // アンカーの値取得
        var href = $(this).attr("href");
        // 移動先を取得
        var target = $(href == "#" || href == "" ? 'html' : href);
        // 移動先を数値で取得
        var position = target.offset().top;
        // スムーススクロール
        $('body,html').animate({ scrollTop: position }, speed, 'swing');
        return false;
    });

    // TOPから100px以上スクロールした場合、TOPへ戻るボタンが出現=====
    $(".floating").css("display", "none");
    jQuery(window).on("scroll", function ($) {
        if (jQuery(this).scrollTop() > 100) {
            jQuery('.floating').show(200);
        } else {
            jQuery('.floating').hide(200);
        }
    });
    jQuery('.floating').click(function () {
        jQuery('body,html').animate({
            scrollTop: 0
        }, "fast");
        return false;
    });


    // swiperのフェード だけど、コレ入れると何故か３枚目から始まってしまう
    // var mySwiper = new Swiper('.swiper-container', {
    //     fadeEffect: {
    //         crossFade: true
    //     }
    // });


    // スライドショー「swier」の使用宣言 swiperはjqueryではないJavascriptのライブラリ！
    var swiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // 自動再生
        loop: true,
        autoplay: {
            delay: 2800,
            disableOnInteraction: true
        },

    });

    // ======↓↓↓モーダル関連ここから================
    // #modal-openの中のmodal-o-cクラスをクリックした際のイベント
    $("#modal-open .modal-o-c").click(function () {

        // ~~~~~~オーバーレイ~~~~~~~~~~
        $("#modal-overlay").fadeIn("slow");
        //[#modal-overlay]をクリックしたら…。要は背景クリックしても閉じるって事
        $("#modal-overlay").click(function () {
            $(".modal-content,#modal-overlay").fadeOut("slow");
        });
        $(this).blur();    //ボタンからフォーカスを外す

        //コンテンツをセンタリングする
        centeringModalSyncer();

        //コンテンツをスライドダウンする

        // サムネとモーダルの中身が一致しているのなら、index番号で判別した方がイイかな
        // クリックされた要素のインデックス番号を変数 Noに代入
        var No = $("#modal-open .modal-o-c").index(this);
        // スライドダウンする要素をインデックス番号で判別
        $(".modal-content").eq(No).fadeIn("slow");

        console.log(No);

        // ==== ↓これでもOK        
        // var index = $('#modal-open .modal-o-c').index($(this));
        // $($(".modal-content")[index]).slideDown("slow");

    });

    //リサイズされたら、センタリングをする関数[centeringModalSyncer()]を実行する
    $(window).resize(centeringModalSyncer);

    //センタリングを実行する関数
    function centeringModalSyncer() {

        //画面(ウィンドウ)の幅、高さを取得
        var w = $(window).width();
        var h = $(window).height();

        // コンテンツ(#modal-content)の幅、高さを取得
        // jQueryのバージョンによっては、引数[{margin:true}]を指定した時、不具合を起こします。
        // var cw = $("#modal-content").outerWidth({ margin: true });
        // var ch = $("#modal-content").outerHeight({ margin: true });
        var cw = $(".modal-content").outerWidth();
        var ch = $(".modal-content").outerHeight();

        // スマホLP用のセンタリング
        var spw = $(".sp-size").outerWidth();
        var sph = $(".sp-size").outerHeight();

        //センタリングを実行する
        $(".modal-content").css({ "left": ((w - cw) / 2) + "px", "top": ((h - ch) / 2) + "px" });

        // スマホLP用のセンタリング
        $(".sp-size").css({ "left": ((w - spw) / 2) + "px", "top": ((h - sph) / 2) + "px" });
    };

    // ======↑↑↑モーダル関連ここまで================




});















