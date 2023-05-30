from pymongo import MongoClient

# MongoDB connection settings
mongodb_host = 'softeng.pmf.kg.ac.rs'
mongodb_port = 10015
database_name = 'Devices'
collection_name = 'DevicesData'

# Connect to MongoDB
client = MongoClient(mongodb_host, mongodb_port)
db = client[database_name]
collection = db[collection_name]

# Retrieve documents from the collection
documents = collection.find()

# Iterate over the documents and update the PowerUsage field
for document in documents:
    print(document)
    power_usage = document['PowerUsage']
    new_power_usage = power_usage / 4

    # Update the document with the new PowerUsage value
    collection.update_one(
        {'_id': document['_id']},
        {'$set': {'PowerUsage': new_power_usage}}
    )

print("PowerUsage values updated successfully.")

# Close the MongoDB connection
client.close()