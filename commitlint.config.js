module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [2, "always", ["sentence-case"]],
    "body-max-line-length": [2, "always", 300],
  },
};
