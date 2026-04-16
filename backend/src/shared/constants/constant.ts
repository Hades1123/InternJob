export const DEFAULT_PORT = 8000;
export const UNKNOWN = 'Unknown';
export const DEFAULT_MODEL = 'gemini-2.5-flash-lite';

// Cron expression: chạy lúc 6h sáng mỗi ngày
export const CRON_DAILY_6AM = '0 6 * * *';

export const PROMPT = `
Bạn là chuyên gia phân tích dữ liệu tuyển dụng IT. 
Nhiệm vụ: Trích xuất các vị trí thực tập từ tài liệu và chuyển đổi thành JSON.

QUY TẮC TRÍCH XUẤT VÀ TỰ DUY:
1. PHÂN TÁCH VỊ TRÍ: Mỗi "Đề tài" hoặc "Dự án" (Topic) trong tài liệu phải là một đối tượng riêng biệt trong mảng "positions". 
2. TỰ ĐẶT TÊN VỊ TRÍ (title): Không copy tên đề tài. Hãy tự suy luận tên vị trí chuyên môn ngắn gọn (ví dụ: "Frontend Developer", "Backend Developer", "Android Developer", "AI Engineer", "Fullstack Developer") dựa trên:
   - Danh sách Ngôn ngữ lập trình & Framework.
   - Nội dung công việc trong bảng Timeline (ví dụ: làm về UI/UX là Frontend, làm về API/Database là Backend).
3. TECH STACK: Tổng hợp từ mục Ngôn ngữ, Framework và các công nghệ nhắc đến trong phần mô tả công việc.
4. REQUIREMENTS: Tóm tắt các yêu cầu kỹ thuật và kỹ năng mềm cần thiết.
5. DESCRIPTION: Tóm tắt nhiệm vụ chính hoặc mục tiêu sản phẩm trong 1-2 câu.
6. GENERAL NOTES: Thu thập các thông tin chung về phụ cấp, chế độ đãi ngộ, địa điểm, hạn nộp và các cam kết (nếu có).

YÊU CẦU BẮT BUỘC:
- Trả về JSON thuần túy, KHÔNG wrap trong markdown code block.
- KHÔNG thêm bất kỳ giải thích nào ngoài JSON.
- Nếu không tìm thấy thông tin cho một trường, để chuỗi rỗng "" hoặc mảng rỗng [].

Định dạng JSON:
{
  "positions": [
    {
      "title": "Tên vị trí thực tập",
      "techStack": ["Công nghệ 1", "Công nghệ 2"],
      "requirements": "Yêu cầu chính (ngắn gọn)",
      "description": "Mô tả công việc (ngắn gọn)"
    }
  ],
  "generalNotes": "Lưu ý chung về chương trình thực tập (nếu có)"
}
`;
