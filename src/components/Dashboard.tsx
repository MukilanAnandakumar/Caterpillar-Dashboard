import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Truck, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Fuel, 
  Wrench,
  Users,
  MapPin,
  TrendingUp,
  Bell,
  Calendar,
  BarChart3,
  Settings,
  Shield,
  BookOpen
} from "lucide-react";
import { MachineStatusGrid } from "./MachineStatusGrid";
import { SafetyMonitor } from "./SafetyMonitor";
import { TaskScheduler } from "./TaskScheduler";
import { PerformanceAnalytics } from "./PerformanceAnalytics";
import { TrainingHub } from "./TrainingHub";

interface DashboardStats {
  totalMachines: number;
  activeMachines: number;
  alertsCount: number;
  fuelEfficiency: number;
  maintenanceDue: number;
}

interface Machine {
  id: string;
  name: string;
  type: string;
  status: "active" | "idle" | "maintenance" | "offline";
  location: string;
  hoursWorked: number;
  fuelEfficiency: number;
}

interface Alert {
  id: string;
  machineId: string;
  machineName: string;
  type: "warning" | "critical" | "maintenance";
  message: string;
  timestamp: string;
}

export function Dashboard() {
  const [stats] = useState<DashboardStats>({
    totalMachines: 24,
    activeMachines: 18,
    alertsCount: 3,
    fuelEfficiency: 87,
    maintenanceDue: 5
  });

  const [machines] = useState<Machine[]>([
    { id: "CAT001", name: "Excavator 320", type: "Excavator", status: "active", location: "Site A", hoursWorked: 1250, fuelEfficiency: 85 },
    { id: "CAT002", name: "Bulldozer D6", type: "Bulldozer", status: "active", location: "Site B", hoursWorked: 980, fuelEfficiency: 92 },
    { id: "CAT003", name: "Loader 950", type: "Wheel Loader", status: "maintenance", location: "Workshop", hoursWorked: 2100, fuelEfficiency: 75 },
    { id: "CAT004", name: "Dump Truck 777", type: "Dump Truck", status: "active", location: "Site A", hoursWorked: 850, fuelEfficiency: 88 },
    { id: "CAT005", name: "Grader 140", type: "Motor Grader", status: "idle", location: "Site C", hoursWorked: 1420, fuelEfficiency: 90 },
    { id: "CAT006", name: "Excavator 330", type: "Excavator", status: "active", location: "Site B", hoursWorked: 750, fuelEfficiency: 82 },
    { id: "CAT007", name: "Skid Steer 262", type: "Skid Steer", status: "active", location: "Site A", hoursWorked: 550, fuelEfficiency: 89 },
    { id: "CAT008", name: "Backhoe 420", type: "Backhoe", status: "offline", location: "Depot", hoursWorked: 1800, fuelEfficiency: 78 },
  ]);

  const [alerts] = useState<Alert[]>([
    { id: "AL001", machineId: "CAT003", machineName: "Loader 950", type: "maintenance", message: "Scheduled maintenance due in 2 days", timestamp: "2024-01-15 14:30" },
    { id: "AL002", machineId: "CAT008", machineName: "Backhoe 420", type: "critical", message: "Engine temperature critical - immediate attention required", timestamp: "2024-01-15 16:45" },
    { id: "AL003", machineId: "CAT006", machineName: "Excavator 330", type: "warning", message: "Low hydraulic fluid level detected", timestamp: "2024-01-15 12:15" },
  ]);

  const quickActions = [
    { icon: Bell, label: "View Alerts", count: stats.alertsCount, variant: "destructive" as const },
    { icon: Wrench, label: "Maintenance", count: stats.maintenanceDue, variant: "outline" as const },
    { icon: Calendar, label: "Schedule Task", variant: "default" as const },
    { icon: BarChart3, label: "Reports", variant: "secondary" as const }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">CAT Smart Operator</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Dialog>
            <DialogTrigger asChild>
              <Card className="border-l-4 border-l-primary cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Machines</p>
                      <p className="text-3xl font-bold text-primary">{stats.totalMachines}</p>
                    </div>
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Truck className="h-6 w-6 text-primary" />
                  <span>All Machines ({machines.length})</span>
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                {machines.map((machine) => (
                  <Card key={machine.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Truck className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-semibold">{machine.name}</h3>
                            <p className="text-sm text-muted-foreground">{machine.type} • {machine.id}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{machine.location}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 inline mr-1" />
                          {machine.hoursWorked}h
                        </div>
                        <Badge 
                          variant={
                            machine.status === 'active' ? 'default' :
                            machine.status === 'idle' ? 'secondary' :
                            machine.status === 'maintenance' ? 'outline' : 'destructive'
                          }
                        >
                          {machine.status}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="border-l-4 border-l-success cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Now</p>
                      <p className="text-3xl font-bold text-success">{stats.activeMachines}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-success" />
                  <span>Active Machines ({machines.filter(m => m.status === 'active').length})</span>
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                {machines.filter(machine => machine.status === 'active').map((machine) => (
                  <Card key={machine.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Truck className="h-5 w-5 text-success" />
                          <div>
                            <h3 className="font-semibold">{machine.name}</h3>
                            <p className="text-sm text-muted-foreground">{machine.type} • {machine.id}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{machine.location}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 inline mr-1" />
                          {machine.hoursWorked}h
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <Fuel className="h-4 w-4 inline mr-1" />
                          {machine.fuelEfficiency}%
                        </div>
                        <Badge variant="default">
                          {machine.status}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="border-l-4 border-l-warning cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Fuel Efficiency</p>
                      <p className="text-3xl font-bold text-warning">{stats.fuelEfficiency}%</p>
                    </div>
                    <Fuel className="h-8 w-8 text-warning" />
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Fuel className="h-6 w-6 text-warning" />
                  <span>Fuel Efficiency Report</span>
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <Card className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Average Efficiency</p>
                    <p className="text-2xl font-bold text-warning">{stats.fuelEfficiency}%</p>
                  </Card>
                  <Card className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Best Performer</p>
                    <p className="text-2xl font-bold text-success">92%</p>
                  </Card>
                  <Card className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Needs Attention</p>
                    <p className="text-2xl font-bold text-destructive">75%</p>
                  </Card>
                </div>
                {machines.map((machine) => (
                  <Card key={machine.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Fuel className="h-5 w-5 text-warning" />
                          <div>
                            <h3 className="font-semibold">{machine.name}</h3>
                            <p className="text-sm text-muted-foreground">{machine.type} • {machine.id}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{machine.location}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 inline mr-1" />
                          {machine.hoursWorked}h
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={machine.fuelEfficiency} className="w-24" />
                          <span className="text-sm font-medium">{machine.fuelEfficiency}%</span>
                        </div>
                        <Badge 
                          variant={
                            machine.fuelEfficiency >= 90 ? 'default' :
                            machine.fuelEfficiency >= 80 ? 'secondary' : 'destructive'
                          }
                        >
                          {machine.fuelEfficiency >= 90 ? 'Excellent' : 
                           machine.fuelEfficiency >= 80 ? 'Good' : 'Poor'}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="border-l-4 border-l-destructive cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Alerts</p>
                      <p className="text-3xl font-bold text-destructive">{stats.alertsCount}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                  <span>Active Alerts ({alerts.length})</span>
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                {alerts.map((alert) => (
                  <Card key={alert.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className={`h-5 w-5 ${
                            alert.type === 'critical' ? 'text-destructive' :
                            alert.type === 'warning' ? 'text-warning' : 'text-muted-foreground'
                          }`} />
                          <div>
                            <h3 className="font-semibold">{alert.machineName}</h3>
                            <p className="text-sm text-muted-foreground">{alert.machineId}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 max-w-md">
                          <p className="text-sm">{alert.message}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 inline mr-1" />
                          {alert.timestamp}
                        </div>
                        <Badge 
                          variant={
                            alert.type === 'critical' ? 'destructive' :
                            alert.type === 'warning' ? 'secondary' : 'outline'
                          }
                        >
                          {alert.type}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  className="h-20 flex-col space-y-2"
                >
                  <action.icon className="h-6 w-6" />
                  <span className="text-sm">{action.label}</span>
                  {action.count && (
                    <Badge variant={action.variant === "destructive" ? "destructive" : "secondary"} className="text-xs">
                      {action.count}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="machines" className="flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span>Machines</span>
            </TabsTrigger>
            <TabsTrigger value="safety" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Safety</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Training</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <PerformanceAnalytics />
          </TabsContent>

          <TabsContent value="machines">
            <MachineStatusGrid />
          </TabsContent>

          <TabsContent value="safety">
            <SafetyMonitor />
          </TabsContent>

          <TabsContent value="tasks">
            <TaskScheduler />
          </TabsContent>

          <TabsContent value="training">
            <TrainingHub />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}