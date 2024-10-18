from flask import Blueprint

currency_ml_model_bp = Blueprint('currency_ml_model', __name__)

from . import data_preprocessing  # Import the routes for FX rates
from . import model
from . import evaluate
from . import data_processing
from .future_predictions.future_data_preprocessing import run

# data_preprocessing.load_data()
# data_preprocessing.get_currency_rates()
# data_preprocessing.test()
# data_preprocessing.preprocess_data()
# data_preprocessing.handle_missing_vals()

# model.train_model()

# data_processing.run()
# data_processing.clean_csv()
# data_processing.add_currency_rates()

# data_processing.remove_earlier_dates()

# model.train_model()

# future_data_preprocessing.run()
run()
