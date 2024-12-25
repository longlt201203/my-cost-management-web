import dayjs from "dayjs";
import AxiosService from "./axios.service";

export default class RecordService {
  static async listRecords(boardId: number, query: ListRecordsQuery) {
    const searchParams = new URLSearchParams();
    if (query.date)
      searchParams.set("date", dayjs(query.date).local().format("YYYY-MM-DD"));
    const timezone = dayjs.tz.guess();
    searchParams.set("timezone", timezone);
    const url = `/api/board/${boardId}/record?${searchParams.toString()}`;
    const response = await AxiosService.get<RecordResponse[]>(url);
    return response.data;
  }

  static async createRecord(boardId: number, dto: CreateRecordRequest) {
    const url = `/api/board/${boardId}/record`;
    const response = await AxiosService.post(url, dto);
    return response.data;
  }

  static async updateRecord(
    boardId: number,
    recordId: number,
    dto: UpdateRecordRequest
  ) {
    const url = `/api/board/${boardId}/record/${recordId}`;
    const response = await AxiosService.put(url, dto);
    return response.data;
  }

  static async deleteRecord(boardId: number, recordId: number) {
    const url = `/api/board/${boardId}/record/${recordId}`;
    const response = await AxiosService.delete(url);
    return response.data;
  }
}

export interface ListRecordsQuery {
  date?: Date;
}

export interface CreateRecordRequest {
  content: string;
  createdAt: Date;
}

export interface UpdateRecordRequest extends CreateRecordRequest {}

export interface RecordResponse {
  id: number;
  content: string;
  createdAt: string;
}
