import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Fuel, 
  Clock,
  Wrench,
  DollarSign,
  Download
} from "lucide-react";

interface PerformanceMetric {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down" | "stable";
  icon: any;
}

const performanceMetrics: PerformanceMetric[] = [
  {
    label: "Fuel Efficiency",
    value: "87%",
    change: 5.2,
    trend: "up",
    icon: Fuel
  },
  {
    label: "Equipment Utilization",
    value: "73%",
    change: -2.1,
    trend: "down",
    icon: BarChart3
  },
  {
    label: "Maintenance Cost",
    value: "$12.5K",
    change: -8.5,
    trend: "up",
    icon: Wrench
  },
  {
    label: "Operating Hours",
    value: "156.2",
    change: 12.3,
    trend: "up",
    icon: Clock
  }
];

const machinePerformance = [
  { id: "EXC001", efficiency: 92, utilization: 85, alerts: 0 },
  { id: "EXC002", efficiency: 78, utilization: 65, alerts: 2 },
  { id: "BLD001", efficiency: 88, utilization: 92, alerts: 0 },
  { id: "LD001", efficiency: 65, utilization: 45, alerts: 1 },
  { id: "EXC003", efficiency: 94, utilization: 78, alerts: 0 },
  { id: "GR001", efficiency: 81, utilization: 88, alerts: 0 }
];

export function PerformanceAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Performance Analytics</h2>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-success mr-1" />
                    ) : metric.trend === "down" ? (
                      <TrendingDown className="h-4 w-4 text-destructive mr-1" />
                    ) : null}
                    <span className={`text-sm ${
                      metric.trend === "up" ? "text-success" : 
                      metric.trend === "down" ? "text-destructive" : 
                      "text-muted-foreground"
                    }`}>
                      {metric.change > 0 ? "+" : ""}{metric.change}%
                    </span>
                  </div>
                </div>
                <metric.icon className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Overview Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Fleet Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {machinePerformance.map((machine) => (
              <div key={machine.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{machine.id}</h4>
                  <div className="flex items-center space-x-2">
                    {machine.alerts > 0 && (
                      <Badge variant="destructive">{machine.alerts} alerts</Badge>
                    )}
                    <Badge variant="outline">
                      {machine.efficiency >= 85 ? "Excellent" : 
                       machine.efficiency >= 70 ? "Good" : "Needs Attention"}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Efficiency</span>
                      <span className="text-sm font-medium">{machine.efficiency}%</span>
                    </div>
                    <Progress value={machine.efficiency} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Utilization</span>
                      <span className="text-sm font-medium">{machine.utilization}%</span>
                    </div>
                    <Progress value={machine.utilization} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {machinePerformance
                .sort((a, b) => b.efficiency - a.efficiency)
                .slice(0, 3)
                .map((machine, index) => (
                  <div key={machine.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? "bg-primary text-primary-foreground" :
                        index === 1 ? "bg-secondary text-secondary-foreground" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-medium">{machine.id}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-success">{machine.efficiency}%</p>
                      <p className="text-xs text-muted-foreground">efficiency</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-l-warning p-3 bg-warning/5">
                <p className="font-medium text-warning">EXC002 - Service Required</p>
                <p className="text-sm text-muted-foreground">Low efficiency detected. Recommend hydraulic system check.</p>
              </div>
              
              <div className="border-l-4 border-l-destructive p-3 bg-destructive/5">
                <p className="font-medium text-destructive">LD001 - Immediate Attention</p>
                <p className="text-sm text-muted-foreground">Critical performance drop. Schedule inspection immediately.</p>
              </div>
              
              <div className="border-l-4 border-l-primary p-3 bg-primary/5">
                <p className="font-medium text-primary">Fleet Optimization</p>
                <p className="text-sm text-muted-foreground">Consider redistributing tasks to maximize high-performing machines.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}