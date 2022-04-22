import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from "./js/currency.js";

async function loadAutoComplete() {
  let currencies = await Currency.getCurrencies();
  
  let listHTML;
  currencies.forEach(function(name, code) {
    listHTML += `<option>${name} (${code})</option>`;
  });

  $("datalist").html(listHTML);
}

$(function() {
  loadAutoComplete();
  $("#amount").on("change", function() {
    let input = $(this);
    input.val(parseFloat(input.val()).toFixed(2));
  });
});