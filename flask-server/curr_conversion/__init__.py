from flask import Blueprint

curr_conv_bp = Blueprint('curr_conv', __name__)

from . import routes  # Import the routes for currency conversion
