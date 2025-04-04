import fs from "fs";
import path from "path";

let res = "";

function analyze(filepath: string, suffix: string) {
	const isRoot = suffix.length === 0;
	const filename = path.basename(filepath);
	const isDir = fs.statSync(filepath).isDirectory();
	const files = isDir ? fs.readdirSync(filepath) : [];

	let suffixHead = "";

	if (!isRoot) {
		suffixHead = files && files.length !== 0 ? "┬ " : "─ ";
	}

	res += `${suffix}${suffixHead}${filename}\n`;

	let baseSuffix = suffix;

	if (!isRoot) {
		const isChildOfLastBranch = suffix.slice(-2) === "└─";
		baseSuffix = suffix.slice(0, -2) + (isChildOfLastBranch ? "  " : "│ ");
	}

	const nextBranch = baseSuffix + "├─";
	const lastBranch = baseSuffix + "└─";

	files.forEach((file, index) => {
		analyze(path.resolve(filepath, file), files.length - 1 === index ? lastBranch : nextBranch);
	});
}

export default (answers: any) => {
	const inputPath = answers["dir-path"];
	const isAbsolutePath = path.isAbsolute(inputPath);
	const processPath = process.cwd();
	const absolutePath = isAbsolutePath ? inputPath : path.resolve(processPath, inputPath);

	res = "";
	analyze(absolutePath, "");
	return res;
};
