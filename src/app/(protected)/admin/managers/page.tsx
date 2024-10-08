import DashboardAside from '@/components/dashboard/dashboard-aside';
import DashboardPage from '@/components/dashboard/dashboard-page';

const ManagersPage: React.FC = () => {
    return (
        <div className="bg-admin-bg h-[100vh] p-2">
            <DashboardPage pageName="Объекты"></DashboardPage>
        </div>
    );
};

export default ManagersPage;
