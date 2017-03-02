import { AllHtmlEntities } from 'html-entities';

const entities = new AllHtmlEntities();

function parseMeta(html, url, options) {
    const metaTagOGRegex = /<meta[^>]*property=[ '"]*og:([^'"]*)[^>]*content=["]([^"]*)["][^>]*>/gi;
    const metaPropertyRegex = /<meta[^>]*property=[ "]*og:([^"]*)[^>]*>/i;
    const metaContentRegex = /<meta[^>]*content=[ "]([^"]*)[^>]*>/i;
    const meta = { url };

    const matches = html.match(metaTagOGRegex);

    if (matches) {
        for (let i = matches.length; i--;) {
            let metaName;
            let metaValue;

            try {
                const propertyMatch = metaPropertyRegex.exec(matches[i]);
                const contentMatch = metaContentRegex.exec(matches[i]);
                metaName = propertyMatch[1].trim();
                metaValue = contentMatch[1].trim();

                if (!metaName || !metaValue) {
                    continue;
                }
            } catch (error) {
                if (__DEV__) {
                    console.log('Error on ', matches[i]);
                    console.log('propertyMatch', propertyMatch);
                    console.log('contentMatch', contentMatch);
                    console.log(error);
                }

                continue;
            }

            if (metaValue.length > 0) {
                if (metaValue[0] === '/') {
                    if (url[url.length - 1] === '/') {
                        metaValue = url + metaValue.substring(1);
                    } else {
                        metaValue = url + metaValue;
                    }
                }
            } else {
                continue;
            }

            meta[metaName] = entities.decode(metaValue);
        }

        if (options.fallbackOnHTMLTags) {
            try {
                fallbackOnHTMLTags(html, meta);
            } catch (error) {
                if (__DEV__) {
                    console.log('Error in fallback', error);
                }
            }
        }

        return meta;
    } else {
        return null;
    }
}

function fallbackOnHTMLTags(htmlContent, metaDataObject) {
    if (!metaDataObject.description) {
        const descriptionMetaTagRegex = /<meta[^>]*name=[ '"]*description[^'"]* [^>]*content=['"]([^'"]*)['"][^>]*>/gi;
        const descriptionMatches = htmlContent.match(descriptionMetaTagRegex);

        if (descriptionMatches && descriptionMatches.length > 0) {
            const descriptionContentRegex = /<meta[^>]*name=[ '"]*description[^'"]* [^>]*content=['"]([^'"]*)['"][^>]*>/i;
            const descriptionMatch = descriptionContentRegex.exec(descriptionMatches[0]);

            if (descriptionMatch) {
                metaDataObject.description = descriptionMatch[1].trim();
            }
        }
    }

    if (!metaDataObject.title) {
        const titleMetaTagRegex = /<title>([^<]*)<\/title>/gi;
        const titleMatches = htmlContent.match(titleMetaTagRegex);

        if (titleMatches && titleMatches.length > 0) {
            const titleContentRegex = /<title>([^<]*)<\/title>/i;
            const titleMatch = titleContentRegex.exec(titleMatches[0]);

            if (titleMatch) {
                metaDataObject.title = titleMatch[1].trim();
            }
        }
    }
}

async function fetchHtml(urlToFetch) {
    let result;

    try {
        result = await fetch(urlToFetch, {
            method: 'GET',
            headers: {
                "user-agent": 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
            },
        });

        if (result.status >= 400) {
            throw result;
        }

        return result.text()
        .then((resultParsed) => (resultParsed));
    } catch (responseOrError) {
        if (responseOrError.message && __DEV__) {
            if (responseOrError.message === 'Network request failed') {
                console.log(urlToFetch, 'could not be fetched');
            } else {
                console.log(responseOrError);
            }
            return null;
        }

        return responseOrError.text()
        .then((error) => {
            if (__DEV__) {
                console.log('An error has occured while fetching url content', error);
            }
            return null;
        });
    }
}

function getUrls(contentToMatch) {
    const regexp = /((?:(http|https|Http|Https)?:?\/?\/?(?:(?:[a-zA-Z0-9\$\-_\.\+!\*'\(\),;\?&=]|(?:%[a-fA-F0-9]{2})){1,64}(?::(?:[a-zA-Z0-9\$\-_\.\+!\*'\(\),;\?&=]|(?:%[a-fA-F0-9]{2})){1,25})?@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:[a-z]{1,63}))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?::\d{1,5})?)(\/(?:(?:[a-zA-Z0-9;\/\?:@&=#~\-\.\+!\*'\(\),_])|(?:%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;
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
    } else {
        if (__DEV__) {
            console.log('Could not find an html link');
        }
    }

    return urlsToReturn;
}

async function extractMeta(textContent = '', options = { fallbackOnHTMLTags: true }) {
    try {
        const urls = getUrls(textContent);

        let metaData = null;
        let i = 0;

        while (!metaData && i < urls.length) {
            metaData = await fetchHtml(urls[i])
                .then(
                    (html) => ({
                        ...html ? parseMeta(html, urls[i], options) : {},
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
