import pandas as pd
from sklearn.preprocessing import StandardScaler
import requests

OPEN_EXCHANGE_RATES_API_KEY = "0167e5ae283a42838d4b6069b8583bec"
OPEN_EXCHANGE_RATES_URL = "https://openexchangerates.org/api/historical/" # 2013-02-16.json"
TOP_CURRENCIES = ["USD", "JPY", "EUR", "GBP", "AUD"]
END_DATE = "2024-09"
DATE_TO_KEEP = "2014-01"

interest_rates_df = None
cpi_df = None
fed_fund_rates_df = None
merged_df = None

def run():
    global merged_df

    load_data()
    datasets = add_common_date_col()
    merged_df = merge_data(datasets)
    write_to_csv(merged_df)

def load_data():
    global interest_rates_df, cpi_df, fed_fund_rates_df
    interest_rates_df = pd.read_csv('./currency_ml_model/datasets/past_data/interest-rates.csv')
    cpi_df = pd.read_csv('./currency_ml_model/datasets/past_data/CPI.csv')
    fed_fund_rates_df = pd.read_csv('./currency_ml_model/datasets/past_data/FEDFUNDS.csv')


def add_common_date_col():
    global interest_rates_df, cpi_df, fed_fund_rates_df

    interest_rates_df['Date'] = pd.to_datetime(interest_rates_df['Date'], format='%b %Y', errors='coerce')
    print(interest_rates_df[interest_rates_df['Date'].isna()])
    interest_rates_df['Month_Year'] = interest_rates_df['Date'].dt.to_period('M')

    cpi_df = cpi_df.melt(id_vars='Year', var_name='Month', value_name='CPI')
    month_mapping = {
        'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
        'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
    }
    cpi_df['Month'] = cpi_df['Month'].map(month_mapping)
    cpi_df['Month_Year'] = cpi_df['Year'].astype(str) + '-' + cpi_df['Month'].astype(str).str.zfill(2)

    fed_fund_rates_df['Date'] = pd.to_datetime(fed_fund_rates_df['DATE'], format='%Y-%m-%d')
    fed_fund_rates_df['Month_Year'] = fed_fund_rates_df['Date'].dt.to_period('M')

    return interest_rates_df, cpi_df, fed_fund_rates_df

def merge_data(datasets):
    global interest_rates_df, cpi_df, fed_fund_rates_df, merged_df
    interest_rates_df = datasets[0]
    cpi_df = datasets[1]
    fed_fund_rates_df = datasets[2]

    # Ensure Month_Year is of the same type in all DataFrames
    interest_rates_df['Month_Year'] = interest_rates_df['Month_Year'].astype(str)  # Convert to string
    cpi_df['Month_Year'] = cpi_df['Month_Year'].astype(str)  # Convert to string
    fed_fund_rates_df['Date'] = pd.to_datetime(fed_fund_rates_df['DATE']).dt.to_period('M').astype(str)  # Convert to string

    # Merge interest rates with CPI
    merged_df = pd.merge(interest_rates_df, cpi_df, left_on='Month_Year', right_on='Month_Year', how='outer')

    # Merge the resulting DataFrame with Fed Fund Rates
    merged_df = pd.merge(merged_df, fed_fund_rates_df, left_on='Month_Year', right_on='Date', how='outer')

    # Display the final merged DataFrame
    print(merged_df.head())
    return merged_df


def write_to_csv(data):
    data.to_csv('./currency_ml_model/datasets/past_data/merged_data.csv', index=False)


def clean_csv():
    to_clean = pd.read_csv('./currency_ml_model/datasets/past_data/merged_data.csv')

    to_clean = to_clean.iloc[:-4]

    columns_to_remove = ['Date_x', 'Year', 'Month', 'DATE', 'Date_y', 'Month_Year_y']
    to_clean = to_clean.drop(columns=columns_to_remove)

    to_clean.rename(columns={'Month_Year_x': 'Month_Year'}, inplace=True)

    to_clean['Rate'] = to_clean['Rate'].interpolate(method='linear')

    to_clean.to_csv('./currency_ml_model/datasets/past_data/merged_data.csv', index=False)

def add_currency_rates():
    curr_year = "2014"
    curr_month = "01"
    date_to_update = curr_year + "-" + curr_month

    merged_data = pd.read_csv('./currency_ml_model/datasets/past_data/merged_data.csv')

    merged_data['JPY'] = None
    merged_data['EUR'] = None
    merged_data['GBP'] = None
    merged_data['AUD'] = None

    # for i in range(42):
    i = 0
    while date_to_update != END_DATE:
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
        i += 1
    merged_data.to_csv('./currency_ml_model/datasets/past_data/full_data.csv', index=False)
    print("Done")

def remove_earlier_dates():
    # Load the CSV into a DataFrame
    df = pd.read_csv('./currency_ml_model/datasets/past_data/full_data.csv')

    # Convert the relevant date column to datetime if not already
    df['Month_Year'] = pd.to_datetime(df['Month_Year'], format='%Y-%m')

    # Filter the DataFrame to keep only rows on or after the specified date
    filtered_df = df[df['Month_Year'] >= pd.to_datetime(DATE_TO_KEEP)]

    # Save the filtered DataFrame back to the CSV file (overwrite)
    filtered_df.to_csv('./currency_ml_model/datasets/past_data/shortened_full_data.csv', index=False)
    print(f"Removed rows before {DATE_TO_KEEP}. Updated CSV saved.")