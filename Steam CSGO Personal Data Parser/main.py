# -*- coding: utf-8 -*-
"""
Created on Sat Jun  8 23:06:46 2019

@author: vaibh
"""
import pandas as pd

rawdata = pd.read_json('CSvaibharn.json',encoding='utf8')
#mapdata = rawdata.sort_values()
#for matches in data:
print(rawdata)