import moment from "moment";

export const CustomToolbar = (toolbar) => {
    const goToBack = () => {
      toolbar.date.setMonth(toolbar.date.getMonth() - 1);
      toolbar.onNavigate('prev');
    };
  
    const goToNext = () => {
      toolbar.date.setMonth(toolbar.date.getMonth() + 1);
      toolbar.onNavigate('next');
    };
  
    const goToCurrent = () => {
      const now = new Date();
      toolbar.date.setMonth(now.getMonth());
      toolbar.date.setYear(now.getFullYear());
      toolbar.onNavigate('current');
    };
  
    const label = () => {
      const date = moment(toolbar.date);
      return (
        <span className="text-lg font-semibold">{date.format('MMMM YYYY')}</span>
      );
    };
  
    return (
      <div className="flex justify-between items-center mb-4">
        <div>
          <button
            onClick={goToBack}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300 transition duration-200"
            type="button"
          >
            &lt;
          </button>
          <button
            onClick={goToNext}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 transition duration-200 ml-1"
            type="button"
          >
            &gt;
          </button>
        </div>
        <div>{label()}</div>
        <button
          onClick={goToCurrent}
          className="px-4 py-2 bg-pry text-white rounded-md hover:bg-sec-50 transition duration-200"
          type="button"
        >
          Today
        </button>
      </div>
    );
  };

