const API_BASE_URL = "http://localhost:3000";

interface User {
  userId: string;
  email: string;
  username: string;
  plan: string;
  createdAt?: string;
  expiryDate?: string;
  status?: string;
}

interface AuthState {
  token: string | null;
  userId: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const authState = useState<AuthState>("auth", () => ({
    token: null,
    userId: null,
    user: null,
    isAuthenticated: false,
  }));

  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Restore from localStorage on client
  const initAuth = () => {
    if (!import.meta.client) return;
    const stored = localStorage.getItem("highlightly_auth");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        authState.value = { ...data, isAuthenticated: !!data.token };
      } catch {
        localStorage.removeItem("highlightly_auth");
      }
    }
  };

  const saveAuth = (data: Partial<AuthState>) => {
    const newState = {
      ...authState.value,
      ...data,
      isAuthenticated: !!data.token,
    };
    authState.value = newState;
    if (import.meta.client) {
      localStorage.setItem("highlightly_auth", JSON.stringify(newState));
    }
  };

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const res = await $fetch<{ token: string; userId: string; user: User }>(
        `${API_BASE_URL}/auth/login`,
        {
          method: "POST",
          body: { email, password },
        },
      );

      saveAuth({ token: res.token, userId: res.userId, user: res.user });
      return true;
    } catch (err: any) {
      error.value =
        err?.data?.error ||
        err?.message ||
        "Login failed. Please check your credentials.";
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      await $fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        body: { email, password, username: name },
      });
      return true;
    } catch (err: any) {
      error.value =
        err?.data?.error ||
        err?.message ||
        "Registration failed. Please try again.";
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const forgotPassword = async (email: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      await $fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        body: { email },
      });
      return true;
    } catch (err: any) {
      error.value = err?.data?.error || "Failed to send reset link.";
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const loginWithGoogle = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const res = await $fetch<{ url: string }>(`${API_BASE_URL}/auth/google`, {
        params: { redirect: `${window.location.origin}/auth/callback` },
      });
      if (res.url) {
        window.location.href = res.url;
      }
    } catch (err: any) {
      error.value = "Google sign-in failed. Please try again.";
      isLoading.value = false;
    }
  };

  const handleGoogleCallback = async (
    accessToken: string,
    refreshToken: string,
  ) => {
    isLoading.value = true;
    error.value = null;

    try {
      const res = await $fetch<{
        token: string;
        userId: string;
        user: User;
        isNewUser?: boolean;
      }>(`${API_BASE_URL}/auth/google/callback`, {
        method: "POST",
        body: { access_token: accessToken, refresh_token: refreshToken },
      });

      saveAuth({ token: res.token, userId: res.userId, user: res.user });
      return { success: true, isNewUser: res.isNewUser };
    } catch (err: any) {
      error.value = err?.data?.error || "OAuth failed.";
      return { success: false };
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    authState.value = {
      token: null,
      userId: null,
      user: null,
      isAuthenticated: false,
    };
    if (import.meta.client) {
      localStorage.removeItem("highlightly_auth");
    }
  };

  const fetchUser = async () => {
    if (!authState.value.token || !authState.value.userId) return null;

    try {
      const res = await $fetch<{ user: User }>(
        `${API_BASE_URL}/api/users/${authState.value.userId}`,
        {
          headers: { Authorization: `Bearer ${authState.value.token}` },
        },
      );
      if (res.user) {
        saveAuth({ user: res.user });
      }
      return res.user;
    } catch {
      return null;
    }
  };

  // Payment
  const initializePayment = async (plan: string = "premium") => {
    if (!authState.value.token) return null;

    try {
      const res = await $fetch<{
        authorization_url: string;
        reference: string;
      }>(`${API_BASE_URL}/api/payments/initialize`, {
        method: "POST",
        headers: { Authorization: `Bearer ${authState.value.token}` },
        body: { plan },
      });
      return res;
    } catch (err: any) {
      error.value = err?.data?.error || "Payment initialization failed.";
      return null;
    }
  };

  const verifyPayment = async (reference: string) => {
    if (!authState.value.token) return null;

    try {
      const res = await $fetch<{
        success: boolean;
        plan: string;
        expiryDate: string;
      }>(`${API_BASE_URL}/api/payments/verify`, {
        method: "POST",
        headers: { Authorization: `Bearer ${authState.value.token}` },
        body: { reference },
      });
      if (res.success) {
        await fetchUser();
      }
      return res;
    } catch {
      return null;
    }
  };

  return {
    authState: readonly(authState),
    isLoading,
    error,
    initAuth,
    login,
    register,
    forgotPassword,
    loginWithGoogle,
    handleGoogleCallback,
    logout,
    fetchUser,
    initializePayment,
    verifyPayment,
    API_BASE_URL,
  };
};
