import type { Book } from "@/lib/types";
import { howToMeasureAnything } from "./book-measure";
import { pythonQuantTrading } from "./book-pyqt";

/** 全部教材列表（按推荐阅读顺序：先方法论，后实战） */
export const books: Book[] = [
  howToMeasureAnything,
  pythonQuantTrading,
];

/** 按 id 取书 */
export function getBook(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}
