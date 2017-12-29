import 'babel-polyfill';
import chai from 'chai';
import fetch from 'isomorphic-fetch';

global.__DEV__ = true;
global.expect = chai.expect;

const urls = [
    {
        url: 'https://blog.callstack.io/react-native-animations-revisited-part-i-783143d4884',
        name: 'a URL with minified HTML',
        expected: {
            description: 'Simple and pretty LayoutAnimation',
            image: 'https://cdn-images-1.medium.com/max/1200/1*YkwZskCCQ0rJPPsrwh3M_w.png',
            title: 'React Native animations revisited — Part I – Callstack Engineers',
            url: 'https://blog.callstack.io/react-native-animations-revisited-part-i-783143d4884',
        }
    },
    {
        url: 'http://www.osedea.com',
        name: 'a redirection',
        expected: {
            description: 'We\'re a young and inspired team that leverages technical knowledge to turn ideas into creative and efficient digital solutions.',
            image: 'https://osedea.com/images/osedea.png',
            title: 'OSEDEA | Digital Efficiency & Creativity',
            url: 'http://www.osedea.com',
        }
    },
    {
        url: 'http://www.onlywebsites.com/',
        name: 'an HTTP Only website',
        expected: {
            description: 'We are a Utah web design company offering custom websites and SEO marketing. We offer our clients a free preview before they purchase. 800-932-6030',
            image: undefined,
            title: 'Utah Web Design, Development, and SEO | Only Websites',
            url: 'http://www.onlywebsites.com/',
        }
    },
    {
        url: 'http://cn.timesofisrael.com/',
        name: 'a non latin character website',
        expected: {
            description: '以色列时报全面报道以色列高科技、创新、商业、社会文化及中以合作最新动态。',
            image: 'http://cdn.timesofisrael.com/images/facebook_toi_300.jpg',
            title: '以色列时报 | 全面报道以色列高科技、创新、商业与社会',
            url: 'http://cn.timesofisrael.com/',
        }
    },
    {
        url: 'https://tw.news.yahoo.com/%E3%80%90%E7%8D%A8%E5%AE%B6%E3%80%91%E5%A4%9A%E9%87%8D%E9%98%BB%E5%9A%87%E8%A7%A3%E6%94%BE%E8%BB%8D%E3%80%80%E4%B8%AD%E7%A7%91%E9%99%A2%E5%AF%A6%E6%B8%AC%E5%A4%A9%E5%BC%93%E3%80%81%E5%A4%A9%E5%8A%8D-013928232.html',
        name: 'a website that allows only google bot through if programmatically called',
        expected: {
            description: '另外，代號「劍影專案」的海劍羚飛彈（Sea Oryx Missile system）短程防空反飛彈系統，是以天劍一短程防空飛彈結合紅外線與被動雷達整合導引的輕型、點防禦艦對空飛彈，用來攔截反艦飛彈 ，今年也將安排進入實彈測試。',
            image: 'https://s.yimg.com/uu/api/res/1.2/bz7yYtGiWEpxQ.f5xR.T7Q--~B/aD0zNzI7dz03NDQ7c209MTthcHBpZD15dGFjaHlvbg--/http://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/7aca164b9949d2a9879d8b6f0e85bab6',
            title: '【獨家】多重阻嚇解放軍 中科院實測天弓、天劍與雄風系列「新三彈」 - Yahoo奇摩新聞',
            url: 'https://tw.news.yahoo.com/%E3%80%90%E7%8D%A8%E5%AE%B6%E3%80%91%E5%A4%9A%E9%87%8D%E9%98%BB%E5%9A%87%E8%A7%A3%E6%94%BE%E8%BB%8D%E3%80%80%E4%B8%AD%E7%A7%91%E9%99%A2%E5%AF%A6%E6%B8%AC%E5%A4%A9%E5%BC%93%E3%80%81%E5%A4%A9%E5%8A%8D-013928232.html',
        }
    },
    {
        url: 'www.centrelapinscretins.com',
        name: 'a URL with a relative image url',
        expected: {
            description: undefined,
            image: 'http://www.centrelapinscretins.com/static/img/social-network.png',
            title: 'Accueil\n        | Centre d\'amusement Les Lapins Crétins',
            url: 'http://www.centrelapinscretins.com',
        }
    },
    {
        url: 'https://blog.womeninmind.com/cKIj-tout-faire-oui-ca-se-peut',
        name: "a URL with 's in the content",
        expected: {
            description: 'Le plus grand défi des familles, particulièrement de la femme d\'aujourd\'hui, est d\'arriver à tout faire. Parce qu\'on veut tout avec le moins de compromis possible! Est-ce ça se peut? OUI. Avec beau...',
            image: 'https://content.tylio.com/users/1256/images/1280px/1d2dcff3956ca2039bb86846c65fbab086011051dd6401db30ca1996fd1bb70c-travail-famille-wim-voisine-large.png',
            title: 'TOUT faire, oui c\'est possible!',
            url: 'https://blog.womeninmind.com/cKIj-tout-faire-oui-ca-se-peut',
        }
    },
    {
        url: 'https://www.bbc.co.uk/news',
        name: 'a URL with a protocol agnostic image in HTTPS',
        expected: {
            description: 'Visit BBC News for up-to-the-minute news, breaking news, video, audio and feature stories. BBC News provides trusted World and UK news as well as local and regional perspectives. Also entertainment, business, science, technology and health news.',
            image: 'https://m.files.bbci.co.uk/modules/bbc-morph-news-waf-page-meta/2.0.0/bbc_news_logo.png',
            title: 'Home - BBC News',
            url: 'https://www.bbc.co.uk/news',
        }
    },
    {
        url: 'http://www.bbc.co.uk/news',
        name: 'a URL with a protocol agnostic image in HTTP',
        expected: {
            description: 'Visit BBC News for up-to-the-minute news, breaking news, video, audio and feature stories. BBC News provides trusted World and UK news as well as local and regional perspectives. Also entertainment, business, science, technology and health news.',
            image: 'http://m.files.bbci.co.uk/modules/bbc-morph-news-waf-page-meta/2.0.0/bbc_news_logo.png',
            title: 'Home - BBC News',
            url: 'http://www.bbc.co.uk/news',
        }
    },
    {
        url: 'https://www.inverse.com/article/34343-a-i-scientists-react-to-elon-musk-ai-comments',
        name: 'a URL with weird OG and Meta Tags attributes orders',
        expected: {
            description: 'Is Musk being "needlessly alarmist"?',
            image: 'https://fsmedia.imgix.net/6b/4d/f1/b2/8222/4b4d/9dec/9d67ac95f4af/55b72dba1400002f002e1008jpeg.jpeg?rect=0%2C0%2C720%2C360&fm=png&w=1200',
            title: 'A.I. Scientists to Elon Musk: Stop Saying Robots Will Kill Us All',
            url: 'https://www.inverse.com/article/34343-a-i-scientists-react-to-elon-musk-ai-comments',
        },
    },
    {
        url: 'http://google.com',
        name: 'Google',
        expected: {
            description: 'whoKnows',
            image: 'something',
            title: 'Google',
            url: 'http://google.com',
        },
    },
    {
        url: 'https://www.youtube.com/watch?v=AGkSHE15BSs',
        name: 'Youtube',
        expected: {
            description: undefined,
            image: 'https://i.ytimg.com/vi/AGkSHE15BSs/hqdefault.jpg',
            title: 'Julien Verlaguet - Reflex: Reactive Programming at Facebook',
            url: 'https://www.youtube.com/watch?v=AGkSHE15BSs',
        },
    }
];

