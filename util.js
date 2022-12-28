/**
 * Formats bytes mostly like Windows does,
 * but in some rare cases the result is different.
 * Check the file with tests.
 * @see win-like-file-sizes.test.js
 * @param {Number} bytes
 * @return {string}
 */
export function bytesToSizeWinLike(bytes) {
    if (bytes < 1024) { return bytes + " B"; }
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let i = Math.floor(Math.log(bytes) / Math.log(1024));
    let result = bytes / Math.pow(1024, i);
    if (result >= 1000) {
        i++;
        result /= 1024;
    }
    return toTruncPrecision3(result) + " " + sizes[i];
}

/**
 * @see trunc-with-precision-3.test.js
 * @param {Number} number
 * @return {string}
 */
export function toTruncPrecision3(number) {
    let result;
    if (number < 10) {
        result = Math.trunc(number * 100) / 100;
    } else if (number < 100) {
        result = Math.trunc(number * 10) / 10;
    } else if (number < 1000) {
        result = Math.trunc(number);
    }
    if (number < 0.1) {
        return result.toPrecision(1);
    } else if (number < 1) {
        return result.toPrecision(2);
    }
    return result.toPrecision(3);
}



// "Sun, 10 Jan 2021 22:22:22 GMT" -> "2021.01.10"
export function dateToDayDateString(dateValue, utc = true) {
    dateValue = firefoxDateFix(dateValue);
    const _date = new Date(dateValue);
    if (_date.toString() === "Invalid Date") {
        console.warn("Invalid Date value: ", dateValue);
    }
    function pad2(str) {
        return str.toString().padStart(2, "0");
    }
    const _utc = utc ? "UTC" : "";
    const year  = _date[`get${_utc}FullYear`]();
    const month = _date[`get${_utc}Month`]() + 1;
    const date  = _date[`get${_utc}Date`]();

    return year + "." + pad2(month) + "." + pad2(date);
}

// "Sun, 10 Jan 2021 22:22:22 GMT" -> "2021.01.10 22:22:22Z"
export function dateToDayDateTimeString(dateValue, utc = true) {
    dateValue = firefoxDateFix(dateValue);
    const _date = new Date(dateValue);
    function pad2(str) {
        return str.toString().padStart(2, "0");
    }
    const _utc = utc ? "UTC" : "";
    const hours    = _date[`get${_utc}Hours`]();
    const minutes  = _date[`get${_utc}Minutes`]();
    const seconds  = _date[`get${_utc}Seconds`]();

    const time = pad2(hours)+ ":" + pad2(minutes) + ":" + pad2(seconds);
    return dateToDayDateString(_date, utc) + " " + time + (utc ? "Z" : "");
}


export function isString(input) {
    return typeof input === "string" || input instanceof String;
}

export function firefoxDateFix(dateValue) {
    return isString(dateValue) ? dateValue.replace(/(?<y>\d{4})\.(?<m>\d{2})\.(?<d>\d{2})/, "$<y>-$<m>-$<d>") : dateValue;
}
