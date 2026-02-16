import sqlite3
import re
conn=sqlite3.connect("linux_siem.db")
cursor=conn.cursor()
cursor.execute("""
create table if not exists ssh_logs(
id integer primary key autoincrement,
ip TEXT,
status TEXT
)
""")
with open("/var/log/auth.log","r")as file:
    logs=file.readlines()
for line in logs:
    if "Failed password" in line:
        match=re.search(r'from (\d+\.\d+\.\d+\.\d+)',line)
        if match:
            ip=match.group(1)
            cursor.execute("insert into ssh_logs(ip,status)values(?,?)",(ip,"Failed"))
conn.commit()
conn.close()
print("Logs inserted successfully...")
cursor=sqlite3.connect("linux_siem.db").cursor()
cursor.execute("""
select ip,count(*) as attempts
from ssh_logs
group by ip
order by attempts DESC
limit 1
""")
top_attacker=cursor.fetchone()
if top_attacker:
    print(f"TOP ATTACKER IP:{top_attacker[0]} with {top_attacker[1]} attempts")
