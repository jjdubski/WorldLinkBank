from flask import Blueprint, Flask, request, jsonify
import requests
from flask_cors import CORS

fx_rates_bp = Blueprint('fx_rates', __name__)
CORS(fx_rates_bp)

# API Configuration - using ExchangeRate-API for real-time conversion
EXCHANGE_RATE_API_KEY = "528612f39108d556ad2d84d3"
# '63575e6b4bd69d124ff1f2e1'
EXCHANGE_RATE_API_URL = "https://v6.exchangerate-api.com/v6/{}/latest/{}"

# Helper function to get the exchange rate data
def get_exchange_rate(base_currency):
    url = EXCHANGE_RATE_API_URL.format(EXCHANGE_RATE_API_KEY, base_currency)
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None

# Home route to verify server is running
@fx_rates_bp.route('/', methods=['GET'])
def home():
    return "Server is running!", 200

@fx_rates_bp.route('/convert', methods=['GET'])
def convert_currency():
    base_currency = request.args.get('base_currency')
    target_currency = request.args.get('target_currency')
    amount = request.args.get('amount')

    if not base_currency or not target_currency or not amount:
        return jsonify({"error": "Invalid request. Please provide base_currency, target_currency, and amount."}), 400
    try:
        amount = float(amount)
        if amount <= 0:
            return jsonify({"error": "Amount must be greater than zero."}), 400
    except ValueError:
        return jsonify({"error": "Invalid amount format."}), 400

    exchange_data = get_exchange_rate(base_currency)
    if not exchange_data:
        return jsonify({"error": "Failed to fetch exchange rate data."}), 500

    rates = exchange_data.get("conversion_rates", {})
    if target_currency not in rates:
        return jsonify({"error": "Target currency not available."}), 400

    conversion_rate = rates[target_currency]
    converted_amount = amount * conversion_rate

    return jsonify({
        "base_currency": base_currency,
        "target_currency": target_currency,
        "amount": amount,
        "conversion_rate": conversion_rate,
        "converted_amount": converted_amount
    })


# Route to handle FX rates for top currencies
@fx_rates_bp.route('/api/fx-rates', methods=['GET'])
def get_fx_rates():
    TOP_CURRENCIES = ["USD", "JPY", "EUR", "GBP", "AUD"]
    results = []  # List to hold conversion data

    for i in range(len(TOP_CURRENCIES)):
        for j in range(len(TOP_CURRENCIES)):
            if i != j:
                conversion_data = get_fx_rate_pairs(TOP_CURRENCIES[i], TOP_CURRENCIES[j])
                if conversion_data:
                    results.append(conversion_data)
    return jsonify({
        "result": "success",
        "data": results  # Return all conversion rates in the response
    })

def get_fx_rate_pairs(curr1, curr2):
    url = f'https://v6.exchangerate-api.com/v6/{EXCHANGE_RATE_API_KEY}/pair/{curr1}/{curr2}'
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
            return None
    else:
        print(f'Failed to fetch data for {curr1} to {curr2}: {response.status_code}')
        return None

if __name__ == '__main__':
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(fx_rates_bp, url_prefix='/fx_rates')
    app.run(debug=True, host='0.0.0.0', port=5000)
