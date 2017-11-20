import getContent, { getHeaders, getIntro } from "./parseContent";

const a = "A".repeat(100);
const b = "B".repeat(100);
const c = "C".repeat(100);

it("should get content", () => {
  const body = `${a}<!-- more -->\n${b}\n${c}`;
  const input = `One: A\nTwo: B\n\n${body}`;

  expect(getContent(input)).toEqual({
    headers: { One: "A", Two: "B" },
    body: body,
    intro: a,
    raw: input
  });
});

it("should get intro with marker", () => {
  expect(getIntro("One\nTwo<!-- more -->Three")).toEqual("One\nTwo");
});

it("should get intro without marker", () => {
  const input = `${a}\n${b}\n${c}`;
  const output = `${a}\n${b}`;

  expect(getIntro(input)).toEqual(output);
});

it("should get headers", () => {
  expect(getHeaders("One: 1\nTwo: 2")).toEqual({ One: "1", Two: "2" });
});

it("should handle no headers", () => {
  expect(getHeaders("One\nTwo")).toEqual({});
});
