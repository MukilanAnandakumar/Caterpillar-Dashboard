import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  User,
  Truck,
  Bell
} from "lucide-react";

interface SafetyEvent {
  id: string;
  machineId: string;
  operatorId: string;
  type: "seatbelt" | "proximity" | "incident" | "compliance";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  timestamp: string;
  status: "active" | "resolved" | "investigating";
}

const safetyEvents: SafetyEvent[] = [
  {
    id: "S001",
    machineId: "EXC001",
    operatorId: "OP1001",
    type: "seatbelt",
    severity: "medium",
    description: "Seatbelt unfastened detected",
    timestamp: "2025-05-01 08:00:00",
    status: "resolved"
  },
  {
    id: "S002", 
    machineId: "EXC002",
    operatorId: "OP1002",
    type: "proximity",
    severity: "high",
    description: "Proximity alert - worker detected in danger zone",
    timestamp: "2025-05-01 10:30:00",
    status: "active"
  },
  {
    id: "S003",
    machineId: "BLD001", 
    operatorId: "OP1003",
    type: "incident",
    severity: "critical",
    description: "Hard braking event detected",
    timestamp: "2025-05-01 14:15:00",
    status: "investigating"
  }
];

const safetyStats = {
  incidentFreeHours: 1247,
  complianceRate: 94,
  activeMachines: 18,
  safeOperators: 16
};

export function SafetyMonitor() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "text-success";
      case "medium": return "text-warning";
      case "high": return "text-destructive";
      case "critical": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "low": return "outline";
      case "medium": return "secondary";
      case "high": return "destructive";
      case "critical": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Safety Monitor</h2>
        <Button variant="outline">
          <Bell className="h-4 w-4 mr-2" />
          Configure Alerts
        </Button>
      </div>

      {/* Safety Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-success">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Incident-Free Hours</p>
                <p className="text-3xl font-bold text-success">{safetyStats.incidentFreeHours}</p>
              </div>
              <Shield className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Compliance Rate</p>
                <p className="text-3xl font-bold text-primary">{safetyStats.complianceRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Machines</p>
                <p className="text-3xl font-bold text-warning">{safetyStats.activeMachines}</p>
              </div>
              <Truck className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Safe Operators</p>
                <p className="text-3xl font-bold text-success">{safetyStats.safeOperators}</p>
              </div>
              <User className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Safety Compliance Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Seatbelt Compliance</span>
              <span className="text-sm text-muted-foreground">98%</span>
            </div>
            <Progress value={98} className="h-3" />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Speed Limit Compliance</span>
              <span className="text-sm text-muted-foreground">92%</span>
            </div>
            <Progress value={92} className="h-3" />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Operating Hours Compliance</span>
              <span className="text-sm text-muted-foreground">96%</span>
            </div>
            <Progress value={96} className="h-3" />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Maintenance Schedule</span>
              <span className="text-sm text-muted-foreground">89%</span>
            </div>
            <Progress value={89} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Recent Safety Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Safety Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {safetyEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <AlertTriangle className={`h-5 w-5 ${getSeverityColor(event.severity)}`} />
                  <div>
                    <p className="font-medium">{event.description}</p>
                    <p className="text-sm text-muted-foreground">
                      Machine: {event.machineId} | Operator: {event.operatorId}
                    </p>
                    <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getSeverityBadge(event.severity)}>
                    {event.severity.toUpperCase()}
                  </Badge>
                  <Badge variant={event.status === "active" ? "destructive" : "outline"}>
                    {event.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}