
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MoodTrackerProps {
  todaysMood: string | null;
  onMoodUpdate: (mood: string) => void;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ todaysMood, onMoodUpdate }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(todaysMood);

  const moods = [
    { emoji: '😊', label: 'Среќен/на', value: 'happy', color: 'bg-green-100 hover:bg-green-200' },
    { emoji: '😐', label: 'Неутрален/на', value: 'neutral', color: 'bg-yellow-100 hover:bg-yellow-200' },
    { emoji: '😔', label: 'Тажен/на', value: 'sad', color: 'bg-blue-100 hover:bg-blue-200' },
    { emoji: '😠', label: 'Лут/а', value: 'angry', color: 'bg-red-100 hover:bg-red-200' },
  ];

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    onMoodUpdate(mood);
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-center text-gray-800">
          Како се чувствуваш денес?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {moods.map((mood) => (
            <Button
              key={mood.value}
              variant="outline"
              className={`h-20 flex flex-col items-center justify-center space-y-2 border-2 transition-all duration-200 ${
                selectedMood === mood.value 
                  ? 'border-purple-400 bg-purple-50 scale-105' 
                  : `border-gray-200 ${mood.color}`
              }`}
              onClick={() => handleMoodSelect(mood.value)}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-sm font-medium text-gray-700">{mood.label}</span>
            </Button>
          ))}
        </div>
        
        {selectedMood && (
          <div className="mt-4 p-3 bg-purple-50 rounded-lg text-center animate-fade-in">
            <p className="text-sm text-purple-700">
              Благодариме што го сподели твоето расположение! 💜
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
