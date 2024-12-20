import dayjs from "dayjs";
import AxiosService from "./axios.service";

export default class AnalysisService {
  static async analyzeDaily(dto: AnalyzeDailyRequest) {
    const url = `/api/analysis/daily`;
    const timezone = dayjs.tz.guess();
    const response = await AxiosService.post(url, {
      ...dto,
      date: dayjs(dto.date).local().format("YYYY-MM-DD"),
      timezone: timezone,
    });
    return response.data;
  }
}

export interface AnalyzeDailyRequest {
  boardId: number;
  date?: Date;
}
