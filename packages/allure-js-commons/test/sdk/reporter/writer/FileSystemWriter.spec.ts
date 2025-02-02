import { randomUUID } from "node:crypto";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import * as os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ContentType } from "../../../../src/model.js";
import { ReporterRuntime } from "../../../../src/sdk/reporter/ReporterRuntime.js";
import type { Config } from "../../../../src/sdk/reporter/types.js";
import { FileSystemWriter } from "../../../../src/sdk/reporter/writer/FileSystemWriter.js";

describe("FileSystemWriter", () => {
  it("should save attachment from path", () => {
    const tmp = mkdtempSync(path.join(os.tmpdir(), "foo-"));
    const allureResults = path.join(tmp, "allure-results");

    const config: Config = {
      writer: new FileSystemWriter({
        resultsDir: allureResults,
      }),
    };

    const runtime = new ReporterRuntime(config);

    const from = path.join(tmp, "test-attachment.txt");
    const data = "test content";

    writeFileSync(from, data, "utf8");

    runtime.startTest({ name: "test" });
    runtime.writeAttachmentFromPath("Attachment", from, { contentType: ContentType.TEXT });
    runtime.stopTest();
    runtime.writeTest();

    const resultFiles = readdirSync(allureResults);

    expect(resultFiles).toHaveLength(2);

    const attachmentResultPath = resultFiles.find((file) => file.includes("attachment"))!;

    const actualContent = readFileSync(path.join(allureResults, attachmentResultPath));

    expect(actualContent.toString("utf8")).toBe(data);
  });

  it("creates allure-report nested path every time writer write something", () => {
    const tmpReportPath = path.join(os.tmpdir(), `./allure-testing-dir/${randomUUID()}`);
    const config: Config = {
      writer: new FileSystemWriter({
        resultsDir: tmpReportPath,
      }),
    };
    const runtime = new ReporterRuntime(config);

    runtime.startTest({});
    runtime.stopTest();
    runtime.writeTest();
    rmSync(tmpReportPath, { recursive: true });
    runtime.startTest({});
    runtime.stopTest();
    runtime.writeTest();

    expect(existsSync(tmpReportPath)).toBe(true);
  });
});
