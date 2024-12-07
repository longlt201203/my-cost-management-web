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
}

export interface BoardResponse {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  currencyUnit: string;
}

export interface CreateBoardRequest {
  title: string;
  currencyUnit: string;
}

export interface UpdateBoardRequest extends CreateBoardRequest {}
