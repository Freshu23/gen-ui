"use server";

type ApiResponse = {
  temperature: number;
  unit: string;
  description: string;
};
export async function getWeather(): Promise<ApiResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ temperature: 72, unit: "F", description: "Sunny" });
    }, 2000);
  });
}
