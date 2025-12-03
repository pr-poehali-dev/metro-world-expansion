import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import MetroMap from "@/components/MetroMap";
import RouteSearch from "@/components/RouteSearch";
import TicketPurchase from "@/components/TicketPurchase";
import Schedule from "@/components/Schedule";

const Index = () => {
  const [activeTab, setActiveTab] = useState("map");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Train" size={32} className="text-accent" />
              <div>
                <h1 className="text-2xl font-bold">MetroConnect</h1>
                <p className="text-sm opacity-90">Умная навигация в метро</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-accent text-accent-foreground border-none px-4 py-2">
              <Icon name="Clock" size={16} className="mr-1" />
              Онлайн
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-card h-auto p-1">
            <TabsTrigger value="map" className="gap-2 py-3 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Icon name="Map" size={20} />
              <span className="hidden sm:inline">Карта</span>
            </TabsTrigger>
            <TabsTrigger value="route" className="gap-2 py-3 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Icon name="Route" size={20} />
              <span className="hidden sm:inline">Маршрут</span>
            </TabsTrigger>
            <TabsTrigger value="tickets" className="gap-2 py-3 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Icon name="Ticket" size={20} />
              <span className="hidden sm:inline">Билеты</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2 py-3 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Icon name="Calendar" size={20} />
              <span className="hidden sm:inline">Расписание</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="animate-fade-in">
            <MetroMap />
          </TabsContent>

          <TabsContent value="route" className="animate-fade-in">
            <RouteSearch />
          </TabsContent>

          <TabsContent value="tickets" className="animate-fade-in">
            <TicketPurchase />
          </TabsContent>

          <TabsContent value="schedule" className="animate-fade-in">
            <Schedule />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="mt-12 bg-card border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">MetroConnect © 2024 · Быстрая и надёжная навигация</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
