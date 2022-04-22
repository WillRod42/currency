import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from "./js/currency.js";

$(function() {
  Currency.getCurrencies()
    .then(output => {
      console.log(output);
    });
});