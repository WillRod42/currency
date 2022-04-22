export default class Currency {
  constructor() {
    this.currencies = [];
  }
  static getCurrencies() {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.result !== "success") {
          throw new Error(json["error-type"]);
        } else {
          this.currencies = json["supported_codes"];
          return this.currencies;
        }
      });
  }
}