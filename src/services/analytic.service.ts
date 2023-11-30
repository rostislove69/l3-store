type payloadObject = Record<string, any>;

class AnalyticService {

  async postAnalyticsData(type: string, payload: payloadObject){

    const data = {
      type: type,
      payload: payload,
      timestamp: Date(),
    }

    await fetch("/api/sendEvent", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
  }
}

export const analyticService = new AnalyticService();