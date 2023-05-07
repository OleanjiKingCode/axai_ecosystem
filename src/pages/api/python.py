import sys 
import ast
import json
from pprint import pprint
import nltk
nltk.download('stopwords')
from Questgen import main
qg = main.QGen()
input = ast.literal_eval(sys.argv[1])
output = qg.predict_mcq(input)
pprint (json.dumps(output))
sys.stdout.flush()