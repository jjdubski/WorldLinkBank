from flask import Flask
from flask_cors import CORS
from fx_rates.routes import fx_rates_bp  # Importing the blueprint from routes.py

app = Flask(__name__)
CORS(app)

# Register the fx_rates_bp Blueprint without an extra prefix
app.register_blueprint(fx_rates_bp)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
