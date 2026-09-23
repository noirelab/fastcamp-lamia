// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { useMetricsStore } from "./store";

const metric = { label: "Poles", value: 10, caption: "Max Verstappen" };

describe("metrics store", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useMetricsStore.setState({ customMetrics: [] });
  });

  it("adiciona métricas com id único e persiste", () => {
    useMetricsStore.getState().addMetric(metric);
    useMetricsStore.getState().addMetric(metric);

    const [first, second] = useMetricsStore.getState().customMetrics;

    expect(first.id).not.toBe(second.id);
    expect(window.localStorage.getItem("f1-custom-metrics")).toContain("Poles");
  });

  it("remove só a métrica do id informado", () => {
    useMetricsStore.getState().addMetric(metric);
    useMetricsStore.getState().addMetric({ ...metric, label: "Voltas" });

    const [first] = useMetricsStore.getState().customMetrics;
    useMetricsStore.getState().removeMetric(first.id);

    expect(useMetricsStore.getState().customMetrics.map((item) => item.label)).toEqual(["Voltas"]);
  });
});
