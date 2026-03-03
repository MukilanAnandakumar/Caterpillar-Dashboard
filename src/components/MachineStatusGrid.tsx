import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Truck, 
  MapPin, 
  Fuel, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Wrench,
  Eye
} from "lucide-react";

interface Machine {
  id: string;
  model: string;
  operator: string;
  location: string;
  status: "online" | "offline" | "maintenance" | "alert";
  engineHours: number;
  fuelLevel: number;
  lastUpdate: string;
  alerts: string[];
}

const machines: Machine[] = [
  {
    id: "EXC001",
    model: "CAT 336 Excavator",
    operator: "OP1001",
    location: "Site A - Zone 1",
    status: "online",
    engineHours: 1523.5,
    fuelLevel: 85,
    lastUpdate: "2 mins ago",
    alerts: []
  },
  {
    id: "EXC002", 
    model: "CAT 320 Excavator",
    operator: "OP1002",
    location: "Site A - Zone 2", 
    status: "alert",
    engineHours: 1524.8,
    fuelLevel: 45,
    lastUpdate: "1 min ago",
    alerts: ["Low fuel", "Maintenance due"]
  },
  {
    id: "BLD001",
    model: "CAT D6 Bulldozer",
    operator: "OP1003",
    location: "Site B - Zone 1",
    status: "online",
    engineHours: 892.3,
    fuelLevel: 92,
    lastUpdate: "30 secs ago", 
    alerts: []
  },
  {
    id: "LD001",
    model: "CAT 950 Loader",
    operator: "OP1004",
    location: "Site B - Zone 2",
    status: "maintenance",
    engineHours: 2341.2,
    fuelLevel: 0,
    lastUpdate: "2 hours ago",
    alerts: ["Scheduled maintenance"]
  },
  {
    id: "EXC003",
    model: "CAT 330 Excavator", 
    operator: "OP1005",
    location: "Site C - Zone 1",
    status: "offline",
    engineHours: 756.1,
    fuelLevel: 67,
    lastUpdate: "15 mins ago",
    alerts: []
  },
  {
    id: "GR001",
    model: "CAT 140 Grader",
    operator: "OP1006", 
    location: "Site C - Zone 2",
    status: "online",
    engineHours: 1205.9,
    fuelLevel: 78,
    lastUpdate: "1 min ago",
    alerts: []
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "online": return "text-status-online";
    case "offline": return "text-status-offline"; 
    case "maintenance": return "text-status-maintenance";
    case "alert": return "text-status-alert";
    default: return "text-muted-foreground";
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "online": return "default";
    case "offline": return "secondary";
    case "maintenance": return "outline";
    case "alert": return "destructive";
    default: return "secondary";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "online": return CheckCircle;
    case "offline": return Clock;
    case "maintenance": return Wrench;
    case "alert": return AlertTriangle;
    default: return Clock;
  }
};

export function MachineStatusGrid() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Machine Fleet Status</h2>
        <Button variant="outline">
          <MapPin className="h-4 w-4 mr-2" />
          View on Map
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {machines.map((machine) => {
          const StatusIcon = getStatusIcon(machine.status);
          
          return (
            <Card key={machine.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{machine.id}</CardTitle>
                  <Badge variant={getStatusBadge(machine.status)} className="flex items-center space-x-1">
                    <StatusIcon className="h-3 w-3" />
                    <span className="capitalize">{machine.status}</span>
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{machine.model}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Operator</p>
                    <p className="font-medium">{machine.operator}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Engine Hours</p>
                    <p className="font-medium">{machine.engineHours}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Fuel Level</span>
                    <span className="text-sm font-medium">{machine.fuelLevel}%</span>
                  </div>
                  <Progress 
                    value={machine.fuelLevel} 
                    className="h-2"
                  />
                </div>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{machine.location}</span>
                </div>

                {machine.alerts.length > 0 && (
                  <div className="space-y-1">
                    {machine.alerts.map((alert, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-status-alert">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{alert}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-muted-foreground">
                    Updated {machine.lastUpdate}
                  </span>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}