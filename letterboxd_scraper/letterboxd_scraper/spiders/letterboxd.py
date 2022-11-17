import scrapy

FILMS_OLDER = '//a[@class="next"]/@href'

FILM_URL = '//li[@class="poster-container"]/div/@data-target-link'
FILM_TITLE = '//section[@id="featured-film-header"]/h1/text()'
FILM_YEAR = '//section[@id="featured-film-header"]/p/small/a/text()'
FILM_COUNTRY = '//a[contains(@href, "/country/")]/text()'
FILM_AVG_RATING = '//meta[@name="twitter:data2"]/@content'
FILM_LANGUAGES = '//a[contains(@href, "language")]/text()'
FILM_LENGTH = '//p[@class="text-link text-footer"]/text()'

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

        # with open('resultado.html', 'w', encoding='utf-8') as f:
        #     f.write(response.text)
        films = response.xpath(FILM_URL).getall()
        # next_page_button = response.xpath(FILMS_OLDER).get()

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

        # if next_page_button_link:
        #     yield response.follow(next_page_button, callback=self.parse_films, cb_kwargs={'films': films})

    def parse_film(self, response, **kwargs):
        link = kwargs['url']
        rating = kwargs['rating']
        title = response.xpath(FILM_TITLE).get()
        year = response.xpath(FILM_YEAR).get()
        # country = response.xpath(FILM_COUNTRY).get()
        average_rating =  response.xpath(FILM_AVG_RATING).get().split(' ')[0]
        language = response.xpath(FILM_LANGUAGES).get()
        length = response.xpath(FILM_LENGTH).get()
        length = [int(s) for s in length.split() if s.isdigit()][0]

        yield {
            'url': link,
            'title': title,
            'year': year,
            'length (mins)': length,
            'rating': rating,
            # 'country': country,
            'average_rating': average_rating,
            'language': language
        }
