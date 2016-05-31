function parseMeta(html) {
    const metaTagRegex = /<meta property="og:.*/gi;
    const meta = {
        url: '',
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
                break;
            }
            let metaValue = matches[i].split('content="');

            if (metaValue.length > 1) {
                metaValue = metaValue[1].split('"');
            } else {
                break;
            }
            if (metaValue.length > 1) {
                metaValue = metaValue[0];
            } else {
                break;
            }
            meta[metaName] = metaValue;
        }
    }

    return meta;
}

async function fetchHtml(url) {
    let result;

    try {
        result = await fetch(url);
        if (result.status >= 400) {
            throw result;
        }

        return result.text()
        .then((resultParsed) => (resultParsed));
    } catch (responseOrError) {
        if (responseOrError.message) {
            throw responseOrError;
        }

        return responseOrError.text()
        .then((error) => {
            throw new Error('An error has occured while fetching url content', error);
        });
    }
}

function getFirstUrl(content) {
    const regexp = /((?:(http|https|Http|Https|rtsp|Rtsp)?:?\/?\/?(?:(?:[a-zA-Z0-9\$\-_\.\+!\*'\(\),;\?&=]|(?:%[a-fA-F0-9]{2})){1,64}(?::(?:[a-zA-Z0-9\$\-_\.\+!\*'\(\),;\?&=]|(?:%[a-fA-F0-9]{2})){1,25})?@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?::\d{1,5})?)(\/(?:(?:[a-zA-Z0-9;\/\?:@&=#~\-\.\+!\*'\(\),_])|(?:%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;
    const url = regexp.exec(content);

    if (url) {
        if (url[0].toLowerCase().indexOf('http') === 0) {
            return url[0];
        } else {
            return `http://${url[0]}`;
        }
    } else {
        throw new Error('Could not find an html link');
    }
}

async function extractMeta(content = '') {
    try {
        const url = getFirstUrl(content);

        return await fetchHtml(url).then(
            (html) => ({
                ...parseMeta(html),
                url,
            })
        );
    } catch (e) {
        console.log(e);

        return {};
    }
}

module.exports = {
    extractMeta,
};
