import { supabase } from "./supabaseClient.js";

const TABLE = "citas";

async function handleResult(promise) {
  try {
    const { data, error } = await promise;
    if (error) return { data: null, error };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function createAppointment({
  pacienteId,
  psicologoId,
  fecha,
  hora,
  estado = "pendiente",
  notas = null
}) {
  return handleResult(
    supabase
      .from(TABLE)
      .insert({
        paciente_id: pacienteId,
        psicologo_id: psicologoId,
        fecha,
        hora,
        estado,
        notas
      })
      .select()
      .single()
  );
}

export async function getAppointmentsByPatient(pacienteId) {
  return handleResult(
    supabase
      .from(TABLE)
      .select("*, psicologos(*)")
      .eq("paciente_id", pacienteId)
      .order("fecha", { ascending: true })
      .order("hora", { ascending: true })
  );
}

export async function getAppointmentsByPsychologist(psicologoId) {
  return handleResult(
    supabase
      .from(TABLE)
      .select("*, pacientes(*)")
      .eq("psicologo_id", psicologoId)
      .order("fecha", { ascending: true })
      .order("hora", { ascending: true })
  );
}

export async function getAllAppointments() {
  return handleResult(
    supabase
      .from(TABLE)
      .select("*, pacientes(*), psicologos(*)")
      .order("fecha", { ascending: true })
      .order("hora", { ascending: true })
  );
}

export async function cancelAppointment(appointmentId) {
  return handleResult(
    supabase
      .from(TABLE)
      .update({ estado: "cancelada" })
      .eq("id", appointmentId)
      .select()
      .single()
  );
}

export async function confirmAppointment(appointmentId) {
  return handleResult(
    supabase
      .from(TABLE)
      .update({ estado: "confirmada" })
      .eq("id", appointmentId)
      .select()
      .single()
  );
}

export async function rescheduleAppointment(appointmentId, { fecha, hora }) {
  return handleResult(
    supabase
      .from(TABLE)
      .update({ fecha, hora, estado: "reprogramada" })
      .eq("id", appointmentId)
      .select()
      .single()
  );
}

