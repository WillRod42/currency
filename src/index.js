import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from "./js/currency.js";

$(function() {
  let currency = new Currency();

  Currency.getCurrencies()
    .then(output => {
      currency.currencies = output;
    });
});