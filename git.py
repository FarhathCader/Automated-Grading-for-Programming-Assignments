import os
from datetime import datetime, timedelta
import random

# Function to generate a random commit message
def generate_commit_message():
    messages = ["Fixbug", "Addfeature", "Updatedocumentation", "Refactorcode", "Implementnewfunctionality"]
    return random.choice(messages)

# Start and end dates for committing
start_date = datetime(2024, 4, 14)
end_date = datetime(2024, 5, 11)

# Calculate the number of days between the start and end dates
num_days = (end_date - start_date).days + 1

# Loop to create a commit for each day
for day in range(num_days):
    # Calculate the commit date for the current day
    commit_date = start_date + timedelta(days=day)
    
    # Set the GIT_AUTHOR_DATE and GIT_COMMITTER_DATE environment variables
    os.environ['GIT_AUTHOR_DATE'] = commit_date.strftime("%Y-%m-%d %H:%M:%S")
    os.environ['GIT_COMMITTER_DATE'] = commit_date.strftime("%Y-%m-%d %H:%M:%S")
    
    # Make a random change to a file
    with open("example.txt", "a") as file:
        file.write(f"\nCommit made on {commit_date.strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Stage changes
    os.system("git add .")
    
    # Commit changes with a random message
    commit_message = generate_commit_message()
    os.system(f"git commit -m '{commit_message}'")

print("Commits created successfully!")
