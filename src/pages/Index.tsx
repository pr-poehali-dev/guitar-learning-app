import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const CHORDS_DATA = [
  {
    name: 'C Major',
    fingers: [
      { string: 5, fret: 3 },
      { string: 4, fret: 2 },
      { string: 2, fret: 1 }
    ],
    difficulty: 'easy'
  },
  {
    name: 'G Major',
    fingers: [
      { string: 6, fret: 3 },
      { string: 5, fret: 2 },
      { string: 1, fret: 3 }
    ],
    difficulty: 'easy'
  },
  {
    name: 'D Major',
    fingers: [
      { string: 4, fret: 2 },
      { string: 3, fret: 2 },
      { string: 2, fret: 3 }
    ],
    difficulty: 'easy'
  },
  {
    name: 'E Minor',
    fingers: [
      { string: 5, fret: 2 },
      { string: 4, fret: 2 }
    ],
    difficulty: 'easy'
  },
  {
    name: 'A Minor',
    fingers: [
      { string: 4, fret: 2 },
      { string: 3, fret: 2 },
      { string: 2, fret: 1 }
    ],
    difficulty: 'easy'
  },
  {
    name: 'F Major',
    fingers: [
      { string: 6, fret: 1 },
      { string: 5, fret: 1 },
      { string: 4, fret: 2 },
      { string: 3, fret: 3 },
      { string: 2, fret: 1 },
      { string: 1, fret: 1 }
    ],
    difficulty: 'medium'
  }
];

const EXERCISES = [
  { id: 1, name: 'Хроматическая гамма', description: 'Основа для развития беглости пальцев', progress: 75 },
  { id: 2, name: 'Переходы аккордов', description: 'Плавная смена позиций', progress: 45 },
  { id: 3, name: 'Арпеджио C Major', description: 'Перебор струн в аккорде', progress: 60 },
  { id: 4, name: 'Бой "Шестёрка"', description: 'Популярный ритмический рисунок', progress: 30 }
];

