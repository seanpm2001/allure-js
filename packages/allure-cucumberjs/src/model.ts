import type { LabelName, LinkType } from "allure-js-commons";
import type { Config, LinkTemplateEntry } from "allure-js-commons/sdk/reporter";

export const ALLURE_SETUP_REPORTER_HOOK = "__allure_reporter_setup_hook__";

export type LabelConfig = {
  pattern: RegExp[];
  name: LabelName | string;
};

export type LinkConfigEntry = LinkTemplateEntry & {
  pattern: RegExp[];
};
export type LinkConfig = Record<LinkType, LinkConfigEntry> | Record<string, LinkConfigEntry>;

export interface AllureCucumberReporterConfig extends Omit<Config, "writer" | "links"> {
  testMode?: boolean;
  links?: LinkConfig;
  labels?: LabelConfig[];
}
