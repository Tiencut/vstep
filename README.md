# VSTEP Online Exam Platform

Nền tảng thi/thi thử VSTEP online full 4 kỹ năng (Nghe – Nói – Đọc – Viết), dành cho thí sinh, giảng viên và nhà trường.  
Mục tiêu: giảm chi phí luyện/đánh giá VSTEP, nhưng vẫn đảm bảo chất lượng, minh bạch và dễ tích hợp vào môi trường đại học.

## Tính năng chính

- Thi thử VSTEP full 4 kỹ năng, mô phỏng cấu trúc đề mới nhất.  
- Chấm tự động:
  - Listening / Reading: chấm điểm tức thì, hiển thị đáp án và giải thích.
  - Writing / Speaking: AI scoring + feedback gợi ý chi tiết; hỗ trợ map sang bậc VSTEP (3–5) ở mức tham khảo.
- Tài khoản thí sinh:
  - Đăng ký / đăng nhập, xem lịch sử bài thi.
  - Thống kê điểm theo kỹ năng, biểu đồ tiến bộ.
- Tài khoản giảng viên:
  - Xem kết quả thí sinh qua “class code”.
  - Xuất báo cáo điểm, theo dõi tiến độ lớp.
- Tài khoản nhà trường:
  - Dashboard tổng quan: số user, lượt thi, phân bố điểm.
  - Hỗ trợ triển khai pilot cho khoa/bộ môn.
- Ngân hàng đề:
  - Admin nhập – quản lý đề theo bậc/kỹ năng.
  - Chức năng user đóng góp đề, admin duyệt trước khi công khai.

## Kiến trúc & công nghệ

### Frontend

- Vue 3 + Vite  
- TypeScript  
- Pinia (state management)  
- Vue Router  
- UI library: (Tailwind CSS)

### Backend API

- NestJS (Node.js + TypeScript)  
- REST API cho:
  - Auth (JWT)
  - Exams (đề, bài làm)
  - Scoring (gọi AI service)
  - Reporting (thống kê, dashboard)
- Database: PostgreSQL  
- Cache/queue (tùy chọn, giai đoạn sau): Redis

### AI Scoring Service

- Python + FastAPI  
- Tích hợp:
  - Speech‑to‑Text API cho Speaking (English/Vietnamese).  
  - LLM / NLP để chấm Writing & Speaking theo rubric VSTEP (task response, coherence, vocabulary, grammar, fluency…).  
- Giao tiếp với backend NestJS qua HTTP (internal API).

### Triển khai

- Môi trường: VPS Việt Nam (Linux, Docker + docker‑compose).  
- Hỗ trợ staging (dev/test) và production.

## Cài đặt & chạy (development)

### Yêu cầu

- Node.js (>= 18)  
- npm hoặc pnpm  
- Python (>= 3.10)  
- PostgreSQL  
- Docker (tùy chọn)

### Backend (NestJS)

```bash
cd backend
cp .env.example .env   # chỉnh DB_URL, JWT_SECRET, ...
npm install
npm run prisma:migrate # nếu dùng Prisma
npm run start:dev
```

### Frontend (Vue 3 + Vite)

```bash
cd frontend
cp .env.example .env   # chỉnh VITE_API_BASE_URL
npm install
npm run dev
```

### AI Scoring Service (Python)

```bash
cd ai-scoring
cp .env.example .env   # API key STT, LLM, ...
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

## Roadmap ngắn gọn

- [ ] MVP thi thử full 4 kỹ năng cho cá nhân.  
- [ ] Dashboard cơ bản cho giảng viên (xem điểm theo class).  
- [ ] Thử nghiệm pilot với 1 khoa (ví dụ NNKC – Huế).  
- [ ] Tinh chỉnh AI scoring dựa trên điểm giảng viên.  
- [ ] Tối ưu hiệu năng để scale cho nhiều trường trong nước.

## Đóng góp

- Issues / feature request được chào đón.  
- Về nội dung đề thi, tôn trọng bản quyền và quy chế đề thi: chỉ sử dụng đề tự biên soạn hoặc có quyền sử dụng.

## Giấy phép

(Cập nhật license phù hợp: MIT / Apache‑2.0 / proprietary tùy mục tiêu của anh.)

---