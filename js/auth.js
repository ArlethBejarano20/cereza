import { supabase } from "./supabaseClient.js";

export async function register(email, password, fullName, role) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role
        }
      }
    });

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function login(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { data: null, error };
    }

    return { data: true, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function recoverPassword(email) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password.html"
    });

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return { data: null, error };
    }

    return { data: data.user, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function getMyRole() {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return { data: null, error };
    }

    const user = data.user;
    const role = user?.user_metadata?.role ?? null;

    return { data: role, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}

