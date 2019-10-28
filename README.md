# svg-slimming-loader

* [webpack](https://github.com/webpack/webpack) 的 loader 插件，读取 svg 文件并使用 [svg-slimming](https://github.com/benboba/svg-slimming) 进行压缩

## 基本用法

基本用法需要依赖 file-loader，webpack.config.js 的参考配置如下：

    module.exports = {
        ...
        module: {
            rules: [
                ...
                {
                    test: /\.svg$/,
                    use: [
                        'file-loader',
                        'svg-slimming-loader'
                    ]
                }
                ...
            ]
        },
        ...
    }

## 导出到 js 模块

此用法不需要依赖 file-loader，需要在 options 中设置 isModule 为 true。webpack.config.js 的参考配置如下：

    module.exports = {
        ...
        module: {
            rules: [
                ...
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'svg-slimming-loader',
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

此用法将会把 svg 文件当作 js 模块导出

## 使用自定义优化规则

在 options 中配置 rules 即可，具体配置可参考 svg-slimming 的[说明文档](https://github.com/benboba/svg-slimming/blob/master/README.md)。webpack.config.js 的参考配置如下：

    module.exports = {
        ...
        module: {
            rules: [
                ...
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'svg-slimming-loader',
                            options: {
                                rules: {
                                    'shorten-decimal-digits': [true, 0, 0],
                                    'shorten-style-attr': [true, true]
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

此用法将会把 svg 文件当作 js 模块导出

## 使用优化规则配置文件

在 options 中配置 configPath，目标指向 json 格式的文件即可，同样支持 isModule 和 rules 两个属性：

    module.exports = {
        ...
        module: {
            rules: [
                ...
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'svg-slimming-loader',
                            options: {
                                configPath: './svg-slimming.config.json'
                            }
                        }
                    ]
                }
                ...
            ]
        },
        ...
    }

svg-slimming.config.json 的内容如下：

    {
        // "isModule": true,
        "rules": {
            "shorten-decimal-digits": [true, 0, 0],
            "shorten-style-attr": [true, true]
        }
    }

**注意，当 options 和 config 文件同时存在 isModule 和 rules 配置时，会以 options 的配置优先**
