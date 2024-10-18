import pandas as pd
import requests
import os
from sklearn.preprocessing import StandardScaler

OPEN_EXCHANGE_RATES_API_KEY = "0167e5ae283a42838d4b6069b8583bec"
OPEN_EXCHANGE_RATES_URL = "https://openexchangerates.org/api/historical/" # 2013-02-16.json"
TOP_CURRENCIES = ["USD", "JPY", "EUR", "GBP", "AUD"]

merged_data = pd.read_csv('./currency_ml_model/datasets/merged_data.csv')
scaled_data = pd.read_csv('./currency_ml_model/datasets/scaled_merged_data.csv')


def load_data():
    """Fetch data from the Open Exchange Rates API."""
    # response = requests.get(f'{OPEN_EXCHANGE_RATES_URL}?app_id={OPEN_EXCHANGE_RATES_API_KEY}')
    
    # Print the raw response to debug
    # print(response.status_code)
    # print(response.text)  # Print the raw response text

    # if response.status_code == 200:
        # return response.json()
    interest_rates_df = pd.read_csv('./currency_ml_model/datasets/interest-rates.csv')
    cpi_df = pd.read_csv('./currency_ml_model/datasets/CPI.csv')
    fed_fund_rates_df = pd.read_csv('./currency_ml_model/datasets/Data-Table1.csv')

    interest_rates_df['Date'] = pd.to_datetime(interest_rates_df[['Year', 'Month', 'Day']])
    interest_rates_df['Month_Year'] = interest_rates_df['Date'].dt.to_period('M')


    cpi_df = cpi_df.melt(id_vars='Year', var_name='Month', value_name='CPI')
    # Convert month names to numbers for merging
    month_mapping = {
        'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
        'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
    }
    cpi_df['Month'] = cpi_df['Month'].map(month_mapping)
    cpi_df['Month_Year'] = cpi_df['Year'].astype(str) + '-' + cpi_df['Month'].astype(str).str.zfill(2)

    print(interest_rates_df.head())
    print(cpi_df.head())
    interest_rates_df['Month_Year'] = interest_rates_df['Month_Year'].astype(str)
    cpi_df['Month_Year'] = cpi_df['Month_Year'].astype(str)
    merged_data = pd.merge(interest_rates_df, cpi_df, on='Month_Year', how='inner')
        

    # fed_fund_rates_df['Date'] = pd.to_datetime(fed_fund_rates_df['Date'])
    # fed_fund_rates_df['Month_Year'] = fed_fund_rates_df['Date'].dt.to_str('M')

    # merged_data = pd.merge(merged_data, fed_fund_rates_df, on='Month_Year', how='inner')
    # print(merged_data.head())

    invalid_dates = fed_fund_rates_df[~fed_fund_rates_df['Date'].str.match(r'^[A-Za-z]{3} \d{3,4}$')]
    print("Invalid dates in fed_fund_rates_df:")
    print(invalid_dates)

    # Remove or correct invalid entries as needed
    # For example, if you want to drop these rows:
    fed_fund_rates_df = fed_fund_rates_df[fed_fund_rates_df['Date'].str.match(r'^[A-Za-z]{3} \d{3,4}$')]

    # Attempt to parse the valid dates
    try:
        fed_fund_rates_df['Date'] = pd.to_datetime(fed_fund_rates_df['Date'], format='%b %Y', errors='coerce')
    except ValueError as e:
        print(f"Error parsing dates in fed_fund_rates_df: {e}")

    # Check for any NaT values after conversion
    if fed_fund_rates_df['Date'].isnull().any():
        print("Warning: Some dates could not be parsed and will result in NaT.")
        print(fed_fund_rates_df[fed_fund_rates_df['Date'].isnull()])

    # Create Month_Year column, ensuring 'Date' is valid datetime
    fed_fund_rates_df['Month_Year'] = fed_fund_rates_df['Date'].dt.to_period('M')

    # Ensure the Month_Year column is formatted as string for merging
    fed_fund_rates_df['Month_Year'] = fed_fund_rates_df['Month_Year'].astype(str)

    # Merge with the previously merged data
    merged_data = pd.merge(merged_data, fed_fund_rates_df, on='Month_Year', how='inner')

    # Display the final merged DataFrame
    print("MERGED DATA: ", merged_data.head())
    merged_data.drop(columns=['Year_x', 'Month_x', 'Day', 'Date_x', 'Year_y', 'Date_y'], inplace=True)

    # rates = response.json().get("rates")
    # print(rates)


    merged_data.to_csv('./currency_ml_model/datasets/merged_data.csv', index=False)


