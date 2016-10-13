const map = {
    quot: '"', // quotation mark
    '#039': "'", // single quote
    amp: '&', // ampersand
    lt: '<', // less-than sign
    gt: '>', // greater-than sign
    nbsp: ' ', // non-breaking space
    iexcl: '¡', // inverted exclamation mark
    cent: '¢', // cent sign
    pound: '£', // pound sign
    curren: '¤', // currency sign
    yen: '¥', // yen sign = yuan sign
    brvbar: '¦', // 	broken vertical bar
    sect: '§', // section sign
    uml: '¨', // diaeresis = spacing diaeresis
    copy: '©', // copyright sign
    ordf: 'ª', // feminine ordinal indicator
    laquo: '«', // left-pointing double angle quotation mark = left pointing guillemet
    not: '¬', // 	not sign
    shy: '', // soft hyphen = discretionary hyphen
    reg: '®', // registered sign = registered trademark sign
    macr: '¯', // macron = spacing macron = overline = APL overbar
    deg: '°', // 	degree sign
    plusmn: '±', // plus-minus sign = plus-or-minus sign
    sup2: '²', // 	superscript two = superscript digit two = squared
    sup3: '³', // 	superscript three = superscript digit three = cubed
    acute: '´', // 	acute accent = spacing acute
    micro: 'µ', // 	micro sign
    para: '¶', // pilcrow sign = paragraph sign
    middot: '·', // 	middle dot = Georgian comma = Greek middle dot
    cedil: '¸', // 	cedilla = spacing cedilla
    sup1: '¹', // 	superscript one = superscript digit one
    ordm: 'º', // 	masculine ordinal indicator
    raquo: '»', // right-pointing double angle quotation mark = right pointing guillemet
    frac14: '¼', // 	vulgar fraction one quarter = fraction one quarter
    frac12: '½', // 	vulgar fraction one half = fraction one half
    frac34: '¾', // 	vulgar fraction three quarters = fraction three quarters
    iquest: '¿', // 	inverted question mark = turned question mark
    times: '×', // 	multiplication sign
    divide: '÷', // 	division sign
    fnof: 'ƒ', // 	latin small f with hook = function = florin
    circ: 'ˆ', // 	modifier letter circumflex accent
    tilde: '˜', // 	small tilde
    ensp: ' ', // en space
    emsp: ' ', // em space
    thinsp: ' ', // 	thin space
    zwnj: '‌', // zero width non-joiner
    zwj: '‍', // 	zero width joiner
    lrm: '‎', // left-to-right mark
    rlm: '‏', // right-to-left mark
    ndash: '–', // 	en dash
    mdash: '—', // em dash
    lsquo: '‘', // left single quotation mark
    rsquo: '’', // right single quotation mark
    sbquo: '‚', // single low-9 quotation mark
    ldquo: '“', // left double quotation mark
    rdquo: '”', // right double quotation mark
    bdquo: '„', // double low-9 quotation mark
    dagger: '†', // dagger
    Dagger: '‡', // double dagger
    bull: '•', // bullet = black small circle
    hellip: '…', // 	horizontal ellipsis = three dot leader
    permil: '‰', // 	per mille sign
    prime: '′', // prime = minutes = feet
    Prime: '″', // double prime = seconds = inches
    lsaquo: '‹', // single left-pointing angle quotation mark
    rsaquo: '›', // single right-pointing angle quotation mark
    oline: '‾', // overline = spacing overscore
    frasl: '⁄', // fraction slash
    euro: '€', // euro sign
    image: 'ℑ', // blackletter capital I = imaginary part
    weierp: '℘', // script capital P = power set = Weierstrass p
    real: 'ℜ', // blackletter capital R = real part symbol
    trade: '™', // trademark sign
    alefsym: 'ℵ', // 	alef symbol = first transfinite cardinal
    larr: '←', // leftwards arrow
    uarr: '↑', // upwards arrow
    rarr: '→', // rightwards arrow
    darr: '↓', // downwards arrow
    harr: '↔', // left right arrow
    crarr: '↵', // downwards arrow with corner leftwards = carriage return
    lArr: '⇐', // 	leftwards double arrow
    uArr: '⇑', // 	upwards double arrow
    rArr: '⇒', // 	rightwards double arrow
    dArr: '⇓', // 	downwards double arrow
    hArr: '⇔', // 	left right double arrow
    forall: '∀', // 	for all
    part: '∂', // 	partial differential
    exist: '∃', // there exists
    empty: '∅', // empty set = null set = diameter
    nabla: '∇', // nabla = backward difference
    isin: '∈', // element of
    notin: '∉', // 	not an element of
    ni: '∋', // contains as member
    prod: '∏', // n-ary product = product sign
    sum: '∑', // 	n-ary sumation
    minus: '−', // minus sign
    lowast: '∗', // asterisk operator
    radic: '√', // square root = radical sign
    prop: '∝', // proportional to
    infin: '∞', // infinity
    ang: '∠', // 	angle
    and: '∧', // logical and = wedge
    or: '∨', // logical or = vee
    cap: '∩', // intersection = cap
    cup: '∪', // union = cup
    int: '∫', // integral
    there4: '∴', // therefore
    sim: '∼', // tilde operator = varies with = similar to
    cong: '≅', // approximately equal to
    asymp: '≈', // almost equal to = asymptotic to
    ne: '≠', // 	not equal to
    equiv: '≡', // 	identical to
    le: '≤', // 	less-than or equal to
    ge: '≥', // 	greater-than or equal to
    sub: '⊂', // 	subset of
    sup: '⊃', // superset of
    nsub: '⊄', // 	not a subset of
    sube: '⊆', // subset of or equal to
    supe: '⊇', // superset of or equal to
    oplus: '⊕', // 	circled plus = direct sum
    otimes: '⊗', // circled times = vector product
    perp: '⊥', // up tack = orthogonal to = perpendicular
    sdot: '⋅', // 	dot operator
    lceil: '⌈', // 	left ceiling = apl upstile
    rceil: '⌉', // right ceiling
    lfloor: '⌊', // left floor = apl downstile
    rfloor: '⌋', // right floor
    lang: '⟨', // left-pointing angle bracket = bra
    rang: '⟩', // right-pointing angle bracket = ket
    loz: '◊', // lozenge
    spades: '♠', // black spade suit
    clubs: '♣', // black club suit = shamrock
    hearts: '♥', // black heart suit = valentine
    diams: '♦', // black diamond suit
};

function decodeHTMLChars(str) {
  return str.replace(/&([^;]+);/g, (m, c) => map[c]);
}

module.exports = decodeHTMLChars;
