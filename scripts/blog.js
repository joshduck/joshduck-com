const fs = require("fs");
const path = require("path");
const glob = require("glob");
const markdown = require("markdown").markdown;

const DOCUMENT_PATTERN = /^([\s\S]*?)\n\n([\s\S]*)$/;
const METADATA_PATTERN = /(.*?):\s*(.*)/;
const INTRO_TOKEN = "<!--more-->";
const INTRO_PATTERN = /^([\s\S]{120,}?)\n/;

const readContent = path => {
  const content = fs.readFileSync(path).toString();
  const parts = content.match(DOCUMENT_PATTERN);

  if (parts) {
    const headers = getHeaders(parts[1]);
    const body = parts[2];
    const intro = getIntro(parts[2]);

    return { path, headers, intro, body };
  }
};

const getIntro = text => {
  const split = text.split(INTRO_TOKEN);
  if (split.length > 1) {
    return split[0];
  }

  const match = text.match(INTRO_PATTERN);
  if (match) {
    return match[1];
  }

  return text;
};

const getHeaders = text => {
  const out = {};
  text.split("\n").forEach(line => {
    const match = line.trim().match(METADATA_PATTERN);
    if (match) {
      out[match[1].trim()] = match[2].trim();
    }
  });
  return out;
};

const pattern = path.join(__dirname, "../public/**/*.md");
glob(pattern, {}, (err, files) => {
  files.forEach(file => {
    const content = readContent(file);
    if (content) {
      console.log(content.headers);
      console.log(content.intro);
      console.log(markdown.toHTML(content.intro));
      console.log();
    }
  });
});