def get_currency_rates():
    # curr_date = "2014-01"
    curr_year = "2014"
    curr_month = "01"

    merged_data = pd.read_csv('./currency_ml_model/datasets/merged_data.csv')

    merged_data['JPY'] = None
    merged_data['EUR'] = None
    merged_data['GBP'] = None
    merged_data['AUD'] = None

    for i in range(42):
        response = requests.get(f'{OPEN_EXCHANGE_RATES_URL}{curr_year}-{curr_month}-01.json?app_id={OPEN_EXCHANGE_RATES_API_KEY}')
        curr_month = str((i+1) % 12)
        if curr_month == "0":
            curr_month = str(12)
        if int(curr_month) < 10:
            curr_month = "0" + curr_month
        if i % 12 == 0 and i != 0:
            curr_year = str(int(curr_year) + 1)

        rates = response.json().get("rates")
        if rates != None:
            for k, v in rates.items():
                # if curr_year == "2014":
                #     print(rates.items())
                if k in TOP_CURRENCIES and not "USD":
                    date_to_update = curr_year + "-" + curr_month
                    merged_data.loc[merged_data['Month_Year'] == date_to_update, 'Currency'] = k
                    merged_data.loc[merged_data['Month_Year'] == date_to_update, 'Exchange_Rate'] = v
                    # print("Updated")

                if k == "JPY":
                    date_to_update = curr_year + "-" + curr_month
                    # print(date_to_update)
                    merged_data.loc[merged_data['Month_Year'] == date_to_update, 'JPY'] = v
                    # print("Updated")
                elif k =="EUR":
                    date_to_update = curr_year + "-" + curr_month
                    # print(date_to_update)
                    merged_data.loc[merged_data['Month_Year'] == date_to_update, 'EUR'] = v
                    # print("Updated")
                elif k =="GBP":
                    date_to_update = curr_year + "-" + curr_month
                    # print(date_to_update)
                    merged_data.loc[merged_data['Month_Year'] == date_to_update, 'GBP'] = v
                    # print("Updated")
                elif k =="AUD":
                    date_to_update = curr_year + "-" + curr_month
                    # print(date_to_update)
                    merged_data.loc[merged_data['Month_Year'] == date_to_update, 'AUD'] = v
                    # print("Updated")
    merged_data.to_csv('./currency_ml_model/datasets/merged_data.csv', index=False)
    print("Done")

def test():
    response = requests.get(f'{OPEN_EXCHANGE_RATES_URL}2014-12-01.json?app_id={OPEN_EXCHANGE_RATES_API_KEY}')
    print(response.json())


def preprocess_data():
    # List of columns to scale (update these with your actual column names)
    columns_to_scale = ['Effective Federal Funds Rate', 'CPI', 'Rate']
    scaler = StandardScaler()

    # Fit the scaler to the selected columns and transform the data
    merged_data[columns_to_scale] = scaler.fit_transform(merged_data[columns_to_scale])

    # Display the transformed DataFrame
    print(merged_data.head())
    merged_data.to_csv('./currency_ml_model/datasets/scaled_merged_data.csv', index=False)


def handle_missing_vals():
    data = pd.read_csv('./currency_ml_model/datasets/scaled_merged_data.csv')
    # scaled_data['Effective Federal Funds Rate'] = pd.to_numeric(scaled_data['Effective Federal Funds Rate'], errors='coerce')
    data.set_index('Month_Year', inplace=True)
    data['Effective Federal Funds Rate'] = data['Effective Federal Funds Rate'].interpolate(method='linear', limit_direction="both")
    # scaled_data['Effective Federal Funds Rate'] = scaled_data['Effective Federal Funds Rate'].interpolate(method='spline', order=3)
    data.to_csv('./currency_ml_model/datasets/interpolated_data.csv', index=False)
    print("Interpolated")
    