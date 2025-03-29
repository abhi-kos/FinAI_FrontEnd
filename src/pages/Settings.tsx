
import MainLayout from "@/components/layout/MainLayout";
import SettingsView from "@/components/settings/SettingsView";

const Settings = () => {
  return (
    <MainLayout>
      <div className="h-full">
        <SettingsView />
      </div>
    </MainLayout>
  );
};

export default Settings;
