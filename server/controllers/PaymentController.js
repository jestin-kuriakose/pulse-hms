import prisma from "../DB/db.config.js";

class PaymentController {
  static async createNewPayment(req, res) {
    const { amount, paymentType } = req?.body;
    const { billingId } = req?.query;
    const currentUserId = req?.user?.id;
    try {
      if (!amount || !paymentType || !billingId)
        return res
          .status(404)
          .json({ error: "No body or billing ID included." });

      const currentEmployee = await prisma.employee.findUnique({
        where: {
          userId: currentUserId,
        },
      });

      const newPayment = await prisma.payment.create({
        data: {
          amount: parseFloat(amount),
          paymentType: paymentType,
          billingId: Number(billingId),
          createdById: currentEmployee?.id,
          updatedById: currentEmployee?.id,
        },
      });

      res.status(200).json(newPayment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error?.message });
    }
  }

  static async updatePayment(req, res) {
    const body = req?.body;
    const { id } = req?.params;
    const { billingId } = req?.query;

    try {
      if (!body || !id)
        return res.status(404).json({ error: "No Body or ID included." });

      const updatedPatient = await prisma.payment.update({
        where: { id: Number(id) },
        data: {
          amount: parseFloat(body?.amount),
          paymentType: body?.paymentType,
        },
      });

      const billing = await prisma.billings.findUnique({
        where: {
          id: Number(billingId),
        },
      });
      const allBillingPayments = await prisma.payment.findMany({
        where: { billingId: Number(billingId) },
      });
      const totalPaymentAmount = allBillingPayments.reduce(
        (sum, payment) => payment?.amount + sum,
        0
      );

      if (totalPaymentAmount == 0) {
        await prisma.billings.update({
          where: { id: Number(billingId) },
          data: {
            status: "Pending",
          },
        });
      } else if (totalPaymentAmount < billing?.subtotal) {
        // partially paid
        await prisma.billings.update({
          where: { id: Number(billingId) },
          data: {
            status: "Partially-Paid",
          },
        });
      } else {
        // fully paid
        await prisma.billings.update({
          where: { id: Number(billingId) },
          data: {
            status: "Paid",
          },
        });
      }

      res.status(200).json(updatedPatient);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error?.message });
    }
  }

  static async deletePayment(req, res) {
    const { id } = req?.params;

    try {
      if (!id) return res.status(404).json({ error: "No ID included" });

      await prisma.payment.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ message: "Payment deleted." });
    } catch (error) {
      console.log(error);
    }
  }
}

export default PaymentController;
