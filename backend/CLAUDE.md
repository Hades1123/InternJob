## Khi tui hỏi điều gì liên quan đến bài tập thì hay vô trong này đọc nhé

## Tôi đang tập luyện query với monggose, tất cả lời giải tui đang làm trong module practice

## 3. Bài tập Query (Từ dễ đến khó)

Bạn hãy thử viết các hàm trong Service để thực hiện các yêu cầu sau:

### Cấp độ 1: Cơ bản (Cơ chế lọc đơn giản)

1. **Tìm kiếm chính xác:** Tìm công ty có `shortName` là `"HR - HORUS - HORUSOFTACEAE"`.
2. **Lọc Boolean:** Liệt kê tất cả các công ty đang mở nhận thực tập (`stat.acceptedIntern` là `true`).
3. **Lọc theo số lượng:** Tìm các công ty có `maxAcceptedStudent` lớn hơn 10.

### Cấp độ 2: Trung bình (Dot Notation & Regex)

4. **Tìm kiếm theo địa chỉ:** Tìm các công ty có địa chỉ chứa chữ `"Quận 10"` (Gợi ý: Dùng Regex).
5. **Kết hợp điều kiện:** Tìm công ty vừa ở `"TPHCM"`, vừa có số lượng sinh viên đã chấp nhận (`studentAccepted`) ít hơn chỉ tiêu (`maxAcceptedStudent`).
6. **Kiểm tra mảng:** Tìm các công ty có ít nhất một file trong mảng `files`.

### Cấp độ 3: Nâng cao (Array manipulation & AI Summary)

7. **Query sâu trong mảng:** Tìm các công ty có vị trí thực tập (`aiSummary.positions`) với `title` chứa chữ `"Thực tập tốt nghiệp"`.
8. **Projecting (Chỉ lấy field cần thiết):** Lấy danh sách tất cả công ty nhưng chỉ trả về 2 field: `fullName` và `aiSummary.generalNotes`.
9. **Sắp xếp & Phân trang:** Lấy top 5 công ty có số lượng `maxAcceptedStudent` cao nhất, sắp xếp giảm dần.

### Cấp độ 4: "Trùm" (Aggregation Framework)

10. **Thống kê:** Tính tổng số lượng `studentAccepted` của tất cả các công ty trong database.

### Mẫu database mongo:

```{json}
{
  "_id": "69a71633660da5def29d96ba",
  "companyId": "5caef41002c2e72195b4ce8c",
  "__v": 0,
  "address": "766/3G đường Sư Vạn Hạnh, phường 12, quận 10, TPHCM",
  "createdAt": "2026-03-03T17:11:15.831Z",
  "files": [
    {
      "path": "/company/5caef41002c2e72195b4ce8cHorus_D2_TTNT_HK243.pdf",
      "name": "Horus_D2_TTNT_HK243.pdf",
      "fileType": "pdf",
      "isProcessed": true,
      "processedAt": "2026-03-04T03:40:59.916Z"
    },
    {
      "path": "/company/5caef41002c2e72195b4ce8cHorus_D3_TTNT_HK243_20250530.pdf",
      "name": "Horus_D3_TTNT_HK243_20250530.pdf",
      "fileType": "pdf",
      "isProcessed": true,
      "processedAt": "2026-03-04T03:40:59.916Z"
    },
    {
      "path": "/company/5caef41002c2e72195b4ce8cHorus_D3_TTNT_HK243_2025_06_11.pdf",
      "name": "Horus_D3_TTNT_HK243_2025_06_11.pdf",
      "fileType": "pdf",
      "isProcessed": true,
      "processedAt": "2026-03-04T03:40:59.916Z"
    }
  ],
  "stat": {
    "maxAcceptedStudent": 13,
    "maxRegister": 36,
    "adminMaxRegister": 10,
    "acceptedIntern": true,
    "studentRegister": 0,
    "studentAccepted": 12
  },
  "updatedAt": "2026-03-05T07:31:54.171Z",
  "aiSummary": {
    "positions": [
      {
        "title": "Thực tập tốt nghiệp / Thực tập ngoài trường",
        "techStack": [
          "ReactJS",
          "Python",
          "Java",
          "WebApp",
          "HTML",
          "CSS",
          "SASS",
          "Javascript",
          "Typescript",
          "API",
          "REST API",
          "Database",
          "ORM",
          "Cloud services",
          "File management",
          "Authentication",
          "Chatbot"
        ],
        "requirements": "Sinh viên Khoa KH&KT Máy Tính – Trường ĐH Bách Khoa – ĐHQG TP.HCM. Ưu tiên ứng viên có tinh thần ham học hỏi, tư duy tốt, thái độ chuyên nghiệp, thích thử thách môi trường startup năng động. Có thể thực tập sớm (từ 05/05) và tối thiểu 08 tuần.",
        "description": "Chương trình thực tập nhằm trang bị cho sinh viên kiến thức chuyên môn, kỹ năng làm việc nhóm, kỹ năng giao tiếp, và hòa nhập môi trường doanh nghiệp. Sinh viên sẽ tham gia phát triển các chức năng mới về UI/UX, phát triển API, hoặc tích hợp chatbot vào hệ thống. Thời gian thực tập dự kiến từ 16/06/2025 đến 15/08/2025, làm việc từ 9:00 đến 18:00, thứ 2 đến thứ 6. Địa điểm làm việc tại văn phòng công ty."
      }
    ],
    "generalNotes": "Công ty TNHH HORUSOFTACEAE, chuyên phát triển và cung cấp dịch vụ công nghệ trong lĩnh vực Y Dược và Giáo dục. Chương trình thực tập kéo dài 08 tuần, hỗ trợ tiền ăn cơm trưa. Có thể hỗ trợ thêm chi phí hoặc tuyển dụng nếu có đóng góp tốt. Sinh viên nộp hồ sơ bao gồm CV và bảng điểm qua email: intern@horusoftaceae.com trước ngày 31/05/2025.",
    "updatedAt": "2026-03-04T03:40:59.916Z",
    "_id": "69a7a9cb69d67d32dc657d55"
  },
  "fullName": "Công ty TNHH HORUSOFTACEAE",
  "shortName": "HR - HORUS - HORUSOFTACEAE",
  "companyIcon": "/img/company/5caef41002c2e72195b4ce8c.png?t=29212322"
}
```
