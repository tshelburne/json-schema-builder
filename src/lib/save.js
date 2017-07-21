import { writeFile, writeFileSync } from 'fs';
import { join } from 'path';

function save() {
	const schema = arguments[0]
	const context = typeof arguments[1] == 'object' ? arguments[1] : null;
	const callback = arguments.length && typeof arguments[arguments.length - 1] == 'function' ? arguments[arguments.length - 1] : null;

	if (callback && arguments.length == 2 || !arguments.length) throw new Error('missing filename argument');

	const begin = context ? 2 : 1;
	const end = callback ? arguments.length - 1 : arguments.length;
	const args = Array.prototype.slice.call(arguments, begin, end);
	const pathname = join(...args);
	const json = JSON.stringify(schema.json(context), null, 2);

	callback ? writeFile(pathname, json, 'utf8', callback) : writeFileSync(pathname, json, 'utf8');
}

export default save