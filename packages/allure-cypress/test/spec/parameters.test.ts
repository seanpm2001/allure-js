import { expect, it } from "vitest";
import { runCypressInlineTest } from "../utils";

it("parameters", async () => {
  const { tests } = await runCypressInlineTest(
    `
    import { parameter } from "allure-cypress";

    it("adds parameter", () => {
      parameter("foo", "bar", {
        mode: "hidden",
        excluded: false
      })
    });
    `,
  );

  expect(tests).toHaveLength(1);
  expect(tests[0].parameters).toContainEqual({
    name: "foo",
    value: "bar",
    mode: "hidden",
    excluded: false,
  })
});
