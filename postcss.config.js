module.exports = {
    plugins: [
        require("postcss-uncss")({
                html: ['./public/*.html'],
                ignore: ['.commandListItem', '.commandListItemSpan', '.commandListItemDiv']
            }
        )
    ]
}