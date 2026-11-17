"use client";

import { useState } from "react";

/**
 * Take-home pay estimate for early earners.
 * UPDATE EACH APRIL: Scottish income tax bands and National Insurance change with each budget.
 * Band widths are on taxable income above the personal allowance.
 */
export const TAX_YEAR = "2025/26";
const PERSONAL_ALLOWANCE = 12570;
const BANDS: [number, number][] = [
  [2827, 0.19], // starter
  [12094, 0.2], // basic
  [16171, 0.21], // intermediate
  [31338, 0.42], // higher
  [50140, 0.45], // advanced
  [Infinity, 0.48], // top
];
const NI = { lower: 12570, upper: 50270, main: 0.08, above: 0.02 };
const PENSION = { lower: 6240, upper: 50270, rate: 0.05 };

function incomeTax(gross: number) {
  const allowance = gross > 100000 ? Math.max(0, PERSONAL_ALLOWANCE - (gross - 100000) / 2) : PERSONAL_ALLOWANCE;
  let left = Math.max(0, gross - allowance);
  let tax = 0;
  for (const [width, rate] of BANDS) {
    const slice = Math.min(left, width);
    tax += slice * rate;
    left -= slice;
    if (left <= 0) break;
  }
  return tax;
}
const nationalInsurance = (g: number) => Math.max(0, Math.min(g, NI.upper) - NI.lower) * NI.main + Math.max(0, g - NI.upper) * NI.above;
const pension = (g: number) => Math.max(0, Math.min(g, PENSION.upper) - PENSION.lower) * PENSION.rate;
const gbp = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;

export default function PayCalculator() {
  const [salary, setSalary] = useState(20000);
  const [withPension, setWithPension] = useState(true);

  const pen = withPension ? pension(salary) : 0;
  const tax = incomeTax(salary - pen);
  const ni = nationalInsurance(salary);
  const net = Math.max(0, salary - tax - ni - pen);
  const parts: [number, string][] = [
    [net, "var(--leaf)"],
    [tax, "var(--lavender)"],
    [ni, "#d8a33a"],
    [pen, "#6fa0c8"],
  ];

  return (
    <div className="calc">
      <label htmlFor="salary">
        Yearly salary (£)
        <input id="salary" type="number" min={0} max={150000} step={500} inputMode="numeric" value={salary} onChange={(e) => setSalary(Math.max(0, Number(e.target.value) || 0))} />
      </label>
      <input type="range" id="salary-range" min={8000} max={60000} step={500} value={Math.min(60000, Math.max(8000, salary))} onChange={(e) => setSalary(Number(e.target.value))} aria-label="Yearly salary slider" />
      <label className="toggle" htmlFor="pension">
        <input id="pension" type="checkbox" checked={withPension} onChange={(e) => setWithPension(e.target.checked)} /> Workplace pension at 5%
      </label>
      <div className="take-home">
        <b>{gbp(net / 12)}</b>
        <span>a month take-home</span>
      </div>
      <div className="stackbar" aria-hidden="true">
        {salary > 0 && parts.map(([value, colour], i) => <i key={i} style={{ width: `${(value / salary) * 100}%`, background: colour }} />)}
      </div>
      <div className="legend">
        <span style={{ ["--c" as string]: "var(--leaf)" }}>Take-home</span>
        <span style={{ ["--c" as string]: "var(--lavender)" }}>Income tax</span>
        <span style={{ ["--c" as string]: "#d8a33a" }}>NI</span>
        <span style={{ ["--c" as string]: "#6fa0c8" }}>Pension</span>
      </div>
      <table className="breakdown">
        <tbody>
          {(
            [
              ["Salary", salary],
              ["Income tax", -tax],
              ["National Insurance", -ni],
              ["Pension", -pen],
              ["Take-home per year", net],
              ["Take-home per month", net / 12],
            ] as [string, number][]
          ).map(([label, value], i) => (
            <tr key={label} className={i >= 4 ? "total" : undefined}>
              <td>{label}</td>
              <td>{value < 0 ? "−" : ""}{gbp(Math.abs(value))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
