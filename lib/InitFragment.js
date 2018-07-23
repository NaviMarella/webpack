/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Florent Cailhol @ooflorent
*/

"use strict";

class InitFragment {
	static create(content, order) {
		return new InitFragment(content, order);
	}

	constructor(content, order) {
		this.content = content;
		this.order = order;
	}
}

module.exports = InitFragment;
