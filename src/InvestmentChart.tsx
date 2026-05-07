import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

type ChartPoint = {
  month: string;
  safe: number;
  pyramid: number;
  riskZone: number;
};

function formatRub(value: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(value);
}

function InvestmentChart({ data }: { data: ChartPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <ComposedChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: "#8ea09b", fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tickFormatter={(value) => `${Math.round(Number(value) / 1000)}к`}
          tick={{ fill: "#8ea09b", fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          width={42}
        />
        <Tooltip
          formatter={(value) => formatRub(Number(value ?? 0))}
          contentStyle={{
            background: "#0d1518",
            border: "1px solid rgba(51,245,173,0.26)",
            borderRadius: 8,
            color: "#f6fff9"
          }}
        />
        <Legend wrapperStyle={{ color: "#b8c7c2", fontSize: 13 }} />
        <Area
          type="monotone"
          dataKey="riskZone"
          name="Зона обещаний"
          fill="rgba(255,55,95,0.09)"
          stroke="transparent"
        />
        <Line type="monotone" dataKey="safe" name="Вклад / ОФЗ" stroke="#33f5ad" strokeWidth={3} dot={false} />
        <Line
          type="monotone"
          dataKey="pyramid"
          name="FTX-сценарий"
          stroke="#ff375f"
          strokeWidth={3}
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default InvestmentChart;
