module.exports = {
  parser: "babel-eslint",
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  rules: {
    "space-before-function-paren": 0,
    quotes: [2, "double", "avoid-escape"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "react/destructuring-assignment": 0,
    "no-console": 2,
    "arrow-parens": 0,
    "react/jsx-filename-extension": ["warn", { extensions: [".ts", ".tsx"] }],
    "import/extensions": 0,
    "react/prop-types": 0,
    "jsx-a11y/anchor-is-valid": ["error", {
      components: ["Link"],
      specialLink: ["to"],
    }],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/prefer-default-export": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "no-nested-ternary": 0,
    "one-var": ["warn", { initialized: "never", uninitialized: "always" }],
    "one-var-declaration-per-line": ["error", "initializations"],
    "react/sort-comp": ["error", {
      order: [
        "instance-variables",
        "static-methods",
        "lifecycle",
        "everything-else",
        "render",
      ],
    },
    ],
    radix: [2, "as-needed"],
    "react/prefer-stateless-function": [2, { ignorePureComponents: false }],
    "import/order": ["error", {
      "newlines-between": "always",
      groups: [
        ["external", "builtin"],
        ["internal"],
        ["parent", "sibling", "index"],
      ],
    }],
    "no-multiple-empty-lines": [2, { max: 1 }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never"
      }
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-filename-extension": [1, { "extensions": [".tsx"] }],
    "import/prefer-default-export": "off",
    "react/prop-types": "off",
    "no-unused-expressions": "off",
    "react/jsx-props-no-spreading": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        "allowExpressions": true
      }
    ],
    "@typescript-eslint/no-empty-interface": "off"
  },
  settings: {
    "import/resolver": {
      typescript: {}
    }
  }
};
