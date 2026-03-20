print("TEST STARTED")

from ml_model import predict_attack

print("Attempts 2:", predict_attack(2))
print("Attempts 5:", predict_attack(5))
print("Attempts 15:", predict_attack(15))
print("Attempts 25:", predict_attack(25))