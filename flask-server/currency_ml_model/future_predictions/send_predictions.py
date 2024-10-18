# from .. import future_predictions_bp
from flask import Blueprint
import pandas as pd
from flask_cors import CORS

PREDICTION_DATASET = "./currency_ml_model/datasets/prediction_sets/new_final_full.csv"

currency_ml_model_bp = Blueprint('currency_ml_model', __name__)
CORS(currency_ml_model_bp)

# @currency_ml_model_bp.route('/api/future-predictions', methods=['GET'])
def get_future_predictions():
    data = get_prediction_values()
    return data

def get_prediction_values():
    df = pd.read_csv(PREDICTION_DATASET)
    json_data = df.to_json(orient='records')
    print(json_data)
    
    return json_data