# -*- coding: utf-8 -*-
"""
Created on Sat Jun  8 23:06:46 2019

@author: vaibh
"""
import pandas as pd

rawdata = pd.read_json('CSvaibharn.json',encoding='utf8')
#mapdata = rawdata.sort_values()
#for matches in data:
df=rawdata['matches']
#df=df.sort_values()
df1=df.sort_values(['map'])
print(df1)