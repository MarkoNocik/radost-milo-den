
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface TaskListProps {
  completedTasks: string[];
  onTaskComplete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ completedTasks, onTaskComplete }) => {
  const tasks = [
    {
      id: 'gratitude',
      title: 'Запиши 3 работи за кои си благодарен/на',
      description: 'Размисли за малите работи што ти донесуваат радост денес.',
      points: 5
    },
    {
      id: 'walk',
      title: 'Прошетај 15 минути',
      description: 'Излези надвор или прошетај низ домот - движењето помага!',
      points: 10
    },
    {
      id: 'kindness',
      title: 'Направи нешто убаво за некого',
      description: 'Испрати мила порака, помогни дома, или само насмевни се.',
      points: 8
    },
    {
      id: 'breathing',
      title: 'Вежби на дишење (5 минути)',
      description: 'Користи ја 4-7-8 техниката: вдишај 4, задржи 7, издишај 8.',
      points: 6
    },
    {
      id: 'water',
      title: 'Испиј 2 чаши вода',
      description: 'Хидратацијата е важна за твоето физичко и ментално здравје.',
      points: 4
    },
    {
      id: 'screen-break',
      title: 'Направи пауза од екранот (30 мин)',
      description: 'Остави го телефонот и направи нешто што те релаксира.',
      points: 7
    }
  ];

  const isTaskCompleted = (taskId: string) => completedTasks.includes(taskId);
  const todayCompleted = completedTasks.length;
  const totalPoints = completedTasks.reduce((sum, taskId) => {
    const task = tasks.find(t => t.id === taskId);
    return sum + (task?.points || 0);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Дневни задачи за благосостојба
        </h2>
        <div className="flex justify-center space-x-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{todayCompleted}</div>
            <div className="text-sm text-gray-600">Завршени</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{totalPoints}</div>
            <div className="text-sm text-gray-600">Поени</div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => {
          const completed = isTaskCompleted(task.id);
          return (
            <Card key={task.id} className={`transition-all duration-200 ${
              completed 
                ? 'bg-green-50 border-green-200 opacity-75' 
                : 'bg-white/90 backdrop-blur-sm hover:shadow-lg'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className={`font-semibold ${
                        completed ? 'text-green-700 line-through' : 'text-gray-800'
                      }`}>
                        {task.title}
                      </h3>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        {task.points} поени
                      </span>
                    </div>
                    <p className={`text-sm ${
                      completed ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {task.description}
                    </p>
                  </div>
                  <Button
                    onClick={() => onTaskComplete(task.id)}
                    disabled={completed}
                    className={`ml-4 ${
                      completed 
                        ? 'bg-green-500 hover:bg-green-500' 
                        : 'bg-purple-500 hover:bg-purple-600'
                    }`}
                  >
                    {completed ? <Check className="w-4 h-4" /> : 'Завршено'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;
