export const objectTypeConvert = (selectedObjectType: string | null) => {
    switch (selectedObjectType) {
        case 'RESIDENTIAL':
            return 'Жилой объект';
        case 'PUBLIC_OFFICE':
            return 'Общественное или административно-офисное помещение';
        case 'EDUCATIONAL':
            return 'Учреждение образования';
        case 'HEALTHCARE':
            return 'Здравоохранение';
        case 'TRADE':
            return 'Объект торгового назначения';
        case 'CULTURAL':
            return 'Культурный объект';
        case 'CATERING':
            return 'Предприятие общественного питания';
        case 'INDUSTRIAL':
            return 'Промышленный объект';
        case 'URBAN_INFRASTRUCTURE':
            return 'Объект городской инфраструктуры';
        case 'TRANSPORT_INFRASTRUCTURE':
            return 'Транспортная инфраструктура';
        case 'RELIGIOUS':
            return 'Религиозное сооружение';
        case 'CIVIL_DEFENSE':
            return 'Объект защиты населения';
        case 'WAREHOUSE':
            return 'Объект складского назначения';
        case 'NON_RESIDENTIAL':
            return 'Нежилое помещение';
        case 'COMPLEX_DEVELOPMENT':
            return 'Комплексная застройка';
        case 'TEMPORARY':
            return 'Временный объект';
        case 'UNFINISHED_CONSTRUCTION':
            return 'Объект незавершенного строительства';
        case 'OTHER':
            return 'Прочее';
        default:
            return 'Неизвестный тип';
    }
};
