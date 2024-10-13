import React, { useState } from 'react';
import { Modal, Button, Input, Select } from 'antd';

const { Option } = Select;

interface FilterModalProps {
    visible: boolean;
    onOk: (filters: any) => void;
    onCancel: (filters: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onOk, onCancel }) => {
    const [filters, setFilters] = useState({
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
        setFilters({ ...filters, [key]: value });
    };

    const handleOk = () => {
        onOk(filters); // Передаем фильтры в родительский компонент
    };

    return (
        <Modal
            title="Фильтры"
            open={visible}
            onOk={handleOk}
            onCancel={handleOk}
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
                            <Option value="Жилой дом">Жилой дом</Option>
                            <Option value="Культурный объект">Культурный объект</Option>
                        </Select>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <label>Область</label>
                        <Select
                            placeholder="Выбрать"
                            style={{ width: '100%' }}
                            onChange={(value) => handleFilterChange('region', value)}>
                            <Option value="Область 1">Область 1</Option>
                            <Option value="Область 2">Область 2</Option>
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
                        <label>Населенный пункт</label>
                        <Select
                            placeholder="Выбрать"
                            style={{ width: '100%' }}
                            onChange={(value) => handleFilterChange('city', value)}>
                            <Option value="Город 1">Город 1</Option>
                            <Option value="Город 2">Город 2</Option>
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