const ChordDiagram = ({ chord }: { chord: typeof CHORDS_DATA[0] }) => {
  const strings = [1, 2, 3, 4, 5, 6];
  const frets = [0, 1, 2, 3, 4];

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-xl border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-lg">
      <h3 className="font-semibold text-lg mb-2 text-gray-800">{chord.name}</h3>
      <Badge variant={chord.difficulty === 'easy' ? 'secondary' : 'default'} className="mb-3">
        {chord.difficulty === 'easy' ? 'Легкий' : 'Средний'}
      </Badge>
      
      <div className="relative">
        <div className="absolute -left-6 top-8 text-xs text-gray-500 flex flex-col gap-4">
          {strings.map(s => (
            <div key={s} className="h-5 flex items-center">{7 - s}</div>
          ))}
        </div>
        
        <div className="grid gap-4">
          {strings.map(stringNum => (
            <div key={stringNum} className="flex gap-6 items-center">
              {frets.map(fretNum => {
                const finger = chord.fingers.find(
                  f => f.string === 7 - stringNum && f.fret === fretNum
                );
                return (
                  <div
                    key={fretNum}
                    className={`w-5 h-5 rounded-full border-2 transition-all ${
                      finger
                        ? 'bg-purple-500 border-purple-700 shadow-md scale-110'
                        : 'border-gray-300'
                    }`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex gap-6 mt-2 text-xs text-gray-500 ml-0">
          {frets.map(f => (
            <div key={f} className="w-5 text-center">{f === 0 ? '' : f}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TablatureEditor = () => {
  const [tabs] = useState([
    { string: 1, frets: [0, 1, 3, 1, 0, '-', '-', '-'] },
    { string: 2, frets: ['-', '-', '-', '-', '-', 0, 1, 0] },
    { string: 3, frets: ['-', '-', '-', '-', '-', '-', '-', 2] },
    { string: 4, frets: ['-', '-', '-', '-', '-', '-', '-', '-'] },
    { string: 5, frets: [3, 3, 3, 3, 3, '-', '-', '-'] },
    { string: 6, frets: ['-', '-', '-', '-', '-', '-', '-', '-'] }
  ]);

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Music" className="text-purple-500" />
              Редактор табулатур
            </CardTitle>
            <CardDescription>Создавай и изучай композиции в формате TAB</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Icon name="Play" className="w-4 h-4 mr-1" />
              Играть
            </Button>
            <Button size="sm">
              <Icon name="Save" className="w-4 h-4 mr-1" />
              Сохранить
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border-2 border-purple-100">
          <div className="font-mono text-sm space-y-1 overflow-x-auto">
            {tabs.map((line, idx) => (
              <div key={idx} className="flex gap-2 items-center hover:bg-white/50 px-2 py-1 rounded transition-colors">
                <span className="text-gray-600 font-semibold w-4">e{7 - idx}</span>
                <span className="text-gray-400">|</span>
                <div className="flex gap-3">
                  {line.frets.map((fret, fretIdx) => (
                    <span
                      key={fretIdx}
                      className={`w-6 text-center ${
                        fret !== '-' ? 'text-purple-600 font-bold bg-purple-100 rounded px-1' : 'text-gray-400'
                      }`}
                    >
                      {fret}
                    </span>
                  ))}
                </div>
                <span className="text-gray-400">|</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex gap-2 flex-wrap">
          <Button variant="outline" size="sm">
            <Icon name="Plus" className="w-4 h-4 mr-1" />
            Добавить ноту
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Eraser" className="w-4 h-4 mr-1" />
            Очистить
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Download" className="w-4 h-4 mr-1" />
            Экспорт
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  const [userProgress] = useState(67);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name="Music" size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Guitar Academy
          </h1>
          <p className="text-gray-600 text-lg">Твой персональный учитель игры на гитаре</p>
        </header>

        <div className="mb-6 animate-fade-in">
          <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} />
                  <span className="font-semibold">Твой прогресс</span>
                </div>
                <span className="text-2xl font-bold">{userProgress}%</span>
              </div>
              <Progress value={userProgress} className="h-3 bg-white/20" />
              <p className="text-sm mt-2 text-white/90">Продолжай в том же духе! 🎸</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="chords" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid bg-white shadow-md">
            <TabsTrigger value="chords" className="gap-2">
              <Icon name="Hand" className="w-4 h-4" />
              Аккорды
            </TabsTrigger>
            <TabsTrigger value="tabs" className="gap-2">
              <Icon name="FileMusic" className="w-4 h-4" />
              Табулатуры
            </TabsTrigger>
            <TabsTrigger value="exercises" className="gap-2">
              <Icon name="Dumbbell" className="w-4 h-4" />
              Упражнения
            </TabsTrigger>
            <TabsTrigger value="theory" className="gap-2">
              <Icon name="BookOpen" className="w-4 h-4" />
              Теория
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chords" className="space-y-4 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Hand" className="text-purple-500" />
                  Библиотека аккордов
                </CardTitle>
                <CardDescription>Изучай и практикуй основные аккорды</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {CHORDS_DATA.map((chord, idx) => (
                    <div key={idx} className="animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <ChordDiagram chord={chord} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tabs" className="space-y-4">
            <TablatureEditor />
            
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Сохранённые композиции</CardTitle>
                <CardDescription>Твои табулатуры и любимые песни</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Metallica - Nothing Else Matters', 'Nirvana - Smells Like Teen Spirit', 'The Beatles - Let It Be'].map((song, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg hover:shadow-md transition-all border border-purple-100">
                      <div className="flex items-center gap-3">
                        <Icon name="Music" className="text-purple-500" />
                        <span className="font-medium">{song}</span>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Icon name="Play" className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exercises" className="space-y-4 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Dumbbell" className="text-purple-500" />
                  Ежедневные упражнения
                </CardTitle>
                <CardDescription>Развивай технику игры с помощью практических заданий</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {EXERCISES.map((exercise) => (
                  <div key={exercise.id} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-100 hover:border-purple-300 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-800">{exercise.name}</h4>
                        <p className="text-sm text-gray-600">{exercise.description}</p>
                      </div>
                      <Button size="sm">
                        <Icon name="Play" className="w-4 h-4 mr-1" />
                        Начать
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Прогресс</span>
                        <span className="font-semibold text-purple-600">{exercise.progress}%</span>
                      </div>
                      <Progress value={exercise.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="theory" className="space-y-4 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-all border-2 border-purple-100">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-2">
                    <Icon name="Music2" className="text-purple-600" size={24} />
                  </div>
                  <CardTitle>Основы нотной грамоты</CardTitle>
                  <CardDescription>Научись читать ноты и понимать музыкальную теорию</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Icon name="BookOpen" className="w-4 h-4 mr-2" />
                    Начать урок
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all border-2 border-blue-100">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
                    <Icon name="Zap" className="text-blue-600" size={24} />
                  </div>
                  <CardTitle>Ритм и метроном</CardTitle>
                  <CardDescription>Развивай чувство ритма и играй в такт</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="secondary">
                    <Icon name="PlayCircle" className="w-4 h-4 mr-2" />
                    Начать урок
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all border-2 border-green-100">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-2">
                    <Icon name="Target" className="text-green-600" size={24} />
                  </div>
                  <CardTitle>Гаммы и лады</CardTitle>
                  <CardDescription>Изучай гаммы для импровизации и соло</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <Icon name="BookOpen" className="w-4 h-4 mr-2" />
                    Начать урок
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all border-2 border-orange-100">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-2">
                    <Icon name="Headphones" className="text-orange-600" size={24} />
                  </div>
                  <CardTitle>Слуховое восприятие</CardTitle>
                  <CardDescription>Тренируй музыкальный слух и подбирай мелодии</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <Icon name="Ear" className="w-4 h-4 mr-2" />
                    Начать урок
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
