export default class Currency {
  static getCurrencies() {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.result !== "success") {
          throw new Error(json["error-type"]);
        } else {
          return new Map(json["supported_codes"]);
        }
      })
      .catch(error => {
        return error;
      });
  }

  static getConversionRates() {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.result !== "success") {
          throw new Error(json["error-type"]);
        } else {
          return new Map(json["conversion_rates"]);
        }
      })
      .catch(error => {
        return error;
      });
  }

  // static convertCurrency(amount, inType, outType) {

  // }
}