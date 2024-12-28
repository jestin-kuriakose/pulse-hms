import moment from "moment/moment";

const PreviousNotesContainer = (notes) => {
  return (
    <>
      {notes?.notes?.length > 0 && (
        <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 dark:bg-blue-900 dark:text-gray-100 px-4 py-2 border-b border-gray-200">
            <h6 className="font-semibold text-gray-700 dark:text-gray-100">
              Previous Notes
            </h6>
          </div>
          <div className="divide-y divide-gray-200">
            {notes?.notes?.map((note, index) => (
              <div
                key={index}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">
                    {note.employee.position === "DOCTOR" && "Dr. "}{" "}
                    {note.employee.firstName} {note.employee.lastName}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {moment(note.createdAt).format("MMMM D, YYYY")} at{" "}
                    {moment(note.createdAt).format("h:mm A")}
                  </span>
                </div>
                <p className="text-gray-800 dark:text-gray-100 text-sm">
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PreviousNotesContainer;
