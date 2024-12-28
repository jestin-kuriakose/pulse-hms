import moment from "moment";
import { useSelector } from "react-redux";
import { Button, TextInput, CustomModal, MainHeading } from "../../../../components/ui";

export const EditScheduleModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedEvent,
  setSelectedEvent,
  handleUpdateEvent,
  handleDeleteEvent,
}) => {
  const status = useSelector((state) => state.employees.status);
  return (
    <CustomModal
      isOpen={isEditModalOpen}
      onRequestClose={() => setIsEditModalOpen(false)}
      contentLabel={"Edit Schedule"}
    >
      {selectedEvent && (
        <>
          <MainHeading title={"Edit Schedule"}/>
          <div className="space-y-4 mb-5">
            <TextInput
              label={"Start Time"}
              name={"start"}
              type="time"
              value={moment(selectedEvent.start).format("HH:mm")}
              onChange={(e) => {
                const newStart = moment(selectedEvent.start)
                  .set({
                    hour: e.target.value.split(":")[0],
                    minute: e.target.value.split(":")[1],
                  })
                  .toDate();
                setSelectedEvent({ ...selectedEvent, start: newStart });
              }}
            />
            <TextInput
              label={"End Time"}
              name={"end"}
              type="time"
              value={moment(selectedEvent.end).format("HH:mm")}
              onChange={(e) => {
                const newEnd = moment(selectedEvent.end)
                  .set({
                    hour: e.target.value.split(":")[0],
                    minute: e.target.value.split(":")[1],
                  })
                  .toDate();
                setSelectedEvent({ ...selectedEvent, end: newEnd });
              }}
            />
          </div>

          <div className="flex justify-end gap-5">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>

            <Button
              variant="danger"
              onClick={handleDeleteEvent}
              isLoading={
                status === "schedule-loading" ||
                status === "schedule-deleting" ||
                status === "schedule-updating"
              }
            >
              Delete
            </Button>

            <Button
              variant="primary"
              isLoading={
                status === "schedule-loading" ||
                status === "schedule-deleting" ||
                status === "schedule-updating"
              }
              onClick={handleUpdateEvent}
            >
              Save
            </Button>
          </div>
        </>
      )}
    </CustomModal>
  );
};
