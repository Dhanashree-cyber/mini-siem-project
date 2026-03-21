from sklearn.feature_extraction.text import CountVectorizer
from sklearn.ensemble import IsolationForest

# Initialize once
vectorizer = CountVectorizer()
model = IsolationForest(contamination=0.2)

# Train with some basic data (temporary training)
training_data = [
    "User login success",
    "File accessed",
    "System running normally",
    "Failed login attempt",
    "Multiple failed login attempts"
]

X_train = vectorizer.fit_transform(training_data)
model.fit(X_train)


def detect_anomaly(logs):
    # Convert logs → numbers
    vectorized_logs = vectorizer.transform(logs)

    # Predict
    prediction = model.predict(vectorized_logs)

    if prediction[0] == -1:
        return "anomaly"
    else:
        return "normal"