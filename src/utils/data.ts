import {
    mdiStethoscope,
    mdiBabyCarriage,
    mdiBandage,
    mdiDrawPen,
    mdiLightbulbVariantOutline,
} from '@mdi/js';


export const dashboardCardData = [
    {
        title: 'Total Practices',
        value: '11',
        icon: mdiStethoscope,
        percentage: '15',
    },
    {
        title: 'Total Subscribers',
        value: '261',
        icon: mdiBabyCarriage,
        percentage: '15',
    },
    {
        title: 'Total Treatments',
        value: '135',
        icon: mdiBandage,
        percentage: '15',
    },
    {
        title: 'Total Consents',
        value: '135',
        icon: mdiDrawPen,
        percentage: '15',
    },
    {
        title: 'Total Consents signed',
        value: '2159',
        icon: mdiDrawPen,
        percentage: '15',
    },
    {
        title: 'Total Fact sheets read',
        value: '2159',
        icon: mdiLightbulbVariantOutline,
        percentage: '15',
    },
];

export const circularProgressData = [
    { value: 24, label: "Pending", color: "#FF966B" },
    { value: 56, label: "Registered", color: "#54D62C" },
    { value: 20, label: "Post Treatment", color: "#1890FF" },
]

export const patientData = [
    { id: 1, name: 'Alice Smith', age: 32, status: 'Pending', treatment: 'Fertility Treatment A' },
    { id: 2, name: 'Bob Johnson', age: 45, status: 'Registered', treatment: 'Fertility Treatment B' },
    { id: 3, name: 'Charlie Brown', age: 28, status: 'Post Treatment', treatment: 'Post-Natal Care' },
    { id: 4, name: 'Diana Lee', age: 39, status: 'Pending', treatment: 'Fertility Treatment C' },
    { id: 5, name: 'Ethan Davis', age: 51, status: 'Registered', treatment: 'Fertility Treatment D' },
    { id: 6, name: 'Fiona White', age: 26, status: 'Post Treatment', treatment: 'Post-Natal Care' },
];