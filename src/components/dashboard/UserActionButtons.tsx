// UserActionButtons.tsx
'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ActionButtonsProps } from './ActionButtons.interface';

const UserActionButtons: React.FC<ActionButtonsProps> = ({ objectId, onDelete }) => {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/dashboard/users/update/${objectId}`);
    };

    // Функция для удаления пользователя
    const handleDelete = async () => {
        if (!objectId) {
            console.error('No user ID provided for deletion');
            return;
        }

        try {
            const response = await fetch(`/api/users`, {
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
            console.error('Error deleting user:', error);
            alert('An error occurred while deleting the user.');
        }
    };

    return (
        <div className="flex gap-2">
            <Image
                src={'/iconamoon_edit.svg'}
                className="cursor-pointer"
                alt="edit"
                width={16}
                height={16}
                onClick={handleEdit}
            />
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

export default UserActionButtons;
