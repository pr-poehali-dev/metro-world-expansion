import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const stations = [
  "Центральная",
  "Северная",
  "Южная",
  "Площадь Революции",
  "Западная",
  "Восточная",
  "Парковая",
  "Лесная",
  "Озёрная",
  "Университет",
  "Театральная",
];

interface RouteResult {
  from: string;
  to: string;
  duration: number;
  transfers: number;
  stations: string[];
  cost: number;
}

const RouteSearch = () => {
  const [fromStation, setFromStation] = useState<string>("");
  const [toStation, setToStation] = useState<string>("");
  const [route, setRoute] = useState<RouteResult | null>(null);

  const calculateRoute = () => {
    if (!fromStation || !toStation) return;

    const mockRoute: RouteResult = {
      from: fromStation,
      to: toStation,
      duration: Math.floor(Math.random() * 30) + 10,
      transfers: Math.floor(Math.random() * 3),
      stations: [fromStation, "Площадь Революции", toStation],
      cost: 55,
    };

    setRoute(mockRoute);
  };

  const swapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex items-center gap-2">
            <Icon name="Route" size={24} className="text-accent" />
            Планировщик маршрута
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Icon name="MapPin" size={16} className="text-green-600" />
              Откуда
            </label>
            <Select value={fromStation} onValueChange={setFromStation}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите станцию отправления" />
              </SelectTrigger>
              <SelectContent>
                {stations.map((station) => (
                  <SelectItem key={station} value={station}>
                    {station}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={swapStations}
              className="rounded-full"
              disabled={!fromStation || !toStation}
            >
              <Icon name="ArrowUpDown" size={20} />
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Icon name="MapPin" size={16} className="text-red-600" />
              Куда
            </label>
            <Select value={toStation} onValueChange={setToStation}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите станцию назначения" />
              </SelectTrigger>
              <SelectContent>
                {stations.map((station) => (
                  <SelectItem key={station} value={station}>
                    {station}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full bg-accent hover:bg-accent/90 mt-6"
            size="lg"
            onClick={calculateRoute}
            disabled={!fromStation || !toStation || fromStation === toStation}
          >
            <Icon name="Search" size={20} className="mr-2" />
            Найти маршрут
          </Button>

          <div className="grid grid-cols-3 gap-2 pt-4 border-t">
            <Button variant="outline" size="sm" className="flex-col h-auto py-3">
              <Icon name="Clock" size={20} className="mb-1 text-accent" />
              <span className="text-xs">Быстрый</span>
            </Button>
            <Button variant="outline" size="sm" className="flex-col h-auto py-3">
              <Icon name="ArrowLeftRight" size={20} className="mb-1 text-accent" />
              <span className="text-xs">Без пересадок</span>
            </Button>
            <Button variant="outline" size="sm" className="flex-col h-auto py-3">
              <Icon name="Accessibility" size={20} className="mb-1 text-accent" />
              <span className="text-xs">Доступный</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex items-center gap-2">
            <Icon name="Navigation" size={24} className="text-accent" />
            Результат поиска
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {route ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Icon name="Clock" size={24} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{route.duration} мин</p>
                    <p className="text-sm text-muted-foreground">Время в пути</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {route.cost} ₽
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Icon name="Info" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Пересадок: {route.transfers === 0 ? "без пересадок" : route.transfers}
                  </span>
                </div>

                <div className="space-y-3">
                  {route.stations.map((station, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            index === 0
                              ? "bg-green-500 border-green-500"
                              : index === route.stations.length - 1
                              ? "bg-red-500 border-red-500"
                              : "bg-accent border-accent"
                          }`}
                        />
                        {index < route.stations.length - 1 && (
                          <div className="w-0.5 h-8 bg-border" />
                        )}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <p className="font-semibold">{station}</p>
                        {index < route.stations.length - 1 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            ↓ {Math.floor(route.duration / (route.stations.length - 1))} мин
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t space-y-2">
                <Button className="w-full bg-accent hover:bg-accent/90">
                  <Icon name="Ticket" size={16} className="mr-2" />
                  Купить билет
                </Button>
                <Button variant="outline" className="w-full">
                  <Icon name="Share2" size={16} className="mr-2" />
                  Поделиться маршрутом
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">
                Выберите станции отправления и назначения для расчёта маршрута
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteSearch;
