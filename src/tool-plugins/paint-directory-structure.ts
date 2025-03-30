import fs from "fs";
import inquirer from "inquirer";

const ques = [
	{
		type: "input",
		name: "file-path",
		message: "input your file path:",
		default: "./",
	},
];

inquirer
	.prompt(ques)
	.then((res) => {
		const dirJson = JSON.parse(fs.readFileSync(res.filePath).toString() || "{}");
		let result = "";

		function analyze(dirStruct, isSingleRoot = false, basic = 0) {
			if (isSingleRoot) basic--;
			let basicStr = "",
				i = 0;
			while (i < basic) {
				basicStr += "|   ";
				i++;
			}
			for (let dir of dirStruct) {
				result += `${basicStr}${basic === -1 ? "" : "|-- "}${dir.name}\n`;
				dir.children && analyze(dir.children, false, basic + 1);
			}
		}

		analyze(dirJson, dirJson.length === 1);

		console.log(result);
	})
	.catch((err) => {
		console.log(err);
	});
