import prisma from "../DB/db.config.js";

class AvailabilityController {
  static async getDoctorAvailability(req, res) {
    const { doctorId, startDate, endDate } = req.query;
    try {
      const allAvailability = await prisma.availability.findMany({
        where: {
          doctorId: Number(doctorId),
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        },
      });
      res.json(allAvailability);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch availability" });
    }
  }

  static async createDoctorsAvailability(req, res) {
    try {
      const { doctorId, date, startTime, endTime } = req.body;

      // Check if availability already exists for the doctor on the specified date
      const existingAvailability = await prisma.availability.findMany({
        where: {
          AND: [{ doctorId: doctorId }, { date: new Date(date) }],
        },
      });

      if (existingAvailability?.length > 0) {
        const existId = existingAvailability[0]?.id;
        // Update the existing availability
        const updatedAvailability = await prisma.availability.update({
          where: { id: existId },
          data: {
            startTime,
            endTime,
          },
        });

        return res.status(200).json({
          message: "Availability updated successfully",
          availability: updatedAvailability,
        });
      } else {
        const availability = await prisma.availability.create({
          data: {
            doctorId,
            date: new Date(date),
            startTime,
            endTime,
          },
        });

        // Return a success response
        return res.status(200).json({
          message: "Availability created successfully",
          availability,
        });
      }
    } catch (error) {
      // Handle other errors
      console.error("Error: ", error);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again.",
      });
    }
  }
}

export default AvailabilityController;
