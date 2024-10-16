import React, { useContext, useState } from 'react';
import { Modal, Button, Input, Select } from 'antd';
import { ObjectContext } from '@/providers/objectsProvider';

const { Option } = Select;

interface FilterModalProps {
    visible: boolean;
    onOk: (filters: any) => void;
    onCancel: (filters: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onOk, onCancel }) => {
    const { setFilters } = useContext(ObjectContext);
    const [filters, setFilter] = useState({
        type: '',
        yearFrom: '',
        yearTo: '',
        region: '',
        city: '',
        wearFrom: '',
        wearTo: '',
        readinessFrom: '',
        readinessTo: '',
    });

    const handleFilterChange = (key: string, value: any) => {
        setFilter({ ...filters, [key]: value });
    };

    const handleOk = () => {
        setFilters(filters);
        onOk(filters);
    };

    return (
        <Modal
            title="Фильтры"
            open={visible}
            onOk={handleOk}
            onCancel={handleOk}
            width={1000}
            okText="Сохранить"
            cancelText="Сбросить">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                {/* Left column */}
                <div style={{ flex: 1 }}>
                    <div>
                        <label>Назначение объекта</label>
                        <Select
                            placeholder="Выбрать"
                            style={{ width: '100%' }}
                            onChange={(value) => handleFilterChange('type', value)}>
                            <Option value="RESIDENTIAL">Жилой дом</Option>
                            <Option value="Общественное помещение">
                                Общественное или административно-офисное помещение
                            </Option>
                            <Option value="Учреждение образования">Учреждение образования</Option>
                            <Option value="Здравоохранение">Здравоохранение</Option>
                            <Option value="Объект торгового назначения">
                                Объект торгового назначения
                            </Option>
                            <Option value="Культурный объект">Культурный объект</Option>
                            <Option value="Предприятие общественного питания">
                                Предприятие общественного питания
                            </Option>
                            <Option value="Объект производственного назначения">
                                Объект производственного назначения
                            </Option>
                            <Option value="Объект городской инфраструктуры">
                                Объект городской инфраструктуры
                            </Option>
                            <Option value="Транспортная инфраструктура">
                                Транспортная инфраструктура
                            </Option>
                            <Option value="Религиозное сооружение">Религиозное сооружение</Option>
                            <Option value="Объект защиты населения">Объект защиты населения</Option>
                            <Option value="Объект складского назначения">
                                Объект складского назначения
                            </Option>
                            <Option value="Нежилое помещение">Нежилое помещение</Option>
                            <Option value="Комплексная застройка">Комплексная застройка</Option>
                            <Option value="Временный объект">Временный объект</Option>
                            <Option value="Объект незавершенного строительства">
                                Объект незавершенного строительства
                            </Option>
                            <Option value="Прочее">Прочее</Option>
                        </Select>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <label>Область</label>
                        <Select
                            placeholder="Выбрать"
                            style={{ width: '100%' }}
                            onChange={(value) => handleFilterChange('region', value)}>
                            <Option value="Brest">Брестская область</Option>
                        </Select>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <label>Физический износ, %</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Input
                                placeholder="От 0"
                                onChange={(e) => handleFilterChange('wearFrom', e.target.value)}
                            />
                            <Input
                                placeholder="До 100"
                                onChange={(e) => handleFilterChange('wearTo', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div style={{ flex: 1 }}>
                    <div>
                        <label>Год постройки</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Input
                                placeholder="От 1900"
                                onChange={(e) => handleFilterChange('yearFrom', e.target.value)}
                            />
                            <Input
                                placeholder="До 2024"
                                onChange={(e) => handleFilterChange('yearTo', e.target.value)}
                            />
                        </div>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <label>Город</label>
                        <Select
                            placeholder="Выбрать"
                            style={{ width: '100%' }}
                            onChange={(value) => handleFilterChange('city', value)}>
                            <Option value="brest">Брест</Option>
                            <Option value="">Кобрин</Option>
                            <Option value="">Малорита</Option>
                            <Option value="">Барановичи</Option>
                            <Option value="">Пружаны</Option>
                            <Option value="">Береза</Option>
                            <Option value="">Жабинка</Option>
                            <Option value="">Каменец</Option>
                            <Option value="">Ганцевичи</Option>
                            <Option value="">Столин</Option>
                        </Select>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <label>Готовность, %</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Input
                                placeholder="От 0"
                                onChange={(e) =>
                                    handleFilterChange('readinessFrom', e.target.value)
                                }
                            />
                            <Input
                                placeholder="До 100"
                                onChange={(e) => handleFilterChange('readinessTo', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default FilterModal;
