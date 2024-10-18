import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression


ORIGINAL_FILE = "./currency_ml_model/datasets/prediction_sets/post_interpolation_data.csv"

def fix_original_file():
    df = pd.read_csv("./currency_ml_model/datasets/prediction_sets/post_interpolation_data_new.csv")
    print(df.head())
    # df.drop(['Date'])
#     df.rename(columns={
#     'Rate_y': 'Rate',
#     'CPI_y': 'CPI'
# }, inplace=True)
    
    df.to_csv("./currency_ml_model/datasets/prediction_sets/post_interpolation_data_new.csv", index=False)

def predict_data():
    data = pd.read_csv("./currency_ml_model/datasets/prediction_sets/post_interpolation_data_new.csv")

    train_data = data[data['Full_Date'] < '2024-10-01']
    test_data = data[data['Full_Date'] >= '2024-10-01']

    print(train_data)
    print(test_data)

    features = ['Rate', 'CPI', 'FEDFUNDS']
    target_currency = 'JPY'  # Change this to GBP, EUR, or AUD as needed

    X_train = train_data[features]
    y_train = train_data[target_currency]
    X_test = test_data[features]

    model = LinearRegression()
    model.fit(X_train, y_train)

    predictions = model.predict(X_test)
    data.loc[data['Full_Date'] >= '2024-10-01', 'JPY'] = predictions
    print(data)
    ##########

    target_currency = 'EUR'
    X_train = train_data[features]
    y_train = train_data[target_currency]
    X_test = test_data[features]

    model = LinearRegression()
    model.fit(X_train, y_train)

    predictions = model.predict(X_test)
    data.loc[data['Full_Date'] >= '2024-10-01', 'EUR'] = predictions
    print(data)
    ############
    target_currency = 'GBP'
    X_train = train_data[features]
    y_train = train_data[target_currency]
    X_test = test_data[features]

    model = LinearRegression()
    model.fit(X_train, y_train)

    predictions = model.predict(X_test)
    data.loc[data['Full_Date'] >= '2024-10-01', 'GBP'] = predictions
    print(data)
    ############
    target_currency = 'AUD'
    X_train = train_data[features]
    y_train = train_data[target_currency]
    X_test = test_data[features]

    model = LinearRegression()
    model.fit(X_train, y_train)

    predictions = model.predict(X_test)
    data.loc[data['Full_Date'] >= '2024-10-01', 'AUD'] = predictions
    print(data)

    data.to_csv("./currency_ml_model/datasets/prediction_sets/new_final_full.csv", index=False)

    # print(predictions)


def create_output_chart():
    df = pd.read_csv(ORIGINAL_FILE)

    # df['Month_Year'] = pd.to_datetime(df['Month_Year'])  # Adjust 'Date' to your actual date column name
    # df.set_index('Month_Year', inplace=True)
    df.set_index('Full_Date', inplace=True)
    return predict_conversion_rates(df)

def predict_conversion_rates(df):
    # train = df['2014-01-01':'2024-09-01']
    # test = df['2024-10-01':]

    # currency_columns = ['JPY', 'EUR', 'GBP', 'AUD']
    # results = {}

    # for currency in currency_columns:
    #     model = ARIMA(train[currency], order=(1, 1, 1))
    #     model_fit = model.fit()

    #     # Make predictions
    #     predictions = model_fit.forecast(steps=len(test))
    #     df[currency] = predictions
    
    # # df.to_csv('./currency_ml_model/datasets/prediction_sets/future_prediction_data.csv', index=False)
    # clean_prediction_csv(df)
    data = pd.read_csv(ORIGINAL_FILE)
    data = data.head(129)


    data['Month_Year'] = pd.to_datetime(data['Month_Year'])
    data.set_index('Month_Year', inplace=True)

    columns_to_scale = ['FEDFUNDS_y', 'CPI_y', 'Rate_y']
    scaler = StandardScaler()

    # Fit the scaler to the selected columns and transform the data
    data[columns_to_scale] = scaler.fit_transform(data[columns_to_scale])

    X = data[['FEDFUNDS_y', 'CPI_y', 'Rate_y']]
    y = data[['JPY', 'EUR', 'GBP', 'AUD']]

    lin_model = LinearRegression()

    # Train the model
    print(data.isnull().sum())
    print(X)
    print(y)
    return lin_model.fit(X, y)


def predict_on_dataset(model):
    data = pd.read_csv(ORIGINAL_FILE)[129:]
    data.drop(['Rate_x', 'CPI_x', 'Month_Year', 'FEDFUNDS_y', 'Full_Date', 'JPY', 'EUR', 'GBP', 'AUD'], axis=1, inplace=True)
    data.set_index('Date')
    data.rename(columns={'FEDFUNDS_x': 'FEDFUNDS_y'}, inplace=True)
    columns_to_scale = ['FEDFUNDS_y', 'Rate_y', 'CPI_y']
    scaler = StandardScaler()
    data[columns_to_scale] = scaler.fit_transform(data[columns_to_scale])
    print(data.head())
    predicted_y = model.predict(data)
    print(predicted_y)


def clean_prediction_csv(df):
    columns_to_keep = ['Date', 'JPY', 'EUR', 'GBP', 'AUD']
    df_filtered = df[columns_to_keep]

    first_valid_index = df_filtered['Date'].first_valid_index()  # Get the index of the first valid entry
    df_cleaned = df_filtered.loc[first_valid_index:]

    df_cleaned.to_csv('./currency_ml_model/datasets/prediction_sets/future_prediction_data.csv', index=False)
