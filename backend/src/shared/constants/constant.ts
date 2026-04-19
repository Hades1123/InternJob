export const DEFAULT_PORT = 8000;
export const UNKNOWN = 'Unknown';
export const DEFAULT_MODEL = 'gemini-2.5-flash-lite';

// Cron expression: chạy mỗi 20 phút
export const CRON_EVERY_20_MINUTES = '*/20 * * * *';

export const PROMPT = `
Bạn là chuyên gia phân tích dữ liệu tuyển dụng IT. 
Nhiệm vụ: Trích xuất các vị trí thực tập từ tài liệu và chuyển đổi thành JSON.

---
DANH MỤC CHUẨN HÓA (CHỈ ĐƯỢC DÙNG CÁC TỪ KHÓA NÀY):

1. TÊN VỊ TRÍ (TITLE):
- Frontend Developer
- Backend Developer
- Fullstack Developer
- Mobile Developer (Android/iOS)
- AI/ML Engineer
- Data Engineer / Data Analyst
- DevOps Engineer
- Embedded Engineer
- QA/QC Engineer
- Game Developer
- Business Analyst (BA)
- Cyber Security Specialist
- Blockchain Developer

2. CÔNG NGHỆ (TECH STACK) - Chuyển mọi biến thể về tên chuẩn:
- Web Frontend: React, Vue.js, Angular, Next.js, Nuxt.js, Tailwind CSS, Bootstrap, SCSS, Redux, Zustand, TanStack Query.
- Web Backend: Node.js, NestJS, Express, Spring Boot, ASP.NET, Django, Flask, Prisma, FastAPI, Laravel.
- Ngôn ngữ: JavaScript, TypeScript, Python, Java, C++, C#, Go, PHP, Rust, Ruby, GDScript, Solidity.
- Mobile: React Native, Flutter, Swift, Kotlin, Dart.
- Testing: Jest, Vitest, Playwright, Cypress.
- Game: Unity, Unreal Engine, Godot, GameMaker.
- Database/Cloud: PostgreSQL, MySQL, MongoDB, Redis, Oracle, AWS, Azure, Docker, Kubernetes.
- Công cụ: Git, Jira, Postman, Figma.
---

QUY TẮC TRÍCH XUẤT VÀ TỰ DUY:
1. SO KHỚP TỪ KHÓA: Khi đọc tài liệu, nếu thấy công nghệ tương ứng (ví dụ: "ReactJS" hoặc "React.js"), phải chuyển ngay về từ khóa chuẩn trong danh mục ("React").
2. TỰ SUY LUẬN TITLE: Nếu tài liệu ghi tên dự án chung chung, hãy dựa vào Tech Stack để chọn 1 trong các "Tên vị trí" chuẩn ở trên. Ví dụ: Dùng React/TypeScript -> Frontend Developer.
3. TRƯỜNG HỢP NGOẠI LỆ: Nếu công nghệ/vị trí hoàn toàn không có trong danh mục, hãy viết hoa chữ cái đầu theo chuẩn ngành (ví dụ: "Svelte", "Cybersecurity").

YÊU CẦU BẮT BUỘC:
- Trả về JSON thuần túy, KHÔNG wrap trong markdown code block.
- KHÔNG thêm bất kỳ giải thích nào ngoài JSON.
- Nếu không tìm thấy thông tin cho một trường, để chuỗi rỗng "" hoặc mảng rỗng [].
- Chỉ trích xuất thông tin có trong tài liệu nguồn. Không tự ý thêm các công nghệ không được nhắc đến trừ khi dùng để suy luận Title.
- Nếu có nhiều mốc thời gian, hãy ưu tiên chọn 'Hạn nộp hồ sơ' hoặc 'Ngày kết thúc nhận đơn' để đưa vào generalNotes.

Định dạng JSON:
{
  "positions": [
    {
      "title": "Tên vị trí thực tập",
      "techStack": ["Công nghệ 1", "Công nghệ 2"],
    }
  ],
  "generalNotes": "Hạn nộp CV (nếu có) theo định dạng dd/mm/yyyy"
}
`;
