import moment from "moment";
import {
  Button,
  TextInput,
  CustomModal,
  MainHeading,
} from "../../../../components/ui";
import { useSelector } from "react-redux";

export const AddScheduleModal = ({
  isModalOpen,
  setIsModalOpen,
  newEvent,
  setNewEvent,
  handleSaveEvent,
}) => {
  const status = useSelector((state) => state.employees.status);
  return (
    <CustomModal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      contentLabel={"Add Schedule"}
    >
      <MainHeading
        title={`Add Schedule for ${moment(newEvent.date).format(
          "MMMM D, YYYY"
        )}`}
      />
      <div className="space-y-4 mb-5">
        <TextInput
          label="Start Time"
          name="start"
          type="time"
          value={moment(newEvent.start).format("HH:mm")}
          onChange={(e) => {
            console.log(e.target.value);
            setNewEvent({
              ...newEvent,
              start: moment(newEvent.date)
                .set({
                  hour: e.target.value.split(":")[0],
                  minute: e.target.value.split(":")[1],
                })
                .toDate(),
            });
          }}
        />
        <TextInput
          label="End Time"
          name="end"
          type="time"
          value={moment(newEvent.end).format("HH:mm")}
          onChange={(e) =>
            setNewEvent({
              ...newEvent,
              end: moment(newEvent.date)
                .set({
                  hour: e.target.value.split(":")[0],
                  minute: e.target.value.split(":")[1],
                })
                .toDate(),
            })
          }
        />
      </div>

      <div className="flex justify-end gap-5">
        <Button variant="outline" onClick={() => setIsModalOpen(false)}>
          Cancel
        </Button>

        <Button
          variant="primary"
          isLoading={
            status === "schedule-loading" ||
            status === "schedule-deleting" ||
            status === "schedule-updating"
          }
          onClick={handleSaveEvent}
        >
          Save
        </Button>
      </div>
    </CustomModal>
  );
};
