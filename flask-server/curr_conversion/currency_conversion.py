from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests for development purposes

# API Configuration - using ExchangeRate-API for real-time conversion
EXCHANGE_RATE_API_KEY = 'b2d7bed5405d85e5d85ce1b0'  # Directly add your API key here
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
@app.route('/', methods=['GET'])
def home():
    return "Server is running!", 200

# Route to handle currency conversion
@app.route('/convert', methods=['GET'])
def convert_currency():
    # Extracting the parameters from the request
    base_currency = request.args.get('base_currency')
    target_currency = request.args.get('target_currency')
    amount = request.args.get('amount')

    if not base_currency or not target_currency or not amount:
        return jsonify({"error": "Invalid request. Please provide base_currency, target_currency, and amount."}), 400

    try:
        amount = float(amount)
    except ValueError:
        return jsonify({"error": "Invalid amount format."}), 400

    # Fetch exchange rates
    exchange_data = get_exchange_rate(base_currency)
    if not exchange_data:
        return jsonify({"error": "Failed to fetch exchange rate data."}), 500

    # Perform the conversion
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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
