import pandas as pd
import numpy as np
import sys
import json




def write_json(json_data):
    with open(f'data-{json_data["username"]}.json', 'w', encoding='utf-8') as fp:
        json.dump(json_data, fp)


def clean_dataframe(films):
    films['rating'] = films['rating'].replace(['None'], 100)
    films.insert(loc=6, column='diff_rating', value=0)
    films['diff_rating'] = pd.to_numeric(films['rating'], errors='coerce') - films['average_rating']
    films['rating'] = films['rating'].astype(float)
    films['director'] = films['director'].fillna("").apply(lambda x: x.split('/'))
    films['country'] = films['country'].fillna("").apply(lambda x: x.split('/'))
    films['spoken_languages'] = films['spoken_languages'].fillna("").apply(lambda x: x.split('/'))
    films.insert(loc=10, column='total_languages', value=films['spoken_languages'].apply(lambda x: len(x)))
    films['genres'] = films['genres'].fillna("").apply(lambda x: x.split('/'))
    films['themes'] = films['themes'].fillna("").apply(lambda x: x.split('/'))
    films['composer'] = films['composer'].fillna("").apply(lambda x: x.split('/'))
    films['cast'] = films['cast'].fillna("").apply(lambda x: x.split('/'))
    films['studio'] = films['studio'].fillna("").apply(lambda x: x.split('/'))
    return films


def main():
    json_data = {}

    json_data['username'] = sys.argv[1]
    
    films = pd.read_csv('./films.csv')
    films = clean_dataframe(films)

    json_data['number_films'] = films.shape[0]
    json_data['total_length'] = int(films['length (mins)'].sum() / 60)
    
    json_data['films_per_year'] = films.sort_values(by=['year'], ascending=True).groupby('year').count()['url'].to_dict()
    json_data['rating_per_year'] = round(films[films['rating'] <= 5].groupby('year')['rating'].mean(),2).to_dict()
    json_data['films_per_language'] = films.groupby('original_language').count().iloc[0:10]['url'].sort_values(ascending=False).to_dict()

    json_data['higher_average'] = films[films['diff_rating'] < 5].sort_values(by=['diff_rating'], ascending=False).iloc[0:10][['url', 'title', 'year', 'rating', 'average_rating', 'diff_rating']].to_dict(orient='records')
    json_data['lower_average'] = films[films['diff_rating'] < 5].sort_values(by=['diff_rating'], ascending=True).iloc[0:10][['url', 'title', 'year', 'rating', 'average_rating', 'diff_rating']].to_dict(orient='records')

    json_data['total_countries'] = films.explode('country')['country'].unique().size
    json_data['films_per_country'] = films.explode('country').groupby('country').count()['url'].sort_values(ascending=False).iloc[0:10].to_dict()

    json_data['more_languages'] = films.sort_values(by='total_languages', ascending=False).iloc[0:10][['url', 'title', 'year', 'spoken_languages', 'total_languages']].to_dict(orient='records')

    json_data['films_per_theme'] = films.explode('themes').groupby('themes').count()['url'].sort_values(ascending=False).iloc[0:10].to_dict()
    json_data['films_per_genre'] = films.explode('genres').groupby('genres').count()['url'].sort_values(ascending=False).iloc[0:10].to_dict()
    
    json_data['films_per_studio'] = films.explode('studio').groupby('studio').count()['url'].sort_values(ascending=False).iloc[0:10].to_dict()
    json_data['rating_per_studio'] = films[films['rating'] <= 5].explode('studio').groupby('studio')['rating'].mean().sort_values(ascending=False).iloc[0:10].to_dict()

    json_data['films_per_composer'] = films.explode('composer').groupby('composer').count()['url'].sort_values(ascending=False).iloc[0:10].to_dict()
    json_data['rating_per_composer'] = films[films['rating'] <= 5].explode('composer').groupby('composer')['rating'].mean().sort_values(ascending=False).iloc[0:10].to_dict()
    
    json_data['films_per_cast'] = films.explode('cast').groupby('cast').count()['url'].sort_values(ascending=False).iloc[0:10].to_dict()
    json_data['rating_per_cast'] = films[films['rating'] <= 5].explode('cast').groupby('cast')['rating'].mean().sort_values(ascending=False).iloc[0:10].to_dict()

    json_data['total_directors'] = films.explode('director')['director'].unique().size
    json_data['films_per_director'] = films.explode('director').groupby('director').count()['url'].sort_values(ascending=False).iloc[0:10].to_dict()
    json_data['rating_per_director'] = films[films['rating'] <= 5].explode('director').groupby('director')['rating'].mean().sort_values(ascending=False).iloc[0:10].to_dict()



    write_json(json_data)



if __name__ == '__main__':
    main()    


    