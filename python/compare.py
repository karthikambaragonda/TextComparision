import sys
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

file1 = read_file(sys.argv[1])
file2 = read_file(sys.argv[2])

vectorizer = TfidfVectorizer().fit_transform([file1, file2])
similarity = cosine_similarity(vectorizer[0:1], vectorizer[1:2])[0][0]
print(f'{similarity * 100:.2f}%')
