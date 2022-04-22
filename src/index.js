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
  let conversions = await Currency.getConversionRates();
  console.log(conversions);
  $("form").on("submit", function(e) {
    e.preventDefault();
    let amount = parseInt($("#amount").val());
    let inputType = getCodeFromType($("#input-type").val());
    let outputType = getCodeFromType($("#output-type").val());
    let convertedAmount = Currency.convert(amount, inputType, outputType, conversions);
    $("#output").html(`<h2>${inputType} to ${outputType}</h2><h4>${convertedAmount.toFixed(2)} ${outputType}</h4>`);
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