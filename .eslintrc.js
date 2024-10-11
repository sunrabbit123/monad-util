moudle.exports = {
    root: true,

    env: {
        es6: true,
        node : true,
        browser: true,
        jest:  true,
        "shared-node-brower" : true,
    },
    parser: "@typescript-eslint/parser",

    extends: ['eslint:recommended', "plugin:@typescript-eslint/recommended", "prettier", "plugin:jsdoc/recommended"],
    plugins: ["@typescript-eslint", "jsdoc"],
}