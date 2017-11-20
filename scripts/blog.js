const fs = require("fs");
const path = require("path");
const glob = require("glob");
const markdown = require("markdown").markdown;
const dateformat = require("dateformat");
const parseContent = require("../src/utils/parseContent");

const PUBLIC_PATH = path.join(__dirname, "../public/");
const BLOG_PATTERN = path.join(PUBLIC_PATH, "**/*.md");

const getContentPath = file =>
  path.relative(PUBLIC_PATH, file).replace(/\\/g, "/");

const getPermalinkPath = (file, date) => {
  const slug = path.basename(file).replace(/\..*/, "");
  const df = dateformat(date, "yyyy/mm/dd");
  return `${df}/${slug}/`;
};

glob(BLOG_PATTERN, {}, (err, files) => {
  const manifest = files.map(file => {
    const raw = fs.readFileSync(file).toString();
    const content = parseContent(raw);
    const date = new Date(content.headers.date);

    return {
      permalink: getPermalinkPath(file, date),
      title: content.headers.title,
      date: date.toISOString(),
      markdown: getContentPath(file),
      intro: content.intro
    };
  });

  console.log(JSON.stringify(manifest, null, 2));
});
