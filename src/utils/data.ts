import {
    mdiStethoscope,
    mdiBabyCarriage,
    mdiBandage,
    mdiDrawPen,
    mdiLightbulbVariantOutline,
} from '@mdi/js';
import usePatientStore from '../store/usePatientStore';
import { Practice, UserData } from './interfaces';


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


export const generateCircularProgressData = () => {
    const { patients } = usePatientStore.getState();

    const statusCounts = patients.reduce(
        (acc, patient) => {
            if (patient.status === 'Pending') acc.Pending += 1;
            else if (patient.status === 'Registered') acc.Registered += 1;
            else if (patient.status === 'Post Treatment') acc.PostTreatment += 1;
            return acc;
        },
        { Pending: 0, Registered: 0, PostTreatment: 0 }
    );

    return [
        { value: statusCounts.Pending, label: 'Pending', color: '#FF966B' },
        { value: statusCounts.Registered, label: 'Registered', color: '#54D62C' },
        { value: statusCounts.PostTreatment, label: 'Post Treatment', color: '#1890FF' },
    ];
};

export const practiceData: Practice[] = [
    { id: 1, name: "Cape Fertility Clinic", tel: "+21 794 3956", email: "info@capefertility.co.za", date: "04/10/2021", status: "Active" },
    { id: 2, name: "Sandton Reproductive Centre", tel: "+11 325 6723", email: "admin@sandtonrc.co.za", date: "12/03/2022", status: "Active" },
    { id: 3, name: "Pretoria IVF Centre", tel: "+12 998 1124", email: "contact@pretoriaivf.co.za", date: "18/08/2020", status: "Disabled" },
    { id: 4, name: "Durban Fertility Hospital", tel: "+31 764 9876", email: "support@durbanfertility.co.za", date: "25/11/2023", status: "Active" },
    { id: 5, name: "Johannesburg Fertility Hub", tel: "+10 876 2233", email: "info@joburgfertilityhub.co.za", date: "10/05/2021", status: "Disabled" },
    { id: 6, name: "Eastern Cape Fertility", tel: "+40 112 6654", email: "hello@ecfertility.co.za", date: "07/07/2022", status: "Active" },
    { id: 7, name: "Garden Route Fertility", tel: "+44 778 1234", email: "reception@gardenroutefertility.co.za", date: "09/09/2020", status: "Disabled" },
    { id: 8, name: "Bloemfontein Reproductive Clinic", tel: "+51 654 2233", email: "care@bloemfertility.co.za", date: "02/02/2021", status: "Active" },
    { id: 9, name: "Soweto IVF Services", tel: "+16 432 1999", email: "team@sowetoivf.co.za", date: "14/04/2023", status: "Active" },
    { id: 10, name: "Polokwane Fertility Care", tel: "+15 321 4488", email: "connect@polofertility.co.za", date: "22/06/2022", status: "Disabled" },
    { id: 11, name: "Free State IVF Specialists", tel: "+51 998 7766", email: "fsivf@fertility.co.za", date: "30/01/2024", status: "Active" }
]


export const initialUsers: UserData[] = [
    { id: '1', displayName: 'Alice Johnson', email: 'alice@myfertilityjourney.co.za' },
    { id: '2', displayName: 'Bob Smith', email: 'bob@myfertilityjourney.co.za' },
    { id: '3', displayName: 'Charlie Brown', email: 'charlie@myfertilityjourney.co.za' },
    { id: '4', displayName: 'David Wilson', email: 'david@myfertilityjourney.co.za' },
    { id: '5', displayName: 'Emma Davis', email: 'emma@myfertilityjourney.co.za' },
    { id: '6', displayName: 'Frank Thomas', email: 'frank@myfertilityjourney.co.za' },
    { id: '7', displayName: 'Grace White', email: 'grace@myfertilityjourney.co.za' },
    { id: '8', displayName: 'Henry Lee', email: 'henry@myfertilityjourney.co.za' },
    { id: '9', displayName: 'Isabella Hall', email: 'isabella@myfertilityjourney.co.za' },
    { id: '10', displayName: 'Jack Allen', email: 'jack@myfertilityjourney.co.za' },
    { id: '11', displayName: 'Kelly Martinez', email: 'kelly@myfertilityjourney.co.za' },
    { id: '12', displayName: 'Liam Hernandez', email: 'liam@myfertilityjourney.co.za' },
    { id: '13', displayName: 'Mia Robinson', email: 'mia@myfertilityjourney.co.za' },
    { id: '14', displayName: 'Nathan Walker', email: 'nathan@myfertilityjourney.co.za' },
    { id: '15', displayName: 'Olivia King', email: 'olivia@myfertilityjourney.co.za' },
    { id: '16', displayName: 'Paul Young', email: 'paul@myfertilityjourney.co.za' },
    { id: '17', displayName: 'Quinn Scott', email: 'quinn@myfertilityjourney.co.za' },
    { id: '18', displayName: 'Rachel Green', email: 'rachel@myfertilityjourney.co.za' },
    { id: '19', displayName: 'Samuel Adams', email: 'samuel@myfertilityjourney.co.za' },
    { id: '20', displayName: 'Tina Perez', email: 'tina@myfertilityjourney.co.za' },
];
