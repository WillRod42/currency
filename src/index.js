import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from "./js/currency.js";

async function loadAutoComplete() {
  console.log("start");
  let currencies = await Currency.getCurrencies();
  $(".currency").on("input", function() {
    let text = $(this).val();
    if (text !== "") {
      let listHTML = `<ul>`;
      currencies.forEach(function(name) {
        if (name.substring(0, text.length).toLowerCase() === text.toLowerCase()) {
          listHTML += `<li><strong>${name.substring(0, text.length)}</strong>${name.substring(text.length)}</li>`;
        }
      });
      $(this).siblings("ul").remove();
      $(this).parent().append(listHTML + "</ul>");
    }
  });
}

$(function() {
  loadAutoComplete();
  $(".currency").on("blur", function() {
    console.log("test");
    $(this).siblings("ul").remove();
  });
});