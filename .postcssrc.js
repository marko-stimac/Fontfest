// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
	"from": "/path/to/src.sss",
	"to": "/path/to/dest.css",
	"plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "postcss-import": {},
    "autoprefixer": {}
}
}
