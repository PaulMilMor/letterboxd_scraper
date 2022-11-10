import scrapy

FILMS_OLDER = '//a[@class="next"]/@href'

# FILM_URL = '//a[@class="frame"]/@href'
FILM_URL = '//li[@class="poster-container"]/div/@data-target-link'
FILM_TITLE = '//h1[contains(@class, "headline-1")]/text()'
FILM_YEAR = '//a[contains(@href, "year/")]/text()'


class FilmsSpider(scrapy.Spider):
    name = 'films'

    custom_settings = {
        'FEEDS': {
            'quotes.csv': {
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
            yield response.follow(link, callback=self.parse_film, cb_kwargs={'url': response.urljoin(link)})

        # if next_page_button_link:
        #     yield response.follow(next_page_button, callback=self.parse_films, cb_kwargs={'films': films})

    def parse_film(self, response, **kwargs):
        link = kwargs['url']
        title = response.xpath(FILM_TITLE)
        year = response.xpath(FILM_YEAR)

        yield {
            'url': link,
            'title': title,
            'year': year,
        }
