import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from "./js/currency.js";

async function loadAutoComplete() {
  console.log("start");
  let currencies = await Currency.getCurrencies();
  
  let listHTML;
  currencies.forEach(function(name, code) {
    listHTML += `<option>${name} (${code})</option>`;
  });

  $("datalist").html(listHTML);
}

$(function() {
  loadAutoComplete();
});