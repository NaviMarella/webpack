/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const InitFragment = require("../InitFragment");
const NullDependency = require("./NullDependency");

class HarmonyExportSpecifierDependency extends NullDependency {
	constructor(originModule, id, name) {
		super();
		this.originModule = originModule;
		this.id = id;
		this.name = name;
	}

	get type() {
		return "harmony export specifier";
	}

	getExports() {
		return {
			exports: [this.name],
			dependencies: undefined
		};
	}
}

HarmonyExportSpecifierDependency.Template = class HarmonyExportSpecifierDependencyTemplate {
	apply(dep, source) {}

	getInitFragments(dep, source, runtime) {
		return [new InitFragment(this.getContent(dep), 0)];
	}

	getContent(dep) {
		const used = dep.originModule.isUsed(dep.name);
		if (!used) {
			return `/* unused harmony export ${dep.name || "namespace"} */\n`;
		}

		const exportsName = dep.originModule.exportsArgument;

		return `/* harmony export (binding) */ __webpack_require__.d(${exportsName}, ${JSON.stringify(
			used
		)}, function() { return ${dep.id}; });\n`;
	}
};

module.exports = HarmonyExportSpecifierDependency;
