from .. import future_predictions_bp
import pandas as pd

PREDICTION_DATASET = "./currency_ml_model/datasets/prediction_sets/future_prediction_data.csv"

@future_predictions_bp.route('/api/future_predictions', methods=['GET'])
def get_future_predictions():
    data = get_prediction_values()
    return data

def get_prediction_values():
    df = pd.read_csv(PREDICTION_DATASET)
    json_data = df.to_json(orient='records')
    
    return json_data