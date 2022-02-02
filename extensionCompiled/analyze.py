import json
import pandas as pd
import matplotlib.pyplot as plt

# Opening JSON file
f = open('mydata.json')
data = json.load(f)
data = pd.DataFrame(data[1]['device_motion_data'])

plt.plot(data['t']/1000, data['x'], label = "x")
plt.plot(data['t']/1000, data['y'], label = "y")
plt.plot(data['t']/1000, data['z'], label = "z")
plt.legend()
plt.show()

