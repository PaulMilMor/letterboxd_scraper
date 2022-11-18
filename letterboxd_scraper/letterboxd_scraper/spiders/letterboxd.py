import scrapy

# The above code is using xpath to find the information we want from the website.
FILMS_OLDER = '//a[@class="next"]/@href'

FILM_URL = '//li[@class="poster-container"]/div/@data-target-link'
FILM_TITLE = '//section[@id="featured-film-header"]/h1/text()'
FILM_YEAR = '//section[@id="featured-film-header"]/p/small/a/text()'
FILM_COUNTRY = '//a[contains(@href, "/country/")]/text()'
FILM_AVG_RATING = '//meta[@name="twitter:data2"]/@content'
FILM_LANGUAGES = '//a[contains(@href, "/language/")]/text()'
FILM_LENGTH = '//p[@class="text-link text-footer"]/text()'
FILM_STUDIOS = '//a[contains(@href, "/studio/")]/text()'
FILM_GENRES = '//a[contains(@href, "/genre/")]/text()'
FILM_THEMES = '//a[contains(@href, "/theme/")]/text()'
FILM_DIRECTOR = '//a[contains(@href, "/director/")]/text()'
FILM_COMPOSER = '//a[contains(@href, "/composer/")]/text()'
FILM_CAST = '//a[contains(@href, "/actor/")]/text()'

# This class is a subclass of the scrapy.Spider class. It has a name, custom settings, and a
# constructor that takes in a start_url argument
class FilmsSpider(scrapy.Spider):
    name = 'films'

    custom_settings = {
        'FEEDS': {
            'films.csv': {
                'format': 'csv',
                'encoding': 'utf8',
                'store_empty': False,
                'fields': None,
                'indent': 4,
                'item_export_kwargs': {
                    'export_empty_fields': True
                }
            }
        },
        'CONCURRENT_REQUESTS': 24,
        'MEMUSAGE_LIMIT_MB': 2048,
        'MEMUSAGE_NOTIFY_MAIL': [''],
        'ROBOTSTXT_OBEY': True,
        'USER_AGENT': 'EducationalScraper'
    }

    def __init__(self, *args, **kwargs):
        super(FilmsSpider, self).__init__(*args, **kwargs)

        self.start_urls = [kwargs.get('start_url')]


    def parse(self, response):
        """
        We're going to get all the film links on the page, and then for each link, we're going to get
        the rating, and then we're going to follow the link to the film page, and then we're going to
        parse the film page
        
        :param response: the response object that was returned from the previous callback
        """

        films = response.xpath(FILM_URL).getall()
        next_page_button = response.xpath(FILMS_OLDER).get()

        for link in films:
            rating = response.xpath(f'//li[div[contains(@data-target-link, "{link}")]]/p/span[1]/@class').get()
            if rating != None:
                rating = rating.split('-')
                rating = int(rating[len(rating)-1])
                if rating > 10:
                    rating = 'None'
                else:
                    rating = rating / 2
            else:
                rating = 'None'


            yield response.follow(link, callback=self.parse_film, cb_kwargs={'url': response.urljoin(link), 'rating': rating})

        if next_page_button:
            yield response.follow(next_page_button, callback=self.parse)
            

    


    def parse_film(self, response, **kwargs):
        """
        The function takes in a response object and a dictionary of keyword arguments. It then extracts
        the title, year, length, average rating, country, language, studio, genres, themes, director,
        composer, and cast of the film. It then returns a dictionary of the extracted information
        
        :param response: the response object that was returned from the URL request
        """
        if kwargs:
            link = kwargs['url']
            rating = kwargs['rating']
        title = response.xpath(FILM_TITLE).get()
        year = response.xpath(FILM_YEAR).get()
        length = response.xpath(FILM_LENGTH).get()
        length = [int(s) for s in length.split() if s.isdigit()][0]
        average_rating =  response.xpath(FILM_AVG_RATING).get().split(' ')[0]
        country = response.xpath(FILM_COUNTRY).getall()
        language = response.xpath(FILM_LANGUAGES).getall()
        studios = response.xpath(FILM_STUDIOS).getall()
        genres = response.xpath(FILM_GENRES).getall()
        themes = response.xpath(FILM_THEMES).getall()
        director = response.xpath(FILM_DIRECTOR).getall()
        composer = response.xpath(FILM_COMPOSER).getall()
        cast = response.xpath(FILM_CAST).getall()

        yield {
            'url': link,
            'title': title,
            'year': year,
            'length (mins)': length,
            'rating': rating,
            'average_rating': average_rating,
            'country': '/'.join(country),
            'original_language': language[0],
            'spoken_languages': '/'.join(set(language)),
            'studio': '/'.join(studios),
            'genres': '/'.join(genres),
            'themes': '/'.join(themes),
            'director': '/'.join([d for d in director if '\n' not in d and '\t' not in d ]),
            'composer': '/'.join(composer),
            'cast': '/'.join([c for c in cast if '\n' not in c and '\t' not in c])
        }
