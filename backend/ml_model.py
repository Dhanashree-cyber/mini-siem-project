from sklearn.ensemble import IsolationForest
import numpy as np

def train_model():
    data = np.array([[1], [2], [3], [4], [5]])
    model = IsolationForest(contamination=0.2)
    model.fit(data)

    return model

model = train_model()

def predict_attack(attempts):
    prediction = model.predict([[attempts]])
    return prediction[0]