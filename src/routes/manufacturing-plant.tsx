import * as d3 from "d3";
import { useEffect, useState } from "react";
import GroupedBarChart from "../components/grouped-bar-chart";
import PieChart from "../components/pie-chart";

type ManufacturingPlantData = {
  machine: string;
  firstShift: number;
  secondShift: number;
  thirdShift: number;
};

type PerformanceData = {
  shift: string;
  count: number;
};

export default function ManufacturingPlant() {
  const [shift, setShift] =
    useState<d3.DSVParsedArray<ManufacturingPlantData>>();
  const [performance, setPerformance] =
    useState<d3.DSVParsedArray<PerformanceData>>();

  useEffect(() => {
    d3.csv("/data/parts_by_shift.csv", (d) => ({
      machine: d["Machine"],
      firstShift: +d["First Shift"],
      secondShift: +d["Second Shift"],
      thirdShift: +d["Third Shift"],
    })).then((data) => setShift(data));
  }, []);

  useEffect(() => {
    d3.csv("/data/shift_performance.csv", (d) => ({
      shift: d["shift id"],
      count: +d["partcount"],
    })).then((data) => setPerformance(data));
  }, []);

  return (
    <div className="flex flex-wrap gap-5 items-center h-screen justify-between">
      {shift && (
        <GroupedBarChart
          title="Parts by Shift"
          data={shift.map((s) => ({
            name: s.machine,
            values: [s.firstShift, s.secondShift, s.thirdShift],
          }))}
          marginLeft={80}
          marginTop={40}
        />
      )}
      {performance && (
        <PieChart
          title="Performance by Shift"
          data={performance.map((p) => ({ label: p.shift, value: p.count }))}
        />
      )}
    </div>
  );
}
