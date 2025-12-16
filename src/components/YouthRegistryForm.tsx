import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface YouthOrganization {
  id?: number;
  number: number;
  municipality: string;
  educational_institution: string;
  organization_name: string;
  contact_details: string;
  participants_count: number;
  activity_direction: string;
  local_act_details: string;
  website_url?: string;
}

interface YouthRegistryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organization?: YouthOrganization | null;
  onSuccess: () => void;
}

export default function YouthRegistryForm({
  open,
  onOpenChange,
  organization,
  onSuccess,
}: YouthRegistryFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<YouthOrganization>({
    number: organization?.number || 0,
    municipality: organization?.municipality || '',
    educational_institution: organization?.educational_institution || '',
    organization_name: organization?.organization_name || '',
    contact_details: organization?.contact_details || '',
    participants_count: organization?.participants_count || 0,
    activity_direction: organization?.activity_direction || '',
    local_act_details: organization?.local_act_details || '',
    website_url: organization?.website_url || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = 'https://functions.poehali.dev/f5878afa-d007-4999-a9ca-a6b0c122e30a';
      const method = organization?.id ? 'PUT' : 'POST';
      const body = organization?.id 
        ? { ...formData, id: organization.id }
        : formData;

      const response = await fetch(apiUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Ошибка при сохранении данных');
      }

      toast({
        title: 'Успешно',
        description: organization?.id
          ? 'Запись обновлена'
          : 'Запись добавлена',
      });

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить данные',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {organization?.id ? 'Редактировать запись' : 'Добавить объединение'}
          </DialogTitle>
          <DialogDescription>
            Заполните все поля для добавления в реестр
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="number">№ п/п</Label>
            <Input
              id="number"
              type="number"
              value={formData.number}
              onChange={(e) =>
                setFormData({ ...formData, number: parseInt(e.target.value) || 0 })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="municipality">Муниципальное образование</Label>
            <Input
              id="municipality"
              value={formData.municipality}
              onChange={(e) =>
                setFormData({ ...formData, municipality: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="educational_institution">Образовательная организация</Label>
            <Input
              id="educational_institution"
              value={formData.educational_institution}
              onChange={(e) =>
                setFormData({ ...formData, educational_institution: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="organization_name">Наименование объединения</Label>
            <Input
              id="organization_name"
              value={formData.organization_name}
              onChange={(e) =>
                setFormData({ ...formData, organization_name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="contact_details">Контактные данные образовательной организации</Label>
            <Textarea
              id="contact_details"
              value={formData.contact_details}
              onChange={(e) =>
                setFormData({ ...formData, contact_details: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="participants_count">Количество участников</Label>
            <Input
              id="participants_count"
              type="number"
              value={formData.participants_count}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  participants_count: parseInt(e.target.value) || 0,
                })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="activity_direction">Направление деятельности объединения</Label>
            <Input
              id="activity_direction"
              value={formData.activity_direction}
              onChange={(e) =>
                setFormData({ ...formData, activity_direction: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="local_act_details">Реквизиты локального акта об объединении</Label>
            <Textarea
              id="local_act_details"
              value={formData.local_act_details}
              onChange={(e) =>
                setFormData({ ...formData, local_act_details: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="website_url">
              Ссылка на сайт или страницу объединения (необязательно)
            </Label>
            <Input
              id="website_url"
              type="url"
              value={formData.website_url}
              onChange={(e) =>
                setFormData({ ...formData, website_url: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
