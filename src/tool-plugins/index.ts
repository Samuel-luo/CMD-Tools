import printDirectoryStructure from "./print-directory-structure";

import type { Answers } from "inquirer";

export default {
	"print-directory-structure": printDirectoryStructure,
} as { [K: string]: (res: Answers) => any };
