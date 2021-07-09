function makeBadge(str) {
  if (str !== "None")
    return `[![License: ${str}](https://img.shields.io/badge/License-${str}-brightgreen.svg)](https://opensource.org/licenses/${str})`;
}

function makeUsageBullets(arr) {
  console.log("making bullets");
  let str = "";
  arr.forEach((s) => {
    str = str.concat(`\n  * `, s);
  });
  console.log("made bullets: ", str);
  return str;
}

function makeMarkdown(data) {
  console.log(data);
  return `
  # ${data.title}

  ## Description
  
  ${data.description}

  ${makeBadge(data.license)}

  ## Table of Contents

  * [Installation](#installation)

  * [Usage](#usage)

  * [Contribute](#contribute)

  * [Questions](#questions)
  
  ### Installation

  Run this command to install necessary dependencies:

  \`\`\`
  ${data.installCmd}
  \`\`\`
  
  ### Usage

  ${makeUsageBullets(data.usageBullets)}

  Then run the command below to create your readme:

  \`\`\`
  ${data.runCmd}
  \`\`\`

  and this to test:

  \`\`\`
  ${data.testcmd}
  \`\`\`

  ### Contribute

  ${data.contribute}
  
  ### Questions

  Send questions to [${data.username}](https://github.com/${data.username})
  `;
}

module.exports = makeMarkdown;
