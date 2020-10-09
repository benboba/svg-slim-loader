# svg-slim-loader

[webpack](https://github.com/webpack/webpack) loader plugin, read svg file and use [svg-slim](https://github.com/benboba/svg-slim) for compression

## Basic usage

Basic usage depends on file-loader. The reference configuration of webpack.config.js is as follows:
```js
module.exports = {
    ...
    module: {
        rules: [
            ...
            {
                test: /\.svg$/,
                use: [
                    'file-loader',
                    'svg-slim-loader'
                ]
            }
            ...
        ]
    },
    ...
}
```

## Export to js module

This usage does not need to rely on file-loader, you need to set isModule to true in options. The reference configuration of webpack.config.js is as follows:
```js
module.exports = {
    ...
    module: {
        rules: [
            ...
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-slim-loader',
                        options: {
                            isModule: true
                        }
                    }
                ]
            }
            ...
        ]
    },
    ...
}
```

This usage will export the svg file as a js module

## Use custom optimization rules

Just configure rules in options. For detailed configuration, please refer to [documentation of svg-slim](https://github.com/benboba/svg-slim/blob/master/README.md). The reference configuration of webpack.config.js is as follows:
```js
module.exports = {
    ...
    module: {
        rules: [
            ...
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-slim-loader',
                        options: {
                            rules: {
                                'shorten-decimal-digits': true,
                                'shorten-style-attr': true
                            },
                            params: {
                                sizeDigit: 2,
                                angelDigit: 2
                            }
                        }
                    }
                ]
            }
            ...
        ]
    },
    ...
}
```

## Use Optimization Rule Configuration File

Configure configPath in options, the target can be a file in json format. It also supports the isModule and rules attributes:
```js
module.exports = {
    ...
    module: {
        rules: [
            ...
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-slim-loader',
                        options: {
                            configPath: './svg-slim.config.json'
                        }
                    }
                ]
            }
            ...
        ]
    },
    ...
}
```

The svg-slim.config.json reference is as follows:
```js
{
    "isModule": true,
    "rules": {
        "shorten-decimal-digits": [true, 0, 0],
        "shorten-style-attr": [true, true]
    }
}
```

**Note that when options and config files have both isModule and rules configurations, the options configuration takes precedence**
