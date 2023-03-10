const assert = require("assert");
const cheerio = require("cheerio");
const fs = require("fs");
const {globSync} = require("glob");
const path = require("path");
const request = require("sync-request");
const toml = require("toml");

function process_local_tags(base_url, soup, tag_type, attr, name) {
    // for each tag of the specified type
    soup(tag_type).each(function (i, tag) {
        // get the url from the tag
        var url = tag.attribs[attr];
        // skip empty items or without a remote url
        if (url == null || !url.startsWith("http")) {
            return;
        }

        // get the filename
        var filename = url.split("/").pop();

        // if we don't have the file locally
        var local_filename = path.join("public", name, filename);

        if (!fs.existsSync(local_filename)) {
            // download the file
            console.log(`Downloading ${url}`);
            fs.writeFileSync(local_filename, request("GET", url).getBody());
        }

        if (base_url.endsWith("/")) {
            base_url = base_url.slice(0, -1);
        }

        // update the html tag
        tag.attribs[attr] = `${base_url}/${name}/${filename}`;
    });
}

function local_tags(base_url, soup) {
    // download javascript
    process_local_tags(base_url, soup, "script", "src", "js");
    // download css
    process_local_tags(base_url, soup, "link", "href", "css");
}

function main() {
    // read the toml config
    var config = toml.parse(fs.readFileSync("config.toml"), "utf8");
    var base_url = config.baseURL;

    if (process.env.HUGO_BASEURL) {
        base_url = process.env.HUGO_BASEURL;
        console.log(`Using HUGO_BASEURL: ${base_url}`)
    }

    // iterate through each html file in the public folder
    globSync("public/**/*.html").forEach((html_file) => {
        console.log(`Processing file ${html_file}`);

        // open the html file and parse it
        var html = fs.readFileSync(html_file, "utf8");
        var soup = cheerio.load(html);

        local_tags(base_url, soup);

        // write the file back
        fs.writeFileSync(html_file, soup.root().html());
    });

    // fix the web manifest icon src path
    var manifest = path.join("public", "favicons", "site.webmanifest");
    // load file
    var manifest_data = JSON.parse(fs.readFileSync(manifest, "utf8"));
    // apply to each icon element (thanks AI)
    manifest_data.icons = manifest_data.icons.map((icon) => {
        // src starts a with a /
        var src = icon.src;
        if (base_url != "/") {
            if (base_url.endsWith("/")) {
                src = `${base_url.slice(0, -1)}${src}`;
            } else {
                src = `${base_url}/${src}`;
            }
        }
        return {
            src: src,
            sizes: icon.sizes,
            type: icon.type
        };
    })
    // write out
    fs.writeFileSync(manifest, JSON.stringify(manifest_data, null, 4));
}

assert(process.cwd() == __dirname);
main();
