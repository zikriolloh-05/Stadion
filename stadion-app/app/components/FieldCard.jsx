"use client";
import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function FieldCard({ field }) {
  return (
    <Link href={`/field/${field.id}`}>
      <div className="group bg-[#15221a] rounded-[2rem] overflow-hidden border border-white/5 hover:border-[#e9c400]/30 transition-all duration-500">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={field.photos[0] || "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800"} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            alt={field.name}
          />
          <div className="absolute top-4 left-4 bg-[#e9c400] text-[#09160e] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
            {field.status}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-black uppercase mb-1">{field.name}</h3>
          <div className="flex items-center gap-2 text-white/40 text-xs mb-4">
            <MapPin size={12} className="text-[#e9c400]" />
            {field.address}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-black italic text-[#e9c400]">
              {field.price} <span className="text-xs font-medium uppercase opacity-50 not-italic">TJS/hr</span>
            </div>
            <button className="bg-white/5 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider group-hover:bg-[#e9c400] group-hover:text-[#09160e] transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}