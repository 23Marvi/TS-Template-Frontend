/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
var en = require("./src/assets/i18n/en-GB.json");
var nl = require("./src/assets/i18n/nl-NL.json");

var missing_keys = []
var exitcode = 0;

function parseObject(object) {
    for (let key in object) {
        // console.log("check:", key);
        // console.log("type:", typeof object[key]);
        if (object[key] && typeof object[key] === "object") {
            parseObject(object[key]);
        } else if (object[key] && typeof object[key] === "string") {
            if (object[key] === "") {
                missing_keys.push(key)
                // console.error("EMPTY key:", key)
            }
        } else {
            missing_keys.push(key)
            // console.error("Unchecked type:", typeof object[key]);
        }
    }
}

parseObject(en);
if (missing_keys.length > 0) {
    console.log("######################################################################")
    console.log("# MISSING ENGLISH TRANSLATIONS!!!! FIX TRANSLATIONS BEFORE COMMIT!!! #")
    console.log("######################################################################")
    console.log("Missing translations (EN):", missing_keys);
    missing_keys = [];
    exitcode = 1;
}



parseObject(nl);
if (missing_keys.length > 0) {
    console.log("######################################################################")
    console.log("# MISSING DUTCH TRANSLATIONS!!!! FIX TRANSLATIONS BEFORE COMMIT!!!   #")
    console.log("######################################################################")
    console.log("Missing translations (NL):", missing_keys);
    missing_keys = [];
    exitcode = 1;
}

process.exit(exitcode);
