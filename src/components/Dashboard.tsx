
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardProps {
  completedTasks: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ completedTasks }) => {
  // Get mood data from localStorage
  const getMoodData = () => {
    const moodData = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateString = date.toDateString();
      const mood = localStorage.getItem(`mood-${dateString}`);
      
      moodData.push({
        date: date.toLocaleDateString('mk-MK', { weekday: 'short' }),
        mood: mood || null
      });
    }
    return moodData;
  };

  const moodData = getMoodData();
  const moodEmojis = {
    happy: '😊',
    neutral: '😐',
    sad: '😔',
    angry: '😠'
  };

  const totalTasks = completedTasks.length;
  const moodsLogged = moodData.filter(d => d.mood).length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Твој преглед на благосостојба
        </h2>
        <p className="text-gray-600">
          Еве како се справуваш оваа недела!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-center text-gray-800">
              Расположение оваа недела
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {moodData.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">{day.date}</span>
                  <span className="text-lg">
                    {day.mood ? moodEmojis[day.mood as keyof typeof moodEmojis] : '⚪'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-center text-gray-800">
              Твои достигнувања
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{totalTasks}</div>
                <div className="text-sm text-gray-600">Завршени задачи</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{moodsLogged}</div>
                <div className="text-sm text-gray-600">Дена со следено расположение</div>
              </div>

              {totalTasks >= 5 && (
                <div className="mt-4 p-3 bg-yellow-100 rounded-lg text-center animate-fade-in">
                  <span className="text-lg">🌟</span>
                  <p className="text-sm text-yellow-800 font-medium">
                    Одлично! Си на добар пат кон подобро ментално здравје!
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-0 shadow-lg">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Рефлексија за денес
          </h3>
          <p className="text-gray-600 mb-4">
            Размисли за еден момент денес кога се почувствува добро:
          </p>
          <div className="bg-white/70 p-4 rounded-lg">
            <p className="text-sm text-gray-500 italic">
              "Секој ден е нова можност да се грижиш за себе. Ти си важен/на!" 💙
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
