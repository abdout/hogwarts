import AnalizeCard from "@/components/admin/card";
import Announcements from "@/components/Announcements";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import {FinanceChart } from "@/components/atom/chart/finance";
import UserCard from "@/components/admin/card";
import { StudentGenderChart } from "@/components/atom/chart/lab";

const AdminPage = ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
     
      <div className="w-full  flex flex-col gap-8">
        <UserCard />
        <div className="flex items-center justify-between">  
          <StudentGenderChart />
          <StudentGenderChart />
          <StudentGenderChart />
        </div>
        <div className="flex w-full justify-between items-center">
          <FinanceChart />
          <FinanceChart />
        </div>
      </div>
      {/* RIGHT */}
      {/* <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendarContainer searchParams={searchParams}/>
        <Announcements />
      </div> */}
    </div>
  );
};

export default AdminPage;
