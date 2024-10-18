import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from . import evaluate

TEST_SIZE = 0.2
RANDOM_STATE = 42


def train_model():
    data = pd.read_csv('./currency_ml_model/datasets/past_data/shortened_full_data.csv')

    data['Month_Year'] = pd.to_datetime(data['Month_Year'])
    data.set_index('Month_Year', inplace=True)

    data_split(data)

def data_split(data):
    X = data[['FEDFUNDS', 'CPI', 'Rate']]
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