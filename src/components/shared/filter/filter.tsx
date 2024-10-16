import React, { useContext, useState } from 'react';
import { Modal, Button, Input, Select, InputNumber } from 'antd';
import { ObjectContext } from '@/providers/objectsProvider';
import { ObjectType } from '@prisma/client';

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

    const handleReset = () => {
        setFilters({
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
    };

    return (
        <Modal
            title="Фильтры"
            open={visible}
            onOk={handleOk}
            width={1000}
            okText="Сохранить"
            cancelText="Сбросить"
            onCancel={onCancel} // Закрываем модалку при нажатии "Отмена"
            footer={[
                <Button key="reset" onClick={handleReset}>
                    Сбросить
                </Button>,
                <Button key="apply" type="primary" onClick={handleOk}>
                    Сохранить
                </Button>,
            ]}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                {/* Left column */}
                <div style={{ flex: 1 }}>
                    <div>
                        <label>Назначение объекта</label>
                        <Select
                            placeholder="Выбрать"
                            style={{ width: '100%' }}
                            onChange={(value) => handleFilterChange('type', value)}>
                            <Option value={ObjectType.RESIDENTIAL}>Жилой дом</Option>
                            <Option value={ObjectType.PUBLIC_OFFICE}>
                                Общественное или административно-офисное помещение
                            </Option>
                            <Option value={ObjectType.EDUCATIONAL}>Учреждение образования</Option>
                            <Option value={ObjectType.HEALTHCARE}>Здравоохранение</Option>
                            <Option value={ObjectType.TRADE}>Объект торгового назначения</Option>
                            <Option value={ObjectType.CULTURAL}>Культурный объект</Option>
                            <Option value={ObjectType.CATERING}>
                                Предприятие общественного питания
                            </Option>
                            <Option value={ObjectType.INDUSTRIAL}>
                                Объект производственного назначения
                            </Option>
                            <Option value={ObjectType.URBAN_INFRASTRUCTURE}>
                                Объект городской инфраструктуры
                            </Option>
                            <Option value={ObjectType.TRANSPORT_INFRASTRUCTURE}>
                                Транспортная инфраструктура
                            </Option>
                            <Option value={ObjectType.RELIGIOUS}>Религиозное сооружение</Option>
                            <Option value={ObjectType.CIVIL_DEFENSE}>
                                Объект защиты населения
                            </Option>
                            <Option value={ObjectType.WAREHOUSE}>
                                Объект складского назначения
                            </Option>
                            <Option value={ObjectType.NON_RESIDENTIAL}>Нежилое помещение</Option>
                            <Option value={ObjectType.COMPLEX_DEVELOPMENT}>
                                Комплексная застройка
                            </Option>
                            <Option value={ObjectType.TEMPORARY}>Временный объект</Option>
                            <Option value={ObjectType.UNFINISHED_CONSTRUCTION}>
                                Объект незавершенного строительства
                            </Option>
                            <Option value={ObjectType.OTHER}>Прочее</Option>
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
                            <InputNumber
                                className="w-full"
                                placeholder="От 0"
                                min={0}
                                max={100}
                                onChange={(value) => handleFilterChange('wearFrom', value)}
                            />
                            <InputNumber
                                min={1}
                                max={100}
                                className="w-full"
                                placeholder="До 100"
                                onChange={(value) => handleFilterChange('wearTo', value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div style={{ flex: 1 }}>
                    <div>
                        <label>Год постройки</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <InputNumber
                                min={1900}
                                max={2024}
                                placeholder="От 1900"
                                onChange={(value) => handleFilterChange('yearFrom', value)}
                            />
                            <InputNumber
                                min={1901}
                                max={2024}
                                placeholder="До 2024"
                                onChange={(value) => handleFilterChange('yearTo', value)}
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
                            <Option value="kobrin">Кобрин</Option>
                            <Option value="malorita">Малорита</Option>
                            <Option value="baranovichi">Барановичи</Option>
                            <Option value="pruzhany">Пружаны</Option>
                            <Option value="bereza">Береза</Option>
                            <Option value="zhabinka">Жабинка</Option>
                            <Option value="kamenets">Каменец</Option>
                            <Option value="gantsevichi">Ганцевичи</Option>
                            <Option value="stolin">Столин</Option>
                        </Select>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <label>Готовность, %</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <InputNumber
                                className="w-full"
                                placeholder="От 0"
                                min={0}
                                max={100}
                                onChange={(value) => handleFilterChange('readinessFrom', value)}
                            />
                            <InputNumber
                                className="w-full"
                                min={1}
                                max={100}
                                placeholder="До 100"
                                onChange={(value) => handleFilterChange('readinessTo', value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default FilterModal;
