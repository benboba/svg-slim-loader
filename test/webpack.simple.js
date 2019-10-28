const path = require('path');

module.exports = {
    mode: 'production',
    context: __dirname,
    entry: './entry.js',
    output: {
        path: path.resolve('output'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: [
                    'file-loader',
                    {
                        loader: path.resolve(__dirname, '../index.js')
                    }
                ]
            }
        ]
    }
};
