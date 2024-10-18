from flask import Flask
from flask_cors import CORS
from currency_ml_model.future_predictions.send_predictions import currency_ml_model_bp
from fx_rates.routes import fx_rates_bp  # Importing Blueprint correctly

app = Flask(__name__)
CORS(app)

app.register_blueprint(currency_ml_model_bp, url_prefix='/currency_ml_model')

# Register the fx_rates_bp Blueprint
app.register_blueprint(fx_rates_bp, url_prefix='/fx_rates')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
