
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

const DailyTip = () => {
  const tips = [
    {
      title: "Совет за денес",
      content: "Секогаш кога се чувствуваш преоптоварено, запамети: длабоко здивни 3 пати. Ова ќе ти помогне да се смириш и да се фокусираш на моментот.",
      category: "Стрес"
    },
    {
      title: "Пријателство",
      content: "Еден мал гест на добрина може да му го промени денот на некого. Испрати порака до пријател и кажи му нешто убаво!",
      category: "Врски"
    },
    {
      title: "Физичка активност",
      content: "Не мора да бидеш во теретана за да бидеш активен! Танцувај на твојата омилена песна 10 минути - ова е одличен начин да се движиш.",
      category: "Движење"
    }
  ];

  // Simple way to get a "daily" tip - in production this would be more sophisticated
  const todaysTip = tips[new Date().getDate() % tips.length];

  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-xl text-gray-800">
          <Star className="w-5 h-5 text-yellow-500" />
          <span>{todaysTip.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 bg-yellow-200 text-yellow-800 text-xs font-medium rounded-full">
            {todaysTip.category}
          </span>
          <p className="text-gray-700 leading-relaxed">
            {todaysTip.content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyTip;
