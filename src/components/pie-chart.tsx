import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface PieChartProps {
  title: string;
  data: Array<{ label: string; value: number }>;
  width?: number;
  height?: number;
}

export default function PieChart({
	title,
  data,
  width = 640,
  height = 400,
}: PieChartProps) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    const pie = d3.pie();
    const arc = d3.arc();

    const arcs = pie(data.map((d) => d.value));

    svg
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .selectAll()
      .data(arcs)
      .join("path")
      .attr(
        "d",
        (d) =>
          arc({
            innerRadius: 0,
            outerRadius: 150,
            startAngle: d.startAngle,
            endAngle: d.endAngle,
          }) ?? ""
      )
      .attr("fill", (_, i) => d3.schemeCategory10[i])
      .attr("opacity", 0)
      .transition()
      .duration(1000)
      .attr("opacity", 1);

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .text(title);
  }, []);

  return <svg ref={ref} height={height} width={width} />;
}
