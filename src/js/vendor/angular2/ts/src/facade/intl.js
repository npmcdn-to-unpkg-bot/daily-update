System.register([], function(exports_1) {
    var NumberFormatStyle, NumberFormatter, dateFormatterCache, DateFormatter;
    function digitCondition(len) {
        return len == 2 ? '2-digit' : 'numeric';
    }
    function nameCondition(len) {
        return len < 4 ? 'short' : 'long';
    }
    function extractComponents(pattern) {
        var ret = {};
        var i = 0, j;
        while (i < pattern.length) {
            j = i;
            while (j < pattern.length && pattern[j] == pattern[i])
                j++;
            var len = j - i;
            switch (pattern[i]) {
                case 'G':
                    ret.era = nameCondition(len);
                    break;
                case 'y':
                    ret.year = digitCondition(len);
                    break;
                case 'M':
                    if (len >= 3)
                        ret.month = nameCondition(len);
                    else
                        ret.month = digitCondition(len);
                    break;
                case 'd':
                    ret.day = digitCondition(len);
                    break;
                case 'E':
                    ret.weekday = nameCondition(len);
                    break;
                case 'j':
                    ret.hour = digitCondition(len);
                    break;
                case 'h':
                    ret.hour = digitCondition(len);
                    ret.hour12 = true;
                    break;
                case 'H':
                    ret.hour = digitCondition(len);
                    ret.hour12 = false;
                    break;
                case 'm':
                    ret.minute = digitCondition(len);
                    break;
                case 's':
                    ret.second = digitCondition(len);
                    break;
                case 'z':
                    ret.timeZoneName = 'long';
                    break;
                case 'Z':
                    ret.timeZoneName = 'short';
                    break;
            }
            i = j;
        }
        return ret;
    }
    return {
        setters:[],
        execute: function() {
            (function (NumberFormatStyle) {
                NumberFormatStyle[NumberFormatStyle["Decimal"] = 0] = "Decimal";
                NumberFormatStyle[NumberFormatStyle["Percent"] = 1] = "Percent";
                NumberFormatStyle[NumberFormatStyle["Currency"] = 2] = "Currency";
            })(NumberFormatStyle || (NumberFormatStyle = {}));
            exports_1("NumberFormatStyle", NumberFormatStyle);
            NumberFormatter = (function () {
                function NumberFormatter() {
                }
                NumberFormatter.format = function (num, locale, style, _a) {
                    var _b = _a === void 0 ? {} : _a, _c = _b.minimumIntegerDigits, minimumIntegerDigits = _c === void 0 ? 1 : _c, _d = _b.minimumFractionDigits, minimumFractionDigits = _d === void 0 ? 0 : _d, _e = _b.maximumFractionDigits, maximumFractionDigits = _e === void 0 ? 3 : _e, currency = _b.currency, _f = _b.currencyAsSymbol, currencyAsSymbol = _f === void 0 ? false : _f;
                    var intlOptions = {
                        minimumIntegerDigits: minimumIntegerDigits,
                        minimumFractionDigits: minimumFractionDigits,
                        maximumFractionDigits: maximumFractionDigits
                    };
                    intlOptions.style = NumberFormatStyle[style].toLowerCase();
                    if (style == NumberFormatStyle.Currency) {
                        intlOptions.currency = currency;
                        intlOptions.currencyDisplay = currencyAsSymbol ? 'symbol' : 'code';
                    }
                    return new Intl.NumberFormat(locale, intlOptions).format(num);
                };
                return NumberFormatter;
            })();
            exports_1("NumberFormatter", NumberFormatter);
            dateFormatterCache = new Map();
            DateFormatter = (function () {
                function DateFormatter() {
                }
                DateFormatter.format = function (date, locale, pattern) {
                    var key = locale + pattern;
                    if (dateFormatterCache.has(key)) {
                        return dateFormatterCache.get(key).format(date);
                    }
                    var formatter = new Intl.DateTimeFormat(locale, extractComponents(pattern));
                    dateFormatterCache.set(key, formatter);
                    return formatter.format(date);
                };
                return DateFormatter;
            })();
            exports_1("DateFormatter", DateFormatter);
        }
    }
});
//# sourceMappingURL=intl.js.map