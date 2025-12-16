import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const mockRegistries = [
  { id: 1, title: 'Научные публикации', year: 2024, category: 'Наука', status: 'Активен', entries: 156 },
  { id: 2, title: 'Исследовательские проекты', year: 2023, category: 'Исследования', status: 'Активен', entries: 89 },
  { id: 3, title: 'Диссертации', year: 2024, category: 'Наука', status: 'Архив', entries: 234 },
  { id: 4, title: 'Конференции', year: 2024, category: 'События', status: 'Активен', entries: 45 },
];

const mockCompetitions = [
  { 
    id: 1, 
    title: 'Инновации в образовании', 
    author: 'А.И. Петров',
    year: 2024,
    category: 'Педагогика',
    status: 'Победитель',
    description: 'Разработка интерактивных методов обучения с применением цифровых технологий'
  },
  { 
    id: 2, 
    title: 'Цифровая трансформация библиотек', 
    author: 'М.С. Иванова',
    year: 2024,
    category: 'Библиотечное дело',
    status: 'Призёр',
    description: 'Концепция модернизации библиотечных услуг в эпоху цифровизации'
  },
  { 
    id: 3, 
    title: 'Устойчивое развитие регионов', 
    author: 'В.П. Сидоров',
    year: 2023,
    category: 'Экология',
    status: 'Участник',
    description: 'Анализ экологических инициатив и их влияние на региональное развитие'
  },
];

const mockLibrary = [
  { id: 1, title: 'Методология научных исследований', author: 'И.В. Кузнецов', year: 2023, category: 'Методология', format: 'PDF' },
  { id: 2, title: 'История российской науки', author: 'Е.А. Морозова', year: 2022, category: 'История', format: 'PDF' },
  { id: 3, title: 'Современные образовательные технологии', author: 'Д.С. Волков', year: 2024, category: 'Образование', format: 'DOCX' },
  { id: 4, title: 'Цифровые архивы', author: 'Н.П. Лебедева', year: 2023, category: 'Архивоведение', format: 'PDF' },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('year');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                <Icon name="BookOpen" className="text-primary-foreground" size={24} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">Академическая библиотека</h1>
                <p className="text-muted-foreground mt-1">Реестры, конкурсные работы и научные материалы</p>
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <Icon name="User" size={18} />
              Личный кабинет
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <Icon name="Database" className="text-primary" size={20} />
              </div>
              <CardTitle className="text-2xl">156</CardTitle>
              <CardDescription>Активных реестров</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-2">
                <Icon name="Award" className="text-accent" size={20} />
              </div>
              <CardTitle className="text-2xl">342</CardTitle>
              <CardDescription>Конкурсных работ</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <Icon name="BookMarked" className="text-primary" size={20} />
              </div>
              <CardTitle className="text-2xl">1,247</CardTitle>
              <CardDescription>Документов в библиотеке</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-2">
                <Icon name="FileText" className="text-accent" size={20} />
              </div>
              <CardTitle className="text-2xl">589</CardTitle>
              <CardDescription>Файлов PDF и др.</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="relative flex-1">
              <Icon name="Search" className="absolute left-3 top-3 text-muted-foreground" size={18} />
              <Input
                placeholder="Поиск по всем разделам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  <SelectItem value="science">Наука</SelectItem>
                  <SelectItem value="education">Образование</SelectItem>
                  <SelectItem value="research">Исследования</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year">По году</SelectItem>
                  <SelectItem value="title">По названию</SelectItem>
                  <SelectItem value="author">По автору</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Tabs defaultValue="registries" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="registries" className="gap-2">
              <Icon name="Table" size={18} />
              Реестры
            </TabsTrigger>
            <TabsTrigger value="competitions" className="gap-2">
              <Icon name="Trophy" size={18} />
              Конкурсные работы
            </TabsTrigger>
            <TabsTrigger value="library" className="gap-2">
              <Icon name="Library" size={18} />
              Библиотека
            </TabsTrigger>
          </TabsList>

          <TabsContent value="registries" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Табличные реестры</CardTitle>
                <CardDescription>Структурированные данные и документация</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Год</TableHead>
                      <TableHead>Категория</TableHead>
                      <TableHead>Записей</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRegistries.map((registry) => (
                      <TableRow key={registry.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{registry.title}</TableCell>
                        <TableCell>{registry.year}</TableCell>
                        <TableCell>{registry.category}</TableCell>
                        <TableCell>{registry.entries}</TableCell>
                        <TableCell>
                          <Badge variant={registry.status === 'Активен' ? 'default' : 'secondary'}>
                            {registry.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Icon name="Eye" size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competitions" className="space-y-6">
            {mockCompetitions.map((work) => (
              <Card key={work.id} className="border-2 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{work.title}</CardTitle>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Icon name="User" size={14} />
                          {work.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          {work.year}
                        </span>
                        <Badge variant="outline">{work.category}</Badge>
                      </div>
                    </div>
                    <Badge 
                      variant={work.status === 'Победитель' ? 'default' : 'secondary'}
                      className="ml-4"
                    >
                      {work.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {work.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                      <Icon name="FileText" size={16} />
                      Открыть работу
                    </Button>
                    <Button variant="ghost" className="gap-2">
                      <Icon name="Download" size={16} />
                      Скачать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="library" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Электронная библиотека</CardTitle>
                <CardDescription>Научные материалы и документация</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockLibrary.map((doc) => (
                    <Card key={doc.id} className="border hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-accent/10 rounded flex items-center justify-center flex-shrink-0">
                            <Icon name="FileText" className="text-accent" size={24} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg mb-1 line-clamp-2">{doc.title}</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{doc.author}</span>
                              <span>•</span>
                              <span>{doc.year}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">{doc.category}</Badge>
                              <Badge variant="secondary" className="text-xs">{doc.format}</Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 gap-1">
                            <Icon name="Eye" size={14} />
                            Просмотр
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Icon name="Download" size={14} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border bg-card mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2024 Академическая библиотека. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">О проекте</a>
              <a href="#" className="hover:text-foreground transition-colors">Контакты</a>
              <a href="#" className="hover:text-foreground transition-colors">Помощь</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
