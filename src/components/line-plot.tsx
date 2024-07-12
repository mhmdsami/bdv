import * as d3 from "d3";
import { useEffect } from "react";

interface LinePlotProps {
  data: number[];
  title: string;
  xStart?: number;
  width?: number;
  height?: number;
  marginTop?: number;
  marginLeft?: number;
  marginBottom?: number;
  marginRight?: number;
}

export default function LinePlot({
  data,
  title,
  xStart = 0,
  width = 640,
  height = 400,
  marginTop = 20,
  marginLeft = 20,
  marginBottom = 20,
  marginRight = 20,
}: LinePlotProps) {
  const x = d3.scaleLinear(
    [xStart, xStart + data.length],
    [marginLeft, width - marginRight]
  );
  const y = d3.scaleLinear(d3.extent(data) as [number, number], [
    height - marginBottom,
    marginTop,
  ]);
  const line = d3.line((_, i) => x(xStart + i), y);

  useEffect(() => {
    const svg = d3.select("svg");

    svg.selectAll("*").remove();

    svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-width", 1.5)
      .attr("d", line(data))
      .attr("stroke-dasharray", function () {
        const length = this.getTotalLength();
        return length + " " + length;
      })
      .attr("stroke-dashoffset", function () {
        const length = this.getTotalLength();
        return length;
      })
      .transition()
      .duration(2000)
      .attr("stroke-dashoffset", 0);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(d3.axisLeft(y));

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", marginTop / 2)
      .attr("text-anchor", "middle")
      .text(title);

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (_, i) => x(xStart + i))
      .attr("cy", (d) => y(d))
      .attr("r", 4)
      .attr("fill", "currentColor");
  }, [data]);

  return <svg width={width} height={height} />;
}
