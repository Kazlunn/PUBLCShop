const mid_implants = {
    22119: 'Mid-grade Amulet Alpha',
    22120: 'Mid-grade Amulet Beta',
    22121: 'Mid-grade Amulet Delta',
    22122: 'Mid-grade Amulet Epsilon',
    22123: 'Mid-grade Amulet Gamma',
    22124: 'Mid-grade Amulet Omega'
};

const high_implants = {
    20499: 'High-grade Amulet Alpha',
    20501: 'High-grade Amulet Beta',
    20503: 'High-grade Amulet Delta',
    20505: 'High-grade Amulet Epsilon',
    20507: 'High-grade Amulet Gamma',
    20509: 'High-grade Amulet Omega'
};

load_data(mid_implants, '#mid_grades_price_table', 22124);
load_data(high_implants, '#high_grades_price_table', 20509);

function load_data(implants, table_id, omega_id) {
    $(table_id).find('tbody').empty();
    $.get("https://market.fuzzwork.co.uk/aggregates/?station=60003760&types=" + Object.keys(implants).join(","), function (data, status) {
        let total_sell = 0, total_buy = 0, total_avg = 0;

        for (let k of Object.keys(implants)) {
            let sell = parseFloat(data[k]['sell']['min']),
                buy = parseFloat(data[k]['buy']['max']),
                avg = (parseFloat(data[k]['sell']['min']) + parseFloat(data[k]['buy']['max'])) / 2;

            total_sell += sell;
            total_buy += buy;
            total_avg += avg;

            $(table_id).find('tbody').append(
                $('<tr>')
                    .append($('<td>').addClass('text-center').append($('<img>', {id: 'icon' + k, src:'https://images.evetech.net/types/' + k + '/icon?size=32'})))
                    .append($('<td>').append(implants[k]))
                    .append($('<td>').append(sell.toLocaleString()))
                    .append($('<td>').append(buy.toLocaleString()))
                    .append($('<td>').append(avg.toLocaleString()))
            );
        }

        $(table_id).find('tbody').append(
            $('<tr>')
                .append($('<td>').append(""))
                .append($('<td>').append("<b>Total Price with Omega</b>"))
                .append($('<td>').append(total_sell.toLocaleString()))
                .append($('<td>').append(total_buy.toLocaleString()))
                .append($('<td>').append(total_avg.toLocaleString()))
        ).append(
            $('<tr>')
                .append($('<td>').append(""))
                .append($('<td>').append("<b>Total Price without Omega</b>"))
                .append($('<td>').append((total_sell - parseFloat(data[omega_id]['sell']['min'])).toLocaleString()))
                .append($('<td>').append((total_buy - parseFloat(data[omega_id]['buy']['max'])).toLocaleString()))
                .append($('<td>').append((total_avg - (parseFloat(data[omega_id]['sell']['min']) + parseFloat(data[omega_id]['buy']['max'])) / 2).toLocaleString()))
        );
    });
}
