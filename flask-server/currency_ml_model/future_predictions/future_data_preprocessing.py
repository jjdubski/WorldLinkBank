import pandas as pd


def run():
    print("IN RUN")
    df = load_data()
    df = clean_data(df)
    df = add_cols(df)
    merged_df = merge(df)
    predict_future_vals(merged_df)

def load_data():
    return pd.read_csv('./currency_ml_model/datasets/prediction_sets/Federal_Funds_Rate_Forecast.csv')
    
def clean_data(df):
    df['Percent'] = df['Percent'] / 100
    df.rename(columns={'Percent': 'FEDFUNDS'}, inplace=True)

    return df

def add_cols(df):
    df['Rate'] = None
    df['CPI'] = None

    return df


def merge(df):
    full_df = pd.read_csv('./currency_ml_model/datasets/past_data/shortened_full_data.csv')
    merged_df = pd.merge(df, full_df, left_on='Date', right_on='Month_Year', how='outer')

    merged_df['Combined_Date'] = merged_df['Date'].combine_first(merged_df['Month_Year'])
    merged_df['Combined_Date'] = merged_df['Combined_Date'].apply(lambda x: f"{x}-01" if len(x.split('-')) == 2 else x)

    merged_df.to_csv('./currency_ml_model/datasets/prediction_sets/merged_data.csv', index=False)

    return merged_df

def predict_future_vals(df):
    df['Full_Date'] = df['Combined_Date']
    df.set_index('Combined_Date', inplace=True)
    df.index = pd.to_datetime(df.index, format='%Y-%m-%d')

    print(df.head())

    # df['Rate_y'] = df['Rate_y'].interpolate(method='linear')
    df['Rate_y'] = df['Rate_y'].interpolate(method='spline', order=1)
    df['CPI_y'] = df['CPI_y'].interpolate(method='spline', order=2)
    df.to_csv('./currency_ml_model/datasets/prediction_sets/post_interpolation_data.csv', index=False)