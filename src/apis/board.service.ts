import dayjs from "dayjs";
import AxiosService from "./axios.service";

export default class BoardService {
  static async listBoards() {
    const url = "/api/board/";
    const response = await AxiosService.get<BoardResponse[]>(url);
    return response.data;
  }

  static async getBoard(boardId: number) {
    const url = `/api/board/${boardId}`;
    const response = await AxiosService.get<BoardResponse>(url);
    return response.data;
  }

  static async create(dto: CreateBoardRequest) {
    const url = "/api/board/";
    const response = await AxiosService.post(url, dto);
    return response.data;
  }

  static async update(boardId: number, dto: UpdateBoardRequest) {
    const url = `/api/board/${boardId}`;
    const response = await AxiosService.put(url, dto);
    return response.data;
  }

  static async delete(boardId: number) {
    const url = `/api/board/${boardId}`;
    const response = await AxiosService.delete(url);
    return response.data;
  }

  static async getDailyAnalysis(boardId: number, query: GetDailyAnalysisQuery) {
    const searchParams = new URLSearchParams();
    if (query.date)
      searchParams.set("date", dayjs(query.date).local().format("YYYY-MM-DD"));
    const timezone = dayjs.tz.guess();
    searchParams.set("timezone", timezone);
    const url = `/api/board/${boardId}/analysis/daily?${searchParams.toString()}`;
    const response = await AxiosService.get<DailyAnalysisResponse>(url);
    return response.data;
  }
}

export interface BoardResponse {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  currencyUnit: string;
  language: string;
}

export interface CreateBoardRequest {
  title: string;
  currencyUnit: string;
  language: string;
}

export interface UpdateBoardRequest
  extends Omit<CreateBoardRequest, "currencyUnit" | "language"> {}

export interface ExtractedRecordResponse {
  id: number;
  time: string;
  description: string;
  amount: number;
  paymentMethod: string;
  location: string;
  notes: string;
}

export interface GetDailyAnalysisQuery {
  date?: Date;
}

export interface DailyAnalysisResponse {
  id: number;
  date: number;
  month: number;
  year: number;
  total: number;
  createdAt: string;
  extractedRecords: ExtractedRecordResponse[];
}
