import csv
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["Devices"]
collection = db["DevicesData"]

# Open the CSV file
with open("DevicesData.csv", "r") as csvfile:
    reader = csv.DictReader(csvfile)

    # Loop through each row in the CSV file
    for row in reader:
        # Convert the data types
        row["DeviceID"] = int(row["DeviceID"])
        row["Day"] = int(row["Day"])
        row["Month"] = int(row["Month"])
        row["Year"] = int(row["Year"])
        row["Time"] = row["Time"]
        row["PowerUsage"] = float(row["PowerUsage"])

        # Insert the row into the collection
        print(row)
        collection.insert_one(row)

# Close the MongoDB connection
client.close()