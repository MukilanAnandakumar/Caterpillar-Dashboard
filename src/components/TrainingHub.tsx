import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Play, 
  Clock, 
  CheckCircle,
  User,
  Award,
  Calendar,
  Video
} from "lucide-react";

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  type: "video" | "simulation" | "reading" | "assessment";
  duration: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  progress: number;
  completed: boolean;
  category: string;
}

interface OperatorProgress {
  operatorId: string;
  name: string;
  completedModules: number;
  totalModules: number;
  certifications: string[];
  lastActivity: string;
}

const trainingModules: TrainingModule[] = [
  {
    id: "TM001",
    title: "Excavator Safety Fundamentals",
    description: "Learn basic safety protocols for excavator operation",
    type: "video",
    duration: 45,
    difficulty: "beginner",
    progress: 100,
    completed: true,
    category: "Safety"
  },
  {
    id: "TM002", 
    title: "Advanced Hydraulic Systems",
    description: "Deep dive into hydraulic system operation and troubleshooting",
    type: "simulation",
    duration: 90,
    difficulty: "advanced",
    progress: 60,
    completed: false,
    category: "Technical"
  },
  {
    id: "TM003",
    title: "Fuel Efficiency Best Practices",
    description: "Techniques to optimize fuel consumption",
    type: "reading",
    duration: 30,
    difficulty: "intermediate",
    progress: 0,
    completed: false,
    category: "Efficiency"
  },
  {
    id: "TM004",
    title: "Emergency Procedures",
    description: "Critical emergency response protocols",
    type: "assessment",
    duration: 60,
    difficulty: "intermediate",
    progress: 25,
    completed: false,
    category: "Safety"
  }
];

const operatorProgress: OperatorProgress[] = [
  {
    operatorId: "OP1001",
    name: "John Smith",
    completedModules: 12,
    totalModules: 15,
    certifications: ["Basic Safety", "Excavator Operation"],
    lastActivity: "2 hours ago"
  },
  {
    operatorId: "OP1002",
    name: "Sarah Johnson", 
    completedModules: 8,
    totalModules: 15,
    certifications: ["Basic Safety"],
    lastActivity: "1 day ago"
  },
  {
    operatorId: "OP1003",
    name: "Mike Wilson",
    completedModules: 15,
    totalModules: 15,
    certifications: ["Basic Safety", "Excavator Operation", "Advanced Hydraulics"],
    lastActivity: "30 mins ago"
  }
];

export function TrainingHub() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "text-success";
      case "intermediate": return "text-warning";
      case "advanced": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "outline";
      case "intermediate": return "secondary";
      case "advanced": return "destructive";
      default: return "secondary";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return Video;
      case "simulation": return Play;
      case "reading": return BookOpen;
      case "assessment": return CheckCircle;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Training Hub</h2>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Training
        </Button>
      </div>

      {/* Training Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Modules</p>
                <p className="text-3xl font-bold text-primary">{trainingModules.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Learners</p>
                <p className="text-3xl font-bold text-success">{operatorProgress.length}</p>
              </div>
              <User className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Certifications</p>
                <p className="text-3xl font-bold text-warning">
                  {operatorProgress.reduce((acc, op) => acc + op.certifications.length, 0)}
                </p>
              </div>
              <Award className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Training Modules */}
        <Card>
          <CardHeader>
            <CardTitle>Available Training Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trainingModules.map((module) => {
                const TypeIcon = getTypeIcon(module.type);
                
                return (
                  <div key={module.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3 flex-1">
                        <TypeIcon className="h-5 w-5 text-primary mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium">{module.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {module.description}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {module.duration} mins
                            </div>
                            <Badge variant={getDifficultyBadge(module.difficulty)}>
                              {module.difficulty}
                            </Badge>
                            <Badge variant="outline">
                              {module.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      {module.completed ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <Button size="sm" variant="outline">
                          {module.progress > 0 ? "Continue" : "Start"}
                        </Button>
                      )}
                    </div>
                    
                    {module.progress > 0 && !module.completed && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Progress</span>
                          <span className="text-sm font-medium">{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Operator Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Operator Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {operatorProgress.map((operator) => (
                <div key={operator.operatorId} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{operator.name}</h4>
                      <p className="text-sm text-muted-foreground">{operator.operatorId}</p>
                    </div>
                    <Badge variant="outline">
                      {Math.round((operator.completedModules / operator.totalModules) * 100)}% Complete
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">
                        Modules ({operator.completedModules}/{operator.totalModules})
                      </span>
                    </div>
                    <Progress 
                      value={(operator.completedModules / operator.totalModules) * 100} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Certifications:</p>
                    <div className="flex flex-wrap gap-1">
                      {operator.certifications.map((cert, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    Last activity: {operator.lastActivity}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}