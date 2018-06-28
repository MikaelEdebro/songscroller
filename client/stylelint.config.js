module.exports = {
  extends: [
    // Use the Standard config as the base
    // https://github.com/stylelint/stylelint-config-standard
    "stylelint-config-standard",
    // Override rules that would interfere with Prettier
    // https://github.com/shannonmoeller/stylelint-config-prettier
    "stylelint-config-prettier",
    // Override rules to allow linting of CSS modules
    // https://github.com/pascalduez/stylelint-config-css-modules
    "stylelint-config-css-modules"
  ],
  plugins: [],
  // Rule lists:
  // - https://stylelint.io/user-guide/rules/
  // - https://github.com/kristerkari/stylelint-scss#list-of-rules
  rules: {
    // Allow newlines inside class attribute values
    "string-no-newline": null,
    // Limit the number of universal selectors in a selector,
    // to avoid very slow selectors
    "selector-max-universal": 1,
    // Disallow allow global element/type selectors in scoped modules
    "selector-max-type": [1, { ignore: ["child", "descendant", "compounded"] }],
    "no-descending-specificity": null,
    // ===
    // PRETTIER
    // ===
    // HACK: to compensate for https://github.com/shannonmoeller/stylelint-config-prettier/issues/4
    // Modifying setting from Standard: https://github.com/stylelint/stylelint-config-standard/blob/7b76d7d0060f2e13a331806a09c2096c7536b0a6/index.js#L6
    "at-rule-empty-line-before": [
      "always",
      {
        except: ["blockless-after-same-name-blockless", "first-nested"],
        ignore: ["after-comment"],
        ignoreAtRules: ["else"]
      }
    ]
  }
};
