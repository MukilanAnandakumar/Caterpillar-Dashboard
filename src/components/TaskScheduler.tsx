import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User,
  Plus,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  machineId: string;
  operatorId: string;
  location: string;
  scheduledTime: string;
  estimatedDuration: number;
  priority: "low" | "medium" | "high";
  status: "scheduled" | "in-progress" | "completed" | "delayed";
  progress: number;
}

const tasks: Task[] = [
  {
    id: "T001",
    title: "Excavation - Foundation Area",
    description: "Dig foundation for new building section",
    machineId: "EXC001",
    operatorId: "OP1001",
    location: "Site A - Zone 1",
    scheduledTime: "2025-05-01 08:00:00",
    estimatedDuration: 240,
    priority: "high",
    status: "in-progress",
    progress: 65
  },
  {
    id: "T002",
    title: "Material Loading",
    description: "Load and transport gravel to Zone 2",
    machineId: "LD001",
    operatorId: "OP1004",
    location: "Site B - Zone 2",
    scheduledTime: "2025-05-01 10:00:00",
    estimatedDuration: 120,
    priority: "medium",
    status: "scheduled",
    progress: 0
  },
  {
    id: "T003",
    title: "Road Grading",
    description: "Grade access road surface",
    machineId: "GR001",
    operatorId: "OP1006",
    location: "Site C - Access Road",
    scheduledTime: "2025-05-01 14:00:00", 
    estimatedDuration: 180,
    priority: "low",
    status: "scheduled",
    progress: 0
  },
  {
    id: "T004",
    title: "Debris Clearing",
    description: "Clear debris from construction area",
    machineId: "BLD001",
    operatorId: "OP1003",
    location: "Site A - Zone 3",
    scheduledTime: "2025-05-01 06:00:00",
    estimatedDuration: 90,
    priority: "medium",
    status: "completed",
    progress: 100
  }
];

export function TaskScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low": return "text-success";
      case "medium": return "text-warning";
      case "high": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low": return "outline";
      case "medium": return "secondary";
      case "high": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled": return "outline";
      case "in-progress": return "secondary";
      case "completed": return "default";
      case "delayed": return "destructive";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return CheckCircle;
      case "delayed": return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Task Scheduler</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Schedule Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Task List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => {
                  const StatusIcon = getStatusIcon(task.status);
                  
                  return (
                    <div key={task.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {task.description}
                          </p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {task.operatorId}
                            </div>
                            <div className="flex items-center">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              {new Date(task.scheduledTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {task.estimatedDuration}min
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {task.location}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <Badge variant={getPriorityBadge(task.priority)}>
                            {task.priority.toUpperCase()}
                          </Badge>
                          <Badge variant={getStatusBadge(task.status)} className="flex items-center space-x-1">
                            <StatusIcon className="h-3 w-3" />
                            <span>{task.status.replace('-', ' ').toUpperCase()}</span>
                          </Badge>
                        </div>
                      </div>
                      
                      {task.status === "in-progress" && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">{task.progress}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Task Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">{tasks.filter(t => t.status === "scheduled").length}</p>
                <p className="text-sm text-muted-foreground">Scheduled</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-warning">{tasks.filter(t => t.status === "in-progress").length}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-success">{tasks.filter(t => t.status === "completed").length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-destructive">{tasks.filter(t => t.status === "delayed").length}</p>
                <p className="text-sm text-muted-foreground">Delayed</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}