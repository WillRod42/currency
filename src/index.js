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

async function addFormSubmit() {
  $("form").on("submit", function(e) {
    e.preventDefault();
    let inputType = getCodeFromType($("#input-type").val());
    let outputType = getCodeFromType($("#output-type").val());
    let convertedAmount = 0;
    $("#output").html(`<h2>${inputType} to ${outputType}</h2><h4>${convertedAmount} ${outputType}</h4>`);
  });
}

function getCodeFromType(type) {
  return type.split("(")[1].substring(0, 3);
}

$(function() {
  loadAutoComplete();
  addFormSubmit();
  $("#amount").on("change", function() {
    let input = $(this);
    input.val(parseFloat(input.val()).toFixed(2));
  });
});