import csv
import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('sqllite.db')
# Create a cursor object
cursor = conn.cursor()

# Create the table if it doesn't already exist
cursor.execute('''CREATE TABLE IF NOT EXISTS Devices 
                (Date TEXT, Time TEXT, PowerUsage REAL, 
                DeviceName TEXT, DeviceID INTEGER, Room TEXT, DeviceType TEXT)''')

# Open the CSV file and create a CSV reader object
with open('proba.csv', 'r') as csvfile:
    reader = csv.reader(csvfile)
    # Skip the header row
    next(reader)
    # Loop over the rows in the CSV file
    for row in reader:
        # Extract the data from the row
        Date = row[0]
        Time = row[1]
        PowerUsage = float(row[2])
        DeviceName = row[3]
        DeviceID = int(row[4])
        Room = row[5]
        DeviceType = row[6]
        # Insert the data into the database
        cursor.execute('INSERT INTO Devices (Date, Time, PowerUsage, DeviceName, DeviceID, Room, DeviceType) VALUES (?, ?, ?, ?, ?, ?, ?)', (Date, Time, PowerUsage, DeviceName, DeviceID, Room, DeviceType))
    # Commit the changes to the database
    conn.commit()
    # Close the database connection
    conn.close()