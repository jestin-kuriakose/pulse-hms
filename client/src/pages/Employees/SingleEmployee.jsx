import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  deleteEmployeeSchedule,
  fetchEmployeeById,
  fetchEmployeeSchedule,
  saveEmployeeSchedule,
  updateEmployeeSchedule,
} from "../../features/Employees/employeeSlice";
import { toast } from "react-toastify";
import EmployeeScheduleCalendar from "../../features/Employees/components/employees/EmployeeScheduleCalender";
import EmployeeDetails from "../../features/Employees/components/employees/EmployeeDetails";
import { AddScheduleModal } from "../../features/Employees/components/modal/AddScheduleModal";
import { EditScheduleModal } from "../../features/Employees/components/modal/EditScheduleModal";
import EmployeeAuditLogs from "../../features/Employees/components/employees/EmployeeAuditLogs";
import { defaultScheduleTime } from "../../features/Employees/utils/employeeHelpers";
import { Button, MainHeading, SectionHeader } from "../../components/ui";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

const SingleEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentEmployee = useSelector(
    (state) => state.employees.currentEmployee
  );
  const status = useSelector((state) => state.employees.status);
  const error = useSelector((state) => state.employees.error);
  const currentEmployeeSchedule = useSelector(
    (state) => state.employees.schedule
  );
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    date: null,
    start: null,
    end: null,
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showAuditLogs, setShowAuditLogs] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployeeById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentEmployee && id) {
      const startDate = moment().startOf("month").format("YYYY-MM-DD");
      const endDate = moment().endOf("month").format("YYYY-MM-DD");
      dispatch(fetchEmployeeSchedule({ id, startDate, endDate }));
    }
  }, [dispatch, id, currentEmployee]);

  useEffect(() => {
    if (currentEmployee && currentEmployeeSchedule) {
      setEvents(
        currentEmployeeSchedule?.map((event) => ({
          id: event.id,
          start: new Date(event.startTime),
          end: new Date(event.endTime),
          title: `${moment(event.startTime).format("h:mm A")} - ${moment(
            event.endTime
          ).format("h:mm A")}`,
        }))
      );
    }
  }, [currentEmployee, currentEmployeeSchedule]);

  const handleSelectEvent = (event) => {
    console.log(event);
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleSelectSlot = ({ start }) => {
    setNewEvent({
      date: start,
      start: defaultScheduleTime().start,
      end: defaultScheduleTime().end,
    });
    setIsModalOpen(true);
  };

  const handleUpdateEvent = async () => {
    try {
      await dispatch(
        updateEmployeeSchedule({
          employeeId: id,
          scheduleId: selectedEvent.id,
          schedule: {
            date: moment(selectedEvent.start).format("YYYY-MM-DD"),
            start: moment(selectedEvent.start).format("HH:mm"),
            end: moment(selectedEvent.end).format("HH:mm"),
          },
        })
      ).unwrap();
      setIsEditModalOpen(false);
      // Fetch updated schedule after successful update
      const startDate = moment().startOf("month").format("YYYY-MM-DD");
      const endDate = moment().endOf("month").format("YYYY-MM-DD");
      dispatch(fetchEmployeeSchedule({ id, startDate, endDate }));
      toast.success("Schedule updated successfully");
    } catch (error) {
      toast.error("Failed to update schedule");
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await dispatch(
        deleteEmployeeSchedule({ employeeId: id, scheduleId: selectedEvent.id })
      ).unwrap();
      setEvents(events.filter((event) => event !== selectedEvent));
      setIsEditModalOpen(false);
      toast.success("Schedule deleted successfully");
    } catch (error) {
      toast.error("Failed to delete schedule");
    }
  };

  const handleSaveEvent = async () => {
    const newScheduleEvent = {
      date: moment(newEvent.date).format("YYYY-MM-DD"),
      start: moment(newEvent.start).format("HH:mm"),
      end: moment(newEvent.end).format("HH:mm"),
    };
    try {
      await dispatch(
        saveEmployeeSchedule({
          employeeId: id,
          schedule: newScheduleEvent,
        })
      ).unwrap();
      setIsModalOpen(false);
      toast.success("Schedule updated successfully");
    } catch (error) {
      toast.error("Failed to update schedule");
    }
  };
  console.log(events);
  if (!currentEmployee || status === "loading")
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  if (error) {
    return (
      <div className="w-full text-pry h-screen flex items-center justify-center text-center bg-white">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-8 rounded-lg shadow-lg my-8 mx-4">
      <div className="flex justify-between items-center mb-8">
        <MainHeading
          title={currentEmployee.firstName + " " + currentEmployee.lastName}
        />
        <Button onClick={() => navigate(`/employees/edit/${id}`)}>
          <div className="flex justify-center items-center">
            <PencilSquareIcon className="h-5 w-5 mr-2" />
            Edit Details
          </div>
        </Button>
      </div>

      <EmployeeDetails employee={currentEmployee} />

      <SectionHeader title={"Schedule Calendar"} />
      <div className="h-[500px] rounded-lg shadow-md p-4">
        <EmployeeScheduleCalendar
          events={events}
          handleSelectEvent={handleSelectEvent}
          handleSelectSlot={handleSelectSlot}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={() => setShowAuditLogs(!showAuditLogs)}>
          {showAuditLogs ? "Hide Audit Logs" : "Show Audit Logs"}
        </Button>
      </div>

      {showAuditLogs && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-pry mb-4">Audit Logs</h3>
          <EmployeeAuditLogs employeeId={id} />
        </div>
      )}

      <AddScheduleModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        handleSaveEvent={handleSaveEvent}
      />

      <EditScheduleModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        handleUpdateEvent={handleUpdateEvent}
        handleDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
};

export default SingleEmployee;
