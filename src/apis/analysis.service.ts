import dayjs from "dayjs";
import AxiosService from "./axios.service";

export default class AnalysisService {
    static async getDailyAnalysis(dto: AnalysisDTO) {
        const url = "/api/analysis/daily";
        const response = await AxiosService.post(url, dto);
        return response.data;
    }

    static async getMonthlyAnalysis(dto: AnalysisDTO) {
        const url = "/api/analysis/monthly";
        const response = await AxiosService.post<MonthlyAnalysisResponse>(url, dto);
        return response.data;
    }

    static async getMonthAnalysisChart(dto: AnalysisDTO) {
        const url = "/api/analysis/monthly/chart";
        const response = await AxiosService.post<MonthlyAnalysisChartResponse>(url, dto);
        return response.data;
    }

    static async getYearlyAnalysis(dto: AnalysisDTO) {
        const url = "/api/analysis/yearly";
        const response = await AxiosService.post<YearlyAnalysisResponse>(url, dto);
        return response.data;
    }

    static async getYearlyAnalysisChart(dto: AnalysisDTO) {
        const url = "/api/analysis/yearly/chart";
        const response = await AxiosService.post<YearlyAnalysisChartResponse>(url, dto);
        return response.data;
    }
}

export interface AnalysisDTO {
    boardId: number;
    date: dayjs.Dayjs;
    timezone?: string;
}

export interface MonthlyAnalysisResponse {
    id: number;
    month: number;
    year: number;
    dailyAvg: number;
    total: number;
}

export interface MonthlyAnalysisChartResponse {
    charts: number[];
}

export interface YearlyAnalysisResponse {
    id: number;
    year: number;
    monthAvg: number;
    total: number;
}

export interface YearlyAnalysisChartResponse {
    charts: number[];
}