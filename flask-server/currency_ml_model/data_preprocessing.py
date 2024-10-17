import pandas as pd
import requests
import os
from . import currency_ml_model_bp

OPEN_EXCHANGE_RATES_API_KEY = "0167e5ae283a42838d4b6069b8583bec"
OPEN_EXCHANGE_RATES_URL = "https://openexchangerates.org/api/historical/2013-02-16.json"


def load_data():
    """Fetch data from the Open Exchange Rates API."""
    response = requests.get(f'{OPEN_EXCHANGE_RATES_URL}?app_id={OPEN_EXCHANGE_RATES_API_KEY}')
    
    # Print the raw response to debug
    print(response.status_code)
    print(response.text)  # Print the raw response text

    if response.status_code == 200:
        # return response.json()
        print(os.path.isfile('./datasets/interest-rates.csv'))
        print(os.getcwd())
        interest_rates_df = pd.read_csv('./currency_ml_model/datasets/interest-rates.csv')
        cpi_df = pd.read_csv('./currency_ml_model/datasets/CPI.csv')
        fed_fund_rates_df = pd.read_csv('./currency_ml_model/datasets/monthly-fed-fund-rates/Data-Table1.csv')
    else:
        raise Exception(f'Failed to fetch data: {response.status_code}')


def preprocess_data(data):
    """Preprocess the data for modeling."""
    df = pd.DataFrame(data['rates'])  # Adjust this based on the actual response structure
    # Example preprocessing steps:
    df.fillna(0, inplace=True)  # Handling missing values
    # Normalize or transform data as needed
    return df

