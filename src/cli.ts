#!/usr/bin/env node
import inquirer from "inquirer";
import plugins from "./tool-plugins";

import type { Answers } from "inquirer";

const ques = [
	{
		type: "list",
		name: "select-tool",
		message: "choose one tool you want to execute",
		choices: ["print-directory-structure"],
	},
	{
		when: (res: any) => res["select-tool"] === "print-directory-structure",
		type: "input",
		name: "dir-path",
		message: "input your file path:",
		default: "./",
	},
] as const;

inquirer
	.prompt(ques)
	.then(async (res: Answers) => {
		const handler = plugins[res["select-tool"]] || (() => {});
		await handler(res);
	})
	.catch((err) => console.log(err));
