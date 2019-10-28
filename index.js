const SvgSlimming = require('svg-slimming');
const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');

const fs = require('fs');
const path = require('path');

const schema = {
	type: 'object',
	properties: {
		isModule: {
			type: 'boolean'
		},
		rules: {
			type: 'object'
		},
		configPath: {
			type: 'string'
		}
	},
	additionalProperties: false
};

module.exports = function(source) {
	const callback = this.async();
	let options = loaderUtils.getOptions(this) || {};
	validateOptions(schema, options, 'Svg Slimming Loader');

	const rules = {};

	if (options.configPath) {
		try {
			const configText = fs.readFileSync(path.resolve(options.configPath), 'utf8');
			const configJSON = JSON.parse(configText);
			options.rules = Object.assign({}, configJSON.rules, options.rules);
			options = Object.assign({}, configJSON, options);
		} catch (err) {
			callback(err);
			return;
		}
	}

	if (options.rules && typeof options.rules === 'object') {
		Object.assign(rules, options.rules);
	}

	SvgSlimming(source, rules).then(res => {
		if (options.isModule) {
			callback(null, `module.exports=${JSON.stringify(res)}`);
		} else {
			callback(null, res);
		}
	}, err => {
		callback(err);
	});
};