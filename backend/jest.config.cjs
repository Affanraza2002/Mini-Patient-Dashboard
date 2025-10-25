// jest.config.cjs
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleFileExtensions: ["js", "json", "node"],
  // Optionally enable verbose logging:
  // verbose: true
};