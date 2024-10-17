import requests
from flask import jsonify
from . import fx_rates_bp

EXCHANGE_API_KEY = "b2d7bed5405d85e5d85ce1b0"
TOP_CURRENCIES = ["USD", "JPY", "EUR", "GBP", "AUD"]

@fx_rates_bp.route('/api/fx-rates', methods=['GET'])
def get_fx_rates():
    results = []  # List to hold conversion data

    for i in range(len(TOP_CURRENCIES)):
        for j in range(i, len(TOP_CURRENCIES)):
            if i != j:
                conversion_data = get_fx_rate_pairs(TOP_CURRENCIES[i], TOP_CURRENCIES[j])
                if conversion_data:
                    results.append(conversion_data)
    return jsonify({
        "result": "success",
        "data": results  # Return all conversion rates in the response
    })


def get_fx_rate_pairs(curr1, curr2):
    url = f'https://v6.exchangerate-api.com/v6/{EXCHANGE_API_KEY}/pair/{curr1}/{curr2}'
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()

        conversion_rate = data.get("conversion_rate")

        if conversion_rate is not None:
            return {
                "from": curr1,
                "to": curr2,
                "conversion_rate": conversion_rate
            }
        else:
            return None  # Return None if conversion rate is not found
    else:
        print(f'Failed to fetch data for {curr1} to {curr2}: {response.status_code}')
        return None  # Return None if there was an error in fetching the data