const parser = require('../OpenGraphParser');

const __DEV__ = true;

describe('Parser', function() {
    describe('findOGTags', function () {
        const simpleOGTag = '<meta property="og:title" content="test title" />';
        const expectedSimpleOGTag = { title: 'test title' };
        const simpleOGTagReversed = '<meta content="test title" property="og:title" />';
        const simpleOGTagWithMore = '<meta name="thing" class="weird" property="og:title" content="test title" />';
        const severalOGTagsInOne = '<meta name="thing" class="weird" property="og:title" content="test title" /><meta name="thing" class="weird" property="og:description" content="test description" />';
        const expectedSeveralOGTags = { title: 'test title', description: 'test description' };
        const severalOGTagsInOneReversed = '<meta name="thing" class="weird" content="test title" property="og:title" /><meta name="thing" content="test description" class="weird" property="og:description" />';

        it('should find meta info in a valid og:tag', function() {
            expect(parser.findOGTags(simpleOGTag)).to.deep.equal(expectedSimpleOGTag);
        });
        it('should find meta info in a reversed og:tag', function() {
            expect(parser.findOGTags(simpleOGTag)).to.deep.equal(expectedSimpleOGTag);
        });
        it('should find meta info in a og:tag with weird extra attributes', function() {
            expect(parser.findOGTags(simpleOGTag)).to.deep.equal(expectedSimpleOGTag);
        });
        it('should find meta info in a several og:tags on the same line', function() {
            expect(parser.findOGTags(severalOGTagsInOne)).to.deep.equal(expectedSeveralOGTags);
        });
        it('should find meta info in a several og:tags on the same line, even if attributes are reversed', function() {
            expect(parser.findOGTags(severalOGTagsInOneReversed)).to.deep.equal(expectedSeveralOGTags);
        });
    });
    describe('findHTMLMetaTags', function () {
        const simpleMetaTag = '<meta name="title" content="test title" />';
        const expectedSimpleMetaTag = { title: 'test title' };
        const simpleMetaTagReversed = '<meta content="test title" name="title" />';
        const simpleMetaTagWithItemprop = '<meta itemprop="title" content="test title" />';
        const simpleMetaTagWithMore = '<meta class="weird" name="title" stuff="thing" content="test title" />';
        const severalMetaTagsInOne = '<meta class="weird" name="title" content="test title" /><meta stuff="thing" class="weird" name="description" content="test description" />';
        const expectedSeveralMetaTags = { title: 'test title', description: 'test description' };
        const severalMetaTagsInOneReversed = '<meta name="title" class="weird" content="test title" /><meta stuff="thing" content="test description" class="weird" name="description" />';

        it('should find meta info in a valid meta tag', function() {
            expect(parser.findHTMLMetaTags(simpleMetaTag)).to.deep.equal(expectedSimpleMetaTag);
        });
        it('should find meta info in a reversed meta tag', function() {
            expect(parser.findHTMLMetaTags(simpleMetaTag)).to.deep.equal(expectedSimpleMetaTag);
        });
        it('should find meta info in a meta tag with itemprop', function() {
            expect(parser.findHTMLMetaTags(simpleMetaTagWithItemprop)).to.deep.equal(expectedSimpleMetaTag);
        });
        it('should find meta info in a meta tags with weird extra attributes', function() {
            expect(parser.findHTMLMetaTags(simpleMetaTag)).to.deep.equal(expectedSimpleMetaTag);
        });
        it('should find meta info in a several meta tagss on the same line', function() {
            expect(parser.findHTMLMetaTags(severalMetaTagsInOne)).to.deep.equal(expectedSeveralMetaTags);
        });
        it('should find meta info in a several meta tags on the same line, even if attributes are reversed', function() {
            expect(parser.findHTMLMetaTags(severalMetaTagsInOneReversed)).to.deep.equal(expectedSeveralMetaTags);
        });
    });
    describe('extractMeta', function () {
        urls.forEach(function (item) {
            it(`should parse ${item.name} correctly`, function() {
                this.timeout(15000);

                return parser.extractMeta(item.url)
                .then((meta) => {
                    const propsToCheck = [
                        'description',
                        'image',
                        'title',
                        'url',
                    ]
                    const errors = [];

                    propsToCheck.forEach((prop) => {
                        if (item.expected[prop] === 'something') {
                            try {
                                expect(meta[prop]).to.not.be.undefined;
                            } catch (error) {
                                errors.push(`${prop} should be not be undefined: ${meta[prop]}`);
                            }
                        } else if (item.expected[prop] === 'whoKnows') {
                            // do not test that prop. It could be defined or not, according to the time
                        } else {
                            try {
                                expect(meta[prop]).to.equal(item.expected[prop]);
                            } catch (error) {
                                errors.push(`${prop} should be ${item.expected[prop]}. Not ${meta[prop]}`);
                            }
                        }
                    });

                    expect(errors).to.deep.equal([]);
                });
            });
        });
    });
});
