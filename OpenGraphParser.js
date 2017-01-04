import decodeHTMLChars from './decodeHTMLChars';

function parseMeta(html, url) {
    const metaTagRegex = /<meta.*property=[ '"]*og:.*/gi;
    const meta = {
        url: url,
    };
    const matches = html.match(metaTagRegex);

    if (matches) {
        for (let i = matches.length; i--;) {
            let metaName = matches[i].split('og:');

            if (metaName.length > 1) {
                metaName = metaName[1].split('"');
            } else {
                break;
            }

            if (metaName.length > 1) {
                metaName = metaName[0];
            } else {
                metaName = metaName[0].split("'");

                if (metaName.length > 1) {
                    metaName = metaName[0];
                } else {
                    break;
                }
            }

            let metaValue = matches[i].split('content=');

            if (metaValue.length > 1) {
                metaValue = metaValue[1].split(metaValue[1].trim()[0])[1];
                if (metaValue[0] === '/') {
                    if (url[url.length - 1] === '/') {
                        metaValue = url + metaValue.substring(1);
                    } else {
                        metaValue = url + metaValue;
                    }
                }
            } else {
                break;
            }

            meta[metaName] = decodeHTMLChars(metaValue);
        }

        return meta;
    } else {
        return null;
    }
}

async function fetchHtml(urlToFetch) {
    let result;

    try {
        result = await fetch(urlToFetch);

        if (result.status >= 400) {
            throw result;
        }

        return result.text()
        .then((resultParsed) => (resultParsed));
    } catch (responseOrError) {
        if (responseOrError.message) {
            console.log(responseOrError);
            return null;
        }

        return responseOrError.text()
        .then((error) => {
            console.log('An error has occured while fetching url content', error);
            return null;
        });
    }
}

function getUrls(contentToMatch) {
    const regexp = /((?:(http|https|Http|Https|rtsp|Rtsp)?:?\/?\/?(?:(?:[a-zA-Z0-9\$\-_\.\+!\*'\(\),;\?&=]|(?:%[a-fA-F0-9]{2})){1,64}(?::(?:[a-zA-Z0-9\$\-_\.\+!\*'\(\),;\?&=]|(?:%[a-fA-F0-9]{2})){1,25})?@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?::\d{1,5})?)(\/(?:(?:[a-zA-Z0-9;\/\?:@&=#~\-\.\+!\*'\(\),_])|(?:%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;
    const urls = contentToMatch.match(regexp);
    const urlsToReturn = [];

    if (urls && urls.length) {
        urls.forEach((url) => {
            if (url.toLowerCase().indexOf('http') === 0) {
                urlsToReturn.push(url);
            } else {
                urlsToReturn.push(`http://${url}`);
            }
        });

        return urlsToReturn;
    } else {
        throw new Error('Could not find an html link');
    }
}

async function extractMeta(textContent = '') {
    try {
        const urls = getUrls(textContent);

        console.log('Extracted urls', urls);

        let metaData = null;
        let i = 0;

        while (!metaData && i < urls.length) {
            metaData = await fetchHtml(urls[i])
                .then(
                    (html) => ({
                        ...parseMeta(html, urls[i]),
                        url: urls[i],
                    })
                );

            i++;
        }

        return metaData;
    } catch (e) {
        console.log(e);

        return {};
    }
}

module.exports = {
    extractMeta,
};
