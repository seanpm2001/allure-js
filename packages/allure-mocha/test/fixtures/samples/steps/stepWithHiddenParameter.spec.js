// cjs: const { it } = require("mocha");
// cjs: const { step } = require("allure-js-commons");
// esm: import { it } from "mocha";
// esm: import { step } from "allure-js-commons";

it("a step with a hidden parameter", async () => {
  await step("foo", async (ctx) => {
    ctx.parameter("bar", "baz", "hidden");
  });
});
