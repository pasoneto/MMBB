import pandas as pd
import os
import json

songs = os.listdir("../../songs/deniz_groove/")

names = []
tempi = []
for k in songs:
    splitted = k.split("_")
    names.append(splitted[0] + "_" + splitted[1])
    tempi.append(splitted[2])

a = pd.DataFrame({"path": songs,
              "name": names,
              "tempi": tempi })

a = a.sort_values(by=['name'])
a = a.to_dict("records")
print(a)

with open("./output.json", "w") as json_file:
    json.dump(a, json_file, indent=4)

#a.to_csv("./groove_songs.csv", header=True, index = False)


