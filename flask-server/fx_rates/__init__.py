from flask import Blueprint

fx_rates_bp = Blueprint('fx_rates', __name__)

from . import routes  # Import the routes for FX rates
