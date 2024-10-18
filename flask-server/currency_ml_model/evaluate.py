from sklearn.metrics import mean_squared_error, r2_score


def evaluate_model(y_test, y_pred):
    # Calculate the Mean Squared Error and R-squared score
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    print(f'Mean Squared Error: {mse}')
    print(f'R-squared: {r2}')