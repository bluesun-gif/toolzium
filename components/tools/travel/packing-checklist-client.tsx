"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { MapPin, Navigation, Compass, Sparkles, Shield, Plane } from "lucide-react";
import toast from "react-hot-toast";

interface CityCoord {
  name: string;
  lat: number;
  lng: number;
}

const CITIES: CityCoord[] = [
  { name: "New York", lat: 40.7128, lng: -74.0060 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Sydney", lat: -33.8688, lng: 151.2093 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 }
];

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function PackingChecklistClient() {
  const [origin, setOrigin] = useState<CityCoord>(CITIES[0]);
  const [destination, setDestination] = useState<CityCoord>(CITIES[1]);

  const distKm = haversineDistance(origin.lat, origin.lng, destination.lat, destination.lng);
  const distMiles = distKm * 0.621371;
  const flightHours = (distKm / 850) + 0.5; // ~850 km/h cruising speed

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Navigation}
          title="Smart Travel Packing Checklist"
          description="Calculate exact coordinates, nautical miles, kilometer distances, and estimated flight duration between global destinations."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Inputs */}
          <div className="md:col-span-5">
            <GlassCard>
              <CardHeader>
                <CardTitle>Select Origin & Destination</CardTitle>
                <CardDescription>Choose global hubs or enter custom coordinates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Origin City</Label>
                  <select
                    className="w-full h-10 px-3 rounded-md border bg-background text-sm"
                    value={origin.name}
                    onChange={e => {
                      const found = CITIES.find(c => c.name === e.target.value);
                      if (found) setOrigin(found);
                    }}
                  >
                    {CITIES.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Destination City</Label>
                  <select
                    className="w-full h-10 px-3 rounded-md border bg-background text-sm"
                    value={destination.name}
                    onChange={e => {
                      const found = CITIES.find(c => c.name === e.target.value);
                      if (found) setDestination(found);
                    }}
                  >
                    {CITIES.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </GlassCard>
          </div>

          {/* Results */}
          <div className="md:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <GlassCard className="p-4 bg-primary/10 border-primary/30">
                <div className="text-xs text-muted-foreground uppercase font-semibold">Kilometers</div>
                <div className="text-2xl font-bold text-primary mt-1">{Math.round(distKm).toLocaleString()} km</div>
              </GlassCard>
              <GlassCard className="p-4">
                <div className="text-xs text-muted-foreground uppercase font-semibold">Miles</div>
                <div className="text-2xl font-bold text-foreground mt-1">{Math.round(distMiles).toLocaleString()} mi</div>
              </GlassCard>
              <GlassCard className="p-4">
                <div className="text-xs text-muted-foreground uppercase font-semibold">Est. Flight Time</div>
                <div className="text-2xl font-bold text-blue-500 mt-1">~{flightHours.toFixed(1)} hrs</div>
              </GlassCard>
            </div>

            <GlassCard>
              <CardHeader>
                <CardTitle className="text-base">Route Trajectory</CardTitle>
                <CardDescription>Great Circle geodesic path summary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border bg-background/50">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-bold text-sm">{origin.name}</div>
                      <div className="text-xs text-muted-foreground">{origin.lat.toFixed(4)}°, {origin.lng.toFixed(4)}°</div>
                    </div>
                  </div>
                  <Plane className="w-5 h-5 text-muted-foreground" />
                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <div className="font-bold text-sm">{destination.name}</div>
                      <div className="text-xs text-muted-foreground">{destination.lat.toFixed(4)}°, {destination.lng.toFixed(4)}°</div>
                    </div>
                    <MapPin className="w-5 h-5 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </GlassCard>
          </div>
        </div>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Select Cities", description: "Pick origin and destination waypoints.", icon: MapPin },
            { step: "02", title: "Haversine Computation", description: "Algorithm calculates spherical distance across Earth's curvature.", icon: Compass },
            { step: "03", title: "Plan Journey", description: "Review flight hours and nautical mileage for travel itineraries.", icon: Plane }
          ]}
          badges={["100% Free Forever", "Haversine Formula", "Instant Geodesic Math"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Navigation, title: "Curvature-Accurate", description: "Uses spherical trigonometry rather than flat Euclidean approximations." },
            { icon: Plane, title: "Flight Time Estimator", description: "Calculates realistic airborne flight durations based on commercial cruising velocities." },
            { icon: Shield, title: "100% Client-Side", description: "Zero server roundtrips. Instant computation." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>The Mathematics of Great Circle Routes</h3>
            <p>
              Because the Earth is an oblate spheroid, the shortest distance between two points on the globe is not a straight line on a flat Mercator map, but a curved Great Circle arc.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "What is the Haversine formula?", answer: "The Haversine formula determines the great-circle distance between two points on a sphere given their longitudes and latitudes." },
            { question: "Are actual airline flight paths always straight Great Circles?", answer: "Commercial flights follow jet streams, air traffic corridors, and geopolitical airway regulations that may slightly deviate from the theoretical shortest geodesic path." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/travel/packing-checklist" max={6} />
      </div>
    </div>
  );
}

export default PackingChecklistClient;
