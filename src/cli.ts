#!/usr/bin/env node
import inquirer from "inquirer";
import { spawn } from "child_process";

const ques = [
	{
		type: "list",
		name: "select-tool",
		message: "choose one tool you want to execute",
		choices: ["print-directory-structure"],
	},
];

inquirer
	.prompt(ques)
	.then((res) => {
		spawn("node", [`./tool-plugins/${res["select-tool"]}.js`], {
			stdio: "inherit",
		});
	})
	.catch((err) => console.log(err));
