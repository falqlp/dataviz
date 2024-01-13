$(document).ready(function() {
    var selectMarque = $('<select></select>');
    marques.forEach(function(marque) {
        var option = $('<option></option>').val(marque).html(marque);
        if (marque === 'Dacia') {
            option.attr('selected', 'selected');
        }
        selectMarque.append(option);
    });
    selectMarque.on('change', function() {
        updateGraph3(this.value);
        $('#nom-marque').text(this.value);
    });
    $(".filter").append(selectMarque);
    $('#min').text(min);
    $('#max').text(max);
    $('#mean').text(mean);
});
