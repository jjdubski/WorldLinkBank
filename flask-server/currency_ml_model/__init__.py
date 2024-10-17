from flask import Blueprint

currency_ml_model_bp = Blueprint('currency_ml_model', __name__)

from . import data_preprocessing  # Import the routes for FX rates

data_preprocessing.load_data()