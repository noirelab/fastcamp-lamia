import { describe, expect, it } from "vitest";
import { buildSeasonLeader, buildSeasonMetrics, fetchDashboardData, seasonRaces } from "./mock";

describe("buildSeasonMetrics", () => {
  it("calcula vitórias, líder e vantagem até a rodada 5", () => {
    const [wins, leader, gap] = buildSeasonMetrics(seasonRaces.slice(0, 5));

    expect(wins).toMatchObject({ value: 3, caption: "Lewis Hamilton" });
    expect(leader.value).toBe(105);
    expect(leader.caption).toContain("Max Verstappen");
    expect(gap).toMatchObject({ value: 4, caption: "sobre Lewis Hamilton" });
  });

  it("fecha a temporada com os totais da classificação final", () => {
    const [wins, leader, gap] = buildSeasonMetrics(seasonRaces);

    expect(wins).toMatchObject({ value: 10, caption: "Max Verstappen" });
    expect(leader.value).toBe(395.5);
    expect(gap.value).toBe(8);
  });
});

describe("buildSeasonLeader", () => {
  it("usa o líder da rodada, não o campeão final", () => {
    expect(buildSeasonLeader(seasonRaces.slice(0, 11))).toMatchObject({
      driver: "Lewis Hamilton",
      team: "Mercedes",
      points: 195,
    });
  });

  it("termina com o campeão da temporada", () => {
    expect(buildSeasonLeader(seasonRaces)).toMatchObject({
      driver: "Max Verstappen",
      team: "Red Bull Racing",
      points: 395.5,
    });
  });
});

describe("fetchDashboardData", () => {
  it("devolve os dados até a rodada pedida, com a corrida mais recente primeiro", async () => {
    const data = await fetchDashboardData(13);

    expect(data.round).toBe(13);
    expect(data.pointsEvolution).toHaveLength(13);
    expect(data.lastRaces[0].name).toBe("GP da Holanda");
    expect(data.seasonLeader).toMatchObject({ driver: "Max Verstappen", points: 224.5 });
  });

  it("não passa da última rodada", async () => {
    const data = await fetchDashboardData(99);

    expect(data.round).toBe(data.totalRounds);
  });
});
