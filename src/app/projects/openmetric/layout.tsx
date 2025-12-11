import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenMetric ETL Platform | Resume",
  description: "End-to-end data pipeline with ETL orchestration, data quality validation, and interactive analytics dashboards",
};

// Nested layout for the OpenMetric project page
export default function OpenMetricLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
