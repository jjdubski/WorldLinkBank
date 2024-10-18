import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from . import evaluate
from sklearn.preprocessing import StandardScaler
from statsmodels.tsa.arima.model import ARIMA
import numpy as np

TEST_SIZE = 0.2
RANDOM_STATE = 42

def train_model():
    # Load your data
    data = pd.read_csv('./currency_ml_model/datasets/past_data/shortened_full_data.csv')
    data['Month_Year'] = pd.to_datetime(data['Month_Year'])
    data.set_index('Month_Year', inplace=True)

    # Train-test split
    train = data['2014-01-01':'2022-12-31']
    test = data['2023-01-01':]

    # List of currency columns
    currency_columns = ['JPY', 'EUR', 'GBP', 'AUD']
    
    # Dictionary to hold predictions and metrics for each currency
    results = {}

    for currency in currency_columns:
        # Fit an ARIMA model for each currency
        model = ARIMA(train[currency], order=(1, 1, 1))  # Adjust order as necessary
        model_fit = model.fit()

        # Make predictions
        predictions = model_fit.forecast(steps=len(test))
        test[currency + '_Predictions'] = predictions

        # Evaluate the model
        mse = mean_squared_error(test[currency], predictions)
        mae = mean_absolute_error(test[currency], predictions)
        rmse = np.sqrt(mse)  # Calculate RMSE from MSE
        
        results[currency] = {'MSE': mse, 'MAE': mae, 'RMSE': rmse}
        
        # print(f'Mean Squared Error for {currency}: {mse}')
        # print(f'Mean Absolute Error for {currency}: {mae}')
        # print(f'Root Mean Squared Error for {currency}: {rmse}')
    print(results)

def get_model():
    model = ARIMA(train[currency], order=(1, 1, 1))

# def train_model():
#     data = pd.read_csv('./currency_ml_model/datasets/past_data/shortened_full_data.csv')

#     data['Month_Year'] = pd.to_datetime(data['Month_Year'])
#     data.set_index('Month_Year', inplace=True)

#     columns_to_scale = ['FEDFUNDS', 'CPI', 'Rate']
#     scaler = StandardScaler()

#     # Fit the scaler to the selected columns and transform the data
#     data[columns_to_scale] = scaler.fit_transform(data[columns_to_scale])
#     data_split(data)

# def data_split(data):
#     X = data[['FEDFUNDS', 'CPI', 'Rate']]
#     y = data[['JPY', 'EUR', 'GBP', 'AUD']]

#     # Train-test split
#     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=TEST_SIZE, random_state=RANDOM_STATE)

#     linear_reg(X_train, y_train, X_test, y_test)


# def linear_reg(X_train, y_train, X_test, y_test):
#     # Initialize the model
#     lin_model = LinearRegression()

#     # Train the model
#     lin_model.fit(X_train, y_train)
#     predict(lin_model, X_test, y_test)

# def predict(model, X_test, y_test):
#     # Predict on test data
#     y_pred = model.predict(X_test)
#     evaluate.evaluate_model(y_test, y_pred)





# def train_model():
#     data = pd.read_csv('./currency_ml_model/datasets/past_data/shortened_full_data.csv')
#     print(data.isnull().sum())
#     data_split(data)

# def data_split(data):
#     X = data[['FEDFUNDS', 'CPI', 'Rate']]
#     y = data[['JPY', 'EUR', 'GBP', 'AUD']]

#     # Train-test split
#     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=TEST_SIZE, random_state=RANDOM_STATE)

#     linear_reg(X_train, y_train, X_test, y_test)


# def linear_reg(X_train, y_train, X_test, y_test):
#     # Initialize the model
#     lin_model = LinearRegression()

#     # Train the model
#     lin_model.fit(X_train, y_train)
#     predict(lin_model, X_test, y_test)

# def predict(model, X_test, y_test):
#     # Predict on test data
#     y_pred = model.predict(X_test)
#     evaluate.evaluate_model(y_test, y_pred)




# def train_model():
#     data = pd.read_csv('./currency_ml_model/datasets/interpolated_data.csv')
#     data_split(data)

# def data_split(data):
#     X = data[['Effective Federal Funds Rate', 'CPI', 'Rate']]
#     y = data[['JPY', 'EUR', 'GBP', 'AUD']]

#     # Train-test split
#     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=TEST_SIZE, random_state=RANDOM_STATE)

#     linear_reg(X_train, y_train, X_test, y_test)


# def linear_reg(X_train, y_train, X_test, y_test):
#     # Initialize the model
#     lin_model = LinearRegression()

#     # Train the model
#     lin_model.fit(X_train, y_train)
#     predict(lin_model, X_test, y_test)

# def predict(model, X_test, y_test):
#     # Predict on test data
#     y_pred = model.predict(X_test)
#     evaluate.evaluate_model(y_test, y_pred)