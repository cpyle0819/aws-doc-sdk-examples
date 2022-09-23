import { useEffect, useState } from "react";
import { readFileSync } from "fs";
import { Converter } from "showdown";
import { join } from "path";

const converter = new Converter();

const component = () => {
  const [md, setMd] = useState("");

  useEffect(() => {
    const file = readFileSync(join(__dirname, "/../../README.md"), "utf-8");
    setMd(file);
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(md) }}></div>
  );
};

const RootPlugin = {
  linkText: "Welcome",
  fragment: "/",
  component,
};

export { RootPlugin };
