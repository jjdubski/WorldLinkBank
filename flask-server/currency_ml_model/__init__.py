from flask import Blueprint

currency_ml_model_bp = Blueprint('currency_ml_model', __name__)

from . import data_preprocessing  # Import the routes for FX rates
from . import model
from . import evaluate

# data_preprocessing.load_data()
# data_preprocessing.get_currency_rates()
# data_preprocessing.test()
# data_preprocessing.preprocess_data()
# data_preprocessing.handle_missing_vals()

model.train_model()
