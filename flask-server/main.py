from flask import Flask, jsonify
from flask_cors import CORS
from fx_rates import fx_rates_bp
from currency_ml_model import currency_ml_model_bp



app = Flask(__name__)
CORS(app)

# @app.route('/hello', methods=['GET'])
# def hello_world():
#     return jsonify({"message": "Frit"})

app.register_blueprint(fx_rates_bp)
app.register_blueprint(currency_ml_model_bp)


if __name__ == '__main__':
    app.run(debug=True)
