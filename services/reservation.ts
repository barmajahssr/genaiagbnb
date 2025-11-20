// services/reservation.ts – VERSION SANS STRIPE (démo seulement)
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "./auth";

export async function createReservation(data: any) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  // On simule une réservation sans paiement réel
  const reservation = await prisma.reservation.create({
    data: {
      ...data,
      userId: user.id,
      // on met totalPrice à 0 ou on garde la valeur pour l’affichage
      totalPrice: data.totalPrice || 0,
      status: "PENDING", // ou "CONFIRMED" si tu veux que ça passe direct
    },
  });

  return reservation;
}

export async function getReservations(params: any) {
  return prisma.reservation.findMany(params);
}

export async function deleteReservation(id: string) {
  return prisma.reservation.delete({ where: { id } });
}
