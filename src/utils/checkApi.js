export const checkBackendAvailability = async (backendIps = []) => {
  for (const ip of backendIps) {
    try {
      const response = await fetch(`${ip}`, {
        method: "GET",
        timeout: 3000,
      });
      if (response.ok) {
        localStorage.setItem("backendURL", ip);
        return ip;
      }
    } catch (error) {
      console.warn(`Backend unavailable at: ${ip}`);
    }
  }
  return null;
};
