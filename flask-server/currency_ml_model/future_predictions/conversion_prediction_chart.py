import pandas as pd
from statsmodels.tsa.arima.model import ARIMA


ORIGINAL_FILE = "./currency_ml_model/datasets/prediction_sets/post_interpolation_data.csv"

def create_output_chart():
    df = pd.read_csv(ORIGINAL_FILE)

    # df['Month_Year'] = pd.to_datetime(df['Month_Year'])  # Adjust 'Date' to your actual date column name
    # df.set_index('Month_Year', inplace=True)
    df.set_index('Full_Date', inplace=True)
    predict_conversion_rates(df)

def predict_conversion_rates(df):
    train = df['2014-01-01':'2024-09-01']
    test = df['2024-10-01':]

    currency_columns = ['JPY', 'EUR', 'GBP', 'AUD']
    results = {}

    for currency in currency_columns:
        model = ARIMA(train[currency], order=(1, 1, 1))
        model_fit = model.fit()

        # Make predictions
        predictions = model_fit.forecast(steps=len(test))
        df[currency] = predictions
    
    # df.to_csv('./currency_ml_model/datasets/prediction_sets/future_prediction_data.csv', index=False)
    clean_prediction_csv(df)


def clean_prediction_csv(df):
    columns_to_keep = ['Date', 'JPY', 'EUR', 'GBP', 'AUD']
    df_filtered = df[columns_to_keep]

    first_valid_index = df_filtered['Date'].first_valid_index()  # Get the index of the first valid entry
    df_cleaned = df_filtered.loc[first_valid_index:]

    df_cleaned.to_csv('./currency_ml_model/datasets/prediction_sets/future_prediction_data.csv', index=False)
