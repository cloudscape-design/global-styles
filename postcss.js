// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import fs from 'node:fs';
import process from 'node:process';
import postcss from 'postcss';
import postcssUrl from 'postcss-url';
import postcssImport from 'postcss-import';

const input = 'src/index.css';
const output = 'lib/index.css';

async function convert() {
  const css = fs.readFileSync(input);
  const result = await postcss([postcssUrl({ url: 'inline' }), postcssImport()]).process(css, {
    from: input,
    to: output,
  });
  fs.writeFileSync(output, result.css);
}

convert().catch(error => {
  console.error(error);
  process.exit(1);
});
