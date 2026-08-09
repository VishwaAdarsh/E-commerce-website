"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, TrendingUp, Package, AlertTriangle, ArrowRight } from "lucide-react";

// 1. Revenue Line & Area Chart (SVG Vector)
export function RevenueLineChart({ data }: { data: { label: string; revenue: number; orders: number }[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) return <div className="text-xs text-[#6F6861] py-12 text-center">No revenue data available</div>;

  const maxRev = Math.max(...data.map((d) => d.revenue), 1000);
  const width = 500;
  const height = 180;
  const padding = 30;

  const points = data.map((d, i) => {
    const x = padding + (i * (width - 2 * padding)) / Math.max(1, data.length - 1);
    const y = height - padding - (d.revenue / maxRev) * (height - 2 * padding);
    return { x, y, label: d.label, revenue: d.revenue, orders: d.orders };
  });

  const pathD = points.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), "");
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className="space-y-4">
      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48 overflow-visible">
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A56B4F" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#A56B4F" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          {[0, 0.33, 0.66, 1].map((pct, idx) => (
            <line
              key={idx}
              x1={padding}
              y1={padding + pct * (height - 2 * padding)}
              x2={width - padding}
              y2={padding + pct * (height - 2 * padding)}
              stroke="#E6DED5"
              strokeDasharray="3 3"
            />
          ))}

          {/* Gradient Area Fill */}
          <path d={areaD} fill="url(#revGrad)" />

          {/* Line Path */}
          <path d={pathD} fill="none" stroke="#A56B4F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Interactive Point Nodes */}
          {points.map((p, i) => (
            <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
              <circle cx={p.x} cy={p.y} r={hoveredIdx === i ? "6" : "4"} fill="#171310" stroke="#FAF7F2" strokeWidth="2" />
            </g>
          ))}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIdx !== null && (
          <div
            className="absolute bg-[#171310] text-white p-2.5 rounded-xl shadow-card text-[11px] pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-2 z-20"
            style={{
              left: `${(points[hoveredIdx].x / width) * 100}%`,
              top: `${(points[hoveredIdx].y / height) * 100}%`,
            }}
          >
            <div className="font-bold">{points[hoveredIdx].label}</div>
            <div className="text-[#A56B4F]">Revenue: ₹{points[hoveredIdx].revenue.toLocaleString()}</div>
            <div className="text-[10px] text-[#E6DED5]">Orders: {points[hoveredIdx].orders}</div>
          </div>
        )}
      </div>

      {/* Axis Labels */}
      <div className="flex justify-between px-2 text-[10px] font-bold text-[#6F6861] uppercase tracking-wider">
        {data.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}

// 2. Order Status Donut Chart (SVG Segment Calculation)
export function OrderStatusDonutChart({ data }: { data: { status: string; count: number; percentage: number; color: string }[] }) {
  let cumulative = 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center relative py-2">
        <svg viewBox="0 0 100 100" className="w-36 h-36 transform -rotate-90">
          {data.map((seg, idx) => {
            const strokeDasharray = `${seg.percentage} ${100 - seg.percentage}`;
            const strokeDashoffset = -cumulative;
            cumulative += seg.percentage;

            return (
              <circle
                key={idx}
                cx="50"
                cy="50"
                r="15.91549430918954"
                fill="transparent"
                stroke={seg.color}
                strokeWidth="10"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500 hover:opacity-80"
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-lg font-extrabold text-[#181512]">{data.reduce((sum, d) => sum + d.count, 0)}</span>
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#6F6861]">Total Orders</span>
        </div>
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E6DED5] text-xs">
        {data.map((seg, idx) => (
          <div key={idx} className="flex items-center justify-between p-1.5 bg-[#FAF7F2] rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
              <span className="font-semibold text-[#181512] text-[11px]">{seg.status}</span>
            </div>
            <span className="font-bold text-[#6F6861] text-[10px]">{seg.count} ({seg.percentage}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. Category Revenue Bar Chart
export function CategoryRevenueBarChart({ data }: { data: { category: string; ordersCount: number; unitsSold: number; revenue: number }[] }) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1000);

  return (
    <div className="space-y-3 pt-2">
      {data.map((cat, idx) => {
        const pct = Math.round((cat.revenue / maxRevenue) * 100);
        return (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-[#181512]">
              <span>{cat.category}</span>
              <span>₹{cat.revenue.toLocaleString()}</span>
            </div>
            <div className="w-full bg-[#FAF7F2] h-3 rounded-full overflow-hidden border border-[#E6DED5]">
              <div
                className="bg-[#171310] h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#6F6861]">
              <span>{cat.ordersCount} orders</span>
              <span>{cat.unitsSold} units sold</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 4. Top Selling Products Horizontal Bar Chart
export function TopProductsBarChart({ data }: { data: { id: string; name: string; sku: string; unitsSold: number; revenue: number; image: string }[] }) {
  return (
    <div className="space-y-3">
      {data.map((p, idx) => (
        <Link
          key={p.id}
          href="/admin/products"
          className="p-3 bg-[#FAF7F2] hover:bg-[#E6DED5]/40 rounded-2xl border border-[#E6DED5] flex items-center justify-between transition-colors text-xs block"
        >
          <div className="flex items-center space-x-3">
            <span className="font-extrabold text-[#A56B4F] text-sm w-4">#{idx + 1}</span>
            <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover border border-[#E6DED5]" />
            <div>
              <h4 className="font-bold text-[#181512]">{p.name}</h4>
              <p className="text-[10px] text-[#6F6861] font-mono">{p.sku}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="font-extrabold text-[#171310] block">₹{p.revenue.toLocaleString()}</span>
            <span className="text-[10px] text-[#347A52] font-semibold">{p.unitsSold} units sold</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
