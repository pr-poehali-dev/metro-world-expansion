import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface Ticket {
  id: string;
  type: string;
  price: number;
  validUntil?: string;
  rides?: number;
  active: boolean;
}

const TicketPurchase = () => {
  const [myTickets, setMyTickets] = useState<Ticket[]>([
    {
      id: "1",
      type: "Месячный абонемент",
      price: 2500,
      validUntil: "2024-12-31",
      active: true,
    },
    {
      id: "2",
      type: "10 поездок",
      price: 500,
      rides: 7,
      active: true,
    },
  ]);

  const ticketTypes = [
    {
      id: "single",
      name: "Разовый билет",
      price: 55,
      description: "Одна поездка",
      icon: "Ticket",
    },
    {
      id: "double",
      name: "2 поездки",
      price: 110,
      description: "Две поездки",
      icon: "Tickets",
    },
    {
      id: "ten",
      name: "10 поездок",
      price: 500,
      description: "Выгода 50₽",
      icon: "TicketCheck",
    },
    {
      id: "month",
      name: "Месячный",
      price: 2500,
      description: "Безлимит на 30 дней",
      icon: "CalendarRange",
    },
  ];

  const handlePurchase = (ticket: typeof ticketTypes[0]) => {
    toast.success(`Билет "${ticket.name}" успешно куплен!`, {
      description: `Списано ${ticket.price}₽ с вашего счёта`,
    });

    const newTicket: Ticket = {
      id: Date.now().toString(),
      type: ticket.name,
      price: ticket.price,
      active: true,
      ...(ticket.id === "month" && {
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      }),
      ...(ticket.id === "ten" && { rides: 10 }),
    };

    setMyTickets([...myTickets, newTicket]);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-card">
          <TabsTrigger value="buy" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            <Icon name="ShoppingCart" size={18} className="mr-2" />
            Купить билет
          </TabsTrigger>
          <TabsTrigger value="my" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            <Icon name="Wallet" size={18} className="mr-2" />
            Мои билеты
          </TabsTrigger>
        </TabsList>

        <TabsContent value="buy" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {ticketTypes.map((ticket) => (
              <Card key={ticket.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-accent/10 p-3 rounded-lg">
                        <Icon name={ticket.icon as any} size={24} className="text-accent" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{ticket.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {ticket.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold text-accent">{ticket.price}₽</p>
                    </div>
                    <Button
                      onClick={() => handlePurchase(ticket)}
                      className="bg-accent hover:bg-accent/90"
                    >
                      <Icon name="Plus" size={16} className="mr-2" />
                      Купить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 bg-muted/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Icon name="Info" size={24} className="text-accent flex-shrink-0 mt-1" />
                <div className="space-y-2 text-sm">
                  <p className="font-semibold">Способы оплаты:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Icon name="CreditCard" size={16} />
                      Банковские карты (Visa, MasterCard, МИР)
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Smartphone" size={16} />
                      Apple Pay, Google Pay, Samsung Pay
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Wallet" size={16} />
                      Электронные кошельки
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my" className="mt-6">
          {myTickets.length > 0 ? (
            <div className="space-y-4">
              {myTickets.map((ticket) => (
                <Card key={ticket.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="bg-gradient-to-br from-accent to-accent/70 p-6 flex items-center justify-center text-white">
                        <Icon name="Ticket" size={48} />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{ticket.type}</h3>
                            <Badge
                              variant={ticket.active ? "default" : "secondary"}
                              className={ticket.active ? "bg-green-500" : ""}
                            >
                              {ticket.active ? "Активен" : "Использован"}
                            </Badge>
                          </div>
                          <p className="text-2xl font-bold text-accent">{ticket.price}₽</p>
                        </div>

                        <div className="space-y-2 text-sm">
                          {ticket.validUntil && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Icon name="Calendar" size={16} />
                              <span>Действителен до: {ticket.validUntil}</span>
                            </div>
                          )}
                          {ticket.rides !== undefined && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Icon name="Hash" size={16} />
                              <span>Осталось поездок: {ticket.rides}</span>
                            </div>
                          )}
                        </div>

                        {ticket.active && (
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="flex-1">
                                <Icon name="QrCode" size={16} className="mr-2" />
                                QR-код
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1">
                                <Icon name="Share2" size={16} className="mr-2" />
                                Передать
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Icon name="Inbox" size={48} className="mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">У вас пока нет билетов</p>
                <Button className="mt-4 bg-accent hover:bg-accent/90">
                  Купить первый билет
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TicketPurchase;
