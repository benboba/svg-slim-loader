const SvgSlim = require('svg-slim');
const loaderUtils = require('loader-utils');
const { validate } = require('schema-utils');

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
		params: {
			type: 'object'
		},
		browsers: {
			type: 'array',
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
	validate(schema, options, 'Svg Slim Loader');

	const config = {};

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
		config.rules = options.rules;
	}

	if (options.params && typeof options.params === 'object') {
		config.params = options.params;
	}

	if (options.browsers && Array.isArray(options.browsers)) {
		config.browsers = options.browsers;
	}

	SvgSlim(source, config).then(res => {
		if (options.isModule) {
			callback(null, `module.exports=${JSON.stringify(res)}`);
		} else {
			callback(null, res);
		}
	}, err => {
		callback(err);
	});
};