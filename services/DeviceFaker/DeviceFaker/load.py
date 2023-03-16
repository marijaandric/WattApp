import csv
import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('sqllite.db')
# Create a cursor object
cursor = conn.cursor()

# Create the table if it doesn't already exist
# cursor.execute('''CREATE TABLE IF NOT EXISTS Devices 
#                 (Date TEXT, Time TEXT, PowerUsage REAL, 
#                 DeviceName TEXT, DeviceID INTEGER, Room TEXT, DeviceType TEXT)''')

# Open the CSV file and create a CSV reader object
with open('DevicesData.csv', 'r') as csvfile:
    reader = csv.reader(csvfile)
    # Skip the header row
    next(reader)
    # Loop over the rows in the CSV file
    for row in reader:
        # Extract the data from the row
        Date = row[0]
        Time = row[1]
        PowerUsage = float(row[2])
        DeviceID = int(row[3])
        # Insert the data into the database
        cursor.execute('INSERT INTO DevicesData (DeviceID, Date, Time, PowerUsage) VALUES (?, ?, ?, ?)', (DeviceID, Date, Time, PowerUsage))
    # Commit the changes to the database
    conn.commit()
    # Close the database connection
    conn.close()


conn = sqlite3.connect('sqllite.db')
# Create a cursor object
cursor = conn.cursor()

with open('Devices.csv', 'r') as csvfile:
    reader = csv.reader(csvfile)
    # Skip the header row
    next(reader)
    # Loop over the rows in the CSV file
    for row in reader:
        # Extract the data from the row
        DeviceName = row[0]
        DeviceID = int(row[1])
        Room = row[2]
        DeviceType = row[3]
        UserID = int(row[4])
        # Insert the data into the database
        cursor.execute('INSERT INTO Devices (DeviceID, UserID, DeviceName, Room, DeviceType) VALUES (?, ?, ?, ?, ?)', (DeviceID, UserID, DeviceName, Room, DeviceType))
    # Commit the changes to the database
    conn.commit()
    # Close the database connection
    conn.close()
