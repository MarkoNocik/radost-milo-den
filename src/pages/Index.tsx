
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MoodTracker from '@/components/MoodTracker';
import DailyTip from '@/components/DailyTip';
import TaskList from '@/components/TaskList';
import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';

const Index = () => {
  const [todaysMood, setTodaysMood] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  useEffect(() => {
    // Load saved data from localStorage
    const savedMood = localStorage.getItem(`mood-${new Date().toDateString()}`);
    const savedTasks = localStorage.getItem('completedTasks');
    
    if (savedMood) setTodaysMood(savedMood);
    if (savedTasks) setCompletedTasks(JSON.parse(savedTasks));
  }, []);

  const handleMoodUpdate = (mood: string) => {
    setTodaysMood(mood);
    localStorage.setItem(`mood-${new Date().toDateString()}`, mood);
  };

  const handleTaskComplete = (taskId: string) => {
    const newCompletedTasks = [...completedTasks, taskId];
    setCompletedTasks(newCompletedTasks);
    localStorage.setItem('completedTasks', JSON.stringify(newCompletedTasks));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Добредојде во МоетоРасположение.mk
          </h1>
          <p className="text-lg text-gray-600">
            Твојот безбеден простор за ментално здравје и благосостојба
          </p>
        </div>

        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="today" className="text-sm md:text-base">Денес</TabsTrigger>
            <TabsTrigger value="tasks" className="text-sm md:text-base">Задачи</TabsTrigger>
            <TabsTrigger value="dashboard" className="text-sm md:text-base">Преглед</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <MoodTracker 
                todaysMood={todaysMood} 
                onMoodUpdate={handleMoodUpdate} 
              />
              <DailyTip />
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <TaskList 
              completedTasks={completedTasks}
              onTaskComplete={handleTaskComplete}
            />
          </TabsContent>

          <TabsContent value="dashboard">
            <Dashboard completedTasks={completedTasks} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
