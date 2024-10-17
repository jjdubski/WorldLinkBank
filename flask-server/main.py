from flask import Flask
from flask_cors import CORS
from fx_rates.routes import fx_rates_bp  # Importing Blueprint correctly

app = Flask(__name__)
CORS(app)

# Register the fx_rates_bp Blueprint
app.register_blueprint(fx_rates_bp, url_prefix='/fx_rates')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
