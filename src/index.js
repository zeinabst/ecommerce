
import './scss/style.scss';
import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/style.css';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import '../node_modules/bootstrap/dist/js/bootstrap';
import '@laylazi/bootstrap-rtl/dist/js/bootstrap.min.js';
import  'webpack-jquery-ui'
import 'webpack-jquery-ui/css';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js';



$(function() {

    $('[data-toggle="tooltip"]').tooltip();
  
    $('.add-to-cart-btn').on( "click", function() {
        alert('أضيف المُنتج إلى عربة الشراء');
    });

    $('#copyright').text("جميع الحقوق محفوطة للمتجر سنة" + new Date().getFullYear());

    $('.product-option input[type="radio"]').change(function() {
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active');
    });

    // عندما تتغير كمية المنتج
    $('[data-product-quantity]').on( "change",function() {
        
        // اجلب الكمية الجديدة
        var newQuantity = $(this).val();

        // ابحث عن السّطر الّذي يحتوي معلومات هذا المُنتج
        var parent = $(this).parents('[data-product-info]');

        // اجلب سعر القطعة الواحدة من معلومات المنتج
        var pricePerUnit = parent.attr('data-product-price');

        // السعر الإجمالي للمنتج هو سعر القطعة مضروبًا بعددها
        var totalPriceForProduct = newQuantity * pricePerUnit;

        // عين السعر الجديد ضمن خليّة السّعر الإجمالي للمنتج في هذا السطر
        parent.find('.total-price-for-product').text(totalPriceForProduct + '$');

        calculateTotalPrice();

    });

    $('[data-remove-from-cart]').on("click", function() {
        $(this).parents('[data-product-info]').remove();
        calculateTotalPrice();
    });

    function calculateTotalPrice() {
        var totalPriceForAllProducts = 0;

        $('[data-product-info]').each(function() {

            var pricePerUnit = $(this).attr('data-product-price');

            var quantity = $(this).find('[data-product-quantity]').val();

            var totalPriceForProduct = pricePerUnit * quantity;

            totalPriceForAllProducts = totalPriceForAllProducts + totalPriceForProduct;
        });

        $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');
    }

    var citiesByCountry = {
        SY: ['دمشق','حماه','حلب'],
        LB: ['بيروت','صور','طرابلس'],
        IR: ['بغداد','الموصل'],
        JO: ['عمان','الزرقاء'],
        SA: ['جدة','الرياض'],
        EG: ['القاهرة','الإسكندرية']
    };

    //عندما يتغير البلد
    $('#form-checkout select[name="country"]').on("change", function() {

        //إجلب رمز البلد
        var country = $(this).val();

        //إجلب مدن هذا البلد من المصفوفة
        var cities = citiesByCountry[country];

        //إفراغ قائمة المدن
        $('#form-checkout select[name="city"]').empty();

        //إضافة خيار مدينة
        $('#form-checkout select[name="city"]').append(
            '<option disabled selected value="">إختر مدينة</option>'
        );

        cities.forEach(function(city) {
            var newOption = $('<option></option>');
            newOption.text(city);
            newOption.val(city);
            $('#form-checkout select[name="city"]').append(newOption);
        });
    });

    //عنما تتغير طريقة الدفع
    $('#form-checkout input[name="payment_method"]').on("change", function() {

        //إجلب القيمة المختارة حالياً
        var paymentMethod = $(this).val();


        if (paymentMethod === 'on_delivery') {

            //إذا كانت عند الاستلام، فعطل حقول بطاقة الإئتمان
            $('#credit-card-info input').prop('disabled', true);

        } else {

            //و إلا فعلها
            $('#credit-card-info input').prop('disabled', false);

        }

        //بدل معلومات بطاقة الإئتمان بين الظهوؤ و الإخفاء
        $('#credit-card-info').toggle();
    });


    //مكون البحث حسب السعر
    $("#price-range").slider({
        range: true,
        min: 50,
        max: 1000,
        step: 50,
        values: [ 250, 800 ],
        slide: function( event, ui) {
            $('#price-min').text(ui.values[0]);
            $('#price-max').text(ui.values[1]);
        }
    });
    
});    