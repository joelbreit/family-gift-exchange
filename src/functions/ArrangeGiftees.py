# Read users.json and assign giftees to each user
# Users cannot gift to themselves or their spouses
# Users cannot gift to the same person as last year
# Users cannot gift to the same person as two years ago (if applicable)

import json
import random
import os

this_year = 2023

random.seed("YEAR")

names = []
disallowed_matches = dict()

# To may need to run this with debug from the base of this project for this to work
users_file_path = os.path.abspath("ignore/users.json")

with open(users_file_path, "r") as users_file:
    contents = json.load(users_file)
    users = contents["users"]
    for user in users:
        name = user["name"]
        names.append(name)
        disallowed_matches[name] = []
        disallowed_matches[name].append(name)
        disallowed_matches[name].append(user["spouse"])
        # check users.previousGiftees.[this_year - 1] and users.previousGiftees.[this_year - 2]
        # if they exist, add them to disallowed_matches[user]
        for year in range(this_year - 2, this_year):
            if str(year) in user["previousGiftees"]:
                disallowed_matches[name].append(user["previousGiftees"][str(year)])

matches = dict()

success = False

while not success:
    success = True
    giftees = random.sample(names, len(names))
    for name in names:
        for giftee in giftees:
            if giftee not in disallowed_matches[name]:
                matches[name] = giftee
                giftees.remove(giftee)
                break
        if name not in matches:
            success = False
            break

# Update users.json with this year's giftees
with open(users_file_path, "r") as users_file:
    contents = json.load(users_file)
    users = contents["users"]
    for user in users:
        # Get the ID of the user's giftee
        giftee_id = None
        for giftee in users:
            if giftee["name"] == matches[user["name"]]:
                giftee_id = giftee["id"]
                break
        user["giftee"] = giftee_id

with open(users_file_path, "w") as users_file:
    json.dump(contents, users_file, indent=4)

# Print the results
print("\nThis year: ")
for match in matches:
    print(match + " will give a gift to " + matches[match])

print("Complete!")
# # Test that no one is gifting to themselves
# for name in names:
#     if matches[name] == name:
#         print("ERROR: " + name + " is gifting to themselves")
#         exit(1)

# # Test that no one is gifting to their spouse
# for name in names:
#     if matches[name] == disallowed_matches[name][1]:
#         print("ERROR: " + name + " is gifting to their spouse")
#         exit(1)
