import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Station {
  id: string;
  name: string;
  line: string;
  lineColor: string;
  x: number;
  y: number;
  transfers?: string[];
}

const stations: Station[] = [
  { id: "1", name: "Центральная", line: "Красная линия", lineColor: "hsl(var(--metro-red))", x: 50, y: 30, transfers: ["4"] },
  { id: "2", name: "Северная", line: "Красная линия", lineColor: "hsl(var(--metro-red))", x: 50, y: 15 },
  { id: "3", name: "Южная", line: "Красная линия", lineColor: "hsl(var(--metro-red))", x: 50, y: 45 },
  { id: "4", name: "Площадь Революции", line: "Синяя линия", lineColor: "hsl(var(--metro-blue))", x: 30, y: 30, transfers: ["1"] },
  { id: "5", name: "Западная", line: "Синяя линия", lineColor: "hsl(var(--metro-blue))", x: 15, y: 30 },
  { id: "6", name: "Восточная", line: "Синяя линия", lineColor: "hsl(var(--metro-blue))", x: 70, y: 30 },
  { id: "7", name: "Парковая", line: "Зелёная линия", lineColor: "hsl(var(--metro-green))", x: 30, y: 60 },
  { id: "8", name: "Лесная", line: "Зелёная линия", lineColor: "hsl(var(--metro-green))", x: 50, y: 70 },
  { id: "9", name: "Озёрная", line: "Зелёная линия", lineColor: "hsl(var(--metro-green))", x: 70, y: 60 },
  { id: "10", name: "Университет", line: "Жёлтая линия", lineColor: "hsl(var(--metro-yellow))", x: 20, y: 50 },
  { id: "11", name: "Театральная", line: "Фиолетовая линия", lineColor: "hsl(var(--metro-purple))", x: 60, y: 50 },
];

const MetroMap = () => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [hoveredStation, setHoveredStation] = useState<string | null>(null);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2 overflow-hidden">
        <CardHeader className="bg-muted/50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Icon name="Map" size={24} className="text-accent" />
              Интерактивная карта метро
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Icon name="ZoomIn" size={16} />
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="ZoomOut" size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative w-full aspect-[4/3] bg-muted/30 rounded-lg border-2 border-border overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <line x1="50" y1="15" x2="50" y2="45" stroke="hsl(var(--metro-red))" strokeWidth="0.8" />
              <line x1="15" y1="30" x2="70" y2="30" stroke="hsl(var(--metro-blue))" strokeWidth="0.8" />
              <line x1="30" y1="60" x2="70" y2="60" stroke="hsl(var(--metro-green))" strokeWidth="0.8" />

              {stations.map((station) => (
                <g key={station.id}>
                  <circle
                    cx={station.x}
                    cy={station.y}
                    r={hoveredStation === station.id ? "2.5" : "2"}
                    fill={station.lineColor}
                    stroke="white"
                    strokeWidth="0.4"
                    className="cursor-pointer transition-all duration-200 hover:opacity-80"
                    onMouseEnter={() => setHoveredStation(station.id)}
                    onMouseLeave={() => setHoveredStation(null)}
                    onClick={() => setSelectedStation(station)}
                  />
                  {station.transfers && (
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r="3"
                      fill="none"
                      stroke="white"
                      strokeWidth="0.3"
                    />
                  )}
                </g>
              ))}
            </svg>

            {hoveredStation && (
              <div
                className="absolute bg-card border border-border px-3 py-2 rounded-md shadow-lg text-sm pointer-events-none"
                style={{
                  left: `${stations.find(s => s.id === hoveredStation)?.x}%`,
                  top: `${stations.find(s => s.id === hoveredStation)?.y}%`,
                  transform: 'translate(-50%, -120%)',
                }}
              >
                <p className="font-semibold">{stations.find(s => s.id === hoveredStation)?.name}</p>
                <p className="text-xs text-muted-foreground">{stations.find(s => s.id === hoveredStation)?.line}</p>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Badge className="gap-2" style={{ backgroundColor: "hsl(var(--metro-red))" }}>
              <div className="w-3 h-3 rounded-full bg-white" />
              Красная линия
            </Badge>
            <Badge className="gap-2" style={{ backgroundColor: "hsl(var(--metro-blue))" }}>
              <div className="w-3 h-3 rounded-full bg-white" />
              Синяя линия
            </Badge>
            <Badge className="gap-2" style={{ backgroundColor: "hsl(var(--metro-green))" }}>
              <div className="w-3 h-3 rounded-full bg-white" />
              Зелёная линия
            </Badge>
            <Badge className="gap-2" style={{ backgroundColor: "hsl(var(--metro-yellow))", color: "hsl(var(--primary))" }}>
              <div className="w-3 h-3 rounded-full bg-primary" />
              Жёлтая линия
            </Badge>
            <Badge className="gap-2" style={{ backgroundColor: "hsl(var(--metro-purple))" }}>
              <div className="w-3 h-3 rounded-full bg-white" />
              Фиолетовая линия
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Icon name="Info" size={20} className="text-accent" />
            Информация о станции
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {selectedStation ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{selectedStation.name}</h3>
                <Badge style={{ backgroundColor: selectedStation.lineColor }}>
                  {selectedStation.line}
                </Badge>
              </div>

              {selectedStation.transfers && selectedStation.transfers.length > 0 && (
                <div className="border-t pt-4">
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Icon name="ArrowLeftRight" size={16} />
                    Пересадки
                  </p>
                  {selectedStation.transfers.map(transferId => {
                    const transferStation = stations.find(s => s.id === transferId);
                    return transferStation ? (
                      <Badge key={transferId} className="mr-2" style={{ backgroundColor: transferStation.lineColor }}>
                        {transferStation.line}
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}

              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Первый поезд:</span>
                  <span className="font-semibold">05:30</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Последний поезд:</span>
                  <span className="font-semibold">01:00</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Timer" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Интервал:</span>
                  <span className="font-semibold">2-3 мин</span>
                </div>
              </div>

              <Button className="w-full mt-4 bg-accent hover:bg-accent/90">
                <Icon name="Navigation" size={16} className="mr-2" />
                Построить маршрут
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon name="MousePointer" size={48} className="mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">
                Выберите станцию на карте для просмотра информации
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MetroMap;
