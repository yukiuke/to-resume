import json

with open("organizer-event-db.json", "r") as f:
    d = json.load(f)

sql = "CREATE TABLE IF NOT EXISTS events (id INT AUTO_INCREMENT PRIMARY KEY, event_date VARCHAR(255), name VARCHAR(255), game VARCHAR(255), url VARCHAR(255), major VARCHAR(255), role VARCHAR(255), notes TEXT);\n\nINSERT INTO events (event_date, name, game, url, major, role, notes) VALUES\n"

values = []
for e in d["events"]:
    # basic sanitization
    date = e.get("date", "").replace('"', '""')
    name = e.get("name", "").replace('"', '""')
    game = e.get("game", "").replace('"', '""')
    url = e.get("url", "").replace('"', '""')
    major = (e.get("major") or "NULL").replace('"', '""')
    role = e.get("role", "").replace('"', '""')
    notes = e.get("notes", "").replace('"', '""')
    values.append(f'("{date}", "{name}", "{game}", "{url}", "{major}", "{role}", "{notes}")')

sql += ",\n".join(values) + ";"

with open("database/events.sql", "w") as f:
    f.write(sql)
