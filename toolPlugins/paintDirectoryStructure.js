const fs = require("fs");
const inquirer = require("inquirer");

const ques = [
  {
    type: 'input',
    name: 'filePath',
    message: 'input your file path (default is relative root dir) [file need json type]:',
    default: './directoryTemplate.json'
  }
]

inquirer.prompt(ques).then((res) => {
  const dirJson = JSON.parse(fs.readFileSync(res.filePath) || "{}");
  let result = '';

  function analyze(dirStruct, isSingleRoot = false, basic = 0) {
    if (isSingleRoot) basic--;
    let basicStr = "", i = 0;
    while (i < basic) {
      basicStr += "|   ";
      i++;
    }
    for (let dir of dirStruct) {
      result += `${basicStr}${basic === -1 ? '' : '|-- '}${dir.name}\n`;
      dir.children && analyze(dir.children, false, basic + 1);
    }
  }

  analyze(dirJson, dirJson.length === 1);

  console.log(result);
}).catch(err => {
  console.log(err);
})