'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ActionButtonsProps } from './ActionButtons.interface';

const ActionButtons: React.FC<ActionButtonsProps> = ({ objectId, onDelete }) => {
    // Добавляем onDelete как пропс
    const router = useRouter();

    // Функция для удаления объекта
    const handleDelete = async () => {
        if (!objectId) {
            console.error('No object ID provided for deletion');
            return;
        }

        try {
            const response = await fetch(`/api/objects`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: objectId }), // Убедитесь, что id отправляется правильно
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            // Вызываем onDelete для обновления dataSource в родительском компоненте
            onDelete(objectId);
        } catch (error) {
            console.error('Error deleting object:', error);
            alert('An error occurred while deleting the object.');
        }
    };

    return (
        <div className="flex gap-2">
            <Image src={'/iconamoon_edit.svg'} alt="edit" width={16} height={16} />
            <Image
                src={'/symbols_delete.svg'}
                alt="delete"
                width={16}
                height={16}
                className="cursor-pointer"
                onClick={handleDelete}
            />
        </div>
    );
};

export default ActionButtons;
