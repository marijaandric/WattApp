import csv
import sqlite3

class User:
    def __init__(self, id, firstname, lastname, username, email, phonenumber, address, password, token, role, refreshtoken, refreshtokenexpirytime, x, y, area, imageid):
        self.Id = id
        self.FirstName = firstname
        self.LastName = lastname
        self.Username = username
        self.Email = email
        self.PhoneNumber = phonenumber
        self.Address = address
        self.Password = password
        self.Token = token
        self.Role = role
        self.RefreshToken = refreshtoken
        self.RefreshTokenExpiryTime = refreshtokenexpirytime
        self.X = x
        self.Y = y
        self.Area = area
        self.ImageId = imageid

class Devices:
    def __init__(self, id, user_id, device_name, device_model, room, device_type, is_active, allow_operator_controll, allow_operator_visibility, image_id):
        self.id = id
        self.user_id = user_id
        self.device_name = device_name
        self.device_model = device_model
        self.room = room
        self.device_type = device_type
        self.is_active = is_active
        self.allow_operator_controll = allow_operator_controll
        self.allow_operator_visibility = allow_operator_visibility
        self.image_id = image_id

# Create a connection to the SQLite database
conn = sqlite3.connect('../sqllite.db')

# Create a cursor object to execute SQL commands
c = conn.cursor()

# Open the CSV file
with open("users.csv", "r") as csvfile:
    reader = csv.DictReader(csvfile)

    # Loop through each row in the CSV file
    for row in reader:

        # Create a User object from the row data
        user = User(
            id=int(row["Id"]),
            firstname=row["FirstName"],
            lastname=row["LastName"],
            username=row["Username"],
            email=row["Email"],
            phonenumber=row["PhoneNumber"],
            address=row["Address"],
            password=row["Password"],
            token=row["Token"],
            role=row["Role"],
            refreshtoken=row["RefreshToken"],
            refreshtokenexpirytime=row["RefreshTokenExpiryTime"],
            x=float(row["X"]),
            y=float(row["Y"]),
            area=row["Area"],
            imageid=int(row["ImageId"])
        )

        # Insert the user into the database
        c.execute("INSERT INTO users (Id, FirstName, LastName, Username, Email, PhoneNumber, Address, Password, Token, Role, RefreshToken, RefreshTokenExpiryTime, X, Y, Area, ImageId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                  (user.Id, user.FirstName, user.LastName, user.Username, user.Email, user.PhoneNumber, user.Address, user.Password, user.Token, user.Role, user.RefreshToken, user.RefreshTokenExpiryTime, user.X, user.Y, user.Area, user.ImageId))


with open('devices.csv', 'r') as csvfile:
    reader = csv.DictReader(csvfile)

    # Loop through each row in the CSV file and insert into the Device table
    for row in reader:
        device = Devices(int(row['Id']), int(row['UserID']), row['DeviceName'], row['DeviceModel'], row['Room'], row['DeviceType'], bool(row['isActive']), bool(row['allowOperatorControll']), bool(row['allowOperatorVisibility']), int(row['ImageId']) if row['ImageId'] else None)
        c.execute("INSERT INTO devices (Id, UserID, DeviceName, DeviceModel, Room, DeviceType, isActive, allowOperatorControll, allowOperatorVisibility, ImageId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", (device.id, device.user_id, device.device_name, device.device_model, device.room, device.device_type, device.is_active, device.allow_operator_controll, device.allow_operator_visibility, device.image_id))


# Commit the changes to the database
conn.commit()

# Close the connection
conn.close()
