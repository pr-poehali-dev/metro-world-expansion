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
];

interface TrainSchedule {
  time: string;
  destination: string;
  platform: number;
  status: "on-time" | "delayed" | "arriving";
  delay?: number;
}

const Schedule = () => {
  const [selectedStation, setSelectedStation] = useState<string>("Центральная");

  const generateSchedule = (): TrainSchedule[] => {
    const now = new Date();
    const schedule: TrainSchedule[] = [];
    const statuses: ("on-time" | "delayed" | "arriving")[] = [
      "on-time",
      "on-time",
      "on-time",
      "arriving",
      "delayed",
    ];

    for (let i = 0; i < 8; i++) {
      const time = new Date(now.getTime() + i * 3 * 60000);
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      schedule.push({
        time: time.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        destination: stations[Math.floor(Math.random() * stations.length)],
        platform: Math.floor(Math.random() * 2) + 1,
        status,
        delay: status === "delayed" ? Math.floor(Math.random() * 5) + 1 : undefined,
      });
    }

    return schedule;
  };

  const [schedule] = useState<TrainSchedule[]>(generateSchedule());

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "bg-green-500";
      case "delayed":
        return "bg-orange-500";
      case "arriving":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (train: TrainSchedule) => {
    switch (train.status) {
      case "on-time":
        return "По расписанию";
      case "delayed":
        return `Задержка ${train.delay} мин`;
      case "arriving":
        return "Прибывает";
      default:
        return "";
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader className="bg-muted/50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Icon name="Calendar" size={24} className="text-accent" />
                Расписание поездов
              </CardTitle>
              <Button variant="outline" size="sm">
                <Icon name="RefreshCw" size={16} className="mr-2" />
                Обновить
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Выберите станцию</label>
              <Select value={selectedStation} onValueChange={setSelectedStation}>
                <SelectTrigger>
                  <SelectValue />
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

            <div className="space-y-3">
              {schedule.map((train, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-accent/10 px-4 py-3 rounded-lg min-w-[80px] text-center">
                        <p className="text-2xl font-bold text-accent">{train.time}</p>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                          <span className="font-semibold">{train.destination}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="Square" size={14} />
                            Платформа {train.platform}
                          </span>
                          <Badge
                            className={`${getStatusColor(train.status)} text-white`}
                          >
                            {getStatusText(train)}
                          </Badge>
                        </div>
                      </div>

                      <Button variant="ghost" size="icon">
                        <Icon name="Bell" size={20} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-muted/50">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Icon name="Clock" size={20} className="text-accent" />
              Время работы
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-muted-foreground">Будние дни</span>
                <span className="font-semibold">05:30 - 01:00</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-muted-foreground">Выходные</span>
                <span className="font-semibold">06:00 - 01:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Интервал</span>
                <span className="font-semibold">2-3 мин</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted/50">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Icon name="Bell" size={20} className="text-accent" />
              Уведомления
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-4">
              Получайте уведомления о задержках и изменениях в расписании
            </p>
            <Button className="w-full bg-accent hover:bg-accent/90">
              <Icon name="BellPlus" size={16} className="mr-2" />
              Настроить уведомления
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} className="text-accent flex-shrink-0 mt-1" />
              <div className="text-sm space-y-2">
                <p className="font-semibold">Полезная информация</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Приходите за 5 минут до отправления</li>
                  <li>• Соблюдайте правила безопасности</li>
                  <li>• Уступайте места льготникам</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;
