import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from "./js/currency.js";

async function loadAutoComplete() {
  let currencies = await Currency.getCurrencies();
  if (currencies.message) {
    displayError(currencies);
  } else {
    let listHTML;
    currencies.forEach(function(name, code) {
      listHTML += `<option>${name} (${code})</option>`;
    });

    $("datalist").html(listHTML);
  }
}

async function addFormSubmit() {
  let conversions = await Currency.getConversionRates();
  $("form").on("submit", function(e) {
    e.preventDefault();
    $("#error").empty();
    let inputType = getCodeFromType($("#input-type").val());
    let outputType = getCodeFromType($("#output-type").val());
    if (validateType(inputType, conversions) && validateType(outputType, conversions)) {
      let amount = parseInt($("#amount").val());
      let convertedAmount = Currency.convert(amount, inputType, outputType, conversions);
      $("#output").html(`<h2>${inputType} to ${outputType}</h2><h4>${convertedAmount.toFixed(2)} ${outputType}</h4>`);
    } else {
      if (!validateType(inputType, conversions)) {
        $("#input-type").val("");
      } 
      if (!validateType(outputType, conversions)) {
        $("#output-type").val("");
      }

      displayError(new Error("Invalid currency type(s)"));
    }
  });
}

function validateType(type, types) {
  let codes = Object.keys(types);
  for (let i = 0; i < codes.length; i++) {
    if (type.includes(codes[i])) {
      return true;
    }
  }

  return false;
}

function getCodeFromType(type) {
  if (type.includes("(")) {
    return type.split("(")[1].substring(0, 3);
  } else {
    return type;
  }
}

function displayError(error) {
  $("#error").html(`<div class="error"><h1>Error:</h1><h2>${error.message}</h2></div>`);
}

$(function() {
  try {
    loadAutoComplete();
    addFormSubmit();
  } catch (error) {
    displayError(error);
  }
  $("#amount").on("change", function() {
    let input = $(this);
    input.val(parseFloat(input.val()).toFixed(2));
  });
});