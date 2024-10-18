import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from . import evaluate

TEST_SIZE = 0.2
RANDOM_STATE = 42


def train_model():
    data = pd.read_csv('./currency_ml_model/datasets/interpolated_data.csv')
    data_split(data)

def data_split(data):
    X = data[['Effective Federal Funds Rate', 'CPI', 'Rate']]
    y = data[['JPY', 'EUR', 'GBP', 'AUD']]

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=TEST_SIZE, random_state=RANDOM_STATE)

    linear_reg(X_train, y_train, X_test, y_test)


def linear_reg(X_train, y_train, X_test, y_test):
    # Initialize the model
    lin_model = LinearRegression()

    # Train the model
    lin_model.fit(X_train, y_train)
    predict(lin_model, X_test, y_test)

def predict(model, X_test, y_test):
    # Predict on test data
    y_pred = model.predict(X_test)
    evaluate.evaluate_model(y_test, y_pred)

# def evaluate_model(y_test, y_pred):
#     # Calculate the Mean Squared Error and R-squared score
#     mse = mean_squared_error(y_test, y_pred)
#     r2 = r2_score(y_test, y_pred)

#     print(f'Mean Squared Error: {mse}')
#     print(f'R-squared: {r2}')


# def train_model():
#     data = pd.read_csv('./currency_ml_model/datasets/interpolated_data.csv')
#     data = create_lagged_features(data)  # Create lagged features
#     data_split(data)

# def create_lagged_features(data):
#     # Creating lagged features for a time series model
#     for lag in range(1, 4):  # Creating 3 lagged features
#         data[f'Effective Federal Funds Rate_lag_{lag}'] = data['Effective Federal Funds Rate'].shift(lag)
#         data[f'CPI_lag_{lag}'] = data['CPI'].shift(lag)
#         data[f'Rate_lag_{lag}'] = data['Rate'].shift(lag)
        
#     # Drop rows with NaN values caused by shifting
#     data.dropna(inplace=True)
#     return data

# def data_split(data):
#     # Splitting the data into training and testing sets based on time
#     train_size = int(len(data) * (1 - TEST_SIZE))
#     train_data = data[:train_size]
#     test_data = data[train_size:]

#     X_train = train_data.drop(columns=['JPY', 'EUR', 'GBP', 'AUD'])
#     y_train = train_data[['JPY', 'EUR', 'GBP', 'AUD']]

#     X_test = test_data.drop(columns=['JPY', 'EUR', 'GBP', 'AUD'])
#     y_test = test_data[['JPY', 'EUR', 'GBP', 'AUD']]

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
#     evaluate_model(y_test, y_pred)

# def evaluate_model(y_test, y_pred):
#     # Calculate the Mean Squared Error and R-squared score
#     mse = mean_squared_error(y_test, y_pred)
#     r2 = r2_score(y_test, y_pred)

#     print(f'Mean Squared Error: {mse}')
#     print(f'R-squared: {r2}')