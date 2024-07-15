import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface GroupedBarChartProps {
  title: string;
  data: Array<{ name: string; values: Array<number> }>;
  width?: number;
  height?: number;
  marginTop?: number;
  marginLeft?: number;
  marginBottom?: number;
  marginRight?: number;
}

export default function GroupedBarChart({
  title,
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginLeft = 20,
  marginBottom = 20,
  marginRight = 20,
}: GroupedBarChartProps) {
  const ref = useRef<SVGSVGElement>(null);

  const fx = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([marginLeft, width - marginRight]);

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, fx.bandwidth()])
    .padding(0.2);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => Math.max(...d.values)) ?? 0])
    .rangeRound([height - marginBottom, marginTop]);

  const transpose = (a: Array<Array<number>>) =>
    a[0].map((_, c) => a.map((r) => r[c]));

  useEffect(() => {
    const svg = d3.select(ref.current);

    const values = transpose(data.map((d) => d.values));

    Array.from({ length: values.length }, (_, i) => {
      svg
        .selectAll()
        .data(data)
        .join("rect")
        .attr("x", (d) => (fx(d.name) || 0) + i * x.bandwidth())
        .attr("y", (d) => y(d.values[i]))
        .attr("width", x.bandwidth())
        .attr("height", (d) => y(0) - y(d.values[i]))
        .attr("fill", d3.schemeCategory10[i])
        .attr("opacity", 0)
        .transition()
        .duration(1000)
        .attr("opacity", 1);
    });

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", marginTop / 2)
      .attr("text-anchor", "middle")
      .text(title);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(d3.axisBottom(fx));

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(d3.axisLeft(y));
  }, []);

  return <svg ref={ref} width={width} height={height} />;
}
