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
            description: undefined,
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
            image: 'https://s.yimg.com/uu/api/res/1.2/N.CRvYlQ64WaxyiAOa343Q--/aD0zNzI7dz03NDQ7c209MTthcHBpZD15dGFjaHlvbg--/http://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/7aca164b9949d2a9879d8b6f0e85bab6',
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
            image: 'https://m.files.bbci.co.uk/modules/bbc-morph-news-waf-page-meta/1.2.0/bbc_news_logo.png?cb=1',
            title: 'Home - BBC News',
            url: 'https://www.bbc.co.uk/news',
        }
    },
    {
        url: 'http://www.bbc.co.uk/news',
        name: 'a URL with a protocol agnostic image in HTTP',
        expected: {
            description: 'Visit BBC News for up-to-the-minute news, breaking news, video, audio and feature stories. BBC News provides trusted World and UK news as well as local and regional perspectives. Also entertainment, business, science, technology and health news.',
            image: 'http://m.files.bbci.co.uk/modules/bbc-morph-news-waf-page-meta/1.2.0/bbc_news_logo.png?cb=1',
            title: 'Home - BBC News',
            url: 'http://www.bbc.co.uk/news',
        }
    },
];

const parser = require('../OpenGraphParser');

describe('Parser', function() {
    urls.forEach(function (item) {
        it(`should parse ${item.name} correctly`, function() {
            this.timeout(15000);

            return parser.extractMeta(item.url)
            .then((meta) => {
                expect(meta.description).to.equal(item.expected.description);
                expect(meta.image).to.equal(item.expected.image);
                expect(meta.title).to.equal(item.expected.title);
                expect(meta.url).to.equal(item.expected.url);
            });
        });
    });
});
